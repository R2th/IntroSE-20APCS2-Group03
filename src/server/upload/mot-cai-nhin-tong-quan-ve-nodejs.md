Chào các bạn, dạo gần đây, mình có viết một chuỗi các bài viết về Javascript. Tuy nhiên, các bài viết trước đây mình chủ yếu viết về ReactJS, hoặc javascript phía front-end. Thế thì hôm nay, nhân một ngày Hà Nội trái gió trở trời, mình xin được viết về javascript phía server nhé :grinning:
Chủ đề mà hôm nay mình muốn giới thiệu với các bạn đó là NodeJS - một cái nhìn tổng quan nhất.

## NodeJS là gì vậy ?

Sau đây là định nghĩa mình tìm được trên [trang chủ](https://nodejs.org/en/) của NodeJS:

> Node.js® is a JavaScript runtime built on Chrome’s V8 JavaScript engine.

> Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

> Node.js’ package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Đúng như thiên hạ nói, NodeJS là một nền tảng (nền tảng - platform chứ không phải là framework đâu nhé) chạy trên engine [Google Chrome V8](https://v8.dev/) của thằng google - hàng xịn đừng hỏi. Khi chúng ta sử dụng trình duyệt **Google Chrome** thì Javascript cũng được biên dịch bằng engine này, nó sẽ nhận đoạn mã javascript của bạn và dịch sang mã máy, với tốc độ nhanh hơn. Nhận thấy trình biên dịch này rất nhanh và hiệu quả nên người ta quyết định đưa nó vào server-side, và thế là vào năm 2009, NodeJS đã ra đời. Từ đó đến nay, NodeJS đã vươn lên trở thành một trong những sự lựa chọn hàng đầu ở phía server-side, rất được ưa chuộng bởi cộng đồng các lập trình viên cũng như đã được sử dụng trong các hệ thống lớn như: Netflix, Paypal, Walmart, and Uber. Sau đây là bảng xếp hạng những thư viện/nền tảng được ưa chuộng nhất theo khảo sát của Stackoveflow vào tháng 2/2020

![Top các thư viện/nền tảng được ưa chuộng nhất theo khảo sát của Stackoverflow 2/2020](https://images.viblo.asia/b3c5b103-ebd3-4123-a4c6-8a822cef37e0.png)

Vậy là mình đã giải thích xong dòng đầu tiên của định nghĩa rồi. Bây giờ chúng ta sẽ tiếp tục với dòng thứ hai nhé :grinning:


## Event drivent? Non-blocking IO?

Lúc mới đầu tìm tìm hiểu có nghe đến NodeJS chạy bất đồng bộ, hay còn gọi là non-blocking IO, mình cứ nghĩ rằng nó là cái thứ gì cao siêu lắm. Nhưng thật ra thì chúng cũng rất đơn giản thôi. Chúng ta đã quá quen với các ngôn ngữ như C, C++, Java,.. là các ngôn ngữ chạy tuần tự, tức là mọi việc phải xảy ra tuần tự, thực hiện dòng code trên, hoàn thành xong rồi mới thực hiện đến dòng code dưới. Nhưng NodeJS thì không như vậy, mà nó sẽ sẽ dụng cơ chế non-blocking IO.

Mình nói qua IO một chút. IO chức là input/output, tức bất kì thao tác đọc/ghi nào tới hệ thống file. IO là thao tác tốn thời gian và nó sẽ block tất cả các hàm khác đang chạy. Đây chính là lúc mà cơ chế non-blocking IO trong NodeJS sẽ phát huy điểm mạnh của mình.

Mình sẽ lấy ví dụ cho dễ hiểu nhé: hãy tưởng tượng hệ thống của chúng ta đón nhận 2 request từ 2 người dùng là A và B. Cả 2 request này đều là đọc dữ liệu từ database rồi trả về cho người dùng, chẳng hạn như xem thông tin cá nhân chẳng hạn. Khi thằng A gửi request tới server, server thực hiện đọc database. Thường thì chúng ra sẽ tạo một luồng cho request A, và một luồng khác cho request B, nhưng vì NodeJS là đơn luồng (single-thread) nên nếu không sử dụng non-blocking IO thì thao tác đọc database sẽ chặn request B, thằng B sẽ phải đợi cho đến khi request A được thực hiện xong thì mới có thể được server tiếp nhận và xử lý. Nhưng với non-blocking IO thì 2 request này có thể được thực hiện đồng thời mà không cần phải chờ đợi nhau. Đặc tính non-blocking IO cũng khiến cho chúng ta không cần thiết phải sử dụng đến xử lý đa luồng mà vẫn có thể tiếp nhận và thực hiện được nhiều request cùng một lúc.

![So sánh giữa việc xử lý 2 request của Blocking-IO và non-blocking IO](https://images.viblo.asia/cca21c8d-adc0-46b0-b354-e5bba9dfe38d.png)

Cơ chế bất đồng bộ của NodeJS mang đến một lợi thế cực lớn về hiệu năng, nhất là khả năng xử lý được số lượng lớn các request cùng một lúc. Mình lấy ví dụ như ASP .NET, một framework sử dụng cơ chế blocking IO, để xử lý nhiều request một lúc thì chúng phải sinh ra nhiều luồng khác nhau, điều này sẽ khiến tài nguyên bộ nhớ và vi xử lý sẽ tốn kém hơn rất nhiều. Tất nhiên là các framework như ASP .NET cũng có thể xử lý bất đồng bộ, tuy nhiên chúng ta sẽ phải viết code để tạo ra các thao tác bất đồng bộ ấy. Còn đối với Node JS thì việc xử lý bất đồng bộ là mặc định

## Cộng đồng NodeJS rất đông và hung hãn

![](https://images.viblo.asia/9b39ee4d-dbfa-4ad0-9bff-b36d8f967021.png)


NPM - Node packages manager là hệ thống thư viện giúp chúng ta có thể xây dựng ứng dụng một cách nhanh chóng và dễ dàng hơn. Mặc dù Node mới chỉ ra đời tới nay được hơn 10 năm, nhưng hệ thống thư viện hỗ trợ của chúng - npm nay đã có 
tới hơn 1,4 triệu packages, và con số này vẫn đang tăng lên chóng mặt (~804 packages/ngày ) theo số liệu của [http://www.modulecounts.com/](http://www.modulecounts.com/). Con số này thậm chí vượt trội so với những hệ thống thư viện của các framework lâu đời như nudget của ASP .NET, gems của Ruby on Rails,...

Một số package thông dụng nhất khi chúng ta tạo một server API với NodeJS có thể kể đến như express, mongoose (được coi như là relation mapping với MongoDB), Sequelize (Relation Mapping với các SQL database),... Chỉ với express cùng với 1 thư viện relation mapping thôi thì chúng ta hoàn toàn có thể build một RestfulAPI rất nhanh và dễ dàng rồi.

## Tại sao lại là NodeJS ?

Vậy tại sao NodeJS lại phát triển mạnh mẽ và được ưa chuộng tới vậy ? Mình xin được kể tới một vài ưu điểm sau :
* NodeJS là Javascript, tức là với NodeJS thì bây giờ lập trình viên fullstack chỉ cần làm việc với một ngôn ngữ. Hơn nữa, tính ổn định của Javascript qua các phiên bản ES5, ES6, rồi 7, 8 gì đó ngày càng hoàn thiện, ổn định và mang lại nhiều tính năng hơn cho lập trình viên
* Cộng đồng cùng với hệ sinh thái Javascript cực kì lớn mạnh, thậm chí đang là cộng đồng lớn mạnh nhất theo khảo sát của stackoverflow
* Các dự án phát triển theo mô hình Client Server (NodeJS đứng trong vài trò làm các services cung cấp APIs), NodeJS nó lại càng phù hợp hơn cho kiến trúc Microservices để đưa các bài toán lớn thành các bài toán nhỏ và có thể phát triển nhanh 1 dự án lớn, phát triển và quản lý nó dễ dàng. Các realtime services nó làm cũng tuyệt vời bởi các hệ thống realtime để hoạt động tức thời với các event được bắn ra và đó là đất diễn cho NodeJS vì nó có điểm mạnh là hỗ trợ non-blocking.
* Hiệu năng của NodeJS cực kì phù hợp với các hệ thống phải xử lý nhiều request cùng một lúc. Với mô hình non-blocking nó tiết kiệm cho chúng ta những khoản thời gian đáng kể thay vì request phải xếp hàng chờ đợi nhau như thời bao cấp.

Trên đây là những chia sẻ dựa trên kiến thức của mình, hi vọng nó sẽ giúp ích cho các bạn mới tiếp cận hoặc tìm hiểu về NodeJS. Trong các bài tiếp theo, mình sẽ trình bày kỹ hơn những vấn đề liên quan tới NodeJS nhé.

### Tài liệu tham khảo 
- https://nodejs.org/en/about/
- https://medium.com/free-code-camp/what-exactly-is-node-js-ae36e97449f5