Trước khi vào bài viết này, mình đã ngồi rất lâu, hút rất nhiều thuốc, chỉ để suy nghĩ về việc một developer của năm 2019 có cần phải biết tới cái thứ khỉ gió gọi là **container-native** là gì không. Sau cùng, mình đã đi đến kết luận: dù mình không biết hút thuốc (và cũng chưa hút được điếu nào) nhưng mà một developer hiện đại thì cần phải biết tới khái niệm này.

Vậy thì **container-native** là gì mà mình lại phải lao tâm khổ tứ tới vậy? Nó có giúp thế giới hòa bình không? Nó có giúp cuộc cách mạng công nghệ vĩ đại 4.0 đi lên 1 nấc thang mới hay không? Hay có giúp Việt Nam sánh vai cùng với các cường quốc năm châu trên thế giới hay không? 

Câu trả lời là có (thể). Và tất cả những điều đó chính là nhờ một phần lớn ở công lao học tập của các bạn. Những người đang ngồi trước màn hình vi tính đọc bài viết này.

## First things first

Mình là Monmen, và hôm nay mình sẽ cùng các bạn đi tìm hiểu một khái niệm rất mới nhưng lại chứa những thứ rất cũ là **container-native**. Bài viết này sẽ nói về việc nó là gì (theo cách hiểu nôm na của chúng ta), nó có tác dụng gì trong phát triển phần mềm và hay ho hơn là 1 số practices mình tích cóp được khi thực hiện nó.

Để có thể follow được bài viết này, mình khuyến nghị các bạn nên có 1 số kiến thức nền tảng trước:

- Container là gì, docker container là gì.
- Biến môi trường (environment variables).
- Quản lý state của application, stateless / stateful application.

Tạm thời thế, giờ hãy đi vào chi tiết.

## Container-native là gì?

Searching...

Still searching...

Thật kỳ lạ là mình không thể tìm ra một định nghĩa chính thức về khái niệm này. Người ta nhắc tới nó, người ta làm việc với nó, người ta trao đổi về nó,... tất cả đều chỉ dựa trên một ý niệm mơ hồ về định nghĩa thế nào là "container-native". May thay 1 bác bên techcrunch có đưa ra 1 định nghĩa khá sát về khái niệm **container-native**:

- Software that treats the container as the first-class unit of infrastructure (as opposed to, for example, treating the physical machine or the virtual machine as the first-class unit)
- Software that does not just “happen to work” in, on or around containers, but rather is purposefully designed for containers

Đại khái định nghĩa này nói rằng bạn 1 là phải coi container là thứ sẽ triển khai ứng dụng của bạn, không phải 1 con VM hay máy chủ vật lý. Thứ 2 là việc bạn định hướng container-native phải được làm từ đầu khi khởi tạo ứng dụng, chứ không phải là cứ code rồi... **Bụp** một cái mang nó vào container là chạy được.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/p88wzx7z6n_3fzwq6.jpg)

Nghe thì gật gù bảo ờ cũng đúng, nhưng nó lại mơ hồ quá, không rõ ràng là bạn sẽ phải làm cái gì để đạt tới cái cảnh giới gọi là **container-native** đó đúng không? 

## Đặc điểm của container-native application

Sau đây là một số đặc điểm mình đã đúc kết được (và cũng là các yêu cầu luôn) để app của các bạn được gọi là **container-native**:

- **All in container:** Mọi thứ cần để code của bạn chạy đều có trong container.
- **Stateless container:** Container không chứa những gì liên quan tới **state**, tức là container sẽ không chứa database, session, uploaded file,...
- **One image - multiple environments:** Image để tạo nên container có thể được chạy trên nhiều môi trường. Để làm được điều này thì image sẽ không chứa config liên quan tới việc **tương tác** với môi trường ngoài container.
- **Graceful start and shutdown:** Việc khởi chạy và dừng app phải được xử lý mượt mà, không để lại các loại rác tài nguyên (như connection, temp)

Trên đây chỉ là 4 điểm **cơ bản** thôi. Có rất nhiều thứ phải làm nữa để các bạn đạt được tới level **container-native** như kiến trúc xử lý concurrency, security, monitoring,... tuy nhiên đó là những thứ cho bọn đầu có sỏi rồi. Mình nông dân thì cứ bắt đầu với mấy cái này đã.

Giờ hãy cùng đi sâu hơn vào từng đặc điểm nhé.

### Mọi thứ có trong container 

Đây là bước đầu tiên cần phải thực hiện. Container tương tự một cái hộp đen được dùng để chạy code của các bạn. Giờ người ta chỉ cần cho nó đầu vào là config, đầu ra là kết quả, còn trong cái hộp đen ấy làm sao để chạy được code thì đó là việc của thằng dev chúng ta. Sau đây là checklist để các bạn thực hiện:

- [ ] **System OS** và **system dependencies** đầy đủ phục vụ cho quá trình build và chạy. Nếu bạn cần có `node` để chạy code, hãy cài node vào container. Nếu bạn cần `npm` để quản lý dependencies, hãy cài `npm` vào container,... Việc này làm ứng dụng của các bạn không phụ thuộc vào bất kỳ 1 thành phần `global` nào đó của hệ thống bên ngoài (mà rất dễ conflict nhau). Eg: 2 project yêu cầu 2 version PHP khác nhau,...
- [ ] Quản lý **application dependencies** bằng các package manager như composer, npm, gem,... và cài đặt nó khi build image. Có cơ chế **lock dependencies** để đảm bảo có được version như ý khi build. Việc này giúp các bạn phòng tránh việc 1 ngày đẹp trời tác giả package kia update code và... **boom**, hệ thống triệu đô của bạn đi đời.
- [ ] Phần quan trọng nhất đây: **Code của các bạn**. Nhiều bạn sử dụng container giống như một máy ảo thuần túy để giả lập môi trường và `mount code từ ngoài` vào. Tuy nhiên chúng ta không nên làm như vậy. Việc build code thành file chạy, hoặc kể cả không build đi nữa, cũng nên được thực hiện hoàn toàn trong container và được đóng gói vào image. 

Mấy cái đầu này dễ nè. Không cần phải sửa quá nhiều ứng dụng cổ lỗ sĩ của bạn cũng đáp ứng được. Các đặc điểm phía sau đây mới khiến các bạn phải đau đầu refactor đó.

### Stateless container 

Tiếp theo là đặc điểm không kém phần quan trọng, đó là thiết kế một **stateless container**. Các bạn cứ tưởng tượng rằng chi phí để chạy 1 container thấp hơn chi phí để chạy 1 máy ảo rất nhiều. (So sánh hơi khập khiễng nhưng dễ hiểu). Do vậy mô hình triển khai container sẽ là tận dụng sức mạnh của sự phân tán, chạy nhiều container song song chứ không phải chạy 1-2 máy ảo siêu to khổng lồ. Và như vậy thì vấn đề gì sẽ xảy ra?

**State**. Tất cả mọi thứ liên quan tới **state** sẽ là điểm yếu của mô hình triển khai container. State nôm na là **data được sinh ra trong quá trình runtime**, chứa trong **database**, **file**, **ram**,.... có tầm ảnh hưởng ở toàn bộ application. Nếu bạn tạo 1 file session trên container 1, thì container 2 cũng cần phải biết tới sự tồn tại của file session đó. Chính vì điều này mà **state** sẽ không được chứa trong container mà được đẩy ra bên ngoài. Dưới đây là 1 số thứ cơ bản sẽ được sử dụng bên ngoài container app:

- [ ] Database (cái này dễ)
- [ ] User-generated content (uploaded file thì lưu ra s3, chỗ chứa file tập trung, session thì lưu trên memory cache bên ngoài như redis,...)
- [ ] Nói không với **Runtime static asset** (như Yii2 asset), thay bằng **On-build static asset**, tức là asset được tạo ra trong quá trình build.
- [ ] Log (log ra stdout của container)

### One image - multiple environments

Đặc điểm này trái ngược với cái **Mọi thứ có trong container** phía trên. Nó giúp các môi trường chạy code của bạn được đồng nhất. Nhưng làm sao để 1 image chứa code có thể chạy được cả trên local, cả trên dev, staging, production,...? Bằng cách biến container của bạn thành 1 cái function khổng lồ, có **đầy đủ mọi tham số cần thiết trong đầu vào** chứ không phải fix cứng trong function. Nghĩa là những thứ gì thuộc về **config**, như **thông số chạy app**, **thông tin kết nối DB**, **thirt-party url**,... sẽ được truyền từ bên ngoài container vào.

Việc này được thực hiện bằng cách:

- [ ] Đẩy mọi **yếu tố liên quan tới bên ngoài** ra bên ngoài - trở thành tham số
- [ ] Đọc các tham số này trong **biến môi trường** hoặc **file config được mount từ ngoài**

Đơn giản là việc bạn cấu hình app của bạn làm sao để mọi thứ đều có thể thay đổi được thông qua 1 biến môi trường. Có rất nhiều thư viện đọc biến môi trường trên các ngôn ngữ như `dotenv`,.... mà bạn có thể dễ dàng sử dụng.

> Tips: Ứng dụng khó triển khai đặc điểm này nhất chính là các ứng dụng SPA. Tuy nhiên bạn có thể theo 1 cách cực kỳ **nông dân** nhưng không kém phần **hiệu quả** là sử dụng lệnh `envsubst` khi start container được mình mô tả trong [bài viết này](https://kipalog.com/posts/Tu-phat-trien-toi-trien-khai-phan-2--Frontend--VueJS--SPA---SSR)

### Graceful start and shutdown

Nôm na là bạn phải quản lý **Application Life Cycle** - vòng đời của ứng dụng. Các bạn phải biết khi start ứng dụng lên nó sẽ làm những việc gì, bao giờ thì sẵn sàng,... Và khi tắt thì sẽ đóng connection như nào, thu hồi tài nguyên ra sao,...

Cái này khó thực hiện à nha. Tuy nhiên một số loại ngôn ngữ các bạn sẽ không cần phải để ý nhiều tới vấn đề này khi web server / framework đã xử lý dùm cho bạn. Tuy nhiên mình khuyên các bạn nên tìm hiểu kỹ và can thiệp nếu không muốn ứng dụng của mình cứ update là xảy ra lỗi. Đơn giản là:

- [ ] Có cách kiểm tra khi ứng dụng của bạn đã sẵn sàng (khởi động thành công) như health check, ready check,...
- [ ] Xử lý các lỗi xảy ra khi runtime không thể phục hồi (như mất kết nối DB,...) và tắt ứng dụng có chủ đích.
- [ ] Xử lý các signal được gửi đến từ môi trường khi container hay process bị dừng (SIGTERM, SIGKILL,...)

## Kiến trúc của một ứng dụng container native đơn giản

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/trzahwsaym_Container-native.png)

## Tổng kết

Vậy thì chốt lại là bạn phải biết cái **container-native** này để làm gì? Chỉ để ứng dụng của bạn **có thể triển khai bằng container** thôi hở? =))) 

Nghe oách xà lách mà? Container đang là từ khóa hot của giới công nghệ mà. Tội gì mà không đú trend?

Tuy nhiên ngoài việc **cho nó oách** thì nó cũng là thứ khiến cho ứng dụng của các bạn:

- Tránh được lỗi: local ngon nhưng production chết, hay 1 ngày đẹp trời production cũng chết
- Zero-downtime 
- Scale được
- Phù hợp với các nền tảng cloud
- Phù hợp với kiến trúc micro-service và mô hình phân tán
- ....

Nghe kích thích đấy chứ? Bạn đã sẵn sàng để bắt tay vào làm **container-native** application ngay chưa hay còn đợi chi?

## Link tham khảo

- [Let’s define “container-native”](https://techcrunch.com/2016/04/27/lets-define-container-native/)
- [Container Ready Applications with Twelve-Factor App and Microservices Architecture](https://medium.com/capital-one-tech/container-ready-applications-with-twelve-factor-app-and-microservices-architecture-16af683a767f)
- [The Twelve-Factor App](https://12factor.net/)