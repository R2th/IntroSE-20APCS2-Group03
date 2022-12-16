Chào các bạn, sắp tới ngoài những bài viết cơ bản,bên mình sẽ cố gắng tập trung vào những series bài viết về các kiến thức cơ bản trong hacking để mọi người có thể nắm dược và hiểu được từ những điều đơn giản nhất. Chính vì vậy, bọn mình đã chọn Sniffing làm chủ đề đầu tiên để viết. Toàn bộ series bài viết này được một bạn đang học về ATTT tại KMA chia sẻ, mình sẽ để link Facebook của bạn này dưới cuối bài viết để mọi người tiện theo dõi. 

CHƯƠNG I: TỔNG QUAN VỀ SNIFFING

1.  Định nghĩa Sniffing

1.  Khái niệm Sniffing

Sniffing là một chương trình lắng nghe trên hệ thống mạng để truyền dữ liệu. Sniffing cho phép các cá nhân nắm bắt dữ liệu khi nó truyền qua mạng. Kỹ thuật này được sử dụng bởi các chuyên gia mạng để chuẩn đoán các sự cố mạng và bởi những users có ý định xấu để thu thập dữ liệu không được mã hóa, như password và username. Nếu thông tin này được ghi lại trong quá trình người dùng có thể truy cập vào hệ thống hoặc mạng.

Khởi đầu Sniffer là tên một sản phầm của Network Associates có tên là Sniffier Analyzer.

Những dữ liệu mà Sniffing chụp được là những dữ liệu ở dạng nhị phân (Binary). Bởi vậy để nghe lén và hiểu được những dữ liệu ở dạng nhị phân này, các chương trình Sniffing phải có tính năng được biết như là sự phân tích các giao thức (Protocol Analysis), cũng như tính năng giải mã (Decode) các dữ liệu ở dạng nhị phân sang dạng khác để hiểu được chúng.

Đối tượng Sniffing là:

-   Password (từ Email, Web, SMB, FTP, SQL hoặc Telnet)

-   Các thông tin về thẻ tín dụng

-   Văn bản của Email

-   Các tập tin đang di động trên mạng (tập tin Email, FTP hoặc SMB)

1.  Mục đích sử dụng

Sniffing thường được sử dụng vào 2 mục đích khác biệt nhau.

+ Tích cực:

-   Chuyển đổi dữ liệu trên đường truyền để quản trị viên có thể đọc và hiểu ý nghĩa của những dữ liệu đó.

-   Bằng cách nhìn vào lưu lượng của hệ thống cho phép quản trị viên có thể phân tích lỗi đang mắc phải trên hệ thống lưu lượng của mạng.

-   Một số Sniffing tân tiến có thêm tính năng tự động phát hiện và cảnh báo các cuộc tấn công đang được thực hiện vào hệ thống mạng mà nó đang hoạt động. (Intrusion Detecte Service)

-   Ghi lại thông tin về các gói dữ liệu, các phiên truyền...Giúp các quản trị viên có thể xem lại thông tin về các gói dữ liệu, các phiên truyền sau sự cố...Phục vụ cho công việc phân tích, khắc phục các sự cố trên hệ thống mạng.

+ Tiêu cực:

-   Nghe lén thông tin trên mạng để lấy các thông tin quan trọng.

1.  Các giao thức có thể sử dụng Sniffing

-   Telnet và Rlogin: ghi lại các thông tin như password, usernames

-   HTTP (HyperText Transfer Protocol): Các dữ liệu gửi đi không mã hóa

-   SMTP, NNTP, POP, FTP, IMAP: Password và dữ liệu gửi đi không mã hóa.

1.  Phương thức hoạt động Sniffing

Công nghệ Ethernet được xây dựng trên một nguyên lý chia sẻ. Theo một khái niệm này thì tất cả các máy tính trên hệ thống mạng cục bộ đều có thể chia sẻ đường truyền của hệ thống mạng đó. Hiểu một cách khác tất cả các máy tính đều có khả năng nhìn thấy lưu lượng dữ liệu được truyền của hệ thống mạng đó. Như vậy phần cứng Ethernet được xây dựng với tính năng lọc và bỏ qua tất cả những dữ liệu không thuộc đường truyền chung với nó.

Nó thực hiện được điều này trên nguyên lý bỏ qua tất cả những Frame có địa chỉ MAC không hợp lệ đối với nó. Khi Sniffing được tắt tính năng lọc này và sử dụng chế độ hỗn tạp (Promiscuous Mode). Nó có thể nhìn thấy tất cả lưu lượng thông tin từ máy B đến máy C, hay bất cứ lưu lượng thông tin giữa bất kỳ máy nào trên hệ thống mạng. Miễn là chúng cùng nằm trên một hệ thống mạng.

*Trong môi trường Hub:* Một khung gói tin khi chuyển từ máy A sang máy B thì đồng thời nó gửi đến tất cả các máy khác đang kết nối cùng Hub theo cơ chế loan tin (broadcast). Các máy khác nhận được gói tin này sẽ tiến hành so sánh yêu cầu về địa chỉ MAC của frame gói tin với địa chỉ đích. Nếu trùng lập thì sẽ nhận, còn không thì cho qua. Do gói tin từ A được gửi đến B nên khi so sánh thì chỉ có B mới giống địa chỉ đích đến nên chỉ có B mới thực hiện tiếp nhận.

Dựa vào nguyên tắc đó, máy được cài đặt chương trình nghe trộm sẽ "tự nhận" bất cứ gói tin được lưu chuyển trong mạng qua Hub, kể cả khi đích đến gói tin có đích đến không phải là nó, do sniffer chuyển card mạng của máy sang chế độ hỗn tạp (promiscuous mode). Promiscuous mode là chế độ đặc biệt. Khi card mạng được đặt dưới chế độ này, nó có thể nhận tất cả các gói tin mà không bị ràng buộc kiểm tra địa chỉ đích đến.

*Trong môi trường Switch:* Khác với Hub, Switch chỉ chuyển tải các gói tin đến những địa chỉ cổng xác định trong bảng chuyển mạch nên nghe trộm kiểu "tự nhận" như ở Hub không thực hiện được. Tuy nhiên, kẻ tấn công có thể dùng các cơ chế khác để tấn công trong môi trường Switch như ARP spoofing, MAC spoofing, MAC duplicating, DNS spoofing, v.v...

1.  Phân loại Sniffing:

    1.  Active

Chủ yếu hoạt động trong môi trường có các thiết bị chuyển mạch gói, phổ biến hiện nay là các dạng mạch sử dụng Switch. Kẻ tấn công thực hiện sniffing dựa trên cơ chế ARP và RARP (2 cơ chế chuyển đổi từ IP sang MAC và từ MAC sang IP) bằng cách phát đi các gói tin đầu độc, mà cụ thể ở đây là phát đi các gói thông báo cho máy gửi gói tin là "tôi là người nhận" mặc không phải là "người nhận". Ngoài ra, các sniffer còn có thể dùng phương pháp giả địa chỉ MAC, thay đổi MAC của bản thân thành MAC của một máy hợp lệ và qua được chức năng lọc MAC của thiết bị, qua đó ép dòng dữ liệu đi qua card mạng của mình. Tuy nhiên, do gói tin phải gửi đi nên sẽ chiếm băng thông. Nếu thực hiện sniffing quá nhiều máy trong mạng thì lượng gói tin gửi đi sẽ rất lớn (do liên tục gửi đi các gói tin giả mạo) có thể dẫn đến nghẽn mạng.

1.  1.  Passive :

Chủ yếu hoạt động trong môi trường không có các thiết bị chuyển mạch gói, phổ biến hiện nay là các dạng mạng sử dụng Hub. Do không có các thiết bị chuyển mạch gói nên các gói tin được broadcast đi trong mạng. Chính vì vậy, việc thực hiện sniffing là khá đơn giản. Kẻ tấn công không cần gửi ra gói tin giả mạo nào, chỉ cần bắt các gói tin từ Port về (dù host nhận gói tin không phải là nơi đến của gói tin đó). Hình thức sniffing này rất khó phát hiện do các máy tự broadcast các gói tin. Ngày nay hình thức này thường ít được sử dụng do Hub không còn được ưa chuộng nhiều, thay vào đó là Switch.

1.  Các hình thức tấn công

Sniffing là hình thức nghe lén thông tin trên mạng nhằm khai thác hiệu quả hơn tài nguyên mạng, theo dõi thông tin bất hợp pháp. Tuy nhiên, sau này các hacker dùng sniffing để lấy các thông tin nhạy cảm, do đó cũng có thể coi đó là 1 hình thức hack. Có khá nhiều các phương pháp để thực hiện sniffing, dù là tấn công chủ động hay bị động. Bài báo cáo sẽ nói cụ thể về 6 phương pháp tấn công sniffing:

-   Lắng nghe thông tin qua Hub

-   Tấn công MAC

-   Tấn công DHCP

-   Chặn bắt thông tin dùng ARP- Poisoning

-   Chặn bắt thông tin dùng DNS- Spoofing

-   VLAN Hopping

Qua phần 1 của bài viết này, hi vọng mọi người đã có cái nhìn tổng quan nhất về phương thức tấn công Sniffing, trong các phần sau của bài viết mình sẽ trình bày rõ hơn để mọi người đều có cái nhìn sâu hơn về Sniffing.

Như đã nói ở trên, mình để lại link Facebook của tác giả series này, mọi người đều có thể kết bạn làm quen với nhau : 

#### Tác giả : [Hoàng Sơn Hà](https://www.facebook.com/comua.vocam)

Chúc các bạn học tốt <3

Nguồn bài viết : https://anonymousvn.org/series-sniffing-phan-1-tong-quan-ve-sniffing.hav/