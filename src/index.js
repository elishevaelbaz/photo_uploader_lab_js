const addPicButton = document.querySelector('#addPicButton')
addPicButton.addEventListener('click', openNewPicForm)
let formOpen = false

function openNewPicForm(){
    const newPicFormContainer = document.querySelector('#newPicFormContainer')
    if(formOpen){
        newPicFormContainer.style.height = '0px'
        newPicFormContainer.style.padding = '0px'
    }
    else{
        newPicFormContainer.style.height = '280px'
        newPicFormContainer.style.padding = '20px'
    }
    formOpen = !formOpen
}

//****Start coding below****//
// DOM elements
const photoContainer = document.querySelector("#photoContainer")
const newPicForm = document.querySelector("#newPicForm")
console.log(newPicForm)
// Event listeners

// add new photo 
newPicForm.addEventListener("submit", function(e){
    e.preventDefault()

    fetch("http://localhost:3000/photos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: e.target.name.value,
            photo_image_url: e.target.photo_image_url.value,
            owner: e.target.owner.value
        }),
    })
    .then(r => r.json())
    .then(renderOnePhoto)
})

// update - will do event delegation way
photoContainer.addEventListener("click", function(e){
    if (e.target.matches(".updateButton")){
        console.log(e.target)

        // show edit form and patch
    }
})

function deletePhoto(photoObj){
      
        fetch(`http://localhost:3000/photos/${photoObj.id}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(console.log)
}

// Render helpers
function renderOnePhoto(photoObj){
    const photoDiv = document.createElement("div")
    photoDiv.className = "photo"
    photoDiv.innerHTML += `<h3>${photoObj.name}</h3>
    <p>By ${photoObj.owner}</p>
    <img src="${photoObj.photo_image_url}">
    <button class="removeButton" data-id="${photoObj.id}">Remove</button>
    <button class="updateButton" >Update</button>`

    photoContainer.append(photoDiv)
    const removeButton = photoDiv.querySelector(".removeButton")
    // event listener to delete
    removeButton.addEventListener("click", function(e){
        photoDiv.remove()

        // optimistic rendering
        deletePhoto(photoObj)
    })
}
 // initialize

 fetch("http://localhost:3000/photos")
 .then(r => r.json())
 .then(photosArray => {
    photosArray.forEach(renderOnePhoto)
 })