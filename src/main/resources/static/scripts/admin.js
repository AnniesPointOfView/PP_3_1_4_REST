const url = '/api/users';
const urlUser = '/api/user';
const urlRoles = '/api/roles';

const table = $('#usersTable');

$(async function() {

    await getAllUsers();
    await getCurrentUser();
    await saveUser();

});

async function getAllUsers() {
    table.empty();
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                let usersTable = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => " " + role.name.substring(5))}</td>
                            <td>
                                <button type="submit" 
                                class="btn btn-info" 
                                id="buttonEdit"
                                data-bs-toggle="modal" 
                                data-bs-target="#editModal"
                                onclick="editFormFill(${user.id})">Edit</button>
                            </td>
                            <td>
                                <button type="submit" 
                                class="btn btn-danger" 
                                id="buttonDelete"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                onclick="deleteFormFill(${user.id})">Delete</button>
                            </td>
                        </tr>)`;
                table.append(usersTable);
            })
        });
}

async function getCurrentUser() {
    fetch(urlUser)
        .then(res => res.json())
        .then(data => {
            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.roles.map(role => " " + role.name.substring(5))}</td>`;
            $('#userTable').append(user);
        });
}

async function saveUser() {
    await fetch(urlRoles)
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                $('#newRoles')[0].appendChild(el);
            })
        })

    const form = document.forms["userForm"];

    form.addEventListener('submit', addNewUser)

    function addNewUser(e) {
        e.preventDefault();
        let newRoles = [];
        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) newRoles.push({
                id : form.roles.options[i].value,
                name : form.roles.options[i].name
            })
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                password: form.password.value,
                roles: newRoles
            })
        }).then(() => {
            form.reset();
            document.getElementById("nav-usersTable-tab").click();
            getAllUsers();
        });

    }

}


