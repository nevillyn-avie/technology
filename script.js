const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");
let cartItems = 0;
let toastTimer;

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelectorAll(".quick-add").forEach(button => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    showToast(`${button.dataset.product} added to your bag`);
  });
});
document.getElementById("cartButton").addEventListener("click", () => {
  showToast(cartItems ? `Your bag has ${cartItems} item${cartItems === 1 ? "" : "s"}.` : "Your bag is empty for now.");
});

searchToggle.addEventListener("click", () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) searchInput.focus();
});
document.getElementById("closeSearch").addEventListener("click", () => { searchPanel.hidden = true; });
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchResult.textContent = "Type a product name to search."; return; }
  const matches = [...document.querySelectorAll(".product-card")].filter(card => card.querySelector("h3").textContent.toLowerCase().includes(query));
  searchResult.textContent = matches.length
    ? `Found: ${matches.map(card => card.querySelector("h3").textContent).join(", ")}.`
    : "No featured products match that search. Try bracelet, necklace, or earrings.";
  if (matches.length) document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    const input = document.getElementById("searchInput");
    input.value = category.slice(0, -1).toLowerCase();
    searchPanel.hidden = false;
    searchResult.textContent = `Explore our ${category.toLowerCase()} collection. Product listings are sample content.`;
  });
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("email");
  document.getElementById("formMessage").textContent = `Thanks! ${email.value} has been added to this demo form.`;
  email.value = "";
});
