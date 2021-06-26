<template>
  <div>
    <input type="number" v-model.number="operand1" placeholder="operand1">
    <input type="number" v-model.number="operand2" placeholder="operand2">
    = {{result}}
    <div class="keyboard">
      <button @click="sumOperands">+</button>
      <button @click="minusOperands">-</button>
      <button @click="deleteOperands">/</button>
      <button @click="multiplicationOperands">*</button>
      <button @click="powOperands">pow</button>
      <button @click="truncOperand">trunc</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0
    }
  },
  methods: {
    sumOperands() {
      this.result = this.operand1 + this.operand2
    },
    minusOperands() {
      this.result = this.operand1 - this.operand2
    },
    powOperands() {
      this.result = Math.pow(this.operand1, this.operand2)
    },
    deleteOperands() {
      this.result = this.operand1 / this.operand2
    },
    multiplicationOperands() {
      this.result = this.operand1 * this.operand2
    },
    truncOperand() {
      this.result = Math.trunc(this.operand1 / this.operand2)
    }
  }
}
</script>

<style scoped>

</style>