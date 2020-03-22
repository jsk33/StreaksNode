const newTargetForm = document.querySelector(".newTargetForm-js");
const newTargetNameTextField = newTargetForm.querySelector("#targetName");
const newTargetDescriptionTextField = newTargetForm.querySelector("#targetDescription");
const targetList = document.querySelector(".targetList-js");

function handleSubmit(event) {
    event.preventDefault();

    const newTargetName = newTargetNameTextField.value;
    const newTargetDescription = newTargetDescriptionTextField.value;


    // post to database
    const endpoint = "https://streaks.azurewebsites.net/api/targets";
    postData(endpoint, { name: newTargetName, description: newTargetDescription })
        .then((data) => {
            console.log(data); // JSON data parsed by 'response.json()' call
        }
    );

    newTargetNameTextField.value = '';
    newTargetDescriptionTextField.value = '';
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function renderTargets() {
    fetch('https://streaks.azurewebsites.net/api/targets')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
    });
}

function init() {
    newTargetForm.addEventListener("submit", handleSubmit);
    renderTargets();
}

init();