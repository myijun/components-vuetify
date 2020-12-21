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