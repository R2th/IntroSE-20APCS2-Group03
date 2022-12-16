Nếu bạn là một lập trình viên JS, chắc hẳn Promise đã quá quen thuộc rồi. Bình thường bạn sẽ xử lý khi nó trả về lỗi như thế nào ? Ở bài viết này, chúng ta cùng tìm hiểu về nó nhé.

## 1. Xử lý lỗi với `.catch`
Giả sử có 1 đoạn như thế này, bạn đã xử lý đủ cho cả case thành công và thất bại của promise (khi promise bị reject hoặc một lỗi nào đó xuất hiện)
```js
function getProfile() {
  return new Promise((resolve, reject) => {
    var myFunc = {} 
    myFunc() // code generates an error

    setTimeout(() => {
      resolve({
        firstName: 'Trang',
        lastName: 'Nguyen',
      })
    }, 3000)
  })
}

getProfile().then(profile => {
  console.log(profile)
}, (error) => {
  console.log('An error has occur: ', error)
})

```
`myFunc() `thực tế không phải là function. Đây chính là phần gây ra lỗi. Vì bạn đã có đoạn xử lý lỗi nên tất nhiên, bạn sẽ nhận được dòng log in ra lỗi bình thường như thế này.
```
An error has occur:  TypeError: myFunc is not a function
```

Và bây giờ, thử thay đổi một chút nhé. Hãy đặt vị trí dòng lỗi khác đi, trong then() của promise như thế này.
```js
function getProfile() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve({
        firstName: 'Trang',
        lastName: 'Nguyen',
      })
    }, 3000)
  })
}

getProfile().then(profile => {
  var myFunc = {}
  myFunc()  // code generates an error
  console.log(profile)
}, (error) => {
  console.log('An error has occur: ', error)
})
```
Và lúc này, phần xử lý để in ra thông báo lỗi của bạn đã không được trigger nữa, bạn nhận được kết quả như thế này.
```
UnhandledPromiseRejectionWarning: TypeError: myFunc is not a function
```
Hiểu đơn giản thì do phần bạn đang dùng để xử lý lỗi  `(error) => {}` chỉ bắt những trường hợp mà chính Promise đó trả về lỗi thôi. Tại case này thì Promise đã trả về, sau đó nó lại có 1 đoạn code khác gây lỗi dẫn đến promise bị reject. Vậy giờ muốn xử lý nó thì phải làm sao?
Hãy nhớ đến `try...catch`? OK, ứng dụng thôi nào. Bạn chỉ cần sửa lại thành
```js
// Example 1.1
getProfile().then(profile => {
  var myFunc = {}
  myFunc()  // code generates an error
  console.log(profile)
}).catch((error) => {
  console.log('An error has occur: ', error)
})
```
Đoạn code dưới thực thi promise và hãy hiểu `.catch` có nghĩa là sẽ có một `try...catch` ngầm xung quanh nó. 

Khi chúng ta ném ra một lỗi trong .then, promise sẽ bị reject, do đó sẽ nhảy đến phần xử lý lỗi gần nhất.
Lỗi ở đây không nhất thiết phải là một lỗi được reject rõ ràng, nó có thể là các lỗi ngẫu nhiên trong trình xử lý.
```js
// Example 1.2

getProfile().then(profile => {
  throw new Error('error nay')
  console.log(profile)
}).catch((error) => {
  console.log('An error has occur: ', error)
})
```

```js

// Example 1.3

getProfile().then(profile => {
  reject(new Error('error nay'))
  console.log(profile)
}).catch((error) => {
  console.log('An error has occur: ', error)
})
```

Ở cả 3 trường hợp 1.1, 1.2, 1.3, lỗi đều được xử lý và in ra thông báo cho người dùng. 

Vì vậy hãy luôn nhớ đến .`catch()`  khi dùng promise nhé.

### Với chuỗi promise liên tiếp

 `.catch` không nhất thiết phải luôn theo kèm 1 `.then`. Nó có thể xuất hiện sau một hoặc nhiều `.then`
 
Vậy nếu bạn có một chuỗi promise, làm cách nào để xử lý khi đang thực hiện chúng thì xảy ra một lỗi nào đó lỗi. 

Cách đơn giản nhất là bắt tất cả các lỗi ở `.catch()` cuối cùng trong chuỗi promise. Với cách này, nếu bất cứ promise nào trả về reject (có thể do lỗi mạng hoặc json không hợp lệ hoặc bất cứ lỗi gì), trình thực thi sẽ nhảy đến phần xử lý lỗi gần nhất và `.catch` sẽ trigger được chúng.

```js
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
```


## 2. Ném lại lỗi
Như đã đề cập ` .catch` ở cuối chuỗi tương tự như `try..catch`. Chúng ta có thể có nhiều `.then` và sau đó sử dụng một `.catch` duy nhất ở cuối để xử lý lỗi trong tất cả chúng.
Với `try ... catch`, chúng ta có thể phân tích lỗi rồi ném lại chúng nếu nó chưa được xử lý, thì tương tự với promise cũng vậy.

Nếu bạn ném một lỗi trong `.catch`, nó sẽ được chuyển đến trình xử lý lỗi gần nhất tiếp theo. Và nếu bạn xử lý chúng và kết thúc một cách bình thường (không có lỗi gì nữa), nó sẽ tiếp tục nhảy đến phần xử lý thành công tiếp theo, ở đây là `.then()`


```js
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```
Ở đây `.catch` đã được kết thúc bình thường. Vì vậy xử lý tiếp theo `.then` sẽ tiếp tục được gọi.

Một ví dụ khác với `.catch()`. Phần xử lý  ( * ) bắt các lỗi nhưng không thể xử lý chúng (trong ví dụ này là chỉ xử lý lỗi dạng URIError), vì vậy nó lại ném ra lỗi một lần nữa:

```js
// the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

    throw error; // throwing this or another error jumps to the next catch
  }

}).then(function() {
  /* doesn't run here */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});
```

Trình thực thi sẽ nhảy từ  .catch  ( * ) đầu tiên đến .catch( ** ) là phần xử lý gần nhất tiếp theo.

## 3. `Unhandled rejections`
Chuyện gì sẽ xảy ra nếu một lỗi xảy ra nhưng không được xử lý. Giả sử, bạn đã quên thêm `.catch` vào cuối chuỗi như dưới đây:

```js
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!
```

Trong trường hợp có lỗi, promise sẽ bị reject, việc thực thi sẽ được chuyển đến phần xử lý rejection gần nhất. Nhưng ở đây thì không có, do đó lỗi đã bị "stuck", không có đoạn code nào xử lý nó dẫn đến chương trình bị lỗi và đứng tại đó. JavaScript theo dõi những rejection như vậy và tạo ra global error trong trường hợp đó. Bạn sẽ thấy dòng thông báo lỗi đỏ ở console. 

Để xử lý chúng thì ở browser, chúng ta có thể bắt các lỗi như vậy bằng cách sử dụng `unhandledrejection`:


```js
window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
```

Nhờ vậy, nếu lỗi xảy ra và không được `.catch`,  bạn vẫn có thể thông báo cho người dùng đã có lỗi xảy ra hoặc có thể báo cáo sự cố cho máy chủ.

## 4. Lỗi trong `setTimeout`
Bạn nghĩ thế nào về ví dụ này ?  `.catch` liệu có được bắt được lỗi này không ?

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

Và câu trả lời là **KHÔNG**

Như đã đề cập ở trên, một `try... catch` ngầm sẽ hoạt động. Mà `try-catch` lại là đồng bộ. (Bạn có thể đọc thêm ở [đây](https://javascript.info/try-catch))
Nên với những ngoại lệ xảy ra trong “scheduled” code (như `setTimeout`, `setInterval`) nó sẽ không thể bắt được.
Để xử lý trường hợp này, bạn có thể để `try...catch` ở bên trong `setTimeout` callback
```
new Promise(function(resolve, reject) {
  setTimeout(() => {
    try {
      throw new Error("Whoops!");
    } catch(error) {
      console.log('Error in setTimeout: ', error);
    };
  }, 1000);
}).catch(e => console.log('Error: ', e));
```
## Tổng kết
- `.catch` xử lý các lỗi trong promise: khi gọi reject(), hoặc khi một lỗi nào đó được ném ra trong quá trình xử lý.
- Nên đặt `.catch` ở vị trí chính xác, nơi mà bạn muốn xử lý lỗi và biết cách xử lý chúng ra sao. Khi xử lý chúng ta nên phân tích các loại lỗi (bằng cách xử dụng các custom error class) hoặc ném lại chúng.
- Trong mọi trường hợp, chúng ta nên có `unhandledrejection` (cho browsers, và những môi trường tương tự) để theo dõi những lỗi không được xử lý và để thông báo cho người dùng (hoặc máy chủ) về chúng, từ đó, app của chúng ta sẽ tránh những lỗi crash.



Bài viết đến đây là hết, cảm ơn các bạn đã theo dõi nhé.

Tham khảo: https://javascript.info/promise-error-handling