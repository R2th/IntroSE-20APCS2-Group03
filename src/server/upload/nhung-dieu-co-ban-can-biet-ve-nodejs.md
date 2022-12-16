## 1. Mở đầu
Đối với người lập trình web thì javascript là một ngôn ngữ lập trình không gì mới lạ và ai cũng biết nó được dùng trong front-end. Vào năm 2009, một lập trình viên tên là Ryan Dahl làm việc tại Joyent, đã cùng với các đồng nghiệp của ông tạo lên một nền tảng được gọi là nodejs, chạy trên môi trường V8 JavaScript runtime - một trình thông dịch JavaScript cực nhanh chạy trên trình duyệt Chrome. Bình thường thì bạn cũng có thể tải bộ V8 và nhúng nó vào bất cứ thứ gì; Node.js làm điều đó đối với các web server. JavaScript suy cho cùng cũng chỉ là một ngôn ngữ - vậy thì không có lý do gì để nói nó không thể sử dụng trên môi trường server tốt như là trong trình duyệt của người dùng được.

## 2. Khái niệm blocking (Synchronous)
Ta sẽ lấy ví dụ về nhà hàng để hiểu rõ hơn về cách hoạt động
- Ví dụ Server như là một nhà bếp, các thread được gọi là người phục vụ, client thì là các bàn ăn.
Thì khi bàn thứ 1 request tới nhà bếp (server) thì một thread 1 (nhân viên phục vụ 1) sẽ chạy tới và lắng nghe yêu cầu và chạy tới server, sau khi server đã nhận được request thì thread 1 này vẫn không làm gì và khi có một request từ bàn số 2 thì thread 1 tiếp tục đứng yên, việc gửi request lên server sẽ do một thread 2 khác làm và sau khi gửi xong nó lại giống như thread 1, điều này khiến ứng dụng nhanh chóng trở nên chậm chạp hoặc quá tải - cách duy nhất để hỗ trợ nhiều hơn là bằng cách bổ sung thêm nhiều máy chủ. Đây là cách mà các ngôn ngữ php, ruby, ... hoạt động trên các môi trường apache, puma, nginx, ...

## 3. Khái niệm non-blocking (Asynchronous)
Tiếp tục là lấy ví dụ về nhà hàng 
- Khi bàn thứ 1 request thì thread sẽ chạy tới lắng nghe và gửi tới cho server, sau đó lại có một bàn khác lại request tới server, thay vì tạo một thread mới thì thread 1 cũ sẽ chạy tới lắng nghe và gửi yêu cầu đó đến server, điều này giúp cho việc chỉ cần một thread nhưng có thể chứa được nhiều request tới server
- Đây là cách mà Nodejs hoạt động

## 4. Ưu điểm
- Tất Cả Đều Viết Bằng Javascript. Nếu bạn là một người front-end developer và muốn làm thêm về back-end nhưng lại không muốn học thêm nhiều về ngôn ngữ mới, đây là một nền tảng tốt cho bạn
- Khả năng mở rộng cao. Không giống với PHP hay Ruby, Nodejs sử dụng các module, và khi bạn thiếu một module nào thì chỉ cần require nó là được. Sử dụng kiến trúc Event Loop, kiến trúc này khiến nó đáp ứng các yêu cầu từ client hoàn toàn khác so với các công nghệ web server hiện nay như mình nói ở phần 2 và 3. Do đó bộ nhớ node.js sử dụng cho từng request cũng nhỏ hơn nhiều và nó có thể đáp ứng được số lượng client nhiều hơn hàng trăm lần so với ngôn ngữ khác.
- Xử lý tốt các ứng dụng thời gian thực: Công nghệ đang phát triển chóng mặt. Các công nghệ như WebSocket đã làm cho ứng dụng web gần như không có thời gian trễ và Node Js có thể xử lý một lượng kết nối khổng lồ như trên.
- Hiệu năng cực tốt: Node Js sử dụng engine V8 của Google, một môi trường được coi là cực kì nhanh cộng với sự kết hợp non-blocking IO thì việc tạo một trang web chậm chạp là không thể nếu bạn không code ngu :joy:
- Tận Dụng Tối Đa Phần Cứng: Như đã nói ở trên nó có thể đáp ứng được nhiều request trong 1 thread và hơn thế nữa là việc Node Js có thê phát triển theo chiều ngang chỉ cần cho một Load Balancer đứng phía trước nên việc tận dụng tối đa phần cứng là điều hiển nhiên
- Có Nhiều Sự Lựa Chọn Máy Chủ: Vì ít tốn tài nguyên, cho nên việc chọn máy chủ phù hợp là cực dễ, Miễn máy chủ nào hỗ trợ Apache hoặc IIS là được

## 5. Nhược điểm
Đã có ưu thì phải có nhược và đây là một số nhược điểm mà mình tổng hợp được:
- Giống như hầu hết các công nghệ mới, việc triển khai Node.js trên host không phải là điều dễ dàng. Nếu bạn có một web hosting xài chung, bạn không thể đơn giản tải lên một ứng dụng Node.js và mong chờ nó hoạt động tốt. VPS và dedicated server là một sự lựa chọn tốt hơn - bạn có thể cài đặt Node.js trên chúng. Thậm chí dễ hơn là sử dụng một dịch vụ có khả năng mở rộng như là Heroku, và bạn có thể hoàn toàn an tâm để phát triển trang web của mình trên đó - bạn chỉ cần trả tiền khi cần thêm nhiều tài nguyên hơn. 
- Mặt khác, chúng ta rất dễ cài đặt Node.js chạy cục bộ trên máy tính của bạn sử dụng các hệ điều hành như Windows, Mac hoặc Linux và bắt đầu phát triển ứng dụng ngay lập tức - chỉ việc tải phiên bản Node.js tương ứng. Một điều quan trọng nên chú ý là Node.js không chỉ đơn giản là một sự thay thế cho Apache, NGINIX hay PUMA - các ứng dụng web đang tồn tại sẽ không có khả năng tương thích, và bạn sẽ làm việc hiệu quả với những ứng dụng phát triển từ đầu (mặc dù có rất nhiều framework ngoài kia để giúp đỡ bạn với nhiều đặc trưng phổ biến). 
- Một nhược điểm lớn khác của Node.js đó là nó vẫn đang trong giai đoạn phát triển ban đầu, điều này có nghĩa là một số đặc trưng sẽ thay đổi trong quá trình phát triển tiếp theo. Trong thực tế, nếu bạn đọc các tài liệu đi kèm, thì nó bao gồm một chỉ số ổn định (stability index), chỉ số này cho thấy mức độ rủi ro khi bạn sử dụng các đặc trưng hiện có.

## 6. Kết
Nodejs là một ngôn ngữ rất hay mặc dù khi chúng ta code thì sẽ cảm thấy dài dùng hơn là dùng các ngôn ngữ PHP hay Ruby nhưng bù lại ta sẽ tạo ra được một web app có thời gian thực cao, và từ năm 2009 tới nay cũng đã gần 10 năm vì vậy cộng đồng hỗ trợ đã đủ đông đảo để giúp bạn hoàn thành tốt một web app của chính mình, vậy bạn nghĩ sao?

## 7. Link tham khảo
- https://techmaster.vn/posts/33428/nodejs-la-gi-va-tai-sao-toi-nen-hoc-lap-trinh-nodejs
- http://tutsmodel.blogspot.com/2015/04/gioi-thieu-ve-node-js.html
 - https://techmaster.vn/posts/33595/hoc-lap-trinh-web-bang-php-hay-nodejs