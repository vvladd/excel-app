import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizeble"]');
  const coords = $parent.getCoords();
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let shiftValue;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      shiftValue = coords.width + delta;
      $resizer.css({right: -delta + 'px'});
    } else {
      const delta = e.pageY - coords.bottom;
      shiftValue = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    }
  };

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: shiftValue + 'px'});
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = shiftValue + 'px'));
    } else {
      $parent.css({height: shiftValue + 'px'});
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
