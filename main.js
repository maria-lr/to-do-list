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
  },
  {
    id: 5,
    title: 'Pet my cat',
    description: 'My cat is in need of physical affection',
    completed: true
  },
  {
    id: 6,
    title: 'Turn into beeping bingus',
    description: 'This is required for the transformation to complete',
    completed: true
  },
  {
    id: 7,
    title: 'Turn is an incredibly long title used to check and see if your code can handle a very long title on one of your todo items this is just a test ask tumpus he will tell you that this is a test haha here it goes',
    description: 'lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha lorem ipsum dol amet test test haha ',
    completed: true
  }
]

todos.forEach(function (todo) {
  console.log('I ran')
  createToDoCard(todo);
})

function createToDoCard(todo) {
  let newToDoCard = $('<div></div>').addClass('todo-card col-md-5');
  // <div class='col-md-1 col-md-1 col-md-1'></div>

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


  check.click(function () {

    if ($(this).css('color') == 'rgba(0, 0, 0, 0.3)') {

      $(this).delay(800).css('color', 'black');
      toDoTitle.delay(800).css('color', 'black');
      toDoBody.delay(800).css('color', 'black');

      return;
    }

    $(this).delay(800).css('color', 'rgba(0, 0, 0, 0.3)');
    toDoTitle.delay(800).css('color', 'rgba(0, 0, 0, 0.3)');
    toDoBody.delay(800).css('color', 'rgba(0, 0, 0, 0.3)');


  });

  $('.each-card').append(newToDoCard);
}

