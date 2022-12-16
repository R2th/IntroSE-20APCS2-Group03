Khi mình có cơ hội phỏng vấn ở một số công ty kiểu cũng to to í :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: , thì quét SonarQube mỗi ngày là một quy định bắt buộc của họ. Vậy **SonarQube** là gì? Đơn giản nó là một công cụ scan code, để tìm ra các code “thúi” hoặc các code có thể bị vướng các luật security nghiêm trọng. Đôi khi các khách hàng cũng yêu cầu đội ngũ phần mềm phải xử hết bug từ kết quả quét SonarQube trước khi ký nghiệm thu.
Ở bài viết lần này, mình sẽ giới thiệu cách cài đặt SonarQube và quét các projects viết bằng Java.

#### Bước 1: Cài đặt JDK 11

-	Tải [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) và cài đặt vào ổ C:\Java

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/tkg3d5j8r_image.png)

-	Mở **Control Panel**, chọn **Advanced System Settings**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gl92l4a5pt_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/g9tn20skf8_image.png)

-	Set **JAVA_HOME**: đường dẫn cài đặt JDK

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/daywappqf2_image.png)

-	Set Path: đường dẫn chứa thư mục bin của JDK

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/xk3gs4b4ze_image.png)

#### Bước 2: Tải các package

-	Tải [SonarQube](https://www.sonarqube.org/downloads/) (bản Community)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8ei6xtaydh_image.png)

-	Tải [SonarQube-Scanner](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/) (bản Windows)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ogcgu0m7bq_image.png)

Các bạn giải nén tất cả và đổi tên thư mục thành sonarqube và sonar-scanner.
Copy tất cả các thư mục trên vào Program Files của ổ C.

#### Bước 3: Start server của SonarQube

Mở file sonar.properties tại **C:\Program Files\sonarqube\conf**. Bỏ comment lệnh ***#sonar.search.port=9001*** và đổi lại thành ***sonar.search.port=0***

Vào trong thư mục **C:\Program Files\sonarqube\bin\windows-x86-64**, tìm và chạy file **StartSonar.bat** để bật server sonarqube lên. Sau khi chạy thành công thì vẫn để cửa sổ chứ không được tắt.
Thấy dòng chữ **SonarQube is up** là thành công.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/w6474n6j6p_image.png)

#### Bước 4:  add sonarqube-scanner vào Path

Vào **Environment Variables** tương tự như bước 1. Tìm đến phần **Path**. Thêm đường dẫn chứa thư mục bin của sonar-scanner.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/va7p2s4arg_image.png)

Sau khi hoàn tất mở cmd và gõ command **sonar-scanner.bat -h**. Nếu ra như sau thì là ok:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kjq9lbzb0p_image.png)

#### Bước 5: Tìm và cài đặt gói ngôn ngữ cần test

Gõ địa chỉ [http://localhost:9000/](http://localhost:9000/). Đăng nhập ID/Password với **admin/admin**. Làm theo các bước sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/nyec4us0k3_image.png)

Nếu gói ngôn ngữ đó vẫn ở trạng thái **Install** (màu xanh), thì hãy cài đặt nó nhé.

#### Bước 6: Config sonar trong project

Mình sẽ lấy source của project [ChitChat](https://viblo.asia/p/xay-dung-ung-dung-chat-don-gian-tu-spring-boot-va-react-native-phan-4-xay-dung-giao-dien-chat-don-gian-RnB5pMm6KPG) mà đã được giới thiệu ở các bài viết trước để làm ví dụ.
Tạo 1 file config có tên là **sonar-project.properties** và có nội dung như sau:
```properties
# must be unique in a given SonarQube instance
sonar.projectKey=ChitChatAPI
# this is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
sonar.projectName=ChitChatAPI
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace “\” by “/” on Windows.
# This property is optional if sonar.modules is set.
sonar.sources=E:/Projects/Pet Projects/java/ChitChatAPI/src/main/java/com

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8

sonar.language=java
sonar.java.binaries=target/classes
```
Copy file này vào trong thư mục chứa source code, cụ thể ở đây là **E:/Projects/Pet Projects/java/ChitChatAPI**

#### Bước 7: Scan source

Tiếp theo mở cmd và cd đến thư mục trong sonar.source (nơi bạn đã copy file sonar-project.properties lúc nãy). Chạy lệnh **sonar-scanner** để chương trình test lỗi. Nếu trong quá trình chạy không báo lỗi gì thì ta đã thành công việc phân tích lỗi.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/pm0a100gv5_image.png)

Refresh lại trang [http://localhost:9000/](http://localhost:9000/), nhấn vào Projects, ta sẽ thấy báo cáo kết quả.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/6ict4gawpw_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/9zl0ewksx3_image.png)

Ở trang chi tiết của Project, ta có thể nhìn thấy rõ các Issues được phân loại theo **Bugs, Vulnerabilities, Security hay Code Smells**. Nhấn vào số lượng bugs ở mỗi loại, Sonar sẽ đưa ra cụ thể từng Issue nằm ở Class nào cũng như đề xuất giải pháp để sửa.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qygdljmclq_image.png)

Như ví dụ trên, Sonar khuyến cáo mình nên đổi tên biến **created_on** thành **createdOn**.

>Trong quá trình vọc, có bước nào chưa làm được, đừng ngần ngại comment cho mình bên dưới nhé :smiley::smiley::smiley: