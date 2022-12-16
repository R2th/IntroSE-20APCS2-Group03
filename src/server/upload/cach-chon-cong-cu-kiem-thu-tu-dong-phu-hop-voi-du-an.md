Không thể phủ nhận hầu hết các dự án đều không thể thiếu việc kiểm thử được thực hiện theo cách thủ công (manual test). Nhưng đôi khi do yêu cầu từ phía khách hàng và đặc thù của dự án cần thực hiện các case kiểm thử đòi hỏi tính liên tục và lặp đi lặp lại nhiều lần. Lúc này kiểm thử tự động (automation test) là một lựa chọn đúng đắn thay thế cho cho việc kiểm thử thủ công. Vậy đâu là công cụ kiểm thử tốt nhất và cách chọn công cụ kiểm thử như nào để đáp ứng yêu cầu dự án?
![](https://images.viblo.asia/7ee627c4-f26b-45d3-8914-09c02361f69c.jpg)
Khó mà có thể trả lời cho câu hỏi này vì có nhiều yếu tố cần xem xét khi chọn lựa một công cụ kiểm thử tự động:
- Muốn thực hiện test các case bằng công cụ phần mềm, nhưng không biết các công cụ nào hiện có trên thị trường.
- Công cụ nào sẽ phù hợp với dự án của mình?
- Trong team test ai có khả năng sử dụng công cụ đó? 
Hướng dẫn sau đây sẽ giúp các tester trả lời các câu hỏi trên.
## Tầm quan trọng của việc chọn lựa công cụ kiểm thử phần mềm
Một dự án áp dụng đúng công cụ test và đạt được kết quả phần lớn đều dựa vào việc xác định đúng công cụ cho việc kiểm thử tự động. Việc chọn đúng công cụ kiểm thử là một trong những cách tốt nhất để đạt được mục tiêu dự án. 

Ví dụ sau sẽ cho chúng ta thấy lợi ích của việc lựa chọn đúng công cụ kiểm thử.
![](https://images.viblo.asia/e0a43aed-b3f1-4963-8636-dec8afc18ad1.png)

Kết quả: 
- Công cụ kiểm thử tự động mới tăng gấp đôi công suất test. Điều đó có nghĩa team dự án đã tiết kiệm được 50% chi phí cho việc test này.                              
- Đây là một ví dụ về lợi ích của việc sử dụng công cụ kiểm thử trong dự án. Lựa chọn đúng công cụ test sẽ cải thiện được hiệu suất và tiết kiệm chi phí cho dự án.
# Các loại công cụ test
Có nhiều loại công cụ test mà team test có thể xem xét khi lựa chọn.
![](https://images.viblo.asia/bec09fe4-def1-4012-a53e-b949a6b20625.png)
### ✤ Công cụ Open-Source (Open-Source Tools)
- Các công cụ mã nguồn mở là chương trình trong đó các mã nguồn được công bố công khai để sử dụng hoặc sửa đổi (modification) từ thiết kế ban đầu của nó. Công cụ này không tính phí sử dụng.
- Các công cụ mã nguồn mở có sẵn cho hầu hết mọi giai đoạn của quá trình kiểm thử, từ quản lý  Test Case đến theo dõi bug/defect. So với các công cụ thương mại các công cụ mã nguồn mở có thể có ít tính năng hơn.
### ✤ Công cụ thương mại (Commercial Tools)
- Công cụ thương mại là phần mềm được viết ra để bán hoặc phục vụ cho mục đích thương mại.
- Công cụ thương mại có nhiều hỗ trợ và tính năng từ nhà cung cấp hơn công cụ mã nguồn mở.
### ✤ Công cụ tùy chỉnh (Custom Tools) 
- Trong một số dự án kiểm thử, môi trường và quy trình kiểm thử có những yêu cầu đặc biệt. Lúc này công cụ open-source hay công cụ thương mại có thể đáp ứng được yêu cầu của dự án. Do đó, team test phải xem xét đến việc phát triển công cụ tùy chỉnh.

  *Ví dụ:* Tester muốn tìm công cụ kiểm thử cho dự án Guru99 Bank. Tester muốn công cụ này sẽ đáp ứng được các yêu cầu cụ thể của dự án.
  
![](https://images.viblo.asia/c83fe0c1-9001-451f-b8be-c894c6cc04d5.jpg)
## Phân tích tính khả thi của việc kiểm thử tự động
Quay trở lại với ví dụ trên, team test quyết định sẽ phát triển một công cụ tùy chỉnh để có thể đáp ứng yêu cầu dự án. Giả sử, có đến 100 test case cần được kiểm tra tự động và được ước tính sẽ mất 5 ngày để phát triển công cụ để có thể thực hiện việc kiểm thử tự động tất cả các trường hợp test đó.

Và kết quả:

![](https://images.viblo.asia/456d3067-b04f-4712-ad5e-a9c428552430.jpg)

- Theo như kịch bản test đã đề ra, vấn đề là công cụ test không thể tự động thực hiện được tất cả các test case theo như spec. Điều đó có nghĩa là không phải tất cả các tính năng của ứng dụng đều có thể được kiểm tra bằng công cụ test.
- Nếu như chức năng cần được kiểm tra thường xuyên được thay đổi hoặc quá phức tạp, rất khó để thực hiện việc test tự động cho tất cả các tính năng của ứng dụng. Vì mỗi công cụ test đều có những hạn chế riêng.
- Để tránh gặp phải những tính huống như vậy, trước khi chọn công cụ test nhóm phải phân tích các test case và quyết định các case nào sẽ được thực hiện automation bởi công cụ và các case nào sẽ được thực hiện manual bởi tester. Đây là hoạt động "*Phân tích tính khả thi của việc kiểm thử tự động*" - *Automation Feasibility Analysis activity*.
- Phân tích tính khả thi của việc kiểm thử tự động có ý nghĩa quan trọng trong việc test. Trong phân tích này, nhóm cần phải kiểm tra xem ứng dụng được kiểm thử có đủ điều kiện để thực hiện kiểm thử tự động hay không?
- Một vài yếu tố cần cân nhắc khi lựa chọn công cụ test:
![](https://images.viblo.asia/bf5038ec-fb79-497f-a133-d3b22f302b8f.png)

    - Tính khả thi của kỹ thuật.
    - Độ phức tạp.
    - Mức độ ổn định của ứng dụng.
    - Dữ liệu test.
    - Kích thước của ứng dụng.
    - Khả năng chạy các script.
    - Các môi trường test.
## Quy trình chọn lựa công cụ
Để lựa chọn công cụ test thích hợp nhất cho dự án, Team test nên thực hiện theo quy trình chọn công cụ dưới đây:
![](https://images.viblo.asia/cd9a2707-72c9-432f-b770-55838ec2d3e2.png)
### ❋ Bước 1: Xác định yêu cầu cho các công cụ - Identify the requirement for tools
Làm thế nào bạn có thể chọn một công cụ test nếu bạn không biết bạn đang tìm kiếm cái gì?
![](https://images.viblo.asia/65f43ca4-8621-42fd-b14c-ee24c78b9915.jpg)

Bạn cần xác định rõ các yêu cầu của công cụ test. Tất cả các yêu cầu phải có tài liệu ghi chép rõ ràng và được review bởi team dự án và ban quản lý dự án.

*Ví dụ:* Bạn muốn tìm công cụ để test dự án Guru99 Bank. Bạn mong đợi gì từ công cụ này?

**A.** Công cụ có thể tự động generate các test case.

**B.** Công cụ có thể generate kết quả theo định dạng đã có.

**C.** Tester có thể chọn các test case sẽ được công cụ thực hiện test với tập dữ liệu đầu vào được quy định trước.

**D.** Công cụ có thể thực hiện test các test case tự động.

**E.** Công cụ có thể đánh giá và thực hiện các xác nhận đầu ra (output) từ đó đưa ra kết luận case test pass hay fail?

**F.** Tất cả các yêu cầu trên.
### ❋ Bước 2: Đánh giá công cụ và nhà cung cấp công cụ -  Evaluate the tools and vendors
Dựa vào các yêu cầu của công cụ test, Team test nên:
- Phân tích các công cụ thương mại và mã nguồn mở có sẵn trên thị trường, dựa trên yêu cầu của dự án.
- Liệt kê các công cụ đáp ứng tốt, đầy đủ nhất các yêu cầu của dự án.
- Một yếu tố mà Team test nên xem xét đó là nhà cung cấp của công cụ test. Nên xem xét về danh tiếng, độ tin cậy, hỗ trợ sử dụng công cụ, tần suất cập nhật version mới,...
- Đánh giá chất lượng của công cụ bằng cách dùng thử bản trial. 
### ❋ Bước 3: Ước tính chi phí và lợi ích - Estimate cost and benefit
Để đảm bảo công cụ test có ích và mang lại kết quả cho công việc. Team dự án cần phải cân nhắc cân bằng các yếu tố sau:
![](https://images.viblo.asia/4dc8880b-149e-46e1-b3a1-3a4f40df2bad.png)

Phân tích về lợi ích của chi phí phải được thực hiện trước khi build hay mua một công cụ test.

*Ví dụ:* Sau khi nhóm đã dành thời gian tìm hiểu, đánh giá các công cụ kiểm tra và đã tìm được công cụ thích hợp cho website của project Guru9 Bank. Kết quả là:
- Năng suất hiện tại của việc test tăng gấp đôi.
- Giảm 30% việc quản lý.

Tuy nhiên, sau khi thảo luận với nhà cung cấp phần mềm, chi phí của công cụ này quá cao so với giá trị và lợi ích mà công cụ mang lại cho công việc.
### ❋ Bước 4: Đưa ra quyết định cuối cùng - Make the final decision
![](https://images.viblo.asia/c5460367-5548-441c-92ed-feb4893edd38.png)
Để đưa ra được quyết định cuối cùng, Team test phải:
- Có hiểu biết rõ về công cụ. Nghĩa là phải biết, hiểu điểm mạnh và điểm yếu của công cụ.
- Cân bằng giữa chi phí và lợi ích.
- Ngay cả khi team đã dành thời gian để đọc, tìm hiểu cách sử dụng và thông tin của nhà cung cấp, team vẫn cần dùng thử công cụ trong môi trường làm việc và với dự án hiện tại của mình trước khi mua license.
- Và nên có một buổi họp với team project, chuyên gia tư vấn để có thể hiểu sâu hơn về yêu cầu của công cụ test và kết quả mà công cụ test mang lại.

Quyết định của leader của team test có thể gây ảnh hưởng xấu đến dự án, quy trình test và mục tiêu kinh doanh. Vì thế cần suy nghĩ kỹ trước khi đưa ra quyết định.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
Link tham khảo: 
- http://istqbexamcertification.com/what-are-the-important-factors-for-the-software-testing-tool-selection/
- https://www.guru99.com/testing-automation-why-right-tools-are-necessary-for-testing-success.html