const contactService = require('../services/contactService');

module.exports = 
{
    async getAllContacts(request, response) 
    {
        await contactService.getAllContacts()
            .then((result) => 
            {
                response.render('contacts', 
                {
                    canGetButtons: true,
                    contacts: result
                });
            })
            .catch((err) => 
            {
                console.error(err.message);
            });
    },

    async getContact(request, response) 
    {
        if (request.query.id) 
        {
            await contactService.getContact(request.query.id)
                .then((result) => 
                {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => 
                {
                    console.error(err.message);
                });
        } else {
            response.end('Parameter not found');
        }
    },

    async addContact(request, response) 
    {
        if (request.body.name && request.body.phone) 
        {
            await contactService.addContact(request.body)
                .then((result) => 
                {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => 
                {
                    console.error(err.message);
                });
        } else {
            response.end('Parameters not found');
        }
    },

    async addContactView(request, response) 
    {
        let contacts = [];
        await contactService.getAllContacts().then(result => contacts = result);
        response.render('newContact', 
        {
            canGetButtons: false,
            contacts: contacts
        });
    },

    async editContact(request, response) {
        if (request.query.id && request.body.name && request.body.phone) 
        {
            await contactService.editContact(request.query.id, request.body)
                .then((result) => 
                {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => 
                {
                    console.error(err.message);
                });
        } else {
            response.end('Parameters not found');
        }
    },

    async editContactView(request, response) 
    {
        let contacts = [], contact;
        await contactService.getAllContacts().then(result => contacts = result);
        await contactService.getContact(request.query.id).then(result => contact = result);
        response.render('editContact', 
        {
            canGetButtons: false,
            contacts: contacts,
            currentContact: contact
        });
    },

    async deleteContact(request, response)
    {
        if (request.query.id) 
        {
            await contactService.deleteContact(request.query.id)
                .then((result) => 
                {
                    response.type('json');
                    response.end(JSON.stringify(result));
                })
                .catch((err) => 
                {
                    console.error(err.message);
                });
        } else {
            response.end('Parameters not found');
        }
    }
};
