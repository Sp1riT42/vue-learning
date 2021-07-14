<template>
  <div class="modal">
    Modal Window
    <button v-if="settings.compName === 'ChangeRow'" @click="showChangeForm = !showChangeForm">Редактировать</button>
<!--    {{item}}-->

    <component v-if="showChangeForm" :is="settings.compName" :categoryList="settings.category" :item="item"/>
    <button v-if="settings.compName === 'ChangeRow'" @click="deleteRow">Удалить</button>
  </div>
</template>

<script>
import ChangeRow from "@/components/ChangeRow";
export default {
  name: "ModalWindow",
  components: {
    ChangeRow
  },
  data() {
    return {
      showChangeForm: false
    }
  },
  props: {
    settings: {
      type: Object
    },
    item: {
      type: Object
    }
  },
  methods: {
    deleteRow() {
      this.$store.dispatch('deleteRow', [this.item])
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
    display: flex;
    flex-direction: column;
    z-index: 999;
  }
</style>