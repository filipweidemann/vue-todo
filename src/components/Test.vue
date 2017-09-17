<template>
  <div class="test">
    <h1>{{ title }}</h1>
      <todo-list @totalDurationChange="totalDurationChange"></todo-list>
      <todo-stats :totalAborted="totalAborted" :totalCompleted="totalCompleted" :totalDuration="totalDuration" :colors="this.backgroundColors" :greens="greens" :yellows="yellows" :reds="reds" :isEditBtn="isEditBtn"></todo-stats>
  </div>
</template>

<script>

import TodoList from './TodoList.vue'
import TodoStats from './TodoStats.vue'
import { store } from '../main.js'

export default {
  name: 'hello',
  data () {
    return {
      title: 'Your Todo\'s',
      isEditBtn: true,
      backgroundColors: TodoList.data().backgroundColors,
      number: store.state.totalGreen[0]
    }
  },
  computed: {
    totalDuration () {
      return store.state.totalDuration[0]
    },
    reds () {
      return store.state.totalRed
    },
    yellows () {
      return store.state.totalYellow
    },
    greens () {
      return store.state.totalGreen
    },
    totalCompleted () {
      return store.state.completed
    },
    totalAborted () {
      return store.state.aborted
    }
  },
  components: {
    'todo-list': TodoList,
    'todo-stats': TodoStats
  },
  methods: {
    totalDurationChange: function (durationInput) {
      store.commit('increaseTotalDuration', durationInput)
    }
  }
}
</script>
