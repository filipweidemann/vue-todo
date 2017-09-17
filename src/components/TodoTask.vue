<template>

  <div class="input-group half" :id="passedID">
    <span class="input-group-addon glyphicon" id="basic-addon1" ref="durationInput" style="width: 84px">{{ duration }} min</span>
    <input type="text" :readonly="isEditBtn" id="todoTaskReadField" :value="message" class="form-control glyphicon" :style="style" ref="taskBox">
    <span class="input-group-btn">
      <button id="complete-btn" class="btn btn-default glyphicon" v-on:click="deleteItem(false)">
        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      </button>
      <button id="abort-btn" class="btn btn-default glyphicon" v-on:click="deleteItem(true)">
        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>
      <button id="edit-btn" class="btn btn-default glyphicon" v-on:click="editItem">
        <span :class="{'glyphicon glyphicon-pencil': isEditBtn, 'glyphicon glyphicon-floppy-saved': !isEditBtn}" aria-hidden="true"></span>
      </button>
    </span>
  </div>

</template>

<script>
  import TodoList from './TodoList.vue'

  var LightenColor = function (color, percent) {
    let num = parseInt(color, 16)
    let amt = Math.round(2.55 * percent)
    let R = (num >> 16) + amt
    let B = (num >> 8 & 0x00FF) + amt
    let G = (num & 0x0000FF) + amt
    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1)
  }

  export default {
    name: 'todo-task',
    props: ['message', 'importanceString', 'isLocked', 'isEditBtn', 'duration', 'passedID'],
    computed: {
      style () {
        let colors = TodoList.data().backgroundColors
        if ((this.importanceString === colors.grey) || (this.importanceString === LightenColor(this.importanceString.substring(1), 5))) {
          return 'background-color: ' + this.importanceString + '; color: grey'
        } else {
          return 'background-color: ' + this.importanceString + '; color: grey;'
        }
      }
    },
    methods: {
      deleteItem: function (isAborted) {
        this.$emit('deleteitem', this.importanceString, this.message, this.duration, isAborted)
      },
      editItem: function () {
        this.$emit('editItem', this, this.$refs.taskBox.value)
        if (!this.isEditBtn) {
          this.$refs.taskBox.focus()
          this.importanceString = '#' + LightenColor(this.importanceString.substring(1), 5)
          // Go and lighten up the color of the input upon focus!
        } else if (this.isEditBtn) {
          this.$refs.taskBox.blur()
          this.importanceString = '#' + LightenColor(this.importanceString.substring(1), -5)
        }
      }
    }
  }
</script>

<style scoped>

.half {
  width: 65%;
  margin: auto;
}

</style>
