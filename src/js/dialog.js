import DEFAULTS from './defaults';
import dialogTemplate from './template';
import render from './render';
import methods from './methods';
import events from './events';
import handlers from './handlers';
import {
    assign,
    isPlainObject
} from './utilities';
class Dialog {
    constructor(element, options = {}) {
        if (!element || element.nodeType !== 1) {
            throw new Error('The first argument is required and must be an element.');
        }
        this.element = element;
        this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
        this.init()
    }
    init() {
        const { element, options } = this;
        const isDiv = element.tagName.toLowerCase() === 'div';

        if (!isDiv) {
            throw new Error('The element must be div.');
        }

        this.bulid();

    }
    bulid() {

        const { element, options } = this;

        const template = document.createElement('div');

        options.body = element.innerHTML;

        element.parentNode.removeChild(element);

        template.innerHTML = this.dialogTemplate();

        const dialog = template.querySelector(`.__dialog`);
        const mask = template.querySelector(`.__dialog-mask`);
        const container = dialog.querySelector(`.__dialog-container`);
        const header = dialog.querySelector(`.__dialog-header`);
        const body = dialog.querySelector(`.__dialog-body-inner`);
        const footer = dialog.querySelector(`.__dialog-footer-inner`);
        const title = header.querySelector(`.__dialog-header-title`);
        const button = dialog.querySelectorAll(`.__dialog-button`);


        if (!options.footer) {
            footer.parentNode.removeChild(footer);
        }


        this.dialog = dialog;
        this.mask = mask;
        this.container = container;
        this.header = header;
        this.body = body;
        this.footer = footer;
        this.title = title;
        this.button = button;


        this.render();



        document.body.appendChild(dialog);

    }
}
assign(Dialog.prototype, render, methods, events, handlers, dialogTemplate);
export default Dialog;