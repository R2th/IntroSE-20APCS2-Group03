# 1. Giới thiệu chung
![](https://images.viblo.asia/3367614a-4cda-4e33-aa51-81c4b52e3f66.png)

* Trải qua nhiều thập kỉ, REST đã trở thành một tiêu chuẩn cho thiết kế Web API. REST có những ý tưởng rất tuyệt vời như là **stateless servers** hay là **structured access to resources**.
* Tuy nhiên REST APIs vẫn còn chưa linh hoạt để bắt kịp với những yêu cầu thay đổi nhanh chóng phía client.
* GraphQL được phát triển để đáp ứng nhu cầu  linh hoạt hơn và hiệu quả hơn. Nó giải quyết nhiều những  thiếu sót và kém hiệu quả mà developer đã trải nghiệm được sau một thời gian làm việc với REST API.
* Ở bài viết lần trước mình cũng đã chia sẻ qua về GraphQL là gì, bài viết này mình sẽ đặt nó bên cạnh REST để làm nổi bật lên những ưu điểm vượt trội hơn so với REST.
# 2. Ưu điểm của GraphQL so với REST

|  | REST | GraphQL |
| -------- | -------- | -------- |
| **Data Fetching**     | Nhiều Endpoint    | 1 Endpoint  |
||Imperative data fetching|Declarative Data Fetching|
||Tồn tại Over Fetching và UnderFetching|Giải quyết OverFetching và UnderFetching|
|**Khi yêu cầu Client thay đổ**i|Phải Thay đổi phía server|Có thể chỉ Phải Thay đổi phía Client|
|**Độ phụ thuộc giữa Backend và Frontend**|Không thể làm việc độc lập|Có thể làm việc độc lập|
|**Phân tích sự dư thừa dữ liệu**|Không thể phân tích được sự dư thừa dữ liệu|Có thể phân tích được sự dư thừa dữ liệu và hiệu suất của ứng dụng.|
## 2.1 Data Fetching với GraphQL và REST
Để làm rõ sự khác nhau giữa REST và GraphQL khi fetching data từ API, chúng ta hãy xem xét một kịch bản đơn giản sau: Với một ứng dụng blog, ứng dụng sẽ cần hiển thị list tiêu đề các bài post của một user cụ thể. Cùng màn hình đó, bạn cũng cần phải hiển thị tên của 3 followers của user đó. Hãy cùng xem cách mà REST và GraphQL xử lý.
### 2.1.1 Multiple Endpoint và Single Endpoint
* **Với REST API**, bạn sẽ lấy data bằng việc sử dụng nhiều endpoint. Với kịch bản trên, Bạn sẽ sử dụng 1 endpoint /users/<id> để lấy dữ liệu của user. Sau đó bạn sẽ sử dụng 1 endpoint nữa là /user/<id>/posts để lấy tất cả các bài post của user. Endpoint thứ ba sẽ là /user/<id>/followers trả về danh sách các follower của user.

![](https://images.viblo.asia/f6f999b1-43bf-4d68-ac0b-f4060e1345d5.png)

* **Với GraphQL**, bạn chỉ cần đơn giản gửi một câu query tới GraphQL Server bao gồm các yêu cầu dữ liệu cụ thể. Server sẽ trả về một JSON object đáp ứng các yêu cầu client gửi lên. Chú ý rằng Cấu trúc response mà Server trả về sẽ tuân theo chính xác cấu trúc lồng nhau mà được chỉ định trong query gửi lên từ Client.

![](https://images.viblo.asia/3540aa97-16ce-486a-ac14-c64f9e594702.png)

### 2.1.2 GraphQL giải quyết Overfetching và Underfetching
Một vấn đề thông thường nhất gặp phải với REST là Overfetching và Underfetching. Điều này xảy ra do Client sử dụng endpoint để lấy dữ liệu về, và các endpoint thì trả về cấu trúc dữ liệu cố định. Điều này dẫn đến những khó khăn cho việc thiết kế API làm thế nào để có thể cung cấp cho client chính xác những gì mà client cần.

* **Overfetching**: Trả về dư thừa dữ liệu cho Client

    Overfetching có nghĩa là một Client lấy được nhiều thông tin hơn so với những gì nó cần. Ví dụ dễ hiểu một màn hình cần hiển thị danh sách các user chỉ với tên của các user đó. Nhưng với REST API, bạn gọi endpoint **/users** và nhận về mảng JSON các dữ liệu của user. Response có thể chứa nhiều thông tin của user như ngày sinh, địa chỉ của user..., những thông này vô dụng với client vì client chỉ cần hiển thị tên của các user.
*   **Underfetching** và vấn đề **n+1**

    Underfetching có nghĩa là một endpoint cụ thể không cung cấp đủ thông tin yêu cầu cho client. Client phải thực hiện thêm những request khác để lấy thêm dữ liệu mà nó cần. Khi đó vấn đề **n+1** xảy ra khi mà đầu tiên Client cần lấy về một list các phần tử, nhưng sau đó đối với mỗi phần tử lại phải tạo một request để lấy dữ liệu yêu cầu của mỗi phần tử!

    Ví dụ với kịch bản ứng dụng cần hiển thị list user, và mỗi user cần hiển thị 3 followers gần nhất. Đầu tiên ứng dụng cần phải gọi 1 endpoint **/users** và sau đó ứng với mỗi user, chúng ta phải thực hiện một endpoint bổ sung là **/users/<user-id>/followers**

Với việc sử dụng 1 endpoint, cho phép client chỉ định những dữ liệu nào mà client cần, server trả về đúng dữ liệu theo cấu trúc lồng nhau được chỉ định trong query của client thì GraphQL đã giải quyết được vấn đề Overfetching và Underfetching.
###     2.1.3 	Imperative data fetching và Declarative Data Fetching
*  REST theo phương pháp **Imperative data fetching** (Tìm nạp dữ liệu mệnh lệnh). Khi fetching data từ REST API, một ứng dụng cần phải thực hiện các bước sau:
    1. Gửi dữ liệu HTTP request (vd fetch trong javascript)
    2. Nhận và parse dữ liệu nhận được từ server.
    3. Store dữ liệu dưới local.
    4. Hiển thị dữ liệu trên UI
*  GraphQL tiếp cận theo ý tưởng **declarative data fetching** (Tìm nạp dữ liệu khai báo), Client chỉ việc thực hiện 2 bước sau:

    1. Mô tả yêu cầu dữ liệu.
    2. Hiển thị dữ liệu trên UI.

    Cách tiếp cận này tập trung vào việc Client sẽ khai báo dữ liệu (declarative data), còn trừu tượng hóa các tác vụ khác cũng như việc lưu trữ dữ liệu.
##     2.2 Vấn đề đáp ứng sự thay đổi nhanh chóng phía Client.
* Với REST API, Client sẽ gọi các endpoint tương ứng cho các view, server sẽ trả về tất cả các thông tin được yêu cầu cho một view cụ thể. Tuy nhiên điểm yếu của REST API ở chỗ này là nó sẽ không đáp ứng nhanh chóng sự thay đổi phía Client. Với mỗi sự thay đổi phía UI (chẳng hạn như yêu cầu nhiều dữ liệu hơn), thì phía backend (server) cũng phải thay đổi để đáp ứng yêu cầu dữ liệu mới. Nó sẽ làm giảm hiệu suất, và chậm việc update product liên tục.
* Với GraphQL, vấn đề này đã được giải quyết. Nhờ có sự linh hoạt phía GraphQL, sự thay đổi phía Client sẽ không dẫn đến phải thay đổi phía server, bởi client có thể chỉ định chính xác yêu cầu dữ liệu mà client cần, do đó chỉ việc thay đổi phía Client. 
##     2.3 Độ phụ thuộc giữa Backend và Frontend - Lợi thế của Schema và Type của GraphQL
*    GraphQL sử dụng hệ thống Type và sử dụng Schema Definition Language (SDL) để định nghĩa Schema. Hãy hiểu Schema như là một hợp đồng giữa Client và Server, một bản mô tả cách mà client có thể lấy dữ liệu trên Server.
*  Một khi Schema đã được định nghĩa, team frontend và team backend có thể làm việc độc lập và không cần trao đổi với nhau nhiều vì cả 2 bên đã biết được cấu trúc dữ liệu sẽ được transfer như nào.
*  Team Frontend có thể tạo dummy test data để test ứng dụng và khi server đã sẵn sàng, team frontend sẽ chuyển sang lấy dữ liệu từ API thực tế. Điều này giúp tăng hiệu suất làm việc rất nhiều.
## 2.4 Phân tích sự dư thừa dữ liệu 
* Với REST API, chúng ta có toàn bộ dữ liệu được trả về trong một API endpoint, như vậy chúng ta sẽ không biết được thông tin về việc sử dụng các trường dữ liệu cụ thể.
* Đối với GraphQL, chúng ta sẽ chỉ định chính xác những gì chúng ta cần, như vậy chúng ta sẽ biết được trường dữ liệu nào đang được sử dụng và trường dữ liệu nào không được request từ Client nữa.
* Hơn nữa, GraphQL sử dụng resolver function để xử lý dữ liệu mà client yêu cầu. Các phương pháp đo lường hiệu suất cho các resolvers sẽ giúp bạn nhìn thấy được những chỗ "cổ chai" trong ứng dụng của bạn, giúp bạn có thể theo dõi được performance của hệ thống.
# 3. Nhược điểm của GraphQL
*  GraphQL luôn trả về HTTP status code là 200, bất kể query có success hay không. Nếu query fail, JSON response trả về sẽ có key **errors**, với các error message và stacktrace. Điều này gây khó khăn hơn trong việc error handling.
*  Phải thiết kế Schema trước, sẽ vất vả hơn vì thêm việc mặc dù sau này schema sẽ giúp bạn ngăn chặn nhiều lỗi và đỡ tốn sức hơn khi nâng cấp.
*  Khi Client không cần quan tâm đến data lấy từ đâu thì Sự phức tạp được đẩy về phía server, GraphQL không phải là giải pháp tốt cho các ứng dụng đơn giản.
*  Vấn đề caching. REST API sử dụng nhiều endpoint nên nó tận dùng HTTP caching để tránh việc phải tìm nạp lại tài nguyên. Với GraphQL, nó sử dụng 1endpoint thay vì theo cơ chế caching của HTTP. Lưu vào bộ nhớ đệm là rất quan trọng vì nó làm giảm sự truy cập vào máy chủ. Với GraphQL, bạn phải sử dụng thư viện khác phía Client để đáp ứng việc caching.
#     4. Kết luận
* Bài viết trên mình đã trình bày sự khác nhau giữa REST và GraphQL qua những ưu nhược điểm của GraphQL so với REST. Cả REST và GraphQL đều là những cách nổi bật để thiết kế API. REST đơn giản hóa đáng kể công việc của dev với cách tiếp cận tiêu chuẩn, tuy nhiên nó cũng có vài nhược điểm. GraphQL giải quyết những nhược điểm của REST và có nhiều ưu điểm vượt trội hơn so với REST, tuy nhiên không phải lúc nào nó cũng là giải pháp tốt nhất. Đối với những ứng dụng xử lý dữ liệu tương đối nhất quán, mình nghĩ nên sử dụng REST API. Còn đối với những ứng dụng mà cần xử lý với dữ liệu thay đổi nhanh chóng, yêu cầu update product liên tục thì hãy trải nghiệm với GraphQL.
* Anyway, bạn có thể sử dụng cả REST và GraphQL trong 1 project. Hãy phân tích ứng dụng của bạn và yêu cầu hiệu suất để có lựa chọn thích hợp nhé. Hẹn gặp lại các bạn trong các bài viết tiếp theo của Series GraphQL.
* Nguồn tham khảo: https://www.howtographql.com/basics/1-graphql-is-the-better-rest/