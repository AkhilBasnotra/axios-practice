document.addEventListener("DOMContentLoaded", loadItem);
let myform = document.querySelector(".my-form");
let items = document.querySelector("#items");
let url =
  "https://crudcrud.com/api/b5f0bbfc8d134208ac4f2796d61a9c20/appointments";

myform.addEventListener("submit", addItem);

// function getacall(e) {
//   if (myform.dataset.id) {
//     editItem();
//   } else {
//     addItem(e);
//   }
// }

function addItem(e) {
  e.preventDefault();

  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone").value;
  let date = document.querySelector("#date").value;
  let time = document.querySelector("#time").value;

  let myObj = {
    name,
    email,
    phone,
    date,
    time,
  };

  axios
    .post(url, myObj)
    .then((response) => {
      addListItem(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function loadItem() {
  axios
    .get(url)
    .then((response) => {
      let items = response.data;
      items.forEach((element) => {
        addListItem(element);
      });
    })
    .catch((error) => console.error(error));
}

function removeFromServer(li) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}/${li.dataset.id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function removeItem(e) {
  if (e.target.classList.contains("del")) {
    if (confirm("Are you sure?")) {
      let li = e.target.parentElement;
      removeFromServer(li);
    }
  }
}

function addListItem(myObj) {
  let li = document.createElement("li");
  li.dataset.id = myObj._id;
  li.appendChild(
    document.createTextNode(
      `${myObj.name}, ${myObj.email}, ${myObj.phone}, ${myObj.date}, ${myObj.time}`
    )
  );

  let delBtn = document.createElement("button");
  delBtn.classList = "del";
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.addEventListener("click", removeItem);

  let editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  editBtn.addEventListener("click", function (e) {
    editItem(e, myObj);
  });

  items.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(editBtn);
}

function editItem(e, myObj) {
  let li = e.target.parentElement;
  let data = li.dataset;

  removeFromServer(li)
    .then(() => {
      li.remove();
    })
    .catch((error) => {
      console.error(error);
    });

  // items.removeChild(li);

  // myform.dataset.id = data.id;
  // editDetails(li);

  document.querySelector("#name").value = myObj.name;
  document.querySelector("#email").value = myObj.email;
  document.querySelector("#phone").value = myObj.phone;
  document.querySelector("#date").value = myObj.date;
  document.querySelector("#time").value = myObj.time;
}

// function editDetails(li) {
//   axios
//     .put(`${url}/${li.dataset.id}`, editedObj)
//     .then((response) => {})
//     .catch((error) => console.error(error));
// }
