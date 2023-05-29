import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/Signup.vue'
import Home from '../views/Home.vue'
import SingleFile from '../views/SingleFile.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/file',
    name: 'file',
    component: SingleFile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
