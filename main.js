let todos = [

]

const localStorage = window.localStorage;
// localStorage.clear();
const storedTodos = localStorage.getItem('localTodos');
console.log('stored', storedTodos)
function todosInLocal() {

  // check if local storage has to do data
  // if the local todos array is anything but true, do nothing (start with an empty to do list)
  if (!storedTodos) {
    return;
  } else {
    const parsedData = JSON.parse(storedTodos)
    // grab data from local storage and inject into todos array 

    todos = parsedData
    console.log('parsed data', parsedData)
    todos.forEach(function (todo) {
      createToDoCard(todo);
    })
  }
}

todosInLocal();

function replaceToDos() {

  // replace the local storage with the current todo array
  localStorage.setItem('localTodos', JSON.stringify(todos));
}


function createToDoCard(todo) {

  //Create & style div (card) where the objects' data will be displayed. Give the div an id of "card-id#"(from the objects in the array). This allows you to grab/connect to the specific div you want to interact with when you click the trash can button and lets you remove the card display in the trash click event handler.
  let newToDoCard = $('<div></div>').addClass('row todo-card col-md-5').attr('id', `card-${todo.id}`)

  let toDoTitle = $('<h3></h3>').addClass('to-do-title').text(todo.title);
  newToDoCard.append(toDoTitle);

  let toDoBody = $('<p></p>').addClass('to-do-body').text(todo.description);
  newToDoCard.append(toDoBody);

  let trash = $('<i></i>').addClass('fas fa-trash-alt');
  newToDoCard.append(trash)

  let check = $('<i></i>').addClass('fas fa-check');
  newToDoCard.append(check)

  // If the todo check has been clicked, it will change to true. If that happens, grey out everything in the card.
  if (todo.completed === true) {
    check.css('color', 'rgba(0, 0, 0, 0.3)');
    toDoTitle.css('color', 'rgba(0, 0, 0, 0.3)');
    toDoBody.css('color', 'rgba(0, 0, 0, 0.3)');
  }

  check.click(function (event) {
    // If the color of the check is grey when clicked, change the completed status from true to false, and change the color of everything on the card to black. Then replace the array with the changed completed status.
    if ($(this).css('color') == 'rgba(0, 0, 0, 0.3)') {
      todo.completed = false;

      $(this).delay(800).css('color', 'black');
      toDoTitle.delay(800).css('color', 'black');
      toDoBody.delay(800).css('color', 'black');

      replaceToDos();
      return;

    }
    todo.completed = true;
    $(this).delay(800).css('color', 'rgba(0, 0, 0, 0.3)');
    toDoTitle.delay(800).css('color', 'rgba(0, 0, 0, 0.3)');
    toDoBody.delay(800).css('color', 'rgba(0, 0, 0, 0.3)');

    replaceToDos();


  });

  $('.cards-c').append(newToDoCard);
  replaceToDos();


  trash.click(function (event) {

    // As soon as the trash can is clicked, change the todo's deleted status to true.
    todo.deleted = true;

    // If the deleted status is true, remove the card display.
    if (todo.deleted === true) {
      $(`#card-${todo.id}`).remove();
    }

    // Functions used in filters should return a boolean. If the boolean, in this case (value.deleted === false) is true for the item in the array it is checking, that item will be kept in the array. If it is false, that item will be filtered out of the array. This function runs for each item in the array.
    function isNotDeleted(value) {
      console.log('value is:', value)
      return (value.deleted === false);
    }

    // Filter out the objects where the value.deleted = true from the todos array. Filters are just like For each, except it is checking if you should keep the item in the array.
    todos = todos.filter(isNotDeleted);
    console.log('new array', todos)
    replaceToDos();
  });
}

// Can trigger the add button with the Enter key. Trigger button on enter code from w3Schools:https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

// Execute a function when the user releases a key on the keyboard
document.getElementById('type-field-body').addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    $('.add').click();
  }
});

// When the add button is clicked...
$('.add').click(function () {
  let title = document.getElementById('type-field-title')
  let body = document.getElementById('type-field-body')

  // Replace the body and title values with the same value minus any line breaks. This was necessary because the add button trigger would add a line break, making the body not empty.
  const bodyCheck = body.value.replace(/(\r\n|\n|\r)/gm, "");
  const titleCheck = title.value.replace(/(\r\n|\n|\r)/gm, "");

  // If the title and body check are anything but true, do not allow anything else to happen. (If the title and body are empty, do not allow the card to be added.)
  if (!titleCheck && !bodyCheck) {
    return;
  }

  // take all the items of the new todo and place them in the corresponding items of the card todos

  // link the new fields to the todo objects

  // create a new object with the new info that was typed into the "add a to do" fields. generate an id using the array length and make the default completed status false. grab the title and description from the corresponding fields in the html doc.
  let todoObject = {
    id: todos.length + 1,
    title: $('#type-field-title').val(),
    description: $('#type-field-body').val(),
    completed: false,
    deleted: false,
  };
  // console.log('deleted?', todoObject.deleted)
  // add id class 
  // $('<div></div>').addClass('card' + todoObject.id);

  // append the new to do object to the end of the todos array
  todos.push(todoObject)

  // run the replace function for local storage
  replaceToDos();


  // create a todo card for that new to do
  createToDoCard(todoObject);

  // Once the to do card has been created, empty the title and body fields.
  title.value = '';
  body.value = '';
});

console.log(todos);