**Spring Framework** và hệ sinh thái của nó chắc hẳn không còn xa lạ với các lập trình viên Java.

Trải qua quá trình phát triển từ năm 2005, cho đến nay, Spring đã cho ra đời biết bao framework nhỏ có, to có, đồ sộ có. Đặc biệt, phiên bản thứ 5 ra đời với nhiều thứ mới mẻ, đáng để anh em lập trình viên tìm hiểu và áp dụng vào các sản phẩm của mình.

Dòng họ nhà Spring nổi trội nhất phải kể đến Spring MVC - Thiết kế web với java thì chuộng cái này thôi rồi, Spring Security - cung cấp các giải pháp bảo mật toàn diện cho ứng dụng của bạn, hay mới hơn là Spring Cloud, mới hơn nữa là Spring Boot,...
![](https://images.viblo.asia/d1445e6e-f4dc-4d17-b863-c8b68ce4c3d4.jpg)
## 1. Sơ lượt về Spring MVC
Trở lại với chủ đề, nhân vật chính ngày hôm nay không phải là Spring MVC. Nhưng mình xin mạn phép sơ lược về Spring MVC một chút. Xem như đánh bóng lại tên tuổi cho nó sau bao nhiêu năm cống hiến cho sự nghiệp web nhà :D

Spring MVC là một framework được xây dựng trên nền Spring. Dựa trên mô hình MVC kinh điển, Spring MVC giúp bạn có thể xây dựng các web application linh hoạt và mạnh mẽ.

> Theo thống kê của bộ tài chính thì hiện nay có hàng tá công ty lớn nhỏ sử dụng Spring MVC để xây dựng và phát triển các ứng dụng của mình. Thật là đáng trân trọng :D
## 2. Đứa em có triển vọng
Đi lòng vòng mãi mới đến được đây. Đứa em của Spring MVC thật sự là ai? Có triển vọng ư? Tại sao vậy?

Chúng ta sẽ cùng tìm hiểu...
![](https://images.viblo.asia/20d481ba-d693-47c0-945c-a3718a5ba9d5.jpg)
Spring WebFlux là một trong những công cụ phát triển web mới được ra đời từ Spring 5. Nó hỗ trợ việc xây dựng một ứng dụng web theo chuẩn mới - Reactive. (Reactive là cái gì thì google thử bạn nhé. Đầy đủ là Reactive programming)

Như các bạn đã biết, trong Spring MVC thì các thông tin của request từ client sẽ được đối tượng **HttpServletRequest** và những thông tin trả về cho client sẽ do đối tượng **HttpServletResponse** nắm giữ. Vậy thì sang Spring WebFlux với Reactive support, những thông tin từ request sẽ chứa trong đối tượng **ServerHttpRequest**, còn thông tin về response sẽ do đối tượng **ServerHttpResponse** nắm giữ. Body của request và response thay vì là các đối tượng InputStream và OutputStream, giờ sẽ là đối tượng Flux<DataBuffer>. Thật thú vị phải không!

Ứng dụng sử dụng Spring WebFlux phải được chạy trên các server runtime hỗ trợ Servlet 3.1 trở lên với non-blocking I/O các bạn nhé. Nếu không đáp ứng được thì vẫy tay chào nó một cái rồi về lại với Spring MVC thôi :v: 

Spring MVC và Spring WebFlux được ra đời ở hai thời điểm khác nhau. Thời trước, hầu như các ứng dụng đều được lập trình và hoạt động theo cơ chế blocking. Nhưng hết thời đó rồi, cùng với sự phát triển của công nghệ, máy móc, cơ sở hạ tầng,...các ứng dụng của chúng ta có thể hoạt động theo một cơ chế mới, hiệu quả hơn, đó là non-blocking. Vâng, và Spring WebFlux đang được xây dựng dựa trên non-blocking đó.

(***Blocking là gì? Non-blocking là gì? Chúng hoạt động như thế nào?*** Các bạn có thể tham khảo một bài viết này mình tìm thấy trên gút gồ nhé: [Click vào đây để tận hưởng](https://codersontrang.com/2017/09/05/blocking-va-non-blocking-trong-lap-trinh/))

Đến đây, chắc hẳn bạn vẫn chưa thấy được sức mạnh của người em út sinh sau đẻ muộn nhỉ. Chúng ta sẽ đi chi tiết hơn về kiến trúc của Spring WebFlux và so sánh với Spring MVC thử nhé.
![](https://images.viblo.asia/0effb6a9-e609-42d2-8a64-e54f4380db70.png)

Sơ đồ trên được phân chia theo từng lớp, đi từ lớp dưới nhất lên đến lớp trên cùng nhất, ta sẽ có được ứng dụng web hoàn chỉnh. Ta sẽ giải thích chi tiết về các lớp như sau:
* *Lớp thứ nhất* về cú pháp lập trình, trước đây chắc hẳn chúng ta đã khá thân quen với các cú pháp dựa trên các annotation trong Spring MVC. Cú pháp này giờ đây không còn là độc quyền với Spring MVC nữa mà ngay cả Webflux cũng có thể dùng nó. Điều này giúp cho việc chuyển ứng dụng từ Spring MVC sang dùng Webflux trở nên tốn ít công sức hơn vì không phải thay đổi lại quá nhiều code. Ngoài ra, người sử dụng Webflux còn có thể viết chương trình theo cú pháp hoàn toàn mới đó là *Router Function*, cú pháp mới này mang đến phong cách lập trình hàm trong việc định nghĩa và khai báo các URL cho ứng dụng web. Router Functions sẽ chỉ áp dụng cho Webflux mà thôi.
* *Lớp thứ hai* về bản thân framework ta sử dụng, trong trường hợp này là Spring MVC và Spring Webflux
* *Lớp thứ ba* là chuẩn giao tiếp với các web server mà ứng dụng chạy trên đó. Spring MVC tuân theo chuẩn Servlet, còn Spring Webflux thì tuân theo chuẩn mới là *Reactive Streams* cho giao thức HTTP. Với chuẩn Reactive Streams thì các ứng dụng Webflux sẽ được chạy trên các webserver hỗ trợ các xử lý Non-Blocking để tối ưu tài nguyên tính toán.
* *Lớp thứ tư* là các web server hỗ trợ các chuẩn giao tiếp ở bên trên. Đối với Spring MVC thì ứng dụng sẽ cần phải được chạy trên các Servlet Container ví dụ như Tomcat, Jetty … nhưng sang đến Spring Webflux thì lại không hạn chế như vậy. Đối với các servlet container tuân theo chuẩn Servlet 3.1 có hỗ trợ Non-Blocking IO, thì chúng cũng có thể chạy cùng với các ứng dụng Webflux. Ngoài ra, đối với các ứng dụng Webflux thì các Servlet container sẽ không phải là sự lựa chọn duy nhất, mà các HTTP Server như Netty hay Undertow có thể là những lựa chọn tuyệt vời khác cho việc xử lý không đồng bộ các HTTP Request đến từ ứng dụng Webflux.
## 3. Tương lai anh em nhà Spring
Chưa nghe danh NodeJS thì chưa phải là dev chính hiệu. NodeJS ra đời sau, được viết hoàn toàn dựa trên Non-Blocking. Non-Blocking là một mô hình của tương lai (Không biết năm 2019, 2020 thế giới có ra đời cái mô hình cao cấp nào nữa không, nhưng giờ thì cứ để Non-Blocking tạm thống trị đã nhé)

Spring WebFlux bây giờ cũng đi theo con đường đó. Như vậy, bạn có thấy một luồng sáng đang rọi vào Spring WebFlux không?

Hiện nay, một số công ty đã chạy theo, áp dụng thử nghiệm Spring WebFlux vào các ứng dụng, sản phẩm của họ. Với đà này thì vài năm, hoặc khoảng độ 5 - 10 năm tới Spring MVC có thể dần bị thay thế bở Spring WebFlux.

Theo khách quan là vậy. Ý kiến của bạn thế nào?

Đừng ngại để lại ý kiến bên dưới bạn nhé :D

Bài giới thiệu của mình xin dừng tại đây, hẹn gặp lại các bạn vào loạt bài về Spring WebFlux tới đây nhé.
![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)

(Mình có tham khảo một số nội dung tại: codersontrang.com, trang này có nhiều bài viết hay về Java, các bạn có thể vào đọc thêm nhé)