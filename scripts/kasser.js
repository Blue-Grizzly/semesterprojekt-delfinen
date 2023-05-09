import { getMembers } from "./rest-service.js";
import {checkAgeGroup, checkMembership, filterPaidMembers, filterUnpaidMembers} from "./helpers.js"


window.addEventListener("load", initApp);

let memberList;

async function initApp(){
    document.querySelector("#nav-betalt").addEventListener("click", filterPaidMembers);        
    document.querySelector("#nav-restance").addEventListener("click", filterUnpaidMembers);
    document.querySelector("#nav-restance").addEventListener("click", updateMemberTable);                
    memberList = await getMembers();
    updateMemberTable(memberList);

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
    const membership = checkMembership(member);
    const memberGroup = checkAgeGroup(member);
    document.querySelector("#overview-table-kasser").insertAdjacentHTML("beforeend", /*html*/ `
    <tr>
        <td>${member.name}</td>
        <td>${member.debt}</td>
        <td>${memberGroup} ${membership}</td>
    </tr>

    `);
 

}


