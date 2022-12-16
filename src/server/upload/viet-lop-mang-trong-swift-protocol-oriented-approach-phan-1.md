![](https://images.viblo.asia/3d1d9187-7dd7-4f5d-b68e-8bdf547acd90.png)

Trong bài hướng dẫn này, chúng ta sẽ biết cách để phát triển 1 lớp mạng bằng Swift thường mà không sử dụng bất kì thư viện thứ 3. Cho phép thực hiện ngay. Sau khi hoàn thành hướng dẫn này, code của chúng ta sẽ gồm:

* protocol-oriented
* Dễ sử dụng 
* Dễ dàng phát triển
* An toàn
* Sử dụng enums để cầu hình endPoints

Ví dụ phía dưới sẽ cho thấy điều mà chúng ta làm được sau khi hoàn thành với lớp mạng của mình:


![](https://images.viblo.asia/16cbe8c0-7c9d-44a1-9dc7-10371ff62b23.png)


Với việc chỉ việc viết ***router.requesr(.*** với sức mạnh của enums chúng ta có thể thấy tất cả endPoints cái sẽ được hiển thị với chúng ta và đối số cần thiết cho request.

# Đầu tiên, 1 vài structure

Khi tạo ra bất cứ thứ gì, điều quan trọng nhất là cấu trúc, vì vậy nó sẽ dễ dàng sử dụng cho sau này. Tôi tin chắc rằng cấu trúc thư mục là chìa khóa giúp cho phát triển kiến trúc. Để giữ các files của bạn được rõ ràng, hãy tạo các groups bằng tay trước đó và tôi sẽ ghi chú nơi mà chúng nên tới. Đây là 1 cái nhìn tổng thể về cấu trúc của dự án. *(Hãy ghi chú tên đã được đề xuất, bạn có thể đặt tên classes và groups bất cứ gì mà bạn thích. ) *


![](https://images.viblo.asia/1c7e73f5-89ec-4117-b82e-2d9814e63284.png)


# EndPointType Protocol

Điều đầu tiên chúng ta cần là khai báo các giao thức EndPointType. Giao thức này sẽ chứa tất cả thông tin cần để cấu hình 1 EndPoint. Và cái gì là EndPoint? Ồ, bản chất nó là 1 URLRequest và bao gồm tất cả thông tin như là headers, truy vấn thông số, và body parameters. Giao thức EndPointType là nền tảng của lớp mạng chúng ta thực hiện. Nào, tạo 1 file và đặt tên nó là EndPointType. Đặt file trong nhóm *Service*. ( Không phải trong group EndPoint, điều này sẽ được rõ ràng khi chúng ta tiếp tục).


![](https://images.viblo.asia/0e2481e7-8927-4666-af1a-744933cbd63c.png)

# HTTP Protocols
**EndPointType** của chúng ta có 1 số giao thức HTTP mà cần cho việc xây dựng đầy đủ endPoint. Hãy cùng phân tích yêu cầu của giao thức

## HTTPMethod

Tạo 1 file tên *HTTPMethod* và đặt nó vào nhóm ***Service***. Enum sẽ được sử dụng để cài đặt phương thức của request.

![](https://images.viblo.asia/65c5a4ae-2556-4652-9b07-6850fc21d07f.png)

## HTTPTask

Tạo 1 file tên *HTTPTask* và đặt nó bên trong nhóm ***Service***. HTTPTask chịu trách nhiệm cho việc cấu hình tham số cho các endPoint cụ thể. bạn có hể thêm vào rất nhiều trường hợp mà áp dụng cho yêu cầu của lớp mạng của bạn. Ví dụ tôi sẽ có 3 trường hợp

![](https://images.viblo.asia/8130431b-5332-4613-a6af-a840acce967b.png)

Chúng ta sẽ thảo luận về ***Parameter*** và cách chúng ta xử lý mã hóa tham số truyền vào trong phần tiếp theo.

## HTTPHeaders
***HTTPHeaders*** đơn giản chỉ là 1 typealias dành cho dictionary. Bạn có thể tạo cái này ở trên đầu file HTTPTask



> public typealias HTTPHeaders = [String:String]


# Parameters & Encoding
Tạo file tên là ***ParameterEncoding*** và đặt nó trong nhóm ***Encoding***. Đầu tiên chúng ta định nghĩa một ***Parameters*** typealias. Chúng ta sử dụng 1 typealias để code được rõ ràng  và ngắn gọn hơn


> public typealias Parameters = [String:Any]


Tiếp theo, định nghĩa 1 giao thức ***ParameterEncoder*** cùng 1 phương thức mã hóa tĩnh. Phương thức mã hóa sẽ lấy 2 thông số là *** inout URLRequest, Parameters *** ( Để tránh mơ hồ từ đây, tôi sẽ coi tham số hàm sẽ là đối số.) **INOUT** là từ khóa Swift sẽ được định nghĩa đối số như là một đối số tham chiếu. Thông thường biến sẽ được truyền vào hàm như kiểu giá trị. Với việc đặt ***inout***  ở phía trước đối số cho phép chúng ta định nghĩa nó như kiểu biến tham chiếu. Để hiểu thêm về ***inout*** bạn có thể đọc tại [đây](http://ios-tutorial.com/in-out-parameters-swift/) . Giao thức  ***ParameterEncoder*** sẽ được bổ sung bởi ***JSONParameterEncoder*** và ***URLPameterEncoder***

```
public protocol ParameterEncoder {
 static func encode(urlRequest: inout URLRequest, with parameters: Parameters) throws
}
```

Một ***ParameterEncoder*** thực hiện 1 chức năng là mã hóa thông số. Phương thức này có thể không thành công nên nó cũng bắt lỗi và chúng ta cần xử lý.

Nó cung cấp khả năng để chuyển đổi lỗi tùy chọn bên trong lỗi tiêu chuẩn. Tôi luôn thấy mình khó khăn với việc xử lý giải mã 1 số lỗi mà Xcode đem lại. Bằng cách tùy chỉnh lỗi bạn có thể định nghĩa message lỗi của chính bạn và biết chính xác lỗi đó đến từ đâu. Bằng cách này tôi chỉ việc đơn giản tạo 1 enum kế thừa **Error**.

![](https://images.viblo.asia/c21eb747-ea67-4f55-845b-7a1810d17b72.png)

## URLParameterEncoder

Tạo file tên ***URLParameterEncoder*** và đặt nó bên trong nhóm ***Encoding***

![](https://images.viblo.asia/93039fea-cd81-44c3-af82-869df3160da0.png)

Code bên trên lấy các thông số và khiến chúng an toàn như thông  số URL. Bạn cũng nên biết rằng vài ký tự bị cấm sử dụng trong URLs. Thông số được phân cách bởi ký hiệu '&', vì vậy bạn cần cung cấp cho tất cả chúng. Chúng ta cũng thêm vào các headers cần thiết cho request nếu chúng chưa được thiết lập

Đoạn conde mẫu là cái mà chúng ta nên xem xét kiểm thử với Unit Tests. Nó quan trọng là URL được xây dựng 1 cách chính xác cũng như việc chúng ta có thể lấy ra được 1 số lỗi không cần thiết. Nếu bạn sử dụng API mở bạn không muốn request của bạn bị thất bại bởi 1 số bài test. nếu bạn muốn biết thêm về Unit Testing bạn có thể bắt đầu đọc [bài post này](https://medium.com/flawless-app-stories/the-complete-guide-to-network-unit-testing-in-swift-db8b3ee2c327) bởi [S.T.Huang.](https://medium.com/@koromikoneo)

# JSONParameterEncoder

Tạo file tên ***JSONParameterEncoder*** và đặt nó bên trong nhóm ***Encoding*** 

![](https://images.viblo.asia/2fdcb7e1-11be-4e41-89c0-a739b0488bc2.png)

Gần giống mã hóa ***URLParameter*** nhưng ở đây chúng ta sẽ mã hóa thông số cho JSON và thêm vào những header cần thiết lần nữa.

# NetworkRouter

Tạo file tên ***NetworkRouter*** và đặt nó bên trong nhóm ***Service***. Chúng ta bắt đầu bằng định nghĩa hoàn chỉnh 1 typealias.

```
public typealias NetworkRouterCompletion = (_ data: Data?,_ response: URLResponse?,_ error: Error?)->()
```

Tiếp theo chúng ta khai báo 1 giao thức ***NetworkRouter***

![](https://images.viblo.asia/7faf438a-0beb-4c43-aa87-7b0f0d22298e.png)

Một ***NetworkRouter*** có 1 ***EndPoint*** sẽ sử dụng để tạo request và mỗi request đã tạo được truyền vào response để hoàn thiện. Tôi đã từng thêm chức năng cancel tuyệt vời để sử dụng nhưng không sử dụng nó. Chức năng này ó thể được gọi bất cứ khi nào trong vòng đời của request và hủy nó. Điều đó rất quý giá nếu ứng dụng của bạn đang có tiến trình tải về hoặc tải lên. Chúng ta tận dụng 1 ***associatedtype*** ở đây như chúng ta muốn ***Router***  khớp xử lý với bất kỳ ***EndPointType***. Không sử dụng ***associatedtype*** router nên có 1 ***EndPointType*** cụ thể. Thêm nữa, với associatedtype tôi khuyến khích tìm hiểu [bài post này của NấthaTheRobot](https://www.natashatherobot.com/swift-what-are-protocols-with-associated-types/)

# Router
Tạo 1 file tên ***Router*** và đặt nó bên trong nhóm ***Service***. Chúng ta khai báo biến task private của loại ***URLSessionTask***. Task này thực chất là điều sẽ thực hiện tất cả công việc. CHúng ta sẽ giữ biến này private như cách chúng ta không muốn bất cứ luồng truy cập nào ngoài class sửa đổi task của chúng ta

![](https://images.viblo.asia/6bd0ce2a-8360-421a-9199-c52672c6c7c1.png)

## Request

Ở đây chúng ta tạo 1 URLSession sử dụng shared session. Đây là cách rất đơn giản với việc tạo 1 URLSession. Nhưng nhắc qua là đây không phải cách duy nhất. Có nhiều hơn 1 cách cấu hình phức tạp ccuar 1 URLSession có thể là cách hoàn thiện sử dụng cấu hình có thể thay đổi hành vi của session. Để biết thêm tôi khuyến nghị dành thời gian để đọc [bài post này](https://www.raywenderlich.com/567-urlsession-tutorial-getting-started)

Ở đây chúng ta tạo request của mình bằng cách gọi *buildRequest* và đưa nó 1 router ở đay là 1 ***EndPoint***.  Cách này sẽ được gói trong khối do-try-catch giống *buildRequest* bởi vì lỗi có thể được bắt bởi mã hóa của chúng ta. Chúng ta đơn giản chuyển tất cả response, data và lỗi tới completion

![](https://images.viblo.asia/c0b37964-0970-4a1e-8738-16607b5cec98.png)

Vậy là bạn đã biết được khá nhiều thứ rồi đó, hãy ngẫm nghĩ 1 chút và chuyển sang phần thứ 2 nhé :D hẹn gặp lại.

Đường dẫn bài gốc: https://medium.com/flawless-app-stories/writing-network-layer-in-swift-protocol-oriented-approach-4fa40ef1f908

Link bài tiếp theo: [Phần 2](https://viblo.asia/p/viet-lop-mang-trong-swift-protocol-oriented-approach-phan-2-Az45bQ6NlxY)