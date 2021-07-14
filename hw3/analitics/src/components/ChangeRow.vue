<template>
  <div>
  <div>
    <input type="number" placeholder="Payment value" v-model.trim.number="value">
    <div style="display: inline-block; position: relative">
      <input type="text" placeholder="Payment category" v-model.trim="pickedCategory" @click="showCategory = !showCategory">
      <div class="modal" v-show="showCategory">
        <div v-for="(category, idx) in currCategoryList" :key="category">
          <input type="radio" name="category" :id="category + idx" v-model="pickedCategory" :value="category">
          <label :for="category + idx">{{ category }}</label>
        </div>
      </div>
    </div>

    <input type="text" placeholder="Payment date" v-model.trim="date">
    <button @click="changeRow">Save</button>
  </div>

  </div>
</template>

<script>
export default {
  name: "ChangeRow",
  props: {
    categoryList: {
      type: Array,
      default: () => [],
      required: true
    },
    item: {
      type: Object
    }
  },
  data(){
    return {
      currCategoryList: this.categoryList,
      value: 0,
      category: '',
      date: '',
      id: 0,
      showCategory: false,
      pickedCategory: ''
    }
  },
  methods: {
    changeRow() {
      this.item.value = this.value
      this.item.category = this.pickedCategory
      this.item.date = this.date
      this.$store.commit('addCategory', this.pickedCategory)
      this.currCategoryList = this.$store.getters.getCategoryList
      this.$store.dispatch('changeData', [this.item])
      //console.log(this.$store.getters.getPaymentList, this.$store.getters.getMainPaymentList)
    }
  },
  computed: {
  },
  mounted() {
      this.pickedCategory = this.item.category
    this.value = this.item.value
    this.date = this.item.date
  }
}
</script>

<style scoped>

</style>