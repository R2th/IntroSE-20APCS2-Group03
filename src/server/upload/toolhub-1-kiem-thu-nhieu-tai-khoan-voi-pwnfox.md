![image.png](https://images.viblo.asia/38b28ddb-e87c-4ef2-94f6-463a08a0dff3.png)

Anh em làm pentest ứng dụng Web chắc hẳn đã có những lần gặp dự án có nhiều loại tài khoản: tài khoản admin, tài khoản người dùng,... Việc ứng dụng web có nhiều loại tài khoản không phải vấn đề gì lớn, chúng ta chỉ cần kiểm tra trên nhiều tài khoản là được. Với 2 - 3 loại tài khoản thì việc này đơn giản, nhưng nếu ứng dụng web có tới 6 - 7 loại tài khoản thì sao?

Trường hợp gặp tới 6 - 7 loại tài khoản là khá hiếm. Chỉ tính việc phân quyền cụ thể cho những tài khoản này đã đủ củ hành anh em đội Dev rồi. Mỗi chức năng lại phải tính xem những loại tài khoản nào được truy cập, rồi thì trong các tài khoản được quyền truy cập có tài khoản nào bị giới hạn 1 phần chức năng hay không, cách máy chủ phản hồi yêu cầu từ các loại tài khoản khác nhau cũng có thể phải khác nhau nữa,... Nghĩ tới thôi đã thấy đầu váng mắt hoa, đau lưng mỏi gối, nhìn từng dòng code mà ngỡ như tuổi già tới nơi.

![image.png](https://images.viblo.asia/31d175e4-d776-42cd-b367-7156617d05f4.png)

Anh em làm pentest khi gặp trường hợp như vậy cũng không khá hơn. Trước đây khi pentest các ứng dụng web có khoảng 2 - 3 loại tài khoản thì mình thường dùng.... 2 - 3 trình duyệt để đỡ phải đăng xuất - đăng nhập liên tục, cũng tiện theo dõi khi kiểm tra các lỗ hổng về phân quyền. Với cách thô sơ như vậy, khi gần đây phải pentest 1 dự án có tới 6 loại tài khoản, nhìn ma trận phân quyền chức năng/loại tài khoản thì mình cũng choáng luôn.

![image.png](https://images.viblo.asia/7300e571-6a06-4726-a774-ea2ef9c41b68.png)

Thật may là mình đã được một người anh ẩn danh giới thiệu cho PwnFox. Với sự hỗ trợ của PwnFox thì dự án cũng được pentest xong, và mình thì còn đủ tỉnh táo để ngồi đây viết bài giới thiệu này.

Vậy PwnFox là gì?

# Giới thiệu PwnFox
PwnFox ở đây không phải là một con cáo mà sẽ giúp chúng ta kiểm tra các lỗ hổng về phân quyền, nó không làm được điều đó đâu. PwnFox là một extension trên trình duyệt FireFox, chức năng chính của PwnFox là quản lý các tài khoản độc lập, gọi là các **Container Profile**.

Link cài đặt PwnFox trên FireFox: https://addons.mozilla.org/en-US/firefox/addon/pwnfox/.

Được phát triển với mục đích hỗ trợ pentest nên PwnFox cũng có cả extension cho Burp Suite. Extension này thì sẽ không có sẵn trên BApp store, chúng ta phải tải file jar về và import vào Burp Suite. 

Link tải PwnFox cho Burp: https://github.com/yeswehack/PwnFox/releases.

Cài đặt cả 2 extension trên FireFox và Burp Suite sẽ đem lại trải nghiệm tốt nhất.

# Giới thiệu chức năng
## Quản lý tài khoản độc lập
Để bật PwnFox thì chúng ta sẽ tích vào ô Enabled, khi đó ở biểu tượng con cáo sẽ hiện chấm tròn màu xanh cho biết extension đang hoạt động.

![image.png](https://images.viblo.asia/6854dae2-8b7e-4cdd-ac40-901e3fceef47.png)

![image.png](https://images.viblo.asia/ad5fa1cf-d5d5-41b9-b8e6-111e566aa0fd.png)

Khi click vào các ô màu khác nhau đại diện cho container tab thì FireFox sẽ mở ra các tab mới, phía trên mỗi tab cũng được đánh dấu với một đường kẻ có màu trùng với màu tượng trưng cho Container Tab mà chúng ta đã chọn. Trên thanh công cụ cũng được chú thích tương tự.

![image.png](https://images.viblo.asia/263bf18b-ddcd-4e6e-a0da-a7e2e1520c98.png)

![image.png](https://images.viblo.asia/337a7ef3-9415-4fd3-9163-d6b6fdd0ddcc.png)

![image.png](https://images.viblo.asia/bacd6f6e-d93e-4d69-a152-548610654d6b.png)

![image.png](https://images.viblo.asia/29080547-2f66-4b8d-908a-746a3730d150.png)

Trên các Container Tab này chúng ta có thể đăng nhập các tài khoản khác nhau cho cùng một trang web. Nhờ đó có thể kiểm tra trên các tài khoản này một cách dễ dàng, khi cần chuyển tài khoản thì chỉ cần chuyển tab tương ứng là được, không phải mất công đăng xuất - đăng nhập liên tục.

## Hỗ trợ cùng Burp Suite
Mặc định PwnFox đã được cấu hình để hoạt động được với Burp Proxy tại cổng 8080. Nếu sử dụng cổng khác thì chúng ta có thể cài đặt được luôn.

![image.png](https://images.viblo.asia/69b463c9-d845-4ead-8cd5-80500d535742.png)

![image.png](https://images.viblo.asia/56aca1f2-ac65-49fd-b658-cdad963fd849.png)

Khi cài đặt cả extension trên Burp Suite thì trong HTTP history của chức năng Proxy cũng được đánh dấu bằng các màu tương ứng với Container Profile:

![image.png](https://images.viblo.asia/6ca7e105-33bb-4312-acf4-8ea601fefb05.png)

Trên trình duyệt cũng có những extension khác cho phép duyệt web với các tài khoản độc lập, tuy nhiên do không hỗ trợ được cùng Burp Suite nên khó theo dõi hơn. PwnFox đã khắc phục được vấn đề này. Chỉ với một chút màu mè thôi nhưng chúng ta đã có thể dễ dàng theo dõi xem request được thực hiện bởi tài khoản nào.

## Xóa các header về bảo mật
Các anh em đội Dev có thể thêm một số header để tăng tính bảo mật cho ứng dụng web của mình, VD như một số header:
- Content-Security-Policy
- X-XSS-Protection
- X-Frame-Options
- X-Content-Type-Options

Đôi khi việc pentest sẽ thuận lợi hơn khi không có các header bảo mật, do đó PwnFox cũng có thể giúp chúng ta xóa 4 header trên luôn. Tính năng này hoạt động cũng rất đơn giản, chỉ cần tích vào ô Remove security headers là được.

![image.png](https://images.viblo.asia/edeba6cb-8b33-4626-8415-d03526d52b32.png)

## Một số tính năng khác
Bên cạnh các tính năng trên, PwnFox còn hỗ trợ các tính năng khác như:
- Ghi lại các Post Message tại tab PwnFox trên devtool của trình duyệt.
- Toolbox: cho phép khai báo các đoạn mã JavaScript và chạy các đoạn mã này khi tải trang.

Hai tính năng trên thì mình chưa sử dụng nên chưa review được, nhưng xem qua thì thấy cũng xịn xò lắm. Mọi người muốn tìm hiểu thì có thể xem thêm tại trang Github của PwnFox: https://github.com/yeswehack/PwnFox.

# Đánh giá
Mình đánh giá PwnFox là một công cụ hay, hỗ trợ tốt trong việc quản lý và pentest các ứng dụng web có nhiều loại tài khoản. Đây là một công cụ mà anh em làm pentest nên cài để có thể tăng hiệu suất công việc của chúng ta.

Mọi người có sử dụng công cụ nào làm được việc tương tự, hoặc làm tốt hơn PwnFox hay không? Hãy comment ở dưới để chúng ta cùng thảo luận nhé.