import { getMembers, updateRestance } from "./rest-service.js";
import {
  checkAgeGroup,
  filterPaidMembers,
  filterUnpaidMembers,
  totalIncome,
  totalDebt,
} from "./helpers.js";

window.addEventListener("load", initApp);

let memberList;

async function initApp() {
  memberList = await getMembers();
  updateMemberTable(memberList);
  document
    .querySelector("#nav-betalt")
    .addEventListener("click", () =>
      updateMemberTable(filterPaidMembers(memberList))
    );
  document
    .querySelector("#nav-restance")
    .addEventListener("click", () =>
      updateMemberTable(filterUnpaidMembers(memberList))
    );
  document
    .querySelector("#nav-all")
    .addEventListener("click", () => updateMemberTable(memberList));
  document.querySelector("#total-debt").textContent = totalDebt(memberList);
  document.querySelector("#total-income").textContent = totalIncome(memberList);

  document
    .querySelector("#form-change-restance")
    .addEventListener("submit", updateRestanceAccept);
}

function updateMemberTable() {
  if (memberList.length > 0) {
    document.querySelector("#overview-table-kasser").innerHTML = "";
    for (const member of memberList) {
      showMember(member);
    }
  } else {
    document.querySelector("#overview-table-kasser").innerHTML = "";
    document.querySelector("#overview-table-kasser").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
        <h2>Ingen medlemmer med restance fundet.</h2>
        `
    );
  }
}

function showMember(member) {
  const memberGroup = checkAgeGroup(member);
  document.querySelector("#overview-table-kasser").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <tr>
        <td>${member.name}</td>
        <td id="restance">${member.debt}</td>
        <td>${memberGroup}</td>
        <td><button class="btn-change-restance">Ændre Restance</button></td>
    </tr>

    `
  );
  document
    .querySelector("#overview-table-kasser tr:last-child .btn-change-restance")
    .addEventListener("click", () => updateRestanceClicked(member));
}

function updateRestanceClicked(member) {
  const updateForm = document.querySelector("#form-change-restance");

  //sets value of form to that of object
  updateForm.debt.value = member.debt;
  updateForm.active.value = member.active;
  updateForm.age.value = member.age;
  updateForm.email.value = member.email;
  updateForm.konkurrence.value = member.konkurrence;
  updateForm.name.value = member.name;
  updateForm.tlf.value = member.tlf;
  updateForm.setAttribute("data-id", member.id);

  document.querySelector("#dialog-change-restance").showModal();
  console.log("update button clicked");

   document.querySelector(
     "#dialog-change-restance-title"
   ).textContent = `Ændre resistance for: ${member.name}`;

  
}

async function updateRestanceAccept(event, member) {
event.preventDefault();


  const form = document.querySelector("#form-change-restance");

  
  const id = form.getAttribute("data-id");
  const active = member.active.value;
  const age = member.age.value;
  const debt = form.debt.value;
  const email = member.email.value;
  const konkurrence = member.konkurrence.value;
  const name = member.name.value;
  const tlf = member.tlf.value;
  
  const response = await updateRestance(
    id,
    active,
    age,
    debt,
    email,
    konkurrence,
    name,
    tlf
  );

  if (response.ok) {
    document.querySelector("#dialog-change-restance").close();
    updateMemberTable();
    console.log("update Member debt clicked");
  } else {
    console.log("something went wrong");
  }
}

export { updateMemberTable };
