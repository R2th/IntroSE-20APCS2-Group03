Trong những năm gần đây, nhu cầu về kiểm thử tự động trong việc phát triển phần mềm đã tăng lên. Đằng sau điều này là sự đáp ứng với nhu cầu thị trường thay đổi nhanh chóng. Đặc biệt, sự phát triển nhanh chóng đã làm tăng cơ hội cho việc thử nghiệm lặp lại và nhu cầu kiểm thử tự động cũng tăng theo. Lần này, mình sẽ giới thiệu những ưu điểm và nhược điểm của việc kiểm thử tự động , cũng như các công cụ tiêu biểu.

### Ưu điểm 

Đầu tiên, chúng ta sẽ cùng tìm hiểu về hiệu quả của việc kiểm thử tự động.

1. Các bài kiểm tra có thể được thực hiện một cách nhanh chóng
    - Nói chung ưu điểm của kiểm thử tự động là nó chạy nhanh hơn kiểm thử thủ công. Tuy nhiên, hãy nhớ rằng tốc độ thực thi sẽ khác nhau tùy thuộc vào nội dung được thực thi và các công cụ được sử dụng.

2. Có thể phát hiện sớm các lỗi
    - Bằng cách chạy các bài kiểm thử tự động mỗi khi quá trình phát triển của bạn được hoàn thành như bổ sung tính năng mới, sửa lỗi. Bạn có thể phát hiện sớm các lỗi và thực hiện hành động ngay lập tức. Việc kết hợp kiểm thử tự động vào quy trình thực thi CI có thể hiệu quả hơn.

3. Có thể thực hiện kiểm tra một cách chính xác.
    - Loại bỏ lỗi của con người khi thực hiện các bài kiểm tra, cho phép các bài kiểm tra chính xác hơn.

4. Có thể thực hiện kể cả thiếu nguồn nhân lực.
    - Bằng cách tự động hóa việc kiểm tra, bạn có thể kiểm tra ngay cả khi bạn thiếu nhân lực để thực hiện việc kiểm tra đối với ứng dụng, phần mềm của bạn. Kiểm tra thủ công cũng cho phép kiểm tra hiệu suất quy mô lớn không thực tế và kiểm tra so sánh lượng lớn dữ liệu.


### Nhược điểm 
Tiếp theo, chúng ta sẽ tìm hiểu về nhược điểm của việc kiểm thử tự động. Không phải tất cả các bài kiểm tra đều có thể tự động hóa. Để có hiệu quả với tự động hóa, điều quan trọng là phải xác định thử nghiệm nào để tự động hóa. Dưới đây là một số điều cần ghi nhớ cho điều đó.

1. Có thể bỏ sốt lỗi do con người.
    - Kiểm thử tự động bao gồm các bài kiểm tra tốt và không tốt. Ví dụ, với các thử nghiệm dễ xảy ra lỗi do con người và các thử nghiệm được lặp lại thì các thử nghiệm được thực hiện không thường xuyên hoặc quy trình không cố định thì không phù hợp với tự động hóa. 
2. Hoạt động bảo trì 
    -  Kiểm thử tự động không có hiệu quả ngay lập tức. Hiệu quả có thể đạt được bằng cách tiếp tục vận hành nó nhiều lần. Hoạt động bảo trì là cần thiết để kiểm thử tự động được tiếp tục hoạt động.
3. Kiểm tra tự động chỉ có thể kiểm tra những gì chúng ta thiết kế.
    - Chỉ nội dung kiểm thử đã được thiết kế để thử nghiệm mới có thể được tự động hóa. 
4. Chi phí cao 
   - Chi phí ban đầu cao hơn với kiểm thử thủ công, chẳng hạn như chi phí viết mã kiểm tra và chi phí học cách sử dụng thành thạo các công cụ. 

### Phương pháp triển khai
- Có ba điểm quan trọng cần xem xét khi triển khai kiểm thử tự động 
1. Mục đích
    - Chúng ta có thể nghĩ rằng việc kiểm tra tự động có thể mang lại chỉ là lợi ích, nhưng không phải vậy. Để tự động hóa việc kiểm thử thành công, điều quan trọng là phải làm rõ mục đích của nó trước khi thực hiện.
    - Trước tiên, hãy xác định mục đích của tự động hóa thử nghiệm, chẳng hạn như "giảm chi phí", "giảm thời gian", "thực thi thường xuyên" và "thực thi liên tục", bao gồm cả mức độ ưu tiên, sau đó xem xét liệu mục đích có thể đạt được hay không. Ví dụ, nếu mục đích chính là "giảm chi phí", hãy xem xét liệu có thể đạt được hiệu quả về chi phí hay không khi đã tính đến chi phí ban đầu và chi phí bảo trì và vận hành. Thời gian được tiết kiệm bằng tự động hóa so với việc chạy thử nghiệm theo cách thủ công hay không.
 2. Mục tiêu, phạm vi
    - Tự động hóa thử nghiệm là không phù hợp và không phải tất cả các thử nghiệm đều cần được tự động hóa. Chúng ta sẽ thu hẹp phạm vi và phạm vi tự động hóa trong khi tính đến mục đích của tự động hóa. Ví dụ, nếu mục đích là "giảm chi phí", thì quyết định được đưa ra là tập trung vào phần mà hiệu quả giảm chi phí đến mực mong đợi, chẳng hạn như việc kiểm thử đã được thiết lập và luôn được thực hiện mọi lúc. Khi bạn đã quyết định mục tiêu và phạm vi thử nghiệm, hãy thiết kế một kịch bản thử nghiệm tự động.

3. Chọn công cụ và phần mềm để sử dụng
    - Sau khi chúng ta quyết định về mục đích, mục tiêu và phạm vi của việc tự động hóa, thì sẽ quyết định công cụ nào sẽ triển khai. Không chỉ là công cụ phù hợp với mục tiêu và mục đích phát triển, mà công cụ này còn được lựa chọn với mục tiêu có thể hoạt động liên tục hay không. Khi đó, chúng ta sẽ xem xét chi phí vận hành và chi phí bảo trì.

### Công cụ 
- [LambdaTest](https://www.lambdatest.com/)
    - Một công cụ kiểm tra tự động hóa dựa trên đám mây cho các ứng dụng dành cho máy tính để bàn và thiết bị di động. Cho phép chúng ta ghi lại quá trình kiểm tra khả năng tương thích của trình duyệt theo thời gian thực. Thêm vào đó, nó cho phép ghi màn hình và kiểm tra ảnh chụp màn hình tự động trên một số kết hợp cùng một lúc. LambdaTest còn cung cấp tích hợp với một số công cụ CI / CD, chẳng hạn như Jenkins, Circle CI...
- [Autify](https://appium.io/)
    - Một framework tự động hóa việc kiểm tra mã nguồn mở có thể được sử dụng miễn phí. Tự động kiểm tra các ứng dụng iOS / Android gốc, ứng dụng kết hợp và ứng dụng dành cho Mac OS / Windows.
- [Selenium](https://www.selenium.dev/documentation/)
    - Một công cụ mã nguồn mở để kiểm tra tự động các ứng dụng web, được cung cấp miễn phí. Với Selenium IDE, chúng ta có thể tạo các kịch bản thử nghiệm bằng cách ghi lại các hoạt động của trình duyệt (quy trình vận hành thử nghiệm) từ các tiện ích bổ sung của Firefox hoặc các tiện ích mở rộng của Chrome.
- [Appium](https://autify.com/)
    - Một công cụ có thể tự động kiểm tra ứng dụng web mà không cần code. Nó là một công cụ có thể được triển khai ngay cả bởi những người không có kiến thức về lập trình và có thể dễ dàng thực hiện ghi lại hoạt động và đánh giá kết quả kiểm tra từ tiện ích mở rộng của Chrome. 
- [mabl](https://www.mabl.com/)
   - Một công cụ có thể tự động kiểm tra các ứng dụng web với low-code. Đối với những người hiểu mã trong khi có các chức năng tương tự như Autify, chẳng hạn như khả năng thực hiện ghi hoạt động và đánh giá kết quả kiểm tra từ tiện ích mở rộng của Chrome và chức năng theo dõi các thay đổi của giao diện người dùng bằng AI và tự động cập nhật các tập lệnh kiểm tra. Một tính năng khác của mabl là nó có thể được sử dụng để kiểm tra API và triển khai thử nghiệm bằng cách sử dụng các biến.


### Tài liệu tham khảo
- https://www.imaginarycloud.com/blog/top-automation-testing-tools/
- https://www.botplayautomation.com/post/automation-test-plan
- https://scalac.io/blog/manual-testing-vs-automation-testing/