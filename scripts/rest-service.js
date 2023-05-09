//rest functions
import{prepareData} from "./helpers.js";


const endpoint = "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app";

async function getMembers() {
    const response = await fetch(`${endpoint}/medlemmer.json`);
    const data = await response.json();
    return prepareData(data);
}
  
  async function createMember(name, age, debt, konkurrence, email, tlf, active) {
    const newMember = {name, age, debt, konkurrence, email, tlf, active};
    const json = JSON.stringify(newMember);
    const response = await fetch(`${endpoint}/medlemmer.json`, {
      method: "POST",
      body: json,
    });
    return response;
  }

async function updateMember(id, active, age, debt, email, konkurrence, name, tlf) {
  const memberToUpdate = {
    active: active,
    age: age,
    debt: debt,
    email: email,
    konkurrence: konkurrence,
    name: name,
    tlf: tlf,
};
  const json = JSON.stringify(memberToUpdate);
  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}

async function deleteMember(memberObject) {
  const id = memberObject.id;
  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

export {getMembers, createMember, updateMember, deleteMember};