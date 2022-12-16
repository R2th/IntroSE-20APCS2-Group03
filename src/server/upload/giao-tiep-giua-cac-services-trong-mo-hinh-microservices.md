Ở các app được thiết kế theo mô hình monolithic, 1 component sẽ invoke 1 component khác bằng cách sử dụng language-level method hoặc call function.
Có 2 cách cụ thể để bạn có thể làm điều này: 
- Coupled way: Tạo instance objects (ví dụ `new Classname()`)
- Decoupled way: sử dụng Dependency Injection.

Vậy trong hệ thống micro-service các component có giao tiếp với nhau theo cách này không ? Khó khăn lớn nhất gặp phải khi chuyển từ mô hình monolithic qua mô hình micro-service là gì ? Chúng ta sẽ cùng đi qua bài viết này để làm rõ vấn đề này.

### Cách thức giao tiếp giữa các micro-service

Môt trong những khó khăn lớn nhất khi chuyển đổi hệ thống từ monolithic qua micro service có lẽ là sự thay đổi cách thức giao tiếp.

Chúng ta sẽ không thể sử dụng cách làm trực tiếp từ mô hình monolithic và apply sang mô hình micro-service, bởi vì cách làm này sẽ ko đem lại hiệu quả trong một mô hình hệ thống phân tán (distributed system)

Để giải quyết vấn đề communication trong micro-service, cần có những giải pháp cụ thể. Những giải pháp này phải đảm bảo khi triển khai vẫn nguyên được các đặc tính của service trong micro-serivce.

Một microservices-based application, về cơ bản, là một hệ thống phân tán chạy mutiple processes hoặc multiple services, thậm chí có thể  là mutiple server hoặc host. Mỗi một serivce instance là 1 tượng trưng tiêu biểu cho 1 process. Do đó, các services muốn interact với nhau buộc phải sử dụng inter-process communication protocol chẳng hạn như HTTP, AMQP hoặc là binary protocol như TCP, phụ thuộc vào tính chất của service.

Ở thời điểm hiện tại, có 2 protocols type được sử dụng phổ biến là: 
- **Synchronous protocol** (chủ yếu sử dụng cho việc query data) với ví dụ điển hình là HTTP request/response với REST.
- **Asynchronous protocol** hay còn được gọi là lightweight asynchronous messaging (sử dụng cho việc update communication cho mutiple service. eg: emit an event)

### Synchnorous protocol và asynchnorous protocol

Client và services có thể giao tiếp với nhau qua nhiều cách khác nhau, phụ thuộc vào tình huống và mục tiêu. Về cơ bản, chúng ta có thể  chia ra 2 loại comunication cơ bản:
- **Synchronous protocol** (giao thức đồng bộ): Ví dụ tiêu biểu nhất cho synchronous protocol là HTTP/HTTPS request/response. Client sẽ send 1 request và đợi response trả về từ phía service. Vậy tại sao HTTP/HTTPS lại gọi là synchronous ?. Lí do là client chỉ có thể thực hiện tác vụ tiếp theo khi mà nó hoàn thành việc nhận được response từ server.
- **Asynchronous protocol** : đó là những giao thức khác như AMQP (là loại giao thức được cung cấp bởi multiple OS hoặc cloud) sử dụng asynchronous message (hệ thống message bất đồng bộ). Điểm khác biệt rõ nhất khác với synchronous của asynchronous là client hoặc message sender sẽ không phải đợi response trả về mới có thể tiếp tục thực hiện tác vụ khác. Khi mà một message gửi đi, nó sẽ được handle bởi queue hoặc các message broker khác.

Một microservice-based application sẽ thường sử dụng kết hợp cả 2 loại Synchronous và Asynchronous protocol. Tuy nhiên, phổ biến hơn vẫn là việc sử dụng HTTP/HTTPS để invoke API HTTP. Đồng thời, async protocol sẽ được tận dụng cho việc giao tiếp bất đông bộ giữa các service.
### Request/response communication with HTTP and REST

Ở phía trên mình đã giới thiệu xong 2 loại comunication trong mô hình micro-serice. Việc lựa chọn loại nào sẽ phụ thuộc vào mục đích cũng như tính chất của communication. Chẳng hạn, communication bạn cần thực thi là dạng request/response, HTTP và REST sẽ là protocol phổ biến và hiệu quả nhất, đặc biệt khi bạn published các serivce ra khỏi Docker host hoặc micro-service cluster. Còn nếu trường hợp comunication bạn cần thực thi là comunication giữa các service mang tính internal (nội bộ), bạn có thể cân nhắc đến việc sử dụng binary format communication mechanisms như TCP, WCF ... hoặc là message-based communication mechanisms (async protocol)

Sau đây, mình sẽ giới thiệu một comunication style phổ biến nhất với kiểu request/response comunication: HTTP and REST

![Request/response comunication](https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/architect-microservice-container-applications/media/image16.png)

Khi 1 client sử dung request/response comunication. client sẽ send 1 request, service nhận request tiến hành việc xử lí và  trả về response. Vì vây, request/response communication sẽ mang tính chất synchnorous. Request/response comunication thích hợp cho việc query data từ phía UI của client. Trong một mô hình mirco-serive, chắc chắn bạn nên sử dụng request/response comunication mechanism cho việc query data.

Khi hệ thống micro-serivce sử dụng request/response comunication, các yếu tố sau cần được đảm bảo:

- Client phải nhận được response trong 1 khoảng thời gian ngắn, thường là nhỏ hơn 1-2s
- Đối với trường hợp delayed response, bạn nên sử dụng cách tiếp cận khác. Đó là asynchronous comunication

Đại diện tiểu biểu cho request/response communication: REST. REST , được implement cùng với HTTP protocols, với các HTTP verbs: GET, POST, PUT, OPTION, HEAD sẽ là cách tiếp cận phù hợp nhất với request/response communication. Hơn thế nữa, hầu hết với bất kì ngôn ngữ nào PHP, Javascript, .NET... việc implement REST là không hề khó khăn.
### Reference
[Communication In Microservice Architecture](https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/architect-microservice-container-applications/communication-in-microservice-architecture)