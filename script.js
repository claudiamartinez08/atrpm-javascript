const form = document.querySelector('#item-form');
const input = document.querySelector('#item-input');
const items = [];
const list = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear-button');

const itemTemplate = (element) => `
    <li>
        ${element}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </li>
`;

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

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
        items.push(input.value);
        addElement(input.value);
    }
});


list.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-solid')) {
        removeElement(e.target);
    }
});

clearButton.addEventListener('click', ()=> {
    removeAllElements()
})
