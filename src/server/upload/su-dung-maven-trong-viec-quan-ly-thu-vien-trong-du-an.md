### 1. Giới thiệu về Maven:

Trong thời gian làm dự án, mình có nhận ra một vấn đề khá đau đầu trong việc phát triển dự án đó là việc quản lý thư viện sử dụng trong dự án. Thử tưởng tượng nếu trong dự án chúng ta phát triển sử dụng rất nhiều thư viện thứ 3 (selenium, testng,..), đến một ngày đẹp trời thì mớ thư viện của chúng ta cần nâng cấp version, hoặc thêm, hoặc xóa bớt những thư viện không cần thiết, thì việc import lại đầy đủ các thư viện bằng tay là cả một vấn đề.

Sau một thời gian google tìm giải pháp thì mình nhận thấy, Maven chính là chìa khóa để mình giải quyết vấn đề.

Apache Maven là một chương trình quản lý dự án cho phép các developers có thể quản lý về version, các dependencies ( các thư viện sử dụng trong dự án ) , quản lý build, tự động download javadoc & source …


### 2. Repository:

Là một kho chứa các dependencies ( các thư viện sử dụng trong dự án ). Khi thực hiện build project sử dụng Maven, thì các thư viện được khai báo trong file pom.xml sẽ được download tự động tại kho chứa này: https://maven.apache.org/guides/introduction/introduction-to-repositories.html 

### 3. Tạo Project sử dụng Maven:
Apache maven hiện nay đã được tích hợp sẵn vào trong eclipse . Dưới đây mình sẽ hướng dẫn các bạn tạo một Project sử dụng maven:

*Bước 1*: File -> New ->  Project. Trong dialog hiện ra, lựa chọn “Maven Project” như trong hình. Chọn Next

![](https://images.viblo.asia/d0415e12-9770-44e7-9ce8-2321842a1501.png)

*Bước 2*: Tại “New Maven Project” dialog, lựa chọn “Create a simple project …” như trong hình, sau đó chọn Next

![](https://images.viblo.asia/660b0cb8-89c4-427f-aab0-e548bb0e861d.png)


*Bước 3*: Điền thông tin như trong hình:

![](https://images.viblo.asia/06ca4a78-749f-4d6f-80fd-89264de71cc1.png)

Trong đó :

* **Group Id** : Tên tổ chức / công ty / cá nhân của dự án
* **Artifact Id** : Tên của packge, dự án
* **Version** : version của project
* **Package** : để ý 2 giá trị : jar có nghĩa là thư viện or java application, war là web application
* **Name** : Tên project (trong eclipse)

Nhấn Finish để hoàn thành.

Sau khi nhấn Finish, một Project được tạo trong workspace với cấu trúc như sau:

![](https://images.viblo.asia/5dec8654-c48e-4563-9142-88da04a4dd01.png)

### 4. Cấu hình file pom:
File pom.xml là nơi khai báo tất cả những gì liên quan đến dự án được cấu hình qua maven, như khai báo các dependency, version của dự án, tên dự án, repossitory … Mở file pom.xml ra, chúng ta thấy nội dung như sau :

![](https://images.viblo.asia/787b5da7-9028-4e04-8e63-e4553ca38db7.png)


Trong đó, 0.0.1-SNAPSHOT là version của project. Bây giờ chúng ta sẽ thử add thư viện vào dự án, ví dụ chúng ta sẽ add thư viện selenium và testng để phục vụ cho mục đích của project. Thêm thẻ khai báo vào file pom :

![](https://images.viblo.asia/34f041e0-6ca8-4e50-abfb-b595934f07cf.png)

Cặp thẻ `<dependencies> /<dependencies>` là cặp thẻ cha, chúng ta sẽ khai báo các thư viện con bên trong cặp thẻ này.

Như ở trên hình chúng ta thấy chúng ta sẽ khai báo các thư viện bên trong cặp thẻ `<dependency> /<dependency>` với các thông tin bao gồm tên thư viện và version của thư viện.

Sau khi khai báo thư viện xong, chúng ta thực hiện build project bằng cách:

Click phải chuột vào Project → Chọn Run As → Chọn Run Configuration:

![](https://images.viblo.asia/61680e3c-a73c-422d-881b-39a07a2e2803.png)

Tại mục Goals: điền các command, mỗi command cách nhau một khoảng trắng, sau đó click Run để chạy maven.

* **clean**: clean lần build trước đó 
* **install**: download các thư viện được khai báo trong file pom

Thư viện sẽ được add tự động vào project : (ở mục Maven Dependencies) sau khi build xong:

![](https://images.viblo.asia/30148940-92f7-421b-a99a-9bc41c88f045.png)

Trong ví dụ trên, ngoài 2 thư viện được khai báo trong file pom, Maven cũng sẽ tự động download các thư viện cần thiết khác để có thể sử dụng selenium core, bởi vì selenium được xây dựng (or sử dụng lại) các thư viện này. Nếu không có maven, thì việc các bạn phải đi add từng thư viện liên quan như thế này sẽ rất mất thời gian, chưa kể là sẽ có sai sót cũng như là version phù hợp. Tuy nhiên với Maven thì vấn đề trên đã được giải quyết.

Các thư viện download về sẽ nằm ở thư mục home/{username}/.m2/repository.

![](https://images.viblo.asia/52e4b616-43bc-4989-b3ca-dc4a417786fb.png)


### 5. Thay đổi version của thư viện:

Bây giờ khi thư viện của chúng ta cần được nâng cấp version, sếp muốn bạn nâng cấp version của selenium từ 3.12.0 lên thành 3.14.0. Chúng ta chỉ cần config lại file pom như sau:

![](https://images.viblo.asia/122780f2-66c3-49b5-9823-de83e33c1a2c.png)

Sau khi build project xong, Maven sẽ tự động remove các thư viện selenium version cũ và thực hiện download nhưng thư viện selenium version mới:

![](https://images.viblo.asia/2bf13f82-af80-44e8-99e3-f77c53d184db.png)

Như vậy việc upgrade version của thư viện đã trở nên cực kỳ dễ dàng với Maven.

### 6. Tìm hiểu về kho chứa Maven Repository:

Chúng ta có thể dễ dàng tìm thấy được thông tin các thư viện chúng ta trong kho chứa maven Repository

Ví dụ: Mình muốn tìm kiếm thông tin về thư viện selenium:

![](https://images.viblo.asia/e7012fcb-b988-4aa7-a01c-fe4eb7a96ee2.png)

Chỉ cần lấy thông tin đoạn code của thư viện này và cấu hình trong file POM là xong.

### 7. Tổng kết:

Qua ví dụ trên chúng ta đã hiểu được khái niệm cơ bản của maven cũng như tạo một project cơ bản sử dụng Maven. Ngoài ra maven còn rất nhiều tính năng khác, các bạn có thể tham khảo chi tiết ở link https://maven.apache.org/

Trên đây mình chỉ trình bày sơ bộ về khái niệm maven. Hy vọng có ích cho các bạn. Nếu bài viết có gì sai sót, mong các bạn góp ý.

*Tham khảo thêm về Maven:* 

https://www.guru99.com/maven-jenkins-with-selenium-complete-tutorial.html

http://www.mkyong.com/maven/how-to-create-a-java-project-with-maven/