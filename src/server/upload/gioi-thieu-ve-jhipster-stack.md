Câu chuyện tiếp cận hay học một công nghệ mới chưa bao giờ hết hot. Nếu bạn đang loay hoay để bắt đầu khởi tạo project đầu tiên với Spring Boot thì JHipster là giải pháp cho bạn.
JHipster không đơn thuần cho bạn project có Spring Boot, nó còn phù hợp để bạn bắt đầu tập tành với Angular hay React với CRUD từ backend đến frontend và nhiều hơn thế. 
## JHipster là gì
> JHipster is a development platform to generate, develop and deploy Spring Boot + Angular/React Web applications and Spring microservices. 

![](https://images.viblo.asia/c547102e-c7c2-4f41-a09f-a2a36af06f60.png)
Nói một cách đơn giản, JHipster( viết tắt của Java Hipster) là cách đơn giản để chúng ta tạo ra một project xung quanh những công nghệ được ưa thích nhất với Spring technologies và Angular/React. 
Khi chúng ta bắt đầu dự án chúng ta sẽ quan tâm đến 3 khía cạnh:
* Server side stack sẽ trông như thế nào?
* Client side stack sẽ trông như thế nào?
* Làm sao để chúng ta có thể deploy project của chúng ta?

### Server side
Khi chúng ta bắt đầu build phần backend có những câu hỏi mà chúng ta quan tâm đó là:
* Ngôn ngữ chúng ta lựa chọn là gì?
* Tầng dữ liệu sẽ như thế nào?
* Hệ thống sẽ bảo mật ra sao?
* Khả năng bảo trì và mở rộng hệ thống?
* Cách cung cấp API document?
* Kiểm thử ứng dụng thế nào?
Câu trả lời sẽ có khi bạn nhìn vào danh sách công nghệ mà JHipster cung cấp :

![](https://images.viblo.asia/2e292e0f-0ab8-4eac-987d-fa352d43df20.png)
### Client side
Với những framework frontend mạnh mẽ
![](https://images.viblo.asia/39141588-d471-4faf-aaa5-c50fbc9a37ba.png)
### Deployment
Deply dự án dễ dàng
![](https://images.viblo.asia/70452aa0-1ec8-41ad-b205-a879bd84e5bb.png)
## Tại sao lựa chọn JHipster
Với những gì đã nêu ở trên, tôi hy vọng các bạn đã biết ly do vì sao nên chọn JHipster. Chúng ta sẽ dễ dàng có được một project đủ mạnh mẽ đầy đủ những thứ cơ bản để bắt đầu với thời gian nhanh nhất.
Và nếu bạn đang tập tành với Spring để trở thành 1 Java Web developer thì bạn nên quan tâm đến công nghệ này.
## Tạo project đầu tiên với JHipster
Những gì bạn cần có để bắt đầu tạo một project đầu tiên với JHipster:
* Cài đặt Java 8 [Oracle website](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
* Cài đặt Node.js [Node.js website](https://nodejs.org/en/)
* Cài đặt Yeoman: `npm install -g yo`
* Cài đặt JHipster: `npm install -g generator-jhipster`

> Note: 
> 
> Bạn cũng có thể sử dụng [Yarn](https://yarnpkg.com/en/docs/install#windows-stable)/[Homebrew](https://formulae.brew.sh/formula/jhipster)/[Chocolatey](https://chocolatey.org/packages/jhipster)/[Docker](https://www.jhipster.tech/docker-compose/) để cài đặt JHipster.
> 
> Với bước cài đặt JHipster ở trên nếu bạn muốn sử dụng phía Client với Angular JS thì bản JHipster của bạn phải là  < 5. Khi đó bạn có thể chạy lệnh sau: 
> 
> `npm install -g generator-jhipster@4.14.3`

### Tạo project:
Thực hiện trên Terminal/cmd:
1. Tạo 1 thư mục trống là nơi sẽ chứa project. `mkdir myapplication`
2. Chuyển đến thư mục vừa tạo `cd myapplication/`
3. Generate ứng dụng : `jhipster`
4. Lựa chọn những thứ phù hợp với project của bạn

![](https://images.viblo.asia/ef60681d-5595-45a7-a086-a6ba1f9ccf77.png)

***Bây giờ bạn đã có 1 project với:***

* Backend: **Spring Boot** + **Spring Security**  
* Database: 
    * Mysql (production)
    * H2 with disk-based (development)
* Frontend: Bootstrap + SASS + **Angular 7** (hoặc thấp hơn tùy vào phiên bản JHipster bạn cài đặt ở trên)
Sau khi chạy xong bạn sẽ nhận được kết quả như bên dưới. Đó cũng là hướng dẫn để bạn build project của mình trên local.
> Run your Spring Boot application:
> 
> ./mvnw (mvnw if using Windows Command Prompt)
>
> Client application generated successfully.
> Start your Webpack development server with:
> 
 > npm start

<br><br>

 *Những lưu ý khi chọn trong phần config project ở trên:*
* Jhipster hỗ trợ bạn setup đa ngôn ngữ trong project 
*  JHipster đã tạo cho bạn project với cả môi trường của development và môi trường thực tế (production)
    *  Ở môi trường development: nếu bạn không muốn cài đặt các database trên local. 
    *  Bạn có thể sử dụng H2 with disk-based hoặc H2 in -memory. Cả 2 cho phép bạn sử dụng database ngay trong giao diện của ứng dụng.
    *  *H2 in-memory*: data sẽ bị mất khi bạn restart server.
    *  *H2 with disk-based*: data sẽ không bị mất khi bạn restart server.
    *  Nếu không dùng 2 loại database trên bạn sẽ phải tạo schema trên local và sửa lại config với database trong phần code.
 
 Ví dụ bạn dùng Mysql.
>  Trong thư mục project: 
>  
> src/main/resources/config/application-dev.yml
```
 datasource:
        type: com.zaxxer.hikari.HikariDataSource
        url: jdbc:mysql://localhost:3306/hello?useUnicode=true&characterEncoding=utf8&useSSL=false&useLegacyDatetimeCode=false&serverTimezone=UTC
        username: root
        password:
```
Thì *hello* sẽ là tên schema mà bạn cần để tạo trên local.
 
> JHipster giúp bạn với 1 dòng lệnh có đầy đủ CRUD cả phần backend và frontend
> Bạn hãy thử tìm hiểu nó trên [doc của JHipster](https://www.jhipster.tech/jdl/)
## Tổng kết 
Trên đây mình đã giới thiệu cho các bạn cách để tạo và run một project với jhipster. Hãy thử tạo và "nghịch" nó, bạn sẽ thích nó sớm thôi. 
Mình sẽ chia sẻ vào cụ thể về nó hơn trong những bài viết sau!

-----
***Tài liệu tham khảo:***
https://www.jhipster.tech/