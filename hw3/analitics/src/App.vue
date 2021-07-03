<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>My personal coast</h1>
    <NewCost @addNewPayment="addPaymentItem"/>
    <CostsTable :paymentsList="getFilterPaymentList" :currentPage="currentPage" :maxItem="maxItem"></CostsTable>
    <Pagination :currentPage="currentPage" :paymentsList="paymentsList" @pickedPage="setCurrentPage"/>
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
      paymentsList: [],
      maxItem: 5,
      currentPage: 1
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
      this.paymentsList = [...this.paymentsList,data]
    },
    setCurrentPage(idx) {
      if(idx === 'minus') {
        if(this.currentPage > 1) {
          this.currentPage--
        }
      } else if(idx === 'plus') {
        if(this.currentPage < Math.ceil(this.paymentsList.length/5)) {
          this.currentPage++
        }
      } else{
        this.currentPage = idx
      }

    }
  },
  computed: {
    getFilterPaymentList() {
      return this.paymentsList.slice((this.currentPage-1)* this.maxItem, this.currentPage * this.maxItem)
    }
  },
  created() {
    this.paymentsList = this.fetchData()
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
