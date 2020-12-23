export default {

    title: '提示',

    width: '500px',

    height: 'auto',

    fullscreen: false,

    customClass: '',

    showClose: true,

    showToggle: false,

    modal: true,

    drag: false,

    closeOnClickModal: false,

    footer: true,

    cancelButtonText: "取消",

    submitButtonText: "确定",

    cancelCallBack: function (element) {

        return true;
    },

    submitCallBack: function (element) {

        return true;
    },

    beforeClose: function (element) {

        return true;

    }

}   