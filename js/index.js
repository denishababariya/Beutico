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
// ... existing code ...
// ... existing code ...
document.addEventListener("DOMContentLoaded", function () {
    // Fetch products when the page loads
    fetch('http://localhost:3000/product', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            console.log("Response status:", response.status); // Log the response status
            
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            console.log('Products:', products); // Log the fetched products
            
            if (!Array.isArray(products)) {
                console.error('Expected products to be an array, but got:', products);
                return; // Exit if products is not an array
            }

            const categoryContainer = document.getElementById('categoryContainer'); // Select the container for categories

            // Clear existing categories if any
            categoryContainer.innerHTML = '';

            products.forEach(product => {
                // Create product card elements
                const colDiv = document.createElement('div');
                colDiv.className = 'col-lg-3 col-md-4 col-sm-6'; // Adjust column classes as needed

                const categoryCard = document.createElement('div');
                categoryCard.className = 'product-card hover-btn';

                const categoryCardImg = document.createElement('div');
                categoryCardImg.className = 'product-card-img double-img';

                const anchorContent = document.createElement('a');
                anchorContent.href = 'product-default.html'; // Link to product details

                const img1 = document.createElement('img');
                img1.src = product.image1; // Assuming product has image1 property
                img1.alt = '';
                anchorContent.appendChild(img1);

                const img2 = document.createElement('img');
                img2.src = product.image2; // Assuming product has image2 property
                img2.alt = '';
                anchorContent.appendChild(img2);

                categoryCardImg.appendChild(anchorContent);
                categoryCard.appendChild(categoryCardImg);

                // Add product details
                const productCardContent = document.createElement('div');
                productCardContent.className = 'product-card-content';
                productCardContent.innerHTML = `
                    <h6><a href="product-default.html" class="hover-underline">${product.name}</a></h6>
                    <p class="price">${product.price} <del>${product.originalPrice}</del></p>
                `;
                categoryCard.appendChild(productCardContent);
                colDiv.appendChild(categoryCard);
                categoryContainer.appendChild(colDiv); // Append the new category card to the container
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
});
// ... existing code ...
// ... existing code ...