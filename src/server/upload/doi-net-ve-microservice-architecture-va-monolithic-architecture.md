Những bài viết chia sẻ về tech dev có khá là nhiều và đầy đủ rồi. Hôm nay chúng ta chuyển sang software architecture và cùng tìm hiểu, đánh giá chút về mô hình đang khá nổi thời gian gần đây đó là microservice.

Software architecture  là tổ chức hệ thống bao gồm rất nhiều các thành phần như Web Server, cơ sở dữ liệu, bộ nhớ và các lớp layer thực hiện việc giao tiếp. Chúng liên kết với nhau hoặc với một môi trường nhất định. Mục tiêu cuối cùng của thiết kế hệ thống (system architecture) là giải quyết vấn đề của doanh nghiệp.

Ở thời điểm hiện tại, có 2 mô hình pattern của software architecture đang được phổ biến là:

* Monolith architecture
* Mircoservice architecture

## Monolith architecture

![](https://images.viblo.asia/647a9906-db1f-44a8-afe9-e699b464d849.png)

Monolith có xu hướng phù hợp với những dự án có quy mô nhỏ. Với việc áp dụng mô hình monolith, những lợi ích đem lại có thể  kể đến là: 

- Quá trình development đơn giản và trực tiếp, centralized managenment và những bước phát triển cơ bản thì sẽ không được lặp lại.
- Effort dành cho việc development được giảm thiểu: tất cả mọi quá trình development đều nằm trên 1 project. Development flow đơn giản chỉ là submit changes, review, merge code và continue.

Tuy nhiên hạn chế mà mô hình này đem lại cũng khá lớn :

- Khó khăn trong việc bảo trì: vấn đề về coupling code, các khối code dính chặt lại với nhau, vấn đề cho member mới sẽ khó để biết nên bắt đầu từ đâu trong 1 khối lớn
- Quá trình development sẽ mất đi tính linh hoạt: thời gian để build feature sẽ bị dài lên, bị block lẫn nhau. Bất kì một sự thay đổi dù nhỏ nào cũng cần build lại toàn bộ dự án => tốn khá nhiều thời gian
- Tính ổn định không cao. Bất kì một lỗi nào có thể khiến toàn bộ application bị crash.
- Tính scalibility khó được đáp ứng trong trường hợp phải đáp ứng một lượng truy cập lớn từ phía yêu cầu của business

## Microservice architecture

Ngoài mô hình monolithic kể trên, hiện nay có 1 architecture khác đang nhận được nhiều sự quan tâm, đó là microservice.
Microservice đề cập đến quá trình phát triển độc lập, tương đối nhỏ theo hướng chia hệ thống ra thành các services. Mỗi service này đều có một logic riêng, một trách nhiệm riêng và có thể được deploy riêng biệt. Khái niệm mircoservice đồng thời đề cập đến xu hướng tách biệt architecture ra thành các loose coupling service, tức là các service này sẽ có một mối liên hệ lỏng lẻo với nhau và mối service sẽ được nằm trong 1 context nhất  định.

So sánh với microservice và SOA (service-oriented architecture), những điểm khác biệt của mô hình microservice là componentization (thành phần hóa), loose coupling (khớp nối lỏng lẻo), autonomy ( tính tự quản lí) và  decentralization (phân cấp), được phản ánh cụ thể qua những khía cạnh sau:

- tập hợp một nhóm nhỏ các service: mức độ chi tiết của một service là nhỏ và mỗi service này sẽ chịu một trách nhiệm cụ thể (single responsiblity) và chỉ tập trung vào nhiệm vụ đó. Ví dụ: storage service sẽ chịu riêng trách nhiệm về lưu trữ
- Việc phát triển và mở rộng một service là hoàn toàn độc lập. Điều này mang lại tính linh hoạt cho hệ thống . Quá trình deliver feature,  release version sẽ dễ dàng và nhanh chóng. Hơn nữa sẽ không còn tình trạng bị block như ở mô hình monolith
- Giảm tải được các mối quan ngại về công nghệ sử dụng. Chọn một công nghệ phù hợp với vấn đề của doanh nghiệp có thể được giải quyết dễ dàng. Các service giap tiếp với nhau thông qua API, do vậy mỗi service có thể dùng một ngôn ngữ riêng biệt. Serivce A dùng Java, Service B dùng Javascript, it's ok !!!!
- Đối với team, microservice đem lại tính độc lập và tự quản lí cho team. Một team sẽ có trách nhiệm toàn bộ với life-cycle của một hay nhiều service. Họ làm việc trong việc context biệt lâp, có thể tự quản lí các quyết định của mình.

Chúng ta có thể thấy rõ toàn bộ ý tưởng của mô hình microservice rất giống cách mà chúng ta chia nhỏ thông tin và kiến thức. Bằng việc tách rời, chia nhỏ và quản lí chúng ta có thể giảm tải sự phức tạp của hệ thống, làm cho việc quản lí trở nên nhanh chóng và dễ dàng, phản ánh sự thay đổi chính xác.

Vậy tại sao chúng ta nên dùng microservice ?

Ở thế kỷ trước, một số lightweight development methods như eXtreme Programming (XP) hay Scrum nổi lên; Đến năm 2001, tuyên ngôn Agile ra đời và một số phương pháp quản lý mới như Lean hay Kanban. Nếu những phương pháp quản lý trên được coi là giải pháp cho việc quản lý tiến độ phát triển phần mềm và việc thực hiện sớm nhất có thể khi có sự thay đổi thì microservice architecture là hướng tiếp cận được nói đến trong công nghệ phần mềm và ở tầng kiến trúc (architecture level). Dưới đây là một biểu đồ so sánh giữa monolith và microservice:

![](https://images.viblo.asia/a3926a91-f71d-49e2-907d-da9fe4e18cd8.png)

### Các thuộc tính của mô hình microservice

- Autonomous (tính tự trị)

    1 service sẽ là 1 đơn vị chức năng, cung cấp API để thực hiện việc trao đổi, giao tiếp với các service khác

- Isolated (tính biệt lập)

    1 serivce sẽ là 1 đơn vị triển khai. Nó có thể được chỉnh sửa, test và deployed như 1 đơn vị mà không ảnh hưởng đến những khía cạnh khác.

- Elastic

    1 service là phi trạng thái (stateless) vì vậy nó có thể scale tùy ý khi cần thiết.

- Resilient

    1 microservice sẽ được thiết kế để chấp nhận các lỗi, các rủi ro có thể xảy ra, các lỗi này là các lỗi có thể chấp nhận được 

- Responsive

    respond cho các request trong khoảng thời gian hợp lý.

- Intelligent

    Tính thông minh ở đây tức là muốn nhắc đến việc hệ thống có thể tìm thấy các endpoint của các microservice đã được đăng kí.

- Message Oriented 

    Mô hình micro-service hoạt động dựa trên giao thức HTTP hoặc message bus để tạo nên sự giao tiếp giữa các service. Điều này đảm bảo tính loose coupling, tính biệt lập và có thể cung cấp lỗi dưới dạng message
    
- Programmable

    Cung cấp API's cho phép truy cập bởi developer và administrator.
    
- Composable

    Bao gồm nhiều microservices.

- Automated

    Lifecycle của Microservice được quản lý thông qua automation bao gồm development, build, test, staging, production và distribution.)

### Microservice advantages
- Mỗi microservice sẽ được chia nhỏ để tập trung vào một business function cụ thể hoặc business requirement.

- Microservices có thể phát triển độc lập bởi một team nhỏ có thể chỉ từ 2 đến 5 developers.

- Microservice đem lại tính loose-coupling và context riêng cho mỗi service, sẽ dễ dàng trong quá trình development cũng như deploy một cách độc lập..

- Microservices có thể phát triển với nhiều ngôn ngữ khác nhau.

- Quá trình phát triển một service sẽ trở nên dễ dàng và linh động thông qua việc sử dụng CI/CD như Travis, Jenskin, Circle CI ....

- 1 new member có thể dễ dàng và nhanh chóng đóng góp cho dự án

- 1 serive trong mô hình micro serivce là tương đối nhỏ, dễ hiểu và được quản lí bởi các thành viên của 1 team nhỏ. Do đó, họ sẽ dễ dàng tập trung vào công việc, nâng cao được hiệu năng.

- Microservices cho phép tận dụng việc áp dụng những công nghệ mới vào dự án.

- Microservices chỉ gồm business logic code và không bao gồm HTML, CSS.

- Việc deploy sẽ mất ít effort cho việc configuraton.

- Dễ dàng tích hợp 3rd-party.

- Mỗi service có dung lượng lưu trữ riêng và có thể có cơ sở dữ liệu riêng.

### Disadvantages of microservice architecture

- Microservice architecture có thể dẫn tối việc sử dụng quá nhiều operations.

- Cần thêm kiến thức về DevOps (http://en.wikipedia.org/wiki/DevOps).

- Effort của team có thể sẽ phải x2.

- Distributed systems (hệ thống phân tán) phức tạp và khó quản lý.

- Số lượng service càng lớn thì vấn đề về management complexity cũng tăng theo.

### References
https://www.cnblogs.com/wintersun/p/6219259.html