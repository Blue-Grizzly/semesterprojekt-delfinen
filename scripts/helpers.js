function prepareData(dataObject) {
  const medlemArray = [];
  for (const key in dataObject) {
    const medlemObject = dataObject[key];
    characterObject.id = key;
    medlemArray.push(medlemObject);
  }
  console.log(medlemArray);
  return medlemArray;
}