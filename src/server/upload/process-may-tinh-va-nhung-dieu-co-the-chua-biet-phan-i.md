Chào anh em một buổi sáng đầy năng lượng. Lý do mình viết bài chia sẻ này vì có 2 vấn đề mình thấy rất nhiều bạn gặp phải 
1. Các bạn thường hiểu sai về khái niệm process khi thảo luận những chủ đề liên quan đến xử lý trong lúc coding hoặc khi đọc các bài chia sẻ có nhắc tới **Process**...
2. Một số trường hợp vì hiểu sai nên trong việc benchmark và tối ưu hệ thống thường gặp cản trở khi tìm nguyên nhân gây slow down

Nên thông qua bài viết này mình mong có thể giúp các bạn hiểu rõ hơn về **Process**, cách Process hoạt động cũng như việc ứng dụng **Multi-Process** như thế nào để tối ưu hoá application mà các bạn đang phát triển. Trong bài viết mình xin phép một số thuật ngữ mình sẽ không dịch ra tiếng Việt để tránh việc các bạn hiểu nhầm và dễ dàng hơn trong việc tìm hiểu các vấn đề khác có liên quan

Vậy thực ra **Process** là gì? Mình xin giải thích ngắn gọn: một **Process** trong máy tính của bạn chính là là một chương trình mà bạn đang chạy ví dụ browser bạn đang mở, trình nghe nhạc hoặc 1 game nào đó bạn đang chơi và các **Process** này được thực thi bởi một hoặc nhiều **Thread**. Một Process sẽ bao gồm mã chương trình (program code) và các hoạt động của nó. Tùy thuộc vào hệ điều hành (**OS**), một Process có thể được tạo từ nhiều **Thread** để thực thi các lệnh một cách đồng thời.

![](https://images.viblo.asia/684b26c4-f0e8-4bc3-b55b-f222665b751c.png)

Khi các bạn phát triển một game hoặc ứng dụng nào đó thì một chương trình như vậy sẽ bao gồm các chỉ dẫn. Bản chất các chỉ dẫn này chính từ các dòng code thần thánh của anh em :joy:. Và khi chương trình đó chạy thì nó chính là 1 **Process** và cũng là việc thực thi các dòng code đó. Thường chúng ta có thể thấy một chương trình đang chạy sẽ tương ứng với một **Process**, nhưng một số chương trình có thể chạy nhiều **Process**. Ví dụ anh em có thể thấy như trong tấm hình ở trên sẽ có nhiều **Process** của trình duyệt Chrome đang chạy

Một Process sẽ bao gồm nhiều thành phần để cho phép nó thực thi các tác vụ (**Task**) cụ thể, bao gồm: 
* Stack là nơi để chứa các dữ liệu tạm thời ví dụ như params của method/function, local variables (biến cục bộ), địa chỉ trả về 
* Heap là bộ nhớ được cấp phát động cho **Process** trong thời gian chạy (**runtime**)
* Text là nơi chứa thông tin các hoạt động hiện tại thể hiện bằng giá trị của bộ đếm chương trình (**Program Counter**) và nội dung các thanh ghi của bộ xử lý (**Processor's Registers**) 
* Data là nơi chứa các biến toàn cục (**Global variable**) và biến tĩnh (**Static variable**)
![](https://images.viblo.asia/ec05fc83-1bfb-450f-a993-70426b688d22.png)

Trong bài viết tiếp theo mình sẽ đi tiếp với anh em để cùng tìm hiểu về khái niệm Multitasking (dịch ra là đa tác vụ :grin:) khi các chương trình cần được xử lý đồng thời thay vì xử lý tuần tự (kiểu như nghe nhạc thì chỉ nghe nhạc không code được và ngược lại). Have a nice day :innocent: