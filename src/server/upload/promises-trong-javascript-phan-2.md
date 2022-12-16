## Promises Object
Theo MDN documentation:
> Promise object chính là sự hoàn thành công việc (hoặc thất bại) của xử lý bất đồng bộ và cũng là kết quả của Promise.
Promise object có **static methods** và **prototype methods**.

Static methods  trong Promise object có thể xử lý độc lập, trong khi prototype methods cần đến các instances của Promise object.

Nhưng chắc chắn rằng cả 2 method đều return về 1 Promise.

### Prototype Methods
Mình xin nhắc lại một chút: tất cả các methods này được áp dụng trên 1 instanse của Promise object và tất cả các methods này đều lần lượt trả về 1 Promise. Các methods này sẽ handle cho state khác nhau của promise.
 
 Như chúng ta thấy ở  ví dụ [phần trước](https://viblo.asia/p/promises-trong-javascript-GrLZDk3EKk0#_ket-luan-4): khi Promise được tạo sẽ có trạng thái: pending. Sẽ có ít nhất 1 trong 3 methods sau sẽ được thực hiện khi 1 Promise được xử lý dựa trên việc chúng được **fulfilled** (hoàn thành) hay **rejected** (từ chối).
 `Promise.prototype.catch(onRejected)`

`Promise.prototype.then(onFulfilled, onRejected)`

`Promise.prototype.finally(onFinally)`

Sơ đồ bên dưới thể hiện luồng xử lý cho trường hợp `.then` và `.catch`. Vì return về 1 Promise nên có thể bị hoãn lại. Nếu gặp `.finally ` thì nó sẽ thực hiện bất cứ khi nào Promise được `settled` , bất kể Promise đó **fulfilled** hay **rejected**. Vì vậy, cần kiểm tra trước khi sử dụng finally.

![](https://images.viblo.asia/f937eead-b0b2-443b-b635-bcef3ba490e6.png)

From : [MDN](https://mdn.mozillademos.org/files/15911/promises.png)

Dưới đây mình sẽ đưa ra ví dụ cho bạn dễ hiểu hơn:
Có 1 cậu nhóc đòi mẹ mua cho 1 cái iphone 11 Pro. Và mẹ cậu ta đáp: "Mẹ hứa sẽ mua cho con iphone 11 Pro vào cuối tháng này!"
Hãy cùng xem, trong Javascript xử lý như nào nhé!
```
var momsPromise = new Promise(function(resolve, reject) {
  momsSavings = 20000000;
  priceOfPhone = 30000000;
  if (momsSavings >= priceOfPhone) {
    resolve({
      brand: "iphone",
      model: "11Pro"
    });
  } else {
    reject("Mẹ không đủ tiền. Chúng ta cùng tiết kiệm tiền nhé!");
  }
});
momsPromise.then(function(value) {
  console.log("Con đã nhận được chiếc điện thoại như 1 món quà. Cảm ơn mẹ! ", JSON.stringify(value));
});
momsPromise.catch(function(reason) {
  console.log("Mẹ không thể mua điện thoại, bởi vì ", reason);
});
momsPromise.finally(function() {
  console.log(
    "Dù mẹ có mua được hay không, con vẫn rất yêu mẹ!"
  );
});
```

Kết quả nhận được là:
![rejected promise](https://images.viblo.asia/227a39ed-8873-46b6-b9dc-281e97717a18.png)

Nếu thay đổi giá trị momsSavings >= 30000000 thì mẹ sẽ mua được điện thoại. Trong trường hợp này, kết quả sẽ là:
![resolved promise](https://images.viblo.asia/1e805648-0920-4d62-abc5-5039c05ecb34.png)

**.Then**  có thể gán cho cả onFulfilled và onReject nên thay vì dùng .then, .catch thì ta có thể dùng như sau:
```
momsPromise.then(
  function(value) {
    console.log("Con đã nhận được chiếc điện thoại như 1 món quà. Cảm ơn mẹ! ", JSON.stringify(value));
  },
  function(reason) {
    console.log("Mẹ không thể mua điện thoại, bởi vì ", reason);
  }
);
```
Nhưng để code clear hơn thì ta nên dùng .then, .catch.

### Static Methods
Có 4 static methods trong Promise object. 

* 2 phương thức đầu tiên là helpers methods và shortcuts. Chúng giúp ta tạo resolved hoặc rejected promises.

**Promise.reject(reason)** giúp tạo rejected promise.
```
var promise3 = Promise.reject("Not interested");
promise3.then(function(value){
  console.log("This will not run as it is a resolved promise. The resolved value is ", value);
});
promise3.catch(function(reason){
  console.log("This run as it is a rejected promise. The reason is ", reason);
});
```

**Promise.resolve(value)** sẽ tạo resolved promise:
```
var promise4 = Promise.resolve(1);
promise4.then(function(value){
  console.log("This will run as it is a resovled promise. The resolved value is ", value);
});
promise4.catch(function(reason){
  console.log("This will not run as it is a resolved promise", reason);
});
```

> 1 promise có thể có nhiều trình xử lý, vì vậy mà ta có thể code như sau:
```
var promise4 = Promise.resolve(1);
promise4.then(function(value){
  console.log("This will run as it is a resovled promise. The resolved value is ", value);
});
promise4.then(function(value){
  console.log("This will also run as multiple handlers can be added. Printing twice the resolved value which is ", value * 2);
});
promise4.catch(function(reason){
  console.log("This will not run as it is a resolved promise", reason);
});
```
Và kết quả mà ta nhận được sẽ là:
![](https://images.viblo.asia/fed50115-5a14-4575-b7e0-a68746838ca4.png)

* 2 phương thức tiếp theo sẽ giúp xử lý một loạt các promise.
Khi bạn xử lý nhiều promise thì tốt nhất trước tiên tạo 1 array các promises và thực hiện các hành động cần thiết trên toàn bộ promises.

Để dể hiểu hơn, mình sẽ viết 2 functions. Một sẽ reslove và một sẽ reject, sau n giây. 
```
var promiseTRSANSG = (promiseThatResolvesAfterNSecondsGenerator = function(
  n = 0
) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({
        resolvedAfterNSeconds: n
      });
    }, n * 1000);
  });
});
var promiseTRJANSG = (promiseThatRejectsAfterNSecondsGenerator = function(
  n = 0
) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject({
        rejectedAfterNSeconds: n
      });
    }, n * 1000);
  });
});
```

Bây giờ hãy cùng mình tìm hiểu về Promise.All nào!
## Promise.All
Theo MDN documentation:
> The Promise.all(iterable) method returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.
* Trường hợp 1:
Khi tất cả promises được resolved. 
```
console.time("Promise.All");
var promisesArray = [];
promisesArray.push(promiseTRSANSG(1));
promisesArray.push(promiseTRSANSG(4));
promisesArray.push(promiseTRSANSG(2));
var handleAllPromises = Promise.all(promisesArray);
handleAllPromises.then(function(values) {
  console.timeEnd("Promise.All");
  console.log("All the promises are resolved", values);
});
handleAllPromises.catch(function(reason) {
  console.log("One of the promises failed with the following reason", reason);
});
```
![Tất cả promises được resolved](https://images.viblo.asia/ddf795f4-83e2-4d72-af98-1b63f8a6ba85.png)

Có 2 chú ý quan trọng mà ta cần biết ở output này:
1. Promise thứ 3 chỉ mất 2s để hoàn thành trong khi promise thứ 2 phải mất 4s. Nhưng bạn có thể thấy, ở output thứ tự sắp xếp các promise không thay đổi.
2. Và bạn hãy để ý, mình có add thêm timer để check xem Promise.All mất bao lâu. Nếu ta tính tổng thời gian các promise thực hiện là: 1+4+2 = 7s. Nhưng theo timer thì ta thấy chỉ mất có 4s để thực hiện. Điều này cho thấy các tất cả các promise thực hiện song song

* Trường hợp 2:
Khi không có promise. 
Case 2

```
console.time("Promise.All");
var promisesArray = [];
promisesArray.push(1);
promisesArray.push(4);
promisesArray.push(2);
var handleAllPromises = Promise.all(promisesArray);
handleAllPromises.then(function(values) {
  console.timeEnd("Promise.All");
  console.log("All the promises are resolved", values);
});
handleAllPromises.catch(function(reason) {
  console.log("One of the promises failed with the following reason", reason);
});
```

![](https://images.viblo.asia/9a164450-b5ee-4412-84d1-bc0bdfc7b93f.PNG)

Vì không có promises nào trong array nên sẽ được resolved.

* Trường hợp 3:
Kết quả là rejects vì promise đầu tiên reject. 

```
console.time("Promise.All");
var promisesArray = [];
promisesArray.push(promiseTRSANSG(1));
promisesArray.push(promiseTRSANSG(5));
promisesArray.push(promiseTRSANSG(3));
promisesArray.push(promiseTRJANSG(2));
promisesArray.push(promiseTRSANSG(4));
var handleAllPromises = Promise.all(promisesArray);
handleAllPromises.then(function(values) {
  console.timeEnd("Promise.All");
  console.log("All the promises are resolved", values);
});
handleAllPromises.catch(function(reason) {
  console.timeEnd("Promise.All");
  console.log("One of the promises failed with the following reason ", reason);
});
```

![Ngưng thực thi sau khi promise reject](https://images.viblo.asia/1e3f9743-92d8-4e81-96a7-8eca8ee84193.png)

## Quy tắt khi sử dụng Promises
1. Sử dụng **promise** bất cứ khi nào bạn xử lý **bất đồng bộ** hoặc** bocking code**.
2. **Resolve** maps với **then** và **reject** maps với **catch**.
3. Hãy chắc chắn hiểu rõ cả .then và .catch cho tất cả promise.
4. Nếu có công việc **chắc chắn sẽ được thực hiện** bất kể bay vào .then hay .catch thì lúc này bạn dùng .**finally**.
5. Chúng ta chỉ nhận được một kết quả cho mỗi promise.
6. Chúng ta có thể thêm nhiều trình xử lý vào một promise.
7. Tất cả kiểu trả về của một **Promise object** là một **promise**, cho dù chúng là static method hay prototype method.
8. Trong **Promise.all**, thứ tự trả về của các promise dựa vào thứ tự các biến, bất kể promise đó được giải quyết trước tiên.


Bài chia sẻ của mình về Promise trong Javascript đến đây là hết, hy vọng sau [Phần 1](https://viblo.asia/p/promises-trong-javascript-phan-1-GrLZDk3EKk0) và Phần 2 này các bạn sẽ hiểu hơn về Promise, khi nào thì dùng Promise. Bài viết được mình tham khảo tại [Understanding Promises in JavaScript](https://medium.com/better-programming/understanding-promises-in-javascript-13d99df067c1) của Gokul N K.