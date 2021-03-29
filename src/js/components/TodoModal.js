export default class TodoModal {
    constructor ($target){
        //modal//
        this.isVisible = false;
        this.data = null;
        this.modalWrapper = document.createElement('div');
        this.modalWrapper.className = 'modal-wrapper';
        this.modalWrapper.classList.add('hidden');
        //

        $target.appendChild(this.modalWrapper);

        this.render();
    }

    toggleModal(){
        this.isVisible = !this.isVisible;
        
        const modal = document.querySelector('.modal-wrapper');
        modal.classList.toggle('hidden');
    }

    setState() {
        this.toggleModal();
        console.log(this.isVisible);
        this.render();
    }

    onClose() {
        this.toggleModal();
        this.data = null;
        this.modalWrapper.innerHTML = '';
    }

    render() {
        if(!this.isVisible) return;

        const overlay = document.createElement('div');
        overlay.className='overlay';

        const modalContents = document.createElement('section');
        modalContents.className = 'modal-contents';

        const modalHeader = document.createElement('header');
        modalHeader.className = 'modal-header';

        const modalTitle = document.createElement('p');
        modalTitle.className = 'modal-title';
        modalTitle.innerText = '일정등록';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerText = 'X';
        closeBtn.addEventListener('click',()=>{this.onClose()});


        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn); 


        modalContents.appendChild(modalHeader);
        
        this.modalWrapper.appendChild(overlay);
        this.modalWrapper.appendChild(modalContents);
    }
}