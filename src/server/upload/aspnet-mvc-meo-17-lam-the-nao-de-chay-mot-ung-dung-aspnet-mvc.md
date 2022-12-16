Trong mẹo này, tôi giải thích các tùy chọn khác nhau để chạy một ứng dụng ASP.NET MVC từ Visual Studio 2008. Tôi khuyên bạn nên chạy một ứng dụng ASP.NET MVC trực tiếp từ ASP.NET Web Server Development.

Ứng dụng ASP.NET MVC hoạt động khác với ứng dụng ASP.NET Web Forms thông thường. Khi bạn yêu cầu một URL, có thể không có một trang tương ứng trên ổ cứng của bạn. Ví dụ: hãy tưởng tượng rằng bạn yêu cầu URL sau:

/Product/Index.aspx

Không có lý do gì để cho rằng một ứng dụng ASP.NET MVC chứa một thư mục Product hoặc thư mục Product chứa một tệp có tên là Index.aspx. Module Routing được sử dụng bởi ASP.NET MVC, theo mặc định, sẽ định tuyến request này đến một controller có tên ProductController và gọi phương thức Index() của ProductController. Chính phương thức Index() để quyết định xem xem liệu có gì để quay lại trình duyệt hay không.

Vì lý do này, việc chạy một ứng dụng ASP.NET MVC có thể phức tạp hơn việc chạy một ứng dụng ASP.NET Web Forms bình thường. Thông thường, bạn không muốn mở trang hiện tại trong trình duyệt web. Ví dụ, nếu bạn có một tệp có đường dẫn ViewsHomeIndex.aspx mở trong Visual Studio và bạn nhấn F5 để chạy ứng dụng của bạn, thì bạn không muốn Index.aspx mở trong trình duyệt web. Vấn đề là đường dẫn ViewsHomeIndex.aspx không tương ứng với đường dẫn thực để xem View Index. Nhiều khả năng, đường dẫn thực là "/Home/Index.aspx". Tuy nhiên, đường dẫn thực sự, được xác định bởi URL Routing, có thể là bất cứ gì.

## Cài Đặt Start Page
Bạn có thể kiểm soát những gì xảy ra khi bạn nhấn F5 hoặc Ctl-F5 bằng cách sửa đổi các thiết lập "Start Action" của ASP.NET MVC của bạn. Nhấn chuột phải vào dự án của bạn trong Solution Explorer và chọn tùy chọn menu Properties. Chọn tab Web để xem Start Options (xem Hình 1).

Hình 1 - Sửa đổi Start Options
![alt](http://3a0ojxkezud2pogen3j4z0w18nq.wpengine.netdna-cdn.com/blog/images/stephenwalther_com/blog/WindowsLiveWriter/ASP.NETMVCTip17HowtoRu.NETMVCApplication_10596/image_thumb.png)

Có hai phần mà bạn có thể sửa đổi. Phần "Start Action" cho phép bạn chỉ định những gì sẽ xảy ra khi bạn chạy một ứng dụng. Các tùy chọn là:

· Current Page - Cho phép bạn chạy trang hiện tại đang mở để chỉnh sửa trong Visual Studio.

· Specific Page - Cho phép bạn thiết lập một trang cụ thể để chạy. Bạn có thể đặt trang ở đây hoặc bạn có thể nhấp chuột phải vào một trang trong Solution Explorer và chọn tùy chọn Set As Start Page .

· Start External Program - Cho phép bạn chạy một chương trình bên ngoài.

· Start URL - Cho phép bạn request một URL. Tùy chọn này thường được sử dụng khi xây dựng một ứng dụng Web Services.

· Don’t open a page - Cho phép bạn không làm gì cả.

Theo mặc định, một ứng dụng ASP.NET MVC có tùy chọn "Specific Page". Nếu bạn chạy một ứng dụng ASP.NET MVC, ứng dụng sẽ luôn chạy trang mặc định (đường dẫn /).

Ứng dụng ASP.NET Web Forms, ngược lại, có tùy chọn "Current Page" được chọn theo mặc định. Nếu bạn có một trang cụ thể mở trong Visual Studio thì trang đó sẽ chạy.

Lưu ý rằng bạn có thể thay đổi start page cho một ứng dụng ASP.NET MVC thành một trang nào đó. Ví dụ: nếu bạn muốn yêu cầu URL /Product/Show/23 khi ứng dụng của bạn bắt đầu, thì bạn có thể nhập URL này vào trường nhập "Specific Page" .

Bạn cũng có thể sửa đổi phần Servers. Phần này chỉ xuất hiện cho ASP.NET MVC Web Application và ASP.NET Web Forms Applications, nhưng không cho ASP.NET Web Sites. Cài đặt thú vị nhất trong phần này là cài đặt "Enable Edit and Continue" . Cài đặt này theo mặc định là disabled. Nếu bạn enable nó, bạn có thể sửa đổi mã trong ứng dụng của bạn trong khi debug. Ví dụ: bạn có thể đặt breakpoint, nhấn breakpoint, sửa đổi code của bạn và nhấp vào nút Continue và các thay đổi mới sẽ có hiệu lực.

## Chạy từ ASP.NET Development Server
Ban đầu tôi nhận được lời khuyên từ Brian Henderson. Ông ta khuyên bạn nên chạy ứng dụng ASP.NET MVC của bạn bằng cách kích chuột phải vào biểu tượng ASP.NET Development Server trong vùng thông báo của Taskbar và chọn Open in Web Browser (xem Hình 2). Lời khuyên là bạn mở cửa sổ trình duyệt của bạn một lần thôi và giữ nó mở trong khi phát triển một trang web.

Hình 2 - Chạy từ ASP.NET Development Web Server
	![alt](http://3a0ojxkezud2pogen3j4z0w18nq.wpengine.netdna-cdn.com/blog/images/stephenwalther_com/blog/WindowsLiveWriter/ASP.NETMVCTip17HowtoRu.NETMVCApplication_10596/image_thumb_1.png)

Làm theo các bước sau:

(1) Điều hướng đến các thiết lập cho Start Action của dự án của bạn bằng cách kích chuột phải vào dự án của bạn, chọn Properties, và chọn tab Web.

(2) Thay đổi Cài đặt Bắt đầu thành "Don’t open a page".

(3) Thay đổi cài đặt  "Enable Edit and Continue" để bật.

(4) Lưu các thay đổi mới của bạn bằng cách nhấp vào biểu tượng của đĩa mềm.

Sau khi bạn thực hiện các sửa đổi này, thực hiện Debug, Start Debugging hoặc thực thi Debug, "Start without Debugging" sẽ không mở một cửa sổ trình duyệt mới. Sau khi bạn bắt đầu chạy ứng dụng của mình, bạn có thể xem nó bằng cách mở một trình duyệt mới từ ASP.NET Development Server (xem Hình 2).

Lợi thế của việc chạy ứng dụng MVC của bạn theo cách kỳ lạ này là gì? Ưu điểm chính là bạn có thể mở cửa sổ trình duyệt trên một trang cụ thể. Bạn có thể luôn mở ứng dụng MVC của mình (ngay cả khi gỡ lỗi).

Thông thường, khi bạn chạy một ứng dụng ASP.NET MVC bằng cách nhấn F5 và mở một cửa sổ trình duyệt mới, bạn phải đóng cửa sổ trình duyệt khi bạn ngừng debug. Nếu bạn đã điều hướng đến một trang cụ thể, thì bạn phải bắt đầu lại mỗi khi bạn chạy lại ứng dụng của mình. Điều hướng trở lại một trang trước đó bị đóng có thể sẽ rất lãng phí thời gian!

Ngược lại, nếu bạn mở trình duyệt của mình từ ASP.NET Development Server, thì bạn có thể duy trì vị trí trang của mình trong ứng dụng MVC. Bạn thậm chí có thể dừng ứng dụng của mình, thiết lập các breakpoint mới và chạy lại ứng dụng của bạn mà không đóng cửa sổ trình duyệt.

## Tóm lược
Trong mẹo này, tôi đã giải thích các tùy chọn project mà bạn có thể thiết lập để chạy một ứng dụng ASP.NET MVC. Tôi cũng khuyên bạn nên chạy các ứng dụng ASP.NET MVC của bạn từ Máy chủ Phát triển ASP.NET Development Server để bạn có thể duy trì vị trí trang của mình trong một trang web ASP.NET đang chạy.

Nguồn: http://stephenwalther.com/archive/2008/07/10/asp-net-mvc-tip-17-how-to-run-an-asp-net-mvc-application