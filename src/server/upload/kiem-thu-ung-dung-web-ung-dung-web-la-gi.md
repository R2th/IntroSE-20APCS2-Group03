Trong bài trước, Kiểm thử ứng dụng Web – Cái nhìn tổng quát, mình đã khái quát một số nội dung chính về chủ đề kiểm thử web nhằm giúp các bạn định hình hệ thống kiến thức về mảng kiểm thử web. Trong bài này, mình xin giới thiệu tiếp một số kiến thức phổ thông về ứng dụng Web nhẳm giúp các bạn có thể tiếp cận dễ dàng hơn các định nghĩa căn bản....
# **Định nghĩa Web**
Hẳn chúng ta đã quá quen thuộc với việc gõ lên thanh URL trên màn hình Internet Explorer (IE), Firefox, Chrome những dòng chữ: http://www.blah blah…com. Từ “Web” mà chúng ta đang tìm hiểu là tên gọi tắt của “World Wide Web” (vâng, chính là chữ www bạn thấy trong URL bên trên). Khi mạng máy tính toàn cầu internet ra đời, nó mở ra một môi trường mạng lưới ảo kết nối mọi máy tính (như mạng nhện – web). Trong đó, tất cả máy tính trở thành những đầu mút kết nối lẫn nhau, mỗi đầu mút chia sẻ thông tin, tài liệu mà nó lưu trữ để tất cả đầu mút khác có thể truy cập và ngược lại. Khi ta kết nối máy tính của mình vào bất kỳ đầu mút nào, ta cũng có thể tiếp cận thông tin của tất cả nơi khác trên mạng lưới. Ta gọi mạng lưới đó là “World Wide Web” – một không gian ảo kết nối tất cả thông tin từ mọi nơi trên thế giới.

Cùng với sự phát triển không ngừng, theo thời gian tất cả máy tính kết nối trong mạng lưới được phân hóa theo 2 mục đích chuyên biệt:

1. Server: có dung lượng lưu trữ lớn và cấu hình rất mạnh chỉ nhằm mục tiêu chia sẻ thông tin
2. Client/Workstation: đây chính là máy tính cá nhân/thiết bị của chúng ta khi kết nối internet, chỉ nhằm mục đích truy cập thông tin từ nơi khác và chia sẻ một lượng rất nhỏ thông tin.

Thêm vào đó, các loại hình chia sẻ thông tin trực tuyến không chỉ dừng lại ở việc trao đổi và truy cập dữ liệu. Sự phát triển của công nghệ đã mở ra các loại hình dịch vụ trực tuyến mới với đa dạng mục đích hơn: báo chí, tìm kiếm, kinh doanh trực tuyến, thanh toán trực tuyến, email, mạng xã hội…
# **Vậy ứng dụng Web là gì?**
Ta hãy xem xét một ví dụ đơn giản: khi bạn “lướt Facebook”

1. Bạn mở Firefox hoặc Internet Explorer và gõ vào URL của trang Facebook https://www.facebook.com/
2. Màn hình Firefox sẽ hiện ra trang chủ quen thuộc của Facebook. Trên đó hiển thị logo Facebook, dòng slogan “kết nối và chia sẻ” quen thuộc, một form đăng nhập username password và một form đăng ký cho những user mới.
3. Bạn gõ username, password vào form đăng nhập và click “Log In”
4. Màn hình Firefox chuyển đến trang cá nhân của tài khoản mà bạn vừa đăng nhập, trên đó hiện ra các dòng status của bạn và bạn bè

Chúng ra nói rằng trang Facebook mà bạn vừa đăng nhập ở trên là một “Ứng dụng Web” (Web Application – xin gọi tắt là WebApp). WebApp này cung cấp cho bạn (là người dùng – một end-user) một dịch vụ mạng xã hội đến từ tập đoàn Facebook. Tất cả mọi WebApp khi được xây dựng đều nhằm mục đích cung cấp một dịch vụ nào đó mà chủ nhân nó muốn (vd: mạng xã hội Facebook, hộp Mail Google, báo điện tử VNExpress, trang mua sắm Lazada). Hãy cùng phân tích chuyện gì đã xảy ra đằng sau màn hình desktop khi bạn thực hiện 4 hành động trên:

**Ở bước 1**: Facebook, cũng như tất cả mọi WebApp khác, để kết nối và hoạt động được trên mạng internet nó cần được cài đặt lên một máy chủ (Host – Server) và đăng ký một tên miền (vd: “www.facebook.com”). Khi bạn (một end-user) gõ đường URL “https://www.facebook.com/” vào Firefox trên máy mình, ta nói rằng bạn đang thực hiện gửi một yêu cầu (request) đến tên miền “www.facebook.com” nhằm xin phép truy cập vào WebApp Facebook. Tuy nhiên, máy móc không hiểu tiếng người và để phía Server kia giao tiếp được với bạn thì request của bạn cần được thông dịch qua một thứ ngôn ngữ giao tiếp mà server đó có thể hiểu được. Các trình duyệt web (browser) như Firefox, IE, Chrome ra đời nhằm mục đích này. Chúng được cài đặt trên máy tính của bạn (client) để thông dịch các request của bạn qua mã máy, gói đoạn mã máy lại thành từng gói dữ liệu và gửi đến địa chỉ www.facebook.com. Hiện nay, ngôn ngữ giao tiếp thông dụng nhất dùng để giao tiếp với các server trên internet là HTTP (Hypertext Transfer Protocol)


Một gói request http thường có định dạng tương tự như sau:

*GET / HTTP/1.1*

*Host: facebook.com*

*User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)*

*Accept: text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8*


**Ở bước 2**: Khi server Host kia nhận được gói dữ liệu request của bạn, nó phân tích và chuyển đến một trung tâm điều phối được cài sẵn trên chính nó gọi là Web Server. Trung tâm điều phối này là một phần mềm có nhiệm vụ quản lý và điều phối các tài nguyên của WebApp (resource). Ta hiểu tài nguyên là các thành phần cấu thành một WebApp, trong đó có các trang web (webpage), các file hình ảnh, các file video, các hiệu ứng chữ chạy, chữ nổi .… Web Server này đọc gói request của bạn và nó sẽ hiểu rằng bạn đang cần truy cập vào WebApp “Facebook”. Nó bắt đầu áp dụng quy trình thủ tục được lập trình sẵn là yêu cầu bạn khai báo xem bạn có tài khoản chưa trước khi cho bạn đi xa hơn. Nó soạn ra một gói dữ liệu trả về (response) bao gồm mã cho phép truy cập và nội dung trang web homepage của Facebook.


Một gói response http thường có định dạng tương tự như sau:

*HTTP/1.1 200 OK*

*Date: Sat, 31 May 2015 23:59:59 GMT*

*Content-Type: text/html*

*Content-Length: 1354*

*<html><body>*
Nội dung trang web homepage Facebook).
*</body></html>*


Bạn sẽ thấy rằng ngoài thông tin quy định về ngày giờ và mã truy cập, gói dữ liệu này còn kèm theo 2 đoạn tag <html><body>…</body></html>. Giữa 2 đoạn tag này thường là nội dung một webpage được viết dưới định dạng HTML, CSS và Javascript. Đây là các ngôn ngữ trình diễn nội dung web thông dụng và cũng có thể được đọc hiểu bởi browser. Browser nhận gói dữ liệu này, biên dịch nội dung kẹp trong gói response và vẽ lên màn hình trang web Login Facebook với đầy đủ hình ảnh và màu sắc trên máy bạn. Và với những thông tin trình diễn trên màn hình, bạn sẽ hiểu là server muốn bạn đăng nhập với một tài khoản để đi xa hơn. Trên webpage vẽ sẵn form để bạn nhập username và password. Form đăng ký cũng được vẽ sẵn bên dưới để bạn hiểu là bạn cần đăng ký nếu chưa có tài khoản.

**Ở bước 3**: Khi bạn nhập username, password và click “Log In”, cũng giống như ở bước 1 ở trên, bạn đã thực hiện 1 thao tác gửi request để yêu cầu được truy cập vào trang tài khoản cá nhân của tài khoản mà bạn nhập vào. Browser cũng sẽ biên dịch request của bạn thành 1 gói http request và gửi đến server kia. Tuy nhiên, lần này có một chút khác biệt là request này còn kèm theo 2 trường usersername và password bạn nhập vào. Ta sẽ có một gói request đại loại như:

*POST / HTTP/1.1*

*content-type:application/x-www-form-urlencoded;charset=utf-8*

*host: facebook.com*

*content-length: 1354*

*Action=GetUserHome&Username=HmacSHA256&Password=45rffdd33yyd35ggd&SignatureVersion=2&Versi*

**Ở bước 4**: Tương tự như quy trình giao nhận bước 1 và 2, gói dữ liệu request lại được chuyển đến Web Server và tại đây bắt đầu quá trình phân tích/điều hướng để gom những tài nguyên (resource) cần thiết nhằm nhào nặn ra nội dung trang wall facebook của bạn. Trong trường hợp này, thông tin cần được xử lý phức tạp hơn vì cần phải truy xuất những bài post và status, hình ảnh liên quan đến tài khoản của bạn. Webserver có thể huy động đến các cổng xử lý khác để xử lý thông tin, hiệu ứng và truy xuất đến cơ sở dữ liệu (database) của Facebook để lấy ra những dữ liệu cần thiết từ tài khoản của bạn. Toàn bộ quá trình xử lý này sẽ dẫn đến một kết quả cuối cùng là tạo ra nội dung trang wall facebook dưới dạng html, css và javascript để đưa vào gói trả về response. Browser trên máy bạn lại nhận response và bung ra trang wall facebook cá nhân của bạn với đầy đủ status, hình ảnh và comment phong phú.

Cứ như thế, ta thấy rằng lướt web thực ra là một vòng tuần hoàn khép kín giữa việc yêu cầu (request) và gửi trả (response) dữ liệu giữa phía người dùng (client) và server. Phía server tạo ra nội dung web dưới dạng mã html, css. Browser ở phía client sẽ đảm nhận vai trò nhận và vẽ lên màn hình người dùng các nội dung sống động. Khi ta nói rằng ta xây dựng và kiểm thử một WebApp, có nghĩa rằng ta xây dựng và kiểm thử toàn bộ hệ thống giúp tạo nên vòng tuần hoàn khép kín trên.

Nếu bạn hiểu đúng những nội dung trên, bạn sẽ hình dung được khi test 1 ứng dụng web:

1. Chúng ta không test browser vì đó chỉ là 1 trình biên dịch thông dụng cho tất cả ứng dụng web. Chúng ta test “dịch vụ” mà server cung cấp cho client
2. Quy trình (có thể) sẽ dẫn chúng ta đến việc kiểm thử ở cả 2 phía: máy client và server.
3. Tùy vào độ lớn của dịch vụ được xây dựng, chúng ta có thể sẽ làm việc với một vòng trao đổi dữ liệu khép kín phức tạp thông qua nhiều trình ứng dụng, đi qua nhiều cơ sở dữ liệu, và thông qua nhiều máy chủ khác nhau trước khi có thể tạo ra một response đến client cho user.
4. Phạm vi chúng ta cần test sẽ trải dài trên nhiều mảng kiến thức: test trên một ứng dụng server (application), test trên một cơ sở dữ liệu (database), test phần nội dung hiển thị trên trình duyệt client, test việc truyền tải dữ liệu qua lại giữa client và server hoặc (có thể) giữa các server với nhau (API), test các nội dung số và có thể bao gồm cả những quy trình mã hóa dữ liệu (web standards & encryptions).