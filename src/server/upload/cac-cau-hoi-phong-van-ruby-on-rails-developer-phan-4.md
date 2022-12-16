# So sánh form_for, form_tag, form_with
Các loại form này khi render ra html khác so với form tự tạo bằng html thông thường ở chỗ các loại form này tự động ngăn chặn được tấn công CSRF.<br>
Khi viết 1 form tự tạo bằng html thông thường thì lúc gửi lên server, khi bật chế độ bảo vệ khỏi tấn công CSRF thì sẽ hiện lên lỗi sau:<br>
Khi thêm trường ẩn sau thì form được bảo vệ khỏi tấn công CSRF.
```
<input name="authenticity_token" type="hidden" value="<%= form_authenticity_token %>">
``` 
Trong khi đó 3 loại form_tag, form_for, form_with tự động tạo ra dòng trên.
![](https://images.viblo.asia/102a62e4-3194-4c76-856f-b6da371e8ea6.PNG)

# Cơ chế của Sessions là gì. Nó hoạt động như thế nào?
## Sessions là gì?
Sessions được hiểu là <br>
một phiên làm việc bắt đầu từ lần đầu tiên người dùng truy cập hệ thống đến khi người dùng thoát khỏi hệ thống. <br>
nơi để lưu trữ data trong suốt quá trình của một request, mà có thể sử dụng trong các request sau này. <br>
## Cơ chế & Cách hoạt động của sessions
Khi đăng nhập vào ứng dụng, session được tạo ngẫu nhiên là session_id trên máy chủ, và đồng thời ở máy client cũng có 1 cookie sinh ra có nội dung (hay giá trị) đúng như session id (để có thể so khớp session nào là của client nào). giá trị cookie trong request gửi tới server từ client <br>
Một session gồm 2 phần: session ID và session data <br>
### Session ID
Session ID là một chuỗi ký tự ngẫu nhiên dùng để phân biệt 1 session với các session khác. <br>
Trong Rails, Session ID là 1 chuỗi 32 ký tự, là kết quả của việc mã hóa MD5 1 chuỗi ký tự ngẫu nhiên khác được tạo thành từ: thời gian hiện tại, 1 số ngẫu nhiên giữa 0 và 1, process id của trình dịch Ruby và 1 chuỗi cố định. <br>
Session ID được client lưu trữ trong cookie và gửi kèm theo mỗi request đến server. <br>
### Session data <br>
Là một hash chứa một số thông tin nhất định của người dùng. Trong ứng dụng web, đó có thể là định danh của người dùng, những đối tượng mà người dùng xem qua,... <br>
Khi bạn request 1 trang web, server có thể set 1 cookie và gửi response lại: browser của bạn sẽ lưu trữ cookies; cho đến khi cookies hết hạn (expired) thì mỗi khi bạn thực hiện request, browser sẽ gửi cookies trở lại server.  <br>
Rails làm việc với cookies để đảm bảo sự an toàn hơn, ngoài ra thì cookies hoạt động theo cách mà bạn mong đợi. Tuy nhiên, cookies không phải lúc nào cũng là nơi dùng cho data của session, vì các lý do sau đây:<br>
* Bạn chỉ có thể lưu trữ 4kb dữ liệu trong cookies (thường là đủ, tuy nhiên trong một số trường hợp thì không)
* Cookies luôn được gửi cùng với mọi request mà bạn thực hiện (Big cookies làm cho request và response lớn hơn do vậy các trang web sẽ chậm hơn)
* Nếu vô tình bạn phơi bày secret_key_base, user của bạn có thể thay đổi data bạn đã put bên trong cookies
* Việc lưu trữ dữ liệu bên trong cookies có thể không an toàn


# Cách lưu trữ session trong rails
Có 3 kiểu lưu trữ session data phổ biến của Rails đó là: <br>
* CookieStore
* ActiveRecordStore
* RedisStore <br>

## CookieStore
là kiểu lưu trữ session data mặc định của Rails bắt đầu từ Rails 2. <br>
CookieStore không chỉ lưu trữ Session ID mà lưu toàn bộ session data trong cookie ở phía client. <br>
=> Do đó server không lưu trữ bất kỳ thông tin nào liên quan đến session mà sẽ đọc từ cookie do client gửi kèm theo mỗi request. <br>
Kiểu lưu trữ này có ưu điểm là cải thiện tốc độ của ứng dụng web nhưng cũng có nhược điểm là không thể lưu trữ được lượng lớn thông tin do cookies có giới hạn là 4KB. <br>
Cách 2: Lưu trữ Session ID ở cookie phía client và lưu trữ session data trong database phía server. Rails app tìm kiếm data trong session store sử dụng ID này. <br>
## ActiveRecordStore
là hình thức quản lý session bằng ActiveRecord, mọi dữ liệu về session sẽ được lưu trong database như những model khác trong ứng dụng web. <br>
Lúc này nếu bạn kiểm tra lại trên trình duyệt sẽ thấy chỉ còn Session ID được lưu trữ ở cookie chứ không phải toàn bộ session data như trường hợp của CookieStore nữa.  <br>
Và cuối cùng là cách thức mã hóa dữ liệu: ActiveRecordStore serialize dữ liệu bằng module Marshal sau đó encode dạng base 64 và lưu vào trong database. <br>
## RedisStore
về ý tưởng cũng giống như ActiveRecordStore đó là lưu trữ Session ID ở cookie phía client và lưu trữ session data trong database phía server.  <br>
Tuy nhiên thay vì sử dụng những cơ sở dữ liệu kiểu truyền thống như MySQL, PostgreSQL… thì nó sử dụng Redis – một cơ sở dữ liệu dạng key-value có điểm mạnh là tốc độ đọc và ghi. <br>
RedisStore mã hóa dữ liệu không quá phức tạp, nó chỉ serialize dữ liệu bằng Marshal rồi lưu trực tiếp vào database. <br>
***Lưu ý:***
* Nếu sử dụng cơ chế lưu session_id trong cookie thì khi bạn tắt trình duyệt đi cũng không mất session; session nếu không được cài đặt để tự động xóa khi close browser thì nó sẽ tồn tại cho tới khi cookie hết hạn (lúc này session_id đi kèm cookie cũng die), hoặc trường hợp là lập trình viên để chế độ cho người dùng có thể chọn để xóa session đi. <br>
* Nếu mình sang browser khác và login vào 1 tk khác thì browser sẽ có 1 file cookie tương ứng để lưu 1 session ID khác. Nếu mình lấy đc session ID mới này và thay vào session ID hiện tại của browser hiện tại thì ở browser hiện tại mình sẽ login đc vào tk khác => share cookie đăng nhập thay cho việc chia sẻ username/password cho một số dịch vụ trực tuyến (fshare, netflix, ...) <br>
# Mô tả về các kiểu tấn công:
## Cross-site request forgery (CSRF)
Là kỹ thuật tấn công bằng cách sử dụng quyền chứng thực của người dùng đối với một website. Nó là kỹ thuật tấn công vào người dùng, dựa vào đó hacker có thể thực thi những thao tác phải yêu cầu sự chứng thực.
## Cross-site scripting (XSS)
Là một trong những kĩ thuật tấn công phổ biến nhất hiện nay, nó cũng là một trong những vấn đề bảo mật quan trọng đối với các nhà phát triển web và cả những người sử dụng web.<br>
XSS là một kỹ thuật tấn công bằng cách chèn vào các website động những thẻ HTML hay những đoạn script nguy hiểm có thể gây hại cho những người sử dụng khác.
## Session hijacking
Session Hijacking là quá trình chiếm lấy một session đang hoạt động, nhằm mục đích vượt qua quá trình chứng thực truy cập bất hợp lệ vào thông tin hoặc dịch vụ của một hệ thống máy tính.
## Session fixation 
Session fixation là quá trình thay đổi ID session của nạn nhân để tấn công, ép trình duyệt của nạn nhân sử dụng một ID session nào đó mà không cần thiết ăn cắp session ID của người dùng.
## Sự khác biệt giữa SQL injection và CSS injection?
SQL Injection là một kỹ thuật lợi dụng những lỗ hổng về câu truy vấn lấy dữ liệu của những website không an toàn trên web. Đây là một kỹ thuật tấn công rất phổ biến, sự thành công tương đối cao và gây ra thiệt hại khổng lồ: lộ toàn bộ database, lộ thông tin người dùng,...<br>
CSS Injection là một lỗ hổng liên quan đến khả năng thêm mã CSS vào đoạn văn bản của một trang web, ngoài ra việc này còn cho phép kẻ tấn công thực thi các đoạn mã javascript, điều này có thể dẫn đến XSS trong một số trường hợp. Kẻ tấn công có thể lợi dụng lỗ hổng này để đánh lừa người dùng vào đường link của trang web chứa lỗ hổng kèm theo một đoạn mã để thực thi javascript trên trình duyệt hoặc đọc các thông tin quan trọng.<br>

# Tại sao bạn nên tránh Fat controllers?
Đối với các ứng dụng lớn, sau một thời gian phát triển thì controller sẽ phình to ra với nhiều action, mỗi action rất nhiều logic trong đó sẽ dẫn tới sự phức tạp và rắc rối trong lúc bảo trì dự án.<br>
Vì vậy, ta nên có các giải pháp để tránh fat controllers như là dùng service để tách các xử lý logic ra khỏi controller.
## Tại sao bạn nên tránh Fat models?
Đối với các ứng dụng lớn, sau một thời gian phát triển thì model sẽ phình to ra với, khoảng 500 -1000 dòng codes với hàng trăm methods<br>
=> Dẫn tới sự phức tạp và rắc rối trong lúc bảo trì dự án.<br>
Vì vậy, ta nên có các giải pháp để tránh fat model đó là tách riêng các object sử dụng lại nhiều lần thành một model<br>
7 cách để khắc phục Fat Models: View Objects, Policy Objects, Decorators, Service Objects, Form Object, Query Object, Value Object
## Hãy giải thích về các kỹ thuật Service và Policy Objects	
Một vài action có thể cần phải có những Service Object riêng để đóng gói những thực thi của nó. Và ta thường tách ra service object khi một action đáp ứng ít nhất một trong những tiêu chí sau:<br>
1. action đó rất phức tạp
1. action đó đụng tới quá nhiều model: Chẳng hạn như, chức năng Thanh toán sẽ dùng tới các model Order, Credit Card và Customer
1. action đó tương tác với một service ngoài, chẳng hạn như share lên các mạng xã hội...
1. action đó không phải là một core concern của model bên dưới, có nhiều cách để thực hiện action đó