// On importe l'ID depuis le localstorage et on le supprime
function confirmation(){

    const orderNumber = document.getElementById("orderId");
    orderNumber.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

confirmation();