
import { getUserByUsername } from "./rest-service.js"

window.addEventListener("load", initApp);

function initApp() {
  document.querySelector("#login").addEventListener("submit", login);


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

async function login(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  console.log(username);
  console.log(password);

  const user = await getUserByUsername(username);
  if (user.password === password){
      redirectToUserPage(user.usertype);
  } else {
    document.querySelector("#login-error").textContent =  `Forkert brugernavn eller password!`;
  }
}