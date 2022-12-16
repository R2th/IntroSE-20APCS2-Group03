### Giới thiệu
Trong bài viết này, mình xin chia sẻ về **Destructuring Assignment** - một cú pháp **Es6** cực kỳ hữu dụng của **Javascript** mà mình gần như dùng nó hàng ngày, mỗi khi làm việc với **JS**.  
Theo định nghĩa chính thức trên **[MDN](https://developer.mozilla.org)**, "**Destructuring Assignment**  là một biểu thức **Javascript** cho phép lấy **giá trị (value)** từ bên trong **mảng (array)** hay thuộc tính **(properties)** trong **object** và gán cho các **biến (variable)** mới".  
Trong quá trình phát triển ứng dụng **JS**, ta rất ít khi chỉ làm việc với một hay hai kiểu dữ liệu đơn thuần như **Number**, **String**,... mà thường xuyên phải làm việc với nhiều kiểu dữ liệu, đặc biệt là với những kiểu dữ liệu " tổng hợp " như **Object** hay **Array** (trong **JS** thì array cũng là một **Object**). **Destructuring Assignment** giúp chúng ta tương tác với **Object** một cách khoa học và ngắn gọn hơn nhiều so với cú pháp **Es5** hoặc cũ hơn, giúp **code** dễ đọc cũng như tăng tốc độ phát triển, **maintain**.
### Sử dụng  
Trong phần này mình sẽ chỉ ra các trường hợp điển hình ứng dụng **Destructuring Assignment** khi làm việc với **JS**.  
#### Sử dụng **Destructuring Assignment** để lấy giá trị từ Object  
Trong trường hợp ta nhận được một **Object** và muốn "bóc tách" thành các giá trị riêng biệt, ví dụ
```js
var person = {
    name: 'Viet',
    age: 24,
    job: 'dev'
}
var name = person.name // name = 'Viet'
var age = person.age // age = 24
var job = person.job // job = 'dev'
```
Sử dụng **Destructuring Assignment**:
```js
var person = {
    name: 'Viet',
    age: 24,
    job: 'dev'
}
var { name, age, job } = person // name = 'Viet', age = 24, job='dev' 
```
Hai đoạn code trên sẽ cho kết quả tương tự nhau, rõ ràng việc sử dụng **Destructuring Assignment** là ngắn gọn hơn, và nếu chúng ta muốn sử dụng tên biến khác với tên của **thuộc tính** bên trong **Object**, chẳng hạn:
```js
var userName = person.name // name = 'Viet'
var userAge = person.age // age = 24
var userJob = person.job // job = 'dev'
```
Với **Destructuring Assignment**:
```js
var { name: userName, age: userAge, job: userJob } = person // userName = 'Viet', userAge = 24, userJob='dev'
```
Đối với trường hợp cần lấy giá trị từ một **object** bên trong một **object**, ta sử dụng như sau:
```js
var person = {
    info: {
        name: 'Viet',
        age: 24,
        job: 'dev'
    }
}
var { info: { name, age, job } } = person // name = 'Viet', age = 24, job='dev' 
```
Lưu ý rằng **Destructuring Assignment** không giới hạn số lượng lớp **object** bao trùm lên nhau.

#### Sử dụng **Destructuring Assignment** để tách giá trị từ Array  
Giống với **Object**, **Destructuring Assignment** giúp việc " bóc tách " giá trị từ một **Array** trở nên dễ dàng hơn  
```js
var arr = [1, 2, 3, 4, 5]
var first = arr[0] // first = 1
var second = arr[1] // second = 2
```
Sử dụng **Destructuring Assignment**:
```js
var arr = [1, 2, 3, 4, 5]
var [ first, second ] = arr // first = 1, second = 2
```
Cần lưu ý là **Destructuring Assignment** cho phép ra lấy ra một giá trị đúng theo **index** bên trong **Array** và dựa vào dấu **','** để phân biệt **index**, ví dụ nếu muốn lấy giá trị thứ nhất và thứ tư trong mảng:
```js
var arr = [1, 2, 3, 4, 5]
var [ first,,, fourth ] = arr // first = 1, fourth = 4
```
Đồng thời ta cũng có thể sử dụng **Destructuring Assignment** đối với **Array** bên trong **Array** như sau
```js
var arr = [1, 2, [3, 4]]
var [a, b, [c, d]] = arr // a = 1, b = 2, c = 3, d = 4
```
Phức tạp hơn một xíu, nếu kết hợp **Destructuring Assignment** giữa **Object** và **Array** sẽ như sau  
**Array bên trong Object:**
```js
var ob = { arr: [1, 2] }
var { arr: [a, b] } = ob // a = 1, b = 2
```
**Object bên trong Array:**
```js
var arr = [10, { name: 'Viet', age: 24 }]
var [, { name, age }] = arr // name = 'Viet', age = 24
```
Để tránh nhần lẫn thì chỉ cần chú ý là đối với **Object** ta luôn dựa vào **Properties** và **Index** đối với **Array**.  
#### Sử dụng **Destructuring Assignment** để truyền tham số vào Function  
Khi **function** nhận **object** làm tham số, chẳng hạn:
```js
var printUserInfo = function(person) {
   var { name, age, jon } = person
   console.log('UserName: ', name)
}
```
**Destructuring Assignment** cho phép ra rút ngắn đoạn **code** trên, trở thành:
```js
var printUserInfo = function({ name, age, jon }) {
   console.log('UserName: ', name)
}
```
Tương tự với **Array:**
```js
var sum = function([a, b]) {
   return a + b
}
sum([1, 2]) // 3
```  
### Tổng kết  
Trong bài viết này mình đã chia sẻ chi tiết về cú pháp **Es6** **Destructuring Assignment** trong **Javascript**, khái niệm cũng như các trường hợp thường được ứng dụng, hi vọng bài viết hữu ích với bạn đọc.