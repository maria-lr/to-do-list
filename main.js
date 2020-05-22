let todos = [
  // {
  //   id: 1,
  //   title: 'Buy Milk',
  //   description: 'I need to buy milk from the store',
  //   completed: false
  // },
  // {
  //   id: 2,
  //   title: 'Buy Eggs',
  //   description: 'I need to buy eggs from the store',
  //   completed: false
  // },
  // {
  //   id: 3,
  //   title: 'Learn to backflip',
  //   description: 'I need to practice my backflip for the backflip competition',
  //   completed: true
  // },
  // {
  //   id: 4,
  //   title: 'Take nap',
  //   description: 'I am sleepy and need to take a nap',
  //   completed: false
  // },
  // {
  //   id: 5,
  //   title: 'Pet my cat',
  //   description: 'My cat is in need of physical affection',
  //   completed: true
  // },
  // {
  //   id: 6,
  //   title: 'Turn into beeping bingus',
  //   description: 'This is required for the transformation to complete',
  //   completed: true
  // },
  // {
  //   id: 7,
  //   title: 'Turn is an incredibly long title used to check and see if your code can handle a very long title on one of your todo items this is just a test ask tumpus he will tell you that this is a test haha here it goes',
  //   description: 'lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha ',
  //   completed: true
  // },
  // {
  //   id: 8,
  //   title: 'Turn into beeping bingus',
  //   description: 'This is required for the transformation to complete',
  //   completed: true
  // },
  // {
  //   id: 9,
  //   title: 'Turn is an incredibly long title used to check and see if your code can handle',
  //   description: 'lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha ',
  //   completed: false
  // }
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
      // console.log('I ran')
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

  let newToDoCard = $('<div></div>').addClass('row todo-card col-md-5').attr('id', `card-${todo.id}`)

  let toDoTitle = $('<h3></h3>').addClass('to-do-title').text(todo.title);
  newToDoCard.append(toDoTitle);

  let toDoBody = $('<p></p>').addClass('to-do-body').text(todo.description);
  newToDoCard.append(toDoBody);

  let trash = $('<i></i>').addClass('fas fa-trash-alt');
  newToDoCard.append(trash)

  let check = $('<i></i>').addClass('fas fa-check');
  newToDoCard.append(check)

  if (todo.completed === true) {
    check.css('color', 'rgba(0, 0, 0, 0.3)');
    toDoTitle.css('color', 'rgba(0, 0, 0, 0.3)');
    toDoBody.css('color', 'rgba(0, 0, 0, 0.3)');
  }

  check.click(function (event) {

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
    // console.log(todo.id);
    todo.deleted = true;

    if (todo.deleted === true) {
      $(`#card-${todo.id}`).remove();
      // $('.todo-card').fadeOut(400)
    }

    function isNotDeleted(value) {
      console.log('What is the value variable in my isNotDeleted', value);
      return (value.deleted === false);
    }

    todos = todos.filter(isNotDeleted);
    console.log('new array', todos)
    replaceToDos();
  });
}
// $(this).parent().empty();




$('.add').click(function () {

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

  document.getElementById('type-field-title').value = ''
  document.getElementById('type-field-body').value = ''
  // console.log(localStorage);
});

console.log(todos);