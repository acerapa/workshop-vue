// import apiHandler
import apiHandler from '@/api';

// import pinia
import { defineStore } from 'pinia'

// create a store named contact
export const useContactStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    contact: null
  }),
  getters: {
    // create a getter that will return the filtered  contacts by name
    filteredContacts: (state) => (name) => {
      return state.contacts.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
    }
  },
  actions: {
    // create a function in async that will create new contact
    async createContact(contact) {
      // create a variable that will handle the api
      const result = await apiHandler({
        url: `/contacts`,
        method: 'POST',
        body: contact,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // push the result to the contacts array
      this.contacts.push(result);
    },

    // get all contacts
    async getContacts() {
      const result = await apiHandler({
        url: `/contacts`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.contacts = result;
    },

    // get a single contact
    async getContact(id) {
      const result = await apiHandler({
        url: `/contacts/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.contact = result;
    },

    // update a contact
    async updateContact(contact) {
      const result = await apiHandler({
        url: `/contacts/${contact.id}`,
        method: 'PUT',
        body: contact,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.contact = result;
    },

    // delete a contact
    async deleteContact(id) {
      await apiHandler({
        url: `/contacts/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    }
  },
});
