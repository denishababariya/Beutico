fetch('http://localhost:3000/product')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            // Create product card elements
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-4 col-sm-6';
            const categoryCard = document.createElement('div');
            categoryCard.className = 'product-card hover-btn';
            const categoryCardImg = document.createElement('div');
            categoryCardImg.className = 'product-card-img double-img';
            const anchorContent = document.createElement('a');
            anchorContent.href = 'product-default.html'; // Link to product details
            const img1 = document.createElement('img');
            img1.src = product.image1; // Assuming product has image1 property
            img1.alt = '';
            const img2 = document.createElement('img');
            img2.src = product.image2; // Assuming product has image2 property
            img2.alt = '';
            anchorContent.appendChild(img1);
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