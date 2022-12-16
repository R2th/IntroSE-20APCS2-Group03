Automation có một vị trí quan trọng trong thế giới công nghệ.  Hơn nữa, hiện tại *Agile development* đã có chỗ đứng vững chắc trong ngành công nghiệp phần mềm. Đã có một sự thay đổi đáng chú ý trong cách chúng ta phát triển các kịch bản test tự động hoá trong agile. Kéo theo đó, nhu cầu kiểm thử API cũng tăng lên.

## 1. API là gì?

Về mặt kỹ thuật, API là viết tắt của Giao diện lập trình ứng dụng (Application Programming Interface).

API là phương thức trung gian kết nối các ứng dụng và thư viện khác nhau.

Nó cung cấp khả năng truy xuất đến một tập các hàm hay dùng, từ đó có thể trao đổi dữ liệu giữa các ứng dụng.

API có thể sử dụng cho web-based system, operating system, database system, computer hardware, or software library.

API specification có thể có nhiều dạng, nhưng thường bao gồm các đặc tả cho routines, data structures, object classes, variables, or remote calls. POSIX, API Windows và ASPI là những ví dụ về các dạng API khác nhau. Tài liệu cho API thường được cung cấp để tạo thuận lợi cho việc sử dụng và triển khai.

Hầu hết các công ty lớn đã xây dựng API cho khách hàng của họ hoặc để sử dụng nội bộ.

## 2 Tại sao cần kiểm thử API?

 Các kịch bản kiểm thử tự động hoá cho GUI còn một số hạn chế như: 
  - Có thể thất bại thường xuyên nếu giao diện người dùng được cập nhật liên tục.
  - Mất nhiều thời gian để bảo trì và tái cấu trúc khi liên quan đến flaky tests.
  - Quá trình kiểm tra tốn thời gian và có phản hồi chậm hơn so với kiểm thử API.

Việc phát triển năng đã hoàn thiện về giao diện người dùng (UI) và chạy các kịch bản kiểm thử tự động hoá cho chức năng đó là một thách thức lơn trong sprint Agile 2 tuần. Không giống như các kiểm thử GUI test, kiểm thử API không dựa trên giao diện người dùng, sẽ thoải mái hơn nhiều khi kết hợp/ tích hợp chúng trong vòng đời phát triển Agile. Ngoài ra, nó có thể được đưa vào sớm hơn nhiều ở giai đoạn phát triển.

Một API bao gồm các phương thức REST. Các phương thức REST này tìm, thêm mới, cập nhật hoặc xoá dữ liệu trong cơ sở dữ liệu. Các bạn cần tìm hiểu và làm quen với các phương thức REST để tiếp cận kiểm thử API. Khi đã nắm rõ được các khái niệm vể API REST, chúng ta sẽ bắt đầu kiểm tra về nó. Trước hết, cần phải hiểu giao diện của API, bao gồm: 
- Hành động có thể thực hiện khi sử dụng API.
- Cấu trúc của *requests*.
- Cấu trúc của *responses*.

Do đó, một bước thiết yếu là xem xét *API Documentation*(tài liệu API).

## 3. API Documentation là gì?

API documents tương tự như một tài liệu tham khảo. Nó nói về các thông tin cần thiết của 1 API. API Documentation rất quan trọng, nó ảnh hưởng trực tiếp đến việc áp dụng và sử dụng công cụ. Nếu không ai có kiến thức về công cụ, thì sẽ không ai biết sử dụng nó. Ngoài ra, nó còn một số ưu điểm như sau: 
- Cung cấp một hướng dẫn nhanh chóng và dễ dàng để sử dụng API.
- Thể hiện được các chức năng hữu ích.
- Tiết kiệm chi phí và thời gian hỗ trợ, nếu documentation dễ hiểu và chi tiết.

API Document bao gồm các hướng dẫn về cách sử dụng hiệu quả và tích hợp với một API. Nó là một tài liệu ngắn gọn, chứa tất cả các thông tin được yêu cầu để làm việc với API, với thông tin chi tiết về các function (hàm), class (lớp), return type (kiểu dữ liệu trả về), các argument (tham số),… được hỗ trợ bởi các bài hướng dẫn và ví dụ.

### 3.1. Mô tả resource

Resource( tài nguyên)  là dữ liệu mà chúng ta phải quản lý, có thể là customers, products, posts, images, videos… Mặt khác, tên resource cũng sẽ xuất hiện trong cách viết endpoint( mỗi URL kèm HTTP method của web service thì được gọi là một endpoint), nên nếu bạn đặt tên cho resource một cách khoa học, thì endpoint cũng trở nên dễ hiểu và dễ tiếp cận hơn.

Có thể sử dụng nhiều endpoint để truy cập resource. Trong cùng 1 resource, một API sẽ có 1 số routes( routes nôm na là kẻ dẫn đường cho Web API sẽ gọi action nào tương đượng với uri đã được cung cấp) được nhóm lại. Các tài nguyên và mô tả endpoint thường ngắn gọn và chính xác. 

### 3.2. Phương thức và endpoints

Endpoint là một phần thiết yếu của API documentation. Các nhà phát triển triển khai nó để thực hiện các request( thông báo yêu cầu HTTP - là thông tin client gửi đến server, yêu cầu server làm gì đó). Các phương thức chỉ ra các tương tác được phép( như: GET, PUT, POST hoặc DELETE) với resource. Các bạn có thể truy cập vào link này Bookstore API[](https://demoqa.com/swagger/#/Account/AccountV1AuthorizedPost) để xem bộ sưu tập API mẫu.


### 3.3. Parameters sử dụng

Với một url endpoint, nếu đi với các HTTP verb khác nhau, chúng ta sẽ có những endpoint khác nhau. Do đó, nếu cùng một url endpoint, cùng 1 HTTP verb, nếu số lượng parameters( tham số đường dẫn) khác nhau cũng sẽ tạo ra các endpoint khác nhau.![](https://images.viblo.asia/cf3a03f7-526b-496d-a54c-2cfc1a759ca1.png)

Có 4 loại parameters: 
- **Header parameter**: là các thông số kèm theo khi gửi yêu cầu lên server, chúng thường liên quan đến authorization. ![](https://images.viblo.asia/12c06430-1e38-4612-a4f2-f4f71d9281fb.png)
- **Path parameter**: là một phần của endpoint, chúng không phải là tuỳ chọn và thường được viết với dấu ngoặc nhọn. Ex: /Account/v1/User/{UserId}, {UserId} là một path parameter.
- **Query parameter**:  chúng được gắn vào cuối URL, và được thêm vào sau dấu *?*. Ex: /BookStore/v1/Book?ISBN={ISBN}, {ISBN} là một query parameter.
- **Request body parameters**: được sử dụng trong phương thức POST, nó là một danh sách các cặp key-value( khoá-giá trị).![](https://images.viblo.asia/aebe541b-82ac-4ada-9ef5-5cdedfff73bb.png)

## 4. Cách sử dụng  API Document

 Hiện nay, có nhiều công cụ tạo API Document như: Slate, Flatdoc, Swagger,... nhưng ở bài viết này, chúng ta chỉ tìm hiểu cách sử dụng API Document trên Swagger.
 
 Để hiểu hơn về cách sử dụng Swagger API documentation, các bạn hãy truy cập vào [Bookstore API](https://demoqa.com/swagger/#/Account/AccountV1AuthorizedPost)  để xem cấu trúc của 1 API documentation. Khi truy cập vào Bookstore API, các bạn sẽ thấy như hình bên dưới ![](https://images.viblo.asia/84dd11d5-2a36-4595-9eb9-5d159bd99fb8.png)
 
  Nhóm các endpoints bao gồm: 
* Account
* BookStore

Chúng ta cùng tìm hiểu về *request*, *response* của 1 API bằng cách sử dụng Swagger. Chúng ta sẽ tìm hiểu về API: Create User – POST.

Trước khi bắt đầu khám phá API, chúng ta cần tạo 1 người dùng có  và password, sau đó thêm username và password trong thông tin đăng nhập của Book Store. 

Bây giờ hãy thử tạo userID bằng cách sử dụng phương thức POST.

Các bước thực hiện: 
1. Expand phương thức POST cho endpoint:* /Account/v1/User* dưới *Account*.
2. Click và nút *Try it out*.
3. Thêm username và password, sau đó chọn *parameter content type* là* application/json*. Click vào nút *Execute*.
4. Swagger sẽ gửi yêu cầu. Bạn có thể quan sát được request, response trả về.
![](https://images.viblo.asia/24531416-e382-45a5-beb3-46228cee4390.png)
![](https://images.viblo.asia/036af790-90be-475e-9437-0b2957e21db8.png)

Chúng ta đã gửi POST Request với username và password ở định dạng JSON. Chúng ta nhận được mã trạng thái 201 cùng với userID và sách được liên kết với username tương ứng trong phần *Response body*. Nó giải thích rằng yêu cầu của chúng ta đã được gửi thành công qua máy chủ, như bạn có thể thấy trong hình trên bên dưới *mô tả*. Ngoài ra, cách triển khai của Swagger rất đơn giản và hữu ích. Nó cung cấp trải nghiệm tương tác để gửi yêu cầu và nhận phản hồi cho các API.

Ngoài mô phỏng các thao tác trong API, Swagger API document còn liệt kê các mã code và response body với tất cả các case thành công, thất bại các bạn có thể xem ở ảnh dưới:
![](https://images.viblo.asia/5befdf06-cc85-49a8-9a60-72de6dfd79b0.png)

Để kết thúc, trong bài đăng này, chúng ta đã hiểu về API document. Chúng ta đã học cách sử dụng tài liệu Swagger API. Ngoài ra, chúng ta đã tự làm quen với các loại thử nghiệm API. Tôi mong bài viết này sẽ hữu ích với các bạn!

Tài liệu tham khảo: https://www.toolsqa.com/rest-assured/api-documentation/