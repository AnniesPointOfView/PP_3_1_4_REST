const editForm = document.getElementById('userEditForm');
const idField = document.getElementById('edit-id');
const fistNameField = document.getElementById('edit-firstName');
const lastNameField = document.getElementById('edit-lastName');
const emailField = document.getElementById('edit-email');
const passwordField = document.getElementById('edit-password');

async function editFormFill(id) {
    const userByIdURL = '/api/users/' + id;
    let userResponse = await fetch(userByIdURL);
    if (userResponse.ok) {
        let userData =
            await userResponse.json().then(user => {
                idField.value = `${user.id}`;
                fistNameField.value = `${user.firstName}`;
                lastNameField.value = `${user.lastName}`;
                emailField.value = `${user.email}`;
                getUserEditRoles(id);
            })

    } else {
        alert(`HTTP Error, ${userResponse.status}`)
    }
}

async function updateUser() {
    const url = '/api/users/' + idField.value
    let roles = [];

    for (let i = 0; i < editForm.selectRolesName.options.length; i++) {
        if (editForm.selectRolesName.options[i].selected) roles.push({
            id: editForm.selectRolesName.options[i].value
        })
    }

    let user = {
        id: idField.value,
        firstName: fistNameField.value,
        lastName: lastNameField.value,
        email: emailField.value,
        password: passwordField.value,
        roles: roles
    }

    const method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    await fetch(url, method).then(() => {
        $('#edit-close-btn').click();
        getAllUsers();
    })
}

async function getUserEditRoles(id) {
    let user = await getUser(id);
    $('#edit-roles').empty();
    await fetch(urlRoles)
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                if (selectedRole) {
                    el.selected = true;
                }
                $('#edit-roles')[0].appendChild(el);
            })
        });
}
