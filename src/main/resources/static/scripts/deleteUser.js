const idDeleteField = document.getElementById('delete-id');
const fistNameDeleteField = document.getElementById('delete-firstName');
const lastNameDeleteField = document.getElementById('delete-lastName');
const emailDeleteField = document.getElementById('delete-email');

async function deleteFormFill(id) {
    const userByIdURL = '/api/users/' + id;
    let userResponse = await fetch(userByIdURL);
    if (userResponse.ok) {
        let userData =
            await userResponse.json().then(user => {
                idDeleteField.value = `${user.id}`;
                fistNameDeleteField.value = `${user.firstName}`;
                lastNameDeleteField.value = `${user.lastName}`;
                emailDeleteField.value = `${user.email}`;
                getUserRoles(id);
            })

    } else {
        alert(`HTTP Error, ${userResponse.status}`)
    }
}

async function deleteUser() {
    let url = '/api/users/' + idDeleteField.value

    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    await fetch(url, method).then(() => {
        $('#delete-close-btn').click();
        getAllUsers();
    })
}

async function getUserRoles(id) {
    let user = await getUser(id);
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
                $('#delete-roles')[0].appendChild(el);
            })
        });
}

async function getUser(id) {
    let url = "http://localhost:8099/api/users/" + id;
    let response = await fetch(url);
    return await response.json();
}