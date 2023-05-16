
import {
  createResult,
  getResults,
  deleteResult,
  updateResult,
  getMembers
} from "./rest-service.js";

import {
  filterByDiscipline,
  sortBySelectedResults,
  sortBySelected  
} from "./helpers.js";



let resultsList = [];
let memberList =[];
let lastTime = 0;

window.addEventListener("load", initApp);

async function initApp() {
  refreshTableMembers();

  document
    .querySelector("#create-result")
    .addEventListener("click", showCreateForm);

  document
    .querySelector(".log-off-btn")
    .addEventListener("click", () => (window.location.href = "index.html"));

  document.querySelector("#nav-hold").addEventListener("click", showTeams);

document
  .querySelector("#nav-bryst")
  .addEventListener("click", () => {
  document.querySelector("#results-table").setAttribute("filterOption", "Bryst");
  refreshTableResults();
});


document.querySelector("#table-place").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Place");
  refreshTableResults();
});
document.querySelector("#table-date").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Date");
  refreshTableResults();
});
document.querySelector("#table-discipline").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Discipline");
  refreshTableResults();
});
document.querySelector("#table-note").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Note");
  refreshTableResults();
});
document.querySelector("#table-event").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Event");
  refreshTableResults();
});
document.querySelector("#table-swimmer").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Swimmer")
  refreshTableResults();
});
document.querySelector("#table-time").addEventListener("click", ()=> {
  document.querySelector("#results-table").setAttribute("sortOption", "Time")
  refreshTableResults();
});
document.querySelector("#table-options").addEventListener("click", ()=> {
  document.querySelector("#results-table").removeAttribute("sortOption")
  refreshTableResults();
});

  document.querySelector("#nav-crawl").addEventListener("click", () => {
    document.querySelector("#results-table").setAttribute("filterOption", "Crawl");
    refreshTableResults();
    });

document.querySelector("#nav-ryg").addEventListener("click", () => {
  document.querySelector("#results-table").setAttribute("filterOption", "Ryg");
  refreshTableResults();
  });

  

  document.querySelector("#nav-butterfly").addEventListener("click", () => {
    document.querySelector("#results-table").setAttribute("filterOption", "Butterfly");
    refreshTableResults();
  });


  document.querySelector("#table-name-junior").addEventListener("click", ()=>{
    document.querySelector("#data-table").setAttribute("sortOption", "name");
    refreshTableMembers();    
  });
  document.querySelector("#table-name-senior").addEventListener("click", ()=>{
    document.querySelector("#data-table").setAttribute("sortOption", "name");
    refreshTableMembers();    
  });

  document.querySelector("#table-age-junior").addEventListener("click", ()=> {
    document.querySelector("#data-table").setAttribute("sortOption", "age");
    refreshTableMembers();
  });
  document.querySelector("#table-age-senior").addEventListener("click", ()=> {
    document.querySelector("#data-table").setAttribute("sortOption", "age");
    refreshTableMembers();
  });

  document.querySelector("#table-discipline-junior").addEventListener("click", ()=> {
    document.querySelector("#data-table").setAttribute("sortOption", "discipline");
    refreshTableMembers();
  });
  document.querySelector("#table-discipline-senior").addEventListener("click", ()=> {
    document.querySelector("#data-table").setAttribute("sortOption", "discipline");
    refreshTableMembers();
  });

}

function showTeams(){
  document.querySelector("#data-table").classList.remove("hidden");
  document.querySelector("#results-table-wrapper").classList.add("hidden");
  refreshTableMembers();
}

async function getAllMembers(){
  const now = Date.now();
    if( now - lastTime > 10000 || memberList.length === 0 ){
      memberList = await getMembers();
    }
    return memberList;
}

async function getAllResults(){
  const now = Date.now();
    if( now - lastTime > 10000 || resultsList.length === 0 ){
      resultsList = await getResults();
    }
    return resultsList;
}


async function refreshTableMembers() {
  await getAllMembers();
  const sortedList = sortBySelected(memberList);

  showCompetitionMembers(sortedList);
}


async function refreshTableResults() {
  await getAllResults();

  const filteredList = filterByDiscipline(resultsList);
  const sortedList = sortBySelectedResults(filteredList);

  showResults(sortedList);
}



function showCompetitionMembers(list){
  document.querySelector("#senior-hold-body").innerHTML = "";
  document.querySelector("#unge-hold-body").innerHTML = "";
  document.querySelector("#results-table-wrapper").classList.add("hidden");

    for (const member of list) {
      if(member.competition == "true"){
        showCompetetionMember(member);
      }
      
    }
  
}

function showCompetetionMember(member){
  document.querySelector("#data-table").classList.remove("hidden");

    const html = /* html */ `
    <tr>
    <td>${member.name}</td>
    <td>${member.age}</td>
    <td>${member.discipline}</td>
    </tr>
    `;
 if(member.age < 18){
    document.querySelector("#unge-hold-body").insertAdjacentHTML("beforeend",html);
 }
  else{ 

  document
    .querySelector("#senior-hold-body")
    .insertAdjacentHTML("beforeend", html);
  }
}


function showResults(resultList) {

  document.querySelector("#results-table-body").innerHTML = "";

  document.querySelector("#data-table").classList.add("hidden");
   document.querySelector("#results-table-wrapper").classList.remove("hidden");
 
  if (resultList.length !== 0) {
    for (const result of resultList) {
      showResult(result);
    }
  } else {
    document
      .querySelector("#results-table-body")
      .insertAdjacentHTML(
        "beforeend",
        /*html*/ ` <h2>Der er ingen resultater her</h2>`
      );
  }
}

function showResult(result) {
  const html = /*html*/`
      <tr>
        <td>${result.placering}</td>
        <td>${result.dato}</td>
        <td>${result.disciplin}</td>
        <td>${result.noter}</td>
        <td>${result.stævne}</td>
        <td>${result.svømmer}</td>
        <td>${result.tid}</td>
        <td><button id="btn-update">Opdater</button></td>
        <td><button id="btn-delete">Slet</button></td>
      </tr>
    `;
  document
    .querySelector("#results-table-body")
    .insertAdjacentHTML("beforeend", html);
  document
    .querySelector("#results-table-body tr:last-child #btn-delete")
    .addEventListener("click", () => deleteResultClicked(result));
  document
    .querySelector("#results-table-body tr:last-child #btn-update")
    .addEventListener("click", () => updateClicked(result));
}

function showCreateForm() {
  document.querySelector("#dialog-create-result").showModal();
  document
    .querySelector("#form-create-result")
    .addEventListener("submit", createResultClicked);
  document
    .querySelector("#cancel-create")
    .addEventListener("click", createCancelClicked);
}

async function createResultClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-create-result");
  const placering = form.placering.value;
  const dato = form.dato.value;
  const disciplin = form.disciplin.value;
  const noter = form.noter.value;
  const stævne = form.stævne.value;
  const svømmer = form.svømmer.value;
  const tid = form.tid.value;

  const response = await createResult(
    placering,
    dato,
    disciplin,
    noter,
    stævne,
    svømmer,
    tid
  );
  if (response.ok) {
    document.querySelector("#dialog-create-result").close();
    form.reset();

    refreshTableResults();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Der skete en fejl. Udfyld venligst alle felter.");
  }
}

function createCancelClicked(event) {
  event.preventDefault();
  document.querySelector("#form-create-result").reset();
  document.querySelector("#dialog-create-result").close();
}

async function updateResultClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-update-result");

  const placering = form.placering.value;
  const dato = form.dato.value;
  const disciplin = form.disciplin.value;
  const noter = form.noter.value;
  const stævne = form.stævne.value;
  const svømmer = form.svømmer.value;
  const tid = form.tid.value;

  const id = form.getAttribute("data-id");

  const response = await updateResult(
    id,
    placering,
    dato,
    disciplin,
    noter,
    stævne,
    svømmer,
    tid
  );
  if (response.ok) {
    document.querySelector("#dialog-update-result").close();
    refreshTableResults();
    // hideErrorMessage();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Der skete en fejl. Udfyld venligst alle felter.");
    event.target.parentNode.close();
  }
}

function updateClicked(resultObject) {
  const updateForm = document.querySelector("#form-update-result");

  updateForm.placering.value = resultObject.placering;
  updateForm.dato.value = resultObject.dato;
  updateForm.disciplin.value = resultObject.disciplin;
  updateForm.noter.value = resultObject.noter;
  updateForm.stævne.value = resultObject.stævne;
  updateForm.svømmer.value = resultObject.svømmer;
  updateForm.tid.value = resultObject.tid;
  updateForm.setAttribute("data-id", resultObject.id);
  document.querySelector("#dialog-update-result").showModal();
  updateForm.addEventListener("submit", updateResultClicked);
  document
    .querySelector("#cancel-update")
    .addEventListener("click", dialogUpdateCancel);
}

function dialogUpdateCancel(event) {
  event.preventDefault();
  document.querySelector("#dialog-update-result").close();
}

function deleteResultClicked(resultObject) {
  document.querySelector("#dialog-delete-result-title").textContent =
    resultObject.name;
  document.querySelector("#dialog-delete-result").showModal();
  document
    .querySelector("#form-delete-result")
    .addEventListener("submit", () => deleteResultConfirm(resultObject));
  document
    .querySelector("#cancel-delete-result")
    .addEventListener("click", (event) => cancelDeleteResult(event));
}

function cancelDeleteResult(event) {
  event.preventDefault();
  document.querySelector("#dialog-delete-result").close();
}

async function deleteResultConfirm(resultObject) {
  const response = await deleteResult(resultObject);

  if (response.ok) {
    refreshTableResults();
    console.log("sletter");
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

function showErrorMessage(message) {
  document.querySelector("#dialog-failed-to-create").showModal();
  document.querySelector(".error-message").textContent = message;
  document.querySelector(".error-message").classList.remove("hide");
}

// function hideErrorMessage() {
//   document.querySelector(".error-message").textContent = "";
//   document.querySelector(".error-message").classList.add("hide");
// }