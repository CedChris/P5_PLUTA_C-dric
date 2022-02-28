// Récupération du contenu du local storage
let dataLocalStorage = JSON.parse(localStorage.getItem("produits"));
let containerPanier = document.querySelector("#cart__items")


// Ajout dans le DOM de(s) produit(s) stocké(s) dans le localstorage
function addDomCart() {

for (i = 0; i < dataLocalStorage.length; i++){
    
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
}
    }
    addDomCart ();

// Fonction de suppression d'un article

function deleteCart (){

    let deleteItem = document.querySelectorAll(".deleteItem")
    for (let d = 0; d < deleteItem.length; d++){
        deleteItem[d].addEventListener('click' ,(event) =>{
            event.preventDefault();
            console.log(event)
             let idDeleteItem = dataLocalStorage[d]._id;
             console.log(idDeleteItem)

             dataLocalStorage = dataLocalStorage.filter( (element) => element._id !== idDeleteItem)
             localStorage.setItem("produits", JSON.stringify(dataLocalStorage))
             
             location.reload();

             alert ("Le produit a été supprimé de votre panier")
             
    });
    
}};
deleteCart ();

// Calcul du prix total en fonction de(s) quantité(s)
function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * dataLocalStorage[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// 
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            let quantityModif = dataLocalStorage[k].quantity;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = dataLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantity = qttModifValue;
            dataLocalStorage[k].quantity = resultFind.quantity;

            localStorage.setItem("produits", JSON.stringify(dataLocalStorage));
    
            location.reload();
            
        })
        console.log(dataLocalStorage)
    }
}
modifyQtt();


function form(){

        let firstName = document.querySelector("#firstName");
        let lastName = document.querySelector("#firstName");
        let adress = document.querySelector("#firstName");
        let city = document.querySelector("#firstName");
        let email = document.querySelector("#firstName");
        const submit = document.querySelector("#order");
    console.log(firstName)
        firstName.addEventListener('change', (event) => {
            event.preventDefault();
            if(firstName.value == null){
    
            let errorFirstName = document.querySelector("#firstNameErrorMsg")
            errorFirstName.innerText = (`Veuillez ajouter votre nom s'il vous plait`)
    }
            if(lastName.value == null){
    
            let errorLastName = document.querySelector("#lastNameErrorMsg")
            errorLastName.innerHTML = (`Veuillez ajouter votre prénom s'il vous plait`)
    }
            if(adress.value == null){
    
            let errorAdress = document.querySelector("#adressErrorMsg")
            errorAdress.innerHTML = (`Veuillez ajouter votre adresse s'il vous plait`)
    }   
            if(city.value == null){
    
            let errorFirstName = document.querySelector("#cityErrorMsg")
            errorFirstName.innerHTML = (`Veuillez ajouter votre ville s'il vous plait`)
    }
            if(email.value == null){
    
            let errorFirstName = document.querySelector("#emailErrorMsg")
            errorFirstName.innerHTML = (`Veuillez ajouter votre email s'il vous plait`)
    }
        })};

form();
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
            idProducts.push(dataLocalStorage[0]._id);
        
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();