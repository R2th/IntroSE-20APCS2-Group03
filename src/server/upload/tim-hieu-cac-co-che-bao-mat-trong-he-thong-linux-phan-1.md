![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)

# Mở đầu
Vấn đề **Security** (hay **bảo mật**) luôn là một trong các yếu tố phải có độ ưu tiên cao khi phát triển bất cứ một hệ thống máy tính nào. Từng có một câu nói vui cho rằng `Một hệ thống máy tính chỉ thực sự an toàn nếu nó được ngắt kết nối với mạng internet, tắt nguồn và chôn sâu 2 mét dưới mặt đất`. Nhận định này tất nhiên là hoàn toàn đúng, tuy nhiên chắc chắn không một ai muốn mua một hệ thống máy tính về sử dụng mà lại muốn làm như vậy cả ^^. Thực tế chúng ta luôn không ngừng nghiên cứu và cải thiện các giải pháp hàng ngày, hàng giờ để khiến cho chiếc máy tính của chúng ta vẫn có thể sử dụng, và hạn chế tối đa khả năng truy cập từ bên ngoài.
Ngày nay, hầu hết các thiết bị máy tính đều được kết nối với mạng internet hoặc kết nối với nhau qua mạng cục bộ. Mục đích chính của việc này là để chia sẻ thông tin với nhau, nhằm làm tăng sự hiểu biết cho mọi người sử dụng máy tính trên thế giới. Mọi việc sẽ trở nên đơn giản hơn nếu mỗi người chúng ta khi chia sẻ thông tin đều là vì mục đích tốt đẹp. Vậy nhưng thực tế thì không như vậy, thế giới này có 7 tỉ người, mỗi người lại có những suy nghĩ khác nhau, họ có thể chia sẻ bất cứ thứ gì họ muốn, hoặc thậm chí có thể đánh cắp các thông tin không được phép truy cập.
Nếu kẻ phá hoại (bao gồm truy cập trái phép thông tin và sử dụng thông tin cho mục đích xấu) không chỉ đơn giản là tấn công 1 vài người nhỏ lẻ, thay vào đó những kẻ này lại hướng mục tiêu tấn công vào các tổ chức, các công ty với lượng thông tin rất lớn, liên quan đến nhiều tổ chức khác thì điều này sẽ gây rất nhiều ảnh hưởng, thiệt hại nghiêm trọng.
Chính vì vậy, vấn đề bảo mật luôn không ngừng được nghiên cứu và cải tiến liên tục, và hệ thống bảo mật trên dòng hệ điều hành **Linux** cũng không ngoại lệ. Nó có sẵn một số biện pháp tăng cường tính bảo mật tuyệt vời và hữu ích.

# Tài khoản "root"
Điều đầu tiên mình muốn nhắc đến là một tài khoản người dùng tối cao của hệ thống - `root`. Trong các hệ thống **Linux** và **UNIX**, `root` là người dùng được phép làm mọi thao tác với hệ thống, có thể nói là toàn quyền. Trong trường hợp hệ thống của bạn hỏng hóc đâu đó thì `root` luôn là tài khoản có thể sửa các lỗi này, nhưng khi hệ thống của bạn đang ổn định thì cũng chỉ có `root` mới có thể làm nó hỏng. Dùng đúng cách thì hệ thống của bạn an toàn, dùng không đúng cách thì bạn sẽ âm thầm tạo một `backdoor` (cửa sau) cho người khác xâm nhập.
Mình có một số lưu ý khi chúng ta sử dụng tài khoản đặc biệt này:
* Luôn đặt mật khẩu dễ nhớ với bạn và khó đoán với người khác cho `root`, định kỳ thay đổi mật khẩu (3-6 tháng 1 lần)
* Không thực thi các thao tác không chắc chắn an toàn (VD: câu lệnh `rm -rf`, `chmod 777`, ....)
* Sử dụng công cụ `sudo` thay vì đăng nhập tài khoản `root` (do `sudo` có cơ chế buộc nhập lại mật khẩu sau một thời gian không sử dụng, mặc định là 15 phút)
* Không cho phép bất cứ ai được sử dụng tài khoản này ngoài bạn (`not shared`)
* Giữ an toàn cho tài khoản của bạn (kết hợp với việc sử dụng `sudo`, tài khoản của bạn an toàn thì `root` cũng thêm 1 lớp bảo mật an toàn)
* Không dùng quyền `root` hoặc `sudo` nếu không cần thiết. Tốt nhất sử dụng quyền hạn của người dùng bình thường với các câu lệnh bất cứ khi nào không chắc chắn, nếu có thông báo cần phải dùng quyền `root` để thực thi câu lệnh thì nên cân nhắc trường hợp sử dụng phương án thay thế.

# Mật khẩu người dùng
Một khái niệm không còn xa lạ với mọi người từng sử dụng máy tính, những cũng là cách dễ dàng nhất để người khác có thể truy cập trái phép tới hệ thống máy tính của bạn. Mặc dù **Windows** vẫn đang là hệ điều hành được sử dụng phổ biến nhất trên thế giới, tuy nhiên cơ chế bảo mật của hệ điều hành này không khác gì "rác rưởi" (ý kiến cá nhân). Khi mà các hệ điều hành **Linux** và **UNIX** luôn yêu cầu bắt buộc phải có mật khẩu cho các tài khoản thì **Windows** vẫn cho phép người dùng máy tính sử dụng tài khoản mà không cần phải có mật khẩu. Mặc dù hiện nay mật khẩu không phải là thứ khó truy cập nữa, tuy nhiên thêm một lớp bảo mật cho hệ thống không bao giờ là thừa, ít nhất chúng ta cũng có thể yên tâm là khi rời khỏi hệ thống máy tính thì kẻ tấn công cũng phải mất thêm 1 khoảng thời gian nhất định để vượt qua được tầng bảo vệ này.

# Các chương trình quản lý gói phần mềm
Một số lượng lớn các công cụ quản lý phần mềm hiện nay đều phân chia các phần mềm thành nhiều `package` (gói) nhỏ. Mỗi `package` là một thư viện độc lập, có thể dùng để làm một chức năng gì đó trong một hoặc nhiều phần mềm khác nhau. Mục đích chính của việc quản lý gói phần mềm thì chỉ đơn giản là dễ dàng cài đặt, cập nhật cũng như gỡ bỏ các phần mềm trên hệ thống chứ cũng không liên quan gì đến việc bảo mật. Tuy nhiên, bản thân phần mềm không thể tự cài đặt, cũng như tự gỡ bỏ được. Luôn phải có tác động của người sử dụng, hoặc các đoạn mã (`script`) chạy tự động thì phần mềm mới xuất hiện hoặc biến mất trên hệ thống, và việc này luôn đòi hỏi quyền `root`.
Như mình đã nói trong phần trước, mọi thao tác có sử dụng `root` đều có khả năng tạo một `backdoor` cho phép người khác truy cập trái phép hệ thống của bạn. Thật may mắn khi hiện nay các hệ điều hành Linux phổ biến đã có riêng một đội ngũ chuyên xử lý các vấn đề bảo mật của các gói phần mềm (VD: `Ubuntu` của công ty **Carnonical**, `Fedora` của công ty **Red Hat** ...). Các hệ thống quản lý phần mềm luôn cập nhật liên tục các bản vá bảo mật, kiểm định qua nhiều bước để đảm bảo phần mềm đến tay người sử dụng luôn an toàn nhất có thể.
Tuy nhiên mình cũng có một vài lưu ý cho các bạn khi sử dụng hệ thống quản lý gói phần mềm như sau:
* Không nên cài đặt các phần mềm không cần thiết phải sử dụng hoặc gỡ bỏ chúng đi, nếu không chắc chắn hãy hỏi bạn bè người thân có kỹ năng về vấn đề này trước khi cài đặt.
* Không nên cài đặt các phần mềm theo một hướng dẫn trên mạng internet mà không chắc chắn về tác dụng của nó.
* Không tùy tiện thêm các kho phần mềm không được kiểm định bởi các trang web có ít tên tuổi.
* Sử dụng tính năng cập nhật của chương trình quản lý gói phần mềm chỉ với những bản vá bảo mật, các phần mềm có cập nhật về tính năng thì không nên cập nhật luôn mà nên đợi một thời gian khi các chuyên gia bảo mật nghiên cứu kỹ và không thấy vấn đề gì thì mới nên cài đặt.
* Nếu có thể, nên cài đặt phần mềm bằng tay, không sử dụng các đoạn `script` không rõ ràng.

Một số chương trình quản lý gói phần mềm phổ biến hiện nay:
* `apt` hoặc `dpkg` của **Debian**, **Ubuntu** ...
* `yum` hoặc `rpm` của **Red Hat**, **Fedora**, **CentOS** ...
* `pacman` hoặc `yaourt` của **Arch Linux**, **Manjaro** ...
# Hệ thống Firewall
`Firewall` hay tường lửa là một hệ thống hai chiều, là đầu ra cũng như đầu vào của hệ thống. Nó là ngõ chặn cuối cùng để đưa thông tin của bạn ra ngoài internet, đồng thời nó cũng là chốt chặn đầu tiên của mọi nỗ lực cố gắng xâm nhập hệ thống của bạn. Với sự phát triển mạnh mẽ của **internet**, việc truy cập hệ thống từ xa đã ngày càng phổ biến. Nó mang đến cho bạn sự tiện lợi nhất định khi ở cơ quan làm việc vẫn có thể truy cập vào máy cá nhân ở nhà để lấy một tài liệu quan trọng, tuy nhiên nó cũng là cách khiến cho các hệ thống máy tính dễ bị tấn công hơn.
Lời khuyên cho mọi người là luôn luôn bật (hoặc khởi động) hệ thống `Firewall` bất cứ khi nào hệ thống đang làm việc, tự cấu hình để ngăn chặn các truy cập trái phép, đơn giản nhất là giới hạn các địa chỉ IP tin cậy có thể truy cập hệ thống. Mặc dù là không dễ dàng, nhưng mọi người cũng nên tìm hiểu cách tự thiết lập thủ công cho `Firewall` của mình, hoặc tham khảo lời khuyên từ bạn bè người thân các kinh nghiệm cấu hình sử dụng. Hạn chế tối đa việc truy cập hệ thống từ xa, nếu không chắc chắn thì vẫn nên truy cập trực tiếp hệ thống.

# Bảo mật hệ thống lưu trữ
Một cách khác để bảo mật hệ thống là mã hóa ổ cứng của bạn. Cách này sử dụng cơ chế mật khẩu mã hóa để truy cập. Tuy nhiên đây lại là cách được rất ít người sử dụng. Trước hết mình sẽ nói về ưu điểm và nhược điểm của nó.
### Ưu điểm
* Thêm một tầng bảo mật cho hệ thống
* Ngăn cản truy cập trái phép đến một hoặc nhiều file của hệ thống
* Khi máy tính bị truy cập trái phép thì dữ liệu vẫn an toàn do đã được mã hóa

### Nhược điểm
* Nếu quên mật khẩu thì không thể truy cập lại file và thư mục bảo mật
* Mỗi lần đọc/ghi hệ thống cần tiến hành mã hóa và giải mã => tốn nhiều thời gian hơn
* Khi ổ cứng bị hỏng hóc, đặc biệt khi lỗi `bad sector` thì khả năng cao là dữ liệu sẽ mất do đã bị mã hóa, rất khó khôi phục lại.

Trên đây ta có thể dễ dàng nhận ra phương thức bảo mật này không đem lại được nhiều lợi ích mà rủi ro khi sử dụng lại cao, ta có thể bỏ qua hoặc chỉ dùng để tham khảo, nếu cần thiết phải sử dụng thì nên cân nhắc kỹ càng.
# Kết luận
Trong phần 1 của bài viết, mình chỉ liệt kê các mức độ bảo mật thông thường người dùng sẽ dễ nghĩ đến nhất khi sử dụng máy tính. Đặc biệt là các cơ chế mật khẩu, bảo mật ổ cứng, bảo mật gói phần mềm ... Trong phần 2 của bài viết này, mình sẽ liệt kê các mức độ bảo mật nâng cao hơn mà ít người dùng sẽ để ý hoặc sử dụng.
Mọi ý kiến đóng góp mọi người có thể comment bên dưới để giúp mình hoàn thiện bài viết hơn, xin cảm ơn mọi người đã đọc.
# Tài liệu tham khảo
* https://www.stuartellis.name/articles/unix-security-features/
* https://www.linuxtopia.org/LinuxSecurity/index.html