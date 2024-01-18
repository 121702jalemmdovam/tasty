const qutu = document.getElementById("card")

function getProducts(){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    qutu.innerHTML = ""

    wishlist.map((item,index)=>{
        const box = document.createElement('div')
        box.className = "cardList"
        box.innerHTML = `
        <img src="${item.image}" alt="photo">
        <p> ${item.title}</p>
        <h1>$ ${item.price}</h1>
        <div class ="jsBtn">  
        <button class = "wishlistBtn" onclick = "removeItem(${index})">SIL</button>
        </div>
        `
        qutu.appendChild(box)
    })
}

function removeItem(index){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    wishlist.splice(index,1)
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

getProducts()