# Giới thiệu
Dành thời gian làm việc với OpenAPI và gRPC và bạn sẽ nhận thấy rằng hai công nghệ này có rất nhiều điểm chung. 
Cả hai đều là những nỗ lực nguồn mở, cả hai đều mô tả API và cả hai đều hứa hẹn những trải nghiệm tốt hơn cho các nhà phát triển API. 

Vậy tại sao chúng ta cần cả hai? trong bài viết này mình sẽ so sánh 2 cách tiếp cần này khi xây dựng API.
# So sánh
## Nguồn gốc
*OpenAPI:*

[OpenAPI](https://www.openapis.org/) phát triển từ dự án [Swagger](https://swagger.io/). Swagger bắt đầu như một đặc tả cho tài liệu API RESTful. Sau đó, các công cụ để tạo mã máy khách và máy chủ và tạo các trường hợp thử nghiệm đã được thêm vào. Mặc dù Đặc tả Swagger ban đầu được tặng cho Linux Foundation và đổi tên thành OpenAPI, Swagger vẫn là một trong những bộ công cụ nguồn mở được sử dụng rộng rãi nhất để phát triển OpenAPIs. 

*gRPC:*

[gRPC](https://grpc.io/) ban đầu được phát triển tại Google. Sau đó, nó đã được tặng cho [Cloud Native Computing Foundation.](https://www.cncf.io/)
## Giao thức truyền thông 
*OpenAPI:*

OpenAPI sử dụng giao thức HTTP/1.1 để vận chuyển dữ liệu, dữ liệu thông thường là JSON

*gRPC:*

gRPC sử dụng giao thức HTTP/2 để vận chuyển dữ liệu, và  [Protocol Buffers](https://developers.google.com/protocol-buffers/) để format dữ liệu

## Định dạng mô tả API
*OpenAPI:*

Các nhà phát triển mô tả API của họ bằng các tài liệu JSON hoặc YAML, tuân theo lược đồ Đặc tả OpenAPI. Bạn có thể tìm thấy một kho lưu trữ lớn các mẫu mô tả OpenAPI  tại [http://apis.guru/openapi-directory.](https://apis.guru/openapi-directory/) 

*gRPC:*

API được mô tả bằng các tệp .proto được viết bằng Ngôn ngữ [Protocol Buffer](https://developers.google.com/protocol-buffers/docs/proto3)


## Phong cách mô tả 
*OpenAPI:*

API REST được mô tả bằng các method HTTP và URI. Mỗi URI đại diện cho một tài nguyên trong hệ thống của bạn và các method HTTP đại diện cho các hành động bạn thực hiện đối với tài nguyên của mình.

API REST  sử dụng [HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) để báo hiệu kết quả của yêu cầu. Vì mã HTTP status codes chủ yếu nhằm truyền đạt kết quả của các hoạt động vận chuyển, việc ánh xạ mã trạng thái đến kết quả của các API của bạn có thể hơi lỏng lẻo. Để hiệu quả, bạn có thể sử dụng thêm chuổi mã khác để ánh xạ đến kết quả của các API của bạn.

*gRPC:*

Với gRPC, bạn có thể mô tả API của mình theo các method hoặc procedures. Tuy nhiên, nếu nhiều method được thêm vào theo thời gian, kết quả cuối cùng có thể là một API phức tạp và khó hiểu do thực tế là các nhà phát triển phải hiểu từng method làm gì. Thay vào đó, Google đề nghị sử dụng [Resource Oriented Design](https://cloud.google.com/apis/design/resources), áp dụng các nguyên tắc thiết kế REST cho gRPC. Điều này dẫn đến các API dễ hiểu hơn. Ngoài ra, bạn sẽ dể dàng chuyển mã API HTTP / JSON thành gRPC, nếu sử dụng thiết kế này.

gRPC cung cấp một bộ [error codes](https://godoc.org/google.golang.org/grpc/codes) rất phù hợp để mô tả kết quả của các hoạt động API.


## Tạo mã client và server
*OpenAPI:*

Có một số công cụ để tạo mã dựa trên mô tả OpenAPI. Dự án tạo mã được sử dụng rộng rãi nhất là [Swagger Codegen](https://swagger.io/tools/swagger-codegen/). Các dự án khác bao gồm [AutoRest](https://github.com/Azure/autorest) và[ oas-nodegen](https://github.com/capitalone/oas-nodegen). 

*gRPC:*

gRPC đi kèm với một trình tạo mã gọi là protoc. Mỗi ngôn ngữ được hỗ trợ được thực hiện như một plugin riêng biệt. Trình tạo mã là một phần của dự án gRPC từ khi thành lập. 


## Tài liệu tương tác
*OpenAPI:*

[Swagger UI](https://swagger.io/tools/swagger-ui/) là một toogRPCl tuyệt vời để trực quan hóa API của bạn và thực hiện các yêu cầu kiểm tra đối với API của bạn. 

*gRPC:*

[prototools](https://github.com/sourcegraph/prototools) và[ protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc) có thể tạo tài liệu dựa trên các tệp .proto của bạn.


## Công cụ
*OpenAPI:*

[Swagger Tools](https://swagger.io/), [curl](https://curl.haxx.se/), [Postman](https://www.getpostman.com/), web browsers, [tcpdump](https://www.tcpdump.org/), [Wireshark](https://www.wireshark.org/).

*gRPC:*

[Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc), [gRPCurl](https://github.com/fullstorydev/grpcurl).


## Hiệu suất
*OpenAPI:*

Giao thức HTTP/1.1 là một giao thức request/response. Khi gửi nhiều yêu cầu qua một kết nối TCP, yêu cầu tiếp theo chỉ có thể được gửi sau khi nhận được phản hồi cho yêu cầu trước đó. Điều này thường sẽ dẫn đến hiệu suất kém, đặc biệt là trên các kết nối có độ trễ cao hơn. Để tăng hiệu suất, máy khách HTTP mở nhiều kết nối TCP đến một máy chủ và gửi song song nhiều yêu cầu HTTP. Các kết nối mới được mở khi cần thiết. Tất nhiên số lượng kết nối càng lớn thì chi phí bỏ ra càng cao. 

Một số clients/servers HTTP có thể hỗ trợ HTTP/1.1 pipelining. Mỗi yêu cầu HTTP qua kết nối TCP có thể được thực hiện ngay lập tức mà không cần chờ phản hồi của yêu cầu trước đó trả về. Vì phản hồi phải được trả lại theo thứ tự được yêu cầu, điều này dẫn đến dễ bị treo, khi các yêu cầu trước mất quá nhiều thời gian để xử lý. 

HTTP / 1.1 là một giao thức vận chuyển văn bản và JSON là một định dạng của văn bản đó. Điều này làm giảm hiệu suất của vận chuyển dữ liệu.

*gRPC:*

Theo mặc định, client HTTP/2 mở một kết nối TCP đến server và ghép nhiều yêu cầu trên kết nối này. Yêu cầu và phản hồi được chia thành nhiều phần và có thể được trả lại theo cách xen kẽ. Điều này ngăn chặn vấn đề bị treo mà HTTP / 1.1 pipelining có thể bị. Ngoài ra, client có thể mở nhiều kết nối HTTP/2 đến một server và thực hiện tổng hợp kết nối. Tuy nhiên, thông thường chỉ sử dụng một kết nối TCP. 

HTTP / 2 là một giao thức nhị phân. Ngoài ra, theo bài viết [này](https://medium.com/apis-and-digital-transformation/openapi-and-grpc-side-by-side-b6afb08f75ed) của Tim Burks của Google, định dạng nhị phân của Protocol Buffer có hiệu suất vận chuyển dữ liệu nhanh hơn JSON. 

Nhìn chung, gRPC cung cấp hiệu suất tốt hơn OpenAPI.



## Tóm lược
*OpenAPI:*

OpenAPI cung cấp khả năng tương tác tuyệt vời do tận dụng giao thức HTTP / 1.1 được sử dụng rộng rãi và định dạng JSON. Có một số lượng lớn các công cụ có sẵn sẽ hoạt động với OpenAPI.

*gRPC:*

Nếu bạn đang tìm kiếm hiệu suất tối đa, gRPC là một lựa chọn tuyệt vời cho bạn. Ngoài ra, giao thức HTTP / 2 đang dần chiếm thị phần. Tại sao không bắt đầu sử dụng nó ngày hôm nay?