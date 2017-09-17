<template>

  <div class="input-group half">
    <div class="input-group-btn">
      <button class="btn btn-default dropdown-toggle glyphicon" data-toggle="dropdown" aria-haspopup="true">
        Duration
      </button>
      <div class="dropdown-menu">
        <input v-model.number="number" type="number" step="10" ref="durationInput"><span class="input-group-addon">minutes</span>
      </div>
    </div>
    <input type="text" id="inputBox" class="form-control glyphicon" placeholder="New event" v-on:keydown.13="addElement" ref="addTodo">
      <div class="input-group-btn">
        <button id="button-green" class="btn btn-success glyphicon" v-on:click="addElement(1)">👍🏼</button>
        <button id="button-yellow" class="btn btn-warning glyphicon" v-on:click="addElement(2)">🙏🏼</button>
        <button id="button-red" class="btn btn-danger glyphicon" v-on:click="addElement(3)">💀</button>
      </div>
    </div>

</template>

<script>
  export default {
    name: 'todo-input',
    data () {
      return {
        number: 0
      }
    },
    methods: {
      addElement: function (element) {
        this.$emit('returnkey', element, this.$refs.addTodo.value, this.$refs.durationInput.value)
        this.$refs.addTodo.value = ''
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
