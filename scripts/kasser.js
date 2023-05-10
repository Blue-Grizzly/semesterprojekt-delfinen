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
  refreshTable();

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

  document
    .querySelector("#form-change-restance")
    .addEventListener("submit", updateRestanceAccept);

    document.querySelector("#cancel-restance-change-button").addEventListener("click", cancelResistanceChange);
}

function cancelResistanceChange(event){
  event.preventDefault();
  document.querySelector("#dialog-change-restance").close();

}

async function refreshTable() {
  memberList = await getMembers();
  updateMemberTable(memberList);
  document.querySelector("#total-debt").textContent = totalDebt(memberList);
  document.querySelector("#total-income").textContent = totalIncome(memberList);
}
async function updateMemberTable(members) {
  if (memberList.length > 0) {
    document.querySelector("#overview-table-kasser").innerHTML = "";
    for (const member of members) {
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
  // updateForm.reset();

  //   //sets value of form to that of object
  updateForm.debt.value = member.debt;
  updateForm.setAttribute("active", member.active);
  updateForm.setAttribute("age", member.age);
  updateForm.setAttribute("email", member.email);
  updateForm.setAttribute("tlf", member.tlf);
  updateForm.setAttribute("competition", member.competition);
  updateForm.setAttribute("name", member.name);
  updateForm.setAttribute("data-id", member.id);

  document.querySelector("#dialog-change-restance").showModal();

  document.querySelector(
    "#dialog-change-restance-title"
  ).textContent = `Ændre resistance for: ${member.name}`;
}

async function updateRestanceAccept(event) {
  event.preventDefault();

  const form = document.querySelector("#form-change-restance");

  const id = form.getAttribute("data-id");
  const active = form.getAttribute("active");
  const age = form.getAttribute("age");
  const debt = form.debt.value;
  const email = form.getAttribute("email");
  const konkurrence = form.getAttribute("konkurrence");
  const name = form.getAttribute("name");
  const tlf = form.getAttribute("email");

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
    refreshTable();
    console.log("update Member debt clicked");
  } else {
    console.log("something went wrong");
  }
}

export { updateMemberTable };
