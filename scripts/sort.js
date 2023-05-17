function sortBySelectedResults(list) {
  const selectedSort = document
    .querySelector("#results-table")
    .getAttribute("sortOption");
  if (selectedSort === "Place") {
    return list.sort((a, b) => a.placering - b.placering);
  } else if (selectedSort === "Date") {
    return list.sort((a, b) => b.dato - a.dato);
  } else if (selectedSort === "Discipline") {
    return list.sort((a, b) => a.discipline.localeCompare(b.discipline));
  } else if (selectedSort === "Note") {
    return list.sort((a, b) => a.noter.localeCompare(b.noter));
  } else if (selectedSort === "Event") {
    return list.sort((a, b) => a.stævne.localeCompare(b.stævne));
  } else if (selectedSort === "Swimmer") {
    return list.sort((a, b) => a.svømmer.localeCompare(b.svømmer));
  } else if (selectedSort === "Time") {
    return list.sort((a, b) => a.tid - b.tid);
  } else {
    return list;
  }
}

function sortBySelected(members) {
  const selectedSort = document
    .querySelector("#data-table")
    .getAttribute("sortOption");
  if (selectedSort === "name") {
    return members.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === "debt") {
    return members.sort((a, b) => b.debt - a.debt);
  } else if (selectedSort === "membership") {
    return members.sort((a, b) => b.active.localeCompare(a.active));
  } else if (selectedSort === "age") {
    return members.sort((a, b) => a.age - b.age);
  } else {
    return members;
  }
}

export{sortBySelected, sortBySelectedResults};