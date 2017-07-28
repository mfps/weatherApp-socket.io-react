const toAwait = promise =>
  promise.then(data => [null, data]).catch(error => [error, null]);

export { toAwait };
