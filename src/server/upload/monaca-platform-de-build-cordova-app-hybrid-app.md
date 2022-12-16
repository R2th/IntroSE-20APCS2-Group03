## 1.Monaca là gì?
Monaca là một platform giúp phát triển HTML5 hybrid mobile app (nếu chưa biết thì search thử nhé) với PhoneGap/Cordova đơn giản và dễ dàng được cung cấp bởi Asial Corporation. Nó là nền tảng phát triển open hybrid app và sẵn sàng apply ngay lập tức vào quy trình làm việc và môi trường phát triển hiện tại của bạn. Từ Cloud IDE, CLI to debugger and remote online build, mọi thứ mà bạn cần để phát triển hybrid app đều có ở đây.

## 2.Tại Sao Nên Sử Dụng Monaca?
### 3 lợi ích hàng đầu của Monaca là:

**Cloud-empowered Development:** Monaca cho phép bạn phát triển ứng dụng của bạn theo hai cách. The complete cloud development environment (Môi trường phát triển đám mây) mang đến cho bạn sự linh hoạt mà không cần bất cứ thiết lập nào, bạn có thể code và build ngay trên cloud. Thứ hai, phát tiển ứng dụng từ local và đồng bộ hóa trực tiếp với cloud thông qua Monaca Localkit.

**Framework Agnostic:** được tích hợp mã nguồn mở [Onsen Framework](https://onsen.io/)  cho các ngôn ngữ frontend phổ biến (Angular 1, 2+, React và Vue.js). Tuy nhiên, bạn có thể tùy ý sử dụng Monaca với bất kỳ khung JavaScript nào mà bạn muốn ngoài các Framework hỗ trợ sẵn.

**Mix-and-match as You Like:** Monaca giúp bạn cover mọi thứ từ design, app development, backend development, testing & debugging to build & distribution. Monaca cloud có thể được sử dụng toàn bộ hoặc một phần công cụ như Sublime Text hoặc Git. Bạn có thể sửa code trên cloud nhưng build sẽ không “ăn” source, bắt buộc phải sync và Transpile ở Local Kit trước.

## 3.Monaca Development Tools
### Monaca Cloud IDE

Sau khi đăng ký tài khoản tại: [Monaca](https://monaca.io/).
Các bạn vào *Dashboard -> Create new project*. Ở đây sẽ có các 3 types project để các bạn lựa chọn:
* **Sample Applications:** Những ứng dụng mẫu sẵn có của Monaca (Có thể bằng Cordova , javascript, electron...) tùy bạn lựa chọn.
* **Framework Templates:** Bao gồm Javascript, Angular, AngularJS, React, Vue.
* **Blank:** Vô tạo file html với nội dung Hello world đây

Mình tạo Demo với blank nhé!

![](https://images.viblo.asia/2b83fbfa-4335-4085-93ed-5b5101bb80f1.png)

Tiếp theo các bạn click ***Open in Clound IDE*** sẽ hiển thị cloud editor, các bạn có thể edit trực tiếp code trên này, sau đó Ctrl+S thì thì cái khung preview bên cạnh sẽ thay đổi theo, không cần run hay build.

Nhưng nếu muốn viết ứng dụng thật thì các bạn sẽ phải download `Monaca Debugger` và đăng nhập bằng tài khoản Monaca.

### Monaca Localkit

Vì lúc nãy bạn đã tạo project từ Monaca cloud nên bây giờ import vào Monaca Localkit by step:
> *+ -> Import -> From Cloud IDE*

![](https://images.viblo.asia/9fccd32a-bcbf-4380-a4b2-b0af85879153.png)

Sau khi đồng bộ về local bạn có thể phát triển app bằng bất cứ editor nào bạn muốn. Sau đó upload lên cloud hoặc download từ cloud về một cách đơn giản bằng 2 nút đã được đánh dấu ở trên.

### Monaca Debugger

![](https://images.viblo.asia/74aca1bd-39b0-4b51-8546-1335fc1c6f25.png)

Login bằng tài khoản Monaca -> Local computer -> Kết nốt với máy tính của bạn. 

*Lưu ý:* Để debug app dưới local bạn phải mở Monaca Localkit nhé, nếu không chỉ được debug remote từ code ở Cloud IDE

![](https://images.viblo.asia/b6f59ec3-a3a3-44e9-9d8a-75c7944970cd.png)

Như đã thấy ở hình trên, mục Local projects sẽ là nơi chứa các project ở local PC, mục Monaca.io Projects sẽ chứa các project ở Cloud IDE. Và đương nhiên chúng ta có thể tự tạo project từ local và import vào Monaca Cloud IDE (nếu mới init project thì ok chứ project đã phát triển thì import thường hay bị lỗi vì có nhiều cái không hỗ trợ hoặc không tương thích)

Khi chỉnh sửa source trên editor, Monacade debugger nó sẽ tự reload để update nếu chúng ta save code.

Cảm ơn các bạn đã đọc bài, có thời gian mình sẽ viết tiếp phần Build app và Remote Debugging WebViews nhé :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: