Mọi người thường cho rằng JavaScript là một ngôn ngữ dễ học, dễ nắm bắt do đó mà mọi công nghệ liên quan đến web đều sử dụng JavaScript ở phía client. Tuy nhiên với các công nghệ mới như Node.js, JavaScript đã trở thành một ngôn ngữ backend mạnh mẽ hơn bao giờ hết. Trên thực tế, rất nhiều Dev đã có thể xây dựng 1 ứng dụng full stack chỉ sử dụng JavaScript, ví dụ như `MEAN Stack` hay `MERN Stack`.

Tuy nhiên, cũng như các ngôn ngữ lập trình khác, JavaScript có những sắc thái riêng của nó. Việc hiểu rõ các sắc thái này chính là ranh giới giữa một lập-trình-viên-biết-JavaScript và một lập-trình-viên-JavaScript. Bài viết này của mình nhằm giới thiệu cho các bạn một vài điểm khá thú vị của JavaScript để bạn có thể tránh các lỗi thường gặp trong tương lai cũng như là hiểu hơn về một số concept thường bị hiểu nhầm của ngôn ngữ thú vị này.
* * *
### Trong JavaScript, Key của Object luôn là string
Xem trong ví dụ sau, theo bạn đoạn code sau sẽ log gì vào console? 

```javascript
var foo = new Object();
var bar = new Object();
var map = new Object();

map[foo] = "foo";
map[bar] = "bar";

console.log(map[foo]);
```

Nếu bạn trả lời là `"foo"` thì bạn đã gặp một trong những lỗi sai thường gặp nhất trong JavaScript. Đúng vậy, trong JS, mọi key của object đều được lưu dưới dạng string. Ngắn gọn, dễ hiểu đúng không, nhưng khá ngạc nhiên rằng khi một object không phải là string được sử dụng như một key thì không hề có lỗi báo ra. Bởi vì *JavaScript tự động chuyển object đó về dạng string và dùng string đó làm key thay vì object ban đầu.*

Ở ví dụ trên, khi `foo` và `bar` được dùng làm key cho `map`, chúng được chuyển về thành string bằng cách sử dụng hàm `toString()` tương ứng. Thú vị ở chỗ, `foo.toString()` và `bar.toString()` không trả về `"foo"` hay `"bar"` mà là `"[object Object]"`. Qua đó, ví dụ trên có thể hiểu như sau:

```javascript
var foo = new Object();
var bar = new Object();
var map = new Object();

map["[object Object]"] = "foo";
map["[object Object]"] = "bar";

console.log(map["[object Object]"]); // "bar"
```

Vì `map[bar] = "bar"` đã ghi đè lên `map[foo] = "foo"` ở dòng trước.

Một ví dụ khác: 

```javascript
var a = {};
var b = {key: "b"};
var c = {key: "c"};
a[b] = 123;
a[c] = 456;
console.log(a[b]); // logs 456
```

### Hoisting
Có điểm gì khác biệt giữa hai cách khai báo function sau không ?
```javascript
var foo = function(){}
```

và

```javascript
function foo(){}
```

Câu trả lời là có.

Khi function statement (`function foo(){}`) được dùng, function `foo` đã có thể được tham chiếu tới trước khi nó được khai báo. Việc này được gọi là `Hoisting` khi tất cả các việc khai báo biến được đẩy lên chạy đầu tiên trong scope hiện tại. Khi một fucntion được "hoist", khai báo cuối cùng của function đó chính là thứ được dùng và chạy, bất kể thời điểm được tham chiếu.

Ngược lại, khi sử dụng function expression (`var foo = function(){}`), nó có thể không được tham chiếu trước khi khai báo, giống như tất cả các biểu thức gán khác. Bởi vì vậy, lần khai báo hàm gần nhất sẽ được sử dụng.

Ví dụ nha:
```javascript
function foo() { return 1; }
alert(foo());   // what will this alert?
function foo() { return 2; }
```

Nhiều người sẽ trả lời rằng đoạn code trên sẽ alert `1` nhưng đáp án đúng là `2`. Như đã giới thiệu ở trên, đó là do `hoisting` cho dù nó được viết bên dưới câu gọi hàm.

Ví dụ nữa nè.

```javascript
var foo = function() { return 1; }
alert(foo());   // what will this alert?
foo = function() { return 2; }
```

Đoạn này sẽ alert ra `1` vì  sử  dụng function expression. Lần khai báo gần nhất sẽ được lấy để chạy.

Vậy thì khi nào nên dùng Hoisting và khi nào thì không ?

Còn tùy vào cách viết code và cách xây dụng cấu trúc code của bạn. Về cơ bản thì bạn nên khai báo toàn bộ biến ở đầu function để tránh vấn đề hoisting khiến code khó đọc và có thể trả về kết quả khó hiểu.

### `null` là một Object
Làm thế nào để bạn có thể biết được rằng `bar` là một object ?

Bạn có thể dùng 1 operator có sẵn là `typeof` và dùng theo kiểu `typeof bar === "object"`. Nhưng cẩn thận nha! mặc dù đây là một cách thông thường để kiểm tra kiểu dữ liệu, nhưng một ngoại lệ khá dễ quên đó là trong JS, `null` cũng là một object. Đây là một bug có từ phiên bản đầu tiên của JS và không thể sửa được vì điều này sẽ phá vỡ mọi thứ.

Nếu bạn đã để ý điều này thì đây là việc bạn nên làm để check:

```javascript
(bar !== null) && (typeof bar === "object");
```

### Tự động thêm dấu chấm phẩy
Hai đoạn code sau có trả về cùng một giá trị không ?

```javascript
function foo1() {
  return {
    bar: "hello"
  };
}
function foo2() {
  return
  {
    bar: "hello"
  };
}
```

Ngạc nhiên là chúng không hề trả về giống nhau

```javascript
foo1(); // return Object {bar: "hello"}
foo2(); // return undefined
```

Lý do cho việc này là dấu chấm phẩy hoàn toàn không bắt buộc trong JS (mặc dù bạn không nên bỏ). Kết quả là dòng chứa câu `return` ở ví dụ trên sẽ được tự động thêm vào cuối câu. Do đó mà hàm `foo2()` sẽ trả về `undefined`.

Có hai cách viết code mà mình nhận thấy các bạn sinh viên hay viết và tranh cãi rằng cái nào viết đẹp hơn, viết dễ đọc hơn. Đó là:

```javascript
function foo1()
{
    //code
}

function foo2() {
    //code
}
```

Do đặc tính này của JS nên các bạn hay viết code theo kiểu `foo1()` sẽ gặp lỗi và phải thay đổi lại cách viết theo kiểu thứ 2.

### typeof NaN là một number

Một đặc tính khá dị của JS nữa. `NaN` biểu thị một giá trị không phải là một số. Đây thường là kết quả trả về khi bạn thực hiện một phép toán với một toán hạng không phải là số. (vd: `"a" + 1`).

Dù `NaN` có nghĩa là không phải là số ("Not a Number"), thì khá dị khi kiểu dữ liệu của nó lại là một `Number`:

```javascript
console.log(typeof NaN === "number");  // "true"
```

Thêm vào đó, `NaN` so sánh với mọi thứ (kể cả với chính nó) đều là `false`:
```javascript
console.log(NaN === NaN);  // "false"
```

Để kiểm tra xem 1 số có bằng `NaN` hay không thì bạn có thể dùng `value !== value`, vì chỉ khi nào value có giá trị là `NaN` thì điều kiện này mới trả về `true`. Thêm vào đó, ES6 mới cung cấp hàm `Number.isNaN()` để xem rằng value được truyền vào có phải là `NaN` và kiểu dữ liệu là `Number` hay không. Đây là một phiên bản khá kì lạ của hàm gốc `isNaN()`.

### Các số trong JS đều được áp dụng dấu phẩy động

Kết quả của đoạn code sau là gì? 

```javascript
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

Số trong JS đều được áp dụng dấu phẩy động, cho nên nó có thể không giữ đúng giá trị mong muốn. Kết quả của đoạn trên như sau:

```javascript
0.30000000000000004
false
```

Do đó, bạn nên luôn cẩn trọng với các con số trong JS.

***

Cảm ơn các bạn đã đọc.