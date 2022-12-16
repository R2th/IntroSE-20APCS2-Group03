### Giới thiệu
Ngày nay các phần mềm được triển khai dưới dạng các dịch vụ, chúng được gọi là các web apps hay software-as-a-service (SaaS). Các web apps ngày một phức tạp đòi hỏi phải có một phương pháp cụ thể để xây dựng ứng dụng một cách nhanh chóng cũng như việc dễ dàng triển khai, mở rộng. Do đó `The Twelve-Factor App`  ra đời nhằm giải quyết các vấn đề được đặt ra. `The Twelve-Factor App` được xây dựng dựa trên các tiêu chí:
    
* Sử dụng các định dạng thiết lập tự động hóa nhằm giảm thời gian và công sức cho các lập trình viên mới khi tham gia dự án.
* Có các quy ước rõ rang với các hệ điều hành bên dưới,  cung cấp tối đa khả năng chuyển đổi giữa các môi trường thực thi. 
* Phù hợp triển khai trên các cloud platform nhằm cắt giảm yêu cầu về servers và quản trị hệ thống.
* Tối thiểu hóa sự khác biệt giữa các môi trường (development và production) nhằm đạt được sự linh hoạt tối đa trong phát triển liên tục (continuous deployment)
* Cung cấp khả năng mở rộng mà không cần thay đổi công cụ, kiến trúc, cách thức phát triển.

`The Tewlve-Factor App` không bị ràng buộc bởi bất kỳ ngôn ngữ lập trình hay sofware stacks nào vì vậy nó có thể ứng dụng vào rất nhiều loại application. `The Tewlve-Factor App`ngày một trở nên phổ biến khi các công ty bắt đầu dần chuyển sang sử dụng công nghệ container nhằm hướng đến việc xây dựng những dịch vụ một cách tốt hơn. Đây là một tập hợp gồm 12 yếu tố đã được những chuyên gia có kinh nghiệm trong việc phát triển phần mềm đúc kết từ việc phát triển và triển khai hàng trăm dịch vụ. Các yếu tố gồm có:
1. Code base
2. Dependencies
3. Config
4. Backing services
5. Build, release and run
6. Processes
7. Port binding
8. Concurrency
9. Disposability
10. Dev/prod parity
11. Logs
12. Admin processes

### 1. Code base
Yếu tố đầu tiên trong 12 yếu tố là `Code base`. Yếu tố này được hiểu là bạn cần phải thực hiện việc quản lý, tracking code base thông qua các hệ thống `Version control system` như Github, Gitlab, Subversion, ... 
Mỗi một application nên được gắn với một code base và được quản lý trên một repo (quan hệ 1 - 1).
* Nếu có nhiều code bases thì nó không phải là một ứng dụng mà được coi như là 1 hệ thống phân tán. Mỗi component trong hệ thống phân tán được coi là một ứng dụng và 1 ứng dụng riêng đó chúng ta có thể áp dụng 12 yếu tố của  `The Tewlve-Factor App`.
* Nhiều ứng dụng cùng chia sẻ một phần source code là vi phạm nguyên tắc của `The Tewlve-Factor App`. Trong trường hợp này phần source code sử dụng chung nên được tách thành library và được sử dụng như là 1 dependency.

Một lưu ý trong việc quản lý code base trên version control system là chúng ta nên sử dụng những quy định chung như git-flow trong việc đặt tên nhánh, commit, ... giữa các thành viên. Việc làm này sẽ giúp việc quản lý code base trở nên dễ dàng hơn cũng như thuận lợi hơn trong việc triển khai CI/CD pipeline.

### 2. Dependencies
Dependencies có thể hiểu là các packages, libraries được cài đặt để có thể chạy 1 application.Khi nhắc đến dependencies chúng ta cần quan tâm đến 2 yếu tố:

***Quản lý dependencies:***
Các ngôn ngữ lập trình thông thường được đi kèm với một công cụ giúp quản lý dependencies (package manager) như Nodejs (npm, yarn), Ruby (gem), Python (pip), Java (maven, gradle), ...
Các công cụ quản lý dependencies thường cung cấp khả năng giúp chúng ta có thể khai báo các dependencies thông qua file Ruby (Gemfile), Nodejs (package.json), Java (pom.xml), Python (requiments.txt), ... Việc khai báo rõ ràng các dependencies có lợi ích giúp đơn giản hóa quá trình cài đặt cho một lập trình viên mới.
 
***Cô lập dependencies:*** 
Các dependencies phải tách biệt trong từng app. Điều này tại sao lại quan trọng?

Ví dụ chúng ta có 2 ứng dụng trên cùng một máy. Ứng dụng A sử dụng thư viện library X version 1.0, ứng dụng B sử dụng thư viện library X nhưng là version 1.1. Nếu không cô lập dependencies cho từng ứng dụng mà để ứng dụng A và B cùng phụ thuộc ngầm vào library X có thể dẫn đến tình trạng conflict dependencies dẫn tới 1 hoặc cả 2 ứng dụng không hoạt động được. Để giải quyết vấn đề này các dependencies nên được khai báo rõ version và được cài đặt trong ứng dụng, chạy trong ứng dụng. Các ngôn ngữ lập trình thường cũng cung cấp công cụ để làm việc này như Ruby (Bundler), Python (virtualenv), ... Ngoài ra chúng ta có thể sử dụng công nghệ container như Docker để tạo ra các môi trường ảo nhằm cô lập dependencies và application với môi trường bên ngoài của máy.   

### 3. Config
Một ứng dụng có thể chạy ở nhiều môi trường khác nhau như development, staging, production. Việc quản lý các configurations sao cho hiệu quả giúp cho việc chuyển đổi giữa các môi trường một cách linh hoạt. Chắc chắn là chúng ta không làm theo kiểu **nông dân** là hard code rồi chỉnh sửa lại source code mỗi khi thay đổi môi trường rồi :). Để sử dụng config thông thường chúng ta có 2 cách là sử dụng file để lưu hoặc sử dụng environment variables. `The Tewlve-Factor App` khuyến khích việc sử dụng environment variables để thay đổi runtime configuration giúp cho việc dễ dàng triển khai mà không cần phải thay đổi source code và cũng để tránh những tình huống éo le như push config của môi trường production lên version control system.

### 4. Backing services
Thông thường một application khi triển khai trên môi trường production cần phải kết nối với rất nhiều các services khác nhau (Database, Mail server, Cache server...). Theo `The Tewlve-Factor App` thì những service này nên được tách rời với application được sử dụng như các tài nguyên, có thể thay đổi thông qua chỉnh sửa config. Điều này giúp chúng ta dễ dàng thay đổi, nâng cấp mà không cần đụng tới application hiện tại.

VD: Trên môi trường local chúng ta có thể kết nối đến database MongoDB ở local nhưng khi deploy chúng ta có thể chỉnh sửa config của server để kết nối application chúng ta với MongoDB ở trên dịch vụ cloud như Mongo Atlas mà không cần đụng tới hay làm ảnh hưởng application của chúng ta.
![](https://images.viblo.asia/8e50bd33-17fc-4457-b6b5-6a388dc0be00.PNG)

### 5. Build, release, run
Để triển khai ứng dụng từ source code cần các công đoạn:
* ***Build:*** Lấy source code, cài đặt các dependencies, build code thành binary (tùy ngôn ngữ).
* ***Release:*** Kết hợp source code đã được build với các config của môi trường để tạo ra `Release Object`
* ***Run:*** Thực thi ứng dụng thông qua việc thực thi process với `Release Object`

![](https://images.viblo.asia/6383cc08-d17c-4de0-a763-4e062a7eaa04.PNG)

Việc phân tách thành 3 bước có những lợi ích sau:
* Ngăn cản việc thay đổi source code trực tiếp khi application đang chạy.
* Dễ dàng rollback khi hệ thống có vấn đề.
* Dễ dàng restart khi hệ thống crash hoặc server gặp vấn đề.

Có một điểm cần lưu ý là đối với mỗi `Release Object` nên được gán với một unique Id, bất kể 1 thay đổi nào cũng cần tạo ra 1 Id mới nhằm mục đích có thể rollback về version cũ một cách dễ dàng và chính xác.

### 6. Processes
`The Tewlve-Factor App` khuyến khích việc chạy application dưới dạng 1 hoặc nhiều stateless processes.

**Stateless process:**  là các process không lưu trữ những dữ liệu về trạng thái của application cũng như các kết quả của việc xử lý request hay transaction. Sau khi các request được xử lý, những dữ liệu trong memory sẽ bị xóa đi.

**Stateful process:** là các process lưu trữ lại dữ liệu về trạng thái hay kết quả xử lý vào trong memory.

Trong trường hợp muốn lưu lại trạng thái của application thì chúng ta sẽ phải lưu thông qua các `Backing services`.
VD: Trong trường hợp sử dụng [Sticky session](https://www.imperva.com/learn/availability/sticky-session-persistence-and-cookies/#:~:text=With%20sticky%20sessions%2C%20a%20load,the%20duration%20of%20the%20session.) trong Load balancer. Sticky session sẽ lưu dữ liệu của người dùng, request, hay transaction vào trong memory của từng server. Điều này sẽ vi phạm `The Tewlve-Factor App`. Thay vào đó chúng ta có thể sử dụng Redis hay Memcached như một `Backing service` để làm nhiệm vụ lưu trữ lại dữ liệu.

Sử dụng stateless process sẽ mang lại những lợi ích như:
* Dễ dàng deploy, thay đổi config, restart mà không sợ mất dữ liệu vì dữ liệu được lưu ở `Backing services` chứ không ở memory.
* Các stateless process có thể thực thi hoàn toàn độc lập do đó dễ dàng scale bằng cách tăng số lượng process.

### Kết
Trong bài viết này mình giới thiệu 6 factors đầu tiên trong `The Tewlve-Factor App`. Có thể các bạn cũng đã từng áp dụng những factors này trong các dự án tuy nhiên chưa được hệ thống hóa một cách rõ ràng. Trong bài viết tiếp theo mình sẽ giới thiệu tiếp những factors còn lại (hoặc các bạn có thể tham khảo thêm trong tài liệu tham khảo :)). Hy vọng bài viết có ích và nhận được sự quan tâm từ mọi người.


### Tham khảo
https://12factor.net/