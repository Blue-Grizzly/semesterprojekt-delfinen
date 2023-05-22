
import { getMembers, createMember, updateMember, deleteMember } from "./rest-service.js";
import { isActive, isInCompetionen, checkSwimteam, controlDiscipline } from "./helpers.js";
import { sortBySelected } from "./sort.js";

window.addEventListener("load", initApp);

let memberList = [];  
let lastTime = 0;

async function initApp(){
  refreshTable();
  document.querySelector("#nytmedlem").addEventListener("click", showCreateForm);
  document.querySelector("#refresh").addEventListener("click", refreshTable);
  document.querySelector(".log-off-btn").addEventListener("click",()=>window.location.href="index.html");
  document.querySelector("#table-name").addEventListener("click", ()=>{
  document.querySelector("#data-table").setAttribute("sortOption", "name");
  refreshTable();    
  });
  document.querySelector("#table-age").addEventListener("click", ()=> {
  document.querySelector("#data-table").setAttribute("sortOption", "age");
  refreshTable();
  });
  document.querySelector("#table-membership").addEventListener("click", ()=> {
  document.querySelector("#data-table").setAttribute("sortOption", "membership");
  refreshTable();
  });
  document.querySelector("#table-options").addEventListener("click", ()=>{
  document.querySelector("#data-table").removeAttribute("sortOption");
  refreshTable();
  });
  document.querySelector("#competition").addEventListener("change", event => controlDiscipline(event));
  document.querySelector("#competition-update").addEventListener("change", event => controlDiscipline(event));
}

async function getAllMembers(){
  const now = Date.now();
    if( now - lastTime > 10000 || memberList.length === 0 ){
      lastTime = Date.now();
      memberList = await getMembers();
    }
    return memberList;
}

async function refreshTable(){
  await getAllMembers();
  const sortedList = sortBySelected(memberList);
  showMembers(sortedList);
}

function showCreateForm(){
  document.querySelector("#dialog-create-member").showModal();
  document.querySelector("#form-create-member").addEventListener("submit", createMemberClicked);
  document.querySelector("#cancel-create").addEventListener("click", createCancelClicked);
}

async function createMemberClicked(event){

event.preventDefault();
const form = document.querySelector("#form-create-member");
const name = form.name.value;
const age = form.age.value;
const debt = form.debt.value;
const competition = form.competition.value;
const email = form.email.value;
const tlf = form.tlf.value;
const active = form.active.value;
const discipline = form.discipline.value;

const response = await createMember(
name,
age,
debt,
competition,
email,
tlf,
active,
discipline
);
  if (response.ok) {
  document.querySelector("#dialog-create-member").close();
  form.reset();
  refreshTable();
  document.querySelector("#dialog-success").showModal();
  setTimeout(()=>document.querySelector("#dialog-success").close(), 1500);
  } else {
  document.querySelector("#dialog-error").showModal();
  setTimeout(() => document.querySelector("#dialog-error").close(), 3000);

  }
}

function createCancelClicked(event){
  event.preventDefault();
  document.querySelector("#form-create-member").reset();
  document.querySelector("#dialog-create-member").close();
}

function cancelUpdate(event){
  event.preventDefault();
  document.querySelector("#form-update-member").reset();
  document.querySelector("#dialog-update-member").close();
}

async function updateMemberClicked(event){
  event.preventDefault();
  const form = document.querySelector("#form-update-member");

  const active = form.active.value;
  const age = form.age.value;
  const debt = form.debt.value;
  const email = form.email.value;
  const competition = form.competition.value;
  const name = form.name.value;
  const tlf = form.tlf.value;
  const discipline = form.discipline.value;

  const id = form.getAttribute("data-id");

  const response = await updateMember(
    id,
    active,
    age,
    debt,
    email,
    competition,
    name,
    tlf,
    discipline
  );
  if (response.ok) {
    document.querySelector("#dialog-update-member").close();
    refreshTable();
    document.querySelector("#dialog-success").showModal();
    setTimeout(() => document.querySelector("#dialog-success").close(), 1500);
  } else {
   document.querySelector("#dialog-error").showModal();
   setTimeout(() => document.querySelector("#dialog-error").close(), 3000);
  }
}

function updateClicked(memberObject){
  const updateForm = document.querySelector("#form-update-member");

  updateForm.active.value = memberObject.active;
  updateForm.age.value = memberObject.age;
  updateForm.debt.value = memberObject.debt;
  updateForm.email.value = memberObject.email;
  updateForm.competition.value = memberObject.competition;
  updateForm.name.value = memberObject.name;
  updateForm.tlf.value = memberObject.tlf;
  updateForm.discipline.value = memberObject.discipline;
  updateForm.setAttribute("data-id", memberObject.id);
  document.querySelector("#dialog-update-member").showModal();
  document.querySelector("#form-update-member").addEventListener("submit", updateMemberClicked);
  document.querySelector("#cancel-update").addEventListener("click", cancelUpdate);
}

function deleteMemberClicked(memberObject){
  document.querySelector("#dialog-delete-member-title").textContent = memberObject.name;
  document.querySelector("#dialog-delete-member").showModal();
  document.querySelector("#form-delete-member").addEventListener("submit", () => deleteMemberConfirm(memberObject));
  document.querySelector("#cancelDelete").addEventListener("click", cancelDeleteMember);
}

function cancelDeleteMember(event){
  event.preventDefault();
  document.querySelector("#dialog-delete-member").close();
}

async function deleteMemberConfirm(memberObject) {
  const response = await deleteMember(memberObject);

  if (response.ok) {
    refreshTable();
    document.querySelector("#dialog-success").showModal();
    setTimeout(() => document.querySelector("#dialog-success").close(), 1500);
  } else {
    document.querySelector("#dialog-error").showModal();
    setTimeout(() => document.querySelector("#dialog-error").close(), 3000);
  }
}

function showMembers(memberList){
  document.querySelector("#memberTable").innerHTML = "";
  if (memberList.length !== 0) {
    for (const member of memberList) {
      showMember(member);
    }
  } else {
    document.querySelector("#memberTable").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <h2 id="search-error-msg"> Ingen medlemmer blev fundet, prøv venligst igen.</h2>
    `
    );
  }
}

function showMember(memberObject){
  const html = /*html*/ `
    <tr class="clickable">    
      <td>${memberObject.name}</td>
      <td>${isActive(memberObject)}, ${isInCompetionen(memberObject)}</td>
      <td>${memberObject.age}</td>
      <td class="member-option-buttons">
        <button class="btn-info">Info</button>
        <button class="btn-update">Opdater</button>
        <button class="btn-delete">Slet</button>
      </td>
    </tr>
  `;
  document.querySelector("#memberTable").insertAdjacentHTML("beforeend", html);
  document.querySelector("#memberTable tr:last-child .btn-info").addEventListener("click", () => showMemberInfo(memberObject));
  document.querySelector("#memberTable tr:last-child .btn-delete").addEventListener("click", () => deleteMemberClicked(memberObject));
  document.querySelector("#memberTable tr:last-child .btn-update").addEventListener("click", () => updateClicked(memberObject));
}

function showMemberInfo(memberObject){
  document.querySelector("#member-active").textContent = isActive(memberObject);
  document.querySelector("#member-competition").textContent = isInCompetionen(memberObject);
    if(memberObject.competition == "true"){
  document.querySelector("#member-swimteam").textContent = `Svømmehold ${checkSwimteam(memberObject)}`;
    } else {
      document.querySelector("#member-swimteam").textContent = "";
    }
  document.querySelector("#member-age").textContent = memberObject.age;
  document.querySelector("#member-debt").textContent = `${memberObject.debt}kr`;
  document.querySelector("#member-email").textContent = memberObject.email;
  document.querySelector("#member-name").textContent = memberObject.name;
  document.querySelector("#member-tlf").textContent = memberObject.tlf;
  document.querySelector("#member-modal").showModal();
  document.querySelector("#button-close-info").addEventListener("click", () =>  document.querySelector("#member-modal").close());
}