/* eslint-disable linebreak-style */
// Ajout d'éléments dynamique dans le DOM
//  Appel vers l'API avec fetch
fetch('http://localhost:3000/api/products')
	.then (res => res.json())
	.then (data => {
		const articles = data;
		console.log(articles);
		if(articles){
			// Création d'une boucle pour 
			for (let i = 0; i < articles.length;i++) {

				// Insertion des produits dans la page d'accueil 

				// Création du lien cliquable
				let lienProduit = document.createElement('a');
				document.querySelector('.items').appendChild(lienProduit);
				lienProduit.href = `product.html?id=${articles[i]._id}`;
        
				// Insertion d'un article dans le conteneur lien
				let productArticle = document.createElement('article');
				lienProduit.appendChild(productArticle);
        
				// Insertion d'une image dans le conteneur lien
				let productImage = document.createElement('img');
				productArticle.appendChild(productImage);
				productImage.src = articles[i].imageUrl;
				productImage.alt = articles[i].altTxt;
    
				// Insertion d'un titre dans le conteneur lien
				let productName = document.createElement('h3');
				productArticle.appendChild(productName);
				productName.classList.add('productName');
				productName.innerHTML = articles[i].name;

				// Insertion d'un paragraphe dans le conteneur lien
				let productDescription = document.createElement('p');
				productArticle.appendChild(productDescription);
				productDescription.classList.add('productName');
				productDescription.innerHTML = articles[i].description;
			}
		}
        
		else{
			alert('problème fetch');
		}
	})
	.catch(erreur => alert(erreur));
    
// Appelle de la fonction