![](https://images.viblo.asia/a34dc1d0-05cc-49bf-9eae-a56b0c114de8.png)




# **1. Định nghĩa**

- White box testing là một phương pháp kiếm thử phần mềm trong đó người kiểm thử cần nghiên cứu và hiểu được các thiết kế và cấu trúc code bên trong cũng như các thức hoạt động của phần mềm hay sản phẩm, thay vì chỉ quan tâm đến chức năng của các module như phương pháp Black box testing.
    
 - Đối tượng test là một thành phần của phần mềm (một module, chức năng,...)
    
  - Việc thực hiện White box testing có thể hiểu đơn giản là việc chạy các thử nghiệm để xác định xem liệu hệ thống có đáp ứng các yêu cầu như tài liệu đặc tả không.
    
   - Phương pháp này là hiệu quả nhất để phát hiện lỗi ngay từ giai đoạn đầu của quá trình phát triển phần mềm. Do đó ta thường thấy nó được sử dụng trong quá trình Unit test, và thường do các Developer thực hiện.

# **2. Quy trình thực hiện White box testing**

   - Input: Requirement, Functional Specifications, Design document, Source code
    
   - Processing:thực hiện phân tích rủi ro để hướng dẫn xuyên suốt toàn bộ quy trình
    
   - Proper test planning: thiết kế test case bao phủ toàn bộ code. Tiến hành rinse-repeat cho đến khi phần mềm đạt đến mức không có lỗi. Cùng với đó, kết quả được thông báo
    
   - Output: chuẩn bị báo cáo cuối cho toàn bộ quá trình test

# **3. Các kĩ thuật White box testing**

   - Statement coverage: Mục tiêu là để đi qua tất cả các trạng thái ít nhất một lần. Do đó mỗi dòng code đều được test để tìm ra lỗi code.
    
   - Branch coverage: Các test case được thiết kế để đi qua từng nhánh từ tất cả các điểm quyết định ít nhất một lần. 
    
   - Condition coverage: Từng điều kiện tách biệt đều được cover
    
   - Multipe condition coverage: Test tất cả các kết hợp của các outcome có thể của các condition ít nhất một lần. 
    
   - Basis path testing: Ở kĩ thuật này, đồ thị điều khiển luồng  được tạo từ code hoặc sơ đồ. Sau đó độ phức tạp Cyclomatic được tính để xác định số path độc lập để giảm thiểu tối đa test case cho mỗi path.

# **4. Ưu và nhược điểm của White box testing so với Black box testing**

##    4.1. Ưu điểm: 
    
   + Việc test lỗi được thực hiện kỹ lưỡng do toàn bộ code và cấu trúc đều được test
        
   + Việc test được thực hiện sớm hơn do không yêu cầu bất kỳ giao diện nào 
        
   + Hỗ trợ cải tiến code, loại bỏ những phần code thừa
        
   + Dễ dàng tự động hóa
        
##    4.2. Nhược điểm:
    
   + Chi phí đắt đỏ
        
   + Việc tái sử dụng test case hầu như là không thể, do liên quan đến cấu trúc code
        
   + Đòi hỏi người kiểm thử cần có kiến thức chuyên sâu về ngôn ngữ lập trình
        
    + Có thể bỏ sót các chức năng

# **5. White box testing hay Black box testing?**

   Rõ ràng, hai kĩ thuật White box testing và Black box testing là hoàn toàn trái ngược, từ tên gọi, đặc điểm, cách thức tiến hành hay tổng quan về quan điểm test: trong Black box testing, Tester sẽ đứng trên quan điểm của end-user để kiểm thử và giúp cải tiến phần mềm thì đối với White box testing, Tester sẽ vừa phải có được cách nhìn thông suốt của một developer.
    
   Hiện nay, hầu hết các QA/Tester đều chỉ tập trung vào phương pháp Black box testing. Một lý do khá phổ biến là không phải QA/Tester thuần túy nào cũng có hiểu biết sâu về code. Không chỉ cần đọc hiểu code, White box testing còn yêu cầu người kiểm thử phải nắm bắt được các tiêu chuẩn lập trình, hay ngữ cảnh của đoạn code, chưa kể đến một phần mềm hay sản phẩm có thể được viết bằng nhiều ngôn ngữ lập trình khác nhau.
    
   Vậy ta nên sử dụng White box testing hay Black box testing?
    
   Tất nhiên trường hợp lý tưởng nhất là Tester có thể nắm bắt được cả hai kỹ thuật này, nhưng rõ ràng đó là một điều vô cùng khó khăn. White box testing và Black box testing có thể có vai trò quan trọng tương đương nhau, dựa trên những ưu điểm của từng phương pháp nhưng từ thực tế cho thấy, chúng ta có thể chỉ cần thực hiện một lượng nhỏ White box testing nhưng vẫn có thể đảm bảo phần mềm và sản phẩm hoạt động đúng như mong muốn.
    
   Tuy nhiên, như thế không có nghĩa là các QA/Tester không cần có kiến thức về White box testing, mặc dù chỉ cần nắm vững kiến thức về Black box testing ta cũng có thể hoàn thành công việc được giao. Việc học hỏi, trau dồi thêm kiến thức không bao giờ là thừa thãi. Thay vì luôn phải đắn đo về White box và Black box, ta có thể vượt ra ngoài giới hạn đó để đem đến một tư duy sáng tạo hơn. 
    
   Nói cách khác, hãy "***Thinking out of the box***", có thể sẽ giúp chúng ta có cái nhìn mới mẻ, sáng tạo hơn, để công việc sẽ hiệu quả và không còn nhàm chán!
    
   Tham khảo: https://www.geeksforgeeks.org/software-engineering-white-box-testing/  
                            https://viblo.asia/p/white-box-test-va-black-box-test-OeVKBOmEZkW