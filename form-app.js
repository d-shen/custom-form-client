const fileFormDOM = document.querySelector(".file-form");
const formContainerDOM = document.querySelector(".form-container");
const submittedContainerDOM = document.querySelector(".submitted-container");

const nameInputDOM = document.querySelector("#name");
const emailInputDOM = document.querySelector("#email");
const textInputDOM = document.querySelector("#message");

const getRadioValue = (name) => {
  const elements = document.getElementsByName(name);
  for (i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      return elements[i].value;
    }
  }
};

const getCheckedName = () => {
  const checked = document.querySelectorAll("input[type=checkbox]:checked");
  let checkedArray = [];
  for (i = 0; i < checked.length; i++) {
    checkedArray.push(checked[i].name);
  }
  return checkedArray.toString();
};

const showHide = (element) => {
  if (element.style.display == "none") {
    element.style.display = "";
  } else {
    element.style.display = "none";
  }
};

fileFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const emailValue = emailInputDOM.value;
  const itemName = getCheckedName();
  const peopleValue = getRadioValue("people");
  const budgetValue = getRadioValue("budget");
  const textValue = textInputDOM.value;

  try {
    const product = {
      name: nameValue,
      email: emailValue,
      item: itemName,
      people: peopleValue,
      budget: budgetValue,
      text: textValue,
    };

    await sendEmail(product);
  } catch (error) {
    console.log(error);
  }
  showHide(formContainerDOM);
  showHide(submittedContainerDOM);
});

const sendEmail = async (data) => {
  axios
    .post(
      "https://rococo-narwhal-7be1c3.netlify.app/.netlify/functions/sendmail",
      JSON.stringify(data)
    )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

// const testInputDOM = document.querySelector(".test-btn");
// testInputDOM.addEventListener("click", async (e) => {
//   axios
//     .post(
//       "https://rococo-narwhal-7be1c3.netlify.app/.netlify/functions/sendmail",
//       JSON.stringify({ name: "hello" })
//     )
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));
// });
