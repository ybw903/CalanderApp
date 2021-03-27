export default class Header {
    constructor($target){

        this.section = document.createElement('section');
        this.section.className='header';

        $target.appendChild(this.section);

        this.render();
    }

    render() {
        this.section.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'header-wrapper';

        const title = document.createElement('div');
        title.className = 'title';
        
        const titleText = document.createElement('span');

        titleText.innerText = "Calander App"

        title.appendChild(titleText);
        wrapper.appendChild(title);
        this.section.appendChild(wrapper);
    }
}