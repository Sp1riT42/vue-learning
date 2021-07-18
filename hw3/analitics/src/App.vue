<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="v-sheet--outlined">
          <v-col cols="6">
<!--            <img alt="Vue logo" src="./assets/logo.png">-->
<!--            <router-view/>-->
            <h3 class="text-h3 font-weight-medium mb-4" >My personal coast</h3>
<!--            <button @click="showForm = !showForm">ADD NEW COST +</button>-->
            <v-btn class="mb-3" @click="showForm = !showForm" color="#24A79A" tile>
              <div class="white--text">ADD NEW COST</div>
              <v-icon color="white" class="ml-2">mdi-plus</v-icon>
            </v-btn>
            <div class="mb-3">
              <NewCost v-show="showForm" @addNewPayment="addPaymentItem" :categoryList="categoryList" @getCategory="getCategoryList" @getPaymentList="getPaymentList"/>
              <div v-show="showForm">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-btn to="/add/payment/Food?value=200&date=20.03.2020">Food: 200</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn to="/add/payment/Food?value=2000&date=20.03.2020">Food: 2000</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn to="/add/payment/Transport?value=50">Transport: 50</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn to="/add/payment/Entertaiment?value=2000">Entertaiment: 2000</v-btn>
                    </v-col>
                  </v-row>
                </v-container>


                <!--      <router-view></router-view>-->
              </div>
            </div>
            <CostsTable :paymentsList="getFilterPaymentList" :currentPage="currentPage" :maxItem="maxItem" ></CostsTable>
            <div class="mt-5">
              <Pagination :currentPage="currentPage" :paymentsList="paymentsList" :maxPages="maxPages" @pickedPage="setCurrentPage"/>
            </div>

          </v-col>
          <v-col cols="6">
            graph
          </v-col>
        </v-row>
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
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
      showForm: false,
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
