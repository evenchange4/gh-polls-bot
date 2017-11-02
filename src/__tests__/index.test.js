// // const { createRobot } = require('probot');
// const { EventEmitter } = require('events');
// const main = require('../index');

// function createIssuePayload(text) {
//   return { payload: { issue: { body: text } } };
// }

// describe('Robot', () => {
//   let mockProbot;

//   beforeEach(() => {
//     callback = jest.fn();
//     mockProbot = new EventEmitter();
//     main(mockProbot);
//   });

//   it('should return ', async () => {
//     console.log(createIssuePayload('123'))
//     mockProbot.emit('issues.opened', createIssuePayload('123'));

//     // expect(callback).toHaveBeenCalled()
//     // expect(callback.mock.calls[0][1]).toEqual({ name: 'foo', arguments: 'bar' })
//   });
// });
it('should resolve id with API response', async () => {
  // expect(await API.addPoll(['1', '2'])).toMatchSnapshot();
});
