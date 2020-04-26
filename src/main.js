import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// import VueRouter from "vue-router";
// import BabyList from "./components/BabyList";
// import BabyDetail from "./components/BabyDetail";
import ToggleButton from 'vue-js-toggle-button'

import {
    faArrowCircleUp,
    faAt,
    faBaby, faBalanceScaleRight,
    faBatteryEmpty,
    faBatteryFull,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryThreeQuarters,
    faBrush,
    faCalendarAlt,
    faChartLine,
    faClock,
    faCode,
    faExclamationTriangle, faHistory,
    faHourglassEnd, faInfoCircle,
    faLink, faMars,
    faPlusCircle,
    faPlusSquare,
    faProcedures,
    faRunning,
    faSearch,
    faShare,
    faSkullCrossbones,
    faSpinner,
    faThumbtack, faVenus
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faAt,
    faBrush,
    faCalendarAlt,
    faChartLine,
    faCode,
    faSearch,
    faThumbtack,
    faShare,
    faRunning,
    faProcedures,
    faSkullCrossbones,
    faLink,
    faExclamationTriangle,
    faArrowCircleUp,
    faSpinner,
    faPlusCircle,
    faPlusSquare,
    faHourglassEnd,
    faClock,
    faBaby, faInfoCircle,faHistory,faMars, faVenus,
    faBatteryFull, faBatteryThreeQuarters, faBatteryHalf, faBatteryQuarter, faBatteryEmpty, faBalanceScaleRight
);

Vue.use(ToggleButton);
Vue.component("FontAwesomeIcon",FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// const routes = [
//     {path: '/', name: "homePage", component: BabyList},
//     {path: '/babyDetail', name: 'babyIndex', component: BabyDetail}
// ];

// const router = new VueRouter({
//     routes // short for `routes: routes`
// });
// Vue.use(VueRouter);

var globalBabies = {};

// Configuration VueAnalytics
// Vue.use(VueAnalytics, {
//   id: 'UA-12370199-6'
// });

new Vue({
    // router,
    render: h => h(App),
    globalBabies
}).$mount('#app');
