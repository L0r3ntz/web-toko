const products = [
  {
    id: 1,
    name: 'HUE "DENIM" LEATHER JACKET',
    price: "",
    image: "img/1.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Leather",
    care: "Professional leather clean only",
  },
  {
    id: 2,
    name: "HUE EMBROIDERED SHIRT",
    price: "",
    image: "img/2.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 3,
    name: "HUE DISTRESSED CREW TEE",
    price: "",
    image: "img/3.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 4,
    name: "HANDS-ON-ME WASHED DENIM",
    price: "Rp 715.000,00",
    image: "img/4.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Denim",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 5,
    name: "LEATHER BOMBER JACKET",
    price: "Rp 1.250.000,00",
    image: "img/5.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Leather",
    care: "Professional leather clean only",
  },
  {
    id: 6,
    name: "VINTAGE DENIM JACKET",
    price: "Rp 890.000,00",
    image: "img/6.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Denim",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 7,
    name: "CLASSIC POLO SHIRT",
    price: "Rp 450.000,00",
    image: "img/7.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
  },
  {
    id: 8,
    name: "PREMIUM COTTON TEE",
    price: "Rp 350.000,00",
    image: "img/8.jpeg",
    soldOut: false,
    description:
      "Premium quality product made with the finest materials. Designed for comfort and style, perfect for everyday wear.",
    material: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
  },
];

// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const cartModalClose = document.getElementById("cart-modal-close");
const cartModalBody = document.getElementById("cart-modal-body");
const quickViewModal = document.getElementById("quick-view-modal");
const quickViewModalClose = document.getElementById("quick-view-modal-close");
const quickViewModalBody = document.getElementById("quick-view-modal-body");
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");

// Render products on the homepage
function renderProducts() {
  if (!productsGrid) return;

  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image-container" data-product-id="${
              product.id
            }">
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                ${
                  product.soldOut
                    ? `
                    <div class="sold-out-overlay">
                        <span class="sold-out-label">Sold Out</span>
                    </div>
                `
                    : ""
                }
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${
                  product.soldOut
                    ? `<p class="product-status">SOLD OUT</p>`
                    : `<p class="product-price">${product.price}</p>`
                }
            </div>
        </div>
    `
    )
    .join("");

  // Add click event for quick view
  const productImages = document.querySelectorAll(".product-image-container");
  productImages.forEach((image) => {
    image.addEventListener("click", () => {
      const productId = parseInt(image.dataset.productId);
      openQuickView(productId);
    });
  });
}

// Render cart
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    cartModalBody.innerHTML = `
            <div class="cart-empty">
                <p class="cart-empty-message">Your cart is empty</p>
                <button class="cart-button continue-button" id="continue-shopping">CONTINUE SHOPPING</button>
            </div>
        `;

    const continueShoppingButton = document.getElementById("continue-shopping");
    if (continueShoppingButton) {
      continueShoppingButton.addEventListener("click", () => {
        closeCartModal();
      });
    }
  } else {
    let cartHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        cartHTML += `
                    <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                        <div class="cart-item-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${product.name}</h3>
                            <p class="cart-item-price">${product.price}</p>
                            <p class="cart-item-size">Size: ${item.size}</p>
                            <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
                            <button class="cart-item-remove" data-id="${item.id}" data-size="${item.size}">Remove</button>
                        </div>
                    </div>
                `;
      }
    });

    cartHTML += `
            <div class="cart-total">
                <span>Total</span>
                <span>Rp 715.000,00</span>
            </div>
            <div class="cart-buttons">
                <button class="cart-button checkout-button">CHECKOUT</button>
                <button class="cart-button continue-button" id="continue-shopping">CONTINUE SHOPPING</button>
            </div>
        `;

    cartModalBody.innerHTML = cartHTML;

    // Add event listeners for cart actions
    const removeButtons = document.querySelectorAll(".cart-item-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        const size = button.dataset.size;
        removeFromCart(id, size);
      });
    });

    const continueShoppingButton = document.getElementById("continue-shopping");
    if (continueShoppingButton) {
      continueShoppingButton.addEventListener("click", () => {
        closeCartModal();
      });
    }

    const checkoutButton = document.querySelector(".checkout-button");
    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        alert("Checkout functionality would be implemented here.");
      });
    }
  }
}

// Open quick view modal
function openQuickView(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  quickViewModalBody.innerHTML = `
        <div class="quick-view-container">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <h3 class="quick-view-name">${product.name}</h3>
                ${
                  !product.soldOut
                    ? `<p class="quick-view-price">${product.price}</p>`
                    : ""
                }
                <p class="quick-view-description">${product.description}</p>
                
                ${
                  product.soldOut
                    ? `
                    <p class="product-status">SOLD OUT</p>
                    <p class="quick-view-description">This item is currently out of stock. Please check back later.</p>
                `
                    : `
                    <div class="size-selector">
                        <h4 class="size-selector-title">Size</h4>
                        <div class="size-options">
                            <div class="size-option" data-size="S">S</div>
                            <div class="size-option" data-size="M">M</div>
                            <div class="size-option" data-size="L">L</div>
                            <div class="size-option" data-size="XL">XL</div>
                        </div>
                    </div>
                    
                    <div class="quantity-selector">
                        <h4 class="quantity-selector-title">Quantity</h4>
                        <div class="quantity-controls">
                            <button class="quantity-button" id="decrease-quantity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                            </button>
                            <div class="quantity-display" id="quantity-display">1</div>
                            <button class="quantity-button" id="increase-quantity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            </button>
                        </div>
                    </div>
                    
                    <button class="add-to-cart-button" id="add-to-cart-button" data-product-id="${product.id}">ADD TO CART</button>
                `
                }
            </div>
        </div>
    `;

  quickViewModal.style.display = "block";

  // Add event listeners for quick view actions
  if (!product.soldOut) {
    // Size selection
    const sizeOptions = document.querySelectorAll(".size-option");
    let selectedSize = null;

    sizeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        sizeOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        selectedSize = option.dataset.size;
      });
    });

    // Quantity selection
    let quantity = 1;
    const quantityDisplay = document.getElementById("quantity-display");
    const decreaseButton = document.getElementById("decrease-quantity");
    const increaseButton = document.getElementById("increase-quantity");

    decreaseButton.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    increaseButton.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });

    // Add to cart
    const addToCartButton = document.getElementById("add-to-cart-button");
    addToCartButton.addEventListener("click", () => {
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }

      addToCart(product.id, selectedSize, quantity);
      closeQuickViewModal();
      openCartModal();
    });
  }
}

// Add to cart
function addToCart(productId, size, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if item already exists in cart with same id and size
  const existingItemIndex = cart.findIndex(
    (item) => item.id === productId && item.size === size
  );

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: productId,
      size: size,
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove from cart
function removeFromCart(productId, size) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  cart = cart.filter((item) => !(item.id === productId && item.size === size));

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Open cart modal
function openCartModal() {
  renderCart();
  cartModal.style.display = "block";
}

// Close cart modal
function closeCartModal() {
  cartModal.style.display = "none";
}

// Close quick view modal
function closeQuickViewModal() {
  quickViewModal.style.display = "none";
}

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  // Cart modal
  cartButton.addEventListener("click", openCartModal);
  cartModalClose.addEventListener("click", closeCartModal);

  // Quick view modal
  quickViewModalClose.addEventListener("click", closeQuickViewModal);

  // Mobile menu
  menuButton.addEventListener("click", toggleMobileMenu);
  mobileMenuClose.addEventListener("click", toggleMobileMenu);

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      closeCartModal();
    }
    if (event.target === quickViewModal) {
      closeQuickViewModal();
    }
  });

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = "";
      }
    });
  }
});
