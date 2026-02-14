// ---------------- HERO SLIDESHOW ----------------
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
  function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }
  setInterval(showSlides, 4000);
}

// ---------------- CART SYSTEM ----------------
let cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceEl = document.getElementById("total-price");

function renderCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "border-bottom", "py-2");
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>₹${item.price} each
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-secondary me-2" onclick="decreaseQty(${index})">–</button>
        <span>${item.qty}</span>
        <button class="btn btn-sm btn-secondary ms-2" onclick="increaseQty(${index})">+</button>
      </div>
      <div>₹${itemTotal}</div>
      <button class="btn btn-sm btn-danger ms-3" onclick="removeItem(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const estimatedTime = 10 + cart.length * 5;

  cartItemsContainer.innerHTML += `
    <div class="mt-4 text-end">
      <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
      <p>GST (5%): ₹${tax.toFixed(2)}</p>
      <h5>Total: ₹${total.toFixed(2)}</h5>
      <p>🕒 Estimated Preparation Time: ${estimatedTime} mins</p>
    </div>
  `;

  if (totalPriceEl) totalPriceEl.textContent = total.toFixed(2);
  if (cartCount) cartCount.textContent = cart.length;
}

function increaseQty(index) {
  cart[index].qty++;
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) cart[index].qty--;
  else cart.splice(index, 1);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const name = e.target.dataset.name;
    const price = parseInt(e.target.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });
    renderCart();
  });
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

// ---------------- RESERVATION FORM ----------------
const reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;
    const messageEl = document.getElementById("form-message");

    if (!name || !phone || !email || !date || !time || !guests) {
      messageEl.textContent = "⚠️ Please fill in all required fields.";
      messageEl.style.color = "orange";
      return;
    }

    messageEl.textContent = "✅ Your table has been successfully booked!";
    messageEl.style.color = "lightgreen";
    this.reset();
  });
}

// ---------------- INQUIRY FORM ----------------
const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("inq-name").value.trim();
    const email = document.getElementById("inq-email").value.trim();
    const phone = document.getElementById("inq-phone").value.trim();
    const purpose = document.getElementById("inq-purpose").value;
    const feedback = document.getElementById("inq-feedback").value.trim();
    const msgEl = document.getElementById("inq-message");

    if (!name || !email || !phone || !purpose || !feedback) {
      msgEl.textContent = "⚠️ Please fill all fields properly.";
      msgEl.style.color = "orange";
      return;
    }

    msgEl.textContent = "✅ Thank you for your inquiry! We’ll get back to you soon.";
    msgEl.style.color = "green";
    this.reset();
  });
}
