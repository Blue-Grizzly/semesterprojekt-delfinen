//helping functions


function prepareData(dataObject) {
    const memberArray = [];
    for (const key in dataObject) {
      const memberObject = dataObject[key];
      memberObject.id = key;
      memberArray.push(memberObject);
    }
    return memberArray;
  }
  
function checkMembership(member){
    if(member.active === true){
        if(member.motionist === true){
            return `Motionist`;
        } else{
            return `Konkurrence`;
        }
    } else{ 
    return `Passiv`;
}


}

function checkAgeGroup(member){
    if(member.age >= 18){
        return `Senior`;
    } else{
        return `Junior`;
    }

}


function filterPaidMembers(){
  let filteredList = memberList.filter((member) => member.debt === 0);
  updateMemberTable(filteredList);
}

function filterUnpaidMembers(){
  let filteredList = memberList.filter((member) => member.debt !== 0);
  updateMemberTable(filteredList);
}



  export {prepareData, checkMembership, checkAgeGroup, filterPaidMembers, filterUnpaidMembers};