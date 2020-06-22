import {createStore} from './createStore';

describe('Test', () => {
  test('test', () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
