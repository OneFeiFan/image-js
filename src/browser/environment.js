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
    if (typeof plus !== 'undefined' && plus.android && typeof plus.android.importClass === 'function') {
      try {
        // 获取 OkHttpClient 类
        const OkHttpClient = plus.android.importClass("okhttp3.OkHttpClient");
        const Request = plus.android.importClass("okhttp3.Request");
        plus.android.importClass("okhttp3.Response");
        plus.android.importClass("okhttp3.RealCall");
        plus.android.importClass("okhttp3.ResponseBody");

        // 创建 OkHttpClient 实例
        const client = new OkHttpClient();
        // 创建请求对象
        const request = new Request.Builder().url(url).build();
        // 发起请求并获取响应
        const response = client.newCall(request).execute();
        // 获取响应的二进制数据
        const byteArray = response.body().bytes();

        // 将 byte[] 转为 JavaScript 中的 arraybuffer
        const arrayBuffer = new ArrayBuffer(byteArray.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteArray.length; i++) {
          uint8Array[i] = byteArray[i];
        }
        // 关闭响应体
        response.body().close();

        // 返回二进制数据
        resolve(arrayBuffer);

      } catch (error) {
        console.error("Error in OkHttp request:", error);
        reject(error);
      }
    }else {
      try {
        let xhr = new self.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = withCredentials;

        xhr.onload = function (e) {
          if (this.status !== 200) reject(e);
          else resolve(this.response);
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
