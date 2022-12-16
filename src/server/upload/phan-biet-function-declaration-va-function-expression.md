Trong bài viết này mình xin chia sẻ về **function declaration** và **function expression** trong **javascript**, chúng ta có thể hiểu đó là 2 cách khác nhau để tạo nên một **function**.
### Điểm khác biệt: tên của function
khi bạn tạo ra một **function** có tên, đó gọi là **function declaration**  
**Function Declaration**:
```js
    function handleClick() {
        console.log("clicked")
    }
```
**Function Expression**:
```js
    const handleClick = function() {
        console.log("clicked")
    }
```
Hoặc sử dụng cú pháp **es6** tạo ra một **function anonymous** (khai báo một **function** nhưng không dùng từ khóa **function**) cũng là **function expression**.
```js
    const handleClick = () => {
        console.log('clicked')
    }
```
### Hoisting
Khái niệm **hoisting** biểu thị **function** hay **biến** có thể được "gọi" ngay từ dòng **code** đầu tiên, trước khi chúng được khai báo.  
**Function Declaration** có thuộc tính **hoisting** còn **Function Expression** thì không, điều này dễ dàng được biểu thị qua hai ví dụ sau:  
Đoạn **code** dưới đây sẽ thực thi bình thường khi **Function Declaration**
```js
handleStuff()

function handleStuff() {
    // do stuff
}
```
Đối với **Function Expression** thì sẽ báo lỗi
```
handleStuff()

const handleStuff = function() {
    // do stuff
}
```
### Hoàn cảnh sử dụng
Qua hai phần trên, ta có thể thấy **Function Declaration** và **Function Expression** chủ yếu khác nhau bởi thuộc tính **Hoisting** và **Function Declartion** có vẻ như mạnh mẽ hơn vì phạm vi sử dụng, tuy nhiên trong thực tế chúng ta chỉ nên cân nhắc **scope** để sử dụng đúng **Function Declaration**, nhằm tránh việc có quá nhiều **function** không cần thiết trong **global scope**, khi chúng ta sử dụng **function anonymous** chúng sẽ được sử dụng và biến mất ngay sau đó.  
###  Callback Function
**callback** chỉ việc một **function** bị gán thành tham số của một **function** khác, như ví dụ dưới đây
```js
function callbackFunction(item) {
  // do stuff to an item
}
[1, 2, 3, 4].map(callbackFunction)
```
Trong trường hợp trên **callbackFunction** có thể được gọi ở bất cứ đâu trong toàn bộ **application**, và điều này không thật sự cần thiết, thay vào đó chúng ta nên sử dụng **Function Expression** theo một trong hai cách sau:
```
const callbackFunction = function(item) {
  // do stuff to an item
}
[1, 2, 3, 4].map(callbackFunction)
```
```js
[1, 2, 3, 4].map((item) => {
  // do stuff to an item
})
```
### Tổng kết
chúng ta sử dụng **function declartion** khi muốn tạo ra **function** để sử dụng ở bất cứ đâu trong toàn bộ mã **code** và sử dụng **function expression** khi **function** bị giới hạn vùng sử dụng, giúp **global scope** nhẹ và **sạch** hơn.  
Trong bài viết này mình đã chia sẻ về **Function Declaration** và **Function Expression**, hi vọng những thông này trong bài viết hữu ích.  
Nguồn tham khảo: [When to use a function declaration vs. a function expression](https://medium.freecodecamp.org/when-to-use-a-function-declarations-vs-a-function-expression-70f15152a0a0)