import Vue from 'vue'
import VueRouter from 'vue-router'

const HomePage = () => import ('./components/HomePage.vue')
const QuestionPage = () => import ('./components/Questions/QuestionPage.vue')
const ResultPage = () => import ('./components/ResultPage.vue')

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes : [
    { path: "/", name: "HomePage", component: HomePage},
    { path: "/questions", name: "QuestionPage", component: QuestionPage },
    { path: "/results", name: "ResultPage", component: ResultPage },
    ]
})