
function filterByDiscipline(list) {
  const selectedFilter = document.querySelector("#results-table").getAttribute("filterOption");
  if (selectedFilter === "Bryst") {
    return list.filter((result) => result.discipline == "Bryst");
  } else if (selectedFilter === "Crawl") {
    return list.filter((result) => result.discipline == "Crawl");
  } else if (selectedFilter === "Ryg") {
    return list.filter((result) => result.discipline == "Ryg");
  } else if (selectedFilter === "Butterfly") {
    return list.filter((result) => result.discipline == "Butterfly");
  } else {
    return list;
  }
}

function filterMembersDebt(members) {
  const selectedFilter = document
    .querySelector("#data-table")
    .getAttribute("filterOption");
  if (selectedFilter == "paid") {
    //must be == because you want both the number and the string to be accepted
    return members.filter((member) => member.debt == "0");
  } else if (selectedFilter == "unpaid") {
    return members.filter((member) => member.debt != "0");
  } else {
    return members;
  }
}

export{filterByDiscipline, filterMembersDebt};