Trong bài viết này chúng ta cùng tìm hiểu xem thực hư mấy bọn máy tính làm thế nào để "**nói chuyện**" với nhau qua internet.

# What is IP - the Internet Addresses
- Chúng ta có thể hiểu, IP như là địa chỉ "nhà" của chúng ta vậy, để đến được nhà ai đó, thì chúng ta cần biết địa chỉ của họ, tương tự như vậy, để có thể "nói chuyện" với một máy tính nào đó, chúng ta cần biết địa chỉ IP của máy tính đó
- Vì Internet là một mạng toàn cầu gồm các máy tính nên mỗi máy tính được kết nối với Internet phải có **một địa chỉ duy nhất**
- Địa chỉ này có dạng **xxx.xxx.xxx.xxx** trong đó **xxx** phải là một số từ **0 - 255**. Địa chỉ này được gọi là địa chỉ IP
- IP = Internet Protocol

Hình bên dưới minh họa hai máy tính được kết nối Internet; máy tính của bạn có địa chỉ IP **1.2.3.4** và một máy tính khác có địa chỉ IP **5.6.7.8**. Internet được biểu diễn như một đối tượng trừu tượng ở giữa.


![how-internet-work-1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341538063/fVklu5brf.png)

Nếu bạn kết nối với Internet thông qua Nhà cung cấp dịch vụ Internet (**ISP**), ví dụ như Vietel, FPT, …, bạn thường được chỉ định một địa chỉ **IP tạm thời trong suốt phiên** truy cập của mình. Nếu bạn kết nối Internet từ mạng cục bộ (**LAN**), máy tính của bạn có thể có **địa chỉ IP cố định** hoặc **có thể lấy địa chỉ IP tạm thời** từ máy chủ **DHCP (Giao thức cấu hình máy chủ động)**. Trong mọi trường hợp, nếu bạn được kết nối với Internet, máy tính của bạn có **một địa chỉ IP duy nhất**.

# **Protocol Stacks and Packets - Ngăn xếp giao thức và gói**

Làm thế nào để nó '**nói chuyện**' với các máy tính khác được kết nối Internet?

Chúng ta cùng đi vào ví dụ cụ thể: 

- Giả sử địa chỉ IP của bạn là 1.2.3.4 và bạn muốn gửi tin nhắn đến máy tính 5.6.7.8.
Thông báo bạn muốn gửi là "Xin chào máy tính 5.6.7.8!".
- Rõ ràng, thông điệp phải được truyền qua bất kỳ loại dây nào kết nối máy tính của bạn với Internet.
- Giả sử bạn đã gọi đến **ISP** của mình từ nhà và tin nhắn phải được truyền qua đường dây điện thoại.
- Do đó, thông điệp phải được **dịch từ văn bản chữ cái thành tín hiệu điện tử,** truyền qua Internet, sau đó **dịch ngược lại thành văn bản chữ cái**.
- Làm thế nào điều này được hoàn thành? Thông qua việc sử dụng một ngăn xếp giao thức (**protocol stack**). Mỗi máy tính cần một giao thức để giao tiếp trên Internet và nó thường được tích hợp sẵn trong **hệ điều hành** của máy tính (tức là Windows, Unix, v.v.).
Ngăn xếp giao thức (**protocol stack)** được sử dụng trên Internet được gọi là ngăn xếp giao thức **TCP / IP** vì hai giao thức truyền thông chính được sử dụng.
- Giao thức TCP/IP được miêu tả như sau

| Protocol Layer | Comments |
| --- | --- |
| Application Protocols Layer | Protocols specific to applications such as WWW, e-mail, FTP, etc.  - Các giao thức dành riêng cho các ứng dụng như WWW, e-mail, FTP, v.v. |
| Transmission Control Protocol Layer | TCP directs packets to a specific application on a computer using a port number. - TCP chuyển hướng các gói tin đến một ứng dụng cụ thể trên máy tính bằng cách sử dụng số cổng (port number). |
| Internet Protocol Layer | IP directs packets to a specific computer using an IP address. - IP chuyển hướng các gói đến một máy tính cụ thể bằng địa chỉ IP. |
| Hardware Layer | Converts binary packet data to network signals and back.(E.g. ethernet network card, modem for phone lines, etc.) - Chuyển đổi dữ liệu gói nhị phân thành tín hiệu mạng và ngược lại. |
- Như vậy thông báo "Xin chào máy tính 5.6.7.8!" lấy từ máy tính của chúng ta đến máy tính có địa chỉ IP 5.6.7.8, nó sẽ xảy ra một như sau:


![how-internet-work-2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341702964/_RiQQ6CqI.png)

1. Thông báo sẽ bắt đầu ở đầu ngăn xếp giao thức trên máy tính của bạn và hoạt động theo chiều hướng xuống dưới.
2. Nếu tin nhắn được gửi dài, mỗi lớp ngăn xếp mà tin nhắn đi qua có thể chia tin nhắn thành những phần dữ liệu nhỏ hơn. Điều này là do dữ liệu được gửi qua Internet (và hầu hết các mạng máy tính) được gửi theo các phần có thể quản lý được. Trên Internet, những phần dữ liệu này được gọi là **packets**.
3. Các **packets** sẽ đi qua Application Layer và tiếp tục đến TCP layer. Mỗi **packets** được gán một **port number**. Các **ports** sẽ được giải thích sau, nhưng đủ để nói rằng nhiều chương trình có thể đang sử dụng TCP/IP stack và gửi thông báo. Chúng ta cần biết chương trình nào trên máy tính đích cần nhận thông báo,  vì nó sẽ **lắng nghe** trên một **port (cổng) cụ thể**.
4. Sau khi đi qua TCP layer, các packets tiến tới IP layer. Đây là nơi mỗi packet nhận được địa chỉ đích của nó, 5.6.7.8.
5. Bây giờ các packets (gói tin nhắn) của chúng ta đã có số cổng và địa chỉ IP, chúng đã sẵn sàng để gửi qua Internet. Hardware layer đảm nhận việc chuyển các gói tin chứa văn bản chữ trong tin nhắn của chúng ta thành các tín hiệu điện tử và truyền chúng qua đường dây mạng.
6. Ở đầu bên kia của đường dây mạng ISP của bạn có kết nối trực tiếp với Internet. ISPs **router (bộ định tuyến)** kiểm tra địa chỉ đích trong mỗi gói và xác định nơi gửi nó. Thông thường, điểm dừng tiếp theo của gói tin là một bộ định tuyến khác. (Chúng ta sẽ nói về router ở phần sau)
7. Cuối cùng, các gói tin đến được máy tính có địa chỉ IP là 5.6.7.8. Tại đây, các gói bắt đầu ở cuối TCP/IP stack của máy tính đích và đi lên.
8. Khi các gói tin đi lên trên qua ngăn xếp, tất cả dữ liệu định tuyến mà ngăn xếp của máy tính gửi được thêm vào (chẳng hạn như địa chỉ IP và port number) sẽ bị loại bỏ khỏi các gói.
9. Khi dữ liệu lên đến đỉnh của ngăn xếp, các gói tin đã được tập hợp lại thành dạng ban đầu, "Xin chào máy tính 5.6.7.8!”

# **Networking Infrastructure - Cơ sở hạ tầng mạng**


![how-internet-work-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341795319/FvZCxie3Z.png )
Sơ đồ bên trên là chi tiết của sở đồ ban đầu, chúng ta đã thấy từng thành phần rõ ràng hơn. Dưới đây là một số giải thích chi tiết hơn cho sơ đồ trên

- ISP duy trì các **modems** cho khách hàng trong quá trình kết nối của họ. Điều này được quản lý bởi một số dạng máy tính (thường là máy tính chuyên dụng) điều khiển luồng dữ liệu từ modem pool đến đường trục (backbone) hoặc bộ định tuyến (router) đường truyền chuyên dụng. Thiết lập này có thể được coi là một **port máy chủ**, vì nó **phục vụ** quyền truy cập vào mạng. Thông tin thanh toán và sử dụng cũng thường được thu thập ở đây.
- Sau khi các gói của bạn truyền qua mạng và thiết bị cục bộ của ISP, chúng được chuyển đến đường trục (backbone) của ISP hoặc đường trục mà ISP mua băng thông. Từ đây, các gói thường sẽ di chuyển qua một số bộ định tuyến và qua một số đường trục, đường dây chuyên dụng và các mạng khác cho đến khi chúng tìm thấy đích của chúng, máy tính có địa chỉ 5.6.7.8. Và trong thực tế có nhiều cách để có thể kiểm tra đường di chuyển của các gói tin qua các ứng dụng đặc thù.

# **Internet Infrastructure - Cơ sở hạ tầng của Internet**

![how-internet-work-4.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341924693/Y4v3LKF9N.png )

- Đường trục Internet được tạo thành từ nhiều mạng lớn kết nối với nhau.
- Các mạng lớn này được gọi là Nhà cung cấp dịch vụ mạng - **Network Service Providers (NSP)**. Một số NSP lớn là UUNet, CerfNet, IBM, BBN Planet, SprintNet, PSINet, cũng như các NSP khác.
- Các mạng này ngang hàng với nhau để trao đổi lưu lượng packet. Mỗi NSP được yêu cầu kết nối với ba Điểm truy cập mạng - **Network Access Points(NAP).** Tại các NAP, lưu lượng gói có thể nhảy từ đường trục của NSP này sang đường trục của NSP khác. Các NSP cũng kết nối với nhau tại các **Metropolitan Area Exchanges (MAEs)**.
- MAE phục vụ cùng mục đích như NAP nhưng thuộc sở hữu tư nhân. NAP là điểm kết nối Internet ban đầu. Cả NAP và MAE đều được gọi là Điểm trao đổi Internet hoặc **IXs**. NSP cũng bán băng thông cho các mạng nhỏ hơn, chẳng hạn như ISP và các nhà cung cấp băng thông nhỏ hơn

Sơ đồ bên trên không phải là sự trình bày thực sự của một phần thực tế của Internet. Sơ đồ trên chỉ nhằm chứng minh cách các **NSP có thể kết nối với nhau và các ISP** nhỏ hơn.

Không có thành phần mạng vật lý nào được thể hiện trong sơ đồ trên. Điều này là do cơ sở hạ tầng đường trục (backbone) của một NSP đơn lẻ là một bản vẽ phức tạp. Hầu hết các NSP xuất bản bản đồ về cơ sở hạ tầng mạng của họ trên các trang web của họ và có thể được tìm thấy dễ dàng. Để vẽ một bản đồ thực tế của Internet gần như không thể do kích thước, độ phức tạp và cấu trúc luôn thay đổi của nó.

# **The Internet Routing Hierarchy - Hệ thống phân cấp định tuyến internet**

Vậy làm thế nào để các gói tin tìm đường qua Internet? Mỗi máy tính kết nối Internet có biết các máy tính khác đang ở đâu không? Các gói tin có đơn giản được **'phát sóng' (broadcast)** tới mọi máy tính trên Internet không? Câu trả lời cho cả hai câu hỏi trước là **'không'.** Không máy tính nào biết bất kỳ máy tính nào khác đang ở đâu và các gói tin không được gửi đến mọi máy tính. Thông tin được sử dụng để đưa các gói đến đích của chúng được chứa trong các bảng định tuyến được giữ bởi mỗi bộ định tuyến kết nối với Internet.

**Routers are packet switches -** Bộ định tuyến là bộ chuyển mạch gói. Một bộ định tuyến thường được kết nối giữa các mạng để định tuyến các packets giữa chúng. Mỗi bộ định tuyến biết về các mạng con của nó và địa chỉ IP nào chúng sử dụng. Bộ định tuyến thường không biết địa chỉ IP nào nằm trên nó.

Nhìn hình bên dưới, chúng ta có thể thấy các hộp đen kết nối các đường trục (backbone) là các bộ định tuyến. Các đường trục (backbone) NSP lớn hơn ở trên cùng được kết nối với một NAP. Dưới chúng là một số mạng con và bên dưới chúng là nhiều mạng con hơn. Ở dưới cùng là hai mạng cục bộ có gắn máy tính.

![how-internet-work-5.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341841877/dYCPUPJso.png )

Khi một gói tin đến một bộ định tuyến, bộ định tuyến sẽ kiểm tra địa chỉ IP được đặt ở đó bởi IP protocol layer trên máy tính gốc.

Bộ định tuyến sẽ kiểm tra bảng định tuyến của nó. Nếu mạng chứa địa chỉ IP được tìm thấy, gói tin sẽ được gửi đến mạng đó. Nếu mạng chứa địa chỉ IP không được tìm thấy, thì bộ định tuyến sẽ gửi gói tin trên một tuyến đường mặc định, thường là theo hệ thống phân cấp đường trục (backbone) đến bộ định tuyến tiếp theo.

Hy vọng rằng bộ định tuyến tiếp theo sẽ biết nơi để gửi gói tin. Nếu không, gói tin lại được chuyển hướng lên trên cho đến khi nó đến đường trục (backbone) NSP. Các bộ định tuyến được kết nối với đường trục (backbone) NSP giữ các bảng định tuyến lớn nhất và tại đây gói tin sẽ được chuyển đến đường trục (backbone) chính xác, nơi nó sẽ bắt đầu hành trình **'đi xuống'** qua các mạng nhỏ hơn và nhỏ hơn cho đến khi nó tìm thấy điểm đến.

# **Domain Names and Address Resolution - Tên miền và cách phân giải địa chỉ**

Nhưng điều gì sẽ xảy ra nếu bạn không biết địa chỉ IP của máy tính bạn muốn kết nối? Điều gì xảy ra nếu bạn cần truy cập vào một máy chủ web được gọi là [https://hoangpn.com/](https://hoangpn.com/) Làm thế nào để trình duyệt web của bạn biết máy tính này **sống** ở đâu trên Internet? Câu trả lời cho tất cả những câu hỏi này là **Domain Name Service - DNS**. **DNS là một cơ sở dữ liệu phân tán theo dõi tên máy tính và địa chỉ IP tương ứng của chúng trên Internet**

Nhiều máy tính được kết nối với Internet lưu trữ một phần cơ sở dữ liệu của DNS và phần mềm cho phép người khác truy cập nó. Những máy tính này được gọi là **máy chủ DNS**. Không có máy chủ DNS nào chứa toàn bộ cơ sở dữ liệu; chúng chỉ chứa một tập hợp con của nó. Nếu máy chủ DNS không chứa tên miền được yêu cầu bởi máy tính khác, máy chủ DNS sẽ **chuyển hướng** máy tính yêu cầu đến máy chủ DNS khác.

![how-internet-work-6.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341868879/ITSd4VgMe.png )

Dịch vụ tên miền được cấu trúc dưới dạng phân cấp tương tự như phân cấp định tuyến IP. Máy tính yêu cầu phân giải tên sẽ được chuyển hướng **'lên'** hệ thống phân cấp cho đến khi tìm thấy máy chủ DNS có thể phân giải tên miền trong yêu cầu.

Ở hình trên, minh họa một phần của hệ thống phân cấp. Ở ngọn cây là các **domain roots**. Một số tên miền cũ hơn, phổ biến hơn được nhìn thấy ở gần đầu. Ngoài ra con có vô số máy chủ DNS trên khắp thế giới tạo thành phần còn lại của hệ thống phân cấp - những tên miền khác ví dụ như **xyz, dev**, ….

Khi kết nối Internet được thiết lập (ví dụ: đối với mạng LAN hoặc Mạng Dial-Up trong Windows), một máy chủ DNS chính và một (hoặc nhiều) máy chủ DNS phụ thường được chỉ định như một phần của quá trình cài đặt.

Bằng cách này, bất kỳ ứng dụng Internet nào cần phân giải tên miền sẽ có thể hoạt động chính xác. Ví dụ: khi bạn nhập địa chỉ web vào trình duyệt web của mình, trước tiên trình duyệt sẽ kết nối với máy chủ DNS chính của bạn. Sau khi có được địa chỉ IP cho tên miền bạn đã nhập, trình duyệt sẽ kết nối với máy tính mục tiêu và yêu cầu trang web bạn muốn.

# **Application Protocols: HTTP and the World Wide Web**

- Một trong những dịch vụ được sử dụng phổ biến nhất trên Internet là **World Wide Web (WWW)**.
- Giao thức ứng dụng làm cho web hoạt động là Giao thức truyền siêu văn bản - **Hypertext Transfer Protocol(HTTP)**.
- Đừng nhầm lẫn điều này với Ngôn ngữ đánh dấu siêu văn bản (HTML). HTML là ngôn ngữ được sử dụng để viết các trang web. HTTP là giao thức mà trình duyệt web và máy chủ web sử dụng để giao tiếp với nhau qua Internet.
- Nó là một giao thức ở tầng ứng dụng vì nó nằm trên TCP layer trong ngăn xếp giao thức và được sử dụng bởi các ứng dụng cụ thể để giao tiếp với nhau. Trong trường hợp này, các ứng dụng là trình duyệt web và máy chủ web (web browsers and web servers)
- HTTP là **một giao thức dựa trên văn bản không kết nối (connectionless).** Máy khách (trình duyệt web) gửi yêu cầu đến máy chủ web cho các phần tử web như trang web và hình ảnh. Sau khi yêu cầu được phục vụ bởi máy chủ, kết nối giữa máy khách và máy chủ trên Internet sẽ bị ngắt kết nối. Một kết nối mới phải được thực hiện cho mỗi yêu cầu. Hầu hết các giao thức được định hướng kết nối. Điều này có nghĩa là hai máy tính giao tiếp với nhau giữ cho kết nối mở qua Internet. **HTTP thì không**.

Khi bạn truy cập một URL trên trình duyệt web: 

1. Nếu URL chứa tên miền, trước tiên trình duyệt kết nối với **DNS** và truy xuất địa chỉ IP tương ứng cho máy chủ web.
2. Trình duyệt web kết nối với máy chủ web và gửi một request HTTP (thông qua ngăn xếp giao thức) cho trang web mong muốn.
3. Máy chủ web nhận yêu cầu và kiểm tra trang web muốn truy cập. Nếu trang tồn tại, máy chủ web sẽ trả về tương ứng dữ liệu. Nếu máy chủ không thể tìm thấy trang được yêu cầu, nó sẽ gửi thông báo lỗi HTTP 404. (404 có nghĩa là 'Không tìm thấy trang' như bất kỳ ai đã lướt web có thể biết.)
4. Trình duyệt web hiển thị trang web tương ứng, và kết nối bị đóng.
5. Sau đó, trình duyệt web phân tích cú pháp qua trang web và tìm kiếm các phần tử trang web khác mà nó cần để hoàn thành. Chúng thường bao gồm hình ảnh, text, v.v.
6. Đối với mỗi phần tử cần thiết, trình duyệt tạo kết nối bổ sung và các request HTTP đến máy chủ cho mỗi phần tử.
7. Khi trình duyệt tải xong tất cả hình ảnh, text, v.v., trang web sẽ được hiển thị hoàn toàn trong cửa sổ trình duyệt.

Hầu hết các giao thức Internet được chỉ định bởi các tài liệu Internet được gọi là Yêu cầu Nhận xét - **Request For Comments (RFC)**. RFC có thể được tìm thấy ở một số địa điểm trên Internet. 

HTTP version 1.0 được chỉ định bởi RFC 1945.

# **Application Protocols: SMTP and Electronic Mail**

Một dịch vụ Internet thường được sử dụng khác là thư điện tử. Thư điện tử sử dụng một giao thức cấp ứng dụng được gọi là Giao thức truyền thư đơn giản  - **Simple Mail Transfer Protocol (SMTP). SMTP** cũng là một giao thức dựa trên văn bản, nhưng không giống như **HTTP**, SMTP là định hướng kết nối. SMTP cũng phức tạp hơn HTTP. Có nhiều lệnh và quy tắc trong SMTP hơn trong HTTP.

Khi bạn mở ứng dụng email khách (mail client) để đọc e-mail, đây là điều thường xảy ra:

1. Ứng dụng email khách (Netscape Mail, Lotus Notes, Microsoft Outlook, v.v.) mở một kết nối với mail server mặc định của nó. Địa chỉ IP hoặc tên miền của mail server thường được thiết lập khi ứng dụng email khách được cài đặt.
2. Mail server sẽ luôn truyền thông điệp đầu tiên để nhận dạng chính nó.
3. Máy khách sẽ gửi một lệnh **SMTP** HELO mà máy chủ sẽ trả lời bằng một thông báo **250 OK**.
4. Tùy thuộc vào việc máy khách đang kiểm tra mail, gửi mail,… mà các lệnh SMTP thích hợp sẽ được gửi đến máy chủ, các lệnh này sẽ được phản hồi tương ứng.
5. Các request/response này sẽ tiếp tục cho đến khi khách hàng gửi lệnh SMTP QUIT. Sau đó kết nối sẽ bị đóng.

Chúng ta cùng tìm hiểu một ví dụ sau để hiểu rõ hơn: Một **cuộc trò chuyện** đơn giản giữa máy khách SMTP và máy chủ SMTP được hiển thị bên dưới. R: biểu thị các thông điệp được gửi bởi máy chủ (người nhận). S: biểu thị các thông điệp được gửi bởi máy khách (người gửi).

```
Ví dụ về SMTP này hiển thị thư do Smith gửi tại máy chủ USC-ISIF, tới
Jones, Green và Brown tại máy chủ BBN-UNIX. Ở đây chúng tôi giả định rằng
máy chủ USC-ISIF trực tiếp lưu trữ BBN-UNIX. Green - không có hộp thư tại máy chủ BBN-UNIX.
-------------------------------------------------------------

R: 220 BBN-UNIX.ARPA Simple Mail Transfer Service Ready
S: HELO USC-ISIF.ARPA
R: 250 BBN-UNIX.ARPA

S: MAIL FROM:<Smith@USC-ISIF.ARPA>
R: 250 OK

S: RCPT TO:<Jones@BBN-UNIX.ARPA>
R: 250 OK

S: RCPT TO:<Green@BBN-UNIX.ARPA>
R: 550 No such user here

S: RCPT TO:<Brown@BBN-UNIX.ARPA>
R: 250 OK

S: DATA
R: 354 Start mail input; end with <CRLF>.<CRLF>
S: Blah blah blah...
S: ...etc. etc. etc.
S: .
R: 250 OK

S: QUIT
R: 221 BBN-UNIX.ARPA Service closing transmission channel
```

SMTP được chỉ định bởi RFC 821

# **Transmission Control Protocol - Giao thức điều khiển truyền dẫn**

- Dưới Application Layer trong ngăn xếp giao thức là TCP layer.
- Khi các ứng dụng mở kết nối với một máy tính khác trên Internet, các thông điệp mà chúng gửi đi (sử dụng một giao thức ở application layer cụ thể) sẽ được chuyển xuống ngăn xếp đến TCP layer.
- TCP layer chịu trách nhiệm định tuyến các giao thức ứng dụng đến đúng ứng dụng trên máy tính đích. Để thực hiện điều này, số cổng (port number) được sử dụng.
- Các cổng (ports) có thể được coi là các kênh riêng biệt trên mỗi máy tính. Ví dụ, bạn có thể lướt web trong khi đọc e-mail. Điều này là do hai ứng dụng này (trình duyệt web và ứng dụng mail) đã sử dụng số cổng khác nhau. Khi một gói tin đến máy tính và đi lên ngăn xếp giao thức, TCP layer sẽ quyết định ứng dụng nào nhận gói tin dựa trên số cổng.

TCP hoạt động (định tuyến dữ liệu qua các layer trong ngăn xếp giao thức đến đúng ứng dụng) như sau:

- Khi TCP layer nhận được dữ liệu từ application layer, nó phân đoạn nó thành các **đoạn (chunks)** có thể quản lý được và sau đó thêm **TCP header** với thông tin TCP cụ thể vào từng **đoạn**. Thông tin có trong TCP header bao gồm số cổng của ứng dụng mà dữ liệu cần được gửi đến.
- Khi TCP layer nhận được một gói từ IP layer (bên dưới nó), TCP layer sẽ tách dữ liệu **TCP header** khỏi gói đó, thực hiện một số cấu trúc lại dữ liệu nếu cần và sau đó gửi dữ liệu đến ứng dụng chính xác bằng cách sử dụng số cổng lấy từ TCP header.

TCP **không phải là một giao thức dạng văn bản.** **TCP là một dịch vụ luồng byte, định hướng kết nối, đáng tin cậy**. Hướng kết nối có nghĩa là hai ứng dụng sử dụng TCP trước tiên phải thiết lập kết nối trước khi trao đổi dữ liệu. TCP đáng tin cậy vì đối với mỗi gói nhận được, một xác nhận được gửi đến người gửi để xác nhận việc gửi. TCP cũng bao gồm một tổng kiểm tra trong header của nó để kiểm tra lỗi dữ liệu đã nhận. TCP header chi tiết như sau:

![how-internet-work-7.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341877221/z3DIc9-yE.png )

Lưu ý rằng không có chỗ cho địa chỉ IP trong TCP header. Điều này là do TCP không biết gì về địa chỉ IP. Công việc của TCP là lấy dữ liệu ở application layer từ ứng dụng này sang ứng dụng khác một cách đáng tin cậy. Nhiệm vụ lấy dữ liệu từ máy tính sang máy tính là công việc của IP.

# **Internet Protocol - Giao thức internet**

Không giống như TCP, IP là một giao thức không có kết nối, không đáng tin cậy. IP không quan tâm liệu một gói có đến đích hay không. IP cũng không biết về các kết nối và số cổng. Công việc của IP là gửi và định tuyến các gói đến các máy tính khác. Các gói IP là các thực thể độc lập và có thể đến không đúng thứ tự hoặc không đến. Công việc của TCP là đảm bảo các gói tin đến và theo đúng thứ tự. Về điểm chung duy nhất IP với TCP là cách nó nhận dữ liệu và thêm thông tin  IP header của chính nó vào dữ liệu TCP. IP header chi tiết như sau:

![how-internet-work-8.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341984053/J6lTC2QdN.png )

Ở trên chúng ta thấy địa chỉ IP của máy tính gửi và nhận trong IP header. Dưới đây là một gói tin trông như thế nào sau khi đi qua Application layer, TCP layer, và IP layer. Dữ liệu ở  Application layer được phân đoạn trong TCP layer, TCP header được thêm vào, gói tin tiếp tục đến IP layer, IP layer được thêm vào và sau đó gói tin được truyền trên Internet.

![how-internet-work-9.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664341993059/mcN8T9i6d.png )

# Tổng kết

Ở tất cả phần trên, tôi đã trình bày cách internet hoạt động. Sẽ chẳng thể nói trước được điều gì, liệu rằng trong tương lai internet sẽ phát triển ra sao, nhưng chúng ta cần công nhận lợi ích của internet là vô cùng lớn. Để bạn chắc chắn về các kiến thức, tôi sẽ note lại một vài phần chúng ta cần chú ý dưới đây

1. What is IP
2. Protocol Stacks and Packets
3. Networking Infrastructure
4. Internet Infrastructure
5. The Internet Routing Hierarchy
6. Domain Names and Address Resolution
7. Application Protocols
    1. HTTP and the World Wide Web
    2. SMTP and Electronic Mail
8. Transmission Control Protocol (TCP)
9. Internet Protocol (IP)

Ủng hộ mình tại blog của mình nhé: https://hoangpn.com/internet-hoat-dong-nhu-the-nao
___
#bettereveryday #hoangpn