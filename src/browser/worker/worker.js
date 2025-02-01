import extend from './extend';

class Worker {
  constructor() {
    this._url = null;
    this._deps = [null];
    this._workerManager = null;
  }
  checkUrl() {
    if (this._url === null) {
      throw new Error('image worker must be initialized with an URL');
    }
  }
  get url() {
    return this._url;
  }
  set url(value) {
    if (typeof value !== 'string') {
      throw new TypeError('worker URL must be a string');
    }
    this._url = value;
    this._deps[0] = value;
  }
  static extendMethod(name, method) {
    let manager;
    let url;
    let runner = {};

    function run(...args) {
      if (!manager) {
        this.checkUrl();
        url = this.url;

        // 动态导入 WorkerManager
        import('web-worker-manager').then((module) => {
          const WorkerManager = module.default;
          manager = new WorkerManager(method.work, { deps: url });
          runner.manager = manager;
        }).catch((error) => {
          console.error('Failed to import WorkerManager:', error);
        });
      }
      return method.run.call(runner, ...args);
    }

    run.reset = function () {
      if (manager) {
        manager.terminate();
        manager = new WorkerManager(method.work, { deps: url });
        runner.manager = manager;
      }
    };
    Worker.prototype[name] = run;
  }
}

extend(Worker);

export default new Worker();

