JavaScript có các liệu nguyên thủy (`primitives`), đối tượng (`object`) và các hàm (`function`). Tất cả bọn chúng đều được coi là 1 `object`, kể cả giá trị nguyên thủy

## Primitives
*Giá trị nguyên thủy*

Trong JavaScript, `Number`, `boolean`, `string`, `undefined` and `null` là các giá trị nguyên thủy

### Number
Chỉ có 1 kiểu số trong JavaScript, đó là `64-bit binary floating point` (dấu phẩy động nhị phân 64 bit).

Như các bạn đã biết kết quả của phép tính `0.1 + 0.2` không bằng `0.3` (các bạn thử bật `console` lên và gõ `0.1 + 0.2 == 0.3` xem). Tuy nhiên, đối với số nguyên toán học thì `1+2 === 3`.

Numbers kế thừa các phương thức từ đối tượng Number.prototype. Các phương thức có thể được gọi trên các số như ở dưới:
```js
(123).toString();  //"123"
(1.23).toFixed(1); //"1.2"
```

Có các hàm sau cho phép chuyển đổi kiểu `string` sang `number` là `Number.parseInt()`, `Number.parseFloat()` và `Number()`:

```js
Number.parseInt("1")       //1
Number.parseInt("text")    //NaN
Number.parseFloat("1.234") //1.234
Number("1")                //1
Number("1.234")            //1.234
```

Các phép tính không hợp lệ hay các phương thức chuyển đổi không hợp lẽ sẽ không tạo ra ngoại lệ (`exception`) mà nó sẽ trả về giá trị `NaN` (not a number). `Number.isNaN()` có thể nhận biết một giá trị là `NaN` hay không.

Phép toán `+` có thể là `cộng` cũng có thể là `ghép` (chuỗi)
```js
1 + 1      //2
"1" + "1"  //"11"
1 + "1"    //"11"
```

### String
Một `string` chứa một danh sách các kí tự `Unicode`. Một string có thể được đặt trong `""` hoặc trong `''`.

`String` kế thừa các phương thức tử `String.prototype`. Chúng có các phương thức như: `substring()`, `indexOf()` và `concat()`.

```js
"text".substring(1,3) //"ex"
"text".indexOf('x')   //2
"text".concat(" end") //"text end"
```

`String`, giống như các dữ liệu nguyên thủy, là bất biến (`immutable`). Ví dụ, phương thức `concat()` không tác động trực tiếp lên string mà chúng sẽ tạo ra 1 string mới.

### Boolean

Kiểu dữ liệu `boolean` có 2 giá trị là `true` và `false`.

`false`, `null`, `undefined`, `''` (empty string), `0` and `NaN` là `false`. Tất cả các giá trị khác, bao gồm cả object, đều là `true`. Ví dụ:

```js
let text = '';
if (text) {
  console.log("This is true");
} else {
  console.log("This is false");
}
```

## Variables
Các biến có thể được khai báo bằng cách sử dụng `var`, `let` và `const`.

`var` khai báo và khởi tạo một biến tùy ý. Các biến được khai báo với `var` có phạm vi hàm. Chúng được coi như khai báo ở đầu hàm. Nó được gọi là `variable hoisting`.

Khai báo `let` có phạm vi khối (`block scope`).

Giá trị của một biến không được khởi tạo là `undefined`.

A variable declared with `const` cannot be reassigned. Its value, however, can still be `mutable`. const freezes the variable, `Object.freeze()` freezes the object. The const declaration has a block scope.

Một biến được khai báo với `const` không thể được gán lại. Giá trị của nó, tuy nhiên, vẫn có thể thay đổi. Khai báo `const` có phạm vi khối (block scope).

## Objects
Một đối tượng (object) một tập hợp các thuộc tính động.

Khóa thuộc tính là một chuỗi duy nhất. Khi một chuỗi không được sử dụng làm khóa thuộc tính, nó sẽ được chuyển đổi thành một chuỗi. Giá trị thuộc tính có thể là nguyên thủy, đối tượng hoặc hàm.

The property key is a unique string. When a non string is used as the property key, it will be converted to a string. The property value can be a primitive, object, or function.

Mỗi thuộc tính có 1 key, là một chuỗi duy nhất trong object.  Giá trị thuộc tính có thể là nguyên thủy, đối tượng hoặc hàm.

Ví dụ khai báo 1 object:
```js
let obj = {
  message : "A message",
  doSomething : function() {}
}
```

Có 2 các để truy cập vào 1 thuộc tính: sử dụng `.` (dot notation) hoặc `[]` (bracket notation). Chúng ta có thể đọc, thêm, sửa và xóa một thuộc tính của 1 object bất cứ lúc nào.

- get: `object.name, object[expression]`
- set: `object.name = value`, `object[expression] = value`
- delete: `delete object.name`, `delete object[expression]`

```js
let obj = {}; //create empty object
obj.message = "A message"; //add property
obj.message = "A new message"; //edit property
delete obj.message; //delete property
```

Object có thể sử dụng như `map`. Một `map` đơn giản có thể tạo bằng cách sử dụng `Object.create(null)`:
```js
let french = Object.create(null);
french["yes"] = "oui";
french["no"]  = "non";
french["yes"];//"oui"
```

Tất cả các thuộc tính của object là public. `Object.keys()` có thể sử dụng để duyệt qua tất cả các thuộc tính của object.
```js
function logProperty(name) {
  console.log(name); //property name
  console.log(obj[name]); //property value
}

Object.keys(obj).forEach(logProperty);
```

`Object.assign()` sẽ `copy` tất cả các thuộc tính có trong `object` sang một `object` khác. Một object có thể `clone` bằng cách `copy` tất cả các thuộc tính có trong `object` sang một `object` rỗng:

```js
let book = { title: "The good parts" };
let clone = Object.assign({}, book);
```

Một đối tượng bất biến là một đối tượng mà một khi được tạo ra không thể thay đổi. Nếu bạn muốn làm cho đối tượng bất biến, hãy sử dụng `Object.freeze()`.

### Primitives vs Objects
Kiểu dữ liệu nguyên thủy (trừ `null` và `undefined`) đều được coi là object theo nghĩa chúng có các phương thức nhưng chúng không phải là object.

Các kiểu dữ liệu nguyên thủy là `immutable` còn các object là `mutable`.