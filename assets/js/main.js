let title = document.getElementById("title")
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let btnDelAll = document.getElementById("deleteAll");
let tmp;
let mood = "create"

//get total
function getTotal() {
  if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background="#23791e"
  } else {
    total.style.background = "orangered";
    total.innerHTML = "";
  }
};

//creat product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product)
}else{
  dataProduct = [];
};
submit.onclick = function () {
  total.style.background = "orangered";
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && price.value != "" && count.value < 100 && category != "") {
    if (mood === "create") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
    dataProduct.push(newProduct);
    }
  } else {
    dataProduct[tmp] = newProduct;
    count.style.display = "block";
    submit.innerHTML = "Create";

    }
  clearData();
  }
  localStorage.setItem('product', JSON.stringify(dataProduct));
  
  showData();
}

//clear
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read
function showData() {
  let table = ``
  for (let i = 0; i < dataProduct.length; i++){
    table += `
    <tr>
      <td>${i+1}</td>
      <td>${dataProduct[i].title}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].taxes}</td>
      <td>${dataProduct[i].ads}</td>
      <td>${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateData(${i})"  id="update">Update</button></td>
      <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
    </tr>
    `
  }
  document.getElementById("tbody").innerHTML = table;
  if (dataProduct.length > 0) {
    btnDelAll.innerHTML =`<button onclick="deleteAll()">Delete All ( ${dataProduct.length} )</button>`
  } else {
    btnDelAll.innerHTML = '';
  }
}
showData();

// delete

function deleteProduct(i) {
  dataProduct.splice(i,1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
//delete all
function deleteAll() {
  dataProduct = [];
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function updateData(i) {
  mood = "update";
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior:"smooth",
  })
}

//search
let searchMood = "title"
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  };
  search.focus();
  search.value = "";
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++){
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})"  id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    } else {
      if (dataProduct[i].category.includes(value)) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})"  id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
