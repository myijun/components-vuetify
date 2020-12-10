import layerVue from './layer.vue';

let layerCore = (function (Vue, globalOption = {

}) {
    let NotificationConstructor = Vue.extend(layerVue);
    let self = {};
    let seed = 0;
    self.instancesVue = [];
    self.instances = {};
    self.open = function (options) {
        let id = `notification_${new Date().getTime()}_${seed++}`;
        console.log(layerVue, globalOption, options);
        let instance = new NotificationConstructor({
            data: function () {
                return {
                    dark: false
                }
            }
        });
        instance.vm = instance.$mount();
        self.instancesVue[id] = {
            'mask': '',
            'main': instance.vm,
            'iframe': '',
        }
        document.body.appendChild(instance.vm.$el);
    }

    return self;
});
export default layerCore;