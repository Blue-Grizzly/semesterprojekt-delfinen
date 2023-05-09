import { createMember } from "./rest-service.js";
window.addEventListener("load", initApp);


function initApp(){
    document.querySelector("#nytmedlem").addEventListener("click", showCreateForm);

}


function showCreateForm(){
    document.querySelector("#dialog-create-member").showModal();
    document.querySelector("#form-create-member").addEventListener("submit", createMemberClicked);
    document.querySelector("#cancel-create").addEventListener("click", createCancelClicked);

}

async function createMemberClicked(event) {
    event.preventDefault();
    const form = document.querySelector("#form-create-member");
    const name = form.name.value;
    const age = form.age.value;
    const debt = form.restance.value;
    const competition = form.konkurrence.value;
    const email = form.email.value;
    const tlf = form.tlf.value;
    const active = form.active.value;

    const response = await createMember(
        name,
        age,
        debt,
        competition,
        email,
        tlf,
        active
        );
    if (response.ok) {
      document.querySelector("#dialog-create-member").close();
      form.reset();
      // event.target.parentNode.close();
    } else {
      console.log(response.status, response.statusText);
    }
  }

 function createCancelClicked(event){
    event.preventDefault();
    document.querySelector("#form-create-member").reset();
    document.querySelector("#dialog-create-member").close();

 }