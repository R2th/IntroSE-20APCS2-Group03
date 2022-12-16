![](https://images.viblo.asia/c8607920-2d8b-418b-9ffe-d423cb204c05.jpg)

Việc lộ source code là một trong những lo lắng của các công ty công nghệ. Đối với các công ty outsource, họ có thể tốn cả triệu đô để đền bù thiệt hại cho khách hàng nếu source code bị lộ. Vậy đâu là giải pháp cho vấn đề này? 

## Frontend code, Android app code

Frontend code, như Javascript có thể bị truy cập từ bên ngoài, Android thì có thể bị decompile. 
Ta không thể ngăn chặn việc truy cập vào source code từ bên ngoài, nhưng ta có thể làm cho nó trở nên khó đọc bằng cách sử dụng phương pháp Obfuscation.
Như vậy, người khác có mở được source code ra cũng không dễ gì hiểu và sử dụng lại được nó.

## Các loại source code không thuộc nhóm trên

Với các loại source code này (backend/server code, iOS code), thông thường những người không liên quan đến việc phát triển sẽ không có khả năng truy cập vào (iOS code khó bị decompile).
Vì vậy vấn đề ở đây là việc nhân viên công ty copy source code và làm lộ ra bên ngoài, hoặc tự ý sử dụng nó cho các dự án khác. Vậy các công ty phải làm thế nào?

### Hạ sách

Nếu làm theo cách cực đoan như sau, bạn có thể ngăn chặn được việc nhân viên mang source code ra bên ngoài.

- Vô hiệu hoá tất cả các cổng USB và IO ở tất cả các máy tính của công ty.
- Tất cả các máy dùng để code phải là máy tính để bàn.
- Không cho phép tất cả các máy tính kết nối đến internet. Không web, không ftp, email, message, không internet.
- Không cho phép làm việc từ xa, không cho truy cập từ xa.
- Không cho mang thiết bị điện tử, điện thoại vào trong phòng development.
- Thiết lập tất cả các máy in để in một watermark lớn ở mọi trang in, cả trước và sau.
- Kiểm tra túi xách của nhân viên cả khi đi vào trong và ra ngoài. TÌm kiếm các mảnh ghi chép, các thứ được in từ máy in của công ty (mọi thứ kể cả những đoạn code ẩn, những bức ảnh có thể chứa thông tin ẩn), mọi thiết bị điện tử. Tốt nhất là đảm bảo rằng các loại cặp sách được đặt tránh xa khỏi khu vực cần bảo vệ, và developer cần mặc quần áo theo chuẩn để không bí mật mang được các thứ ra ngoài.
- Cài đặt camera giám sát mọi thứ xảy ra trong phòng phát triển, và giao cho nhân viên bảo vệ luôn đi tuần quanh phòng quan sát việc phát triển của các nhân viên phát triển.
- Server cần được đặt ở nơi tách biệt, các bản back up cần được mã hoá và chỉ người có thẩm quyền có password để khôi phục chúng.

Đây không phải là tất cả nhưng là một trong số những cách để khiến source code trở nên nội bất xuất, ngoại bất nhập với phòng phát triển. Bạn đạt được mục đích là ngăn chặn được phần lớn việc source code bị copy ra ngoài nhưng tác dụng phụ của nó là môi trường làm việc trở nên ngột ngạt, nhân viên cảm thấy không được tin tưởng. Còn gì tệ hơn là một môi trường làm việc như nhà tù, ngăn chặn sự sáng tạo, bản thân không được tôn trọng, và hậu quả tất yếu bạn sẽ mất dần nhân viên. Công nghệ được cập nhật từng ngày, các nhân viên bị cách biệt với thế giới bên ngoài khi làm việc sẽ gặp khó khăn khi tìm hiểu cách giải quyết vấn đề cũng như tự học kiến thức mới.

### Cách làm tốt hơn

- Tin tưởng: Bạn cần đặt niêm tin vào nhân viên của mình, đừng tuyển những người bạn cảm thấy khó tin tưởng. Làm việc với người mà mình không tin tưởng là một dấu hiệu của sự thất bại. Mối quan hệ không có sự tin tưởng khiến giảm năng suất làm việc của nhân viên cũng như khiến nhân viên rời xa bạn. Những người tốt nhất sẽ tránh xa các công ty không tin tưởng nhân viên.
- Ký hợp đồng bảo mật: Tin tưởng ai đó không có nghĩa là bạn không nên có những biện pháp phòng ngừa mang tính pháp lý. Những biện pháp phòng ngừa này có thể được thực hiện dưới dạng một hợp đồng bảo mật với những điều khoản nói về hậu quả nghiêm trọng nhân viên phải chịu trong trường hợp source code bị lộ. Đối với các công ty thông thường, hậu quả này thường là các khoản tiền phạt lớn và đi kèm với việc nhân viên bị sa thải.
- Chia nhỏ source code: Sự tin tưởng và việc ký hợp đồng bảo mật là một khởi đầu tốt, nhưng chúng ta có thể làm tốt hơn nữa. Những phần nhạy cảm của source code có thể được chia nhỏ thành nhiều phần và cần tất cả kết hợp lại để hệ thống có thể hoạt động được. Đảm bảo rằng mỗi cá nhân (bộ phận) chỉ đảm nhiệm một trong các phần và người làm phần này không bao giờ xem được đoạn code của phần khác. Người của bộ phận này không được chia sẻ (thậm chí không gặp) thông tin về việc mình làm với bộ phận khác, lý tưởng hơn, họ không thể đoán được bộ phận khác làm gì và có bao nhiêu bộ phận ở đó. Môi người chỉ biết một phần, khiến cho không ai có thể xem được toàn thể bức tranh (việc lắp ghép các phần lại sẽ được thực hiện ngoài công ty hoặc do những cá nhân có thẩm quyền). 

Nhưng ngay cả trong trường hợp source code có bị lộ ra ngoài, liệu những người khác có thể lợi dụng nó để gây ảnh hưởng đến công ty không?

## Khó để kiếm tiền từ service xây dựng từ source code đánh cắp

- Một công ty cần hàng chục đến hàng trăm người để xây dựng các tính năng cho phần mềm, cung cấp việc hỗ trợ kỹ thuật, thực hiện việc marketing và bán hàng. Vài cá nhân đơn lẻ sử dụng source code này không dễ để thực hiện hàng loạt công việc như thế.  Ngoài ra còn có những vấn đề về việc deploy cũng như quản lý hệ thống, hay bảo mật. Khi hệ thống đó mất vài tháng để có thể chạy được, thì hệ thống gốc đã được triển khai từ lâu dẫn đến hệ thống được xây dựng từ source code bị lộ trở nên lỗi thời.
- Nếu một team đủ khả năng để thiết lập, cung cấp hỗ trợ kỹ thuật, thực hiện việc bán hàng cũng như marketing, thì ngay từ đầu họ cũng không cần source code của người khác. Họ hoàn toàn có thể viết từ đầu.
- Nếu ai đó đủ khả năng sử dụng được source code và xây dựng được một service, kiếm được tiền từ nó. Họ nhiều khả năng sẽ bị phát hiện và bị kiện ra toà.

## Tham khảo
1. https://softwareengineering.stackexchange.com/questions/170246/how-to-prevent-code-from-leaking-outside-work

2. https://www.quora.com/Which-IT-solution-that-technology-companies-use-to-protect-their-source-code-from-leaking-to-the-internet