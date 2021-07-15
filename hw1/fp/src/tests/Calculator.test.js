import {mount} from "@vue/test-utils";
import Calculator from "../components/Calculator";

describe('Calculator', () => {
    test('Test operand1 input value', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('1')

        expect(wrapper.vm.operand1).toBe(1)
    })

    test('Test operand2 input value', async () => {
        const wrapper = mount(Calculator)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        expect(wrapper.vm.operand2).toBe(2)
    })

    test('Test sum operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name = "+"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(4)
    })

    test('Test minus operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name = "-"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(0)
    })

    test('Test pow operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name = "pow"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(4)
    })

    test('Test delete operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name = "/"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(1)
    })

    test('Test delete operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('0')

        const sumOperationButton = wrapper.find('button[name = "/"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.error).toBe('на ноль делить нельзя')
    })

    test('Test multiplication operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('2')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name = "*"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(4)
    })

    test('Test trunc operand1 and operand 2', async () => {
        const wrapper = mount(Calculator)

        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue('3')

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue('2')

        const sumOperationButton = wrapper.find('button[name = "trunc"]')
        sumOperationButton.trigger('click')

        expect(wrapper.vm.result).toBe(1)
    })
    test('Test press key in KeyBoard and set value operand1', async () => {
        const wrapper = mount(Calculator)


        for(let i = 0; i < wrapper.vm.arrKeys.length; i++) {
            let operationButton = wrapper.find(`button[name = "${wrapper.vm.arrKeys[i]}"]`)
            operationButton.trigger('click')
        }


        expect(wrapper.vm.operand1).toBe('0123456789')
    })
})