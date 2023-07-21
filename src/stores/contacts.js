import apiHandler from '../api';
import { defineStore } from 'pinia'

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    contact: null
  }),
  actions: {
    async getContacts() {
      const contacts = await apiHandler('/contacts')
      this.contacts = contacts
    },

    async getContact(id) {
      const contact = await apiHandler(`/contacts/${id}`)
      this.contact = contact
    },

    async addContact(contact) {
      contact = {...contact};
      const newContact = await apiHandler('/contacts', 'post', contact)
      this.contacts.push(newContact)
    },

    async updateContact(contact) {
      const updatedContact = await apiHandler(`/contacts/${contact.id}`, 'put', contact)
      const index = this.contacts.findIndex((contact) => contact.id === updatedContact.id)
      this.contacts[index] = updatedContact
    },

    async deleteContact(contact) {
      await apiHandler(`/contacts/${contact.id}`, 'delete')
      const index = this.contacts.findIndex((contact) => contact.id === contact.id)
      this.contacts.splice(index, 1)
    }
  },

  getters: {
    getContactsByName(name) {
      return this.contacts.filter((contact) => contact.name.includes(name))
    }
  }
});
