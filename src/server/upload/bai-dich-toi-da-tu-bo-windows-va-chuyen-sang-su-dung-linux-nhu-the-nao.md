![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)

Bài viết được dịch từ bài  **[I switched from Windows to Linux. Here are the lessons I learned along the way](https://medium.freecodecamp.org/i-switched-from-windows-to-linux-here-are-the-lessons-i-learned-along-the-way-434da84ab63f)** trên trang https://medium.com, trong bài có thêm một số bình luận và bổ sung từ bản thân mình để khẳng định thêm tính đúng đắn trong các nhận định của tác giả.

Đây là bài viết kể lại hành trình chuyển từ sử dụng hệ điều hành **Windows** sang **Linux** của tác giả **Ofir Chakon**. Qua đó chúng ta có thể thấy được ngày nay hệ điều hành **Windows** không còn thống trị hoàn toàn trên các thiết bị máy tính cá nhân nữa. Thay vào đó, **Linux** đang là một lựa chọn tuyệt vời cho người sử dụng máy tính cho học tập cũng như công việc.

# Lời mở đầu
Những người dành phần lớn thời gian của mình trước máy vi tính cần tự trả lời một câu hỏi cơ bản. Ý của tác giả muốn nói là về hệ điều hành mà những người đó sử dụng. Thị phần của hệ điều hành hiện nay chiếm tới 90% là **Windows**, còn lại là các hệ điều hành khác.

Nhiều người sử dụng Windows vì những lý do rất khác nhau, tuy nhiên phần lớn là các lý do sau đây:
* Hệ điều hành **Windows** là hệ điều hành mặc định trên máy của họ (thường là những người không biết cách cài đặt hệ điều hành và muốn sử dụng nhu cầu cơ bản).
* Những người dùng **Windows** qua nhiều năm, nhiều phiên bản. Chẳng hạn họ dùng từ Windows 95, 98, XP ... Windows 7, 8, 10, và vì thế họ đã lệ thuộc vào hệ điều hành này và ngại thay đổi.
* Một số khác nghĩ rằng chỉ có 2 hệ điều hành cho máy tính để bàn bao gồm **Windows** và macOS, mà macOS thì lại đi kèm Macbook với chi phí khá đắt, vì vậy họ chọn **Windows**.

Tác giả cũng thừa nhận rằng **Windows** được thiết kế tốt và rất thuận tiện cho người sử dụng, hơn nữa nó còn được cập nhật thường xuyên. Và tác giả cũng nói, với những người dùng hệ điều hành **Windows** có ít kinh nghiệm với các hệ điều hành khác thì thường sẽ không nhận thức được các sự lựa chọn khác để thay thế cho hệ điều hành đã hơn 30 năm tuổi này.

![](https://images.viblo.asia/70283d55-5530-4d8a-8115-08524af572d2.png)

Một hình ảnh cho thấy về tỉ lệ sử dụng các hệ điều hành ngoài **Windows**. **Linux** (2.53%), macOS (3.52%) và Other (3.42%, bao gồm các hệ điều hành ít phổ biến hơn). Hệ điều hành tác giả muốn nhắc tới ở đây là **Linux**.

# 1. Một chút giới thiệu về Linux
Tác giả nói **Linux** là một hệ điều hành nguồn mở được phát triển bởi cộng đồng (thật ra chỉ là nhân hệ điều hành). **Linux** hoạt động tương tự Unix, cụ thể là sự mô phỏng hoạt động của MiNIX, vì vậy nó cũng sẽ hoạt động giống như các hệ điều hành dòng UNIX khác (trong đó có macOS, FreeBSD, Open Solaris ....). **Linux** là tự do và có rất nhiều bản phân phối khác nhau, ví dụ như Ubuntu, Debian ....
Mỗi bản phân phối đều có các ưu và nhược điểm riêng. Chúng được sử dụng cho các ứng dụng khác nhau, tùy vào mục đích của người sử dụng máy tính. **Linux**  sử dụng ổ cứng không đáng kể, gọn nhẹ hơn so với các hệ điều hành dòng **Windows**. Nó được sử dụng trong các hệ thống nhúng, thiết bị nhà thông minh, IoT (Internet-of-thing), và nhiều hơn nữa. Hệ điều hành Android cũng dựa trên **Linux** (các phiên bản đầu tiên dùng máy ảo `Dalvik`, được tạo ra từ việc thu gọn nhân **Linux** và máy ảo Java).

# 2. Bắt đầu hành trình
Tác giả là một doanh nhân công nghệ với hơn 7 năm kinh nghiệm, và anh ấy nhận ra rằng việc chuyển đổi từ **Windows** sang Ubuntu (một bản phân phối nổi tiếng của **Linux**) giúp bản thân làm việc hiệu quả hơn.

Tác giả bắt đầu với việc nhìn vào hệ điều hành **Windows** đang sử dụng và nhận ra rằng với các công cụ cơ bản hiện tại thì không cho phép anh ấy cải thiện về độ trễ khi sử dụng. Hiện tại anh ấy chỉ dùng Android Studio IDE và máy ảo Android. Anh ấy nghĩ có thể do phần cứng không đáp ứng đủ, và vì thế anh ấy nâng cấp hệ thống với thiết bị mới là máy laptop Levono Y50-70 PC với `RAM 16GB` và ổ cứng `SSD 512 GB`.

![Laptop Lenovo Y50](https://images.viblo.asia/518d2e47-e087-4cf4-8914-2c00541a78aa.jpg)

Sau khi cài đặt các phần mềm cần thiết, tác giả thấy rằng độ trễ không hề thay đổi. Anh ấy nghĩ rằng với thiết bị máy tính mới, chương trình sẽ mở nhanh hơn nhưng mà nó lại không đúng như dự kiến, vì vậy anh ấy quyết định thay đổi chiến lược.

Khi xác định vấn đề không phải do phần cứng, anh ấy nghiên cứu để thay đổi phần mềm. Bản phân phối Ubuntu của **Linux** là bản phân phối phổ biến nhất cho người dùng PC (máy tính cá nhân). Ubuntu có sẵn cả trong phiên bản `client` và phiên bản `server`. Tác giả cũng nhận ra mình có một lợi thế để chuyển qua dùng **Linux** là anh ấy đã quen với Ubuntu Ngoài ra, tác giả có thể sử dụng **Linux** trên cả máy cá nhân cũng như server mà anh ấy đang vận hành.

Tác giả cũng đã đọc khá nhiều bài viết về việc sử dụng hệ điều hành nào, ví dụ như `Linux so với Windows` hoặc `Windows so với Ubuntu`. Anh ấy nhận ra rằng khi sử dụng một hệ điều hành phù hợp với nhu cầu của mình sẽ giúp anh ấy làm việc hiệu quả hơn trong thời gian dài.

Tác giả chỉ chờ đợi một dấu hiệu để bắt đầu. Và nó đã đến - đó là một loại virus buộc tác giả phải sao lưu tất cả các tệp tin của mình và định dạng lại PC. Nhưng lần này anh ấy sẽ sử dụng hệ điều hành Ubuntu thay vì sử dụng **Windows**. Anh ấy nghĩ về việc cài đặt song song **Windows** và Ubuntu để dễ dàng chuyển đổi hơn. Nhưng không, tác giả không làm thế. Anh ấy nhận mình không muốn tiếp tục giữ lại **Windows** như một sự thay thế dự phòng, cam kết sử dụng **Ubuntu** đồng thời rời bỏ **Windows**.

Dưới đây là những bài học tác giả học được sau khi chuyển từ **Windows** sang **Linux**. Các bài học chủ yếu nhắm vào các nhà phát triển, lập trình viên hay bất kỳ ai tạo ra các sản phẩm phần mềm.

# 3. Hiệu năng
Nhờ kiến trúc gọn nhẹ của mình, **Linux** chạy nhanh hơn cả Windows 8.1 và Windows 10. Sau khi chuyển sang **Linux**, tác giả đã nhận thấy sự cải thiện đáng kể về tốc độ xử lý của máy tính. Và anh ấy đã sử dụng các công cụ tương tự như đã làm trên **Windows**, bao gồm cả Android Studio IDE cũng như máy ảo Android. **Linux** hỗ trợ nhiều công cụ giúp làm việc hiệu quả và vận hành chúng một cách liền mạch.

# 4. Sự bảo mật
**Linux** là một phần mềm nguồn mở (Open Source). Bất cứ ai cũng có thể đóng góp mã nguồn để giúp nâng cao trải nghiệm của người dùng với **Linux**. Đồng thời, bất kỳ ai cũng có thể thêm các tính năng, sửa lỗi, giảm rủi ro bảo mật và hơn thế nữa.

Các dự án nguồn mở quy mô lớn được hưởng lợi từ việc có nhiều người kiểm tra chúng, kể cả các chuyên gia, nhà phát triển cũng như người dùng thông thường. Như vậy, **Linux** an toàn hơn **Windows**. Thay vì cài đặt phần mềm diệt virus để dọn dẹp các phần mềm độc hại, chúng ta chỉ cần tận dụng các kho phần mềm được đề xuất. Và chỉ cần như vậy là đủ.

# 5. Phát triển phần mềm
Phần mềm `Terminal` trong Linux là một `wild card`. Tức là chúng ta có thể làm hầu hết mọi thứ với nó. Điều này bao gồm cài đặt phần mềm, cấu hình phần mềm ứng dụng và server, quản lý hệ thống tệp tin và nhiều hơn nữa.

Với một nhà phát triển phần mềm, `Termial` là một cái gì đó thật tuyệt vời. Không có gì thuận tiện hơn việc chạy các server, đào tạo mô hình `Machine learning`, truy cập các máy tính từ xa, biên dịch và chạy các đoạn mã từ cùng một cửa sổ `Termial`. Nó giúp tăng năng suất công việc, và biến tự động hóa thành trở nên đơn giản hơn, giống như một trò chơi.

![](https://images.viblo.asia/3b6e2709-ccb5-4972-bec6-e3acbde15ddd.png)

# 6. Tính mô đun hóa
Với **Linux**, bạn có thể dễ dàng thay đổi cấu hình và truy cập vào máy tính của mình, kiểm tra các quy trình và quản lý môi trường ảo hóa. Bởi vì máy server của bạn có thể sẽ dựa trên **Linux**, nên việc bắt chước các hành vi sẽ dễ dàng hơn, sử dụng các phần mềm và gói tương tự và tự động hóa các quy trình công việc, thay vì phải sử dụng các hệ điều hành khác nhau cho các công việc cụ thể.

# 7. Làm việc với Linux server từ xa
Hầu hết các server đều dựa trên **Linux** vì những lý do không được liệt kê ở đây. **Linux** cung cấp các công cụ cho các nhà phát triển để vận hành các server an toàn(`secure`) và có thể mở rộng (`scalable`) . Do đó, các doanh nhân công nghệ vận hành server thông qua `Terminal` phải thành thạo **Linux** để sửa cấu hình và bảo trì server.

**Windows** sử dụng các công cụ của bên thứ ba như `PUTTY` để kết nối và tương tác với các máy chủ dựa trên **Linux**. Điều này không thuận tiện. Ví dụ: để sao chép tệp bằng **Windows**, bạn cần tải xuống một công cụ khác (`WinSCP`).

Một lợi thế của máy tính dựa trên **Linux** là nó có thể kết nối với các server từ xa bằng một dòng lệnh duy nhất. Điều này được thực hiện trong `Terminal`. Các server có thể được lưu trữ trong một tệp tin cũng như với các khóa và tên người dùng SSH (`Secure Shell`). Tất cả những gì bạn phải làm để kết nối với SSH là gõ lệnh sau:

```
ssh [name_of_server_profile]
```

Không cần nhớ địa chỉ IP, không cần nhớ mật khẩu cũng như tài khoản, tất cả đã được lưu lại trong tệp tin cấu hình.

# 8. Làm quen với các nguyên tắc của hệ điều hành cấp thấp
**Windows** thực hiện ở mức rất cao. Các nhà phát triển hiếm khi tiếp xúc với các vấn đề nội bộ và triển khai, hầu hết đều được cấu hình sẵn và họ chỉ cần ấn một nút lệnh hoặc chọn từ menu của IDE. **Linux** thì ngược lại. Cấu hình phải được thực hiện bởi `Terminal`. Điều này bao gồm chỉnh sửa các tệp tin của hệ điều hành, thêm các tác vụ theo lịch trình, cập nhật phần mềm, cài đặt trình điều khiển và hơn thế nữa.

Khi chúng ta sử dụng Ubuntu, [AskUbuntu.com](https://askubuntu.com) là một tài nguyên hữu ích. Ta không chỉ học các kỹ năng, mà còn học cách giải quyết các vấn đề (đôi khi là một cách khó khăn). Đồng thời, ta học cách theo dõi các vấn đề của máy, cấu hình các thành phần khác nhau và hơn thế nữa.

![](https://images.viblo.asia/a2a70b3a-53fd-48b2-be05-10ce36a9fdd3.png)

# 9. Không phải tất cả đều hoàn hảo
* Chuyển sang học sử dụng Ubuntu sẽ không phải là một đường thẳng. Rất nhiều vấn đề trên **Windows** chúng ta có thể tự làm thì sang**Linux** chúng ta sẽ phải mất công tìm hiểu hoặc nhờ trợ giúp. Tuy nhiên, ta vẫn có thể sử dụng [AskUbuntu.com](https://askubuntu.com) để được hỗ trợ. Những thiết bị như `GPU` thường sẽ rất khó khăn để cài đặt, do các nhà sản xuất không hỗ trợ trực tiếp.
* Mỗi doanh nhân công nghệ nên là một nhà thiết kế có kỹ năng thiết kế đồ họa tối thiểu. Thật không may, Adobe không phát hành bất kỳ sản phẩm nào của mình cho người dùng **Linux**. Vì vậy, chúng ta không thể chạy chúng một cách trực tiếp. Phần mềm thay thế phổ biến nhất có lẽ là GIMP (thay thế cho Photoshop). Đây là một phần mềm mã nguồn mở và có các tính năng cơ bản trong việc chỉnh sửa ảnh dành cho nhà phát triển. Mặc dù có một số bất lợi, tác giả nói rằng anh ấy không cảm thấy hối tiếc về việc chuyển đổi sang dùng Ubuntu. Với tác giả, giờ Ubuntu là tất cả và anh ấy cũng cho rằng đáng ra mình phải chuyển sang sử dụng nó từ nhiều năm trước.

**Linux** không dành cho tất cả mọi người. Hãy kiểm tra xem nó có phù hợp với nhu cầu của chúng ta không trước khi nghĩ đến việc chuyển đổi. Nếu bạn tự coi mình là một doanh nhân công nghệ, nhà phát triển, nhà khoa học dữ liệu hoặc lập trình viên, bạn chắc chắn nên thử qua dùng Ubuntu.

# Kết luận
Trên đây mình đã dịch lại bài viết của tác giả **Ofir Chakon** với góc nhìn của cá nhân mình với những điều mà anh ấy nói. Mình cũng là một người chuyển hẳn sang sử dụng **Linux**, từ bỏ **Windows** giống như tác giả, cũng vào khoảng năm 2011 mình đã bắt đầu sử dụng phiên bản Ubuntu 11.04 - Natty Narwhal, trải qua thời gian dài sử dụng **Linux**, mình cũng không muốn quay lại với **Windows** nữa ^^. Và mình tin rằng các bạn cũng có thể thử và thấy giống như vậy. Good luck!.

# Tài liệu tham khảo
* https://medium.freecodecamp.org/i-switched-from-windows-to-linux-here-are-the-lessons-i-learned-along-the-way-434da84ab63f