import { getMembers } from "./rest-service.js";
import {checkAgeGroup, filterPaidMembers, filterUnpaidMembers, totalIncome, totalDebt} from "./helpers.js"


window.addEventListener("load", initApp);

let memberList;

async function initApp(){
    memberList = await getMembers();
    updateMemberTable(memberList);
    document.querySelector("#nav-betalt").addEventListener("click", filterPaidMembers);        
    document.querySelector("#nav-restance").addEventListener("click", filterUnpaidMembers);
    document.querySelector("#nav-restance").addEventListener("click", updateMemberTable);     
    document.querySelector("#total-debt").textContent = totalDebt(memberList);           
    document.querySelector("#total-income").textContent = totalIncome(memberList);           

}


function updateMemberTable(members){
    if(members.length > 0){
        document.querySelector("#overview-table-kasser").innerHTML = "";
        for(const member of members){
            showMember(member);
        }
    } else{
        document.querySelector("#overview-table-kasser").innerHTML = "";
        document.querySelector("#overview-table-kasser").insertAdjacentHTML("beforeend", /*html*/ `
        <h2>Ingen medlemmer med restance fundet.</h2>
        `);

    }
}


function showMember(member){
    const memberGroup = checkAgeGroup(member);
    document.querySelector("#overview-table-kasser").insertAdjacentHTML("beforeend", /*html*/ `
    <tr>
        <td>${member.name}</td>
        <td>${member.debt}</td>
        <td>${memberGroup}</td>
    </tr>

    `);
 

}

