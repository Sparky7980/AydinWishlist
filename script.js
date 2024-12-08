function addItem() {
    const itemInput = document.getElementById('item-input');
    const itemText = itemInput.value.trim();

    if (itemText) {
        const listItem = document.createElement('li');
        listItem.textContent = itemText;
        document.querySelector('.wishlist ul').appendChild(listItem);
        itemInput.value = ''; // Clear the input field
    } else {
        alert('Please enter an item.');
    }
}
