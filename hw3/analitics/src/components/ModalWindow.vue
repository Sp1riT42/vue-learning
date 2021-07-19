<template>
  <div class="modal">
    <v-container>
      <v-row>
          <v-btn class="float-right" absolute right v-if="settings.compName === 'ChangeRow'" @click="closeModal" icon><v-icon>mdi-close</v-icon></v-btn>
        <v-col cols="12" >
          <v-btn class="d-block mx-auto" v-if="settings.compName === 'ChangeRow'" @click="showChangeForm = !showChangeForm">Редактировать</v-btn>
          <component v-if="showChangeForm" :is="settings.compName" :categoryList="settings.category" :item="item"/>
        </v-col>
        <v-col cols="12">
          <v-btn class="d-block mx-auto"  v-if="settings.compName === 'ChangeRow'" @click="deleteRow">Удалить</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
    },
    closeModal() {
      this.$emit('closeModal', false)
    }
  }
}
</script>

<style scoped>
  .modal {
    position: absolute;
    width: 300px;
    background-color: #fff;
    border: 1px solid #c4c4c4;
    padding: 8px;
    box-shadow: 0px 6px 8px;
    display: flex;
    flex-direction: column;
    z-index: 999;
  }
</style>