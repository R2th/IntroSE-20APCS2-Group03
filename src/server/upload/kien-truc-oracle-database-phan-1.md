# Giới thiệu

Xin chào các bạn, bài đầu tiên của chuỗi các bài viết về Oracle, tôi sẽ dành để giải thích về kiến trúc của Oracle Database.
Tại sao ngay bài đầu tiên, tôi lại lựa chọn 1 chủ đề mang tính lý thuyết và khô khan như thế ? Sao không cho nhìn cái giao diện hay demo 1 vài chức năng cho nó thú vị đi?**

## Có 2 nguyên nhân giải thích điều này như sau:

1. Thứ nhất, học bài bản là phải học từ gốc, mà gốc thì phải học từ kiến trúc. Tức là xây cái móng, cái nền tảng, từ đó trí tuệ của bạn mới tỏa sáng, blah blah, abc….

2. Còn cái thứ 2 là bởi vì, cái kiến trúc của Oracle nó quá thú vị, quá hấp dẫn đến nỗi mà tôi không thể không giới thiệu cho bạn ngay khi bạn muốn tìm hiểu về nó

** Thôi không chém gió lan man nữa, bây giờ tôi sẽ đi vào chủ đề chính luôn nhé

Nói đến kiến trúc của Oracle Database, nghe thì có vẻ cao siêu nhưng bản chất nó chẳng khác gì cấu tạo của 1 con máy tính để bàn cùi bắp của tôi cả.

Nghe nhé: Máy tính để bàn thì có 3 thành phần bắt buộc phải có là gì?
1. RAM
2. CPU
3. Ổ đĩa cứng

Oracle Database cũng có 3 thành phần bắt buộc như vậy. Đó là:

1. Memory Architecture
2. Processes Architecture
3. Storage Architecture

3 thành phần này của Oracle Database có vai trò giống hệt với 3 thành phần của máy tính để bàn vậy

* Memory Architecture – RAM: Vai trò để chứa các dữ liệu có tính chất tạm thời với mục đích tăng tốc độ xử lý cho hệ thống
* Processes Architecture – CPU: Bao gồm nhiều tác vụ để xử lý các công việc trong hệ thống
* Storage Architecture – Ổ đĩa cứng: Là nơi để lưu trữ dữ liệu

** Rất đơn giản phải không? **

Để tôi lấy thêm cho bạn 1 ví dụ nữa nếu bạn vẫn chưa rõ ràng nhé

Database của bạn giống như 1 nhà hàng vậy, các user kết nối vào để khai thác dữ liệu giống như các vị thực khách đến nhà hàng. **Nhiệm vụ của nhà hàng là làm sao phục vụ các thực khách nhanh nhất có thể!**


Vậy thì tổ chức của nhà hàng phải bao gồm tối thiểu những thành phần như sau:

   1. Khu vực phục vụ: Là nơi thực khách ngồi ăn (Đây là Memory)
   2. Nhân viên: Bao gồm cả đầu bếp và nhân viên phục vụ. Vai trò của họ là xào nấu và phục vụ các món ăn theo yêu cầu của thực khách (Đây chính là các process)
   3. Nhà bếp: Là nơi lưu trữ các nguyên vật liệu, thịt, rau, củ, quả để chế biến món ăn. (Đây là Storage)

**Đó, Oracle Database cũng tương tự như vậy. **

Trong 3 thành phần này của Oracle, 2 thành phần Memory và Process hợp lại gọi là “Instance”, còn Storage còn được gọi là Database.

Instance có thể nhiều bạn đã nghe nhưng chưa hiểu rõ nó là gì đúng không? Bạn hình dung, dữ liệu trong Storage (hay Database) đươc lưu giữ dưới dạng vật lý, là các đĩa từ, hay chịp nhớ. Con người không thể nào trực tiếp đọc dữ liệu từ đó được. Do đó, sẽ cần phải có 1 lớp ở giữa làm nhiệm vụ phiên dịch qua lại giữa người dùng và Database, đó chính là Instance. ** Instance sẽ thực hiện việc phiên dịch này bằng các Process và các thành phần trong Memory.**

Bạn hãy hiểu bản chất nó cũng chỉ có như thế, đừng quá phức tạp hóa làm gì. 

Nếu bạn hứng thú với các bài viết về database, mời bạn ghé thăm https://dangxuanduy.com để biết thêm nhé.