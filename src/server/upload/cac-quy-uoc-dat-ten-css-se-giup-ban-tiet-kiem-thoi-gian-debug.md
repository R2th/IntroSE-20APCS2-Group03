Tôi đã nghe rất nhiều nhà phát triển nói rằng họ ghét CSS. Theo kinh nghiệm của tôi, điều này xuất phát từ việc không dành thời gian để học CSS.

CSS không phải là 'ngôn ngữ' đẹp nhất, nhưng nó đã hỗ trợ thành công kiểu dáng của web trong hơn 20 năm nay.

Tuy nhiên, khi bạn viết nhiều CSS hơn, bạn nhanh chóng thấy một nhược điểm lớn. Rất khó để duy trì CSS.
CSS viết kém sẽ nhanh chóng biến thành một cơn ác mộng.
Dưới đây là một vài quy ước đặt tên sẽ giúp bạn tiết kiệm một chút căng thẳng và vô số giờ debug.

![](https://images.viblo.asia/dd308b4e-22aa-4b75-a846-b00400d861e5.jpeg)

Bạn đã từng gặp trường hợp này, phải không?

### Sử dụng dấu gạch ngang và dấu cách

Nếu bạn viết rất nhiều JavaScript, thì việc viết các biến bằng cú pháp camel là thực tế phổ biến, phải không?

```
var redBox = document.getElementById('...')
```

Vấn đề là hình thức đặt tên này không phù hợp với CSS.
Đừng viết như thế này:

```
.redBox {
  border: 1px solid red;
}
```

Thay vào đó, hãy viết như thế này này:

```
.red-box {
   border: 1px solid red;
}
```

Đây là quy ước đặt tên CSS khá chuẩn. Nó được cho là dễ đọc hơn. Ngoài ra, nó phù hợp với tên thuộc tính CSS.

```
// Correct
.some-class {
   font-weight: 10em
}
// Wrong
.some-class {
   fontWeight: 10em
}
```

### Quy ước đặt tên BEM

Các nhóm có cách tiếp cận khác nhau để viết bộ chọn CSS. Một số nhóm sử dụng dấu gạch nối dấu gạch ngang, trong khi các nhóm khác thích sử dụng quy ước đặt tên có cấu trúc hơn được gọi là BEM.

Nói chung, có 3 vấn đề mà các quy ước đặt tên CSS cố gắng giải quyết:

1. Để biết những gì một selector làm, chỉ bằng cách nhìn vào tên của nó
2. Để có ý tưởng về nơi một selector có thể được sử dụng, chỉ bằng cách nhìn vào nó
3. Để biết mối quan hệ giữa các tên class, chỉ bằng cách nhìn vào chúng

Bạn đã bao giờ thấy tên class được viết như thế này chưa? Đó là quy ước đặt tên BEM.
```
.nav--secondary {
  ...
}
.nav__header {
  ...
}
```
### Giải thích một chút về BEM

BEM cố gắng phân chia giao diện người dùng tổng thể thành các thành phần có thể tái sử dụng nhỏ.

Xem xét hình ảnh bên dưới.
![](https://images.viblo.asia/f073ca50-42b0-49c1-a87b-d4d36201891f.png)

Stick-man đại diện cho một thành phần, chẳng hạn như một khối thiết kế.

#### B for Block
Bạn có thể đã đoán B ở BEM là viết tắt của ‘Block’.

Trong thế giới thực, ‘Block’ này có thể đại diện cho điều hướng trang web, đầu trang, chân trang hoặc bất kỳ khối thiết kế nào khác.

Sau khi thực hành giải thích ở trên, một tên lớp lý tưởng cho thành phần này sẽ là stick-man.

Thành phần phải được tạo kiểu như sau:

```
.stick-man {
  
 }
```
Chúng tôi đã sử dụng các chuỗi phân tách ở đây.
![](https://images.viblo.asia/d68a3343-5866-4b06-b20e-a6bd15e7ce8e.png)


#### E for Elements
Chữ E trong ‘BEM’ là viết tắt của Elements.

Khối thiết kế tổng thể hiếm khi sống trong sự cô lập.

Ví dụ, người đàn ông có đầu, hai cánh tay  và bàn chân.

![](https://images.viblo.asia/63ccdab9-18a0-4b88-aa07-307843198481.png)

Đầu, chân và cánh tay là tất cả các yếu tố trong thành phần. Chúng có thể được xem là thành phần con, tức là con của thành phần tổng thể.

Sử dụng quy ước đặt tên BEM, tên lớp phần tử được bắt nguồn bằng cách thêm hai dấu gạch dưới, theo sau là tên phần tử

Ví dụ:
```
.stick-man__head {
}
.stick-man__arms {
}
.stick-man__feet {
}
```

#### M for Modifiers
Chữ M trong ‘BEM’ là viết tắt của Modifiers.

Điều gì sẽ xảy ra nếu người đàn ông bị biến đổi và chúng ta có thể có một người đàn ông màu xanh dương hay một người đàn ông màu đỏ?
![](https://images.viblo.asia/ef655a61-782f-4c38-8cc1-5a0a0cb377b1.png)

Trong thực tế, đây có thể là một nút màu đỏ hoặc nút màu xanh lam. Đây là những sửa đổi của thành phần được đề cập.

Sử dụng BEM, tên lớp của trình sửa đổi được bắt nguồn bằng cách thêm hai dấu gạch ngang, sau đó là tên phần tử.

ví dụ:

```
.stick-man--blue {
}
.stick-man--red {
}
```

Ví dụ cuối cùng cho thấy thành phần cha được sửa đổi. Đây không phải là luôn luôn như vậy.

Điều gì sẽ xảy ra nếu chúng ta có những người đàn ông có kích thước đầu khác nhau?

![](https://images.viblo.asia/03c20592-72f2-4e26-8ceb-e195250c2728.png)

Lần này phần tử đã được sửa đổi. Hãy nhớ rằng, phần tử là một thành phần con trong khối chứa tổng thể.

Người .stick-man đại diện cho Block, .stick-man__head phần tử.

Như đã thấy trong ví dụ trên, các dấu gạch ngang kép cũng có thể được sử dụng như sau:
```
.stick-man__head--small {
}
.stick-man__head--big {
}
```

Một lần nữa, lưu ý việc sử dụng dấu gạch ngang kép trong ví dụ trên. Điều này được sử dụng để biểu thị một công cụ sửa đổi.

Đó là cơ bản cách thức hoạt động của quy ước đặt tên BEM.

Cá nhân, tôi có xu hướng chỉ sử dụng tên lớp gạch nối dấu gạch ngang cho các dự án đơn giản và BEM cho các giao diện người dùng có liên quan nhiều hơn.

Bạn có thể đọc thêm về [BEM ở đây.](http://getbem.com/naming/)

### Tại sao sử dụng quy ước đặt tên?

> Chỉ có hai vấn đề khó khăn trong Khoa học Máy tính: làm mất hiệu lực bộ nhớ cache và đặt tên cho mọi thứ - Phil Karlton
> 
Đặt tên cho mọi thứ thật khó. Chúng tôi đang cố gắng làm cho mọi thứ trở nên dễ dàng hơn và tiết kiệm thời gian trong tương lai với mã dễ bảo trì hơn.

Đặt tên đúng thứ trong CSS sẽ làm cho mã của bạn dễ đọc và dễ bảo trì hơn.

Nếu bạn chọn sử dụng quy ước đặt tên BEM, sẽ dễ dàng hơn để xem mối quan hệ giữa các elements / blocks thiết kế của bạn chỉ bằng cách xem xét đánh dấu.

### Tên class có JavaScript kèm theo
Có 1 câu chuyện như sau:

Hôm nay là ngày đầu tiên của John tại nơi làm việc.
Anh được chuyển giao một mã HTML trông như thế này:
```
<div class="siteNavigation">
</div>
```

John đã đọc bài viết này và nhận ra điều này có thể không phải là cách tốt nhất để đặt tên cho mọi thứ trong CSS. Vì vậy, anh đi trước và tái cấu trúc codebase như vậy:

```
<div class="site-navigation">
</div>
```

Có vẻ tốt, huh?
John không biết, anh ta đã phá vỡ codebase.
Như thế nào?

Một nơi nào đó trong code JavaScript, có một mối quan hệ với tên class trước đó, `siteNavigation`:
```
//the Javasript code
const nav = document.querySelector('.siteNavigation')
```

Vì vậy, với sự thay đổi trong tên class, biến nav đã trở thành null.

Thật buồn.

Để ngăn chặn các trường hợp như thế này, các nhà phát triển đã đưa ra các chiến lược khác nhau.
#### 1. Sử dụng tiền tố js- class names
Một cách để giảm thiểu các lỗi như vậy là sử dụng tên lớp js- * để biểu thị mối quan hệ với phần tử DOM được đề cập

```
<div class="site-navigation js-site-navigation">
</div>
```
và trong JavaScript code:
```
//the Javasript code
const nav = document.querySelector('.js-site-navigation')
```

Theo quy ước, bất kỳ ai nhìn thấy tên class `js-site-navigation` web sẽ hiểu rằng có mối quan hệ với phần tử DOM đó trong code JavaScript.

#### 2. Sử dụng Rel attribute

Tôi không sử dụng kỹ thuật này, nhưng tôi đã thấy mọi người làm.

Bạn có nhận ra điều này không?

```
<link rel="stylesheet" type="text/css" href="main.css">
```

Về cơ bản, thuộc tính rel xác định mối quan hệ mà tài nguyên được liên kết có đến tài liệu mà từ đó nó được tham chiếu.

Trong ví dụ trước với John, những người ủng hộ kỹ thuật này sẽ làm điều này:

```
<div class="site-navigation" rel="js-site-navigation">
</div>
```

Và trong JavaScript:

```
const nav = document.querySelector("[rel='js-site-navigation']")
```


**Chú ý:**   Nếu mọi người sử dụng thuộc tính ‘rel’, thì có thể không được sử dụng thuộc tính dữ liệu trong một số trường hợp nhất định.

Tôi có những nghi ngờ của tôi về kỹ thuật này, nhưng bạn có khả năng đi qua nó trong một số codebases. Tuyên bố ở đây là, "tốt, có một mối quan hệ với Javascript, vì vậy tôi sử dụng thuộc tính rel để biểu thị điều đó".

Web là một nơi lớn với nhiều "phương pháp" khác nhau để giải quyết cùng một vấn đề.

#### 3. Đừng sử dụng data attributes

Một số nhà phát triển sử dụng các thuộc tính dữ liệu như JavaScript hooks. Điều này không đúng. Theo định nghĩa, các thuộc tính dữ liệu được sử dụng để lưu trữ dữ liệu tùy biến.
![](https://images.viblo.asia/2c683575-e40f-4097-b389-446fb58b7b92.png)

### Mẹo: Viết thêm comment trong CSS

Điều này không liên quan gì đến các quy ước đặt tên, nhưng nó cũng sẽ giúp bạn tiết kiệm thời gian.

Mặc dù rất nhiều nhà phát triển web cố gắng KHÔNG viết các comments JavaScript hoặc dính vào một số ít, tôi nghĩ bạn nên viết thêm các nhận xét CSS.

Vì CSS không phải là "ngôn ngữ" thanh lịch nhất, nên các nhận xét được cấu trúc tốt có thể tiết kiệm thời gian khi bạn đang cố gắng hiểu mã của mình.

---
Tham khảo:
[Medium](https://medium.freecodecamp.org/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849)