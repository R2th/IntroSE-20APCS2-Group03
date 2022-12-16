Khi người dùng đã ánh xạ tất cả các Requirements, kiểm thử, và lỗi thì có thể tạo ma trận phân tích phạm vi.

Phân tích bao phủ giúp chúng ta hiểu được phạm vi kiểm tra đối với một yêu cầu cụ thể và chi tiết về tổng số trường hợp Passed/ Failed/ Not executed.

Bước 1) Điều hướng đến mô-đun yêu cầu và Nhấp vào 'View' Menu và chọn "Coverage Analysis '.
![](https://images.viblo.asia/a4888b5b-2d57-477e-9d81-68104f968eac.PNG)

Bước 2) Phân tích bao phủ sẽ được tạo theo từng yêu cầu được đặt trong 'Tab yêu cầu' với trạng thái hợp nhất ở cấp độ thư mục.
![](https://images.viblo.asia/fb285261-b93a-4ae0-ab4b-b3241fb53b24.PNG)

Bước 3) Khi mở rộng thư mục, coverage analysis sẽ hiển thị như dưới
![](https://images.viblo.asia/6324624f-9cea-4df8-96e6-d717fd49ed40.PNG)

Bước 4) Nhấp vào mỗi trạng thái phân tích bao phủ để nhận báo cáo chi tiết

1. Nhấp vào trạng thái của một yêu cầu cụ thể, phân tích bao phủ sẽ được hiển thị với số lượng failures
2. Nhấp vào 'Show Test Coverage' sẽ hiển thị chi tiết trạng thái kiểm thử được đính kèm yêu cầu đã chọn.
![](https://images.viblo.asia/2d470d7d-ebc1-4dbf-8fc5-817d3d20d246.PNG)

Bước 5)  Khi nhấn 'Show Test Coverage', trạng thái thực hiện kiểm thử đối với yêu cầu đã chọn sẽ được hiển thị.
![](https://images.viblo.asia/eca574d4-0f28-48db-905d-1704836e5af7.PNG)

**Traceability Matrix :**

* Traceability Matrix  cho phép người dùng xác định phạm vi mối quan hệ giữa các yêu cầu và các yêu cầu khác (hoặc) giữa các yêu cầu và kiểm thử.
* Traceability Matrix  liệt kê danh sách các yêu cầu và kết hợp yêu cầu và kiểm thử. Ma trận hiển thị tổng số mỗi quan hệ cho từng yêu cầu nguồn.

Bước 1) Bước đầu tiên là điều hướng đến 'View' Menu và chọn 'Traceability Matrix'
![](https://images.viblo.asia/c3e6e1c8-48ff-4f58-8879-970f88bd204b.PNG)

Traceability Matrix mở sẽ như dưới đây
![](https://images.viblo.asia/73bdac47-7db2-48f1-81ef-4df873c6300c.PNG)

Nhấp vào 'Configure Traceability Matrix'
'Configure Traceability Matrix' Dialog sẽ được mở

Bước 3) Các tiêu chí để tạo Traceability Matrix được hiển thị bên dưới

1. Nhấp vào 'Filter' dưới 'Define Source Requirements'
2. 'Filter Requirements' Dialog được mở. Nhấp vào button 'filter criteria'
3. Chọn  'Functional' từ danh sách sau đó click 'OK'
![](https://images.viblo.asia/217f0f3c-cbbb-47aa-87d8-d7c72b360179.PNG)

Bước 4) Filter requirement hộp thoại hiển thị tiêu chí lọc theo lựa chọn của người dùng sau đó nhấp vào 'OK'
![](https://images.viblo.asia/d6171adb-c3f8-48b7-b6d5-c1d4246b742f.PNG)

Bước 5) Hộp thoại Configure Traceability được hiển thị với 'Requirement Type' đã được chọn

Nhấp vào  'Filter by linked Tests' link.
![](https://images.viblo.asia/11893497-13e5-44e2-a473-de47a9ac598a.PNG)

Bước 6) Nào bây giờ chúng ta hãy tạo traceability matrix giữa các yêu cầu và kiểm thử. Do đó khi nhấp vào 'Filter by linked tests', hộp thoại sau sẽ được hiển thị cho người dùng

1. Bật 'Filter by linked tests'.
2. Chọn 'Linked to' các kiểm tra sau
3. Nhập giá trị
Ví dụ: Tạo traceability matrix cho những yêu cầu có hơn 3 kiểm thử, trong trường hợp này nhập '3' sau đó click vào 'OK'
![](https://images.viblo.asia/e6af2013-8cc3-40a4-8fea-c755b5469e0e.PNG)

Bước 7) Màn hình sau được hiển thị cho người dùng với tất cả các yêu cầu và các thử nghiệm tương ứng nếu các tiêu chí traceability matrix được đáp ứng
![](https://images.viblo.asia/cbab532a-ded6-4dff-b10c-d529e8a4177f.PNG)

Bước 8) Người dùng cũng có thể click vào 'Generate Traceability matrix' để export ra file excel
1. Chọn chi tiết traceability matrix  phải được tạo
2. Nhấp vào 'Generate Traceability Matrix'.
![](https://images.viblo.asia/2c25d185-97a6-410e-aa5f-da1534853dd4.PNG)

Bước 9) Hộp thoại Lưu file được hiển thị cho người dùng
1. Chọn vị trí traceability matrix cần lưu
2. Nhập tên tệp
3. Nhấp vào " Save'
![](https://images.viblo.asia/8e2df0b7-026b-40a3-9771-57f43cd11380.PNG)

Bước 10) Khi nhấp vào nút 'Save', traceability matrix được tạo cho người dùng
![](https://images.viblo.asia/e06bd19d-c057-4079-8b77-6ff4db177250.PNG)