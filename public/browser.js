//Insert Without Full page Reload
function templateIt(item)
{
  return ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button data-id='${item._id}' class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button data-id='${item._id}' class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
}
let ourHTML=items.map(function(element)
{
  return templateIt(element);
}).join('')
document.getElementById('item-list').insertAdjacentHTML("beforeend",ourHTML)

let inputVal=document.getElementById("toDo");
let displayArea=document.getElementsByClassName("list-group");
document.getElementById("my-form").addEventListener("submit",function(e)
{
  e.preventDefault();
  axios.post('/create-item', {text: inputVal.value}).then(function (response) {
    document.getElementById("item-list").insertAdjacentHTML('beforeend',templateIt(response.data))
  }).catch(function() {
    console.log("Please try again later.")
  })
})

// Update Feature
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("edit-me")) {
      let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
      if (userInput) {
        axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {
          e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
        }).catch(function() {
          console.log("Please try again later.")
        })
      }
    }
  })
  // Delete Feature
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-me")) {
      let userInput = prompt("Are you sure that you want to Delete?")
      if (userInput) {
        axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function () {
          e.target.parentElement.parentElement.remove()
        }).catch(
          
          function() {
          console.log("Please try again later.")
        })
      }
    }
  })