import {
    addListener,
    removeListener,
} from './utilities';
export default {
    bind() {
        const { options, dialog, mask, header } = this;

        addListener(dialog, 'click', (this.onClick = this.click.bind(this)));

        addListener(window, 'resize', (this.onResize = this.resize.bind(this)));

        if (options.drag) {
            addListener(header, 'mousedown', (this.onmousedown = this.mousedown.bind(this)));
            addListener(document, 'mousemove', (this.onmousemove = this.mousemove.bind(this)));
            addListener(document, 'mouseup', (this.onmouseup = this.mouseup.bind(this)));
        }

    },
    unbind() {
        const { options, dialog, header } = this;
        removeListener(dialog, 'click', this.onClick);
        removeListener(window, 'resize', this.onResize);
        if (options.drag) {
            removeListener(header, 'mousedown', this.onmousedown);
            removeListener(document, 'mousemove', this.onmousemove);
            removeListener(document, 'mouseup', this.onmouseup);
        }
    }
}