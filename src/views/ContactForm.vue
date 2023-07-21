<template>
  <main>
    <h1>Contact Form</h1>
    <!-- Create a form with class contact-form with input fields of name, address, email, contact number -->
    <form class="contact-form" v-on:submit.prevent="handleSubmit">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Enter your name" v-model="contact.name">
      <label for="address">Address</label>
      <input type="text" id="address" name="address" placeholder="Enter your address" v-model="contact.address">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" v-model="contact.email">
      <label for="contact-number">Contact Number</label>
      <input type="text" id="contact-number" name="contact-number" placeholder="Enter your contact number" v-model="contact.contactNumber">
      <!-- Create a submit button with class submit-btn -->
      <button class="submit-btn">Submit</button>
      
      <RouterLink to="/">
        <button class="back-button">Back</button>
      </RouterLink>
    </form>
  </main>
</template>

<script setup>
  import { useRoute,RouterLink } from 'vue-router'
  import { useContactsStore } from '@/stores/contacts'
  import { onMounted, ref } from 'vue'

  const route = useRoute();
  const id = ref(route.params.id);


  const contactStore = useContactsStore();
  // create a contact variable
  let contact = ref([]);
  onMounted(async () => {
    if (!id.value) return;
    await contactStore.getContact(id.value);
    contact.value = contactStore.contact;
    console.log(contact.value);
  });

  /**
   * Handle submit form in
   */
  const handleSubmit = async () => {
    await contactStore.addContact(contact.value);
  }
</script>

<style scoped>
  /* style the form, input fields and the submit button with a generic style */
  .contact-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .contact-form label {
    font-weight: bold;
  }
  .contact-form input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .contact-form .submit-btn {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ccc;
    cursor: pointer;
    width: auto;
  }

  /* style the back button with a generic style */
  .back-button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ccc;
    cursor: pointer;
  }

</style>
