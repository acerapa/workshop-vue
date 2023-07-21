<template>
  <main>
      <h1>Contact List</h1>
      <!-- Create a table of contact list with fields name, email and contact number -->
      <!-- Create a add new button in the top of the table -->
      <RouterLink to="/contacts">
        <button class="add-new-btn">Add New</button>
      </RouterLink>
      <!-- Add a search input with class search -->
      <input type="text" class="search" placeholder="Search">
      <br>
      <br>
      <!-- Create a table of contact list with contact-list class and with fields name, address, email, contact number and a view button -->
      <table class="contact-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop contacts and display the contents here -->
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.address }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.contactNumber }}</td>
            <td>
              <RouterLink :to="`/contacts/${ contact.id }`">
                <button class="view-btn">View</button>
              </RouterLink>
              <button class="delete-btn" v-on:click="handleDelete(contact)">Delete</button>
            </td>
          </tr>
          <tr v-if="!contacts.length">
            <td colspan="5" style="text-align: center;">No Data</td>
          </tr>
        </tbody>
      </table>
  </main>
</template>

<script setup>
// import contact store and onMounted and routerlink
import { useContactsStore } from '@/stores/contacts'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const contactStore = useContactsStore();
let contacts = ref([]);
onMounted(async () => {
  // call the getContacts method
  await contactStore.getContacts();
  // assign the contacts from the store to the contacts variable
  contacts.value = contactStore.contacts;
});


const handleDelete =  async (contact) => {
  console.log(contact);
  await contactStore.deleteContact(contact);
}
</script>

<style scoped>
/* Center element in body using grid */
body {
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
}

/* Style the main content and center element inside the main */
main {
  margin: 0 auto;
  max-width: 800px;
  padding: 0.5rem;
  text-align: center;
}

/* Style the table with contact-list class, the button with add-new-btn class and the search input with search class in a dark COLORs  */
.contact-list {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
}
.contact-list th, .contact-list td {
  padding: 0.5rem;
  text-align: left;
}
.contact-list tr:nth-child(even) {
  background-color: #f2f2f2;
}
.contact-list th {
  background-color: #4CAF50;
  color: white;
}
.add-new-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
.search {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Style the view button */
.contact-list button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
/* Add hover to the view butto */
.contact-list button:hover {
  background-color: #45a049;
}

/* Style delete btn */
.delete-btn {
  background-color: #f44336 !important;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

/* Add a hover effect for buttons */
.delete-btn:hover {
  background-color: #da190b !important;
}

/* add margin bettween view-btn and delete-btn */
.contact-list button + button {
  margin-left: 0.5rem;
}
</style>