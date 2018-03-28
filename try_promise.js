var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('Can add since one of them isn\'t number.');
      }
    })
  })
}

// chain two Promise, catch to reduce all error handler.
asyncAdd(325364563, 7).then((res) => {
  console.log('Results: ', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log(
    res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

var tryPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Promise can only do one thing back, and after set can't be changed. Not like callback function may be called twice.
    resolve('It works!');
    // reject('Unable to run :(');
  }, 2500);
});

tryPromise.then((message) => {
  console.log(message);
}, (errorMessage) => {
  console.log(errorMessage);
});
