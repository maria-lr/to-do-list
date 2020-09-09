let todos = [];
const localStorage = window.localStorage;
const storedTodos = localStorage.getItem('localTodos');

// NOTES: Function unnecessary. Should use functions for longer sections of code you'll use again.


// If a user already has todo items from an earlier session,
// set them locally and generate todo cards
// NOTES: Only checks for existing todos. If not, do nothing is implied.
if (storedTodos) {

  // NOTES: No need to create another variable for parsed data Looks cleaner w/o & only used once anyway.
  todos = JSON.parse(storedTodos);

  if (todos.length) {
    todos.forEach(function (todo, index) {
      // const isEven = (index % 2) == 0;
      createToDoCard(todo /*, isEven*/);
    });
    handleFlexHack(todos.length);
  } else {
    console.log("else fired!!!")
    showEmptyMessage();
  }

}

// Create or remove ghost element when needed to ensure new cards are created on the left and not the center
function handleFlexHack(length) {
  const isMobileView = window.innerWidth <= 830;

  // Bail out early and do nothing if in mobile view
  if (isMobileView) return;

  const shouldCreateGhostCard = (length % 2) === 1;

  if (shouldCreateGhostCard) {
    const ghostCard = $('<div></div>')
      .addClass('ghost-card')

    $('.cards-c').append(ghostCard);
  }
  else {
    $('.ghost-card').remove()
  }
}

function showEmptyMessage() {
  $('.cards-c').css('height', '70vh').css('justify-content', 'center');
  let taskMessage = $('<h3>Your task cards will appear here.</h3>')
    .addClass('task-message')

  $('.cards-c').append(taskMessage);
}

// Replace localStorage with todo array
function replaceToDos() {
  localStorage.setItem('localTodos', JSON.stringify(todos));
}

// Create new todo card UI
function createToDoCard(todo /*, hasBorder = false */) {

  // Create card
  // NOTES: Use below format if 2 or more properties && if keeping as one line is wider than the other code.
  let newToDoCard = $('<div></div>')
    .addClass('todo-card')
    .attr('id', `card-${todo.id}`);

  // Create task
  let task = $('<p></p>')
    .addClass('task-text')
    .text(todo.description);

  // Create trash and check buttons
  let trash = $('<i></i>')
    .addClass('fas fa-trash-alt');
  let check = $('<i></i>')
    .addClass('fas fa-check');

  // Append title, body, and buttons to card
  newToDoCard.append(task);
  newToDoCard.append(trash);
  newToDoCard.append(check);

  // If todo is already marked as completed, grey it out
  if (todo.completed) {
    check.css('color', 'rgba(0, 0, 0, 0.3)');
    task.css('color', 'rgba(0, 0, 0, 0.3)');
  }

  // Add check mark click handler
  check.click(function (event) {

    // If todo is marked as completed when you click, mark it as incomplete and update styling
    // NOTES: Faster to check if the existing value (completed===false) is true than to check for color. 
    if (todo.completed) {

      // Update CSS
      $(this).delay(800).css('color', 'black');
      task.delay(800).css('color', 'black');
      // $(this).hover(function () {
      //   const isBlack = $(this).css('color') === 'rgb(0, 0, 0)';
      //   if (!isBlack) {
      //     console.log('seting black')
      //     $(this).css('color', '#00a24f');
      //   } else {
      //     console.log('setting grey')
      //     $(this).css('color', '#000');
      //   }

      // })

      // Mark incomplete and update local storage
      todo.completed = false;
      return replaceToDos();
    }

    // Otherwise, mark it as completed and update styling
    $(this).delay(800).css('color', 'rgba(0, 0, 0, 0.3)');
    task.delay(800).css('color', 'rgba(0, 0, 0, 0.3)');

    // Mark complete and update local storage
    todo.completed = true;
    return replaceToDos();
  });

  // Add trash button click handler
  trash.click(function (event) {

    // Mark complete and remove card from DOM
    // NOTES: Don't need if statement, since after below, deleted is always true.
    todo.deleted = true;
    $(`#card-${todo.id}`).remove();

    // Filter deleted todos out of our todo array
    // NOTES: Function unnecessary. todo.deleted is already a boolean & can be used inside the (anonymous) function. 
    todos = todos.filter(function (thisTodo) {
      return !thisTodo.deleted;
    });


    handleFlexHack(todos.length)

    if (!todos.length) {
      showEmptyMessage();
    }

    // Update local storage with newly update todo array
    return replaceToDos();
  });

  // console.log('For a card, what is hasBorder', hasBorder)
  // if (hasBorder) {
  //   // add a right border to the card
  //   $(newToDoCard).css('border-right', '1px solid rgba(0, 0, 0, 0.3)')
  // }

  // Append todo card to DOM and update local storage
  $('.cards-c').append(newToDoCard);

  return replaceToDos();
}

// Can trigger the add button with the Enter key
// Code from: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
document.getElementById('type-field-text').addEventListener("keyup", function (event) {

  // Number 13 is the "Enter" key on the keyboard

  if (event.keyCode === 13 && event.shiftKey) {
    // $('.todo-card').html("<br><br>");
    $('textarea').autoResize({
      animate: {
        enabled: true,
        duration: 'fast',
        // complete: function() {
        //     // Do something
        // },
        // step: function(now, fx) {
        //     // Do something else
        // }
      },
      maxHeight: '500px'
    });
  }

  if (event.keyCode === 13 && !event.shiftKey) {

    // Cancel the default action, if needed
    event.preventDefault();

    // Trigger the button element with a click via Jquery
    $('.add-button').click();
  }
});

// Add click handler to add button
$('.add-button').click(function () {
  if (todos.length === 0) {
    $('.task-message').remove();
    $('.cards-c').css('height', '100%')
    // .css('display', 'flex')
    // .css('flexwrap', 'wrap')
    // .css('justify-content', 'flex-start')
  }

  // Grab title and description input values
  // NOTES: Change DOM reference to jquery.
  // let titleValue = $('#type-field-title').val();
  let taskValue = $('.add-task').val();

  // Replace the body and title values with the same value minus any line breaks
  const taskCheck = taskValue.replace(/(\r\n|\n|\r)/gm, "");
  // const titleCheck = titleValue.replace(/(\r\n|\n|\r)/gm, "");

  // If you're missing a title or a value (excluding line breaks), bail out
  if (!taskCheck) {
    return;
  }

  // Create new todo and add to array 
  const todoObject = {
    id: todos.length + 1,
    // title: $('#type-field-title').val(),
    description: $('.add-task').val(),
    completed: false,
    deleted: false,
  };
  todos.push(todoObject)

  // Update local storage 
  replaceToDos();

  // check if the card you are creating is even or odd, then pass that
  // bool as second arg to createToDoCard
  // hint: check the length of the existing cards array

  // const isCardIAmGoingToCreateEven = ((todos.length + 1) % 2) == 0;


  // Create new todo card in DOM
  createToDoCard(todoObject /*, isCardIAmGoingToCreateEven */);
  handleFlexHack(todos.length);
  // Clear title and description input with jquery
  // NOTES: Change to jquery.
  $('.add-task').val('')
});

// invert check mark color
// preserve line breaks <br> insert