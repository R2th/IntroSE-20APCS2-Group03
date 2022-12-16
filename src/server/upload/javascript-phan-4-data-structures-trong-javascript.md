---

>  Ở phần trước chúng ta đã cùng tìm hiểu về [Javascript phần 3: Javascript phần 3: Functions trong javascript.](https://viblo.asia/p/javascript-phan-3-functions-trong-javascript-YWOZrpbE5Q0) phần này chúng ta sẽ cùng tìm hiểu về Data Structures trong javascript
### Charles Babbage, Passages from the Life of a Philosopher (1864)
> Tôi đã được hỏi 2 lần, 'Pray, ông Babbage, nếu bạn đưa số liệu sai vào máy tính, liệu rằng câu trả lời đúng sẽ xuất hiện?' [...] Tôi không thể tin được sự sai lầm về ý tưởng có thể gây ra một vài câu hỏi như vậy.


### Strings and their properties
Chúng ta có thể đọc các thuộc tính như `length` và `toUpperCase` từ giá trị của chuỗi. Nhưng nếu chúng ta cố thêm thuộc tính mới, nó sẽ không có nghĩa.

```javascript
var myString = "Fido";
myString.myProperty = "value";
console.log(myString.myProperty);
// → undefined
```
Giá trị của các loại chuỗi, số và kiểu Boolean không phải là đối tượng, mặc dù ngôn ngữ không ngăn cản bạn nếu bạn thiết 	lập các thuộc tính mới trên chúng nhưng nó không bao giờ lưu trữ những thuộc tính đó. Những giá trị là bất biến và không thể thay đổi được.
Nhưng những loại giá trị đó có những thuộc tính được xây dựng sẵn. Mọi kiểu string đều có một số phương thức riêng của nó. Một trong số những phương thức có ích nhất có lẽ là `slice` và ` indexOf`, mà giống với phương thức mảng cùng tên.

```javascript
console .log (" coconuts ". slice (4, 7));
// → nut
console .log (" coconut ". indexOf ("u"));
// → 5
```

Một điểm khác biệt là phương thức `indexOf` của kiểu giá trị `string` có thể bao gồm nhiều kí tự trong khi nếu dùng phương thức mảng thì chỉ được tìm kiếm duy nhất một ký tự.

```javascript
console .log (" one two three ". indexOf (" ee "));
// → 11
```

Phương thức trim dùng để xóa các ký tự trắng (khoảng trắng, xuống dòng, lệnh tabs và các kí tự giống nhau) từ ký tự bắt đầu đến ký tự kết thúc của một chuỗi.

```javascript
console .log (" okay \n ". trim ());
// → okay

```

Chúng ta đã thấy thuộc tính `length` của kiểu giá trị `string`. Truy cập vào những ký tự riêng trong chuỗi có thể thực hiện bởi phương thức `charAt` nhưng cũng có thể đọc thông qua chỉ số của nó như một mảng.

```javascript
var string = "abc ";
console .log( string . length );
// → 3
console .log( string . charAt (0));
// → a
console .log( string [1]) ;
// → b

```

### Các đối tượng tham số.

Khi một hàm được gọi, một biến đặc biệt có tên là `arguments ` được thêm vào môi trường trong thân của hàm đang chạy. Biến này đề cập đến một đối tượng chứa tất cả các đối số truyền vào cho hàm. Nên nhớ rằng trong JavaScript, bạn được phép thông qua nhiều hơn (hoặc ít hơn) các tham số truyền cho hàm hơn số lượng tham số của hàm đã được định khai báo sẵn.

```javascript
function noArguments () {}
noArguments (1, 2, 3); // This is okay
function threeArguments (a, b, c) {}
threeArguments (); // And so is this

```

Đối tượng `arguements` có thuộc tính length để chỉ số lượng tham số được truyền vào hàm. Nó cũng có thuộc tính cho từng tham số, tên là 0, 1, 2 và có thể nhiều hơn.
Nghe thật giống như một mảng, bạn đúng đấy, phần lớn nó giống một mảng. Nhưng đây là một đối tượng, tuy nhiên, không có các phương thức như một mảng (ví dụ `slice` hoặc `indexOf`), vì vậy có một chút khó khăn trong việc sử dụng hơn là một mảng thật sự.


```javascript
function argumentCounter () {
79
console .log (" You gave me", arguments .length , " arguments .");
}
argumentCounter (" Straw man", " Tautology ", "Ad hominem ");
// → You gave me 3 arguments .
```

Một số hàm có thể nắm bất kỳ các loại đối số như `console.log` . Những vòng lặp có thể vượt qua tất cả các giá trị trong đối tượng tham số của nó. Chúng có thể được sử dụng để tạo ra các giao diện. Ví dụ, nhớ bằng cách nào chúng ta tạo ra các mục để lưu trữ tạp chí Jacques.

```javascript
addEntry ([" work ", " touched tree ", " pizza ", " running ",
" television "], false );
```

Kể từ khi chức năng này được sử dụng nhiều, chúng ta có thể tạo một thay thế dễ dàng hơn để gọi.
```javascript
function addEntry ( squirrel ) {
var entry = { events : [], squirrel : squirrel };
for (var i = 1; i < arguments . length ; i++)
entry . events . push ( arguments [i]);
journal . push ( entry );
}
addEntry (true , " work ", " touched tree ", " pizza ",
" running ", " television ");
```

Phiên bản này đọc giá trị tham số đầu tiên (`squirrel`) bằng cách đơn giản nhất và sau đó thông qua các phần còn lại của tham số ( vòng lặp bắt đầu tại chỉ số 1, bỏ qua giá trị đầu tiên) để tập hợp chúng vào một mảng.

### Đối tượng toán học

Như chúng ta thấy, đối tượng Math  là một tập hợp chức năng tiện ích liên quan đến toán học ví dụ như `Math.max` (maximum), `Math.min` (minimum), và `Math.sqrt` (tính căn bậc hai).

Đối tượng `Math` được dùng như là một kho chứa để nhóm một loạt cùng chức năng. Chỉ có một đối tượng `Math` và nó không bao giờ hữu ích như là một giá trị. Thay vào đó nó cung cấp một không gian tên (`namespace`) để các hàm và các giá trị không phải là biến toàn cục.

Có quá nhiều biến toàn cục sẽ làm "ô nhiễm" không gian tên. Nhiều hơn tên đó đã được thực hiện, nhiều khả năng bạn sẽ vô tình ghi đè lên giá trị của một số biến. Ví dụ không khó nếu bạn muốn đặt tên tối đa trong chương trình của bạn. Kể từ khi các hàm xây dựng sẵn tối đa của Javascript được giấu một cách an toàn bên trong đối tượng `Math` chúng ta không phải lo lắng về việc ghi đè đó.

Nhiều ngôn ngữ sẽ ngăn chặn bạn hoặc ít nhất là cảnh báo  bạn là khi bạn đang định nghĩa một biến mà biến đó đã được sử dụng. Javascript không phải như vậy, vì vậy hãy cẩn thận.

Quay lại đối tượng `Math`. Nếu bạn cần làm về lượng giác, `Math` có thể giúp bạn. Nó chứa `cos` (cosine), `sin` (sine) và `tan` (tangent) cũng như chức năng nghịch đảo của các hàm trên tương ứng. Các số `π ` (pi) hoặc sấp xỉ gân gũi nhất có sẵn trong Javascript là `Math.PI` (đã từng có một phong cách lập trình cũ là các biến có giá trị không đổi được viết bằng chữ in hoa).

```javascript
function randomPointOnCircle ( radius ) {
var angle = Math . random () * 2 * Math .PI;
return {x: radius * Math .cos( angle ),
y: radius * Math .sin( angle )};
}
console .log( randomPointOnCircle (2));
// → {x: 0.3667 , y: 1.966}
```

Nếu `sine` và `cosine` còn lạ lẫm với bạn, đừng quá lo lắng. Khi chúng được sử dụng trong cuốn sách này, ở phần 13, tôi sẽ giải thích chúng rõ hơn.
Ví dụ trước đây sử dụng `Math.random`. Đây là một hàm trả về một con số ngâu nhiên giữa khoảng từ 0 đến một số mà bạn định sẵn mỗi khi bạn gọi nó.

```javascript
console .log( Math . random ());
// → 0.36993729369714856
console .log( Math . random ());
// → 0.727367032552138
console .log( Math . random ());
// → 0.40180766698904335
```

Mặc dù máy tính là một chiếc máy xác định - nó luôn phản ứng cùng một cách nếu ta truyền cùng dữ liệu đầu vào - nó có thể sinh ra một con số ngẫu nhiên. Để làm được điều này, máy tính giữ một con số (hoặc một loạt các con số) trong nội bộ của nó. Sau đó mỗi lần yêu cầu sinh ra một số ngẫu nhiên được gọi, nó thực hiện một số phép tính xác định phức tạp về nội bộ này và trả về một phần kết quả của những tính toán. Máy cũng sử dụng các kết quả này để thay đổi trạng thái nội bộ của mình để sinh ra các số ngẫu nhiên tiếp theo.

Nếu chúng ta muốn có một số nguyên ngẫu nhiên thay vì một giá trị ngâu nhiễn trong đoạn từ 0 đến một giới hạn max của nó, chúng ta có thể sử dụng `Math.floor` (làm tròn số nguyên đến số nguyên nhỏ nhất ) kết hợp với `Math.random`.

```javascript
console .log( Math . floor ( Math . random () * 10));
// → 2
```
Nhân các số ngẫu nhiên với 10, cho chúng ta một số lớn hơn hoặc bằng số không. Kể từ khi `Math.floor` làm tròn xuống số nguyên nhỏ nhất, cách thể hiện này sẽ sản sinh ra một cách bình đẵng từ số 0 đến 9. Ngoài ra còn có hàm `Math.ceil` ( trả lại một số nguyên nhỏ nhất hoặc bằng chính nó) và `Math.round` (làm tròn đến số nguyên gần nhất).


### Đối tượng toàn cục

Phạm vi toàn cầu, trong đó các biến toàn cục tồn tại, có thể được tiếp cận như một đối tượng trong JavaScript. Mỗi biến toàn cục như là một thuộc tính biểu diễn một đối tượng trong Javascript. Trong môi trường trình duyệt, phạm vi biến toàn cục được lưu trữ trong đối tượng `Windows`

```javascript
var myVar = 10;
console .log (" myVar " in window );
// → true
console .log( window . myVar );
// → 10
```
Bài viêt của mình đến đây là hết hẹn gặp lại các bạn ở các phần tiếp theo. :D

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/JavaScript

https://eloquentjavascript.net/03_functions.html