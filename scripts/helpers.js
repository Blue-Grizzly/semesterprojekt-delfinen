
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
        } else {
            return `Konkurrence`;
        }
    } else { 
    return `Passiv`;
 }
}

function checkAgeGroup(member){;
  if(member.age >= 60){
    return `SeniorPlus`;
    } else if(member.age >= 18) {
      return `Senior`;
    } else {
        return `Junior`;
    }
}

function filterPaidMembers(memberList){
  return memberList.filter((member) => member.debt == "0");
}

function filterUnpaidMembers(memberList){
  return memberList.filter((member) => member.debt != "0");
}

function totalIncome(list){
  let incomeTotal = 0;
      for(let i=0; i < list.length; i++){
        const memberGroup = checkAgeGroup(list[i]);
      if(list[i].active == "true"){ 
          if(memberGroup.toUpperCase() === "SENIOR"){
            incomeTotal += 1600;
          } else if(memberGroup.toUpperCase() === "SENIORPLUS"){
            incomeTotal += 1200;
          } else {
            incomeTotal += 1000;
          }
      } else {
        incomeTotal += 500;
    } 
  }
  return incomeTotal;
}   

function totalDebt(list){
  let debtTotal = 0;
      for(const member of list){
         debtTotal += Number(member.debt);
      }
  return debtTotal;
}    

function isActive(member) {
  if (member.active == "true") {
    return `Aktiv`;
  } else {
    return `Passiv`;
  }
}

function isInCompetionen(member) {
  if (member.competition === "true") {
    return `Konkurrencesvømmer`;
  } else {
    return `Motionist`;
  }
}

function checkSwimteam(member){
  if(member.active == "true"){
    if(member.competition == "true"){
      if(member.age >= 18){
        return `Hold 1`
      }
    } else {
      return `Hold 2`
    }
  }
}

export {prepareData, checkMembership, checkAgeGroup, filterPaidMembers, filterUnpaidMembers, totalDebt, totalIncome, isActive, isInCompetionen, checkSwimteam};