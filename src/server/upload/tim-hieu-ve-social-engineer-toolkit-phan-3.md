# 1. Giới thiệu.
Tiếp tục với series SEToolkit, hôm nay mình sẽ giới thiệu với các bạn 1 vài tính năng khác của SEToolkit cũng rất thú vị và có thể được sử dụng để kết hợp với các kỹ thuật ở bài trước nhằm nâng cao khả năng thành công của tấn công `Social Engineering`.

Ngoài ra, nếu các bạn chưa biết và có hứng thú với cách sử dụng SEToolkit để thực hiện tấn công Phishing Facebook hay Email giả mạo thì hãy tham khảo [phần 1](https://viblo.asia/p/tim-hieu-ve-social-engineer-toolkit-va-ky-thuat-phishing-facebook-1VgZvQJmKAw) và [phần 2](https://viblo.asia/p/tim-hieu-ve-social-engineer-toolkit-phan-2-ByEZkeeY5Q0) trong series bài viết về SEToolkit của mình nhé.

# 2. QR code
Thay vì gửi trực tiếp địa chỉ IP dẫn tới trang web giả mạo, ta có thể sử dụng modul QRCode Generator Attack Vector kết hợp với việc gửi Email giả mạo để tăng khả năng thành công.

Ví dụ: Trong `phần 1` ta đã dựng được trang web giả mạo facebook.com với địa chỉ IP: `2.tcp.ngrok.io:13690` , lúc này ta tiếp tục sử dụng QR Code Generator để thực hiện việc tạo một mã QR Code chứa nội dung chính là địa chỉ IP `2.tcp.ngrok.io:13690`. Sau đó ta sẽ tiến hành gửi một email đánh lừa nạn nhân bằng kỹ thuật mình đã sử dụng trong `phần 2`. Nội dung email có thể chứa những thông báo khiến người đọc tò mò như:
- “Mã giảm giá Shopee siêu sale miễn phí cho mọi người, hãy quét mã QR để nhận.”
- “Chúc mừng bạn đã trúng thưởng 1 triệu đồng, quét mã để nhận thưởng.”

Tạo QR code

![](https://images.viblo.asia/793464b4-ab54-44ce-9cc9-4a92c692d2de.png)

Lúc này mã QR đã được tạo mà lưu trong đường dẫn: `/root/.set/reports`

![](https://images.viblo.asia/e1a5004f-7531-488b-a818-57c8160f8083.png)

Để mở hình ảnh QR ta cần truy cập với quyền `root`. Hình ảnh mã QR:

![](https://images.viblo.asia/02583b30-26ae-4a00-92e6-8abb5d1afa5c.png)

# 3. Powershell Attack Vectors
Powershell Attack Vectors cho phép bạn tạo các cuộc tấn công cụ thể PowerShell. Các cuộc tấn công này sẽ cho phép bạn sử dụng PowerShell có sẵn theo mặc định trong tất cả các hệ điều hành Windows Vista trở lên. PowerShell cung cấp một cảnh quan hiệu quả cho việc triển khai các dữ liệu tải về và thực hiện các chức năng mà không được kích hoạt bởi công nghệ ngăn chặn.

Bước 1: Chọn Powershell Attack Vectors. Chọn option 9 trong tấn công social-engineering:

![](https://images.viblo.asia/da72fb61-189d-4047-91ad-5b90ba597317.png)

Bước 2: Chọn payload cần thiết và thêm thông tin host, port của máy tấn công. Chọn yes để tiến hành lắng nghe kết nối.

![](https://images.viblo.asia/c4d3336d-9ffb-45f5-a4d7-6f63a34834a7.png)

Sau khi tool chạy xong thì sẽ tạo ra được 1 file shell nằm tại `/root/.SET/reports/powershell/`. Thực hiện truy cập theo đường dẫn để lấy file.

Bước 3: Copy file `x86_powershell_injection.txt` được tạo trong qua trình tạo attack và sửa tên thành `facebook.bat`

![](https://images.viblo.asia/bbee420b-ff46-4dee-982f-8c0d808e2c61.png)

Bước 4: Tiến hành gửi nạn nhân file `facebook.bat`. Khi nạn nhân chạy file này trên máy thì attacker bắt được thông tin kết nối. Chạy Powershell trên máy Win 7:

![](https://images.viblo.asia/7d7ae5a0-6365-4242-9f5d-d7a626992d6e.png)

Shell thực thi trên máy Win 7:

![](https://images.viblo.asia/a0ccdcfd-6764-4d52-b4cf-e0b5ea0e1a04.png)

Vậy là chạy shell thành công. Bây giờ bạn có thể xem được thông tin cấu hình máy cũng như thực hiện các thao tác trên máy của nạn nhân. Modul QR Code này sử dụng thư viện trong Python. Khi được quét mã sẽ chuyển hướng nạn nhân đến bất kì vector tấn công nào mà ta muốn.

# 4. Infectious Media Generator
Đây là phương pháp tấn công sử dụng các thiết bị vật lý và là phương pháp hoàn toàn khác, chúng ta sẽ sử dụng các thiết bị như USB, DVD, CD để tấn công. Phương pháp này cho phép ta gắn các mã độc thực thi của chúng ta hoặc trong Metasploit để tạo ra các `USB/DVD/CD` kết hợp với file `autorun.inf`. Một khi các thiết bị này được cắm vào máy, nó sẽ tự động gọi autorun và thực thi các đoạn mã độc hại. Cách thực hiện:

Khởi động Setoolkit, chọn Social-Engineering Attacks, chọn tiếp mục 3 là Infections Media Generator

![](https://images.viblo.asia/8b34b25c-c20a-4c77-83eb-eaaa27120766.png)

![](https://images.viblo.asia/d1d3f832-8f65-4bf4-9eec-4d2ce097834f.png)

Chọn option 1 File-Format Exploits, nhập địa chỉ IP của máy tấn công, tra địa chỉ IP bằng câu lệnh `ifconfig`. Ở đây có rất nhiều định dạng tệp độc hại khác nhau như PDF, RAR, ZIP… Mình chọn tuỳ chọn thứ 13.

![](https://images.viblo.asia/6c8ebfc6-6ad2-4f19-a2c2-71d174283471.png)

Có 2 lựa chọn là sử dụng tệp pdf của bạn hoặc tạo một file pdf mới rỗng. Mình chọn option 2. Điền các thông tin: địa chỉ IP, port. Đợi một lúc, payload đã được tạo ra thành công và lưu ở trong đường dẫn `/root/.set/` trong folder autorun. Copy thư mục này vào trong `USB/DVD/CD`.
![](https://images.viblo.asia/feaddeaa-49c5-4b60-ab6b-40d8b672a23d.png)

Một khi các thiết bị `USB/DVD/CD` được chèn, ta có thể điều khiển máy tính của nạn nhân.
![](https://images.viblo.asia/374f093f-2ddb-4ddb-8ff3-92a37b392534.png)

# 5. Wireless Access Point Attack Vector
Modul tấn công mạng không dây sẽ tạo ra một điểm truy cập internet sử dụng mạng không dây của bạn và chuyển hướng toàn bộ truy vấn DNS về phía bạn. 

Ý tưởng này khá đơn giản, SEToolkit sẽ tạo một điểm truy cập không dây, máy chủ DHCP và giả mạo DNS để chuyển hương lưu lượng đến máy của kẻ tấn công. Sau đó bạn có thể trở về menu chính của công cụ và tiến trình sẽ vẫn được chạy.
Tiếp theo bạn có thể khởi chạy bất cứ vector tấn công nào bạn muốn, ví dụ như Java Applet attack và khi nạn nhân kết nối vào điểm truy cập của bạn, cố gắng truy cập một trang web, sẽ được chuyển hướng đến máy của bạn.

Vector tấn công này cần có các công cụ AirBase-NG, AirMon-NG, DNSSpoof và dhcpd3.

#  6. Kết luận
Có nhiều tùy chọn để khám phá khi làm việc với Social-Engineering toolkit. Đối với hướng dẫn này, mình chỉ đề cập đến cài đặt và các tùy chọn chính, đồng thời cho thấy có thể dễ dàng sử dụng một trong những phương pháp lừa đảo truyền thống nhất hiện có: email giả mạo, có thể bao gồm lời gọi hành động đến một trang web độc hại. Tuy nhiên, còn có nhiều thứ khác để khám phá, chẳng hạn như cách tệp độc hại, dữ liệu giả mạo, lưu lượng truy cập mạng, v.v. Với những công cụ như thế này trong tầm tay của bạn, bạn không cần phải là một người dùng quá giỏi về kĩ thuật để thực hiện một cuộc tấn công độc hại chống lại các tổ chức hoặc cá nhân. Một điều chúng ta phải luôn nhớ là thực tế là các cuộc tấn công bằng kỹ thuật xã hội không chỉ dựa vào tâm lý con người mà còn dựa vào việc thu thập thông tin tập trung vào nạn nhân. Biết được lượng thông tin bạn đang tiết lộ về cơ sở hạ tầng, ứng dụng và công ty của mình là rất quan trọng để giảm bề mặt tấn công của bạn — để ngăn chặn các cuộc tấn công kỹ thuật xã hội cũng như bất kỳ loại tấn công kỹ thuật số nào khác. `Cuối cùng mình xin nhấn mạnh rằng những hướng dẫn này chỉ dành cho mục đích thử nghiệm và chỉ có thể được sử dụng khi đã có sự đồng ý nghiêm ngặt. Không sử dụng nó cho các mục đích bất hợp pháp. `

Vậy là chúng ta đã đi hết series về Social-Engineering toolkit, bài viết có thể còn có những thiếu sót và những chỗ chưa chuẩn xác rất mong bạn đọc có thể góp ý để mình cải thiện thêm trong tương lại nhé.