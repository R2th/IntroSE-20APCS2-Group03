Chào các bạn, chúng ta đều biết rằng, trong ngành công nghệ phần mềm nói riêng hay bất cứ ngành nghề nào khác nói chung thì luôn có những quy trình làm việc nhất định.

Việc xây dựng và phát triển một hệ thống phần mềm cũng không ngoại lệ, chúng ta cần phải tuân thủ theo một quy trình cơ bản đó là: Lấy yêu cầu, phân tích yêu cầu, thiết kế hệ thống, xây dựng hệ thống (code) theo thiết kế, kiểm thử và cuối cùng là bàn giao cho khách hàng.

Các bước này cứ được lặp đi lặp lại, chỉnh sửa cho đến khi hoàn thành và bàn giao sản phẩm thì thôi. Trong đó, bước kiểm thử là một trong những bước cực kỳ quan trọng. Một số sai lầm không quan trọng, nhưng một số trong số đó rất tốn kém hoặc nguy hiểm. Chúng ta cần kiểm tra mọi thứ và bất cứ thứ gì chúng ta sản xuất bởi vì mọi thứ luôn có thể sai - con người luôn mắc lỗi. Vậy nên ở trong bài viết này mời các bạn hãy cùng mình tìm hiểu kỹ hơn nhé !

# 1. Kiểm thử phần mềm là gì?
![alt](https://mona.software/wp-content/uploads/2021/06/kiem-thu-phan-mem-la-gi-nhung-dieu-can-biet-ve-kiem-thu-phan-mem.jpg)

Kiểm thử phần mềm là quá trình thực thi 1 chương trình với mục đích tìm ra lỗi.

Kiểm thử phần mềm đảm bảo sản phẩm phần mềm đáp ứng chính xác, đầy đủ và đúng theo yêu cầu của khách hàng, yêu cầu của sản phẩm đề đã đặt ra.

Kiểm thử phần mềm cũng cung cấp mục tiêu, cái nhìn độc lập về phần mềm, điều này cho phép việc đánh giá và hiểu rõ các rủi ro khi thực thi phần mềm.

Kiểm thử phần mềm tạo điều kiện cho bạn tận dụng tối đa tư duy đánh giá và sáng tạo để bạn có thể phát hiện ra những điểm mà người khác chưa nhìn thấy.

# 2. Lập trình viên không thể tự test (kiểm thử) code do chính mình viết?
![alt](https://image.shutterstock.com/image-photo/close-back-rear-behind-photo-260nw-1451794208.jpg)

Trên thực tế thì không phải là không thể, vì lập trình viên họ cũng phải unit test (kiểm thử đơn vị) các chức năng họ viết trước khi bàn giao cho đội ngũ kiểm thử.

Nhưng chỉ với mức độ unit test thì sẽ không thể bao quát được toàn bộ các lỗi của chương trình, và lập trình viên thì đa số thường sẽ có một cái nhìn chủ quan hơn về chương trình họ viết ra.

Nghĩa là họ luôn nghĩ chương trình mình viết ra là đúng, là chính xác… cho đến khi bên kiểm thử liệt kê ra một đống lỗi, bugs.

Chính vì vậy cần phải có đội ngũ kiểm thử – những người nắm được nghiệp vụ, có cái nhìn đa chiều và công tâm để có thể phát hiện được những lỗi mà lập trình viên bỏ qua hoặc không nghĩ đến.

# 3. Kiểm thử (tester) là những người có tư duy “phá hoại”?
![alt](https://d1iv5z3ivlqga1.cloudfront.net/wp-content/uploads/2021/02/30161912/tester-ha-noi-2.jpg)

Mình biết là nếu dùng từ “phá hoại” thì nó có chút gì đó gọi là “tiêu cực”, vì mục đích của kiểm thử là làm cho phần mềm đó tốt lên, ít lỗi hơn.. như vậy thì sao gọi là “phá hoại” được đúng không :sunglasses:

Nhưng nếu các bạn để ý thì thường những tester giỏi là những người có tư duy phản biện rất tốt, nhìn nhận vấn đề rất đa chiều và đôi khi người ta có tư duy “phá hoại” một chút.

Theo lẽ thông thường, lập trình viên (Developer) là những người xây dựng và phát triển phần mềm thì họ sẽ có xu hướng để làm thế nào đó cho chương trình/ phần mềm mà họ viết ra nó là tốt nhất.

Nhưng trái lại, những người kiểm thử phần mềm họ thường có xu hướng “vạch lá tìm sâu”. Tức là tìm cho bằng được bugs fix thì thôi, chứ họ không quan tâm chương trình bạn bạn viết ra nó hay như thế nào.

# 4. Kiểm thử sẽ tiết kiệm ngân sách bảo trì sản phẩm sau này
![alt](https://casland.vn/wp-content/uploads/2020/06/phi-bao-tri-chung-can-ho-chung-cu-la-gi.jpg)

Bảo trì và nâng cấp gần như là một điều bắt buộc đối với các sản phẩm phần mềm khi yêu cầu thay đổi, cũng như các lỗi phát sinh không thể phát hiện trong quá trình phát triển.

Quá trình kiểm thử nếu chúng ta làm tốt thì sẽ hạn chế được việc phát sinh lỗi sau này. Thậm chí phần mềm sẽ chạy ổn định cho đến khi có thay đổi yêu cầu nghiệp vụ.

Không những vậy, trong quá trình kiểm thử thì chúng ta cũng sẽ kiểm tra được mức độ đáp ứng của từng modul (bộ phận) của hệ thống, phần mềm.

Khi phát triển một sản phẩm mới, chúng ta hoàn toàn có thể tận dụng các modul đã phát triển trước đó. Thay đổi sao cho phù hợp với yêu cầu nghiệp vụ và giảm thiểu được việc phải kiểm thử lại modul đó.

Từ đó ngân sách cho việc bảo trì sản phẩm cũng sẽ được tiết kiệm rất nhiều, do quá trình kiểm thử đã được đảm bảo từ trước đó.

# 5. Kiểm thử giúp tạo niềm tin cho người dùng vào sản phẩm
![alt](https://khoinghiep.thuvienphapluat.vn/uploads/images/2019/12/27/IPVTekbJ73.jpg)

Cho dù bạn có đội ngũ lập trình giỏi như thế nào đi chăng nữa thì bạn cũng sẽ không dám “vỗ ngực” mà nói “Sản phẩm của chúng tôi là hoàn hảo, không hề có bugs, không cần phải test!”

Nói như vậy chẳng khác nào bạn tự bóp cổ mình khi muốn người dùng tin tưởng và sử dụng sản phẩm của bạn.

Đặc biệt là các công ty làm sản phẩm (product) thì việc tạo niềm tin cho người dùng vào sản phẩm là một trong những chiến lược quan trọng nhất.

Người dùng có rất nhiều lựa chọn, sản phẩm nào tiện đối với họ mà họ có thể tin tưởng thì họ sẽ sử dụng. Đó là điều dĩ nhiên.

Chính vì vậy, vai trò của đội ngũ kiểm thử là rất quan trọng trong việc đảm bảo chất lượng sản phẩm, để từ đó tạo được niềm tin từ người sử dụng.

Một đội ngũ kiểm thử giỏi giống như một lời khẳng định về mức độ tự tin của bạn khi nói về sản phẩm của mình.

# 6. Kiểm thử giúp đảm bảo quy trình phát triển phần mềm
![alt](https://hocvienagile.com/wp-content/uploads/2021/03/agile-development-process-infographic-software-vector-25691902-1.jpg)

Như mình đã trình bày từ đầu về quy trình chung trong việc phát triển các phần mềm thì kiểm thử là một khâu bắt buộc và có vai trò quan trọng bậc nhất.

Chúng ta không thể tạo ra một sản phẩm phần mềm đảm bảo chất lượng nếu thiếu bước kiểm thử được. Vậy tại sao kiểm thử lại giúp đảm bảo quy trình phát triển phần mềm?

Thứ nhất, nó là một khâu trong quy trình. Thứ hai, kiểm thử giống như điều kiện của vòng lặp phát triển một phần mềm.

Nghĩa là quá trình phát triển nếu gặp lỗi thì quay lại sửa (sửa code, điều chỉnh thiết kế, xem lại yêu cầu…) nếu không thì hoàn thiện và tiếp tục.

Nếu không có kiểm thử chúng ta sẽ không thể biết được khi nào và như như thế là điểm dừng cho quá trình phát triển một phần mềm.

# 7. Lời kết 
Kiểm thử phần mềm sẽ giúp hoàn thiện các ứng dụng phần mềm hoặc sản phẩm so với yêu cầu kinh doanh và người sử dụng. Nó là rất quan trọng để có thể đảm bảo để thử nghiệm các ứng dụng phần mềm hoàn toàn và làm cho nó chắc chắn rằng nó hoạt động tốt và theo các thông số kỹ thuật.

Hãy nghĩ đến việc làm sao hoàn thiện sản phẩm của mình, và để làm được điều đó thì đầu tiên hãy quan tâm đến vấn đề kiểm thử. Hẹn gặp lại các bạn trong các bài viết tiếp theo nha !

Bài viết được dựa trên:

https://blogchiasekienthuc.com/lap-trinh/tai-sao-kiem-thu-lai-quan-trong-trong-phat-trien-phan-mem.html

http://tryqa.com/why-is-testing-necessary/

Chúc các bạn có những ngày WFH thật an toàn và hiệu quả ! :grinning: