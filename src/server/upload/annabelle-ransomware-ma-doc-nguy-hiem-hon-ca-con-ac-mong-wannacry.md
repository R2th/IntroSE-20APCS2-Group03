Chắc hẳn, nhiều người vẫn còn nhớ đến hai lỗ hổng **Spectre** và **Meltdown** – gây ám ảnh kinh hoàng cho giới công nghệ cách đây vài tháng.

Chưa dừng ở đó, gần đây tháng 03/2018, lại có thêm một mã độc mới được phát hiện. Mã độc tống tiền này có tên gọi **Annabelle** – được phát hiện bởi **Bart** – một nhà nghiên cứu bảo mật. Trong khi hầu hết mã độc tống tiền được tạo ra để kiếm tiền từ nạn nhân, tác giả của mã độc này lại tạo ra chúng để chứng tỏ kĩ năng của mình. Cũng là mã độc tống tiền nguy hiểm, **Annabelle** gợi nhắc chúng ta về cơn ác mộng **WannaCry** đã từng gây rúng động toàn thế giới năm 2017 vừa rồi.

![](https://images.viblo.asia/24f88419-44b7-4eb5-af4d-79bdde50c59c.jpg)

Mã độc **Annabelle Ransomware** khá phức tạp. Nó được kích hoạt ngay khi khởi động hệ điều hành bằng cách sử dụng một bootloader để ghi đè lên **Master Boot Record** (khu vực lưu trữ thông tin về phân vùng ổ đĩa) của máy tính bị nhiễm độc.

Khi khởi động máy tính, mã độc Annabelle sẽ thực hiện các tác vụ sau để tự triển khai và phát tán vào hệ thống của người dùng:
• Vô hiệu hóa các chương trình bảo mật.
• Vô hiệu hoá Windows Defender.
• Tắt tính năng Firewall Protection.
• Mã hóa dữ liệu của bạn.
• Lây nhiễm qua các cổng USB.
• Chạy nhiều chương trình.

Đội ngũ **MalwareHunter** đã tiến hành nghiên cứu đoạn mã nguồn của mã độc **Annabelle**. Họ phát hiện rằng mã độc này sẽ tự động hoạt động khi người dùng đăng nhập vào máy tính của họ. Một khi được kích hoạt, nó sẽ vô hiệu hóa các chương trình như **Process Hackers, Process Explorer, MSConfig, Task Manager, Chrome** và các chương trình khác thường được dùng để ngăn chặn quá trình mã hóa dữ liệu.

![](https://images.viblo.asia/6f4638bb-a4af-4670-9120-98d95aa508cd.jpg)

Ngoài ra, **Annabelle** còn có khả năng sửa đổi các tệp khác nhau cũng như vô hiệu hoá các chương trình như **Notepad, Notepad ++, Internet Explorer, Chrome, Bcdedit, …** Sau đó mã độc sẽ tự phát tán bằng tệp tin **autorun.inf**. Tuy nhiên, cách này lại không mang lại hiệu quả cao vì các phiên bản cập nhất mới nhất Windows 10 không hỗ trợ loại tệp này. Dù vậy, bạn vẫn phải thận trọng vì điều này không đảm bảo an toàn tuyệt đối cho hệ điều hành của bạn.

Sau khi hoàn tất các bước, Annabelle sẽ mã hóa máy bằng key tĩnh rồi thêm đuôi **.ANNABELLE** vào cuối tên của mỗi tệp tin. Sau đó, máy tính sẽ khởi động lại. Khi người dùng đăng nhập, màn hình khóa sẽ hiển thị tên người phát triển là **iCoreX0812** và cách thức liên hệ họ trên **Discord**. Cuối cùng, mã độc này chạy một phần mềm thay thế *Master Boot Record* để luôn hiển thị thông tin về người phát triển trên màn hình mỗi khi người dùng bật máy lên.

![](https://images.viblo.asia/3d23f0b3-2ccc-48c8-a322-449662219df3.jpg)

Sau khi mã hóa dữ liệu thành công, **Annabelle** yêu cầu nạn nhân trả 0.1 Bitcoin cho hacker trước khi hết thời gian. Ngoài ra, nó còn yêu cầu họ sử dụng darknet – mạng của các trang web không thể truy cập từ các trình duyệt hay cách thức thông thường để thanh toán.
# Cách giải quyết
Nhìn chung mã độc này chỉ để chủ nhân của nó phô bày các “kĩ năng” của mình chứ không thực sự để tống tiền. Ngoài ra nó cũng dựa trên Stupid Ransomware và có thể giải mã được. Vì dùng key tĩnh nên Michael Gillespie có thể cập nhật StupidDecryptor để giả mã biến thể này.


Bằng cách thay thế MBR, chạy Rkill ở Safe Mode để xóa sạch các mục registry IFEO, dùng công cụ giải mã của Michael đã giải mã tập tin và quét bảo mật để dọn dẹp tàn dư thì bạn có thể đưa máy mình về trạng thái bình thường nếu đã nhiễm mã độc này.

(Sưu tầm)

Tham khảo: 
https://vinadata.vn/annabelle-ransomware-ma-doc-nguy-hiem-hon-ca-con-ac-mong-wannacry/
https://quantrimang.com/ransomware-annabelle-co-dang-so-bang-phim-annabelle-khong-147270