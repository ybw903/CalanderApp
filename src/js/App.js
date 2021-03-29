import Calander from "./components/Calander";
import Header from "./components/Header";
import TodoModal from "./components/TodoModal";

export default class App {


    constructor($target) {

        const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
        const monthList = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
        const todoList = [];

        const today = new Date();
        const header = new Header($target);
        const calander = new Calander({$target,today, dayList, monthList, todoList,
             onClick: (day)=>{todoModal.setState(day)}}); //TODO : Type
        const todoModal = new TodoModal({$target,todoList,calRender: ()=>{calander.render()}});
    }


}