Thông thường, các toán tử và các hàm sẽ tự động chuyển đổi kiểu của giá trị về đúng.

Ví dụ như: `alert` sẽ tự động chuyển bất kỳ kiểu dữ liệu nào về `string` để hiển thị chúng, các toán tử toán học sẽ tự động chuyển về kiểu `number` để thực hiện tính toán.

Tuy nhiên trong nhiều trường hợp chúng ta muốn chuyển đổi kiểu về kiểu dữ liệu mà chúng ta mong muốn. Trong bài này chúng ta sẽ tìm hiểu về các cách thay đổi kiểu dữ liệu.

## String Conversion
#### 1. String()

Khi chúng ta cần chuyển đổi kiểu của một `value` sang `string` chúng ta có thể sử dụng `String()`:

```js
var x = 15;
var y = String(x);
alert(typeof(y)); // string

//Hoặc khi ta có 1 mảng

var a = [1, 2, 3];
var b = String(a);
alert(b); // 1,2,3
alert(typeof(b)); // string

//Tuy nhiên khi ta áp dụng với Object
var obj = {1: 'a', 2: 'b'};
var objToString = String(obj);
alert(objToString); // [object Object]
```

#### 2. toString()
Ngoài việc sử dụng `String()` thì chúng ta có vẻ quen thuộc hơn với `toString()`, nó cũng sẽ ép kiểu các giá trị về `string`:
```js
var x = 15;
var y = x.toString();
alert(typeof(y)); // string

//Hoặc khi ta có 1 mảng

var a = [1, 2, 3];
var b = a.toString();
alert(b); // 1,2,3
alert(typeof(b)); // string

//Và áp dụng với Object cũng chưa ra được kq mong muốn
var obj = {1: 'a', 2: 'b'};
var objToString = obj.toString();
alert(objToString); // [object Object]
```

#### 3. Sử dụng toán tử cộng "+"
Khi sử dụng toán tử, chúng ta đặc biệt phải lưu ý đến toán tử `+` khi toán hạng có kiểu `string`.
Khi chúng ta sử dụng toán tử `+` mà một trong các toán hạng có kiểu là `string` thì Javascript sẽ cố gắng ép kiểu của toán hạng còn lại về kiểu `string`. Hãy cùng xem ví dụ dưới đây:
```js
// Trong trường hợp có 2 toán hạng, 1 trong 2 toán hạng có kiểu là "string" 
// thì JS sẽ ép kiểu của toán hạng còn lại về "string"
alert("1" + 1); // "11"
alert(1 + "1"); // "11"

// Trong trường hợp có nhiều hơn 2 toán hạng và 1 trong các toán hạng có kiểu là "string"
// thì tùy vào vị trí của toán hạng kiểu "string" mà ta có các kq khác nhau.

alert(1 + 2 + "string" + 3 + 4); // "3string34"
alert(1 + "string" + 2 + 3 + 4); // "1string234"
alert(1 + 2 + 3 + 4 + "string"); // "10string"

// Chúng ta sẽ chuyển đổi kiểu như thế nào?
var x = 15;
var y = "" + 15;
alert(y); // "15"
```

## Numeric Conversion
#### 1. Number()
Khi chúng ta muốn chuyển đổi từ một giá trị khác sang giá trị kiểu `number`, chúng ta có thể sử dụng `Number()`:
```js
var x = "123";
var y = Number(x);
alert(y); // 123

// Hoặc với các giá trị true/false
var a = Number(true);
alert(a); // 1
// còn Number(false), Number(''), Number([]) hoặc Number(null) sẽ trả về 0

// Khi chúng ta truyền vào Number() một string không phải chứa toàn là số
// thì sẽ trả về NaN: Not a Number

var string = "string";
var toNumber = Number(string);
alert(toNumber); // NaN
// Ngoài ra khi truyền vào Object, undefined
//hoặc array có length > 2 hoặc có 1 giá trị nhưng không phải number hoặc string là số thì cũng trả về NaN
```
#### 2. parseInt()/parseFloat()
* parseInt() sẽ chuyển đổi kiểu của một `string` về kiểu `number` nhưng ở dạng interger (số nguyên)

    parseInt() sẽ trả về các số nằm đầu tiên trong giá trị `string` đó, nếu chuỗi đó không thể chuyển thành `number` thì nó sẽ trả về NaN. Cùng xét ví dụ sau:
```js
var a = parseInt(true); // NaN
var b = parseInt("10.00"); // 10
var c = parseInt("10.33"); // 10
var d = parseInt("34 45 66"); // 34
var e = parseInt("   60   "); // 60
var f = parseInt("40 years"); // 40
var g = parseInt("He was 40"); // NaN
```

* parseFloat() sẽ chuyển đổi kiểu của một `string` về kiểu `number` nhưng ở dạng float (số thực)

    parseFloat() cũng gần giống như parseInt(). Cùng xét ví dụ sau:
```js
var a = parseInt(true); // NaN
var a = parseFloat("10"); // 10
var b = parseFloat("10.00"); // 10
var c = parseFloat("10.33"); // 10.33
var d = parseFloat("34 45 66"); // 34
var e = parseFloat("   60   "); // 60
var f = parseFloat("40 years"); // 40
var g = parseFloat("He was 40"); // NaN
```

#### 3.  Sử dụng toán tử "+"
Tại sao vừa rồi ở trên chúng ta nói đến việc sử dụng `+` để chuyển kiểu về `string` mà dưới đây chúng ta lại dùng nó để chuyển kiểu về `number`. Chúng ta cùng xem ví dụ dưới đây:
```js
var x = "15";
var y = +x;
alert(y); // 15
alert(typeof(y)); // number
```
Khi chúng ta thêm `+` và trước giá trị thì nó sẽ chuyển đổi về kiểu `number` không giống như khi chúng ta sử dụng `+` trong một phép toán.

Và nó cũng trả về các kết quả giống như sử dụng `Number()` trong các trường hợp cụ thể:
```js
var a = +false; // 0 === +"", +[], +null
var b = +true; // 1
var c = +"123"; // 123
var d = +"abc"; // NaN
var e = +[1]; // 1 === +["1"]
var f = +["a"]; // NaN
var g = +{}; // NaN
```
Ngoài ra, khi chúng ta tính toán sử dụng các toán tử `-, *, /, %, **` thì Javascript cũng sẽ cố gắng chuyển đổi kiểu các toàn hạng về `number`.

## Boolean Conversion
Thường khi viết code Javascript chúng ta ít khi ép kiểu các giá trị về kiểu `Boolean` mà thường để tự Javascript ngầm ép kiểu, ví dụ như sau:
```js
var x = "string";
if(x) {
    alert(true);
} else {
    alert(false);
}
//KQ: true
```
Ở đoạn code trên, chúng ta có thể thấy Javascript đã tự động ngầm ép kiểu của `x` trong `if` về `Boolean` để chạy câu lệnh `if`.

Tuy nhiên, nhiều trường hợp chúng ta muốn lấy giá trị kiểu `Boolean` của nó để có thể **strict equal** hoặc cần hàm trả về `true` hoặc `false` thì chúng ta sẽ sử dụng `Boolean()`:
```js
var x = Boolean(1);
alert(x); // true
```

Các giá trị khi ép kiểu sang `Boolean` trả về `false`: `0, '', false, null, undefined, NaN`. Các giá trị này cũng được gọi là các **falsy value** trong Javascript.

Ngoài các giá trị ở trên thì các giá trị còn lại đều trả về `true`.

## Object Conversion
Như chúng ta đã tìm hiểu ở trên thì khi chuyển đổi kiểu từ `object` sang các kiểu khác như:
- `string`: `[object Object]`
- `number`: `NaN`
- `boolean`: `true`

Vậy chúng ta phải làm thế nào để chuyển đổi kiểu từ `object` sang các kiểu dữ liệu nguyên thủy theo cách mà chúng ta mong muốn nhất.

Khi chúng ta ép kiểu một object về `string` hoặc `number` thì Javascript sẽ cố gắng tìm và gọi 3 object methods như sau:

1. Gọi `obj[Symbol.toPrimitive](hint)` - với key tượng trưng là `Symbol.toPrimitive`, nếu method này tồn tại.
2. Dựa vào *hint* , nếu là **string** thì nó sẽ cố gọi đến method `obj.toString()` trước và `obj.valueOf()` sau nếu `obj.toString()` không tồn tại.
3. Nếu *hint* là **number** thì nó sẽ cố gọi đến  `obj.valueOf()` trước và `obj.toString()` sau.

#### Symbol.toPrimitive

Hãy cùng xét ví dụ:
```js
var obj = {
  name: 'John Doe',
  age: 53,
  
  [Symbol.toPrimitive](hint) {
    return hint == "string" ? `${this.name}` : this.age;
  }
}

alert(String(obj)); // "John Doe"
alert(Number(obj)); // 53
```

`Symbol.toPrimitive` sẽ cho phép chúng ta quy định giá trị trả về thông qua *hint*.
{@embed: https://codepen.io/numberboo/pen/bGNvPab}

#### toString/valueOf
Methods `toString` và `valueOf` là 2 method cũ, nếu không tìm thấy `Symbol.toPrimitive` thì Javascript sẽ cố gắng gọi đến chúng theo thứ tự:
* `toString` rồi đến `valueOf` nếu *hint* là **string**
* `valueOf` rồi đên `toString` nếu *hint* khác **string**

Theo mặc định, đối với một object đơn giản:
* `toString` method trả về một string: `"[object Object]"`.
* `valueOf` method trả về chính object đó.
```js
var user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Vậy chúng ta muốn giá trị trả về là giá trị mà chúng ta mong muốn giống như sử dụng `Symbol.toPrimitive` thì chúng ta sẽ cần sử dụng kết hợp `toString` và `valueOf` như sau:
```js
var obj = {
  name: 'John Doe',
  age: 53,
  
  toString() {
    return this.name;
  },

  valueOf() {
    return this.age;
  }
}
```
{@embed: https://codepen.io/numberboo/pen/povLXYR}

## Lời kết
Vậy là chúng ta đã tìm hiểu qua về các cách thay đổi kiểu dữ liệu trong Javascript. Vì kiến thức là vô tận nên trong bài không thể tránh khỏi những thiếu sót cũng như nhầm lẫn, mong mọi người thông cảm là nếu góp ý bên dưới để mình có thể đưa ra nhưng bài viết có chất lượng hơn.

Xin cảm ơn mọi người đã đọc bài viết.

## References
https://javascript.info/type-conversions

https://javascript.info/operators

[https://javascript.info/object-toprimitive](https://javascript.info/object-toprimitive)