document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchContainer = document.querySelectorAll(".card-container");
  let searchTimeout;

  function searchItems(query) {
    searchContainer.forEach((container) => {
      const items = container.querySelectorAll(".card");
      items.forEach((item) => {
        const title = item.querySelector("h2").textContent.toLowerCase(); // Assuming h2 contains the text
        if (title.includes(query.toLowerCase())) {
          item.style.display = "block"; // Show matching cards
        } else {
          item.style.display = "none"; // Hide non-matching cards
        }
      });
    });
  }

  // Add event listener to the input field
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();

    // Clear any existing timeout
    clearTimeout(searchTimeout);

    // Set a new timeout to delay the search
    searchTimeout = setTimeout(() => {
      searchItems(query);
    }, 200);
  });

  async function getItems() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p>$${item.price}</p>
          <button>Add to Cart</button>
          `;
        searchContainer[0].appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});
