document.addEventListener('DOMContentLoaded', () => {
    const date = document.getElementById('date');

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    date.value = formattedDate;

    document.getElementById('btnAdd').addEventListener('click', function () {
        const itemSelect = document.getElementById('itemSelect');
        const amountInput = document.getElementById('amountInput');

        const selectedItem = itemSelect.value;
        const amount = parseInt(amountInput.value, 10);

        if (!amount || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        // Assuming unit prices for the items (these can be fetched from a data source)
        const unitPrices = {
            'Cover': 1000,
            'Wheel': 1500,
            'Seat': 2000,
            'GPS': 2500
        };

        const unitPrice = unitPrices[selectedItem];
        const itemTotal = unitPrice * amount;

        // Add the item to the table
        const tableBody = document.getElementById('dataTable');
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${amount}</td>
            <td>${selectedItem}</td>
            <td>${unitPrice.toFixed(2)}</td>
            <td>${itemTotal.toFixed(2)}</td>
            <td><button class="btnRemove">Cancel</button></td>
        `;

        // Add event listener to the remove button
        row.querySelector('.btnRemove').addEventListener('click', function () {
            row.remove();
            updateTotals();
        });

        // Update the totals
        updateTotals();
    });

    function updateTotals() {
        const tableBody = document.getElementById('dataTable');
        let subTotal = 0;

        for (let i = 0; i < tableBody.rows.length; i++) {
            const row = tableBody.rows[i];
            const amount = parseFloat(row.cells[3].innerText);
            subTotal += amount;
        }

        const vat = subTotal * 0.07;
        const total = subTotal + vat;

        document.getElementById('subTotal').innerText = subTotal.toFixed(2);
        document.getElementById('salesTax').innerText = vat.toFixed(2);
        document.getElementById('totalDue').innerText = total.toFixed(2);
    }
});
