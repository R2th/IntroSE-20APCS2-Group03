Bắt đầu một dự án mới from scratch luôn luôn là cách tốt nhất để học những điều mới và củng cố lại những điều bạn nghĩ là mình biết bất kể bạn đã từng có kinh nghiệm như thế nào.
Gần đây tôi tự hỏi điều gì sẽ xảy ra nếu tôi xây dựng một ứng web phía client mà ko dùng bất cứ một framework nào, ví như bootstrap.

Đầu tiên, nó sẽ mở ra sức mạnh của tự do mã hoá, và có nghĩa là, lỗi chỉ có thể đến từ phía bạn mà thôi, và ngoài ra cũng ko phải chống lại các quy tắc css !important từ framework nữa, hơn nữa khi build từ đầu, nghĩa là ta phải tiếp cận mọi thứ có chiều sâu hơn, và khi đó ta sẽ biết nhiều hơn về các tricks.

### 1. No borders - Prefer box-shadow or box-sizing

Bạn đã từng làm việc với borders hay chưa, hay xem những lưu ý dưới đây:

Border thực tế sẽ lấy khoảng không gian của cái element đó. Có nghĩa là sẽ có thêm chiều rộng và chiều cao cộng vào cho element đang set border.

**Hậu quả:**

Bạn sẽ phải tự tính toán chiều rộng và chiều cao mong muốn của các element để giữ cho chúng khỏi bị xáo trộn. Trường hợp dễ thấy nhất là khi bạn hover vào element, và khi đó mới thêm border thì performance trong ứng dụng của bạn sẽ xô lệch cả đó.

**Cách giải quyết:**

Bạn có thể sử dụng: box-sizing: border-box để chiều rộng có chiều rộng biên giới thành các phép tính.
Bạn có thể sử dụng: box-shadow: / * ... * / vào đường viền giả.
Recomment: Sử dụng đường viền trong suốt và thay đổi màu sắc của chúng khi cần. Hãy cẩn thận vì cách tiếp cận này sẽ làm cho đường viền chiếm thêm không gian trong bố cục của bạn.

{@codepen: https://codepen.io/buiduccuong30051989/pen/rZbeaw}

### 2. Draw attention to an element

Bất cứ khi nào bạn muốn người dùng nhấp vào một button cụ thể, có nhiều cách để thu hút sự chú ý (phần này cũng hay được gọi là "call to action")

Tuy nhiên, tôi muốn chia sẻ với bạn một thủ thuật đơn giản nhưng dễ tùy biến.

{@codepen: https://codepen.io/buiduccuong30051989/pen/JaVXYv}

**Ưu điểm:**

* Không có thay đổi về chiều rộng hoặc chiều cao của element do đó bố cục không bị hỏng.
* One-liner: animation: radial-pulse 1s infinite;
* Bạn có thể thay đổi: màu sắc, kích thước, thời gian, v.v.
* Không phô trương nhưng đáng chú ý.

### 3. Center an element horizontally and vertically

Dù Css đã phát triển những vẫn còn gặp nhiều khó khăn khi center elements của chúng ta theo cả chiều dọc và chiều ngang **với 1 thuộc tính**.

Có nhiều cách kết hợp để đạt được mong muốn nhưng cách mà tôi sử dụng rất nhiều đó là: 

Hoặc sử dụng: display:flex on the parent element + margin: auto on the child element, +text-align:center.
Hoặc sử dụng: display:flex + justify-content:center + align-items:center on the parent element.

{@codepen: https://codepen.io/buiduccuong30051989/pen/RYOaRO}

### 4. Position an element relatively to its parent

Điều này là rất hữu ích khi chúng ta làm việc với dropdowns, tooltips và popovers.

Đây là cách nó hoạt động:

Phần tử cha **phải không** static: position: relative | fixed | absolute
Phần tử con **phải có**: position: absolute
Và chỉ khi như thế, sử dụng top | left | bottom | right sẽ định vị child tương đối với parent elements của nó.
{@codepen: https://codepen.io/buiduccuong30051989/pen/pOByee}

Thanks for reading
I hope this article has been valuable to you.