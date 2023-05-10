"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  
  document.querySelector("#nytmedlem").addEventListener("click", showCreateForm);
  const results = await getResults();
  console.log(results);
  showResults(results);
}

async function getResults() {
  const response = await fetch("https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/resultater.json");
  const data = await response.json();
  return Object.values(data);
}

function showResults(results) {
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
    document.querySelector("#hold1-table").insertAdjacentHTML("beforeend", html);
  }
}
