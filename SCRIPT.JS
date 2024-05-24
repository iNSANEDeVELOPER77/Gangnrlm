document.getElementById('submitBtn').addEventListener('click', function() {
    window.location.href = 'expenditure-overview.html';
});

// Function to save data to localStorage
function saveData() {
    const data = {
        groups: [],
        rentals: []
    };

    const groupListTable = document.getElementById('groupListTable').querySelector('tbody').children;
    for (let i = 0; i < groupListTable.length; i++) {
        const row = groupListTable[i];
        const group = {
            groupName: row.cells[0].textContent,
            moneyAllotted: row.cells[1].textContent,
            memberName: row.cells[2].textContent,
            typeOfWork: row.cells[3].textContent,
            rawMaterial: row.cells[4].textContent,
            quantity: row.cells[5].textContent,
            amount: row.cells[6].textContent
        };
        data.groups.push(group);
    }

    const rentalListTable = document.getElementById('rentalListTable').querySelector('tbody').children;
    for (let i = 0; i < rentalListTable.length; i++) {
        const row = rentalListTable[i];
        const rental = {
            villageName: row.cells[0].textContent,
            ssgName: row.cells[1].textContent,
            rentedFrom: row.cells[2].textContent,
            itemRented: row.cells[3].textContent,
            inTime: row.cells[4].textContent,
            outTime: row.cells[5].textContent,
            amount: row.cells[6].textContent
        };
        data.rentals.push(rental);
    }

    localStorage.setItem('nrlmData', JSON.stringify(data));
}

// Function to load data from localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('nrlmData'));

    if (data) {
        const groupListTable = document.getElementById('groupListTable').querySelector('tbody');
        data.groups.forEach(group => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${group.groupName}</td>
                <td>${group.moneyAllotted}</td>
                <td>${group.memberName}</td>
                <td>${group.typeOfWork}</td>
                <td>${group.rawMaterial}</td>
                <td>${group.quantity}</td>
                <td>${group.amount}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeRow(this)">Remove</button></td>
            `;
            groupListTable.appendChild(row);
        });

        const rentalListTable = document.getElementById('rentalListTable').querySelector('tbody');
        data.rentals.forEach(rental => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rental.villageName}</td>
                <td>${rental.ssgName}</td>
                <td>${rental.rentedFrom}</td>
                <td>${rental.itemRented}</td>
                <td>${rental.inTime}</td>
                <td>${rental.outTime}</td>
                <td>${rental.amount}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeRow(this)">Remove</button></td>
            `;
            rentalListTable.appendChild(row);
        });

        updateExpenditureOverview();
    }
}

// Call loadData on page load
window.onload = function() {
    loadData();
    updateExpenditureOverview();
};

function updateExpenditureOverview() {
    let moneyAllotted = 0;
    let moneySpent = 0;
    
    const groupListTable = document.getElementById('groupListTable').querySelector('tbody').children;
    for (let i = 0; i < groupListTable.length; i++) {
        const row = groupListTable[i];
        moneyAllotted += parseFloat(row.cells[1].textContent);
        moneySpent += parseFloat(row.cells[6].textContent);
    }

    const rentalListTable = document.getElementById('rentalListTable').querySelector('tbody').children;
    for (let i = 0; i < rentalListTable.length; i++) {
        const row = rentalListTable[i];
        moneySpent += parseFloat(row.cells[6].textContent);
    }

    document.getElementById('moneyAllotted').textContent = moneyAllotted.toFixed(2);
    document.getElementById('moneySpent').textContent = moneySpent.toFixed(2);
    document.getElementById('moneyRemaining').textContent = (moneyAllotted - moneySpent).toFixed(2);
}

function addGroup() {
    const groupsContainer = document.getElementById('groupsContainer');
    const groupDiv = document.createElement('div');
    groupDiv.className = 'card mt-3';
    groupDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Group</h5>
            <div class="mb-3">
                <label>Group Name:</label>
                <input type="text" class="form-control groupName">
            </div>
            <div class="mb-3">
                <label>Money Allotted:</label>
                <input type="number" class="form-control moneyAllotted" value="0" onchange="updateExpenditureOverview()">
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" onclick="addMember(this)">Add Member</button>
            </div>
            <div class="membersContainer"></div>
            <button class="btn btn-success mt-3" onclick="addGroupToList(this)">Add to List</button>
        </div>
    `;
    groupsContainer.appendChild(groupDiv);
}

function addMember(button) {
    const membersContainer = button.closest('.card').querySelector('.membersContainer');
    const memberDiv = document.createElement('div');
    memberDiv.className = 'card mt-2';
    memberDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Member</h5>
            <div class="mb-3">
                <label>Member Name:</label>
                <input type="text" class="form-control memberName">
            </div>
            <div class="mb-3">
                <label>Type of Work:</label>
                <div class="input-group">
                    <select id="typeOfWorkSelect" class="form-select" onchange="showSubmenu(this, 'typeOfWorkSubmenu')">
                        <option value="Orchard">Orchard</option>
                        <option value="Milk Products">Milk Products</option>
                        <option value="Handloom">Handloom</option>
                        <option value="Arts">Arts</option>
                    </select>
                    <button type="button" class="btn btn-primary btn-sm ms-2" onclick="addOption('typeOfWorkSelect')">+</button>
                    <button type="button" class="btn btn-secondary btn-sm ms-2" onclick="editOption('typeOfWorkSelect')">Edit</button>
                </div>
                <div id="typeOfWorkSubmenu" class="submenu" style="display:none;"></div>
            </div>
            <div class="mb-3">
                <label>Raw Material:</label>
                <div class="input-group">
                    <select id="rawMaterialSelect" class="form-select" onchange="showSubmenu(this, 'rawMaterialSubmenu')">
                        <option value="Seeds">Seeds</option>
                        <option value="Milk">Milk</option>
                        <option value="Wool">Wool</option>
                        <option value="Wood">Wood</option>
                        <option value="Pipes">Pipes</option>
                    </select>
                    <button type="button" class="btn btn-primary btn-sm ms-2" onclick="addOption('rawMaterialSelect')">+</button>
                    <button type="button" class="btn btn-secondary btn-sm ms-2" onclick="editOption('rawMaterialSelect')">Edit</button>
                </div>
                <div id="rawMaterialSubmenu" class="submenu" style="display:none;"></div>
            </div>
            <div class="mb-3">
                <label>Quantity:</label>
                <input type="number" class="form-control quantity" value="1" onchange="calculateAmount(this)">
            </div>
            <p>Amount: INR <span class="amount">100</span></p>
            <button class="btn btn-danger" onclick="removeMember(this)">Remove Member</button>
        </div>
    `;
    membersContainer.appendChild(memberDiv);
}

function calculateAmount(input) {
    const quantity = input.value;
    const amountElement = input.closest('.card-body').querySelector('.amount');
    const amount = 100 * quantity;
    amountElement.textContent = amount.toFixed(2);
    updateExpenditureOverview();
}

function addGroupToList(button) {
    const cardBody = button.closest('.card-body');
    const groupName = cardBody.querySelector('.groupName').value;
    const moneyAllotted = cardBody.querySelector('.moneyAllotted').value;
    const membersContainer = cardBody.querySelector('.membersContainer').children;

    const groupListTable = document.getElementById('groupListTable').querySelector('tbody');
    for (let i = 0; i < membersContainer.length; i++) {
        const memberCard = membersContainer[i];
        const memberName = memberCard.querySelector('.memberName').value;
        const typeOfWork = memberCard.querySelector('.form-select').value;
        const rawMaterial = memberCard.querySelector('.form-select').value;
        const quantity = memberCard.querySelector('.quantity').value;
        const amount = memberCard.querySelector('.amount').textContent;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${groupName}</td>
            <td>${moneyAllotted}</td>
            <td>${memberName}</td>
            <td>${typeOfWork}</td>
            <td>${rawMaterial}</td>
            <td>${quantity}</td>
            <td>${amount}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeRow(this)">Remove</button></td>
        `;
        groupListTable.appendChild(row);
    }
    cardBody.closest('.card').remove();
    saveData();
    updateExpenditureOverview();
}

function addRental() {
    const rentalsContainer = document.getElementById('rentalsContainer');
    const rentalDiv = document.createElement('div');
    rentalDiv.className = 'card mt-3';
    rentalDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Rental</h5>
            <div class="mb-3">
                <label>Village Name:</label>
                <input type="text" class="form-control villageName">
            </div>
            <div class="mb-3">
                <label>SSG Name:</label>
                <input type="text" class="form-control ssgName">
            </div>
            <div class="mb-3">
                <label>Rented From:</label>
                <input type="text" class="form-control rentedFrom">
            </div>
            <div class="mb-3">
                <label>Item Rented:</label>
                <input type="text" class="form-control itemRented">
            </div>
            <div class="mb-3">
                <label>In Time:</label>
                <input type="time" class="form-control inTime">
            </div>
            <div class="mb-3">
                <label>Out Time:</label>
                <input type="time" class="form-control outTime">
            </div>
            <div class="mb-3">
                <label>Amount:</label>
                <input type="number" class="form-control amount" value="0" onchange="updateExpenditureOverview()">
            </div>
            <button class="btn btn-success mt-3" onclick="addRentalToList(this)">Add to List</button>
        </div>
    `;
    rentalsContainer.appendChild(rentalDiv);
}

function addRentalToList(button) {
    const cardBody = button.closest('.card-body');
    const villageName = cardBody.querySelector('.villageName').value;
    const ssgName = cardBody.querySelector('.ssgName').value;
    const rentedFrom = cardBody.querySelector('.rentedFrom').value;
    const itemRented = cardBody.querySelector('.itemRented').value;
    const inTime = cardBody.querySelector('.inTime').value;
    const outTime = cardBody.querySelector('.outTime').value;
    const amount = cardBody.querySelector('.amount').value;

    const rentalListTable = document.getElementById('rentalListTable').querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${villageName}</td>
        <td>${ssgName}</td>
        <td>${rentedFrom}</td>
        <td>${itemRented}</td>
        <td>${inTime}</td>
        <td>${outTime}</td>
        <td>${amount}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeRow(this)">Remove</button></td>
    `;
    rentalListTable.appendChild(row);
    cardBody.closest('.card').remove();
    saveData();
    updateExpenditureOverview();
}

function removeRow(button) {
    button.closest('tr').remove();
    saveData();
    updateExpenditureOverview();
}

function removeMember(button) {
    button.closest('.card').remove();
}

function showSubmenu(select, submenuId) {
    const selectedValue = select.value;
    const submenu = document.getElementById(submenuId);
    
    submenu.innerHTML = `
        <label>${selectedValue} Submenu:</label>
        <select class="form-select">
            <option value="default">Default Option</option>
        </select>
        <button type="button" class="btn btn-primary btn-sm ms-2" onclick="addSubmenuOption('${submenuId}')">+</button>
        <button type="button" class="btn btn-secondary btn-sm ms-2" onclick="editSubmenuOption('${submenuId}')">Edit</button>
    `;
    submenu.style.display = 'block';
}

function addOption(selectId) {
    const newOption = prompt("Enter new option:");
    if (newOption) {
        const select = document.getElementById(selectId);
        const option = document.createElement("option");
        option.value = newOption;
        option.text = newOption;
        select.add(option);
    }
}

function editOption(selectId) {
    const select = document.getElementById(selectId);
    const selectedOption = select.options[select.selectedIndex];
    const newOption = prompt("Edit option:", selectedOption.text);
    if (newOption) {
        selectedOption.text = newOption;
        selectedOption.value = newOption;
    }
}

function addSubmenuOption(submenuId) {
    const submenu = document.getElementById(submenuId);
    const select = submenu.querySelector('.form-select');
    const newOption = prompt("Enter new submenu option:");
    if (newOption) {
        const option = document.createElement("option");
        option.value = newOption;
        option.text = newOption;
        select.add(option);
    }
}

function editSubmenuOption(submenuId) {
    const submenu = document.getElementById(submenuId);
    const select = submenu.querySelector('.form-select');
    const selectedOption = select.options[select.selectedIndex];
    const newOption = prompt("Edit submenu option:", selectedOption.text);
    if (newOption) {
        selectedOption.text = newOption;
        selectedOption.value = newOption;
    }
}

// Download table data as XLS file
document.getElementById('downloadXlsBtn').addEventListener('click', function() {
    const groupTable = document.getElementById('groupListTable');
    const rentalTable = document.getElementById('rentalListTable');

    const groupTableData = tableToJson(groupTable);
    const rentalTableData = tableToJson(rentalTable);

    const workbook = XLSX.utils.book_new();
    const groupSheet = XLSX.utils.json_to_sheet(groupTableData);
    const rentalSheet = XLSX.utils.json_to_sheet(rentalTableData);

    XLSX.utils.book_append_sheet(workbook, groupSheet, 'Group List');
    XLSX.utils.book_append_sheet(workbook, rentalSheet, 'Rental List');

    XLSX.writeFile(workbook, 'expenditure_overview.xlsx');
});

function tableToJson(table) {
    const rows = table.querySelectorAll('tr');
    const headers = [];
    const data = [];

    for (let i = 0; i < rows[0].cells.length; i++) {
        headers[i] = rows[0].cells[i].innerText;
    }

    for (let i = 1; i < rows.length; i++) {
        const tableRow = rows[i];
        const rowData = {};

        for (let j = 0; j < tableRow.cells.length - 1; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerText;
        }

        data.push(rowData);
    }

    return data;
}
function showGroupList() {
    document.getElementById('groupListSection').style.display = 'block';
    document.getElementById('showGroupListBtn').style.display = 'none';
}

function showRentalList() {
    document.getElementById('rentalListSection').style.display = 'block';
    document.getElementById('showRentalListBtn').style.display = 'none';
}
