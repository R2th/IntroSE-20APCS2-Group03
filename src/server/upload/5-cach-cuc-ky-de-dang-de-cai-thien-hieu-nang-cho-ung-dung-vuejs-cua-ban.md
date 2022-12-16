Chúng ta hãy bắt đầu nói về một số cách đơn giản để bạn có thể tăng hiệu suất ứng dụng VueJS của mình nhé.

### Bí quyết đầu tiên

![](https://images.viblo.asia/a31620d5-1df8-47c6-8d43-8aa77f2ddf93.png)

Những gì chúng ta có ở đây là một "functional" template, nó không khai báo state mà chỉ làm việc với props. Điều này có thể dễ dàng tạo thành một functional component dựa trên Vue với việc sử dụng phương thức render
https://vuejs.org/v2/guide/render-function.html

Nếu bạn đọc nó, bạn sẽ thấy props được truyền vào thông qua* functional: true*
Vấn đề này sẽ được giải quyết như sau

![](https://images.viblo.asia/2718269f-2b9c-48f2-b7fd-27dc2e6cf495.png)

Đơn giản phải không, bạn không cần phải lo lắng về việc thay đổi cú pháp mẫu, bạn có thể sử dụng nó và vẫn có thể tận hưởng những cú pháp Vue sang trọng.

Vì nó là một  functional component, để truy cập props, bạn cần phải gọi props.name

### Mẹo thứ hai
Sử dụng keep-alive cho các component được tải động.

![](https://images.viblo.asia/864c8a48-d19a-4436-b7bc-caa85387b5bd.png)

Đôi khi, chúng ta tải các component một cách nhanh chóng bằng *is* prop do Vue cung cấp và chúng ta có thể chuyển đổi giữa các component được tải động. Để duy trì state và ngăn tải lại dữ liệu bất cứ khi nào các component được toggled, trình bao bọc DOMless là một giải pháp tốt để tăng tốc.

![](https://images.viblo.asia/532f570b-635f-4de4-88fe-8668c120c652.png)

### Tiếp tục một mẹo đơn giản nữa
Điều này sẽ rõ ràng hơn một chút so với hầu hết các mẹo mình đưa ra, do cách thức hoạt động của hệ thống vue Vue. Mục tiêu của vDOM là hoạt động như một phương tiện cập nhật trung gian và theo dõi các thay đổi riêng rẽ (rất hiệu quả) đối với giao diện người dùng của dự án và kích hoạt các rerenders riêng cho các component được nhắm tới chứ không thực sự làm lại toàn bộ màn hình.

![](https://images.viblo.asia/f259ae01-211f-43a9-aa45-efd960fba89b.png)

Thông thường, chúng ta có thể tạo một component được bọc trong một thành phần nào đó, component này re-renders rất nhiều và một số phần khác của cùng một template phải thực hiện rất nhiều công việc bất cứ khi nào một component khác của mẫu được render lại, cách khắc phục dễ dàng là làm component trở nên đơn giản hơn. Trừ trường hợp thành phần con phụ thuộc vào dữ liệu của cha, còn lại nó sẽ hoạt động tốt.

![](https://images.viblo.asia/23083a4b-c1d9-4019-a02d-1169d1c42d43.png)

### Mẹo thứ tư
Sử dụng các functions vô danh trong các events CTA. Bất cứ khi nào một chức năng ẩn được chuyển đến hàm "onClick" của một button ( mình đã thấy điều này trong một số code React bởi vì đó là một trong những cách trong React để truyền dữ liệu tùy chỉnh cho một function ) tốt hơn là không truyền các functions vô danh này.

Lấy ví dụ này dưới đây

![](https://images.viblo.asia/e3def90c-63dc-43ef-b7d5-1306f6bce4d3.png)

Điều xảy ra ở đây là mỗi khi div tăng chiều dài (một thanh progress bar đơn giản), tất cả các button cũng sẽ được render lại.
Về mặt kỹ thuật, điều này không nên xảy ra, vì không hề có thay đổi gì ở trong button phải không? Không cập nhật props, không cập nhật dữ liệu, v.v.

JS tương tác với các functions vô danh trong bộ nhớ, tức là mỗi lần render lại, một phiên bản mới của  functions vô danh sẽ được tạo ra và nó sẽ được tính như một props mới và điều đó gây nên việc render lại các button ngay cả khi nó không cần thiết.

May mắn thay, Vue rất tuyệt vời, nó đủ thông minh để hiểu rằng bất kỳ function tự gọi nào không nên được gọi tới cho đến khi sự kiện gắn liền với nó được kích hoạt, vì vậy Vue làm cho nó trở nên tồi tệ, trì hoãn việc thực thi.

![](https://images.viblo.asia/674f003f-7a99-4e64-a911-21e6bd255098.png)

### Bí quyết cuối cùng
Đây cũng là một mẹo tương đối đơn giản. Chỉ sử dụng phương pháp này đối với trường hợp có nhiều dữ liệu trên trang và việc toggle-chuyển đổi hiển thị một component xảy ra nhanh chóng.

Đó chính là sử dụng v-if hoặc v-show. Có một sự khác biệt lớn giữa 2 chỉ thị này. V-if = false, không bao giờ render component mà nó được dùng. Vì vậy, nếu component này được toggle nhiều lần trong một khoảng ngắn, nó sẽ ảnh hưởng đến hiệu suất, sử dụng v-show trong các tình huống như vậy sẽ thực sự hiệu quả.

Tuy nhiên, vấn đề là ở chỗ, trong trường hợp bạn thêm v-show vào một component và component đó cần thực hiện một phương thức nặng ngay lần đầu tiên nó được render, thì thao tác đó sẽ được thực hiện bất kể v-show là đúng hay sai, chúng ta nên trì hoãn nó bằng cách sử dụng v-if cho đến khi component đó thực sự cần thiết. Hãy nhớ rằng v-show chỉ đặt giá trị hiển thị CSS của component thành **display: none**, còn component đó vẫn được render.

Tuy nhiên, ngay cả khi component này có một phương thức nặng khi khởi tạo, nếu nó liên tục được toggle và phương thức đó cần được thực thi mỗi lần, thì nên dùng v-show. Nói chung tất cả là do yêu cầu của người dùng.

Mình hi vọng bài viết sẽ giúp được các bạn phần nào, nếu có góp ý cho mình hãy comment bên dưới nhé.
Source: https://dev.to/veebuv/5-extremely-easy-ways-to-drastically-improve-your-vuejs-app-s-speed-5k0