import Vue from 'vue';
import VueRouter from 'vue-router';
import EditView from '../views/EditView.vue';
import MainView from '../views/MainView.vue';
import RegisterView from '../views/RegisterView.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      component: MainView,
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/edit',
      component: EditView,
    },
    {
      path: '*',
      // component: () => import('../views/NotFoundPage.vue')
      redirect: '/main',
    }
  ]
});