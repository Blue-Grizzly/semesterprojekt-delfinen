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


function filterPaidMembers(memberList){
  return memberList.filter((member) => member.debt === 0);
}

function filterUnpaidMembers(memberList){
  return memberList.filter((member) => member.debt !== 0);
}

function totalIncome(list){
  console.log(list);
  let incomeTotal = 0;
      for(let i=0; i < list.length; i++){
        const memberGroup = checkAgeGroup(list[i]);
        console.log(memberGroup)
      if(list[i].active === true){ 
          if(memberGroup === "Senior"){
            incomeTotal += 1600;
          } else if(memberGroup === "SeniorPlus"){
            console.log("senior plus")
            incomeTotal += 1200;
          } else{
            console.log("junior")
            incomeTotal += 1000;
          }
      } else{
        incomeTotal += 500;

    } 
    console.log(incomeTotal);
  }
  return incomeTotal;
}   


function totalDebt(list){
  let debtTotal = 0;
      for(const member of list){
         debtTotal += Number(member.debt);
      }
    console.log(debtTotal);
  return debtTotal;
}    


  export {prepareData, checkMembership, checkAgeGroup, filterPaidMembers, filterUnpaidMembers, totalDebt, totalIncome};