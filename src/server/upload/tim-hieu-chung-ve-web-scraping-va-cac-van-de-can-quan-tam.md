# Web Scraping 
Web Scraping là ứng dụng thu thập dữ liệu được sử dụng để trích xuất dữ liệu từ các trang web. Phần mềm Web Scaping có thể truy cập trực tiếp vào World Wide Web bằng Giao thức HTTP hoặc thông qua trình duyệt web. Mặc dù người dùng phần mềm có thể thực hiện việc quét web theo cách thủ công, nhưng thuật ngữ này thường đề cập đến các quy trình tự động được thực hiện bằng cách sử dụng bot hoặc trình thu thập thông tin web. Đây là một hình thức sao chép, trong đó dữ liệu cụ thể được thu thập và sao chép từ web, thường vào cơ sở dữ liệu cục bộ trung tâm hoặc bảng tính, để truy xuất hoặc phân tích sau này.

# Kiến trúc 
![](https://images.viblo.asia/87d013f2-baeb-4fbc-94a6-ceef24806818.png)

Hình ảnh từ Wikipedia 
Mặc dù khá dễ dàng để xây dựng một web crawler đơn giản có đủ các chức năng thu thập và lưu trữ dữ liệu. Tuy nhiên để đảm bảo có được hiệu năng cao có thể xử lý rất nhiều tác vụ song song hệ thống Web crawler cần được thiết kế với kiến trúc tối ưu nhất. Hình trên trích từ Wikipedia thể hiện kiến trúc thường được sử dụng cho các web crawler mà thứ cải thiện đáng kể hiệu năng hệ thống này với các kiến trúc đơn giản là bộ lập lịch và khả năng xử lý đa luồng
# Các vấn đề cần giải quyết để hệ thống Web Scraping hoạt động hiệu quả
Không phải hệ thống nào cũng cho phép người dùng sử dụng thoải mái dữ liệu từ trang web của họ. Vậy nên khi xây dựng hệ thống Web Scraping cần quan tâm đến các vấn đề như sau: 
## Đặt Rate Limit cho mỗi địa chỉ IP 
Do đặc thù của việc thu thập dữ liệu được thực hiện tự động nên lượng request được tạo nhiều một cách đột biến nếu so sánh với các ca sử dụng của người dùng thông thường bởi vậy máy chủ có thể phát hiện và ngừng cung cấp cho địa chỉ IP đó hoặc có thể block vĩnh viễn. 
### Cách giải quyết: 
- Đặt một số lệnh sleep có lập trình ngẫu nhiên giữa các request, thêm một số thời gian trễ sau khi thu thập thông tin một số lượng nhỏ các trang và chọn số lượng yêu cầu đồng thời thấp nhất có thể. Lý tưởng nhất là đặt độ trễ 10-20 giây giữa mỗi lần request. 
- Sử dụng nhiều địa chỉ thông qua việc dùng may chủ proxy sẽ giúp chúng ta gửi lượng lớn request mà không bị phát hiện và chặn. Khi ta gửi yêu cầu từ máy chủ proxy, trang web mục tiêu sẽ không biết IP gốc từ đâu, khiến việc phát hiện khó hơn. 
## Yêu cầu đăng nhập để có thể truy cập 
HTTP là một giao thức không trạng thái vốn có nghĩa là không có thông tin nào được lưu giữ từ yêu cầu này sang yêu cầu tiếp theo, mặc dù hầu hết các ứng dụng HTTP (như trình duyệt) sẽ lưu trữ những thứ như cookie. Điều này có nghĩa là crawler thường không cần định danh chính nó nếu nó đang truy cập một trang trên một trang web công khai. Nhưng nếu trang đó được bảo vệ bằng thông tin đăng nhập, thì crawler phải gửi một số thông tin nhận dạng cùng với mỗi yêu cầu để truy cập tài nguyên. Điều này sẽ không ngăn cản việc thu thập dữ liệu, nhưng ít nhất sẽ cung cấp cho phía có dữ liệu đang được thu thập một số thông tin chi tiết về những ai đang thu thập dữ liệu từ họ. 
### Cách giải quyết: 
- Một số thư viện có hỗ trợ lưu lại cookie (Session trong request) dựa vào đó chúng ta có thể thực hiện việc đăng nhập một cách tự động và thu thập dữ liệu. Tuy nhiên việc thu thập dữ liệu quá nhanh có thể rất dễ khiến phía bị thu thập phát hiện bằng các công cụ tự động và ngăn chặn. Bởi vậy cần có cơ chế cũng như tốc độ thu thập phù hợp để quá trình thu thập không bị gián đoạn. 
## Thay đổi HTML thường xuyên 
Trình quét thường xuyên dựa vào việc tìm kiếm các mẫu trong đánh dấu HTML của một trang web và sau đó sẽ sử dụng các mẫu đó làm manh mối để giúp tập lệnh của trình thu thập tìm thấy dữ liệu phù hợp trong trang web HTML. Nếu cấu trúc trang web thay đổi thường xuyên hoặc hoàn toàn không nhất quán, crawler khó có thể hoạt động hiệu quả. Đôi khi, chỉ cần thay đổi lớp và id trong HTML (và các tệp CSS tương ứng) là đủ để phá vỡ hầu hết các trình thu thập. 
### Cách giải quyết: 
- Do việc thay đổi mã nguồn hệ thống mất nhiều thời gian và công sức nên hiếm khi bên có dữ liệu đang bị thu thập hiếm khi thay đổi trang web của họ một cách liên tục. Tuy nhiên ứng dụng thu thập dữ liệu cần được giám sát để cập nhật lại logic mỗi khi trang web nguồn thay đổi cấu trúc. 
## Chuyển một số dữ liệu về dạng hình ảnh 
- Do các ứng dụng thu thập chỉ có thế thu thập dữ liệu dạng văn bản mà khó có thể hiểu được nôi dung của ảnh, video, ... vậy nên một số dữ liệu quan trọng có thể được chuyển sang dạng hình ảnh cũng như video, .. để tránh bị thu thập Cách giải quyết: 
- Do hình ảnh nói chung khó có thể tối ưu về mặt hiển thị cũng như các hình ảnh chất lượng cao thường có kích thước lớn cũng như khó có thể sinh ra một cách tự động. Vậy nên các thông tin trong hình ảnh thường cố định, nội dung không quá phức tạp. Nếu dữ liệu trong ảnh thực sự cần được thu thập thì một số công nghệ OCR có thể giúp ta đọc được phần văn bản trong hình ảnh. 
## Sử dụng CAPTCHA khi cần thiết 
CAPTCHA được thiết kế đặc biệt để tách con người khỏi máy tính bằng cách trình bày những vấn đề mà con người thường thấy dễ dàng, nhưng máy tính lại gặp khó khăn. Do đó các trình thu thập khó có thể vượt qua những phần này.
### Cách giải quyết: 
- CAPTCHA hiếm khi được sử dụng nhiều, hầu như chỉ được sử dụng với các thông tin nhạy cảm. Những thông tin này hầu như sẽ ít khi được thu thập vậy nên hầu như ta có thể bỏ qua vấn đề CAPTCHA. Tuy nhiên nếu thực sự cần thiết thì một số thư viện được dùng để scraping hiện này có công cụ anti-captcha 
## Tạo bẫy các công cụ thu thập 
Phương pháp này được thực hiện bằng cách thêm các thành phần mà người dùng dễ dàng bỏ qua hoặc không nhìn thấy như một thẻ a hoặc button có style là display:none. Đây là các nút, đường dẫn mà con người sẽ không bao giờ truy cập, nhưng một trình thu thập đang nhấp vào mọi liên kết trên một trang có thể tình cờ xem được, từ đó cản trở quá trình thu thập dữ liệu bằng cách tạo ra chuỗi truy cập vô tận, ..... 
### Cách giải quyết: 
- Thông thường trong quá trình chuẩn bị thu thập, chúng ta thường xác định trước phần dữ liệu nào có ích với bài toán của mình và phần dữ liệu nào thì không và điều đó hạn chế việc dính bẫy khi thu thập dữ liệu. Tuy nhiên cần có những cơ chế thích hợp để giải quyết một số vấn đề có thể gặp phải, ví dụ như quy định độ dài lớn nhất mà một chuỗi truy cập có thể tránh việc tạo ra chuỗi truy cập vô tận. 
# Một số thư viện/framework của Python thường được sử dụng nhằm mục đích thu thập dữ liệu

## Beautiful Soup (BS4)

Beautiful Soup (BS4) là một thư viện phân tích cú pháp có thể sử dụng các parsers khác nhau từ đó có thể trích xuất dữ liệu từ các tài liệu HTML và XML một cách dễ dàng. Về mặc định, Beautiful Soup sử dụng parser cơ bản của Python. Mặc dù khá linh hoạt và dễ sử dụng, parser này là có hiệu năng khá kém do tốc độ xử lý khá chậm. Tin tốt là bạn hoàn toàn có thể hoán đổi trình phân tích cú pháp của nó bằng một trình phân tích cú pháp nhanh hơn nếu bạn cần cải thiện nhiều tốc độ của ứng dụng. 

Sau khi phân tích các HTML cũng như XML đầu vào, Beautiful Soup cho phép chúng ta dễ dàng di chuyển, tìm kiếm, thay đổi cũng như trích xuất dữ liệu từ cây cú pháp. Cú pháp rõ ràng linh hoạt tương tự cách chúng ta tương tác với DOM bằng các thư viện JavaScript là một trong những lý do khiến Beautiful Soup trở thành một trong những công cụ phổ biến nhất cho việc thu thập dữ liệu web, bên cạnh sự mạnh mẽ của nó.

## Selenium
Selenium là một trong những công cụ kiểm thử phần mềm tự động mã nguồn mở mạnh nhất hiện nay cho việc kiểm thử ứng dụng Web. Selenium script có thể chạy được trên hầu hết các trình duyệt như IE, Mozilla FireFox, Chrome, Safari, Opera; và hầu hết các hệ điều hành như Windows, Mac, Linux. Về cơ bản mà nói, quá trình scraping cũng tương tự như quá trình kiểm thử ứng dụng tự động bởi chúng đều thực hiện một chuỗi thao tác tương tác với các trang web một cách tự động và liên tục. Bởi vậy, Selenium thường xuyên được sử dụng nhất là khi cần thu thập từ các trang web SPA - thứ mà khó có thể thu thập được dữ liệu từ nó nếu như phần mã JavaScript của chúng không được thực thi.

## Scrapy

Về mặt kỹ thuật, Scrapy không phải một thư viện mà là một framework phục vụ mục đích thu thập dữ liệu. Điều đó có nghĩa là bạn có thể sử dụng nó để quản lý các yêu cầu, duy trì các phiên của người dùng, theo dõi chuyển hướng và xử lý các pipelines đầu ra. Nó cũng có nghĩa là bạn có thể hoán đổi các mô-đun riêng lẻ với các thư viện duyệt web Python khác. Ví dụ: nếu bạn cần chèn Selenium để quét các trang web động, bạn có thể làm điều đó

# Tổng kết
Bài viết này trình bày một số kiến thức cơ bản về Web Scraping và các vấn đề cần giải quyết để hệ thống Web Scraping hoạt động hiệu quả cũng như giới thiệu qua về một số thư viện/framework của Python thường được sử dụng nhằm mục đích thu thập dữ liệu. Có thể thấy rằng trong thời điểm hiện tại, dữ liệu đóng vai trò tối quan trọng trong kỷ nguyên số. Việc tận dụng được nguồn tài nguyên này giúp chúng ta có thể tạo ra rất nhiều giá trị hữu ích cho bản thân và mọi người xung quanh. Tuy nhiên để có thể xây dựng và vận hành một hệ thống thu thập dữ liệu web một cách hiệu quả, người phát triển không chỉ cần tập trung đến các vấn đề về công nghệ mà cần quan tâm cả đến các vấn đề về tính hợp pháp do không phải loại dữ liệu nào có thể được thu thập. Bài viết đến đây là kết thúc cảm ơn mọi người đã giành thời gian đọc.