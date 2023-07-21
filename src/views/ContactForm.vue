<template>
  <div>
    <h1>Contact Form</h1>
    <!-- Create a contact form with fields of name, email, address, contact_number with placeholder  with the contact model-->
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="contact.name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="contact.email" />
      </div>
      <div>
        <label for="address">Address</label>
        <input type="text" id="address" v-model="contact.address" />
      </div>
      <div>
        <label for="contact_number">Contact Number</label>
        <input type="text" id="contact_number" v-model="contact.contact_number" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// use contact store
import { useContactStore } from '../stores/contacts';

const { id } = useRoute().params;

// use router
const router = useRouter();

// create a contact store instance
const contactStore = useContactStore();

// create a contact variable serves as model in the form
const contact = ref({
  name: '',
  email: '',
  address: '',
  contact_number: '',
});

// create a computed property to get the contact from the contact store and run getContact from actions
const getContact = async () => {
  await contactStore.getContact(id);
  contact.value = contactStore.contact;
};

// run the getContact function if the id is not null
if (id) getContact();

// create a function to handle form submission
const submitForm = async () => {
    // call the createContact action from the contact store if the id is null and updateContact if not
    if (id) {
      await contactStore.updateContact(contact.value)
    }
    else {
      await contactStore.createContact(contact.value);
      
      // reset the contact model
      contact.value = {
        name: '',
        email: '',
        address: '',
        contact_number: '',
      };

      // redirect to home page and import router
      router.push('/');
    };
  }

</script>

<style>
</style>