Toán tử  `typeof` trả về một chuỗi là loại JavaScript cho một giá trị nhất định nào đó.
# Cách dùng

Để dùng `typeof` thì chúng ta sẽ có 2 cách sau:

```c:js
typeof foo;
typeof(foo);
```

# Ví dụ
Chúng ta sẽ bắt đầu với một vài ví dụ đơn giản sau:

```javascript:js
typeof true;      // 'boolean'
typeof false;     // 'boolean'

typeof 3000;      // 'number'
typeof 3.14;      // 'number'
typeof NaN;       // 'number'
typeof Infinity;  // 'number'

typeof 'foobar';     // 'string'
typeof `foobar`;     // 'string'
```

Những ví dụ đơn giản trên cũng đủ để bạn có thể hiểu hơn về type trong JavsScript.

# Mảng và Object

Đối với những mảng và object thì bạn sẽ nhận được kết quả là **"object"**

```javascript:js
typeof [1, 2, 'foobar'];   // 'object'
typeof {a: 'foobar'};      // 'object'
```

“object” is really just a generic label that’s used loosely for more sophisticated values in JavaScript.

# Giá trị rỗng (Empty values)

Với những kết quả dưới đây có thể các bạn sẽ thấy khó hiểu:

```javascript:js
typeof null;       // 'object'
typeof undefined;  // 'undefined' 
```

Trong JavaScript thì `undefined` nó sẽ là 1 kiểu riêng

# Constructors

Vì các constructors Class trong JavaScript chỉ là các hàm:

```php:js
typeof String;           // 'function'
typeof Boolean;          // 'function' 
typeof Number;           // 'function'
typeof Object;           // 'function'
typeof Function;         // 'function'
typeof MyAwesomeClass;   // 'function'  
```

# Kiểm tra kiểu cho các chức năng

Việc thực hành kiểm tra kiểu trong lập trình có một lịch sử rất dài và cách chính để thực hiện điều này trong JavaScript là sử dụng toán tử typeof:

```javascript:js
function add(a, b) {

  // perform type-checks...
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw 'Arguments must be a number'
  };

  return a + b;
}
```

Điều này cho phép bạn đảm bảo rằng các đối số cho hàm add là các số và không phải là một chuỗi giống như một chuỗi (sẽ nối với nhau trong JavaScript).

Kiểm tra kiểu trong JavaScript tạo mã ổn định hơn vì bạn đang xác định các quy tắc cơ bản rõ ràng để tương tác với ứng dụng của mình.
# Kiểm tra sự tồn tại (Existence Testing)

Một cách khác mà bạn có thể sử dụng typeof là xác định sự tồn tại (**existence**) của một người có giá trị.

```javascript:js
if (typeof window !== 'undefined') {
  // you're programming in JavaScript land!
};

if (typeof process !== 'undefined') {
  // Node.js!
}

if (typeof $ !== 'undefined') {
  // jQuery is available! 
}
```