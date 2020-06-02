import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.prepare();
  }
  prepare() {}
  toHTML() {
    return '<h1>ExcelComponent</h1>';
  }
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
