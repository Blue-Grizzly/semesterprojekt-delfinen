"use strict";

import { prepareData } from "./helpers.js";

window.addEventListener("load", initApp);

async function initApp() {
  document.querySelector("#create-result").addEventListener("click", showCreateForm);
  const results = await getResults();
  console.log(results);
  showResults(results, "hold1-table");
  showResults(results, "hold2-table");
}

async function getResults() {
  const response = await fetch("https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/resultater.json");
  const data = await response.json();
  console.log(data)
  return prepareData(data);
}

function showResults(results) {
  const table = document.querySelector("#hold1-table");

  // Clear the table
  table.innerHTML = "";

  for (const result of results) {
    const html = `
      <tr>
        <td>${result.placering}</td>
        <td>${result.dato}</td>
        <td>${result.disciplin}</td>
        <td>${result.noter}</td>
        <td>${result.stævne}</td>
        <td>${result.svømmer}</td>
        <td>${result.tid}</td>
        <td><button class="update-button">update</button></td>
      </tr>
    `;
    table.insertAdjacentHTML("beforeend", html);
    console.log(result)
    document
      .querySelector(".update-button")
      .addEventListener("click", updateClicked(result));
  }
}

// Create


function showCreateForm(){
    document.querySelector("#dialog-create-result").showModal();
    document.querySelector("#form-create-result").addEventListener("submit", createResultClicked);
    document.querySelector("#cancel-create").addEventListener("click", createCancelClicked);

}


async function createResult(
  placering,
  dato,
  disciplin,
  noter,
  stævne,
  svømmer,
  tid
) {
  const response = await fetch(
    "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/resultater.json",
    {
      method: "POST",
      body: JSON.stringify({
        placering: placering,
        dato: dato,
        disciplin: disciplin,
        noter: noter,
        stævne: stævne,
        svømmer: svømmer,
        tid: tid,
      }),
    }
  );
  return response;
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
    
    const results = await getResults(); // Fetch the updated results
    showResults(results);  
    
  } else {
    console.log(response.status, response.statusText);
  }
}

 function createCancelClicked(event) {
   event.preventDefault();
   document.querySelector("#form-create-result").reset();
   document.querySelector("#dialog-create-result").close();
 }


//  update

async function updateMemberClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-update-member");

  const active = form.active.value;
  const age = form.age.value;
  const debt = form.debt.value;
  const email = form.email.value;
  const competition = form.competition.value;
  const name = form.name.value;
  const tlf = form.tlf.value;

  const id = form.getAttribute("data-id");

  const response = await updateMember(
    id,
    active,
    age,
    debt,
    email,
    competition,
    name,
    tlf
  );
  if (response.ok) {
    document.querySelector("#dialog-update-member").close();
    updateMembersGrid();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Noget gik galt, prøv venligst igen");
    event.target.parentNode.close();
  }
}

function updateClicked(resultObject) {
  const updateForm = document.querySelector("#form-update-member");

  updateForm.active.value = resultObject.placering;
  updateForm.age.value = resultObject.dato;
  updateForm.debt.value = resultObject.disciplin;
  updateForm.email.value = resultObject.noter;
  updateForm.competition.value = resultObject.stævne;
  updateForm.name.value = resultObject.svømmer;
  updateForm.tlf.value = resultObject.tid;
  updateForm.setAttribute("data-id", resultObject.id);
  document.querySelector("#dialog-update-member").showModal();
  updateForm.addEventListener("submit", updateMemberClicked);
  document.querySelector("#cancel-update").addEventListener("click", () => {
    document.querySelector("#dialog-update-member").close();
  });
}




