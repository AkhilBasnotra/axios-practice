document.addEventListener("DOMContentLoaded", loadItems);

let form = document.querySelector(".my-form");
let itemlist = document.querySelector("#items");

form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();

  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone").value;
  let date = document.querySelector("#date").value;
  let time = document.querySelector("#time").value;

  let myObj = {
    name: name,
    email: email,
    phone: phone,
    date: date,
    time: time,
  };

  axios
    .post(
      "https://crudcrud.com/api/7543a5f1fec84883924964af1c386b35/appointmentData",
      myObj
    )
    .then((response) => {
      let responseData = response.data;
      let li = document.createElement("li");
      li.dataset.email = responseData.email;
      li.appendChild(
        document.createTextNode(
          `${responseData.name}, ${responseData.email}, ${responseData.phone}, ${responseData.date} ${responseData.time}`
        )
      );

      let delBtn = document.createElement("button");
      delBtn.className = "del";
      delBtn.appendChild(document.createTextNode("Delete"));

      delBtn.addEventListener("click", removeItem);

      let editBtn = document.createElement("button");
      editBtn.classList = "edit";
      editBtn.appendChild(document.createTextNode("Edit"));

      editBtn.addEventListener("click", editList);

      function editList(e) {
        itemlist.removeChild(li);
        document.querySelector("#name").value = name;
        document.querySelector("#email").value = email;
        document.querySelector("#phone").value = phone;
        document.querySelector("#date").value = date;
        document.querySelector("#time").value = time;
      }

      itemlist.appendChild(li);
      li.appendChild(delBtn);
      li.appendChild(editBtn);

      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#phone").value = "";
      document.querySelector("#date").value = "";
      document.querySelector("#time").value = "";
    })
    .catch((err) => console.error(err));
}

function removeItem(e) {
  if (e.target.classList.contains("del")) {
    if (confirm("Are you sure?")) {
      let li = e.target.parentElement;
      itemlist.removeChild(li);
    }
  }
}

function loadItems() {
  axios
    .get(
      "https://crudcrud.com/api/7543a5f1fec84883924964af1c386b35/appointmentData"
    )
    .then((response) => {
      let items = response.data;

      items.forEach((item) => {
        let li = document.createElement("li");
        li.dataset.email = item.email;
        li.appendChild(
          document.createTextNode(
            `${item.name}, ${item.email}, ${item.phone}, ${item.date} ${item.time}`
          )
        );

        let delBtn = document.createElement("button");
        delBtn.className = "del";
        delBtn.appendChild(document.createTextNode("Delete"));

        delBtn.addEventListener("click", removeItem);

        let editBtn = document.createElement("button");
        editBtn.classList = "edit";
        editBtn.appendChild(document.createTextNode("Edit"));

        editBtn.addEventListener("click", editList);

        function editList(e) {
          itemlist.removeChild(li);
          document.querySelector("#name").value = item.name;
          document.querySelector("#email").value = item.email;
          document.querySelector("#phone").value = item.phone;
          document.querySelector("#date").value = item.date;
          document.querySelector("#time").value = item.time;
        }

        itemlist.appendChild(li);
        li.appendChild(delBtn);
        li.appendChild(editBtn);
      });
    })
    .catch((err) => console.error(err));
}
