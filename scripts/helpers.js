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
      if(member.age >=60){
        return `SeniorPlus`;
      }else{
        return `Senior`;
      }
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

function totalIncome(list){
  let incomeTotal;
      for(const member of list){
      const memberGroup = checkAgeGroup(member).toUpperCase(); 
        if(memberGroup === "SENIOR"){
          incomeTotal =+ 1600;
        } else if(memberGroup === "SENIORPLUS"){
          incomeTotal =+ 1200;
        } else{
          incomeTotal =+ 1000;
        }
      }
  return incomeTotal;
}   


function totalDebt(list){
  let debtTotal;
      for(const member of list){
         debtTotal =+ member.debt;
      }
  return debtTotal;
}    


  export {prepareData, checkMembership, checkAgeGroup, filterPaidMembers, filterUnpaidMembers, totalDebt, totalIncome};