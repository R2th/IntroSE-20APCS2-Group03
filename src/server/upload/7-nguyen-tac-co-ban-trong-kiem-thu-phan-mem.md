***Kiểm thử phần mềm*** là hoạt động tìm ra lỗi của phần mềm và đảm bảo rằng phần mềm hoạt động đúng so với đặc tả yêu cầu. Trong kiểm thử phần mềm có 7 nguyên tắc rất cơ bản mà ai cũng cần biết vì nó giúp tiết kiệm thời gian cũng như công sức trong việc truy tìm lỗi ẩn trong ứng dụng của bạn. Dưới đây mình sẽ trình bày về 7 nguyên tắc cơ bản trong kiểm thử phần mềm:<br>
1. Kiểm thử không chứng minh là không có lỗi<br>
2. Kiểm thử toàn bộ là không thể
3. Kiểm thử càng sớm càng tốt
4. Phân cụm lỗi
5. Nghịch lý thuốc trừ sâu
6. Kiểm thử phụ thuộc vào ngữ cảnh
7. Tư tưởng không có lỗi là sai lầm

## 1. Kiểm thử không chứng minh là không có lỗi
Kiểm thử phần mềm chỉ có thể chứng minh được phần mềm có lỗi nhưng không thể chứng minh được phần mềm đó không còn lỗi. Kiểm thử phần mềm giúp giảm xác suất lỗi chưa tìm thấy trong phần mềm. Vì vậy cần có 1 bộ test case tốt cover hết các trường hợp có thể xảy ra để tìm ra càng nhiều lỗi càng tốt.
## 2. Kiểm thử toàn bộ là không thể
Nguyên tắc này có nghĩa là kiểm thử toàn bộ mọi thứ bao gồm cả điều kiện đầu vào và tiền điều kiện là không khả thi cho các trường hợp có rất nhiều giá trị đầu vào và hệ thống phức tạp. Thay vào đó ta nên vận dụng phân tích rủi ro, các kỹ thuật kiểm thử và độ ưu tiên để tập trung vào test các phần cần thiết có nguy cơ lỗi cao hơn.<br><br>
***Ví dụ:*** Cho 1 ô text box nhập vào từ 5 đến 1000 ký tự.<br>
Ta không thể ngồi nhập hết tất cả các trường hợp từ 5 đến 1000 ký tự được thay vào đó ta sẽ áp dụng các kỹ thuật kiểm thử để thực hiện test giúp giảm bớt thời gian công sức. Thay vì nhập 1000 lần thì khi áp dụng các kỹ thuật kiểm thử ta chỉ cần nhập các case:<br>
* Case hợp lệ: 5; 500; 1000<br>
* Case không hợp lệ: 4, 1001
## 3. Kiểm thử càng sớm càng tốt
Kiểm thử nên được bắt đầu càng sớm càng tốt trong vòng đời phát triển phần mềm. Lỗi càng được tìm ra sớm thì càng tiết kiệm được thời gian và chi phí fix lỗi<br><br>
***Ví dụ:*** Cùng 1 lỗi khi ta phát hiện tại giai đoạn phân tích yêu cầu khách hàng thì ta chỉ cần xác nhận lại với khách hàng và chỉnh sửa ngay trong tài liệu đặc tả. Còn nếu sau khi làm xong rồi đưa sản phẩm sang cho khách hàng mới phát hiện ra lỗi thì sẽ mất rất nhiều thời gian và chi phí để fix vì ta đã build 1 bản hoàn chỉnh lên thì phải fix rất nhiều chỗ khác nhau bởi các chức năng sẽ thường liên quan đến nhau.<br><br>
![](https://images.viblo.asia/abfaf576-72ba-4aad-b05a-53851a4f2a1a.png)<br>

## 4. Phân cụm lỗi
Lỗi thường tập trung ở các chức năng chính có liên quan nhiều đến các chức năng khác trong hệ thống. Thông thường thì ta sẽ tìm được 80% lỗi của hệ thống trong 20% chức năng chính của hệ thống. Vì vậy cần phải test kỹ các chức năng quan trọng để tìm ra bug và test các chức năng gần nó, có liên quan đến nó để ra nhiều bug hơn.
## 5. Nghịch lý thuốc trừ sâu
Nếu cùng một bộ test case đó ta test đi test lại nhiều lần sẽ bị nhờn và sẽ không tìm ra được bug mới. Hiệu quả của các lần kiểm thử sẽ giảm sau một số lần thực hiện vì vậy chúng ta nên suy nghĩ ra nhiều quan điểm test khác nhau và luôn update trong lần những lần test sau.
## 6. Kiểm thử phụ thuộc vào ngữ cảnh
Kiểm thử là khác nhau trong các ngữ cảnh khác nhau. Nếu bạn suy nghĩ test web và test mobile sẽ dùng các quan điểm test giống nhau thì điều đó là sai. <br><br>
***Ví dụ:*** Khi test mobile ta cần quan tâm đến: Đang sử dụng app thì có điện thoại gọi đến, vừa dùng app vừa nghe nhạc, đang dùng app có tin nhắn đến, kích thước màn hình thay đổi liên tục tùy thuộc vào các device khác nhau (ví dụ: iphone5, iphone 6) hay dùng 3g, 4g, wifi thì tốc độ truy cập thế nào,... Nhưng khi test web ta lại không cần quan tâm đến các trường hợp này.
## 7. Tư tưởng không có lỗi là sai lầm
Việc không tìm thấy lỗi trên sản phẩm không đồng nghĩa với việc sản phẩm đã sẵn sàng tung ra thị trường mà bộ test case đó có thể tạo ra chỉ nhằm mục đích kiểm tra xem hệ thống đang hoạt động có đúng với yêu cầu hay không chứ không nhằm mục đích tìm ra lỗi mới. Theo nguyên tắc 1 và nguyên tắc 2 thì ta không thể test cạn kiệt tất cả các trường hợp và cũng không thể chứng minh rằng hệ thống không có lỗi nên hệ thống luôn luôn có lỗi tìm ẩn bên trong.<br>
## Tài liệu tham khảo: ISTQB 
https://www.istqb.org/downloads/syllabi/foundation-level-syllabus.html<br>
Bài viết mang tính chất chia sẻ kiến thức cho các bạn đang muốn tìm hiểu và mới tiếp cận với nghề tester như mình:kissing_heart: Rất mong có thể giúp ích cho các bạn:heart_eyes: