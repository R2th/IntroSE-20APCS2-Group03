# Mở đầu
Chào mọi người, mình có bỏ chút ít thời gian để tìm hiểu về Java và đã hiểu thêm được một ít kiến thức về Java platform independent.

Việc đầu tiên của chúng ta khi bắt đầu học một ngôn ngữ bắt kì luôn là in ra câu "Hello world!". Và sau khi in ra được câu "Hello world!", chắc hẳn chúng ta luôn có cảm giác thỏa mãn đúng không nào.

![](https://images.viblo.asia/292843d4-8d63-4281-93f5-70b58f73d2b9.jpg)

Nhưng rất nhiều người trong chúng ta quên rằng, phần kết quả hiển thị trên màn hình cũng chỉ như là phần nổi của một tảng băng chìm mà thôi. Chúng ta cũng nên biết thêm chút ít về "phần chìm" của tảng băng, dù không cần chuyên sâu nhưng cũng đủ để trả lời thêm một vài câu hỏi hay tỏ ra nguy hiểm khi đi phỏng vấn phải không nào.

Trước tiên, câu hỏi đưa mình đến với việc tìm hiểu này là: "Tại sao Java source code có thể chạy được trên tất cả các hệ điều hành?".

Và sau khi tìm hiểu trên Internet, mình đã biết được phần nào đó lý do, đó chính là nhờ có **Java virtual machine**. Vậy **Java virtual machine** là gì? Và vì sao nó lại giúp cho Java có thể chạy trên tất cả các hệ điều hành?

# Java virtual machine
Java virtual machine (JVM) là một phần mềm dùng để thực thi các chương trình như một cổ máy thực sự. Các chương trình Java sử dụng chúng một cách trừu tượng và không trực tiếp truy cập vào hệ điều hành. Điều quan trọng ở đây, là JVM phụ thuộc vào mỗi hệ điều hành khác nhau. Vì vậy bạn cần phải cài đặt bản JVM tương ứng với hệ điều hành mà mình đang chạy.

![](https://images.viblo.asia/9cc59fb0-d615-4d68-b56e-edd45a8ba339.png)

# Java compiler
Và JVM không thực thi trực tiếp các chương trình, mà sẽ thông qua một quá trình khác. Chương trình Java sẽ được biên dịch thành các *bytecode* bởi Java compiler. Sau đó, JVM mới phiên dịch *bytecode* để thực thi chương trình. Và đây là quy trình cụ thể hơn về việc thực thi một chương trình Java.

![](https://images.viblo.asia/88de5ac8-f3a5-4cb3-b81f-e219a55f27f9.png).

# Quy trình thực thi
Một chương trình, hay đoạn code dù cho là được viết bằng ngôn ngữ lập trình gì, thì ngôn ngữ này cũng chỉ đang ở mức độ mà mỗi con người có thể đọc và hiểu (Đôi khi điều này cũng không đúng :laughing:). Nó có thể gồm các mệnh đề so sánh, tính toán hay các đoạn block, dù là gì thì máy vẫn không thể hiểu được.

Và để cho máy có thể hiểu được một chương trình, chúng cần được biên dịch thành ngôn ngữ dành cho máy. Và đây chính là vai trò của Java compiler và JVM.
Đầu tiên, Java compiler sẽ biên dịch chương trình thành các *bytecode*. Vậy nhiệm vụ của Java compiler chính là chuyển đổi source code cho một chương trình khác từ ngôn ngữ lập trình sang ngôn ngữ có thể thực thi được. Và tiếp đến, output này có thể là một chuỗi lệnh có thể được thực thi trực tiếp bởi CPU hoặc nó cần thông qua một bước thông dịch nữa bởi JVM để có thể thực thi được.

 Vậy tổng quan các bước để thực thi một chương trình Java được tóm tắt như sau:
1.  Trước tiên Java compiler sẽ biên dịch mã nguồn, tạo ra các **bytecode**.
2.  Và tiếp theo **bytecode** có thể sẽ được thực thi trực tiếp bởi CPU hoặc được phiên dịch thành các đoạn code có thể thực thi được bởi JVM.
3.  Cuối cùng là chương trình được thực thi và cho ra kết quả cuối cùng.
 
# Kết
 Qua những gì mình đã trình bày ở trên, thì thực ra nếu không có Java compiler cũng như JVM không tương thích với hệ điều hành, thì việc thực thi các chương trình Java trên các hệ điều hành khác nhau là không thể. Chính việc có thể chạy trên mọi hệ điều hành, đã làm cho Java trở thành một nền tảng độc lập.
 
 Đây là những gì mình hiểu được, nếu có gì thiếu sót hay chưa chính xác, vui lòng góp ý ở phần bình luận. Cảm ơn các bạn đã theo dõi.
 
###  Tham khảo
[Nguồn](http://www.vogella.com/tutorials/JavaIntroduction/article.html).