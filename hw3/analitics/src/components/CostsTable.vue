<template>
  <div class="table">
    <v-row class="table__row">
<!--      <div class="table__heading">-->
        <v-col cols="1">#</v-col>
        <v-col cols="5">Date</v-col>
        <v-col cols="4">Category</v-col>
        <v-col cols="2">Value</v-col>
<!--        <div class="table__heading-id table__cell"><p class="table__heading-text">#</p></div>
        <div class="table__heading-date table__cell"><p class="table__heading-text">Date</p></div>
        <div class="table__heading-category table__cell"><p class="table__heading-text">Category</p></div>
        <div class="table__heading-value table__cell"><p class="table__heading-text">Value</p></div>-->
<!--      </div>-->
    </v-row>
<!--    <div class="table__main">-->
      <v-row v-for="(item,idx) in paymentsList" :key="idx" class="table__row">
        <v-col cols="1">{{ (idx+1)+(currentPage-1)*maxItem }}</v-col>
        <v-col cols="5">{{item.date}}</v-col>
        <v-col cols="4">{{item.category}}</v-col>
        <v-col cols="2">
          <span class="table__value">{{item.value}}</span>
          <v-btn plain x-small class="table__btn float-right" @click="clickOn($event, item)">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-overlay :value="showForm"></v-overlay>
<!--          <button @click="clickOn($event, item)">...</button>-->
          <transition name="fade">
            <ModalWindow v-if="showForm === item" :settings="settings" :item="item" class="table__modal" @closeModal="showForm=''"/>
          </transition>
        </v-col>
      </v-row>
<!--      <div class="table__row" v-for="(item,idx) in paymentsList" :key="idx">
        <div class="table__row-id table__cell">{{ (idx+1)+(currentPage-1)*maxItem }}</div>
        <div class="table__row-date table__cell">{{item.date}}</div>
        <div class="table__row-category table__cell">{{item.category}}</div>
        <div class="table__row-value table__cell">
          <span class="table__value">{{item.value}}</span>
          <button @click="clickOn($event, item)">...</button>
          <transition name="fade">
            <ModalWindow v-if="showForm === item" :settings="settings" :item="item" class="table__modal"/>
          </transition>

        </div>-->
      </div>

<!--    </div>-->
<!--  </div>-->
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
export default {
  name: "CostsTable",
  components: {
    ModalWindow
  },
  data() {
    return {
      showForm: false,
      targetPosition: {
        left: 0,
        top: 0
      },
      modalWindowName: '',
      settings: {}
    }
  },
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
  },
  methods: {
    clickOn(event, item) {
      console.log(event, item, this.showForm)
      if(this.showForm === item) {
        this.showForm = false
      } else {
        this.showForm = item
      }
      //
      // this.targetPosition.left = (event.target.offsetLeft - 102) + 'px'
      // this.targetPosition.top = (event.target.offsetTop + 24) + 'px'
      // console.log(this.targetPosition.left, this.targetPosition.top)
      this.$modal.show('add', {
       // header: 'Add My Cost',
        compName: "ChangeRow",
        category: this.categoryList
      })

    },
    onShown(settings) {
      this.modalWindowName = settings.name
      this.settings = settings.settings
    },
    onHide() {
      this.modalWindowName = ''
      this.settings = {}
    }
  },
  computed: {
    categoryList(){
      return this.$store.getters.getCategoryList
    }
  },
  mounted() {
    this.$modal.EventBus.$on('show', this.onShown)
    this.$modal.EventBus.$on('hide', this.onHide)
  }
}
</script>

<style scoped>
  /*.table {*/
  /*  width: 500px;*/
  /*  margin: 0 auto;*/
  /*}*/
  /*.table__heading {*/
  /*  display: flex;*/
  /*  border-bottom: 1px solid #c4c4c4;*/
  /*}*/
  /*.table__heading-text {*/
  /*  font-weight: 900;*/
  /*}*/
  .table__row {
    /*display: flex;*/
    border-bottom: 1px solid #c4c4c4;
    /*padding: 8px 0;*/
  }
  /*.table__btn {*/
  /*  margin: 0 0 0 auto;*/
  /*  display: inline-block;*/
  /*}*/
  /*.table__value {*/
  /*  margin: 0 16px;*/
  /*}*/
  /*.table__cell {*/
  /*  flex: 1;*/
  /*  position: relative;*/
  /*}*/
  /*.table__modal {*/
  /*  position: absolute;*/
  /*}*/
  /*.col {*/
  /*  !*padding: 12px 0;*!*/
  /*  position: relative;*/
  /*}*/
</style>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .30s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>