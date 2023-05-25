import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { GlobalProvideKey } from "./vue/3.3/app-run-with-context";
import { inject } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/ConstTypeParameters",
    name: "ConstTypeParameters",
    component: () => import("@/views/vue/3.3/ConstTypeParametersView.vue")
  },
  {
    path: "/DefineOptions",
    name: "DefineOptions",
    component: () => import("@/views/vue/3.3/DefineOptionsView.vue")
  },
  {
    path: "/DefineOptions",
    name: "DefineOptions",
    component: () => import("@/views/vue/3.3/DefineOptionsView.vue")
  },
  {
    path: "/EnableReactivePropsDestructure",
    name: "EnableReactivePropsDestructure",
    component: () => import("@/views/vue/3.3/EnableReactivePropsDestructureView.vue")
  },
  {
    path: "/MiscVue3.3",
    name: "MiscVue3.3",
    component: () => import("@/views/vue/3.3/MiscVue3-3View.vue")
  },
  {
    path: "/ShortEmits",
    name: "ShortEmits",
    component: () => import("@/views/vue/3.3/ShortEmitsView.vue")
  },
  {
    path: "/ReferenceVariableInWithDefaults",
    name: "ReferenceVariableInWithDefaults",
    component: () => import("@/views/vue/3.3/ReferenceVariableInWithDefaultsView.vue")
  },
  {
    path: "/GetterUsageInReactivityAPIs",
    name: "GetterUsageInReactivityAPIs",
    component: () => import("@/views/vue/3.3/GetterUsageInReactivityAPIsView.vue")
  },
  {
    path: "/DefineSlots",
    name: "DefineSlots",
    component: () => import("@/views/vue/3.3/DefineSlotsView.vue")
  },
  {
    path: "/DefineModel",
    name: "DefineModel",
    component: () => import("@/views/vue/3.3/DefineModelView.vue")
  },
  {
    path: "/ImportedTypesInSFCMacros",
    name: "ImportedTypesInSFCMacros",
    component: () => import("@/views/vue/3.3/ImportedTypesInSFCMacrosView.vue")
  },
  {
    path: "/SuspensibleOption",
    name: "ImportedTypesInSFCMacros",
    component: () => import("@/views/vue/3.3/SuspensibleOptionView.vue")
  },
  {
    path: "/GenericComponents",
    name: "GenericComponents",
    component: () => import("@/views/vue/3.3/GenericComponentsView.vue")
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const hoge = inject(GlobalProvideKey)
  console.log(to.path, from.path, hoge)
  next()
})