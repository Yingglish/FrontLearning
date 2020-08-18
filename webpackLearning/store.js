import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations:{ // 不支持异步 如 setTimeout
        add(state) {
            // 变更状态
            state.count++;
        }
    },
    actions: { //

    },
    getters: {
        showNum: state => {
            return '当前最新数据是: ' + state.count
        }
    }
})
