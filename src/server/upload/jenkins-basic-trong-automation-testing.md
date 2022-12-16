Qua một vài dự án automation trong công ty, thì mình cũng vọc vạch một tý về việc sử dụng Jenkins để tạo ra những jobs đơn giản để chạy những testcase Automation trong dự án của mình. Mục đích của tài liệu này, là để note lại những kiến thức mà mình đã tìm hiểu được về Jenkins, cũng như có thể giúp các bạn chưa biết gì về Jenkin có thể có một chút kiến thức về mảng này thông qua tài liệu này. Trong tài liệu này mình sẽ hướng dẫn các bạn cài đặt Jenkins và tạo một jobs để chạy test Automation đơn giản.

### **1/ Cài đặt Jenkins:**
Jenkins là một open source free và khá là mạnh mẽ, hỗ trợ đủ các thể loại từ git, svn, java, C#… đầu tiên mình sẽ hướng dẫn các bạn từng bước để cài đặt Jenkins.

**Step 1**: Cài đặt JDK 8:
- Điều kiện cần đầu tiên là các bạn phải cài đặt JDK 8 trên máy của các bạn.
+ Ở bước này các bạn có thể download bộ cài đặt tại đây:
https://www.oracle.com/java/technologies/javase-jdk8-downloads.html 
+ Sau khi download xong thì các bạn thực hiện việc cài đặt.
+ Sau khi cài đặt xong, các bạn sẽ thực hiện cấu hình JAVA_HOME nhé. Các bạn có thể tham khảo tại đây: http://www.mkyong.com/java/how-to-set-java_home-on-windows-10/

**Step 2**: Cài đặt Apache Tomcat
- Các bạn có thể download Apache Tomcat tại link sau:
https://tomcat.apache.org/download-80.cgi 

![](https://images.viblo.asia/57093450-f50e-4572-bd75-ac641f6de3d2.PNG)

- Sau khi download file zip, các bạn thực hiện giải nén.
- Để RUN được Tomcat, các bạn chạy file startup.bat trong thư mục bin của tomcat

![](https://images.viblo.asia/651c192e-fd26-4863-ac65-f62e540ea2a3.PNG)

- Sau khi run file startup.bat, các bạn truy cập vào đường dẫn: http://localhost:8080/
Tomcat start thành công sẽ có giao diện như thế này:

![](https://images.viblo.asia/ad3826e1-9d82-40fb-b715-8656a71f7d4b.PNG)

**Step 3**: Cài đặt Jenkins
- Đầu tiên các bạn truy cập vào trang chủ của Jenkins để download file jenkins.war: https://jenkins.io/download/

![](https://images.viblo.asia/6fdc1a99-85b9-49d9-9a7a-ad80152ae13c.PNG)

- Sau khi download thành công file jenkins.war, các bạn bỏ nó vào thư mục webapps của Tomcat

![](https://images.viblo.asia/ffcafbb7-16ce-46a2-8ae4-df2040f8e3f0.PNG)

- Sau bước trên, các bạn thực hiện chạy file startup.bat để start Tomcat
- Sau đó truy cập vào jenkins: http://localhost:8080/jenkins/ để cấu hình nó
- Ở cửa sổ đầu tiên chúng ta cần nhập mặc khẩu mặc định.

![](https://images.viblo.asia/ea80d988-53fc-4071-8b43-d4664ed69f90.PNG)

- Mật khẩu này nằm ở đường dẫn các bạn đã thấy ở trên. Như mấy mình sẽ là:
*C:\Users\doan.ngoc.vu\.jenkins\secrets\initialAdminPassword*
- Sau khi nhập Password, sẽ qua phần cài đặt plugins cho Jenkins, và ở đây mình chọn option để jenkins tự động cài những plugins cần thiết hoặc sẽ cho phép người dùng tự chọn những plugin để cài đặt lên Jenkins.

![](https://images.viblo.asia/c96671c5-6b85-416a-b118-a2f6c1c11f24.PNG)

- Sau khi cài đặt thành công các plugins cần thiết, ta sẽ khởi tạo tài khoản Admin cho Jenkins

![](https://images.viblo.asia/8296f7af-17a9-40e3-875c-3fc18a74367b.PNG)

- Sau khi tạo thành công tài khoản Admin, các bạn sẽ được custom URL để access tới jenkins, các bạn có thể tùy chỉnh theo ý muốn, có thể để sau cũng được nhé.

![](https://images.viblo.asia/71acf74d-2a87-4926-8b18-eee4143978ea.PNG)

- Sau bước này thì đã xong việc config Jenkins.

![](https://images.viblo.asia/afd00b64-0b73-4f3b-9ef7-e6c81d6fee0c.PNG)

- Start using Jenkins để bắt đầu trải nghiệm nó:

![](https://images.viblo.asia/35dcfbdf-40c5-4d36-9d0d-0c3de4ab33d5.PNG)

### 2/ Những plugins cần thiết:
Ngoài những plugins mặc đình mình đã cài đặt ở bước trên. Mình sẽ cần phải cài thêm 1 vài plugins cần thiết để phục vụ cho dự án Automation của mình. Nói sơ qua về dự án Automation của mình, thì mình xây dựng dự án bằng Maven và sử dụng thư viện Cucumber Report để xuất report kết quả test cho dự án. Nên mình sẽ cài đặt thêm 1 số plugins sau:
* Git client plugin
* Maven Integration plugin 
* Cucumber reports

Để có thể cài đặt plugins bằng cách vào phần Manage Jenkins > Manage Plugins:

![](https://images.viblo.asia/ed0a5870-941a-42e1-9f30-de3a75efec04.PNG)

Lựa chọn những plugin cần thiết và thực hiện cài đặt:

![](https://images.viblo.asia/8f38335e-d9b2-4b4c-abf1-d6964aff8659.PNG)

### 3/ Tạo Jobs:

- Để tạo mới 1 jobs, các bạn vào phần New Item:

![](https://images.viblo.asia/d9eba53c-7932-4f5c-9a68-b59679ee5612.PNG)

- Bước tiếp theo Chọn loại job để cấu hình:

![](https://images.viblo.asia/46e743a7-9c0e-4195-8bab-7ab9d0ad9615.PNG)

- Bước tiếp theo ta sẽ cấu hình job để có thể chạy được file Scenario:

**1/ General**: Phần này sẽ điền thông tin của job

![](https://images.viblo.asia/639ba62f-8c29-4055-b76f-cff1bdfc9300.PNG)

**2/ Maven Info Plugin Configuration**: Phần này ta sẽ cấu hình cho Maven Plugins
- Mình sẽ nhập URL cho GitHub dự án

![](https://images.viblo.asia/557375d2-929b-4a8b-80dd-61e511718415.PNG)

**3/ Source Code Management**: Phần này mình sẽ chỉ ra repository để jenkins có thể clone source code về

![](https://images.viblo.asia/dc382e04-b084-4dac-9f3a-c04ab630d53c.PNG)

**4/ Builds**: Phần này sẽ chỉ ra đường dẫn của file pom.xml (File cấu hình của dự án), cùng với cài đặt command để thực hiện chạy test cho Job của chúng ta.

![](https://images.viblo.asia/607f54f6-7c71-48b5-ad72-7d4c7a9238d4.PNG)

- Source code sau khi được clone về sẽ nằm ở thử mục C:\Users\doan.ngoc.vu\.jenkins\workspace\, vì vậy ta sẽ trỏ về file pom.xml trong thư mục này.
- Phần Goals and options mình sẽ setting câu lệnh chạy test: -Dtest=Example_TestRunnerIT test
Câu lệnh này sẽ giúp Maven thực thi file test Runner là  Example_TestRunnerIT.java

**5/ Post-build Actions**: Phần này ta sẽ add Cucumber Reports, để sau khi chạy test sẽ xuất report cho chúng ta.

![](https://images.viblo.asia/48077b09-29c4-418b-b8a3-c4f880144931.PNG)

- Sau khi config xong Job, ta save lại những gì đã cài đặt.

### 4/ Run Job:

- Để RUN job sau khi config, các bạn bấm nút Build Now để chạy job đó

![](https://images.viblo.asia/fb5fa970-71c2-43d2-907e-c60a0dcbe02c.PNG)

- Job sẽ bắt đầu thực thi:

![](https://images.viblo.asia/54cbf5c5-7328-4f64-b960-a18d5aa28cdb.PNG)

- Sau khi chạy xong, các bạn có thể check report chạy test tại đây, report mình sử dụng trong dự án là Cucumber Report:

![](https://images.viblo.asia/7d54be3d-1e93-4d2e-b180-2e715070e2cc.PNG)

- Nội dung report sẽ hiển thị rõ ràng:

![](https://images.viblo.asia/dd8e87a1-3245-4654-88b0-0758b5205c00.PNG)

### 5/ Lời kết:
Qua bài viết này, mình đã giới thiệu Basic về sử dụng Jenkins trong Automation. Đây là cái nhìn sơ khai về sử dụng Jenkins trong Automation Testing. Bài sau mình sẽ giới thiệu rõ hơn về phần settings jobs. Cảm ơn các bạn đã theo dõi