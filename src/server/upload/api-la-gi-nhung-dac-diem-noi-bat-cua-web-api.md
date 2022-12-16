![](https://images.viblo.asia/ff431b58-d250-4e8b-93bf-ff796787cf9f.jpeg)
Hiện nay WebAPI đang nổi lên là công cụ lập trình web mới và được rất nhiều người sử dụng. Vậy API là gì? Nguồn gốc và ưu điểm của nó là như thế nào chúng ta hãy cùng đi tìm hiểu trong nội dung bài viết sau.
# API là gì?
API là viết tắt của Application Programming Interface (giao diện lập trình ứng dụng) phương thức kết nối với các thư viện và ứng dụng khác. Windows có nhiều API, và Twitter cũng có web API, tuy nhiên chúng thực hiện các chức năng khác nhau, với mục tiêu khác nhau. Nó chính là một phần mềm giao tiếp được sử dụng bởi các ứng dụng khác nhau. Nó cũng giống như bàn phím là thiết bị dùng để giao tiếp giữa người sử dụng và máy tính, API là một phần mềm giao tiếp giữa chương trình và hệ điều hành.
api
Mỗi bộ API dành cho các hệ điều hành khác nhau là hoàn toàn khác nhau và không có sự tương thích với nhau. API dành cho các hệ điều hành Windows và Linux là hoàn toàn khác nhau.
API cung cấp khả năng cung cấp khả năng truy xuất đến một tập các hàm hay dùng.
Nói nôm na API là một loại công cụ để tạo ra phần mềm, cũng giống như các viên gạch xây nên một toà nhà. Chúng ta chia việc xây nhà ra các phần khác nhau, API cũng như viên gạch là một bộ phận của ngôi nhà, nhưng việc tạo ra nó là một công đoạn riêng hoàn toàn, chúng ra có thể tự làm hoặc đơn giản là đi mua của các nhà cung cấp.
Web API là một trong những công nghệ mới của Microsoft  dùng để xây dựng dịch vụ thành  phần phân tán. Web API là mô hình dùng để hỗ trợ MVC bao gồm: routing, controller, action result, filter, filter, loc container, model binder, unit test, injection. Bên cạnh đó nó còn hỗ trợ restful đầy đủ các phương thức: Get/Post/put/delete dữ liệu.
# Những điểm nổi bật của API.
Đây là một trong những framework mới sẽ giúp ít cho bạn trong việc xây dựng các HTTP service một cách rất đơn giản và nhanh chóng.
Mã nguồn mở nên bạn có thể được sử dụng bởi bất kì một client nào hỗ trợ XML, JSON.
Nó cũng có khả năng hỗ trợ đầy đủ các thành phần HTTP: URI, request/response headers, caching, versioning, content forma.
Bạn có thể sử dụng các host nằm trong phần ứng dụng hoặc trên IIS.
Một kiểu kiến trúc vô cùng phù hợp dành cho các thiết bị trang bị băng thông giới hạn như smartphone, tablet.
Thường nó có định dạng dữ liệu là JSON, XML hoặc một kiểu dữ liệu bất kỳ.
# Ưu điểm:
Cấu hình đơn giản khi được so sánh với WCF
Khả năng trình diễn cao
Hỗ trợ chức năng RESTful một cách đầy đủ
Hỗ trợ đầy đủ các thành phần MVC như: routing, controller, action result, filter, model binder, IoC container, dependency injection, unit test
Mã nguồn mở.
# Vậy API có phải một ngôn ngữ lập trình không?
Câu trả lời là không. Các hàm API cũng như các hàm bình thường mà chúng ta hay viết và trên từng ngôn ngữ khác nhau cũng có các bộ API tương ứng khác nhau.
Ví dụ: Google API có bộ cho .NET, PHP,..
Và mỗi bộ API hầu như đều có hướng dẫn sử dụng rất cụ thể và chi tiết.
Cách tạo dự án MVC web API
Đầu tiên bạn vào File/ New/ Project, sau đó chọn ASP.NET Web Application, rồi OK, chọn tiếp template Web API
Tiếp theo để tạo cơ sở dữ liệu cho dự án bạn chọn chuột phải vào dự án Add New Item, SQL Server Database, sau đó lưu vào thư mục App_Data. Tạo những model, controller, view sau đó vào các thư mục Models, Controllers vàViews.