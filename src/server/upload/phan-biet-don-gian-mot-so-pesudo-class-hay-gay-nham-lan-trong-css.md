Trong bài viết này mình sẽ nói ngắn gọn phân biệt sự khác nhau trong một số Pesudo-class thường hay gây ra nhầm lẫn của CSS.
## 1. :first-child và :first-of-type
Định nghĩa đơn giản 2 pesudo-class này như sau:
* `:first-child` : Chọn các thành phần là con đầu tiên của cha nó. 
* `:first-of-type` : Chọn **kiểu thành phần con** đầu tiên của cha nó.

Để rõ hơn mời bạn theo dõi ví dụ đơn giản sau của mình:

{@embed: https://codepen.io/hoangtrunghuy/pen/vvPzmV}


Như bạn đã thấy trong ví dụ trên khi mình dùng `:first-child` thì chỉ có thằng con đầu tiên của  `<div class="parent1">` sẽ được nhận CSS, cụ thể là thẻ `<h1>` có nền màu đỏ. Còn khi dùng `:first-of-type` thì bạn đã thấy rõ nó sẽ chọn tất cả các thằng con là loại thẻ xuất hiện lần đầu tiên trong  `<div class="parent2">`, cụ thể chính là các thẻ `<h1>`, `<div>`, `<p>` còn lại các thẻ mà xuất hiện từ lần thứ 2 trở lên sẽ không nhận được CSS.

Tương tự như vậy bạn có thể phân biệt đơn giản giữa `:last-child` và `:last-of-type`...

## 2. :nth-child() và :nth-of-type()
Định nghĩa đơn giản:
* `:nth-child(n)` : Chọn thành phần con thứ "n" trong thành phần cha.
* :`nth-of-type(n)` : Chọn **kiểu thành phần con** thứ "n" trong cha.

Mình có ví dụ đơn giản sau:

{@embed: https://codepen.io/hoangtrunghuy/pen/pqBYYB}


Trong ví dụ trên bạn có thể thấy khi dùng `:nth-child(2)` nó sẽ chọn thằng con thứ 2 của `<div class="parent1">`  mà không phân biệt theo loại thẻ HTML. Còn khi dùng `div:nth-of-type(2)` nó sẽ chọn đúng thẻ con `<div>` thứ 2 thuộc lọai thẻ  `<div>` nằm trong `<div class="parent2">`  để tô nền thành màu cam.

Tương tự bạn có thể phân biệt đơn giản giữa `:nth-last-child()` và `:nth-last-of-type()`...

## 3. :only-child và :only-of-type
Định nghĩa đơn giản:
* `:only-child` : Chọn những thành phần con là con duy nhất trong cha nó (cha chỉ có 1 con).
* `:only-of-type` : Chọn các thành phần con là **kiểu duy nhất** trong cha nó (cha có nhiều loại con, chọn những đứa con là kiểu duy nhất).

Mình có ví dụ đơn giản sau:

{@embed: https://codepen.io/hoangtrunghuy/pen/qLwwjX}

Như trên khi bạn dùng `:only-child` thì chỉ có `<div class="parent1">` đầu tiên có duy nhất 1 thẻ `<p>` mới được nhận CSS còn `<div class="parent1">`  sau có chứa 2 thẻ `<p>` nên sẽ không được nhận CSS. 

Tiếp theo khi mà dùng `:only-of-type` thì chỉ có những thẻ con nằm trong `<div class="parent2">` và chỉ xuất hiện 1 lần (loại thẻ HTML xuất hiện 1 lần duy nhất trong `<div class="parent2">`) sẽ nhận được CSS cụ thể là các thẻ `<span>`, `<b>`, `<i>`.


> Tổng kết: *phân biệt đơn giản là cứ pesudo-class nào có từ khóa `-of-type` thì bạn hãy quan tâm ngay đến loại thẻ HTML, nhớ nhé loại thẻ HTML!!.* :joy::sweat_smile:


Trên đây là những chia sẻ ngắn gọn của mình về *phân biệt đơn giản một số Pesudo-class hay gây nhầm lẫn trong CSS* rất mong sẽ nhận được ý kiến đóng góp của  bạn. Nếu bạn có những điều mới và thú vị về chủ để này hãy chia sẻ dưới comment cho mình biết nhé. Cảm ơn bạn đã quan tâm :joy::wink::wink::relaxed:



.