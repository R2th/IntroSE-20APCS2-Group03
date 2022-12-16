**QA là gì?**

QA (viết tắt của Quality Assurance) là người chịu trách nhiệm đảm bảo chất lượng sản phẩm thông qua việc đưa ra quy trình làm việc giữa các bên liên quan.

**Mối quan hệ giữa QA và Devloper**

Mục tiêu của QA và Developers là giống nhau chính là cung cấp một sản phẩm chất lượng cho người dùng hay các doanh nghiệp. Nhưng suy nghĩ của họ thì vô cùng khác nhau. Có thể nói chính xác theo một cách khác là “Testers và Developers khác nhau nhưng họ đi theo cùng một con đường để đạt được một mục tiêu chung”.
Sự khác biệt cốt lõi nằm ở động lực thúc đẩy mỗi team. Các developer thường được chỉ định viết code để giải quyết một hàm cụ thể. Về mặt phạm vi kỹ thuật, giới hạn này có thể khiến các developer bỏ lỡ các mảnh ghép của họ phù hợp với bức tranh lớn hơn. Các kỹ sư QA, mặt khác, được giao nhiệm vụ mang lại một quan điểm tổng thể, quan điểm người dùng , trong đó chất lượng của một tính năng cụ thể chỉ tốt như trải nghiệm tổng thể.

Nhưng chúng ta hãy chủ động: QA có thể làm gì, và những gì cần quan tâm áp dụng để nhận ra tiềm năng phát triển nhanh chóng? Dưới đây tôi đã liệt kê một số cách khiến nhân viên kiểm thử có thể cải thiện mối quan hệ làm việc của họ với các developer.

### 1. Tập trung vào chất lượng, không phải vào việc kiểm thử
Kiểm thử chỉ là một phương tiện để kết thúc. Thông thường, các kỹ sư QA chạy thử nghiệm như thể họ dự kiến ​​sẽ điền vào một số loại hạn ngạch để hoàn thành các bài kiểm tra. Chúng ta phải nhớ rằng mục tiêu thực sự là cải thiện chất lượng của sản phẩm.

Hãy chắc chắn rằng bạn hiểu những gì là quan trọng đối với khách hàng của bạn và kiểm tra điều đó. Đừng chỉ nhìn vào định nghĩa câu chuyện của người dùng. Cố gắng suy nghĩ như người dùng và đảm bảo ứng dụng sẽ có ý nghĩa từ quan điểm của họ.

Trong một trường hợp tôi đã tham gia, ứng dụng có tính năng báo cáo lỗi đã vượt qua tất cả các bài kiểm tra chức năng và có một giao diện tuyệt vời. Tuy nhiên, khách hàng phàn nàn rằng họ không thể dễ dàng hiểu được từ báo cáo thực sự là vấn đề được đánh dấu.

Luôn nghĩ về người dùng của bạn và không kiểm tra chỉ để nói rằng bạn đã thực hiện một bài kiểm tra. Người dùng không quan tâm bạn thử nghiệm bao nhiêu lần trong ứng dụng của mình — họ quan tâm đến chất lượng sản phẩm và đáp ứng nhu cầu của họ.

### 2. Chia sẻ trách nhiệm với nhau
Điều này rất đơn giản: Mỗi người đều phải chịu trách nhiệm về chất lượng của sản phẩm. Trong một đội ngũ làm việc nhanh nhẹn, không còn từ "chúng tôi" và "chúng" nữa. Các developer phải chịu trách nhiệm về code của họ và đảm bảo họ viết các bài kiểm thử đơn vị có liên quan. QA nên kiểm tra toàn bộ hệ thống.

Đúng vậy, QA là những người có trách nhiệm lớn, nhưng tất cả mọi người trong một nhóm làm việc nhanh nhẹn phải cùng có trách nhiệm về chất lượng của sản phẩm.

### 3. Chủ động chọn cuộc tranh luận cần thiết
Là một người có trách nhiệm quan trọng, nhưng bạn không thể chiến đấu với mọi sai sót. Bạn nên hiểu cuộc tranh luận nào đáng để tranh luận và cuộc tranh luận nào bạn có thể bỏ qua. Nếu không nắm rõ, mọi người sẽ mất rất nhiều thời gian để sửa chữa những điều không quan trọng.

Tip: Xác định "ranh giới đỏ" của riêng bạn về những thứ mà bạn dễ dàng nhận ra là sẽ không thỏa hiệp và chỉ tập trung vào những thứ đó. 

Nhiều team đã thiết lập "ủy ban lỗi", giúp xác định trước những lỗi có thể trầm trọng hơn sau này so với các lỗi khác trước mỗi lần chạy nước rút hoặc một phiên bản sắp được phát hành. Điều này giúp tập trung nỗ lực của tất cả mọi người.

### 4. Xây dựng về lỗi
Không có số lượng kiểm thử nào sẽ đảm bảo rằng bạn không gặp phải lỗi. Một số lỗi sẽ luôn bị bỏ qua ngay cả với các thủ tục kiểm thử nghiêm ngặt nhất và sẽ bị phát hiện bởi người dùng. Điều quan trọng là giữ bình tĩnh, học hỏi từ những "lỗi đã chạy thoát", và cải thiện bản phát hành tiếp theo của bạn.

Các developer thích hỏi các kỹ sư QA rằng "Làm sao bạn lại bỏ qua lỗi đấy? Bạn không test à?" Thực tế là phần mềm rất phức tạp và bạn không thể luôn thực hiện mọi kịch bản test cũng như từng cấu hình riêng lẻ. Chúng ta tiến hành kiểm thử dựa trên rủi ro và kiểm thử theo luồng người dùng mà chúng ta thấy là quan trọng nhất và phổ biến phụ thuộc vào thời gian mà chúng ta có.

Trong một số trường hợp, chúng ta tham khảo các ý kiến quản lý sản phẩm, các bên liên quan thương mại (sales, pre-sales, vv), hoặc thậm chí là chính khách hàng. Nếu một vấn đề nào đó được thông qua trang web của chúng ta, chúng ta sẽ làm một cuộc khảo sát để tìm ra những điều đã xảy ra và lý do tại sao chúng ta bỏ qua nó, và chúng ta tạo ra kiểm thử tự động cho các lỗi đã bị bỏ qua đó.

### 5. Tạo tầm nhìn trong hoạt động của bạn
Tầm nhìn xa sẽ cải thiện sự hợp tác và tin tưởng vào bất kỳ team nào và các team làm việc linh hoạt cũng không ngoại lệ. Bạn không nên giả định rằng các developer hoặc bất kỳ bên liên quan nào khác biết bạn đang làm gì, bạn đang test như thế nào hoặc tiêu chuẩn của bạn là gì. Phản hồi lại những gì bạn đang dự định kiểm thử với developer.

Khi bạn chia sẻ công việc của mình với các developer, họ có thể bắt đầu dành sự quan tâm đến những điều quan trọng. Có những ngày bạn dành để tìm kiếm các lỗi, cùng với các bên liên quan khác, từ việc quản lý sản phẩm, hỗ trợ, và các kiến trúc sư, không chỉ mở rộng phạm vi kiểm thử hiệu quả mà còn có thêm đôi mắt để xem xét kỹ lưỡng sản phẩm. Việc công khai những bài học quan trọng đã học được từ khách hàng sẽ mang lại những lợi ích bổ sung cho việc phát triển bản thân bạn.

### 6. Không đối xử tệ với các nhà phát triển hoặc người dùng
Tôi thường nghe QA đe dọa rằng họ sẽ không chấp nhận một tính năng nào đó vì chất lượng của nó thấp. Theo tôi, đây thực sự là điều tệ nhất bạn có thể làm trong vai trò là một tester. Hãy nghĩ về kết quả ở đây: Vì không phê duyệt một tính năng nào đó, bạn không thân thiện với các developer và, tệ hơn, người dùng của bạn sẽ không có cơ hội sử dụng những tính năng đó.

Có rất nhiều cách giải quyết mà bạn có thể làm trong trường hợp chất lượng thấp: Có một team chuyên trách nhằm cải thiện chất lượng; chỉ phát hành phần đầu tiên của một đặc tính (một sản phẩm có chất lượng đầy đủ); và một list các điều khác. Một thủ thuật được dùng phổ biến là đánh dấu một đối tượng là "alpha", "beta" hoặc "truy cập sớm" để đặt kỳ vọng. Điều này có nghĩa là người dùng sẽ có thể bắt đầu sử dụng tính năng mới, hiểu rằng nó có thể vẫn là một thử nghiệm chưa hoàn thiện. Tôi nghĩ rằng đây là một thắng lợi nhân đôi: Người dùng có được tính năng mới, chúng tôi nhận được phản hồi từ họ và "lương tâm cao quí" của chúng tôi vẫn nguyên vẹn.

***Chủ động***

Kỹ năng của QA không phải chỉ là chờ đợi các quy trình ảo để mọi thứ diễn ra suôn sẻ hơn. Mà thay vào đó, QA chủ động và cải thiện sự cộng tác với các developer, ghi nhớ tất cả những tính năng mang lại trải nghiệm chất lượng tốt nhất cho người dùng là điều tối quan trọng. Kiểm thử đồng nghĩa với bước cuối cùng - là sự kết thúc bằng chính chất lượng của nó.

Link tham khảo : https://techbeacon.com/6-ways-qa-can-work-better-developers