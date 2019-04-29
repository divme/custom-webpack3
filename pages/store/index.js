// import Vue from 'vue'
// import Vuex from 'vuex'
// import state from './state'
// import getters from './getters'
// import mutations from './mutations'
// import actions from './actions'
// import test from './test'
//
// Vue.use(Vuex);
//
// const store = new Vuex.Store({
//     state,
//     getters,
//     mutations,
//     actions,
//     modules:{
//         test : test
//     }
// });

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        themeName: 'dark',
        themeColor: '#ea3939',
        themeSate: 'running',

        iscockpit: true,
        isvchart: false,
        isvue: false
    },
    getters:{
        lightThemeColor: state =>{
            return state.themeColor = '#C8C8C8'
        },
        darkThemeColor: state =>{
            return state.themeColor = '#383838'
        }
    },
    mutations: {
        changeThemeColor (state) {
            if(state.themeColor !== 'green'){
                state.themeColor = "green"
            }else{
                state.themeColor = '#ea3939'
            }

        },
        changeActive(state , n){
            switch (n) {
                case 1:
                    state.iscockpit = false;
                    state.isvchart = true;
                    state.isvue = false;
                    break;
                case 2:
                    state.iscockpit = false;
                    state.isvchart = false;
                    state.isvue = true;
                    break;
                default:
                    state.iscockpit = true;
                    state.isvchart = false;
                    state.isvue = false;

            }
        }
    }
});
