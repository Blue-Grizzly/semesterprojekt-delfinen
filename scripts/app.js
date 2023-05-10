// main script file

// login del(Abed)
window.addEventListener("load", getUserByUsername);

function initApp() {
  updateMembersGrid();
  document
    .querySelector("#form-update-character .btn-cancel")
    .addEventListener("click", cancelUpdate);
  document
    .querySelector("#form-update-character")
    .addEventListener("submit", updateCharacterClicked);
}

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
