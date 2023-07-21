<template>
  <main>
    <!-- Create header with contact list title -->
    <header>
      <h1>Contacts</h1>
    </header>
    <!-- Create a link to the contact form -->
    <router-link to="/contacts">Create Contact</router-link>

    <!-- Add search functionality -->
    <div>
      <input type="text" v-model="search" @input="searchContacts" />
    </div>

    <!-- Create table basing the contacts with fields name, address, email, contact_number and actions -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.contact_number }}</td>
          <td>
            <router-link :to="`contacts/${contact.id}`">View</router-link>
            <button @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
</main>
</template>

<script setup>
// import ref()
import { ref } from 'vue';

// use contact store
import { useContactStore } from '../stores/contacts';

// create a contact store instance
const contactStore = useContactStore();

// create a function to delete a contact
const deleteContact = async (id) => {
  // call the deleteContact action from the contact store
  await contactStore.deleteContact(id);
  await getContacts();
};

const contacts = ref(null);
// create a computed property to get the contacts from the contact store and run getContacts from actions
const getContacts = async () => {
  await contactStore.getContacts();
  contacts.value = contactStore.contacts;
};
getContacts();


//  add filter function for the search contact by name
const search = ref('');
const searchContacts = () => {
  contacts.value = contactStore.filteredContacts(search.value);
};

</script>
