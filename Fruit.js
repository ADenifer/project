
//-------------------------
// On the redirected page (Page B - redirected_page.html)
document.addEventListener('DOMContentLoaded', function () {
    // Read the username from localStorage
    var loggedInUsername = localStorage.getItem('loggedInUsername');
    
    // Set the same username on all images in the carousel
    var carouselCaptions = document.querySelectorAll('.carousel-caption');
    for (var i = 0; i < carouselCaptions.length; i++) {
        var caption = carouselCaptions[i];
        var marquee = document.createElement('p');
        marquee.className = 'marquee';
        marquee.textContent = 'Welcome To My Fruit Shop, ' + loggedInUsername;
        caption.appendChild(marquee);
    }
});






// ------------  Calculation for Fruits -------------

// -------------   Fruit Order Print Code

document.addEventListener('DOMContentLoaded', function () {
    const fruitDivs = document.querySelectorAll('.fruit');
    const gridViewBody = document.getElementById('grid-view-body');
    const totalPriceSpan = document.getElementById('total-price');
    const cart = {}; // Object to store cart items and quantities

    fruitDivs.forEach((fruitDiv) => {
        const addButton = fruitDiv.querySelector('.add-to-cart');
        const fruitName = fruitDiv.getAttribute('data-fruit');
        const fruitPrice = parseFloat(fruitDiv.getAttribute('data-price'));

        addButton.addEventListener('click', function () {
            // Increase the fruit count or initialize to 1 if it doesn't exist
            if (cart[fruitName]) {
                cart[fruitName].count++;
            } else {
                cart[fruitName] = { count: 1, price: fruitPrice };
            }

            // Update the grid view
            updateGridView();
        });
    });

    function updateGridView() {
        // Clear the current grid view
        gridViewBody.innerHTML = '';

        // Initialize total price to 0
        let totalPrice = 0;

        // Loop through the cart object and add items to the grid view
        for (const fruitName in cart) {
            const { count, price } = cart[fruitName];
            const row = document.createElement('tr');

            // Fruit Name
            const fruitCell = document.createElement('td');
            fruitCell.textContent = fruitName;
            row.appendChild(fruitCell);

            // Price
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${price.toFixed(2)}`;
            row.appendChild(priceCell);

            // Quantity
            const quantityCell = document.createElement('td');
            quantityCell.textContent = count;
            row.appendChild(quantityCell);

            // Create a "Remove" button for each item in the grid view
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-from-cart');
            removeButton.textContent = '-';

            // Attach an event listener to the "Remove" button
            removeButton.addEventListener('click', function () {
                // Remove one quantity of the fruit
                if (cart[fruitName].count > 1) {
                    cart[fruitName].count--;
                } else {
                    delete cart[fruitName]; // Remove the fruit if quantity becomes zero
                }

                // Update the grid view
                updateGridView();
            });

            // Add the "Remove" button to the Remove column
            const removeCell = document.createElement('td');
            removeCell.appendChild(removeButton);
            row.appendChild(removeCell);

            gridViewBody.appendChild(row);

            // Calculate and update the total price
            totalPrice += count * price;
        }

        // Update the total price display
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }

    
    // ------------- Print Fruits Details
    
    const printButton = document.getElementById('print-button');

    printButton.addEventListener('click', function () {
        printCart();
    });
    
    function printCart() {
        const gridViewBody = document.getElementById('grid-view-body');
        const totalPriceSpan = document.getElementById('total-price');
    
        // Clone the grid view to create a version without the "Remove" button
        const gridViewWithoutRemoveButton = gridViewBody.cloneNode(true);
        const removeButtons = gridViewWithoutRemoveButton.querySelectorAll('.remove-from-cart');
        
        // Remove the "Remove" button column
        removeButtons.forEach(function(button) {
            const removeCell = button.parentElement;
            const row = removeCell.parentElement;
            row.removeChild(removeCell);
        });
    
        // Create a new window for printing
        const printWindow = window.open('', '', 'width=600,height=600');
    
        // Prepare the content to be printed
        const gridHTML = `
            <h2>Grid View</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fruit Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    ${gridViewWithoutRemoveButton.innerHTML}
                </tbody>
            </table>
            <p>Total Price: $${totalPriceSpan.textContent}</p>
        `;
    
        // Write the content to the new window
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Grid View</title>
            </head>
            <body>${gridHTML}</body>
            </html>
        `);
        printWindow.document.close();
    
        // Trigger the print dialog
        printWindow.print();
        printWindow.close();
    }
    
    
});


