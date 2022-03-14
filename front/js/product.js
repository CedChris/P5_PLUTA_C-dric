// Création d'une variable contenant l'ID de la page
let locationUrl = new URL(document.location).searchParams;
let id = locationUrl.get("id");

const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const containerImage = document.querySelector(".item__img");
const color = document.querySelector("#colors");


// Appelle de l'API pour l'insertion des éléments stockés dans l'URL

const product = fetch(`http://localhost:3000/api/products/${id}`)

.then (res => res.json())
.then (data => {

let articles = data;

// Insertion de l'image du produit

let productImage = document.createElement('img');
containerImage.appendChild(productImage);
productImage.src = articles.imageUrl;

// Insertion du nom,prix et description du produit

productTitle.innerHTML = articles.name;
productPrice.innerHTML = articles.price;
productDescription.innerHTML = articles.description;

// Création d'une boucle pour prendre les différentes valeurs associées au produit

for (let i = 0; i < articles.colors.length; i++){
      
  let optionValue = document.createElement("option");
  color.appendChild(optionValue);
  optionValue.innerText = articles.colors[i];
    
};

 
// Ajout des produits sélectionnés dans le panier
const btnPanier = document.getElementById("addToCart");
const quantityPanier = document.getElementById("quantity")
const productColor = document.querySelector("#colors")

  // Ajout d'un événement au clic sur le bouton "Ajouter"
btnPanier.addEventListener("click" , () => {
    // Création d'une instruction avec des conditions sur la quantité et les couleurs
if (quantityPanier.value > 0 && quantityPanier.value < 100 && productColor.value && productColor != null){
    
let produitPanier = {

  name: productTitle.innerHTML,
  image: articles.imageUrl,
  price: productPrice.innerHTML,
  colors: productColor.value,
  quantity: quantityPanier.value,
  _id: id,

};

// Création du localStorage

let produitLocal = JSON.parse(localStorage.getItem("produit"));

// Ajout d'une instruction pour gérer le contenu du panier

if (produitLocal) {

// Connaitre le contenu du localstorage

  const resultat = produitLocal.find(
  (p) => p.colors === productColor.value && p._id === produitPanier._id);
      
// Si les conditions du résultat sont rempli, on additionne les quantités

if (resultat) {

  let totalQtt = parseInt(resultat.quantity) + parseInt(produitPanier.quantity);
  resultat.quantity = totalQtt;
  localStorage.setItem("produit", JSON.stringify(produitLocal));
  alert('votre produit a été ajouter au panier.')
}
// Sinon, ajoute le produit sélectionné au localstorage.
else {

  produitLocal.push(produitPanier);
  localStorage.setItem("produit", JSON.stringify(produitLocal));
  alert('votre produit a été ajouter au panier.')
}
}

// Si le local storage est vide, on crée un tableau, on y ajoute le panier et on l'envoi au Local storage.

else {

  produitLocal =[];
  produitLocal.push(produitPanier);
  localStorage.setItem("produit", JSON.stringify(produitLocal));
  alert('votre produit a été ajouter au panier.')
}
};
}); 
});


