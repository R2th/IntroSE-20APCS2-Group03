**TL,DR: nên thử gRPC nhưng cẩn thận khi thử, phải kiểm tra xem nó có phù hợp với bài toán của mình không, nếu áp dụng thì thu được lợi ích gì và cái giá phải đánh đổi là gì thì mới áp dụng**

**Heelloo các anh em, nay mình mới đi 1 event của Topdev - 1 đơn vị khá nổi tiếng trong cộng đồng IT. Event này có vẻ như đang gãi đúng chỗ ngứa mình gặp phải: có nên chuyển sang dùng gRPC thay cho REST truyền thống không**

*~ Hết 30s tóm tắt và giới thiệu, sau đây là nội dung chương trình ~*

### Trước hết là giới thiệu một chút về RPC và gRPC: 
RPC: Remote Procedure Call - hiểu đơn giản là phương thức cho phép một client gọi đến một thủ tục hàm của server khác. Có thể hình dung nó tương tự như việc chúng ta gọi Procedure của SQL Server từ server back-end vậy. Truyền tên hàm và biến vào và bum... chờ vài giây sẽ ra kết quả. 
![](https://images.viblo.asia/073e9706-a797-440b-ba93-0c8b9afbf489.gif)
*Nếu như vậy thì có gì đặc sắc đâu nhỉ? Ừ đúng, nó chả có gì đặc sắc và chả mấy ai dùng nó cả, nếu không có sự xuất hiện của gRPC* 

**gRPC**: một RPC framework của Google dùng để giúp thực hiện các giao tiếp gRPC một cách nhanh chóng, nhẹ nhàng và hiệu quả. gRPC đã mang RPC kết hợp với protobuf (một định dạng file, cùng chức năng như JSON, XML nhưng nhẹ hơn, nhanh hơn và đơn giản hơn) và HTTP2 - phiên bản mới của HTTP và có nhiều cải tiến về tính năng cũng như tốc độ. 
![](https://images.viblo.asia/902bb74a-cf88-4249-b133-641631f1c110.jpg)
*Và thế là chúng ta có một công nghệ vượt trội so với các công nghệ khác về hiệu năng, đủ để gây được sự chú ý của đông đảo lập trình viên.* 
*Note 1: chữ g ở đầu không phải để viết tắt cho Google đâu nhé !!??? Có cả một bài giải thích chữ g nghĩa là gì mà mình đã gắn link ở cuối.* 
*Note 2: nói HTTP2 là phiên bản mới của HTTP thì cũng hơi không hợp lý lắm vì cuối năm 2019 vừa rồi HTTP3 trình làng, đây mới là phiên bản mới nhất của HTTP.*
Trên đây mình chỉ giới thiệu sơ qua, anh em nào có thể tham khảo sâu hơn về khái niệm này trong các link ở cuối bài (hoặc google :)) )
### 2 ứng dụng chính của gRPC 
- **communication** ( đối thủ với REST ) 
- **streaming** ( tương tự Websocket, tuy nhiên sau một hồi hỏi thì cả hội trường chưa ai dùng với mục đích này =)) )
### Ưu điểm của gRPC 
1. Performance: thứ làm nên thương hiệu của gRPC, hiệu năng vượt trội so với REST, đánh bại REST ở tất cả các bài benchmark
2. Code Generation: khai báo file .proto và sẽ tự động gen ra class và các message để kết nối, hỗ trợ hầu hết các ngôn ngữ (cái này mình chưa tìm hiểu kỹ)
3. Strict specification: gRPC có cả 1 trang document dài lê thê về việc các gRPC service cần tuân thủ service nào, giúp cho việc tuân theo chuẩn chỉ hơn (link ở cuối bài)
4. Streaming: gRPC có hỗ trợ real-time communication stream *(kết nối theo luồng, tương tự với Websocket. Không giống như REST-HTTP theo cơ chế request-response, bạn nào từng thử làm 1 ứng dụng chat giao tiếp bằng REST-HTTP sẽ thấy nó ngungok thế nào) *
*Note 3: hầu hết mọi người (cả ở các hội thảo trong nước lẫn blogger nước ngoài) đều chỉ tập trung vào ưu điểm đầu tiên, 3 ưu điểm sau thực sự là về sau mình search Google mới thấy :))*
*Note 4: thật ra cái ưu điểm cuối - Streaming là đặc điểm của HTTP2, không biết REST mà chạy HTTP2 thì có không nữa.*
### Nhược điểm của gRPC
1. gRPC chỉ thực sự hiệu quả với các request có kích thước lớn, đối với các request có kích thước nhỏ thì con số chênh lệch không quá lớn. Anh Thang Chung - Microsoft MVP cũng đã có một bài so sánh hiệu năng giữa 2 công nghệ này trên nền tảng dotnet core (những bài so sánh trên ngôn ngữ Go thì gRPC cho hiệu năng vượt trội hơn hơn hẳn tuy nhiên Go là "sân nhà" của Google nên hơi thiên vị) 
2. gRPC thích hợp với các Internal request ( request gọi nội bộ hệ thống, server to server) hơn là External request (request gọi từ ngoài vào trong hệ thống, client to server). Lý do: 1 là việc triển khai gRPC phức tạp hơn REST, hiện các thư viện client hỗ trợ gRPC còn khá hạn chế, 2 là khi 
3. gRPC ít tài liệu và cộng đồng hỗ trợ hơn REST rất nhiều 
4. Việc load ballencing cho gRPC phức tạp hơn REST, sau một lúc trao đổi thì các anh em vẫn chưa đưa được ra giải pháp tối ưu, có 1 giải pháp đưa ra là Client-loadballencing nhưng cũng còn nhiều thiếu sót. 

*Ý kiến chủ quan của mình: "1 size doesn't fit all" - sẽ không có giải pháp nào phù hợp cho tất cả mọi vấn đề, cần áp dụng linh hoạt các công nghệ để giải quyết vấn đề của mình cho phù hợp và hiệu quả nhất.* 
### Nhận xét ngoài lề về cách thức tổ chức sự kiện và hình thức: 
- Về diễn giả: khả năng diễn thuyết của anh mình đánh giá ở mức ổn, có tâm huyết, quan tâm đến khán giả tuy nhiên chưa thực sự quá xuất sắc như các speaker của các sự kiện lớn (thật ra so sánh điều này cũng hơi khập khiễng). Nội dung bài nói của anh cũng dừng ở mức cung cấp các kiến thức cơ bản cho người nghe, chưa đi sâu vào chủ để "Migrating to gRPC" như tiêu đề (trích nhận xét của 1 anh khán giả khá lớn tuổi). Ngoài ra event bị vênh thời gian khá nhiều, timeline 6h30-9h mà nói khoảng 1 tiếng là hết topic mất rồi, speaker và BTC nên chuẩn bị kịch bản backup cho phần này. 
- Về tổ chức: chắc có lẽ mình đã quen với các team tổ chức lớn như Google, AWS, VietKube,... nên có lẽ tham gia sự kiện này hơi hụt hẫng chút. Có lẽ BTC nên chuẩn bị thêm một ít bánh ngọt tea break (thời gian bắt đầu là 6h30, giữa giờ làm và giờ ăn nên mình không kịp ăn gì :'( ), hay một ít sticker, quà lưu niệm nho nhỏ khác (mình được biết là TopDev làm cả một chuỗi các sự kiện như này nên là in một lần cho tiện)
Chi phí cũng không quá lớn, chỉ tốn khoảng vài trăm ngàn cho cả sự kiện này nhưng nó khiến cho người tham gia hào hứng hơn rất nhiều. 
Như các sự kiện khác thì mình không ý kiến nhiều về phần này đâu nhưng đây là sự kiện bán vé nên mình đánh giá khắt khe hơn chút.
(giá gốc 580K, giảm 50% là 290K, voucher EARLY BIRD giảm 100K còn 190K - cũng tương đối đắt so với các sự kiện công nghệ khác) 
Cuối cùng, cảm ơn Topdev và anh Viet Nguyen - LOOP đã tổ chức một sự kiện rất có ý nghĩa, cung cấp kiến thức và là nơi để các anh em giao lưu chia sẻ các kiến thức về một công nghệ hẹp như là gRPC. Buối thảo luận đã diễn ra rất sôi nổi mặc dù đây là một công nghệ rất mới ở cả tại VN lẫn trên thế giới. Chúc cho các sự kiện về sau của chuỗi chương trình tổ chức thành công và nhận được nhiều sự quan tâm của cộng đồng lập trình viên.
*Bài viết thể hiện hiểu biết và góc nhìn cá nhân của tác giả, có gì chưa hợp lý mong mọi người đóng góp thêm.*
*Peace ^^*

 ----------------------------------------------------------------------------------------------
Bài so sánh của anh Thang Chung 

https://dev.to/thangchung/performance-benchmark-grpc-vs-rest-in-net-core-3-preview-8-45ak

Bài so sánh trên ngôn ngữ Go 

https://dev.to/plutov/benchmarking-grpc-and-rest-in-go-565

Link tài liệu chính thức của gRPC 

https://grpc.io/docs/guides/

Link giới thiệu về gRPC - đơn giản và dễ hiểu 

https://medium.com/red-crane/grpc-and-why-it-can-save-you-development-time-436168fd0cbc

So sánh gRPC và REST by Microsoft: 

https://docs.microsoft.com/en-us/aspnet/core/grpc/comparison?view=aspnetcore-3.1

g stand for:

https://github.com/grpc/grpc/blob/master/doc/g_stands_for.md

Các quy tắc gRPC cần tuân thủ: 

https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md