# Cách thực hiện kiểm tra dựa trên rủi ro: Toàn bộ quá trình

Phần này bao gồm, Quy trình kiểm tra dựa trên rủi ro

1. Xác định rủi ro
2. Phân tích rủi ro
3. Ứng phó với rủi ro
4. Kiểm tra phạm vi
5. Định nghĩa quy trình test

![](https://images.viblo.asia/1f88ee44-2ad2-4b6b-8af5-e7f91a594bcb.png)

1. Trong quá trình này, các rủi ro được xác định và phân loại, một bản dự thảo rủi ro được chuẩn bị, phân loại rủi ro được thực hiện để xác định các rủi ro.
 
2. Phản ứng của rủi ro liên quan đến việc xây dựng các mục tiêu test từ các rủi ro và lựa chọn các kỹ thuật phù hợp để thể hiện hoạt động test / kỹ thuật test nhằm đáp ứng các mục tiêu test.

3. Phụ thuộc vào tài liệu, yêu cầu, chi phí, thời gian cần thiết để test phần mềm, v.v ... được xem xét để tính toán hiệu quả test.

4. Test scoping (Kiểm tra phạm vi) là một hoạt động xem xét đòi hỏi sự tham gia của tất cả các bên liên quan và nhân viên kỹ thuật. Điều quan trọng là phải tuân thủ phạm vi rủi ro đã thỏa thuận. Những rủi ro này cần được giải quyết bằng cách test, tất cả các thành viên đồng ý với các trách nhiệm được giao cho họ và ngân sách được phân bổ cho các hoạt động này.

5. Sau khi phạm vi test đã được hoàn thành các mục tiêu test, các giả định, phụ thuộc cho từng giai đoạn test phải được biên soạn theo định dạng chuẩn.

![](https://images.viblo.asia/994a93a3-96be-4bbe-80fb-b64b5a46a79e.png)

Hãy xem xét các yêu cầu chức năng F1, F2, F3 và các yêu cầu phi chức năng N1 & N2.

**F1 - Functional Requirement, Rủi ro R1 liên quan đến F1**

* Mục tiêu test 1- Chứng minh bằng cách test các tính năng và chức năng dự kiến của hệ thống hoạt động tốt và rủi ro R1 có thể được giải quyết bằng functional testing (Kiểm thử chức năng).

* **Test** -  Browser Page testing được hoàn thành để thực hiện các tác vụ quan trọng của người dùng và xác minh rằng R1 (Rủi ro liên quan đến F1) có thể được xử lý trong một loạt các scenario (kịch bản).

**F2 - Functional Requirement, R2-Rủi ro liên quan đến F2**

* Mục tiêu test 2- Chứng minh bằng cách test các tính năng và chức năng dự kiến của hệ thống hoạt động tốt và rủi ro R2 có thể được giải quyết bằng functional testing.

* **Test** - Browser Page testing được hoàn thành để thực thi các tác vụ quan trọng của người dùng và xác minh rằng R2 có thể được xử lý trong một loạt các scenario.

**F3 - Functional Requirement, R3 - Rủi ro liên quan đến F3**

* Mục tiêu test 3- Chứng minh bằng cách test các tính năng và chức năng dự kiến của hệ thống hoạt động tốt và rủi ro R2 có thể được giải quyết bằng functional testing.

* **Test** - Browser Page testing được hoàn thành để thực thi các tác vụ quan trọng của người dùng và xác minh rằng R3 có thể được xử lý trong một loạt các scenario.

**N1- Non -Functional Requirement, NR1-Rủi ro liên quan đến N1**

* Mục tiêu test N1- Chứng minh bằng cách test các đặc tính hoạt động của hệ thống hoạt động tốt và NR1 rủi ro có thể được giải quyết bằng Non-functional testing (Kiểm thử phi chức năng).
 
* **Test** - Usability testing (Kiểm thử khả năng sử dụng) là một kỹ thuật được sử dụng để đánh giá mức độ dễ sử dụng của giao diện người dùng và xác minh rằng NR1 có thể được xử lý bằng Usability testing.

**N2- Non -Functional Requirement, NR2-Rủi ro liên quan đến N2**

* Mục tiêu test N.2- Chứng minh bằng cách test các đặc tính vận hành của hệ thống hoạt động tốt và NR2 rủi ro có thể được giải quyết bằng Non-functional testing.

* Test - Security testing (Kiểm thử bảo mật) là một kỹ thuật được sử dụng để kiểm tra xem ứng dụng có được bảo mật hay dễ bị tấn công, liệu có bất kỳ rò rỉ thông tin nào không và xác minh rằng NR2 có thể được xử lý bằng Security testing.

**Mục tiêu test cụ thể** : Các rủi ro và mục tiêu test được liệt kê cụ thể cho các loại test.

![](https://images.viblo.asia/0c2a804e-cc71-4d90-9890-83d77aec43a8.png)

**Quy trình thiết kế quy trình kiểm tra dựa trên rủi ro**

* Chuẩn bị file risk register. file này ghi lại các rủi ro xuất phát từ danh sách rủi ro chung, danh sách test hiện có, brainstorming session.
* Bao gồm các rủi ro liên quan đến các yêu cầu chức năng và phi chức năng của hệ thống (Tính khả dụng, bảo mật, hiệu suất).
* Mỗi rủi ro được phân một định danh duy nhất.


| STT |Tiêu đề | Miêu tả |
| -------- | -------- | -------- |
| 3 | Probability | Khả năng lỗi này xảy ra trên hệ thống     |
| 4 | Consequences | Tác động của lỗi đến hệ thống     |
| 5 | Exposure| Sản phẩm của Xác suất và Hậu quả     |
| 6 | Test effectiveness| Tester có thể giải quyết những rủi ro này như thế nào     |
| 7 | Test priority number | Sản phẩm của Xác suất, Hậu quả và Test effectiveness (cột 3,4 6)     |
| 8 | Test objective(s)     | Test objective nào sẽ được sử dụng để giải quyết rủi ro này     |
| 9 | Test techniques     | phương pháp hay kỹ thuật nào được sử dụng      |
| 10 | Dependencies     | các phụ thuộc và giả định     |
| 11| Effort     | Cần bao nhiêu nỗ lực cho công việc test này     |
| 12 | Timescale     | Cần bao nhiêu thời gian cho công việc test này     |
| 13 | Test stage A-Unit TestsTest stage B-Integration TestTest Stage C-System Test     | Tên của người hoặc nhóm thực hiện hoạt động này     |


Đánh giá xác suất (1 Thấp -5 Cao) và hậu quả (1 Thấp -5 Cao) của mỗi rủi ro.

![](https://images.viblo.asia/ef556e27-4bb9-4168-a25f-5f397446f9ff.png)
![](https://images.viblo.asia/0c061002-383a-4c2a-9be9-2e97a2fd8ecb.png)

* Test exposure được tính toán
* Tester phân tích từng rủi ro và đánh giá xem rủi ro có thể test được hay không
* Mục tiêu test được xác định cho các rủi ro có thể test
* Tester chỉ định hoạt động test cần được thực hiện theo cách có kế hoạch để đáp ứng mục tiêu test * Tester chỉ định hoạt động test cần được thực hiện theo cách có kế hoạch để đáp ứng mục tiêu test (Đánh giá tĩnh, kiểm tra, kiểm tra sytem, ​​kiểm tra tích hợp, kiểm tra chấp nhận, xác thực html, kiểm tra bản địa hóa, v.v.)
* Các hoạt động test này có thể được phân loại thành các giai đoạn (Component Testing/Unit testing, Integration Testing, System Testing, Acceptance Testing)
* Đôi khi, rủi ro có thể được giải quyết bằng một hoặc nhiều giai đoạn test
* Xác định các phụ thuộc và giả định (Các kỹ năng có sẵn, công cụ, môi trường test, tài nguyên)
* Hiệu quả test được tính toán. Hiệu quả test liên quan đến mức độ tin cậy của tester rằng rủi ro sẽ được giải quyết dứt điểm thông qua testing. Điểm hiệu quả của việc test là một con số từ một đến năm. (5 - Độ tin cậy cao, 1 - Độ tin cậy thấp)
* Ước tính nỗ lực, thời gian cần thiết, chi phí để chuẩn bị và thực hiện các hoạt động test này.

![](https://images.viblo.asia/42e553c8-6226-4288-b3f6-53b41bade6de.png)
![](https://images.viblo.asia/2381e457-580c-481c-9316-cd23630d8387.png)

* Test priority number được tính toán. Nó là sản phẩm của xác suất, hậu quả và test effectiveness scores.
* 125 - Mức tối đa mà một rủi ro rất nghiêm trọng có thể được phát hiện khi test.
* 1 - Mức tối thiểu mà một rủi ro sẽ không được phát hiện khi test.
* Dựa trên test priority number, tầm quan trọng của test có thể được phân loại thành Cao (Đỏ), Trung bình (Vàng) & Thấp (Xanh lục). Các rủi ro cao nhất được test đầu tiên.
* Phân bổ các hoạt động test cho các giai đoạn test. Chỉ định nhóm sẽ thực hiện test cho từng mục tiêu trong các giai đoạn test khác nhau (Unit testing, Integration Testing, System Testing, Acceptance Testing).
* Những gì trong phạm vi và ngoài phạm vi test được quyết định trong giai đoạn  test scoping.
* Đối với từng mục tiêu test , thành phần được test, trách nhiệm, môi trường, tiêu chí đầu vào, tiêu chí thoát, công cụ, kỹ thuật, sản phẩm được xác định.

![](https://images.viblo.asia/fcaa7f62-f450-458f-a015-0ad105d21f8c.png)


Mục tiêu test chung- Những mục tiêu chung này có thể áp dụng cho nhiều dự án và ứng dụng

* Thành phần đáp ứng yêu cầu và sẵn sàng để sử dụng trong các hệ thống con lớn hơn.
* Các rủi ro liên quan đến các kiểu test cụ thể được giải quyết và các mục tiêu test được hoàn thành.
* Các thành phần tích hợp được lắp ráp chính xác. Đảm bảo khả năng tương thích giữa các thành phần.
* Hệ thống đáp ứng các yêu cầu chức năng và phi chức năng được chỉ định.
* Các thành phần sản phẩm đáp ứng nhu cầu của người dùng cuối trong môi trường hoạt động dự định của họ.
* Chiến lược quản lý rủi ro được sử dụng để xác định, phân tích và giảm thiểu rủi ro.
* Hệ thống đáp ứng các yêu cầu quy định của ngành.
* Hệ thống đáp ứng các nghĩa vụ hợp đồng.
* Thể chế hóa và việc đạt được các mục tiêu cụ thể khác được thiết lập như chi phí, lịch trình và các mục tiêu chất lượng.
* Hệ thống, quy trình và con người đáp ứng yêu cầu kinh doanh.

![](https://images.viblo.asia/eb609f59-12cc-4c1a-8767-3d6201d7384c.png)

Mục tiêu test chung có thể được xác định cho các giai đoạn thử nghiệm khác nhau

* Component Testing (Kiểm thử thành phần)
* Integration Testing (Kiểm thử hồi quy)
* System Testing (Kiểm thử hệ thống)
* Acceptance Testing (Kiểm thử chấp nhận)

Hãy xem xét giai đoạn system test

1. G4 & G5 chứng minh hệ thống đáp ứng các yêu cầu chức năng (F1, F2, F3) và phi chức năng (N1, N2).
2. Chứng minh bằng các test các tính năng và chức năng dự kiến của hệ thống hoạt động tốt và rủi ro liên quan đến F1, F2, F3 có thể được giải quyết bằng Functional testing.

3. Chứng minh bằng cách test các đặc tính vận hành của hệ thống hoạt động tốt và rủi ro liên quan đến N1, N2 có thể được giải quyết bằng Non-Functional testing.

4. Dựa trên test priority number và tầm quan trọng của testing có thể được phân loại thành Cao (Đỏ), Trung bình (Vàng) & Thấp (Xanh lục).

Tham khảo tại link: https://www.guru99.com/risk-based-testing.html