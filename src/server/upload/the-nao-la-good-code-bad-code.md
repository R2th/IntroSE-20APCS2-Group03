![](https://images.viblo.asia/18fc6cc0-8630-4c64-b8e2-45a1f8e09608.png)

Khi viết code bằng bất kì ngôn ngữ nào cũng có những đoạn mã tốt (good code) và những đoạn mã xấu( bad code). Cả hai đều chính xác cho đến khi biên dịch và khi chạy thì bad code có thể gây ra một số vấn đề trong quá trình phát triển, gỡ lỗi và sửa đổi. Bất kể chương trình của bạn chạy tốt đến đâu, ai đó sẽ phải đọc hoặc thay đổi code của bạn tại một số điểm. Họ có thể phải thêm các tính năng mới, sửa lỗi hiếm hoi, hoặc chỉ muốn đọc nó để hiểu nó hoạt động như thế nào. Tương tự như vậy, bạn sẽ phải đọc code của người khác để làm điều tương tự. Mọi người sẽ hiểu vấn đề bạn muốn code tốt hơn nếu code dễ hiểu.

Bạn viết code một lần nhưng sau đó bạn có thể phải dùng nó nhiều lần, do đó, những tài liệu về code của bạn thực sự rất quan trọng. Rất nhiều lần tôi bắt gặp các đồng nghiệp của tôi nói về việc họ không thể nhớ được đoạn code hay logic mà họ đã viết trước đó vài ngày trước. Đối với một đoạn code tồi, bạn sẽ phải mất nhiều thời gian hơn để hiểu được những gì mà bạn làm lúc đó. Mọi thứ sẽ trở nên xáo trộn khi một nghệ sĩ không thể hiểu được những tác phẩm của chính mình.

Một đoạn code tồi có thể dẫn đến tổn thất về tài chính hoặc lãng phí thời gian cần thiết để duy trì, cải tiến hoặc điều chỉnh phần mềm.

Dưới đây là một số điểm quan trọng cần chú ý khi viết code:

## 1.Commet code

* Giải thích code giúp các đoạn code trở nên dễ hiểu và dễ dàng cho việc bảo trì sau này. 
* Giải thích code tốt là phải giải thích được tại sao làm như thế chứ không phải đoạn code này làm cái gì. Chính đoạn code đã nói được nó làm cái gì rồi. Việc giải thích phải là xúc tích nhất.

## 2.Indentation

![](https://images.viblo.asia/7ae3f95e-242c-4fce-8327-4ec6c7990bfc.png)

Code tốt được cấu trúc như thể hiện trong hình. Nó phải là hiển nhiên cho người đang cố gắng hiểu đoạn code nơi đoạn code bắt đầu và nó kết thúc ở đâu để sau khi logic trở nên rõ ràng  thì cứ thế mà chiến.


## 3.Readme’s

Sẽ là rất phức tạp khi bạn có một project phải mất hàng giờ để thiết lập và thực hiện. Đây là lúc cần đến Readme, tốt hơn là nên có một đoạn giới thiệu ngắn gọn về dự án trước khi bạn đọc đến phần code của nó.
Một readme có cấu trúc chính xác như sau:
https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md

## 4.Naming Conventions

*  Nhiều lần chúng tôi gặp một lớp với cái tên Apimanager, nhìn vào đó thấy mục đích của lớp không rõ ràng. Theo các tiêu chuẩn hiện hành thì việc đặt tên theo SRP làm cho mọi việc trở nên dễ dàng và cụ thể hơn. Các quy ước đặt tên cũng nên thay đổi đối với các phạm vi khác nhau nếu một lớp đang thực hiện một số đơn vị công việc chuyên sâu để phân biệt khi nào và ở đâu một biến trở nên ngoài phạm vi chỉ bằng cách nhìn vào code.
* Sử dụng quy ước đặt tên có ý nghĩa cho tất cả ngoại trừ các đối tượng nhất thời. Tên của một lớp là thông tin về việc khi nào và làm thế nào để sử dụng các đối tượng.

## 5.Adjusting to timeframe

Các bước để nâng cao chất lượng code

![](https://images.viblo.asia/71e9b336-04d9-4b09-a859-95ad971f6c39.png)

* Good code là code được tổ chức tốt. Dữ liệu và các hoạt động trong các lớp phải phối hợp với nhau. Không có sự phụ thuộc giữa các lớp như “spaghetti.”
* Good code phải được kiểm tra kĩ lưỡng. Các phép thử làm nhiệm vụ thực thi các đoạn code trong các ví dụ thực hiện nó.
* Good code không phải là đoạn code “thông minh”. Nó cần phải được thực hiện đơn giản và rõ ràng nhất.
* Good code cần được thực hiện từ các đơn vị tính toán nhỏ và nó sẽ được sử dụng xuyên suốt trong các đoạn code khác.

Nguồn: https://medium.com/better-programming/good-code-vs-bad-code-35624b4e91bc