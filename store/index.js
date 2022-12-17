import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		BookNum:uni.getStorageSync('num') || 0
	},
    mutations: {
		changeNum(state,page) {
			console.log(state.BookNum);
			state.BookNum = page 
			uni.setStorage({
				key:'num',
				data:state.BookNum
			})
		}
	},
    actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
	}
})
export default store