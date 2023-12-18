const firebaseConfig = {
  apiKey: "AIzaSyBz__bOCZ7WHwn9ZSjc8JRHN4enx3lokRM",
  authDomain: "todo-a-a8ced.firebaseapp.com",
  databaseURL: "https://todo-a-a8ced-default-rtdb.firebaseio.com",
  projectId: "todo-a-a8ced",
  storageBucket: "todo-a-a8ced.appspot.com",
  messagingSenderId: "905351468195",
  appId: "1:905351468195:web:58994c75ab333a67ccdb16",
};

const frb = firebase.initializeApp(firebaseConfig);

console.log(frb.database);

firebase
  .database()
  .ref("todos")
  .on("child_added", (data) => {
    // console.log(data.val().value);
    var liElement = document.createElement("li");
    var liText = document.createTextNode(data.val().value);

    // console.log(liElement);
    // console.log(liText);

    liElement.appendChild(liText);

    console.log(liElement);

    var list = document.getElementById("list");

    list.appendChild(liElement);

    // deleteButton

    var delbtn = document.createElement("button");

    var delbtnText = document.createTextNode("delete");

    delbtn.appendChild(delbtnText);

    delbtn.setAttribute("id",data.val().key)

    delbtn.setAttribute("onclick", "deleteItem(this)");

    liElement.appendChild(delbtn);

    // editButton

    var editbtn = document.createElement("button");
    var editbtnText = document.createTextNode("edit");

    editbtn.appendChild(editbtnText);

    liElement.appendChild(editbtn);

    editbtn.setAttribute("onclick", "editItem(this)");

    editbtn.setAttribute("id",data.val().key)
  });

// console.log(key);
function addTodo() {
  var input = document.getElementById("inputfeild");

  // console.log(input.value);

  var key = firebase.database().ref("todos").push().key;

  let obj = {
    value: input.value,
    key: key,
  };

  firebase.database().ref("todos").child(key).set(obj);
}

function deleteAll() {
  var list = document.getElementById("list");

  list.innerHTML = "";
}

function deleteItem(a) {
  a.parentNode.remove();
console.log(a.id);

firebase.database().ref("todos").child(a.id).remove()
}
function editItem(e) {
//   var val = e.parentNode.firstChild.nodeValue

  var userInput = prompt("enter updated value ");


  var editTodo ={
    value : userInput,
    key : e.id
  }
  firebase.database().ref("todos").child(e.id).set(editTodo)

  e.parentNode.firstChild.nodeValue = userInput;
}
