# Project task board
# Functionality
    this task system includes a form which you can add tasks on notes.
    it has task title input field, due date and time input field, created by select box (every registered user get in to that list automatically, at the moment users are hard coded), all those 3 fields are required, there are 2 more fields: 
    priority select box with 3 levels: low, medium and high, and the last field is additional info, which the user can tell more about the task.
    there are 2 buttons- add task, which adds the task to the main tasks array and as a note on the screen,
    and reset fields which clears the input fields.
    before we add a task we make sure the date is in the future and only then we push the task into the array.
    every new task gets active status when its initially created.
    every task status has its own buttons because the actions are different on every status,
    active status has only 1 button 'mark as done', which moves the the task to the done list,
    done tasks has no buttons (since the task is already done and there is not much to do),
    trash tasks are tasks that were erased with the 'X' and got sent to the recycle bin, those tasks has 2 buttons- restore task (which send the task back to active) and remove permanently (which erase it from the array).
    the last status is overdue, this status is for tasks that their due date passed , those tasks has 2 buttons and date picker to change the due date or mark it as done.
    to view task by its status we have 4 buttons (1 for each status).
# Pages
-   index.html - this page displays the form.html page (which has the add new task form) in an iframe.
    it also display the active notes in a cards at the bottom in 4 columns, filled from left to right

-   form.html - add new note form, has 2 centered columns with all the details needed to initialize a new object from class note

# Main functions
-   addNewTask(title(str), dueDate(str), createdBy(int userId), priority(str), freeText(str)) - on form submission, 
    all data from the input boxes sent to this function, create a new instance of class task and pushes it to the main array

-   changeTaskStatus(task object, status) - receives task object and status, change the task status to the given status.
    if the status given is 'on board' we remove it from the trash array and push it to the main array (active tasks),
    if the status given is 'trash' we remove it from main array and push it to the trash array.
    after its done we refresh the task notes and update the local storage corresponding line.

-   removeTask(task object) - removes the task permanently from the system.
    its only done on tasks from the trash (not active tasks).
    after done, update the local storage corresponding line.

-   displayTasks(taskArray = mainArray) - receives a task array (if the function does not receive parameter, the main array is the default) 

# Helper functions
    loadFromLS - gets no parameter and returns nothithing and is being called on body load.
    this function loads all the data saved in local storage into a temp array, creates the Task objects and push them into the main array.
    this way we get all the data from the previous instance.

    removeFadeIn - this function gets no arguments and returns nothing.
    the purpose of this function is to make sure only the last note is being animated.
    it removes the fadeIn class from all the notes previously created before a new note is being writen.

    displayAlltasks - gets 1 argument for the status to display(or none, it has a default argument 'active').
    runs in a loop and call addNote method to display all the notes with the given status.
    this function is being called with every change, so its a perfect place to save the changes to local storage.

     parseDateAndTime - gets a raw date as argument and returns an object includes both the formatted date and formatted time.

     validateDueDate - gets 2 arguments for the date we want to validate and a date to check against and makes sure the date we are checking is greater than the date we are checking against.

     getCurrentDate - gets no arguments and returns an object with both date and time formatted to local timezone

     createTask - when pressing the add task button, this function is being called and validate the date is legal and instanciate a new Task object with fields in case the date field is valid (alert notification otherwise) and push it to the main array.
# Classes fields and methods
class Tasks - do all the work and save all the properties around the tasks entered
Fields - 
    id - the task's unique ID
    title - the task title, gets it from user's input
    dateCreated - the date of task's creation - we use it at the bottom of the page
    timeCreated - the time of task's creation - we use it at the bottom of the page
    dueDate - get it from the user's input.
    dueTime - get it from user's input.
    createdBy - the name of the person who created the task.
    priority - drop down, options are: low, medium and high.
    additionalInfo - gets it from user's input.
    rawDate - save the raw due date for parsing.
    status - starts as 'active' and can be changed to 'done', 'trash' and 'overdue'
    noteButtons - each status has its own buttons on the note.

addtask() - 
    parse the raw date and time and assign it to the class properties, push the newly created object to the tasks array, gets the note buttons by status and display everything to the screen.
    being called from the constructor and after loading from local storage.

changeTaskStatus(status) - 
    gets the status and change it in the given task (this), after that send it to get a new buttons code by the new status.

addToDone() - 
    when marking a task as done, change the task status and display all done tasks

getNoteButtons() - 
    each status has different buttons on it , this method gives the task new buttons codes by status and set the object properties.

eraseFromArray() -
    erase task by its id and display the tasks.

getTaskIndexById() - 
    helper method that returns the index of a task in the array by task id

addNote(i) - 
    the method that adds the notes div to the screen

changeDueDate(dueDate) - 
    gets the new due date validate that its in the future and change the object date and time properties

addToTrash() - 
    change the status to trash (move to recycle bin) and get the note buttons for trash status

removeTask(taskId) - 
removes the task from the recycle bin completly (gets it out of the array)
 

# Globals and data structures
    tasksArray - the main array of tasks
    userArray - main users array
    taskCount - variable that gives us a unique id for the tasks
    userCount - variable that gives us a unique id for the users

