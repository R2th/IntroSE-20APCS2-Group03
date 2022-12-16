Ngày nay, có thể khẳng định rằng e-mail đã trở thành một trong những công cụ liên lạc phổ biến nhất khi mà mỗi ngày chúng ta gửi cho nhau hàng tỉ e-mail. Và bạn đã bao giờ thắc mắc làm thế nào mà e-mail có thể truyền từ máy tính của bạn tới một người khác cách xa bạn cả nửa vòng trái đất? Mail server là gì?, và nó lưu trữ mail của bạn như thế nào? Câu trả lời có thể làm bạn bất ngờ, bởi vì thật sự cốt lõi của hệ thống mail rất đơn giản. Trong bài viết này, chúng ta sẽ đi sâu vào tìm hiểu e-mail và cách nó hoạt động.

![](https://images.viblo.asia/263bc847-4906-46a8-9e88-673588229e0a.jpg)

## E-mail message
E-mail message giống như thư trong hệ thống bưu điện, là yếu tố quan trọng nhất của hệ thống. Hầu như mọi tính năng đều xoay quanh nó. Nhưng sự thật thì một e-mail message không có gì hơn là một đoạn text. Từ những ngày đầu thậm chí tới nay, e-mail message thường là một đoạn text ngắn, dù cho có thêm tính năng đính kèm (file) thì nó vẫn vậy, sự khác biệt có lẽ chỉ là đoạn text đó sẽ dài hơn (chúng ta sẽ tìm hiểu về phần đính kèm ở dưới)
## E-mail client
Rất có thể bạn đã nhận một vài email trong ngày hôm nay. Và để xem chúng thì bạn cần tới e-mail client. Đa số mọi người dùng những client phổ biến, độc lập như Microsoft Outlook, Thunderbird, hoặc có thể trên web như Gmail, Yahoo là các dịch vụ mail miễn phí. Chúng đều có điểm chung là:
1. Cho phép bạn xem danh sách các message trong hòm thư của bạn với những header ngắn gọn bao gồm người gửi, chủ đề của mail và có thể là cả ngày, giờ và dung lượng của message đó
2. Cho phép bạn lựa chọn một tiêu đề và đọc nội dung của e-mail message
3. Cho phép bạn tạo message mới và gửi chúng. Bạn điền vao đó địa chỉ e-mail người nhận và chủ đề của message, sau đó là nội dung.
4. Cho phép bạn đính kèm file vào message hoặc là lưu trữ file trong message bạn nhận.

Các e-mail client xịn hơn có thể có thêm thông báo, lọc, tìm kiếm message, nhưng chức năng cốt lõi của tất cả các e-mail client chỉ có vậy
## E-mail server
![](https://images.viblo.asia/5f2946ee-b2fc-4cae-a3fb-8dcb6f9a6037.gif)
Giống như các server thông thường - các máy tính trên Internet chạy các phần mềm chuyên dụng xử lý các yêu cầu gửi tới bao gồm Web servers, FTP servers, telnet servers và tương tự là e-mail server, chạy trên hàng triệu máy tính trên Internet ngay bây giờ. Các phần mềm này chạy liên tục trên máy chủ và lắng nghe trên các cổng cụ thể, chờ đợi người dùng hay chương trình khác kết nối tới cổng. Có thể coi một e-mail server đơn giản nhất có thể làm việc như sau:
1. Nó sẽ có một danh sách các e-mail account, với mỗi account tương ứng với một người dùng để có thể nhận e-mail trên server. Ví dụ như account của tôi có thể là mbrain, của John Smith có thể là jsmith, và cứ thế
2. Nó sẽ có một file text trong thư mục tên là MBRAIN.TXT, một file khác tên JSMITH.TXT,...
3. Nếu ai đó muốn gửi e-mail cho tôi, người đó sẽ soạn một message trong email-client, và chỉ định message đó sẽ tới mbrain. Khi người đó nhấn nút gửi, e-mail client sẽ kết nối tới e-mail server và gửi đi tên người nhận (mbrain), tên người gửi (jsmith) và nội dung message.
4. Server sẽ định dạng lại các thông tin đó và nối thêm vào cuối file MBRAIN.TXT, ví dụ:
```
From: jsmith To: mbrain Marshall, Can we have lunch Monday? John
```

Sẽ có thể có vài thông tin khác mà server cần lưu vào file, như thời gian và ngày gửi, tiêu đề. Nhưng sau cùng, bạn cũng có thể thấy tất cả chỉ là một tiến trình vô cùng đơn giản
## Chi tiết hơn về Email server
![](https://images.viblo.asia/a0d3696d-d4ba-4e76-b5c3-735ce3798883.gif)

Khi người khác gửi mail cho mbrain, server chỉ việc append những message tiếp theo vào cuối file theo thứ tự. Bạn có thể đăng nhập vào và đọc chúng, khi đó e-mail client sẽ kết nối tới máy chủ. Trong hệ thống đơn giản nhất có thể, nó hoạt động như sau: 
1. Yêu cầu server gửi một bản copy của file MBRAIN.TXT
2. Yêu cầu server xóa và reset file MBRAIN.TXT
3. Lưu file MBRAIN.TXT trên máy
4. Parse thông tin lưu trong file thành các message (ví dụ sử dụng từ "From: " làm mốc phân tách)
5. Show tất cả các message headers trong danh sách

Khi click vào message header, nó sẽ tìm trong text file và trả về nội dung tương ứng

Như bạn thấy thì nó vô cùng đơn giản, đáng ngạc nhiên là trong thực tế thì các hệ thống e-mail cũng chỉ phức tạp hơn một chút. Đa số chúng bao gồm hai server riêng biệt chạy trên một máy chủ. Một chịu trách nhiệm gọi tới SMTP (Simple Mail Transfer Protocal) server xử lý mail gửi đi. Cái còn lại có thể là POP3 (Post Office Protocol) server hoặc IMAP (Internet Mail Access Protocol) server để xử lý mail tới. Cụ thể hơn SMTP server lắng nghe trên cổng 25, POP3 lắng nghe trên cổng 110 và IMAP sử dụng cổng 143
###  SMTP Server
Bất cứ khi nào bạn gửi một e-mail, e-mail client của bạn sẽ tương tác với SMTP server, sau đó SMTP server trên host của bạn lại có thể liên lạc tới các SMTP server khác để gửi e-mail đi.

Giả sử tôi muốn gửi một e-mail. E-mail của tôi là mbrain@howstuffworks.com và tôi muốn gửi e-mail tới jsmith@mindspring.com. Tôi sử dụng e-mail client là Outlook Express

Khi thiết lập tài khoản trên howstuffworks, tôi cho Outlook Express biết tên của mail server - mail.howstuffworks.com. Khi tôi soạn một message và nhấn nút gửi, một chuỗi sự kiện sau sẽ xảy ra:
1. Outlook Express kết nối tới SMTP server tại địa chỉ mail.howstuffworks.com sử dụng cổng 25
2. Outlook Express liên lạc với SMTP server, cho SMTP server biết địa chỉ gửi và nhận, cùng với đó là nội dung message
3. SMTP server tìm thấy địa chỉ "To: " (jsmith@mindspring.com) và chia nó làm hai phần: tên người nhận (jsmith) và tên miền(mindspring.com). Nếu địa chỉ nhận là một tài khoản khác cũng thuộc howstuffworks.com, SMTP server chỉ việc chuyển mesage tới POP3 server cho howstuffworks.com. Nếu người nhận ở một tên miền khác, SMTP cần phải liên lạc với tên miền đó
4. SMTP server liên lạc với DNS (Domain Name Server), yêu cầu địa chỉ IP cho tên miền mindspring.com của SMTP server mà Mindspring hoạt động
5. Sau khi nhận được địa chỉ IP, hai SMTP server sẽ kết nối với nhau thông qua cổng 25, truyền các text message giống như cách e-mail client của tôi thực hiện với SMTP server của HowStuffWorks. Mindspring nhận được các message và tìm tới tài khoản jsmith, nếu có thì tiếp tục chuyển message tới POP3 server của nó, có nghĩa là gần như message đã ở trong jsmith mailbox
6. Nếu vì lí do nào đó mà SMTP server tại HowStuffWorks không thể kết nối tới SMTP server tại Mindspring, message sẽ được xếp vào queue. Nó sẽ sau đó thử gửi lại định kỳ các message trong queue (khoảng 15 phút). Và sau một khoảng thời gian nhất định, nó thường sẽ thông báo lại sự cố cho bạn.
###  POP3 server
Một POP3 server có thể hiểu đơn giản là nơi lưu trữ một tập hợp các file text, mỗi file cho một tài khoản e-mail. Khi mesage được gửi tới, công việc của POP3 server chỉ là nối thêm message vào cuối file của người nhận.

Khi bạn check e-mail, e-mail client của bạn kết nối tới POP3 server qua cổng 110. POP3 server yêu cầu tên và tài khoản. Một khi bạn đã đăng nhập, POP3 server mở file text của bạn và cho phép bạn truy cập nó.

Email-client của bạn kết nối với POP3 server và gửi một loạt các lệnh để lấy về các bản copy của e-mail message về máy của bạn. Thường thì nó sẽ xóa hết các message khỏi server ngay sau đó.

Một cách hiểu khác là POP3 server đơn giản chỉ là tầng giao tiếp giữa e-mail client và file text chứa message của bạn.
![](https://images.viblo.asia/35561482-80aa-442d-8567-1b7da70e67c8.jpg)
### The IMAP Server
Như bạn đã thấy, giao thức POP3 rất đơn giản. Nó cho phép bạn truy xuất các message được lưu trên server. Email-client của bạn có thể kết nối tới POP3 e-mail server và tải về các messages từ text file về máy tính cá nhân.

Tuy nhiên người dùng muốn nhiều hơn thế, họ muốn e-mail của họ vẫn lưu trữ trên server. Lí do là bởi điều này cho phép người dùng có thể kết nối bằng nhiều thiết bị. Với POP3, một khi bạn đã tải e-mail xuống thì nó sẽ chỉ tồn tại ở máy đó. POP3 làm việc đọc e-mail ở cả máy bàn hay laptop trở nên khó khăn.

IMAP là giao thức tiên tiến hơn có thể giải quyết vấn đề này. Với IMAP, mail của bạn vẫn lưu trên e-mail server. Bạn có thể tổ chức chúng thành các thư mục. Khi bạn tìm kiếm e-mail, quá trình đó được thực hiện trên máy chủ, nhờ đó mà việc truy cập e-mail từ bất kể thiết bị nào trở nên dễ dàng, bạn có quyền truy cập tới tất cả các e-mail trong thư mục của bạn.

Email-client của bạn kết nối tới IMAP server qua cổng 143 và sau đó gửi đi một tập lệnh cho phép nó thực hiện một số việc như liệt kê tất cả các message header trong thư mục, lấy một e-mail message cụ thể từ server, xóa các message trên server,...

Một vấn đề có thể xảy ra với IMAP liên quan tới câu hỏi đơn giản: "Nếu tất cả e-mail của tôi được lưu trữ trên server thì làm sao để tôi có thể đọc mail khi không kết nối Internet?". Để giải quyết vấn đề này, hầu hết e-mail client có một vài cách cache e-mail trên máy local. Ví dụ, email-client sẽ tải tất cả các message và lưu tất cả nội dung trên máy local (giống như khi kết nối với POP3 server), nhưng các message vẫn tồn tại trên IMAP server. Điều này cho phép bạn đọc và trả lời e-mail ngay cả khi không kết nối Internet. Lần kết nối Internet tới, bạn sẽ tải về tất cả các message mới và gửi tất cả các mail bạn viết khi không kết nối Internet.
![](https://images.viblo.asia/f571f2e9-944f-4724-98b6-3c849fd6b997.png)

*setting IMAP và POP của Gmail*
## Đính kèm
Email-client cho phép bạn đính kèm trong message bạn gửi, và cũng cho phép bạn lưu các đính kèm từ message bạn nhận. Đính kèm có thể bao gồm file doc, excel, file âm thành, hình ảnh hay là cả phần mềm. Vì e-mail message chỉ có thể chứa thông tin dạng text và đính kèm thường không phải dạng text, điều này phát sinh ra vấn đề mới.

Những ngày đầu của e-mail, bạn giải quyết vấn đề này một cách thủ công, sử dụng một chương trình mã hóa. Chương trình này mặc định rằng đính kèm bao gồm các thông tin dạng nhị phân và trích xuất 3 bytes từ dữ liệu nhị phân đó và chuyển đổi chúng thành 4 chữ cái dạng text (lấy 6 bit một, cộng giá trị thêm 32 và tạo ra chữ cái định dạng ASCII). Kết quả cuối cùng là một file mã hóa chỉ chứa text. Nếu là trước đây bạn sẽ phải mã hóa đính kèm một cách thủ công và copy đoạn text đó vào trong mail message và người nhận sẽ phải giải mã một cách tương tự, còn bây giờ thì mọi thứ đã được tự động và trở nên dễ dàng hơn.
![](https://images.viblo.asia/5f4e8a72-24bf-4baf-a013-622720ac6340.gif)



Thậm chí các hệ thống mail bây giờ đã được nâng cấp thêm nhiều tính năng như tự động lọc spam, tùy chỉnh giao diện, thông báo giúp cho việc liên lạc càng trở nên dễ dạng, tiện lợi và không thể bàn cãi về tầm quan trọng của nó trong đời sống hiện nay. 

### Nguồn tham khảo
https://computer.howstuffworks.com/e-mail-messaging/email.htm