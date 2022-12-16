**Tóm tắt**: Trong hướng dẫn này, bạn sẽ học cách cải thiện việc xây dựng mảng bằng cách sử dụng phương thức **JavaScript Array.of ()** trong ES6.

##### Giới thiệu về phương thức JavaScript Array.of ()
Trong ES5, khi bạn truyền một số vào phương thức khởi tạo **Array**, JavaScript sẽ tạo một **Array** có độ dài bằng số.

Ví dụ:
```javascript
let numbers = new Array(2);
console.log(numbers.length); // 2
console.log(numbers[0]); // undefined
```

Tuy nhiên, khi bạn chuyển cho phương thức khởi tạo **Array** một giá trị không phải là số, JavaScript sẽ tạo một  **Array** chứa một phần tử với giá trị đó. 

Ví dụ:
```javascript
numbers = new Array("2");
console.log(numbers.length); // 1
console.log(numbers[0]); // "2"
```

Hành vi này đôi khi gây nhầm lẫn và dễ xảy ra lỗi vì bạn có thể không biết loại dữ liệu mà bạn truyền cho phương thức khởi tạo Array.

ES6 giới thiệu phương thức **Array.of ()** để giải quyết vấn đề này.

Phương thức **Array.of ()** tương tự như phương thức khởi tạo **Array** ngoại trừ phương thức Array.of () không xử lý một giá trị số đặc biệt.

Nói cách khác, phương thức **Array.of ()** luôn tạo ra một mảng chứa các giá trị mà bạn truyền cho nó.

Sau đây là cú pháp của phương thức **Array.of ()**:

```javascript
Array.of(element0[, element1[, ...[, elementN]]])
```

##### Ví dụ về JavaScript Array.of ()
Các bạn xem ví dụ sau
```javascript
let numbers = Array.of(3);
console.log(numbers.length); // 1
console.log(numbers[0]); // 3
```
Trong ví dụ này, mình đã truyền số 3 vào phương thức **Array.of ()**. Phương thức **Array.of ()** tạo một mảng gồm một số.

Hãy xem xét ví dụ sau:
```javascript
let chars = Array.of('A', 'B', 'C');
console.log(chars.length); // 3
console.log(chars); // ['A','B','C']
```

Ở ví dụ này, mình đã tạo một mảng gồm ba chuỗi bằng cách truyền 'A', 'B' và 'C' vào phương thức **Array.of ()**. Độ dài của mảng là 3.

##### Array.of() polyfill
Nếu bạn thực thi JavaScript trong môi trường không hỗ trợ phương thức **Array.of ()**, bạn có thể sử dụng polyfill sau:

```javascript
if (!Array.of) {
    Array.of = function() {
        return Array.prototype.slice.call(arguments);
    };
}
```

##### Kết luận

Trong hướng dẫn này, mình đã hướng dẫn các bạn cách xây dựng mảng sử dụng phuơng thức Array.of () trong ES6.

Cảm ơn các bạn đã đọc bài viết của mình. Hẹn gặp lại các bạn trong bài viết tiếp theo :kissing_heart::kissing_heart::kissing_heart: