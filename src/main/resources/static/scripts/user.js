const url = '/api/user'

async function getUserPage() {
    let response = await fetch(url);

    if (response.ok) {
        let userData = await response.json();
        fillTable(userData);
    } else {
        alert(`HTTP Error, ${response.status}`);
    }
}

function fillTable(userData) {
    let tableRow = document.createElement("tr");
    let roles = [];

    for (const role of userData.roles) {
        roles.push(" " + role.name.toString()
            .replaceAll('ROLE_', ''));

    }

    tableRow.innerHTML = `
                <tr>
                    <td> ${userData.id} </td>
                    <td> ${userData.firstName} </td>
                    <td> ${userData.lastName} </td>
                    <td> ${userData.email} </td>
                    <td> ${roles} </td>
                </tr>`;
    document.getElementById(`userTable`)
        .append(tableRow);
}

getUserPage();