export function capitalizeFirstChar(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, i) => start + i);
}
export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify;
  }
  return a === b;
}

export function camelCaseToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelCaseToDashCase(key)}: ${styles[key]}`)
    .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
  event.preventDefault();
}
