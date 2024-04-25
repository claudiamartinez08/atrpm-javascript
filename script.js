const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const items = JSON.parse(localStorage.getItem('items')) || []
const list = document.querySelector('#item-list');
const listItems = list.querySelectorAll('li');
const clearButton = document.querySelector('#clear-button');
const filter = document.querySelector('.filter')
const filterInput = document.querySelector('#filter')
const formButton = document.querySelector('.btn')
let editMode = false
let editedItem
let itemToEdit

const itemTemplate = (element) => `
    <li>
        ${element}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </li>
`;

const initApp = () => {
    items.map((item)=> {
        list.insertAdjacentHTML('beforeend', itemTemplate(item));
    })
}
const checkNumberOfItems = () => {
    if(items.length === 0) {
        clearButton.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
        filter.style.display = 'block';
    }
}

checkNumberOfItems()
// Actions
const addElement = (element) => {
    list.insertAdjacentHTML('beforeend', itemTemplate(element));
}

const removeElement = (element) => {
    element.parentElement.parentElement.remove();
    const value = element.parentElement.parentElement.innerText;
    items.pop(value)
}

const removeAllElements = () => {
    list.querySelectorAll('li').forEach((item) => {
        item.remove()
    })
    items.length = 0;
}

const setEditMode = (item) => {
    const listItems = list.querySelectorAll('li');
    editMode = true
    formButton.classList.add('edition-mode')
    formButton.innerText = "Edit Item"
    console.log(listItems)
    listItems.forEach((i)=> i.classList.remove('edition-mode'))
    console.log(item)
    item.classList.add('edition-mode')
    input.focus()
    input.style.borderColor = "#9EB3C2"
    input.value = item.innerText
    editedItem = item
}
const setDefaultMode = (item) => {
    editMode = false
    formButton.style.backgroundColor = "black"
    formButton.innerText = "+ Add Item"
    item.style.backgroundColor = "transparent"
    input.style.borderColor = "none"
    input.value = ''
}
const filterElements = (inputValue) => {
    const listItems = list.querySelectorAll('li');
    listItems.forEach((i)=> {
        if(i.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
            i.style.display = 'flex'
        } else {
            i.style.display = 'none'
        }
    })
}

const preventDuplicatedItems = (value) => {
    return items.includes(value)
}

// Event Listeners

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!preventDuplicatedItems(input.value)) {
        if(editMode) {
            items[items.indexOf(itemToEdit)] = input.value
            localStorage.setItem('items', JSON.stringify(items))
            editedItem.childNodes[0].nodeValue = input.value;
            setDefaultMode(editedItem)
        } else if (input.value !== '') {
                items.push(input.value);
                addElement(input.value);
                input.value = '';
                checkNumberOfItems()
                localStorage.setItem('items', JSON.stringify(items))
        }
    } else {
            alert(`Ya tienes ${input.value} en la lista`);
    }
});

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-solid')) {
        removeElement(e.target);
        checkNumberOfItems()
        localStorage.setItem('items', JSON.stringify(items))
    } else if(e.target.nodeName === 'LI') {
        setEditMode(e.target)
        itemToEdit = editedItem.innerText
    }   
});


clearButton.addEventListener('click', ()=> {
    removeAllElements()
    checkNumberOfItems()
    localStorage.removeItem('items')

})

filterInput.addEventListener('keyup', (e) => {
    const inputValue = e.target.value
    filterElements(inputValue)
});


initApp()
