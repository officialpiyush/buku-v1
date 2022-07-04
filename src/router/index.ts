import TagView from '@/views/TagView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewBookView from "../views/NewBookView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/tag/:tag",
      name: "tag_search",
      component: TagView
    },
    {
      path: "/new",
      name: "new",
      component: NewBookView
    }
  ]
})

export default router
