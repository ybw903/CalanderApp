import Todo from "../models/Todo";

export default class TodoModal {
    
    constructor ({$target, todoList, calRender}){

        this.isVisible = false;
        this.date = null;
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
        this.date = theDay;
        this.render();
    }

    onClose() {
        this.toggleModal();
        this.date = null;
        this.modalWrapper.innerHTML = '';
    }

    onSave() {

        const todoName = document.querySelector('#todoName').value;
        const todo = document.querySelector('#todo').value;
        const todoColor = document.querySelector('#todoColorSelect').value;
        const date = this.date;

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
        
        const colors = ["#ddbdff","pink","#a4d3ee","#9fd6c2"];
        const times = Array.from({length:24}, (v,i) =>
             i<10?
            "0"+i+":00"
            : +i+":00"
        );

        const modalBody = document.createElement('div');

        const modaltodoRow1 = document.createElement('div');
        const todoNamelabel = document.createElement('label');
        todoNamelabel.innerText = '일정명';
        todoNamelabel.className = 'modal-label'
        const todoName = document.createElement('input');
        todoName.setAttribute('type','text');
        todoName.id = "todoName";
        modaltodoRow1.appendChild(todoNamelabel);
        modaltodoRow1.appendChild(todoName);
        
        const modaltodoRow2 = document.createElement('div');
        const todolabel = document.createElement('label');
        todolabel.innerText = '일정내용';
        todolabel.className = 'modal-label'
        const todo = document.createElement('textarea');
        todo.setAttribute('rows','4');
        todo.setAttribute('cols','50');
        todo.id = "todo";
        modaltodoRow2.appendChild(todolabel);
        modaltodoRow2.appendChild(todo);


        const modaltodoRow3 = document.createElement('div');
        const modaltodoRow3Title = document.createElement('p');
        modaltodoRow3Title.innerText="색상"
        const todoColorSelect = document.createElement('select');
        colors.map((color) => {
            const todoColor = document.createElement('option');
            todoColor.style.backgroundColor = color;
            todoColor.value = color;
            todoColorSelect.appendChild(todoColor);
        });
        todoColorSelect.id = "todoColorSelect";
        modaltodoRow3.appendChild(modaltodoRow3Title);
        modaltodoRow3.appendChild(todoColorSelect);
        
        const modaltodoRow4 = document.createElement('div');
        modaltodoRow4.className = "modal-timeWrapper"

        const todoStartTimeWrapper = document.createElement('div');
        todoStartTimeWrapper.className = "modal-time";
        const todoStartTimeTitle = document.createElement('p');
        todoStartTimeTitle.innerText="시작시간"
        const todoStartTime = document.createElement('select');
        times.map((time) => {
            const todoTime = document.createElement('option');
            todoTime.value = time;
            todoTime.innerText=time;
            todoStartTime.appendChild(todoTime);
        });
        todoStartTimeWrapper.appendChild(todoStartTimeTitle);
        todoStartTimeWrapper.appendChild(todoStartTime);

        const todoEndTimeWrapper = document.createElement('div');
        todoEndTimeWrapper.className = "modal-time";
        const todoEndTimeTitle = document.createElement('p');
        todoEndTimeTitle.innerText="종료시간" 
        const todoEndTime = document.createElement('select');
        times.map((time) => {
            const todoTime = document.createElement('option');
            todoTime.value = time;
            todoTime.innerText=time;
            todoEndTime.appendChild(todoTime);
        });
        todoEndTimeWrapper.appendChild(todoEndTimeTitle);
        todoEndTimeWrapper.appendChild(todoEndTime);

        modaltodoRow4.appendChild(todoStartTimeWrapper);
        modaltodoRow4.appendChild(todoEndTimeWrapper);

        modalBody.appendChild(modaltodoRow1);
        modalBody.appendChild(modaltodoRow2);
        modalBody.appendChild(modaltodoRow3);
        modalBody.appendChild(modaltodoRow4);

        return modalBody;
    }

    makeModalFooter() {
        const modalFooter = document.createElement('div');
        modalFooter.style.display='flex';
        modalFooter.style.justifyContent = 'flex-end';

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