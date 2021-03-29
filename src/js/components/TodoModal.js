import Todo from "../models/Todo";

export default class TodoModal {
    constructor ({$target, todoList, calRender}){

        this.isVisible = false;
        this.data = null;
        this.todoList = todoList;
        this.calRender= calRender;

        this.modalWrapper = document.createElement('div');
        this.modalWrapper.className = 'modal-wrapper';
        this.modalWrapper.classList.add('hidden');

        $target.appendChild(this.modalWrapper);

        this.render();
    }

    toggleModal(){
        this.isVisible = !this.isVisible;
        
        const modal = document.querySelector('.modal-wrapper');
        modal.classList.toggle('hidden');
    }

    setState(theDay) {
        this.toggleModal();
        this.data = theDay;
        this.render();
    }

    onClose() {
        this.toggleModal();
        this.data = null;
        this.modalWrapper.innerHTML = '';
    }

    onSave() {

        const todoName = document.querySelector('#todoName').value;
        const todo = document.querySelector('#todo').value;
        const todoColor = document.querySelector('#todoColor').value;
        const date = this.data;

        const newTodo = new Todo({todoName,todo,todoColor,date});
        this.todoList.push(newTodo);
        this.calRender();
        this.onClose();
    }

    makeModalHeader() {
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

        return modalHeader;
    }

    makeModalBody() {
        const modalBody = document.createElement('div');

        const modaltodoRow1 = document.createElement('div');
        const todoNamelabel = document.createElement('label');
        todoNamelabel.innerText = '일정명';
        const todoName = document.createElement('input');
        todoName.setAttribute('type','text');
        todoName.id = "todoName";
        modaltodoRow1.appendChild(todoNamelabel);
        modaltodoRow1.appendChild(todoName);
        
        const modaltodoRow2 = document.createElement('div');
        const todolabel = document.createElement('label');
        todolabel.innerText = '일정내용';
        const todo = document.createElement('textarea');
        todo.setAttribute('rows','4');
        todo.setAttribute('cols','50');
        todo.id = "todo";
        modaltodoRow2.appendChild(todolabel);
        modaltodoRow2.appendChild(todo);

        const modaltodoRow3 = document.createElement('div');
        const todoColorLabel = document.createElement('label');
        todoColorLabel.innerText = '컬러';
        const todoColor = document.createElement('input');
        todoColor.setAttribute('type','text');
        todoColor.id = "todoColor";
        modaltodoRow3.appendChild(todoColorLabel);
        modaltodoRow3.appendChild(todoColor);

        modalBody.appendChild(modaltodoRow1);
        modalBody.appendChild(modaltodoRow2);
        modalBody.appendChild(modaltodoRow3);

        return modalBody;
    }

    makeModalFooter() {
        const modalFooter = document.createElement('div');

        const cancelButton = document.createElement('button');
        cancelButton.setAttribute('type','button');
        cancelButton.innerText='취소';
        cancelButton.addEventListener('click', ()=>{this.onClose()});

        const saveButton = document.createElement('button');
        cancelButton.setAttribute('type','button');
        saveButton.innerText='저장';
        saveButton.addEventListener('click', ()=>{this.onSave()});

        modalFooter.appendChild(cancelButton);
        modalFooter.appendChild(saveButton);

        return modalFooter;
    }

    render() {
        if(!this.isVisible) return;

        const overlay = document.createElement('div');
        overlay.className='overlay';

        const modalContents = document.createElement('section');
        modalContents.className = 'modal-contents';

        modalContents.appendChild(this.makeModalHeader());
        modalContents.appendChild(this.makeModalBody());
        modalContents.appendChild(this.makeModalFooter());
        
        this.modalWrapper.appendChild(overlay);
        this.modalWrapper.appendChild(modalContents);
    }
}