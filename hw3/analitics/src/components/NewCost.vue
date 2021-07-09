<template>
  <div>
    <button @click="showInput = !showInput">ADD NEW COST +</button>
    <div v-show="showInput">
      <input type="number" placeholder="Payment value" v-model.trim.number="value">
      <div style="display: inline-block; position: relative">
        <input type="text" placeholder="Payment category" v-model.trim="pickedCategory" @click="showCategory = !showCategory">
        <div class="modal" v-show="showCategory">
          <div v-for="(category, idx) in categoryList" :key="category">
            <input type="radio" name="category" :id="category + idx" v-model="pickedCategory" :value="category">
            <label :for="category + idx">{{ category }}</label>
          </div>
        </div>
      </div>

      <input type="text" placeholder="Payment date" v-model.trim="date">
      <button @click="saveCost">Save</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewCost",
  props: {
    categoryList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data(){
    return {
      showInput: false,
      value: 0,
      category: '',
      date: '',
      id: 0,
      showCategory: false,
      pickedCategory: ''
    }
  },
  methods: {
    getCurrentDate() {
      const today = new Date()
      const d = ("0" + today.getDate()).slice(-2)
      const m = ('0'+(today.getMonth() + 1)).slice(-2)
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    },
    saveCost() {
      const {value, pickedCategory} = this
      const data = {
        value,
        category: pickedCategory,
        date: this.date || this.getCurrentDate()
      }
      console.log('save', data)
      this.$emit('addNewPayment', data)
/*      this.$store.dispatch('loadData', [data]).then(() => {
        this.$emit('getCategory')
    //    this.$store.commit('setMaxPages', this.$store.getters.getPaymentList)
        this.$emit('getPaymentList')
      })*/
    //  this.$store.commit('addToPaymentList', [data])

     // this.categoryList = this.$store.getters.getCategoryList

    }
  },
  watch: {
    $route(to, from) {
      console.log(to.path, from, this.$route.query )
      console.log(location)
      if(to.path === `/add/payment/${this.$route.params.category}`) {
        this.showInput = true
        this.value = this.$route.query.value || 0
        this.date = this.$route.query.date || this.getCurrentDate()
        this.pickedCategory = this.$route.params.category
      }

    }
  },
  created() {
    //console.log(location.pathname)
    if(location.pathname === `/add/payment/${this.$route.params.category}`) {
      this.showInput = true
      this.value = this.$route.query.value
      this.date = this.$route.query.date || this.getCurrentDate()
      this.pickedCategory = this.$route.params.category
    }
  }
}
</script>

<style scoped>
.modal {
  position: absolute;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  padding: 8px;
  box-shadow: 0px 6px 8px;
}
</style>