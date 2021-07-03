<template>
  <div class="table">
    <div class="table__heading">
      <div class="table__heading-id table__cell"><p class="table__heading-text">#</p></div>
      <div class="table__heading-date table__cell"><p class="table__heading-text">Date</p></div>
      <div class="table__heading-category table__cell"><p class="table__heading-text">Category</p></div>
      <div class="table__heading-value table__cell"><p class="table__heading-text">Value</p></div>
    </div>
    <div class="table__main">
      <div class="table__row" v-for="(item,idx) in paymentsList" :key="idx">
        <div class="table__row-id table__cell">{{ (idx+1)+(currentPage-1)*maxItem }}</div>
        <div class="table__row-date table__cell">{{item.date}}</div>
        <div class="table__row-category table__cell">{{item.category}}</div>
        <div class="table__row-value table__cell">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CostsTable",
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
    maxItem: {
      type: Number,
      default: ()=> 5,
      required: true
    }
  }
}
</script>

<style scoped>
  .table {
    width: 500px;
    margin: 0 auto;
  }
  .table__heading {
    display: flex;
    border-bottom: 1px solid #c4c4c4;
  }
  .table__heading-text {
    font-weight: 900;
  }
  .table__row {
    display: flex;
    border-bottom: 1px solid #c4c4c4;
    padding: 8px 0;
  }
  .table__cell {
    flex: 1;
  }
</style>