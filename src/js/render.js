export default {
    render() {

        const { options, container } = this;

        let width, height;



        if (options.width.includes("px")) {

            container.style.width = options.width;

            width = options.width.replace("px", "");

            container.style.left = ((window.innerWidth / 2) - (width / 2)) + 'px';

        } else if (options.width.includes("%")) {

            container.style.width = options.width;

            width = options.width.replace("%", "");

            container.style.left = (width / 2) + '%';

        } else {

            width = options.width;

            container.style.width = options.width + 'px';

            container.style.left = ((window.innerWidth / 2) - (width / 2)) + 'px';

        }


        if (options.height.includes("px")) {

            container.style.height = options.height;

            height = options.height.replace("px", "");

            container.style.top = ((window.innerHeight / 2) - (height / 2)) + 'px';

        } else if (options.height.includes("%")) {

            container.style.height = options.height;

            height = options.height.replace("%", "");

            container.style.top = (height / 2) + '%';

        } else if (options.height.includes("auto")) {

           
            container.style.maxHeight = '80%';
            container.style.height = "auto";
            container.style.top = '10%';

            

        } else {

            height = options.height;

            container.style.height = options.height + 'px';

            container.style.top = ((window.innerHeight / 2) - (height / 2)) + 'px';

        }

    }
};
