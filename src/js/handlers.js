import {
    addClass,
    removeClass,
    hasClass,
    getData
} from './utilities';

export default {
    click(event) {

        const { target } = event;
        const { options } = this;
        const action = getData(target, 'dialog-action');

        switch (action) {
            case 'toogle':
                if (hasClass(target, 'isActive')) {
                    removeClass(target, 'isActive');
                    this.min();
                } else {
                    addClass(target, 'isActive');
                    this.max();
                }

                break;
            case 'close':
                if (options.beforeClose(this)) {
                    this.hide();
                }

                break;
            case 'cancel':
                if (options.cancelCallBack(this)) {
                    this.hide();
                }

                break;

            case 'submit':
                if (options.submitCallBack(this)) {
                    this.hide();
                }

                break;

            default: ;
        }

    },

    dblclick(event) {

        event.preventDefault();

    },

    mousedown(event) {

        event.preventDefault();

        const { container } = this;

        this.clientX = event.clientX - container.offsetLeft;
        this.clientY = event.clientY - container.offsetTop;

        this.drag = true;

        return false;

    },

    mousemove(event) {

        event.preventDefault();

        if (!this.drag) {
            return;
        }

        const { container } = this;

        let x = event.clientX - this.clientX;
        let y = event.clientY - this.clientY;

        if (x < 0) {
            x = 0;
        } else if (x > document.documentElement.clientWidth - container.offsetWidth) {
            x = document.documentElement.clientWidth - container.offsetWidth;
        }

        if (y < 0) {
            y = 0;
        } else if (y > document.documentElement.clientHeight - container.offsetHeight) {
            y = document.documentElement.clientHeight - container.offsetHeight;
        }

        container.style.left = x + "px";
        container.style.top = y + "px";

        return false;

    },

    mouseup(event) {

        event.preventDefault();

        this.drag = false;

    },

    resize() {

        this.render();

    },
};
