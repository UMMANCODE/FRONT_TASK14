"use strict";
let productsBox = document.getElementById("products");

document.addEventListener("DOMContentLoaded", function () {
  function getProductHtml(product) {
    return `<div class="col-md-3 mb-5">
        <div class="card h-100">
          <!-- Product image-->
          <img
            class="card-img-top"
            src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            alt="450x300 demo image"
          />
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">${product.name}</h5>
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn btn-outline-dark mt-auto add-to-wishlist" href="#" data-product-id="${product.id}">Remove</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  function fetchProducts() {
    console.log("fetching products");
    const wishedProducts = JSON.parse(localStorage.getItem("cart"));
    fetch(`http://localhost:5000/products`)
      .then((response) => response.json())
      .then((products) => {
        console.log(products);
        products.forEach((product) => {
          if (wishedProducts.includes(product.id.toString()))
            productsBox.innerHTML += getProductHtml(product);
        });
      });
  }

  function removeFromWishlist(productId) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCartItems = cartItems.filter((itemId) => itemId !== productId);

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));

    const cardItemBtn = document.querySelector(
      `[data-product-id="${productId}"]`
    );
    const cardItem = cardItemBtn.closest(".col-md-3");
    if (cardItem) cardItem.remove();
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-wishlist")) {
      event.preventDefault();
      const productId = event.target.getAttribute("data-product-id");
      removeFromWishlist(productId);
    }
  });
  fetchProducts();

  document
    .getElementById("clear-wishlist")
    .addEventListener("click", function () {
      localStorage.removeItem("cart");
      productsBox.innerHTML = "";
    });
});
