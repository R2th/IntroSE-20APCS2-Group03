### Giới thiệu
Chào các bạn lại là mình đây. Trong bài viết trước mình đã giới thiệu một số cú pháp mà rất ít người sử dụng của javascript. Hôm nay mình sẽ tiếp tục giới thiệu cho các bạn một số cú pháp khác nữa. Các bạn hãy cùng mình tìm hiểu nhé

### 1. Destructuring Array
Giả sử chúng ta có 1 array như sau: 
```
const arr = [99, 88, 77];
```
Để lấy các phần tử trong mảng bằng cách sử dụng index thông thường
```
console.log(arr[0], arr[1], arr[2]); // Output: 99 88 77
```
Nhưng chúng ta còn có cách khác đó là:
```
const { 0: first, 1: second, 2: third } = arr;
console.log(first, second, third); // // Output: 99 88 77

// Hoặc
const [first, second, third] = arr;
console.log(first, second, third); // // Output: 99 88 77
```

### 2. Reducing Array
Lấy ví dụ trên:
```
const arr = [99, 88, 77];
```
Các bạn có biết cách lấy phần tử đầu tiên và xóa các phần tử còn lại trong mảng. Hãy xem nhé:
```
console.log(arr.length); // Output: 3
arr.length = 1;
console.log(arr); // Output: [99]
arr.length = 3;
console.log(arr); // Output: [99, empty × 2]
```
Các bạn đã thấy sự vi diệu ở đây chưa :D

### 3.  Arguments
```
function myFunc() {
    console.log(arguments[0], arguments[1], arguments[2]);
}

myFunc(99, 88, 77);
// Output: 99 88 77
```
Theo như ví dụ trên thì chúng ta vẫn có thể sử dụng các tham số truyền vào hàm của mình mặc dù khi tạo hàm mình không khai báo tham số truyền vào cho nó.  Và lưu ý nó không sử dụng được với array function.

### 4. Skip brackets
Bình thường khi bạn tạo mới một đối tượng từ class thì bạn sẽ làm như thế nào? Có giống như sau không?
```
class A {
    log() {
        console.log('A');
    }
}

(new A()).log(); // Output: A
```
Nhưng vẫn có cách gọi ngắn hơn bằng cách lượt bỏ 1 cặp dấu `()`:
```
(new A).log(); // Output: A
```
Kết quả ở 2 dòng đều như nhau nhưng cách 2 nhìn đơn giản hơn, ít bị rối mắt hơn.

### 5. void
Thường thì mọi người hiếm khi sử dụng `void` này vì tác dụng của nó không rõ ràng.
Ví dụ ta có các hàm sau:
```
    function a() {}
    function b() { return 99; }
    
    console.log(a()); // undefined
    console.log(b()); // 99
    console.log(void b()); // undefined
```
Như các bạn thấy thì hàm nào không return kết quả thì nó sẽ là void và in ra undefined, hoặc sử dụng void phía trước hàm cho dùng hàm đó có trả về kết quả thì nó vẫn in ra undefined

### Kết luận

Mình đã giới thiệu thêm cho các bạn một số cú pháp nữa trong javascript mà rất ít người sử dụng. Hy vọng bài viết này sẽ giúp ích được cho các bạn. Mình sẽ thu thập thêm những cú pháp các để giới thiệu cho các bạn trong bài viết sau. Cảm ơn tất cả các bạn, chúc các bạn một ngày làm việc, học tập hiệu quả :)))))