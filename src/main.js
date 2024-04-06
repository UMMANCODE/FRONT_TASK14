"use strict";

const cartBtn = document.getElementById("cart-btn");

let cartBadge = document.getElementById("cart-badge");

if (!localStorage.getItem("cart"))
  localStorage.setItem("cart", JSON.stringify([]));

let cartItems = JSON.parse(localStorage.getItem("cart"));
let cartItemsCount = cartItems.length;
cartBadge.innerHTML = cartItemsCount;

function fetchProducts() {
  fetch("http://localhost:5000/products")
    .then((response) => response.json())
    .then((products) => {
      let productsHtml = "";
      products.forEach((product) => {
        productsHtml += getProductHtml(product);
      });
      document.getElementById("products").innerHTML = productsHtml;
    });
}

function getProductHtml(product) {
  const isInWishlist = cartItems.includes(product.id.toString());
  const buttonText = isInWishlist ? "Remove from wishlist" : "Add to wishlist";
  const badgeText = isInWishlist ? "❤️" : "";

  return `<div class="col mb-5">
    <div class="card h-100">
      <!-- Sale badge-->
      <div class="badge position-absolute" style="top: -0.6rem; right: -1rem; font-size: 30px;">${badgeText}</div>
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
          <!-- Product price-->
          $${product.price}
        </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center">
          <a class="btn btn-outline-dark mt-auto add-to-wishlist" href="#" data-product-id="${product.id}">${buttonText}</a>
        </div>
      </div>
    </div>
  </div>`;
}

function addToWishlist(event) {
  event.preventDefault();
  const productId = event.target.getAttribute("data-product-id");

  if (cartItems.includes(productId))
    cartItems = cartItems.filter((item) => item !== productId);
  else cartItems.push(productId);

  localStorage.setItem("cart", JSON.stringify(cartItems));
  cartItemsCount = cartItems.length;
  cartBadge.innerHTML = cartItemsCount;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();

  document.addEventListener("click", function (event) {
    const card = event.target.closest(".card");
    const badge = card.querySelector(".badge");

    if (event.target.classList.contains("add-to-wishlist")) {
      if (event.target.innerHTML === "Remove from wishlist")
        event.target.innerHTML = "Add to wishlist";
      else event.target.innerHTML = "Remove from wishlist";

      if (badge.textContent === "❤️") badge.textContent = "";
      else badge.textContent = "❤️";

      addToWishlist(event);
    }
  });
});

fetchProducts();
