export default class Calander {
    constructor({$target,today, dayList, monthList, todoList, onClick}) {

        this.today = today;
        this.dayList = dayList;
        this.monthList = monthList;
        this.todoList = todoList;
        this.onClick = onClick;

        this.section = document.createElement('section');
        this.section.className='calander';

        $target.appendChild(this.section);

        this.render();
    }


    prevMonth = (today) => {
        return new Date(today.getFullYear(), today.getMonth()-1,today.getDate());
    };

    nextMonth = (today) => {
        return new Date(today.getFullYear(), today.getMonth()+1,today.getDate());
    }


    makeCalanderHeader() {

        const title = document.createElement('div');
        title.className = 'calander-header';


        const prevButton = document.createElement('button');
        prevButton.setAttribute('type','button');
        const prevIcon = document.createElement('span');
        prevIcon.innerText = '<';
        prevButton.appendChild(prevIcon);

        const titleText = document.createElement('h2');
        titleText.innerText = this.monthList[this.today.getMonth()]+" "+ this.today.getFullYear();
       
        const nextButton = document.createElement('button');
        nextButton.setAttribute('type','button');
        const nextIcon = document.createElement('span');
        nextIcon.innerText = '>';
        nextButton.appendChild(nextIcon);   

        //Refactor
        prevButton.onclick =(e) => {
            this.today=this.prevMonth(this.today);
            this.render();
        }

        nextButton.onclick = (e) => {
            this.today=this.nextMonth(this.today);
            this.render();
        }
        //


        title.appendChild(prevButton);
        title.appendChild(titleText);
        title.appendChild(nextButton);
        return title;
    }
    
    makeCalander() {
         // Table Draw
         const table = document.createElement('table');
         const dayRow = document.createElement('tr');
         for(let day of this.dayList) {
 
             const curDay = day.substring(0,3);
             const curDayData = document.createElement('td');
             curDayData.textContent = curDay;

             if(curDay==='Sun') curDayData.className='sunday';
             else if(curDay==='Sat') curDayData.className='satday';

             dayRow.appendChild(curDayData);
         }
         table.appendChild(dayRow);
 
         let day;
         let firstDay = new Date(this.today.getFullYear(),this.today.getMonth(),1);
         let lastDay = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
         for(let i = 0;i <6; i++) {
             let tableRow = document.createElement('tr');
             for(let j = 0; j<7; j++) {
 
                 if(i===0&&!day && j=== firstDay.getDay()) {
                     day=1;
                 }
                 
                 let tableData = document.createElement('td');
                 if(!day){ 
                     tableRow.appendChild(tableData);
                 } else {

                    const theDay = new Date(this.today.getFullYear(), this.today.getMonth(), day);
                    const todo = this.todoList.find(element => {
                        console.log(+element.date=== +theDay);
                        return +element.date === +theDay
                    });

                     tableData.textContent = day;
                     tableRow.appendChild(tableData);
                     tableData.className='td-day';
                     tableData.addEventListener('click', e=>{this.onClick(theDay)});
                     if(todo!==undefined) tableData.style.backgroundColor = todo.todoColor;
                     day = (day === lastDay.getDate()? 0 : day+1);
                 }
                 
             }
             table.appendChild(tableRow);
         }
         return table;
    }

    render() {

        this.section.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'calander-wrapper';

        const calanderWrapper = document.createElement('div');
        calanderWrapper.className = 'calander-content-wrapper';

        const title = this.makeCalanderHeader();
        const table = this.makeCalander();
        calanderWrapper.appendChild(table);

        wrapper.appendChild(title);
        wrapper.appendChild(calanderWrapper);
        this.section.appendChild(wrapper);
    }
}