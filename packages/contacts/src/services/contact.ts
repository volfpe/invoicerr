import ContactModel from '../models/contact'

const ContactService = {
    getAllContacts: async () => {
        const contacts =  await ContactModel.where('isActive', true).find()
        return contacts
    },
    getContactById: async (id: string) => {
        const contact = await ContactModel.where('_id', id).where('isActive', true).findOne()
        if (!contact) {
            throw new Error('Contact does not exists!');
        }
        return contact
    },
    addContact: async (name: string, company: string, street: string, city: string, country: string, ic: string, dic: string) => {
        const newContact = new ContactModel({
            name,
            company,
            street,
            city,
            country,
            ic,
            dic,
            isActive: true
        })
        await newContact.save()
    },
    editContact: async (id: string, name: string, company: string, street: string, city: string, country: string, ic: string, dic: string) => {
        const contact = await ContactModel.where('_id', id).where('isActive', true).findOne()
        if (!contact) {
            throw new Error('Contact does not exists!');
        }
        contact.name = name
        contact.company = company
        contact.street = street
        contact.city = city
        contact.country = country
        contact.ic = ic
        contact.dic = dic

        return await contact.save()
    },
    deleteContact: async (id: string) => {
        const contact = await ContactModel.where('_id', id).where('isActive', true).findOne()
        if (!contact) {
            throw new Error('Contact does not exists!');
        }
        contact.isActive = false

        return await contact.save()
    },
}

export default ContactService