// Træner Oversigt(Abed)

window.addEventListener("load", initApp);

async function initApp() {
  const members = await getMembers();
  console.log(members);
  showMembers(members);
}

async function getMembers() {
  const response = await fetch(
    "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/medlemmer.json"
  );
  const data = await response.json();
  return data;
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
