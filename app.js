 
console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let title = document.getElementById("title");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myobj = {
    title: title.value,
    text: addTxt.value
  }
  if(addTxt.value!=="" && title.value!==""){
  notesObj.push(myobj);
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  title.value ="";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    let date = new Date;
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hr = date.getHours();
    let min = date.getMinutes();
    console.log(day,year,month)
    html += `
            <div class="shadow p-3 mb-5 bg-white rounded noteCard my-2 mx-2 card">
                    <div class="card-body">
                        <h5 class="card-title">${index + 1}. ${element.title} </h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-dark">Delete Note</button>
                        <hr>
                        <div style="display: flex;  justify-content: space-between;">
                        <h6>${day}/${month}/${year}</h6>
                        <h6>${hr}:${min}</h6>
                        </div>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value;
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

