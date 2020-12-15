// import layerVue from './layer.vue';

// let layerCore = (function (Vue, globalOption = {

// }) {
//     let NotificationConstructor = Vue.extend(layerVue);
//     let self = {};
//     let seed = 0;
//     self.instancesVue = [];
//     self.instances = {};
//     self.open = function (options) {
//         let id = `notification_${new Date().getTime()}_${seed++}`;
//         console.log(layerVue, globalOption, options);
//         let instance = new NotificationConstructor({
//             data: function () {
//                 return {
//                     dark: false
//                 }
//             }
//         });
//         instance.vm = instance.$mount();
//         self.instancesVue[id] = {
//             'mask': '',
//             'main': instance.vm,
//             'iframe': '',
//         }
//         document.body.appendChild(instance.vm.$el);
//     }

//     return self;
// });
// export default layerCore;


import sweetalert from 'sweetalert';



const xConfirm = (text = "一旦删除，您将无法恢复这条记录!", title = "确定要进行本操作?") => {
    return sweetalert({
        title: title,
        text: text,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
}

const xSuccess = (text = "操作成功", info = "") => {
    sweetalert(text, info, 'success');
}

const xError = (text = "操作失败", info = "") => {
    sweetalert(text, info, 'error');
}

export { xConfirm, xSuccess, xError } 