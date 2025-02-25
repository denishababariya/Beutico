document.addEventListener("DOMContentLoaded", function () {
  let activeCategory = null; // Track currently active category

  // Fetch categories
  fetch('http://localhost:3000/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(categories => {
      const categoryList = document.getElementById('categoryList');

      return fetch('http://localhost:3000/subcategory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => response.json()).then(subcategories => {
        
        categories.forEach(category => {
          const li = document.createElement('li');
          li.classList.add('menu-item-has-children', 'position-inherit');

          const a = document.createElement('a');
          a.classList.add('drop-down');
          a.href = `#${category.cat_name}`;
          a.textContent = category.cat_name;

          const icon = document.createElement('i');
          icon.classList.add('bi', 'bi-plus', 'dropdown-icon');

          a.appendChild(icon);
          li.appendChild(a);

          const megaMenuDiv = document.createElement('div');
          megaMenuDiv.classList.add('mega-menu2');
          megaMenuDiv.style.backgroundImage = `url('/img/home1/megamenu2-${category.cat_name.toLowerCase()}-bg.png')`;

          const megaMenuWrap = document.createElement('div');
          megaMenuWrap.classList.add('megamenu-wrap');

          const subCategoryList = document.createElement('ul');
          subCategoryList.classList.add('menu-row');

          const filteredSubcategories = subcategories.filter(sub => sub.cat_id === Number(category.id));

          filteredSubcategories.forEach(sub => {
            const subLi = document.createElement('li');
            subLi.classList.add('menu-single-item');

            const subA = document.createElement('a');
            subA.href = `shop-list.html`;
            subA.textContent = sub.sub_name;

            subA.addEventListener('click', function () {
              localStorage.setItem('selectedSubcategoryId', sub.id);
            });

            subLi.appendChild(subA);
            subCategoryList.appendChild(subLi);
          });

          megaMenuWrap.appendChild(subCategoryList);
          megaMenuDiv.appendChild(megaMenuWrap);
          li.appendChild(megaMenuDiv);
          categoryList.appendChild(li);

          a.addEventListener('click', function (event) {
            event.preventDefault();

            // If another category is active, remove its active class
            if (activeCategory && activeCategory !== li) {
              activeCategory.classList.remove('active');
              activeCategory.querySelector('.mega-menu2').style.display = 'none';
              const prevIcon = activeCategory.querySelector('.dropdown-icon');
              prevIcon.classList.remove('bi-dash');
              prevIcon.classList.add('bi-plus');
            }

            const isActive = li.classList.toggle('active');

            if (isActive) {
              megaMenuDiv.style.display = 'block';
              icon.classList.remove('bi-plus');
              icon.classList.add('bi-dash');
              activeCategory = li; // Store currently active category
            } else {
              megaMenuDiv.style.display = 'none';
              icon.classList.remove('bi-dash');
              icon.classList.add('bi-plus');
              activeCategory = null;
            }
          });
        });
      });

    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
});


// popular categories
document.addEventListener("DOMContentLoaded", function () {
  // Fetch categories
  fetch('http://localhost:3000/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(categories => {
      console.log('Categories:', categories); // Log the fetched categories
      const categoryContainer = document.querySelector('.popular-category-section .row.g-4'); // Select the container for categories

      // Clear existing categories if any
      categoryContainer.innerHTML = '';

      // Iterate over each category and create HTML elements
      categories.forEach(category => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-2', 'col-md-3', 'col-sm-4', 'col-6');

        const categoryCard = document.createElement('div');
        categoryCard.classList.add('category-card', 'style-2');

        const categoryCardImg = document.createElement('div');
        categoryCardImg.classList.add('category-card-img');
        const anchorImg = document.createElement('a');
        anchorImg.href = 'shop-list.html'; // Link to the shop list
        const img = document.createElement('img');
        img.src = category.cat_img; // Assuming you have images named by category ID
        img.alt = category.cat_name; // Set alt text to category name
        anchorImg.appendChild(img);
        categoryCardImg.appendChild(anchorImg);

        const categoryCardContent = document.createElement('div');
        categoryCardContent.classList.add('category-card-content');
        const anchorContent = document.createElement('a');
        anchorContent.href = 'shop-list.html'; // Link to the shop list
        anchorContent.textContent = category.cat_name; // Set the text to the category name
        categoryCardContent.appendChild(anchorContent);

        categoryCard.appendChild(categoryCardImg);
        categoryCard.appendChild(categoryCardContent);
        colDiv.appendChild(categoryCard);
        categoryContainer.appendChild(colDiv); // Append the new category card to the container
      });
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
});

// rental products
document.addEventListener("DOMContentLoaded", function () {
  fetch('http://localhost:3000/product', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data);

      if (!data || !Array.isArray(data)) {
        console.error('Expected an array but got:', data);
        return;
      }

      // Function to get 4 random products from a filtered list
      function getRandomProducts(products) {
        return products.sort(() => 0.5 - Math.random()).slice(0, 4);
      }

      // Filter products by category
      let productsCat5 = getRandomProducts(data.filter(product => product.cat_id === 5));
      let productsCat6 = getRandomProducts(data.filter(product => product.cat_id === 6));

      console.log('Filtered Products (Cat 5):', productsCat5);
      console.log('Filtered Products (Cat 6):', productsCat6);

      const categoryContainer = document.getElementById('categoryContainer');
      if (!categoryContainer) {
        console.error('categoryContainer not found in DOM');
        return;
      }

      categoryContainer.innerHTML = ''; // Clear previous content

      function renderProducts(products) {
        products.forEach(product => {
          const colDiv = document.createElement('div');
          colDiv.className = 'col-lg-3 col-md-6';

          const productCard = document.createElement('div');
          productCard.className = 'product-card hover-btn';

          const productCardImg = document.createElement('div');
          productCardImg.className = 'product-card-img';

          const anchor = document.createElement('a');
          anchor.href = 'product-default.html';

          const img = document.createElement('img');
          img.src = product.images && product.images.length > 0 ? product.images[0] : 'default.jpg';
          img.alt = product.name;

          const batchDiv = document.createElement('div');
          batchDiv.className = 'batch';
          batchDiv.innerHTML = '<span>-15%</span>';

          anchor.appendChild(img);
          anchor.appendChild(batchDiv);
          productCardImg.appendChild(anchor);


          const overlayDiv = document.createElement('div');
          overlayDiv.className = 'overlay';

          const cartAreaDiv = document.createElement('div');
          cartAreaDiv.className = 'cart-area';
          cartAreaDiv.innerHTML = '<a href="cart.html" class="hover-btn3 add-cart-btn"><i class="bi bi-bag-check"></i> Drop in Basket</a>';

          overlayDiv.appendChild(cartAreaDiv);
          productCardImg.appendChild(overlayDiv);

          const viewFavoriteDiv = document.createElement('div');
          viewFavoriteDiv.className = 'view-and-favorite-area';

          viewFavoriteDiv.innerHTML = `
                    <ul>
                        <li>
                            <a href="whistlist.html">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <g clip-path="url(#clip0_168_378)">
                                        <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z"></path>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                    <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z"></path>
                                    <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z"></path>
                                  </svg>
                            </a>
                        </li>
                    </ul>`;

          productCardImg.appendChild(viewFavoriteDiv);
          productCard.appendChild(productCardImg);

          const productCardContent = document.createElement('div');
          productCardContent.className = 'product-card-content';
          productCardContent.innerHTML = `
                    <h6><a href="product-default.html" class="hover-underline">${product.name}</a></h6>
                    <p class="price">$${product.price.toFixed(2)}</p>
                `;

          productCard.appendChild(productCardContent);
          colDiv.appendChild(productCard);
          categoryContainer.appendChild(colDiv);


          // denisha
          const borderSpan = document.createElement('span');
          borderSpan.className = 'for-border';
          productCard.appendChild(borderSpan);
        });
      }

      // Render products for category 5 and 6
      renderProducts(productsCat5);
      renderProducts(productsCat6);
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
});


// new releas  

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/product");
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Invalid data format");
      return;
    }

    // Get last 10 products and reverse them
    const latestProducts = data.slice(-10).reverse();

    const container = document.getElementById("x_new_slidecard");
    container.innerHTML = ""; // Clear previous content

    latestProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("swiper-slide");

      // Ensure images exist
      const image1 = product.images?.[0] || "/img/default1.jpg";
      const image2 = product.images?.[1] || "/img/default2.jpg";

      // Create the content for the product card
      card.innerHTML = `
                <div class="product-card hover-btn">
                    <div class="product-card-img double-img">
                        <a href="product-default.html">
                            <img src="${image1}" alt="" class="img1"/>
                            <img src="${image2}" alt="" class="img2"/>
                        </a>
                        <div class="overlay">
                            <div class="cart-area">
                                <a href="cart.html" class="hover-btn3 add-cart-btn">
                                    <i class="bi bi-bag-check"></i> Drop in Basket
                                </a>
                            </div>
                        </div>
                        <div class="view-and-favorite-area">
                            <ul>
                                <li>
                                    <a href="whistlist.html">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="product-view-btn" data-bs-toggle="modal" data-bs-target="#product-view" data-product-id="${product.id}">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
        <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
    </svg>
</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="product-card-content">
                        <h6><a href="product-default.html" class="hover-underline">${product.name}</a></h6>
                        <p><a href="shop-list.html">${product.brand}</a></p>
                        <p class="price">$${product.price.toFixed(2)} <del>$${(product.price * 1.2).toFixed(2)}</del></p>
                        <div class="rating">
                            <ul>
                                <li><i class="bi bi-star-fill"></i></li>
                                <li><i class="bi bi-star-fill"></i></li>
                                <li><i class="bi bi-star-fill"></i></li>
                                <li><i class="bi bi-star-fill"></i></li>
                                <li><i class="bi bi-star-fill"></i></li>
                            </ul>
                            <span>(50)</span>
                        </div>
                    </div>
                    <span class="for-border"></span>
                </div>`;

      container.appendChild(card);
    });

    // Add click event listeners for product view buttons
    // const productViewButtons = document.querySelectorAll('.product-view-btn');
    // productViewButtons.forEach(button => {
    //   button.addEventListener('click', function(e) {
    //     // e.preventDefault();
    //     const productId = this.getAttribute('data-product-id');
    //     console.log(productId,"productId");
    //     // Store the product ID in localStorage
    //     localStorage.setItem('selectedeyeId', productId);
    //     console.log("ljkj",localStorage.getItem('selectedeyeId'))
    //     // You can also fetch and display the product details in the modal here if needed
    //   });
    // });
    document.querySelectorAll('.product-view-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        localStorage.setItem('selectedeyeId', productId); // Store the product ID in localStorage
        console.log("Product ID stored:", productId);
        
        // Open the modal after storing the ID
        const productModal = new bootstrap.Modal(document.getElementById('product-view'));
        productModal.show();
    });
});

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
// end new releas


// start model

document.addEventListener('DOMContentLoaded', () => {
  // Check if 'selectedeyeId' is available in localStorage
  const selectedeyeId = localStorage.getItem('selectedeyeId');   
  
  if (selectedeyeId) {
    // If valid ID is found, proceed with modal creation and data fetching
    createProductModal();
    fetchAndDisplayProduct(selectedeyeId); // Pass the ID when fetching the product
  } else {
    console.error('No product ID found in localStorage');
  }
});

function createProductModal() {
  // Create the main modal container
  const modal = document.createElement('div');
  modal.className = 'modal product-view-modal';
  modal.id = 'product-view';

  // Modal structure here (same as before)
  // modal.innerHTML = `...`; // Keep the same modal HTML structure you already have
  modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="close-btn" data-bs-dismiss="modal"></div>
          <div class="shop-details-top-section">
            <div class="row gy-4">
              <!-- Left Column - Image Section -->
              <div class="col-lg-6">
                <div class="shop-details-img">
                  <div class="tab-content" id="view-tabContent">
                    <div class="tab-pane fade show active" id="view-pills-img1" role="tabpanel">
                      <div class="shop-details-tab-img">
                        <img src="" alt="" class="main-product-img"/>
                      </div>
                    </div>
                  </div>
                  <div class="nav nav-pills" id="view-tab" role="tablist" aria-orientation="vertical">
                    <!-- Thumbnail buttons will be dynamically added here -->
                  </div>
                </div>
              </div>

              <!-- Right Column - Content Section -->
              <div class="col-lg-6">
                <div class="shop-details-content">
                  <h1 class="product-title"></h1>
                  <div class="rating-review">
                    <div class="rating">
                      <div class="star">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                      </div>
                      <p>(50 customer review)</p>
                    </div>
                  </div>
                  <p class="product-description"></p>
                  <div class="price-area">
                    <p class="price">$<span class="current-price"></span> <del>$<span class="original-price"></span></del></p>
                  </div>
                  <div class="quantity-color-area">
                    <div class="quantity-color">
                      <h6 class="widget-title">Quantity</h6>
                      <div class="quantity-counter">
                        <a href="#" class="quantity__minus"><i class="bx bx-minus"></i></a>
                        <input name="quantity" type="text" class="quantity__input" value="01">
                        <a href="#" class="quantity__plus"><i class="bx bx-plus"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="shop-details-btn">
                    <a href="shop-list.html" class="primary-btn1 hover-btn3">*Shop Now*</a>
                    <a href="#" class="primary-btn1 style-3 hover-btn4">*Drop in Basket*</a>
                  </div>
                  <div class="product-info">
                    <ul class="product-info-list">
                      <li><span>SKU:</span> <span class="sku-value"></span></li>
                      <li>
                        <span>Brand:</span>
                        <a href="shop-4-columns.html" class="brand-value"></a>
                      </li>
                      <li>
                        <span>Category:</span>
                        <a href="shop-slider.html" class="category-value"></a>
                      </li>
                    </ul>
                  </div>
                  <div class="compare-wishlist-area">
                    <ul>
                      <li>
                        <a href="whistlist.html">
                          <span>
                            <svg width="11" height="11" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_168_378)">
                                <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z"/>
                              </g>
                            </svg>
                          </span>
                          Add to wishlist
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;    

  // Append modal to body
  document.body.appendChild(modal);

  // Initialize event listeners and functionality
  initializeModal();
}

function initializeModal() {
  // Initialize quantity counter
  const quantityMinus = document.querySelector('.quantity__minus');
  const quantityPlus = document.querySelector('.quantity__plus');
  const quantityInput = document.querySelector('.quantity__input');

  quantityMinus.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      value--;
      quantityInput.value = value.toString().padStart(2, '0');
    }
  });

  quantityPlus.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    value++;
    quantityInput.value = value.toString().padStart(2, '0');
  });

  // Add modal show event listener
  const productModal = document.getElementById('product-view');
  productModal.addEventListener('show.bs.modal', async () => {
    const selectedeyeId = localStorage.getItem('selectedeyeId');
    if (selectedeyeId) {
      await fetchAndDisplayProduct(selectedeyeId); // Fetch and display the product on modal open
    }
  });
}

// Function to fetch product data and update modal
async function fetchAndDisplayProduct(selectedeyeId) {
  try {
    const response = await fetch('http://localhost:3000/product');
    const products = await response.json();
    const product = products.find(p => p.id === selectedeyeId);

    if (product) {
      // Update modal content with the fetched product data
      document.querySelector('.product-title').textContent = product.name;
      document.querySelector('.product-description').textContent = product.description;
      document.querySelector('.current-price').textContent = product.price.toFixed(2);
      document.querySelector('.original-price').textContent = (product.price * 1.2).toFixed(2);
      document.querySelector('.sku-value').textContent = product.sku;
      document.querySelector('.brand-value').textContent = product.brand;
      document.querySelector('.category-value').textContent = product.category;
      document.querySelector('.main-product-img').src = product.images[0];
      
      // Call to create thumbnails if there are multiple images
      createThumbnails(product.images);
    } else {
      console.error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
}

function createThumbnails(images) {
  const viewTab = document.getElementById('view-tab');
  viewTab.innerHTML = ''; // Clear existing thumbnails

  images.forEach((imgSrc, index) => {
    const button = document.createElement('button');
    button.className = `nav-link ${index === 0 ? 'active' : ''}`;
    button.id = `view-pills-img${index + 1}-tab`;
    button.setAttribute('data-bs-toggle', 'pill');
    button.setAttribute('data-bs-target', `#view-pills-img${index + 1}`);
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `view-pills-img${index + 1}`);
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Product thumbnail ${index + 1}`;
    button.appendChild(img);

    viewTab.appendChild(button);
  });
}

// end model

// suggested for you
document.addEventListener("DOMContentLoaded", function () {
  // API URL
  const apiUrl = "http://localhost:3000/category"; // Replace with your actual API URL

  // Get the parent <ul> element where we will append categories
  const categoryList = document.getElementById("pills-tab");

  // Fetch categories from API
  fetch(apiUrl)
    .then(response => response.json())
    .then(categories => {
      // Loop through each category and create the DOM elements
      categories.forEach((category, index) => {
        const isActive = index === 0 ? "active" : ""; // Set first tab as active

        // Create the list item
        const listItem = document.createElement("li");
        listItem.className = "nav-item";
        listItem.setAttribute("role", "presentation");

        // Create the button
        const button = document.createElement("button");
        button.className = `nav-link ${isActive}`;
        button.id = `sg-${category.id}-tab`;
        button.setAttribute("data-bs-toggle", "pill");
        button.setAttribute("data-bs-target", `#sg-${category.id}`);
        button.setAttribute("type", "button");
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", `sg-${category.id}`);
        button.setAttribute("aria-selected", index === 0 ? "true" : "false");
        button.textContent = category.cat_name; // Set category name as button text

        // Add event listener to fetch products for the selected category
        button.addEventListener('click', async function () {
          const products = await fetchProductsByCategory(category.id);
          displayProducts(products);
        });

        // Append button to list item
        listItem.appendChild(button);

        // Append list item to category list
        categoryList.appendChild(listItem);
      });
    })
    .catch(error => console.error("Error fetching categories:", error));
});

// New function to fetch products by category
async function fetchProductsByCategory(categoryId) {
  console.log(categoryId, "categoryId");

  try {
    const response = await fetch(`http://localhost:3000/product?cat_id=${categoryId}`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// New function to display products
function displayProducts(products) {
  const container = document.getElementById('sg-skin');
  container.innerHTML = createProductGrid(products);
}

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/product');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to create slider product HTML
function createSliderProduct(product) {
  return `
      <div class="swiper-slide">
        <div class="product-card2 style-2">
          <div class="batch">
            <span>Hot</span>
          </div>
          <div class="product-card-img">
            <a href="shop-list.html">
              <img src="${product.images[4]}"  alt="${product.name}" />
            </a>
            <div class="view-and-favorite-area">
              <ul>
                <li>
                    <a href="whistlist.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <g clip-path="url(#clip0_168_378)">
                                <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z"></path>
                            </g>
                        </svg>
                    </a>
                </li>
                <li>
                    <a data-bs-toggle="modal" data-bs-target="#product-view">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 22">
                            <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z"></path>
                            <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z"></path>
                          </svg>
                    </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="product-card-content product_text">
            <p><a href="shop-list.html">${product.brand}</a></p>
            <h6>
              <a href="product-default.html" class="hover-underline" >${product.name}</a>
            </h6>
            <span>$${product.price.toFixed(2)} <del>$${(product.price * 1.1).toFixed(2)}</del></span>
            <div class="rating">
              <ul>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
              </ul>
              <span>(50)</span>
            </div>
          </div>
          <div class="offer-timer">
            <p>Offer Will Be End:</p>
            <div class="countdown-timer">
              <ul data-countdown="2024-12-31 12:00:00">
                <li data-days="00">00</li>
                <li>:</li>
                <li data-hours="00">00</li>
                <li>:</li>
                <li data-minutes="00">00</li>
                <li>:</li>
                <li data-seconds="00">00</li>
              </ul>
            </div>
            <a href="shop-list.html" class="primary-btn3 black-bg hover-btn5 hover-white">Shop Now</a>
          </div>
        </div>
      </div>
    `;
}

// Function to create product card HTML (your existing function)
function createProductCard(product) {
  return `
      <div class="col-lg-12 col-sm-6">
        <div class="product-card2">  
          <div class="batch">
            <span>NEW</span>
          </div>
          <div class="product-card-img ${product.images.length > 1 ? 'double-img' : ''}">
            <a href="shop-list.html">
              <img src="${product.images[0]}" alt="${product.name}" ${product.images.length > 1 ? 'class="img1"' : ''} />
              ${product.images.length > 1 ? `<img src="${product.images[1]}" alt="${product.name}" class="img2" />` : ''}
            </a>
            <div class="cart-btn-area">
              <div class="cart-btn">
                <a href="cart.html" class="add-cart-btn2 round hover-btn5">
                  <i class="bi bi-bag-check"></i> Drop in Basket
                </a>
              </div>
            </div>
            <div class="view-and-favorite-area">
              <ul>
                <li>
                  <a href="whistlist.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                      <g clip-path="url(#clip0_1106_270)">
                        <path d="M11.1281 2.35735C10.8248 2.03132 10.4577 1.77117 10.0496 1.59305C9.64144 1.41493 9.20104 1.32266 8.75574 1.32197C8.31008 1.32248 7.86929 1.41462 7.46073 1.59266C7.05218 1.7707 6.6846 2.03084 6.38081 2.35692L6.17153 2.57807L5.96225 2.35692C4.74378 1.04552 2.69289 0.970207 1.38151 2.18868C1.32339 2.24269 1.26727 2.29881 1.21326 2.35692C-0.0793057 3.75111 -0.0793057 5.90577 1.21326 7.29996L5.86398 12.2044C6.02488 12.3743 6.29301 12.3816 6.46288 12.2207C6.46844 12.2154 6.47385 12.21 6.47911 12.2044L11.1281 7.29996C12.4206 5.90592 12.4206 3.75139 11.1281 2.35735Z"/>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a data-bs-toggle="modal" data-bs-target="#product-view">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <g clip-path="url(#clip0_1106_264)">
                        <path d="M15.3226 7.54747C15.1932 7.37042 12.1093 3.21228 8.17072 3.21228C4.23211 3.21228 1.14813 7.37042 1.01884 7.5473C0.959103 7.62915 0.92691 7.72785 0.92691 7.82918C0.92691 7.9305 0.959103 8.02921 1.01884 8.11105C1.14813 8.28811 4.23211 12.4462 8.17072 12.4462C12.1093 12.4462 15.1932 8.28808 15.3226 8.1112Z"/>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="product-card-content">
            <p><a href="shop-list.html">${product.brand}</a></p>
            <h6>
              <a href="product-default.html" class="hover-underline" >${product.name}</a>
            </h6>
            <span>$${product.price.toFixed(2)}</span>
            <div class="rating">
              <ul>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
              </ul>
              <span>(50)</span>
            </div>
          </div>
        </div>
      </div>
    `;
}

// Function to create the main product grid with slider
function createProductGrid(products) {
  // Separate featured products for slider
  const featuredProducts = products.filter(product => product);
  const regularProducts = products.filter(product => !product.featured);

  return `
      <div class="row g-4 align-items-center">
        <div class="col-lg-3">
          <div class="row g-4">
            ${regularProducts.slice(0, 2).map(product => createProductCard(product)).join('')}
          </div>
        </div>
        <div class="col-lg-6 position-relative">
          <div class="sg-slider-wrapper">
            <div class="swiper sg-slider">
              <div class="swiper-wrapper">
                ${featuredProducts.map(product => createSliderProduct(product)).join('')}
              </div>
            </div>
            <div class="sg-slider-btn">
              <div class="sg-prev-btn">
                <i class="bx bxs-chevron-left"></i>
              </div>
              <div class="sg-next-btn">
                <i class="bx bxs-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="row g-4">
            ${regularProducts.slice(2, 4).map(product => createProductCard(product)).join('')}
          </div>
        </div>
      </div>
    `;
}

// Function to initialize swiper
function initializeSwiper() {
  return new Swiper('.sg-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.sg-next-btn',
      prevEl: '.sg-prev-btn',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  });
}

// Function to update countdown timer
function updateCountdown() {
  const countdownElements = document.querySelectorAll('[data-countdown]');
  countdownElements.forEach(element => {
    const endDate = new Date(element.getAttribute('data-countdown')).getTime();
    const now = new Date().getTime();
    const timeLeft = endDate - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      element.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
      element.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
      element.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
      element.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
    }
  });
}

// Main function to initialize the product section
async function initializeProducts() {
  const products = await fetchProducts();
  const container = document.getElementById('sg-skin');

  if (container && products.length > 0) {
    container.innerHTML = createProductGrid(products);

    // Initialize Swiper
    const swiper = initializeSwiper();

    // Start countdown timer
    setInterval(updateCountdown, 1000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProducts);// end suggest

// shop product 

document.addEventListener("DOMContentLoaded", async function () {
  const productsPerPage = 12; // Number of products to display per page
  let currentPage = 1; // Current page number
  let totalProducts = 0; // Total number of products

  try {
    const response = await fetch("http://localhost:3000/product");
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Invalid data format");
      return;
    }

    totalProducts = data.length; // Get total number of products

    // Function to render products dynamically
    function renderProducts(products) {
      const container = document.getElementById("productContainer");
      container.innerHTML = ""; // Clear previous content

      const selectedSubcategoryId = localStorage.getItem("selectedSubcategoryId");

      // Filter products based on selectedSubcategoryId
      const filteredProducts = selectedSubcategoryId
        ? products.filter(product => product.sub_cat_id == selectedSubcategoryId)
        : products;

      // Display products
      filteredProducts.forEach(product => {
        const productCard = `
            <div class="col-lg-3 col-md-4 col-sm-6 item">
              <div class="product-card style-3 hover-btn">
                <div class="product-card-img">
                  <a href="shop-list.html">
                    <img src="${product.images[0]}" alt="${product.name}">
                    <div class="batch">
                      <span>${product.discount ? '-' + product.discount + '%' : '0%'}</span>
                    </div>
                  </a>
                  <div class="overlay">
                    <div class="cart-area">
                      <a href="cart.html" class="hover-btn3 add-cart-btn"><i class="bi bi-bag-check"></i> Drop in Basket</a>
                    </div>
                  </div>
                  <div class="view-and-favorite-area">
                    <ul>
                      <li>
                        <a href="whistlist.html">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <g clip-path="url(#clip0_168_378)">
                              <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                            </g>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-bs-toggle="modal" data-bs-target="#product-view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                            <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                            <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="product-card-content">
                  <h6><a href="product-default.html" class="hover-underline" onclick="localStorage.setItem('selectedeyeId', '${product.id}')">${product.name}</a></h6>
                  <p><a href="shop-list.html">${product.brand}</a></p>
                  <p class="price">$${product.price} <del>${product.originalPrice}</del></p>
                  <span class="for-border"></span>
                </div>
              </div>
            </div>
          `;
        container.innerHTML += productCard; // Append product card to container
      });
    }


    // Function to handle pagination
    function handlePagination(page) {
      const selectedSubcategoryId = localStorage.getItem("selectedSubcategoryId");
      const filteredProducts = selectedSubcategoryId
        ? data.filter(product => product.sub_cat_id == selectedSubcategoryId)
        : data;

      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      const paginatedProducts = filteredProducts.slice(start, end);
      renderProducts(paginatedProducts);
      renderPaginationControls(page, filteredProducts.length); // Pass filtered length
    }


    // Function to render pagination controls
    function renderPaginationControls(currentPage, filteredLength) {
      const paginationContainer = document.querySelector('.pagination-list');
      paginationContainer.innerHTML = ""; // Clear previous pagination

      const totalPages = Math.ceil(filteredLength / productsPerPage);

      // 1) PREVIOUS BUTTON
      if (currentPage > 1) {
        const prevPageItem = document.createElement('li');
        const prevPageLink = document.createElement('a');
        prevPageLink.href = "#";
        prevPageLink.textContent = "Previous";
        prevPageLink.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage--;
          handlePagination(currentPage);
        });
        prevPageItem.appendChild(prevPageLink);
        paginationContainer.appendChild(prevPageItem);
      }

      // 2) PAGE 1
      {
        const pageItem = document.createElement('li');
        const pageLink = document.createElement('a');
        pageLink.href = "#";
        pageLink.textContent = 1;
        if (currentPage === 1) {
          pageLink.className = 'active';
        }
        pageLink.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage = 1;
          handlePagination(currentPage);
        });
        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
      }

      // 3) Left Ellipsis (જો currentPage 4 કરતા મોટું હોય, તો "..." બતાવો)
      if (currentPage - 1 > 2) {
        const ellipsisItem = document.createElement('li');
        ellipsisItem.textContent = "...";
        paginationContainer.appendChild(ellipsisItem);
      }

      // 4) Middle Pages => (currentPage - 1), currentPage, (currentPage + 1)
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
          const pageItem = document.createElement('li');
          const pageLink = document.createElement('a');
          pageLink.href = "#";
          pageLink.textContent = i;
          if (i === currentPage) {
            pageLink.className = 'active';
          }
          pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            handlePagination(currentPage);
          });
          pageItem.appendChild(pageLink);
          paginationContainer.appendChild(pageItem);
        }
      }

      // 5) Right Ellipsis (જો currentPage + 1 < totalPages - 1, તો "..." બતાવો)
      if (currentPage + 1 < totalPages - 1) {
        const ellipsisItem = document.createElement('li');
        ellipsisItem.textContent = "...";
        paginationContainer.appendChild(ellipsisItem);
      }

      // 6) Last Page (totalPages)
      if (totalPages > 1) {
        const pageItem = document.createElement('li');
        const pageLink = document.createElement('a');
        pageLink.href = "#";
        pageLink.textContent = totalPages;
        if (currentPage === totalPages) {
          pageLink.className = 'active';
        }
        pageLink.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage = totalPages;
          handlePagination(currentPage);
        });
        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
      }

      // 7) NEXT BUTTON
      if (currentPage < totalPages) {
        const nextPageItem = document.createElement('li');
        const nextPageLink = document.createElement('a');
        nextPageLink.href = "#";
        nextPageLink.textContent = "Next";
        nextPageLink.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage++;
          handlePagination(currentPage);
        });
        nextPageItem.appendChild(nextPageLink);
        paginationContainer.appendChild(nextPageItem);
      }
    }


    handlePagination(currentPage); // Initial call to render products and pagination
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// end shop product 



// start review
document.addEventListener("DOMContentLoaded", async function fetchReviews() {
  try {
    const response = await fetch('http://localhost:3000/review'); // Ensure this is the correct API endpoint
    const data = await response.json();

    console.log("API Response:", data); // Debugging: Check the structure of the response

    const reviewsContainer = document.getElementById('x_testimonial');
    reviewsContainer.innerHTML = ''; // Clear previous content

    // Check if `data` is an array
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Invalid response format or no reviews found:", data);
      reviewsContainer.innerHTML = '<p>No reviews available.</p>';
      return;
    }

    data.forEach((review) => {  // Use `data` directly since it's an array
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('swiper-slide');

      reviewElement.innerHTML = `
              <div class="say-about-card">
                  <div class="say-about-card-top">
                      <ul>
                          ${'<li><i class="bi bi-star-fill"></i></li>'.repeat(review.rating || 0)}
                      </ul>
                  </div>
                  <p>"${review.review || "No review text available"}"</p>
                  <div class="say-about-card-bottom">
                      <div class="author-area">
                          <div class="author-img">
                              <img src="${review.author?.image || 'default-avatar.png'}" 
                                   alt="${review.author?.name || 'Anonymous'}" />
                          </div>
                          <div class="author">
                              <h5>${review.author?.name || "Anonymous"}</h5>
                              <p>${review.author?.date || "No date available"}</p>
                          </div>
                      </div>
                  </div>
              </div>
          `;

      reviewsContainer.appendChild(reviewElement);
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    document.getElementById('x_testimonial').innerHTML = '<p>Error loading reviews. Please try again later.</p>';
  }
});
// end review



// productmodal 
// Function to open the product modal and fetch product details
// function openProductModal(productId) {
//   console.log(productId);

//   fetch(`http://localhost:3000/product/${productId}`)
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(data => {
//           const modalContentContainer = document.getElementById('modal-content-container');
//           modalContentContainer.innerHTML = ''; // Clear existing content

//           // Create the modal content dynamically
//           const modalContent = `
//               <div class="shop-details-top-section">
//                   <div class="row gy-4">
//                       <div class="col-lg-6">
//                           <div class="shop-details-img">
//                               <div class="tab-content" id="view-tabContent">
//                         ${data.images.slice(0, 4).map((image, index) => `
//                             <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="view-pills-img${index + 1}" role="tabpanel">
//                                 <img src="${image}" alt="">
//                             </div>
//                         `).join('')}
//                     </div>
//                     <div class="nav nav-pills" id="view-tab" role="tablist" aria-orientation="vertical">
//                         ${data.images.slice(0, 4).map((image, index) => `
//                             <button class="nav-link ${index === 0 ? 'active' : ''}" id="view-pills-img${index + 1}-tab" data-bs-toggle="pill" data-bs-target="#view-pills-img${index + 1}" type="button" role="tab" aria-controls="view-pills-img${index + 1}" aria-selected="${index === 0}">
//                                 <img src="${image}" alt="">
//                             </button>
//                         `).join('')}
//                     </div>
//                           </div>
//                       </div>
//                       <div class="col-lg-6">
//                           <div class="shop-details-content">
//                               <h1>${data.name}</h1>
//                               <div class="rating-review">
//                                   <div class="rating">
//                                       <div class="star">${'<i class="bi bi-star-fill"></i>'.repeat(data.rating)}</div>
//                                       <p>(${data.reviews} customer review)</p>
//                                   </div>
//                               </div>
//                               <p>${data.description}</p>
//                               <div class="price-area">
//                                   <p class="price">$${data.price} <del>$${data.originalPrice}</del></p>
//                               </div>
//                               <div class="quantity-color-area">
//                                   <div class="quantity-color">
//                                       <h6 class="widget-title">Quantity</h6>
//                                       <div class="quantity-counter">
//                                           <a href="#" class="quantity__minus"><i class='bx bx-minus'></i></a>
//                                           <input name="quantity" type="text" class="quantity__input" value="01">
//                                           <a href="#" class="quantity__plus"><i class='bx bx-plus'></i></a>
//                                       </div>
//                                   </div>
//                               </div>
//                               <div class="shop-details-btn">
//                                   <a href="#" class="primary-btn1 hover-btn3">*Drop in Basket*</a>
//                                   <a href="checkout.html" class="primary-btn1 style-3 hover-btn4">*Shop Now*</a>
//                               </div>
//                               <div class="product-info">
//                                   <ul class="product-info-list">
//                                       <li><span>SKU:</span> ${data.sku}</li>
//                                       <li><span>Brand:</span> <a href="shop-4-columns.html">${data.brand}</a></li>
//                                       <li><span>Category:</span> <a href="shop-slider.html">${data.category}</a></li>
//                                   </ul>
//                               </div>
//                               <div class="compare-wishlist-area">
//                                   <ul>
//                                       <li>
//                                           <a href="whistlist.html">
//                                               <span>
//                                                   <svg width="11" height="11" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//                                                       <g clip-path="url(#clip0_168_378)">
//                                                           <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
//                                                       </g>
//                                                   </svg>
//                                               </span>
//                                               Add to wishlist
//                                           </a>
//                                       </li>
//                                   </ul>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           `;

//           // Insert the modal content into the container
//           modalContentContainer.innerHTML = modalContent;

//           // Show the modal
//           const modal = new bootstrap.Modal(document.getElementById('product-view'));
//           modal.show();
//       })
//       .catch(error => console.error('Error fetching product data:', error));
// }

// Event listener to open the modal
// document.addEventListener('DOMContentLoaded', () => {
//   const productId = localStorage.getItem('selectedProductId');
//   if (productId) {
//       openProductModal(productId);
//   }
// });

// end productmodal 

// Add event listener for product view button
document.querySelectorAll('.product-view-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        localStorage.setItem('selectedeyeId', productId); // Store the product ID in local storage
        console.log("Product ID stored:", productId);
    });
});

// Add event listener for modal show event
document.addEventListener('DOMContentLoaded', () => {
    const productModal = document.getElementById('product-view');
    productModal.addEventListener('show.bs.modal', async () => {
        const selectedeyeId = localStorage.getItem('selectedeyeId');
        if (selectedeyeId) {
            await fetchAndDisplayProduct(selectedeyeId); // Fetch and display the product on modal open
        } else {
            console.error('No product ID found in localStorage');
        }
    });
});

// Function to fetch product data and update modal
async function fetchAndDisplayProduct(selectedeyeId) {
    try {
        const response = await fetch('http://localhost:3000/product');
        const products = await response.json();
        const product = products.find(p => p.id == selectedeyeId); // Match the product ID

        if (product) {
            // Update modal content with the fetched product data
            document.querySelector('.product-title').textContent = product.name;
            document.querySelector('.product-description').textContent = product.description;
            document.querySelector('.current-price').textContent = product.price.toFixed(2);
            document.querySelector('.original-price').textContent = (product.price * 1.2).toFixed(2);
            document.querySelector('.sku-value').textContent = product.sku;
            document.querySelector('.brand-value').textContent = product.brand;
            document.querySelector('.category-value').textContent = product.category;
            document.querySelector('.main-product-img').src = product.images[0];
            
            // Call to create thumbnails if there are multiple images
            createThumbnails(product.images);
        } else {
            console.error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}
