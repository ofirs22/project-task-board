# Project task board

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

# Classes and fields

# Globals and dta structures

