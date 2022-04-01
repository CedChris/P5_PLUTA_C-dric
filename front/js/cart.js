/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */

// Récupération du contenu du local storage
let dataLocalStorage = JSON.parse(localStorage.getItem('produit'));
let containerPanier = document.querySelector('#cart__items');
console.log(dataLocalStorage);
// Ajout dans le DOM de(s) produit(s) stocké(s) dans le localstorage
if(dataLocalStorage){

	let article = [];
	let arrayPrice = [];
	async function apiCall(){
		for(let i = 0; i < dataLocalStorage.length; i++){
			let allIdProduct = dataLocalStorage[i]._id;
			console.log(allIdProduct);
			await fetch(`http://localhost:3000/api/products/${allIdProduct}`)
				.then((res)=> res.json())
				.then((data) => {article = data;
					arrayPrice.push(article.price);});
		}
	}
	// Affichage du panier
	function affichagePanier(){
		for(let i = 0; i < dataLocalStorage.length;i++){
			containerPanier.insertAdjacentHTML('beforeend', ` 
				<article class="cart__item" data-id="{${dataLocalStorage[i]._id}}" data-color="{${dataLocalStorage[i].colors}}">
				<div class="cart__item__img">
					  <img src=${article.imageUrl} alt="${article.altTxt}">
				</div>
				<div class="cart__item__content">
					  <div class="cart__item__content__description">
						<h2>${article.name}</h2>
						<p>${dataLocalStorage[i].colors}</p>
						<p class="priceDom">${article.price}€</p>
					  </div>
					  <div class="cart__item__content__settings">
						<div class="cart__item__content__settings__quantity">
							  <p>Qté : </p>
							  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${dataLocalStorage[i].quantity}">
						</div>
					<div class="cart__item__content__settings__delete">
						  <p class="deleteItem">Supprimer</p>
					</div>
				  </div>
				</div>
				  </article>`
			);}}
	// Suppression d'un article
	function deleteId(){
		let deleteItem = document.querySelectorAll('.deleteItem');
		console.log(article);
		for(let d = 0;d < deleteItem.length ;d++){
			deleteItem[d].addEventListener('click' ,(event) =>{
				event.preventDefault(); 
				let idColorItem = dataLocalStorage[d].id_color;
    

				dataLocalStorage = dataLocalStorage.filter( (element) => element.id_color !== idColorItem);
				localStorage.setItem('produit', JSON.stringify(dataLocalStorage));
				location.reload();
                        
			});}}
	// Calcul du prix total en fonction de(s) quantité(s)
	function totalAll(){
		let domQuantity = document.querySelectorAll('.itemQuantity');
		let allQuantityDom = domQuantity.length;
		let productTotalQuantity = document.getElementById('totalQuantity');
		let allPrice = document.querySelectorAll('.priceDom');
		console.log(allPrice);
		totalPrice = 0;
		totalQuantity = 0;

		function totaux(arguments1,arguments2){
			for (let a = 0; a < allQuantityDom; a++) {
				arguments1 += arguments2[a].valueAsNumber;
			}
			return arguments1;
		}
				
		productTotalQuantity.innerHTML = totaux(totalQuantity,domQuantity);
		for (let q = 0; q < allQuantityDom; q++) {
			totalPrice += (domQuantity[q].valueAsNumber * arrayPrice[q]);
		}
		let productTotalPrice = document.getElementById('totalPrice');
		productTotalPrice.innerHTML = totalPrice;
	}
	// Modification des quantités
	function modificationQuantite(){

		let modifQuantity = document.querySelectorAll('.itemQuantity');

		for (let q = 0; q < modifQuantity.length; q++){
			modifQuantity[q].addEventListener('change' , (event) => {
				event.preventDefault();

				let quantityModif = dataLocalStorage[q].quantity;
				let colorModif = dataLocalStorage[q].colors;
				let modifQuantityValue = modifQuantity[q].valueAsNumber;
				const result = dataLocalStorage.find((el) => el.modifQuantityValue !== quantityModif && el.colors == colorModif);

				result.quantity = modifQuantityValue;
				dataLocalStorage[q].quantity = result.quantity;         
				localStorage.setItem('produit', JSON.stringify(dataLocalStorage));
    
				location.reload();
            
			});
		}			
	}
	// Fonction qui gère les autres fonctions
	async function main(){
		await apiCall();
		affichagePanier();
		deleteId();
		totalAll();
		modificationQuantite();
	}
	main();
}
else{
	localStorage.removeItem('produit');
	containerPanier.insertAdjacentHTML('beforebegin',
		'<h3 style="text-align:center">Veuillez ajouter un article pour commander s\'il vous plait</h3>'
	);

}

// Initialisation des variables pour le formulaire

let formFirstName = document.querySelector('#firstName');
let formLastName = document.querySelector('#lastName');
let formAddress = document.querySelector('#address');
let formCity = document.querySelector('#city');
let formEmail = document.querySelector('#email');
let form = document.querySelector('.cart__order__form');

// Ajout d'évenement au changement de valeur de l'input correspondant

form.firstName.addEventListener('change', function(){
	validationFirstName(this);
});

// Vérification des entrées dans l'input correspondant avec des expressions régulière

const validationFirstName = function(formFirstName){
	let nameRegExp = new RegExp ('^[a-zA-Zàâäéèêëïîôöùûüç ,.\'-]+$');
	let testFirstName = nameRegExp.test(formFirstName.value);

	// Renvoi true si la condition est remplie, sinon renvoie false

	if(testFirstName){
		let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
		firstNameErrorMsg.innerHTML = '';
		return true;
	}
	else{
		let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
		firstNameErrorMsg.innerHTML = 'Veuillez remplir correctement votre prénom';
		return false;
	}
};
	// Ajout d'évenement au changement de valeur de l'input correspondant

form.lastName.addEventListener('change', function(){
	validationLastName(this);
});

// Vérification des entrées dans l'input correspondant avec des expressions régulière

const validationLastName = function(formLastName){
	let nameRegExp = new RegExp ('^[a-zA-Z ,.\'-]+$');
	let testLastName = nameRegExp.test(formLastName.value);

	// Renvoi true si la condition est remplie, sinon renvoie false

	if(testLastName){
		let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
		lastNameErrorMsg.innerHTML = '';
		return true;
	}
	else{
		let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
		lastNameErrorMsg.innerHTML = 'Veuillez remplir correctement votre nom';
		return false;
	}
};

// Ajout d'évenement au changement de valeur de l'input correspondant

form.address.addEventListener('change', function(){
	validationAddress(this);
});

// Vérification des entrées dans l'input correspondant avec des expressions régulière

const validationAddress = (formAddress) =>{
	let addressRegExp = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
	let testAddress = addressRegExp.test(formAddress.value);

	// Renvoi true si la condition est remplie, sinon renvoie false

	if(testAddress){
		let addressErrorMsg = document.querySelector('#addressErrorMsg');
		addressErrorMsg.innerHTML = '';
		return true;
	}
	else{
		let addressErrorMsg = document.querySelector('#addressErrorMsg');
		addressErrorMsg.innerHTML = 'Veuillez remplir correctement votre adresse';
		return false;
	}
};

// Ajout d'évenement au changement de valeur de l'input correspondant

form.city.addEventListener('change', function(){
	validationCity(this);
});

// Vérification des entrées dans l'input correspondant avec des expressions régulière

const validationCity = (formCity) =>{
	let nameRegExp = new RegExp ('^[a-zA-Z ,.\'-]+$');
	let testCity = nameRegExp.test(formCity.value);

	// Renvoi true si la condition est remplie, sinon renvoie false

	if(testCity){
		let cityErrorMsg = document.querySelector('#cityErrorMsg');
		cityErrorMsg.innerHTML = '';
		return true;
	}
	else{
		let cityErrorMsg = document.querySelector('#cityErrorMsg');
		cityErrorMsg.innerHTML = 'Veuillez remplir correctement votre ville';
		return false;
	}
};

// Ajout d'évenement au changement de valeur de l'input correspondant

form.email.addEventListener('change', function () {
	validationEmail(this);
});

// Vérification des entrées dans l'input correspondant avec des expressions régulière

const validationEmail = (formEmail) =>{
	let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
	let testEmail = emailRegExp.test(formEmail.value);

	// Renvoi true si la condition est remplie, sinon renvoie false

	if(testEmail){
		let emailErrorMsg = document.querySelector('#emailErrorMsg');
		emailErrorMsg.innerHTML = '';
		return true;
	}
	else{
        
		emailErrorMsg.innerHTML = 'Veuillez remplir correctement votre e-mail';
		return false;
	}
};


const btn_commander = document.getElementById('order');



btn_commander.addEventListener('click', (event)=>{
        
	// Supprimer l'événement par défaut du bouton d'envoi
    
	event.preventDefault();   

	// Récupération des données du formulaire

	let inputFirstName = document.querySelector('#firstName');
	let inputLastName = document.querySelector('#lastName');
	let inputAdress = document.querySelector('#address');
	let inputCity = document.querySelector('#city');
	let inputMail = document.querySelector('#email');

	// Ajout de l'identifiant produit depuis le localstorage dans un tableau
	if(dataLocalStorage){
		let idProduits = [];
		for(let i = 0; i < dataLocalStorage.length; i++){
			idProduits.push(dataLocalStorage[i]._id);
			// Initialiser une variable contenant les informations client
			const commande = {
				contact : {
					firstName: inputFirstName.value,
					lastName: inputLastName.value,
					address: inputAdress.value,
					city: inputCity.value,
					email: inputMail.value,
				},
				products: idProduits,
			};
				// Initialiser une variable contenant la méthode "POST"
			const postFormulaire = {
				method: 'POST',
				body: JSON.stringify(commande),
				headers: {
					'Accept': 'application/json', 
					'Content-Type': 'application/json' 
				},
			};
			console.log(idProduits);    
			//  Appelle a l'API pour l'envoie des données avec des conditions sur le remplissage du formulaire

			if(validationFirstName(formFirstName) && validationLastName(formLastName) && validationAddress(formAddress) && validationCity(formCity) && validationEmail(formEmail)){

				fetch('http://localhost:3000/api/products/order', postFormulaire)
					.then((response) => response.json())
					.then((data) => {
						let produit = data;
        
						localStorage.clear();
						localStorage.setItem('orderId', produit.orderId);

						document.location.href = 'confirmation.html';
					});
			}
			else{
				alert('Veuillez remplir correctement le formulaire s\'il vous plait');
			}       
		}
	}
	else{
		alert('Veuillez ajouter un produit au panier s\'il vous plait');
	}
}
	
	

	

	

	
);