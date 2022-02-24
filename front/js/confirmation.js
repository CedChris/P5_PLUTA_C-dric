function confirmation(){


    const orderNumber = document.getElementById("orderId");
    orderNumber.innerText = localStorage.getItem("orderId");
    console.log(orderNumber);
    localStorage.clear();
}

confirmation();