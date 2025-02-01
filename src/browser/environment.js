let env;
let ImageData;
let DOMImage;
import axios from 'axios';
if (typeof self !== 'undefined' && self.document) {
  // 浏览器环境
  env = 'browser';
  ImageData = self.ImageData;
  DOMImage = self.Image;
}

export function createCanvas(width, height) {
  let canvas = self.document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function fetchBinary(url, { withCredentials = false } = {}) {
  return axios.get(url, { responseType: 'arraybuffer', withCredentials })
    .then(response => response.data)
    .catch(error => {
      throw new Error(`Failed to fetch binary data: ${error.message}`);
    });
}

export function createWriteStream() {
  throw new Error('createWriteStream does not exist in the browser');
}

export function writeFile() {
  throw new Error('writeFile does not exist in the browser');
}

export { env, ImageData, DOMImage };
