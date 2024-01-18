const popularproduct = document.getElementById("popularproduct");
const filter = document.getElementById("filter");
const myForm = document.getElementById("myForm");
const inp = document.getElementById("example");
const inpT = document.getElementById("example1");
const nameInp = document.getElementById("nameInp");
const nameBtn = document.getElementById("nameBtn");

function getProducts() {
  popularproduct.innerHTML = ``;
  axios
    .get(`https://65680f2a9927836bd97406ef.mockapi.io/food/products`)
    .then((res) => {
      products = res.data;
      products.map((item) => {
        let product = document.createElement("div");
        product.className =
          "proBox col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4";
        product.innerHTML = `
            <img src="${item.image}" alt="">
            <p>${item.name}</p>
            <p>${item.price}</p>
            <button onclick="removeItem(${item.id})">Remove</button>
            `;
        popularproduct.appendChild(product);
      });
    });
}
getProducts();

function removeItem(id) {
  axios
    .delete(`https://65680f2a9927836bd97406ef.mockapi.io/food/products/${id}`)
    .then((res) => {
      getProducts();
    });
}

function postProduct(e) {
  e.preventDefault();
  axios
    .post(`https://65680f2a9927836bd97406ef.mockapi.io/food/products`, {
      name: inp.value,
      price: inpT.value,
    })
    .then((res) => {
      getProducts();
      myForm.reset();
    });
}

myForm.addEventListener("submit", postProduct);

function getByName() {
  popularproduct.innerHTML = ``;
  axios
    .get(`https://65680f2a9927836bd97406ef.mockapi.io/food/products`)
    .then((res) => {
      products = res.data;
      let filteredData = products.filter((item) =>
        item.name.toLowerCase().startsWith(nameInp.value.toLowerCase())
      );
      filteredData.map((item) => {
        let product = document.createElement("div");
        product.className =
          "proBox col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4";
        product.innerHTML = `
            <img src="${item.image}" alt="">
            <p>${item.name}</p>
            <p>${item.price}</p>
            <button onclick="removeItem(${item.id})">Remove</button>
            `;
        popularproduct.appendChild(product);
        nameInp.value = ``;
      });
    });
}

nameBtn.addEventListener("click", getByName);

function sortedFunction(){
    popularproduct.innerHTML = ""
    let selectvalue = filter.value 

    if(selectvalue === "2"){
        let page = 1
        let limit = 6
        
        axios.get(`https://65680f2a9927836bd97406ef.mockapi.io/food/products?page=${page}&limit=${limit}`)
        .then(res =>{
            products = res.data
            let sortPro = products.sort((a,b) => a.name.localeCompare(b.name))
            sortPro.map(item => {
                let product = document.createElement('div')
                product.className = 'proBox col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4'
                product.innerHTML = `
                <img src="${item.image}" alt="">
                <p>${item.name}</p>
                <p>${item.price}</p>
                <button onclick="addtoBasket(${item.id})">Add to cart</button>
                `
                popularproduct.appendChild(product)
            })
            page++
        })
    }
}

filter.addEventListener('change',sortedFunction)

function sortFunction(){
    popularproduct.innerHTML = ""
    let selectvalue = filter.value 

    if(selectvalue === "3"){
        let page = 1
        let limit = 6
        
        axios.get(`https://65680f2a9927836bd97406ef.mockapi.io/food/products?page=${page}&limit=${limit}`)
        .then(res =>{
            products = res.data
            let sortPro = products.sort((a,b) => b.name.localeCompare(a.name))
            sortPro.map(item => {
                let product = document.createElement('div')
                product.className = 'proBox col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4'
                product.innerHTML = `
                <img src="${item.image}" alt="">
                <p>${item.name}</p>
                <p>${item.price}</p>
                <button onclick="addtoBasket(${item.id})">Add to cart</button>
                `
                popularproduct.appendChild(product)
            })
            page++
        })
    }
}

filter.addEventListener('change',sortFunction)