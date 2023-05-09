// main script file

// login del(Abed)
window.addEventListener("load", getUserByUsername);

async function getUserByUsername(username) {
  const response = await fetch(
    "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/users.json"
  );
  const users = await response.json();
  console.log("users");
  console.log(users);
  if (users) {
    const keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (users[key].username === username) {
        return users[key];
      }
    }
  }

  return null;
}

function redirectToUserPage(userType) {
  if (userType === "admin") {
    window.location.href = "formand.html";
  } else if (userType === "kasser") {
    window.location.href = "kasser.html";
  } else if (userType === "træner") {
    window.location.href = "træner.html";
  } else {
    alert("Invalid userType");
  }
}

document.querySelector("#submit").addEventListener("click", async function (event) {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    console.log(username);
    console.log(password);

    const user = await getUserByUsername(username);
    if (user) {
      if (user.password === password) {
        redirectToUserPage(user.usertype);
      } else {
        alert("Invalid password");
      }
    } else {
      alert("Invalid username");
    }
  });

// Træner Oversigt(Abed)

window.addEventListener("load", initApp);

async function initApp(){
const members = await getMembers();
console.log(members)
showMembers(members);
}


async function getMembers(){

const response = await fetch("https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/medlemmer.json");
const data = await response.json();
return data;
}

function showMembers (members){
for(const member of members){
    const html = /*html*/ `
    <li>${member.active}-${member.age}-${member.debt}-${member.email}-${member.konkurrence}-${member.motionist}-${member.name}-${member.tlf}</li>
    
    `;
    document.querySelector("#memberslist").insertAdjacentHTML("beforeend", html);
}
}




