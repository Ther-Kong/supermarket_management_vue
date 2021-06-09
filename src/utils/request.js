import axios from "axios"
import store from '../store/index.js'
axios.defaults.timeout = 5000;
axios.defaults.headers.common['authorization'] = store.state.token;
