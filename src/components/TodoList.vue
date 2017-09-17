<template>
  <div>
    <todo-input v.model.number="number" @returnkey="addElement"></todo-input>
    <!-- Red tasks -->
      <transition name="list-item">
        <todo-task :passedID="item.id" v-for="item in todoItems" v-if="item.red" :key="item.id" :duration="item.duration" :isEditBtn="isEditBtn" :isLocked="isLocked" :message="item.message" :importanceString="item.importanceString" @deleteitem="deleteElement" @editItem="editItem"></todo-task>
      </transition>
    <!-- Yellow tasks -->
      <transition-group name="list-item">
        <todo-task :passedID="item.id" v-for="item in todoItems" v-if="item.yellow" :key="item.id" :duration="item.duration" :isEditBtn="isEditBtn" :isLocked="isLocked" :message="item.message" :importanceString="item.importanceString" @deleteitem="deleteElement" @editItem="editItem"></todo-task>
      </transition-group>
    <!-- Green tasks -->
      <transition-group name="list-item">
        <todo-task :passedID="item.id" v-for="item in todoItems" v-if="item.green" :key="item.id" :duration="item.duration" :isEditBtn="isEditBtn" :isLocked="isLocked" :message="item.message" :importanceString="item.importanceString" @deleteitem="deleteElement" @editItem="editItem"></todo-task>
      </transition-group>
    <!-- Reminders / Notes -->
      <transition-group name="list-item">
        <todo-task :passedID="item.id" v-for="item in todoItems" v-if="item.reminder" :key="item.id" :duration="item.duration" :isEditBtn="isEditBtn" :isLocked="isLocked" :message="item.message" :importanceString="item.importanceString" @deleteitem="deleteElement" @editItem="editItem"></todo-task>
      </transition-group>
  </div>
</template>
<script>
  import TodoTask from './TodoTask.vue'
  import TodoInput from './TodoInput.vue'
  import TodoStats from './TodoStats.vue'
  import { store } from '../main.js'
  import uuid from 'uuid/v4'

  const backgroundColors = {
    'red': '#d9534f',
    'yellow': '#f0ad4e',
    'green': '#5cb85c',
    'grey': '#eeeeee'
  }

  // The unique uid created for every new task!
  function generateUUID () {
    return uuid()
  }

  export default {
    name: 'todo-list',
    components: {
      'todo-task': TodoTask,
      'todo-input': TodoInput,
      'todo-stats': TodoStats
    },
    data () {
      return {
        todoItems: store.state.todoItems,
        totalDuration: store.state.totalDuration[0],
        isLocked: true,
        isEditBtn: true,
        oldMessage: '',
        number: 0,
        backgroundColors: backgroundColors
      }
    },
    methods: {
      addElement: function (buttonCode, text, duration) {
        var currentElement = {'message': text, 'red': false, 'green': false, 'yellow': false, 'reminder': false, 'importanceString': '#dcdcdc', 'duration': 0, 'id': generateUUID()}
        if (buttonCode === 1) {
          currentElement.importanceString = backgroundColors.green
          currentElement.green = true
        } else if (buttonCode === 2) {
          currentElement.importanceString = backgroundColors.yellow
          currentElement.yellow = true
        } else if (buttonCode === 3) {
          currentElement.importanceString = backgroundColors.red
          currentElement.red = true
        } else {
          currentElement.reminder = true
          currentElement.importanceString = backgroundColors.grey
        }

        if (text !== '') {
          currentElement.duration = duration
          store.commit('addElement', currentElement)
        }
      },
      deleteElement (color, text, duration, isAborted) {
        let messageValues = this.todoItems.map(function (a) { return a.message })
        let colorValues = this.todoItems.map(function (a) { return a.importanceString })
        let reminderBools = this.todoItems.map(function (a) { return a.reminder })
        let colorRed = false
        let colorYellow = false
        let colorGreen = false

        if (color === backgroundColors.red) {
          colorRed = true
        } else if (color === backgroundColors.yellow) {
          colorYellow = true
        } else if (color === backgroundColors.green) {
          colorGreen = true
        }
        for (var i = 0; i < this.todoItems.length; i++) {
          if (text === messageValues[i] && color === colorValues[i]) {
            // let commitObject = {'index': i, 'duration': duration, 'red': colorRed, 'yellow': colorYellow, 'green': colorGreen, 'aborted': isAborted}
            let dateOfDeletion = new Date()
            var commitObject = {'index': i, 'message': text, 'red': colorRed, 'green': colorGreen, 'yellow': colorYellow, 'importanceString': '#dcdcdc', 'duration': 0, 'aborted': isAborted, 'date': dateOfDeletion}
            store.commit('deleteElement', commitObject)
            colorValues.splice(i, 1)
            break
          } else if (text === messageValues[i] && reminderBools[i] === true && color === '') {
            let commitObject = {'index': i, 'duration': duration}
            store.commit('deleteElement', commitObject)
            break
          }
        }
      },
      editItem: function (field, input) {
        // Problem: the correct match is not found because the condition is being
        // triggered and initialized with the new (edited) message
        field._props.isEditBtn = !field._props.isEditBtn
        if (field._props.isEditBtn === true) {
          let inputObj = {'oldValue': this.oldMessage, 'newValue': input}
          store.commit('editItem', inputObj)
        } else {
          this.oldMessage = input
        }
      }
    }
  }
</script>
<style scoped>

h1, h2 {
  font-weight: normal;
}

.list-item-enter-active, .list-item-leave-active {
  transition: opacity 0.9s, transform 0.9s;
  transform-origin: left center;
}
.list-item-enter, .list-item-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0.5);
}

a {
  color: #42b983;
}
</style>
