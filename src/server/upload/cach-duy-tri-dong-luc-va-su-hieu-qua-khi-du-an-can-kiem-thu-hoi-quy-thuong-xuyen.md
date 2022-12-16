Kiểm thử hồi quy có lẽ là quá trình ít thú vị nhất trong công việc của mọi kỹ sư kiểm thử phần mềm. Đáng tiếc là trên thực tế, kiểm thử hồi quy thường chiếm khoảng 80% khối lượng công việc hàng ngày của một người kiểm thử. Có thể có nhiều cách khác nhau để  đối phó với thói quen hằng ngày này, nhưng dù sớm hay muộn, khi phải làm thường xuyên thì quy trình này vẫn có thể trở thành một công việc đơn điệu, nhàm chán. Điều này dẫn đến việc đôi mắt của người kiểm thử không còn tinh tường như ban đầu. Họ mất dần sự hứng thú và tập trung trong quá trình làm việc, dẫn đến chất lượng công việc của họ bị giảm sút.

Do đó, làm thế nào để người kiểm tra đối mặt với một thói quen không mấy dễ chịu như vậy? Làm thế nào để ngăn chặn những tác động bất lợi của việc kiểm thử hồi quy thường xuyên và giữ cho quá trình này luôn trở nên thú vị?

Bài đăng này sẽ chia sẻ với bạn một số mẹo để enjoy vào quá trình thực hiện kiểm tra hồi quy và các thủ thuật giúp 1 ngày làm việc của chúng ta khỏi trở thành một thói quen tẻ nhạt và mệt mỏi.

Đầu tiên và quan trọng nhất, hãy nhớ rằng Kiểm thử hồi quy là loại kiểm thử được thực hiện dựa trên các check list và test case đã có. Tài liệu như vậy thường được tạo thông qua các công cụ đặc biệt như TestRail, plugin cho Jira, v.v. hoặc đơn giản là trong Google Sheet. Nhưng bất kể công cụ bạn sử dụng là gì, luôn có những cách giúp bạn giữ cho quá trình thử nghiệm hồi quy của mình hiệu quả nhất và đảm bảo dự án luôn đạt chất lượng hàng đầu. Hãy cùng tìm hiểu kỹ hơn về cách tổ chức công việc của bạn một cách hợp lý với các danh sách kiểm tra:

1. Tiến hành update check list thường xuyên.
2. Thay đổi môi trường thử nghiệm.
3. Tăng cường kiểm tra hồi quy bằng phương pháp kiểm thử thăm dò (Exploratory Testing) 
4. Thay đổi nhân sự trong dự án. 

![](https://images.viblo.asia/153997b2-5eb4-47ee-ad32-0971d1669d20.jpg)


## Tiến hành update check list thường xuyên

Kiểm thử hồi quy thông thường có thể thực hiện trên hầu hết các module và sử dụng check list mức low để kiểm thử. Check list này có thể đã được tạo trước đó dựa trên các yêu cầu và mô hình phác thảo. Tuy nhiên, khi các yêu cầu thay đổi và phần mềm được bổ sung thêm các tính năng mới, kiểm thử viên nên liên tục cập nhật các check list này trong suốt quá trình phát triển. 

Ý nghĩa của việc này đối với quy trình kiểm tra hồi quy là chúng ta có thể tạm nghỉ công việc thường ngày  bằng cách chuyển sang cập nhật tài liệu kiểm thử. Điều này không chỉ ngăn việc kiểm thử hồi quy trở thành một thói quen nhàm chán mà còn cho phép kiểm thử viên mở rộng và sửa đổi 1 số quan điểm test để tránh "nghịch lý thuốc trừ sâu". 

## Thay đổi môi trường thử nghiệm

Thực hiện kiểm thử thường xuyên trên cùng một môi trường  đôi khi có thể trở thành một trách nhiệm khá tẻ nhạt mà thiếu sự nhiệt tình và làm giảm tầm nhìn của người kiểm thử. Để tránh việc nhóm kiểm thử của bạn mất tập trung, bạn nên luôn tận dụng cơ hội để thay đổi môi trường và thử nghiệm định kỳ trên các nền tảng, trình duyệt và thiết bị khác nhau. Ví dụ: hôm nay bạn thực hiện kiểm thử hồi quy trong trình duyệt Google Chrome của Windows, ngày hôm sau bạn kiểm thử trên iPhone và ngày tiếp đó thì bạn hãy làm việc trên Mac.

Cách tiếp cận này sẽ giúp bạn rất hiệu quả trong việc bắt lỗi dành riêng cho các nền tảng, trình duyệt và thiết bị cụ thể. Ngoài ra, nhóm thử nghiệm của bạn sẽ không cảm thấy nhàm chán trong quá trình kiểm thử vì họ được đồng thời tìm hiểu các khía cạnh kỹ thuật của nhiều môi trường kiểm thử khác nhau. 

## Tăng cường kiểm tra hồi quy bằng phương pháp kiểm thử thăm dò (Exploratory Testing) 
Nếu mỗi ngày bạn đều liên tục chạy một check list mà bạn đã thuộc lòng, tại sao không tận dụng cơ hội để mở rộng tầm nhìn với phương pháp kiểm thử thăm dò ? Để làm sinh động quy trình thử nghiệm hồi quy, làm cho nó trở nên thú vị và hiệu quả hơn, có rất nhiều dự án đã đưa kiểm thử thăm dò vào kết hợp với kiểm thử hồi quy. Cách tiếp cận như vậy sẽ không chỉ thêm gia vị cho quá trình làm việc mà còn giúp tầm nhìn của nhóm bạn vượt ra ngoài phạm vi của các kịch bản kiểm thử có sẵn và xem xét các trường hợp thử nghiệm này từ một góc độ khác.

Đôi khi những hành động như vậy sẽ giúp cải thiện các trường hợp thử nghiệm đã viết trước đó và tìm ra những điểm không nhất quán với kết quả mong đợi trong các kịch bản kiểm thử và phần mềm bạn đang thử nghiệm. Bằng cách thêm thử nghiệm thăm dò vào quy trình kiểm tra hồi quy của mình, bạn sẽ giúp nhóm kiểm thử của mình tránh bị mắc kẹt trong vòng lặp tẻ nhạt, dài dòng của quá trình kiểm tra hàng ngày. 

## Thay đổi nhân sự trong dự án
Cách cuối cùng là đào tạo 1 kiểm thử viên mới và đưa vào dự án của bạn. Họ tìm hiểu chi tiết, cụ thể sản phẩm được thử nghiệm, các công nghệ đang sử dụng và quy trình làm việc của dự án. Đây là một cơ hội tuyệt vời để họ tham gia vào quá trình kiểm thử hồi quy. Những nhân viên mới này xem các kịch bản kiểm thử và sản phẩm mà dự án đang thử nghiệm lần đầu tiên. Họ không cảm thấy nhàm chán và cũng đặt ra nhiều câu hỏi. Điều này mang đến rất nhiều lợi ích cho dự án! Việc giúp những người thử nghiệm mới của bạn tìm ra câu trả lời đôi khi lại là cơ hội duy nhất để tìm ra lỗi và sự mâu thuẫn mà có thể bạn đã bỏ qua trong check list của mình, do sự lặp lại tẻ nhạt trong quá trình thực hiện một dự án dài hạn.

Nhân viên mới được đào tạo có thể giúp bạn xác định một kịch bản kiểm thử đã lỗi thời trong check list. Chẳng hạn như khi có 1 chức năng được cập nhật nhưng check list thì chưa được thay đổi. Họ cũng có thể giúp bạn xác định các trường hợp thử nghiệm quá phức tạp — họ đặt ra rất nhiều câu hỏi cần làm rõ và sử dụng câu trả lời của bạn để đơn giản hóa vấn đề. Cuối cùng nhưng không kém phần quan trọng, các kiểm thử mới của dự án có thể phát hiện ra các tình huống bổ sung trong quá trình thử nghiệm, cung cấp cho bạn thông tin quan trọng để thêm vào danh sách kiểm thử. Tương tự, họ cũng giúp ích cho việc phát hiện các lỗi không được tìm thấy bằng các trường hợp thử nghiệm hiện có.

Trên đây có thể không phải là danh sách đầy đủ các phương pháp mà bạn có thể sử dụng để duy trì vòng lặp kiểm thử hồi quy của mình ở mức hiệu quả cao nhất, nhưng những thủ thuật đơn giản này chắc chắn mang lại hiệu quả kỳ diệu cho các nhóm kiểm thử . Cho dù đó là tài liệu kiểm tra hay bảo trì, các kỹ sư kiểm thử phần mềm luôn tuân theo các quy tắc, phương pháp luận và logic để đảm bảo kết quả chất lượng cao nhất. Nhưng điều đó không có nghĩa là người kiểm thử không thể sáng tạo quá trình làm việc của mình để làm sống động những công việc phải lặp đi lặp lại thường xuyên. 

Nguồn : https://testfort.com/blog/how-to-keep-your-regression-testing-routine-effective-and-enjoy-doing-it