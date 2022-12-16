Nhân tiện dự án mình đang phát triển API, ngoài coding ra cũng đang support Khách hàng phần tạo tài liệu, hôm nay mình mạo muội tìm hiểu một ít khái niệm về API, API document, Swagger, Basic Structure...tổng hợp trong bài viết này. Hy vọng những thông tin cơ bản dưới đây sẽ hữu ích cho các bạn newbie như mình :)

Bài viết sử dụng các nguồn tham khảo sau đây:

https://quantrimang.com/giao-dien-lap-trinh-ung-dung-api-la-gi-148288

https://swagger.io/blog/api-documentation/what-is-api-documentation-and-why-it-matters/

https://swagger.io/docs/specification/2-0/basic-structure/

https://swagger.io/resources/articles/difference-between-api-documentation-specification/

https://www.altexsoft.com/blog/engineering/what-is-api-definition-types-specifications-documentation/

Trước hết, chúng ta sẽ cùng tìm hiểu xem API là gì nhé.

## API là gì?

API là viết tắt của Application Programming Interface (Giao diện lập trình ứng dụng), một phần mềm trung gian cho phép kết nối với các thư viện và ứng dụng khác. 

Khi sử dụng một ứng dụng trên điện thoại di động, ứng dụng kết nối Internet và gửi dữ liệu tới máy chủ. Sau đó, máy chủ lấy ra dữ liệu đó, diễn giải nó, thực hiện các hành động cần thiết và gửi nó trở lại điện thoại. Ứng dụng sau đó sẽ diễn giải dữ liệu đó và trình bày thông tin bạn muốn theo cách có thể đọc được.

![](https://images.viblo.asia/9dd6b47b-5c7c-425d-b497-86a63b8e5cdc.jpg)

Để dễ hiểu, hãy lấy một ví dụ quen thuộc sau.

Hãy tượng tưởng, trong một nhà hàng, bạn là khách hàng và nhà bếp là “hệ thống” chuẩn bị thực đơn cho bạn. Cái còn thiếu ở đây là liên kết quan trọng để truyền đạt yêu cầu của khách hàng tới nhà bếp và chuyển đồ ăn tới bàn cho họ. Liên kết quan trọng này chính là bồi bàn hoặc API. Người bồi bàn - API là người đưa tin, sẽ nhận yêu cầu gọi món và truyền đạt lại tới nhà bếp - hệ thống. Sau khi thức ăn đã sẵn sàng, bồi bàn sẽ chuyển nó tới khách hàng.

## API và các loại tài liệu

### API Documentation

API Document là tài liệu hướng dẫn tham khảo cho API - Giúp người dùng API biết cách sử dụng API hiệu quả. Tài liệu API thường dành cho các lập trình viên, giúp lập trình viên có thể đọc và hiểu; do đó việc tạo ra một tài liệu API được thiết kế tốt, toàn diện và dễ theo dõi là cực kỳ quan trọng. 

API Document bao gồm các hướng dẫn về cách sử dụng hiệu quả và tích hợp với một API. Nó là một tài liệu ngắn gọn, chứa tất cả các thông tin được yêu cầu để làm việc với API, với thông tin chi tiết về các function (hàm), class (lớp), return type (kiểu dữ liệu trả về), các argument (tham số),... được hỗ trợ bởi các bài hướng dẫn và ví dụ.

Tài liệu hướng dẫn API Document thường được thực hiện bằng cách sử dụng các công cụ tạo, bảo trì nội dung và trình soạn thảo văn bản thông thường. Các định dạng mô tả API giống như OpenAPI/Swagger Specification sẽ tự động hóa quá trình xử lý tài liệu, giúp các nhóm dễ dàng hơn trong việc tạo và bảo trì chúng.

![](https://images.viblo.asia/9ea07832-ebee-4a15-b727-8d4aa2a615d4.jpg)

Vậy thế nào là một tài liệu API tốt? 

Một tài liệu API tốt được đánh giá trên rất nhiều khía cạnh, khó có thể liệt kê hết ở đây. Tuy nhiên một điều chắc chắn rằng, tài liệu API chỉ được coi là tốt khi nó bao gồm cả hướng dẫn nhanh và hướng dẫn chi tiết; ngoài ra, phải là tài liệu có tính tương tác cao để lập trình viên có thể kiểm thử các lệnh gọi API.

Tài liệu API cần cung cấp ví dụ về mọi lệnh gọi, mọi tham số số và phản hồi cho mỗi lệnh gọi. Nó phải bao gồm sample source code cho các ngôn ngữ được sử dụng phổ biến như Java, JavaScript, PHP và Python. Đồng thời, tài liệu phải cung cấp giải thích cho từng API request và các ví dụ về message lỗi.

### API Specification

API specification là một thuật ngữ thường được sử dụng thay thế lẫn nhau với API definition. Mặc dù hai thuật ngữ này có nhiều điểm tương đồng nhưng thực tế chúng là các thực thể khác nhau. 

API specification cung cấp sự hiểu biết rộng rãi về cách một API hoạt động và cách API liên kết với các API khác. Nó giải thích cách hoạt động của API và kết quả mong đợi khi sử dụng API. 

Tài liệu đặc tả API bao gồm nhiều đối tượng API, giá trị và tham số, cách các đối tượng được gọi và chức năng của mỗi đối tượng. Ngoài ra, tài liệu đặc tả API cũng cho thấy các mối quan hệ giữa các đối tượng và cách mỗi đối tượng có thể được sử dụng.

### API Definition

API definition tương tự như API specification ở chỗ nó cung cấp sự hiểu biết về cách một API được tổ chức và cách API hoạt động. Tuy nhiên, API definition hướng đến việc sử dụng API của thiết bị thay vì việc sử dụng API của con người - các lập trình viên. 

Tài liệu định nghĩa API cung cấp thông tin về cách thức hoạt động của API, cách nó liên kết với các API khác và kết quả mong đợi ở định dạng mà máy móc thiết bị có thể đọc được. Nó tập trung vào việc định nghĩa API và phác thảo cấu trúc của API.

Tài liệu này được sử dụng làm cơ sở cho các công cụ tự động như tự động tạo tài liệu API (SwaggerHub và Swagger Inspector), code samples và SDK (REST United và SwaggerHub). 

### Sự khác biệt giữa API Documentation, Specification, và Definition

Tài liệu API, đặc tả API và định nghĩa API đều có liên quan với nhau, nhưng chúng là các thực thể khác nhau. Và mỗi loại tài liệu đều phục vụ một mục đích quan trọng khác nhau.

Tài liệu API cho các nhà phát triển và những người sử dụng API khác biết cách sử dụng API. 

Tài liệu đặc tả API cung cấp sự hiểu biết rộng rãi về chức năng của API và kết quả mong đợi. Đặc điểm kỹ thuật chủ yếu là về thiết kế của API hoặc triết lý của API. Thiết kế và chức năng của API là những yếu tố chính khi chọn tích hợp API với một ứng dụng.

Và cuối cùng, tài liệu định nghĩa API hướng đến việc sử dụng API của thiết bị máy móc, cung cấp định dạng mà thiết bị đó có thể đọc được để sử dụng bởi các công cụ tự động như tài liệu API tự động (automatic API documentation) và trình tạo SDK tự động (SDK generators).

## Hiểu sâu hơn về API Document

### Tầm quan trọng của API Document

Một điều thú vị là các lập trình viên thường ít chú ý đến tài liệu hướng dẫn (API document) khi chạy code. Trên thực tế, việc triển khai code còn dễ dàng hơn rất nhiều so với việc viết một tài liệu API tốt.

API document ảnh hưởng trực tiếp tới việc tích hợp và sử dụng API. Sản phẩm của bạn có thể có chức năng tốt nhất, nhưng sẽ không có ai dùng nếu họ không biết cách sử dụng như thế nào. 

Có thể nói, API document là nền tảng giúp lập trình viên có trải nghiệm tốt.

### Swagger là gì?

Swagger là một tool cho phép mô tả cấu trúc của các API để máy móc có thể đọc chúng. Bằng cách đọc cấu trúc API, Swagger có thể tự động tạo ra một tài liệu API đẹp và có tính tương tác. 

Ngoài ra, Swagger cũng có thể tự động tạo ra thư viện khách hàng cũng như kiểm tra tự động (automated testing) bằng cách yêu cầu API trả lại một YAML hoặc JSON chứa mô tả chi tiết về toàn bộ API. Tệp này về cơ bản là một danh sách tài nguyên API tuân theo đặc điểm kỹ thuật OpenAPI, trong đó bao gồm các thông tin như:

- API hỗ trợ các hoạt động gì?
- API có những tham số nào? Trả về những gì?
- API có cần authorization nào không?
- Điều khoản, thông tin liên hệ và giấy phép sử dụng API

Có thể tạo Swagger specs theo cách thủ công hoặc tạo tự động từ các chú thích trong mã nguồn. Kiểm tra swagger.io/open-source-integrations để nắm được danh sách các công cụ cho phép tạo Swagger từ code.

### Cấu trúc cơ bản của Swagger Specs

Định nghĩa Swagger có thể được viết bằng JSON hoặc YAML. Phần dưới đây sẽ lấy các ví dụ về YAML, tương tự cho JSON. 

Một Swagger specification mẫu viết bằng YAML sẽ như sau:

![](https://images.viblo.asia/1ced3a12-73b2-4d2a-9eb2-e55160c93ec9.PNG)

**Metadata**

Mọi thông số kỹ thuật của Swagger đều bắt đầu với phiên bản Swagger, trong đó 2.0 là phiên bản mới nhất. 

Phiên bản Swagger xác định cấu trúc tổng thể của thông số kỹ thuật API - bao gồm những nội dung gì và mô tả các nội dung đó ra sao.

![](https://images.viblo.asia/5a6cc323-f532-4af6-80db-39ef7f6704f6.PNG)

Sau đó, cần chỉ định `API info` (thông tin API), gồm `title` (tiêu đề), `description` (mô tả tùy chọn) và `version` (phiên bản API, không phải phiên bản Swagger).

![](https://images.viblo.asia/b5b6c36d-fe1b-407b-bf59-ea181ae7ce94.PNG)

`version` có thể là một chuỗi ngẫu nhiên. Chúng ta có thể sử dụng *major.minor.patch* hoặc định dạng tùy ý như *1.0-beta* hoặc *2016.11.15*. 

`description `có thể đa dòng và hỗ trợ GitHub Flavored Markdown để trình bày văn bản đa dạng thức.

`info` cũng hỗ trợ các nội dung khác như thông tin liên hệ, giấy phép...

**Base URL**

Base URL cho tất cả các lệnh gọi API đều sử dụng` schemes`,` host` và `basePath`.

![](https://images.viblo.asia/88024f18-7972-4bda-b888-e13e44ae71a2.PNG)

Mỗi một đường dẫn API (API path) đều liên quan đến base URL, ví dụ */users* thực chất chính là https://api.example.com/v1/users.

**Consumes, Produces**

Consumes và Produces xác định các loại MiME được API hỗ trợ.

![](https://images.viblo.asia/40666ce9-86c5-4ce6-a980-b17032dbbb9e.PNG)

**Paths**

Phần` paths` xác định các endpoint (thao tác) riêng lẻ trong API và các phương thức HTTP được hỗ trợ bởi các endpoint này. 

Ví dụ, *GET /users* có thể được mô tả như sau:

![](https://images.viblo.asia/40fe47a8-7ac8-42fb-940b-c92c2d023fd5.PNG)

**Parameters**

Các thao tác có thể có các tham số được pass qua đường dẫn URL(`/users/{userId}`), chuỗi truy vấn (`/users?role=admin`), tiêu đề (`X-CustomHeader: Value`) và nội dung yêu cầu. 

![](https://images.viblo.asia/81171f22-58b4-494b-a921-3333f9d15958.PNG)

**Responses**

Đối với mỗi thao tác, chúng ta có thể xác định các mã trạng thái có thể có, chẳng hạn như 200 OK hoặc 404 Not Found và `schema` của nội dung phản hồi. 

Lược đồ có thể được xác định inline (nội tuyến) hoặc tham chiếu từ định nghĩa bên ngoài thông qua `$ref`. Ngoài ra, chúng ta cũng có thể cung cấp các phản hồi mẫu (example responses) cho từng loại nội dung.

![](https://images.viblo.asia/0cc7484b-2821-4386-a52f-bf669975a4d1.PNG)

**Input and Output**

Phần `definitions` cho phép định nghĩa cấu trúc dữ liệu chung được sử dụng trong API. Cấu trúc dữ liệu này có thể được tham chiếu thông qua `$ref` bất cứ khi nào cần `schema` cho cả nội dung yêu cầu (request body) và nội dung phản hồi (response body). 

Ví dụ, với đối tượng JSON này:

![](https://images.viblo.asia/fbec8c49-2e37-49e6-a1f0-be98c9357d54.PNG)

có thể được biểu diễn dưới sạng sau:

![](https://images.viblo.asia/d300824b-7404-4c1a-88b6-c3fc6bc96bfa.PNG)

Và sau đó được tham chiếu trong request body schema, response body schema như sau:

![](https://images.viblo.asia/42a4c89f-62cf-4aab-a458-faa3cd762233.PNG)

**Authentication**

Từ khóa `securityDefinitions` và `security` dùng để mô tả các phương pháp xác thực được sử dụng trong API.

![](https://images.viblo.asia/dcae667e-8636-4eb8-9571-12383c37d890.PNG)

Các phương pháp xác thực được hỗ trợ bao gồm:
- Basic authentication
- API key
- OAuth 2

-The end-