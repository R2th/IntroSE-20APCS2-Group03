Là một dev FrontEnd, Javascript là một công cụ giúp chúng ta thỏa sức sáng tạo. Để sáng tạo tốt hơn thì ta nên biết rõ hơn về những tính năng tốt của nó. Và ở đây, để góp phần cho sự sáng tạo đó mình xin giới thiệu về những tính năng tốt của functions.

Javascript là một ngôn ngữ cung cấp cho ta rất nhiều kịch bản về function(Regular Function, Anonymous Function, Arrow Function...).

Chúng ta là những lập trình viên nói chung và lập trình viên javascript nói riêng thường xem nhẹ vấn đề function. Xin đừng bị lừa bởi một hàm javascript có vẻ đơn giản, nhìn vậy thôi chứ bên trong nó chứa đựng rất nhiều sự phức tạp.

Bài viết này mình và các bạn sẽ cùng khám phá về chủ đề function mà chúng ta cần và rất cần phải hiểu này để giúp bạn giải quyết được nhiều vấn đề phức tạp trong khi code

**1. Function trong Javascript là gì?**

Đầu tiên mình xin giới thiệu lại về khái niệm function trong javascript:

Function (hàm, chức năng), gọi chung là subprogram (chương trình con) có thể được gọi ở bên ngoài hoặc bên trong chính nó.
Nó bao gồm tập hợp các câu lệnh gọi là function body. Các giá trị có thể truyền đến một hàm, và một hàm có thể trả về giá trị. 

Ví dụ một functon dùng để check biến đầu vào là undefined
```
function cube(x) {
  if (typeof x === 'undefined') {
    x = 5
  }

  return x * x * x
}

cube()
```
**2. Regular function**

Hãy nhìn lại ví dụ khi nãy.

```
function cube(x) {
  if (typeof x === 'undefined') {
    x = 5
  }

  return x * x * x
}

cube()
```

Từ ví dụ ta thấy 1 function cơ bản trong Javascript bao gồm: keyword là `function`, name function là `cube`, parameters là `x` và body trong nó.

Lưu ý: Ở Javascript nói riêng và những ngôn ngữ lập trình khác nói riêng thì khi ta khai báo một function hoặc method thì ta nên đặt tên cho đúng ngữ nghĩa cho dev sau nhìn vào dễ hiểu hơn cũng như khi maintain thì dễ hơn.

**3. Anonymous Function**

Hàm nặc danh được sử dụng rất nhiều trong JavaScript (ngoài ra nó còn được xây dựng trong nhiều ngôn ngữ khác như C++11+, C#, Java, Python), nhất là sự hiển hiện của nó khi sử dụng với JQuery. Để dùng cho hiệu quả và hiểu rõ hơn về các cú pháp của JavaScript cho trường hợp dùng loại hàm này.

Example:

```
function() {
        console.log("clicked");
}
```

Ta vẫn có thể truyền thêm tham số vào Anonymous Function nếu ta muốn. Tuy nhiên, câu hỏi đặt ra vẫn là:

•	Cách sử dụng Anonymous Function. Nếu không có tên hàm, thì làm sao gọi hàm?

•	Anonymous Function ra đời để làm gì?
Để sử dụng ta có thể dùng cú pháp gán hoặc thêm dấu ngoặc tròn (), và xem như đối tượng (hàm) này đã được hình thành và gọi ngay sau đó.

Và để trả lời cho câu hỏi Anonymous Function dùng để làm gì thì ta có ví dụ.

Ta có một hàm tính toán 2 số cộng lại ở tại thời điểm chạy và không dùng ở chỗ khác, thì thay vì ta đi định nghĩa một hàm riêng biệt rồi gọi lại ta có thể dùng Anonymous Function ở đó. Lợi thế ở đây là đối với những function bình thường thì trình biên dịch sẽ biên dịch và lưu vào bộ nhớ thì đối với Anonymous Function thì nó sẽ được sinh ra khi trình biên dịch xử lý tới vị trí của nó.

Vậy tóm lại Anonymous function thường được dùng khi một đoạn xử lý chỉ cần được gọi ở một chỗ duy nhất, ta sẽ có thể viết hàm riêng rồi sau đó truyền vào hàm vào chỗ đó.

**4. Function Expression**

*Anonymous function dùng để định nghĩa một chức năng dùng ở nhiều nơi.*

Có thể các bạn sẽ thấy mình hơi ba phải vì ở trên vừa mới giới thiệu: "Anonymous function thường được dùng khi một đoạn xử lý chỉ cần được gọi ở một chỗ duy nhất, ta sẽ có thể viết hàm riêng rồi sau đó truyền vào hàm vào chỗ đó".

Nhưng không vô lý đâu. Vì với cách dưới đây thì nó sẽ là vô cùng thuyết phục

```
/// teng teng tèng
const handleClick = function() {
        console.log("clicked");
}
```

Và đây chính là Function expresstion. Thật ra nó chỉ đơn giản là ta gán một biến bằng với một Anonymous function. Và rồi ta có thể sử dụng nó như một Regular Function.

Và để tìm hiểu sự khác biệt của Function Expression và Regular Function thì mình sẽ giới thiệu ở một bài viết khác.

**5. Arrow Function**

Không lằng nhằng ta sẽ đi vào cú pháp của một arrow function 

```
() => {}
// *@@@@NÀ NÍ!!!!!!!!!!* cái gì vậy? Cấu trúc đâu? Kỳ quá dị má!
```


Các bạn yên tâm, đây chính là cấu trúc của một arrow funtion.

Vì sao lại có cách viết như thế? => Vì đơn giản là nó gọn hơn, tránh được việc phải gõ từ khoá function, return và dấu ngoặc nhọn. Cũng như  giúp đơn giản hóa function scoping cũng như từ khóa this.

Tuy nhiên để khai báo một arrow function ta có rất nhiều cách:

```
// Explicit Return, Multi-Line
a => {
  return a
}

// Explicit Return, Single-Line
a => { return a }

// Implicit Return, Single-Line
a => a

// Multiple Parameters, Parentheses Required
(a, b) => a, b
```

Đó! các bạn thấy xịn thực sự chưa. Tuy nhiên các bạn cần lưu ý một vài điểm như sau:

+ Với arrow function thì nếu chỉ có 1 arguments thì ta không cần dầu ngoặc tròn mà chỉ cẩn viết như Explicit Return, Single-Line.

+ Không cần khai báo gì thêm mà chỉ xử lý đơn giản như a + b, a - b, bla... bla... thì không cần phải dùng từ khóa return và dấu ngoặc nhọn mà chỉ cần viết như Multiple Parameters, Parentheses Required

**6. Immediately Invoked Function Expression**

IIFE có nghĩa là khởi tạo một function và thực thi nó ngay lập tức. Cú pháp của IIFE là:
```
(function(name){
    console.log(`Hello ${name}`)
})('anonystick'); //Function calling
```

Khi sử dụng IIFE function thì có rất nhiều ưu điểm cho trường hợp này như scope, global... Bởi vậy  đã có một bài riêng nói về [Javascript: IIFE là gì? Vì sao nên sử dụng"](https://anonystick.com/blog-developer/javascript-iife-la-gi-2019051740389690) bạn có thể dành thời gian tìm hiểu thêm nếu bạn thật sự muốn quan tâm.