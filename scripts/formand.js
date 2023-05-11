import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "./rest-service.js";

import{isActive, isInCompetionen} from "./helpers.js"
window.addEventListener("load", initApp);

let memberList;

async function initApp() {
  memberList = await getMembers();
  updateMembersGrid();
<<<<<<< Updated upstream
  document
    .querySelector("#nytmedlem")
    .addEventListener("click", showCreateForm);

    document.querySelector(".log-off-btn").addEventListener("click",()=>window.location.href="index.html")
=======
  document.querySelector("#nytmedlem").addEventListener("click", showCreateForm);
>>>>>>> Stashed changes
}

function showCreateForm() {
  document.querySelector("#dialog-create-member").showModal();
  document.querySelector("#form-create-member").addEventListener("submit", createMemberClicked);
  document.querySelector("#cancel-create").addEventListener("click", createCancelClicked);
}

async function createMemberClicked(event) {
    event.preventDefault();
    const form = document.querySelector("#form-create-member");
    const name = form.name.value;
    const age = form.age.value;
    const debt = form.debt.value;
    const competition = form.competition.value;
    const email = form.email.value;
    const tlf = form.tlf.value;
    const active = form.active.value;

    const response = await createMember(
        name,
        age,
        debt,
        competition,
        email,
        tlf,
        active
        );
    if (response.ok) {
      document.querySelector("#dialog-create-member").close();
      form.reset();
      updateMembersGrid();
    } else {
      console.log(response.status, response.statusText);
    }
  }

function createCancelClicked(event) {
  event.preventDefault();
  document.querySelector("#form-create-member").reset();
  document.querySelector("#dialog-create-member").close();
}

function cancelUpdate(event) {
  event.preventDefault();
  document.querySelector("#dialog-update-member").close();
}

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

function updateClicked(memberObject) {
  const updateForm = document.querySelector("#form-update-member");

   updateForm.active.value = memberObject.active;
   updateForm.age.value = memberObject.age;
   updateForm.debt.value = memberObject.debt;
   updateForm.email.value = memberObject.email;
   updateForm.competition.value = memberObject.competition;
   updateForm.name.value = memberObject.name;
   updateForm.tlf.value = memberObject.tlf;
   updateForm.setAttribute("data-id", memberObject.id);
   document.querySelector("#dialog-update-member").showModal();
   document.querySelector("#form-update-member").addEventListener("submit", updateMemberClicked);
   document.querySelector("#cancel-update").addEventListener("click", updateMemberClicked);

 }

function deleteMemberClicked(memberObject) {
  console.log(memberObject);
  document.querySelector("#dialog-delete-member-title").textContent = memberObject.name;
  document.querySelector("#dialog-delete-member").showModal();
  document.querySelector("#form-delete-member").addEventListener("submit", () => deleteMemberConfirm(memberObject));
  document.querySelector("#cancelDelete").addEventListener("click", (event) => cancelDeleteMember(event));
}

function cancelDeleteMember(event) {
  event.preventDefault();
  document.querySelector("#dialog-delete-member").close();
}

async function deleteMemberConfirm(memberObject) {
  const response = await deleteMember(memberObject);

  if (response.ok) {
    updateMembersGrid();
    showDeleteFeedback();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

function showDeleteFeedback() {
  const dialog = document.getElementById("dialog-delete-feedback");
  const dialogMessage = document.getElementById(
    "dialog-delete-feedback-message"
  );
  dialogMessage.textContent;
  dialog.showModal();
  setTimeout(closeDialog, 1000);

  function closeDialog() {
    dialog.close();
  }
}

async function updateMembersGrid() {
  memberList = await getMembers();
  showMembers(memberList);
}

function showMembers(memberList) {
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

function showMember(memberObject) {
  const html = /*html*/ `
        <article class="grid-item">
        <div class="clickable">    
            <p>Aktiv: ${isActive(memberObject)}</p>
            <p>Alder: ${memberObject.age}</p>
            <p>Gæld: ${memberObject.debt}</p>
            <p>E-mail: ${memberObject.email}</p>
            <p>Konkurrence: ${isInCompetionen(memberObject)}</p>
            <p>Navn: ${memberObject.name}</p>
            <p>Tlf.: ${memberObject.tlf}</p>
        </div>
            <div class="btns">
                <button class="btn-delete">Slet</button>
                <button class="btn-update">Opdater</button>
            </div>
        </article>
    `;

  
 

  document.querySelector("#memberTable").insertAdjacentHTML("beforeend", html);

  const gridItem = document.querySelector(
    "#memberTable article:last-child .clickable"
  );

  //  gridItem.addEventListener("click", () => {
  //    showMemberModal(memberObject);
  //  });

  document
    .querySelector("#memberTable article:last-child .btn-delete")
    .addEventListener("click", () => deleteMemberClicked(memberObject));
  document
    .querySelector("#memberTable article:last-child .btn-update")
    .addEventListener("click", () => updateClicked(memberObject));
}

//  function showMemberModal(memberObject) {
//    const modal = document.querySelector("#member-modal");
//    modal.querySelector("#member-active").textContent = memberObject.active;
//    modal.querySelector("#member-age").textContent = memberObject.age;
//    modal.querySelector("#member-debt").textContent = memberObject.debt;
//    modal.querySelector("#member-email").textContent = memberObject.email;
//    modal.querySelector("#member-competition").textContent = memberObject.competition;
//    modal.querySelector("#member-name").textContent = memberObject.name;
//    modal.querySelector("#member-tlf").textContent = memberObject.tlf;
//    modal.showModal();
//    modal.querySelector("button").addEventListener("click", () => {modal.close();
//    });
//  }
