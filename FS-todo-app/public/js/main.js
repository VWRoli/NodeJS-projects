"use strict";
//VARIABLES
const addTodoForm = document.querySelector(".add-todo-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");

//Handle submitting the form
const handleSubmit = (e) => {
  e.preventDefault();

  //Get input values
  const title = titleInput.value;
  const description = descriptionInput.value;

  console.log(title, description);

  console.log("form submitted");

  //Clear fields
  titleInput.value = "";
  descriptionInput.value = "";
};

addTodoForm.addEventListener("submit", handleSubmit);
