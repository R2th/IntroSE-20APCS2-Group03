![image.png](https://images.viblo.asia/a192d98b-20f3-4788-9fdd-fe2ea709ebfc.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

`JAVA_HOME` là một thuật ngữ cơ bản và là điều cần làm đối với mọi Dev Java. Hãy xem cách bạn có thể thiết lập `JAVA_HOME` trong Windows 10.

1.  Tìm kiếm `path` và mở ứng dụng `Edit the system environment variables`.  (cách nhanh nhất: Bấn nút cửa sổ windown rồi gõ env)

![image.png](https://images.viblo.asia/b1c76916-9351-4a32-a77d-b38fab8f6fa1.png)

2\. Nhấp vào nút `Environment Variables…`.

![image.png](https://images.viblo.asia/fb35d606-0066-4ad6-80fb-a85befe8a755.png)

3\. Nhấp `New…` vào phần  `System variables`.

![image.png](https://images.viblo.asia/7996ac7a-661a-44a9-8f36-e83ac0414c68.png)

4\. Nhập thông tin biến

![image.png](https://images.viblo.asia/e3af19fd-10c4-4ec7-9340-2aa4cf8a6866.png)

4.1 Tên biến:`JAVA_HOME`

4.2 Value biến: Nhấp vào nút `Browse Directory` và chọn thư mục Bộ phát triển Java (JDK) của bạn.

4.3 Nhấp vào nút **OK**

5\. Thêm `JAVA_HOME` vào `Path`

![image.png](https://images.viblo.asia/efcbc932-5376-44e5-82ec-d8f742b12d7b.png)

5.1 Lựa chọn `Path`

5.2 Nhấp vào nút `Edit…`

5.3 Bạn sẽ thấy cửa sổ `Edit environment variable`

![image.png](https://images.viblo.asia/ce900c32-1ef2-4504-8ea9-40d00c5218be.png)

5.4 Nhấp vào nút `New`

5.5 Nhập `%JAVA_HOME%\bin`

5.6 Nhấp vào nút **OK** để đóng cửa sổ `Edit environment variable`

5.7 Nhấp vào nút **OK** để đóng cửa sổ **Environment Variables**

5.8 Nhấp vào nút **OK** để đóng cửa sổ **System Properties**

6\. Check xem cài được biến `JAVA_HOME** chưa`

6.1 Tìm kiếm `cmd` và mở ứng dụng  `Command Prompt`.**

![image.png](https://images.viblo.asia/9e44d8e9-515e-4fa5-8a27-d7216919ff1e.png)

6.2 Gõ `echo %JAVA_HOME%` và `Enter`

Một ứng dụng sẽ nhận dạng biến **JAVA\_HOME** và in ra đường dẫn của **JDK** bạn đã chọn trong bước `4.2`

![image.png](https://images.viblo.asia/e2f63ca9-3e39-4bb7-a10a-a25c5fd0703e.png)

7\. Check `javac` và `java`

bạn cũng có thể chạy lệnh để test `Java` và `Java Compiler` phiên bản trong cửa sổ **Command Prompt**.

7.1 Gõ `java -version` và `Enter`

7.2 Loại `javac -version` và `Enter`

Quá đợn giản đúng ko bạn! 

Ứng dụng Command Prompt sẽ in ra một số thông tin về phiên bản Java. VD: phiên bản của trình biên dịch Java.v.v.

![image.png](https://images.viblo.asia/f0f5ba9f-9024-4a9a-b9da-261cce05cdaa.png)

Cuối cùng, máy tính của bạn đã sẵn sàng cho Java. 

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉
# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog8-cach-cai-at-bien-javahome-tren.html