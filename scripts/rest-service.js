

const endpoint = "https://delfinen-database-default-rtdb.europe-west1.firebasedatabase.app/";

async function getCharacters() {
  const response = await fetch(`${endpoint}/medlemmer.json`);
  const data = await response.json();
  return prepareData(data);
}