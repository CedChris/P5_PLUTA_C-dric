// Ajout d'éléments dynamique dans le DOM

//  Appel vers l'API avec fetch
function addDomIndex (){
const product = fetch('http://localhost:3000/api/products')
    .then (res => res.json())
    .then (data => {
        const articles = data;
        
        // Création
        for (i = 0; i < articles.length;i++) {

        // Insertion des produits dans la page d'accueil 

        // Création du lien cliquable
        let lienProduit =
        document.createElement("a");
        document.querySelector(".items")
        .appendChild(lienProduit);
        lienProduit.href = `product.html?id=${articles[i]._id}`;
        
        // Insertion d'un article dans le conteneur lien
        let productArticle = 
        document.createElement("article");
        lienProduit.appendChild(productArticle);
        
        // Insertion d'une image dans le conteneur lien
        let productImage = document.createElement("img");
        productArticle.appendChild(productImage);
        productImage.src = articles[i].imageUrl;
        productImage.alt = articles[i].altTxt;
    
        // Insertion d'un titre dans le conteneur lien
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = articles[i].name;

        // Insertion d'un paragraphe dans le conteneur lien
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = articles[i].description;
    }});
}
// Appelle de la fonction
addDomIndex();










// const product = fetch('http://localhost:3000/api/products')
//     .then (res => res.json())
//     .then (data => console.log(data))

// const productImage = product.then(product => img.src = product[0].imageUrl)

// console.log(productImage)