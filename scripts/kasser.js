
import { getMembers, updateRestance } from "./rest-service.js";
import { checkAgeGroup, filterMembersDebt, totalIncome, totalDebt, isActive, sortBySelected } from "./helpers.js";

window.addEventListener("load", initApp);

let memberList = [];
let lastTime = 0;

async function initApp() {

   refreshTable();
  
  // document.querySelector("#table-name").addEventListener("click", sortByName)
  document.querySelector("#nav-betalt").addEventListener("click", () =>{ 
  document.querySelector("#data-table").setAttribute("filterOption", "paid");
  refreshTable();
  });
  document.querySelector("#nav-restance").addEventListener("click", () => {   
  document.querySelector("#data-table").setAttribute("filterOption", "unpaid");
  refreshTable();
  });
  document.querySelector("#nav-all").addEventListener("click", () =>{
  document.querySelector("#data-table").removeAttribute("filterOption");
  refreshTable();
  });
  document.querySelector("#table-name").addEventListener("click", ()=>{
  document.querySelector("#data-table").setAttribute("sortOption", "name");
  refreshTable();    
  });
  document.querySelector("#table-debt").addEventListener("click", ()=> {
  document.querySelector("#data-table").setAttribute("sortOption", "debt");
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
  document.querySelector(".log-off-btn").addEventListener("click", () => (window.location.href = "index.html"));
}

async function getAllMembers(){
  const now = Date.now();
    if( now - lastTime > 10000 || memberList.length === 0 ){
      memberList = await getMembers();
    }
    return memberList;
}

async function refreshTable() {
  await getAllMembers();
  const filteredList = filterMembersDebt(memberList);
  const sortedList = sortBySelected(filteredList);

  updateMemberTable(sortedList);
  document.querySelector("#total-debt").textContent = totalDebt(memberList);
  document.querySelector("#total-income").textContent = totalIncome(memberList);
  document.querySelector("#current-income").textContent = totalIncome(memberList) - totalDebt(memberList) ;


}


async function updateMemberTable(members) {
  if (members.length > 0) {
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
  document.querySelector("#overview-table-kasser").insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <tr>
        <td>${member.name}</td>
        <td id="restance">${member.debt}kr</td>
        <td>${isActive(member)} ${checkAgeGroup(member)}</td>
        <td><button class="btn-change-restance">Ændre Restance</button></td>
    </tr>
    `
  );
  document.querySelector("#overview-table-kasser tr:last-child .btn-change-restance").addEventListener("click", () => updateRestanceClicked(member));
}

function updateRestanceClicked(member) {
  const updateForm = document.querySelector("#form-change-restance");
  
  updateForm.debt.value = member.debt;
  updateForm.setAttribute("active", member.active);
  updateForm.setAttribute("age", member.age);
  updateForm.setAttribute("email", member.email);
  updateForm.setAttribute("tlf", member.tlf);
  updateForm.setAttribute("competition", member.competition);
  updateForm.setAttribute("name", member.name);
  updateForm.setAttribute("data-id", member.id);
  document.querySelector("#dialog-change-restance").showModal();
  document.querySelector("#dialog-change-restance-title"
  ).textContent = `Ændr resistance for: ${member.name}`;

  document.querySelector("#cancel-restance-change-button").addEventListener("click", cancelResistanceChange);
  document.querySelector("#form-change-restance").addEventListener("submit", updateRestanceAccept);
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
    console.log("Update Member Debt clicked");
  } else {
    console.log("Something went wrong");
  }
}

function cancelResistanceChange(event){
  event.preventDefault();
  document.querySelector("#dialog-change-restance").close();
}

export { updateMemberTable };