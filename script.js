// Import the necessary Firebase SDK components
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCA6Np5YrO26uozfs4twhXSOfBCtoZ_jNA",
  authDomain: "aydinwishlist.firebaseapp.com",
  databaseURL: "https://aydinwishlist-default-rtdb.firebaseio.com",
  projectId: "aydinwishlist",
  storageBucket: "aydinwishlist.firebasestorage.app",
  messagingSenderId: "252665706052",
  appId: "1:252665706052:web:b39d21c90fde57c850ee11",
  measurementId: "G-73PWJC1MMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to add an item to the wishlist
function addItem() {
  const itemInput = document.getElementById('item-input');
  const newItem = itemInput.value.trim();

  if (newItem === "") {
    alert("Please enter a valid item.");
    return;
  }

  const wishlistRef = ref(database, 'wishlist/');
  const newItemRef = ref(wishlistRef, Date.now()); // Using timestamp as the unique key for each item
  set(newItemRef, {
    name: newItem
  }).then(() => {
    alert("Item added successfully!");
    itemInput.value = ''; // Clear input field
    displayWishlist(); // Refresh the list after adding the new item
  }).catch((error) => {
    console.error("Error adding item: ", error);
  });
}

// Function to display the wishlist items
function displayWishlist() {
  const wishlistItemsRef = ref(database, 'wishlist/');
  get(wishlistItemsRef).then((snapshot) => {
    const wishlistItemsList = document.getElementById('wishlist-items');
    wishlistItemsList.innerHTML = ''; // Clear existing items
    if (snapshot.exists()) {
      const items = snapshot.val();
      for (const key in items) {
        const item = items[key];
        const li = document.createElement('li');
        li.textContent = item.name;
        wishlistItemsList.appendChild(li);
      }
    } else {
      wishlistItemsList.innerHTML = "<p>No items in wishlist yet!</p>";
    }
  }).catch((error) => {
    console.error("Error fetching wishlist: ", error);
  });
}

// Display wishlist when the page loads
window.onload = () => {
  displayWishlist();
};
