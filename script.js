function navigateToExpenditureOverview() {
    window.location.href = "expenditure-overview.html";
}

function addGroup() {
    const groupsContainer = document.getElementById('groupsContainer');
    const groupDiv = document.createElement('div');
    groupDiv.className = 'card mt-3';
    groupDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Group</h5>
            <div class="mb-3">
                <label>Position:</label>
                <select class="form-select">
                    <option value="head">Group Head</option>
                    <option value="member">Member</option>
                </select>
            </div>
            <div class="mb-3">
                <label>Type of Work:</label>
                <select class="form-select">
                    <option value="orchard">Orchard</option>
                    <option value="milk">Milk Products</option>
                    <option value="handloom">Handloom</option>
                    <option value="arts">Arts</option>
                </select>
            </div>
            <div class="mb-3">
                <label>Raw Material:</label>
                <select class="form-select">
                    <option value="seeds">Seeds</option>
                    <option value="milk">Milk</option>
                    <option value="wool">Wool</option>
                    <option value="wood">Wood</option>
                    <option value="pipes">Pipes</option>
                </select>
            </div>
            <div class="mb-3">
                <label>Quantity:</label>
                <input type="number" class="form-control" value="1" min="1" max="10" oninput="calculateAmount(this)">
            </div>
            <p>Amount: <span class="amount">0</span></p>
        </div>
    `;
    groupsContainer.appendChild(groupDiv);
}

function calculateAmount(element) {
    const quantity = element.value;
    const amount = quantity * 100; // Example calculation
    element.parentElement.querySelector('.amount').textContent = amount;
}

function addRentalItem() {
    const rentalItemsContainer = document.getElementById('rentalItemsContainer');
    const rentalDiv = document.createElement('div');
    rentalDiv.className = 'card mt-3';
    rentalDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Rental Item</h5>
            <div class="mb-3">
                <label>Village Name:</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label>Name of SSG:</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label>Rented From:</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label>Item Rented:</label>
                <input type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label>In-Time:</label>
                <input type="datetime-local" class="form-control" oninput="calculateRentalAmount(this)">
            </div>
            <div class="mb-3">
                <label>Out-Time:</label>
                <input type="datetime-local" class="form-control" oninput="calculateRentalAmount(this)">
            </div>
            <p>Amount: <span class="rentalAmount">0</span></p>
        </div>
    `;
    rentalItemsContainer.appendChild(rentalDiv);
}

function calculateRentalAmount(element) {
    const rentalItemDiv = element.parentElement;
    const inTime = new Date(rentalItemDiv.querySelector('input[type="datetime-local"]:nth-child(6)').value);
    const outTime = new Date(rentalItemDiv.querySelector('input[type="datetime-local"]:nth-child(8)').value);
    const duration = (outTime - inTime) / (1000 * 60 * 60); // Duration in hours
    const amount = duration * 50; // Example rate
    rentalItemDiv.querySelector('.rentalAmount').textContent = amount;
}

function downloadExpenditureData() {
    alert('Download XLS functionality is under construction.');
}
