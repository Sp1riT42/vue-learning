<template>
  <div class="pagination">

    <div class="pagination__pages pagination__item">
      <div class="pagination__item">
        <div class="pagination__content" @click="pickedPage('minus')">{{left}}</div>
      </div>
      <div class="pagination__number pagination__item" v-for="(page,idx) in maxPages" :key="page">
        <div class="pagination__content"
             :class="{active: currentPage === idx+1}"
             @click="pickedPage(idx)"
        >
          {{page}}
        </div>
      </div>
      <div class="pagination__item">
        <div class="pagination__content" @click="pickedPage('plus')">{{right}}</div>
      </div>
    </div>
<!--    <v-pagination
    v-model="currentPage"
    :length="maxPages"
    @input="pickedPage(currentPage)"
    >
    </v-pagination>-->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    paymentsList: {
      type: Object,
      default: ()=>{},
      required: true
    },
    currentPage: {
      type: Number,
      default: ()=> 1,
      required: true
    },
    maxPages: {
      type: Number,
      default: ()=> 0,
      required: true
    }
  },
  data() {
    return {
      left: '<',
      right: '>',
      //pages: 0
    }
  },
  methods: {
    pickedPage(idx) {
      console.log(idx)
      if(idx === 'minus' || idx === 'plus') {
        this.$emit('pickedPage', idx)
      } else {
        this.$emit('pickedPage', idx+1)
      }

    }
  },
  computed: {
    /*getPageCount() {
      return Math.ceil(this.paymentsList.length/5)
    }*/
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  width: 500px;
  margin: 0 auto;
  padding: 8px 0;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);
}
.pagination__pages {
  display: flex;
}
.pagination__item {
  flex: 1;
  justify-content: center;
  display: flex;
}
.pagination__content {
  display: inline-block;
  cursor: pointer;
  padding: 4px;
}
.active {
  color: #41B883;
}


</style>