//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');


//eventListener
document.addEventListener('DOMContentLoaded',displayTodo)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//functions

function addTodo(event){
    //prevent reloading form after submmiting
    event.preventDefault();
    //create new div for todo item
    const newDiv = document.createElement('div');
    // add class to the new div
    newDiv.classList.add('todo');
    //create li item element
    const newli = document.createElement('li');
    newli.classList.add('todo-item');
    newli.innerText=todoInput.value;
    //append li into the newDiv
    newDiv.appendChild(newli);
    //add todo into local storage
    TodoLocalStorage(todoInput.value);
    //create button for check
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-button');
    newDiv.appendChild(checkButton);
    //create button for delete
    const checkDelete = document.createElement('button');
    checkDelete.innerHTML = '<i class="fas fa-trash"></i>';
    checkDelete.classList.add('delete-button');
    newDiv.appendChild(checkDelete);
    //append entire newDiv into the todo-list
    todoList.appendChild(newDiv);
    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    
    const deleteItem = e.target;

    if(deleteItem.classList[0]==='delete-button')
    {
        const todoItem = deleteItem.parentElement;
        //add animation here
        todoItem.classList.add('fall');
        localStorageUpdate(todoItem);
        //remove item
        todoItem.addEventListener('transitionend',function(){
            todoItem.remove();
            
        })

    }

    if(deleteItem.classList[0]==='check-button')
    {
        const todoItem = deleteItem.parentElement;
        todoItem.classList.toggle('completed')
    }
}

function filterTodo(e){
    const filters = todoList.childNodes;
    filters.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display="flex";
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;

        }
    })
}

function TodoLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function displayTodo(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        //create new div for todo item
    const newDiv = document.createElement('div');
    // add class to the new div
    newDiv.classList.add('todo');
    //create li item element
    const newli = document.createElement('li');
    newli.classList.add('todo-item');
    newli.innerText=todo;
    //append li into the newDiv
    newDiv.appendChild(newli);
    //add todo into local storage
    TodoLocalStorage(todoInput.value);
    //create button for check
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-button');
    newDiv.appendChild(checkButton);
    //create button for delete
    const checkDelete = document.createElement('button');
    checkDelete.innerHTML = '<i class="fas fa-trash"></i>';
    checkDelete.classList.add('delete-button');
    newDiv.appendChild(checkDelete);
    //append entire newDiv into the todo-list
    todoList.appendChild(newDiv);
    })
}

function localStorageUpdate(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todo.children[0].innerText)
    const itemIndex = todo.children[0].innerText;
   //console.log(itemIndex);
    todos.splice(todos.indexOf(itemIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}