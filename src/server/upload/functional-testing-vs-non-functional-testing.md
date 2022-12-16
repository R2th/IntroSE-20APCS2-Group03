![](https://images.viblo.asia/46d2a691-9bcd-4560-804b-9b7189d0db5e.png)

Kiểm thử phần mềm được phân loại thành Kiểm thử chức năng (Functional) và Kiểm thử phi chức năng (Non-functional). Vậy sự khác nhau giữa 2 loại kiểm thử này là gì, hãy cùng tìm hiểu nhé.

### I. KIỂM THỬ CHỨC NĂNG (FUNCTIONAL) 

Kiểm thử chức năng là một loại kiểm thử xác minh rằng mỗi chức năng của ứng dụng phần mềm hoạt động phù hợp với những đặc tả yêu cầu. Thử nghiệm này chủ yếu liên quan đến thử nghiệm hộp đen (Blackbox Testing - tập trung vào tính năng/chức năng) và không quan tâm đến cấu trúc mã nguồn của ứng dụng.
 
Mọi chức năng của hệ thống đều được kiểm tra bằng cách cung cấp đầu vào phù hợp, xác minh đầu ra và so sánh kết quả thực tế với kết quả mong đợi. 

Kiểm thử chức năng  bao gồm kiểm tra Giao diện người dùng, API, Cơ sở dữ liệu, Bảo mật và các chức năng của ứng dụng đang được thử nghiệm. Việc kiểm tra có thể được thực hiện bằng tay (Manual Testing) hoặc sử dụng tự động hóa (Automation Testing).

Các thử nghiệm chức năng nên được thực hiện ở tất cả các cấp độ thử nghiệm: Component Testing, IntegrationTesting, SystemTesting, Acceptance Testing.


### II. KIỂM TRA PHI CHỨC NĂNG (NON-FUNCTIONAL TESTING)

Kiểm thử phi chức năng là kiểm tra các khía cạnh phi chức năng (hiệu suất, khả năng sử dụng, độ tin cậy, bảo mật, v.v.) của một ứng dụng phần mềm. Nó được thiết kế rõ ràng để kiểm tra mức độ sẵn sàng của một hệ thống theo các tham số không chức năng và chưa được giải quyết bằng thử nghiệm chức năng.

Kiểm thử Phi chức năng được thực hiện hay không tùy theo yêu cầu của ứng dụng, yêu cầu của khách hàng hoặc người dùng.

Kiểm thử Phi chức năng nếu được thực tốt sẽ tăng hiệu quả, khả năng bảo trì và tính di động của sản phẩm phần mềm, giúp giảm rủi ro sản xuất và chi phí liên quan đến các khía cạnh phi chức năng của sản phẩm.

Trong kiểm thử Phi chức năng được chia làm nhiều loại khác nhau dưới đây:

+    Performance (Hiệu suất)
+    Security (Độ bảo mật)
+    Reliability (Độ tin cậy)
+    Availability (Tính khả dụng)
+    Usability (Khả năng sử dụng)
+    Scalability (Khả năng mở rộng)
+    Interoperability (Khả năng tương tác)
+    Efficiency (Hiệu quả)
+    Portability (Tính di động)
+    Reusability (Khả năng Tái sử dụng)

### III. SỰ KHÁC NHAU GIỮA KIỂM THỬ CHỨC NĂNG VÀ PHI CHỨC NĂNG


| Nội dung | Kiểm thử Chức năng | Kiểm thử Phi chức năng |
| -------- | -------- | -------- |
| Thời gian thực hiện     | Được thực hiện trước Kiểm thử Phi chức năng     | Được thực hiện sau Kiểm thử Chức năng     |
| Cơ sở kiểm thử     | Dựa vào Requirement của khách hàng     | Dựa vào Expectation của khách hàng     |
| Yêu cầu (Requirement)     | Dễ dàng xác định các yêu cầu chức năng     | Khó khăn hơn khi xác định các yêu cầu, có những yêu cầu mơ hồ     |
| Mục đích     | Xác nhận các hành động/hành vi của phần mềm     | Xác nhận hiệu suất của ứng dụng phần mềm     |
| Kiểm thử thủ công     | Kiểm tra chức năng dễ dàng thực hiện bằng kiểm tra thủ công     | Rất khó để thực hiện kiểm tra phi chức năng bằng tay, chủ yếu sử dụng Automation Testing     |




Tài liệu tham khảo:

https://www.guru99.com/functional-testing-vs-non-functional-testing.html

http://softwaretestingfundamentals.com/functional-testing/

ISTQB Foundation Level Syllabus document version 2018