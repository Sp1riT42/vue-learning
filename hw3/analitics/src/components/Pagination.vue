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

  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    paymentsList: {
      type: Array,
      default: ()=>[],
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
    getPageCount() {
      return Math.ceil(this.paymentsList.length/5)
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  width: 500px;
  margin: 0 auto;
  padding: 8px 0;
}
.pagination__pages {
  display: flex;
}
.pagination__item {
  flex: 1;
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