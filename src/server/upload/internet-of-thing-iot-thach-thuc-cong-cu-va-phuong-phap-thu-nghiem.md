## **Testing Internet of Thing (IoT)**

Khi 1 câu hỏi được đặt ra là “những nhu cần cần thiết cơ bản của cuộc sống là gì?, hầu hết mọi người sẽ trả lời là “thực phẩm, nơi ở, quần áo”. 

Thế nhưng điều này chỉ đúng với cuộc sống ở những thế kỷ trước mà thôi. Bởi lẽ với sự phát triển vượt bậc của công nghệ trong xã hội hiện nay thì những nhu cầu cần thiết của cuộc sống lại được định nghĩa như là cuộc sống trở lên đơn giản hơn, tốt hơn và dễ dàng hơn.

Chẳng hạn như, chúng ta dừng việc sử dụng công tắc để điều khiển đèn điện, dừng việc thanh toán ở các kiot để trả phí cầu đường, chúng ta đã đang theo dõi tình trạng sức khỏe của mình 1 cách thông minh, theo dõi chuyển động của xe cộ 1 cách hiệu quả và nhiều hơn thế nữa…

Vậy thì, chúng ta làm những điều đó như thế nào? Đầu tiên chúng ta cần hiểu những thứ này là gì, sau đó chúng ta mới có thể học cách test chúng như thế nào.

![](https://images.viblo.asia/12c957db-f36a-4035-9e94-45a1993ccc3d.jpg)

***Vậy thì câu hỏi đặt ra ở đây là “Internet of thing (IoT) là gì”???***

Hiểu 1 cách nôm na, IoT là ***mạng lưới vạn vật kết nối Internet***. Vạn vật ở đây gồm những thứ trong cuộc sống của chúng ta như phương tiện di chuyển, đồ gia dụng, thiết bị y tế sử dụng thiết bị điện tử nhúng, vi mạch, vv. Chúng kết nối với nhau để thu thập, trao đổi thông tin, dữ liệu qua mạng mà không cần đến sự tương tác trực tiếp. Nói 1 cách khác nó sẽ cho phép người dùng điều khiển từ xa mọi thứ thông qua mạng.

Một số ví dụ điển hình về IoT trong cuộc sống:
1. In wearable tech:
 ![](https://images.viblo.asia/57526529-f84b-48d6-b3cc-f62f88225211.jpg)
    Các thiết bị như vòng đeo tay sức khỏe  Fitbit bands hay đồng hồ thông minh của Apple được đồng bộ với các thiết bị di động 1 cách dễ dàng.
Những thiết bị này sẽ ghi lại những thông tin như vấn đề sức khỏe, theo dõi nhịp tim, giấc ngủ, vv. Đồng thời cũng hiển thị những dữ liệu, thông báo từ các thiết bị di động kết nối với chúng. 

2. Infrastructure and development: 

    Với việc sử dụng 1 ứng dụng như Citysense thì chúng ta có thể dễ dàng lấy được các dữ liệu về ánh sáng ngoài trời tại thời điểm thực tại và dựa trên những dữ liệu này thì đèn điện đường sẽ được ON/OFF tương ứng. Ngoài ra còn có rất nhiều các ứng dụng khác dùng để điều khiển các tín hiệu đèn giao thông và nơi đỗ xe sẵn có trong thành phố. 

3) Healthcare:

    Như chúng ta đã biết hiện nay trong các bệnh viện có rất nhiều các ứng dụng dùng để theo dõi tình trạng sức khỏe của các bệnh nhân. Dựa trên các dữ liệu chuẩn, các dịch vụ kiểm soát liều lượng thuốc vào các thời điểm khác nhau trong 1 ngày. Urosense là 1 trong những ứng dụng kiểu như thế. Urosense có nhiệm vụ theo dõi lượng chất lỏng trong cơ thể của bệnh nhân và dựa trên dữ liệu đo được sẽ biết được khi nào là thời điểm cần truyền dịch. Cùng thời điểm đó, dữ liệu cũng sẽ được chuyển tới các bên liên quan khác thông qua mạng không dây.  

## **Công nghệ sử dụng trong IoT**
* **RFID** [Radio Frequency Code] tags and **EPC** [Electronic Product Code]
* **NFC** [Near Field Communication] cho phép tương tác hai chiều giữa các thiết bị điện tử. Được sử dụng chủ yếu trong các giao dịch thanh toán để thực hiện các giao dịch thanh toán không tiếp xúc.
* **Bluetooth**: Nó được sử dụng trong các giao tiếp có phạm vi hẹp đủ để có thể nhận ngay được tín hiệu. Hầu hết nó được sử dụng trong công nghệ Wearable (như đã nói ở trên).
* **Z-Wave**: Đây là một công nghệ RF công suất thấp. Được sử dụng cho nhà tự động, điều khiển đèn, etc.
*** WiFi**: Đây là sự lựa chọn được sử dụng thông dụng nhất trong IoT. Khi trên 1 mạng LAN, nó dùng để chuyển đổi các tệp tin, dữ liệu và tin nhắn một cách liền mạch.

## **Kiểm thử IoT**

Lấy ví dụ về một hệ thống theo dõi chăm sóc sức khỏe y tế, trong đó công cụ theo dõi về sức khỏe, nhịp tim, chi tiết lượng chất lỏng và gửi báo cáo cho các bác sĩ. Các dữ liệu đó được ghi lại trong hệ thống và Có thể xem được lịch sử dữ liệu bất kỳ khi nào yêu cầu.

Các bác sĩ sẽ dựa trên dữ liệu để bổ sung chất lỏng phù hợp với cơ thể bệnh nhân. Việc này có thể được kích hoạt từ xa bằng thiết bị bất kỳ mà thiết bị y tế đã được kết nối như máy tính hoặc thiết bị di động.

![](https://images.viblo.asia/63bab33b-3b0c-4e3b-aedf-3f00817dd7aa.jpg)

Để test được 1 kiến trúc như thế, chúng ta cần thực hiện 1 số phương pháp thử nghiệm như sau:

**1)  Usability:**

* Chúng ta cần chắc chắn rằng có thể sử dụng được các device được sử dụng ở đây.
* Các thiết bị theo dõi sức khỏe được sử dụng nên có tính di động đủ để di chuyển vào các phân đoạn khác của y học.
* Các trang thiết bị phải đủ thông minh để không chỉ đẩy về notification mà còn có thể đẩy về thông báo lỗi, cảnh báo etc.
* Hệ thống phải có 1 tùy chọn ghi chép toàn bộ các sự kiện để cung cấp cho người dùng cuối 1 cách rõ ràng. Nếu không thì nên đẩy những sự kiện này vào 1 cơ sở dữ liệu để lưu trữ.
* Thông báo nên được hiển thị và việc xử lý hiển thị phải được thực hiện đúng cách trong các thiết bị [Máy tính/Thiết bị di động].
* Tính khả dụng về các mặt như hiển thị, xử lý dữ liệu, đẩy các nhiệm vụ công việc từ các thiết bị nên được kiểm tra 1 cách kỹ lưỡng.

**2) IoT Security:**
* Thách thức trong IoT Security: IoT là 1 trung tâm dữ liệu nơi mà tất cả các hệ thống, thiết bị được kết nối hoạt động dựa trên dữ liệu sẵn có.
* Khi nói tới luồng dữ liệu giữa các thiết bị, việc dữ liệu có thể bị truy cập hoặc đọc trong quá trình trao đổi dữ liệu là hoàn toàn có thể.
* Dựa trên quan điểm kiểm thử thì chúng ta cần kiểm tra xem liệu rằng dữ liệu có được mã hóa/bảo vệ trong quá trình trao đổi dữ liệu  giữa các device hay không.
* Bất kỳ là ở đâu, nếu có giao diện người dùng thì chúng ta cần chắc chắn rằng nó được bảo vệ bằng mật khẩu.

**3) Connectivity:**
*  Bởi lẽ nó là 1 giải pháp chăm sóc sức khỏe, nên việc kết nối đóng 1 vai trò rất quan trọng.
* Hệ thống phải luôn luôn sẵn sàng và phải được kết nối liền mạch với tất cả các bên liên quan.
* Đối với việc kết nối, thì sẽ có 2 điều rất quan trọng phải kiểm tra:
  1. Sự kết nối, truyền dữ liệu và việc nhận nhiệm vụ công việc từ các thiết bị phải liền mạch.
  2. Sẽ có nhiều khả năng hệ thống sẽ ngoại tuyến. Do đó chúng ta cũng cần phải kiểm tra trường kiểm tra các điều kiện ngoại tuyến. Khi hệ thống ở trong trạng thái ngoại tuyến, cần có cảnh báo nhở các bác sĩ để họ theo dõi tình trạng sức khỏe 1 cách thủ công mà không phụ thuộc vào hệ thống cho tới khi hệ thống kích hoạt trở lại. Mặt khác, cần phải có một cơ chế trong hệ thống có thể lưu trữ tất cả dữ liệu trong thời gian ngoại tuyến. Khi hệ thống trực tuyến, tất cả dữ liệu đó sẽ được truyền đi tránh mất dữ liệu trong mọi trường hợp.

**4) Performance:**
* Khi chúng ta nói về 1 hệ liên quan tới vấn đề chăm sóc sức khỏe, chúng ta cần chắc chắn rằng hệ thống đó phải có khả năng mở rộng đủ cho toàn bộ bệnh viện.
* Khi thực hiện kiểm thử, chúng ta sẽ thực hiện cho 2-10 bệnh nhân tại một thời điểm và dữ liệu được truyền đến 10-20 thiết bị.
* Tuy nhiên, khi toàn bộ bệnh viện được kết nối và 180-200 bệnh nhân được kết nối với hệ thống thì dữ liệu được truyền đi lớn hơn nhiều so với dữ liệu kiểm thử.
* Vì vậy là người kiểm thử, chúng ta cần đảm bảo rằng hệ thống dù dữ liệu có nhiều hay ít thì nó vẫn phải họat giống nhau.
* Các tiện ích giám sát để hiển thị việc sử dụng hệ thống, sử dụng điện, nhiệt độ, etc cũng nên được kiểm thử.

**5) Compatibility Testing:**
* Nhìn vào kiến trúc phức tạp của 1 hệ thống IoT thì việc kiểm thử tích hợp chắc chắn là thứ không thể bỏ qua.
* Những mục cần kiểm thử như: Các phiên bản hệ điều hành của hệ thống, các loại trình duyệt và các phiên bản tương ứng, các đời thiết bị, cách thức giao tiếp [ví dụ: Bluetooth 2.0, 3.0].

**6) Pilot Testing:**
* Chỉ thử nghiệm trong Lab đảm bảo các hệ thống/sản phẩm hoạt động tốt. Tuy nhiên, điều này có thể gây ra tác dụng xấu khi tiếp xúc với các kịch bản/các bước/các điều kiện trong thời gian thực.
* Trong quá trình thử nghiệm thí điểm, hệ thống sẽ giới hạn số lượng người dùng trong các trường thực. Họ sử dụng ứng dụng và đưa ra phản hồi về hệ thống.
* Đôi khi những nhận từ những người dùng thực sẽ giúp chúng ta cải tiến, phát triển sản phẩm tốt hơn nữa.

**7) Regulatory Testing:**
* Hãy nghĩ tới trường hợp sản phẩm đã vượt qua tất cả các bước thử nghiệm nhưng lại không vượt qua checklist tuân thủ cuối cùng [thử nghiệm được thực hiện bởi cơ quan quản lý].
* Tốt hơn là có được các yêu cầu quy định ở thời điểm bắt đầu chu trình phát triển. Tương tự như việc được làm như 1 phần của danh sách những điều cần thử nghiệm.

**8) Upgrade testing:**
* IoT là sự kết hợp của nhiều giao thức, thiết bị, hệ điều hành, phần mềm, phần cứng, tầng mạng, etc.
* Khi có sự nâng cấp về hệ thống hoặc bất kỳ mục nào liên quan như đã nêu ở trên, chúng ta cần thực hiện kiểm tra hồi quy 1 cách triệt để. Ngoài ra, khi có các vấn đề liên quan tới nâng cấp thì cũng cần các chiến lược để khắc phục tình trạng này.

## **Thách thức trong kiểm thử IoT**
![](https://images.viblo.asia/ce94db30-29f8-4277-befe-f7a10eeb852f.jpg)

***1) Hardware-Software Mesh***

* IoT là một kiến trúc được kết hợp chặt chẽ bởi các thành phần phần cứng và phần mềm khác nhau. Không chỉ có các ứng dụng phần mềm tạo nên hệ thống mà còn có các phần cứng, cảm biến, cổng thông tin, etc cũng đóng một vai trò vô cùng quan trọng.
* Việc chỉ kiểm tra chức năng thì không hoàn toàn đảm bảo hệ thống không có vấn đề gì. Bởi lẽ luôn có sự phụ thuộc lẫn nhau về mặt môi trường, truyền dữ liệu, etc. Vì vậy, nó có thể sẽ trở nên tẻ nhạt hơn so với thử nghiệm một hệ thống chung [chỉ phần mềm / thành phần phần cứng].

***2) Device Interaction module***

Vì đây là một kiến trúc giữa các bộ phần cứng và phần mềm khác nhau, chúng sẽ bắt đầu tương tác với nhau trong thời gian thực/gần thời gian thực. Khi chúng được tích hợp với nhau thì những thứ như bảo mật, tương thích ngược hay các vấn đề khi nâng cấp sẽ trở thành một thách thức đối với nhóm thử nghiệm.

***3) Real-time data testing***
 
Như chúng ta đã thảo luận trước đó thì có 2 loại kiểm thử bắt buộc trong hệ thống này là: Pilot testing và regulatory testing. Tuy nhiên thật khó để có những dữ liệu cho 2 loại kiểm thử này.

***4) UI***

* IoT được lan truyền trên các thiết bị thuộc mọi nền tảng [iOS, Android, Windows, linux]. Tuy nhiên, việc thử nghiệm trên tất cả các thiết bị hiện có bây giờ là điều gần như bất khả thi.
* Chúng ta không thể bỏ qua khả năng giao diện mà người dùng đang truy cập từ một thiết bị mà chúng ta không mô phỏng hoặc sở hữu nó. Đó quả là một thách thức khó khăn để vượt qua được.

***5) Network availability***

* Kết nối mạng đóng một vai trò quan trọng như là góp phần trong việc làm cho tất cả các dữ liệu được truyền đạt ở tốc độ nhanh hơn ở mọi thời điểm. Kiến trúc IoT phải được kiểm tra trong tất cả các loại kết nối/tốc độ mạng.
* Để làm điều này thì các mô phỏng mạng ảo chủ yếu được sử dụng để thay đổi tải mạng, kết nối, độ ổn định, etc. Tuy nhiên, dữ liệu/mạng thời gian thực luôn là một kịch bản mới và nhóm thử nghiệm cũng không phán đoán được nơi mà các nút cổ chai sẽ phát triển trong thời gian dài.

## **Công cụ kiểm thử IoT**

Các công cụ trong IoT testing được phân loại dựa trên **mục tiêu kiểm thử** như sau:

***1) Software:***
* Wireshark: Đây là 1 ứng dụng mã nguồn mở được sử dụng trong việc giám sát lưu lượng truy cập trong giao diện, địa chỉ nguồn/đích, etc.
* Tcpdump: Làm công việc tương tự như Wireshark nhưng khác 1 điều là Tcpdump không có GUI. Nó là 1 tiện ích dựa trên dòng lệnh giúp hiển thị TCP / IP và các gói khác được truyền hoặc nhận qua mạng. 

***2) Hardware:***
* JTAG Dongle: Nó tương tự 1 trình gỡ lỗi trong các ứng dụng PC, giúp gỡ lỗi mã nền tảng mục tiêu và hiển thị biến từng bước một.
* Digital Storage Oscilloscope: Được sử dụng để kiểm tra các sự kiện khác nhau với dấu thời gian, độ ổn định trong cung cấp năng lượng, tính toàn vẹn dữ liệu.
* Software Defined Radio: Được sử dụng để mô phỏng máy thu và phát cho 1 phạm vi lớn các cổng không dây.

## **Kết luận**

Các phương pháp thử nghiệm IoT có thể khác nhau dựa trên hệ thống / kiến ​​trúc có liên quan. Người kiểm thử nên tập trung nhiều hơn vào phương pháp kiểm thử Test-As-A-User [TAAS] hơn là thử nghiệm dựa trên các yêu cầu.

Một trong những điều quan trọng trong thử nghiệm IoT là kiểm thử tích hợp. Có thể nói IoT là thành công nếu kế hoạch kiểm thử tích hợp là chính xác và có hiệu quả đủ để bắt gặp lỗi trong hệ thống.

Kiểm thử IOT có thể là một công việc khó khăn, thử thách nhưng nó cũng rất thú vị. Bởi lẽ nó tạo cơ hội cho nhóm thử nghiệm xác nhận một mạng lưới phức tạp gồm các thiết bị, giao thức, phần cứng, hệ điều hành, firmware, etc.

**Bài viết trên được dịch từ link:**  https://www.softwaretestinghelp.com/internet-of-things-iot-testing/