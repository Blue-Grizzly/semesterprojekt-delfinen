let resultsList = [];
let memberList =[];

import {
  createResult,
  getResults,
  deleteResult,
  updateResult,
  getMembers
} from "./rest-service.js";

import {
  filterByBryst,
  filterByButterfly,
  filterByCrawl,
  filterByRygCrawl,
  
} from "./helpers.js";





window.addEventListener("load", initApp);

async function initApp() {

  document.querySelector("#dialog-update-result").addEventListener("click", updateResultClicked);
  updateResultsGrid();

  document
    .querySelector("#create-result")
    .addEventListener("click", showCreateForm);
  const results = await getResults();
  // console.log(results);
  showResult(results);

  console.log(results);
  document
    .querySelector(".log-off-btn")
    .addEventListener("click", () => (window.location.href = "index.html"));

  document.querySelector("#nav-hold").addEventListener("click", showTeams);
fillMemberList();

document
  .querySelector("#nav-bryst")
  .addEventListener("click", () => {showResults (filterByBryst(resultsList)); 
  document.querySelector("#results-table").classList.remove("hidden");
});


  document.querySelector("#nav-crawl").addEventListener("click", () => {
    showResults(filterByCrawl(resultsList));
    document.querySelector("#results-table").classList.remove("hidden");
  });

document.querySelector("#nav-ryg").addEventListener("click", () => {showResults(filterByRygCrawl(resultsList)); 
document.querySelector("#results-table").classList.remove("hidden");
  });

  

  document.querySelector("#nav-butterfly").addEventListener("click", () => {
    showResults(filterByButterfly(resultsList));
    document.querySelector("#results-table").classList.remove("hidden");
  });

  }







function showTeams(){
  document.querySelector("#hold-table").classList.remove("hidden");
}

async function fillMemberList(){
  memberList = await getMembers();
  console.log(memberList);
  showCompetitionMembers(memberList);
}

function showCompetitionMembers(list){
  
    for (const member of list) {
      if(member.competition == "true"){
        showCompetetionMember(member);
      }
      
    }
  
}

function showCompetetionMember(member){
 
    const html = /* html */ `
    <tr>
    <td>${member.name}</td>
    <td>${member.age}</td>
    <td>${member.disciplin}</td>
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

async function updateResultsGrid() {
  resultsList = await getResults();
  
  showResults(resultsList);
}

function showResults(resultList) {

  document.querySelector("#results-table-body").innerHTML = "";

  document.querySelector("#hold-table").classList.add("hidden");
   document.querySelector("#results-table").classList.add("hidden");
 
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
  const html = `
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

    updateResultsGrid();
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
    updateResultsGrid();
    hideErrorMessage();
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
  console.log(resultObject);
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
    updateResultsGrid();
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

function hideErrorMessage() {
  document.querySelector(".error-message").textContent = "";
  document.querySelector(".error-message").classList.add("hide");
}