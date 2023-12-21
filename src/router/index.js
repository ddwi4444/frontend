import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`../components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/login",
      name: "login",
      meta: {
        title: "HAF - Login",
      },
      component: importComponent("user/userLogin"),
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "HAF - Register",
      },
      component: importComponent("user/userRegister"),
    },
    {
      path: "/haf-detail-subcomic/:slug/:uuid",
      name: "haf-detail-subcomic",
      meta: {
        title: "HAF - Comic",
      },
      component: importComponent("comic/hafSubComic"),
    },
    {
      path: "",
      component: importComponent("main"),
      children: [{
          path: "/",
          name: "home",
          meta: {
            title: "Historical Art Fantasia",
          },
          component: importComponent("main/landingPage"),
        },
        {
          path: "/haf-detail-comic/:slug/:uuid",
          name: "haf-detail-comic",
          meta: {
            title: "HAF - Comic",
          },
          component: importComponent("comic/hafComic"),
        },
        {
          path: "/haf-service",
          name: "haf-service",
          meta: {
            title: "HAF - Service ",
          },
          component: importComponent("services/hafService"),
        },
        {
          path: "/haf-merchandise",
          name: "haf-merchandise",
          meta: {
            title: "HAF - Merchandise ",
          },
          component: importComponent("merchandise/hafMerchandise"),
        },
        {
          path: "/haf-school",
          name: "haf-school",
          meta: {
            title: "HAF - School ",
          },
          component: importComponent("school/hafSchool"),
        },
        {
          path: "/haf-about",
          name: "haf-about",
          meta: {
            title: "HAF - About ",
          },
          component: importComponent("about/hafAbout"),
        },
        {
          path: "/haf-profile",
          name: "haf-profile",
          meta: {
            title: "HAF - Profile ",
          },
          component: importComponent("user/userProfile"),
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
  if (to.name == "login" && localStorage.getItem('token') != null) {
    next({
      name: "home",
    });
  }
  if (to.name == "register" && localStorage.getItem('token') != null) {
    next({
      name: "home",
    });
  }
  if (to.name == "haf-profile" && localStorage.getItem('token') == null) {
    next({
      name: "home",
    });
  }
  if (to.name == "haf-school" && localStorage.getItem('role') == 'user') {
    // Store the current page information before redirecting
    const currentPage = {
      name: to.name,
      // You can include other relevant information about the current page if needed
    };
  
    // Save the current page information in local storage or a Vuex store
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  
    // Redirect to the "home" page
    next({
      name: "home",
    });
  }
  if (to.name == "haf-school" && localStorage.getItem('token') == null) {
    // Store the current page information before redirecting
    const currentPage = {
      name: to.name,
      // You can include other relevant information about the current page if needed
    };
  
    // Save the current page information in local storage or a Vuex store
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  
    // Redirect to the "home" page
    next({
      name: "home",
    });
  }

  document.title = to.meta.title;
  next();
});

export default router;