import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(50);
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const type = $resizer.data.resize;
      const $parent = $resizer.closest('[data-type="resizeble"]');

      const coords = $parent.getCoords();
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          $parent.css({width: value + 'px'});
          cells.forEach((el) => (el.style.width = value + 'px'));
        } else {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.$el.style.height = value + 'px';
          $parent.css({height: value + 'px'});
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}