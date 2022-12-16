Xin chào các bạn, việc ngày càng có nhiều web thiết kế UI sử dụng các thư viện, framework hỗ trợ việc tạo component thì cũng sẽ có rất nhiều cách để phân chia, thiết kế component khác nhau.
Qua các dự án thực tế mình xin giới thiệu đến các bạn về một cách thiết kế component mà mình đã được làm việc qua là [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

Như tiêu đề của bài viết, chúng ta sẽ kết hợp Atomic design và BEM (một tiêu chuẩn quy ước đặt tên cho các tên lớp CSS) trong việc xây dựng components, nếu các bạn chưa biết về BEM thì có thể xem qua bài cũ của mình [tại đây](https://viblo.asia/p/minh-da-dung-css-trong-spa-nhu-the-nao-bem-scss-css-properties-order-maGK7bGA5j2) hoặc cũng có thể search đâu đó trên viblo có rất nhiều bài nói về BEM.

## Bắt đầu với Atomic Design 
Bài này không tập trung về mặt lý thuyết nên bạn có thể tìm hiểu thêm về atomic design trên [Viblo](https://viblo.asia/search?q=atomic%20design)

### Khái niệm
Atomic design là một "phương pháp" thiết kế giao mà ở đó thiết kế được dựa trên việc phân tách và kết hợp các thành phần lại với nhau thay vì thiết kế toàn bộ.

Các level trong atomic design bao gồm:
+ Atoms
+ Molecules
+ Organisms
+ Templates
+ Pages

Hiểu một cách đơn giản thì:

**atoms** của bạn sẽ là các thành phần nhỏ nhất như label, button hay một ô input...

**molecules** sẽ bao gồm các thành phần cấu tạo từ atoms ví dụ như 1 ô input trong form có kết hợp atom label và atom input

**organisms** là thành phần sẽ gồm các molecules giống hoặc khác nhau hợp lại để thành **1 phần hoàn chỉnh**  (ví dụ: header)

**templates** là các organisms kết hợp với nhau tạo thành các trang (homepage, detail page....)

**page**  là các bản mẫu cụ thể hiển thị giao diện người dùng trông như thế nào với nội dung thật

OK, về cơ bản là như vậy, chúng ta sẽ thực hành với thành phần nhỏ nhất trước là Atoms

### Thiết kế 1 atom
**Lưu ý**: bài viết này mình sử dụng vue để tạo component, bạn cũng có thể áp dụng tương tự với React, Angular hoặc bất cứ thư viện/framework nào mà bạn muốn.

Bài toán: giả sử trong ứng dụng của bạn có rất nhiều button khi đó sẽ có rất nhiều dạng button có kích thước, màu sắc, hình dạng khác nhau. Khi đó chúng ta sẽ thiết kế 1 component có tên là Button (điều này khá giống với các bộ component kit mà bạn thường dùng ví dụ như ant, material...)

Ví dụ:
![](https://images.viblo.asia/72fa50eb-48fe-48af-8c9e-dfb5c650ed67.png)

Và đây là kết quả mà bạn sẽ thu được:
![](https://images.viblo.asia/bb3dee82-5816-4743-a460-7ab763685c86.png)

Các bạn có thể chú ý thấy chúng ta có class **.btn** là 1 block và chúng ta có các modifier như **--primary**, **--secondary**, **--default**.

Việc thiết kết theo atomic design kết hợp với BEM sẽ là một cách rất hiệu quả để các bạn tạo ra các component có độ tùy biến cao, dễ dàng chỉnh sửa và mở rộng mà ít bị ảnh hưởng tới các thành phần khác.

Ví dụ: bạn hoàn toàn có thể thêm các type mới cho button, các props mới như shadow, border-radius, outline, size..... mà không bị làm ảnh hưởng tới các thành phần cũ đã được dùng ở đâu đó.

## Notes
Trên đây là một ví dụ đơn giản trong việc áp dụng atomic design vào dự án thực tế, thành phần đầu tiên chúng ta đã làm là atom ngoài ra còn các thành phần khác sẽ phức tạp hơn một chút như molecules, organisms nhưng cách làm cũng gần như là tương tự. Áp dụng kiến thức từ việc phân tách các thành phần theo atomic design và đặt tên theo quy ước của BEM bạn sẽ có những component dễ dùng và cực kì dễ sửa chữa, mở rộng.

Hy vọng bài viết sẽ giúp các bạn một phần nào trong việc thiết kế component cũng như trong việc làm việc với Frontend, hẹn gặp lại ở các bài viết tiếp theo.

Thank for your time (☞ﾟヮﾟ)☞