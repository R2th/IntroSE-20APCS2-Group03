# Lời mở đầu

Chắc hẳn, với những người đã và đang làm việc với Javascript đều không xa lạ với các toán tử số học, so sánh, logic và chuỗi,... Tuy nhiên, ngoài những toán tử cơ bản mà bạn vẫn thường hay sử dụng thì hôm nay mình sẽ đi sâu vào 2 toán tử mà mình thấy khá hay và có thể nhiều người vẫn còn chưa hiểu rõ về nó hoặc thậm chí chưa sử dụng bao giờ. Có khi đọc bài này xong mới nhận ra là bấy lâu nay quên không áp dụng vào trong code của bạn =)) 

Nào, cùng mình bắt đầu ngay và luôn nhé :D

# 1. Nullish coalescing operator (`??`)
**Cú pháp: `a ?? b`**

## Định nghĩa
Toán tử `??` trả về tham số (toán hạng) a nếu nó không null/ undefined, ngược lại trả về b. Tức là a là phải là biểu thức/ giá trị được định nghĩa khi nó khác `null` và khác `undefined`. Ví dụ: 

```
const username = null ?? 'viblo'; 
console.log(username); 
// viblo
```

Cách dùng `??` là viết gọn của if:

```
if (a !== null && a !== undefined) {
    result = a;
} else {
    result = b;
}
```

hoặc toán tử 3 ngôi:

```
result = (a !== null && a !== undefined) ? a : b;
```

## So sánh với toán tử OR (`||`)

Sự hiện diện của `??` làm cho toán tử `||` đặt ra nhiều nghi vấn. Và có nhiều lập trình viên cho rằng đáng lẽ ra chức năng này phải ra sớm hơn chứ không phải chờ đến ES2020. Như các bạn cũng đã biết, toán tử  `||` được sử dụng để xử lý các giá trị **truthy** và **falsy**. 

Các giá trị **falsy** trong Javascript :point_down:
* null
* undefined
* 0
* NaN
* false
* " "

Có một sự khác biệt nhỏ, toán tử `||` này không thể được phân biệt `false`, `0`, `""`, và `null/undefined`. Nếu một khi dùng `||` thì chắc chắn rằng chúng ta sẽ nhận được một giá trị thứ hai. Và nếu như vậy thì có thể code của chúng ta đã sai. Bởi vì trong thực tế, chúng ta có thể chỉ muốn cung cấp giá trị mặc định của biến đó trong trường hợp bị `null/undefined`. Và bạn coi `0`, `""`, hoặc `NaN` là  các giá trị hợp lệ. Ví dụ:

```
let count = 0;
let text = "";

let qty = count || 100;
let message = text || "viblo";
console.log(qty);     // 100
console.log(message); // "viblo"
```

Toán tử `||` sẽ cho rằng `count = 0`, và `text = ""` là false, vì vậy trả về `100` và `viblo`. Trái lại giá trị 0 đối với toán tử `??` là đã được định nghĩa (khác undefined/null). Cho nên trường hợp này, chúng ta nên sử dụng `??` thay vì `||`:

```
let count = 0;
let text = "";

let qty = count ?? 100;
let message = text ?? "viblo";
console.log(qty);     // 0
console.log(message); // ""
```

Tổng hợp lại so sánh như sau :point_down::point_down::point_down:

```
# Value: false
console.log(false || true);//true
console.log(false ?? true);//false

# Value: 0
console.log(0 || 1); //1
console.log(0 ?? 1); //0

# Value: ''
console.log('' || 'viblo'); // 'viblo'     
console.log('' ?? 'viblo'); // ''

# Value: undefined
console.log(undefined || 'viblo); // 'viblo'
console.log(undefined ?? 'viblo'); // 'viblo'

# Value: null
console.log(null || 'viblo'); // 'viblo'
console.log(null ?? 'viblo'); // 'viblo'
```

## Độ ưu tiên của toán tử `??`

Toán tử `??` có mức ưu tiên là 5 khá là thấp (quan sát [bảng mức độ ưu tiên](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table)), sau hầu hết các toán tử thông thường, nhưng vẫn được thực thi trước toán tử gán, hay toán tử ba ngôi. Chúng ta phải bỏ các toán tử vào trong dấu ngoặc sao cho đúng. Vì vậy, nếu chúng ta cần sử dụng các toán tử khác của biểu thức `??` thì các giá trị cần được xem xét trong dấu ngoặc đơn: Ví dụ:

```
let height = null;
let width = null;
 
// sử dụng cặp dấu ngoặc đơn
let result = (height ?? 10) * (width ?? 10);
 
console.log(result); // 100
```

Ngược lại, nếu chúng ta bỏ qua các dấu ngoặc, vì `*` có độ ưu tiên cao hơn `??` , nó sẽ thực hiện `*` trước, dẫn đến kết quả sai:

```
let result = height ?? 100 * width ?? 50; // 0

let result = height ?? (10 * width) ?? 10; // 0
```

## Sử dụng kết hợp `??` với `&&` và `||`

JavaScript cấm sử dụng `??` kết hợp với toán tử `&&` và `||` vì lý do an toàn, trừ khi phải cho biểu thức vào dấu ngoặc đơn một cách rõ ràng:

```
null || undefined ?? 'viblo'; // raises a SyntaxError
true || undefined ?? 'viblo'; // raises a SyntaxError

(null || undefined) ?? 'viblo'; // 'viblo'
```

## Trình duyệt hỗ trợ
Hiện tại thì hầu hết các trình duyệt đều đã hỗ trợ toán tử `??`:

![image.png](https://images.viblo.asia/2d10475d-e7a7-40b0-8df8-7f3b21103eab.png)
# 2. Optional chaining operator (?.)
**Cú pháp: `obj?.prop`**

## Định nghĩa

Trong javascript, bạn thường sẽ cần truy xuất các **key** trong **object**. Một số trường hợp chúng ta sẽ truy xuất các key không hề tồn tại, như thế javascript sẽ báo lỗi và app lăn ra chết. Chúng ta có thể khắc phục nó bằng cách sử dụng optional chaining thay vì check hàng loạt các điều kiện tồn tại. Như vậy sẽ giúp code clean hơn rất nhiều.

Mình sẽ đi vào từng trường hợp để hiểu rõ hơn về toán tử này:

## Optional chaining với object

```
let obj = null;
let count = 0;
let result = obj?.[count++];
console.log(count); // 0 as value was not incremented
```

Thông thường, nếu không sử dụng toán tử `?.` thì trường hợp này sẽ xảy ra lỗi do `obj` có giá trị `null`. Khi dùng `?.`, nó sẽ bỏ qua và tiếp tục thực thi chương trình mà không tính toán biểu thức, vì vậy mà biến `count` lúc này sẽ không tăng giá trị mà vẫn giữ nguyên là 0.

## Optional chaining với thuộc tính của object

```
let customer = {
  name: "Hoang",
  occupation: {
       company: 'Sun Asterisk',
       position: 'developer'
   },
};
let customerCity = customer.details?.city;
console.log(customerCity); // expected output: undefined

// Stacked optional chaining: sử dụng ?. nhiều lần với cùng một nested object
let customerCity = customer.details?.address?.city;
```

Nếu toán hạng bên trái của `?.` là `null` hoặc `undefined`, biểu thức tính toán sẽ có giá trị là `undefined`.

## Optional chaining với biểu thức

Bạn cũng có thể sử dụng toán tử optional chaining khi truy cập vào thuộc tính là biểu thức sử dụng dấu ngoặc vuông như trường hợp dưới đây:

```
let nestedProp = myObj?.['prop' + 'Name'];
```

## Optional chaining với gọi hàm
Bạn có thể sử dụng nó trong trường hợp gọi một hàm chưa chắc đã tồn tại.

```
let customerName = customer.name?.getFullName?.(); // method getName() does not exist
console.log(customerName); // expected output: undefined
```

Trong trường hợp này, biểu thức sẽ ngay lập tức trả về `undefined` thay vì ném ra một exception nếu method không tồn tại. Nó sẽ vô cùng hữu ích khi bạn sử dụng API với method không có sẵn, do version hoặc do method đó không hỗ trợ trên thiết bị người dùng...

## Truy cập phần tử của mảng với optional chaining

```
let arr = [1,2,3]
let arrayItem = arr?.[10];
console.log(arrayItem); // undefined
```

Trong trường hợp bạn truy cập vào một mảng với index không tồn tại trong mảng đó thì chương trình sẽ chỉ trả về `undefined` thay vì gây ra lỗi.

## Kết hợp với toán tử nullish coalescing `??`

Với những gì mình đã giới thiệu về cả 2 toán tử, liệu chúng ta có thể kết hợp chúng lại hay không? Câu trả lời là có, cùng xem qua 1 ví dụ sau:

```
let customer = {
  name: "Hoang",
  occupation: {
       company: 'Sun Asterisk',
       position: 'developer'
   },
};
let customerCity = customer.details?.city ?? 'Unknown City';
console.log(customerCity); // Unknown City

let customerName = customer.name?.getFullName?.() ?? 'Le Minh Hoang';
console.log(customerName); // Le Minh Hoang
```

Vậy là chúng ta vẫn có thể sử dụng `??` để gán giá trị mặc định khi truy cập thuộc tính của 1 đối tượng là `null` hoặc `undefined`.

## Tóm lược về optional chaining

Như vậy cú pháp `?.` có các hình thức:

* `obj?.prop` – trả về `obj.prop` nếu `obj` tồn tại, nếu không `undefined`.
* `obj?.[prop]` – trả về `obj[prop]` nếu `obj` tồn tại, nếu không `undefined`.
* `obj.func?.(args)` – gọi hàm `obj.func(args)` nếu `obj` tồn tại, nếu không trả về `undefined`.

Như chúng ta có thể thấy, tất cả chúng đều đơn giản và dễ sử dụng. Việc `?.` kiểm tra phần toán hạng bên trái `null/undefined` và cho phép đánh giá có nên truy cập tiếp không. Một chuỗi `?.` cho phép truy cập một cách an toàn các thuộc tính lồng nhau.

Tuy nhiên, chúng ta nên áp dụng một `?.` cách cẩn thận, chỉ khi nào phần toán hạng bên trái không tồn tại. Vì nó sẽ có thể che giấu lỗi lập trình từ chúng ta, nếu chúng xảy ra.

## Trình duyệt hỗ trợ
Hiện tại thì hầu hết các trình duyệt đều đã hỗ trợ toán tử `?.`:
![image.png](https://images.viblo.asia/42f3ed6c-eb6f-47cd-96c4-cefbf2e1f06c.png)

# Tổng kết

Qua nội dung bài viết, chắc hẳn mọi người đã hiểu rõ hơn ý nghĩa và cách sử dụng của 2 toán tử trên rồi nhỉ :D. Việc sử dụng linh hoạt các toán tử trên sẽ giúp chúng ta giảm bớt đi thời gian thao tác với object, function và cũng khiến code clean hơn. Ngon lành như vậy mà vẫn không sử dụng thì còn muốn sử dụng cái gì nữa đây =))

Ngoài 2 toán tử mà mình vừa kể đến thì Javascript vẫn còn rất nhiều các operators hay ho khác nữa, dành chút thời gian vào docs tìm hiểu để sử dụng triệt để chúng nhé :D

Cảm ơn mọi người đã dành thời gian đọc bài, +1 upvote nếu bạn thấy nó hữu ích nhé <3 

Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators