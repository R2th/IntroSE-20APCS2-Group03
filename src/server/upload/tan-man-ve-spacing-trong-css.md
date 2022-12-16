Sẽ không có âm nhạc nếu giữa các nốt không có khoảng cách. Hãy tưởng tượng nếu các nốt đều được phát ra cùng một lúc, hoặc phát ra quá nhanh đến nỗi chúng ta không thể nào phân biệt được đâu là nốt kế tiếp, "*bản hòa ca*" này hẳn sẽ rất đinh tai nhức óc. Zappa đã từng nói: "*Phải có khoảng cách giữa các nốt với nhau*" để từng âm đều rõ ràng và nổi bật theo cách riêng của mình.

> *"Frank Vincent Zappa là nhạc sĩ, nhà soạn nhạc, nhà hoạt động và nhà làm phim người Mỹ."*

Để có giai điệu, chúng ta cần các khoảng cách hợp lý. Âm nhạc không chỉ đơn thuần là giai điệu, đó còn là sự cân bằng giữa khoảng cách và âm thanh. Nếu thiếu cả hai thì âm nhạc sẽ không tồn tại.

Điều này hoàn toàn đúng khi áp dụng trong lĩnh vực hình ảnh. Nếu không có những khoảng cách, các yếu tố trong thiết kế của bạn không những không nổi bật mà còn trở thành một đống lộn xộn rối mắt.

![](https://i.pinimg.com/originals/0b/13/d4/0b13d4853679e37ec02d9289377fc109.gif)

Hôm nay, mình sẽ chia sẻ đến cho các bạn chủ đề về **spacing**. Sau hơn gần 5 năm làm Frontend về lĩnh vực "markup", mình đã thực hiện và chứng kiến sự đổi thay của website. Từ những layout chi chít nội dung, những chiếc chữ, cho đến những chiếc form cố nhét thật nhiều thông tin mang đến cho người dùng... cho đến những layout tạo cho người dùng một sự tập trung nhất định, ít nội dung cùng những khoảng trống thông thoáng rất có cảm tình.

Đó là cái nhìn chung về UI/UX, còn với website hay cụ thể hơn trong CSS thì có 2 loại spacing chính là **outer-space** và **inner-space**. Mình sẽ gọi tắt là "**outer**" và "**inner**" cho nhanh nhé.

![](https://ishadeed.com/assets/spacing-css/spacing-1.png)

Ví dụ như hình trên, khoảng trống bên ngoài là outer và bên trong là inner.
Giả sử với 2 thẻ div chúng ta có thể CSS đơn giản như sau:

```scss
.box {
  padding: 20px 40px; // inner
  margin-bottom: 25px; // outer
}
```

Đây là kiến thức về `box-model`, nếu bạn nào chưa biết thì có thể tìm hiểu (cũng khá ngắn gọn thôi). Vì nó là thứ rất quan trọng, nếu chưa biết đến sẽ mò sấp mặt đấy :v:
Mình sẽ nói kĩ hơn về "inner-space" và "outer-space" ngay bây giờ đây.
## Margin - Outer space
Margin thường được sử dụng khi các bạn muốn tạo khoảng cách giữa phần tử này so với các phần tử khác. Như ví dụ ở trên thì mình có dùng `margin-bottom: 25px` để tạo ra khoảng cách so với `div` ở dưới.

Chắc các bạn cũng đã biết là margin có thể sử dụng ở 4 hướng `top, right, bottom, left` và chúng ta nên nắm rõ những thứ cơ bản này để có thể áp dụng chúng tốt vào trong dự án thực tế được.

### Vấn đề margin collapse
Khi đi phỏng vấn hay với mọi người trong team, mình hay đố vui với ae câu hỏi "bây giờ mình có 2 cái div, cái div ở trên `margin-bottom 200px`, div ở dưới `margin-top: 100px`. Khoảng cách giữa 2 cái `div` là bao nhiêu :D" - Câu hỏi khá vui nhưng người trả lời với một gương mặt đầy vẻ nghi ngờ cũng hài hước không kém. Còn bạn, bạn sẽ trả lời thế nào?

Hiểu đơn giản là `margin collapse` xảy ra khi chúng ta có 2 phần tử cạnh nhau và có spacing được định nghĩa bằng `margin`. Khi đó, khoảng cách sẽ không được cộng dồn mà sẽ lấy phần tử có `margin` lớn hơn.

![](https://images.viblo.asia/37e3eec0-5b38-4a4c-9891-b0d64e99f4ca.png)

Vì vậy, thông thường với trường hợp này, chỉ nên set margin cho một phần tử để tạo khoảng cách. Tuy nhiên, **margin collapse** sẽ không xảy ra với trường hợp wrapper liền kề bên ngoài là **flexbox**.
```html
<style>
  .item {
    margin: 25px;
  }
</style>

<div class="item">Content</div>
<div class="item">Content</div>
```

![](https://images.viblo.asia/729ebdff-ad21-4fc2-9ad6-65774cf9bfad.png)

### Con hơn nhà, là nhà sẽ nát
Một vấn đề nữa là sử dụng margin đối với quan hệ cha con.
```html
<div class="parent">
  <div class="child">I'm the child element</div>
</div>
```

```scss
.parent {
  margin: 50px auto 0 auto;
  width: 400px;
  height: 120px;
}

.child {
  margin: 50px 0;
}
```
![](https://ishadeed.com/assets/spacing-css/margin-collapse-2.png)
Các bạn thấy rằng phần tử con có `margin: 50px 0` nhưng lại không cách ra phía trên so với phần tử cha bao ngoài, đó là vì margin collapse của thằng cha gây ảnh hưởng lên thằng con.

Để giải quyết trường hợp này thì chúng ta có thể CSS cho thằng con thành `display: inline-block` hoặc tốt nhất là cho thằng cha `padding-top: 50px` - cách này ông bà ta hay dùng để trị thằng con khá OK.

![](https://evondev.com/wp-content/uploads/2020/09/margin-collapse-2-1-1024x518.png)

### Negative Margin
Margin có thể dùng được đơn vị **âm**. Cách này sẽ sử dụng số âm trong giá trị của margin. Nếu bạn đã từng dùng [Bootstrap](https://getbootstrap.com/) bạn sẽ nhận ra hệ thống lưới của bootstrap sẽ dùng cách này.
```scss
.container {
  padding-left: 15px;
  padding-right: 15px;
}

.row {
  margin-left: -15px;
  margin-right: -15px;
}

.col-* { // col-1 -> col-12
  padding-left: 15px;
  padding-right: 15px;
}
```
Hãy tìm lời giải đáp cho câu hỏi "**Mối quan hệ giữa `container, row, col` trong bootstrap?**" nhé. Biết đâu bạn sẽ gặp phải đó ;)
## Padding - Inner Spacing
Padding hay còn gọi là inner space bên trong phần tử. Được sử dụng ở nhiều trường hợp. Ví dụ như hình dưới đây minh hoạ khi chúng ta dùng padding cho thẻ a để phạm vi click của thẻ a được mở rộng hơn.

![](https://ishadeed.com/assets/spacing-css/padding-1.jpg)

### Vấn đề khi dùng padding
- Padding không có đơn vị âm.
- Sẽ không hoạt động với phần tử `display: inline` ví dụ với tag `span, a, img,...`


## Áp dụng thực tế
### Xử lý margin-bottom
Mình gửi đến các bạn một tip, giả sử bạn có 1 list gồm nhiều item. Mỗi item sẽ cách nhau một khoảng space là `30px`, trừ item cuối không có space, mình sẽ làm như sau để tối ưu.

![](https://ishadeed.com/assets/spacing-css/use-case-bottom-margin.jpg)

```scss
.item:not(:last-child) {
  margin-bottom: 30px; // selector đến các phần tử, trừ thằng cuối cùng ra
}
```

Tuy nhiên cách này sẽ chạy đúng khi hiển thị một cột, nhưng nếu giao diện từ 2 cột trở lên thì lúc này nó không còn đúng nữa, ở đây là cái số 4 vẫn có margin bottom

![](https://ishadeed.com/assets/spacing-css/use-case-bottom-margin-1.jpg)

Cách tối ưu nhất để giải quyết nó là ở thằng cha bọc ngoài cho `margin-bottom` số âm bằng chính margin bottom của thằng con như sau

```scss
.wrapper {
  margin-bottom: -30px;
}
```

## Tổng kết
Nhìn chung, slide cho một buổi thuyết trình, hay một chiếc website được lòng người dùng qua con mắt đầy nghệ thuật thì không thể thiếu những space tinh tế được. Nhiều nhà thiết kế mới vào nghề sẽ muốn lấp đầy các khoảng không bằng những đồ họa màu sắc hoặc một nội dung gì đó. Những tay thiết kế lão luyện hơn sẽ khuyên bạn sử dụng nhiều không gian và biết cách tiết chế. Sẽ có một số người nhìn vào thiết kế và than phiền rằng có quá nhiều không gian ở đó.

![](https://images.viblo.asia/91a826f0-0665-4788-8e26-8a2765ce3912.png)

Ví dụ như layout này, mình rất có ấn tượng vì màu sắc hài hoà, những khoảng cách nhìn rất thoáng.

Sẽ có lúc việc lấp đầy các khoảng không gian trong thiết kế là hợp lý. Bạn cần phải cân nhắc kết hợp giữa nội dung trang web và phương tiện truyền tải. Chúc bạn tìm thấy sự trải nghiệm thú vị ở bài chia sẻ này, nếu có ý tưởng hay về layout, design đẹp muốn thực hiện bằng CSS hãy để lại bên dưới nhé. ;)


Bài viết được tham khảo tại:

https://ishadeed.com/article/spacing-in-css/