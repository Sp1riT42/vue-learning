<template>
  <div>
    <input type="number" v-model.number="operand1" placeholder="operand1" name="operand1">
    <input type="number" v-model.number="operand2" placeholder="operand2" name="operand2">
    <div v-show="!error">результат = {{result}}</div>
    <div v-show="error" :class="'err'">{{error}}</div>
    <div class="keyboard">
<!--      <button @click="sumOperands">+</button>
      <button @click="minusOperands">-</button>
      <button @click="deleteOperands">/</button>
      <button @click="multiplicationOperands">*</button>
      <button @click="powOperands">pow</button>
      <button @click="truncOperand">trunc</button>-->
      <button
          v-for="operation in operations"
          :key="operation"
          @click="calculate(operation)" :name="operation">
        {{ operation }}
      </button>
      <div class="key" v-show="showKey">
        <div>
          <div>
            <label for="operand1">operand 1</label>
            <input type="radio" id="operand1" name="operand" v-model="pickedOperand" value="operand1">
          </div>
          <div>
            <label for="operand2">operand 2</label>
            <input type="radio" id="operand2" name="operand" v-model="pickedOperand" value="operand2">
          </div>
        </div>
        <div>
          <button
              v-for="keyBtn in arrKeys"
              :key="keyBtn"
              :class="'key-btn'"
              @click="pressKeyBtn(keyBtn, pickedOperand)"
              :name="keyBtn"
          >
            {{ keyBtn }}
          </button>
        </div>

      </div>
      <div>
        <label for="show-keyboard">show keyboard</label>
        <input type="checkbox" v-model="showKey" value="Show keyboard" id="show-keyboard">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      operand1: '0',
      operand2: '0',
      result: 0,
      operations: ['+','-','/','*','pow','trunc'],
      error: '',
      arrKeys: ['1','2','3','4','5','6','7','8','9','0','del'],
      showKey: 'true',
      pickedOperand: 'operand1'
    }
  },
  methods: {
    pressKeyBtn(val, opr) {
      if(val !== 'del') {
        this[opr] += val
      } else {
        this[opr]  = this[opr].toString().slice(0, -1)
      }
    },
    calculate(operation = '+') {
      this.error = ''
      this.operand1 = +this.operand1
      this.operand2 = +this.operand2
      switch (operation) {
        case "+":
          this.sumOperands()
          break
        case "-":
          this.minusOperands()
          break
        case "/":
          this.deleteOperands()
          break
        case "*":
          this.multiplicationOperands()
          break
        case "pow":
          this.powOperands()
          break
        case "trunc":
          this.truncOperand()
          break
      }
    },
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
      if(this.operand2 === 0) {
        this.error = 'на ноль делить нельзя'
      } else {
        this.result = this.operand1 / this.operand2
      }

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
.err {
  color: red;
}
.key {
  width: 166px;
  margin: 16px auto 0;
}
.key-btn {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  margin: 0 8px 8px 0;
}
.key-btn:nth-child(3n){
margin: 0;
}
</style>