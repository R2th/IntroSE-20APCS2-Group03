Trong phần trước mình đã giới thiệu về 3 loại data types trong javascript đó là `null`, `undefined` và `boolean`, trong phần này mình sẽ tiếp tục giới thiệu với các bạn về data types `number` và `string` trong javascript, let's go!

# Number
javascript chỉ có đúng 1 kiểu số là `number` (LOL), nó bao gồm cả kiểu "số nguyên" cũng như kiểu số thập phân. Sở dĩ để  "số nguyên" trong dấu ngoặc kép là vì trong JS từ lâu không thực sự có giá trị số nguyên như trong các ngôn ngữ khác. Có thể điều này trong tương lai sẽ được thay đổi, nhưng bây giờ chúng ta chỉ có `number`s cho tất cả mọi thứ.

Vậy là, trong JS, 1 "số nguyên" là 1 giá trị không có dấu thập phân. Hay bạn có thể hiểu `42.0` cũng không khác gì số nguyên `42` cả.

Cũng giống như đa số các ngôn ngữ hiện đại, bao gồm cả các scripting languages (ngôn ngữ thông dịch), Javascript `number` được xây dựng dựa trên chuẩn "IEEE 754", hay còn gọi là "dấu phẩy động".

Sau đây là 1 số **Numeric Syntax** của JS

* Số `0` ở đằng trước số thập phân có thể bỏ đi nếu bạn muốn:
```javascript
var a = 0.42;
var b = .42;
```

* Tương tự như thế, số `0` ở cuối số thập phân (đằng sau dấu `.`) cũng có thể bỏ đi:
```javascript
var a = 42.0;
var b = 42.;
```
Lưu ý: Không khuyến khích viết `42.` vì cách viết này không phổ biến, và nó cũng chắc chắn sẽ làm xoắn não những người đọc code của bạn. Nhưng tất nhiên, nói gì thì nói, nó vẫn hợp lệ (okay).

* Mặc định, hầu hết `number`s sẽ in ra màn hình 1 số thập phân có 10 chữ số, với những số `0` ở sau dấu `.` bị lược bỏ:
```javascript
var a = 42.300;
var b = 42.0;

a; // 42.3
b; // 42
```

* Số cực lớn hoặc số cực nhỏ sẽ mặc định sẽ được in ra màn hình dưới dạng số mũ, cũng giống như khi chúng ta dùng hàm `toExponential()`:
```javascript
var a = 5E10;
a;                    // 50000000000
a.toExponential();    // "5e+10"

var b = a * a;
b;                    // 2.5e+21

var c = 1 / a;
c;                    // 2e-11
```

* `number` có thể truy cập được các hàm được xây dựng trong `Number.prototype`. Ví dụ, hàm `toFixed(...)` cho phép bạn chỉ định bao nhiêu số thập phân đằng sau dấu `.` trong giá trị trả về:
```javascript
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```
Trên đây là 1 số ví dụ về **Numeric Syntax** của JS, còn rất nhiều nữa nhưng mình xin phép dừng lại ở đây.
# String
Nhiều người tin rằng `string` về bản chất cũng chỉ là 1 `array`. Trong khi cách hoạt động có thể hoặc không dùng `array`, thực sự `string` không hề giống `array` mặc dù nhìn bề ngoài có vẻ như vậy.

Để ví dụ, hãy cùng xem 2 giá trị sau:
```javascript
var a = "foo";
var b = ["f","o","o"];
```

`string` có nhiều nét tương đồng với `array`, như đã nói ở trên, ví dụ như chúng đều có thuộc tính `length`, hàm `indexOf(...)` và hàm `concat(...)`:
```javascript
a.length;                            // 3
b.length;                            // 3

a.indexOf( "o" );                    // 1
b.indexOf( "o" );                    // 1

var c = a.concat( "bar" );            // "foobar"
var d = b.concat( ["b","a","r"] );    // ["f","o","o","b","a","r"]

a === c;                            // false
b === d;                            // false

a;                                    // "foo"
b;                                    // ["f","o","o"]
```

Vậy thì chúng đơn giản đều là "chuỗi kí tự" đúng không, **Không hề**:
```javascript
a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]
```

`string` trong JS là immutable, trong khi `array` lại mutable. Hơn nữa, cách viết `a[1]` không hoàn toàn đúng trong JS. Những phiên bản cũ của IE không cho phép chúng ta viết như vậy (giờ thì oke). Thay vào đó, chúng ta phải viết `a.charAt(1)`.

Vì `string` là immutable nên các hàm của `string` không bao giờ trực tiếp sửa đổi nội dung bên trong nó, thay vào đó chúng ta phải tạo và trả về một `string` mới. Ngược lại, hầu hết các hàm sửa đổi nội dung của `array` đều thực hiện trực tiếp lên `array` đó:
```javascript
c = a.toUpperCase();
a === c;    // false
a;            // "foo"
c;            // "FOO"

b.push( "!" );
b;            // ["f","O","o","!"]
```

Rất nhiều hàm của `array` có thể hữu ích khi dùng với `string` nhưng lại không thể sử dụng được (vì hàm đó dành cho `array` mà LOL), nhưng chúng ta có thể "mượn" những hàm non-mutation (aka không sửa đổi trực tiếp giá trị bên trong) cho `string`:
```javascript
a.join;            // undefined
a.map;            // undefined

var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
    return v.toUpperCase() + ".";
} ).join( "" );

c;                // "f-o-o"
d;                // "F.O.O."
```

Hãy cùng đến 1 ví dụ khác: đảo ngược các kí tự của `string` (thật ngẫu nhiên, đây là 1 câu hỏi tuyển dụng  về JS rất hay gặp!). `array` có hàm `reverse()`, nhưng `string` lại không:
```javascript
a.reverse;        // undefined

b.reverse();    // ["!","o","O","f"]
b;                // ["!","o","O","f"]
```

Thật không may là chúng ta không thể mượn hàm `reverse()` của `array` được vì hàm này thay đổi trực tiếp giá trị bên trong của `array` (`array` mutator), mà `string` là immutable nên dĩ nhiên sẽ không hoạt động được:
```javascript
Array.prototype.reverse.call( a );
// trả về 1 String object của "foo"
```

1 cách giải quyết khác (có thể nói là hack) là convert `string` thành `array`, thực hiện phép toán mong muốn rồi convert về lại `string`. Nghe thì nguy hiểm vậy nhưng hiểu đơn giản thì ví dụ như sau:
```javascript
var c = a
    // tách "a" thành 1 array
    .split( "" )
    // đảo ngược các phần tử của array
    .reverse()
    // convert về string
    .join( "" );
c; // Tada chúng ta đã có kết quả mong muốn "oof"
```

Nếu như bạn thấy cách làm trên khá sida thì đúng rồi đấy LOL. Nói gì thì nói,cách trên rất đơn giản và hiệu quả với `string` nếu bạn muốn xử lí nhanh gọn, giải quyết được bài toán đặt ra. 

**Lưu ý**: Hãy cẩn thận! Cách làm trên không thể áp dụng cho `string` với các kí tự (unicode) phức tạp. Nếu như bạn chỉ đơn giản đang làm việc với `string` thì hãy làm như thể nó là `array`, hoặc là tốt hơn hết lưu nó dưới dạng `array` thay vì `string`. Bạn chắc chắn sẽ tránh được rất nhiều rắc rối khỏi việc convert `string` về `array` nhiều lần. Bạn luôn luôn có thể gọi `join("")` với `array` bất cứ khi nào bạn cần hiển thị `string`.
# Tạm kết
Ở trên mình đã giới thiệu về 2 data types `number` và `string` trong JS, nếu có chỗ nào chưa đúng mong các bạn đọc góp ý, hẹn các bạn trong phần tiếp theo mình sẽ giới thiệu nốt 2 data types còn lại trong JS là `object` và `symbol`. Thanks for reading!