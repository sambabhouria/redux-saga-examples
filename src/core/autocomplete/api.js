/* eslint-disable import/no-anonymous-default-export */
import languages from './languages.js';

function filter(list, text) {
  if (!text) {
    return [];
  }
  return list.filter(item => item.name.toUpperCase().indexOf(text.toUpperCase()) !== -1);
}

function suggest(text) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: filter(languages, text) });
    }, 500);
  });
}

export default { suggest };
