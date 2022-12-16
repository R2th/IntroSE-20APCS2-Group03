Nulll rất quen thuộc với tất cả các nhà phát triển java và nó đang được coi là một phát minh tuyệt vời cho một vấn đề cụ thể, và vấn đề là bạn sẽ định nghĩa một “undefined” như thế nào.
Khi không có giá trị để trình bày thì nó sẽ được trình bày như thế nào? Câu trả lời là "null" có lẽ, tôi không chắc chắn. ☹

Hãy xem xét điều này:

Không xác định đã tồn tại kể từ khi tạo ra mã hóa, null là phát minh sai lầm của nhà khoa học máy tính người Anh Tony Hoare (nổi tiếng nhất với thuật toán Quicksort) vào năm 1964, người đã đặt phát minh ra tham chiếu null là "Billion dollar mistake" của mình

Và đây là những gì anh ấy nói:


> I call it my billion-dollar mistake…At that time, I was designing the first comprehensive type system for references in an object-oriented language. My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn’t resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.
> — Tony Hoare, inventor of ALGOL W.


## Có vấn đề gì với NULL?
Câu trả lời ngắn gọn: NULL là một giá trị không phải là một giá trị. Và đó là một vấn đề.
### Cách xử lý cũ:
Hãy xem xét mã này:
![](https://images.viblo.asia/a6d5152f-a81b-4b76-91c2-212400faaf32.png)

Điều này rõ ràng có thể bị lỗi với NullPointerException nếu bất kỳ object nào là null.

Một cách điển hình để tránh điều này:
![](https://images.viblo.asia/713de6ef-7146-4a3c-9327-8ee0f1440818.png)

Oh God ☹

Điều này sẽ không bị lỗi, nhưng chỉ là xấu xí và rất dễ dàng để tránh null check.

Hãy thử với Optional của Java 8:
![](https://images.viblo.asia/dd51b276-7861-4fa7-b572-0182009bcaea.png)

Good 😊 nhưng nó có phải là tốt nhất không 😕

Điều này không tốt hơn nhiều so với kiểm tra rỗng. Một số người cho rằng nó làm rõ ý định của bạn.
Tôi không thấy bất kỳ sự khác biệt lớn nào, hầu hết các lần kiểm tra rỗng đều khá rõ ràng đối với những tình huống đó.

Được rồi, hãy sử dụng các chức năng và làm việc hiệu quả hơn từ Optional:
![](https://images.viblo.asia/040a4e73-9752-40dc-a106-bdcde2d7adff.png)

**flatMap ()** sẽ luôn trả về Optional, vì vậy không có giá trị nào có thể xảy ra ở đây và bạn tránh phải đóng mở Optional.
Xin lưu ý rằng tôi đã thêm các phương thức Optional () vào các object. Có nhiều cách khác để làm điều đó (map + flatMap thành Optional :: ofNullable là một). Cách tốt nhất: chỉ trả về giá trị Optional khi nó có ý nghĩa: nếu bạn biết giá trị sẽ luôn được cung cấp, không cần đặt nó trong Optional. Nhân tiện, lời khuyên này cũng phù hợp với các kiểm tra null kiểu cũ.

**ifPresent()** sẽ chỉ chạy mã nếu khác null. Không có mặc định hoặc bất cứ điều gì.
Hãy chỉ sử dụng để thể hiện một cách chặt chẽ:
![](https://images.viblo.asia/20cf410e-f25d-449d-a8d6-f077e41cb7bb.png)

Great 😊

## Kết luận
Bằng cách sử dụng Optional và không bao giờ làm việc với null, bạn có thể tránh hoàn toàn việc kiểm tra null. Vì chúng không cần thiết, bạn cũng tránh bỏ qua kiểm tra rỗng dẫn đến NPE. Tuy nhiên, hãy đảm bảo rằng các giá trị được trả về từ code (Map,…), có thể là giá trị rỗng, được bao bọc càng sớm càng tốt trong Optional.

Link tham khảo: https://medium.com/@shohan.sharma/billion-dollar-mistake-670cbcde806