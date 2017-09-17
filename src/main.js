import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ToggleButton from 'vue-js-toggle-button'
import createPersistedState from 'vuex-persistedState'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ToggleButton)
/* eslint-disable no-new */
/* eslint-disable reserved-word */

export const store = new Vuex.Store({
  state: {
    todoItems: [],
    totalRed: 0,
    totalYellow: 0,
    totalGreen: 0,
    totalDuration: [0],
    lastItemHistory: [],
    completed: 0,
    aborted: 0
  },
  mutations: {
    addElement (state, input) {
      state.todoItems.push(input)
      let oldValue = state.totalDuration[0]
      let newValue = Number(input.duration) + Number(oldValue)
      state.totalDuration.splice(0, 1, newValue)
      if (input.red) {
        state.totalRed++
      } else if (input.yellow) {
        state.totalYellow = state.totalYellow + 1
      } else if (input.green) {
        state.totalGreen = state.totalGreen + 1
      }
      // state.todoItems.append('This is a test' + input)
    },
    deleteElement (state, commitObject) {
      state.todoItems.splice(commitObject.index, 1)
      // Create date keys inside the object
      commitObject['day'] = commitObject.date.getDate()
      commitObject['month'] = commitObject.date.getMonth()
      commitObject['year'] = commitObject.date.getFullYear()
      state.lastItemHistory.push(commitObject)
      let oldValue = state.totalDuration[0]
      let newValue = Number(oldValue) - Number(commitObject.duration)
      state.totalDuration.splice(0, 1, newValue)

      if (commitObject.red) {
        state.totalRed--
      } else if (commitObject.yellow) {
        state.totalYellow--
      } else if (commitObject.green) {
        state.totalGreen--
      }
      if (commitObject.aborted) {
        state.aborted++
      } else {
        state.completed++
      }
    },
    editItem (state, inputObj) {
      // state.todoItems = state.todoItems
      for (let key of state.todoItems) {
        if (key.message === inputObj.oldValue) {
          key.message = inputObj.newValue
        }
      }
    }
  },
  plugins: [createPersistedState()]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
