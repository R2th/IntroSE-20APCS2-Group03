## 1. Đặc tả là gì

Đặc tả phần mềm là một tài liệu quan trọng, mô tả các chức năng mà phần mềm cần có cũng như các ràng buộc mà phần mềm cần thoả mãn. Tài liệu này được tạo ra từ nhiều nguồn khác nhau như: thông qua các nghiên cứu về nhu cầu sử dụng của người dùng, về các biêủ mẫu, thị trường,.... 

Vì đặc tả không thể thực thi trên máy nên chúng ta chỉ có thể phát hiện lỗi bằng các kĩ thuật khảo sát đặc tả. Trong bài viết này, ta cùng đi tìm hiểu 2 kĩ thuật khảo sát đặc tả là: duyệt đặc tả mức cao và duyệt đặc tả mức thấp.

## 2. Kĩ thuật duyệt đặc tả mức cao

Định nghĩa một sản phẩm phần mềm là một việc khó, đặc tả thường liên quan đến nhiều thứ chưa biết. Việc xây dựng đặc tả lấy vô số đầu vào thay đổi, kết hợp chúng lại với nhau để toạ ta một tài liệu mô tả sản phẩm mới, quá trình này không chính xác và dễ mắc sai lầm. Bước đầu tiên để kiểm thử đặc tả không phải đi vào chi tiết ngay để tìm lỗi mà là xem xét nó từ mức cao. Hãy khảo sát đặc tả để tìm các lỗi cơ bản lớn, nhưng lỗi về bỏ sót trước tiên. Dứoi đây là các kĩ thuật để tiến hành duyệt tài liệu đặc tả ở mức cao.

### 2.1. Hãy là khách hàng của sản phẩm

Khi nhận một tài liệu đặc tả để kiểm thử,  biết được mong muốn về sản phẩm của khách hàng là gì để thoả mãn yêu cầu của  khách hàng. Để hiểu yêu cầu của  khách hàng thì bạn không nhất thiết phải là chuyên gia trong lĩnh vực ứng dụng nhưng nhưng nếu hiểu biết chút ít về nó sẽ giúp cho việc kiểm thử tốt hơn.

Không được giả thiết bất cứ điều gì khi tìm hiểu về đặc tả. Khi ta khảo sát một phần của đặc tả và không hiểu thì không được cho là nó đúng, vì ta sẽ dùng đặc tả để thiết kế tốt cho các ca kiểm thử sau này. Xem xét đặc tả theo quan điểm người dùng  giúp ta phát hiện những lỗi bỏ sót hoặc sai yêu của họ, 

### 2.2. Hãy nghiên cứu các chuẩn và hướng dẫn hiện hành

Trên thế giới đã có nhiều nghiên cứu về cách con người sử dụng máy tính, hiện nay đã có những chuẩn cả về phần cứng lẫn phần mềm của giao diện với người sử dụng, tưởng tác người máy,....Sau đây là 1 số chuẩn nghiên cứu để áp dụng trong đặc tả phần mềm:

**Hợp thức hoá các thuật ngữ và quy ước**: Nếu phần mềm được làm riêng cho một công ty nào đó hãy sử dụng các thuật ngữ quy ước của họ.

**Yêu cầu công nghiệp**: Trong mỗi lĩnh vực ứng dụng nhu y tế, dược phẩm, tài chính,... đều có các chuẩn riêng và nghiêm ngặt của họ mà phần mềm cần tuân thủ.

**Chuẩn quy định bởi chính phủ**: Chính phủ có những quy định đặc biệt trong các lĩnh vực quốc phòng, anh ninh và quản lý mà phần mềm phải tuân thủ.

**Giao diện đồ hoạ với người sử dụng(GUI)**: Các phần mềm chạy trên Window hoặc Macintosh phải tuân thủ các quy định về giao diện đồ hoạ của các hệ điều hành này.

**Chuẩn bảo mật**: Phần mềm có thể thoả mãn một số quy định về bảo mật mà cần phải chứng nhận và cấp phép.

## 3. Kĩ thuật kiểm thử đặc tả ở mức thấp

Sau khi đã hoàn thành việc khảo sát đặc tả mức cao, ta hiểu rõ hơn về sản phẩm của mình và những yếu tố bên ngoài ảnh hưởng đến thiết kế của sản phẩm phần mềm. Khi được trang bị những thông tin này, chúng ta tiếp tục khảo sát đặc tả ở mức thấp.

### 3.1. Các mục cần thẩm định về các thuộc tính của đặc tả

Một đặc tả sản phẩm phần mềm được xây dựng tốt cần thỏa mãn các thuộc tính dưới đây

**Đầy đủ**: trả lời được các câu hỏi: còn thiếu cái gì không, đã đủ chi tiết chưa, đã liệt kê các điều cần thiết để không phụ thuộc vào tài liệu khác chưa.

**Trúng đích**: đã cung cấp đầy đủ thông tin cho dự án, đã xác định đầy đủ các mục tiêu chưa.

**Chính xác, không nhập nhằng và rõ ràng**: mô tả chính xác không, có rõ ràng và dễ hiều không, còn thông tin nào mơ hồ không rõ ràng không.

**Tương thích**: các đặc trưng và chức năng đuược mô tả có bị xung đột với nhau không.

**Khả thi**: liệu đặc tả có thể được cài đặt trong khuôn khổ nhân lực, công vụ, tài nguyên, thời gian và kinh phí cho phép hay không.

**Phi mã lệnh**: trong đặc tả không được dùng các câu lệnh hoặc thuật ngữ cho người lập trình, Ngôn ngữ dùng trong đặc tả phải là phổ biến với người dùng.

**Khả kiểm thử**: các đặc trưng có thể kiểm thử được, đã cung cấp đủ thông tnđể có thể kiếm thử và xây dựng các ca kiểm thử.


### 3.2 Các mục cần thẩm định về thuật ngữ đặc tả

**Luôn luôn, mỗi một, tất cả, không có, không bao giờ**: những từ ngữ mô tả sự tuyệt đối và chắc chắn. Hãy xét xem tình trạng có đúng như vậy không, có trường hợp nào vi phạm các quy định đó hay không.

**Tất nhiên, do đó, rõ ràng, hiển nhiên là**: các từ này được dùng để thuyết phục người khác chấp nhận cái gì đó, nên bạn đừng rơi vào bẫy đó.

**Nào đó, đôi  khi, thông thường, thường gặp, hầu hết**: các từ này nhập nhằng không có nghĩa rõ ràng và không thể kiểm thử.

**Vân vân, chẳng hạn, như vậy**: các từ này thường mô tả thứ không thể kiểm thử được.

**Tốt, nhanh, rẻ, hiệu quả, ổn định**: những từ không định lượng như vậy sẽ mô tả các hạng mục không thể kiểm thử đuược nếu không được làm chi tiết hóa sau này.

Trên đây là kỹ thuật kiểm thử hộp đen tính, tức là phản biên đặc tả của sản phẩm, tìm xem đặc tả có lỗi không. Khi đặc tả đã đuược hoàn thành và đã được phản biện mã nguồn của chương trình được phát triển dựa trên đặc tả này.

Tài liệu tham khảo: Giáo trình kiểm thử phầm mềm