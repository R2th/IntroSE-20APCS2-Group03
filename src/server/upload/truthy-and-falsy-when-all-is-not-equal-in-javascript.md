# Vấn đề
Javascript là ngôn ngữ lập trình không quy định chặt chẽ về kiểu dữ liệu của biến (Weakly Typed Language). Do vậy, tùy vào trường hợp được sử dụng mà giá trị biến trong Javascript sẽ được hiểu theo kiểu dữ liệu thích hợp.

Ví dụ:
```js
var a = 1; //kiểu int
var b = '2'; //kiểu string

console.log(a > b);
//kết quả trả về là `false`. Như vậy, biến `b` được hiểu với kiểu `int`

console.log(b + a);
// kết quả trả về là "21". Biến `a` được hiểu với kiểu `string` ('2' + '1' = '21')
```
Ở 1 ví dụ khác, khi chương trình mong muốn giá trị của một biến được trả về dưới kiểu `boolean` , trong khi biến đó được định nghĩa với 1 kiểu khác thì giá trị của biến sẽ được hiểu theo 2 nhóm giá trị **truthy** và **falsy**.
```js
var a = 1; //kiểu int

console.log(a == false) //khi so sánh `a` (kiểu `int`) với `false` (kiểu `boolean`) chương trình mong muốn a được hiểu theo kiểu `boolean`, khi đó giá trị truthy hay falsy của biến sẽ được xét đến
//kết quả trả về là `false`. Tại sao lại ra như vậy thì mình sẽ giải thích ở dưới nhé :D
```
Vậy thì truthy và falsy value là gì :-?
# Định nghĩa

> "Bạn hãy cho biết truthy và falsy value trong Javascript là gì?" 

Có lẽ đây sẽ là 1 trong bộ câu hỏi được hỏi phổ biến trong các buổi phỏng vấn về Javascipt. Và ngay bản thân mình và 1 số các bạn khác sẽ lúng tung trước câu hỏi này vì bạn không nhớ được chính xác những giá trị đó hoặc là không biết về nó. Vì thế hôm nay mình đã quyết tâm củng cố thêm kiến thức cho chính mình và chia sẻ cho mọi người về vấn đề này, hy vọng sẽ giúp ích được các bạn phần nào. (bow)

Hiểu đơn giản thì ... `Truthy value` là những giá trị trong Javascript mà khi ép kiểu về Boolean thì sẽ cho ra giá trị là `true`. Ngược lại, `Falsy value` là những giá trị mà khi ép kiểu về Boolean thì cho ra giá trị là `false`. 

Trong Javascript có **SÁU** giá trị được coi là `falsy`, còn lại tất cả những giá trị khác không phải là những giá trị này đều được xem là `truthy`.

# Cách nhớ kiểu dữ liệu thuộc truthy và falsy value

* Kiểu `Boolean` có giá trị `true` và `false`, vậy giá trị false chắc chắn là falsy value.
* Kiểu `Number` chứa tất cả những con số. Nhưng có 2 giá trị đặc biệt là số không (0) và Not a Number (NaN), và nó đều là falsy value.
* Kiểu dữ liệu chuỗi `String` , với chuỗi rỗng (chuỗi không chứa bất kỳ 1 ký tự nào) là falsy value.
* Và còn lại 2 giá trị `null` và `undifined` là falsy value.

Tóm cái váy lại thì như này

| Kiểu dữ liệu | Falsy value |
| -------- | -------- |
| Boolean     | false     |
| Number     | 0 hoặc NaN     |
| String     | '' hoặc ""    |
| null     | null     |
| undefined     | undefined     |

Xong! Mình đã liệt kê `6 falsy values`, còn tất cả những giá trị còn lại khác là truthy hết.

Ví dụ 1 vài giá trị là `truthy`

* "any string" (chuỗi bất kỳ bao gồm cả '0', 'false')
* [1, 2] (mảng bất kỳ bao gồm mảng rỗng [])
* {a: 1, b:2} (đối tượng bất kỳ bao gồm đối tượng rỗng {})
* function() {} (hàm bất kỳ)

Nhìn vào các ví dụ này bạn đã có thể giải thích được ví dụ mình đã viết phần tổng quan trên rồi đó :D :D :D

# So sánh với toán tử logic `==`

Khi so sánh `truthy value` và `falsy value` bằng cách sử dụng toán tử `==` có thể xảy ra các trường hợp ngoài ý muốn.

![](https://images.viblo.asia/a037e606-a1da-4345-93eb-45abbe21bddd.png)

Quy ước rằng:

* `false`, số `0` và chuỗi rỗng `''` thì tương đương nhau.
* `null` và `undefined` thì tương đương nhau nhưng chúng không tương đương với bất kỳ giá trị nào khác.
* `NaN` không tương đương với bất kỳ giá trị nào - bao gồm cả chính `NaN`.
* `Infinity`  là **truthy** nhưng khi so sánh với `true` hay `false` thì kết quả luôn trả về là `false`.
* Một mảng rỗng có giá trị là **truthy** nhưng khi so sánh với `true` sẽ cho kết quả là `false`, so sánh với `false` lại cho kết quả là `true`.

Ví dụ:
```js
// all true
false == 0;
0 == '';
null == undefined;
[] == false;
!![0] == true;

// all false
false == null;
NaN == NaN;
Infinity == true;
[] == true;
[0] == true;
```

# So sánh với toán tử logic `===`
![](https://images.viblo.asia/9a333616-a3b1-4902-9626-9ec26a36f493.png)

Ngoại lệ duy nhất là `NaN` vẫn không tương đương với bất kỳ giá trị nào, kể cả chính nó.

# Vài tips lời khuyên khi sử dụng

## Tránh so sánh trực tiếp giá trị

Khi cần so sánh một giá trị với `boolean`, ít khi ta phải so sánh trực tiếp chúng với `true` hay `false` mà chỉ cần xét đến giá trị đó là **truthy** hay **falsy**.
```js
// instead of
if (x == false) // ...
// runs if x is false, 0, '', or []

// use
if (!x) // ...
// runs if x is false, 0, '', NaN, null or undefined
```
## Sử dụng `===` thay cho `==`

Khi cần so sánh hai giá trị có giống nhau hay không ta nên dùng toán tử so sánh `===` (hoặc `!==`) thay cho `==` (hoặc `!=`) để tránh gặp vấn đề chuyển đổi kiểu giá trị.
```js
// instead of
if (x == y) // ...
// runs if x and y are both truthy or both falsy
// e.g. x = null and y = undefined

// use
if (x === y) // ...
// runs if x and y are identical...
// except when both are NaN
```
## Chuyển đổi sang giá trị `boolean` khi cần thiết

Bất cứ giá trị nào cũng có thể chuyển đổi sang giá trị `boolean` bằng cách sử dụng toán tử `!! (Double Bangs)`. Sử dụng toán tử này cho `falsy value` (`false`, `0`, `'' hoặc ""`,  `null`, `undefined`, `NaN`) sẽ nhận được giá trị là `false`, và được sử dụng khi muốn kiểm tra 2 giá trị cùng là `truthy` hay`falsy` hay không?
```js
// instead of
if (x === y) // ...
// runs if x and y are identical...
// except when both are NaN

// use
if (!!x === !!y) // ...
// runs if x and y are identical...
// including when either or both are NaN
```

# Tài liệu tham khảo

https://developer.mozilla.org

https://www.sitepoint.com/automatically-optimize-responsive-images-in-gatsby/

https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054