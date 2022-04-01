// On importe l'ID depuis le localstorage et on le supprime
const orderNumber = document.getElementById('orderId');
orderNumber.innerText = localStorage.getItem('orderId');
localStorage.clear();
