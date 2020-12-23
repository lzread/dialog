export default {

    dialogTemplate() {
        return `
        <div class="__dialog ${this.options.customClass}">
            <div class="__dialog-mask" ${this.options.closeOnClickModal ? 'data-dialog-action="close"' : ''} ${this.options.modal ? '' : 'style="display:none;"'}></div>
            <div class="__dialog-container ${this.options.fullscreen ? '__dialog-fullscreen' : ''}">
                <div class="__dialog-header">
                    <div class="__dialog-header-title"> ${this.options.title} </div>
                    <div data-role="button" class="__dialog-button" data-dialog-action="toogle" ${this.options.showToggle ? '' : 'style="display:none;"'}></div>
                    <div data-role="button" class="__dialog-button" data-dialog-action="close" ${this.options.showClose ? '' : 'style="display:none;"'}></div>
                </div>
                <div class="__dialog-body">
                    <div class="__dialog-body-inner">
                        ${this.options.body}
                    </div>
                </div>
                <div class="__dialog-footer">
                    <div class="__dialog-footer-inner">
                        <div data-role="button" class="__dialog-button" data-dialog-action="cancel"> ${this.options.cancelButtonText} </div>
                        <div data-role="button" class="__dialog-button" data-dialog-action="submit"> ${this.options.submitButtonText} </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

}
