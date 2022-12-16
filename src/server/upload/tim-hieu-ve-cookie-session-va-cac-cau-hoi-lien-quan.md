# Cookie
## cookie là gì?
> Cookie là một đoạn văn bản ghi thông tin được tạo ra và lưu trên trình duyệt của máy người dùng. Cookie thường được tạo ra khi người dùng truy cập một website, cookie sẽ ghi nhớ những thông tin như tên đăng nhập, mật khẩu, các tuỳ chọn do người dùng lựa chọn đi kèm. Các thông tin này được lưu trong máy tính để nhận biết người dùng khi truy cập vào một trang web. Cookie là những tập tin mà trang web gửi đến máy tính của người dùng. Nó được gọi theo tên của bánh quy trong tiếng Anh tại Hoa Kỳ.

Theo mình hiểu thì cookie sẽ đươc máy chủ gửi đến máy của người dùng, nó chứa các thông tin của người dùng. Trình duyệt web sẽ lưu trữ và gửi lại máy chủ mỗi khi người dùng truy cập vào máy chủ.

## File cookie được lưu ở đâu?
Cookie sẽ được lưu trữ tùy vào trình duyệt và hệ điều hành mà bạn sử dụng. Bạn có thể tìm trên mạng về câu hỏi này để có câu trả lời phù hợp với bạn.
> Với Ubuntu và trình duyệt chrome bạn có thể thấy cookie của bạn được lưu trữ ở địa chỉ:
> ~/.config/google-chrome/Default/Cookies

## Một file cookie có gì?
Với chrome thì sử dụng Sqlite để lưu trữ cookie và khi mở ra ta sẽ có cấu trúc bảng như sau:

![](https://images.viblo.asia/f25f50df-7491-4721-aa23-2567fc5d2999.png)

![](https://images.viblo.asia/7120d6ce-4641-4be6-8322-3363811272af.png)

Ta có thể thấy các thông tin như tên máy chủ gửi cookie, tên của cookie, path (cookie sẽ được cung cấp cho bất kì trang nào phù hợp với đường dẫn), thời gian cookie hết hạn, thời gian cookie được tạo, ...

## Cookie hoạt động như thế nào?
![](https://images.viblo.asia/ab5ac10d-e890-4489-b08e-7bde4d8d8c47.jpg)

*Một hình ảnh ví dụ về hoạt động của cookie*

* Khác với dữ liệu gửi từ form (POST hay GET) thì cookies sẽ được trình duyệt tự động gửi đi theo mỗi lần truy cập lên máy chủ.
* Trong quá trình làm việc, cookie có thể bị thay đổi giá trị. Cookie sẽ bị vô hiệu hoá nếu cửa sổ trình duyệt điều khiển cookie đóng lại và cookie hết thời gian có hiệu lực. Theo mặc định, thời gian “sống” của cookies là tồn tại cho đến khi cửa sổ trình duyệt sử dụng cookies bị đóng. Tuy nhiên người ta có thể thiết lập tham số thời gian để cookie có thể sống lâu hơn (6 tháng chẳng hạn). Ví dụ như chế độ Remember ID & Password của 1 số trang web.

## Giới hạn kích thước của Cookie là bao nhiêu?
Có 3 loại giới hạn là:
1. Số lượng cookie tối đa cho một website
2. Dung lượng tối đa cho một cookie
3. Dung lượng tối đa cho một website

Ví dụ với số lượng cookie tối đa cho một website = 2, dung lượng tối đa cho một website = 4KB, dung lượng tối đa cho một cookie = 4 KB bạn sẽ có thể có:
1 cookie với dung lượng 4KB, hoặc 2 cookie với dung lượng 1KB và 3KB,....

Tùy vào các trình duyệt mà các giới hạn này khác nhau, bạn có thể test cho trình duyệt của mình [tại đây](http://browsercookielimits.squawky.net/).
## Ưu, nhược điểm của cookie
### Ưu điểm
* Giúp việc truy cập Website của người dùng nhanh hơn, tiện lợi hơn, không quá mất nhiều thời gian đăng nhập lại nhiều lần.
* Đối với các doanh nghiệp, việc sử dụng Cookie sẽ giúp họ theo dõi được hành vi người dùng, từ đó biết được họ thường truy cập ít hay nhiều, thời gian là bao lâu hay các sở thích khác để có thể tối ưu hóa Website, dịch vụ của mình.
* Ngoài ra, việc lưu trữ Cookie đối với các doanh nghiệp sẽ giúp khách hàng của họ thuận tiện hơn trong việc truy cập hay đơn giản là việc nhập liệu ở Website đó trở nên tiện lợi khi các thông tin đã được lưu trữ.

### Nhược điểm
* Vì Cookie là một file dùng để lưu trữ các thông tin, hoạt động sử dụng của người dùng mang tính cá nhân vì vậy sẽ dễ dàng bị các Hacker dòm ngó, tìm cách đột nhập hệ thống Website, máy tính cá nhân để lấy cắp thông tin và sử dụng cho các mục đích xấu mà bạn không thể lường trước được.
# Session
## Session là gì?
* Session là phiên làm việc. Nó là cách đơn giản để lưu trữ 1 biến và khiến biến đó có thể tồn tại từ trang này sang trang khác.
* Nếu như với các biến thông thường, khi trang web bất kỳ bắt đầu thực thi, biến đó sẽ được cấp phát bộ nhớ, lưu giá trị và thu hồi vùng nhớ sau khi trang kết thúc. Session sẽ khác, nó có thể được tạo ra, tồn tại trên server , có thể xuyên từ trang này sang trang khác, chỉ mất đi khi ta xóa nó hoặc hết tuổi thọ (quá thời gian load dữ liệu hoặc thoát khỏi địa chỉ trang-đóng ứng dụng). 
## Session hoạt động như thế nào?
Khi session chứa thông tin người dùng được tạo ra trên máy chủ thì đồng thời cũng có một cookie có giá trị chứa session id tương ứng được gửi đến máy người dùng. Chính cookie này sẽ giúp máy chủ phân biệt giữa các người dùng khác nhau và biết việc session nào của người dùng nào.
## Session được lưu ở đâu?
* Session khi sinh ra được lưu trên 1 file có tên dài dòng, khó đoán và được tạo ngẫu nhiên là session id trên máy chủ.
* Đối với mỗi ngôn ngữ lập trình web sẽ có tên cookie quy định như php là PHPSESSID, jsp là JSESSIONID, … Các giá trị của biến session sẽ được lưu trong file đó (khác so với các biến thông thường là được lưu trong bộ nhớ server – trong php file nội dung được lưu trong thư mục thiết lập trong file php.ini (tham số session.save_path)).
* Với rails thì session lại được lưu trữ từ phía người dùng và sử dụng cookie, bạn có thể tham khảo bài viết này để tìm hiểu thêm: [[RAILS] TÌM HIỂU VỀ SESSION VÀ CÁCH THỨC LƯU TRỮ SESSION DATA](https://viblo.asia/p/rails-tim-hieu-ve-session-va-cach-thuc-luu-tru-session-data-BAQ3vV3PRbOr)
# So sánh cookie và session


|  | Cookie| Session |
| -------- | -------- | -------- |
| Nơi lưu trữ     | Cookie được lưu trữ trên trình duyệt của người dùng.     | Dữ liệu session được lưu trữ ở phía máy chủ. |
|Thời gian tồn tại |Cookie tồn tại cho đến khi hết hạn|Sau khi đóng trình duyệt sẽ mất thông tin session|
|Lượng data truyền tải|Tất cả các cookie hiện có của website|Chỉ file cookie chứa session id|
|Bảo mật|Dữ liệu cookie dễ dàng sửa đổi khi chúng được lưu trữ ở phía máy người dùng|Dữ liệu session không dễ dàng sửa đổi vì chúng được lưu trữ ở phía máy chủ|

# Kết luận
Đây là bài viết mà mình tìm hiểu về cookie và session, các câu hỏi cũng do mình tự đặt và tìm hiểu, có thể còn nhiều thiếu sót, mong các bạn góp ý thêm. Xin cảm ơn.