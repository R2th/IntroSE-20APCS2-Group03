Chào các bạn.

Các bạn có khi nào đau đầu trong chuyện đặt class cho element sao cho hợp lý? Có khi nào bạn rơi vào trường hợp ngồi đần mặt 5ph vẫn không thể nghĩ ra được đặt tên class như nào thì ổn? Thực ra chính mình nhiều khi cũng rơi vào trường hợp như vậy.
Bài viết hôm nay mình xin chia sẻ một số kinh nghiệm của bản thân về việc đặt tên class cũng như quy ước đặt class cho các element trong thời gian ngắn nhất, có thể hỗ trợ các bạn nhiều nhất có thể.

## 1. Đặt tên class bằng tiếng anh

Việc đặt tên class bằng tiếng anh không chỉ giúp cho code của bạn trông chuyên nghiệp hơn mà nó còn rút ngắn tên class, khiến cho class của bạn không quá dài.
VD:  Cùng là 1 element miêu tả về thông tin sản phẩm, bạn có thể đặt class tiếng anh như sau:

```
<div class="info-product">
    <a href="#" class="name-product">Áo trẻ em</a>
    <p class="price-product">$200</p>
</div>
```

Nếu như đặt tên class bằng tiếng Việt không dấu thì sẽ như thế này:

```
<div class="thong-tin-san-pham">
    <a href="#" class="ten-san-pham">Áo trẻ em</a>
    <p class="gia-san-pham">$200</p>
</div>
```

Rõ ràng, nếu so sánh 2 cách đặt tên class thì đặt tên bằng tiếng Anh gọn gàng hơn rất nhiều. Nếu nhóm hoặc công ty của bạn có 1 member nào đó là người nước ngoài thì việc đặt tên class bằng tiếng Việt sẽ khiến member kia hoàn toàn không thể hiểu được tên class đó đang nói về cái gì. Như vậy sẽ khá lộn xộn và thiếu chuyên nghiệp đúng không?

## 2. Sử dụng chức năng của module để đặt tên thành class cho module đó.

Về việc này mình nghĩ sẽ có nhiều bạn áp dụng cách này. Đây là 1 trong những cách khá phổ biến, được nhiều người áp dụng.
Để thực hiện được điều này, bạn phải nắm rõ spec hoặc design để biết module này có nội dung về cái gì.

Chẳng hạn như bạn có các modules  về search, review, feature-product,... thì việc sử dụng chức năng của module để đặt tên thành class cho chính element sẽ khiến cho code của bạn tường minh hơn rất nhiều, chẳng những có ý nghĩa cho từng khu vực, mà nó còn giúp cho người khác khi nhìn vào code sẽ dễ dàng hình dung đó là gì. Thậm chí, nó còn giúp bạn dễ dàng  research code nữa.

```
<div class="search">
    ....
</div>
```
```
<div class="review">
    ....
</div>
```

Mình thấy có nhiều bạn khá lười trong việc đặt tên class theo chức năng modules. Mình đã từng gặp trường hợp có bạn đặt tên class như thế này:

```
<section class="section1">...</section>
<section class="section2">...</section>
<section class="section3">...</section>
```

Điều này dẫn tới hệ quả gì? Sau này khi 1 người khác join vào giữa chừng mà đọc code của bạn thì mình khẳng định, những người mới kia sẽ gặp rất nhiều khó khăn trong việc hiểu nội dung của đoạn đó nói về cái gì. Thậm chí chính bản thân coder đó sau này đọc lại còn khó hiểu nữa là người khác. 

Không biết có bạn nào thấy bóng dáng của mình trong này không? Nếu có bạn nên sửa đổi lại cách đặt tên class ngay nhé.
Mình có thể 1 vài ví dụ cho các bạn nhé

| Tên Class | Ý nghĩa |Tên Class | Ý nghĩa |
| -------- | -------- |-------- | -------- |
| .information (info)     | Thông tin, giới thiệu     |.comment |Bình luận|
| .about-us| Giới thiệu| .calendar|Lịch|
|.company | Công ty|.guide |Hướng dẫn|
|.history | Lịch sử|.article |Bài viết|
|.recruit | Đào tạo|.photo	 |Ảnh chụp|
|.news |Tin tức| .detail|Chi tiết - dành cho link|
|.faq |Phần hỏi đáp |.more |Xem thêm - dành cho link|
|.product | Sản phầm|.mail (.mail-form) |Form mail|
|.category |Danh mục |.contact (.contact-form) |Form liên hệ|
|.shopping |Mua sắm | .search (.search-form)	|Form tìm kiếm|
| .shop|Cửa hàng|.login (.login-form) |Form đăng nhập|
|.blog|Blog| .logout|Phần đăng xuất|
|.social | Mạng xã hội|.sign-in|Form đăng nhập|
|.list|Danh sách bất kỳ | .sign-out|Phần đăng xuất|
|.info-list|Danh sách về thông tin|.sign-up	|Form đăng ký|
|.link-list|Danh sách link| .item-list|Danh sách các mục|
|.price-list|Bảng giá|.item|Mục|
|.step|Các bước|.step-list|Danh sách các bước|
|.note|Ghi chú|.note-list|Danh sách text ghi chú|
......

Thực ra còn rất nhiều nhưng nếu liệt kê thì sẽ không biết thế nào là đủ. Mình chỉ liệt kê một số class hay dùng như vậy.

À còn trường hợp khi đặt class cho table thì thế nào? Khi đặt tên cho table, cần xác định table đó hiển thị thông tin gì, nội dung về cái gì, khi đó sử dụng tên cho chính xác.
VD: user-table, company-table,...

Có một lưu ý nhỏ ở đây là các bạn **không nên đặt tên trùng với tag HTML hay thuộc tính trong CSS.** 

Chẳng hạn như: .text
.image,
.button,
.color,
.height,
.width,
.link,
.title,
.style,
.table,
.form....

Tên này dễ nhầm lẫn với tag html hay thuộc tính css. Nếu muốn sử dụng những tên trên thì cần viết kết hợp với tên chính.

## 3. Quy ước viết tên class: sử dụng dấu gạch ngang "-" 

Tại sao chúng ta nên dùng dấu - để phân cách các từ trong cùng 1 class? Nếu như bạn biết về JavaScript, bạn sẽ biết tới việc đặt các biến trong JavaScript theo cú pháp camel là vô cùng phổ biến

```
var innerBox = document.getElementById('...')
```

Vì vậy để tránh nhầm lẫn với việc đặt tên biến thì chúng ta nên sử dụng dấu "-" hoặc gạch dưới để  phân cách các từ trong tên class. Tuy nhiên, theo như ý của mình thì chúng ta chỉ nên sử dụng dấu gạch ngang "-" để phân cách thôi. 

Ví dụ thay vì chúng ta viết class như thế này

```
.innerBox {
  border: 1px solid green;
}
```

thì chúng ra sẽ đổi thành như này cho đúng

```
.inner-box {
  border: 1px solid green;
}
```

Nếu sử dụng gạch dưới thì hãy đặt tên class theo quy ước BEM. Còn BEM là gì và sử dụng như thế nào thì các bạn có thể tìm hiểu thêm ở 2 link tham khảo dưới này nhé, mình sẽ không nói về BEM trong bài này

https://viblo.asia/p/tim-hieu-ve-bem-hieu-dung-nguyen-tac-gAm5y9bw5db

https://viblo.asia/p/tim-hieu-ve-bem-trong-15-phut-924lJOk65PM

Một lưu ý nhỏ đó là: tên class tuyệt đối không được chứa các ký tự đặc biệt (ví dụ như ! @ # $ % ^ &) và cũng không được bắt đầu bằng một ký tự là chữ số [0 . . 9].

VD bạn đặt tên class là *.2contact* hoặc *.info%^product*  thì sai bét rồi đó.

## 4. Tên class có tiền tố báo hiệu sử dụng trong JavaScript

Có 1 tình huống như sau:

Bạn A và bạn B cùng làm trong 1 dự án. Bạn A đã đặt tên class cho element như thế này:

```
<div class="infoShop">...</div>

.infoShop {
  border: 1px solid green;
}
```
 Và cũng là bạn A đã sử dụng class **.infoShop** trong JS như sau
 
```
var name = document.querySelector('.infoShop');
```

Lúc này, bạn B thấy bạn A đặt tên class chưa đúng chuẩn, bạn B mới sửa lại cho đúng như sau:

```
<div class="info-shop">...</div>
```

Bùm, vậy là class sử dụng trong đoạn JS đã vô hiệu, không thể hoạt động được nữa. QA báo lỗi, cả 2 bạn A và B cùng cuống cuồng đi tìm xem lỗi nó phát sinh chỗ nào. Có lẽ tới tình huống này, không ít bạn gật gù vì đã gặp trường hợp tương tự như vậy nhỉ.

Vậy làm thế nào để tính huống trên không xảy ra khi làm việc nhóm? Đơn giản, các bạn chỉ cần tự quy ước với nhau, thêm 1 tiền tố nào đó cho class và class này chỉ sử dụng trong JavaScript để phân biệt với các class khác thì sự việc sẽ dễ giải quyết hơn nhiều.
Ở đây, mình hay sử dụng tiền tố js- thêm vào đầu các class để phân biệt.

```
<div class="js-info-shop">...</div>
```

Trong JS thì gọi class đó ra

```
var name = document.querySelector('.js-info-shop');
```
Như vậy, khi người khác đọc code sẽ dễ dàng thấy được là class **.js-info-shop** đang được sử dụng trong JavaScipt.

Đó, như vậy là hết rồi. Bài viết này của mình được rút ra từ chính kinh nghiệm của bản thân thôi. Hi vọng những điều này ít nhiều có thể hỗ trợ các bạn trong việc đặt tên class sao cho hợp lý, tường minh, chuyên nghiệp hơn. Nếu có bất kỳ góp ý hoặc thắc mắc nào, các bạn hãy comment ở dưới nhé.