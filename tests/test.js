/*
import Vue from 'vue'
import TodoList from '../src/components/TodoList.vue'
import assert from 'assert';
*/
import assert from 'assert'
import { Selector } from 'testcafe'
/*
describe('TestingTest', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
*/

var mainDiv;

fixture `VueTodoTesting`
    .page `localhost:8080`;

test('Insert Elements & test list content', async t => {

    mainDiv = Selector('#main')

    await t
        .setNativeDialogHandler(() => true)

        .typeText('#inputBox', 'Test')
        .pressKey('enter')
        .expect(Selector('#todoTaskReadField').value).eql('Test')
        .click(Selector('#edit-btn'))
        .typeText('#todoTaskReadField', 'ing')
        .expect(Selector('#todoTaskReadField').value).eql('Testing')
        .click('#todoTaskReadField')
        .pressKey('backspace')
        .pressKey('backspace')
        .pressKey('backspace')
        .pressKey('backspace')
        .pressKey('backspace')
        .pressKey('backspace')
        .pressKey('backspace')

        .typeText('#inputBox', 'Test2')
        .click('#button-green')
        .expect(Selector('#todoTaskReadField').value).eql('Test2')

        .typeText('#inputBox', 'Test3')
        .click('#button-yellow')
        .expect(Selector('#todoTaskReadField').value).eql('Test3')

        .typeText('#inputBox', 'Test4')
        .click('#button-red')
        .expect(Selector('#todoTaskReadField').value).eql('Test4')


});

test('Inspect Todo List Contents', async t => {
    await t

      .typeText('#inputBox', 'Test')
      .click('#button-green')
      .click('#complete-btn')
      .click('#button-toggle-completed');

      let selectedElement = Selector('#past-todo-element')
      console.log(await selectedElement.innerText)

      // .expect(Selector('#past-todo-element'))

});
