document.addEventListener("DOMContentLoaded", function() {
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
        console.log(categories); // Log the fetched categories
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
            console.log(subcategories); // Log the fetched subcategories
            
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
                const filteredSubcategories = subcategories.filter(sub => sub.category_id === category.id);

                // Iterate over filtered subcategories
                filteredSubcategories.forEach(sub => {
                    const subLi = document.createElement('li');
                    subLi.classList.add('menu-single-item');

                    const subA = document.createElement('a');
                    subA.href = 'shop-list.html'; // Set the link for the subcategory
                    subA.textContent = sub.sub_name; // Set the text to the subcategory name

                    subLi.appendChild(subA); // Append the sub anchor to the sub list item
                    subCategoryList.appendChild(subLi); // Append the sub list item to the subcategory list
                });

                megaMenuWrap.appendChild(subCategoryList); // Append the subcategory list to the mega menu wrap
                megaMenuDiv.appendChild(megaMenuWrap); // Append the mega menu wrap to the mega menu div
                li.appendChild(megaMenuDiv); // Append the mega menu div to the list item
                categoryList.appendChild(li); // Append the list item to the category list

                // Add click event to the anchor
                a.addEventListener('click', function(event) {
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