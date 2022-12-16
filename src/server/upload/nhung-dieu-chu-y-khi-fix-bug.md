Đối với dân developer, code - fix bug luôn đi đôi với nhau, giống như kiểu ăn cơm - uống nước vậy. Một dự án dù tốt đến đâu cũng không thể không có bug, quan trọng là bug ít hay nhiều thôi.
Fix bug là một phần của coder, vậy nên thử đọc bài viết sau để xem người Nhật có suy nghĩ như thế nào về việc fix bug, biết đâu có thể cải thiện được kĩ năng fix bug của mình thì sao, hehe.

> Khi fix bug thì tôi nghĩ rằng điều quan trọng nhất là phải document lại (ghi chép thành tài liệu). Tùy vào môi trường hoạt động của ứng dụng mà sẽ phát sinh ra những vấn đề khác nhau. Ngoài ra, cũng có thể do các yếu tố khác nhiều khi làm phát sinh việc fix bug ngoài ý muốn. Việc fix những lỗi phát sinh này dẫn đến tăng dần độ phức tạp cho ứng dụng, và làm chúng ta khó mà quản lý được sự thay đổi trong hệ thống. Lúc này ta hãy ghi chép thật kỹ thông tin từng dòng. Tôi nghĩ thói quen lưu giữ này là tối quan trọng.

### バグが発生したら - Đối ứng khi phát sinh bug
Đã là lập trình viên thì ai cũng có kinh nghiệm fix bug cả. Bởi vì không có chương trình nào hoàn hảo. Lý do là chương trình nào cũng được tạo ra bởi con người, vậy nên có lẽ việc phát sinh lỗi là không tránh khỏi rồi nhỉ.

Bây giờ ta hãy suy nghĩ về việc làm sao để fix bug này không làm phát sinh ra bug khác. Tuy nhiên, trên thực tế sẽ phát sinh ra những bug mới ngoài dự tính, và có trường hợp xấu nhất mà ta sẽ phải chấp nhận đó là sẽ không thể xử được các lỗi đó.

Để tránh tình trạng này thì sẽ có những chú ý đặc biệt. Ta hãy thử suy nghĩ về những gì mà lập trình viên cần để tâm.

### 前バージョンの回避コードを正しく修正 - Fix đúng bug tồn động từ version trước
### 
Trường hợp nâng cấp version phần mềm, ta hãy định hình đúng “kaihi bug code” – tức là mã số các bug mình chưa fix kịp hoặc chưa nghĩ ra cách làm sao fix, 1 dạng cài bom trong code có chủ đích và nằm trong phạm vi có thể xử lý được. Việc chỉnh sửa sau khi bàn giao sản phẩm (release) thì với những thay đổi qui mô lớn là rất khó, vậy nên có nhiều khi dev nhà ta giấu nhẹm bug đi. Nói như vậy thì việc cài bom khôn lanh kiểu đỏ sẽ đẩy được bug sang giai đoạn maintain làm mình dễ thở hơn. Vậy nên để cho chắc ăn thì hiển nhiên các bạn phải comment cho đầy đủ, rồi còn phải tạo danh sách các đoạn đã chỉnh sửa nếu có thể.

### 各コンポーネントの独立性を高める - Nâng cao tính độc lập cho các component ( cái này nằm trong nguyên tắc SOLID – các bạn google thêm)
### 
Nếu tính liên kết giữa các component càng thấp thì việc chỉnh sửa code càng dễ dàng.

Nói suông vậy chắc hơi khó hiểu. Ví dụ nhé, ta có 2 biến “Global” vs “Public”, có nhiều module sử dụng nó, điều này dẫn đến khi có 1 thay đổi thì việc điều tra chỉnh sửa sẽ khá vất vả. Vì vậy không chỉ code sao cho dễ đọc – dễ hiểu, mà các lập trình viên còn phải nâng cao tính độc lập cho các component.

### よいコードを参考にする - Tham khảo các code đẹp
### 
Đọc càng nhiều code thì sẽ hình thành nên ý thức code sao cho tốt.

Để lập trình viên có thể tạo ra những dòng code chất lượng ổn định và tuyệt hảo thì cần có know how (hiểu biết) rộng. Có nghĩa là nếu ta đọc nhiều thì chất lượng code của mình sẽ càng tốt lên.

### 本当の問題を見極める - Tìm ra vấn đề mấu chốt
Trước khi sửa code chúng ta nên tìm hiểu thật kỹ mấu chốt vấn đề là gì.

Có lẽ đây là điều hết sức bình thường nhưng trên thực tế việc tiến hành giải quyết vấn đề mà không đánh đúng trọng tâm thì không hiếm. Nếu chỉ dựa vào hiện tượng ta nhìn thấy, sau khi sửa xong có thể sẽ còn tồn động những case khác mà không hề hay biết.

Vì nhiều lý do mà cũng có trường hợp phải tiến hành các chỉnh sửa mang tính chữa cháy. Đối với case này, ta phải ghi chép hay comment lại thật đầy đủ.

### 修正が他のルートに影響を及ぼさないように - Làm sao để sửa bug này không lòi bug khác.
Đây là điều nhắn nhủ đặc biệt gửi đến các lập trình viên khi fix bug giai đoạn sau khi đã release sản phẩm. Vậy nên đừng chống chế kiểu “em không đủ thời gian test”. Hay “em đã fix được cái đó rồi mà”. Trong khi bug vẫn chưa giải quyết triệt để thì trách nhiệm cuối cùng cũng thuộc về lập trình viên (số khổ).

### 性能を落とさないよう注意 - Chú ý đừng làm sập tính năng ứng dụng
Các bạn programmer nhớ kỹ điều này nhé. Đừng vì quá chú ý đến việc fix 1 cái bug mà làm sập luôn cả ứng dụng. Tuyệt đối không được quên điều này.

### 確認テスト手順の確立 - Tạo tài liệu hướng dẫn tuần tự test confirm
### 
Việc test lại sản phẩm sau khi fix bug, không chỉ chăm chăm test cái bug đó thôi mà phải coi cho rộng, xem nó có ảnh hưởng đến những phần khác hay không. Vậy nên cần phải tạo tài liệu tuần tự test confirm. Để khi xem tài liệu có thể dễ dàng phát hiện ra được thiếu sót mà test bổ sung.

### バグ修正において最も大切なこと - Chú ý quan trọng nhất khi fix bug
Quan trọng nhất trong việc fix bug theo tôi chính là việc phải ghi chép lại toàn bộ.

Những tài liệu này không chỉ file giải thích bug bằng câu chữ, mà còn gồm cả comment source code, loại database thông tin bug, phương pháp fix, và những thông tin liên quan khác. Việc fix bug khó khăn 1 phần cũng vì việc ghi chép thiếu tường minh (rõ ràng).

Nguồn: http://yasuho.hatenablog.com/entry/20061127/p1