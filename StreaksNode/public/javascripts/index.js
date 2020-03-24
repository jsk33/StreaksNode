const newTargetForm = document.querySelector(".newTargetForm-js");
const newTargetNameTextField = newTargetForm.querySelector("#targetName");
const newTargetDescriptionTextField = newTargetForm.querySelector("#targetDescription");
const targetList = document.querySelector(".targetList-js");

function handleSubmit(event) {
    event.preventDefault();

    const newTargetName = newTargetNameTextField.value;
    const newTargetDescription = newTargetDescriptionTextField.value;


    // post to database
    const endpoint = "http://localhost:8000/api/targets";
    postData(endpoint, { name: newTargetName, description: newTargetDescription })
        .then((data) => {
            console.log(data); // JSON data parsed by 'response.json()' call
            targetList.innerHTML = '';
            fetchTargets();
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

function handleComplete(event) {
    console.log("This item is complete. The count will increment by 1.");

    // update the completed target item using its id and count
    const targetID = event.target.parentNode.id;
    const newCount = parseInt(event.target.parentNode.className) + 1;
    const endpoint = `http://localhost:8000/api/targets/${targetID}`;
    updateData(endpoint, [{ propName: "count", value: newCount }, { propName: "status", value: true }]).then((data) => {
        console.log(data);
        targetList.innerHTML = '';
        fetchTargets();
    });
}

async function updateData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function handleDelete(event) {
    console.log(event.target.parentNode);

    // delete the target item using its id
    const targetID = event.target.parentNode.id;
    const endpoint = `http://localhost:8000/api/targets/${targetID}`;
    
    deleteData(endpoint).then((data) => {
        console.log(data);
        targetList.innerHTML = '';
        fetchTargets();
    });
}

async function deleteData(url='') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function renderTargets(targets) {
    // create a new list item for each target and append to the list

    targets.forEach(target => {
        const listItem = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const completeBtn = document.createElement("button");
        const span = document.createElement("span");

        listItem.id = target._id;
        listItem.className = target.count;

        deleteBtn.innerText = "❌";
        deleteBtn.addEventListener("click", handleDelete);

        completeBtn.innerText = "✅"
        completeBtn.addEventListener("click", handleComplete);

        span.innerText = `name: ${target.name} \n description: ${target.description} \n count: ${target.count} \n`;

        listItem.appendChild(span);
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);

        targetList.appendChild(listItem);
    })
}

function fetchTargets() {
    let targets = [];
    
    fetch('http://localhost:8000/api/targets')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            targets = data;
            renderTargets(targets);
    });
}

function init() {
    newTargetForm.addEventListener("submit", handleSubmit);
    fetchTargets();
}

init();