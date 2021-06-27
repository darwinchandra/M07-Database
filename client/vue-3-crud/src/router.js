import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/obat",
    name: "obat",
    component: () => import("./components/ListObat")
  },
  {
    path: "/obat/:id",
    name: "obat-details",
    component: () => import("./components/Obat")
  },
  {
    path: "/tambah",
    name: "tambah",
    component: () => import("./components/TambahObat")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;