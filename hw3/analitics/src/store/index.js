import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mainPaymentList: {
            "page1": [
                { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 },
                { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 },
                { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 }
            ],
            "page2": [
                { "id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969 },
                { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 },
                { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 }
            ],
            "page3": [
                { "id": 7, "date": "26.03.2020", "category": "Entertaiment", "value": 65 },
                { "id": 8, "date": "27.03.2020", "category": "Education", "value": 754 },
                { "id": 9, "date": "28.03.2020", "category": "Food", "value": 768 }
            ],
            "page4": [
                { "id": 10, "date": "29.03.2020", "category": "Entertaiment", "value": 3466 },
                { "id": 11, "date": "30.03.2020", "category": "Education", "value": 3 },
                { "id": 12, "date": "31.03.2020", "category": "Food", "value": 346737 }
            ]
        },
        paymentList: [],
        pages: 0,
        maxId: 0,
        categoryList: ['Food', 'Navigation', 'Sport', 'Entertaiment', 'Education'],
        maxItem: 3,
        currentPage: 1
    },
    mutations: {
        setPaymentList(state, payload) {
            state.paymentList = payload
        },
        addToPaymentList(state, payload) {
            let arr = []
            console.log(payload,payload?.length)
            if(payload != undefined) {
                for(let i = 0; i<payload.length; i++) {
                    if(state.maxId < payload[i].id) state.maxId = payload[i].id
                    if(payload[i].id === undefined) payload[i].id = ++state.maxId
                    if(state.paymentList.find( item => item.id === payload[i].id) === undefined) {
                        console.log("paymentList:" + state.paymentList, "payloadID: " + payload[i].id)
                        arr.push(payload[i])
                    }
                    console.log("category: "+payload[i].category.length)
                    if(state.categoryList.find(item => item === payload[i].category) === undefined && payload[i].category.length > 0) {
                        state.categoryList = [...state.categoryList,payload[i].category]
                    }
                }
                if(arr.length > 0) {
                    state.paymentList = [...state.paymentList,...arr]
                }
            }

        },
        setMaxPages(state, payload) {
            console.log(payload)
            if(typeof payload === 'number') {
                if(payload > state.pages) state.pages = payload
                //state.pages = payload
            } else {
                let pages = Math.ceil(payload.length/3)
                if(pages > state.pages) state.pages = pages
            }

        },
        addCategory(state, payload) {
            console.log("category: "+payload)
        },
        setMainPaymentList(state, payload) {
            for(let val in state.mainPaymentList) {
                for(let i = 0; i < state.mainPaymentList[val].length; i++) {
                    console.log(val, payload, state.maxId, state.mainPaymentList[val][i]['id'])
                    if(state.maxId < state.mainPaymentList[val][i]['id']) state.maxId = state.mainPaymentList[val][i]['id']
                }

            }
            const pages = Object.keys(state.mainPaymentList).length
            payload[0].id = ++state.maxId
            if(state.mainPaymentList['page'+pages].length < state.maxItem) {
                state.mainPaymentList['page'+pages].push(...payload)
                state.mainPaymentList = {...state.mainPaymentList}
            } else {
                state.mainPaymentList['page'+(pages+1)] = [...payload]
            }
            console.log(payload, state.mainPaymentList)
        },
        setCurrentPage(state, payload) {
            state.currentPage = payload
        }

    },
    getters: {
        getPaymentList: state => state.paymentList,
        getPages: state => state.pages,
        getCategoryList: state => state.categoryList,
        getMainPaymentList: state => state.mainPaymentList
    },
    actions: {
        fetchData({commit, getters}, page) {
            console.log("fetchData: " + page)
            return new Promise((resolve) => {
                setTimeout(() => {
                    /*const items = {
                        "page1": [
                            { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 },
                            { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 },
                            { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 }
                        ],
                        "page2": [
                            { "id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969 },
                            { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 },
                            { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 }
                        ],
                        "page3": [
                            { "id": 7, "date": "26.03.2020", "category": "Entertaiment", "value": 65 },
                            { "id": 8, "date": "27.03.2020", "category": "Education", "value": 754 },
                            { "id": 9, "date": "28.03.2020", "category": "Food", "value": 768 }
                        ],
                        "page4": [
                            { "id": 10, "date": "29.03.2020", "category": "Entertaiment", "value": 3466 },
                            { "id": 11, "date": "30.03.2020", "category": "Education", "value": 3 },
                            { "id": 12, "date": "31.03.2020", "category": "Food", "value": 346737 }
                        ],
                    }*/
                    const items = getters.getMainPaymentList
                        // for (let i=1; i<50; i++) {
                    //     items.push({
                    //         date: '01.07.2021',
                    //         category: "Food",
                    //         value: i
                    //     })
                    // }
                    console.log(Object.keys(items).length)
                    resolve([items['page'+page], Object.keys(items).length])
                }, 2000)
            })
                .then(res => {
                    commit('addToPaymentList', res[0])
                    //commit('setPages', res[1])
                    // if(this.state.paymentList.length < res[1]) {
                    //     commit('setMaxPages', res[1])
                    // } else {
                    //     //commit('setMaxPages', this.state.paymentList)
                    //     commit('setMaxPages', this.state.mainPaymentList)
                    // }
                    commit('setMaxPages', res[1])
                    console.log(res[0],this.state.paymentList.length, res[1])

                })
        },
        loadData({commit}, paymentItem) {
            return new Promise((resolve) => {
                resolve(paymentItem)
            })
                .then(res => {
                    commit('setMainPaymentList', res)
                    return new Promise((resolve) => {
                        resolve(this.dispatch('fetchData', this.state.currentPage))
                    })

                })
        }
    }
})