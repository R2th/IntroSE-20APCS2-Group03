Sau một loạy bài về Nginx, mình đọc được khá nhiều lần về Proxy, Reverse Proxy, Proxy server. Và để đi giải thích cho những thuật ngữ đấy là gì thì hôm nay mình sẽ viết về Proxy server. Bước vào con đường với nhiều thức cần tìm hiểu làm mình cũng có tí hứng thú cũng như tò mò hơn :cry: Chúng ta bắt đầu thôi nào (đây là bài cuối cùng của mình trong chuỗi sự kiện [Viblo May Fest](https://viblo.asia/announcements/chinh-thuc-khoi-dong-viblo-may-fest-2020-bo-sung-giai-thuong-community-award-m68Z0QOMlkG), sau đấy thì chưa biết khi nào :smile: ).

# Proxy là gì ?
> Proxy là một Internet server làm nhiệm vụ chuyển tiếp thông tin và kiểm soát tạo sự an toàn cho việc truy cập Internet của các máy khách, còn gọi là khách hàng sử dụng dịch vụ Internet. Trạm cài đặt proxy gọi là proxy server. Proxy hay trạm cài đặt proxy có địa chỉ IP và một cổng truy cập cố định. 
> 
> Nguồn: https://vi.wikipedia.org/wiki/M%C3%A1y_ch%E1%BB%A7_proxy
> 
Proxy server chính là một cửa ngõ giữa bạn và Internet. Nó tách người dùng cuối khỏi các trang web. Proxy server cung cấp các mức độ khác nhau về chức năng, bảo mật và quyền riêng tư tùy thuộc vào trường hợp sử dụng, nhu cầu hoặc chính sách của công ty. 

Nếu bạn sử dụng proxy server, lưu lượng truy cập Internet sẽ đi qua proxy server trên đường đến địa chỉ mà bạn yêu cầu. Sau đó thì phản hồi sẽ được nhận thông qua proxy server và chuyển tiếp đến cho bạn. 

Tuy nhiên, proxy server còn làm được nhiều việc hơn là chuyển tiếp các yêu cầu web, nó còn có khả năng bảo mật dữ liệu cũng như cho hiệu suất cao hơn. Proxy server hoạt động như một firewall và bộ lọc web, cung cấp các kết nối mạng được chia sẻ và dữ liệu bộ đệm để tăng tốc các yêu cầu chung. Một proxy server tốt chính là nó giúp người dùng và mạng nội bộ được bảo vệ khỏi những nguy cơ tồn tại trong mạng Internet. Ngoài ra, nó cũng cung cấp một mức độ riêng tư cao.

# Proxy server hoạt động như thế nào ?
![](https://images.viblo.asia/5bb9830d-184c-4aea-ba9e-a5e77f742444.png)

Mọi thiết bị hay phần mềm trên Internet thường thuộc vào một trong hai vai trò: client hoặc server. Client có thể là trình duyệt web. Khi bạn truy cập trang wev với trình duyệt chính là bạn gửi yêu cầu đến web server của trang web đó.

Máy chủ tiếp nhận yêu cầu và sau đó phản hồi với dữ liệu được yêu cầu. Ở sau mỗi trang web chính là một máy chủ hoặc một nhóm máy chủ với nhiệm vụ cung cấp trang web đến trình duyệt của bạn. 

Nếu không có proxy thì máy tính của bạn chính là đang giao tiếp trực tiếp với các web server. Tất cả các trang web giao tiếp với trình duyệt của bạn có thể nhìn thấy máy tính của bạn và liên lạc trực tiếp với nó. 

Proxy server ở trước một máy khách hoặc một mạng lưới máy khách và xử lý lưu lượng này. Proxy server là một máy tính khác kết nối với Internet và máy tính của bạn và nó có địa chỉ IP riêng. Máy tính của bạn chỉ nói chuyện với proxy và nó chuyển tất cả các giao tiếp đến với Internet. 

Một khi Internet đưa ra phản hồi thì proxy sẽ chuyển những thông tin đấy đến máy tính của bạn. Nhiều proxy có khả năng che giấu IP máy tính của bạn để các trang web bạn truy cập không thể biết bạn thực sự là ai :smiley: . Bằng cách kết nối với một proxy có địa chỉ IP ở một nơi nào đó trên thế giới, bạn có thể thay đổi vị trí địa lý của bạn trên Internet.

# Lợi ích của việc sử dụng proxy server
* **Điều khiển:** Có nhiều nguy cơ tiềm ẩn trên Internet. Và việc sử dụng proxy server để lọc nội dung có thể giúp đỡ bạn.
* **Riêng tư:** Các cá nhân và tổ chức đều sử dụng proxy server để duyệt Internet một cách riêng tư. Một số proxy server sẽ thay đổi IP và thông tin nhận dạng mà yêu cầu gửi lên. Điều này làm cho máy chủ đích không nhận biết thực sự là ai đưa ra yêu cầu, giúp cho thông tin cá nhân và thói quen duyệt web của bạn được riêng tư hơn.
* **Tiết kiệm băng thông và tăng tốc độ:** Bằng việc sử dụng một proxy server tốt thì các tổ chức có thể có hiệu suất mạng tổng tốt hơn. Proxy server có thể lưu trữ các trang web phổ biến. 
* **Bảo mật:** Bạn có thể định cấu hình proxy server để mã hóa các yêu cầu web tránh những thứ tò mò đến hoạt động của bạn. Bạn cũng có thể ngăn các trang web hay phần mềm độc hại mà bạn đã biết không cho phép truy cập thông qua proxy server. Ngoài ra, các tổ chức có thể kết nối proxy server của họ với VPN, vì vậy người dùng từ xa luôn truy cập Internet thông qua proxy của công ty. VPN là một kết nối trực tiếp đến mạng công ty mà các công ty cung cấp cho người dùng bên ngoài hoặc từ xa. Bằng việc sử dụng VPN, công ty có thể kiểm soát và xác minh người dùng của họ có quyền truy cập vào tài nguyên mà họ cần, đồng thời cung cấp kết nối an toàn cho người dùng để bảo vệ dữ liệu công ty.
* **Truy cập vào nội dung bị chặn:** Proxy server cho phép người dùng tránh cách nội dung hạn chế do công ty, tổ chức quy định. tuy nhiên, với một proxy có khả năng thay đổi địa chỉ IP thì chúng có thể truy cập bằng cách thay đổi vị trí địa lý của bạn, và vì vậy bạn không còn bị chặn nữa :). 

# Rủi ro khi sử dụng proxy server
* **Không ổn định:** Đặc biệt đối với proxy miễn phí không được biết đến với hiệu suất cao. Chúng ta cần chỉ bị trong trường hợp bị ngắt kết nối đột ngột hoặc gián đoạn dịch vụ.
* **Tốc độ chậm:** Caching proxy cải thiện thời gian tải cho các trang web được lưu trữ trước đó. Tuy nhiên nếu không như vậy thì proxy sẽ làm chậm kết nối của bạn.
* **Bảo mật hạn chế:** Mặc dù proxy có thể ẩn địa chỉ IP và tường lửa, tuy nhiên một số chúng không mã hóa lưu lượng truy cập của bạn. Ví dụ: Bạn kết nối với proxy qua mạng không dây. Một người dùng khác trên mạng đó có thể có thể đang lắng nghe hoạt động của bạn. Điều này có thể thực hiện với một VPN. 
* **Chức năng hạn chế:** Proxy hoạt động trên cơ sở từng ứng dụng và bạn có thể chỉ cần đặt một proxy để áp dụng cho toàn bộ thiết bị của mình.

# Các loại proxy server
* **Transparent poxy:** Là một máy chủ nằm giữa máy tính của bạn và Internet có nhiệm vụ chuyển hướng các yêu cầu và phản hồi mà không có bất kỳ sự sửa đổi nào. 
* **Anonymous proxy:** Là loại tự nhận là proxy, nhưng nó sẽ không chuyển địa chỉ IP của bạn đến trang web giúp cho việc ngăn chặn hành vi đánh cắp thông tin danh tính và thói quen duyệt web của bạn. Chúng có thể ngăn trang web phục vụ bạn cách nội dung quảng cáo nhắm đến vị trí của bạn. 
* **Distorting proxy:** Nó gần giống với anonymous proxy nhưng bằng cách chuyển địa chỉ IP sai làm cho bạn có thể xuất hiện từ một vị trí khác để tránh các hạn chế về nội dung truy cập.
* **High Anonymity proxy:** Nó liên tục thay đổi định kỳ địa chỉ IP hiển thị cho web server, khiến cho việc theo dõi truy cập thuộc về ai khó khăn hơn. 

# Kết luận
Bài viết đã giới thiệu cơ bản về proxy server cũng như ưu, nhược điểm khi sử dụng nó. Mong rằng bạn sẽ sử dụng nó một cách thông minh nhất để có thể phục vụ nhu cầu và mang lại hiệu quả cao nhất. Cảm ơn bạn đã đọc bài. Mình vẫn còn nhiều sai sót mong được bỏ qua :bowing_woman: .