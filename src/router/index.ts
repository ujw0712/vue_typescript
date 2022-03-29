import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "list",
    component: () => import('@/components/List.vue'),
  },
  {
    path: "/:id",
    name: "detail",
    component: () => import('@/components/Detail.vue'),
  },
  {
    path: "/add",
    name: "add",
    component: () => import('@/components/Add.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;