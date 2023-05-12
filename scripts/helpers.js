
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

function filterMembersDebt(members){
  const selectedFilter = document.querySelector("#data-table").getAttribute("filterOption");
    if(selectedFilter == "paid"){
  return members.filter((member) => member.debt == "0");
    }else if(selectedFilter == "unpaid"){
      return members.filter((member) => member.debt != "0");
    } else{
      return members;
    }
}


function sortBySelected(members){
  const selectedSort = document.querySelector("#data-table").getAttribute("sortOption");
  if(selectedSort === "name"){
  return members.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === "debt"){
    return  members.sort((a, b) =>  b.debt - a.debt );
  } else if (selectedSort === "membership"){
    return members.sort((a, b) => b.active.localeCompare(a.active));
  } else if (selectedSort === "age"){
    return members.sort((a, b) => a.age - b.age); 
  } else{
    return members;
  }
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

function controlDisciplin(event){
  if (event.target.value === "true"){
    document.querySelector("#disciplin").disabled = false;
    document.querySelector("#disciplin-update").disabled = false;
  } else{
    document.querySelector("#disciplin-update").disabled = true;
    document.querySelector("#disciplin").disabled = true;


 
  }
}



export {prepareData, checkMembership, checkAgeGroup, filterMembersDebt, totalDebt, totalIncome, isActive, isInCompetionen, checkSwimteam, sortBySelected, controlDisciplin};