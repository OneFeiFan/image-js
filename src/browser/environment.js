let env;
let ImageData;
let DOMImage;

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
  return new Promise(function (resolve, reject) {
    if (uni !== undefined && typeof uni.request === 'function') {
      try {
        uni.request({
          url: url, // 请求的URL
          method: 'GET', // 请求方式
          responseType: 'arraybuffer', // 响应数据类型为ArrayBuffer
          withCredentials: withCredentials, // 是否携带凭证（如果需要）
          success: (res) => {
            if (res.statusCode !== 200) {
              reject(res);
            } else {
              resolve(res.data); // 通过resolve返回ArrayBuffer数据
            }
          },
          fail: (err) => {
            reject(err); // 请求失败时调用reject
          }
        });
      } catch (e) {
        console.error(e); // 捕获并打印错误信息
      }
    }else {
      try {
        let start = Date.now()
        let xhr = new self.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = withCredentials;

        xhr.onload = function (e) {
          if (this.status !== 200) reject(e);
          else{
            console.log('图片加载耗时', Date.now() - start);
            resolve(this.response)
          };
        };
        xhr.onerror = reject;
        xhr.send();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

export function createWriteStream() {
  throw new Error('createWriteStream does not exist in the browser');
}

export function writeFile() {
  throw new Error('writeFile does not exist in the browser');
}

export { env, ImageData, DOMImage };
