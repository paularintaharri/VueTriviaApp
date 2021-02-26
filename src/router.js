import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "./components/HomePage/HomePage.vue";
import QuestionPage from "./components/Questions/QuestionPage.vue";
import ResultPage from "./components/ResultPage.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/", name: "HomePage", component: HomePage },
        { path: "/questions", name: "QuestionPage", component: QuestionPage, props: true },
        { path: "/results", name: "ResultPage", component: ResultPage, props: true, },
    ]
});
