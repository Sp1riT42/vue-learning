<template>
  <div>
  <v-container>
    <v-row align="baseline">
<!--    <input type="number" placeholder="Payment value" v-model.trim.number="value">-->
      <v-col cols="12">
        <v-text-field type="number" placeholder="Payment value" v-model.trim.number="value"></v-text-field>
      </v-col>
      <v-col cols="12">
<!--        <div style="display: inline-block; position: relative">-->
          <!--      <input type="text" placeholder="Payment category" v-model.trim="pickedCategory" @click="showCategory = !showCategory">-->
          <v-text-field type="text" placeholder="Payment category" v-model.trim="pickedCategory" @click="showCategory = !showCategory"></v-text-field>
          <div class="modal" v-show="showCategory">
            <div  >
              <!--          <input type="radio" name="category" :id="category + idx" v-model="pickedCategory" :value="category">-->
              <!--          <label :for="category + idx">{{ category }}</label>-->
              <v-radio-group v-model="pickedCategory">
                <v-radio
                    v-for="(category, idx) in currCategoryList"
                    :key="category"
                    name="category"
                    :label="category"
                    :id="category + idx"
                    :value="category">
                </v-radio>
              </v-radio-group>
            </div>
          </div>
<!--        </div>-->
      </v-col>
      <v-col cols="12">
        <v-text-field type="text" placeholder="Payment date" v-model.trim="date"></v-text-field>
      </v-col>

<!--    <input type="text" placeholder="Payment date" v-model.trim="date">-->

    <v-btn @click="changeRow">Save</v-btn>
    </v-row>
  </v-container>

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
.modal {
  position: absolute;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  padding: 8px;
  box-shadow: 0px 6px 8px;
  z-index: 999;
}
</style>