Chào các bạn. Đối với các bạn theo lập trình web thì có lẽ ai cũng đã từng sử dụng Session và Cookies, tuy nhiên không phải bạn nào cũng nắm được rõ và phân biệt được 2 cái này.
Vì vậy, trong bài này mình sẽ giúp các bạn tìm hiểu về hai khái niệm  này và sự khác nhau giữa chúng.
# Cookie
## Cookie là gì?
* Cookie là những file nhỏ được lưu trữ trên thư mục trình duyệt hoặc thư mục dữ liệu chương trình của máy tính người dùng. Cookie được tạo ra khi người dùng sử dụng trình duyệt của mình để truy cập trang web có sử dụng cookie để theo dõi thao tác của người dùng trên trang web, giúp bạn lưu vết, ghi nhớ đăng nhập, chủ để lựa chọn hay tùy chọn các chức năng tùy chỉnh khác. 
* Chính bởi khả năng như vậy nên Cookie là 1 phần không thể thiếu đối với các trang web có CSDL lớn, cần đăng nhập, có chủ đề tùy chỉnh và các tính năng nâng cao khác.
* Cookie lưu dữ liệu dưới dạng key - value, có thời gian tồn tại (Do phía nhà phát triển quy định). Khi cookies đã được đọc bởi máy chủ hoặc máy khách, dữ liệu có thể được truy xuất và sử dụng để tùy chỉnh trang web một cách thích hợp.
## Cookies được tạo khi nào?
* Việc ghi dữ liệu vào cookie thường được thực hiện khi trang web mới được tải - ví dụ: sau khi nhấn nút 'gửi', trang xử lý dữ liệu sẽ chịu trách nhiệm lưu trữ các giá trị trong cookie. Nếu người dùng đã chọn tắt cookie thì thao tác ghi sẽ thất bại và các trang web tiếp theo dựa vào cookie sẽ phải thực hiện hành động mặc định hoặc nhắc người dùng nhập lại thông tin sẽ được lưu trữ trong cookie .
## Tại sao phải sử dụng Cookie?
* Cookies là một cách thuận tiện để mang thông tin từ phiên này sang trang khác hoặc giữa các phiên trên các trang web liên quan mà không phải tạo gánh nặng cho máy chủ với số lượng lưu trữ dữ liệu khổng lồ. Việc lưu trữ dữ liệu trên máy chủ mà không sử dụng cookie cũng sẽ gặp vấn đề vì khó lấy lại thông tin của một người dùng cụ thể mà không yêu cầu đăng nhập mỗi lần truy cập vào trang web.
* Nếu có một lượng lớn thông tin cần lưu trữ, thì cookie có thể được sử dụng đơn giản như một phương tiện để xác định một người dùng nhất định để có thể tra cứu thêm thông tin liên quan trên cơ sở dữ liệu phía máy chủ. Ví dụ: lần đầu tiên người dùng truy cập trang web, họ có thể chọn tên người dùng được lưu trong cookie và sau đó cung cấp dữ liệu như mật khẩu, tên, địa chỉ, kích thước phông chữ ưa thích, bố cục trang, v.v. - tất cả thông tin này sẽ được lưu trữ trên cơ sở dữ liệu sử dụng tên người dùng làm khóa. Sau đó, khi trang web được xem lại, máy chủ sẽ đọc cookie để tìm tên người dùng và sau đó lấy tất cả thông tin của người dùng từ cơ sở dữ liệu mà không cần phải nhập lại.
## Cookies có bảo mật không?
* Bạn thử mở trình duyệt -> click chuột phải -> chọn Inspect -> chọn Application -> chọn Cookies.
* Trình duyệt sẽ hiển thị cho bạn danh sách cookies đang sử dụng cho trang web tương tự như hình dưới đây.


![](https://images.viblo.asia/39cac40d-1b11-409f-aebe-84bccea8e657.jpg)

 
* Vì cookie được lưu trên trình duyệt nên người dùng có thể dễ dàng truy cập, chỉnh sửa dữ liệu cookie. Vì thế nó không phù hợp để lưu những dữ liệu nhạy cảm ví dụ như mật khẩu.
# Session
## Session là gì?
* Session là một khái niệm phổ biến được dùng trong lập trình các website có kết nối với cơ sở dữ liệu database. Đặc biệt các chức năng như đăng nhập, đăng xuất người dùng sẽ khó có thể thực hiện được nếu không sử dụng session.
* Session là phiên làm việc. Nó là cách đơn giản để lưu trữ 1 biến và khiến biến đó có thể tồn tại từ trang này sang trang khác. Và nó chỉ mất đi khi người dùng tắt trình duyệt.
## Session hoạt động như thế nào?
*  Khi bạn truy cập trang web, Server sẽ tạo ngẫu nhiên 1 ID định danh cho phiên hoạt động của bạn và đồng thời máy của bạn cũng tự sinh 1 cookie lưu giá trị của Session ID đó. Viêc này giúp Server quản lý được các request gửi lên để có thể trả respone về cho đúng client đã request.
## Session lưu ở đâu?
* Session được lưu trên Server.
* Trên Server, session có thể được lưu trong file, Database hay bộ nhớ đệm.
## Ứng dụng của Session
* Trong lập trình, các biến Session thường được sử dụng để lưu trữ thông tin tạm thời, được sử dụng để truy xuất, xem dữ liệu trên nhiều trang.
* Một ví dụ cho việc sử dụng session: Các trang web có chức năng đăng nhập sẽ sử dụng session để lưu thông tin user khi đăng nhập thành công. Khi vào các page khác trên website cần thông tin đăng nhập, Server sẽ sử dụng các session đó để thực hiện mà không cần bắt user đăng nhập lại.
## Session có bảo mật không?
* Session được lưu trên server, người dùng không thể tùy ý truy cập, chỉnh sửa những dữ liệu này. Vì thế nó an toàn và phù hợp để lưu những thông tin nhạy cảm hơn so với Cookie.
# Khác nhau giữa Session và Cookie
* Từ những khái niệm trên, ta có thể rút ra được sự khác nhau giữa session và cookie như sau:



| Cookie | Session |
| -------- | -------- | 
| Lưu trên trình duyệt người dùng    |  Lưu trên Server    |
| Có thể truy cập và chỉnh sửa bới Client    |  Client không thể truy cập và chỉnh sửa    |
| Có thời gian tồn tại xác định được quy định bởi nhà phát triển   |  Tồn tại cho đến khi Client tắt trình duyệt    |
| Phù hợp lưu những thông tin dài hạn, không nhạy cảm    |  Phù hợp lưu các thông tin nhạy cảm, tạm thời    |

# Kết luận
* Trên đây là những kiến thức mình tìm hiểu được và chia sẻ lại cùng mọi người.
* Mọi ý kiến đóng góp xin vui lòng để lại dưới phần Comment.
* Cảm ơn mọi người đã đọc bài viết của mình!
# Tài liệu tham khảo
* https://www.computerhope.com/jargon/s/session.htm
* http://www.whatarecookies.com/