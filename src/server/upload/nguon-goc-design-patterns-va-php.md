Vào năm 1995, Erich Gamma, Richard Helm, Ralph Johnson và John Vlissides đã xuất bản một cuốn sách có tên - Design Patterns. Cuốn sách này mô tả 23 giải pháp:

> [những giải pháp đơn giản và tinh tế cho những vấn đề trong lập trình hướng đối tượng.]

Cuốn sách này đã thành công và tạo ra một nền tảng cho cái gọi là “phần mềm chuyên nghiệp”. Cuốn sách này cũng là khởi nguồn cho các cuộc tranh luận trong cộng đồng lập trình PHP về các file, class.

**Hoàn cảnh ra đời Design Patterns.**

Tác giả của Design Patterns đều là những lập trình viên kinh nghiệm. Có người nói rằng cuốn sách là sản phẩm của 4 tác giả khi cùng xem xét các vấn đề gặp phải khi triển khai hệ thống hướng đối tượng. Sau đó cùng đưa ra 23 giải pháp cho các vấn đề.

Cuốn sách ra đời năm 1995, điều đó nghĩa là lập trình hướng đối tượng sử dụng C++ thay vì C. 23 Pattern này được áp dụng cho lập trình hướng đối tượng trong C++.

Vậy tại sao chúng ta vẫn nói đến nó ngày hôm nay? Năm 1995 cũng là năm ra đời của ngôn ngữ java. Các kỹ sư của Sun Microsystems muốn java làm một số việc - một trong số đó là trở thành “tiêu chuẩn chính thức của lập trình hướng đối tượng”.

Từ rất sớm, sự phát triển của java đã chịu ảnh hưởng lớn của cuốn sách Design patterns. Một số lý do bởi Design Patterns đề xuất các giải pháp đúng đắn, một số khác bởi văn hóa muốn lập trình hướng đối tượng theo code của Design Patterns. Các lập trình viên và các công ty sẽ không chấp nhận việc code khác so với Design Patterns.

**Design Patterns và Giáo dục.**

Một trong những lý do thành công khác của Design Patterns là hệ thống giáo dục đại học. Một trong những vấn đề mà các trường đại học ở Mỹ hoặc châu âu phải giải quyết: Mục đích chính của giáo dục đại học là dạy cho sinh viên cách suy nghĩ sâu, rộng về các vấn đề học và họ cũng mong đợi sinh viên có thể đáp ứng tốt thị trường tuyển dụng.

Ngành khoa học máy tính nổi bật cho xu hướng. Ngành này được tài trợ bởi những gã khổng lồ như IBM, Microsoft, Apple. Những công ty này đầu tư vào giáo dục đại học và mong đợi nhận được các lập trình viên xuất sắc nhất. 

Java nhanh chóng được các trường đại học xem như là một ngôn ngữ để dạy sâu hơn về lập trình, trong khi vẫn chuẩn bị cho sinh viên để đáp ứng các công việc ở tầm trung sau khi ra trường.

Việc dạy về Design pattern trở nên phổ biến. Điều này làm cho cuốn sách thành công hơn và ngược lại.

**Design Patterns và Thị trường.**

Kế tiếp sự phát triển của những năm 1990, các trường đại học đào tạo ra các lập trình viên hiểu về java. Microsoft thông báo ra đời C# vào năm 2000. Được phát triển bởi các lập trình viên tài năng mà chịu ảnh hưởng của phong cách Design Patterns. Một số cuốn sách khác cũng tạo ra ảnh hưởng Patterns of Enterprise Application Architecture:

Tóm lược Design Patterns:
> [Làm thế nào để lập trình viên có thể kiểm soát C++]
Tóm lược về Patterns of Enterprise Application Architecture.
> [Làm thế nào để xây dựng một ứng dụng thành công trong một môi trường lớn]

Một vài thứ cần biết về môi trường lớn.

Người có quyền quyết định là tách biệt với những người thực hiện công việc.
Gần như không thể nói không với người có quyền quyết định.
Có một người không thể thay thế là một rủi ro không được chấp nhận.
Xu hướng phát triển như 1 team nếu nó mang lại sự ổn định.

Để thành công trong một môi trường phần mềm lớn (các công ty lớn), càng ít vi phạm những nguyên tắc trên càng tốt. Theo các design pattern có xu hướng chia function trong nhiều class, với một hệ thống lớn, điều này giúp có thể dễ dàng thay thế các class.

Như một cá nhân bạn có thể choáng trước một hệ thống với hơn 500 class files. Nhưng trong một môi trường lớn với một team khoảng 15 lập trình viên, tương đương 42 file mỗi người, với 2 ngày cho mỗi file, thay vì nói “không” chúng ta có thể nói, “ok, chúng tôi cần 3 tháng”.
**
**Design Patterns và lựa chọn của bạn.**
**
Vậy bạn có nên lập trình theo phong cách áp dụng design patterns ?

Đây là một câu hỏi sai, tư duy sai. Câu hỏi này tương tự như những câu hỏi.

Tôi có nên mặc áo mưa?
Tôi có nên đi giày trượt tuyết ?

Thiếu ngữ cảnh - nên các câu hỏi trên đều không thể trả lời.


Đó là hữu ích khi nghĩ đến phong cách lập trình theo design pattern, phong cách có thể làm lập trình viên khó chịu với nhiều class file cồng kềnh, nhưng đó là điều hiển nhiên trong các dự án của những công ty lớn. Nếu bạn gặp giám đốc của các công ty như IBM, Oracle, eBay, họ sẽ mong đợi nhìn thấy code của bạn theo phong cách như vậy. Trong những môi trường này, nếu bạn đưa ra một hệ thống đơn giản hơn như laravel, bạn sẽ đối mặt với nhiều khó khăn. Bởi giám đốc sẽ e ngại thứ gì đó mà không giống java. Hoặc giám đốc sẽ cảnh giác với những nền tảng được kiểm soát bởi một cá nhân không thể thay thế. Đó là cái giá để gia nhập những công ty lớn.

Lời khuyên cho bạn? Bạn nên học và làm việc với cả code theo design pattern và theo cách đơn giản hơn, trực diện hơn. Khi bạn thấy vài mã nhìn ngu ngốc - hãy đặt bản thân vào tình huống thực hiện. Những điều ngu ngốc trong lập trình thường được đưa ra bởi những người thông minh vì một vài lý do.

**Kết Luận.**

Áp dụng design pattern hay không phụ thuộc vào bạn, vào hoàn cảnh, lý do sử dụng. 

xem thêm tại: https://nguyenvancan.com/2020/10/31/nguon-goc-design-patterns-va-php/