
function prepareData(dataObject){
  const memberArray = [];
  for (const key in dataObject) {
  const memberObject = dataObject[key];
  memberObject.id = key;
  memberArray.push(memberObject);
}
  return memberArray;
}
  
function checkMembership(member){
  if(member.active == "true"){
    if(member.competition == "true"){
      return `Konkurrence`;
      } else {
        return `Motionist`;
        }
    } else { 
    return `Passiv`;
 }
}

function checkAgeGroup(member){
  if(member.age >= 60){
    return `SeniorPlus`;
    } else if(member.age >= 18) {
      return `Senior`;
    } else {
        return `Junior`;
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
            // incomeTotal= incomeTotal + 1000;
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

function isActive(member){
  if (member.active == "true") {
    return `Aktiv`;
  } else {
    return `Passiv`;
  }
}

function isInCompetionen(member){
  if (member.competition === "true") {
    return `Konkurrencesvømmer`;
  } else {
    return `Motionist`;
  }
}

function checkSwimteam(member){
  if(member.active == "true" && member.competition == "true"){
      if(member.age >= 18){
        return `Senior`;
      }
    } else {
      return `Junior`;
  }
}


function controlDiscipline(event){
  //Prevents user from setting a discipline for a member that is not a competition swimmer.
  //And likewise enables the option for competition swimmers
  if (event.target.value === "true"){
    document.querySelector("#discipline").disabled = false;
    document.querySelector("#discipline-update").disabled = false;
  } else {
    document.querySelector("#discipline-update").disabled = true;
    document.querySelector("#discipline").disabled = true;
    document.querySelector("#discipline-update").value = "";
    document.querySelector("#discipline").value = "";
  }
}

function setActiveView(event){
  // Loops through all buttons and removes the "active" class for all. Then adds the active class to the clicked button.
 const buttons = document.querySelectorAll("header button");
  for(const button of buttons){
    button.classList.remove("active");
  }
  event.target.classList.add("active");
}

export {prepareData, checkMembership, checkAgeGroup, totalDebt, totalIncome, isActive, isInCompetionen, checkSwimteam, controlDiscipline, setActiveView};