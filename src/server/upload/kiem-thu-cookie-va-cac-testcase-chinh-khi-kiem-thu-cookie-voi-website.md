## I.Giới thiệu về cookies
Chủ yếu mình sẽ tập trung vào tìm hiểu cookie chính xác là gì và cách nó hoạt động như thế nào. Khi hiểu rõ về cách cookie hoạt động thì sẽ dễ dàng cho bạn để hiểu các test case cho kiểm thử cookie. Cách cookie được lưu trữ trên ổ cứng như thế nào? Và làm thế nào để chỉnh sửa cài đặt cookie?

**a.Cookie là gì?**

Một cookie là một thông tin nhỏ được lưu trữ trong một file text trên ổ cứng của người dùng bằng máy chủ web. Thông tin này sau đó được sử dụng bởi trình duyệt web để lấy thông tin từ máy. Nói chung, cookie chứa dữ liệu cá nhân của người dùng hoặc thông tin dùng để giao tiếp giữa các trang web khác nhau.

**b.Tại sao sử dụng cookie?**

Cookie xác định người dùng và được sử dụng để theo dõi nơi người dùng điều hướng trên các trang của website. Sự tương tác giữa trình duyệt web và máy chủ web là stateless(*thiết kế không lưu dữ liệu của client trên server*).
***Ví dụ:*** 
Nếu mình truy cập tên miền "http:www.example.com/1.html" sau đó đơn giản trình duyệt web sẽ  truy vấn đến máy chủ web example.com cho trang 1.html. Lần truy cập tiếp theo, nếu mình truy cập tên miền "htttp://www.example.com/2.html" thì yêu cầu mới được gửi đến máy chủ example.com để gửi trang 2.html và máy chủ web lúc đó không biết bất kì điều gì về user mà trang 1.html trước đã phục vụ. 
Vậy làm sao để  biết lịch sử của người sử dụng đã tương tác trước đó với máy chủ web?  Mình cần phải duy trì trạng thái của người dùng và sự tương tác giữa trình duyệt web và máy chủ web ở một vài nơi nào đó. Đó chính là lí do cookie xuất hiện. Cookie phục vụ cho mục đích duy trì sự tương tác của người dùng với một trình duyệt web. 

**c.Cookie hoạt động như thế nào?**

Giao thức HTTP được sử dụng để trao đổi các tập thông tin trên web được sử dụng để duy trì các cookie. 

Có hai loại của giao thức HTTP là giao thức HTTP Stateless và và HTTP Statefull. Giao thức HTTP Stateless không giữ bất kỳ bản ghi nào về lịch sử trang web truy cập trước đó. Trong khi giao thức HTTP Statefull lưu một số lịch sử của các trình duyệt web và các tương tác của máy chủ web trước đó và giao thức này được các cookie sử dụng để duy trì sự tương tác người dùng. 

Bất cứ khi nào người dùng ghé thăm một trang web hay một trang đang sử dụng cookie, mã nhỏ bên trong trang HTML (Nói chung gọi đến một số tập lệnh ngôn ngữ để ghi cookie như cookie trong JAVAScript, PHP, Perl) viết một tập tin văn bản trên máy người dùng được gọi là cookie. 

*Sau đây là một ví dụ về mã được sử dụng để viết một cookie và có thể được đặt trên bất kì trang HTML nào:*

Set-Cookie: NAME=VALUE; expires=DATE;path=PATH;domain=DOMAIN_NAME;

Khi người dùng truy cập cùng một trang hoặc tên miền, cookie này được đọc từ đĩa và được sử dụng để xác định lần truy cập thứ hai của cùng một người trên miền đó. Thời gian hết hạn được cài đặt trong khi viết cookie. Thời gian này được quyết định bởi ứng dụng sẽ sử dụng cookie. 

Có hai loại cookie được ghi trên máy người dùng là: 

*#1) Session cookies:*

Cookie này hoạt động cho đến khi trình duyệt gọi đến cookie đang mở. Khi mình đóng trình duyệt thì phiên cookie này sẽ bị xóa(*Thường cài đặt sau khoảng thời gian 20 phút  thì hết hạn phiên cookie*)

*#2)Persistent cookies:*

Đây là những cookie được ghi vĩnh viễn trên máy người dùng và kéo dài hàng tháng hoặc nhiều năm.

**d.Các cookie được lưu trữ ở đâu?**

Khi bất kỳ ứng dụng trang web nào ghi một cookie nó sẽ được lưu trong một tệp tin văn bản trên ổ cứng của người dùng. Đường dẫn nơi cookie được lưu trữ phụ thuộc vào trình duyệt. Các trình duyệt khác nhau thì lưu trữ cookie theo các đường dẫn khác nhau.

*Các đường dẫn được đề cập dưới đây là ví dụ nơi các cookie được lưu trữ:*

Internet Explorer: “C:\Users\username\AppData\Roaming\Microsoft\Windows\Cookies”.

Windows 7:“C:\Users\username\AppData\Roaming\Microsoft\Windows\Cookies\Low”.

Windows 8 and Windows 10:“C:\Users\username\AppData\Local\Microsoft\Windows\INetCookies”.

Ở đây, "Default User" có thể được thay thế bởi người dùng hiện tại bạn đã đăng nhập giống như "Quản trị viên" hoặc tên người dùng như "Vijay" v..v

Đường dẫn cookie có thể dễ dàng tìm thấy bằng cách điều hướng qua các tùy chọn trình duyệt. 

Trong trình duyệt Mozilla Firefox thậm chí mình có thể xem cookie trong các tùy chọn trình duyệt. Mở trình duyệt Mozilla, nhấn nút "Open menu"? "Web Developer"? "Storage Inspector" hoặc nhấn kết hợp "Shift+F9".

Trong trình duyệt Google Chrome mình có thể tìm các cookie bằng gõ "chrome://settings/content/cookies" trong thanh địa chỉ của bạn. Các cookie cũng có thể được truy cập bằng việc sử dụng trình duyệt console(F12->application->storage->cookies->).

**e.Các cookie được lưu trữ như thế nào?**

Hãy lấy một ví dụ về cookie viết bởi rediff.com trên trình duyệt Mozilla Firefox. Khi mình mở trang rediff.com hoặc đăng nhập vào tài khoản rediffmail, một cookie sẽ được ghi trên đĩa cứng của mình. Để xem cookie này chỉ cần nhấn vào nút "Show cookies" được đề cập trong đường dẫn trên. Nhấn vào trang Rediff.com xem danh sách cookie này.

Mình có thể nhìn thấy các cookie khác nhau được viết bởi miền Rediff với các tên khác nhau. 

Site: Rediff.com Cookie name: RMID

Name: RMID (Name of the cookie)

Content: 1d11c8ec44bf49e0… (Encrypted content)

Domain: .rediff.com

Path: / (Any path after the domain name)

Send For: Any type of connection

Expires: Thursday, December 31, 2020, 11:59:59 PM

## II.Các ứng dụng có thể sử dụng các cookie?

**#1) Được áp dụng cho giỏ hàng(To implement shopping cart)**

Các cookie được sử dụng để duy trì hệ thống đặt hàng trực tuyến. Các cookie này ghi nhớ những sản phẩm mà người dùng muốn mua. Vậy điều gì sẽ xảy ra nếu người dùng thêm một số sản phẩm vào giỏ hàng của họ và vì một vài lí do nào đó người dùng không muốn mua những sản phẩm đó ở thời điểm hiện tại và đóng cửa sổ trình duyệt?
Trong ví dụ trên khi người dùng đó truy cập lại  trang mua hàng thì anh ấy vẫn có thể nhìn thấy tất cả các sản phẩm mà anh ta đã thêm vào giỏ hàng trong suốt lần truy cập trước đó.

**#2) Các trang web được cá nhân hóa(Personalized sites)**

Khi người dùng truy cập một trang nhất định, họ được hỏi những trang mà họ không muốn ghé thăm hoặc không muốn chúng xuất hiện. Các tùy chọn người dùng được lưu trữ trong một cookie cho đến khi người dùng onine, những trang đó không được hiển thị cho họ.

**#3)Theo dõi người dùng(User tracking)**

Để theo dõi số lượng khách truy cập trực tuyến tại một thời điểm cụ thể.

**#4) Marketing**

Một vài công ty sử dụng các cookie để hiển thị quảng cáo trên máy người dùng. Cookie kiểm soát các quảng cáo này. Khi nào và quảng cáo nào nên được hiển thị? Sở thích của người dùng là gì? Từ khóa nào được tìm kiếm trên trang web? Tất cả những điều này có thể được duy trì bằng cách sử dụng cookie.

**#5) Phiên người dùng(User sessions)**

Các cookie có thể theo dõi các phiên người dùng với tên miền cụ thể sử dụng ID người dùng và password.

## III.Test Cases cho kiểm tra cookie của ứng dụng Web
Trường hợp kiểm tra rõ ràng nhất đầu tiên là  kiểm tra xem ứng dụng của mình có đang viết đúng cookie hay không. Mình cũng thể sử dụng Cookie Tester application nếu không có bất kì một ứng dụng web nào để test, tuy nhiên, bạn phải hiểu khái niệm của cookie để tiến hành test.

***Một vài testcase chính để test cookie của ứng dụng web:***

*#1)* Theo chính sách bảo mật Cookie đảm bảo từ các tài liệu thiết kế, không nên có dữ liệu cá nhân hoặc thông tin nhạy cảm nào được lưu trữ trong cookie.

*#2)* Nếu không có lựa chọn nào khác ngoài việc phải  lưu dữ liệu nhạy cảm trong một cookie, hãy chắc chắn rằng dữ liệu trong cookie được lưu trữ dưới dạng mã hóa.

*#3)* Đảm bảo rằng không có quá nhiều cookie trên trang web. Việc lạm dụng cookie sẽ gây phiền toái cho người dùng nếu trình duyệt nhắc nhở cookie thường xuyên hơn và điều này có thể dẫn đến mất lưu lượng của trang web.

*#4)* Vô hiệu hóa các cookie từ cài đặt trình duyệt. Nếu mình đang sử dụng các cookie, các chức năng chính của trang web sẽ không hoạt động bằng cách tắt cookie. Sau đó, thử truy cập trang web đó. Trang web không được có bất kỳ sự cố nào do vô hiệu hóa cookie.

*#5)* Accepts/Reject một số cookie: Cách tốt nhất để kiểm tra chức năng của một website là không accept tất cả các cookie. Giả sử,nếu bạn đang viết 10 cookies trong ứng dụng web thì hãy thử accept ngẫu nhiên một vài cookie( accept 5 và reject 5 cookie). 

Để tính toán số test case trên bạn có thể thiết lập tùy chọn trình duyệt để nhắc nhở bất cứ khi nào cookie được ghi lên đĩa. Trên cửa sổ nhắc nhở này, bạn có thể accept hoặc reject cookie.Sau đó, bạn hãy thử truy cập các chức năng chính của website và xem xét các trang có gặp sự cố hay dữ liệu có bị hư hỏng hay không. 

*#6)* Xóa cookie: Cho phép các trang web viết các cookie và đóng tất cả các trình duyệt và sau đó xóa tất cả các cookie. Truy cập vào trang web và kiểm tra.

*#7)* Tham nhũng các cookie: Như bạn đã biết nơi cookie được lưu trữ. Chỉnh sửa cookie thủ công trong notepad và thay đổi các tham số thành một số giá trị nào đó. Ví dụ sửa nội dung cookie, tên cookie hoặc ngày hết hạn của cookie và xem chức năng trang web. 

Trong một số trường hợp, các cookie bị hỏng cho phép đọc dữ liệu bên trong cho bất kì miền nào khác. Điều này không nên xảy ra với cookie trong  trang web của bạn. Chú ý rằng các cookie được viết bởi tên miền rediff.com không thể truy cập bởi tên miền khác như yahoo.com trừ khi và cho đến khi các cookie bị hỏng và ai đó đang cố gắng để hack dữ liệu trên cookie.

*#8)* Test cookie trên nhiều trình duyệt: Đây là case quan trọng nhất để kiểm tra xem  trang web được viết cookie đúng cách trên các trình duyệt khác nhau như dự định và trang web hoạt động đúng khi sử dụng các cookie này hay không. Bạn có thể kiểm tra ứng dụng web của bạn trên các trình duyệt thường xuyên được sử dụng như Internet Explorer(Với nhiều version khác nhau), Mozilla Firefox, Netscape, Opera,...

*#9)* Nếu ứng dụng web sử dụng cookie để duy trì trạng thái đăng nhập của bất kì người dùng nào, hãy đăng nhập vào ứng dụng đó với  một số username và password.

Trong nhiều trường hợp, mình có thể nhìn thấy tham số ID người dùng đã đăng nhập tực tiếp trên thanh địa chỉ của trình duyệt. Bạn hãy thay đổi tham số này bằng các giá trị khác nhau(*Ví dụ, nếu ID của người dùng trước là 100 hãy đổi thành 101, sau đó nhấn enter*). Chú ý, thông báo quyền truy cập thích hợp phải được hiển thị cho người dùng và người dùng không thể xem tài khoản của người dùng khác. 

*#10)* Kiểm tra loại cookie và ngày hết hạn trong tập tin cookie hoặc bảng điều khiển trình duyệt

*#11)* Xác minh nếu ngày hết hạn được đặt theo yêu cầu. Trong một số trường hợp, bạn cần kiểm tra xem ngày hết hạn cookie đã được cập nhật làm việc với một ứng dụng hay chưa(ví dụ như làm mới phiên làm việc). Điều này có thể được kiểm tra trong bảng điều khiển trình duyệt hoặc file cookie.

Link tài liệu tham khảo: http://www.softwaretestinghelp.com/website-cookie-testing-test-cases/