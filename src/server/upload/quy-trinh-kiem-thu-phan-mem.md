Chào các bạn, để tiếp tục với chuỗi các kiến thức về Testing, hôm nay mình sẽ chia sẻ cho các bạn về **Quy trình kiểm thử phần mềm** ( Software Testing Life Cycle).


## 1. Chu trình kiểm thử phần mềm là gì?
Quy trình kiểm thử phần mềm là chuỗi các hoạt động được tiến hành để thực hiện việc kiểm thử. Nó bao gồm hàng loạt các hoạt động được tiến hành theo phương pháp luận để giúp xác nhận sản phẩm phần mềm của bạn.Tuy nhiên, hiện nay trên thế giới vẫn chưa có 1 tiêu chuẩn cụ thể về chu trình kiểm thử phần mềm.
![](https://images.viblo.asia/0e5a72ad-2c12-465a-8486-574da5690614.PNG)

## 2. Các giai đoạn của chu trình kiểm thử phần mềm:

### 2.1. Phân tích yêu cầu 
Trong pha này, đội test sẽ nghiên cứu tài liệu yêu cầu để đưa ra cái nhìn tổng quan về phần mềm. Từ đó có thể xác định được các yêu cầu cần được kiểm tra.
Đội tester/ QA có thể tương tác với các bên liên quan như : Khách hàng, BA ( Business Analyst) , Leader, PM,.... để hiểu được hệ thống thông qua việc trò chuyện trực tiếp hoặc tạo file Q&A .

Các yêu cầu ở đây có thể là các yêu cầu về chức năng ( xác định xem phần mềm cần phải làm gì) hoặc là các yêu cầu phi chức năng ( hiệu năng,bảo mật,...).

Tính khả thi của việc Automation test cũng được xác định trong giai đoạn này.

###  Nhiệm vụ : 
- Xác định các loại kiểm thử sẽ được thực hiện.
- Thu thập thông tin về mức độ ưu tiên test ( xem chức năng nào là chức năng quan trọng nhất của phần mềm thì sẽ được test trước).
- Xác định môi trường test.
- Phân tích tính khả thi của  kiểm thử tự động ( nếu dự án yêu cầu cần kiểm thử tự động).

### 2.2. Lập kế hoạch kiểm thử ( Test plan)
![](https://images.viblo.asia/e3244b84-c8f5-4fec-a482-63476ab108a4.jpg)

**Test plan** là tài liệu tổng quan về việc kiểm thử 1 project đặc tả: phạm vi dự án, hướng tiếp cận, quy trình kiểm thử, tài nguyên và nhân lực cần có, các tính năng cần được test và không cần phải test, các công cụ và môi trường test cần có. Test plan là cơ sở để test các sản phẩm hoặc phần mềm trong một dự án.

Trong giai đoạn này, Test Manager hoặc Test Leader sẽ xây dựng kế hoạch ban đầu về kiểm thử.

Trong bản kế hoạch kiểm thử bao gồm những thông tin sau:
- Xác định phạm vi kiểm thử.
- Xác định chiến lược kiểm thử.
- Danh sách tài liệu liên quan như spec, tài liệu thiết kế, các kế hoạch test khác,...
- Các vấn đề ưu tiên và tập trung test.
- Thời gian ước lượng và thời gian test thực tế.
- Ước lượng số testcase cần tạo cho mỗi chức năng, mỗi module.
- ...
### Nhiệm vụ : 
- Chuẩn bị kế hoạch kiểm thử/ tài liệu chiến lược cho các loại kiểm thử khác nhau.
- Lựa chọn các công cụ dùng để test.
- Ước lượng thời gian cần thiết để thực hiện kiểm thử

### 2.3. Thiết kế và tạo testcase
Trong giai đoạn này , tester sẽ thiết kế testcase / test checklist( với test manual) và test script ( với automation test)  theo tài liệu đặc tả yêu cầu bằng cách sử dụng các kỹ thuật thiết kế testcase. Dữ liệu kiểm thử cũng được chuẩn bị từ giai đoạn này.

### Nhiệm vụ: 
- Tạo test checklist/testcase hoặc test script
- Review lại các testcase và test script xem đã sát với đặc tả yêu cầu hay chưa.
- Tạo dữ liệu test. 

### 2.4. Cài đặt môi trường test

Môi trường kiểm thử là 1 thiết lập của phần mềm và phần cứng để cho đội kiểm thử tiến hành kiểm tra các testcase. Đây là 1 trong những bước vô cùng quan trọng của quá trình kiểm thử và có thể được thực hiện song song với giai đoạn thiết kế testcase. Nhóm tester/ QA có thể sẽ không cần phải thực hiện bước này nếu như khách hàng hoặc nhóm phát triển đã cung cấp sẵn môi trường để kiểm thử.

### Nhiệm vụ:
- Hiểu kiến trúc hệ thống , thiết lập môi trường test, chuẩn bị về phần cứng, phần mềm.
- Cài đặt môi trường và dữ liệu test.
- Thực hiện smoke test trên bản build.( Khái niệm smoke test mình đã đề cập ở bài viết trước, các bạn có thể xem [tại đây ](https://viblo.asia/p/cac-khai-niem-co-ban-ve-kiem-thu-phan-mem-63vKjR7dK2R))

### 2.5. Thực hiện kiểm thử ( Test Executetion )
![](https://images.viblo.asia/6357e9d9-0da5-42cb-8d2d-010eaf3a03fc.jpg)

Trong giai đoạn này , người tester sẽ thực hiện kiểm thử dựa trên bản kế hoạch kiểm thử và kịch bản kiểm thử đã được chuẩn bị . Các bug được tìm thấy sẽ được báo cáo lại cho nhóm phát triển phần mềm để sửa chữa.

###  Nhiệm vụ: 

- Thực hiện kiểm thử theo kế hoạch
- Log bug và ghi chú lại khi có các testcase thực hiện không thành công.
- Kiểm tra lại ( Retest) sau khi các bug đã được fix.
- Theo dõi và đóng bug.

### 2.6 . Giai đoạn đóng quy trình ( Test cycle closure)

Nhóm kiểm thử sẽ họp , thảo luận và phân tích artifact ( ví dụ như  requirement, design document, test case,test plan, test script, …) để xác định các chiến lược cần triển khai trong tương lai, rút ra các kinh nghiệm từ quá trình kiểm thử hiện tại. Mục đích của hoạt động này là để loại bỏ các khó khăn gặp phải trong dự án và tìm ra phương pháp tốt nhất cho các dự án trong tương lai.

###  Nhiệm vụ: 
- Đánh giá các tiêu chí hoàn thành kiểm thử dựa trên thời gian và kết quả test, chi phí, chất lượng, ...
- Chuẩn bị báo cáo kết quả kiểm thử ( test report)
- Báo cáo định tính và định lượng về  kết quả sản phẩm cho khách hàng.
- Phân tích kết quả kiểm thử để tìm ra sự phân phối lỗi theo loại và theo mức độ nghiêm trọng.

### 3. Tham Khảo
https://www.guru99.com/software-testing-life-cycle.html