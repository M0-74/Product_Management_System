let title = document.getElementById(`title`);
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let temp;
let mood = "create";

/**********************************************************/
/************************** GetTotal **********************/
/**********************************************************/

function getTotal() {
  if (price.value != "") {
    let sum = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = sum;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

/**********************************************************/
/************************ UpdateData **********************/
/**********************************************************/

let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

submit.onclick = () => {
  obj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 200
  ) {
    if (mood === "create") {
      if (obj.count > 1) {
        for (let i = 0; i < obj.count; i++) {
          data.push(obj);
        }
      } else {
        data.push(obj);
      }
    } else {
      data[temp] = obj;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(data));
  showData();
};

/**********************************************************/
/************************ clearData ***********************/
/**********************************************************/

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}

/**********************************************************/
/************************ showData ************************/
/**********************************************************/

function showData() {
  getTotal();

  let table = ``;
  data.forEach((element, index) => {
    table += `
    <tr>
          <td>${index + 1}</td>
          <td>${data[index].title}</td>
          <td>${data[index].price}</td>
          <td>${data[index].taxes}</td>
          <td>${data[index].ads}</td>
          <td>${data[index].discount}</td>
          <td>${data[index].total}</td>
          <td>${data[index].category}</td>
          <td><button onClick="updateData(${index})" id='update'>update</button></td>
          <td><button onClick="deleteData(${index})" id='delete'>delete</button></td>
    </tr>
    `;
  });

  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (data.length > 0) {
    deleteAll.innerHTML = `
      <button onClick="deleteAll()">DeleteAll(${data.length})</button>
    `;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

/**********************************************************/
/************************ deleteData **********************/
/**********************************************************/

function deleteData(index) {
  data.splice(index, 1);
  localStorage.product = JSON.stringify(data);
  showData();
}

/**********************************************************/
/********************* deleteAllData **********************/
/**********************************************************/

function deleteAll() {
  localStorage.clear();
  data.splice(0);
  showData();
}

/**********************************************************/
/************************ UpdateData **********************/
/**********************************************************/

function updateData(index) {
  title.value = data[index].title;
  price.value = data[index].price;
  taxes.value = data[index].taxes;
  ads.value = data[index].ads;
  discount.value = data[index].discount;
  category.value = data[index].category;
  getTotal();
  submit.innerHTML = "UpDate";
  count.style.display = "none";
  mood = "update";
  temp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

/**********************************************************/
/********************** search Mood ***********************/
/**********************************************************/

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

/**********************************************************/
/********************** search Data ***********************/
/**********************************************************/

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.includes(value.toLowerCase)) {
        table += `
                    <tr>
                          <td>${i + 1}</td>
                          <td>${data[i].title}</td>
                          <td>${data[i].price}</td>
                          <td>${data[i].taxes}</td>
                          <td>${data[i].ads}</td>
                          <td>${data[i].discount}</td>
                          <td>${data[i].total}</td>
                          <td>${data[i].category}</td>
                          <td><button onClick="updateData(${i})" id='update'>update</button></td>
                          <td><button onClick="deleteData(${i})" id='delete'>delete</button></td>
                    </tr>
                    `;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.includes(value.toLowerCase)) {
        table += `
                    <tr>
                          <td>${i + 1}</td>
                          <td>${data[i].title}</td>
                          <td>${data[i].price}</td>
                          <td>${data[i].taxes}</td>
                          <td>${data[i].ads}</td>
                          <td>${data[i].discount}</td>
                          <td>${data[i].total}</td>
                          <td>${data[i].category}</td>
                          <td><button onClick="updateData(${i})" id='update'>update</button></td>
                          <td><button onClick="deleteData(${i})" id='delete'>delete</button></td>
                    </tr>
                    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
