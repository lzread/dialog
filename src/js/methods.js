import { forEach, addClass, removeClass, getData } from "./utilities";
export default {
    show() {
        this.dialog.style.display = 'block'
        this.isShow = true;
        this.bind();
        this.render();
        if (this.options.fullscreen) {
            this.fullscreen();
        }
    },
    hide() {
        this.dialog.style.display = 'none'
        this.isShow = false;
        this.unbind();
        this.reset();
    },
    min() {
        this.render();
    },
    max() {
        const { container } = this;
        container.style.left = 0;
        container.style.top = 0;
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.maxHeight = '';
    },
    fullscreen() {
        const { button } = this;
        this.max();
        forEach(button, function (e, i) {
            if (getData(e, 'dialog-action') == 'toogle') {
                addClass(e, 'isActive');
            }
        });
    },
    reset() {
        const { button } = this;
        forEach(button, function (e, i) {
            removeClass(e, 'isActive');
        });
        this.render();
    }
}