### **1. Giới thiệu**
Hiện nay mọi người chỉ mới biết đến tiền ảo hay cụ thể hơn là Bitcoin nhưng chưa hiểu rõ công nghệ bên dưới nó hoặc vẫn còn mập mờ về khái niệm **Blockchain**. Đã có khá nhiều bài viết về khái niệm, cơ chế và ứng dụng của Blockchain nên hôm nay mình sẽ giới thiệu về cơ chế bảo mật dữ liệu của công nghệ mới này.
### **2. Mục đích**
Điều quan trọng mà chúng ta hướng đến là toàn bộ dữ liệu lịch sử giao dịch được duy trì bởi **Blockchain** luôn chính xác và nó có thể trở thành một nguồn tin cậy để làm rõ các vấn đề liên quan đến quyền sở hữu.

### **3. Các thách thức**
BLOCKCHAIN là một hệ thống phân tán hoàn toàn peer-to-peer dành cho tất cả mọi người. Do đó, có nguy cơ các nút có thể sửa hoặc giả mạo lịch sử của dữ liệu giao dịch vì lợi ích riêng của họ. Điều chúng ta cần làm là giữ cho hệ thống luôn mở cho mọi người nhưng vẫn bảo vệ được lịch sử của dữ liệu giao dịch không bị giả mạo hoặc chỉnh sửa.
 
### **4. Ý tưởng**
Phân biệt các nút trung thực( Honest Node) và không trung thực( Dishonest Node)  trong một hệ thống mở là rất khó, thậm chí là không thể. Do đó, để bảo vệ lịch sử giao dịch không bị chỉnh sửa, chúng ta sẽ phải ngăn chặn việc chỉnh sửa dữ liệu của tất cả mọi Node ngay từ đầu. Nếu không ai có thể thay đổi dữ liệu giao dịch thì chắc chắn chúng ta có thể bảo vệ nó an toàn tránh bị thay đổi. Khi đó hệ thống có thể mở ra cho mọi người và không ai phải lo lắng về các Node không trung thực chỉnh sửa lịch sử giao dịch.

### **5. Giải pháp**
Một giải pháp được đưa ra là sử dụng ***“Dữ liệu bất biến”*** là dữ liệu không thể bị thay đổi ngay sau khi chúng được tạo ra, dữ liệu này còn được gọi là dữ liệu chỉ đọc. Nó chỉ có thể đưa ra các thông tin cho mục đích đọc hoặc trình bày. Điều này rất quan trọng nếu chúng ta cần đưa dữ liệu cho người khác và không kiểm soát được cách họ sử dụng dữ liệu đó. Việc trao đổi dựa trên “dữ liệu bất biến” thực sự rất hiệu quả để ngăn chặn việc thay đổi và chỉnh sửa dữ liệu. Ví dụ như hằng ngày chúng ta vẫn sử dụng giấy phép lái xe, hộ chiếu và chứng minh thư, đây là ví dụ về sự không thể thay đổi trong cuộc sống thực. Các nhà chức trách sản xuất chúng để ghi lại một số thông tin và chỉ sử dụng để trưng bày hoặc đọc.

**Cách hoạt động:**

Ý tưởng chính được sử dụng bởi **Blockchain** để làm cho lịch sử dữ liệu không thể thay đổi là làm cho việc thay đổi nó tốn kém chi phí cao và để cho những chi phí đó ngăn cản mọi người thay đổi nó. Làm cho lịch sử của dữ liệu giao dịch không thể thay đổi có ba yếu tố:
* Lưu trữ lịch sử của dữ liệu giao dịch theo cách mà ngay cả thao tác chỉnh sửa nhỏ nhất nội dung của nó cũng nổi bật dễ phát hiện.
* Làm cho việc chỉnh sửa lịch sử giao dịch đòi hỏi phải viết lại một phần rất lớn lịch sử của nó.
* Làm cho việc thêm, sửa hoặc viết lại lịch sử của dữ liệu sẽ gây tốn kém về nhiều mặt.

*a> Làm nổi bật sự chỉnh sửa*

Cấu trúc dữ liệu **Blockchain** lưu trữ dữ liệu theo cách thức nhạy cảm với sự bất kì sự thay đổi nào. Do đó, người ta không thể chỉnh sửa một phần của cấu trúc dữ liệu **Blockchain** một cách âm thầm mà hy vọng rằng không ai nhận thấy nó. Bất kỳ thay đổi nào cũng sẽ bị nổi bật lên vì nó khiến cho các tham chiếu băm không hợp lệ khi dữ liệu mà chúng tham chiếu đến đã bị thay đổi.

*b> Buộc sự viết lại lịch sử phải bao gồm các thay đổi*

Cấu trúc dữ liệu **Blockchain** cũng đáp ứng yếu tố thứ hai vì nó có một cách tiếp cận “tất cả hoặc không gì cả” khi thay đổi dữ liệu của nó: Một hoặc là thay đổi cấu trúc dữ liệu bắt đầu từ điểm gây ra sự thay đổi cho đến đầu của chuỗi hoặc tốt hơn là không thay đổi nó.

*c> Làm việc thay đổi dữ liệu gây tốn kém về nhiều mặt*

Yếu tố thứ ba là dành cho những người không ngại viết lại phần lớn cấu trúc dữ liệu BLOCKCHAIN trong quá trình chỉnh sửa lịch sử giao dịch. Nhưng bởi vì việc viết hoặc viết lại cấu trúc dữ liệu BLOCKCHAIN phải chịu chi phí rất lớn, họ sẽ suy nghĩ lại về việc thay đổi đó có là một ý tưởng tốt hay không.

Bất cứ ai sử dụng blockchain đều có thể truy cập tới toàn bộ database cũng như lịch sử của nó. Việc nắm quyền sẽ không thuộc về một bên riêng lẻ nào nữa. Các bên giao dịch cũng không cần đến một đơn vị trung gian để xác thực dữ liệu và điều này sẽ làm cho việc chuyển đổi giao dịch diễn ra nhanh chóng hơn và ít chi phí hơn.

Phương thức giao tiếp được sử dụng là peer-to-peer trực tiếp giữa các máy tính với nhau. Đây là cách thức thích hợp hơn là thông qua một máy server duy nhất (node) bởi bì hackers có thể hack data khi dữ liệu được truyền qua node. Với blockchain thì data sẽ được truyền tới tất cả các máy tính trong mỗi node. Điều này khiến cho việc hack trở nên khó hơn bởi vì thông tin không chỉ được di chuyển thông quá một server duy nhất nữa.

“Bộ **Blockchain**” làm cho nội dung của cấu trúc dữ liệu **Blockchain** không thay đổi bằng cách yêu cầu chi phí khá lớn cho mỗi khối được viết, viết lại, hoặc bổ sung vào cấu trúc dữ liệu **Blockchain**. Chi phí được phát sinh bởi các câu đố băm độc nhất cho mỗi tiêu đề khối. Do đó, họ có thể chấp nhận toàn bộ chi phí thay đổi cấu trúc dữ liệu từ điểm gây ra sự thay đổi cho đến đầu chuỗi bằng cách giải quyết các câu đố băm của các tiêu đề khối liên quan hoặc chọn cách đơn giản hơn: "***Đừng làm gì cả***".