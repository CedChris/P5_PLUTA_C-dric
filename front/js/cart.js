// Récupération du contenu du local storage
let dataLocalStorage = JSON.parse(localStorage.getItem("produit"));
let containerPanier = document.querySelector("#cart__items")
console.log(dataLocalStorage)

// Ajout dans le DOM de(s) produit(s) stocké(s) dans le localstorage
function addDomCart() {
    
// Boucle pour avoir la totalité des éléments du tableau stocké dans le localStorage
for (i = 0; i < dataLocalStorage.length; i++){
    
// Ajout dans le DOM des éléments stockés dans le localStorage
    let containerCart = document.createElement("article"); 
    containerCart.classList.add("cart__item");
    containerPanier.appendChild(containerCart);
    
    let containerImage = document.createElement("div");
    containerImage.classList.add("cart__item__img");
    containerCart.appendChild(containerImage);  

    let cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    containerCart.appendChild(cartItemContent);
    
    let cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartItemContentDescription); 
    
    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);
        
    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add("cart__item_content__settings__quantity");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity); 
        
    let cartImage = document.createElement("img");
    containerImage.appendChild(cartImage);
    cartImage.src = dataLocalStorage[i].image;

    let cartItemContentDescriptionTitle = document.createElement("h2")
    cartItemContentDescription.appendChild(cartItemContentDescriptionTitle)
    cartItemContentDescriptionTitle.innerHTML = dataLocalStorage[i].name;

    let cartItemContentDescriptionText = document.createElement("p")
    cartItemContentDescription.appendChild(cartItemContentDescriptionText)
    cartItemContentDescriptionText.innerHTML = dataLocalStorage[i].colors;

    let cartItemContentDescriptionPrice = document.createElement("p")
    cartItemContentDescription.appendChild(cartItemContentDescriptionPrice)
    cartItemContentDescriptionPrice.innerHTML = (`${dataLocalStorage[i].price} €`)
    
    let cartItemContentSettingsQuantityNumber = document.createElement("p")
    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityNumber);
    cartItemContentSettingsQuantityNumber.innerHTML = (`Qté: ${dataLocalStorage[i].quantity}`)

    let cartItemContentSettingsQuantityInput = document.createElement("input");
    cartItemContentSettingsQuantityInput.type = "number";
    cartItemContentSettingsQuantityInput.name = "ItemQuantity";
    cartItemContentSettingsQuantityInput.min = "1";
    cartItemContentSettingsQuantityInput.max = "100";
    cartItemContentSettingsQuantityInput.value = dataLocalStorage[i].quantity;
    cartItemContentSettingsQuantityInput.classList.add("itemQuantity");
    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityInput);
    cartItemContentSettingsQuantityInput.innerHTML = (`Qté: ${dataLocalStorage[i].quantity}`);

    let cartItemContentSettingsDelete = document.createElement("div")
    cartItemContentSettingsDelete.classList.add("cart__item_content__settings__delete");
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete); 
        
    let cartItemContentSettingsDeleteBtn = document.createElement("button")
    cartItemContentSettingsDeleteBtn.classList.add("deleteItem")
    cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteBtn);
        
    cartItemContentSettingsDeleteBtn.innerHTML = "Supprimer"
}}
addDomCart ();

// Fonction de suppression d'un article

function supProduit (){

    let deleteItem = document.querySelectorAll(".deleteItem")
    for (let d = 0; d < deleteItem.length; d++){
        deleteItem[d].addEventListener('click' ,(event) =>{
        event.preventDefault();
        let idDeleteItem = dataLocalStorage[d]._id;

        dataLocalStorage = dataLocalStorage.filter( (element) => element._id !== idDeleteItem)
        localStorage.setItem("produit", JSON.stringify(dataLocalStorage))
        location.reload();

        alert ("Le produit a été retiré de votre panier")
             
    });
    
}};
supProduit ();

// Calcul du prix total en fonction de(s) quantité(s)
function Totaux(){

    // Récupération du total des quantités
    let domQuantity = document.getElementsByClassName('itemQuantity');
    let allQuantityDom = domQuantity.length,
    totalQuantity = 0;

    for (let i = 0; i < allQuantityDom; ++i) {
    totalQuantity += domQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;

    totalPrice = 0;

    for (var i = 0; i < allQuantityDom; ++i) {
        totalPrice += (domQuantity[i].valueAsNumber * dataLocalStorage[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
Totaux();

// 
function modificationQuantite() {
    let modifQuantity = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < modifQuantity.length; i++){
        modifQuantity[i].addEventListener("change" , (event) => {
            event.preventDefault();

            let quantityModif = dataLocalStorage[i].quantity;
            let modifQuantityValue = modifQuantity[i].valueAsNumber;
            
            const result = dataLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            result.quantity = modifQuantityValue;
            dataLocalStorage[i].quantity = result.quantity;         
            localStorage.setItem("produit", JSON.stringify(dataLocalStorage));
    
            location.reload();
            
        })
    }
}
modificationQuantite();


let formFirstName = document.querySelector("#firstName");
let formLastName = document.querySelector("#lastName");
let formAddress = document.querySelector("#address");
let formCity = document.querySelector("#city");
let formEmail = document.querySelector("#email");
let form = document.querySelector(".cart__order__form")

    form.firstName.addEventListener('change', function(){
        validationFirstName(this)
    });
    const validationFirstName = function(formFirstName){
        let nameRegExp = new RegExp ("^[A-zÀ-ú' -]*$");
        let testFirstName = nameRegExp.test(formFirstName.value)
        console.log(testFirstName)
    
    if(testFirstName){
        let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg")
        firstNameErrorMsg.innerHTML = ""
    }
    else{
        let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg")
        firstNameErrorMsg.innerHTML = "Veuillez remplir correctement votre prénom"
    }
}
    form.lastName.addEventListener('change', function(){
    validationLastName(this)
    });
    const validationLastName = function(formLastName){
        let nameRegExp = new RegExp ("^[A-zÀ-ú' -]*$");
        let testLastName = nameRegExp.test(formLastName.value)
        console.log(testLastName)

    if(testLastName){
        let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
        firstNameErrorMsg.innerHTML = ""
}
    else{
        let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
        lastNameErrorMsg.innerHTML = "Veuillez remplir correctement votre nom"
    }
}
form.address.addEventListener('change', function(){
    validationAddress(this)
    });
    const validationAddress = (formAddress) =>{
        let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
        let testAddress = addressRegExp.test(formAddress.value)
        console.log(testAddress)

    if(testAddress){
        let addressErrorMsg = document.querySelector("#addressErrorMsg")
        addressErrorMsg.innerHTML = ""
}
    else{
        let addressErrorMsg = document.querySelector("#addressErrorMsg")
        addressErrorMsg.innerHTML = "Veuillez remplir correctement votre adresse"
    }
}
form.city.addEventListener('change', function(){
    validationCity(this)
    });
    const validationCity = (formCity) =>{
        let nameRegExp = new RegExp ("^[A-zÀ-ú' -]*$");
        let testCity = nameRegExp.test(formCity.value)
        console.log(testCity)

    if(testCity){
        let lastNameErrorMsg = document.querySelector("#cityErrorMsg")
        firstNameErrorMsg.innerHTML = ""
}
    else{
        let cityErrorMsg = document.querySelector("#cityErrorMsg")
        cityErrorMsg.innerHTML = "Veuillez remplir correctement votre ville"
    }
}
    form.email.addEventListener('change', function () {
        validationEmail(this)
    });
    const validationEmail = (formEmail) =>{
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let testEmail = emailRegExp.test(formEmail.value)
        console.log(testEmail)

    if(testEmail){
        let emailErrorMsg = document.querySelector("#emailErrorMsg")
        emailErrorMsg.innerHTML = ""
}
    else{
        emailErrorMsg.innerHTML = "Veuillez remplir correctement votre e-mail"
    }
}




const btn_commander = document.getElementById("order");

    
    btn_commander.addEventListener("click", (event)=>{
        
        // Supprimer l'événement par défaut du bouton d'envoi
    
        event.preventDefault();   

        // Récupération des données du formulaire

        let inputFirstName = document.querySelector('#firstName');
        let inputLastName = document.querySelector('#lastName');
        let inputAdress = document.querySelector('#address');
        let inputCity = document.querySelector('#city');
        let inputMail = document.querySelector('#email');

        // Ajout de l'identifiant produit depuis le localstorage dans un tableau

        let idProduits = [];
        for(let i = 0; i < dataLocalStorage.length; i++){
            idProduits.push(dataLocalStorage[0]._id);
        }

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
        } 

        // Initialiser une variable contenant la méthode "POST"

        const postFormulaire = {
            method: 'POST',
            body: JSON.stringify(commande),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
    
        //  Appelle a l'API pour l'envoie des données avec 
        if( !inputFirstName.value || !inputLastName.value || !inputAdress.value || !inputCity.value || !inputMail.value){
            alert("Veuillez remplir le formulaire s'il vous plait")
        }
        else{
            fetch("http://localhost:3000/api/products/order", postFormulaire)
            .then((response) => response.json())
            .then((data) => {
            let produit = data
            localStorage.clear();
            localStorage.setItem("orderId", produit.orderId);

            document.location.href = "confirmation.html";
            })
        }
        
    })