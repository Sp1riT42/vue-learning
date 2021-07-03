<template>
  <div>
    <button @click="showInput = !showInput">ADD NEW COST +</button>
    <div v-show="showInput">
      <input type="number" placeholder="Payment value" v-model.trim.number="value">
      <input type="text" placeholder="Payment category" v-model.trim="category">
      <input type="text" placeholder="Payment date" v-model.trim="date">
      <button @click="saveCost">Save</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewCost",
  data(){
    return {
      showInput: false,
      value: 0,
      category: '',
      date: ''
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
      const {value, category} = this
      const data = {
        value,
        category,
        date: this.date || this.getCurrentDate()
      }
      this.$emit('addNewPayment', data)
    }
  }
}
</script>

<style scoped>

</style>