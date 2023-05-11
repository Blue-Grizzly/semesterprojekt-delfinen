// Træner Oversigt(Abed)

import { getMembers } from "./rest-service.js";

window.addEventListener("load", initApp);

async function initApp() {
  const members = await getMembers();
  console.log(members);
  showMembers(members);
}

function showMembers(members) {
  for (const member of members) {
    const html = /*html*/ `
    <li>${member.active}-${member.age}-${member.debt}-${member.email}-${member.konkurrence}-${member.motionist}-${member.name}-${member.tlf}</li>
    
    `;
    document
      .querySelector("#memberslist")
      .insertAdjacentHTML("beforeend", html);
  }
}
