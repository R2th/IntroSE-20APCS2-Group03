Tiếp bài viết https://viblo.asia/p/lam-the-nao-de-tich-hop-uft-qtp-voi-alm-hp-alm-quality-center-phan-2-XL6lAndJ5ek

Part D – Cài đặt trong UFT

Bước 1) Chúng ta có tất cả các tệp liên quan được tải vào ALM, chúng ta phải đảm bảo rằng tập lệnh tự động hóa lấy tệp thư viện, HOẶC và tệp dữ liệu từ ALM. Bây giờ chúng ta sẽ hiểu làm thế nào để liên kết các thư viện hàm với test script một cách linh hoạt từ ALM.
![](https://images.viblo.asia/79be13bd-8ad4-46f7-a242-3df79ad4eb90.PNG)

Bước 2) Kho lưu trữ đối tượng cũng phải được chọn từ tab 'Test Resources' của ALM. Chúng ta hãy xem cách tải kho lưu trữ Object một cách linh hoạt trong thời gian chạy.
![](https://images.viblo.asia/19987930-3257-4750-ba2d-fdafe64b404c.PNG)

Bước 3) Dữ liệu kiểm tra phải được nhập vào Bảng 'Global' của UFT. Để thực hiện tương tự, chúng ta nên đảm bảo rằng chúng ta có đoạn mã sau trước khi thử truy cập các tham số được đề cập trong bảng dữ liệu.
![](https://images.viblo.asia/d2282f3a-e1e7-4531-bf01-01aac4740ad8.PNG)

Bước 4) Vào  'Tools' -> 'Options' như hiển thị bên dưới.
![](https://images.viblo.asia/c257ad71-0afc-42de-8529-ceaf48965a5c.PNG)

Bước 5) Hộp thoại Tùy chọn mở ra.

* Chọn tab 'GUI Testing'.
* Chọn 'Test Runs'
* Bật 'Allow other HP products to run tests and components'
* Nhấp vào 'OK'
![](https://images.viblo.asia/4e1adda7-e3ea-4c09-9550-8c228adaeba4.PNG)

Phần E - Thực thi tập lệnh trong ALM

Bước 1) Tạo bộ test suite trong Mô-đun 'Test Lab' để thực thi. Hãy để chúng tôi tạo một 'New Folder' cho bộ kiểm tra tự động.

* Chọn mô-đun 'Test Lab'
* Chọn thư mục mà chúng tôi muốn tạo thư mục mới
* Bấm vào biểu tượng thư mục mới
* Nhập tên của thư mục
* Nhấn OK.

![](https://images.viblo.asia/867146d3-32d1-4788-81db-27429a999253.PNG)

Bước 2) Thư mục mới sẽ được tạo như hình dưới đây:
![](https://images.viblo.asia/6c4f2747-0d4c-4ffe-b3ca-c58a9ade5136.PNG)

Bước 3) Bây giờ chúng ta cần tạo một bộ kiểm tra trong thư mục đã tạo.

* Chọn thư mục
* Nhấp vào nút 'New Test Set'
* Nhập tên của Test Set
* Nhấp vào 'Ok'
![](https://images.viblo.asia/a8907d85-b2fc-4256-925d-e82480c64ddd.PNG)

Bước 4) Giống như các thử nghiệm thủ công, sau khi tạo bộ thử nghiệm, các trường hợp thử nghiệm cần được thêm vào từ Test Plan.

* Chọn bộ kiểm tra đã tạo
* Nhấp vào nút 'Select Tests'. Test Plan mở ra.
* Chọn bài kiểm tra
* Nhấp vào nút '<='
![](https://images.viblo.asia/28498b16-91ec-41d5-afe6-82ada7c4db50.PNG)

Bước 5) Bài kiểm tra bổ sung sẽ được hiển thị như hình bên dưới.

Thử nghiệm được thêm sẽ tự động hiển thị loại thử nghiệm là 'QUICKTEST_TEST'.
Nhấp vào nút 'Run' để kích hoạt thực thi.
![](https://images.viblo.asia/6a9a87ef-b3a0-4916-b2a1-03f46205a668.PNG)

Bước 6) Hộp thoại  tự động test được mở ra. Bây giờ chúng ta sẽ hiểu tất cả các tính năng có sẵn trong cửa sổ này.

* Run all - Cho phép chúng tôi thực hiện hoàn thành bộ kiểm tra.
* Run - Cho phép chúng tôi chỉ thực hiện phiên bản thử nghiệm đã chọn.
* Run all tests Locally - Test sẽ được khởi động trong local host nếu người dùng không có khả năng nhập host name trong thử nghiệm đã được thực thi
* Enable Log - Tạo một log file thực thi trong quá trình chạy test. Để xem nhật ký thực hiện sau khi thực hiện văn bản, chọn 'View Execution' từ menu 'Run' của cùng hộp thoại.
* Nhấn 'Run' để kích hoạt Test.
![](https://images.viblo.asia/02a078b3-a876-49a0-a26a-41948c1b8df2.PNG)

Bước 7) UFT sẽ được khởi chạy trong khi tập lệnh đang được thực thi. Trạng thái chạy sẽ được hiển thị sau khi thực hiện kiểm tra được hoàn thành như hình dưới đây. 
![](https://images.viblo.asia/d6934589-f95e-44e3-952c-1057ca229384.PNG)

<< Còn tiếp >>
Tài liệu tham khảo: https://www.guru99.com/hp-alm-integrate-uft.html