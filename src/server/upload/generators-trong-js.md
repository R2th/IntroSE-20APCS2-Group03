# Generator Function

- Hiểu đơn giản function trong js khi được thực thi sẽ đảm bảo tính run to completion (các code khác sẽ không thể can thiệp và làm gián đoạn quá trình chạy của function đó ) Tuy nhiên generator function là 1 function có chức năng tạm ngưng thực thi trước khi hàm kết thục và có thể tiếp tục chạy ở 1 thời điểm khác...
- Normal function chỉ có thể return ra 1 giá trị - còn Generator Function có thể return về nhiều giá trị khác nhau...
- Generators có thể xem như là các áp dụng của iterables (https://medium.freecodecamp.org/demystifying-es6-iterables-iterators-4bdd0b084082)
    - Iterator protocol là các method xử lý 1 object có đánh dấu vị trí đã duyệt
        VD: tạo ra 1 iterator:
        ```
        var iterable = {}
        iterable[Symbol.iterator] = function* (){
          yield 1;
          yield 2;
          yield 3;
        }
        [...iterable] // [1,2,3]
        ```
        Iterator cung cấp 1 method next(), nó sẽ return phần tử kế tiếp và trả về 1 object + 2 property value và done
        VD:
        ```
        var arr = [1,2,3]
        let iterator = arr[Symbol.iterator]()
        console.log(iterator.next()) // {value: 1, done: false}
        console.log(iterator.next()) // {value: 1, done: false}                                        
        console.log(iterator.next()) // {value: 1, done: false}  
        console.log(iterator.next()) // {value: undefined, done: true}
        ```
    
#  Syntax
  ```
  function* generator() {
    // A
    yeild 'foo'
    // B
  }
  ```
Tương tự như VD về iterator mình sẽ viết VD vs generator function nhé :
VD: 
```
function* generator(){
  yield 1
  yield 2
  yield 3
}
var gen = generator();
console.log(gen.next()) // {value: 1, done: false}
console.log(gen.next()) // {value: 1, done: false}                                        
console.log(gen.next()) // {value: 1, done: false}  
console.log(gen.next()) // {value: undefined, done: true}
```
- Giải thích 1 chút: Khi gọi đến function  `var gen = generator()` thì hàm generator sẽ không được thực thi luôn mà sẽ tạo ra 1 iterator để kiểm soát quá trình chạy của hàm.
- `gen.next()` để bắt đầu chạy generator() và sẽ dừng ở yield 1. Tại đây generator vẫn còn hoạt động nhưng chuyển sang trạng thái dừng. Để tiếp tục chũng ta sử dụng method `next()`
yield cũng có thể dùng để gọi 1 function khác
VD:
```
function normalFunction(){
 return i = 1
}

function* generator(){
  yield 10
  yield normalFunction()
}
```
Dùng `yield*` khi muốn gọi đến 1 generation function.
VD:
```
function* anotherGenerator(i) {
  yield i + 1;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
}
```
Dùng yield như 1 nơi để truyền tham số đầu vào: 
VD đơn giản như sau
```
function* generator(){
  var str = yield 'Hello!'
  console.log(str)
  if(str === 'Hello') return 'OK'
  return 'str is not equal Hello'
}

var gen = generator()
console.log(gen.next()) // {value: "Hello!", done: false}
console.log(gen.next('Bye')) // Bye - {value: "str is not equal Hello", done: true}
```
Rõ ràng srt lúc chạy next đầu tiên str là Hello
nhưng khi chạy next lần thứ 2 và gán tham số 'Bye' thì str có giá trị là 'Bye' chứ không phải 'Hello' nữa
# Kết
Bài viết này mình viết ra nhằm tìm hiểu về react-sagas và để phục vụ cho bài đó =.="