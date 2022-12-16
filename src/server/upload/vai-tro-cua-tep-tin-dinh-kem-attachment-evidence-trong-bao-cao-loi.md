Khi người kiểm thử phần mềm và người phát triển phần mềm là những thành viên của hai nhóm khác nhau, việc phát hiện và báo cáo lỗi (report bug) không tốt - thường có thể là nguồn gốc của các cuộc xung đột. Bài viết này nhằm giải thích: Làm thế nào để nâng cao chất lượng của một bug report bằng tập tin đính kèm - nhằm giúp cải thiện giao tiếp, tinh thần làm việc giữa người kiểm thử phần mềm và người phát triển.

Tác giả: Nataliia Syvynska, TestMatick,  https://testmatick.com/

Đối với một số công ty có quy trình khép kín một team bao gồm nhiều bộ phận như: QA, dev, Brse thì vấn đề này thường ít xảy ra vì có thể dễ dàng giao tiếp với nhau trong môi trường nhỏ. Nhưng, phần đa số công ty phát triển phần mềm, hoặc những công ty khởi nghiệp, thường thuê các bộ phận QA hoặc Dev từ bên ngoài hoặc thuê hợp đồng theo kiể outsource. Khi đó những team được chia ra thành những bộ phận rõ ràng, và việc thiếu giao tiếp và hạn chế về khoảng cách có thể rõ ràng bộc lộ qua làm việc với nhau. Và việc một bug report của bạn không rõ ràng về tệp đính kèm là việc rất đáng quan ngại. Đính kèm 1 tập tin mô tả rõ ràng lun là tối quan trọng, đặc biệt nếu lỗi đó khó tái hiện hoặc phức tạp. 

### Nào, cùng phân loại một số tệp đính kèm bạn có thể kèm vào bug report:
* Video.
* Tệp tin logs.
* Ảnh chụp màn hình.

Ngoài ra còn có một số loại khác ít được sử dụng như: File app dùng để test (apk, ipa), tập tin âm thanh... Nhưng thường dùng trong một số hình thức kiểm thử đặc thù riêng nên ở bài viết này sẽ không nói tới nhé.


![](https://images.viblo.asia/55926e9c-b47c-4d8e-9936-1a5e5fa8b4dd.jpg)

*Windows cũng hỗ trợ trình quay video, chụp màn hình cho game thủ mà bạn có thể tận dụng*

**Video:** là một bản quay màn hình toàn bộ quá trình lỗi mà bạn gặp phải. 

Một video "bằng chứng" để chứng minh lỗi tốt sẽ có ít nhất 3 giai đoạn: Precondition - dùng để quay lại công tác chuẩn bị data để tái hiện lỗi, Description / Step - mô phỏng lại quy trình để tái hiện lỗi, Consequence - hậu quả: là hậu quả của lỗi mà bạn gặp phải sẽ ảnh hưởng như nào tới hệ thống, những chức năng khác, màn hình khác (vì lỗi đó mà không login được, không phát video được...). 

Thông thường bạn sẽ đính kèm video vào bug report luôn, nên việc chọn fomat để quay là điều cơ bản mà rất quan trọng. Bạn không muốn chọn một định dạng hiếm gặp để rồi trình duyệt của bên phát triển không mở được, bạn lại phải quay lại với định dạng khác phải không nào. Tốt nhất các video bạn đính kèm nên ở các định dạng như «.avi», «.mp4», «.mov» và «.mkv» vì chúng có thể được phát bởi hầu hết mọi trình phát video hiện nay.

**Tệp tin logs:** là một file ghi lại các loại động của máy tính, ứng dụng khi xảy ra lỗi. Trong quá trình kiểm thử, một QA sẽ cần tập tin logs khi mà video hoặc hình ảnh không thể diễn đạt được. Đa số những lỗi cần tới file log là những vấn đề ảnh hưởng tới hiệu năng của sản phẩm hoặc bị dừng hoạt động. Ví dụ: một bug crash thì bạn cần mô tả lại các bước trong bug report , thêm vào đó là file log ghi lại hoạt động của bạn cho đội phát triển dễ dàng điều tra (nhất là khi những lỗi này thường chỉ xảy ra trên những trình duyệt hoặc thiết bị đặc thù).

Về cách lấy log bạn có thể nhờ đội ngũ phát triển hướng dẫn cách lấy hoặc không có thể tự tìm hiểu trên internet đều đã có đầy đủ chi tiết cách lấy log file của từng platform.

![](https://images.viblo.asia/dd770b88-7de8-4389-8720-b4f7b95c48e2.jpg)


**Ảnh chụp màn hình:** là ảnh màn hình được chụp bởi sự hỗ trợ của OS hoặc bất kỳ ứng dụng thứ 3 nào khác. Một số sai lầm khi đính kèm hình ảnh phổ biến nhất là: ảnh của lỗi, được chụp bởi điện thoại khác, dẫn tới chất lượng của hình ảnh không tốt, khó nhìn ra được chi tiết dẫn tới đội phát triển fix thiếu, nhầm. Nên dù chỉ là hình ảnh, bạn cần chăm chút hơn khi đính kèm vào bug report. Một số định dạng phổ biến chất lượng cao mà trình duyệt media nào cũng có thể mở được như: «.png», «.bmp», «.jpeg».


### Tệp đính kèm phải phù hợp cho từng hoàn cảnh khác nhau

Điển hình đặc trưng đối với phần đa số developer là "thỉnh thoảng" lại không đọc nội dung lỗi, mà sẽ tập trung ngay vào video hoặc hình ảnh bạn kèm vào bug report. Đó là lý do tại sao việc hiểu được bối cảnh phù hợp để sử dụng loại tệp nào là điều rất quan trọng. Trong đa phần lỗi về UI hiển thị (Layout, size...), chỉ cần 1 hình ảnh là đủ để diễn đạt được toàn bộ nội dung bạn cần.

Nếu chỉ là lỗi hiển thị nhưng chỉ bị với con trỏ chuột, hoặc làm một số hành động có tác động tới ứng dụng (như giữ chuột vào phần tử nào đó, con trỏ chuột không chuyển dạng chỉnh sửa hoặc hình bàn tay với menu...) thì cần chắc chắn là ảnh chụp màn hình có ghi lại điều đó. Nếu không được nữa nên quay video là rõ ràng nhất.

Khi một vài hình ảnh không thể hiển thị được lỗi, video là lựa chọn tốt nhất cho bạn. Quá trình tái hiện, lỗi xảy ra như thế nào, lỗi ảnh hưởng tới chức năng nào cần được hiển thị rõ ràng trong video. Định dạng tốt nhất và ưu thích nhất mà đội dev muốn xem cũng là video.

![](https://images.viblo.asia/2b47de74-5265-43b8-a192-77a5c1052b14.jpg)



**Điều kiện cho một tệp đính kèm chất lượng cao:** 
* Highlight nơi xảy ra lỗi trên hình bằng một hình chữ nhật đỏ hoặc mũi tên chỉ thẳng vào phần tử đó (bạn không muốn dev phải ngồi mò lỗi của bạn trong một ảnh chụp màn hình với không có lưu ý nào đúng không).
* Không được cẩu thả khi chọn ảnh chụp màn hình làm tệp đính kèm, nên thêm vào hình chụp từ design để cho đội dev dễ dàng so sánh và nhận biết mình mong muốn sửa như thế nào.
* Ngược lại cũng không nên có quá nhiều đánh dấu, chú thích vào hình ảnh, làm phân tâm và rối cho đội phát triển, cần thiết thì có thể thêm nhiều hình riêng biệt.
* Nếu lỗi xảy ra với yêu cầu cần tác động vào những phần tử, hoặc con chuột trên màn hình, bạn cần chắc chắn rằng ảnh chụp màn hình có thể ghi lại được nó (tip nhỏ: dùng Snipping tool với chế độ hẹn giờ bạn có thể làm được điều này).
* Trong quá trình kiểm thử, hình chụp hoặc video nên chứa cả địa chỉ của ứng dụng và trình duyệt đang sử dụng là gì (không nên có những thứ khác như bookmark, trình phát nhạc, hình nền...).
* Khi quay màn hình, nên dùng con trỏ chuột để chỉ vào nơi mà cần tập trung phát sinh lỗi.
* Định dạng video nên là: «.avi», «.mp4», «.mov» và «.mkv».
* Định dạng hình chụp màn hình nên là: «.png», «.bmp», «.jpeg».
* Nếu tệp tin hoặc hình ảnh quá lớn, nên chèn địa chỉ của tập đính kèm vào bug report (chắc chắn rằng liên kết đó chỉ cho những người cần thiết nhé, để không bị lộ thông tin của dự án ra ngoài).

Việc hậu kỳ chỉnh sửa lại tập đính kèm của bạn cũng không có gì yêu cầu tỉ mỉ, nhưng nên chắc chắn rằng không quá cẩu thả. Dẫn tới việc khi nhìn vào bug report sẽ thấy làm việc không chuyên nghiệp. Sự tín nhiệm của bạn phụ thuộc vào điều đó đấy. Thường thì khi kiểm thử web app hoặc app, mình hay dùng Snagit (có bản dùng thử, sau đó là phải mua bản quyền) để quay video màn hình. Còn chụp màn hình thì đang sử dụng Snipping tool - ứng dụng chụp màn hình của windows. Và chỉnh sửa thì dùng Microsoft Pain. Đặc thù của những công ty về phần mềm là rõ ràng về bản quyền và đảm bảo tính bảo mật, nên bạn lưu ý khi chọn ứng dụng để phục vụ việc kiểm thử nhé.

Một tập đính kèm tốt là chỉ cần nhìn hoặc xem nó, developer cũng có thể fix lỗi đó ngay mà không cần phải hỏi lại nhiều lần. Việc chất lượng tập đính kèm này ảnh hưởng tới tiến độ của cả các bên, nên nó thực sự rất quan trọng trong quá trình giảm thiểu quá trình xác nhận qua lại chỉ vì một bug nhỏ. Hãy chọn lựa một cách thích hợp và tạo một bug report tốt nhé <3.

---

Tham khảo: https://www.softwaretestingmagazine.com/knowledge/the-role-of-attachments-in-bugs-reports/

Ảnh: Internet