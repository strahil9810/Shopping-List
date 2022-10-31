//Selector
const shoppingInput = document.querySelector('.shopping-input');
const shoppingButton = document.querySelector('.shopping-button');
const shoppingList = document.querySelector('.shopping-list');
const filterOption = document.querySelector(".fileter-shoppings")

//Event Listeners
document.addEventListener('DOMContentLoaded', getShop);
shoppingButton.addEventListener('click', addItem);
shoppingList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterShopping);

//Functions
function addItem(event){
    //Prevent form from submitting
    event.preventDefault();

    //Shopping Div
    const shoppingDiv = document.createElement("div");
    shoppingDiv.classList.add("shop");

    //Create li
    const newShop = document.createElement('li');
    newShop.innerHTML = shoppingInput.value;
    newShop.classList.add('shopping-item');
    shoppingDiv.appendChild(newShop);

    //add shoppings to localstorage
    saveLocalShop(shoppingInput.value);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    completedButton.classList.add("complete-btn");
    shoppingDiv.appendChild(completedButton);

    //Check delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    deleteButton.classList.add("delete-btn");
    shoppingDiv.appendChild(deleteButton);

    //Append to list
    shoppingList.appendChild(shoppingDiv);

    //Clear shopping input value
    shoppingInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //Delete shop
    if(item.classList[0] === 'delete-btn'){
        const shopp = item.parentElement;
        //Animation
        shopp.classList.add("fall");
        removeLocalShop(shopp);
        shopp.addEventListener('transitionend', function(){
            shopp.remove();
        });
    }

    //Check shop
    if(item.classList[0] === "complete-btn"){
        const shopp = item.parentElement;
        shopp.classList.toggle("completed");
    }
}

function filterShopping(e){
    const shoppings = shoppingList.childNodes;
    shoppings.forEach(function(shopp){
        switch(e.target.value){
            case "all":
                shopp.style.display = "flex";
                break;
            case "completed":
                if(shopp.classList.contains('completed')){
                    shopp.style.display = 'flex';
                }
                else{
                    shopp.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!shopp.classList.contains('completed')){
                    shopp.style.display = "flex";
                }
                else{
                    shopp.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalShop(shopp){
    let shoppings;
    if(localStorage.getItem("shoppings") === null){
        shoppings = [];
    }
    else{
        shoppings = JSON.parse(localStorage.getItem("shoppings"));
    }
    shoppings.push(shopp);
    localStorage.setItem("shoppings", JSON.stringify(shoppings));
}

function getShop(){
    let shoppings;

    //check---hey do I already have thing in there
    if(localStorage.getItem("shoppings") === null){
        shoppings = [];
    }
    else{
        shoppings = JSON.parse(localStorage.getItem("shoppings"));
    }
    shoppings.forEach(function(shopp){
        //Shopping Div
        const shoppingDiv = document.createElement("div");
        shoppingDiv.classList.add("shop");

        //Create li
        const newShop = document.createElement('li');
        newShop.innerText = shopp;
        newShop.classList.add('shopping-item');
        shoppingDiv.appendChild(newShop);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
        completedButton.classList.add("complete-btn");
        shoppingDiv.appendChild(completedButton);

        //Check delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
        deleteButton.classList.add("delete-btn");
        shoppingDiv.appendChild(deleteButton);

        //Append to list
        shoppingList.appendChild(shoppingDiv);
    });
}

function removeLocalShop(shopp){
    let shoppings;
    if(localStorage.getItem("shoppings") === null){
        shoppings = [];
    }
    else{
        shoppings = JSON.parse(localStorage.getItem("shoppings"));
    }
    const shoppIndex = shopp.children[0].innerText;
    shoppings.splice(shoppings.indexOf(shoppIndex), 1);
    localStorage.setItem("shoppings", JSON.stringify(shoppings));
}