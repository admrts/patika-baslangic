// $('.toast').toast(option)
const input = document.getElementById("task");
const addBtn = document.getElementsByClassName("button");
const myUl = document.getElementById("list");
const secondBody = document.querySelector(".secondBody");
const clearBtn = document.getElementById("ClearBtn");

eventListener();
function eventListener() {
  secondBody.addEventListener("click", deleteTodo); // delete icon works
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI); // when pade loaded add the todos.
  clearBtn.addEventListener("click", cleaAllTodos);
  secondBody.addEventListener("click", ToggleChecked);
}

function ToggleChecked(event) {
  if (
    event.target.className ===
    "d-flex align-items-center d-flex justify-content-between"
  ) {
    event.target.className = "checked";
  }
}

function cleaAllTodos(e) {
  if (confirm("Hepsini silmek istediğinizden emin  misiniz?")) {
    while (myUl.firstElementChild != null) {
      myUl.removeChild(myUl.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

function deleteTodo(e) {
  if (e.target.className === "close") {
    e.target.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.textContent);
  }
}

function deleteTodoFromStorage(deleteTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function newElement(e) {
  const newTodo = input.value.trim();

  if (newTodo === "") {
    let myAlert = document.querySelectorAll("#liveToast")[1];
    let bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
    showAlert("danger", "Lütfen bir Todo giriniz!");
  } else {
    addTodoToStorage(newTodo);

    addTodoUI(newTodo);

    let myAlert = document.querySelectorAll("#liveToast")[0];
    let bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
    showAlert("success", "Todo Eklendi!");
  }

  e.preventDefault();
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  secondBody.appendChild(alert);
  // window.onload(alert)
  setTimeout(function () {
    alert.remove();
  }, 4200);
}

// create a new Todo
function addTodoUI(newTodo) {
  // create a new <li>
  const listItem = document.createElement("li");
  // for delete icon
  const mySpan = document.createElement("span");
  // listItem Class added
  listItem.className =
    "d-flex align-items-center d-flex justify-content-between";
  mySpan.innerHTML = "x";
  mySpan.className = "close";
  // create a new TextNode under the <li> by using input.value
  listItem.appendChild(document.createTextNode(newTodo));
  // add the delete icon under listItem
  listItem.appendChild(mySpan);
  // append that created new <li> into the <ul>
  myUl.append(listItem);
  // myUl.innerHTML +=  newTodo    // `<li>  ${newTodo}  </li>`
  // to clear input area after submit
  input.value = "";
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
// add Todos to Localstorage
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
