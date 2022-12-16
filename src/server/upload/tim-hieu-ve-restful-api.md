RESTful API là một tiêu chuẩn dùng trong việc thiết kế các API cho ứng dựng web để quản lí resource. RESTful là một trong những kiểu thiết kế API được sử dụng phổ biến ngày nay để cho các ứng dụng (web, mobile, webserice...) khác nhau có thể giao tiếp với nhau
## Cấu trúc của RESTful API
### API
API là viết tắt của Application Programming Interface  (Giao diện lập trình ứng dụng) là một tập hợp các định nghĩa, giao thức, và công cụ chương trình con để xây dựng để xây dựng phần mềm và ứng dụng. Hiểu đơn giản API là một trung gian phần mềm cho phép hai ứng dụng giao tiếp với nhau.
API có thể trả về dữ liệu mà bạn cần cho ứng dụng của mình ở những kiểu dữ liệu phổ biến như JSON hay XML.
Với API, bạn có thể tiếp cận, truy xuất dữ liệu từ máy chủ thể hiện chúng trên ứng dụng phần mềm hoặc website của mình một cách dễ dàng hơn.
Tính tới nay, API đã phát triển với nhiều loại ứng dụng và phần mềm khác nhau. Thế hệ mới nhất của web/ app API có thể ứng dụng được ở mọi hệ thống từ cơ sở dữ liệu, hệ điều hành, hệ thống nền web, thư viện hay thậm chí là phần cứng máy tính.
## REST & RESTful
REST hay ReST (REpresentational State Transfer) là một dạng chuyển đổi cấu trúc dữ liệu được đề xuất bởi nhà khoa học máy tính Roy Thomas Fielding vào năm 2012.

REST là một kiểu kiến trúc được sử dụng trong việc giao tiếp giữa các máy tính (máy tính cá nhân và máy chủ của trang web) trong việc quản lý các tài nguyên trên internet.

REST được sử dụng rất nhiều trong việc phát triển các ứng dụng Web Services sử dụng giao thức HTTP trong giao tiếp thông qua mạng internet. Các ứng dụng sử dụng kiến trúc REST này thì sẽ được gọi là ứng dụng phát triển theo kiểu RESTful. Một RESTful API đơn giản là một API tuân thủ các nguyên tắc và ràng buộc của REST.

REST bao gồm 3 bộ phận cơ bản như: bộ máy chủ ngoài chứa dữ liệu (external server), máy chủ API và máy chủ khách (client). Trong đó, máy khách có thể là bất cứ thứ gì, ứng dụng trên nền web, thư viện hoặc thậm chí là các phần mềm khác nhau của một phần mềm máy tính.

REST cho phép các máy khách truy cập máy chủ API và thực hiện các lệnh lấy về, chỉnh sửa hay xóa dữ liệu từ external server. Các lập trình viên có thể thoải mái truy xuất, chỉnh sửa dữ liệu từ máy chủ mà không cần biết hệ thống hoạt động như thế nào.
### Cách hoạt động của REST
Khi làm việc với server sẽ gồm 4 hoạt động thiết yếu là:
* Lấy dữ liệu ở một định dạng nào đó (JSON)
* Tạo mới dữ liệu
* Cập nhật dữ liệu
* Xóa dữ liệu

REST hoạt động chủ yếu dựa vào giao thức HTTP. Mỗi trong 4 hoạt động cơ bản trên sẽ sử dụng những phương thức HTTP riêng (HTTP method):
* POST (CREATE) : Tạo mới một Resource.
* GET (READ) : Trả về một Resource hoặc một danh sách Resource.
* PUT (UPDATE) : Cập nhật, thay thế thông tin cho Resource.
* DELETE (DELETE) : Xoá một Resource.

REST là một kiến trúc thống nhất giúp thiết kế các website để có thể dễ dàng quản lý các tài nguyên. Nó không phải là một quy luật buộc bạn phải tuân theo mà đơn giản là một kiến trúc được đề xuất ra và kiến trúc này hiện đang được sử dụng rất phổ biến vì tính đơn giản, dễ hiểu và rất ưu việt của nó. Với các ứng dụng web được thiết kế sử dụng RESTful, ban có thể dễ dàng biết được URL và HTTP method để quản lý một resource
### Các ràng buộc trong REST
1. Kiến trúc client-server: Server sẽ là tập hợp các services nhỏ xử lý các request từ client, việc tách biệt giúp tăng tính linh hoạt của client cũng như khả năng mở rộng của server mà vẫn đảm bảo được giao tiếp.
2. Stateless (phi trạng thái): Server và client sẽ không lưu trạng thái của nhau, mỗi request và response sẽ chứa đầy đủ thông tin, tách biệt với nhau, điều này giúp hệ thống dễ phát triển và mở rộng.
3. Cacheability (có khả năng cache): Các response có thể được lấy ra từ cache của server giúp giảm thiểu thời gian xử lý, các request phải đảm bảo tính duy nhất để response không bị nhầm lẫn với các request khác.
4. Layered system (phân lớp hệ thống): Hệ thống được chia làm nhiều lớp, việc giao tiếp của 1 lớp chỉ được tiến hành với lớp ở trên và lớp ở dưới của nó, khả năng cân bằng tải (load balancing) và cache dữ liệu trong hệ thống cũng sẽ được cải thiện.
5.  Uniform interface (chuẩn hoá các interface): Đây là ràng buộc quan trọng nhất của hệ thống REST.
Để đảm bảo ràng buộc này, hệ thống tập trung vào việc xử lý các tài nguyên (resource). Mỗi một resource sẽ được xác định (định danh) bằng một URI (Uniform Resource Identifier) riêng biệt.
### Ưu điểm của REST
* REST cũng có ưu điểm khi sử dụng giao thức stateless (không trạng thái). Hệ thống này không sử dụng session, cookie, không cần biết những thông tin đó trong mỗi lần request đến máy chủ ngoài. Điều này giúp REST giảm tải cho máy chủ ngoài, nâng cao hiệu suất làm việc.
* Tính khả biến: với các hệ thống cần thay đổi các tài nguyên liên tục, sử dụng REST với việc tạo request đơn giản sẽ giúp mọi chuyện trở nên đơn giản hơn.
* Tính mở rộng: các hệ thống REST có khả năng mở rộng rất cao nhờ sự tách biệt giữa các thành phần và các quy ước giao tiếp được quy định sẵn.
* Tính linh hoạt: việc chuẩn hoá interface giúp hệ thống trở nên linh hoạt hơn, có thể sử dụng cho cho nhiều nền tảng khác nhau, mobile, web,...
* Trong sáng: trong giao tiếp giữa các thành phần, các request trở nên rất rõ ràng, dễ hiểu.
###  Nhược điểm của REST
* REST Chỉ hoạt động trên các giao thức HTTP.
* Ưu điểm của việc sử dụng các cấu trúc HTTP lại cũng chính là một hạn chế. Bởi các hạn chế của HTTP cũng trở thành các hạn chế của kiến trúc REST. Ví dụ: HTTP không lưu trữ thông tin về trạng thái giữa các chu kỳ khi phản hồi yêu cầu, và như vậy các ứng dụng dựa trên REST rơi vào tình trạng không rõ trạng thái và mọi tác vụ quản lý trạng thái phải được máy khách thực hiện.
## Kết luận
Tóm lại,bài viết trên là những kiến thức về REST và RESTful API mình tìm hiểu được.  Trong bài viết chắc hẳn còn nhiều thiếu sót, mong mọi người cùng đóng góp để bài viết được hoàn thiện hơn.

## Tham khảo
https://www.mulesoft.com/resources/api/restful-api
https://medium.com/eway/nguy%C3%AAn-t%E1%BA%AFc-thi%E1%BA%BFt-k%E1%BA%BF-rest-api-23add16968d7