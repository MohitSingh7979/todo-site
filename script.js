/* [task 1]  [] X */
/* [task 2]--------<strike>  [x] X */

const inputTaskElem = document.getElementById("add_task_input");
const addTaskBtn = document.getElementById("add_task_btn");
const taskList = document.getElementById("task_list");

/* 
function boxElem() {
  const boxElem = document.createElement("input");
  boxElem.type = "checkbox";
}

function xElem() {
  const xElem = document.createElement("input");
  xElem.type = "submit";
  xElem.value = "X";
  xElem.id = "x_btn";
}
 */
addTaskBtn.addEventListener("click", () => {
  const task = inputTaskElem.value;
  
  // boxElem();
  // xElem();

  
  const boxElem = document.createElement("input");
  boxElem.type = "checkbox";

  const xElem = document.createElement("input");
  xElem.type = "submit";
  xElem.value = "X";
  xElem.id = "x_btn";

  const liElem = document.createElement("li");
  liElem.textContent = task;

  taskList.appendChild(liElem);
  liElem.appendChild(boxElem);
  liElem.appendChild(xElem);
  // console.log('event');
});

