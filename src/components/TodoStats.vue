<template>
  <div class="input-group half">
    <span class="input-group-addon glyphicon" ref="totalTime">Estimated total: ~ {{ totalDuration }} min</span>
    <span class="input-group-addon glyphicon" ref="activeGreens" :style="styleGreen">{{ greens }}</span>
    <span class="input-group-addon glyphicon" ref="activeYellows" :style="styleYellow">{{ yellows }}</span>
    <span class="input-group-addon glyphicon" ref="activeReds" :style="styleRed">{{ reds }}</span>
    <button id="button-toggle-completed" class="glyphicon dropdown-toggle" style="width: 50%; height: 116%;" v-on:click="showTasksByStatus(false)" data-toggle="dropdown" aria-haspopup="true">
      <span class="glyphicon glyphicon-ok" ref="totalCompleted">  {{ totalCompleted }}</span>
    </button>
    <button id="button-toggle-aborted" class="glyphicon dropdown-toggle" style="width: 50%; height: 116%;" v-on:click="showTasksByStatus(true)" data-toggle="dropdown" aria-haspopup="true">
      <span class="glyphicon glyphicon-remove" ref="totalAborted" style="height: 50%;">  {{ totalAborted }}</span>
    </button>
    <div class="dropdown-menu">
      <div v-for="task in updateTaskList" v-show="task.aborted === showAborted">
        <span class="input-group-addon">
          <p v-if="task.aborted">ABORTED ON</p>
          <p v-if="!task.aborted">COMPLETED ON</p>
          <p>{{ task.date.toString() }}</p>
          <p><br/></p>
          <p id="past-todo-element"><b>{{ task.message }}</b></p>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
  /* global TWEEN */
  import { store } from '../main.js'

  export default {
    name: 'todo-stats',
    props: ['totalDuration', 'isEditBtn', 'colors', 'yellows', 'reds', 'greens', 'totalCompleted', 'totalAborted'],
    data () {
      return {
        showAborted: false,
        showCompleted: false
      }
    },
    computed: {
      styleGreen () {
        return 'width: 20%; background-color: ' + this.colors.green + '; color: white;'
      },
      styleYellow () {
        return 'width: 20%; background-color: ' + this.colors.yellow + '; color: white;'
      },
      styleRed () {
        return 'width: 20%; background-color: ' + this.colors.red + '; color: white;'
      },
      updateTaskList () {
        return store.state.lastItemHistory
      }
    },
    methods: {
      showTasksByStatus: function (isAborted) {
        if (isAborted) {
          this.showAborted = true
          this.showCompleted = false
        } else {
          this.showAborted = false
          this.showCompleted = true
        }
      }
    },
    watch: {
      greens: function (newValue, oldValue) {
        var vm = this

        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }

        new TWEEN.Tween({tweeningNumber: oldValue})
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({tweeningNumber: newValue}, 5000)
          .onUpdate(function () {
            vm.animatedGreens = this.tweeningNumber.toFixed(0)
          })
          .start()
        animate()
      }
    }
  }
</script>

<style scoped>

.half {
  width: 65%;
  margin: auto;
}

.dropdown-menu {
  width: 100%;
}

</style>
