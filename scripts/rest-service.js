//rest functions
import{prepareData} from "./helpers.js";


const endpoint = "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/";

async function getMember() {
    const response = await fetch(`${endpoint}/medlemmer.json`);
    const data = await response.json();
    return prepareData(data);
  }
  


export {getMember};