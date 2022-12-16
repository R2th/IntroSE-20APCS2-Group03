Trong bài viết này, tôi sẽ hướng dẫn cách tạo một project với Spring boot kết hợp với Thymeleaf và Elasticsearch sử dụng HTTP/2:

Công cụ và thư viện được sử dụng trong bài viết:
+ Spring boot 2.7.4
+ Spring tool suite 4
+ Spring data elasticsearch 4.4.2
+ Maven 3
+ Java 11
+ Elasticsearch 7.17.6
+ Nssm
+ Elasticsearch head extension

## 1. Cài đặt Elasticsearch:

Vui lòng tham khảo bài viết bên dưới để cài đặt elasticsearch:

https://viblo.asia/p/tao-mot-project-voi-spring-boot-va-elasticsearch-841-su-dung-thu-vien-spring-data-elasticsearch-huong-dan-cai-dat-va-su-khac-nhau-giua-2-phien-ban-8xx-voi-7xx-elasticsearch-Rk74aRXvJeO

Trong bài viết này tôi sẽ hướng dẫn thêm cách tạo 1 service để khởi động elasticsearch:

+ Mở Command Prompt với quyền "Administrator"

+ Nhập câu lệnh như sau:

      sc.exe create ElasticsearchService binPath="G:\elasticsearch-7.17.6\bin\elasticsearch.bat
      
Trong đó: 
+ "ElasticsearchService" là tên service bạn muốn đặt   
+ binPath: Đường dẫn tới file khởi động elasticsearch(elasticsearch.bat)

Tiến hành chạy câu lệnh bên trên và kết quả:

![image.png](https://images.viblo.asia/3c0a5436-76d4-456c-a42b-e65d226ad90d.png)

Kiểm tra xem service với name "ElasticsearchService" đã được tạo thành công chưa, nhấn tổ hợp phím "WIN + R" -> nhập "services.msc" và click "OK":

![image.png](https://images.viblo.asia/54422785-ced6-4b6e-945a-e463fea6b1e0.png)

Ta thấy service với tên "ElasticsearchService" đã được tạo thành công:

![image.png](https://images.viblo.asia/637146f0-56b4-4724-a1af-120824a683c1.png)

Tiến hành Start service lên:

![3.png](https://images.viblo.asia/a6fcb0c1-d4c0-463a-8877-b522f94bc689.png)

Như các bạn thấy, khi tôi start service thì báo lỗi như ở trên, với trường hợp này tôi sẽ dùng một công cụ khác để hỗ trợ việc tạo và start service thành công

Tôi dùng công cụ NSSM:

Link download: https://nssm.cc/download

Chọn bản mới nhất:

![image.png](https://images.viblo.asia/6216f319-a457-41f9-9c69-1536808e442d.png)

Sau khi tải xong nssm, tiến hành giải nén, cấu trúc thư mục nssm như bên dưới:

![image.png](https://images.viblo.asia/59b4080e-98c9-4c6f-adc2-c82b5d12b4f6.png)


Tiếp theo để tạo service, trong thư mục nssm tôi vào thư mục "win64"(nếu bạn nào còn xài windows 32 bit thì chọn thư mục "win32", còn xài windows 64 bit thì chọn cái nào cũng được)

Trong thư mục "win64" có file "nssm.exe", tại đây các bạn mở Command prompt lên hoặc có thể dùng Powershell bằng cách nhấn giữ phím Shift -> click phải chuột chọn "Open PowerShell ....", nếu xài windows 10 thì chọn "Show more options -> chọn "Open PowerShell ...."

Tại giao diện Command prompt, với service name "ElasticsearchService" vừa tạo ở trên có thể dùng lệnh nssm để remove service đó ra và tiến hành tạo service mới nếu vẫn muốn dùng tên service "ElasticsearchService":

    nssm remove ElasticsearchService
    
![image.png](https://images.viblo.asia/327f4312-b75b-4803-a089-626889f4f2b8.png)    

Chọn "Yes" tại popup "Remove the service"

Sau khi remove ta tiến hành tạo một service mới, ở đây tôi sẽ đặt tên service khác:

    nssm install ESService
    
![image.png](https://images.viblo.asia/87ec6f6f-3ec3-4a74-a2bf-be71b6dc40b9.png)

Sau khi chạy câu lệnh ở trên sẽ show popup như hình, các bạn cần thiết lập đường dẫn đến file khởi động của Elasticsearch, sau khi nhập đường dẫn -> click "Install sevice"

![image.png](https://images.viblo.asia/be2a25ae-af3f-431f-b2b1-4bfd97a8d272.png)

Thông báo service được cài đặt thành công, vào giao diện "Services" kiểm tra:

![image.png](https://images.viblo.asia/d79f617a-a168-4b5e-9327-35ae3a693cf2.png)

Service mới được tạo thành công, tiến hành start service:

![image.png](https://images.viblo.asia/3b4e8e8e-42f1-4c06-acbf-230412cb935f.png)

Service được start thành công

Kiểm tra Elasticsearch đã được khởi động thành công hay chưa, tại trình duyệt nhập đường dẫn "localhost:9200":

![image.png](https://images.viblo.asia/909d303c-e52f-44fd-b171-da81e3169ee7.png)

=> Elasticsearch đã được khởi động thành công

Tiếp tục mở extension Elasticsearch head để kiểm tra xem trang thái:

![image.png](https://images.viblo.asia/d388e2cb-00f4-42b7-b51a-5096ae497b3e.png)

## 2. Cấu trúc thư mục project:

![image.png](https://images.viblo.asia/d170c8dd-23a7-4e23-875c-70bc163f40b5.png)

Mặc định, tập tin cấu hình sẽ là "application.properties", nếu muốn chuyển đổi sang "application.yml" -> click phải chuột vào tập tin "application.properties" -> chọn **"Convert .properties to .yaml"**

## 3. Tạo 1 package với tên "com.example.thymeleaf.application":

Nội dung class "ThymeleafApplication":

![image.png](https://images.viblo.asia/2724ce1b-4c4b-4f82-9dbd-2b562600c077.png)

## 4. Tạo 1 package model với tên "com.example.thymeleaf.model":

Tại đây, tạo 1 class tên "User" với nội dung:

![image.png](https://images.viblo.asia/7f7b6379-df0c-4f10-b263-6e04614692af.png)

## 5.  Tạo 1 package repository với tên "com.example.thymeleaf.repository":

Tại đây tạo 1 interface "UserRepository" với nội dung:

![image.png](https://images.viblo.asia/da4de6b9-55fe-4f07-9e2e-7631a574cb0c.png)

Để biết nhiều thông tin hơn về repository các bạn có thể xem lại bài viết này:

https://viblo.asia/p/tao-mot-project-voi-spring-boot-va-elasticsearch-841-su-dung-thu-vien-spring-data-elasticsearch-huong-dan-cai-dat-va-su-khac-nhau-giua-2-phien-ban-8xx-voi-7xx-elasticsearch-Rk74aRXvJeO

## 6.  Tạo 1 package controller với tên "com.example.thymeleaf.controller":

Tại đây, tạo 1 class controller tên "UserController" với nội dung bao gồm các chức năng cơ bản **"Thêm - Xem thông tin user"**

![image.png](https://images.viblo.asia/0c0d13fe-d06c-4cd5-a15a-c33dbbd4a290.png)

## 7. Tạo 1 trang login đơn giản với Thymeleaf:

Nguồn tải template: https://colorlib.com/wp/html5-and-css3-login-forms/

Sau khỉ tải template về sẽ gồm những thư mục - tập tin:

![image.png](https://images.viblo.asia/e76db7da-c0f5-470b-8b4a-3c794e7ad301.png)

Sao chép tất cả thư mục sources đến thư mục "static" trong "resources" của project:

![image.png](https://images.viblo.asia/07d47128-ac35-4777-ac06-8567c3b54651.png)

Riêng file "index.html" sao chép đến thư mục "templates" trong thư mục "resources":

![image.png](https://images.viblo.asia/149ca581-0656-4829-a5e6-258a8e1c0536.png)

Sau khi thực hiện xong các bước trên, tiến hành tạo 1 request mapping trong "UserController" để load trang "index.html":

![image.png](https://images.viblo.asia/83b1eecb-ec45-4c81-a17d-3d34c8a077e4.png)

Mặc định, spring sẽ tự động load page trong thư mục "templates", muốn load page nào thì nhập đúng tên page cần load

Tôi sẽ kiểm tra thử xem thymeleaf có hoạt động chưa, tại "UserController" tôi sẽ dùng Model để thêm 1 giá trị và tại "index.html" dùng thư viện thymeleaf để load giá trị đó:

![image.png](https://images.viblo.asia/b25aab74-3efa-4dea-8913-1a7a4b8c9ff3.png)

Trong file "index.html" chúng ta cần thêm **"xmlns:th="http://www.thymeleaf.org""** trong html tag và tại đây tôi sẽ thêm 1 tag với nội dung **"<h2 th:text="${name}"></h2>"**, trong đó:

+ Biến giá trị "name" chính là name attribute tôi đã tạo trong UserController

+ "th:text" chính là thư viện được hỗ trợ bởi Thymelead để in giá trị từ Model

![image.png](https://images.viblo.asia/14913e4a-5981-4223-bf8d-542c70340b20.png)

Bây giờ, restart lại project và kiểm tra:

![image.png](https://images.viblo.asia/347d8636-852d-437e-94e7-47f81b4d101e.png)

Như các bạn thấy, thay vì tải trang "index.html" thì lại trả về nội dung là "index". Lý do là vì trong class UserController sử dùng annotation "@RestController", với annotation "@RestController" với giá trị trả về là "index" -> nó sẽ chỉ hiểu là trả về nội dung là "index". Ngược lại, với annotation "@Controller" nếu giá trị trả về là "index" nó sẽ chỉ hiểu là tìm đến trang html với tên là "index" trong thư mục "templates" và nếu trả về tên giá trị không nằm trong thư mục "templates" -> sẽ báo lỗi

Bây giờ tôi sẽ thay annotation "@RestController" đến annotation "@Controller" với giá trị trả về là "index" ->  chắc chắn lúc này page "index.html" sẽ được tải thành công:

![image.png](https://images.viblo.asia/ab35edf3-1f51-44ee-a364-1492f98127ed.png)


![image.png](https://images.viblo.asia/72b671d6-eeec-4d76-b584-554ddfa1e246.png)

Các bạn thấy, page "index.html" được tải thành công, giá trị từ biến "name" được in ra thành công

Tiếp tục, tôi sẽ sửa lại code html cho phần form kết hợp với những thuộc tính được hỗ trợ từ Thymeleaf cho page "index.html"

![image.png](https://images.viblo.asia/3c9d9fd4-1195-4a9c-ab9c-8b14ce5c9bf4.png)

Tôi sẽ phân 1 vài thuộc tính Thymeleaf hỗ trợ mà tôi sử dụng:

+ th:action: Chỉ định mapping tại controller sẽ nhận form data, ở đây tôi để mapping là **"/login"** và tôi sẽ khai báo thêm mapping này trong UserController

![image.png](https://images.viblo.asia/d312f629-d4b8-461a-a523-fcd029284d58.png)

+ th:object: Chỉ định đối tượng model được khai báo trong UserController, tại đây trong controller tôi dùng annotation "@ModelAttribute" để nhận data model

Restart lại project và kiểm tra. Với mapping **"/login"** -> redirect đến page "dashboard.html":

![image.png](https://images.viblo.asia/de8a28bb-7f42-4a69-8096-a383360935fd.png)

Tải trang dashboard thành công. Tiếp theo, tôi sẽ lấy giá trị "name" vừa nhập tại trang "index.html" lưu trong model và in ra field "firstname" của trang "dashboard.html" dùng Thymeleaf:

![image.png](https://images.viblo.asia/aca97acc-b78f-4cd2-b814-59e3bf12164b.png)


![image.png](https://images.viblo.asia/bce99dce-5815-4df1-97c8-b8b4b3694b5d.png)

Với thẻ <input> để in giá trị ta có thể dùng thuộc tính **"th:value"** của Thymeleaf:

![image.png](https://images.viblo.asia/f0f874d1-b9b3-458f-9399-adde3f1adb82.png)

Giá trị "name" được in ra thành công

Tiếp theo, tại trang dashboard chức năng "Log out" tôi sẽ dùng thuộc tính **"th:href"** của Thymeleaf để thiếp lập giá trị mapping là "/" để redirect đến trang "index.html"

![image.png](https://images.viblo.asia/4a4e50be-cbb9-4af2-bdd8-23b56a60eb1e.png)

Hoặc các bạn có thể tạo thêm 1 mapping như **"/logout"** trong controller để dễ xử lý cho những nhu cầu khác, ở đây tôi dùng chung với mapping đã tạo trước đó

Qua những phần ở trên tôi đã demo một vài thuộc tính Thymeleaf hỗ trợ, tiếp theo tôi sẽ đi đến phần data, tôi sẽ thêm 1 trang "register.html" để tiến hành tạo user và lưu dữ liệu trong elasticsearch

Nguồn templates cho dashboard và register: https://themewagon.com/themes/free-responsive-bootstrap-5-html5-admin-template-sneat/

Trong UseController tạo thêm mapping **"/register"**:

![image.png](https://images.viblo.asia/c7bf3fff-bb49-4358-8640-1c91bc99041e.png)

Kiểm tra và thấy trang "register.html" được tải thành công:

![image.png](https://images.viblo.asia/47e37824-77ed-4e1b-ac4c-f7a6c550dcdc.png)

Tại trang register tôi cũng sẽ dùng những thuộc tính từ Thymeleaf cho form data tương tự như trang index

![image.png](https://images.viblo.asia/9955c3c7-d8d7-4bab-8557-c4d06a3af372.png)

Tôi chỉ add thuộc tính **<th:field>** cho 2 field là "name" và "password" bởi vì field "email" tôi không khai báo trong model User

Tôi khai báo mapping cho **"th:action"** là  "/register" -> call đến controller mapping "/register", tại đây sẽ kiểm tra "name" có tồn tại hay chưa, nếu chưa sẽ tiến hành tạo mới dữ liệu cho user còn ngược lại sẽ in ra message

![image.png](https://images.viblo.asia/c2707fa2-c256-47b2-80dd-2f4494f71f01.png)

Thấy user đăng ký thành công:

![image.png](https://images.viblo.asia/6cb59fd6-df8c-4b9b-83dc-f014ceb0fd88.png)

Kiểm tra xem dữ liệu đã được lưu thành công hay chưa, dùng extension Elasticsearch head:

![image.png](https://images.viblo.asia/c00293eb-f3b6-4512-a5d5-33152f989d79.png)

=> Dữ liệu được tạo thành công

Với user được tạo mới tôi sẽ tiến hành đăng nhập để thấy có redirect đến trang dashboard hay không, trước tiên tôi cũng cần kiểm tra thông tin user đăng nhập trong controller mapping **"/login"** đúng hoặc không:

![image.png](https://images.viblo.asia/60728389-6ceb-4214-80f3-581b1080f982.png)

Kiểm tra cho kịch bản user login đúng thông tin. Tôi đã tạo user trước đó với "name" là "Mask" và "password" là "123"

![image.png](https://images.viblo.asia/12edb2ef-3b2e-485b-8217-59bd8688b693.png)

=> Login success

Kiểm tra cho kịch bản user login sai thông tin. Tôi thử login với "name" là "Mask" và "password" là "123456":

![image.png](https://images.viblo.asia/2615f5b9-ff2b-4d2a-9fa0-8f0ac4a9f2ac.png)

Với thông tin sai sẽ redirect về lại trang login "index.html", tôi sẽ thêm 1 tag tại trang index để in ra message:

![image.png](https://images.viblo.asia/cdd77cb0-af38-4a10-82be-7f0418e03456.png)

Kiểm tra lại với thông tin login sai:

![image.png](https://images.viblo.asia/d5bbe970-853b-4a30-9a13-b828760d30c1.png)

=> Message in ra thành công

Tiếp theo, tại trang register tôi thử dùng thông tin user đã tạo trước đó và kiểm tra xem khi click "Sign up" -> có in ra thông báo lỗi hay không:

![image.png](https://images.viblo.asia/ffd23ffa-343b-4d91-8051-019861df9d49.png)

=> In ra thông báo lỗi thành công

Tiếp tục với kịch bản đăng ký user mới:

![image.png](https://images.viblo.asia/1ce861df-6f75-4fbd-89c9-044f4530d6d0.png)

Kiểm tra Data trong elasticsearch:

![image.png](https://images.viblo.asia/ebb4c19f-5a82-4a20-b239-9aaadee1a8bb.png)

## 8. Cấu hình HTTP/2:

Các bạn thấy, hiện tại khi tôi load trang thì tất các các request url có protocol là HTTP/1.1, không phải HTTP/2:

![image.png](https://images.viblo.asia/92f79622-45d7-434e-9d4e-09843901319a.png)

Để bật tính năng HTTP/2 trong Spring Boot, tôi sẽ vào file "application.yml" thêm 1 khai báo:

    server:
      http2:
        enabled: true
  
 ![image.png](https://images.viblo.asia/849f0c80-fdcf-451f-b987-aaa05047071e.png)
 
 Sau khi restart project -> load lại trang để thấy protocol có thay đổi hay không:
 
 ![image.png](https://images.viblo.asia/9c9038d3-999e-457d-b96a-153370bb9eba.png)
 
 => Protocol không thay đổi, vẫn là HTTP/1.1. Lý do là HTTP/2 chỉ hỗ trợ với giao thức HTTPS, còn hiện tại localhost sử dụng HTTP:
 
 ![image.png](https://images.viblo.asia/99fd7c2a-aaa0-4eb0-ab91-626c8e05a0ed.png)
 
 Để cấu hình localhost sử dụng HTTPS, ta cần bật chế độ SSL, ta cấu hình SSL trong "application.yml":
 
 ![image.png](https://images.viblo.asia/896efc26-d753-4596-985e-0e99f0dbd05b.png)
 
 Tiến hành restart lại project và kiểm tra, nhưng lúc này nhập url là "https://localhost:8080" để thấy HTTPS có được chấp nhận hay không:
 
![image.png](https://images.viblo.asia/d8ad91c5-33f9-422c-bf81-4a8c99f04c41.png)
 
 Như các bạn thấy, sau khi enable SSL -> vẫn không có thay đổi gì, kiểm tra console log và thấy lỗi:
 
![image.png](https://images.viblo.asia/266f48ee-4094-4d9e-8a9f-abd8fae5aab9.png)
 
 Để xứ lý lỗi này, chúng ta cần tạo 1 certificate và thêm certificate này cấu hình trong "application.yml":
 
###  Tạo certificate:
 
 Đầu tiên tôi tạo 1 thư mục với tên là "ssl_certificate":
 
 ![image.png](https://images.viblo.asia/92e26bcf-e7f2-4b1f-b3ed-dcba123aafe4.png)
 
 Trong thư mục này, mở Command prompt lên và nhập dòng lệnh sau:
 
    keytool -genkeypair -alias local_ssl -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore local-ssl.p12 –validity 365 -ext san=dns:localhost
    
Trong đó:

+ -alias: Đặt tên tuỳ ý, ở đây tôi đặt tên là "local_ssl"
+ -storetype: Để mặc định như trên

![image.png](https://images.viblo.asia/de6e2476-016c-4d8e-8b71-787311e84849.png)

+ -keystore: Đặt tên tuỳ ý, ở đây tôi để tên là "local-ssl.p12"
+ san=dns: Để là "localhost" bởi vì tôi muốn thiết lập HTTPS cho domain là "localhost"

Sau khi nhập dòng lệnh trên -> enter:

![image.png](https://images.viblo.asia/ee69fabe-a064-4fd5-98e2-33b3b3ce84f1.png)

Trong tất cả thông tin trong hình, chỉ cần quan tâm "keystore password", khuyến nghị chỉ nên nhập số cho dễ nhớ và ít sai, chú ý khi nhập password -> sẽ không in ra bất kỳ ký tự nào nhưng thực chất giá trị đã được nhập thành công. Ở đây tôi để "keystore password" là "123456"

Cuối cùng, sau khi nhập tất cả thông tin -> nhập "yes" để generate certificate. Vào thư mục "ssl_certificate" vừa tạo để kiểm tra:

![image.png](https://images.viblo.asia/e72fc476-1c6f-41d3-b7d1-c97420ac5e6c.png)

=> Certificate được tạo thành công

Tiếp theo cần thêm certificate này đến thư mục "resources" của project. Ở đây tôi sẽ tạo 1 thư mục tên là "ssl_config" trong thư mục "resources" và copy certificate đến thư mục này:

![image.png](https://images.viblo.asia/a5d889ac-70ba-4140-8417-c2f069113fbb.png)

Cấu trúc thư mục project:

![image.png](https://images.viblo.asia/f065acc8-9d85-4052-85d0-597756896b46.png)

Tiếp theo, tôi sẽ khai báo thông tin certificate trong "application.yml":

    server:
      ssl:
        key-store: classpath:ssl_config/local-ssl.p12
        key-store-type: PKCS12
        key-store-password: 123456
        enabled: true
      http2:
        enabled: true

![image.png](https://images.viblo.asia/c8a8bf33-e3b0-4eec-94ed-29be3978b576.png)

Các bạn cần thay thế thông tin của mình như "password" cho đúng

Sau khi khai báo xong thông tin cho certificate, re-build lại project và start project sẽ thấy tại console log HTTPS đã được chấp nhận:

![image.png](https://images.viblo.asia/7f26fee0-ece5-4003-8f0b-0f7f56c856d2.png)

Tôi sẽ load lại trang với đường dẫn là "https://localhost:8080" và thấy kết quả:

Nếu các bạn gặp màn hình này thì không cần lo lắng, click **"Advanced"** và click **"Process to localhost(unsafe)"**:

![image.png](https://images.viblo.asia/e7ed0e40-4de5-4f44-9d90-fd13d404d5b5.png)

Kiểm tra tất cả request url:

![image.png](https://images.viblo.asia/237c28f5-346a-41f2-8af0-542273365a72.png)

![image.png](https://images.viblo.asia/05356084-137f-4d59-a712-a7f443330419.png)

![image.png](https://images.viblo.asia/893ef5e4-4b67-42f6-8d37-d5257ce49936.png)

![image.png](https://images.viblo.asia/58d1f712-edde-4dd5-862e-f6d9fbd45df3.png)

=> Tất cả request url giao thức đã được chuyển đổi thành HTTP/2

Lưu ý dành cho những bạn nào muốn apply HTTP/2 với java 8 ->  báo lỗi thì xem tại đây:

![image.png](https://images.viblo.asia/84976254-f7f6-442c-8ab2-3e3f51b26100.png)

Link nguồn: https://tomcat.apache.org/tomcat-9.0-doc/config/http.html#HTTP/2_Support

Cuối cùng, bài viết khá dài vì tôi muốn mô tả chi tiết những tình huống lỗi có thể xảy ra trong quá trình làm và cách xử lý lỗi. Trong thời gian tiếp theo, có thể tôi sẽ viết về việc mã hoá password khi login bởi vì như các bạn thấy nếu sử dụng form data -> mặc định trong "payload" sẽ có thông tin username và password. Ngoài ra trong các project lớn thường không lưu password trong database, một vài project sẽ sử dụng ldap. Trong thời gian tới, nếu có thể tôi sẽ dành thời gian để demo 1 project sử dụng ldap để quản lý password.