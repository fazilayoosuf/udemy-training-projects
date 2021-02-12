let issuedBookList = document.getElementById("issuedbooklist");
let count = 0;
const bookMapping = {
  ramesh: [{ bookName: "ja_1" }, { bookName: "jS_1" }, { bookName: "no_1" }],
  suresh: [{ bookName: "ja_2" }, { bookName: "jS_2" }],
  gopi: [{ bookName: "ja_3" }],
};
for (let key in bookMapping) {
  const userName = key;
  count++;
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<th>${count}</th>
    <td>${userName}</td> `;
  const tableData = document.createElement("td");
  const ul = document.createElement("ul");

  bookMapping[key].forEach(function (book) {
    ul.innerHTML += `<li>${book.bookName} </li>`;
    tableData.append(ul);
    tableRow.append(tableData);
  });

  issuedBookList.appendChild(tableRow);
}
