Chào các bạn, thuật ngữ **Responsive Web Design** có lẽ không còn xa lạ gì với mọi người nữa. Bất kỳ ai làm về web đều đã từng làm hoặc ít nhất là nghe tới thuật ngữ **Responsive Web Design** này. Tuy nhiên, để hiểu chính xác về nó và cách phân chia các khoảng màn hình hợp lý với các device thì có lẽ còn nhiều bạn chưa hiểu hết. Vì vậy, bài viết hôm nay mình sẽ chia sẻ về khái niệm cũng như cách chia các khoảng màn hình sao cho hợp lý khi làm responsive cho web.

## 1. Khái niệm về Responsive Web Design

Responsive Web Design (RWD) là thuật ngữ ám chỉ cách thiết kế trang web hiển thị tương thích với mọi kích thước thiết bị và là xu hướng mới theo đó quy trình thiết kế và phát triển web. Tức là bố cục trang web sẽ tự đáp ứng theo hành vi người dùng và môi trường hiển thị. Môi trường này chính là kích thước của trình duyệt, kích thước hoặc hướng xoay thiết bị. Và thiết bị ở đây đa phần là các thiết bị di động như smartphone hoặc tablet. Lấy một ví dụ với trang blog hiện tại thì đây chính là một dạng thiết kế Responsive Web Design. Các bạn có thể thử thay đổi kích thước trình duyệt, xem trên di động, tablet,… mà vẫn đảm bảo giao diện hiển thị tốt. 

Để làm được điều đó chúng ta sẽ sử dụng linh hoạt kết hợp các kỹ thuật bao gồm flexible grid, responsive image và CSS media query. Khi người dùng chuyển từ máy tính xách tay của họ sang iPad hay iPhone, trang web sẽ tự động chuyển đổi để phù hợp với kích thước màn hình và kịch bản xử lý. Nói cách khác, các trang web cần phải có công nghệ tự động đáp ứng theo thiết bị của người dùng. Điều này sẽ loại bỏ sự cần thiết cho nhiều thiết kế web khác nhau và giảm thiểu thời gian cũng như chi phí thiết kế web.

Thuật ngữ này được ra đời bởi [Ethan Marcotte](https://twitter.com/beep) – hiện tại là một Web Designer làm việc độc lập. Lần đầu tiên ông viết về nó là trên trang web [A List Apart](https://alistapart.com/article/responsive-web-design), vào khoảng tháng 5/2010.

![](https://i.giphy.com/media/3o7btNAT5vaNhH6CIw/giphy.webp)

## 2. Độ phân giải màn hình 

Các thiết bị mới đang được phát triển mỗi ngày và mỗi thiết bị này có thể xử lý các biến kích thước, chức năng và ngay cả màu sắc khác nhau. Một số thích dùng màn hình nhỏ, một số dùng màn hình to, có người thích dùng theo chiều dọc và có người thích dùng chiều ngang. Như chúng ta biết từ sự phổ biến của điện thoại thông minh iPhone, iPad và các dòng điện thoại Android khác có thể chuyển đổi từ dọc sang ngang theo ý thích của người dùng. Vậy người thiết kế xử lý tình huống này như thế nào?

![](https://images.viblo.asia/9295050c-fe16-4eff-8109-1fd8444fca62.jpg)

Vậy thì giải pháp là gì để có thể giải quyết được vấn đề này? Đó chính là **linh hoạt tất cả mọi thứ trên web (flexible content)**

## 3. Áp dụng responsive lên giao diện website

Như trên đã nói, chúng ta sẽ sử dung **flexible content** để giải quyết vấn đề responsive cho web. Tuy nhiên, làm cách nào á **(How to?)** p dụng được lại là 1 vấn đề khác nữa.

Điều kiện để 1 website có thể responsive là gì các bạn có biết không? Đầu tiên là bạn phải khai báo thẻ **meta viewport** rồi sau đó sử dụng **Css media queries** để định nghĩa các khoảng màn hình cho website. Khi đó, website của bạn mới là 1 website có responsive.

### 3.1 Meta Viewport

Để khai báo bạn cần đặt thẻ này vào cặp <head> trên trong mã HTML của website.

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Vậy, ý nghĩa của thẻ này là gì? Nó có tác dụng gì trong việc áp dụng responsive lên website?

**meta viewport** nghĩa là một thẻ thiết lập cho trình duyệt hiển thị tương ứng với kích thước màn hình. Chẳng hạn như ví dụ trên, có nghĩa là bạn sẽ thiết lập trình duyệt hiển thị cố định và tương ứng trên tất cả các thiết bị dựa vào chiều rộng của thiết bị (device-width) và không cho phép người dùng phóng to (thiết lập initial-scale với giá trị cố định là 1). Đây là thẻ mình khuyến khích bạn sử dụng cho toàn bộ các dự án Responsive.

Ngoài ra thẻ meta viewport này còn có các giá trị như:

- **width**: thiết lập chiều rộng của viewport.
- **device-width**: Chiều rộng cố định của thiết bị.
- **height**: thiết lập chiều cao của viewport.
- **device-height**: Chiều cao cố định của thiết bị.
- **initial-scale**: Thiết lập mức phóng to lúc ban đầu, giá trị là 1 nghĩa là không phóng to, và khi giá trị được thiết lập thì người dùng không thể phóng to vì nó đã được cố định.
- **minimum-scale**: Mức phóng to tối thiểu của thiết bị với trình duyệt.
- **maximum-scale**: Mức phóng to tối đa của thiết bị với trình duyệt.
- **user-scalable**: Cho phép người dùng phóng to, giá trị là yes hoặc no.

Tại sao lại phải sử dụng **meta viewport**? Hãy cứ xem ví dụ của một nội dung có meta viewport và không có meta viewport nhé.

![](https://images.viblo.asia/5d2709b3-4354-4cff-9c05-e69ff2843ac7.png)
![](https://images.viblo.asia/5ebedc8a-2d6a-488d-b748-7dcdbef33bfa.png)

Như các bạn đã thấy, nhìn vào ví dụ trên chúng ta có dễ dàng có thể thấy website hiển thị như thế nào khi không có thẻ **meta viewport** và khi có khai báo nó. 
Trường hợp không khai báo thẻ **meta viewport** chúng ta gọi là **zoom**. Tức là khi bạn view trên các thiết bị cầm tay như mobile, tablet thì site sẽ thu nhỏ lại đúng vừa bằng kích thước của device. Nếu như bạn muốn xem rõ nội dung thì bạn phải zoom lên. Khi đó sẽ xuất hiện scroll ngang rất khó chịu.
Nếu bạn chưa tin có thể tự mình kiểm chứng coi sao.

### 3.2. Css media queries

Để tạo được 1 website có responsive hoàn chỉnh thì 1 khai báo  thẻ **meta viewport** chưa đủ. Chúng ta còn cần phải css để nội dung website hiển thị phù hợp trên các thiết bị khác nhau. Vậy để khai báo **css media queries** thì có thể gọi theo các cách như sau:

```
@media(max-width: 767px) {}
@media(min-width: 768px) {}
@media(min-width: 768px) and (max-width: 1023px) {}
```

Ở trên mình đã liệt kê theo 3 cách gọi tùy vào từng trường hợp, từng ngữ cảnh mà bạn sử dụng. Riêng mình thì mình hay dùng cách này:
```
@media(max-width: ...) {}
```

Đã có cú pháp, vậy chúng ta nên chia các khoảng màn hình như thế nào cho hợp lý nhất. Các bạn có thể tham khảo các khoảng màn hình như sau:

- **max-width: 320px** (điện thoại di động, hiển thị chiều dọc)
- **max-width: 480px** (điện thoại di động, hiển thị chiều ngang)
- **max-width: 600px** (máy tính bảng, hiển thị chiều dọc)
- **max-width: 800px** (máy tính bảng, hiển thị chiều ngang)
- **max-width: 768px**  (máy tính bảng loại to, hiển thị chiều dọc)
- **max-width: 1024px** (máy tính bảng loại to, hiển thị chiều ngang)
- **min-width: 1025px** (từ size này trở lên là danh cho desktop thông thường).

Tuy nhiên, đây chỉ là các khoảng màn hình để chúng ta tham khảo trong trường hợp bạn không sử dụng bất kỳ 1 framework css nào. Còn nếu như bạn đang sử dụng Bootstrap hoặc là UIKit hoặc bất kỳ framework css nào khác thì hãy nên sử dụng **media queries**  của framework css đó. Ở đây mình sẽ giới thiệu thêm 1 chút về **media queries** của bootstrap.

### 3.3. Bootstrap media queries

Thực tế, khi nhắc tới Bootstrap, chúng ta sẽ nghĩ ngay tới việc hỗ trợ làm responsive 1 cách tốt nhất. Đó là lý do tại sao hay có cụm từ **"Thiết kế theo chuẩn bootstrap"** là vậy.
Trong bài viết [Bài 2 - Tìm hiểu về Grid System trong Bootstrap](https://viblo.asia/p/bai-2-tim-hieu-ve-grid-system-trong-bootstrap-MgNeWXjRkYx) mình cũng đã giới thiệu về **media queries** của bootstrap. Tuy nhiên đây chỉ là **media queries** trong bootstrap 3. Nó như thế này:

```
/* Extra small devices (phones, less than 768px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (tablets, 768px and up) */
@media (min-width: @screen-sm-min) { ... }

/* Medium devices (desktops, 992px and up) */
@media (min-width: @screen-md-min) { ... }

/* Large devices (large desktops, 1200px and up) */
@media (min-width: @screen-lg-min) { ... }
```

Và chúng ta nên sử dụng max-width để giới hạn chiều rộng:

```
@media (max-width: @screen-xs-max) { ... }
@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
@media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
@media (min-width: @screen-lg-min) { ... }
```

Còn đối với Bootstrap 4 thì chia **media queries** như thế nào?

```
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
```

Rõ ràng, cách chia hoàn toàn khác so với bootstrap 3. Tuy nhiên, dù là bootstrap 3 hay bootstrap 4 thì vấn dễ dàng sử dụng đúng không?

### 3.4. Một số điều cần biết khi viết responsive

Viết css responsive không khó, tuy nhiên các bạn cũng nên chú ý một số điều sau:

- Ngoài đơn vị của breakpoint là **px**, thì các đơn vị đo chiều dài trong website nên là **%**. Hay nói đúng hơn là sử dụng đơn vị tương đối.
- Nên sử dụng **max-width** thay vì **width** để tránh cố định chiều rộng.
- Sử dụng **display: none** cho các thành phần cần ẩn đi ở từng thiết bị mà bạn muốn ẩn. Và **display: block** ở các thiết bị cần hiển thị ra.

## 4. Lời kết

Trong bài này mình đã nói chi tiết qua khái niệm Responsive và cách triển khai một giao diện Responsive là như thế nào. Bây giờ bạn có thể thực hành bằng cách tạo một tập tin HTML đơn giản, rồi khai báo thẻ meta viewport rồi thử viết CSS để nắm rõ hơn về cách hoạt động của nó nhé. Chúc các bạn thành công!