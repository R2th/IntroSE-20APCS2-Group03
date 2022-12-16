![image.png](https://images.viblo.asia/490d3dfb-e665-4e27-bf4b-e23e8b4b1e40.png)


Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Currying
-----

Currying có nghĩa là đánh giá các hàm có nhiều đối số và phân tách chúng thành một chuỗi các hàm với một đối số duy nhất. Vì vậy, thay vì nhận tất cả các đối số cùng một lúc, hàm sẽ nhận đối số đầu tiên và trả về một hàm mới, hàm này nhận đối số thứ hai và trả về một hàm mới, hàm này nhận đối số thứ ba… cứ tiếp tục như vậy cho đến khi tất cả các đối số được cung cấp và hàm cuối cùng là `executed`.

Currying giúp bạn chia các hàm thành các hàm nhỏ hơn có thể tái sử dụng để xử lý một nhiệm vụ duy nhất. Điều này làm cho các function của bạn thuần túy hơn, ít bị lỗi hơn và dễ kiểm tra hơn.

Ví dụ Currying đơn giản
```javascript
// Hàm transaction để xử lý giao dịch ngân hàng
const transaction = (fee, balance, amount) => (
  balance + amout - fee;
);

// Cách thực hiện curry đơn giản
const curry = (fn, ...args) => (
  (..._arg) => (
    fn(...args, ..._arg)
  )
);

// Có thể dễ dàng sử dụng lại logic giao dịch cho loại giao dịch "free"
const freeTransaction = curry(transaction, 0);

freeTransaction(10, 90); // = 100
freeTransaction(100, 90); // = 190
```

Trong ví dụ trên, chúng ta đã implement 1 logic Curry đơn giản để xử lý một hàm có chính xác ba tham số. Kiến thức và ví dụ mình đưa ra chỉ mang tính giải thích các khải niệm. Trong thực tế nếu các bạn muốn áp dụng nó mình khuyên bạn nên sử dụng [Ramda](https://ramdajs.com/docs/#curry) hoặc các thư viện tương tự hỗ trợ các hàm `currying` với bất kỳ số lượng đối số nào và cũng hỗ trợ thay đổi thứ tự các đối số bằng cách sử dụng `placeholders`.
Tuy nhiên đôi lúc logic đơn giản mình cũng tự implement cho mình một hàm như trên vừa tiện vừa đỡ phải dùng nhiều Library.

Composition
----------

Composition là một kỹ thuật trong đó kết quả của một function được chuyển sang function tiếp theo, function này lại được chuyển sang function tiếp theo, v.v.… cho đến khi function cuối cùng được thực thi và kết quả được tính toán. Các **Compositions function** có thể bao gồm bất kỳ số lượng function nào.

Composition cũng giúp chia các function thành các function nhỏ hơn có thể tái sử dụng, chịu trách nhiệm xử lý 1 logic duy nhất. (Chia để trị quá hợp lý đúng ko nào :D).

```javascript
// Compose function
const compose = (...fns) => x => fns.reduce((y, f) => f(y), x); 

// Functions
const addFee = amount => amount + 2;
const addDiscount = amount => amount - 5;

// Function composition
const composition = compose(addFee, addDiscount)(100);
```

[Ramda](https://ramdajs.com) cũng có các API dành cho `Composition function` với [Pipe](https://ramdajs.com/docs/#pipe) và [Compose](https://ramdajs.com/docs/#compose) .

Closures
--------

Closures là một hàm duy trì quyền truy cập vào các biến số và đối số (phạm vi) của hàm bên ngoài, ngay cả sau khi hàm bên ngoài đã thực thi xong. Closures rất hữu ích để ẩn chi tiết `implement` trong JavaScript. Nói cách khác, có thể hữu ích khi tạo các biến hoặc hàm riêng như sau: (Nó cũng gần gần như tính bao đóng của OOP vậy đó)

```javascript
function counter() {
  let count = 0;

  function increment() {
    return count += 1;
  };

  return increment;
}

const generateId = counter();

generateId(); // 1
generateId(); // 2
generateId(); // 3
```

Toán tử Nullish ??
---------------------------

Toán tử `nullish` là một cách để có thể nhanh chóng áp dụng giá trị mặc định nếu toán hạng bên trái là `null` hoặc không xác định. Điều này đặc biệt hữu ích trong trường hợp bạn muốn chấp nhận tất cả các `falsy values` khác với `null` và `undefined`. Hoặc trong trường hợp bạn muốn áp dụng các `falsy values` làm mặc định.

```javascript
// Falsy values
const value = 0 ?? 100; // = 0
const value = false ?? true; // = false


// Default values
const value = null ?? 100; // = 100
const value = undefined ?? 100 // = 100;
```

Reflect API
------------

**Reflect** về mặt lập trình điều đó có nghĩa là một chương trình có thể tự kiểm tra bằng cách nội suy và thao tác với các cấu trúc của chính nó. **Reflect API** cung cấp một tập hợp các hàm hữu ích cho cả việc nội suy và thao tác thông qua các hàm tĩnh trong **Reflect API**.

```javascript
const person = { 
  name: 'Bob', 
  [Symbol('email')]: 'bob@evil.com' 
};

Reflect.get(person, 'name'); // = Bob
Reflect.has(person, 'email'); // = true
Reflect.has(person, 'phone'); // = false
Reflect.getPrototypeOf(person); // = { constructor ... }
Reflect.getOwnPropertyDescriptor( person, 'name'); // = { value: 'Bob', writable: true, enumerable: true, configurable: true }
Reflect.ownKeys(person); // name, Symbol(email)

Reflect.defineProperty(person, 'phone', { writable: true });
Reflect.has(person, 'phone'); // = true
Reflect.set(person, 'phone', '123456789');

Reflect.deleteProperty(person, 'phone');
Reflect.has(person, 'phone'); // = false
```

Còn nhiều điều nữa mà bạn có thể đọc chi tiết [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) .

Roundup
------------

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----------
* https://tuan200tokyo.blogspot.com/2022/11/blog38-5-khai-niem-javascript-nang-cao.html