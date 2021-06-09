import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import MainPage from '../views/MainPage.vue'
import Changepass from '../views/ChangePass.vue'
const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/changepass',
		name: 'ChangePass',
		component: Changepass
	},
	{
		path: '/mainpage',
		name: 'MainPage',
		component: MainPage
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
