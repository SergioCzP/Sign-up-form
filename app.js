"use strict";

const warningMessages = [
  "First Name cannot be empty",
  "Last Name cannot be empty",
  ["Looks like this is not an email", "email@example/com"],
  "Password cannot be empty",
];

const mailFormat =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

let inputs = [];
let inputsEmpty = [];
let inputsFill = [];

const form = document.querySelector(".form");

const getInputs = function () {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  inputs = [firstName, lastName, email, password];
  console.log(inputs);
  return inputs;
};

const isEmpty = function () {
  let empty = false;
  let input = inputs.find((input) => {
    return input.value.toLowerCase().trim() === "";
  });
  console.log(input);
  if (input !== undefined) {
    empty = input.value.toLowerCase().trim() === "" ? true : false;
  }
  return empty;
};

const isMailCorrect = function () {
  let mailCorrect = false;
  if (
    inputs[2].value.toLowerCase().trim() !== "" &&
    inputs[2].value.toLowerCase().trim().match(mailFormat)
  ) {
    console.log(inputs[2].value);
    mailCorrect = true;
  }
  return mailCorrect;
};

let checked = false;
const displayWarnings = function (empty, mailIncorrect) {
  // Display warning on inputs that are empty
  if (empty) {
    let indexes = [];
    let emptyInputs = inputs.filter((input, index) => {
      if (index !== 2 && input.value.toLowerCase().trim() === "") {
        indexes.push(index);
        return input.value.toLowerCase().trim() === "";
      }
    });
    console.log(emptyInputs);

    indexes.forEach((index) => {
      if (!inputs[index].classList.contains("warning")) {
        inputs[index].classList.add("warning");
        inputs[index].parentElement.insertAdjacentText(
          "beforeend",
          warningMessages[index]
        );
      }
    });
  }

  // Display warning if email incorrect
  if (mailIncorrect && !inputs[2].classList.contains("warning") && !checked) {
    checked = true;
    inputs[2].classList.add("warning");
    inputs[2].parentElement.insertAdjacentText(
      "beforeend",
      warningMessages[2][0]
    );
    inputs[2].setAttribute("placeholder", warningMessages[2][1]);
  } else if (checked && mailIncorrect) {
    inputs[2].classList.add("warning");
  }
};

const isValid = function () {
  let valid = true;
  let empty = false;
  let mailIncorrect = false;

  // Check inputsEmpty
  if (isEmpty()) {
    empty = true;
    valid = false;
  }

  // CheckEmail
  if (!isMailCorrect()) {
    mailIncorrect = true;
    valid = false;
  }

  if (empty || mailIncorrect) {
    displayWarnings(empty, mailIncorrect);
  }

  return valid;
};

getInputs();

form.addEventListener("submit", (e) => {
  if (isValid()) {
    form.submit();
    console.log("Form valid");
    return true;
  } else {
    console.log("Form no valid");
    e.preventDefault();
  }
});

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    input.classList.remove("warning");
  });
});
