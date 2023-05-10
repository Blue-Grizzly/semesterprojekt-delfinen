import {getUserByUsername} from "./rest-service.js"


// login del(Abed)
window.addEventListener("load", initApp);

function initApp() {
  document.querySelector("#submit").addEventListener("click", login);


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
  if (user) {
    if (user.password === password) {
      redirectToUserPage(user.usertype);
    } else {
      alert("Invalid password");
    }
  } else {
    alert("Invalid username");
  }
}
