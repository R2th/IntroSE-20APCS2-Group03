## 1. Road map

Để trở thành một Java Web Developer, chúng ta cần có kiến thức và kinh nghiệm không chỉ mỗi Java mà còn nhiều lĩnh vực liên quan khác. Ví dụ như Java chạy trên JVM thì chúng ta cần biết JVM là gì và kết nối thế nào đến OS phía dưới, làm thế nào OS thread map được với JVM thread, khi viết API thì chúng ta cần biết web browser hoạt động như thế nào và làm sao request từ browser được gửi đến controller, cứ như thế lại sinh ra nhiều câu hỏi khác về web server, Apache hay Nginx, vân vân và mây mây...

> Đi càng xa thì biết càng ít - Lão Tử 

Kiến thức nhiều như thế nên đôi khi chúng ta không biết chúng ta cần bổ sung những kiến thức gì để trở thành một qualified Java Web Developer, thế nên bằng sự giúp sức của cộng đồng các tiền bối đi trước, thật may mắn là chúng ta có được [roadmap](roadmap.sh) như hình dưới:

![image.png](https://images.viblo.asia/8aa7e1a8-e40c-43b5-a0d6-0bb7146b5b50.png)

Xem thêm:
- [How to master Java roadmap](https://coggle.it/diagram/X-dDo1Qdf7DCP2zg/t/how-to-master-java/a3c8bede6822097b7f3c6340b82eabd7986c57af4d42f11c122d5065479d5928)

## Resources
Tất nhiên là thật khó để ngồi search từng từ khóa rồi học được, vì chúng ta không có giáo trình cụ thể, không biết học như thế nào là "đủ" để dừng lại chuyển sang chủ đề kế tiếp. Vì thế nên mình xin được giới thiệu một số resources để mọi người có thể tham khảo.
### [Think Java: How to Think Like a Computer Scientist](https://greenteapress.com/thinkjava6/thinkjava.pdf)
Một cuốn sách rất phù hợp cho những người mới bắt đầu tiếp cận ngôn ngữ lập trình Java, các khái niệm được giải thích vô cùng đơn giản và dễ hiểu.

### [OCA  Java](https://github.com/indrabasak/Books/blob/master/OCA%20Java%20SE%208%20Programmer%20I%20Certification%20Guide.pdf)

Một cuốn sách rất chi tiết về Java8, nếu bạn đang trong quá trình thi chứng chỉ OCA của Oracle lại càng phù hợp. 

![image.png](https://images.viblo.asia/e50c803d-510a-42af-93fa-27e0614a32ae.png)

### [Effective Java](https://kea.nu/files/textbooks/new/Effective%20Java%20%282017%2C%20Addison-Wesley%29.pdf)
Cuốn sách được xem là kinh thánh của ngôn ngữ Java (must read, highly recommend), giúp bạn khai thác tối đa những tính năng ngôn ngữ Java có + best practice ... Ngay cả cha đẻ Java `james gosling` cũng từng ngạc nhiên khi đọc cuốn sách này, vì có những cái mà ngay cả ông cũng.. không biết.

![image.png](https://images.viblo.asia/db368f50-e406-4ec9-9f1c-793a9c6f8ea4.png)

### [Java 8 in action](https://github.com/WILIBAC/book-1/blob/master/%5BJAVA%5D%5BJava%208%20in%20Action%5D.pdf)
Hầu hết chúng ta đều biết java8 là một cuộc cách mạng lớn nhất thay đổi hoàn toàn ngôn ngữ này, chúng ta có thư viện DateTime tốt hơn, chúng ta có Stream ngắn gọn dễ hiểu hơn, chúng ta có parallelStream nhanh hơn, chúng ta có functional interface như một cải tiến của anonymous class để thích ứng với xu hướng functional programming trên toàn thế giới và nguyên lí hình thành thì được cuốn sách này mô tả một cách chi tiết và đầy đủ. 
Bonus: 
- Java8 cải thiện performance của `HashMap` bằng việc thay đổi datastructure.
- Java8 bạn không cần phải lo lắng cho việc init `new ArrayList()<>` cho field trong Object bằng việc bỏ đi default capacity cho đến khi phần tử đầu tiên được thêm vào ...

![image.png](https://images.viblo.asia/74c971cf-d744-49cb-9c50-7ed54041bf92.png)

Ai muốn xem thêm sách vở về java có thể tham khảo ở [đây](https://www.javadevjournal.com/java/best-java-books/).

### [Java Under The Hood](https://www.artima.com/java/index.html)
Dành cho những ai muốn đi sâu vào nghiên cứu JVM, Bytecode, Garbage Collector...

### [Baeldung Tutorials](https://www.baeldung.com/java-tutorial)
Có lẽ trang này quá nổi tiếng cho cộng đồng lập trình viên Java và Spring...

### [Problem Solving Skills](https://gist.github.com/lujanfernaud/d36b41baa25ade48aa5bbd37d4060a00)
Bên cạnh việc có thêm kiến thức thì việc cải thiện kĩ năng giải quyết vấn đề cũng quan trọng không kém..

Mọi người ai biết thêm gì hay thì để lại comment ở dưới nhé. Cảm ơn mọi người đã đọc. Happy Coding! 😍😂😅