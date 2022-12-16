Nhiều người vẫn không phân biệt được sự khác nhau giữa kiến trúc phần mềm và thiết kế phần mềm. Thậm chí với cả những developer, họ vẫn nhầm lẫn giữa *architecture pattern* và *design pattern*. Bản thân cũng là một dev, tôi muốn đơn giản hóa những khái niệm này và trình bày sự khác biệt giữa 2 khái niệm. Bên cạnh đó, tôi cũng sẽ giải thích tại sao một developer nên biết chút ít về *software architecture* và thông thạo *software design*.

### Kiến trúc phần mềm
Nói đơn giản, kiến trúc phần mềm là quá trình chuyển các đặc tính của phần mềm như linh hoạt, khả năng mở rộng, tái sử dụng, bảo mật ... thành một giải pháp có tính tổ chức mà đáp ứng được nhu cầu về business cũng như về mặt kỹ thuật. Định nghĩa này dẫn đến những thắc mắc về đặc tính của phần mềm có thể ảnh hưởng đến kiến trúc thiết kế. Thường thì sẽ có một danh sách các đặc tính chủ yếu để mô tả các yêu cầu business cũng như vận hành, bao gồm cả các yêu cầu kỹ thuật.

### Đặc tính của kiến trúc phần mềm
Như đã nói, đặc tính của phần mềm mô tả những yêu cầu về phần mềm ở cấp độ kỹ thuật và vận hành. Khi product owner nói rằng họ đang phải cạnh tranh trong một môi trường có tốc độ thay đổi lớn, và mô hình kinh doanh nên được thay đổi nhanh chóng. Thì phần mềm nên có đặc tính là "dễ mở rộng, module hóa và dễ bảo trì", để có thể đáp ứng được những "change request" khẩn cấp cần được hoàn thành và hoàn thiện trong thời gian ngắn. Là một *software architect*, bạn nên lưu ý rằng *performance, low fault tolerance, scalability, reliability* là những đặc tính chính của phần mềm.

Sau khi xác định được các đặc tính, thì business owner nói rằng họ chỉ có một số vốn giới hạn cho dự án, thì lúc này, một đặc tính nữa cần quan tâm sẽ là *feasibility* (tính khả thi).

Đây là danh sách các đặc tính của phần mềm, còn được biết với tên *[quality attributes](https://en.wikipedia.org/wiki/List_of_system_quality_attributes)*

### Mẫu kiến trúc phần mềm (Software architecture pattern)

Hầu hết mọi người đều đã nghe về thuật ngữ *Microservices*. Microservice là một trong rất nhiều mẫu kiến trúc phần mềm, chẳng hạn như *Layered Pattern*, *Event-Driven Pattern*, *Serverless Pattern*... Chúng ta sẽ thảo luận về một số mẫu kiến trúc sau. Microservice trở nên nổi tiếng sau khi được áp dụng bởi Amazon và Netflix. Giờ hãy đào sâu vào *architecture pattern*.

**Lưu ý là đừng nhầm lẫn giữa design pattern như Factory hay Adapter với architecture pattern.**

#### Kiến trúc Serverless
Kiểu kiến trúc hướng đến những ứng dụng với giải pháp là sử dụng service của bên thứ 3 để giảm tải sự phức tạp của việc quản lý server và backend. Kiến trúc Serverless được chia ra làm 2 loại chính. Loại đầu tiên là *Backend as a service (BaaS)* và loại thứ 2 là *Function as a Service (FaaS)*. Kiến trúc serverless giúp bạn tiết kiệm thời gian fix bug deploy hoặc các task server thông thường.

Nhà cung cấp serverless thông dụng nhất là Amazon AWS Lambda.

#### Kiến trúc Event-Driven
Kiến trúc này phụ thuộc vào *Event Producer* và *Event Consumer*. Ý tưởng chính là tách hệ thống thành nhiều phần, và mỗi phần sẽ được *trigger* khi có một *event* từ phần khác được *trigger*. Nghe có vẻ hơi phức tạp nhỉ? Giả sử bạn thiết kế một hệ thống cửa hàng online và nó có 2 module. Module đặt hàng và module kho hàng. Nếu một khách hàng đặt hàng, module đặt hàng sẽ sinh ra một sự kiện là *orderPending*. Vì module kho hàng quan tâm đến event *orderPending*, nên nó sẽ nghe được, đấy được gọi là *trigger*. Một khi module kho hàng lấy được event, nó sẽ thực thi một số tác vụ, và từ đó lại có thể bắn ra một số event khác.

Hãy nhớ rằng event-producer không biết event-consumer nào đang nghe event nào. Và consumer cũng không biết event nó đang nghe là event nào. Nói tóm lại là các phần của hệ thống hoàn toàn tách biệt.

Bạn có thể đọc thêm ở [đây](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven).

#### Kiến trúc Microservices
Kiến trúc microservice là kiến trúc phổ biến nhất trong vài năm trở lại đây. Ý tưởng là phát triển những module service nhỏ, độc lập, mỗi service giải quyết một vấn đề riêng biệt. Những service này kết nối với nhau thông qua một API. 

![](https://images.viblo.asia/cfc8e176-69c5-4eb8-92df-1e6233813e21.png)

### Software Design
Trong khi kiến trúc phần mềm chịu trách nhiệm cho phần khung và cơ sở hạ tầng của phần mềm, thì thiết kế phần mềm lại chịu trách nhiệm cho phần thiết kế ở mức độ code, chẳng hạn như module này làm gì, phạm vi class, mục đích của function...

Là một developer, chắc hẳn bạn phải biết được nguyên lý SOLID, và cách một *design pattern* giải quyết các vấn đề thông dụng ra sao.

SOLID bao gồm Single Responsibility, Open Closed, Liskov substitution, Interface Segregation và Dependency Inversion Principles.
- Single Responsibility Principle: nghĩa là mỗi class chỉ có một mục đích và một lý do để thay đổi
- Open Closed Principle: class phải dễ mở rộng nhưng khó chỉnh sửa. Nói đơn giản là bạn có thể thêm function vào class nhưng khó sửa các function hiện tại.
- Liskov substitution principle: nôm na là class con nên có thể thay thế class cha mà không phá vỡ logic của ứng dụng
- Interface Segregation Principle: đơn giản là phân loại Interface, thay vì dồn chức năng vào hết chỉ một Interface
- Dependency Inversion Principle: nôm na là mọi thành phần nên phụ thuộc vào abstraction, chứ không nên phụ thuộc vào một thiết lập cụ thể nào

### Design Patterns
#### Factory Pattern
Đây là design pattern được dùng nhiều nhất vì nó tiết kiệm thời gian khi bạn muốn chỉnh sửa class.
Giả sử bạn muốn khởi tạo class User, có 2 cách như sau:
1 — $users = new Users(); 
2 — $users = DataFactory::get(‘Users’);

![](https://images.viblo.asia/50765f4a-0447-46d1-944a-487e13caddde.png)

Tôi thích cách thứ 2 vì 2 lý do trong vô vàn lý do. Thứ nhất, thay tên class từ "Users" thành "UsersData" chỉ yêu cầu đổi tên chỉ một lần ở một nơi và phần code còn lại của bạn vẫn hoạt động bình thường. Thứ 2, nếu class Users cần thêm tham số, chẳng hạn Users($connection), thì bạn cũng chỉ cần sửa nó ở một chỗ thay vì tất cả những chố đang require object Users.

#### Adapter Pattern
Từ cái tên chắc bạn cũng hình dung ra được mục đích của design pattern này rồi. Giả sử bạn cần làm việc với Youtube API, và để lấy access token, bạn phải gọi hàm *getYoutubeToken()*

![](https://images.viblo.asia/794ff716-2105-4734-b69b-50996a46b149.png)

Bạn gọi hàm này ở vài chục nơi khác nhau trong code.

![](https://images.viblo.asia/2ca5bddc-8572-44f9-84a7-ddc18abc9857.png)

Một ngày nọ, Google update version mới cho API của Youtube và đổi tên thành *getAccessToken()*

![](https://images.viblo.asia/31015c71-6bab-486d-ba1d-f236558942a7.png)

Giờ nhiệm vụ của bạn là tìm và sửa tên hàm ở mọi nơi trong ứng dụng

![](https://images.viblo.asia/559e9780-6c54-49a5-a5c6-d34540a3c645.png)

![](https://images.viblo.asia/684a1092-78d4-419b-b171-b2f7dfed8c0d.png)

Còn nếu bạn dùng Adapter pattern, bạn chỉ cần phải sửa một dòng và ứng dụng sẽ hoạt động như cũ.

![](https://images.viblo.asia/72da6ff5-90bd-4793-8dc6-1fe6b9b75d96.png)

Vì bài viết này không phải nói về design pattern, nên nếu bạn muốn tìm hiểu thêm thì có thể vào đây [http://www.phptherightway.com/pages/Design-Patterns.html](http://www.phptherightway.com/pages/Design-Patterns.html)

**Hãy nhớ luôn có sự khác biệt giữa một software architect và một software developer. Software architects thường là team leader có kinh nghiệm và kiến thức về những solution, giúp họ ra quyết định đúng đắn trong pha lập kế hoạch. Còn một software developer thì nên biết về design pattern và một chút ít về software architecture để có thể dễ dàng kết nối trong team.**

Lược dịch: [https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)