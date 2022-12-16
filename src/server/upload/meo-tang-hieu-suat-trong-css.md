# Giới thiệu
CSS nằm ở lớp trình bày của thiết kế trang web, nếu được thực hiện đúng nó sẽ tăng thêm vẻ đẹp cho người dùng và tạo cảm giác thích hợp cho phần bố cục HTML. Nếu không, nó có thể dẫn đến trải nghiệm người dùng không tốt và ảnh hưởng đến tốc độ và hiệu suất trang web của bạn.

Trong bài viết này, mình sẽ chỉ cho bạn mẹo CSS phổ biến. Cuối cùng, bạn sẽ có thể tăng tốc trang web của mình và cải thiện trải nghiệm người dùng!
# Tại sao hiệu suất website lại quan trọng đến vậy?
Bất kể bản chất của trang web của bạn như thế nào và bất kể nó hoạt động tốt trên nhiều trình duyệt web khác nhau hay không, nó phải load nhanh. Nếu không nhanh, người dùng sẽ cảm thấy chán nản và cuối cùng là **còn cái nịt**.

Nếu bạn sử dụng quảng cáo dịch vụ hoặc bán hàng trên website của bạn, điều đó nó cũng khiến lượt truy cập giảm và trải nghiệm người dùng không được tốt.
# Viết các bộ chọn đơn giản
Đoạn code đơn giản:
```
.hero-image {
    width: 70%
}
```
Bạn có thể viết theo cách khác:
```
main > div.blog-section + article > * {
    /* Code here */
}
```
Trong ví dụ này, trình duyệt sẽ phân tích cú pháp bộ chọn từ phải sang trái bắt đầu bằng bộ chọn phổ quát `(*)` và đọc qua bộ chọn `main`. 

Hơn nữa, các bộ chọn của bạn càng dài, chúng càng thêm nhiều byte vào kích thước tổng thể.
# Tránh hoạt ảnh quá mức
`Animation` có sẵn trong CSS không cần sử dụng JavaScript để thêm `animation` vào các trang web của bạn. Điều này làm cho việc thêm `animation` vào trang web của bạn dễ dàng hơn, bạn có thể tận dụng chúng để tạo ra trải nghiệm người dùng tốt hơn.

Tuy nhiên, nếu lạm dụng quá, bạn có thể khiến người dùng mất tập trung vào việc thực hiện hành động mà họ đang cố gắng đạt được khi họ truy cập webite của mình.
# Khi nào nên tạo hiệu ứng
Rất đơn giản: các thuộc tính khiến toàn bộ trang được bố trí lại sẽ không được làm động. Những thuộc tính này thường được gọi là “`expensive`” vì chúng có thể tạo ra thời gian tải đáng kể trên trang web của bạn. Trong đó có:
* margin
* padding
* height
* width

Khi bạn thay đổi các thuộc tính như `margin` và các kích thước khác nhau của một phần tử DOM, nó sẽ làm thay đổi cho tất cả các phần tử khác.

Một số thuộc tính khác, chẳng hạn như `opacity` và `transform`, có thể được làm động vì chúng không ảnh hưởng đến bố cục của các phần tử khác. Điều này giúp các trình duyệt web có thể tải các tính toán đó xuống GPU để nhanh hơn nữa.

Một số thuộc tính CSS khác thường được sử dụng như:
* :nth-child
* box-shadow
* border-radius
* position: fixed
# @import
`@import` chủ yếu được sử dụng để bao gồm các nội dung như phông chữ, nó có thể bao gồm các tệp CSS khác. Có nghĩa là khi bạn sử dụng câu lệnh `@import` trong tệp CSS của mình để thêm phông chữ hoặc tệp CSS khác, trình duyệt sẽ tìm và thêm trước khi tiếp tục xử lý mã CSS sau đó.
```
/* styles.css */
/**
 * Trình duyệt sẽ tìm và thêm base.css trước
 * Sau đó xử lý mã còn lại trong styles.css
 */
@import url("base.css");
```
Khi nội dung là tệp phông chữ, trình duyệt sẽ sử dụng phông chữ có sẵn trên hệ thống trong khi chờ phông chữ khác tải xuống. Sau khi tải xuống, nó sẽ đổi phông chữ hệ thống cho phông chữ đã tải xuống. Do đó, người dùng của bạn có thể đang đọc nội dung của bạn bằng một phông chữ và đột nhiên phông chữ đó chuyển sang phông chữ khác. Điều này gây ảnh hưởng cho trải nghiệm người dùng.

Dưới đây là một ví dụ về việc tải một phông chữ với câu lệnh `@import`:
```
/**
 * Ví dụ về tải một phông chữ với @import
 * Phông chữ chỉ có sẵn sau khi tải xuống.
*/
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
```
Thay vào đó, mình khuyên bạn nên sử dụng thẻ `link` trong phần `head` của HTML để tải các phông chữ của bạn như sau:
`<link rel="preload" as="font" href="https://fonts.googleapis.com/css?family=Open+Sans" crossorigin="anonymous">`
Ở đây, `rel="preload"` và `as="font"` giúp cho trình duyệt bắt đầu tải xuống phông chữ sớm hơn. Bạn cũng có thể thực hiện các bước để đảm bảo tệp phông chữ bạn đang tải trước khớp với tệp phông chữ trong CSS của bạn để ngăn người dùng của bạn tải xuống hai phiên bản phông chữ giống nhau và lãng phí băng thông của họ.
# Tối ưu hóa kích thước tệp
Trong thiết kế và phát triển web, kích thước là vấn đề quan trọng. Cho dù bạn đang xử lý hình ảnh, tệp HTML hay JavaScript hay các nội dung phương tiện khác, có một quy tắc vàng: **luôn nén**.

Giảm kích thước tệp CSS của bạn bằng cách thu nhỏ. hình ảnh trên trang web của bạn nên được tối ưu hóa để giảm tốc độ tải của chúng.
# Tránh sử dụng hình ảnh base64
Hình ảnh Base64 là một trong những tùy chọn để nhúng hình ảnh trên trang web. Trong nhiều năm, các chuyên gia như **Harry Roberts** đã chỉ ra lý do tại sao hình ảnh base64 kém hiệu suất:
* Chúng làm tăng đáng kể kích thước tổng thể của tệp CSS
* Chúng được tải xuống bất kể chúng được sử dụng hay đã xem
* Mã hóa Base64 dẫn đến kích thước tệp hình ảnh lớn hơn bình thường
* Trình duyệt phải phân tích cú pháp toàn bộ chuỗi base64 trước khi nó có thể được sử dụng

Trong hình ảnh bên dưới, bạn có thể quan sát sự gia tăng kích thước của từng hình ảnh trước và sau khi chuyển đổi sang base64:
![](https://images.viblo.asia/8f89c934-acd4-4edf-84ed-8275a194f2db.png)
Xem điều gì sẽ xảy ra khi mình thêm ba hình ảnh base64 này vào tệp CSS chỉ với 14 dòng code:
```
/**
 * Mã base64 được rút gọn.
*/
@media screen and (min-width: 20em) {
    html {
     background-image:  url('data:image/png;base64,iVBO ...');
    }
    
    footer {
     background-image:  url('data:image/png;base64,iVBO ...');
    }
    
    .non-existence-class {
     background-image:  url('data:image/png;base64,iVBO ...');
    }
}
```
Kích thước tệp đã tăng lên hơn 500KB. Không chỉ lớn như vậy mà trình duyệt của người dùng cũng sẽ dành thời gian tải xuống tệp này cho dù hình ảnh có được sử dụng hay không.
![](https://images.viblo.asia/c3bd3514-dbae-4c68-a252-7ab4ffd7b653.PNG)
Trong khi đó, trong đoạn mã sau, trình duyệt sẽ tải xuống hình ảnh theo yêu cầu dựa trên khung nhìn của trình duyệt.
```
html {
    padding: 2em;
    background-image: url("images/asnim_mobile.jpg");
}

@media screen and (min-width: 20em) {
    html {
     background-image: url("images/asnim_tablet.jpg");
    }
}

@media screen and (min-width: 48em) {
    html {
     background-image: url("images/asnim.jpg");
     background-size: cover;
    }
}
```
Bạn có thể xem điều này bằng cách thực hiện các bước sau:
* Tạo ba hình ảnh có kích thước khác nhau cho, như được hiển thị trong đoạn code trên
* Sao chép code với hình ảnh của bạn làm hình nền
* Khởi chạy trình duyệt của bạn và mở F12
* Thay đổi kích thước khung nhìn trình duyệt của bạn và quan sát
# Giao diện người dùng của bạn có đang làm hỏng CPU của người dùng không?
Khi giao diện người dùng ngày càng trở nên phức tạp, các tính năng ngốn tài nguyên ngày càng đòi hỏi nhiều hơn từ trình duyệt. Nếu bạn quan tâm đến việc giám sát và theo dõi mức sử dụng CPU phía máy khách, mức sử dụng bộ nhớ và hơn thế nữa cho tất cả người dùng của bạn trong sản xuất, bạn có thể sử dụng Performance của trình duyệt Chrome.
![](https://images.viblo.asia/cd485a63-a8cb-4112-a6f9-b9b490989bb8.PNG)
# Kết luận
Trong bài viết bạn có thể áp dụng chúng cho các dự án web trong tương lai của mình, nó giúp bạn cải thiện trang web tốt hơn!.

**Theo dõi mình tại:** https://lamsaodecode.blogspot.com