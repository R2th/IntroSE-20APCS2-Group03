Để có thể [tự học lập trình](https://vntalking.com/) dễ dàng thì bạn không thể bỏ qua khái niệm JDK. Tìm hiểu sơ qua về JDK nhé các bạn. JRE, JDK, Java khác nhau chỗ nào? JDK là dùng cho mục đích phát triển (lập trình, debug), nếu bạn chỉ cần chạy chương trình Java thì không nhất thiết phải cài JDK mà chỉ cần cài JRE.
## JDK là gì?

JDK  viết tắt của Java Development Kit  là một bộ phần mềm cung cấp môi trường phát triển ứng dụng viết bằng ngôn ngữ Java. JDK bao gồm cả Java Runtime Environment giúp lập trình viên có thể chạy thử để kiểm tra ứng dụng trong quá trình phát triển ứng dụng.

## JDK, JRE, Java, Java Virtual Machine và Java Compiler có gì khác nhau?

JDK = JRE + Các công cụ hỗ trợ phát triển ứng dụng
Java compiler là một trong số các công cụ hỗ trợ phát triển ứng dụng của JDK. Java compiler được sử dụng để biên soạn các tập tin Java (đuôi .java) để tạo ra tập tin .class tương ứng.

### Các gói JDK

Sau khi chọn phiên bản Java, bạn cũng sẽ cần chọn gói Java muốn sử dụng. Các gói là các Java Development Kit dành cho các kiểu phát triển khác nhau. Các gói có sẵn là Java Enterprise Edition (Java EE), Java Standard Edition (Java SE) và Java Mobile Edition (Java ME).

JVM (Java Virtual Machine): là máy ảo Java. Nó được dùng để thực thi các chương trình Java.

Mỗi nền tảng/hệ điều hành khác nhau (Windows, IOS, Linux…) lại có một loại JVM khác nhau. Hiểu nôm na thì các chương trình Java của các bạn chạy trên JVM. Nói Java đa nền tảng, thực chất thì nó được hỗ trợ JVM trên nhiều nền tảng. Chương trình Java chạy được trên Window/Linux/IOS vì nó có JVM chạy được trên các nền tảng đó.

Thông thường, một phiên bản JDK sẽ chứa Java SE. Nếu bạn tải xuống Java EE hoặc Java ME, bạn sẽ có một phiên bản Java SE tiêu chuẩn. Ví dụ, Java EE là nền tảng tiêu chuẩn với các công cụ bổ trợ tiện ích cho phát triển ứng dụng doanh nghiệp như Enterprise JavaBeans hay hỗ trợ cho Object Relational Mapping.

Việc chuyển đổi từ JDK này sang JDK cũng không có gì khó khăn. Vì vậy, bạn không cần phải quá lo lắng về việc chọn đúng phiên bản và gói JDK ngay từ đầu.

>>> Đọc thêm: [Download java jdk](https://vntalking.com/huong-dan-download-va-cai-dat-jdk-java-development-kit.html)

### JDK trong câu lệnh
Cài đặt JDK và JRE sẽ thêm lệnh java vào command của bạn. Bạn có thể xác minh bằng cách mở command shell và gõ java -version, bạn sẽ nhận được phiên bản Java vừa cài đặt. (Trong một số trường hợp, bạn sẽ phải khởi động lại hệ thống để nhận các thay đổi).
Ngoài ra. bạn cũng sẽ cần javac này để biên dịch các tệp Java của bạn.
### Lệnh javac
Lệnh javac nằm trong thư mục "/jdk", nhưng sẽ không được tự động thêm vào path của hệ thống trong khi cài đặt. Bạn sẽ có tùy chọn để tự cài đặt javac hoặc cài đặt một IDE có chứa lệnh này.

Đừng quên theo dõi khóa [học lập trình](https://vntalking.com/hoc-lap-trinh) bên Vntalking nhé!