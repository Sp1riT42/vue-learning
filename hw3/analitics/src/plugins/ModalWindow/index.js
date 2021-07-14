//import Vue from "vue";

export default {
    install(Vue) {
        if(this.indtalled) {
            return
        }
        this.installed = true

        Vue.prototype.$modal = {
            EventBus: new Vue(),
            show(name, settings) {
                this.EventBus.$emit('show', {name, settings})
            },
            hide() {
                this.EventBus.$emit('hide')
            }
        }
    }
}