const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const items = [];
const list = document.querySelector('#item-list');
const listItems = list.querySelectorAll('li');
const clearButton = document.querySelector('#clear-button');
const filter = document.querySelector('.filter')
const filterInput = document.querySelector('#filter')

const itemTemplate = (element) => `
    <li>
        ${element}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </li>
`;

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

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
        items.push(input.value);
        addElement(input.value);
        input.value = '';
        checkNumberOfItems()
    }
});

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-solid')) {
        removeElement(e.target);
        checkNumberOfItems()
    }
});

clearButton.addEventListener('click', ()=> {
    removeAllElements()
    checkNumberOfItems()
})

filterInput.addEventListener('keyup', (e) => {
    const inputValue = e.target.value
    filterElements(inputValue)
});
