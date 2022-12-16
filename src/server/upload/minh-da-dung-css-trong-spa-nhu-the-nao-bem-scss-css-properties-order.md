Xin chào các bạn, gần mình đã có một khoảng thời gian khá dài viết css và câu hỏi của mình đặt ra là làm thế nào có thể tìm và sửa  css của mình nhanh và dễ dàng nhất hay nói cách khác là làm thế nào để css của bạn dễ dàng maintain nhất. Hôm nay mình sẽ giới thiệu cách mà mình đã làm với BEM và css properties order :)  

## Bắt đầu thôi nào 

Đầu tiên bạn cần biết BEM là gì: 

BEM là viết tắt của Block, Element, Modifier  là quy ước đặt tên phổ biến cho các class trong HTML và CSS. 

Có rất nhiều bài đã viết về BEM nên mình sẽ chỉ nhắc lại sơ qua về BEM, bạn có thể tìm đọc ngay tại viblo hoặc bất cứ blog nào.

Quy ước về BEM
```
.block {}   /* Block */
.block__element {}  /* Element */
.block--modifier {}  /* Block Modifier */
.block__element--modifier {} /* Element Modifier */
```
### Block
Block là để chỉ một khối html có chung một nhiệm vụ, là cấp cao nhất của một đối tượng

Ví dụ: 

Block chứa thông tin chi tiết của một học sinh
```
<div class="student">
    ...
</div>
```
CSS

```
.student {...} 
```
### Element
Là một phần của block, nó không có ý nghĩa riêng khi đứng một mình

Ví dụ:
Tên học sinh, avatar
```
<div class="student__name">
    ...
</div>

<div class="student__avatar">
    ...
</div>
```
### Modifier
Là một hậu tố, cờ (flag) để đánh dấu sự thay đổi về hình dáng, hành vi, trạng thái đối với **block** hoặc **element**

Ví dụ: (**block modifier**)

Có 2 loại học sinh là học sinh có mất phí và học sinh không mất phí
```
<div class="student student--paid">
    ...
</div>

<div class="student student--free">
    ...
</div>
```

Ví dụ: (**element modifier**)

Học sinh có thể là cá biệt hoặc không nên ta cần highlight tên của học sinh để dễ dàng nhận biết chẳng hạn
```
<div class="student__name--individual">
    ...
</div>
```

## Khi kết hợp với SCSS trong ứng dụng SPA
Giả sử chúng ta đang code màn hình detail của một học sinh, và sử dụng scss để style
![](https://images.viblo.asia/fda1b68c-7236-4fbf-91c6-1abc72605be5.png)

Các bạn hoàn toàn có thể thấy việc bạn muốn access đến một phần nào đó của component để chỉnh sửa css hoàn toàn dễ dàng khi chúng ta xác định được block, element và modifier của chúng.
Ví dụ bạn muốn sửa màu chữ khi học sinh đó là cá biệt đó từ `red` thành `blue` chẳng hạn, chỉ việc tìm đến tên và xem modifier ngay lập tức ta đã biết cần phải sửa ở đâu

## CSS properties order
CSS properties order là gì: là việc bạn sắp xếp thứ tự của các thuộc tính css của một đối tượng khi bạn style đối tượng đó.

Có rất nhiều cách sắp xếp khác nhau, ví dụ: **tùy hứng** (viết thế nào cũng được..... giống như trên ví dụ của mình bên trên, mình đã cố tình viết thứ tự lung tung), theo **độ dài** , theo **nhóm**, theo **alphabet**. Cách phổ biến nhất mà mọi người dùng và khuyên dùng chính là viết theo **nhóm**, tức là theo nhóm chức năng của các thuộc tính đó

Cũng là ví dụ trên, mình thêm một số thuộc tính và sắp xếp lại thứ tự các thuộc tính như sau:
![](https://images.viblo.asia/17ce4062-8396-4849-8ffb-a6e466960681.png)

Các bạn có thể thấy như sau:

Các thuộc tính về vị trí của đối tượng ta luôn luôn ưu tiên viết đầu tiên: `position, top, right`...(position properties), sau đó đến các thứ khác ưu tiên từ bên ngoài vào trong đối tượng ví dụ khoảng cách tương đối đến các đối tượng khác ` margin, padding` , đến độ dài `width, height` sau đó đến text `font-size, font-weight, line-height, text-align`, màu sắc `background-color, color` và cuối cùng là các thành phần ít liên quan và ít sử dụng như `cursor`

[Các bạn có thể tham khảo thêm tại đây](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/)

## Kết
 Nhân đây mình cũng muốn nhắc đến vấn đề mà mình gặp phải khi viết CSS theo BEM đó là việc bạn sử dụng javascript để chọn một đối tượng DOM thì trông nó khá củ chuối (document.querySelector('student__name--individual')), nên mình thường chỉ áp dụng với các project Vue, React sử dụng sass, scss và ta có thể sử dụng ref để truy vấn DOM dễ dàng hơn

Đây là các kỹ thuật mình sử dụng khi viết css trong các ứng dụng SPA sử dụng scss để việc viết css, maintain css không còn là gánh nặng của bạn :) 

Hy vọng bài viết giúp các bạn có một cách viết và quản lý css class, properties hiểu quả hơn.

Thank for your time (☞ﾟヮﾟ)☞