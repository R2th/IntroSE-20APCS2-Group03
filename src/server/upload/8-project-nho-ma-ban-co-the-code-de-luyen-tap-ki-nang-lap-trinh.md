Hôm trước, mình có giới thiệu về JavaScript, đánh giá nó là một ngôn ngữ mạnh mẽ, đáng học.
Một trong những cách học nhanh nhất chính là sử dụng JavaScript để build một số pet project (dự án nhỏ) để làm quen với ngôn ngữ và công nghệ.
Mình cũng có hứa là sẽ chia sẻ một số project nhỏ mà các bạn có thể sử dụng JavaScript để build.
Do vậy, hôm nay mình viết bài này, tổng hợp 9 dự án nhỏ, đơn giản, dễ làm mà các bạn có thể tập code để nâng cao kĩ năng lập trình.
Note: Tuy nói là JavaScript nhưng các bạn có thể dùng bất cứ ngôn ngữ gì code cũng được nhé (C#, Java, PHP). Chỉ có một vài dự án sẽ cần dùng JavaScript ở front-end thôi.

Cấp độ dễ
Các dự án cấp độ dễ này chỉ cần đụng tới console/file. Thời gian code cũng khá nhanh. Hoàn thành các dự án này, bạn sẽ có nền tảng để làm những thứ phức tạp hơn.

## 1. Tool crawl dữ liệu từ các website
Mô tả: Viết một tool gửi HTTP Request tới một trang web tin tức bất kì như vnexpress, webtretho, kenh14, bóc tách dữ liệu từ HTML, sau đó in ra cửa sổ console.

Mình từng có 2 bài chia sẻ về cái này:

Sử dụng HTML Agility Pack trong C#
Sử dụng Puppeteer trong NodeJS
Kĩ năng học được:

Cách sử dụng thư viện để gọi HTTP Request
Cách sử dụng xpath/selector để lấy dữ liệu từ HTML

Làm một con web crawler đơn giản
 

## 2. Ứng dụng ghi chú (notes) trên console
Mô tả: Cửa sổ console sẽ hiện 1 menu bao gồm:

Hiển thị toàn bộ các ghi chú
Thêm một ghi chú mới
Sửa một ghi chú đã code
Xóa bỏ một ghi chú
Bonus: Nếu lưu toàn bộ các notes trong memory, khi tắt ứng dụng các note sẽ biến mất. Lưu toàn bộ các notes xuống file txt, khi mở ứng dụng lên ta sẽ đọc từ file này.

Kĩ năng học được:

Cách nhận input/output từ console
Cách làm việc với mảng
Cách làm việc với file I/O
Cấp độ trung bình
Các dự án ở cấp độ trung bình này sẽ đòi hỏi bạn biết thêm về UI, database, cron, Web API.

## 3. Ứng dụng ghi chú (notes) cải tiến:
Mô tả: Chức năng tương tự như ứng dụng ghi chú phía trên, nhưng có UI (Dùng Electron của JS, Winform/WPF của C#, Java Swing của Java). Note nên được lưu vào database, đọc từ database

Kĩ năng học được:
Cách làm việc với UI
Cách lưu trữ, đọc dữ liệu từ database
Các bạn có thể tìm hiểu về Electron, framework cho phép ta dùng HTML/CSS/JS để build ứng dụng chạy trên mọi hệ điều hành
 
## 4. Rest API cho VNExpress, Web Trẻ Thơ
Mô tả: Dự án gồm 2 phần:

Crawler lấy dữ liệu bài viết từ VNExpress, webtretho, bao gồm: Tựa đề, nội dung, url bài viết, thời gian đăng, lưu xuống database. Crawler này sẽ chạy mỗi 60 phút. (Tìm hiểu về cron hoặc recurring task)
RESTful API, cho phép người dùng lấy thông tin các bài viết đã có trong database dưới dạng JSON. API này cho phép search, filtering, paging. Có thể dùng bất kì framework nào (Express, Hapi, ASP.NET MVC) tùy thích.
Bonus: Tìm cách deploy dự án này lên heroku hoặc now.sh cho bạn bè dùng thử. Nhớ thêm swageer để người dùng biết cách gọi API nha.

Kĩ năng học được:
Cách viết cron job/recurring task
Cách viết RestfulAPI sử dụng Web Framework
RestAPI của Code Dạo viết, cho phép tìm info diễn viên và những phim họ đã đóng
 

## 5. Làm Facebook chat bot
Mô tả: Làm một con Facebook chat bot đơn giản, có khả năng nhận tin nhắn của người dùng, chat lại những thứ người dùng nói

Hướng dẫn thì các bạn xem lại series Hướng dẫn Facebook Chat Bot của mình nha.

Kĩ năng học được:

Hiểu về webhook, biết cách setup webhook
Biết message payload của Facebook webhook gồm những thành phần nào
Cách sử dụng RestAPI/ Facebook Graph API
Cấp độ khó
Nói là khó chứ cấp độ này cũng không quá khó đâu, chỉ có điều hơi nhiều chức năng và hơi rộng thôi.

Bạn phải hoàn thành những dự án nhỏ ở những cấp độ trước thì mới đủ khả năng hoàn thành những dự án này nhé. Đa phần các dự án này là dự án web, các bạn muốn dùng framework nào cũng được.

## 6. Ứng dụng ghi chú bản Web/Mobile
Mô tả: Đưa ứng dụng ghi chú của bạn lên Web/Mobile. Thêm một số tính năng như Login, cho phép người dùng chọn màu sắc, style của note.

Bạn có thể sử dụng framework gì tùy thích. Nếu làm bản mobile thì phía back-end sẽ tạo RestAPI cho mobile dùng nhé.

Kĩ năng học được:

Cách dùng web framework để tạo 1 trang web động.
Cách implement chức năng login, lưu trữ thông tin người dùng.
 

## 7. App chat đơn giản realtime
Mô tả: Làm một chatroom đơn giản, ko cần đăng nhập, chỉ cần nhập username là có thể chat (Tương tự ví dụ mẫu này: Làm app chat đơn giản với Firebase)

Bạn có thể tìm hiểu về Firebase, socket.io của NodeJS hoặc SignalR của .NET

Kĩ năng học được:

Cách code ứng dụng realtime, dùng công nghệ hỗ trợ realtime.

Firebase dùng làm ứng dụng real-time khá là ok nha
 

## 8. Blog cá nhân
Mô tả: Tạo 1 blog cá nhân với 2 phần

Phần mặt tiền: hiển thị blog, paging, chia blog theo các category, comment blog
Phần admin: cho phép bạn tạo category, tạo bài viết, format dưới dạng HTML, sửa hoặc xóa bài viết.
Kĩ năng học được:

Cách thiết kế Database cho một blog
Cách lưu trữ hình ảnh (lưu file rồi đường dẫn xuống database nha), hiển thị hình ảnh
Cách làm web động và sử dụng WYSIWYG editor