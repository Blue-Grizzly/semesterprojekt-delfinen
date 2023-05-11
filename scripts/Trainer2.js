"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  document.querySelector("#nytresultat").addEventListener("click", showCreateForm);
  const results = await getResults();
  console.log(results);
  showResults(results);
  document
    .querySelector(".log-off-btn")
    .addEventListener("click", () => (window.location.href = "index.html"));
}

async function getResults() {
  const response = await fetch("https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/resultater.json");
  const data = await response.json();
  return Object.values(data);
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
      </tr>
    `;
    table.insertAdjacentHTML("beforeend", html);
  }
}

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
