![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)

# Mở đầu
Trong phần 1 của bài viết [Tìm hiểu về cơ chế bảo mật trong hệ thống Linux](https://viblo.asia/p/tim-hieu-cac-co-che-bao-mat-trong-he-thong-linux-phan-1-E375zxg1ZGW) mình đã giới thiệu một số biện pháp bảo mật thường hay được sử dụng nhất như mật khẩu, tài khoản `root`, `firewall` ... Trong phần 2 của bài viết, mình sẽ tiếp tục giới thiệu về một số cơ chế bảo mật khác nâng cao và chỉ sử dụng trong một số trường hợp đặc biệt.

# Xác thực dữ liệu
Đối với người dùng phổ thông, nhiều khi họ muốn sử dụng một file dữ liệu nào đó (hình ảnh, nhạc, tài liệu văn bản ...) thì họ đơn giản chỉ cần mở được file, xem được nội dung file là đủ. Hơn nữa, với các file có dung lượng không đáng kể thì cũng rất ít người để ý đến sự thay đổi kích cỡ của nó. Và đây chính là khe hở mà các người dùng xấu có thể lợi dụng để chèn thêm các đoạn mã tự thực thi vào file tài liệu, gây nguy hại cho hệ thống. Mặc dù không thể đảm bảo các file tài liệu sẽ tuyệt đối an toàn, nhưng với cơ chế xác thực dữ liệu thì ít nhất chúng ta có thể kiểm tra tính toàn vẹn của file.
Cách đơn giản nhất để xác thực dữ liệu là dùng phép băm một chiều. Với cách này, ta có thể tính toán mã checksum (mã băm) của file rồi sau đó so sánh với mã gốc (có trên trang chủ phần mềm, hoặc do chủ sở hữu file cung cấp.
Các chương trình hỗ trợ việc băm dữ liệu trên Linux thì bao gồm:
* **MD5**: `md5sum [filepath]`
* **SHA256**: `sha256sum [filepath]`
* **SHA512**: `sha512sum [filepath]`

# Truy cập từ xa qua SSH
Ngày nay, các hệ thống máy tính sử dụng các dòng hệ điều hành Linux phổ biến đều hỗ trợ kết nối từ xa an toàn qua tiêu chuẩn **SSH** (Secure Shell). Công cụ được sử dụng phổ biến nhất là **OpenSSH** một phiên bản mã nguồn mở của của **SSH**. Khi kết nối qua **SSH**, mặc định toàn bộ dữ liệu sẽ được mã hóa và hầu hết đều hỗ trợ các tính năng sau:
* Truy cập hệ thống giao diện dòng lệnh từ xa
* Thực thi các câu lệnh từ xa
* Chuyển tập tin giữa các máy kết nối
* Một số cho phép kết nối vào máy khác qua giao diện đồ họa

**SSH** không chỉ mã hóa kết nối giữa các hệ thống mà còn sử dụng hệ thống khóa để cung cấp xác thực lẫn nhau giữa mỗi bên kết nối. Tại máy khách sử dụng **SSH** sẽ có thể tự động kiểm tra danh tính của bất kỳ hệ thống từ xa nào mà nó kết nối vào, bằng cách xác minh khóa. Tương tự, người dùng có thể tự nhận mình vào các hệ thống có khóa, thay vì sử dụng mật khẩu và có khả năng bị trộm thông qua keylogger hoặc các phương pháp bẻ khóa khác.

Hầu hết các dòng hệ điều hành **Linux** phổ biến đều bao gồm ứng dụng khách **OpenSSH** theo mặc định. Hệ thống máy chủ **OpenSSH** thường được cung cấp dưới dạng tùy chọn, mặc dù một số hệ điều hành **Linux** cũng cung cấp theo mặc định.

> Hiện nay, dự án OpenBSD đang duy trì phần mềm và trang web **OpenSSH**: http://www.openssh.com/

# Theo dõi hệ thống qua nhật ký hoạt động
**Linux** là một hệ thống có khá nhiều thành phần cấu thành, và hầu hết đều hoạt động độc lập với nhau. Kể từ các chương trình (`program`), kịch bản lệnh (`script`) cho tới các dịch vụ (`service`), các nhiệm vụ chạy theo lịch (`cron job`). Bên cạnh đó, **Linux** cũng là một hệ thống đa người dùng, tức là sẽ cho phép cùng lúc nhiều người cùng sử dụng. Hãy tưởng tượng bạn là một quản trị viên hệ thống **Linux** với vài trăm người sử dụng, mỗi người lại dùng vài chục chương trình khác nhau, bên cạnh đó thỉnh thoảng lại có vài chương trình `cron job` thực thi, dịch vụ chạy ngầm thì hoạt động liên tục. Và đến khi tự nhiên có sự cố xảy ra, để tìm ra chương trình gây lỗi cũng mất rất nhiều thời gian. Và tìm ra rồi thì lại mất thêm kha khá thời gian điều tra nguyên nhân, và rồi cách khắc phục .... 

May thay, hầu hết các chương trình, dịch vụ ... chạy trên hệ thống **Linux** đều có cơ chế lưu lại nhật kí hoạt động. Qua đó chúng ta có thể dễ dàng theo dõi hoạt động của các chương trình trong hệ thống, thậm chí có thể viết ra những đoạn mã tự động cảnh báo nếu nhật kí ghi lại một hoạt động bất thường.

Thông thường **Linux** (và cả các hệ thống **UNIX-like**) lưu trữ nhật ký hoạt động (`log`) trong các file ở thư mục `/var/log/`

![](https://images.viblo.asia/c57d6046-cff8-4b6c-b4e3-eabb5953692d.png)

Và khi có được các file này, chúng ta có thể dùng các câu lệnh như `cat`, `grep`, `head`, `tail`, `less` ... để tìm ra những đoạn dữ liệu khả nghi, nhật ký lỗi chương trình ... để từ đó có thể tìm ra phương án khắc phục kịp thời.

# Giới hạn sử dụng các chương trình
Đôi khi chúng ta cần thử nghiệm một công cụ nào đó, nhưng không chắc chắn nó có gây hại cho hệ thống hay không. **Linux** cung cấp cho chúng ta một vài phương pháp để thử nghiệm chúng:

### Dùng công nghệ ảo hóa
Ảo hóa cho phép bạn chỉ định một số tài nguyên phần cứng giới hạn (lấy từ máy chủ - `host`, như CPU, RAM, HDD...) cho một máy ảo, có thể được theo dõi và sao lưu bởi các quy trình riêng biệt trên hệ thống máy chủ.

Hiện nay công nghệ ảo hóa đã cho phép chạy một hệ điều hành hoàn chỉnh, phổ biến nhất là **Xen** và **KVM**. **Xen** cho phép bạn định cấu hình một hệ thống để hoạt động như một máy chủ lưu trữ cho nhiều môi trường ảo, tất cả đều được điều khiển bởi một trình quản lý ảo hóa duy nhất. Tuy nhiên, các hệ điều hành **Linux** được cài đặt trên các máy có **CPU** có hỗ trợ ảo hóa có thể chạy **KVM** đơn giản và linh hoạt hơn. **KVM** hiện tại cung cấp hiệu suất cao hơn đáng kể so với trình giả lập máy **QEMU** (sử dụng lõi là **KVM**) vốn rất phổ biến trước đó. Phần mềm **QEMU** ban đầu hoạt động quá chậm cho các ứng dụng thành phẩm, mặc dù nó vẫn nắm vai trò nhất định cho công việc kiểm tra và phát triển.

### Dùng tiện ích *Docker*

![](https://images.viblo.asia/17750fbb-757c-4c08-9258-dc9533a25744.png)

**Docker** là khái niệm chỉ các cơ sở chứa **Linux** (`container`). Nó thực thi các quy trình trong một hệ thống file được tạo và tách biệt khỏi các quy trình thông thường của hệ thống máy chủ, hay đúng hơn là thực thi như một ứng dụng thông thường trên máy chủ (khác với ảo hóa cho phép chạy một hệ điều hành hoàn chỉnh).

Các hệ thống **Linux** ngày nay bao gồm hỗ trợ cho các `container` và cung cấp các công cụ cho phép bạn dễ dàng sử dụng loại thiết bị này. **Docker** quản lý các `container` trên hệ thống máy chủ một cách độc lập lẫn nhau. Điều này giúp cho nó có thể hỗ trợ một số lượng lớn các `container` trên một máy chủ tùy loại công việc. Các `container` vẫn có thể truy cập vào hệ thống máy chủ, tuy nhiên nó bị hạn chế sử dụng với một số file/thư mục cụ thể.


### Dùng tiện ích *chroot*
Tiện ích `chroot` cho phép chạy các chương trình trong một thư mục làm việc cụ thể và ngăn chúng truy cập bất kỳ thư mục nào khác trên hệ thống đó. Mọi thao tác trên thư mục `root` ảo này sẽ không gây hại tới hệ thống máy chủ. Ban đầu, `chroot` được tạo ra với mục đích tạo môi trường dùng cho việc `compile & build` các phần mềm. Tuy nhiên khi nhận thấy ưu điểm của nó trong lĩnh vực bảo mật, nó thường được sử dụng để kiểm tra tính tương thích và phát hiện các lỗ hổng bảo mật trong các phần mềm thử nghiệm.

# Kết luận
Trong phần 2 này, mình đã tìm hiểu và giới thiệu thêm được một số biện pháp bảo mật đặc thù cho một vài trường hợp đặc biệt. Mình sẽ thử tìm hiểu tiếp các biện pháp bảo mật khác cho hệ thống và sẽ viết tiếp phần 3 trong một tương lai không xa. Cảm ơn các bạn đã đọc bài viết ^^.

# Tài liệu tham khảo
* https://www.stuartellis.name/articles/unix-security-features/
* https://www.linuxtopia.org/LinuxSecurity/index.html