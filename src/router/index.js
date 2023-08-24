import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

function importComponent(path){
  return () => import(`../components/${path}.vue`);
}

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/login',
      name: 'login',
      meta: { title: 'HAF - Login' },
      component: importComponent('user/login'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'HAF - Register' },
      component: importComponent('user/register'),
    },
    {      
      path: '',
      component: importComponent('main'),
      children: [
        {
          path: '/',
          name: 'home',
          meta: { title: 'HAF' },
          component: importComponent('main/landingpage'),
        },
        {
          path: '/haf-service',
          name: 'haf-service',
          meta: { title: 'HAF - Service ' },
          component: importComponent('services/hafservice'),
        },
        {
          path: '/haf-merchandise',
          name: 'haf-merchandise',
          meta: { title: 'HAF - Merchandise ' },
          component: importComponent('merchandise/hafmerchandise'),
        },
        {
          path: '/haf-school',
          name: 'haf-school',
          meta: { title: 'HAF - School ' },
          component: importComponent('school/hafschool'),
        },
        {
          path: '/haf-about',
          name: 'haf-about',
          meta: { title: 'HAF - About ' },
          component: importComponent('about/hafabout'),
        },
      ],
    },
    // {
    //   path: '*',
    //   redirect: '/riwayat-pencucian'
    // },
  ],
});

router.beforeEach((to, form, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
