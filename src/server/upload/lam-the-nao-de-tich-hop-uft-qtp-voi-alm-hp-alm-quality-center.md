ALM cho phép tích hợp với HP như là HP UFT và HP Load Runner

HP UFT là một công cụ tự động hóa chức năng hỗ trợ tự động hóa windows và cả ứng dụng web. Nó cũng hỗ trợ nhiều ngôn ngữ như  .NET, Java, Siebel, SAP etc.

Trong bài này chúng ta sẽ hiểu làm thế nào để điều khiển các tập lệnh UFT từ ALM. Nó bao gồm phần cấu hình và các bước khác nhau

Điều kiện tiên quyết cho mô-đun này là cả ALM và UFT phải được cài đặt.

Sau đây là lộ trình người ta cần tuân theo để chạy thử nghiệm UFT bằng ALM
![](https://images.viblo.asia/528bfb99-d8d8-498d-b830-fc7d8d0e6c9a.PNG)

Phần A - Cài Đặt Bổ Trợ:
Bước 1) Điều hướng đến trang đích ALM (http: // localhost: 8181 / qcbin /) và chọn 'Công cụ' như hiển thị bên dưới.
![](https://images.viblo.asia/c4f94280-354b-41ec-a856-11af607cf31c.PNG)

Bước 2) Phải nhấp vào trang Bổ trợ và liên kết 'HP ALM'.
![](https://images.viblo.asia/008fdbef-ace4-4f8a-9bd5-f2284e17f199.PNG)

Bước 3) Nhấp vào liên kết 'Download HP ALM Connectivity' và tệp exe sẽ được tải xuống ở vị trí đã chỉ định.
![](https://images.viblo.asia/0a956505-2dba-49d9-ba38-66b2bdf3427d.PNG)

Bước 4) Nhấp chuột phải vào tệp đã tải xuống và 'Run as Administrator'.
![](https://images.viblo.asia/0869df6c-d0b3-4401-9201-6703f0930424.PNG)

Bước 5) Sẽ không có bất kỳ trình hướng dẫn cài đặt nào mà người dùng phải trải qua nếu UFT được cài đặt sẵn. Người dùng chỉ nhận được trạng thái cài đặt như hình dưới đây.
![](https://images.viblo.asia/e32935ca-1984-4b04-96f1-ae9a0e9232ae.PNG)

Phần B- Kết nối UFT và ALM
Bước 1) Mở UFT và bạn sẽ thấy sự hiện diện của ALM là một trong các menu như hình dưới đây.
![](https://images.viblo.asia/984b833c-1804-43cb-ab6a-a91bd8408863.PNG)

Bước 2) Điều hướng menu ALM và chọn 'ALM connection'.
![](https://images.viblo.asia/ead01774-37b5-4289-93c2-bc87ae511fdb.PNG)

Bước 3) Hộp thoại kết nối ALM mở ra.

1. Nhập URL máy chủ ALM
2. Nhập tên người dùng
3. Nhập mật khẩu và nhấp vào 'Kết nối'
![](https://images.viblo.asia/3733bbfe-3e8f-4292-bf0f-2efeb0750fe9.PNG)


Bước 4) Sau khi xác thực thành công, các tệp ALM sẽ được tải xuống khi chúng tôi thiết lập kết nối giữa ALM và UFT lần đầu tiên.
![](https://images.viblo.asia/b43b60bc-b16e-454d-bba2-ebd3f8e5bf4b.PNG)

Bước 5) Hộp thoại kết nối ALM chờ người dùng để chọn tên miền và dự án.
1. Chọn tên miền
2. Chọn dự án
3. Nhấp vào 'Đăng nhập'

![](https://images.viblo.asia/0bc12bc5-bd9c-4d98-ba71-e920f03bf0a6.PNG)

Bước 6) Hộp thoại kết nối ALM hiển thị trạng thái.

1. Đã kết nối với Máy chủ và liệt kê chi tiết về địa chỉ máy chủ và tên người dùng.
2. Kết nối với dự án và liệt kê các chi tiết về dự án.
3. Nhấp vào 'Đóng'
![](https://images.viblo.asia/6141aaa2-192d-4d22-81cc-84f5fb7d1766.PNG)


Phần C - Lưu tập lệnh vào ALM

Bây giờ chúng ta sẽ hiểu các thành phần khác nhau được yêu cầu để Thực hiện Tập lệnh UFT.

Main Driver Script – Điểm vào cho bất kỳ Tập lệnh UFT nào có phần mở rộng .mts.

Library – Tập tin Tập lệnh / Hàm có liên quan có thể là phần mở rộng (.vbs) hoặc (.qfl).

Object Repository – về bản chất nó thường là kho lưu trữ Đối tượng chung  và có phần mở rộng .tsr.

DataTable – Được sử dụng để tham số hóa các bài kiểm tra. Thường là một tệp Excel.

![](https://images.viblo.asia/83cea3b4-076f-4b8a-81cc-f94b30e9f406.PNG)


Bước 1)Bước đầu tiên là lưu Script Driver chính vào ALM từ UFT. Điều hướng đến Menu 'File' và chọn 'New Test' như hiển thị bên dưới.
![](https://images.viblo.asia/6ba4d94f-a5e1-4a19-b705-b8b735637a5d.PNG)


Bước 2) Hộp thoại New Test được mở
1. Chọn loại test
2. Nhập tên Test
3. Chúng ta cần chọn vị trí là ALM (theo mặc định, nó sẽ hiển thị vị trí được cài đặt UFT). Nhấp vào nút 'Browse'.
![](https://images.viblo.asia/bdc3d0ff-cd6e-4698-8ca4-597378f7e908.PNG)


Bước 3) Chọn hộp thoại ' Select Location'
1. Chọn Tab 'ALM Test Plan'
2. Nhấp đúp vào thư mục 'Chức năng' để mở các thư mục con của nó.
![](https://images.viblo.asia/127af91f-9bfa-4327-b3a9-fb67a198703e.PNG)

Bước 4) Hộp thoại 'Select Location' mở ra với các thư mục con của Thư mục 'Functional'.

1. Nhấp đúp chuột vào thư mục Automation.
2. Nhấp vào 'Chọn'.
![](https://images.viblo.asia/48f3d698-31fb-47b8-896f-25e3ea1dbff5.PNG)

Bước 5) Hộp thoại 'New Test' được hiển thị lại cho người dùng

1. Với vị trí thử nghiệm được chọn chỉ vào ALM.
2. Nhấp vào 'Tạo'.
![](https://images.viblo.asia/acc7ccc4-0125-475c-8091-88465ab9e2e4.PNG)

Bước 6) Bây giờ hãy để chúng ta xác minh xem thử nghiệm đã được tạo thành công hay chưa bằng cách đăng nhập vào ALM.

Điều hướng đến Module 'Test Plan'.

Bạn sẽ nhận thấy rằng tập lệnh thử nghiệm 'Guru99_Bank_Auto' được tạo trong thư mục 'Automation'.

Trong tab chi tiết, chúng ta có thể thấy rằng loại kiểm tra bị khóa là 'QUICKTEST_TEST', có nghĩa là đó là tập lệnh UFT.
![](https://images.viblo.asia/39481ca6-799e-4324-8b35-035b272c1df7.PNG)

Bước 7) Bây giờ bắt đầu phát triển Tập lệnh trong UFT và lưu tập lệnh có thể được truy cập trong ALM bằng cách chọn Tab 'Test Script' của Test đã tạo
![](https://images.viblo.asia/0869d58f-e0f1-480f-92b3-be45544c8706.PNG)

<< Còn tiếp>> 

Tài liệu tham khảo: https://www.guru99.com/hp-alm-integrate-uft.html