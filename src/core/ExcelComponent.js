import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.storeSub = null;
    this.prepare();
  }
  // Настройка компонента до init()
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return '<h1>ExcelComponent</h1>';
  }
  // Уведомление слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  // Подписка на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  // Инициализирует компонент
  init() {
    this.initDOMListeners();
  }
  // Удаляет компонент
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
