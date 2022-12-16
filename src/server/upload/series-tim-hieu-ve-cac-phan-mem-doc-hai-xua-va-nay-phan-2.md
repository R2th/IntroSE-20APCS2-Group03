# I. Giới thiệu
Tiếp tục với thử thách 6 ngày 6 đêm viết 2 bài **Viblo** cho sự kiện **Mayfest**, mình sẽ gửi đến các bạn những phần mềm độc hại tiếp theo cũng rất nguy hiểm và hay gặp ngày nay.
# II. Phân loại
## 6. Rootkit
**Rootkit** là một chương trình độc hại thường được dùng để sửa đổi một số mã và cấu trúc dữ liệu trong hệ điều hành nhằm thực hiện một số hoạt động độc hại.
Bộ rootkit có thể được sử dụng để ẩn phần mềm độc hại khỏi người dùng.

Ví dụ: khi người dùng thực hiện `ls` để liệt kê nội dung của một thư mục, rootkit có thể thay đổi đầu ra của lệnh này để người dùng không nhìn thấy tệp phần mềm độc hại. Tương tự, khi người dùng thực hiện lệnh `ps` để xem chương trình nào đang chạy trên hệ thống, rootkit có thể thay đổi đầu ra của lệnh này để ẩn phần mềm độc hại.

Để hiểu rõ hơn, ta sẽ đi tìm hiểu về cách rootkit can thiệp vào hệ điều hành để ẩn phần mềm độc hại trong hệ điều hành Windows. Đây là quy trình chức năng để liệt kê các tệp bằng lệnh `dir`.

![](https://images.viblo.asia/f4af5b7a-5448-4e18-a6bd-24987a8f6f19.png)

Trước khi rootkit được nhúng, đây là thông tin mà hệ điều hành thường trả về khi người dùng liệt kê các tệp trong một thư mục.
![](https://images.viblo.asia/a301e0d6-bd44-42a7-af15-efe73810bfb8.png)

Rootkit đã cài đặt sẽ chặn mọi lệnh yêu cầu đến hệ điều hành và sau đó xác định xem hành động đó có làm tiết lộ phần mềm độc hại hay không. Nếu có, rootkit sẽ thay đổi kết quả đầu ra để ẩn các phần mềm độc hại này khỏi người dùng. Nếu không, nó sẽ gửi lại kết quả bình thường.

![](https://images.viblo.asia/97d4d52c-eba1-427c-8b84-1b43a3b24269.png)

Rootkit đã chặn danh sách thư mục khỏi lệnh `dir` và xóa việc hiển thị phần mềm độc hại đang được chạy (ở đây là phần mềm mal_code.exe)

![](https://images.viblo.asia/3a02d060-d030-4f08-8d76-6c1ebe54f201.png)

## 7. Botnet

![](https://images.viblo.asia/b1b6e069-44fa-4c40-8b0d-c2e8334febc5.jpg)

**Botnet** là một mạng lưới các máy tính bị xâm nhập dưới sự điều khiển của kẻ tấn công. Mã bot trong máy tính bị xâm nhập có trách nhiệm giao tiếp với máy chủ của kẻ tấn công sau đó thực hiện các hoạt động độc hại theo yêu cầu từ máy chủ.
Hacker thực hiện vai trò của một “botmaster” kết nối các máy tính đã bị xâm nhập vào một mạng do chúng kiểm soát. Khi đó mỗi máy tính trên mạng hoạt động như một “bot”, và được kẻ xấu kiểm soát để lây truyền malware, spam hoặc nội dung độc hại nhằm khởi động cuộc tấn công. Botnet còn được gọi là đội quân zombie vì các máy tính liên quan đang được điều khiển bởi một người khác không phải chủ sở hữu của chúng.

### Các giai đoạn xây dựng mạng Botnet
Quy trình xây dựng mạng botnet bao gồm ba bước:

- **Giai đoạn 1: Chuẩn bị**

Ở giai đoạn này, hacker tìm ra lỗ hổng để đưa vào thiết bị của người dùng. Việc tìm lỗ hổng bảo mật có thể trên trang web, hành vi của con người hay các ứng dụng. Sau khi tìm được, hacker sẽ dụ mục tiêu tiếp xúc với phần mềm độc hại như email, tin nhắn, vv...
- **Giai đoạn 2: Lây nhiễm**

Giai đoạn 2 trong quá trình xây dựng mạng botnet là kích hoạt phần mềm để máy người dùng bị nhiễm mã độc. Một số con bot có khả năng tự tìm kiếm các thiết bị trong cùng một mạng để tiến hành lây nhiễm thông qua các lỗ hổng trong hệ thống.
- **Giai đoạn 3: Kiểm soát**

Cuối cùng là giành quyền kiểm soát từng thiết bị. Hacker hệ thống hóa các máy bị nhiễm liên quan trong mạng botnet và thiết kế một phương pháp để quản lý chúng từ xa. Nhìn chung, có khoảng hàng nghìn thiết bị được điều khiển trong quá trình này thông qua một mạng lưới zombie khổng lồ. Sau khi giai đoạn được hoàn thành thành công, hacker có thể có được quyền truy cập giống như quản trị viên vào các thiết bị hoặc máy tính được nhắm mục tiêu.

Việc kích hoạt hiệu quả mạng botnet cho phép tin tặc đọc hoặc ghi dữ liệu được lưu trữ trong hệ thống, nắm bắt bất kỳ thông tin cá nhân nào, chia sẻ dữ liệu từ các thiết bị được nhắm mục tiêu, theo dõi tất cả các hoạt động xảy ra trên thiết bị được nhắm mục tiêu và tìm kiếm các lỗ hổng ẩn khác.

### Các cuộc tấn công sử dụng Botnet
![](https://images.viblo.asia/2adaa632-3390-4037-a809-909d1eb78e34.png)
- <strong>DDoS</strong>

Chúng ta sẽ xem xét một kịch bản DDoS điển hình bằng cách sử dụng botnet.  Đầu tiên, kẻ tấn công chọn một máy chủ mục tiêu và quyết định thời điểm tấn công. Tiếp theo, kẻ tấn công sẽ gửi một lệnh đến tất cả các bot trong mạng botnet. Lệnh này có thể yêu cầu các bot gửi yêu cầu kết nối đến máy chủ đó trong cùng một lúc. Kết quả là máy chủ nhận được quá nhiều yêu cầu kết nối từ các bot dẫn đến bị quá tải, máy chủ bị sập và tấn công DDOS hoàn tất.

- <strong>Phishing</strong>

Phishing liên quan đến việc hacker giả mạo mình là một nguồn đáng tin cậy để dụ nạn nhân chia sẻ thông tin quan trọng như mật khẩu và thông tin đăng nhập ngân hàng. Cuộc tấn công Phishing thường sử dụng botnet để có thể đưa những thông tin giả mạo đó đến với càng nhiều người nhất có thể, đồng thời làm tăng độ tin cậy. Các hành vi có thể kể đến như spam email, tin nhắn, vv...

‍
## 8. Phần mềm gián điệp Spyware
![](https://images.viblo.asia/f43a57b9-c319-47ba-bc1a-8b0d24d93baf.png)


**Spyware (phần mềm gián điệp)** là thuật ngữ chỉ chung các phần mềm độc hại xâm nhập vào PC hoặc thiết bị di động để thu thập thông tin cá nhân, thói quen sử dụng Internet cũng như các dữ liệu khác của người dùng.

Spyware thường chạy ngầm trong hệ thống và âm thầm giám sát, thu thập thông tin nhằm phá hoại máy tính cũng như quá trình truy cập Internet bình thường của người dùng. Các hoạt động này bao gồm theo dõi thao tác bàn phím, ảnh chụp màn hình, địa chỉ email, thẻ tín dụng, dữ liệu duyệt web và các thông tin cá nhân khác. Spyware có thể lén lút xâm nhập vào hệ điều hành (HĐH) hoặc được chính người dùng vô tình cài vào máy tính từ các chương trình hợp pháp mà họ tải xuống. Trong trường hợp bạn phát hiện ra sự hiện diện của Spyware trong hệ thống thì việc gỡ bỏ nó cũng không hề dễ dàng chút nào!

Cũng như các loại Malware khác, Spyware lây nhiễm vào hệ thống dưới dạng Trojan, virus, worm, exploit và các hình thức khác thông qua một số kỹ thuật phổ biến sau:

- <strong>Thông qua lỗ hổng bảo mật:</strong>  Spyware thường xâm nhập thông qua các lỗ hổng bảo mật khi bạn tải xuống, mở các liên kết hoặc tệp đính kèm lạ trong email; Truy cập vào các website độc hại và nhấn vào banner quảng cáo; Nhấp vào một số tùy chọn trong cửa sổ bật lên; Mở các phần mềm giao dịch, tài liệu, file nhạc,… chứa có Spyware.
- <strong>Thông qua các công cụ hữu ích: </strong>Hacker thường tạo ra Spyware dưới dạng các công cụ hữu ích để tải xuống. Đó có thể là một trình tăng tốc Internet, trình quản lý tải xuống, trình dọn dẹp ổ đĩa hoặc một dịch vụ tìm kiếm web thay thế. Việc cài đặt các công cụ này sẽ khiến bạn vô tình bị nhiễm Spyware. Hãy lưu ý rằng thậm chí ngay cả khi các công cụ này bị gỡ khỏi hệ thống, Spyware vẫn ở lại và tiếp tục hoạt động.
- <strong>Thông qua các chương trình/tiện ích bổ sung (Bundleware): </strong>Spyware có thể ẩn trong các chương trình bổ sung đi kèm với ứng dụng/phần mềm. Mặc dù trông có vẻ cần thiết cho quá trình cài đặt ứng dụng, nhưng thực tế các tiện ích mở rộng này có chứa Spyware. Và tất nhiên chúng sẽ vẫn tồn tại trong hệ thống cho dù bạn có gỡ cài đặt các tiện ích này đi chăng nữa.
- <strong>Thông qua Trojans, Worms và Backdoors: </strong>Ngoài các hình thức trên thì hacker cũng có thể phát tán Spyware dưới dạng Trojans, Worms và Backdoors.
- <strong>Thông qua Sypeware dành riêng cho thiết bị di động: </strong>Phần mềm gián điệp di động đã xuất hiện kể từ khi thiết bị di động trở thành xu hướng. Vì thiết bị di động nhỏ và người dùng không thể theo dõi chi tiết nên Spyware thường chạy ngầm mà không ai hay biết. Cả thiết bị IOS và Android đều có nguy cơ bị nhiễm Spyware khi bạn cài đặt ứng dụng có mã độc, bao gồm: các ứng dụng hợp pháp được biên dịch lại bằng Malcode, các ứng dụng độc hại dùng tên giả và các ứng dụng có liên kết tải xuống độc hại.

Spyware được phân loại theo mục đích sử dụng của hacker, tiêu biểu là:

- <strong>Password stealers: </strong>Là các Spyware chuyên thu thập các loại mật khẩu như thông tin đăng nhập được lưu trữ trong trình duyệt web, thông tin đăng nhập hệ thống và các loại mật khẩu quan trọng khác.
- <strong> Banking Trojans: </strong>Là các ứng dụng được thiết kế để thu thập thông tin đăng nhập từ các tổ chức tài chính. Chúng lợi dụng các lỗ hổng bảo mật trong trình duyệt để bí mật sửa đổi các trang web, sửa đổi nội dung giao dịch hoặc chèn thêm các giao dịch khác. Người dùng và ứng dụng web lưu trữ đều khó có thể phát hiện được. Banking Trojan có thể nhắm mục tiêu vào một loạt các tổ chức tài chính, bao gồm ngân hàng, công ty môi giới, các cổng thanh toán tài chính trực tuyến hoặc ví kỹ thuật số.
- <strong>Infostealers: </strong>Là các ứng dụng quét các máy tính bị nhiễm Spyware và thu thập thông tin, bao gồm tên người dùng, mật khẩu, địa chỉ email, lịch sử trình duyệt, thông tin hệ thống và các tài liệu khác. Giống như banking Trojan, Infostealers có thể khai thác lỗ hổng bảo mật của trình duyệt để thu thập thông tin cá nhân trong các dịch vụ và diễn đàn trực tuyến.
- <strong> Keylogger: </strong>Là các ứng dụng được thiết kế để theo dõi thao tác trên bàn phím của người dùng nhằm thu thập các thông tin như dữ liệu duyệt web, nội dung email, tin nhắn riêng, thông tin hệ thống, ảnh chụp màn hình, tài liệu được in, hình ảnh, âm thanh, video và chuyển tới cho hacker.

Những dữ liệu được Spyware thu thập sẽ được truyền đến máy chủ từ xa hoặc được lưu trữ cục bộ để truy xuất.

## 9. Phần mềm Adware
![](https://images.viblo.asia/e3e73d41-3d55-47a5-be7c-9aa437a3edc4.png)

**Phần mềm adware** còn được gọi là phần mềm hỗ trợ quảng cáo, tạo ra doanh thu cho các nhà phát triển của nó bằng cách tự động tạo quảng cáo trên màn hình của bạn, thường là trong trình duyệt web. Thuật ngữ phần mềm quảng cáo thường được sử dụng để mô tả một dạng phần mềm độc hại đưa ra các quảng cáo không mong muốn cho người dùng máy tính. Các quảng cáo do phần mềm quảng cáo tạo ra có thể ở dạng cửa sổ bật lên, dạng cửa sổ không thể đóng hay nằm ngay trong trang web.

Phần mềm quảng cáo cũng đã được phát hiện trong một số thiết bị Android giá rẻ , đặc biệt là những thiết bị do các công ty nhỏ của Trung Quốc sản xuất chạy trên hệ thống Allwinner trên chip . Thậm chí có những trường hợp mã phần mềm quảng cáo được nhúng sâu vào các tệp được lưu trữ trên hệ thống và phân vùng khởi động, mà việc loại bỏ liên quan đến các sửa đổi phức tạp đến phần cứng của máy.

Trong khi một số nguồn đánh giá phần mềm quảng cáo chỉ gây khó chịu cho người sử dụng,  những nguồn khác lại phân loại nó là "mối đe dọa trực tuyến" hoặc thậm chí đánh giá nó nghiêm trọng như virus máy tính và trojan. Phần mềm quảng cáo có  thể hoạt động như một Spyware bằng cách quan sát hoạt động của người dùng máy tính mà không có sự đồng ý của họ và báo cáo cho tác giả của phần mềm. Phần mềm quảng cáo còn có thể thu thập thông tin cá nhân của người dùng, gây ra những lo ngại về quyền riêng tư. Tuy nhiên, hầu hết các phần mềm quảng cáo đều hoạt động hợp pháp và một số nhà sản xuất phần mềm quảng cáo thậm chí đã kiện các công ty chống vi-rút vì đã chặn phần mềm quảng cáo. 

Ngày nay, các chương trình đã được phát triển để phát hiện, cách ly và loại bỏ phần mềm độc hại hiển thị quảng cáo, bao gồm **Ad-Aware , Malwarebytes 'Anti-Malware , Spyware Doctor và Spybot - Search & Destroy** . Ngoài ra, hầu hết tất cả các phần mềm chống vi-rút thương mại hiện nay đều có khả năng phát hiện phần mềm quảng cáo và phần mềm gián điệp, hoặc cung cấp một mô-đun phát hiện riêng biệt.

# III. Phần kết
Phần 2 trong series **tìm hiểu về các phần mềm độc hại xưa và nay** của mình đến đây là hết. Bài viết này có khá nhiều lý thuyết nên có những đoạn còn hơi trừu tượng, bạn đọc có thắc mắc phần nào có thể comment ở dưới để mình giải đáp nhé. 

Phần cuối mình sẽ làm về các phần mềm còn lại, cách phát hiện máy bị dính phần mềm độc hại cũng như cách phòng chống để giúp máy tính được an toàn hơn.