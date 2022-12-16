## Introduction
Như chúng ta đã biết `nth-of-type()`  là pseudo-class -  có thể hiểu là "giả class", tức ta coi trạng thái, hay thông tin đặc biệt của element như là một class - cho phép chúng ta chọn ra những elements dựa vào vị trí của nó trong document tree. Tuy nhiên khi sử dụng nó thì Selector bắt buộc phải là  type selector, tức là chỉ có thể sử dụng trực tiếp với element mà thôi (vd: `<h1>`, `<p>`,...)
> The :nth-of-type(An+B) pseudo-class notation represents the same elements that would be matched by :nth-child(|An+B| of S), where S is a type selector and namespace prefix matching the element in question.

Giả sử như trong HTML:
```
<div>
  <p>This is paragraph 1</p>
  <p class="special">This is paragraph 2</p>
  <p class="special">This is paragraph 3</p>
  <p class="special">This is paragraph 4</p>
</div>
```
Và CSS
```
div p {color: purple; }
div p:first-of-type { color: red; }
div p.special:first-of-type { color: green; }
```
Và ở đây ta mong muốn rằng `paragraph 1` sẽ có màu đỏ và `paragraph 2` sẽ có màu xanh. Nhưng vì `div p.special` không phải là type selector, nên `:first-of-type` sẽ không có tác dụng gì cả và thế nên đương nhiên `paragraph 2` cũng sẽ không có màu xanh:


![](https://images.viblo.asia/938cbbee-4c5e-46e8-88b4-31d16d1a85bf.PNG)
## The subsequent sibling combinator
Với vấn đề như trên, thay vì sử dụng `pseudo-class`, chúng ta có thể sử dụng [Subsequent sibling](https://www.w3.org/TR/selectors/#general-sibling-combinators)`~`

`Subsequent Sibling Combinator` giống như `A ~ B`trong đó `A` và `B`là hai `compound selector` chứ không bị giới hạn ở `type selector`, nó cho phép ta select `B` khi mà `A` và `B` cùng chung thẻ cha và `A` ở trước `B` trong document tree.

Xét trong vd dưới:
```
<div>
  <h1>Heading</h1>
  <p>Meta data</p>
  <h2>Subheading</h2>
  <p>Some article text</p>
</div>
```
Với selector `h2 ~ p` thì nó sẽ select thẻ `p` thứ hai theo sau thẻ `h2` chứ không phải thẻ `p` đầu tiên.
## The subsequent sibling combinator and :first-of-class
Chúng ta có thể khiến selector `p.special:first-of-type` ở trong vd ban đầu có tác dụng như `:fisrt-of-class` qua hai bước:
1. Dùng selector `div p.special` style tất cả các thẻ `p` special thành màu mong muốn (xanh)
2. Sau đó  dùng `Subsequent Sibling` `div p.special ~ p.special` để style tất cả thẻ `p` special đứng sau thẻ `p` special đầu tiên thành màu tím ban đầu
```
div p { color: purple; }
div p:first-of-type { color: red; }
div p.special { color: green; }
div p.special ~ p.special { color: purple; }
```
và được kết quả như mong đợi:


![](https://images.viblo.asia/1df3c363-c6b1-495a-bccd-915a5ba3a20a.PNG)
## CSS Selectors level 4
Trong phiên bản CSS level 4, với pseudo class `:nth-child()`  - cho phép select ra những element là dựa trên vị trí của nó so với những element con khác - nhận tham số dạng `An + B [of S]?`. Trong đó `An + B` cho phép ta có thể tạo các function để tính toán giá trị của `n`, và option `of S` mang ý nghĩa là pseudo class sẽ match với phần tử `nth` của selector.

Thay vì sử dụng `Subsequent sibling`, ta có thể dùng với pseudo class `:nth-child()` như sau:
```
div p { color: purple; }
div p:first-of-type { color: red; }
div :nth-child(1 of p.special) { color: green; }
```
## Summary
Bài viết nhằm chia sẻ một vài trick về `CSS Selector`, bài viết không tránh khỏi những hạn chế và thiếu sót, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn:
* https://dev.to/philnash/css-select-first-of-class-with-the-subsequent-sibling-combinator-13li
* https://www.w3.org/TR/selectors/#general-sibling-combinators
* https://stackoverflow.com/questions/2717480/css-selector-for-first-element-with-class/8539107#8539107