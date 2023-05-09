//rest functions
import{prepareData} from "./helpers.js";


const endpoint = "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app";

async function getMembers() {
    const response = await fetch(`${endpoint}/medlemmer.json`);
    const data = await response.json();
    return prepareData(data);
  }
  
  async function createMember(name, age, debt, competition, email, tlf, active) {
    const newMember = {name, age, debt, competition, email, tlf, active};
    const json = JSON.stringify(newMember);
    const response = await fetch(`${endpoint}/medlemmer.json`, {
      method: "POST",
      body: json,
    });
    return response;
  }



export {getMembers, createMember};