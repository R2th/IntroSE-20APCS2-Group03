Biểu thức điều kiện là một trong những khía cạnh rất quan trong trong mọi ngôn ngữ lập trình. Chúng ta đã quen với các mệnh đề điều kiện như `if..elif..else` hay `switch`. Chúng là những cú pháp hữu dụng để tạo ra những quyết định trong lập trình.

Bài viết này sẽ tập trung vào các biểu thức điều kiện trong Javascript và cách sử dụng chúng một cách ngắn gọn so với các mệnh đề điều kiện.
 
# Biểu thức và Mệnh đề (Expressions vs Statements)
Trước khi đi vào nội dung chính, chúng ta cần phân biệt giữa biểu thức và mệnh đề trong Javascript. Nếu coi Javascript là một ngôn ngữ có ngữ pháp thì biểu thức chính là cụm từ, trong khi đó mệnh đề là một câu hoàn chỉnh.

Biểu thức có thể là bất kỳ thể hiện nào mà Javascript engine có thể tính toán và trả về một giá trị. Chẳng hạn như: thể hiện của biến, phép gán, biểu thức hàm, phép logic, toán tử bitwise, phép truy cập thuộc tính của đối tượng, lời gọi hàm, eval, ....

Đoạn code dưới đây chỉ ra một số biểu thức Javascript:
```javascript
// number literal
0xFF

// array literal
[]

// object literal
{}

// regexp literal
/^\d+$/

// logical AND operation
(x && y)

// bitwise XOR operation
(x ^ y)

// ternary operation
(x ? y : z)

// arithmetic operation
(x + y) / z

// assignment
x = 'string'

// function expression
(function x(y) {})

// function invocation
x(100)

// object property access
obj.students[0].name
```

Mệnh đề là bất kỳ thể hiện hay câu lệnh nào mà Javascript engine có thể thực thi để chạy chương trình hoặc gây ra những tác động kèm theo khác. Ví dụ: mệnh đề điều kiện, khai báo biến hoặc hàm, vòng lặp, throw, return, try/catch/finally, ...

Một số biểu thức Javascript như phép gán và lời gọi hàm có thể gây ra những tác động kèm theo. Do đó, chúng lại được coi là một mệnh đề (mệnh đề biểu thức).

# Phép điều kiện và giá trị kiểu boolean

Trong Javascript, phép điều kiện có thể là bất kỳ biểu thức hợp lệ nào. Thông thường, biểu thức điều kiện sẽ được tính toán để trả về một trong hai giá trị kiểu booleans: `true` hoặc `false`

Việc hiểu đúng cách mà Javascript engine chuyển đổi biểu thức điều kiện về giá trị boolean là điều cần thiết để viết các phép logic điều kiện một cách chính xác và khả dự.

Hai khái niệm cơ bản có thể hiểu về phép chuyển đổi này:

- Xác định giá trị *truthy* and *falsy*
- Hiểu về phép logic short-circuiting

## Truthy vs Falsy

Mọi giá trị trong Javascript đều có thể phân loại thành *truthy* hay *falsy*. Những giá trị sau được coi là *falsy* trong Javascript.
+ `''` hoặc `""` hoặc ` `` `  (chuỗi rỗng)
+ `0` hoặc `-0` (số `0`)
+ `null`
+ `undefined`
+ `NaN`
+ `false`

Những giá trị khác các giá trị trên sẽ được coi là *truthy*. Các giá trị *truthy* sẽ được ép kiểu ngầm định thành giá trị `true`. Trong khi giá trị *falsy* sẽ trả về giá trị `false`.

Tuy nhiên, việc chuyển đổi này có thể được khai báo tường minh nhờ hàm Boolean.
```javascript
function toBoolean(value) {
  return Boolean(value);
}
```

Ngoài ra, toán tử logic NOT (`!`) cũng chuyển đổi một giá trị về kiểu boolean. Toán tử `!` chuyển đổi toán hạng của nó thành giá trị phủ định ở kiểu boolean. Do đó, giá trị này luôn là giá trị boolean.

Sử dụng toán tử `!`  sẽ trả về `false` trên những giá trị *truthy* và `true` trên những giá trị *falsy*. Để chuyển về giá trị boolean tương ứng, chúng ta cần sử dụng `!` hai lần.

```javascript
function toBoolean(value) {
  return !!value;
}
```

## Short-Circuiting (Mạch chập)

Toán tử **AND** (`&&`) và **OR** (`||`) đều yêu cầu hai toán hạng và được sử dụng để thực hiện phép toán Boolean trên những toán hạng này.

Cho hai toán hạng kiểu boolean (`true` hoặc `false`)

- `&&` chỉ trả về `true` nếu cả hai toán hạng có giá trị kiểu boolean là `true`, nếu không nó sẽ trả về `fasle`.
- `||` chỉ trả về `false` nếu cả hai toán hạng có giá trị kiểu boolean là `false`, nếu không nó sẽ trả về `true`.

Chú ý rằng toán tử `&&` có độ ưu tiên hơn `||`. Do đó, nó sẽ được tính toán trước. Khi sử dụng cả hai toán tử này trong cùng một biểu thức, có thể sử dụng dấu ngoặc `()` để nhóm các phép tính theo thứ tự ưu tiên.

```javascript
false && true || true; // true
false && (true || true); // false
```

Khi sử dụng những toán tử này, toán hạng đầu tiên luôn được tính toán trước. Tuy nhiên, toán hạng thứ hai có thể không bao giờ được sử dụng tùy theo kết quả tính toán của toán hạng đầu tiên. Điều này được gọi là short-circuiting (mạnh chập hay đoản mạch).

Toán tử `&&` và `||` không phải lúc nào cũng trả về giá trị kiểu boolean. Thông thường, chúng có thể trả về bất kỳ giá trị nào. Dưới đây là mô tả chính xác về tính đoản mạch của chúng:

- Toán tử `&&` sẽ kiểm tra toán hạng đầu tiên. Nếu kết quả là *truthy* thì toán hạng sẽ được tính toán và kết quả trả về là giá trị của toán hạng thứ hai. Tuy nhiên nếu giá trị của toán hạng đầu tiên là *falsy* thì toán hạng thứ hai không bao giờ được tính toán, kết quả trả về là giá trị *falsy* của toán hạng đầu.

```javascript
(a && b) === a; // `a` is falsy
(a && b) === b; // `a` is truthy
```

- Toán tử `||` cũng sẽ kiểm tra toán hạng đầu tiên. Nếu kết quả là *truthy* thì toán hạng thứ hai sẽ không bao giờ được tính toán, kết quả trả về là giá trị *truthy* từ toán hạng đầu tiên. Tuy nhiên, nếu giá trị của toán hạng đầu là *falsy* thì kết quả trả về là giá trị của toán hạng thứ hai.

```javascript
(a || b) === a; // `a` is truthy
(a || b) === b; // `a` is falsy
```

# Thay thế mệnh đề bằng biểu thức

## 1. Đơn giản hóa mệnh đề `If`

Rất nhiều câu điện kiện `if` có thể dễ dàng được thay thế bởi biểu thức điều kiện bằng cách áp dụng khái niệm mạch chập. Xem xét ví dụ sau:

```javascript
if (user && user.canDeletePost) {
  deletePost();
}
```

Trong đoạn code này, mệnh đề `if` đảm bảo rằng hàm `deletePost()` chỉ được gọi khi phép điều kiện trả về `true`

Mệnh đề `if` trên có thể được thay thế bằng biểu thức điều kiện rất đơn giản như sau:

```javascript
user && user.canDeletePost && deletePost();
```

Mặc dù biểu thức điều kiện này có cách thực thi giống với mệnh đề điều kiện trên, nhưng thực chất chúng khác nhau.

Mệnh đề điều kiện trả về một giá trị. Do đó, nó có thể được gán cho một biến hoặc được sử dụng ở nơi khác mà yêu cầu một giá trị cụ thể.

Việc sử dụng biểu thức điều kiện như này đồng nghĩa với việc phải rất cận trọng về khái niệm mạch chập. Rất có thể toán hạng không được thực thi như đã đề cập ở mục trước của bài viết về mạch chập.

## 2. Mệnh đề If...Else

Xem xét ví dụ đơn giản sau để xác định độ mạnh của mật khẩu:

```javascript
let strength = null;

if (password.length > 7) {
  strength = 'Strong';
} else {
  strength = 'Weak';
}
```

Ý tưởng của đoạn code trên rất đơn giản: Kiểm tra nếu mật khẩu có độ dài lớn hơn 7 ký tự thì gán trị cho biến là `"Strong"` , ngược lại gán à `"Weak"`

Đoạn code trước có thể được rút gọn như sau:
```javascript
const strength = (password.length > 7) && 'Strong' || 'Weak';
```

Đoạn code này thực hiện giống hệt như đoạn code lúc trước, tất cả chỉ trong một dòng. Điều này trông khá ổn. Đoạn code dưới đây sẽ giải thích cơ chế tính toán của biểu thức điều kiện ở đoạn code trên.

```javascript
let password = 'long_password';

console.log(password.length > 7); // true
console.log(password.length > 7 && 'Strong'); // "Strong"
console.log(password.length > 7 && 'Strong' || 'Weak'); // "Strong"

password = 'short';

console.log(password.length > 7); // false
console.log(password.length > 7 && 'Strong'); // false
console.log(password.length > 7 && 'Strong' || 'Weak'); // "Weak"
```

Có một cách khác để viết lại những biểu thức điện kiện `if...else` là sử dụng toán tử điều kiện, hay còn được gọi là toán tử ba ngôi (ternary operator). Cú pháp như sau:

```javascript
// If condition is truthy, evaluate and return A,
// otherwise evaluate and return B

condition ? A : B
```

Đoạn code kiểm tra mật khẩu lúc trước có thể được viết lại sử dụng toán tử ba ngôi như sau:

```javascript
const strength = (password.length > 7) ? 'Strong' : 'Weak';
```

Mặc dùng trong ví dụ này, toán tử ba ngôi và toán tử logic hoạt động giống nhau nhưng cần nhớ rằng chúng không thể thay thế được cho nhau.

Tốt hơn hết là nên sử dụng toán tử ba ngôi trong những trường hợp không biết rõ về toán hạng sẽ được thực hiện.

Xem xét đoạn code sau để hiểu về sự nguy hiểm của việc sử dụng toán tử logic cho những trường hợp như này:

```javascript
// LOGICAL OPERATORS
// If condition is truthy and A is truthy, return A,
// otherwise evaluate and return B

// Danger: A will never be returned if it is falsy

condition && A || B


// TERNARY OPERATOR
// If condition is truthy, evaluate and return A,
// otherwise evaluate and return B

condition ? A : B
```

Dưới đây là một mệnh đề rất quen thuộc thường được tìm thấy ở các thư viện AJAX đa nền tảng:

```javascript
let xmlhttp = null;

if (window.XMLHttpRequest) {
  
  // Modern browsers
  xmlhttp = new XMLHttpRequest();
  
} else if (window.ActiveXObject) {
  
  // Older versions of Internet Explorer (IE <= 6)
  xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  
}
```

Sử dụng toán tử logic:

```javascript
const xmlhttp = window.XMLHttpRequest && new XMLHttpRequest()
  || window.ActiveXObject && new ActiveXObject('Microsoft.XMLHTTP')
  || null;
```

Sử dụng toán tử ba ngôi:

```javascript
const xmlhttp = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : window.ActiveXObject
    ? new ActiveXObject('Microsoft.XMLHTTP')
    : null;
```

# Mẹo nhỏ và cú pháp viết tắt.

Dưới đây là một số mẹo và cú pháp viết tắt hữu dụng khi sử dụng các toán tử logic và toán tử điều kiện:

## Chuẩn hóa về kiểu Boolean

Cho giá trị `value` cần chuẩn hóa để luôn trả về giá trị kiểu boolean theo quy tắc sau:

- Nếu `value` là giá trị boolean thì trả về giá trị `value`
- Nếu `value` không phải giá trị boolean , giá trị boolean mặc định sẽ được trả về (`true` hoặc `fasle`)

Đoạn code dưới đây mô tả phép chuẩn hóa trên:

```javascript
// boolOrFalse()
// Return value if it is a boolean,
// otherwise return false

const boolOrFalse = value => {
  return (typeof value === 'boolean') && value;
}

console.log(boolOrFalse()); // false
console.log(boolOrFalse(0)); // false
console.log(boolOrFalse('')); // false
console.log(boolOrFalse(false)); // false
console.log(boolOrFalse(true)); // true


// boolOrTrue()
// Return value if it is a boolean,
// otherwise return true

const boolOrTrue = value => {
  return (typeof value !== 'boolean') || value;
}

console.log(boolOrTrue()); // true
console.log(boolOrTrue(0)); // true
console.log(boolOrTrue('')); // true
console.log(boolOrTrue(false)); // false
console.log(boolOrTrue(true)); // true
```

## Định lý De Morgan

Định lý toán học quen thuộc này có thể được mô tả như sau:

```javascript
// These two are equivalent
!A && !B == !(A || B)

// Also these two
!A || !B == !(A && B)
```

## Sự đồng nhất của Boolean

Khi xử lý với giá trị boolean, có một số phép đồng nhất luôn đúng. Cho `A`, `B` và `C` là những giá trị boolean, đoạn code sau sẽ chỉ ra sự đồng nhất này:

```javascript
// NOT Conversion
!!A == A
!!B == B
!!C == C

// AND to OR Conversion
A && B == !(!A || !B)

// OR to AND Conversion
A || B == !(!A && !B)

// Removing nested AND
A || (B && C) == A || B && C

// Removing nested OR
A && (B || C) == !(!A || !B && !C)
```

## Những toán tử ba ngôi phức hợp

Như đã đề cập ở các phần trước của bài viết, toán tử ba ngôi có thể được lồng với nhau để xử lý những đoạn logic liên quan đến mệnh đề `if...else`

Tuy nhiên, để có thể sử dụng chúng hiệu quả trong những biểu thức phức hợp thì cần hiểu về độ ưu tiên và tính kết hợp của toán tử ba ngôi.

- Toán tử ba ngôi có độ ưu tiên thấp nhất so với các toán tử khác. Do đó nó được tính toán cuối cùng khi được sử dụng chung với các toán tử khác có độ ưu tiên cao hơn.

```javascript
/ this expression
A ? B + C && D : E || F && G

// will be evaluated as
A ? ((B + C) && D) : (E || (F && G))
```   

- Toán tử ba ngôi có tính kết hợp từ phải qua trái. Do đó, đối với các toán tử ba ngôi được sử dụng trong cùng một biểu thức, chúng được phân tích từ phải sang trái.

```javascript
// this expression
A ? B : C ? D : E ? F : G

// will be evaluated as
(A ? B : (C ? D : (E ? F : G)))
```

Khi sử dụng nhiều toán tử ba ngôi trong cùng một biểu thức, dấu ngoặc `()` có thể cần được sử dụng để thay đổi thứ tự tính toán. Ví dụ:

```javascript
// this expression
A ? B : (C ? D : E) ? F : G

// will be evaluated as
(A ? B : ((C ? D : E) ? F : G))
```

# Tài liệu tham khảo về Javascript #

1. [Cool JavaScript Shortcuts and Tips for Everyday Use](https://codeburst.io/cool-javascript-shortcuts-and-tips-for-everyday-use-66cd174ab216)
2. [Hacks for Creating JavaScript Arrays](https://medium.freecodecamp.org/https-medium-com-gladchinda-hacks-for-creating-javascript-arrays-a1b80cb372b)
3. [JavaScript ES6: 5 new abstractions to improve your code](https://blog.logrocket.com/javascript-es6-5-new-abstractions-to-improve-your-code-54a369e82407)
4. [ES6 Destructuring: The Complete Guide](https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f)
5. [JavaScript typeof](https://blog.logrocket.com/javascript-typeof-2511d53a1a62)

### ** Lược dịch **

**Glad Chinda**, *Conditional JavaScript for Experts*, [Medium](https://hackernoon.com/conditional-javascript-for-experts-d2aa456ef67c)