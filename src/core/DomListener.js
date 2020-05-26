import {capitalizeFirstChar} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name;
        throw new Error(`Method ${method} is not exist in '${name}' Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]); // addEventListener
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]); // removeListener
    });
  }
}
function getMethodName(eventName) {
  return 'on' + capitalizeFirstChar(eventName);
}
