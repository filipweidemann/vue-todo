const Vue = require('vue')

describe('TodoList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(TodoList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.app h1').textContent)
      .to.equal('Your Todo\'s')
  })
})
