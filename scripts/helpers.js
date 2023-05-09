//helping functions


function prepareData(dataObject) {
    const memberArray = [];
    for (const key in dataObject) {
      const memberObject = dataObject[key];
      memberObject.id = key;
      memberArray.push(memberObject);
    }
    console.log(memberArray);
    return memberArray;
  }
  
  export {prepareData};