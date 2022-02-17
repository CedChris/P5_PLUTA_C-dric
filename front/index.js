const product = fetch('http://localhost:3000/api/products')
.then (res => res.json())
// .then (data => console.log(data))
.then (data => {
    const articles = data;
    console.log(articles)
    for (let produit in articles) {

        
        let lienProduit = 
        document.createElement("a");
        document.querySelector(".items")
        .appendChild(lienProduit);
        lienProduit.href = `product.html?id=${articles[produit]._id}`;
        
        let productArticle = 
        document.createElement("article");
        lienProduit.appendChild(productArticle);
        
        let productImage = document.createElement("img");
        productArticle.appendChild(productImage);
        productImage.src = articles[produit].imageUrl;
        productImage.alt = articles[produit].altTxt;
    
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = articles[produit].name;

        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = articles[produit].description;
    }
})












// const product = fetch('http://localhost:3000/api/products')
//     .then (res => res.json())
//     .then (data => console.log(data))

// const productImage = product.then(product => img.src = product[0].imageUrl)

// console.log(productImage)