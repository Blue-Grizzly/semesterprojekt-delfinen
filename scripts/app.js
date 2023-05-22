
import { getUserByUsername } from "./rest-service.js"

window.addEventListener("load", initApp);

function initApp() {
  document.querySelector("#login").addEventListener("submit", login);
}

async function login(event){
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const user = await getUserByUsername(username);
  if (user.password === password){
      redirectToUserPage(user.usertype);
  } else {
    document.querySelector("#login-error").textContent =  `Forkert brugernavn eller password!`;
  }
}

function redirectToUserPage(userType){
  if (userType === "admin") {
    window.location.href = "formand.html";
  } else if (userType === "kasserer") {
    window.location.href = "kasserer.html";
  } else if (userType === "træner") {
    window.location.href = "traener.html";
  } else {
    document.querySelector("#login-error").textContent =  `Forkert brugernavn eller password!`;
  }
}