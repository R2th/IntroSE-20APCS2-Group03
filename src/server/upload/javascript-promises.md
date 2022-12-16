Trong hướng dẫn này,mình sẽ hướng dẫn các bạn về `Promise` trong js và cách sử dụng chúng hiệu quả

##### Hiểu về Promise trong js
Trong javascript, một `promise` là một đối tượng trả về giá trị mà bạn hy  vọng xảy ra trong tương lại, không phải hiện tại

Vì giá trị sẽ được trả về bởi `Promise` trong tương lai. Mình có một vd để các bạn hiểu rõ hơn

Giả sử bạn hứa sẽ hoàn thành khóa học Javascript trong tháng tới

Và bạn cũng không biết là mình có hoàn thành được khóa học trong tháng tới không. Bạn có thể hoàn thành hoặc không.Ở trên có ba trạng thái là đang học, đã hoàn thành và không hoàn thành.

Promise cũng có ba trạng thái như vậy

* Pending : Bạn không biết liệu mình có hoàn thành khóa học trong tháng tới không
* Fulfilled (successful) : Bạn đã hoàn thành khóa học
* Rejected (failed) : Bạn đã không hoàn thành khóa học

`Promise` bắt đầu trạng thái đang `pending` cho biết là chưa hoàn thành. Hoàn thành thì sẽ ở trạng thái ` Fulfilled (successful)` và thất bại ở trạng thái `Rejected (failed)`.

##### Tạo một Promise

Ở trên mình đã nói qua lý thuyết, bây giờ mình sẽ chỉ các bạn cách tạo một `Promise`. Để tạo một `Promise` thì bạn dùng hàm `Promise`
```javascript
let completed = true;

let learnJS = new Promise(function (resolve, reject) {
    if (completed) {
        resolve("Đã hoàn thành");
    } else {
        reject("Chưa hoàn thành");
    }
});
```

`Promise` chấp nhận hai đối số là `resolve`, `reject`. Khi bạn gọi `new Promise()` thì các tham số bên trong được thực thi tự động

Bên trong thực thi, nếu thành công thì sẽ gọi vào hàm `resolve()` và thất bại gọi vào hàm `reject`
Bây giờ mình sẽ xét `setTimeout` để thực thi lệnh trên
```javascript
let completed = true;

let learnJS = new Promise(function (resolve, reject) {
    setTimeout(() => {
        if (completed) {
            resolve("Đã hoàn thành");
        } else {
            reject("Chưa hoàn thành");
        }
    }, 3 * 1000);
});
```
Ban đầu trạng thái và giá trị ban đầu là `pending` và `undefined`. `Promise` sẽ được trả về khi hoàn thành. Bạn có thể copy vào `console` để thấy kết quả.

Sau 3s, bạn mở `console` lên và gõ `learnJS` thì sẽ thấy kết quả là `Đã hoàn thành`. Nếu bạn muốn `Promise` trả về trạng thái `reject` thì bạn thay đổi biến
```javascript
let completed = false;
```
và làm lại như trên các bạn sẽ thấy kết quả.

Dưới đây là hình ảnh hoạt động trạng thái của `Promise`
![](https://images.viblo.asia/226abbf6-6a57-4b86-b15f-8cb1ff47869e.png)
Khi `Promise` trả về trạng thái `resolve` or `reject` thì sẽ ở trạng thái đó và không thể chuyển đổi.
Nói cách khác là, một `Promise` không thể đi từ trạng thái `resolve` sang `reject` hoặc ngược lại.

Khi một `Promise` mới được tạo nó sẽ ở trạng thái `pending` và chờ được giải quyết.Trong `Promise` có 3 phương thức được dùng để gọi lại `Promise` khi đã `resolve` or `reject` đó là `then`, `catch`, `finally`.

##### then()

 Được sử dụng gọi khi một `Promise` thành công, nhận đầu vào là hai hàm gọi lại
 `promiseObject.then(onFulfilled, onRejected);`
 
 Hàm `onFulfilled` được gọi nếu `Promise` được thực hiện thành công, `onRejected` được gọi khi bị thất bại.
 
 Hàm dưới đây trả về một `Promise`  object
 ```javascript
 function makePromise(completed) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (completed) {
                resolve("Đã hoàn thành");
            } else {
                reject("Chưa hoàn thành");
            }
        }, 3 * 1000);
    });
}
 ```
 
 Dưới đây mình sẽ gọi lại hàm `makePromise` và dùng phương thức `then`
 ```javascript
 let learnJS = makePromise(true);

learnJS.then(
    success => console.log(success),
    reason => console.log(reason)
);
 ```
 
 ##### catch()
 
 Nếu bạn muốn thực hiện một thất bại thì bạn có thể sử dụng `catch` của `Promise`
 ```javascript
 learnJS.catch(
    reason => console.log(reason)
);
 ```
 ##### finally()
 Đôi khi bạn muốn thực thi cùng một đoạn code cho dù trả về `resolve` hay `reject`
 ```javascript
 function createApp() {
    // ...
}

 learnJS
    .then(
        (success) => {
            console.log(success);
            createApp();
        }
    ).catch(
        (reason) => {
            console.log(reason);
            createApp();
        }
    );
 ```
 Như bạn có thể thấy, lệnh gọi hàm createApp () được sao chép trong cả hai phương thức then () và catch ()

Để xóa và thực thi hàm `createApp` cho dù trạng thái là hoàn thành hay thất bại, thì bạn dùng phương thức `finally` như sau
```javascript
learnJS
    .then(success => console.log(success))
    .catch(reason => console.log(reason))
    .finally(() => createApp());
```

##### Kết luận
* Một `Promise` là một đối tượng sẽ trả giá trị trong tương lai
* Một `Promise` bắt đầu trạng thái là `pending` và kết thúc là `resolve` or `reject`
* Sử dụng phương thức `then` để gọi lại `Promise` khi đã hoàn thành và `catch` khi thất bại

Cảm ơn các bạn đã đọc bài viết của mình và hẹn các bạn ở các bài tiếp theo :grinning::grinning: