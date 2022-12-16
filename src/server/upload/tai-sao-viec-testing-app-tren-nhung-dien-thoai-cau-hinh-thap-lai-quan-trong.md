Khi một QA bắt đầu làm việc trong một dự án ứng dụng di động, câu hỏi lớn nhất mà chúng ta phải đối mặt là môi trường thử nghiệm.<br>
Với thị trường đang phát triển cho điện thoại di động ngày nay, việc quyết định các thiết bị để thử nghiệm thực sự là một thách thức. Vì không thể mua các thiết bị vượt quá giới hạn và không thể thực hiện mọi thử nghiệm trên giả lập.<br>
Android là một hệ điều hành nguồn mở và đã mở ra cơ hội cho các công ty ra mắt thiết bị của họ và điều đó cũng có nghĩa là giá thành sẽ thấp đi. Không phải ai cũng có thể mua iPhone hoặc Samsung S7 hoặc Nexus6, do đó mọi người có xu hướng mua điện thoại giá cả phải chăng như Samsung S6 hoặc Nexus 5 hoặc Redmi Note4, v.v.<br>
![](https://images.viblo.asia/e7da8071-d50f-485e-b416-2ae85f085c4b.jpg)<br>
## Các loại thiết bị di động<br>
**Các thiết bị có thể được phân loại thành thiết bị cấu hình cao và thấp:<br>**
Các thiết bị cấu hình cao thường là những thiết bị có hệ điều hành Android, 4G hoặc LTE mới nhất, kích thước màn hình 8 inch trở lên, bộ nhớ 7 + GB, v.v. và tất nhiên là rất tốn kém.<br>
Các thiết bị cấu hình thấp chỉ là những thiết bị đối nghịch với phiên bản HĐH cũ hơn, 2G hoặc ở mạng 3G tối đa, màn hình nhỏ, bộ nhớ thấp hoặc điện thoại có khe cắm thẻ nhớ không lớn hơn 2 hoặc 3 GB và do đó khá rẻ (giá cả phải chăng cho mọi người).<br>
**Ví dụ: dưới đây là phân phối điện thoại thông minh cho năm 2017 dựa trên loại mạng:<br>**

![](https://images.viblo.asia/5fc68020-52a7-48f9-a257-6c717ed0be29.jpg)<br>
Như bạn có thể thấy, chỉ có 28% người dùng đang sử dụng công nghệ LTE mới nhất và tiên tiến trong khi phần lớn người dùng vẫn sử dụng GSM.<br>
## Điện thoại di động thử nghiệm<br>
**Là 1 tester, môi trường kiểm thử điện thoại của bạn thuộc loại nào?<br>**
Khi lựa chọn môi trường kiểm thử cho việc test mobile app, cho cả việc test manual hay test tự động thì bạn có thể sử dụng phần mềm giả lập, ứng dụng mô phỏng và thiết bị thật.<br>
Lựa chọn giữa phần mềm giả lập và thiết bị thật là một câu hỏi khó vì không phải tất cả các sự cố đều xảy ra với giả lập(cửa sổ bật lên lỗi hoặc thông báo thường bị loại bỏ) mặt khác, việc mua tất cả các thiết bị thật có thể khiến công ty tốn kém.<br>
Tôi sẽ đề nghị có một điện thoại cấu hình cao, 1 hoặc 2 điện thoại cấu hình trung bình và ít nhất 2 điện thoại cấu hình thấp.<br>
## Kinh nghiệm mà tôi có được khi làm việc trên nhiều loại thiết bị khác nhau là:<br>
**1) Điện thoại cấu hình cao:** Các ứng dụng chạy rất mượt, rõ ràng vì bạn có kết nối 4G, bộ nhớ 8GB, màn hình lớn. Điện thoại cấu hình cao nên được ưu tiên để kiểm tra các khía cạnh chức năng của ứng dụng nhưng có thể không chứng minh được sự lựa chọn tốt để kiểm tra khả năng mở rộng (đối với dữ liệu di động) hoặc lỗi giao diện người dùng hoặc rò rỉ bộ nhớ.<br>
**2) Điện thoại cấu hình trung bình :** Ứng dụng chạy mượt nhưng vẫn có thể mở rộng và rò rỉ bộ nhớ. Nhưng điều này là không đủ vì các sự cố do khách hàng báo cáo cho một ứng dụng di động không được chấp nhận, không giống như các ứng dụng trên máy tính để bàn hoặc web.<br>
**3) Điện thoại cấu hình thấp:**  Ứng dụng có thể hoặc không thể chạy trơn tru trên điện thoại cấu hình thấp do một số yếu tố nhất định.<br>
## Những yếu tố bao gồm:<br>
**1) Mạng chậm:** Hiện tại các thiết bị cấp thấp như mạng ngoài, 3G và có các ứng dụng chạy trong nền sử dụng băng thông mạng. Trong một kịch bản thực tế, có thể người dùng đã bật Sync On cho tài khoản email của mình, Whatsapp, Google Now, v.v. chạy trong nền băng thông.<br>
![](https://images.viblo.asia/cafc29a0-a8e9-4551-b0a4-f02865fde1c7.jpg)<br>
![](https://images.viblo.asia/eb74af13-f361-4b32-a677-bca0ac2cef61.jpg)<br>
**2) Giao diện người dùng:** Các thiết bị cấp thấp có thể có kích thước màn hình từ 4 inch đến 6 hoặc 7 inch, do đó việc cuộn lên, xuống hoặc nhấn vào biểu tượng là một điều khó khăn. Các biểu tượng có kích thước nhỏ và không dễ để chạm vào chúng. Tương tự cuộn xuống một danh sách dài cũng có thể gây ra sự cố.<br>
**Sau đây là một ví dụ về lỗi UI**<br>
![](https://images.viblo.asia/c669817a-a85c-4cae-b083-50464038b9f7.jpg)<br>
**3) Bộ nhớ thấp:**  Các thiết bị cấu hình thấp không có bộ nhớ lớn và hầu hết các ứng dụng có tối đa khoảng 5 - 6 GB. Do đó, các ứng dụng chạy chậm và đôi khi điện thoại hiển thị các tin nhắn để đóng hoặc buộc dừng một số ứng dụng để giải phóng bộ nhớ.<br>
## Tại sao việc testing app trên những điện thoại cấu hình thấp lại quan trọng?<br>
Tùy thuộc vào đối tượng mục tiêu của bạn, không cần sử dụng thiết bị cấu hình thấp nhưng khi bạn thực hiện việc phát hành ứng dụng ban đầu, bạn chắc chắn nên thực hiện kiểm tra đầy đủ trên thiết bị cấu hình thấp.<br>
Trên thế giới, người dùng điện thoại cấu hình cao ít hơn người dùng điện thoại cấu hình trung bình và thấp. Nếu ứng dụng của bạn chạy mượt mà trên điện thoại cấu hình cao, thì điều đó không có nghĩa là nó cũng sẽ hoạt động tốt trên cả thiết bị cấu hình thấp.<br>
Trong số 3 năm kinh nghiệm của tôi, tôi muốn thử nghiệm trên điện thoại cấp thấp trước.<br>
**Thử nghiệm trên điện thoại cấu hình thấp rất quan trọng vì:**<br>
- Hệ điều hành của điện thoại hơi cũ và phiên bản không phải là phiên bản mới nhất.<br>
- Có rất nhiều ứng dụng đã được cài đặt trên điện thoại, do đó đây là một môi trường hoàn hảo để kiểm tra bộ nhớ thấp.<br>
- Tương tác với các ứng dụng khác để tương thích như sử dụng Google Maps, quay số điện thoại, ứng dụng Nhắn tin, v.v..<br>
- Chức năng camera không tiên tiến.<br>
- Nếu ứng dụng của bạn cần gửi tọa độ địa lý, thì pin của điện thoại cấu hình thấp sẽ cạn kiệt.<br>
- Màn hình quá nhỏ, chạm vào biểu tượng hoặc cuộn hoặc điều hướng giữa các màn hình có thể có vấn đề, v.v..<br>

**Khi tôi đang thử nghiệm ứng dụng của mình trên các thiết bị cấu hình thấp, sau đây là những vấn đề mà tôi quan sát thấy chỉ trên điện thoại cấu hình thấp:**<br>
- Ứng dụng của chúng tôi có dịch vụ web để gửi vị trí địa lý cứ sau 10 phút nhưng trên điện thoại  cấu hình thấp (mà chúng tôi đang sử dụng) có 2G, cuộc gọi dịch vụ web đã thất bại. Do đó, có hai vấn đề lớn xuất hiện - [i] vị trí không thể ghi vào DB và [ii] pin của điện thoại đã cạn kiệt.<br>
- Khi thử nghiệm trên 2G, chúng tôi thấy rằng các dịch vụ web đã mất nhiều thời gian hơn để đăng nhập hoặc tìm dữ liệu cho màn hình hoặc gửi dữ liệu. Đôi khi để xem dữ liệu cập nhật, phải mất 15 phút.<br>
- Để hiển thị danh sách giao hàng trong một ngày và trong khi cuộn một danh sách dài gồm 50 thẻ, ứng dụng đã bị sập.<br>
- Khi nhấp vào nút quay lại, điều hướng không thành công và nó đang điều hướng 2 màn hình trở lại thay vì một màn hình.<br>
- Sau khi chụp ảnh chúng tôi đã định cỡ lại (giảm) hình ảnh. Trên các điện thoại cấu hình thấp, máy ảnh đã bị sập sau khi chụp 3-4 ảnh vì bộ nhớ không được giải phóng khỏi quá trình chụp ảnh trước đó.<br>
**Sau đây là một ví dụ về lỗi như vậy có thể xảy ra:<br>**
![](https://images.viblo.asia/559c65f8-cd74-4834-a9bb-367931d8ca34.jpg)<br>
- Một số biểu tượng xuất hiện quá nhỏ để click do đó nó đã chặn kiểm tra một số chức năng.<br>
Đây là một số trong những thất bại quan trọng nhất không xuất hiện dù chỉ một lần trên thiết bị cấu hình cao. Tất cả những vấn đề này sau đó đã được nhóm phát triển khắc phục và chúng tôi đã thực hiện hồi quy hoàn toàn trên điện thoại cấu hình thấp.<br>
Trên thực tế, tôi nhớ rằng trong lần phát hành đầu tiên, chúng tôi đã nhận được rất nhiều sự cố máy ảnh từ các khách hàng đang sử dụng điện thoại cấu hình thấp sau khi click vào khoảng 20-30 hình ảnh.<br>
Những người giao hàng không sử dụng điện thoại cấu hình cao và chỉ có khoảng 5% trong số họ có iPhone 5 hoặc S3 (là sản phẩm mới nhất vào thời điểm đó). Trong khi thử nghiệm trên một thiết bị cấu hình thấp, sẽ rất tuyệt khi sử dụng mạng di động thay vì Wifi tốc độ cao.<br>
![](https://images.viblo.asia/10e9920d-69e9-483f-85c8-4b76676503e7.jpg)<br>
![](https://images.viblo.asia/07e6902c-b665-463b-b1ad-75d0ee0f3f2c.jpg)<br>
Sau lần phát hành đầu tiên, chúng tôi đã thực hiện kiểm tra khả năng mở rộng, căng thẳng và giao diện người dùng trên 2 điện thoại cấu hình thấp và trung bình. Tuy nhiên, các vấn đề chủ yếu được tìm thấy trên các điện thoại cấu hình thấp. Để chắc chắn, chúng tôi đã thực hiện một BVT trên điện thoại cấu hình cao.<br>
Không nhất thiết là bạn sẽ gặp phải loại vấn đề tương tự nhưng bạn chắc chắn sẽ quan sát được các vấn đề với điện thoại cấu hình thấp mà bạn sẽ không bao giờ gặp phải trên điện thoại cấu hình cao.<br>
Một ví dụ khác xuất hiện trong đầu tôi là rất nhiều ứng dụng sử dụng Google Maps để tải vị trí hoặc hiển thị vị trí của chúng.<br>
Trên điện thoại cấu hình thấp, phiên bản Google Maps có thể đã cũ và do đó có thể có sự cố tương thích khi ứng dụng của bạn thực hiện cuộc gọi để tải vị trí trong Google Maps hoặc do mạng chậm, có thể mất nhiều thời gian hơn để tải . Cũng có thể Bản đồ không tải vị trí chính xác mà ứng dụng của bạn thực sự muốn.<br>
![](https://images.viblo.asia/2dcb01a5-be60-4086-92c6-45f8896af140.jpg)<br>
![](https://images.viblo.asia/46900590-e0f9-496f-a3bc-b2e967b7a0ed.jpg)<br>
## Giả lập hoặc mô phỏng thay thế cho điện thoại cấu hình thấp<br>
**Tôi có thể sử dụng giả lập hoặc mô phỏng để thay thế cho Điện thoại cấu hình thấp không?**<br>
Không nên sử dụng giả lập hoặc mô phỏng cho điện thoại cấu hình thấp vì nhóm phát triển ứng dụng của tôi đã thử điều đó.<br>
Ban đầu, khi chúng tôi bắt đầu làm việc trên một ứng dụng di động, chúng tôi mới biết và nhóm phát triển đã nhận thức được rằng rất nhiều thông báo lỗi đã bị giả lập loại bỏ và các lỗi không được hiển thị. Chúng tôi đã tìm thấy các vấn đề trong khi thử nghiệm trên các thiết bị thực.<br>
Sau đó, ngay cả nhóm phát triển của chúng tôi đã bắt đầu sử dụng thiết bị thực để thử nghiệm thay vì giả lập. Một lý do khác để tránh sử dụng giả lập là không thể tạo mạng 2G hoặc 3G và họ sử dụng mạng tốc độ cao của máy tính xách tay hoặc máy tính để bàn. Tuy nhiên, bạn có thể thực hiện kiểm tra giao diện người dùng và điều hướng trên giả lập.<br>
## Chiến lược thử nghiệm cho điện thoại cấu hình thấp<br>
**Là một QA, chiến lược thử nghiệm của tôi đối với điện thoại cấu hình thấp là gì?**<br>
Để quyết định chiến lược thử nghiệm cho điện thoại cấu hình thấp, hãy thật rõ ràng về các yêu cầu ứng dụng của bạn và những tính năng nào của điện thoại cấu hình thấp sẽ ảnh hưởng đến ứng dụng của bạn và hiệu suất của nó. Các khiếm khuyết tìm thấy trên điện thoại cấp thấp rất khó tìm và cũng khó hơn và đối với QA, rất khó để tái tạo, xác minh và khắc phục các lỗi đó.<br>
**Sau đây là một số gợi ý để quyết định chiến lược, những điều này đã giúp tôi và nhóm của tôi, hy vọng nó cũng sẽ giúp bạn:**<br>
- Không bao giờ thực hiện thử nghiệm một tay trên điện thoại cấp thấp, số lượng trí óc liên quan càng nhiều thì cơ hội tìm thấy các lỗi ẩn càng nhiều. Do đó, hãy thử ghép nối hoặc kiểm tra trong một vòng tròn như nếu QA1 kiểm tra chức năng F1, sau đó để QA2 xác minh các lỗi được báo cáo cho F1, kiểm tra hồi quy QA3.<br>
- Thảo luận về chiến lược của bạn, những phát hiện của bạn với các QA khác trong nhóm của bạn, điều này giúp ích rất nhiều vì có thể họ thấy điều gì đó mà bạn có thể không hoặc có thể có một số kinh nghiệm có thể giúp bạn.<br>
- Cho đến khi ứng dụng của bạn không ổn định, hãy tạo một nhiệm vụ thử nghiệm riêng cho các điện thoại cấp thấp và giữ cho chúng được ước tính.<br>
- Thực tế không thể tạo ra một môi trường thử nghiệm lý tưởng và cũng không có một số loại điện thoại. Do đó (với sự đồng ý của người quản lý), hãy kiểm tra với các đồng nghiệp khác trong công ty của bạn, những người có các thiết bị đó và nhờ họ cài đặt và sử dụng ứng dụng của bạn.
- Tương tự như vậy đối với thử nghiệm Beta, yêu cầu BA hoặc chủ sở hữu sản phẩm sử dụng điện thoại cấu hình thấp và thực hiện một vòng từ đầu đến cuối.<br>
- Khi các lỗi chính được tìm thấy (như các lỗi được đề cập ở trên), hãy ngồi với nhà phát triển khi họ sửa để hiểu được lý do đằng sau lỗi. Điều này sẽ giúp bạn không chỉ trong việc xác minh mà còn trong hồi quy. Bạn cũng có thể lấy ý kiến từ các nhà phát triển về cách hồi quy.<br>
- Cuối cùng nhưng không kém phần quan trọng (trong trường hợp của tôi, đó là dự án ứng dụng di động đầu tiên) ghi lại những lỗi như vậy bởi vì đó là một kiến thức lớn mà bạn có được và cũng có thể giúp đỡ người khác. Tài liệu về cách lỗi xuất hiện, cách khắc phục, xác minh và hồi quy.<br>
## Phần kết luận
Ứng dụng di động là một thị trường phát triển nhanh và có hệ điều hành mới được ra mắt mỗi tháng, do đó, là một QA, không thể kiểm tra với tất cả các OS. Khi chọn thử nghiệm, hãy lựa chọn thông minh và chọn điện thoại, giả lập cho từng loại điện thoại cấu hình cao, trung bình và thấp.<br>
Thử nghiệm trên một danh mục khác nhau có thể khác nhau tùy theo yêu cầu ứng dụng của bạn, nhưng theo kinh nghiệm của tôi, không có tác hại nào trong việc thử nghiệm (từ đầu đến cuối) trên thiết bị cấu hình thấp. Lý do là các tính năng lỗi thời, mạng chậm, vv dẫn đến các vấn đề mà bạn có thể không quan sát được trên điện thoại cấu hình cao.<br>
Trong thử nghiệm ứng dụng di động, các sự cố không phải lúc nào cũng được tìm thấy trong thử nghiệm và đôi khi các sự cố báo cáo của khách hàng mà bạn chưa từng bắt gặp. Do đó, Chủ sở hữu sản phẩm của bạn có thể một hoặc hai lần xin lỗi nhưng không phải lúc nào cũng vậy, vì vậy, hãy cố gắng kiểm tra thêm trên điện thoại cấu hình thấp.<br>
Nếu người quản lý hoặc BA của bạn không quan tâm đến việc có các thiết bị cấu hình thấp làm thử nghiệm, hãy cố gắng thuyết phục họ và vững vàng, trừ khi họ có lý do mạnh mẽ hoặc chắc chắn rằng tất cả khách hàng đều sử dụng điện thoại tốt nhất.<br>
Nguồn dịch: https://www.softwaretestinghelp.com/mobile-testing-low-end-devices/