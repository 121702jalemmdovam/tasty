const qutu = document.getElementById('card')

let limit = 3;
let page = 1;

async function getProducts(){
    const response = await axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?limit=${limit}&page=${page}`)
    const data = await response.data
    db = data

    db.map(item => {
        const box = document.createElement('div')
        box.className = "cardList"
        box.innerHTML =`
        <img src="${item.image}" alt="photo">
        <p> ${item.title}</p>
        <h1>$ ${item.price}</h1>
        <div class ="jsBtn">  
            <button class = "cardBtn" onclick = "addToCard(${item.id})">SEPETE EKLE </button>
            <button class = "wishlistBtn" onclick = "addToWishlist(${item.id})">SEVIMLI</button>
        </div>
        `
        qutu.appendChild(box)
    })
    page++
}
document.getElementById('load').addEventListener('click',getProducts)

function addToCard(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productItem = cart.find(item => item.id == id)
    if(productItem){
        productItem.count = (productItem.count || 1) + 1
    } else{
        cart.push(db.find(item => item.id == id))
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}
function addToWishlist(id){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let productItem = wishlist.find(item => item.id == id)

    if(productItem){
        alert('aysysysysys')
    } else {
        wishlist.push(db.find(item => item.id == id))
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
}
getProducts()