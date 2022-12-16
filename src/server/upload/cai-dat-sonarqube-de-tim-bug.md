## Giới thiệu về SonarQube

SonarQube là một nền tảng mã nguồn mở để quản lý chất lượng mã nguồn. SonarQube hỗ trợ khá nhiều ngôn ngữ: Java, C#, C/C++, PL/SQL, Cobol, ABAP…
### Kiến trúc SonarQube
SonarQube platform gồm 3 thành phần:
- Database lưu trữ:
Cấu hình của SonarQube (security, plugins settings, etc.)
Quality snapshots của các dự án
-  Web Server giúp người dùng xem xét trạng thái chất lượng của các dự án một các trực quan và giúp người dùng cấu hình Sonar
- Một hoặc vài Analyzers dùng để phân tích chất lượng.

![](https://images.viblo.asia/34bc4f59-7031-4a98-89bc-25af45c988cd.jpg)

## Cài đặt SonarQube bằng bản cài trên Windows.

### Cài đặt database

Sonar có thể làm việc được với nhiều loại DBMS khác nhau, để đơn giản hóa và thống nhất thì chúng ta sẽ chỉ dùng MySQL bản opensource.
Việc cài đặt MySQL không được đề cập đến trong tài liệu này, chỉ có lưu ý về việc sử dụng engine InnoDB cho tất cả các table của database.
Để đạt được hiệu năng cao cho DB của Sonar, làm 2 bước sau:
1. Set giá trị Maximum của RAM cho parameter: `innodb_buffer_pool_size`
2. Set giá trị ít nhất 15Mb cho parameter:` query_cache_size`

### Cài đặt webserver của SonarQube

Download Web Server tại [địa chỉ](http://www.sonarqube.org/downloads/)

Sau đó khi giải nén file, bạn nhận được 1 thư mục unzip tại địa chỉ: **<install_directory>**


#### Cấu hình kết nối với database:

Sửa file `<install_directory>/conf/sonar.properties` để cấu hình các tùy chọn kết nối tới database. Trong file này sẽ có đầy đủ templates cho tất cả các database mà Sonar hỗ trợ, tuy nhiên sẽ chỉ có một kết nối duy nhất đươc sử dụng, với MySQL thì phần cầu hình sẽ như sau:

```bash
sonar.jdbc.username=sonar
sonar.jdbc.password=sonar
#----- MySQL
sonar.jdbc.url=jdbc:mysql://localhost:3306/sonar?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useConfigs=maxPerformance
```

Port mặc định sẽ là  `"9000"` và context path mặc định là `"/"`. Các giá trị này có thể được thay đổi bằng cách thay đổi các giá trị trong file `<install_directory>/conf/sonar.properties. `

```bash
sonar.web.host=192.0.0.1
sonar.web.port=80
sonar.web.context=/sonar
```

#### Bật SonarQube
Chạy file bat `<install_directory>/bin/windows-x86-XX/StartSonar.bat` để khởi động Web Server. Sau khi hoàn thành cấu hình, có thể truy cập địa chỉ sau để xem server Sonar (Mặc định): http://localhost:9000/ với account / password là `admin / admin`.

### Cài đặt SonarQube bằng Docker

Nếu bạn đã cài sẵn Docker trên máy thì bạn có thể sử dụng cách đơn giản hơn đó là dùng `Docker image` có sẵn của SonarQube để dựng webserver lên.

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:8.2-community
```
BÙM, như vậy là xong, bạn chỉ cần chờ SonarQube khởi động vào truy cập vào web để sử dụng.
### Đưa SonarQube vào dự án của bạn

Để bắt đầu sử dụng SonarQube, bạn cần tạo 1 project trên web để lấy token và setup các rules cho SonarQube.
Truy cập http://localhost:9000/projects/create để tạo project 
![](https://images.viblo.asia/5ecc7590-dfb4-4148-a432-63417ff6148c.png)

Sau bước tạo project sẽ là tạo token,
![](https://images.viblo.asia/1fb9f30b-e854-41c5-af68-e0598d2a707b.png)
![](https://images.viblo.asia/c2181928-1cb3-4bcf-82cd-af76f1faa64b.png)

và [vào đây](http://redirect.sonarsource.com/doc/install-configure-scanner.html) để tải SonarRunner

như vậy là hoàn thành bước đầu tiên,
việc tiếp theo chỉ cần vào thư mục dự án và chạy 
```bash
sonar-scanner \
  -Dsonar.projectKey=test-project \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=xxx
  ```