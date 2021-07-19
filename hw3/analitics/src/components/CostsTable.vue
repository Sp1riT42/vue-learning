<template>
  <div class="table">
    <v-row class="table__row">
        <v-col cols="1" class="font-weight-bold">#</v-col>
        <v-col cols="5" class="font-weight-bold">Date</v-col>
        <v-col cols="4" class="font-weight-bold">Category</v-col>
        <v-col cols="2" class="font-weight-bold">Value</v-col>
      </v-row>
        <v-row v-for="(item,idx) in paymentsList" :key="idx" class="table__row">
          <v-col cols="1">{{ (idx+1)+(currentPage-1)*maxItem }}</v-col>
          <v-col cols="5">{{item.date}}</v-col>
          <v-col cols="4">{{item.category}}</v-col>
          <v-col cols="2">
            <span class="table__value">{{item.value}}</span>
            <v-btn plain x-small class="table__btn float-right" @click="clickOn($event, item)">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <transition name="fade">

              <ModalWindow v-if="showForm === item" :settings="settings" :item="item" class="table__modal" @closeModal="showForm=''"/>
            </transition>
          </v-col>
      </v-row>
        <transition name="fade">
          <v-overlay :value="showForm"></v-overlay>
        </transition>
      </div>
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

      this.$modal.show('add', {
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
  .table__row {
    border-bottom: 1px solid #c4c4c4;
  }

</style>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .30s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>