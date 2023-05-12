
import { prepareData } from "./helpers.js";

const endpoint =
  "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app";

async function getUserByUsername(username) {
  const response = await fetch(
    `${endpoint}/users.json`
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

async function getMembers() {
  const response = await fetch(`${endpoint}/medlemmer.json`);
  const data = await response.json();
  return prepareData(data);
}

async function getResults() {
  const response = await fetch(`${endpoint}/resultater.json`);
  const data = await response.json();
  return prepareData(data);
}

  
async function createMember(name, age, debt, competition, email, tlf, active, disciplin) {
    const newMember = {name, age, debt, competition, email, tlf, active, disciplin};
    const json = JSON.stringify(newMember);
    const response = await fetch(`${endpoint}/medlemmer.json`, {
      method: "POST",
      body: json,
    });
    return response;
  }

async function createResult(
  placering,
  dato,
  disciplin,
  noter,
  stævne,
  svømmer,
  tid
) {
  const response = await fetch(
    `${endpoint}/resultater.json`,
    {
      method: "POST",
      body: JSON.stringify({
        placering: placering,
        dato: dato,
        disciplin: disciplin,
        noter: noter,
        stævne: stævne,
        svømmer: svømmer,
        tid: tid,
      }),
    }
  );
  return response;
}

async function updateMember(id, active, age, debt, email, competition, name, tlf) {
  const memberToUpdate = {
    active: active,
    age: age,
    debt: debt,
    email: email,
    competition: competition,
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

async function updateResult(id, placering,
  dato,
  disciplin,
  noter,
  stævne,
  svømmer,
  tid){
    
    const resultToUpdate = {
      placering: placering,
      dato: dato,
      disciplin: disciplin,
      noter: noter,
      stævne: stævne,
      svømmer: svømmer,
      tid: tid,
    };
   
    const response = await fetch(`${endpoint}/resultater/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(resultToUpdate),
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

async function deleteResult(resultObject) {
  const id = resultObject.id;
  const response = await fetch(`${endpoint}/resultater/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

async function updateRestance(
  id,
  active,
  age,
  debt,
  email,
  competition,
  name,
  tlf
) {
  const restanceToUpdate = {
    active: active,
    age: age,
    debt: debt,
    email: email,
    competition: competition,
    name: name,
    tlf: tlf,
  };

  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
    method: "PUT",
    body: JSON.stringify(restanceToUpdate),
  });
  return response;
}

export {getMembers, getResults, createMember, createResult, updateMember, updateResult, deleteMember, deleteResult, updateRestance, getUserByUsername};