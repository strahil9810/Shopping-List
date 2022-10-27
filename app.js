//Selector
const shoppingInput = document.querySelector('.shopping-input');
const shoppingButton = document.querySelector('.shopping-button');
const shoppingList = document.querySelector('.shopping-list');

//Event Listeners
shoppingButton.addEventListener('click', addItem);
shoppingList.addEventListener('click', deleteCheck);

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
        item.remove();
    }
}