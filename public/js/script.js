function addContact() 
{
    const name = document.getElementsByName('name')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, phone})
    })
        .then(response => response.json())
        .then(() => window.location.href = '/');
}

function editContact() 
{
    const id = document.getElementsByClassName('edit form')[0].getAttribute('data-key');
    const name = document.getElementsByName('name')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    fetch(`/update?id=${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, phone})
    })
        .then(response => response.json())
        .then(() => window.location.href = '/');
}

function deleteContact() {
    const id = document.getElementsByClassName('edit form')[0].getAttribute('data-key');

    fetch(`/delete?id=${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(() => window.location.href = '/');
}

function blockButton(name, phone) {
    const button = document.getElementById('delete-button');
    if (document.getElementsByName('name').value !== name ||
        document.getElementsByName('phone').value !== phone) {
        button.setAttribute('disabled', 'true');
    } else {
        button.setAttribute('disabled', 'false');
    }
}


