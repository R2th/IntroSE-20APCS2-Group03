# Lời mở đầu
Như chúng ta đã biết, truyền thông là động lực chính trong kỷ nguyên kỹ thuật số. Là con người, chúng ta muốn công nghệ giúp chúng ta giao tiếp nhanh hơn, dễ dàng hơn và với nhiều người hơn. Nhưng để điều đó xảy ra, trước tiên chúng ta phải tìm ra cách làm cho các công nghệ giao tiếp với nhau.

Webhook và API là hai lựa chọn phổ biến được dùng để giải quyết vấn đề đó, cả hai đều cho phép đồng bộ hóa và chuyển tiếp dữ liệu giữa hai ứng dụng. 

Tuy nhiên, cả hai đều có cách khác nhau để để thực hiện điều này và do đó chúng sẽ được dùng để phục vụ các mục đích hơi khác nhau.

Trong bài viết lần này, chúng ta sẽ cùng tìm hiểu chúng để thấy được sự khác biệt và đưa ra sự lựa chọn khi nào sử dụng để mang lại hiệu quả tốt nhất nhé, let's go!!! :D 

# 1. Webhook
![](https://images.viblo.asia/4f0dd742-aec4-4b1b-8182-c91341451420.png)


## 1.1 Webhook là gì?

Webhook là một cách triển khai những phản ứng sự kiện cực kỳ hữu ích và tương đối thuận tiện. Nó cung cấp cơ chế cho phép một ứng dụng (server-side) tự động thông báo và gửi dữ liệu thời gian thực tới một ứng dụng khác (client-side) bất cứ khi nào có một sự kiện (dữ liệu) mới phát sinh (mà ứng dụng client-side có thể quan tâm) đã xảy ra trên máy chủ (server-side).

Chính vì Webhook làm việc nhờ vào định nghĩa “event reaction” (đừng gọi cho tôi, tôi sẽ gọi bạn nếu tôi có tin gì mới). Nhờ vào điều này, app client-side sẽ không cần thiết phải liên tục hỏi ứng dụng server-side xem có gì mới không, gửi cho tôi đi bạn ơi???, mà chỉ việc “subscribe” cho một sự kiện với Webhook rồi nằm khô ráo nước đợi server-side gửi tin tận nơi cho khi có event mới xảy ra (bằng phương pháp gọi URL webhook từ client phân phối) =))

Webhook cũng được gọi là Reverse APIs. Trong các ứng dụng API, client-side sẽ gửi request (thông qua API) tới server-side. Tuy nhiên ngược lại với Webhook, server gọi Webhook (thường là POST HTTP request) tới endpoint URL được cấu hình trước đó cho Webhook bởi client cung cấp và client sẽ xử lý kết quả được trả về.

## 1.2 Thiết lập Webhook

![](https://images.viblo.asia/fb347e39-f94d-478a-9f60-ce31e9cf6935.png)


Để thiết lập một Webhook, bạn cần “đăng ký” một URL cho Webhook provider gửi request khi cần. Điều này cũng đồng nghĩa với việc ứng dụng của bạn có thể truy cập từ các web công cộng.

Thông thường thì Webhook sẽ POST data theo 2 cách: JSON hoặc XML. Provider sẽ cho bạn biết nội dung hoặc thậm chí custom lại nội dung của các API được cung cấp này.

Webhook sử dụng HTTP, nên nó có thể được tích hợp vào các dịch vụ web mà không cần thêm các cơ sở hạ tầng mới. Đồng thời, cũng dễ sử dụng nên ngày càng được ứng dụng rộng rãi hơn.

## 1.3 Debug một Webhook

Việc debugging Webhook đôi khi cũng khá phức tạp vì cơ chế của nó là hoạt động bất đồng bộ. Vì thế chúng ta cần phải trigger chúng và chờ đợi để nhận được response, điều này khiến ta cảm thấy khá tốn thời gian. Tuy nhiên có một số tips sau đây có thể giúp việc debugging dễ dàng hơn:

* Hiểu về những gì Webhook cũng cấp, ta có thể sự dụng **RequestBin** để collect và inspect các request mà Webhook gửi tới
* Giả lập request bằng các tool như **cURL** hay **Postman** (mình đang dùng Postman :v)
* Publish code trên local machine với **ngrok**
* Theo dõi toàn bộ flow bằng cách sử dụng các tool như là **Runscope**

## 1.4 Bảo mật Webhook

Vì Webhook cung cấp dữ liệu tới các URL được cung cấp sẵn và công khai nên đương nhiên có khả năng dễ bị tấn công và chỉnh sửa dữ liệu trước khi được trả về cho client. Để ngăn chặn điều này, cần yêu cầu các kết nối đến đều là https:

* Thêm mã thông báo vào URL, để làm điểm nhận dạng. Ví dụ: ?auth=token
* Tùy chọn tiếp theo là khai triển Basic Auth. Việc này đều được hỗ trợ rộng lớn và dễ thực hiện.

Hai giải pháp trên là lựa chọn để có thể ngăn chặn được các cuộc tấn công, tuy vậy nó cũng có nhược điểm đó là phải gửi auth token cùng với request. Giải pháp kế tiếp đòi hỏi Provider sẽ sign (mã hóa) các request gửi tới client và phía client sẽ xác minh các signature này.

## 1.5 Khi nào nên sử dụng Webhook

Webhook thường được sử dụng để thực hiện các yêu cầu và nhiệm vụ nhỏ. 

Ví dụ, khi ứng dụng yêu cầu cần cập nhật theo thời gian thực, nhưng chúng ta lại không muốn lãng phí nhiều tài nguyên vào việc đó. Webhook được sử dụng trong trường hợp này.

Một trường hợp khác sử dụng webhook qua API là khi API rất “kém” hoặc không có API bắt đầu. Thì ta có thể tạo một giải pháp cung cấp dữ liệu mà ứng dụng cần để hoạt động.

Tuy nhiên, vì Webhook không được sử dụng thường xuyên để gọi dữ liệu và chỉ hoạt động khi có dữ liệu mới, nên khả năng sẽ không thể lấy được các bản cập nhật mới nhất nếu hệ thống ngưng hoạt động vì một vài lý do nào đó.

Ngoài ra, phải chấp nhận tổng lưu lượng dữ liệu có sẵn với bản cập nhật đã cho vì có ít quyền kiểm soát chúng.

# 2. API

![](https://images.viblo.asia/7955cb60-83ff-4c5c-9e11-3d211e90aa82.png)


## 2.1 Khái niệm

Chắc các bạn cũng không còn quá xa lạ với khái niệm này nữa rồi, có thể bạn đã sử dụng hoặc tìm thấy rất nhiều bài viết khác về nó rồi nên ở đây mình sẽ nói nói sơ qua và theo ý hiểu của mình nhé!!! :D

API là tên viết tắt của Application Programming Interface (giao diện lập trình ứng dụng) phương thức kết nối với các thư viện và ứng dụng khác. Nó chính là một phần mềm giao tiếp được sử dụng bởi các ứng dụng khác nhau. Hiểu đơn giản thì nó giống như bàn phím là thiết bị dùng để giao tiếp giữa anh hùng bàn phím và máy tính - API là một phần mềm giao tiếp giữa chương trình và hệ điều hành.

Và để API hoạt động được, cần tạo request với data, và response cho request đó. Data thường định dạng là JSON, XML hoặc một kiểu bất kỳ. Với những ai đã làm việc với Web API, nó là 1 trang web nhưng không có giao diện chỉ thao tác với Database server, xử lý các tác vụ mà client gửi đến rồi sau đó phản hồi lại dưới dạng các cấu trúc NoSQL như JSON,BJSON hay XML.

API giúp xây dựng các HTTP service một cách rất đơn giản và nhanh chóng. Mã nguồn mở, hỗ trợ đầy đủ mô hình MVC hay các thành phần HTTP như: URI, request/response headers, caching, versioning, content format. Phù hợp cho các thiết bị băng thông giới hạn như mobile, tablet.

Ngày nay, rất nhiều ứng dụng được xây dựng dựa trên mô hình này. Các ứng dụng lớn thường được tích hợp nhiều API, thuận tiện cho việc scale quy mô các dịch vụ của chúng. Tuy nhiên, việc xử lý thời gian thực có thể thực hiện được với API, nhưng nó yêu cầu một số cấu hình bổ sung, do đó webhook trở thành cơ chế phù hợp nhất cho việc xử lý thông tin thời gian thực.

## 2.2 Ưu điểm của API

* Kết nối mọi lúc nhờ vào Internet.
* Giao tiếp hai chiều phải được xác nhận trong các giao dịch.
* Vì giao tiếp là API hai chiều nên thông tin rất đáng tin cậy.
* Cung cấp cấp trải nghiệm thân thiện với người.
* Cung cấp giải pháp phát triển khi các nhà phát triển tìm thấy cách sử dụng mới để trao đổi API.
* Cấu hình đơn giản khi được so sánh với WCF.
* Mã nguồn mở.
* Hỗ trợ chức năng RESTful một cách đầy đủ.
* Hỗ trợ đầy đủ các thành phần MVC như: routing, controller, action result, filter, model binder, IoC container, dependency injection, unit test.
* Khả năng trình diễn cao.

## 2.3 Khi nào sử dụng API

API hoạt động cực kỳ hiệu quả khi bạn chắc chắn về những thay đổi liên tục trong dữ liệu. Nếu dữ liệu không cần cập nhật liên tục, sử dụng API sẽ gây ra lãng phí tài nguyên. Ví dụ: nếu là cửa hàng Thương mại điện tử thường xuyên phải theo dõi dữ liệu hoặc cập nhật một số trạng thái vận chuyển, thì API sẽ là lựa chọn tốt nhất.

Các API vẫn còn phổ biến vì một số lý do:

* Không phải mọi ứng dụng đều hỗ trợ tích hợp webhook.
* Đôi khi bạn chỉ muốn biết về kết quả hơn là mọi sự kiện đã thay đổi một đối tượng.
* Webhook chỉ có thể thông báo cho bạn về một sự kiện, vì vậy nếu bạn muốn thực hiện thay đổi dựa trên thông tin mới, bạn sẽ cần một API.
* Webhook Payload có thể không chứa tất cả dữ liệu bạn cần về một sự kiện, do đó cần sử dụng API lúc này.
* Nếu được thiết lập phải sử dụng API, chúng ta có thể áp đặt giới hạn các request thực hiện trong một khoảng thời gian cụ thể. Một số ứng dụng thậm chí còn giới hạn số lượng request thực hiện từ ngay khi bắt đầu để giảm tiêu tốn tài nguyên về sau.

# 3. Sự khác biệt giữa Webhook và API

![](https://images.viblo.asia/39b954c9-ed53-4a26-baa9-8fbf2835bb18.png)

Qua những gì mà chúng ta đã cùng tìm hiểu về Webhook và API phía trên, phần nào đã thấy được sự khác biệt giữa chúng rồi phải không nhỉ, cùng mình liệt kê một số điểm khác biệt đó ra nhé =))


| Webhook                                                                                           | API                                                                                                    |
| :--------------------------------------------------------------------------------------:  | :----------------------------------------------------------------------------------------------: |
| Webhook, còn được gọi là API đảo ngược, web callback hoặc HTTP push API là một cách để một ứng dụng cung cấp cho các ứng dụng khác thông tin thời gian thực. Nó cung cấp dữ liệu khi một sự kiện xảy ra hoặc gần như ngay lập tức.     |  API là một sứ giả gửi yêu cầu của bạn đến nhà cung cấp mà bạn đang yêu cầu và sau đó gửi phản hồi lại cho bạn    |
|API dựa trên yêu cầu , nghĩa là chúng hoạt động khi có yêu cầu từ các ứng dụng của bên thứ ba | Webhook dựa trên sự kiện , nghĩa là chúng sẽ chạy khi một sự kiện cụ thể xảy ra trong ứng dụng nguồn.| 
| Với Webhook, bất cứ khi nào có event hay dữ liệu mới server đều sẽ tự động thông báo cho client, tức làCác API cần phải "thăm dò" server thường xuyên để biết được có events mới phát sinh hay không. sẽ tự động thực hiện yêu cầu khi các tiêu chí nhất định được đáp ứng | Các API cần phải "thăm dò" server thường xuyên để biết được có events mới phát sinh hay không, tức là API sẽ thực hiện khi có yêu cầu (cần được chỉ dẫn, gửi yêu cầu - nhận phản hồi) |
|Webhook ít tốn tài nguyên hơn vì chúng giúp bạn tiết kiệm thời gian liên tục thăm dò (kiểm tra) dữ liệu mới.|Ngược lại với Webhook|

Cả API và Webhook đều có các trường hợp sử dụng khác nhau, nhưng nếu mục tiêu của chúng ta chỉ là chuyển dữ liệu giữa hai dịch vụ, thì Webhook là lựa chọn phù hợp. Tuy nhiên, nếu ứng dụng yêu cầu thay đổi dữ liệu thường xuyên, thì API sẽ là lựa chọn phù hợp hơn.

Bạn có thể sử dụng cả API và Webhook cùng nhau để tạo ra một hệ thống có thể giao tiếp đúng loại dữ liệu phù hợp với ứng dụng của bạn.

# Kết luận

Vậy là chúng ta đã cùng tìm hiểu để đưa ra nhìn nhận giữa hai khái niệm Webhook và API, bài viết này coi như là những kiến thức mà mình note lại sau khi đọc tài liệu về chúng. Có thể vẫn còn thiếu sót nên nếu các bạn có quan tâm bài viết thì hãy cho mình vài comment góp ý để mình cải thiện và hiểu rõ hơn về chúng.

Cảm ơn các bạn đã đọc bài viết này!!! (bow)

# Tài liệu tham khảo

https://agilitycms.com/resources/posts/-api-vs-webhooks-what-s-the-difference

https://viblo.asia/p/su-khac-nhau-giua-webhook-va-apis-aWj53L88K6m