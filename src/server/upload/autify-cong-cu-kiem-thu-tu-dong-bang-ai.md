Hiện nay, trên thế giới đã có rất nhiều tool kiểm thử tự động nói không với **code**, hỗ trợ record và playback thao tác người dùng như: Selenium IDE, Katalon, Mabl, Autify,.... 

Mỗi công cụ sẽ có những ưu và nhược điểm khác nhau. Ở bài viết này, chúng ta cùng đi sâu tìm hiểu về  **Autify** - công cụ kiểm thử tự động hoá bằng AI.

## 1. Giới thiệu chung

 Autify là nền tảng tự động hoá E2E, với giao diện người dùng trực quan, có AI hỗ trợ viết cũng như bảo trì kịch bản test.
 
 Là 1 công cụ nới không với **code**, ngay cả người mới bắt đầu cũng có thể tạo và thử nghiệm tự động bằng cách thao tác với trình duyệt theo các mà bạn muốn thử nghiệm diễn ra. Nó không yêu cầu bạn phải có kiến thức và biết lập trình.
 
 Đầu tiên chúng ta cùng tìm hiểu các thành phần chính và được sử dụng thường xuyên trong Autify.
 
###  1.1 Test Scenario

Test scenario là đơn vị để chạy kiểm thử. Nó bao gồm một loạt các step, bao gồm các thao tác đầu vào và các điều kiện xác minh kết quả đầu ra.

Với Autify, bạn có thể tạo test scenario mà không cần viết code do đó kịch bản sẽ dễ hiểu với tất các mọi người kể cả người không rành về kĩ thuật.

### 1.2 Autify Recorder

Autify Recorder là tiện ích mở rộng của Chrome để ghi lại các case kiểm thử. Nó ghi lại thao tác của bản trên màn hình hoặc các xác minh kết quả bạn đã thiết lập rồi sau đó lưu thao tác dưới dạng các step trong test scenario. 

Một lưu ý nhỏ là để ghi lai thao tác bạn cần phải bật chế độ ẩn danh trên trình duyệt Chrome.

### 1.3 Scenario Details Page

Đây là trang để xem và chỉnh sửa các test scenario.

Dưới đây là các kịch bản đã được ghi lại bằng Autify Recorder, bạn có thể chỉnh sửa hoặc xoá các bước đã có, thêm các bước mới. 

![](https://images.viblo.asia/282c297e-7adc-4d9c-9c49-5d4cba36be28.png)


### 1.4 Test Case Result Details Page

 Đây là nơi bạn có thể xem kết quả kiểm tra của từng bước trong test scenario với ảnh chụp màn hình tương ứng. Nếu bạn đã có kết quả từ lần kiểm tra trước, bạn có thể so sánh các ảnh chụp màn hình cạnh nhau.
 
 
###  1.5 Test Plans

Test plans dùng để xác định cách Autify chạy các test scenario.

Trong test plans, bạn có thể quản lý kịch bản nào được chạy, chạy vào khi nào, và trên môi trường nào. Hơn nữa bạn cũng có thể chỉ định chạy nhiều kịch bản trên nhiều môi trường tuỳ vào từng nhu cầu sử dụng.

## 2. Ưu điểm, nhược điểm

### 2.1 Ưu điểm

- Có thể chạy giả lập trên nhiều hệ điều hành: Linux, Window, Mobile, và chạy cũng lúc trên nhiều trình duyệt: Chrome, Safari, Firefox,....
- Không giới hạn số lần chạy, thời gian lưu trữ log, số project.
- Có tích hợp với 1 số services như: Bitrise, CircleCI, Jenkins, Webhook, TestRail, and Slack.
- Tạo test scenario dễ dàng thông qua việc recording và playback ngoài ra còn hỗ trợ Javascript.
- Có cơ chế Data driven giúp bạn import data bằng upload CSV hoặc tạo data bằn chức năng DataTables trong tool.
- Từng TC hiển thị kết quả riêng nên sẽ check kết quả trong trường hợp chạy cùng lúc nhiều case 1 cách dễ dàng.
- Có thể test mail như: nhận mail, nội dung của mail mà không phải chuẩn bị môi trường mail box.
- Có AI kiểm tra nếu UI thay đổi sau khi chạy và thông báo để người dùng có thể xác nhận là bug hay không.
- Test case được chạy ngầm trên server, nên vẫn có thể làm việc khác trong lúc chạy.
- Có thể config testcase nào sẽ được chạy, chạy trên môi trường nào, thời điểm nào dễ đàng.
- Có chatbox online hỗ trợ cả về tech lẫn non-tech.
- Team và customer có thể làm việc chung trên Workspave do mình config mà không phải làm việc qua bên thứ 3.

### 2.2 Nhược điểm

- Tool này mất phí.
- Cộng đồng sử dụng chưa nhiều do tool mới.
- Thời gian chạy 1 file record lâu hơn Selenium do có cơ chế chụp ảnh màn hình sau mỗi step.
- Hỗ trợ File upload nhưng không hõ trợ trên Edge, IE và trình duyệt mobile.
- Trong khi record file không nhìn được toàn bộ step đã record mà phải save mới thấy.
- Chưa hỗ trợ kết nối đến Database như SQL, MonggoDB.
- Chạy trên trình duyệt ẩn danh nên mỗi lần chạy phải login lại từ đầu.

## 3. Demo

Các bạn có thể xem demo chi tiết ở đây: https://autify.zendesk.com/hc/en-us/articles/900000983426-Video-How-to-get-started

Tham khảo: https://autify.com/