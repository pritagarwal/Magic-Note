console.log("Welcome to app js");
showNotes();

let addBtn = document.getElementById("addbtn");

addBtn.addEventListener("click", function (e) {
  let text = document.getElementById("addtxt");
  let saved_notes = localStorage.getItem("notes");
  if (saved_notes == null) {
    notes_arr = [];
  } else {
    notes_arr = JSON.parse(saved_notes);
  }
  notes_arr.push(text.value);
  localStorage.setItem("notes", JSON.stringify(notes_arr));
  text.value = "";
  showNotes();
});

function showNotes() {
  let saved_notes = localStorage.getItem("notes");
  let display_notes = document.getElementById("notes");
  if (saved_notes == null || JSON.parse(saved_notes).length == 0) {
    notes_arr = [];
    display_notes.innerHTML = "<h2>Nothing to show</h2>";
  } 
  else {
    notes_arr = JSON.parse(saved_notes);
    let html = "";
    notes_arr.forEach((element, index) => {
      html += ` <div class="card noteCard mx-3 my-3 col-lg-3 col-md-4">
        <div class="card-body">
          <h5 class="card-title">Note-${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button onclick = "delete_click(${index})" id = "${index}" class=" del_button btn btn-primary">Delete</button>
        </div>
      </div>`;
    });

    display_notes.innerHTML = html;
  }
}

function delete_click(index){
      let notes= localStorage.getItem("notes");
      let notes_arr = JSON.parse(notes);
      notes_arr.splice(index,1);
      localStorage.setItem("notes",JSON.stringify(notes_arr));
      showNotes();


}

let search = document.getElementById("search_txt");
search.addEventListener("input",function(){
    let search_val = search.value;
    let saved_notes = document.getElementsByClassName("noteCard");
    Array.from(saved_notes).forEach((element)=>{
        let card_text = element.getElementsByTagName("p")[0];
        let text = card_text.innerHTML;
        if(text.includes(search_val)){
            element.style.display='block'
        }
        else{
            element.style.display='none';
        }


    });



});
