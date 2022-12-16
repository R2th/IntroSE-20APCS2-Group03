## API là gì?
API là viết tắt của Application Programming Interface (Giao diện lập trình ứng dụng), một phần mềm trung gian cho phép hai ứng dụng nói chuyện với nhau. Mỗi khi sử dụng một ứng dụng như Facebook, gửi tin nhắn tức thì hoặc kiểm tra thời tiết trên điện thoại, có nghĩa là bạn đang sử dụng API.

Mục đích chính của một API là cung cấp khả năng truy xuất đến một tập các hàm hay dùng, ví dụ, hàm để vẽ các cửa sổ hay các icon trên màn hình. Các API, cũng như hầu hết các interfaces, đều có tính trừu tượng (abstract). Phần mềm muốn cung cấp truy xuất đến chính nó thông qua các API cho sẵn, phải hiện thực API đó. Trong nhiều trường hợp, một API thường là một phần của bộ SDK, hay software development kit. Một bộ SDK có thể bao gồm một API cũng như các công cụ/phần cứng, vì thế hai thuật ngữ này không thay thế cho nhau được.
## Giải thích chi tiết
Windows có nhiều API, và Twitter cũng có web API, tuy nhiên chúng thực hiện các chức năng khác nhau, với mục tiêu khác nhau. Nó chính là một phần mềm giao tiếp được sử dụng bởi các ứng dụng khác nhau. 
Nó cũng giống như bàn phím là thiết bị dùng để giao tiếp giữa người sử dụng và máy tính. API là một phần mềm giao tiếp giữa chương trình và hệ điều hành. Mỗi bộ API dành cho các hệ điều hành khác nhau là hoàn toàn khác nhau và không có sự tương thích với nhau. 
API dành cho các hệ điều hành Windows và Linux là hoàn toàn khác nhau. API cung cấp khả năng cung cấp khả năng truy xuất đến một tập các hàm hay dùng. Nói nôm na API là một loại công cụ để tạo ra phần mềm, cũng giống như các viên gạch xây nên một toà nhà. 
Chúng ta chia việc xây nhà ra các phần khác nhau, API cũng như viên gạch là một bộ phận của ngôi nhà, nhưng việc tạo ra nó là một công đoạn riêng hoàn toàn, chúng ra có thể tự làm hoặc đơn giản là đi mua của các nhà cung cấp. 
Web API là một trong những công nghệ mới của Microsoft dùng để xây dựng dịch vụ thành phần phân tán. Web API là mô hình dùng để hỗ trợ MVC bao gồm: routing, controller, action result, filter, filter, loc container, model binder, unit test, injection. Bên cạnh đó nó còn hỗ trợ restful đầy đủ các phương thức: Get/Post/put/delete dữ liệu.
## Những điểm nổi bật của API.
Đây là một trong những framework mới sẽ giúp ít cho bạn trong việc xây dựng các HTTP service một cách rất đơn giản và nhanh chóng. Mã nguồn mở nên bạn có thể được sử dụng bởi bất kì một client nào hỗ trợ XML, JSON. 
Nó cũng có khả năng hỗ trợ đầy đủ các thành phần HTTP: URI, request/response headers, caching, versioning, content forma. Bạn có thể sử dụng các host nằm trong phần ứng dụng hoặc trên IIS. 
Một kiểu kiến trúc vô cùng phù hợp dành cho các thiết bị trang bị băng thông giới hạn như smartphone, tablet. Thường nó có định dạng dữ liệu là JSON, XML hoặc một kiểu dữ liệu bất kỳ.

## Ưu điểm
Cấu hình đơn giản khi được so sánh với WCF Khả năng trình diễn cao Hỗ trợ chức năng RESTful một cách đầy đủ Hỗ trợ đầy đủ các thành phần MVC như: routing, controller, action result, filter, model binder, IoC container, dependency injection, unit test Mã nguồn mở.

## Vậy API có phải một ngôn ngữ lập trình không?
Câu trả lời là không. Các hàm API cũng như các hàm bình thường mà chúng ta hay viết và trên từng ngôn ngữ khác nhau cũng có các bộ API tương ứng khác nhau. Ví dụ: Google API có bộ cho .NET, PHP,.. Và mỗi bộ API hầu như đều có hướng dẫn sử dụng rất cụ thể và chi tiết. Cách tạo dự án MVC web API Đầu tiên bạn vào File/ New/ Project, sau đó chọn ASP.NET Web Application, rồi OK, chọn tiếp template Web API Tiếp theo để tạo cơ sở dữ liệu cho dự án bạn chọn chuột phải vào dự án Add New Item, SQL Server Database, sau đó lưu vào thư mục App_Data. Tạo những model, controller, view sau đó vào các thư mục Models, Controllers và Views.

## Tầm quan trọng của API

API là khớp nối giữa các thành phần phần mềm.

Giả sử bạn có một tính năng cần cung cấp cho module khác phần mềm khác thì bạn sẽ mở một API để tác giả của module/ phần mềm truy cập vào.

Ví dụ, trên các thiết bị điện toán thì hệ điều hành là phần mềm duy nhất có khả năng truy cập tới các thiết bị phần cứng. Do đó, hệ điều hành sẽ phải cung cấp API để ghi file, đọc file, đọc dữ liệu…. Mỗi ứng dụng khi hoạt động sẽ gọi tới API tương ứng của hệ điều hành.

Khi một phần mềm gọi tới API, phần mềm gọi có thể cung cấp dữ liệu đầu vào và đòi hỏi dữ liệu đầu ra từ API hoặc không, nhưng trong mọi trường hợp, phần mềm gọi để có thể tiếp tục hoạt động thì nó cần phần mềm cung cấp phải thực hiện những gì đã cam kết qua API.

Tuy nhiên, trên thực tế, bạn phải phụ thuộc vào Microsoft. Nếu Microsoft đóng API, ứng dụng của bạn sẽ không sử dụng được nữa.

Tóm lại, người ta thường ví von tầm quan trọng của API là: "Nếu khái niệm API không còn nữa thì trái đất này sẽ ngừng quay."
## Hiểu hơn về API qua ví dụ về Facebook
Bạn có thể sử dụng tài khoản Facebook của mình để đăng nhập vào rất nhiều trang web không do Facebook kiểm soát. Để người dùng của mình có thể sử dụng thông tin cá nhân Facebook trên các trang này, điều duy nhất mạng xã hội này cần làm là tạo ra một API đăng nhập tài khoản Facebook. 
Mỗi lần bạn click vào nút "Đăng nhập với Facebook" trên Instagram, WhatsApp hay Quora thì các trang web/ứng dụng này sẽ "gọi" tới API của Facebook. Công việc xác thực danh tính sẽ được Facebook thực hiện, các trang web và các ứng dụng không cần phải nhúng tay vào. 
Sau khi xác thực xong, Facebook sẽ "ném" lại cho các trang web và ứng dụng gọi tới API của mình trên một gói tin có nội dung đại loại như "Đây là anh Lê Hoàng, tài khoản Facebook là abcxyz" chẳng hạn. Nhờ có API mà Facebook có thể thực hiện tính năng xác thực hộ các dịch vụ khác.