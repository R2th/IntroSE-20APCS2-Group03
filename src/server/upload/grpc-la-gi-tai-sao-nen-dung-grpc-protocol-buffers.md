Để phát triển hệ thống lớn, chúng ta thường áp dụng kiến trúc microservice, vấn đề chúng ta thường gặp phải là các service giao tiếp với nhau bằng cách nào, theo phương thức nào?
Các service có thể giao tiếp với nhau bằng nhiều cách, tùy theo ngữ cảnh.
Khi message cần được được xử lí ở nhiều service khác nhau không yêu cầu phản hồi kết quả ngay lập tức, hoặc message xử lí tốn rất nhiều thời gian thì người ta thường sử dụng message broker. Tiêu biểu như là RabbitMQ, Kafka, nếu hệ thống đang sử dụng dịch vụ cloud của AWS thì có thể dùng Simple Queue Service(SQS) queue. Trường hợp này nằm ngoài scope của bài viết, nên mình sẽ không bàn luận sâu.

Tiếp theo...

Nếu các service giao tiếp với nhau cần phản hồi kết quả ngay  thì thông thường người ta sẽ gọi trực tiếp qua REST API. Để các service trao đổi thông tin trực tiếp được thì các service phải đồng nhất về:
* Bên gửi/nhận phải đồng nhất về format dữ liệu của API
* Phải thống nhất về định nghĩa error pattern
* Load balancing
* Other...

Ngoài ra, để xây dựng API chúng ta cần suy nghĩ về cách gọi API, cách xử lí lỗi. Bao nhiêu dữ liệu nên có trong một API, nếu một API chứa ít dữ liệu thì chúng ta phải gọi nhiều API khác nhau cùng lúc. Nếu một API chứa quá nhiều dữ liệu thì có thể dẫn tới dư thừa... Nói tới đây có thể bạn đang nghĩ tới dùng GraphQL để giải quyết vấn đề này. Ok, đó cũng là một giải pháp. Ngoài GraphQL, ***gRPC sẽ giải quyết được các vấn đề nêu trên***, gRPC cũng có ưu điểm hơn GraphQL nhưng chúng ta sẽ cùng bàn luận ở bài viết khác.

## 1. gRPC là gì?
gRPC là một framework open-source được phát triển bởi google dùng để hiện thực RPC(Remote Procedure Calls) API thông qua HTTP/2. gRCP là một phần của Cloud Native Computation Foundation giống Docker hay Kubernetes

gRPC cung cấp một hiện thực mới cho RPC bằng cách làm cho nó có thể tương thích, hiện đại và hiệu quả nhờ sử dụng các công nghệ như Protocol buffers và HTTP/2.

Vậy, RPC(Remote Procedure Calls), HTTP/2 và Protocol buffers là gì? Chúng ta cùng tìm hiểu nhé.

## 1.1 RPC(Remote Procedure Calls) là gì?
RPC(Remote Procedure Calls) là một kiểu API lâu đời nhất, xuất hiện sớm hơn cả REST API. RPC là một dạng giao tiếp Client-server sử dụng hàm, chứ không sử dụng HTTP thông thường.
RPC trong gRPC chính là Remote Procedure Calls. Google tạo ra gRPC kế thừa từ RPC, sau đó cải tiến thử nghiệm và trở nên phổ biến trong thời gian qua.

## 1.2 HTTP/2
Trước khi tìm hiểu về HTTP 2. Chúng ta hãy cùng nhìn sơ qua về HTTP 1.1

HTTP 1.1 ra đời vào năm 1997. Với mỗi request được gửi từ client đến server, TCP connection sẽ được tạo ra. Việc xử lí connection phải tiến hành qua quy trình bắt tay ba bước như hình. Điều này làm tốn khá nhiều thời gian. 
| ![Ảnh từ trang https://www.ionos.co.uk](https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Schaubilder/EN-tcp.png) | 
|:--:| 
| *Ảnh từ trang https://www.ionos.co.uk* |

Ngoài ra, các header trong mỗi request có dạng plain text với rất nhiều trường dữ liệu và không được nén lại, các header thông thường có dữ liệu giống nhau. Vậy nên, header chiếm kích thước đáng kể và bị trùng lặp nhiều lần trong các request => Sẽ tốn nhiều băng thông.

HTTP 2 ra đời 2015 do Google tạo ra để khắc phục các vấn đề trên.

HTTP 2 hỗ trợ multiplexing. HTTP 2 có thể gửi nhiều request song song trên một TCP connection được thiết lập. Nhờ vậy mà trang web có thể load nhanh hơn rất nhiều.
| ![Ảnh factoryhr trên medium](https://miro.medium.com/max/700/0*lY05UTuA-dWCXU-q.png) | 
|:--:| 
| *Ảnh factoryhr trên medium* |


HTTP 2 sử dụng HPACK như một cách đơn giản và bảo mật để nén các header lại. Client và server sẽ lưu giữ danh sách header, từ đó, HTTP 2 có thể biết được header có cùng dữ liệu hay không, HTTP 2 chỉ gửi những header khác giữ liệu so với các header trước.
Ở HTTP 1, server chỉ có nhiệm vụ nhận request, xử lí và trả về kết quả. Nhưng ở HTTP 2 còn hỗ trợ server push, nghĩa là server có thể tự push thông tin tới client. Đây là một một tính năng mới mà HTTP 1 chưa có. 

## 1.3 Protocol buffers
Protocol buffers là một công nghệ phổ biến để cấu trúc dữ liệu được phát triển và sử dụng trong việc giao tiếp giữa các service của google. Developer sẽ định nghĩa cấu trúc dữ liệu trong file .proto. Sau đó, Protoc compiler biên dịch file .proto sang bất kì ngôn ngữ nào mà nó hỗ trợ. Lúc chạy, dữ liệu sẽ được nén và chuẩn hóa sang dạng binary.

Khi sử dụng protocol buffers, code có thể generate tự động theo ngôn ngữ, cách định nghĩa .proto cũng khá dễ dàng. Dữ liệu trong protocol buffer ở dạng binary, kích thước dữ liệu sẽ nhỏ hơn nhiều so với dạng json hay xml. Điều này sẽ giúp tiết kiệm băng thông khá nhiều. Hơn nữa, parse dữ liệu JSON sẽ tốn khá nhiều CPU, trong khi với Protocol buffers chỉ cần tốn ít CPU để xử lí binary.

## 2 Các kiểu gRPC APIs
Nhờ sự hỗ trợ của HTTP/2, gRPC hỗ trợ một số kiểu API tiêu biểu sau:
- **Server Streaming RPC:** Client gửi một request tới server, sau đó server gửi lại nhiều response trên cùng một TCP connection
- **Client Streaming RPC:** Client gửi nhiều request tới server, sau đó server gửi lại chỉ một response về client trên cùng một TCP connection
- **Bidirectional Streaming RPC:** Client gửi nhiều request tới server, sau đó server gửi lại nhiều response trên cùng một TCP connection mà không cần chờ thời gian phản hồi

Ngoài ra, gRCP còn hỗ trợ kiểu Unary. Với Unary, client gửi một request, sau đó server gửi trả một response. Unary giống với kiểu giao tiếp truyền thống. 

## 3 Ưu điểm của gRPC
- **Nhiều lựa chọn kiểu kết nối:** Trong khi REST chỉ tập trung vào kiến trúc request-response thì gRPC hỗ trợ truyền dữ liệu theo kiến trúc event-driven architecture với các kiểu: server-side streaming, client-side streaming, and bidirectional streaming
  
- **Small Payload:** Trung bình kích thước dữ liệu của gRPC nhỏ hơn 30% so với JSON. Điều này giúp tiết kiệm băng thông khá nhiều.

- **High performance:**. Theo nhiều cách đánh giá khác nhau, gRPC giao tiếp nhanh hơn nhiều lần so với JSON hay XML
- **Multi language:** gRPC có thể tự động generate code sang nhiều ngôn ngữ lập trình khác nhau chỉ cần dựa vào file .proto

- **Call Cancellation:** gRPC client có khả năng hủy việc gọi gRPC khi nó không cần nhận phản hồi từ server. Tính năng này khá hữu ích cho server có nhiều request.

## 4 Nhược điểm của gRPC
- **Công nghệ mới:** Chỉ mới ra đời năm 2015, gRPC còn khá non trẻ với số lượng người sử dụng còn hạn chế. Vậy nên, bạn có thể sẽ mất khá nhiều thời gian để giải quyết những vấn đề gặp phải với gRPC. Tuy nhiên, trong tương lai, cộng đồng của gRPC sẽ lớn dần lên nhờ ưu điểm mà gRPC mang lại.
- **Trình duyệt bị giới hạn hỗ trợ:** Vì gRPC phụ thuộc rất nhiều vào HTTP/2, nhưng các browser hiện tại chưa hỗ trợ gọi trực tiếp tới HTTP/2 frame, nên chúng ta không thể sử dụng trực tiếp gRPC trên browser. Thay vào đó, bạn phải gọi qua proxy dẫn tới phát sinh nhiều hạn chế. Vậy nên gRPC được dùng nhiều để giao tiếp giữa các service trong microservice thay vì giữa server với client
- **Dữ liệu không thân thiện:** Dữ liệu trong gRPC được nén lại dạng binary không thân thiện cho developer. Để debug, phân tích payload hay tạo request thủ công, developer cần phải sử dụng thêm các công cụ hỗ trợ.


Bạn có thể tìm hiểu thêm về cách code ở trang chính thức của [gRPC](https://grpc.io/docs/languages/) nhé. 
Trên đây là những suy nghĩ, tìm hiểu, tổng hợp được trên mạng của mình. Hi vọng nó có ích với bạn.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé