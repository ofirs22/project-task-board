/******************************************** Globals ********************************************/
//the main array of tasks
var tasksArray = [];
//main users array

//variable that gives us a unique id for the tasks
var taskCount = 0;
//variable that gives us a unique id for the users
var userCount= 0;

class User{
    uId;
    uName;

    constructor(userId, userName){
        this.uId = userId;
        this.uName = userName;
    }
} 
var userArray = [new User(1,'Ofir'), new User(2, 'Tom'), new User(3,'Matan'), new User(4,'David')];

/******************************************** properties ********************************************/
class Tasks {
    id ;
    title ;
    dateCreated;
    timeCreated;
    dueDate;
    dueTime;
    createdBy;
    priority;
    additionalInfo;
    rawDate;
    status;
    noteButtons;
    //constructor function
    constructor(tTitle, tDueDate, tCreatedBy, tPriority, tAdditionalInfo){
        this.id = ++taskCount;
        this.title = tTitle;
        this.dateCreated = getCurrentDate().date;
        this.timeCreated = getCurrentDate().time;
        this.rawDate = tDueDate;
        this.createdBy = tCreatedBy;
        this.priority = tPriority;
        this.additionalInfo = tAdditionalInfo;
        this.status = 'active';
    
        
        this.addTask();
    }
    /******************************************** Class Tasks methods ********************************************/
    addTask(){
        this.dueDate = parseDateAndTime(this.rawDate).date;
        this.dueTime = parseDateAndTime(this.rawDate).time;
        tasksArray.push(this);
        this.getNoteButtons();
        displayAlltasks('active');
    }
    restoreTask(){
        this.status = 'active';
        this.getNoteButtons();
        displayAlltasks('active')
    }

    changeTaskStatus(status){
        this.status = status;
        this.getNoteButtons();
        // localStorage.setItem('tasksArray', JSON.stringify(tasksArray))
    }
    addToDone(){
        this.changeTaskStatus('done');
        displayAlltasks('done');
    }
    getNoteButtons(){
        let i = this.getTaskIndexById();
        switch (this.status) {
            case 'active':
                this.noteButtons = `<button onclick = "tasksArray[${i}].addToDone()" class = "btn btn-success btn-sm" 
                style = "font-family:Cambria, Cochin, Georgia, Times, sTimes New Roman, serif;">Mark as done</button>`;
                break;
            case 'trash':
                this.noteButtons = `<button onclick = "tasksArray[${i}].restoreTask()" class = "btn btn-success btn-sm" 
                style = "margin-right: 10px;font-family:Cambria, Cochin, Georgia, Times, Times New Roman">Restore task</button>
                <button onclick = tasksArray[${i}].eraseFromArray(${this.id}) style = "font-family:Cambria, Cochin, Georgia,s Times, 'Times New Roman', serif;"
                class = "btn btn-danger btn-sm">remove permanentely</button>`;
                break;
            case 'done':
                this.noteButtons = '';
                break;
            case 'overdue':
                this.noteButtons = `
                <input id = "changeDue" type="datetime-local" required>
                <button onclick = "tasksArray[${i}].changeDueDate(changeDue.value)" 
                style = "font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;" class = "btn btn-warning btn-sm">Change due date</button>
                <button onclick = "tasksArray[${i}].addToDone()" class = "btn btn-success btn-sm" 
                style = "font-family:Cambria, Cochin, Georgia, Times, sTimes New Roman, serif;">Mark as done</button>`;
                break;
        
            default:
                break;
        }
    }

    eraseFromArray(){
        tasksArray.splice(this.getTaskIndexById(), 1);
        displayAlltasks('active');
    }

    getTaskIndexById(){
        for(let i = 0;i < tasksArray.length ; i++){
            if(this.id == tasksArray[i].id){
                return i;
            }   
        }
        return (-1);
    }

    addNote(i){
        removeFadeIn();
        let remove;
        //remove the 'X' from the note when the status is 'trash'
        this.status == 'trash' ? remove = '' : remove = `<span id = "removeNote" onclick = "tasksArray[${i}].removeTask(${this.id})" class = "fa fa-remove float-right fa-3x remove-task" style = "color:red;"></span>`;
        notes.innerHTML += `
                <div class="col col-12 col-lg-4 task-note fadeIn inner-note">
                ${remove}
                    <div >
                        <p style = "font-size: 20px; text-align: center;text-decoration: underline;"><strong>Task title : ${this.title}</strong></p>
                        <p style = "font-size: 16px; text-align: left; overflow-x: hidden;">date created : ${this.dateCreated}</p>
                        <p style = "font-weight: bold;font-size: 16px; text-align: left;">due date : ${this.dueDate}</p>
                        <p style = "font-size: 16px; text-align: left;">due time : ${this.dueTime}</p>
                        <p style = "font-size: 16px; text-align: left;">Created by : ${this.createdBy}</p>
                        <p style = "font-size: 16px; text-align: left;">Priority : ${this.priority}</p>
                        <p style = "font-size: 16px; text-align: left;">Info : ${this.additionalInfo}</p>
                        <p style = "font-size: 16px; text-align: left;">Status : ${this.status}</p>
                        ${this.noteButtons}
                    </div><hr>
                    <p style = "font-size: 16px; text-align: left;"><strong>${this.dateCreated}  ${this.timeCreated}</strong></p>
                </div>`;
    }

    changeDueDate(dueDate){
        if(!validateDueDate(dueDate, new Date())){
            alert('date is in the past, please provide a future date');
        
        }else if((dueDate == 'undefined')|| (dueDate == '')){
            alert('Please enter a valid date');
        }else{
            let newDueDate = parseDateAndTime(dueDate);
            this.dueDate = newDueDate.date;
            this.dueTime = newDueDate.time;
            this.rawDate = dueDate;
            this.changeTaskStatus('active');
            displayAlltasks(this.status);
        }
        
        
        
    }
    
    addToTrash(){
        this.status = 'trash';
        this.getNoteButtons();
        
    }

    removeTask(taskId){
        if(confirm('Are you sure you want to delete the task?')){
            let i = this.getTaskIndexById(taskId);
            if(i > -1){
                this.addToTrash()
                notes.innerHTML ='';
                displayAlltasks('trash');
            }
        }
        
    }

};


/******************************************** functions ********************************************/
//on submitting the form, this function is being called and create a new Tasks object
function createTask(tTitle, tDueDate, tCreatedBy, tPriority, tAdditionalInfo){
    if(!validateDueDate(tDueDate, new Date())){
        alert('Date is in the past, please enter a future date');
    }else{
        task = new Tasks(tTitle, tDueDate, tCreatedBy, tPriority, tAdditionalInfo);
    }
    
}

function displayTasksByUser(user){
        
}
//push date and time of creation into object fields
function getCurrentDate(){
    let d = new Date();
    return {date : d.toLocaleDateString("he-IL"), time : d.toLocaleTimeString("he-IL")};
}

//validate that due date is in the future
function validateDueDate(dueDate,dateToCheck){
    cDate = new Date(dateToCheck);
    const rDate = new Date(dueDate);
    if(rDate.setHours(0,0,0,0) < cDate.setHours(0,0,0,0)){
        return false;
    }
    return true;
}
//create a human readable date
function parseDateAndTime(dateTimeStr){
    let d = new Date(dateTimeStr);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours()
    let minute = d.getMinutes()
    return {date : `${day}.${month}.${year}`, time : `${hour}:${minute}`,rawDate: d};
}
// main function that display the notes on board , being called on every change made
function displayAlltasks(status = 'active'){
    notesHeading.innerHTML = `<h1>${status} Tasks</h1>`;
    notes.innerHTML = '';
    
    tasksArray.forEach((task,index) => {
        if(status == 'active'){
            if(!validateDueDate(task.rawDate,new Date())){
                task.changeTaskStatus('overdue');
            }
        }
        if(status == task.status){
            task.addNote(index);
        }
    });
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

}
//make sure only the last note will have fade in animation
function removeFadeIn(){
    childList = notes.childNodes;
    childList.forEach(child => {
        if(child.nodeName == 'DIV'){
            child.classList.remove('fadeIn');
        }
    })
}

function loadFromLS(){
    //get the data from local storage on page load to a temp array
    tempArray = JSON.parse(localStorage.getItem('tasksArray'));
    if(tempArray){
        tempArray.forEach((task,index) => {
            //recreate the tasks objects and push them to the main tasks array
            createTask(task.title,task.rawDate,task.createdBy,task.priority,task.additionalInfo);
            //get the original creation date and status
            tasksArray[index].dateCreated = task.dateCreated;
            tasksArray[index].timeCreated = task.timeCreated;
            tasksArray[index].status = task.status;
            tasksArray[index].noteButtons = task.noteButtons;
        })
        displayAlltasks();
    }
}


        function createUserSelect(){
            let options = '';
            userArray.forEach(user => {
                options += `<option selected value="${user.uName}">${user.uName}</option>`
            });
            return options;
        }
        function createForm(){
            //access an iframe div by its ID
            const innerDoc = formFrame.contentDocument || formFrame.contentWindow.document;
            //get the div into a var
            const form = innerDoc.getElementById('mainForm');
            
            form.innerHTML = `<form onsubmit="parent.createTask(inputTitle.value,inputDue.value,selectCreated.value,selectPriority.value,tAreaFreeText.value)">
            <div class="row align-items-center" style = "margin-top: 5%; margin-bottom: 5%;">
                <div class="col">
                    <div class="input-group input-group mb-3">
                        <label for="inputTitle" class = "form-labels"><h3>Task title: </h3></label>
                        <input id = "inputTitle" type="text" class="form-control" 
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group input-group mb-3">
                        <label for="inputDue" class = "form-labels"><h3>Due date:</h3></label>
                        <input id = "inputDue" type="datetime-local" class="form-control" 
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                    </div>
                </div>
            </div>
            <div class="row align-items-center" style = "margin-top: 5%; margin-bottom: 5%;">
                <div class="col">
                    <div class="input-group input-group mb-3-lg">
                        <label for="selectCreated" class = "formLabels"><h3>Created by : </h3></label><br>
                        <select id = "selectCreated" type="text" class="form-control" 
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                        ${createUserSelect()}
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group input-group mb-3-lg">
                        <label for="selectPriority" class = "formLabels"><h3>priority: </h3></label><br>
                        <select class="custom-select" id="selectPriority">
                            <option selected value="1">low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row align-items-center" style = "margin-top: 5%; margin-bottom: 5%;">
                <div class="col">
                    <div class="input-group input-group mb-3-lg">
                        <label for="tAreaFreeText" class = "formLabels"><h3>additional Info: </h3></label>
                        <textarea id = "tAreaFreeText" type="text" class="form-control" 
                        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></textarea>
                    </div>
                </div>
            </div>
            <hr>
            <div>
                <input type="submit" class = "btn btn-success btn-lg" value = "Add task"></button>
                <button type="reset" class = "btn btn-primary btn-lg">Reset fields</button>
            </div>
        </form>
        </div>`;
    }

