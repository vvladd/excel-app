export function createStore(rootReducer, initalState = {}) {
  let state = rootReducer({...initalState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return state;
    },
  };
}

// practice
// export class CreateStore2 {
//   constructor(rootReducer, initalState) {
//     this.rootReducer = rootReducer;
//     this.state = rootReducer({...initalState}, {type: '__INIT__'});
//     this.listenets = [];
//   }
//   subscribe(fn) {
//     this.listeners.push(fn);
//     return {
//       unsubscribe() {
//       this.listeners = this.listeners.filter((listener) => listener !== fn);
//       },
//     };
//   }
//   dispatch(action) {
//     this.state = this.rootReducer(this.state, action);
//     this.listeners.forEach((listener) => listener(this.state));
//   }
//   getState() {
//     return this.state;
//   }
// }
