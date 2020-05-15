// const $ = require('jquery');

const todos = [
  {
    id: 1,
    title: 'Buy Milk',
    description: 'I need to buy milk from the store',
    completed: false
  },
  {
    id: 2,
    title: 'Buy Eggs',
    description: 'I need to buy eggs from the store',
    completed: false
  },
  {
    id: 3,
    title: 'Learn to backflip',
    description: 'I need to practice my backflip for the backflip competition',
    completed: true
  },
  {
    id: 4,
    title: 'Take nap',
    description: 'I am sleepy and need to take a nap',
    completed: false
  }, {
    id: 5,
    title: 'Pet my cat',
    description: 'My cat is in need of physical affection',
    completed: true
  }
]

todos.forEach(function (todo) {
  console.log('I ran')
  createToDoCard(todo);
})

function createToDoCard(todo) {
  let newToDoCard = $('<div></div>').addClass('todo-card');
  // let newToDoCard = document.createElement("div");
  // newToDoCard.classList.add('todo-card');

  let toDoTitle = $('<h3></h3>').addClass('to-do-title').text(todo.title);
  newToDoCard.append(toDoTitle);
  // let toDoTitle = document.createElement("h3");
  // toDoTitle.innerText = todo.title;
  // toDoTitle.classList.add('to-do-title')
  // newToDoCard.appendChild(toDoTitle);

  let toDoBody = $('<p></p>').addClass('to-do-body').text(todo.description);
  newToDoCard.append(toDoBody);
  // let toDoBody = document.createElement("p");
  // toDoBody.classList.add('to-do-body');
  // toDoBody.innerText = todo.description;
  // newToDoCard.appendChild(toDoBody);

  // let check = document.createElement("i");
  // check.classList.add('fas');
  // check.classList.add('fa-check');
  // newToDoCard.appendChild(check);

  let check = $('<i></i>').addClass('fas fa-check');
  newToDoCard.append(check)

  $('.each-card').append(newToDoCard);
}
