### Giới thiệu
Chào các bạn, hôm nay mình sẽ tiếp tục với chủ đề Các cú pháp bị lãng quên trong javascript. Chắc đây sẽ là bài viết cuối trong chủ đề này của mình. 

### 1. Operator **

Đây là toán tử dùng để tính số mũ của 1 số, cũng giống như hàm Pow. 
```
console.log(2 * 2 * 2); // Output: 8

console.log(Math.pow(2, 3)); // Output: 8

console.log(2 ** 3); // Output: 8
```

Toán tử này mình rất ít khi sử dụng nó.

### 2. Operator +

Như các bạn đã biết toán tử + dùng để cộng 2 số, 2 chuỗi, ... với nhau, để ra 1 kết quả mới. Ví dụ 

```
console.log(2 + 2); // Output: 4

console.log('Hello' + ' World'); // Output: Hello World
```

Nhưng các bạn đã thử sử dụng toán tử này chỉ với 1 số, 1 chuỗi, ... hay thậm chí các object với nhau Các bạn hãy xem ví dụ sau:

```
console.log(+0); // Output: 0

console.log(+'69'); // Output: 69

console.log(+{}); // Output: NaN

console.log(+{ valueOf: () => 69 }); // Output: 69

console.log(+null); // Output: 0

console.log(+undefined); // Output: NaN

console.log(+'string69'); // Output: NaN
```

Từ đó ta có thể có các phép tính thú vị sau
```
const a = { valueOf: () => 60 };
const b = { valueOf: () => 9 };

console.log(a + b); // Output: 69
```
Thú vị chưa :D

Tương tự với các toán tử khác **-**, *****,** /**

### 3. Kế thừa với __proto__

Trong lập trình hướng đối tượng để thừa kế từ lớp cha thì ở lớp con phải extends lại. Ví dụ:
```
class Parent {
  firstName = 'John';
  lastName = 'Smith';
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Child extends Parent {
    firstName = 'Herry';
}

console.log((new Child).getFullName()); // Output: Herry Smith
```

Nhưng trong javascript bạn còn có cách khác để thừa kế mà không cần class hay extends gì cả. Các bạn cùng xem nhé: 

```
const parent = {
  firstName: 'John',
  lastName: 'Smith',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const child = {
    firstName: 'Herry',
    __proto__: parent,
};

console.log(child.getFullName()); // Output: Herry Smith
```

Mặc dù là 2 cách khác nhau nhưng kết quả trả về vẫn như nhau. Các bạn cũng có thể kiểm tra ở cách 1 `child` cũng có thuộc tính `__proto__`.
```
console.log((new Child).__proto__); Output: Parent class ...
```

### 4. Function properties

Bạn đã từng bao giờ nghe đến cụm từ này chưa? Đúng như cái tên **Functions properties**, nó chính là các thuộc tính của 1 function! 
1 function thì cần thuộc tính làm gì nhỉ, trong khi nó chỉ cần tham số đầu vào và xử lý để trả về kết quả, hoặc làm 1 công việc nào đó.
Các bạn hãy xem ví dụ sau đây: 

```
function func() {
    console.log(func.name);
    console.log(func.length);
}

func(); // Output: func, 0

func('first', 'second'); // Output: func, 2
```

Đấy là ví dụ về function properties. Chúng ta còn có thể thêm các properties khác ví dụ:
```
function stepCounter() {
    if (!this.counter) stepCounter.counter = 0;
    stepCounter.counter++;
    console.log('Go ahead');
}

stepCounter(); // Output: Go ahead
stepCounter(); // Output: Go ahead

console.log(stepCounter.counter); // Output: 2
```

###  Kết luận

Vậy là cũng đã đến lúc serries này. Xuyên suốt serries này mình đã giới thiệu với các bạn các cú pháp mà ít người biết và sử dụng trong javascript. Mình hy vọng serries này sẽ giúp ích được cho các bạn hiểu thêm về javascript nhé. 
Chúc các bạn ngày làm việc, học tập thật hiệu quả :))))))