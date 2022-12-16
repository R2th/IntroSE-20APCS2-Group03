![](https://images.viblo.asia/1717abc4-87ea-4835-8e8d-a54401176516.png)

## 1. gRPC là gì?

gRPC là một framework RPC mã nguồn mở, hiện đại và hiệu năng cao mà có thể chạy trên bất kỳ môi trường nào. Framework này được Google khởi công phát triển vào năm 2015, đến 08/2016 thì được phát hành chính thức. Đây được cho là một thế hệ tiếp theo của RPC (Remote Procedure Calls) đặc biệt là trong mô hình Microservices.

Gần đây các backend developer phải đứng trước lựa chọn dùng REST API hay dùng gRPC. Tại sao đã có REST API rồi còn phải thêm gRPC chi vậy? Vậy thì bài viết này mình sẽ làm rõ các khác biệt của chúng.

https://200lab.io/blog/rest-api-la-gi-cach-thiet-ke-rest-api/

gRPC là viết tắt của “gRPC Remote Procedure Calls”. Nếu các bạn dùng máy tính để in ra thì sẽ treo máy hoặc báo lỗi stack-overflow đấy!

![](https://images.viblo.asia/e39d8f6f-06fa-4151-8c86-83b9e4ee83cc.jpg)

## 2. Vì sao cần gRPC?

Dưới thời huy hoàng và phát triển rực rỡ từ REST API, cơ bản là giao tiếp giữa client và server đã được giải quyết khá tốt. Nhưng dưới thời đại Microservices, rõ ràng chúng ta cần một phương pháp tốt hơn để tăng tải và thông lượng giữa các services.

Có thể các bạn sẽ không thấy đây là một vấn đề chẳng đáng để bận tâm xử lý, đặc biệt khi hệ thống có ít services, ít server/node. Ở đây chúng ta đang nói đến rất nhiều services và tải đang rất cao. Ví dụ vài trăm service và tải đâu đó ở ngưỡng trên 100k CCU – Concurrent users (số lượng user đang hoạt động cùng một thời điểm).

Khi đó nếu một request cần phải tổng hợp dữ liệu qua nhiều services. Ở mỗi đầu service khi nhận các request trung gian này, chúng phải encode và decode liên tục (VD: JSON data). Việc này có thể gây quá tải cho các CPU. Lẽ ra CPU nên dành cho việc khác quan trọng hơn là chỉ vì en/code dữ liệu trung gian.

Ý tưởng về việc làm thế nào để các service giao tiếp với nhau với tốc độ cao nhất, giảm tải encode/decode data chính là lý do thúc đẩy gRPC ra đời.

![](https://images.viblo.asia/94616ebd-2965-445e-a546-ce9185debaf3.jpg)

## 3. RPC không phải REST API

Hẳn là các bạn đang tự hỏi tại sao không phải gAPI, gREST mà lại là gRPC. Vì đơn giản là framework này chuyên dành cho RPC. Mà RPC là “thủ tục gọi từ xa” (Remote Procedure Call). Mình ghét dịch những cụm này kinh khủng, vì dịch xong cũng như chưa dịch.

Mình không có ý định làm một bài riêng cho RPC vs REST API nên sẽ giới thiệu sơ lược thôi. RPC có từ rất lâu rồi, trước khi có REST API rất nhiều. Hồi đó lập trình viết hàm, gọi hàm trên một codebase (local procedure). Nhưng rồi cũng sẽ có lúc những procedure này cần tái sử dụng nhiều hơn, hoặc “cách ly” nó để có tải cao hơn. Như vậy việc sử dụng lời gọi từ xa (remote call) là đương nhiên.

Bạn có thể dùng kỹ thuật lập trình mạng thông thường để gởi và nhận các gói tin thực hiện RPC. Tuy nhiên các developer luôn khao khát những phương thức dễ dàng hơn, chuẩn hoá hơn. Từ khi REST API ra đời và trở nên phổ biến, RPC xài luôn REST API để implement phương thức giao tiếp. Cái này được gọi là: RPC-based APIs.

Sự khác biệt lớn nhất đó là:

* REST API: Client và Server cần trao đổi state thông qua các resource được trả về. Do đó các response trả về thường là một resource.
* RPC: Client cần server thực hiện tính toán hoặc trả về một thông tin cụ thể nào đó. Bản chất giống y như ta đang gọi hàm, chỉ là hàm đó ở máy chủ khác hoặc service khác. Từ đó response trả về chỉ là kết quả của “hàm” thôi, không hơn, không kém.

Về mindset, nếu bạn đang muốn lấy thông tin users với ID = 1. REST API trả về full resource object user với ID = 1. Nhưng nếu bạn muốn tính tổng thu nhập của user = 1 trong tháng này, với RPC thì trả về 1 số tổng thu nhập là đủ. Nhưng REST API thường trả về 1 resource nào đó có chứa thông tin tổng thu nhập của user (VD là resource user có thêm key “total_revenue”).

Nếu bạn vẫn chưa hiểu khác nhau chỗ nào, không sao hết, việc này không quan trọng. Nhưng hãy nhớ về các method của REST API chỉ tập trung vào tạo mới, đọc, sửa và xoá resource. Nếu vậy muốn resource làm một cái gì đó hoặc tính toán cụ thể cái gì đó thì chính là RPC-base APIs.

Hình dáng của RPC-base APIs trong thực tế:

* POST /songs/:id/play (play bài hát, thành công thì return true hoặc 1)
* GET /songs/:id/calculate_total_views (trả về con số tổng lượt xem của bài hát)

![](https://images.viblo.asia/61f99e12-c602-472b-a17c-3440fd541f30.png)

## 4. gRPC hoạt động như thế nào

![](https://images.viblo.asia/e13a5530-1c4d-4f2b-b1a8-2f6310d10724.png)

Quay lại với câu chuyện tăng tải cho cả hệ thống nhiều services (hay Microservices), Google đã phát triển 2 thứ:

* Một giao thức mới để tối ưu các connection, đảm bảo dữ liệu đi trao đổi liên tục với ít băng thông nhất có thể.
* Một định dạng dữ liệu mới để 2 đầu service (hoặc client và server) có thể hiểu được các message của nhau mà ít phải encode/decode.

Đầu tiên Google phát triển một giao thức thay thế cho HTTP/1.1 với tên gọi SPDY. Sau này giao thức này được open source thậm chí chuẩn hoá, lấy làm nền móng cho giao thức HTTP/2. Khi có HTTP/2 rồi thì giao thức SPDY ngừng phát triển. gRPC chính thức hoạt động trên HTTP/2 luôn từ sau năm 2015.

> Sức mạnh của HTTP/2 các bạn nên xem qua bài: [Giao thức HTTP/2 là gì? So sánh HTTP/1 và HTTP/2](https://200lab.io/blog/giao-thuc-http2-la-gi-so-sanh-http1-va-http2/) (rất hay và mình khuyến khích nên xem)

Thậm chí ở thời điểm mình viết bài này, HTTP/3 đang dần được support và sẽ sớm được sử dụng rộng rãi. Rất nhiều service Google đã và đang hoạt động với HTTP/3. gRPC cũng đã vận hành được với HTTP/3 thông qua một số thư viện chưa chính thức.

> Chi tiết giao thức HTTP/3 mình cũng có viết ở đây: [HTTP/3 và QUIC – Giao thức đột phá để tăng tải website](https://200lab.io/blog/http-3-va-quic/)

HTTP/2 sẽ hoạt động rất tốt với binary thay vì là text. Vì thế Google phát minh kiểu dữ liệu binary mới với tên gọi: Protobuf (tên đầy đủ là Protocol Buffers).

Mình sẽ viết chi tiết về Protobuf (và hướng dẫn sử dụng nó với Golang) trong một bài khác, trong khuôn khổ bài này mình chỉ muốn giới thiệu gRPC thôi cho gọn. Nhưng về tốc độ encode/decode các bạn có thể xem qua một benchmark dưới đây:

![](https://images.viblo.asia/aad0144d-7d06-4a25-a2e8-fdee7a99f1bc.png)

## 5. Một số lưu ý trong gRPC

Mình đã sử dụng gRPC được khoảng 2 năm cho các hệ thống cỡ vừa và lớn. Dưới dây là các điểm lưu ý trên kinh nghiệm cá nhân:

* gRPC nên dùng để giao tiếp backend to backend. CPU không gánh nhiều cost cho encode/decoding mỗi đầu nữa. Tuy nhiên đặc tính mỗi đầu cần import file model chung (gen từ protobuf file) nên nếu update thì phải update đủ. Việc này vô tình tạo dependency cho các bên sử dụng, có thể nhiều bạn sẽ không thích điều này.
* gRPC thường được đấu nối vào service mesh (hoặc sidecar trong Microservices), để có thể xử lý connection HTTP/2 cũng như monitoring nó tốt hơn.
* gRPC support streaming 2 đầu nên rất được lòng các fan streaming system, event sourcing (stream event). VD: gRPC được sử dụng trong: vitess, neo4j vì lý do trên.
* gRPC nếu dùng cho frontend-backend thì thật sự rất cân nhắc. Connection statefull tạo nhiều sự khó chịu trong scale tải hoặc bạn có thể bị Head of line blocking (HOL).
* gRPC vẫn có thư viện gRPC Gateway chính chủ của Google. Tức là các bạn vẫn có thể chạy 1 port http/1 cho REST và 1 port http/2 của gRPC đồng thời. Như vậy không phải là không có cách để quay về REST thân quen, nhưng đương nhiên là đi qua proxy service nên cồng kềnh hơn.

## 6. Kết

Tóm lại gRPC là một kỹ thuật rất ưu việt để scale tải hệ thống, đặc biệt trong hệ thống phân tán, nhiều services hoặc Microservices. Việc sử dụng tốt gRPC vẫn phụ thuộc phần lớn vào kỹ thuật xây dựng service và khả năng deploy và vận hành (DevOps).

Mình đã từng thấy nhiều team ứng dụng gRPC đạt nhiều hiệu quả to lớn. Song nhiều team đã từ bỏ quay về REST API. Liệu nó có hợp với hệ thống của bạn hay không có lẽ chính bạn mới có thể đưa ra câu trả lời. Với bản thân mình thì gRPCrất tốt, rất đáng để trải nghiệm và được nhiều công ty lớn tin dùng. Hiện tại, gRPC cũng đã thành viên trong [Cloud Native Foundation](https://www.cncf.io/).

Mình sẽ còn trở lại với các bài viết hướng dẫn về chủ đề này, giúp các bạn xây dựng một service cơ bản sử dụng gRPC để giao tiếp với nhau. Cảm ơn các bạn đã đọc bài viết.

Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/grpc-la-gi-vu-khi-tang-tai-microservices/)