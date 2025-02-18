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
            console.log('Categories:', categories); // Log the categories
            const categoryList = document.getElementById('categoryList'); // Get the category list element

            // Fetch subcategories
            return fetch('http://localhost:3000/subcategory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            }).then(subcategories => {
                console.log('All subcategories:', subcategories); // Log all subcategories

                // Log IDs for debugging
                categories.forEach(category => {
                    console.log(`Category ID: ${category.id} (Type: ${typeof category.id})`);
                });
                subcategories.forEach(sub => {
                    console.log(`Subcategory Category ID: ${sub.category_id} (Type: ${typeof sub.category_id})`);
                });

                // Iterate over each category
                categories.forEach(category => {
                    const li = document.createElement('li'); // Create a new list item
                    li.classList.add('menu-item-has-children', 'position-inherit'); // Add classes to the li

                    const a = document.createElement('a'); // Create a new anchor element
                    a.classList.add('drop-down'); // Add class to the a
                    a.href = `#${category.cat_name}`; // Set the href attribute (modify as needed)
                    a.textContent = category.cat_name; // Set the text to the category name

                    // Create the icon element
                    const icon = document.createElement('i');
                    icon.classList.add('bi', 'bi-plus', 'dropdown-icon'); // Add classes to the icon

                    a.appendChild(icon); // Append the icon to the anchor after the text
                    li.appendChild(a); // Append the anchor to the list item

                    // Create the mega menu div
                    const megaMenuDiv = document.createElement('div');
                    megaMenuDiv.classList.add('mega-menu2');
                    megaMenuDiv.style.backgroundImage = `url('/img/home1/megamenu2-${category.cat_name.toLowerCase()}-bg.png')`; // Set background image

                    const megaMenuWrap = document.createElement('div');
                    megaMenuWrap.classList.add('megamenu-wrap');

                    const subCategoryList = document.createElement('ul');
                    subCategoryList.classList.add('menu-row');

                    // Filter subcategories for the current category
                    const filteredSubcategories = subcategories.filter(sub => sub.category_id === Number(category.id)); // Convert category.id to a number
                    console.log('Filtered subcategories for', category.cat_name, ':', filteredSubcategories); // Log filtered subcategories

                    // Iterate over filtered subcategories
                    filteredSubcategories.forEach(sub => {
                        const subLi = document.createElement('li');
                        subLi.classList.add('menu-single-item');

                        const subA = document.createElement('a');
                        subA.href = 'shop-list.html'; // Set the link for the subcategory
                        subA.textContent = sub.sub_name; // Set the text to the subcategory name

                        subLi.appendChild(subA); // Append the sub anchor to the sub list item
                        subCategoryList.appendChild(subLi); // Append the sub list item to the subcategory list

                        console.log('Appended subcategory:', sub.sub_name); // Log each appended subcategory
                    });

                    megaMenuWrap.appendChild(subCategoryList); // Append the subcategory list to the mega menu wrap
                    megaMenuDiv.appendChild(megaMenuWrap); // Append the mega menu wrap to the mega menu div
                    li.appendChild(megaMenuDiv); // Append the mega menu div to the list item
                    categoryList.appendChild(li); // Append the list item to the category list

                    a.addEventListener('click', function (event) {
                        event.preventDefault(); // Prevent default anchor behavior
                        const isActive = li.classList.toggle('active'); // Toggle active class on the li

                        // Modify the style or class based on the active state
                        if (isActive) {
                            megaMenuDiv.style.display = 'block'; // Show the mega menu
                            icon.classList.remove('bi-plus'); // Change icon to minus
                            icon.classList.add('bi-dash'); // Add minus icon class
                        } else {
                            megaMenuDiv.style.display = 'none'; // Hide the mega menu
                            icon.classList.remove('bi-dash'); // Change icon back to plus
                            icon.classList.add('bi-plus'); // Add plus icon class
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
            const image1 = product.images?.[0] || "/img/default1.jpg"; // Fallback image
            const image2 = product.images?.[1] || "/img/default2.jpg"; // Fallback image

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
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


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
  
          // Append button to list item
          listItem.appendChild(button);
  
          // Append list item to category list
          categoryList.appendChild(listItem);
        });
      })
      .catch(error => console.error("Error fetching categories:", error));
  });



//   for you card
// Function to fetch products from API
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
          <div class="product-card-content product_text">
            <p><a href="shop-list.html">${product.brand}</a></p>
            <h6>
              <a href="product-default.html" class="hover-underline">${product.name}</a>
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
              <a href="product-default.html" class="hover-underline">${product.name}</a>
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
  document.addEventListener('DOMContentLoaded', initializeProducts);