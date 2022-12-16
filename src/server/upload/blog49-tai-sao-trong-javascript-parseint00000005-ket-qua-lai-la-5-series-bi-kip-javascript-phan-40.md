![image.png](https://images.viblo.asia/e7967ac2-f1d5-49d9-b4fa-03d261037b39.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Tại sao trong JavaScript `parseInt(0.0000005) === 5`😱? Một câu hỏi tuyệt vời!
-------------------------------------------------------------------------

`parseInt(0.0000005)`, output mà các bạn mong chờ là 0, nhưng tại sao nó lại là 5? Hãy cùng nhau tìm hiểu vấn đề này.

1\. Khi nào thì sử dụng `parseInt`?
=================================

Trước hết, bạn thường sử dụng khi `parseInt` ở đâu và khi nào? Hầu hết, chúng ta sử dụng nó để `parse - phân tích` một **chuỗi** và trả về một **số nguyên tương ứng** của nó.

2\. Về hàm `parseInt`
========================

Theo [tài liệu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) của MDN, _“parseInt(string, radix) phân tích đối số string và trả về một số nguyên với cơ số đã chỉ định (radix là cơ số trong TOÁN mà ae đã học hồi cấp 3).”_

**Cú pháp**

```javascript
parseInt(string)   
parseInt(string, radix)
```

Ồ vậy thì có lẽ một phần của câu trả lời ở đây. Tức là khi ae xài cái hàm này mà ko cung cấp tham số thứ 2 (cơ số) -> nó sẽ là mặc định. Nếu đã là mặc định thì nó có thể là một số nào đó mà ae chưa biết hoặc phải đọc tài liệu mới biết. Nên việc ae ko lường trước được giá trị trả về của nó là chuyện rất bình thường.

**Test phát xem sao**

```javascript
parseInt('0.5') // 0  
parseInt('0.5') // 0  
parseInt('0.05') // 0  
parseInt('0.005') // 0  
parseInt('0.0005') // 0  
parseInt('0.00005' ) // 0  
parseInt('0.000005') // 0  
parseInt('015') // 15  
parseInt('015', 8) // 13  
parseInt('15px', 10) // 15
```

Vậy là cái radix này ảnh hưởng đến kết quả phết nhở :D 

3\. Làm thế nào để `parseInt` chuyển đổi `string` sang `number`?
==========================================

Khi tham số đầu tiên của `parseInt` là một số, thì nó phân tích cú pháp như thế nào?

Sự thật của `parseInt(0.0000005) === 5` cũng là đây ...

3.1. Bước đầu tiên? Chuyển đổi số thành một chuỗi.
==================================================

Sử dụng hàm `String` để xem output của mỗi giá trị trả về là gì:

```javascript
// Tất cả đều được chuyển thành chuỗi hết
String(0.5);      // => '0.5'
String(0.05);     // => '0.05'
String(0.005);    // => '0.005'
String(0.0005);   // => '0.0005' 
String(0.00005);  // => '0.00005'
String(0.000005); // => '0.000005'
String(0.0000005); // => '5e-7' Chú ý ở đây nhé
```

3.2. Bước thứ hai là thực hiện thao tác làm tròn số.
====================================================

“Khi chúng ta sử dụng `parseInt(0.0000005)`, nó bằng sẽ bằng `parseInt('5e-7')`.

> _parseInt chỉ có thể phân tích phần đầu của chuỗi dưới dạng giá trị số nguyên; nó bỏ qua bất kỳ đơn vị nào không thể được hiểu là một phần của ký hiệu số nguyên._

```javascript
parseInt(0,0000005) // 5
parseInt('5e-7') // 5
// Nó tương tự như
parseInt('15px', 10) // 15
```

**Cuối cùng, câu trả lời sẽ chỉ trả về 5 vì đó là ký tự duy nhất là một số cho đến một ký tự không phải là e, vì vậy phần còn lại của nó e-7 sẽ bị loại bỏ.”**

4\. Cách lấy phần nguyên của một số có dấu phẩy động một cách an toàn?
==================================================================

Nên sử dụng hàm `Math.floor()` sau:

```javascript
Math.floor(0.5);      // => 0
Math.floor(0.05);     // => 0
Math.floor(0.005);    // => 0
Math.floor(0.0005);   // => 0
Math.floor(0.00005);  // => 0
Math.floor(0.000005); // => 0
Math.floor(0.0000005); // => 0
```

5\. Roundup
==========================

Bây giờ, bạn có thể giải thích tại sao `parseInt(99999999999999999999999999)` lại bằng 1 không?

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

6\. Ref
==========================
> https://tuan200tokyo.blogspot.com/2022/11/blog49-tai-sao-trong-javascript.html