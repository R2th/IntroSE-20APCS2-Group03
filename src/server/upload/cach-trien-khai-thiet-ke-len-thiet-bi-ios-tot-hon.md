Chúng ta - những người lập trình vẫn đang phải vật lộn với các vấn đề tương tác với các nhà thiết kế. Trong khi mỗi nhóm có cấu trúc tổ chức khác nhau khi phát triển và thiết kế. 

Vì vậy, các nhóm sản phẩm vẫn phải tìm ra cách cải thiện quy trình phát triển thiết kế và trở nên hiệu quả hơn trong việc cung cấp một sản phẩm tuyệt vời cho người dùng của họ.

Nếu bạn là người phụ trách cả mảng Android và iOS thì bạn sẽ nhận ra sự khác biệt trong việc triển khai thiết kế lên thiết bị là khác nhau và cũng khác nhau giữ các thiết bị cùng hệ điều hành.

Để giải quyết các vấn đề trên, hôm nay mình sẽ giới thiệu cho các bạn cách để làm cho giao diện trên thiết bị giống với thiết kế. Công cụ mình sẽ sử dụng có tên Flawless App.
Nhiệm vụ của ứng dụng là làm cho các ứng dụng trở lên tốt hơn về mặt UI. Chúng ta có thể so sánh trực quan hơn giữa thiết kế và triển khai thực tế. Vì vậy nó sẽ tăng chất lượng hình ảnh, tiết kiệm thời gian và giúp tất cả các đội di chuyển nhanh hơn.

Sau bài viết này tôi hy vọng sẽ giúp các bạn một phần hữu ích hơn trong việc triển khai thiết kế. Giúp ứng dụng trông giống hệt như thiết kế trên mọi thiết bị. Cũng như, cải thiện giao tiếp nhóm của bạn và tiết kiệm rất nhiều vấn đề đau đầu khác.
Trên thực tế thì ứng dụng này dành riêng cho lập trình viên iOS.

## 1. Thiết kế và thực hiện so sánh trực quan
- Tính năng chính của Flawless App là khả năng so sánh thiết kế với việc triển khai ngay bên trong trình giả lập iOS. Đơn giản chỉ cần khởi chạy một trình giả lập iOS (đi kèm với Xcode, IDE để phát triển iOS / macOS).
- Sau đó chọn một thiết kế dưới dạng tệp hình ảnh (jpeg, png, tiff, gif, v.v.) hoặc thậm chí chọn file phác thảo.
- Các bạn có thể tham khảo demo ở đây:

{@embed: https://www.youtube.com/watch?v=y7ozua6k9SY}

### Lợi ích cho các lập trình viên.
- Bạn có thể thấy ứng dụng sẽ trông như thế nào trong khi xây dựng nó ngay bên trong công cụ mà bạn đang sử dụng. Không cần phải mở ra một cửa sổ khác và lãng phí không gian hoặc thời gian trên màn hình quý giá. Thiết kế ban đầu chỉ dưới ngón tay của bạn.
- Nó rất dễ tích hợp vào các quy trình hiện tại của bạn. Không có thiết lập bổ sung, không liên kết với thư viện của bên thứ ba hoặc bất kỳ cấu hình nào cần thiết. Chỉ cần tải xuống một ứng dụng và bắt đầu sử dụng nó ngay lập tức.

### Lợi ích cho các nhà thiết kế.
- Có thể sử dụng để review quy trình thực hiện của các nhà phát triển.
- Cảm thấy tự tin rằng nhà phát triển sẽ nhận thấy bất kỳ sự khác biệt hiện có nào giữa thiết kế và triển khai trong khi xây dựng giao diện người dùng mà không có nhiều đánh giá. 
- Việc thực hiển phải thể hiện được những gì mà nhà thiết kế đã gửi gắm trong thiết kế của họ.

## 2. Ghi nhận lại sự khác biệt.
- Bạn đã bao giờ tiến hành đánh giá thiết kế? Vâng, đó là những cuộc họp mà các nhà phát triển và nhà thiết kế ngồi lại với nhau để tìm hiểu xem có bao nhiêu điểm sai khác giữa việc thực hiện và thiết kế.
- Với Flawless App, bạn có thể chụp ảnh GIF về thiết kế và so sánh triển khai ngay từ trình giả lập iOS trong một ví dụ. Bởi vì nó có một tệp GIF, nó có thể được chia sẻ cho bất kỳ dịch vụ nào mà nhóm của bạn sử dụng: Slack, nhiệm vụ Asana hoặc vé Jira.
- Để kích hoạt tính năng này, nhà phát triển chỉ cần chọn một tệp thiết kế, chọn chế độ so sánh thích hợp và nhấn nút chụp. Điều này sẽ tạo một tệp GIF với so sánh ngay trên bàn làm việc của bạn :D
- Các bạn có thể tham khảo tại đây: 

{@embed: https://www.youtube.com/watch?v=fl8mwBcTAy8}

### Lợi ích cho nhà phát triển.
- Bạn có thể đính kèm ảnh chụp màn hình GIF vào yêu cầu kéo trong hệ thống kiểm soát phiên bản mà bạn đang sử dụng. Bằng cách này, nhóm của bạn có thể xem lại không chỉ mã của bạn mà cả việc triển khai thiết kế cùng một lúc và ở cùng một nơi.
- Chụp ảnh màn hình và chia sẻ chúng với nhà thiết kế hoặc QA để chứng minh rằng việc triển khai của bạn đã được đánh thực hiện theo thiết kế ban đầu.

### Lợi ích của nhà thiết kế.
- Xem lại các ảnh chụp màn hình hoạt hình thay vì xem lại toàn bộ ứng dụng. Vì vậy, đánh giá thiết kế sẽ mất ít thời gian hơn nhiều.
- Đính kèm ảnh chụp màn hình GIF ngay vào một tác vụ trong Trello / JIRA / Asana / vv. Để giới thiệu rằng nhiệm vụ UI đã hoàn thành. Vì vậy, bất cứ ai khác trong nhóm cũng có thể xem xét kết quả.

## 3. Thiết kế động
- Trước đây iOS có ít loại thiết bị và ít kích thước khác nhau. Nhưng hiện tại đã có rất nhiều loại màn hình, tỉ lệ và kích thước rất khác nhau.
- Trước tiên chúng ta cùng xem rule thiết kế đã nhé:

{@embed: https://www.youtube.com/watch?v=Op1Hkoh1Xfw}

- Thật không may, các nhà phát triển không có đặc quyền như vậy để xem cách thiết kế sẽ hoạt động trên các kích thước màn hình khác nhau trong khi họ thực hiện nó
- Trong hầu hết các trường hợp, nhà phát triển phải đoán các quy tắc thay đổi kích thước dựa trên ý nghĩa thông thường. Và nếu có bất kỳ khó khăn nào - nhà thiết kế là người nên giúp đỡ.
- Nó thậm chí không quan trọng bằng cách chính xác nhà thiết kế chia sẻ thiết kế với nhà phát triển. Trong các công cụ hiện tại, thiết kế trở thành một thằng ler :v. Với Flawless App, đây không còn là vấn đề nữa. Với thế hệ thiết kế động, nhà phát triển có thể thấy thiết kế sẽ trông như thế nào trên bất kỳ kích thước màn hình nào có thể.

{@embed: https://www.youtube.com/watch?v=FWRB5aNk1M0}

### Lợi ích của nhà phát triển
- Không còn phải đoán về cách thay đổi thiết kế trên các kích thước màn hình khác nhau. Chỉ cần nhìn vào nó trong thời gian thực và thực hiện các ràng buộc thích hợp.
- Ứng dụng Flawless hỗ trợ nhiều trình giả lập iOS để bạn có thể khởi chạy một thiết kế trên nhiều thiết bị cùng một lúc.

### Lợi ích của nhà thiết kế
- Bạn có thể thiết kế một màn hình chỉ với một kích thước màn hình và chỉ định hành vi thay đổi kích thước tổng thể cho các màn hình khác chỉ một lần trong việc phác thảo 

## 4. Tăng tốc công việc
- Nếu trong nhóm của bạn, các nhà thiết kế sử dụng Zeplin để chuyển thiết kế cho nhà phát triển, Flawless App là ứng dụng bắt buộc phải có trong quy trình làm việc hiện tại của bạn. Tôi hy vọng bạn sẽ rất vui khi biết rằng Ứng dụng Flawless hỗ trợ các tệp thiết kế Zeplin. Nhà phát triển có thể chỉ cần kéo và thả một hoặc nhiều hình ảnh thiết kế từ ứng dụng Zeplin macOS sang biểu tượng Ứng dụng hoàn hảo trong thanh menu.

{@embed: https://www.youtube.com/watch?v=9yFzcbFWNXs}

## Kết luận
Trên đây là một số mẹo trong công việc cũng như quá trình phát triển iOS, hy vọng có thể giúp các bạn cải thiện hơn.

Nguồn tham khảo: https://www.appcoda.com/flawless-app-demo/