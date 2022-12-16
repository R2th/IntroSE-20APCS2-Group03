Trong khi viết code, việc so sánh giữa các giá trị là điều phổ biến, thường đi liền với các lệnh điều kiện `if else` và như mọi người đều biết các ứng dụng thực tế sẽ phải xử lý rất nhiều case (`if else` đếm không xuể :D). Vậy nên đảm bảo kết quả so sánh đúng như mong muốn rất quan trọng. Tuy nhiên trong `JavaScript`, việc so sánh thường gặp một số hiểu nhầm dẫn đến khó khăn khi `debug`. Bài viết này sẽ làm rõ hơn về các kiểu so sánh bằng trong `JavaScript` và cách thức hoạt động của chúng.
## Cơ bản về so sánh bằng
Trước tiên, hãy nhắc lại một chút về tính năng so sánh trong `JavaScript`
* `String` được so sánh dựa trên thứ tự từ điển của từng ký tự, dựa theo giá trị Unicode.
* `String` hoàn toàn bằng nhau khi chúng có cùng một chuỗi ký tự, cùng độ dài, hay cùng một ký tự tại ví trí bất kỳ.
*  `Number` hoàn toàn bằng nhau khi chúng có chung một giá trị số. So sánh `NaN` sẽ luôn trả về false, kể cả với `NaN`.
*  `Boolean` hoàn toàn bằng nhau khi cả hai đều `true` hoặc `false`.
*  `Object` bằng nhau khi cùng tham chiếu tới một vùng nhớ trong bộ nhớ.
*  Các giá trị kiểu `null` và `undefined` hoàn toàn bằng chính nó và bằng nhau nếu sử dụng `==` .

Tiếp theo chúng ta sẽ nói chi tiết hơn về 3 kiểu so sánh bằng trong `JavaScript` là `==`, `===` và `Object.is`

## Toán tử === 
Hay còn được viết với tên `Strict Equality` - hoàn toàn bằng nhau như đề cập ở trên. Sở dĩ nó có tên như vậy bởi công việc nó thực hiển chỉ là so sánh, không ép kiểu toán hạng nào cả.

Ví dụ:
```javascript
1 === 1; // true
1 === '1; // false
'1' === '1'; // true
1 === NaN; // false
NaN === NaN; // false
null === undefined; // Đây là một trường hợp đặc biệt. Kết quả là false bởi null bản chất một giá trị vô nghĩa còn undefined có nghĩa là biến này chưa được khai báo giá trị nào cả
```


## Toán tử ==
Tên gọi khác là `Loose equality`. Khác với `===` trước khi so sánh, `==` sẽ ép kiểu các toán hạng về kiểu chung nhất sau đó mới thực hiện `Strict equality`. Vậy nên sử dụng các ví dụ trước với `==`, ta được:

```javascript
1 == 1; // true
1 == '1'; // true
'1' == '1'; // true
1 == NaN; // vẫn là false
NaN == NaN; // vẫn là false
null == undefined; // true bởi cả 2 sẽ được ép kiểu về boolean có giá trị false
```

Điều hay gây hiểu nhầm chính là việc `JavaScript` ép kiểu. Vậy để tránh các lỗi này, chúng ta cần tìm hiểu cách thức ép kiểu hoạt động như thế nào:
* Khi so sánh `Number` và `String`, `String` được ép kiểu về `Number`. Nếu không có giá trị tương ứng thì kết quả ép kiểu sẽ là `NaN`.
* Nếu một trong hai toán hạng là `Boolean`,  toán hạng đó sẽ được chuyển về `1` nếu là `true` và `+0` nếu là `false`.
* Nếu một `Object` được so sánh với  một `Number` hoặc `String`, `JavaScript` sẽ thử chuyển đổi `Object` về kiểu nguyên thủy, sử dụng phương thức `valueOf` và `toString`. Nếu thất bại thì sẽ sinh ra một `runtime error`.
* Nếu hai toán hạng đều là `Object`, chúng chỉ bằng nhau khi đều tham chiếu tới một vùng nhớ.

Vậy khi nào thì dùng `===` và `==`, hãy xét qua ví dụ sau:
```javascript
let thisIsAnObject = new String('something');
let thisIsAString = 'something';

thisIsAnObject == thisIsAString; //true vì sau khi ép kiểu, giá trị chúng là như nhau
thisIsAnObject === thisIsAString; //false vì không có ép kiểu xảy ra và chúng là 2 kiểu khác nhau mặc dù đều biểu diễn cùng một chuỗi
```

Với kiểu `Boolean`:
```javascript
true == 1; // true vì true được ép kiểu Number có giá trị là 1
true === 1; // false vì không có ép kiểu
```

`Boolean` so sánh với `String` cũng được ép kiểu về `Number`:
```javascript
true == 'true' // false vì String không thể ép kiểu về Number
isNaN(Number('true')) // true

true == '1' // true vì cả 2 giá trị sẽ được ép kiểu về Number có giá trị bằng 1
```

Vậy còn `Object`:
```javascript
let x = new String('1');
let y = new String('true');

x == true; //true vì x được ép kiểu về Number có giá trị bằng 1, tương tự với true 
y == true; // false vì y được ép kiểu về String có giá trị bằng 'true' sau đó lại được chuyển về Number với giá trị NaN
//Nếu dùng === thì cả hai câu lệnh trên đều cho kết quả false vì rõ ràng các giá trị này khác kiểu nhau.
```

Ý kiến cá nhân thì mình thích sử dụng `===` hơn, chúng ta sẽ tự ép kiểu thủ công, vừa rõ ràng hơn mà tránh được lỗi nếu không nắm rõ cách so sánh ép kiểu ví dụ như `"true" == true` hay `null == undefined` trả về false.

## Phương thức Object.is()
Ngoài `==`, `===` thì ta còn một cách so sánh bằng khác là `Object.is` với cách dùng như sau:
* Cú pháp `Object.is(value1, value2)`, giá trị trả về là một `Boolean`, true nếu hai tham số bằng nhau và ngược lại.
* Hai tham số bằng nhau nếu
    *  đều là `undefined`
    *  đều là `null`
    *  đều là `true` hoặc `false`
    *  đều là một `String` với cùng độ dài và thứ tự các ký tự
    *  đều là một `Object` (có chung một tham chiếu)
    *  đều là `Number` có cùng giá trị
    *  đều là `+0`
    *  đều là `-0`
    *  đều là `NaN`

Về cơ bản, `Object.is` giống với `===` nhưng khác biệt trong một vài trường hợp. Đó là:
```javascript
NaN === NaN; // false
Object.is(NaN, NaN); // true

+0 === -0; // true
Object.is(+0, -0); // false
// +0 chình là 0
// cái này thường được lưu ý trong lập trình game khi cần thiết phải tính toán vận tốc hoặc lực cản
```

### Hi vọng bài viết này giúp ích cho các bạn ^^
## Tài liệu tham khảo

https://itnext.io/navigating-equality-comparitors-and-sameness-checks-in-javascript-6a0baf3e5d3b

https://www.quora.com/Why-is-null-undefined-true-in-JavaScript

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is