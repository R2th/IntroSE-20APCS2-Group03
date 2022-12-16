![](https://images.viblo.asia/8a33461f-8f16-414f-bb27-e0b44e3ee4b9.jpg)


Dù theo thời gian nhiều ứng dụng truyền tải thông tin có xuất hiện ngày càng nhiều, nhưng E-mail vẫn luôn giữ được chỗ đứng của mình. Mọi người vẫn sử dụng nó để liên lạc, gửi tài liệu, thực hiện các giao dịch và không chỉ được sử dụng từ máy tính mà nó đã được tích hợp vào các thiết bị điện tử khác như điện thoại di động. Vì tính phổ biến của nó nên nó cũng được các tội phạm sử dụng để thực hiện các hành vị lừa đảo, phát tán virus và truyền thông tin liên lạc với các đồng phạm. Do vậy email cũng có thể được coi là manh mối và thậm chí là bằng chứng cho cơ qua điều tra thực thi pháp luật. 

Bài viết này sẽ cho mọi người cái nhìn tổng quan về kiến trúc của email trên quan điểm điều tra kỹ thuật số. Và liệt kê ra các phương pháp và các công cụ được sử dụng để thực hiện phân tích.

# Giới Thiệu
Trong điều tra kỹ thuật kỹ số, email được coi là một loại bằng chứng có giá trị và công việc phân tích tiêu đề email là một điều vô cùng quan trọng vì từ đây điều tra viên có thể thu thập bằng chứng củng cố hồ sơ phạm tội. Các ứng dụng email được chia làm hai loại chính, phụ thuộc vào vị trí lưu trữ của chúng:
- **Web-based Email**: sẽ lưu tất cả dữ liệu trên server máy chủ web. Một số ứng dụng phổ biến kiểu này như là Gmail, Yahoo Mail, Hotmail, v.v ... Lợi ích của việc sử dụng ứng dụng web-based email là nó có thể được truy cập từ mọi nơi trên thế giới, chỉ cần sử dụng username và password để truy cập. Một trong những nhược điểm của nó là người dùng không biết dữ liệu của họ đang được lưu trữ ở đâu.

- **Desktop-based Email**:  Là các ứng dụng email được cài đặt trên máy tính để bàn như là Outlook, Thunderbird, Mail Bird,… là các ví dụ về ứng dụng desktop-based email. Tất cả dữ liệu email sẽ được lưu trữ trên máy tính cá nhân của người dùng. Do đó người dùng không phải lo lắng về việc bảo mật dữ liệu. Đây cũng có thể được coi là một bất lợi trong một số trường hợp, đặc biệt là khi nó được sử dụng trong các hoạt động điều tra phạm tội thì bằng chứng sẽ không thể được thu thập từ máy chủ server.

# Các Thành Phần Trong Hệ Thống Email
Trước khi đi vào cách thức hoạn động của một hệ thống email chúng ta cần đi qua các thành phần chứa bên trong của hệ thống đó. Dưới đây sẽ là hình ảnh về các thành phần

![](https://images.viblo.asia/5af1dcf2-6db4-44f5-8fef-9c99591862e0.jpg)

- **Mail User Agent (MUA)**: MUA là một thành phần tương tác trực tiếp với người dùng cuối . Ví dụ về MUA là phần mềm Thunderbird, MS Outlook, Zimbra Desktop... Các giao diện web mail như Gmail và Yahoo! cũng được coi là các MUA. Một MUA hoạt động thay mặt tác giả được gọi là Author MUA(aMUA) và một hoạt động thay mặt người nhận được gọi là Receiver MUA(rMUA).

- **Mail Transfer Agent (MTA)**: MTA chịu trách nhiệm chuyển email từ mail server của người gửi thư đến mail server của người nhận thư. Ví dụ về MTA là sendmail và postfix.

- **Mail Delivery Agent (MDA)**: Trong một mail server nhận thư, local MTA chấp nhận một email đến từ MTA của người gửi. Email sau đó được gửi đến hộp thư của người dùng bởi MDA.

- **Gửi Email** : Simple Mail Transfer Protocol (SMTP)

- **Nhận Email** : Post Office Protocol (POP) / Internet Message Access Protocol (IMAP)

- **POP / IMAP**: Giao thức POP và IMAP được sử dụng để tìm nạp email từ hộp thư của máy chủ người nhận tới MUA người nhận.

- **Mail Exchanger Record (MX)**: MX record có nhiệm vụ là chỉ đường cho email đi đến mail server của bạn ( MX record thường đi kèm theo một A record sẽ trỏ về địa chỉ IP của mail server , và một thông số pref có giá trị số để chỉ ra mức độ ưu tiên của các mail server , giá trị pref càng nhỏ thì mức độ ưu tiên càng cao )

Khi người gửi thực hiện gửi email , SMTP giúp đảm bảo chắc chắn là email được gửi từ server người gửi sẽ tới server người nhận . Khi email đến server người nhận MTA của server nhận sẽ tiếp nhận email của người gửi và chuyển nó cho MDA local. MDA sau đó writes email vào mailbox của người nhận. Khi người nhận dùng MUA để kiểm tra email, MUA sẽ dùng giao thức POP hoặc IMAP để lấy mail về

# Trình Tự Hoạt Động Của Email Trong Thực Tế 
Giả sử rằng [A@exampleA.tst](http://A@exampleA.tst) đang  gửi một email tới [userB@exampleB.tst](http://B@exampleB.com) . Các sự kiện sau đây sẽ xảy ra tuần tự khi người dùng gửi mail :

![](https://images.viblo.asia/c35d2e4d-3266-4da2-b909-85c6509cc56d.jpg)

1. MUA của người gửi khởi tạo kết nối tới mail server [mail.exampleA.tst](https://www.google.com/) bằng giao thức SMTP (thường là TCP Port 25).

2. Mail server [mail.exampleA.tst](https://www.google.com/) nhận email và biết rằng domain đích cần gửi email tới là [exampleB.tst](https://www.google.com/). Server [mail.exampleA.tst](https://www.google.com/) tạo ra một truy vấn đến máy chủ DNS để hỏi về thông tin record MX của domain [exampleB.tst](https://www.google.com/). Giả sử rằng không có thông tin về domain [exampleB.tst](https://www.google.com/) trong bộ nhớ cache của máy chủ DNS.

3. Máy chủ DNS lần lượt tạo ra một truy vấn đệ quy đối với máy chủ DNS có thẩm quyền và tìm hiểu về chi tiết các record MX của domain [exampleB.tst](https://www.google.com/). Thông tin này sẽ được trả về cho server [mail.exampleA.tst](https://www.google.com/).
Bây giờ server [mail.exampleA.tst](https://www.google.com/) đã có địa chỉ IP của mail server đích, nó sẽ gửi email trực tiếp tới mail server [mail.exampleB.tst](https://www.google.com/) thông qua Internet. SMTP được sử dụng để liên lạc giữa các mail server nguồn và đích.

4. Email đến được nhận bởi SMTP (MTA) cục bộ trên server [mail.exampleB.tst](https://www.google.com/). Sau khi nhận được email, nó được chuyển cho MDA, sau đó gửi thư đến hộp thư của người nhận được lưu trữ trong máy chủ. Máy chủ có các hộp thư riêng biệt cho mỗi người dùng.

5. Khi người nhận kiểm tra email qua giao thức POP hoặc IMAP, email được MUA lấy từ máy chủ về máy tính của user. Tùy thuộc vào cấu hình MUA, email có thể được tải xuống trong máy trạm, bản sao có thể được lưu giữ trong cả máy chủ và máy trạm, hoặc email giữa máy chủ và MUA được đồng bộ hóa, tuỳ thuộc vào bạn chọn giao thức POP hay IMAP.

Ngoài ra người ta còn có mail gate nó đứng trước mail server đảm nhận vai trò giống như là một firewall với các khả năng chống phishing , DLP(data loss prevention), và lọc mail cao cấp hơn…

# Các Hình Thức Tấn Công Email
### 1. Malware Distribution:
Đề cập đến một phương thức chính được sử dụng bởi tin tặc để phát tán phần mềm độc hại: gửi nó qua email. Một số virus phổ biến nhất đã sinh sôi nảy nở thông qua các tệp đính kèm trong email, với việc người dùng bấm nhầm vào để tải xuống phần mềm độc hại. Email vẫn được sử dụng như một phương pháp phân phối phần mềm độc hại, hiện nay hình thức này đã chuyển từ các tệp đính kèm sang các liên kết nhúng đưa người dùng đến một trang web độc hại.


### 2. Phishing Attack
Phishing là hình thức lừa đảo nhằm lấy được các thông tin nhạy cảm của người dùng mạng internet như tài khoản, mật khẩu hay số thẻ tín dụng… bằng cách giả mạo một tổ chức đáng tin cậy trong giao dịch điện tử. Các tổ chức bị giả mạo thường là ngân hàng, hệ thống thanh toán trực tuyến hay các mạng xã hội phổ biến.

Mục tiêu của kẻ tấn công thường là những người dùng “ngây thơ”. Họ thường không có ý thức cảnh giác về kiểm tra nguồn thông tin mình nhận được. Kẻ tấn công thường sử dụng email hoặc các tin nhắn nhanh để gửi đến người dùng với nội dung là yêu cầu xác thức thông tin ở các website có địa chỉ đi kèm. Những website này được xây dựng với giao diện giống với các website thật và nếu người dùng nhập thông tin vào thì những thông tin này sẽ tới tay của kẻ tấn công.

### 3. Spam Attack:

SPAM là những email không được sự cho phép của người nhận (Unsolicited email) được gửi đi với số lượng lớn tới hòm thư của người dùng Internet. SPAM đôi khi còn được xem là những email thương mại không được sự cho phép của người nhận (UCE - Unsocilited Commercial E-Mail).. 

### 4. Denial of Service Attack:

Một cuộc tấn công từ chối dịch vụ xảy ra khi tin tặc gửi vô số email đến ứng dụng email của bạn nhằm ngăn chặn bạn sử dụng ứng dụng email của bạn hoặc làm hỏng máy tính của bạn hoàn toàn.

# Các Kỹ Thuật Điều Tra Email
### 1. Header Analysis

Dữ liệu meta trong thông điệp email dưới dạng thông tin kiểm soát được, Tức là các tiêu đề trong nội dung thư có chứa thông tin về người gửi hoặc là đường dẫn mà thư đã đi qua. Một trong số này có thể bị giả mạo để che giấu danh tính của người gửi. Một phân tích chi tiết về tiêu đề email có thể sẽ đem lại manh mối.

### 2. Bait Tactics

Đây là kiểu điều tra dịch ra có thể hiều là mồ nhử, điều tra viên bằng một cách nào đó sẽ gửi email có đính kèm thẻ “<img src>” mà src sẽ là đường link đến một máy chủ theo dõi nào đó. Khi e-mail được mở, một mục nhật ký chứa địa chỉ IP của người nhận (người gửi e-mail đang được điều tra) được ghi lại trên máy chủ http lưu trữ và do đó người gửi được theo dõi. Tuy nhiên, nếu người nhận (người gửi email đang được điều tra) đang sử dụng máy chủ proxy thì địa chỉ IP của máy chủ proxy sẽ được ghi lại. Nhật ký trên máy chủ proxy có thể được sử dụng để theo dõi người gửi e-mail đang được điều tra. Nếu vì lý do nào đó, nhật ký máy chủ proxy không khả dụng thì các nhà điều tra có thể gửi email chiến thuật khác có chứa a) Ứng dụng Java nhúng chạy trên máy tính của máy thu nhận hoặc b) trang HTML với Active X Object. Cả hai đều nhằm mục đích trích xuất địa chỉ IP của máy tính nhận máy tính và gửi e-mail cho các nhà điều tra.

### 3. Server Investigation
Kỹ thuật điều tra máy chủ, máy chủ sẽ thường lưu lại các bản sao email đã gửi và nhận trong nhật ký của mình. Từ đây ta có thể thanh lọc ra các thông tin cần thiết. Tuy nhiên do nhật ký server thường lưu trữ các bản sao email trong một khoảng thời gian giới hạn nên vấn đề thời gian là rất quan trọng. Nếu không nhanh chóng lấy được nhật ký cần thiết chúng sẽ bị  server xóa bỏ đi mất và thứ hai là lượng bản sao mới sẽ rất nhiều dẫn đến khó điều tra.

### 4. Software Embedded Identifiers
Một số thông tin về người tạo email hoặc thông tin đính kèm có thể có trong email do các phần mềm soạn thảo email để lại. Thông tin này có thể được xuất hiện ở header hoặc dưới dạng nội dung MIME như là Transport Neutral Encapsulation Format (TNEF). Điều tra các thông tin đó có thể sẽ giúp các điều tra viên thu thập thêm bằng chứng phía client. Cuộc điều tra có thể tiết lộ tên tệp PST, username, địa chỉ MAC, v.v. của client đã gửi email.

# Truy Xuất Nguồn Gốc Email Bằng Header
Như kể trên thì có rất nhiều kỹ thuật để điều tra email nhưng trong phần này mình sẽ đi chi tiết một kỹ thuật đó là truy xuất nguồn gốc email dự trên phân tích header
### Cách thức truy xuất nguồn gốc

Bạn có thể truy xuất được địa chỉ email bằng cách phân tích kỹ tiêu đề đầy đủ của email. Tiêu đề email chứa thông tin định tuyến (routing information) và siêu dữ liệu email (email metadata). Đây là những thông tin mà đa số người dùng thường bỏ qua hoặc không để ý đến nhưng chúng lại đóng vai trò rất quan trọng trong việc truy tìm nguồn gốc của email.

Hầu hết các ứng dụng email đều không hiển thị đầy đủ tiêu đề email tiêu chuẩn vì tiêu đề này chứa đầy những dữ liệu kỹ thuật mang tính hơi chuyên ngành một chút và chỉ khiến những người dùng phổ thông thêm rối mắt hơn mà thôi. Tuy nhiên, hầu hết các ứng dụng email đều hỗ trợ tính năng kiểm tra tiêu đề email đầy đủ:

- Để xem tiêu đề email đầy đủ trong **Gmail**: Mở tài khoản Gmail của bạn, sau đó mở email bạn muốn truy xuất nguồn gốc. Di chuyển đến thanh menu cuộn ở góc trên cùng bên phải, sau đó chọn mục hiển thị bản gốc **(Show original)**.

![](https://images.viblo.asia/663d6fbd-371f-4f20-b9b7-5c6be2d5fd69.png)

![](https://images.viblo.asia/117a6ffc-fd82-4e4e-96ba-0b0eebea9c75.png)


- Xem tiêu đề email đầy đủ trong **Outlook**: Nhấp đúp vào email bạn muốn truy xuất nguồn gốc, sau đó vào **File** chọn **Properties**. Thông tin xuất hiện trong tiêu đề internet **(internet headers)**.

- Xem tiêu đề email đầy đủ trong **Apple Mail:** Mở email bạn muốn theo dõi, sau đó di chuyển chuyển đến **View > Message > Raw Source**.

Có rất nhiều thông tin được hiển thị trong một tiêu đề email đầy đủ, nhưng bạn chỉ cần chú ý những điều sau: Bạn đọc theo trình tự từ dưới lên trên, từ thông tin cũ đến thông tin mới (có nghĩa là thông tin cũ nhất sẽ ở dưới cùng). Hãy cùng xem một tiêu đề email mẫu lấy từ tài khoản Gmail trên trang MakeUseOf:

![](https://images.viblo.asia/8a3439ca-ad9c-475c-8900-596f15c06832.jpg)

### Các thành phần trong header
Dưới đây là ý nghĩa của các nội dung được hiển thị trong một tiêu đề Gmail đầy đủ (đọc từ dưới lên trên):

- **Reply-To**: Địa chỉ email bạn gửi phản hồi tới.

- **From**: Hiển thị người gửi tin nhắn, thông tin này rất dễ bị giả mạo.

- **Content type**: Cung cấp thông tin cho trình duyệt hoặc ứng dụng email của bạn biết cách diễn giải nội dung của email. Các bộ ký tự phổ biến nhất là UTF-8 (xem trong ví dụ) và ISO-8859-1.

- **MIME-Version**: Hiển thi tiêu chuẩn định dạng mà email đang sử dụng. MIME-Version thường là “1.0”.

- **Subject**: Chủ đề của nội dung email.

- **To**: Người dự định sẽ nhận của email, có thể hiển thị thêm các địa chỉ người nhận khác nữa.

- **DKIM-Signature**: DomainKeys Identified Mail, xác thực tên miền mà email được gửi đi và giúp chống gian lận email và lừa đảo người gửi.

- **Received**: Dòng “Received” liệt kê từng máy chủ mà email di chuyển qua trước khi được gửi tới hộp thư đến của bạn. Bạn đọc dòng “Received” từ dưới lên trên; dòng dưới cùng là người khởi tạo email.

- **Authentication-Results**: Chứa hồ sơ kiểm tra xác thực đã được thực hiện; có thể chứa nhiều phương thức xác thực khác nhau.

- **Received-SPF**: The Sender Policy Framework (SPF) cấu thành một phần của quy trình xác thực email nhằm ngăn chặn hành vi giả mạo địa chỉ người gửi.

- **Return-Path**: Vị trí của các thư không gửi hoặc bị gửi trả lại.

- **ARC-Authentication-Results**: The Authenticated Receive Chain, là một tiêu chuẩn xác thực khác, ARC xác minh danh tính của các trung gian tiếp nhận email và máy chủ chuyển tiếp email của bạn cho đến đích cuối cùng là hộp thư đến của người nhận.

- **ARC-Message-Signature**: Ký hiệu ghi lại thông tin tiêu đề thư để xác thực, tương tự như DKIM.

- **ARC-Seal**: Có thể coi như là "Con dấu" cho kết quả xác thực ARC-Message-Signature, tương tự như DKIM.

- **X-Received**: Khác với “Received” ở chỗ nó được coi là thông tin phi tiêu chuẩn; có nghĩa là đó có thể không phải là địa chỉ cố định, chẳng hạn như transfer agent hoặc máy chủ SMTP của Gmail.

- **X-Google-Smtp-Source**: Hiển thị email đang được chuyển bằng cách sử dụng máy chủ SMTP của Gmail.

- **Delivered-To**: Người nhận cuối cùng của email này.

### Địa chỉ ip gốc nơi email được gửi đi

Để truy xuất được địa chỉ IP của người gửi email, hãy chú ý đến “Received” đầu tiên trong tiêu đề email đầy đủ. Bên cạnh dòng “Received” đầu tiên chính là địa chỉ IP của máy chủ đã gửi email. Đôi khi, nội dung này hiển thị dưới dạng X-Originating-IP hoặc Original-IP.

Tìm địa chỉ IP, sau đó di chuyển đến trang **[MX Toolbox](https://mxtoolbox.com/)**. Nhập địa chỉ IP này vào trong hộp thoại, thay đổi phương thức tìm kiếm thành **Reverse Lookup**, sau đó nhấn enter. Kết quả tìm kiếm sẽ hiển thị nhiều thông tin liên quan đến máy chủ gửi email đi.

![](https://images.viblo.asia/14c7bb40-f706-43a3-92b7-f9a5083360e6.png)

Trừ khi địa chỉ IP gốc là một địa chỉ IP riêng tư, còn không, bạn sẽ nhận được thông báo sau:

![](https://images.viblo.asia/be1188dd-631b-45b9-9217-d949f316e495.jpg)

Miền IP **10.0.0.0-10.255.255.255, 172.16.00-172.31.255.255, 192.168.0.0-192.168.255.255** và **224.0.0.0-239.255.255.255** là các miền IP riêng tư. Sẽ không có bất kỳ kết quả nào được trả về khi bạn tra cứu các địa chỉ IP này.

### Các công cụ hữu ích trong phân tích header email và truy xuất địa chỉ IP
Bạn có thể sử dụng một số công cụ sau để phân tích tiêu đề email:

- **[GSuite Toolbox Messageheader](https://toolbox.googleapps.com/apps/messageheader/analyzeheader)**
- **[MX Toolbox Email Header Analyzer](https://mxtoolbox.com/EmailHeaders.aspx)**
- **[IP-Address Email Header Trace](https://www.ip-adress.com/trace-email-address)** (phân tích được cả tiêu đề email lẫn truy xuất địa chỉ IP gửi email)

Tuy nhiên đôi khi kết quả trả về không phải lúc nào cũng phù hợp. Trong ví dụ dưới đây, người gửi không ở gần vị trí được trả về là Ashburn, Virginia:

![](https://images.viblo.asia/23e642f5-c2c0-47e2-8599-6b1cdf64efef.jpg)

# Kết Luận
Phân tích điều tra kỹ thuật số là một quá trình phức tạp và tốn thời gian. Vì email có thể chứa thông tin có giá trị dẫn các nhà điều tra đến danh tính hoặc vị trí của kẻ phạm tội.Trong bài viết này, chúng ta đã thảo luận về các vấn đề chính liên quan đến điều tra phân tích header của email. Và phần cuối là giới thiệu một cách đơn giản để truy xuất địa chỉ IP bằng cách sử dụng các công cụ có sẵn. Cảm ơn các bạn đã chú ý đón đọc, rất vui và hẹn gặp lại trong các bài viết tiếp theo.