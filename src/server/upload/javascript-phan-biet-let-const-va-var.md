# Giới thiệu
Javascript 2015 (ES6) ra mắt kèm theo rất nhiều tính năng giúp chúng ta viết code một cách gọn gàng, sạch đẹp hơn, dễ dàng đọc hơn. Một số chức năng tiêu biểu như: `let`, `const`, `arrow function`, `promises`, ... Trong bài viết này chúng ta sẽ tìm hiểu về `let` và `const` phục vụ trong việc khai báo dữ liệu trong JS. Sự khác biệt của `let`, `const` và `var`.

# Sự khác biệt

### Hoisting
Trước tiên ta sẽ tìm hiểu xem `hoisting` là gì trước khi phân biệt `let`, `const` và `var`. Giải thích một cách dễ hiểu thì `hoisting` là việc di chuyển các khai báo lên đầu để thục thi code của JS. Vậy `let`, `const`, `var` có hoisting khác nhau như thế nào?. Ta xét ví dụ sau:

```
// index.js

console.log(foo);
console.log(bar);
console.log(mickey);

var foo = 'Hi';
let bar = 'Hello';
const mickey = 'kimsohyun';
```

Trong file `index.js` ta tiến hành log ra giá trị của biến `foo, bar, mickey` trước khi chúng được khai báo. Khi ta chạy file `index.js` thì ta sẽ có kết quả như sau.

![](https://images.viblo.asia/d745ece9-bfaf-4441-a031-187a26a8c877.png)

Trong lần chạy đầu tiên sau khi `compiled` ta thấy `terminal` in ra `undefined` và một lỗi `ReferenceError: bar is not defined`. Sau đó mình có xóa dòng `console.log(bar)` đẻ tiến hành chạy lại thì thấy `terminal` tiếp tục in ra `undefined` và lõi `ReferenceError: mickey is not defined`. Qua ví dụ ta dễ dàng nhân thấy `var` có `hoisting`, `let`, `const` không có `hoisting`, nhưng sự thật không phải như vậy. **Tất cả các khai báo(function, let, const, var) trong Javascript đều được hoisted**. Sự khác biệt ở đây là `var` khi `hoisting` thì được khởi tạo là giá trị `undefined` còn `const` và `let` thì không.

Ta có sau khi `hoisting` thì `var` sẽ kiểu như sau.
```
var foo;

console.log(foo);

foo = 'Hi';
```

### Scope
`Scope` hiểu một cách đơn giản là phạm vi sử dụng của một biến. Ta xét ví dụ sau:
```
if (true) {
    var foo = "foo!";
}

console.log(foo);

(function() {
    var bar = "bar!";
})();

console.log(bar);
```

Output sẽ như sau:
![](https://images.viblo.asia/22a08c06-3357-466c-8d26-592e812dee7e.png)

Ta có thể thấy khi `compiled` thì biến `foo` được khai báo trong `if` còn biến `bar` được khai báo trong một hàm. Ta có kết quả in ra được biến `foo` nhưng đến `bar` lại báo một lỗi `ReferenceError`. Như vậy biến `var` khi khái báo trong mệnh đề `if` (block scope) sẽ có scope là `global` nên ta có thể truy cập vào biến đó ở ngoài của mệnh đề `if`, còn khi sử dụng trong hàm(function) thì sẽ có scope là `function scope/local scope` nên khi truy cập vào biến đó ở ngoài sẽ lỗi ta chỉ có thể truy cập vào biến đó ở trong `scope` đó. Biến `let`, `const` khi làm tương tự như ví dụ kia ta có kết quả cả hai trường hợp đều có lỗi. Như vậy ta tiếp tục có kết luận biến `let`, `const` sẽ là `block scope` khi ta tiến hành acess vào biến ở ngoài scope thì sẽ không sử dụng được.
```
if (true) {
    let foo = "foo!";
    if (true) {
        let foo = "foo! scoped";
        console.log(foo);
    }
}
```
Output: 
```
foo! scoped
```
Khi biến được khai báo khác `scope` nhau ta hoàn toàn có thể để trùng tên khi sử dụng sẽ ưu tiên biến ở `scope` gần nhất. Ví dụ trên ta có thể làm tương tự với `const`.

### Assignment
Ta xét ví dụ
```
var foo = 'Hi';
let bar = 'Hello';
const mickey = 'kimsohyun';

var foo = 'Hi 2';
let bar = 'Hello 2';
const mickey = 'kimsohyun 2';
```
Output:
![](https://images.viblo.asia/b65ec0fc-5cee-46f6-bf90-e6f582d57596.png)

Qua ví dụ trên ta thấy `var` có thể tiến hành khai báo lại biến nhưng còn `let` và `const` thì ta không thể tiến hành khai báo lại.

Xét tiếp ví dụ:
```
var foo;
let bar;
console.log(foo, bar);
```
Output:
```
undefined undefined
```
Ta thấy đối với `var`, `let` ta có thể tiến hành khai báo mà chưa gán giá trị. Nhưng nếu ta khai báo biến `const` mà không gán giá trị cho nó thì sao? Sau khi thử ta có kết quả nó sẽ báo một lỗi `SyntaxError: Missing initializer in const declaration` => Khi khai báo với `const` ta phải gán giá trị cho nó.

Thêm nữa khi xét biến `const` ta có thể hiểu nó là hằng số. Nên khi ta cố tình thay đổi bién được khai báo với từ khóa `const` thì ta sẽ gặp một lỗi `TypeError: Assigment to constant varibale`. Ta không thể sử dụng toán tử gán (`=`) tới lần thứ 2 với biến `const` còn đối với `let` và `var` ta có thể sử dụng thoải mái. Các bạn có thể kiểm tra với ví dụ bên dưới bằng cách thay `const` -> `var` hoặc `let`
```
const foo = 123;

foo = 321;

console.log(foo);
```

Còn một trường hợp mọi người hay mắc sai làm về `const` như sau:
```
const obj = {
    name: 'foo'
};

obj.name = 'bar';
console.log(obj.name);
```

Khi chạy code ta có thể thấy log ra chữ bar nhưng nhiều người hay nhầm lẫn là lỗi vì gán lần thứ 2 cho biến `const`. Ta không thể sử dụng toán tử gán thứ 2 với biến là `const` ở đây ta chỉ gán lại một thuộc tính của `obj` chứ ta không gán lại `obj`.

# Tổng kết
Sau khi xét qua các ví dụ ta sẽ tổng kết lại sự khác biệt của ba biến `let, const, var` một chút như sau:

![](https://images.viblo.asia/cb582798-fddf-4af3-ae7e-ded31585327e.png)

Để hiểu kỹ hơn về nó các bạn nên nghiên cứu kỹ các ví dụ mà mình đưa ra giúp hiểu hơn về `let, const, var`. Đây là bài viết đầu tiền trong series cùng tìm hiểu về ECMAScript - ES6 của mình mong các bạn ủng hộ.

# Tham khảo

https://www.valentinog.com/blog/var/