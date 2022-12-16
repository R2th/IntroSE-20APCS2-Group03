## Mở bài
Chào các bạn, hôm nay mình sẽ tiếp tục series về CSS cơ bản. Bài viết lần này như tiêu đề đã ghi rõ, mình sẽ giới thiệu và phân tích về Specificity trong CSS. Đây là phần kiến thức quan trọng bậc nhất (không nhất thì nhì :D) nhưng lại không quá phức tạp, mình sẽ cố gắng trình bày những thứ đơn giản mà chúng ta hay sử dụng hàng ngày thôi. Nếu các bạn thấy có thiếu sót hay phản hồi gì thì vui lòng cho mình biết ở comment bên dưới nhé.

Bài viết gốc của mình được chia sẻ tại đây: https://phucluong.com/css-specificity-la-gi-vay/

## Đặt vấn đề
Trong một buổi phỏng vấn khi còn là junior developer, mình từng được đặt một câu hỏi cơ bản mang tính lý thuyết cao nhưng mình không trả lời được, mình xin viết lại ra đây (không chính xác hoàn toàn nhưng bản chất câu hỏi không đổi)
``` html
<html>
  <head>
    <style>
      body h1 { color: green; }
      html h1 { color: purple; }
    </style>
  </head>

  <body>
    <h1>text</h1>
  </body>
</html>
```

Theo bạn thì thẻ `h1` sẽ có màu `green` hay `purple`? Câu trả lời là màu `purple`, các bạn có thể tự mình chứng thực kết quả. Phần giải thích cho bài toán này mình để ở cuối bài viết.

Mình đã không trả lời được câu hỏi này, nhưng thời điểm đó mình cho rằng người phỏng vấn chỉ đang đưa ra câu hỏi mang tính đánh đố thôi, chứ thực tế ai lại viết CSS như vậy. Và sau này mình mới nhận ra, đó không phải là một câu hỏi mang tính đánh đố, mà nó là một phần trong một mảng kiến thức vô cùng quan trọng của CSS, đó là **CSS Specificity** mà bất kì frontend developer nào cũng cần phải hiểu và nắm vững. Nếu bạn không hiểu hoặc không biết về nó, thì bạn hãy tự vấn mình rằng có phải bạn đang viết CSS theo cảm tính, hoặc theo thói quen hàng ngày hay không.

Ok vậy hãy cùng mình tìm hiểu xem **CSS Specificity** là gì nhé.

## CSS Specificity là gì?
Hãy lấy một ví dụ đơn giản sau để mô tả cho định nghĩa bên dưới:
``` html
<div class="parent">
  <span class="child" id="sample">Sample text</span>
</div>
```
``` css
/* thẻ span sẽ có màu gì đây? */
.parent .child {
  color: red;
}

.child {
  color: green;
}

#sample {
  color: blue;
}
```
Ôi trời, một thẻ `span` thôi nhưng lại có đến 3 selector cố gắng "tranh nhau" thay đổi màu sắc của nó, giống như một cuộc chiến vậy. Nhưng tin vui là cuộc chiến này sẽ luôn luôn có người chiến thắng, nhờ vào trọng tài là browser. Tuy nhiên browser làm thế nào để xác định người chiến thắng? Câu trả lời là nhờ vào một tập các quy tắc, và browser cứ dựa theo tập quy tắc này để xác định ai là người chiến thắng. CSS Specificity chính là một phần chính yếu trong "tập quy tắc" đấy nhé.

Mình sẽ định nghĩa đơn giản như sau:
> Specificity là một trọng số mà browser dựa vào đó để xác định xem một element sẽ có css style là gì.

Trọng số chỉ đơn giản như việc 2 > 1 thì 2 chiến thắng, hay 3 > 2 thì 3 chiến thắng, vậy thôi. Một điều cũng quan trọng không kém: **Specificity là trọng số của CSS selectors nhé.** Nói nôm na hơn, browser sẽ cố gắng xác định xem selector nào là cụ thể nhất (most specific) và style theo selector đó.

"Tập quy tắc" này có phức tạp không? Xác định trọng số Specificity có phức tạp không? Browser dùng tới nó thì chắc hẳn là nó phức tạp lắm? Câu trả lời là nó không hề phức tạp và developer vẫn có thể học thuộc nó một cách dễ dàng. Nói cách khác, 80% các quy tắc là rất đơn giản và dễ hiểu, có thể học thuộc được, còn 20% quy tắc còn lại sẽ khá rối rắm mà ít khi chúng ta sử dụng trong thực tế, nên chúng ta không cần phải nhớ nó, cứ để browser làm việc của nó là được.

Tại sao developer lại nên học thuộc tập quy tắc này (80% các quy tắc thường sử dụng thôi)? Điều này mình không hề chém gió đâu, nếu bạn là một frontend developer chuyên xử lý layout và CSS, thì đây là một kiến thức mà bạn **nên** nằm lòng, chứ không phải chỉ là để đọc chơi cho biết. Tuy nhiên mình cũng không phải muốn các bạn thuộc nó một cách máy móc, mà nên hiểu nó. Và khi hiểu rồi thì sẽ tự thuộc thôi, hoặc khi quên thì chỉ cần đọc lại tí xíu là nhớ.

## Cách xác định trọng số Specificity và cách so sánh
Cách xác định trọng số của CSS selectors chỉ đơn giản là chơi trò chơi đếm số và điền vào 3 ô trống bên dưới thôi.
![GrabCV - CSS Specificity](https://images.viblo.asia/9ce03f71-4c0c-495c-9014-5152f57f370b.jpg)
<div align="center">https://css-tricks.com/specifics-on-css-specificity/</div>

Ở ô đầu tiên (ID), mình sẽ đếm xem selector có bao nhiêu `id`. Ví dụ `#parent { }` là 1, `#parent #child { }` là 2. Đếm xong rồi thì điền vào ô trống thôi.
![GrabCV - CSS Specificity](https://images.viblo.asia/794cb0a1-b75c-4886-bca7-d33d4872c3eb.jpg)

Ở ô thứ 2, mình sẽ đếm xem có tổng cộng bao nhiêu class (ví dụ `.list`), psuedo-class (ví dụ `:hover`) và attribute (ví dụ `[type=radio]`).
![GrabCV - CSS Specificity](https://images.viblo.asia/546a0ca2-5d65-4af1-8c3f-e8a840f240fd.jpg)

Ở ô thứ 3, mình sẽ đếm xem có tổng cộng bao nhiêu type selector (ví dụ `h1`), pseudo-element (ví dụ `::before`)
![GrabCV - CSS Specificity](https://images.viblo.asia/e66fe525-14b0-4e9a-93d4-719606c3d151.jpg)

Chúng ta cơ bản đã xong bước xác định trọng số rồi, giờ thì so sánh chúng thôi. Cách so sánh cực kì đơn giản, như toán lớp 1 vậy:

* `1,1,0` lớn hơn `1,0,0` (110 > 100)
* `0,1,0` lớn hơn `0,0,1` (10 > 1)
* `1,3,0` lớn hơn `1,0,3` (130 > 103)
* `0,0,1` bằng với `0,0,1` (1 === 1)

Ồ, nếu bằng nhau thì thế nào? **Nếu bằng nhau thì thằng nào được khai báo sau cùng sẽ thắng.** Điều này mình sẽ lặp lại ở phần tiếp theo. Giờ thì cùng nhau thực hành đếm trọng số qua các ví dụ sau nhé:

* `#parent`: 1,0,0
* `#parent #child`: 2,0,0
* `[id="parent"]`: 0,1,0
* `li`: 0,0,1
* `ul > li`: 0,0,2
* `ul ol + li`: 0,0,3
* `h1 + *[rel=up]`: 0,1,1
* `ul ol li.red`: 0,1,3
* `li.red.level`: 0,2,1
* `li.name::before`: 0,1,2
* `#parent:not(ul)`: 1,0,1
* `.foo:is(.bar, #bar)`: 1,1,0

## Một số quy tắc khác
Có một số quy tắc khác ít nhiều ảnh hưởng đến trọng số Specificity mà bạn không thể bỏ qua:

* Universal selector `*` sẽ được bỏ qua khi xác định trọng số. Ví dụ selector `*` sẽ có trọng số là 0,0,0. Hay `*.foo` sẽ có trọng số là 0,1,0. Điều này có nghĩa là `*.foo` và `.foo` là hoàn toàn giống nhau.
* Combinators như `+`, `>`, `~`, `||` hay space ` ` cũng sẽ được bỏ qua khi xác định trọng số. Ví dụ `.parent .child` và `.parent > .child` có cùng trọng số là 0,2,0.
* `:not()` không được xem là pseudo-class nên cũng được bỏ qua khi tính trọng số. Tuy nhiên trọng số vẫn sẽ được tính với param truyền vào nó. Ví dụ: `div:not(.parent) p` sẽ có trọng số là 0,1,2.
* `:is()` cũng tương tự với `:not()`, tuy nhiên vì chúng ta có thể truyền vào một danh sách selector, nên trọng số sẽ được tính với **matched selector** nào có trọng số cao nhất. Ví dụ: `div:is(.parent, #foo)` sẽ có trọng số có thể vừa là 0,1,1, vừa có thể là 1,0,1, vừa có thể là 1,1,1, tùy theo việc nó match với bao nhiêu trường hợp. Cũng phức tạp ghê phải không nào.
* "Inline styles" sẽ luôn luôn có trọng số cao nhất, đánh bật tất cả các đối thủ (ngoại trừ trùm cuối `!important`). Ví dụ bên dưới thì dù bạn cố gắng viết CSS (external CSS) để thay đổi color của nó đều vô ích (tất nhiên như mình đã nói, bạn vẫn có thể nếu dùng đến `!important`):
``` html
<span class="text" style="color: red">text</span>
```

``` css
.text {
  color: green; /* không được đâu nhé, nó thua inline style */
}

.text {
  color: blue !important; /* khi đã dùng tới trùm cuối thì đừng hỏi nữa */
}
```

* Trùm cuối của chúng ta `!important` có thể đánh bại mọi đối thủ, ngay cả inline style vốn đã vô cùng mạnh mẽ. Bạn xem ví dụ ngay phía bên trên là rõ. Tuy nhiên nếu 2 anh trùm cuối cùng đánh nhau thì thế nào? Câu trả lời ở quy tắc ngay bên dưới. Ví dụ:
``` css
.text {
  color: green !important; /* ê blue, đấu với tao không */
}

.text {
  color: blue !important; /* tao sợ mày à green, chơi luôn */
}
```

* **Khi 2 hoặc nhiều selector có cùng trọng số, thì selector nào được khai báo cuối cùng sẽ thắng. Trong cuộc đối đầu ở quy tắc bên trên, `blue` là người chiến thắng.** Tất nhiên nếu ta đổi vị trí 2 selector này cho nhau, thì `green` lại là người chiến thắng. Đây là một lỗi thường thấy khi chúng ta không am hiểu về Specificity (thường là các bạn junior), vô tình thay đổi vị trí hoặc chỉnh sửa CSS vô tội vạ làm thay đổi trọng số, dẫn đến lỗi style không mong muốn.

## Độ gần/xa (proximity) có ảnh hưởng không?
Thật sự mình không biết nên dịch từ "proximity" thế nào cho đúng, nhưng ý nghĩa của nó có hiểu qua ví dụ ở đầu bài viết.
``` html
<html>
  <head>
    <style>
      body h1 { color: green; }
      html h1 { color: purple; }
    </style>
  </head>

  <body>
    <h1>text</h1>
  </body>
</html>
```

"Proximity" ám chỉ việc thẻ `h1` gần với `body` hơn là `html`, vậy liệu selector `body h1` có trọng số lớn hơn `html h1` không? Câu trả lời là **KHÔNG**.

Trong trường hợp này, vì cả 2 đều có cùng trọng số là 0,0,2, chúng ta sẽ sử dụng quy tắc "thằng nào được khai báo cuối cùng sẽ thắng". Vậy kết quả sẽ là `html h1` chiến thắng, màu của thẻ `h1` sẽ là `purple`.

## Lưu ý &amp; suy ngẫm

* Một selector với trọng số lớn liệu có tốt không? Ví dụ bên dưới, với trọng số là 2,3,4, bạn sẽ rất khó để override nó, và sẽ làm cho code của bạn rối rắm và khó để maintain hay extend:
``` css
/* Trọng số là 2,3,4 */
#main article.sports table#stats tr:nth-child(even) td:last-child
```

* Bất kì khi nào bạn rơi vào tình huống không hiểu vì sao element của mình lại có style không như mong muốn, thì Specificity sẽ giúp bạn. Tuy nhiên thay vì ngồi đếm trọng số bằng tay, giờ đây với công cụ devtools mạnh mẽ của các browser thì việc xác định lỗi style là vô cùng đơn giản. Tuy nhiên các công cụ này cũng xây dựng trên nguyên lý CSS Specificity mà thôi chứ không có gì khác biệt đâu.

* Specificity chỉ có ý nghĩa nếu một element có nhiều selector cùng trỏ (target) đến nó. Nói nôm na là nếu cuộc chiến mà chỉ có 1 người tham gia thì hiển nhiên người đó thắng rồi.

* Trong CSS có việc kế thừa style từ các element cha. Tuy nhiên việc kế thừa này sẽ luôn xếp sau những selector trỏ (target) đích danh đến element nhé. Bạn để ý khi sử dụng devtools là thấy thôi.
  
* Việc có nên sử dụng inline styles không vẫn là một vấn đề gây tranh cãi. Một số linter sẽ warning nếu bạn viết inline styles, nhưng bạn vẫn có thể tắt warning đó đi nếu muốn. Một trong những lý do là vì trọng số của nó quá cao sẽ dễ gây ra các lỗi không mong muốn, hoặc sẽ rất khó để override và buộc phải dùng đến `!important`. Một lý do khác nữa là với nhiều "chuyên gia" thì CSS nên đặt trong các file .css để dễ quản lý, chứ nếu nằm trong style (html) thì rối loạn lên hết?

* Mặc dù trùm cuối `!important` vô cùng mạnh mẽ, việc dùng đến `!important` không phải là một giải pháp tốt và cần hạn chế sử dụng, giống như inline styles mà mình vừa đề cập đến. Trước khi buộc phải dùng đến `!important`, bạn hãy suy xét cẩn thận xem chúng ta có thể sử dụng CSS Specificity để đạt được mục đích hay không.

## BEM &amp; ITCSS
Ở đây mình không phải muốn giải thích hay giới thiệu chi tiết về 2 "phương pháp" này, mà chỉ muốn chỉ ra một vài điểm liên quan với Specificity thôi. Ngoài BEM và ITCSS ra còn có nhiều phương pháp khác nữa, nhưng cơ bản đều xây dựng trên Specificity cả.

**BEM**: mình mặc định bạn đã biết đến [BEM](http://getbem.com/introduction/), thì một vài tôn chỉ của nó có thể kể đến như:

* Tránh sử dụng id (`#foo`): lý do thì như mình đã chia sẻ, id có trọng số lớn và khá khó để override, nên việc cố gắng override nó sẽ dễ đẩy CSS của bạn đến một tương lai không mấy sáng sủa.
* Tránh nested selector, cố gắng làm phẳng selector: cũng cùng lý do, nested selector cũng làm tăng trọng số của selector. Ví dụ BEM sẽ khuyến khích:
``` css
/* BEM thích điều này, trọng số chỉ là 0,1,0
nhưng vẫn rất specific và khó bị conflict */
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}

/* Trọng số sẽ là 0,2,0, cũng không quá tệ, nhưng BEM không khuyến khích,
và nó cũng rất dễ bị conflict. */
.block {}
.block .elem1 {}
.block .elem2 {}
.block .elem3 {}
```

**ITCSS**: cũng là một phương pháp ứng dụng triệt để các quy tắc của CSS Specificity, giúp CSS của bạn có thể dễ dàng scale, extend và maintain (SEM). ITCSS có rất nhiều thứ để nói nhưng nằm ngoài phạm vi bài viết nên mình xin dừng ở đây, nếu các bạn quan tâm thì để lại comment để mình làm một bài viết riêng về nó nhé.

## CSS Specificity calculator
Chỉ cần search google là bạn sẽ thấy một vài tool sẽ giúp bạn xác định trọng số của selector:

[https://polypane.app/css-specificity-calculator/](https://polypane.app/css-specificity-calculator/)  
[https://www.codecaptain.io/tools/css-specificity-calculator](https://www.codecaptain.io/tools/css-specificity-calculator)  
[https://isellsoap.github.io/specificity-visualizer/](https://isellsoap.github.io/specificity-visualizer/)  

Tuy nhiên các bạn cũng không nên hoàn toàn tin tưởng vì các tool này chỉ đếm trọng số trong những trường hợp đơn giản, còn những trường hợp phức tạp hơn thì vẫn có thể sai nhé.

Mình chốt lại bài viết bằng một tấm hình vui nhưng khá nổi tiếng nhé.
![GrabCV - CSS Specificity là gì](https://images.viblo.asia/9bb92cfb-34cc-472e-a472-a9de63010e0d.png)
<div align="center">https://specifishity.com/</div>

## Lời kết
CSS cơ bản thật ra cũng không nhiều, bạn chỉ cần biết vừa đủ là có thể tung hoành giang hồ được rồi. Vì nó không nhiều và cũng không khó, nên các bạn hãy dành thời gian học và nắm vững nó nhé. Trước giờ mình đi phỏng vấn với vị trí frontend, mình thấy khá hiếm công ty nào phỏng vấn về CSS, có lẽ họ mặc nhiên rằng frontend developer thì phải biết CSS, hoặc bản thân họ không thích CSS nên không muốn đặt câu hỏi. Nhưng nếu vô tình được hỏi, thì hãy "chém tơi bời" interviewer nhé :D

Như mọi lần, nếu các bạn thấy bài viết có gì thiếu sót hay sai chỗ nào thì vui lòng để lại comment cho mình biết để sửa đổi. Nếu các bạn thấy bài viết hay và hữu ích thì upvote hoặc comment để mình có động lực viết tiếp các bài tiếp theo nhé.