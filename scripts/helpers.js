
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

function checkAgeGroup(member){
  if(member.age >= 60){
    return `SeniorPlus`;
    } else if(member.age >= 18) {
      return `Senior`;
    } else {
        return `Junior`;
    }
}

function sortBySelectedResults(list){
  const selectedSort = document.querySelector("#results-table").getAttribute("sortOption");
  if(selectedSort === "Place"){
    return list.sort((a, b) =>  a.placering - b.placering);
  } else if(selectedSort === "Date"){
    return list.sort((a, b) =>  b.dato - a.dato);
  } else if(selectedSort === "Discipline"){
    return list.sort((a, b) => a.discipline.localeCompare(b.discipline));
  } else if(selectedSort === "Note"){
    return list.sort((a, b) => a.noter.localeCompare(b.noter));
  } else if(selectedSort === "Event"){
    return  list.sort((a, b) => a.stævne.localeCompare(b.stævne));
  } else if(selectedSort === "Swimmer"){
    return list.sort((a, b) => a.svømmer.localeCompare(b.svømmer));
  } else if(selectedSort === "Time"){
    return list.sort((a, b) =>  a.tid - b.tid);
  } else {
    return list
  }
}

function filterByDiscipline(list){
const selectedFilter = document.querySelector("#results-table").getAttribute("filterOption");
  if(selectedFilter === "Bryst"){
    return list.filter((result) => result.discipline == "Bryst");
  } else if(selectedFilter === "Crawl"){
    return list.filter((result) => result.discipline == "Crawl");
  } else if(selectedFilter === "Ryg"){
    return list.filter((result) => result.discipline == "Ryg");
  } else if(selectedFilter === "Butterfly"){
    return list.filter((result) => result.discipline == "Butterfly");
  } else {
    return list
  }
}

function filterMembersDebt(members){
  const selectedFilter = document.querySelector("#data-table").getAttribute("filterOption");
    if(selectedFilter == "paid"){
  return members.filter((member) => member.debt == "0");
    } else if (selectedFilter == "unpaid"){
      return members.filter((member) => member.debt != "0");
    } else {
      return members;
  }
}

function sortBySelected(members){
  const selectedSort = document.querySelector("#data-table").getAttribute("sortOption");
  if(selectedSort === "name"){
  return members.sort((a, b) => a.name.localeCompare(b.name));
  } else if(selectedSort === "debt"){
    return  members.sort((a, b) =>  b.debt - a.debt );
  } else if(selectedSort === "membership"){
    return members.sort((a, b) => b.active.localeCompare(a.active));
  } else if(selectedSort === "age"){
    return members.sort((a, b) => a.age - b.age); 
  } else {
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

function controlDiscipline(event){
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

export {prepareData, checkMembership, checkAgeGroup, filterByDiscipline, filterMembersDebt, totalDebt, totalIncome, isActive, isInCompetionen, checkSwimteam, sortBySelected, controlDiscipline, sortBySelectedResults};