const fetchProducts = async ()=>{
    const API = "https://fakestoreapi.com/products";
    console.log("hello")
    let response = await fetch(API);
    // console.log(response)
    let data = await response.json();
    // console.log(data);

    let container = document.getElementById('product-container');

    data.forEach((product) => {
        let card =  `
        <div class="col-md-3 col-sm-6">
          <div class="card shadow-sm h-100">
              <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="text-success fw-bold">$${product.price}</p>
                <p class="text-warning mb-0">Rating: ${product.rating.rate} ★</p>
            </div>
          </div>
        </div>
          `;
          container.innerHTML += card;
    });


}

fetchProducts()