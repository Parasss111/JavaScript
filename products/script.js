let cartCount = 0;
let AllData;
let product_count=1;
const my_cart= document.getElementsByClassName("my-cart")[0];
const NewArr=[];
if (localStorage.getItem("cartCount")) {
  cartCount = parseInt(localStorage.getItem("cartCount"));
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cart-count").textContent = cartCount;
});

let savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
NewArr.push(...savedItems);

savedItems.forEach(product => {
  const Cart = document.createElement("div");
  Cart.classList.add("col-sm-12");
  Cart.innerHTML = `
    <div class="card shadow-sm h-100 d-flex flex-column">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
      <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="text-success fw-bold">$${product.price}</p>
          <p class="text-warning mb-0">Rating: ${product.rating.rate} ★</p>
          <div class="mt-auto">
            <button class="btn btn-info">-</button><span id=""> 1 </span><button class="btn btn-info">+</button>
            <button type="button" class="btn btn-danger w-100 remove-cart" id=${product.id}>Remove</button>
          </div>
      </div>
    </div>
  `;
  my_cart.appendChild(Cart);
});


const fetchProducts = async () => {
  const API = "https://fakestoreapi.com/products";
  // console.log("hello")
  let response = await fetch(API);
  // console.log(response)
  data = await response.json();
  AllData=data
  // console.log(data);

  let container = document.getElementById('product-container');

  data.forEach((product,index) => {

    let card = `
  <div class="col-md-3 col-sm-6 mb-4">
    <div class="card shadow-sm h-100 d-flex flex-column position-relative">
    <span class="price-badge">$${product.price}</span>
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
      <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="text-success fw-bold">$${product.price}</p>
          <p class="text-warning mb-2">Rating: ${product.rating.rate} ★</p>

        <!-- Button sticks to bottom -->
        <div class="mt-auto">
          <button type="button" class="btn btn-primary w-100 add-to-cart" id=${product.id}>Add to cart</button>
        </div>
      </div>
    </div>
  </div>
`;

  container.innerHTML += card;
});

//on button clicked on site cart
document.querySelectorAll('.add-to-cart').forEach((button)=>{
  button.addEventListener('click', (e)=>{
    //  console.log(AllData[e.target.id])
    let product = AllData.find(p => p.id == e.target.id);
    // NewArr.push(product);
    // NewArr.push(AllData[e.target.id]);
    let existing = NewArr.find(p => p.id == product.id);
    if (existing) {
      existing.quantity++;
      // update existing card quantity text
      let span = my_cart.querySelector(`[data-id='${product.id}'] .product-count`);
      span.textContent = existing.quantity;
    } else {
      product.quantity = 1;
      NewArr.push(product);

      const Cart = document.createElement("div");
      Cart.classList.add("col-sm-12");
      Cart.innerHTML=`
              <div class="card shadow-sm h-100 d-flex flex-column">
                  <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="text-success fw-bold">$${product.price}</p>
                    <p class="text-warning mb-0">Rating: ${product.rating.rate} ★</p>

                  <!-- Button sticks to bottom -->
                  <div class="mt-auto">
                  <div class="mt-auto">
                    <button class="btn btn-info btn-d">-</button>
                    <span class="product-count">${product.quantity}</span>
                    <button class="btn btn-info btn-i">+</button>
                    <button type="button" class="btn btn-danger w-100 remove-cart" id=${product.id}>Remove</button>
                  </div>
                </div>
              </div>          
`
    my_cart.appendChild(Cart);
    

    cartCount++;
    document.getElementById('cart-count').textContent=cartCount;
    }
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("cartItems", JSON.stringify(NewArr));
  });
});
// console.log(cardcount);
}


// // Remove from cart (event delegation)
// my_cart.addEventListener("click", (e) => {
//   if (e.target.classList.contains("remove-cart")) {
//     const productId = e.target.id;

//     // Remove from array
//     const index = NewArr.findIndex(p => p.id == productId);
//     if (index !== -1) {
//       NewArr.splice(index, 1);
//     }

//     // Remove from DOM
//     e.target.closest(".col-sm-12").remove();

//     // Update cart count
//     cartCount--;
//     document.getElementById("cart-count").textContent = cartCount;

//     // Update localStorage
//     localStorage.setItem("cartCount", cartCount);
//     localStorage.setItem("cartItems", JSON.stringify(NewArr));
//   }
// });

// Handle increment, decrement, and remove using event delegation
my_cart.addEventListener("click", (e) => {
  const target = e.target;
  const parentCard = target.closest(".col-sm-12");
  if (!parentCard) return;

  const productId = parseInt(target.closest(".col-sm-12").querySelector(".remove-cart")?.id);

  // Find the product in NewArr
  const product = NewArr.find(p => p.id === productId);

  // Increment
  if (target.classList.contains("btn-i")) {
    product.quantity++;
    parentCard.querySelector(".product-count").textContent = product.quantity;
  }

  // Decrement
  if (target.classList.contains("btn-d")) {
    if (product.quantity > 1) {
      product.quantity--;
      parentCard.querySelector(".product-count").textContent = product.quantity;
    } else {
      // Optional: remove item if quantity reaches 0
      const index = NewArr.findIndex(p => p.id === productId);
      if (index !== -1) NewArr.splice(index, 1);
      parentCard.remove();
      cartCount--;
      document.getElementById("cart-count").textContent = cartCount;
    }
  }

  // Remove
  if (target.classList.contains("remove-cart")) {
    const index = NewArr.findIndex(p => p.id === productId);
    if (index !== -1) NewArr.splice(index, 1);
    parentCard.remove();
    cartCount--;
    document.getElementById("cart-count").textContent = cartCount;
  }

  // Update localStorage
  localStorage.setItem("cartItems", JSON.stringify(NewArr));
  localStorage.setItem("cartCount", cartCount);
});





fetchProducts()