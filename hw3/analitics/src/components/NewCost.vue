<template>
  <v-container>
    <v-row align-content="end" align="baseline">
      <v-col >
        <v-text-field type="number" label="Payment value" placeholder="123" v-model.trim.number="value"></v-text-field>
      </v-col>
      <v-col style="display: inline-block; position: relative">
          <v-text-field
              type="text"
              label="Payment category"
              name="category"
              placeholder="Food"
              v-model.trim="pickedCategory"
              @click.prevent="showCategory = !showCategory"
          ></v-text-field>
          <div class="modal" v-show="showCategory">
            <div >
              <v-radio-group v-model="pickedCategory">
                <v-radio
                    v-for="(category, idx) in categoryList"
                    :key="category"
                    name="category"
                    :label="category"
                    :id="category + idx"
                    :value="category">
                </v-radio>
              </v-radio-group>
            </div>
          </div>
      </v-col>
     <v-col >
       <v-text-field type="text" label="Payment date" placeholder="20.03.2020" v-model.trim="date"></v-text-field>
     </v-col>
      <v-btn @click="saveCost">
        Save
      </v-btn>
    </v-row>
  </v-container>
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
      categoryGroup: 'category',
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
  z-index: 999;
}
</style>