let dataLocalStorage = JSON.parse(localStorage.getItem("produits"));
let containerPanier = document.querySelector("#cart__items")


function addDomCart() {

for (let produits in dataLocalStorage){
    
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
        
    for (let i = 0; i<dataLocalStorage.length;i++){
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
}
        let cartItemContentSettingsDelete = document.createElement("div")
        cartItemContentSettingsDelete.classList.add("cart__item_content__settings__delete");
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete); 
        
        let cartItemContentSettingsDeleteBtn = document.createElement("p")
        cartItemContentSettingsDeleteBtn.classList.add("deleteItem")
        cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteBtn);
        
        cartItemContentSettingsDeleteBtn.innerHTML = "Supprimer"
        
        
    // let cartItemContent = document.createElement("div");
    //     cartItemContent.classList.add("cart__item__content");
    //     containerCart.appendChild(cartItemContent);
    }}
    addDomCart ();
function deleteCart (){

    let deleteItem = document.querySelector(".deleteItem")


    deleteItem.addEventListener('click' ,() =>{
        if (dataLocalStorage != null)
        localStorage.removeItem('produits')
        location.reload()
    })
    console.log()
}
deleteCart ();

function totalCart (){

    let totalContainer = document.querySelector(".cart__price")
    let totalArticle = document.querySelector("#totalQuantity")
    let totalPrice = document.querySelector("#totalPrice")

    totalArticle.innerHTML = dataLocalStorage[0].quantity;
    totalPrice.innerHTML = dataLocalStorage[0].price;
}
  
totalCart ();

function form(){

    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#firstName");
    let adress = document.querySelector("#firstName");
    let city = document.querySelector("#firstName");
    let email = document.querySelector("#firstName");
    const submit = document.querySelector("#order");

    submit.addEventListener('click', () => {
        
        if(firstName.value == null){

        let errorFirstName = document.querySelector("#firstNameErrorMsg")
        errorFirstName.innerHTML = (`Veuillez ajouter votre nom s'il vous plait`)
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
        else {
            let submitData = {
                nom : firstName.value,
                prenom : lastName.value,
                adresse : adress.value,
                ville : city.value,
                mail : email.value,
            };
            let formData = []
            formData.push(submitData);
            localStorage.setItem('form' ,JSON.stringify(formData))
            console.log(formData)
        }
    }
    )
}
form ();
