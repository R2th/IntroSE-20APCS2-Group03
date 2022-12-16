# Kiểm thử phi chức năng (Non-functional testing) là gì?
Kiểm thử phi chức năng là một loại kiểm thử để kiểm tra các khía cạnh phi chức năng (hiệu suất, khả năng sử dụng, độ tin cậy, v.v.) của một ứng dụng phần mềm. Nó được thiết kế để kiểm tra sự sẵn sàng của một hệ thống theo các tham số không chức năng không bao giờ được giải quyết bằng thử nghiệm chức năng.

Một ví dụ về kiểm tra phi chức năng như là kiểm tra xem có bao nhiêu người có thể đăng nhập đồng thời vào một phần mềm.

Kiểm tra phi chức năng cũng quan trọng không kém như kiểm tra chức năng và ảnh hưởng đến sự hài lòng của khách hàng.

Trong hướng dẫn này, chúng ta sẽ tìm hiểu những vấn đề sau:
* Mục tiêu của kiểm thử phi chức năng
* Đặc điểm của kiểm thử phi chức năng
* Các thông số kiểm thử phi chức năng
* Loại kiểm thử
* Các loại kiểm thử phi chức năng.

## Mục tiêu của kiểm thử phi chức năng
* Kiểm thử phi chức năng nên tăng khả năng sử dụng, hiệu quả, khả năng bảo trì và tính di động của sản phẩm.
* Giúp giảm rủi ro sản xuất và chi phí liên quan đến các khía cạnh phi chức năng của sản phẩm.
* Tối ưu hóa cách cài đặt sản phẩm, thiết lập, thực thi, quản lý và giám sát.
* Thu thập và sản xuất các phép đo, và số liệu cho nghiên cứu và phát triển nội bộ.
* Cải thiện và nâng cao kiến thức về hành vi và công nghệ sản phẩm đang sử dụng.

## Đặc điểm của kiểm thử phi chức năng
* Kiểm tra phi chức năng nên được đo lường, vì vậy không có chỗ cho đặc tính chủ quan như tốt, tốt hơn, tốt nhất, v.v.
* Những con số chính xác không thể biết được khi bắt đầu xử lý yêu cầu
* Điều quan trọng cần ưu tiên các yêu cầu
* Đảm bảo rằng các thuộc tính chất lượng được xác định chính xác

## Các thông số kiểm thử phi chức năng
![](https://images.viblo.asia/d1363f70-6824-4a22-800a-8045f804275c.PNG)

### 1. Bảo vệ (Security):
Tham số xác định cách hệ thống được bảo vệ an toàn trước các cuộc tấn công có chủ ý và đột ngột từ các nguồn bên trong và bên ngoài. Điều này được kiểm thử thông qua Kiểm tra bảo mật.

### 2. Độ tin cậy (Reliability):
Mức độ mà bất kỳ hệ thống phần mềm nào liên tục thực hiện các chức năng được chỉ định mà không gặp sự cố. Điều này được kiểm thử bởi Kiểm tra độ tin cậy

### 3. Khả năng sống sót (Survivability):
Tham số kiểm tra rằng hệ thống phần mềm tiếp tục hoạt động và tự phục hồi trong trường hợp lỗi hệ thống. Điều này được kiểm tra bằng Recovery Recovery

### 4. Khả dụng (Availability):
Tham số xác định mức độ mà người dùng có thể phụ thuộc vào hệ thống trong quá trình hoạt động. Điều này được kiểm tra bằng Kiểm tra ổn định.

### 5. Khả năng sử dụng (Usability):
Người dùng có thể dễ dàng học hỏi, vận hành, chuẩn bị đầu vào và đầu ra thông qua tương tác với một hệ thống. Điều này được kiểm tra bởi Kiểm tra khả năng sử dụng

### 6. Khả năng mở rộng (Scalability):
Thuật ngữ này đề cập đến mức độ mà bất kỳ ứng dụng phần mềm nào cũng có thể mở rộng khả năng xử lý của nó để đáp ứng nhu cầu gia tăng. Điều này được kiểm tra bằng khả năng mở rộng

### 7. Khả năng tương tác (Interoperability):
Tham số phi chức năng này kiểm tra giao diện hệ thống phần mềm với các hệ thống phần mềm khác. Điều này được kiểm tra bởi Kiểm tra khả năng tương tác

### 8. Hiệu quả (Efficiency):
Mức độ mà bất kỳ hệ thống phần mềm nào cũng có thể xử lý dung lượng, số lượng và thời gian đáp ứng.

### 9. Mềm dẻo (Flexibility):
Thuật ngữ này đề cập đến sự dễ dàng mà ứng dụng có thể hoạt động trong các cấu hình phần cứng và phần mềm khác nhau. Giống như RAM tối thiểu, yêu cầu CPU.

### 10. Tính di động (Portability):
Tính linh hoạt của phần mềm để chuyển từ môi trường phần cứng hoặc phần mềm hiện tại của nó.

### 11. Tái sử dụng (Reusability):
Nó đề cập đến một phần của hệ thống phần mềm có thể được chuyển đổi để sử dụng trong một ứng dụng khác.

## Loại thử nghiệm
Nói chung, có ba loại thử nghiệm:

* Chức năng (Functional)
* Không chức năng (Non - Functional)
* Bảo trì (Maintenance)

![](https://images.viblo.asia/3a84fc82-f542-4b84-bbb4-fd864a35fe08.PNG)

Trong các loại thử nghiệm này, bạn có nhiều cấp độ kiểm thử (TESTING Level's), nhưng thông thường, mọi người gọi chúng là Testing Types. Bạn có thể tìm thấy một số khác biệt trong phân loại trên trong các cuốn sách và tài liệu tham khảo khác nhau.

Danh sách trên không đầy đủ vì có hơn 100 loại Kiểm tra và đếm. Không cần phải lo lắng, bạn sẽ chọn chúng khi bạn có kinh nghiệm trong ngành thử nghiệm. Ngoài ra, lưu ý rằng không phải tất cả các loại thử nghiệm áp dụng cho tất cả các dự án mà phụ thuộc vào tính chất & phạm vi của dự án. 

## Non-functional Testing Types
* Performance Testing (Kiểm tra năng suất)
* Load Testing (Kiểm tra tải)
* Failover Testing (Kiểm tra chuyển đổi dự phòng)
* Security Testing (Kiểm tra bảo mật)
* Compatibility Testing (Kiểm tra tương thích)
* Usability Testing (Kiểm tra khả năng sử dụng)
* Stress Testing (Kiểm tra về áp lực)
* Maintainability Testing (Kiểm tra bảo trì)
* Scalability Testing (Kiểm tra khả năng mở rộng)
* Volume Testing (Kiểm tra khối lượng)
* Disaster Recovery Testing (Kiểm tra khắc phục thảm họa)
* Compliance Testing (Kiểm tra tuân thủ)
* Portability Testing (Kiểm tra tính di động)
* Efficiency Testing (Kiểm tra hiệu quả)
* Reliability Testing (Kiểm tra độ tin cậy)
* Baseline Testing (Kiểm tra cơ bản)
* Endurance Testing (Kiểm tra độ bền)
* Documentation Testing (Kiểm tra tài liệu)
* Recovery Testing (Kiểm tra phục hồi)
* Internationalization Testing (Kiểm tra quốc tế hóa)
* Localization Testing (Kiểm tra nội địa hóa)

Nguồn: https://www.guru99.com/non-functional-testing.html