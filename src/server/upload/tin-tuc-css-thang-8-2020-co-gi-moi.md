## Lời tựa

Frontend nói chung và CSS nói riêng vẫn đang được phát triển liên tục. Ngoài những kiến thức cơ bản, bạn cũng nên cập nhật những kĩ thuật/tin tức mới nhất để không bị đi sau thị trường nhé. Nếu bạn là một người mong muốn cập nhật liên tục những kĩ thuật mới nhất, tin tức mới nhất về CSS, thì bài viết này dành cho bạn.

Trong bài viết này, hãy cùng mình điểm qua một vài kĩ thuật CSS mới **đang được phát triển**. Lưu ý là những kĩ thuật này **đang được phát triển**, nghĩa là chúng chỉ mới trong giai đoạn beta (thử nghiệm) nên chưa được hỗ trợ bởi các browser hiện tại đâu nhé.

Các bạn có thể theo dõi bài viết gốc của mình tại đây nhé: https://phucluong.com/tin-tuc-css-thang-8-2020-co-gi-moi/

## 1. Flexbox Gaps
Điều này có lạ lẫm với bạn không? Với mình thì nó thật sự lạ lẫm nhưng cũng không ngạc nhiên lắm. Từ trước đến nay, CSS luôn có những cái gọi là "trick" được truyền tay nhau để giúp thỏa mãn được các thiết kế từ các bạn designer, và CSS luôn cố gắng tạo ra những thuộc tính native để thay thế cho các trick đó. "Gap" là một trong số chúng.

Mà "Gap" là gì vậy? Thật ra nó chỉ đơn giản là một vùng trống giữa các element mà thôi, chả có gì đặc biệt đúng không nào.
![Gap là khoảng trống giữa các element](https://images.viblo.asia/d7bfa40b-a722-4f76-9320-41800a001d5a.png)

Tuy nhiên ngày xưa, và cả hiện tại nữa, để tạo ra các gap như vậy, chúng ta thường dùng `margin`. Có thể bạn sẽ thắc mắc rằng "margin mà gọi là trick à", thì bạn đã đúng nhé, margin không phải là trick. Tuy nhiên nếu dùng margin (ví dụ mỗi item sẽ có `margin-right` và `margin-bottom`), bạn thường sẽ phải clear margin của item cuối cùng, nếu bạn không muốn có một vùng margin thừa ở cuối (còn rất nhiều cách khác để xử lý margin của item cuối). Và lúc này, giá như có một thuộc tính định nghĩa ra khoảng cách giữa các item thì tốt biết mấy nhỉ.
``` css
.container {
  display: inline-flex;
}

.item {
  width: 113px;
  height: 74px;
  margin-right: 20px;
  background-color: #F7B500;
  border-radius: 8px;
}
```
![Gap sử dụng margin](https://images.viblo.asia/763591ea-6ae1-4479-bfa1-5589e0b63534.png)
Như hình trên, bạn thấy có một phần margin ở cuối bị dư ra.

Và CSS Grid ra đời để giải quyết các vấn đề về tạo grid chỉ với CSS, kèm theo là các thuộc tính `gap`, `column-gap`, `row-gap`. Tên thuộc tính rất rõ rồi đúng không nào, mình sẽ không nói thêm về nó, vì nó đã tồn tại được một thời gian rồi chứ không còn mới mẻ gì.

Nhưng, đó là những thuộc tính của CSS Grid nhé, còn với Flexbox thì không, bạn vẫn phải dùng margin (hoặc các cách khác) để tạo gap. Tin vui là thuộc tính `gap` sẽ được áp dụng cho Flexbox trong tương lai gần nhé. Bạn tham khảo danh sách các browser đã support Flexbox gap tại đây: https://caniuse.com/#search=flexbox%20gap
``` css
.container {
  display: inline-flex;
  gap: 20px;
}

.item {
  width: 113px;
  height: 74px;
  background-color: #F7B500;
  border-radius: 8px;
}
```
![Thuộc tính gap](https://images.viblo.asia/37ffbd74-7932-4823-9b31-1e44e9ba3948.png)

Như hình trên, phần margin dư không còn nữa, đơn giản vì chả có margin nào được khai báo cả.

## 2. Aspect Ratio Unit
Một câu hỏi nhỏ dành cho bạn như sau: bạn hãy tạo ra một thẻ `div` với kích thước 100x100 px. Đơn giản phải không nào:
``` css
.item {
  width: 100px;
  height: 100px;
}
```

Hãy nâng cấp câu hỏi trên khó hơn một tí: với thẻ div 100x100 px trên, bạn hãy biến nó thành 200x200 px, nhưng chỉ được thay đổi chiều rộng mà không được thay đổi chiều cao. Hay nói cách khác, bất kể width là bao nhiêu, hãy làm height của nó bằng với width. Khó hơn rồi đúng không nào.

Để làm được điều đó, chúng ta thường sử dụng trick theo đúng nghĩa đen luôn là padding hack.
``` css
.item {
  width: 200px;
}

.item::after {
  content: '';
  display: block;
  padding-top: 100%;
}
```

Và thuộc tính `aspect-ratio` ra đời để giải quyết vấn đề này.
``` css
.item {
  width: 200px;
  aspect-ratio: 1 / 1;
}
```

![Aspect ratio](https://images.viblo.asia/d536aadb-2f1a-4f22-b7e7-5be3d7238317.png)


Thuộc tính này hiện chưa được support chính thức bởi browser, vì thế các bạn hãy cẩn thận trước khi sử dụng cho production nhé. Để thử nghiệm cho biết (như hình chụp của mình ở trên), bạn có thể bật cờ "Experimental Web Platform features" của Chrome để thử các tính năng mới.
![](https://images.viblo.asia/60e67e35-0804-4426-8ea7-d0de68b55cc1.png)


## 3. Native Masonry
![Pinterest Masonry layout](https://images.viblo.asia/c1b800ad-1f54-4d83-8cb1-20d92c5a5b9b.jpg)


Bạn đã từng dựng layout như vầy chưa. Nó được gọi là Masonry layout. Với CSS đơn thuần, sẽ rất khó để bạn có thể dựng được layout như vầy, nhưng không hẳn là không thể, chỉ là bạn sẽ mất khá nhiều công sức thôi, bạn tham khảo các cách sau:

* Phân trang web ra hẳn 3 column, rồi tính toán để phân chia các tấm ảnh vào từng column
* Tính toán trước ở backend (hoặc hardcode) kích thước các tấm ảnh theo một quy tắc của bạn. Sau đó sử dụng position absolute + một tí javascript
* Tự viết javascript thuần để tính toán và sắp xếp các tấm ảnh
* Sử dụng thư viện hỗ trợ như https://masonry.desandro.com/

Với sự ra đời của CSS Grid, việc tạo Masonry layout đã đơn giản hơn, tuy nhiên nó cũng không phải là giải pháp "native". Bản chất CSS Grid là để tạo grid, chứ không phải tạo ra Masonry layout.

Tuy nhiên, team Firefox đang thử nghiệm tính năng tạo Masonry layout chính thức với CSS Grid. Bạn có thể thử nghiệm với Firefox Nightly, bật cờ **layout.css.grid-template-masonry-value.enabled** lên.

{@embed: https://codepen.io/rachelandrew/pen/XWmVgwV}

## 4. prefers-reduced-data
``` css
@media (prefers-reduced-data: reduce) {
  .image {
    background-image: url("images/placeholder.jpg");
  }
}
```
Đây là tính năng (CSS at-rule) mới và chưa được implement trên browser: https://caniuse.com/#search=prefers-reduced-data

Với nó, bạn có thể kiểm tra được người dùng có bật tính năng tiết kiệm dữ liệu khi duyệt web không, từ đó bạn sẽ cung cấp cho người dùng những data tiết kiệm dung lượng hơn. Trong ví dụ trên, thay vì trả về cho người dùng tấm hình có thể nặng đến vài trăm KB, chúng ta thay thế bằng một tấm hình placeholder tầm 10KB chẳng hạn.

## 5. ::marker
![Marker là gì](https://images.viblo.asia/d19f18a0-27dd-4f3a-9853-cfcd433f2850.png)


Bạn đã bao giờ nhận task đổi màu cho marker chưa? Nếu dùng `color`, bạn sẽ đổi màu cho cả marker và text bên trong.

Task trên cũng khá đơn giản, và có rất nhiều trick để làm được việc đó như tạo marker giả với `::before` chẳng hạn. Hoặc dùng icon và cho `position: absolute`

Giờ đây bạn có thể style cho marker dễ dàng hơn với `::marker`
``` css
li::marker {
  color: blue;
}

li:last-child::marker {
  content: "😋";
}
```

![Marker đã có thể được target với CSS selector](https://images.viblo.asia/f34c5b05-6545-4f99-b746-ec9265ef1096.png)


## Kết bài
![Nguồn: Commitstrip](https://images.viblo.asia/fc0140c3-546f-4d45-8241-5683e0bef148.jpg)


CSS ngày càng phát triển không ngừng, những tính năng mới vẫn liên tục được cập nhật (và vứt vào sọt rác). Vì vậy bạn hãy cẩn thận trước khi quyết định sử dụng nó nhé.

Thêm nữa, một trang web gối đầu giường dành cho bất kì frontend developer nào là trang https://caniuse.com/. Nếu bạn chưa biết đến trang này, thì hãy bookmark nó ngay nhé.