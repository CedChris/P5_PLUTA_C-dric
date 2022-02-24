// Création d'une variable contenant d'ID de la page
let locationUrl = new URL(document.location).searchParams;
let id = locationUrl.get("id");

const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const containerImage = document.querySelector(".item__img");
const color = document.querySelector("#colors");


// Appelle de l'API pour l'insertion des éléments stockés dans l'URL
function domProducts () {

const product = fetch(`http://localhost:3000/api/products/${id}`)
.then (res => res.json())

.then (data => {
    articles = data;
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
})
};
domProducts();

// Ajout des produits sélectionnés dans le panier

function addPanier () {
  const btnPanier = document.getElementById("addToCart");
  const quantityPanier = document.getElementById("quantity")
  const productColor = document.querySelector("#colors")
  
  btnPanier.addEventListener("click" , () => {
    
    // 
    if (quantityPanier.value > 0 && quantityPanier.value < 100 && productColor.value && productColor != null){
    let produitPanier =  {
      name: productTitle.innerHTML,
      image: articles.imageUrl,
      price: productPrice.innerHTML,
      colors: productColor.value,
      quantity: quantityPanier.value,
      _id: id,
    };

    let produitLocal = [];

    if(localStorage.getItem("produits") !==null){

      
      produitLocal = JSON.parse(localStorage.getItem("produits"))
      localStorage.clear();
    }

    produitLocal.push(produitPanier);
    localStorage.setItem('produits' , JSON.stringify(produitLocal));
    console.table(produitLocal) 
  }})



};


addPanier();
//     let arrayProductsInCart = [];
      
//       // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
//       if (localStorage.getItem("produit") !== null) {
//         arrayProductsInCart = JSON.parse(localStorage.getItem("produit"));
        
        
//         // Si le LS est vide, on le crée avec le produit ajouté
//       } 
//         arrayProductsInCart.push(produitPanier);
//         localStorage.setItem("produit", JSON.stringify(arrayProductsInCart));
//     // let produitLocalStorage = localStorage.setItem('produit', JSON.stringify(produitPanier));
//     // produitLocalStorage.push(produitPanier);
//     // alert(`${articles.name} a été ajouté`);

//     // if (produitLocalStorage !== null) {
//     //       for (let i= 0; i < produitLocalStorage.length; i++)
//     //       produitLocalStorage.push(produitPanier);
    
//     // // }
//   }
//   else (console.log(alert("erreur")))

// }
// )




    // ajoutPanier => {
    
//     btnPanier.addEventListener("click", () =>{


//         // if (quantitePanier.value > 0 && quantitePanier.value < 100){
            // let produitPanier = {
            //     name: productTitle.innerHTML,
            //     price: parsefloat(productPrice.innerHTML),
            //     quantity: parsefloat(quantityPanier.value),
            //     _id: id,
            // }
            
//         // }
//     })
// }
