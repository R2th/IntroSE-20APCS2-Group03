Trong vòng tròn phát triển sản phẩm, kiểm thử phần mềm là bước cuối cùng trước khi sản phẩm đến tay khách hàng. Có rất nhiều mức độ khác nhau trong quá trình kiểm thử. Mỗi mức độ sẽ gồm nhiều phương pháp khác nhau có thể được sử dụng trong quá trình tiến hành kiểm thử. Hai mức độ kiểm thử chính sẽ là : kiểm thử chức năng và kiểm thử phi chức năng. 

Trong bài viết này chúng ta sẽ tìm hiểu một trong các phương pháp kiểm thử trong kiểm thử chức năng. 

# **1. Kiểm thử hệ thống (System Testing)**

Kiểm thử hệ thống hay còn gọi là System Testing, là kiểm tra lại toàn bộ hệ thống sau khi tích hợp. Nó cho phép kiểm tra sự tuân thủ của hệ thống theo yêu cầu. Loại kiểm thử này kiểm tra sự tương tác tổng thể của các thành phần. Nó liên quan đến tải, hiệu suất, độ tin cậy và kiểm tra bảo mật.

System Testing sẽ được thực hiện sau integration testing. Đây là một bước giữ vai trò quan trọng trong việc cho ra đời một sản phẩm chất lượng cao.

System Testing thuộc loại kiểm thử hộp đen( Black Box Testing), là một phương pháp kiểm thử phần mềm dựa trên đầu vào và đầu ra của chương trình để test mà không cần quan tâm code bên trong của phần mềm ra sao. Mục đích chính là liệu nó có đáp ứng được sự mong đợi của người dùng hay không?

# **2. Điểm khác nhau then chốt giữa Integration Test và System Test:**

* System Test chú trọng các hành vi và lỗi trên toàn hệ thống.
* Integration Test chú trọng sự giao tiếp giữa các đơn thể hoặc đối tượng khi chúng làm việc cùng nhau.
* Thông thường ta phải thực hiện Unit Test và Integration Test để bảo đảm mọi Unit và sự tương tác giữa chúng hoạt động chính xác trước khi thực hiện System Test.

# **3. Tại sao phải kiểm thử hệ thống?**

* Kiểm thử phần mềm là khâu vô cùng quan trọng trong quá trình phát triển 1 sản phẩm công nghệ. Nó chỉ ra lỗi và sai sót đã được thực hiện trong các giai đoạn phát triển. 
* System testing đảm bảo độ tin cậy của khách hàng và sự hài lòng của họ về ứng dụng mà mình tạo ra  
* Giúp tăng hiệu suất công việc do giảm được tối đa thời gian để tìm lỗi trên ứng dụng phần mềm hoặc sản phẩm nhiều lần
* Kiểm thử phần mềm là cần thiết vì nó giúp cung cấp các ứng dụng phần mềm cho khách hàng phân phối được hướng sản phẩm chất lượng cao hoặc chi phí bảo trì ứng dụng phần mềm thấp hơn, tiết kiệm hơn và do đó dẫn đến hiệu quả cao nhất và đáng tin cậy hơn.
* Được thực hiện trong một môi trường tương tự như môi trường production, cho phép các nhà phát triển cũng như các bên liên quan có được ý tưởng về phản ứng của người dùng đối với sản phẩm.
* Quá trình này đặc biệt đảm bảo rằng ứng dụng không dẫn đến bất kỳ lỗi nào, hạn chế tối đa những tốn kém trong tương lại hoặc trong các giai đoạn của quá trình phát triển sản phẩm. 

# **4. Các loại kiểm thử được sử dụng trong kiểm thử hệ thống**

Giống như kiểm thử phần mềm, kiểm thử hệ thống cũng là sự kết hợp của các kỹ thuật kiểm thử đa năng, cho phép xác nhận hiệu suất và chức năng tổng thể của sản phẩm. Mỗi kỹ thuật kiểm tra này được tập trung vào các khía cạnh khác nhau của sản phẩm và phục vụ các yêu cầu khác nhau của khách hàng / người dùng. Những loại kiểm thử được sử dụng:

* Kiểm tra cài đặt: Nó được sử dụng để kiểm tra chức năng mong muốn của phần mềm sau khi cài đặt thành công cùng với tất cả các yêu cầu cần thiết
* Functional Testing ( Kiểm thử chức năng): Đánh giá phần mềm hoạt động đúng với yêu cầu đã đưa ra từ trước, đồng thười có thể lập ra danh sách các chức năng bổ sung để cải thiện sản phẩm
* Usability Testing ( Kiểm thử khả năng sử dụng): chủ yếu tập trung vào việc người dùng dễ dàng sử dụng phần mềm, tính linh hoạt trong việc xử lý các điều khiển và khả năng dáp ứng các mục tiêu của phần mềm
* Load Testing: để biết được khả năng chịu tải thực tế của ứng dụng
* Regression Testing ( Kiểm thử hồi quy): Đảm bảo không có vấn đề gì trong quá trình phát triển cũng như các chức năng ban đầu vẫn hoạt động đúng mà không phát sinh lỗi khi có sự thay đổi trong code
* Kiểm tra bảo mật: Để đánh giá các tính năng bảo mật của phần mềm để đảm bảo, bảo vệ, tính xác thực, bảo mật và tính toàn vẹn của thông tin và dữ liệu.
* Recovery Testing ( Kiểm thử khả năng phục hồi): Nó được thực hiện bằng cách cố làm cho phần mềm bị crash hoặc fail, để đánh giá khả năng phục hồi của sản phẩm một cách nhanh chóng, đáng tin cậy và có thể phục hồi thành công từ các sự cố có thể xảy ra
* Migration Testing ( Kiểm thử di chuyển): được thực hiện để đảm bảo rằng phần mềm có thể được chuyển từ cơ sở hạ tầng hệ thống cũ sang cơ sở hạ tầng hệ thống hiện tại mà không có bất kỳ vấn đề nào.
* Kiểm tra khả năng tương tác: Nó đảm bảo khả năng phần mềm tương thích và tương tác với phần mềm hoặc hệ thống khác và các thành phần của chúng.
Tùy thuộc vào từng yêu cầu của mỗi hệ thống mà Tester sẽ có những tiêu chí khác nhau để lựa chọn loại kiểm thử phù hợp.

# **5. Thực hiện kiểm thử hệ thống như thế nào?**

Để kiểm tra toàn bộ hệ thống, các yêu cầu và kỳ vọng phải rõ ràng và tester cũng cần phải hiểu cách sử dụng ứng dụng theo thời gian thực.

Ngoài ra, hầu hết các công cụ của bên thứ ba, các phiên bản và kiến trúc của Hệ Điều Hành đều có thể ảnh hưởng đến chức năng, hiệu năng, bảo mật, khả năng phục hồi hoặc khả năng cài đặt của hệ thống.

Thử nghiệm này cần được thực hiện một cách có kế hoạch và có hệ thống.

Dưới đây là các bước trong quá trình thực hiện kiểm thử: 

**Bước 1**: Lên plan test.

**Bước 2**: Phân tích và thiết kế ( Tạo testcase và các bước kiểm tra chi tiết cho mỗi version).

**Bước 3**: Thực thi test bao gồm thực hiện test và chạy test( chuẩn bị data test, chạy case và so sánh kết quả). 

**Bước 4**: Đánh giá kết quả thực thi và báo cáo kết quả test.

**Bước 5**: Đóng hoạt động kiểm thử 

# **6. Các vấn đề cần test?**

Các vấn đề nêu dưới đây là các yếu tố trong quá trình kiểm thử:

* Test đầu cuối/end to end bao gồm xác minh sự tương tác giữa tất cả các thành phần cũng như với các thiết bị ngoại vi bên ngoài để chắc chắn rằng hệ thống hoạt động ổn định trong bất kỳ tình huống nào được đưa ra trong bài test.
* Test sẽ xác minh input được cung cấp cho hệ thống có cung cấp kết quả như kỳ vọng hay không.
* Xác minh nếu tất cả các yêu cầu về chức năng & phi chức năng được đã được test hay chưa và có hoạt động như mong đợi hay không.
* Ad-hoc test và chạy chẩn đoán có thể được thực hiện trong kiểm thử sau khi hoàn thành các test theo kịch bản. Các test này giúp phát hiện các lỗi không thể tìm thấy trong test theo kịch bản nhờ cho phép các tester tự do kiểm tra dựa trên kinh nghiệm và trực giác của mình.

# **7. Ưu điểm của System Testing**

* Dễ dàng tự động hóa.
* Không cần truy cập mã nguồn, một số lượng lớn tester có kỹ năng vừa phải có thể kiểm tra ứng dụng mà không cần có nhiều kiến thức, ngôn ngữ lập trình hoặc hệ điều hành.
* Phù hợp và hiệu quả khi số lượng các dòng lệnh của hệ thống là lớn.
* Phân biệt được rõ ràng quan điểm của người dùng với quan điểm của nhà phát triển, hay còn gọi là có sự đánh giá khách quan.

***Bài dịch và tham khảo từ nguồn  https://www.softwaretestinghelp.com/system-testing/ và https://www.guru99.com/system-testing.html***