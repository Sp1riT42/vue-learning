<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>My personal coast</h1>
    <NewCost @addNewPayment="addPaymentItem" :categoryList="categoryList" @getCategory="getCategoryList" @getPaymentList="getPaymentList"/>
    <div>
      <router-link to="/add/payment/Food?value=200&date=20.03.2020">Food: 200</router-link> /
      <router-link to="/add/payment/Food?value=2000&date=20.03.2020">Food: 2000</router-link> /
      <router-link to="/add/payment/Transport?value=50">Transport: 50</router-link> /
      <router-link to="/add/payment/Entertaiment?value=2000">Entertaiment: 2000</router-link>
<!--      <router-view></router-view>-->
    </div>
    <CostsTable :paymentsList="getFilterPaymentList" :currentPage="currentPage" :maxItem="maxItem" ></CostsTable>
    <Pagination :currentPage="currentPage" :paymentsList="paymentsList" :maxPages="maxPages" @pickedPage="setCurrentPage"/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NewCost from "@/components/NewCost";
import CostsTable from "@/components/CostsTable";
import Pagination from "@/components/Pagination";

export default {
  name: 'App',
  components: {
    //HelloWorld
    NewCost,
    CostsTable,
    Pagination
  },
  data() {
    return {
      paymentsList: {},
      maxItem: 3,
      maxPages: 0,
      currentPage: 1,
      categoryList: []
    }
  },
  methods: {
    fetchData() {
      return [
        {
          date: '12.03.2020',
          category: 'Food',
          value: 123
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 352
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 22
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 146
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 568
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 648
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 555
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 1213453
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 4
        },
        {
          date: '12.03.2020',
          category: 'Food',
          value: 456
        }
      ]
    },
    addPaymentItem(data) {
      this.$store.commit('addCategory', data.category)
      this.$store.dispatch('loadData', [data]).then(() => {
        this.getCategoryList()
        this.getPaymentList()
      })
    },
    setCurrentPage(idx) {
      console.log(idx)
      if(idx === 'minus') {
        if(this.currentPage > 1) {
          this.currentPage--
        }
      } else if(idx === 'plus') {
        if(this.currentPage < this.maxPages) {
          this.currentPage++
        }
      } else{
        this.currentPage = idx
      }
      if(idx) {
        this.addNewPages()
      }
      this.$store.commit('setCurrentPage', this.currentPage)
    },
    addNewPages() {
      this.$store.dispatch("fetchData", this.currentPage).then(() => {
        this.paymentsList = this.$store.getters.getPaymentList
        this.maxPages = this.$store.getters.getPages
      })
    },
    getCategoryList() {
      this.categoryList = this.$store.getters.getCategoryList
    },
    getPaymentList() {
      this.paymentsList = this.$store.getters.getPaymentList
      this.maxPages = this.$store.getters.getPages
      console.log('maxpages = '+this.maxPages)
    }
  },
  computed: {
    getFilterPaymentList() {
      return this.paymentsList['page'+this.currentPage]
    },

  },
  created() {
    this.$store.dispatch("fetchData", 1).then(() => {
      this.paymentsList = this.$store.getters.getPaymentList
      this.maxPages = this.$store.getters.getPages
    })
    this.categoryList = this.$store.getters.getCategoryList

    // if(location.pathname === '/') {
    //
    // }
  },
  updated() {
    this.maxPages = this.$store.getters.getPages

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
