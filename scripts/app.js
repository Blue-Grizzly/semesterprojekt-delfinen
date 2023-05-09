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

function cancelUpdate(event) {
  event.preventDefault();
  document.querySelector("#dialog-update-member").close();
}

async function updateMemberClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-update-character");
  
  const active = form.active.value;
  const age = form.age.value;
  const debt = form.debt.value;
  const email = form.email.value;
  const konkurrence = form.konkurrence.value;
  const name = form.name.value;
  const tlf = form.tlf.value;

  const id = form.getAttribute("data-id");

  const response = await updateMember(id, active, age, debt, email, konkurrence, name, tlf);
  if (response.ok) {
    document.querySelector("#dialog-update-member").close();
    updateCharactersGrid();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Noget gik galt, prøv venligst igen");
    event.target.parentNode.close();
  }
}

function updateClicked(memberObject) {
  const updateForm = document.querySelector("#form-update-member");

  updateForm.active.value = memberObject.active;
  updateForm.age.value = memberObject.age;
  updateForm.debt.value = memberObject.debt;
  updateForm.email.value = memberObject.email;
  updateForm.konkurrence.value = memberObject.konkurrence;
  updateForm.name.value = memberObject.name;
  updateForm.tlf.value = memberObject.tlf;

  updateForm.setAttribute("data-id", memberObject.id);
  document.querySelector("#dialog-update-member").showModal();
}


function deleteMemberClicked(memberObject) {
  console.log(memberObject);
  document.querySelector("#dialog-delete-member-title").textContent = memberObject.name;
  document.querySelector("#dialog-delete-member").showModal();
  document.querySelector("#form-delete-member").addEventListener("submit", () => deleteMemberConfirm(memberObject));
  document.querySelector("#cancelDelete").addEventListener("click", event => cancelMemberCharacter(event));
}

function cancelDeleteMember(event) {
  event.preventDefault();
  document.querySelector("#dialog-delete-member").close();
}

async function deleteMemberConfirm(memberObject) {
  const response = await deleteMember(memberObject);

  if (response.ok) {
    updateCharactersGrid();
    showDeleteFeedback();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

function showDeleteFeedback() {
  const dialog = document.getElementById("dialog-delete-feedback");
  const dialogMessage = document.getElementById("dialog-delete-feedback-message");
  dialogMessage.textContent;
  dialog.showModal();
  setTimeout(closeDialog, 1000);

  function closeDialog() {
    dialog.close();
  }
}

async function updateMembersGrid() {
  memberList = await getMembers();
  showMembers(memberList);
}
