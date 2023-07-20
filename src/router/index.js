import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../views/ContactList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ContactList
    },
    {
      path: '/contacts/:id?',
      name: 'contact-form',
      component: () => import(/* webpackChunkName: "contact" */ '../views/ContactForm.vue'),
      props: true
    },
  ]
})

export default router
