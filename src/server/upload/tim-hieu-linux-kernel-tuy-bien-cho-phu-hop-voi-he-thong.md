![](https://images.viblo.asia/a9e9dc2b-f2e8-4c47-ad1b-82ed91edcf24.png)
# Mở đầu
Ngày nay **Linux** đã không còn là khái niệm xa lạ với mọi người nữa, đặc biệt là các lập trình viên. Trên phạm vi toàn thế giới, **Linux** đang ngày càng được phổ biến rộng rãi. Có lẽ chỉ trừ hệ điều hành cho máy tính cá nhân lâu nay vốn là sự thống trị của **Microsoft Windows** ra thì mọi nơi khác đâu đâu cũng có mặt của **Linux**. Từ các dịch vụ công cộng như y tế, giáo dục hay các dịch vụ mạng, vận hành siêu máy tính, phần lớn thị phần hệ điều hành di động cũng là một biến thể của **Linux** (**Android**). Ngày càng có nhiều lập trình viên chuyển đến hệ sinh thái **Linux**, nó là miễn phí và tự do, từ việc sử dụng cơ bản đến nâng cao, thậm chí có thể sửa đổi để phù hợp với hệ thống cụ thể.
# Linux - Linux kernel
**Linux** cơ bản không phải là hệ điều hành hoàn chỉnh, nhưng nó là một `kernel` (hạt nhân) hoàn chỉnh. Nó được thiết kế để hoạt động tương tự với cách mà **UNIX** hoạt động (cụ thể, **Linux** được *Linus Torvalds* mô phỏng theo hoạt động của **MINIX** - một biến thể của **UNIX**). Loại hệ điều hành không được đóng gói hoàn chỉnh mà sẽ bao gồm tập hợp của rất nhiều phần mềm có thể tùy biến cả về số lượng và chủng loại. Tuy nhiên tất cả đều hoạt động xoay quanh một `kernel` chung (ở đây là **Linux kernel**).
Kể từ khi **Linux** ra đời, ngày càng có rất nhiều nhà phát triển quan tâm đến nó. Hiện nay, số lượng hệ điều hành dùng **Linux kernel** làm cơ sở vẫn đang không ngừng tăng lên. Giống như tính kế thừa của lập trình hướng đối tượng (OOP), các hệ điều hành đời sau dù ít hay nhiều đều học tập theo các hệ điều hành đời trước. Ngày **Linux kernel** mới ra mắt chỉ có 3 hệ điều hành là được biết đến rộng rãi, bao gồm **Debian** của *Ian Murdock*, **RedHat** của *Red Hat Inc.* và **Slackware** của *Patrick Volkerding*. Ngày nay, hơn 1 nửa hay có thể nói hầu hết các hệ điều hành dựa trên **Linux** đều bắt nguồn hoặc học hỏi từ 3 hệ điều hành này. Cùng dùng chung **Linux kernel** nhưng không một hệ điều hành nào là giống nhau, mỗi cái có một cách sử dụng và cấu hình riêng cho các phần mềm đi kèm (hầu hết là phần mềm từ dự án **GNU/Linux** và các phần mềm sử dụng giấy phép **GPL**).
**Linux kernel** cũng là một phần mềm, tất nhiên. Những thứ mà có ở trên máy tính mà không phải phần cứng thì đều là phần mềm mà ^^. Tất nhiên mỗi phần mềm thì đều có một chức năng riêng. Và với **Linux** thì đó là nhiệm vụ điều phối hoạt động của hệ điều hành, là trung gian cho phần cứng và các phần mềm khác. Cộng đồng phát triển của "phần mềm" [Linux](https://github.com/torvalds/linux) là vô cùng lớn, với hơn 750,000 commit và rất rất rất rất rất nhiều contributors, nhiều đến mức mà GitHub phải để số lượng là **∞**. Do **Linux** cũng là một phần mềm mã nguồn mở, nên tất nhiên là bất cứ ai cũng có thể tìm hiểu về mã nguồn của nó, chỉ có một ràng buộc duy nhất là giấy phép **GPL** (hiện nay là GPL version 3). Bất cứ ai có thể thay đổi mã nguồn của nó, tùy chỉnh cho phù hợp với hệ thống của mình, tuy nhiên khi muốn phân phối nó thì cần phải sử dụng chung giấy phép với nó và không được dùng mã nguồn cho mục đích thương mại.
# Vấn đề tùy biến Linux kernel
Các thiết bị máy tính ngày càng có số lượng, chủng loại đa dạng hơn trước. Mỗi nhà sản xuất thiết bị lại thiết kế phần cứng của mình theo các cách khác nhau. Điều này thật sự làm khó cho các nhà sản xuất hệ điều hành. Tuy nhiên, điều này chỉ đúng với **Microsoft Windows**,  đó là một dòng hệ điều hành đóng hoàn toàn, tức là khi sử dụng chúng ta không thể và không có quyền thay đổi hoạt động của `kernel`. Trong khi **Microsoft Windows** lại là hệ thống được sử dụng phổ biến nhất thế giới dành cho máy tính cá nhân, mỗi khi có một phần cứng mới ra đời, các lập trình viên của **Microsoft** lại phải vất vả để viết các bản cập nhật cho phần cứng đó, dù là mỗi hãng sản xuất đều sẽ cho đi kèm các bản `driver` tương ứng, nhưng không có nghĩa là `driver` này có thể tương thích hoàn toàn với hệ thống. Với một dòng khác là **OSX** hay **macOS** của hãng **Apple** thì tuy cũng không thay đổi được `kernel` nhưng bù lại phần cứng là cố định và không thay đổi.
Về phần mình, **Linux** hoạt động theo một cách rất riêng, tất cả mọi người đều có thể thay đổi `kernel` để tương thích hoàn toàn với thiết bị mà họ sử dụng (nếu có thể). Điều này có một chút tương đồng với các hệ điều hành của **Apple**, tuy nhiên khác với **Apple** là chỉ bản thân hãng mới có quyền thay đổi thì với **Linux** bất cứ ai cũng có quyền thay đổi.
Việc tùy biến `kernel` không phải một công việc dễ dàng, nhất là với người chỉ có nhu cầu sử dụng cơ bản. Chính vì vậy, các nhà phân phối các biến thể của hệ điều hành **Linux** đã cố gắng tối ưu hóa cho `kernel` cho hầu hết phần cứng phổ biến nhất. Bên cạnh đó, cộng đồng lập trình viên nguồn mở cũng không ngừng nghiên cứu và cho ra đời các phiên bản mới của **Linux** nhằm hỗ trợ các phần cứng mới tốt hơn.
# Thời điểm có thể tùy biến
Trước hết cần phải xem lại quá trình khởi động của một chiếc máy tính. Đầu tiên là công đoạn khởi động nguồn, sau đó sẽ đến quá trình tìm thiết bị khởi động, và rồi `kernel` sẽ được load. Chính xác thì thời điểm hoàn thành load `kernel` cũng chính là lúc tiến trình đầu tiên trong hệ thống được thực thi (với **PID** = `1`). Trong giai đoạn load `kernel`, các bộ điều khiển cũng sẽ được kích hoạt. Thường thì sẽ có 3 loại: **active**, **module** và **non-active**. Loại **active** thì sẽ luôn luôn được khởi chạy cho dù nó không được sử dụng đến trong toàn bộ quá trình vận hành của hệ thống, chẳng hạn như chuột và bàn phím. Loại **module** thì sẽ vẫn sẽ được load sẵn nhưng ở trạng thái chờ hoạt động, thường để phục vụ các thiết bị plug-and-play như USB, máy in... hoặc các thiết bị điều khiển kết nối như card mạng wifi, card bluetooth .... Và loại cuối cùng, loại **non-active** thì chỉ tồn tại trong hệ thống nhưng hoàn toàn không được load trong giai đoạn khởi động hệ thống.
Với việc sử dụng **Linux kernel**, có hai giai đoạn người dùng có thể tùy biến. Một là trước khi `kernel` được biên dịch, và hai là khi người dùng muốn thay đổi các bộ điều khiển sẽ được load khi hệ thống khởi động. Quá trình thứ nhất thì tương đương với công việc bình thường của lập trình viên, viết code - sửa code - biên dịch. Còn quá trình thứ hai thì chỉ đơn giản là tùy chỉnh file cấu hình cho hệ thống `kernel`.
# Tùy biến trước khi biên dịch
Quá trình này thật ra để hiểu rất đơn giản, chỉ là công đoạn lấy mã nguồn của **Linux kernel** về máy tính, sau đó chỉnh sửa mã nguồn rồi biên dịch và cài đặt. Tuy nhiên, để cho hệ thống có thể hoạt động được ổn định thì chúng ta cần mất nhiều thời gian để thử tìm hiểu kiểm nghiệm thực tế vì có thể chỉ một thay đổi nhỏ trên mã nguồn cũng có thể làm hỏng hệ thống bất cứ lúc nào.
Trước khi có thể vọc vạch được `kernel` này, ta cần tải về bộ mã nguồn đầy đủ của nó, có hai địa chỉ tin cậy để có thể tải về mã nguồn của **Linux kernel**, đó là:
* https://www.kernel.org (Official page)
* https://github.com/torvalds/linux (Project page )

Sau khi lấy mã nguồn về, việc chúng ta cần làm là giải nén tarball của `kernel`. Và đây là những thứ có bên trong:
![](https://images.viblo.asia/e9f0baf9-fe2d-4dc5-a489-d6b78c750f18.png)

Một số file và thư mục cần lưu ý như sau:
* **.config**: đây là file cấu hình của `kernel` khi biên dịch, **Makefile** sẽ dựa vào file này để sinh ra file cấu hình tương ứng.
* **Kconfig**: một file cấu hình khác của `kernel`, dùng để xác định kiến trúc CPU sẽ dùng để biên dịch.
* **Makefile**: file cấu hình của `make`, bao gồm những chỉ dẫn cụ thể dành cho trình biên dịch, giúp tạo ra các file thư viện và file chương trình của `kernel`
* **Documentation/**: thư mục này chứa toàn bộ tài liệu của `kernel`
* **fs/**: mã nguồn của filesystem, thường là các thư viện hỗ trợ đọc/ghi các định dạng lưu trữ của ổ cứng
* **net/**: mã nguồn cho việc điều khiển kết nối
* **include/**: chứa các file headers dùng cho `kernel` và các chương trình cần sử dụng mã nguồn của `kernel`
* **drivers/**: chứa mã nguồn cho các trình điều khiển thiết bị
* **init/**: chứa mã nguồn dùng cho việc khởi động `kernel`
* **lib/**: chứa các thư viện cần thiết cần có trước khi biên dịch các phần còn lại của `kernel`

Giờ thì chúng ta có khá nhiều lựa chọn để làm việc với mã nguồn `kernel`. Chúng ta có thể thay đổi mã nguồn theo ý thích, cấu hình lại, tạo pull gửi lên **GitHub** hoặc phân phối lại `kernel` nếu muốn. Tất nhiên, mình có lời khuyên là cho dù bạn làm bất cứ điều gì với `kernel` thì trước khi cài đặt cũng nên sao lưu lại hệ thống để đề phòng. Để có thể khiến cho `kernel` sau khi chỉnh sửa có thể hoạt động thì chúng ta cần một vốn kiến thức nhất định về hệ thống, cũng như các thiết bị, phần cứng. Còn nếu không, ta có thể cấu hình đơn giản và biên dịch cũng đủ để sử dụng rồi.

# Bắt đầu cấu hình để biên dịch
Cách đơn giản nhất để cấu hình cho `kernel` trước khi biên dịch là chạy câu lệnh `make menuconfig` trong `Terminal`, và chúng ta cần di chuyển vào thư mục chứa mã nguồn của `kernel` để chạy. Kết quả sẽ như sau:
![](https://images.viblo.asia/6f990221-a54d-48a3-9b9c-f7147a5f593f.png)

Ở trên giao diện này, các tùy chọn sẽ hiển thị dưới dạng một menu phân cấp, các dòng có ký hiện `--->` tức là có thể mở rộng. Để di chuyển thì ta sử dụng các phím mũi tên. Thay đổi tùy chọn thì bằng phím `Spacebar` và confirm thay đổi thì dùng phím `Enter`. Bên dưới có 5 tùy chọn bao gồm:
* `Select`: dùng để lựa chọn
* `Exit`: dùng để thoát khỏi chương trình config hoặc trở về menu trước.
* `Help`: dùng để xem trợ giúp cho dòng hiện tại
* `Save`: dùng để lưu lại cấu hình vào file `.config`
* `Load`: dùng để load lại file cấu hình `.config`

Với mỗi cấu hình sẽ có tối đa 3 lựa chọn, bạn có thể thay đổi giữa các tùy chọn bằng cách ấn phím `Spacebar` hoặc dùng một trong 3 phím `Y` để thêm vào, `M` để thêm dưới dạng **module** và `N` để loại bỏ không sử dụng.
![](https://images.viblo.asia/a12e2f31-cebc-4227-b0d7-9c062272511a.png)

Sau khi cấu hình xong. Bạn có thể `Save` lại thay đổi vào file `.config` và chạy câu lệnh `make` để tiến hành biên dịch `kernel` hoặc chạy `make help` để xem thêm các tùy chọn khác. Cuối cùng là chờ đợi để thấy thành quả (sẽ hơi lâu một chút).
# Cấu hình sau khi biên dịch
Thật ra thì ở đây cũng không có quá nhiều tùy biến, vì các lựa chọn sẽ chỉ bao gồm trong những thư viện và chương trình đã được biên dịch trước đó. Nếu phần cứng thiết bị của bạn nằm trong số không được phiên bản `kernel` hiện tại hỗ trợ thì thiết bị đó cũng không thể sử dụng được. Bạn có thể cần cập nhật lên phiên bản `kernel` mới hơn hoặc chờ đợi cộng đồng viết các `module` hỗ trợ phần cứng đó. Hoặc nếu bạn đủ trình độ đến một mức nào đó thì có thể tự viết `driver` cho phần cứng ^^.

Bạn có thể sử dụng command `modprobe` để thay đổi việc load một `module` nào đó của `kernel`.
* `modprobe -h`: lệnh này dùng để xem hướng dẫn các tùy chọn khi chạy lệnh
* `modprobe -c`: in ra tất cả cấu hình của `kernel`
* `modprobe module_name`: dùng để thêm 1 cấu hình module có tên `module_name` cho `kernel`.
* `modprobe -r module_name`: tương tự lệnh trên nhưng sẽ loại bỏ 1 module thay vì thêm vào.

VD với module `aes_x86_64` (dùng để mã hóa AES):
![](https://images.viblo.asia/fafdb1a6-ca8c-4aa3-9e62-f2de0542a0d6.png)

Một cách cấu hình khác là `blacklist`, cách này thì thường dùng để loại bỏ một hoặc vài `module` của `kernel` từ khi khởi động hệ thống. Cách làm thì rất đơn giản, chỉ cần tạo 1 file tùy ý với đuôi `.conf` trong thư mục `/etc/modprobe.d/` rồi thêm vào đó các dòng `blacklist module_name`. Khi hệ thống khởi động, các `module` này sẽ được bỏ qua.

# Kết luận
Trên đây chỉ là những phần cơ bản để chúng ta có thể bắt đầu tìm hiểu và cấu hình các `module` của **Linux kernel**. Mặc dù công việc này có thể không đơn giản và nhàm chán, tuy nhiên thành quả của nó rất đáng để chúng ta thử nghiệm. Có thể nhìn rất rõ vào 2 hệ dòng hệ điều hành của **Microsoft Inc.** và **Apple Inc.**. Một bên là `Microsoft Windows` rất nặng nề khi dung nạp hầu hết các trình điều khiển (driver) cho rất nhiều thiết bị, và phía còn lại là **macOS** thì chỉ chứa những trình điều khiển của một số thiết bị cố định và cụ thể. Quá trình tùy biến cấu hình `kernel` này phần nào có thể nâng cao hiệu năng cho hệ thống **Linux** của bạn. Cảm ơn mọi người đã đọc bài viết, mọi góp ý có thể comment bên dưới ạ (bow).
# Tài liệu tham khảo
* https://en.wikipedia.org/wiki/Linux_kernel
* https://www.kernel.org
* https://github.com/torvalds/linux