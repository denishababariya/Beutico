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



// rental
function fetchProducts() {
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

        let allProducts = data;

        console.log('Extracted Products:', allProducts);
        
        const categoryContainer = document.getElementById('categoryContainer');
        if (!categoryContainer) {
            console.error('categoryContainer not found in DOM');
            return;
        }
        
        categoryContainer.innerHTML = '';
        
        allProducts.forEach(product => {
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
                            <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721Z"></path>
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
        });
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
}

window.onload = fetchProducts;