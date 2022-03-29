const uuid = require('uuid');
const fs = require('fs');
const contacts = require('../contacts.json') || [];

const getAllContacts = async () => 
{
    return contacts;
};

const getContact = async (id) => 
{
    const contact = await contacts.find(c => c.id === id);
    return contact ? contact : 'Not found'
};

const addContact = async (data) => 
{
    contacts.push({
        id: uuid.v4(),
        name: data.name,
        phone: data.phone
    });
    saveToFile();
    return contacts;
};

const editContact = async (id, data) => 
{
    const contact = await contacts.find(c => c.id === id);
    if (contact) 
    {
        contact.name = data.name;
        contact.phone = data.phone;
    }
    saveToFile();

    return contacts;
};

const deleteContact = async (id) => 
{
    const index = await contacts.findIndex(c => c.id === id);
    if (index >= 0) 
    {
        contacts.splice(index, 1);
    }
    saveToFile();

    return contacts;
};

module.exports = 
{
    getAllContacts,
    getContact,
    addContact,
    editContact,
    deleteContact
};

function saveToFile() 
{
    fs.writeFile('contacts.json', JSON.stringify(contacts), err => 
    {
        if (err) 
        {
            console.error(err.message);
        }
    });
}
