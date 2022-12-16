# Giới thiệu

Xin chào mọi người, hiện tại, từ khóa đang rất &quot;hot&quot; đó là cách mạng 4.0, công nghệ IOT – Internet kết nối vạn vật, chắc hẳn sẽ có rất nhiều người muốn tìm hiểu chút ít về nó, cũng như muốn được thấy được nhưng lợi ích của nó mang lại cho cuộc sống của chính mình. Mình cũng vậy, thấy mọi người đề cập đến IOT khá nhiều nên cũng bắt đầu tìm hiểu về nó và cũng mày mò bắt tay vào tự tạo một project IOT nhỏ để phục vụ cho cuộc sống hằng ngày của mình.

Ứng dụng của mình sẽ có chức năng là bật tắt thiết bị trong một khoảng thời gian tùy chỉnh, cài đặt hẹn giờ bật tắt, hoặc cũng có thể bật tắt thiết bị theo nhiệt độ, độ ẩm của môi trường. Điều này có thể giúp trong việc tự động bật quạt, điều hòa theo nhiệt độ phòng, tưới cây khi đất khô, bật điện phòng trong khoảng thời gian buổi tối và tắt trong khoảng thời gian sáng hoặc hẹn giờ một thiết bị nào đó bật tắt theo ý mình.

Sản phẩm cũng đang quá trình phát triển, mọi người có thể tham khảo để ứng dụng hoặc có thể phát triển tiếp các tính năng cho hoàn thiện hơn.

# Tổng quan về hệ thống IOT

IoT, viết tắt của “Internet Of Things”, hay còn được gọi là Internet vạn vật là một kịch bản của thế giới, khi mà mỗi đồ vật, mỗi con người được cung cấp một định danh của riêng mình, và tất cả có khả năng truyền tải, trao đổi thông tin, dữ liệu qua một mạng duy nhất mà không cần sự tương tác trực tiếp giữa người với người, hay giữa người với máy tính.

Một hệ thống IoT cơ bản sẽ bao gồm các thành phần cơ bản sau:

![](https://images.viblo.asia/d3a96004-ebb5-4329-8f08-9f7e2f81a1f6.png)

1. Cảm biến

    - Các cảm biến bao gồm: cảm biến nhiệt độ, độ ẩm, cảm biến tiệm cận, cảm biến ánh sáng v.v…
    - Cảm biến có nhiệm vụ chuyển đổi dữ liệu tương tự (analog) có được từ việc quét các thông số của môi trường sang dữ liệu số (digital), chúng không thực hiện bất kỳ quá trình xử lý nào, và nhờ vậy các cảm biến không tiêu thụ nhiều năng lượng và có thể hoạt động nhờ pin trong một khoảng thời gian dài.

2. Xử lý cục bộ và thiết bị lưu

    - Các thiết bị xử lý cục bộ là ở mức thứ hai và thứ 3 trong hệ thống IoT. Tại thời điểm này, dữ liệu được lưu trữ và xử lý cục bộ, lý tưởng là các dữ liệu này không được gửi đi chuyển tiếp trừ khi có liên quan.
    - Các thiết bị nói trên đơn thuần là các vi điều khiển và các board mạch nhúng, chúng có nhiệm vụ xử lý dữ liệu nhận được từ cảm biến.

1. Network và Internet

    - Tiếp theo là có một phần cứng kết nối với các thiết bị mô tả ở trên, kéo dữ liệu ra và gửi dữ liệu lên cloud (đám mây) nơi dữ liệu được lưu trữ. Có 4 giao thức được sử dụng ở mức này:
    -  CoAP (Constrained Application Protocol) là giao thức ràng buộc ứng dụng của tập đoàn CoRE (Constrained Resource Environments) IETF.
    -  MQTT (Message Queuing Telemetry Transport) ít an toàn hơn và được thiết kế cho truyền tải giữa máy với máy)
    -  HTTP (giao thức web) chắc hẳn ai cũng biết cái này rồi. Và ứng dụng của mình cũng sẽ sử dụng giao thức này để truyền dữ liệu giữa các thành phần.
    -  XMPP (Extensible Messaging and Presence Protocol ) hay còn gọi là một giao thức truyền tải thông điệp, tin nhắn (message). Các thông điệp được trao đổi dưới định dạng XML.

# Xây dựng hệ thống

## A. **Các thành phần của hệ thống**

**Sơ đồ hệ thống**

![](https://images.viblo.asia/b2baac45-8b3d-4ced-8ee2-33fd409ab23f.png)

Đối chiếu với các thành phần mình đã kể trên thì hệ thống của mình cũng có những thành phần tương tự như sau:

**1. Cảm biến**

Các thành phần cảm biến mình sử dụng sẽ là nhưng cảm biến, vi xử lý và các thành phần kết nối đơn giản nhất mà người mới bắt đầu có thể học được dễ dàng, giá của dũng khá là &quot;hạt dẻ&quot; phù hơn với những người mới làm quen và thích &quot;vọc vạch&quot; vì nó rẻ nên có kém chút về nối mạch cũng như lập trình có thể làm hỏng thiết bị thì cũng không &quot;tiếc đứt ruột&quot;. Cụ thể các thành phần đó là:

**Esp8266**

![alt](https://images.viblo.asia/e6daf067-c0dd-43db-b626-28250e048115.png ) 

ESP8266 là một vi xử lý được thiết kế bởi Espressif System. Đặc điểm nổi bật của ESP8266 là tích hợp sẵn wifi. Có nhiều loại board được thiết kế sử dụng vi xử lý ESP8266. Sự khác nhau của các loại board là số lượng các GPIO (GPIO là các cổng  được sử dụng cho input hoặc output). Vi xử lý này khá là phổ biến và dễ tiếp cận đối người người bắt đầu tìm hiểu về IOT, ngôn ngữ lập trình của nó là C/C++ đây là hai ngôn ngữ lập trình phổ biến, được nhiều người biết đến. Cấp nguồn cho vi xử lý cũng khá đơn giả vì nó sử dụng nguồn 3.3v~5v.

**Module DHT-11**


![](https://images.viblo.asia/d79e5e81-010d-4e6f-9a62-28b83d602438.png)


Thu thập nhiệt độ, độ ẩm môi trường để đưa đưa dải tín hiệu vào Arduino, từ đó arduino trong module 8266 sẽ giải mã tín hiệu để lấy ra được nhiệt độ và độ ẩm. Từ dữ liệu đã giải mã được 8266 sẽ gửi nhiệt độ và độ ẩm lên server để server có thể điều khiển thiết bị trong nhà.

**Modules relay 4 channel**

![](https://images.viblo.asia/c02e30a0-394c-4047-b2e8-e3a811674cfd.png)

Modules này có chức năng nhận tín hiệu từ module ESP8266 điện áp 5v hoặc 0v nếu điện áp là 5v thì cho phép bật, 0v thì tắt. Module như một công tắc có thể điều kiển 4 thiết bị có hiệu điện thể sử dụng 24-250V, 10A.


Ngoài ra thì mọi người có thể mua thêm cáp nối cho dễ cắm và hộp đựng thiết bị. Tổng cộng các thành phần thì giá thành rơi vào khoảng 400 nghìn đồng, với giá thành này mình nghĩ là khá rẻ cho chức năng nó mang lại(với điều kiện mình phải hiểu và làm nhiều chức năng với nó nhé). Những linh kiện này khá là phổ biến các bạn có thể mua ở nhiều cửa hành linh kiện điện tử hoặc có thể đặt trên mạng cho họ ship COD về.

**2. Xử lý cục bộ và thiết bị lưu**

Ứng dụng của mình phần server sử dụng Framework PHP CodeIgniter, phần Fontend sử dụng Bootstrap 3 và Jquery, vì project này khá nhẹ và dữ liệu truyền qua lại giữa các thành phần là khá ít. Vậy nên chúng ta có thể sử dụng những hostinger miễn phí để deloy.

**3. Network và Internet**

Để truyền dữ liệu từ cảm biến về server xử lý mình sử hựng phương thức HTTP, sang phần tiếp theo mình sẽ có sơ đồ cụ thể của hệ thống.

## **C. Ghép nối các thành phần**

Mọi người có thể tham khảo ghép nối các thành phần theo sơ đồ ứng dụng mình đã làm như sau:

![](https://images.viblo.asia/2eaf5394-932b-4d39-993f-c69e497573c8.png)

Các chân nối mọi người nối theo sơ đồ trên là có thể sử dụng được, việc ghép nối là khá dễ dàng vì các chân trên các vi xử lý khá giống với trong sơ đồ.

## **D. Cài đặt ứng dụng**

Phần này mình sẽ hướng dẫn cách cài đặt ứng dụng của mình đang phát triển.

Đầu tiên các bạn có thể tải mã nguồn của project trên đường dẫn: [https://github.com/tdvietdev/iot](https://github.com/tdvietdev/iot)

**1. Cài đặt phần sensor**

Bạn kết nối thiết bị ESP8266 với laptop của mình. Sau đó, trong nguồn mọi người tải về, mọi người sẽ mở phần mềm Arduino IDE và chỉnh một số thông số như sau:

![](https://images.viblo.asia/53865afc-a840-4159-9a48-89809576ee69.PNG)

Sau khi chỉnh sửa mọi người hãy bấm vào nốt có mũi tên màu vàng để có thể nạp code cho vi xử lý.

**2. Phần server**

Trong phần server thì chủ yếu mọi người sẽ sửa phần kết nối đến cơ sở dữ liệu. Hệ quản trị mình sử dụng là Mysql, tạo một cơ sở dữ liệu sau đó import file sm\_project.sql mình để trong project mọi người tải về và thiết lập kết nối đến nó theo hình sau (đường dẫn file là ../aplication/config/database.php):

![](https://images.viblo.asia/9847df7a-c1ca-45c6-a852-63b0ce38b531.PNG)

# Sử dụng

Đầu tiên khi vào giao diện trang web bạn hãy sử dụng tài khoản admin với tên đang nhập là pasword để vào bằng trang điều khiển của admin, sau đó sử dụng tài khoản để tạo người dùng và sử dụng nó để đăng nhập lại vào hệ thống. Lúc này bạn đã có thể xem được trạng thái của thiết bị mình đang kết nối, sau đó các bạn đã có thể kết nối và sử dụng nó rồi, project còn khá nhỏ nên việc sử dụng tương đối dễ mọi người có thể dễ dàng sử dụng.

Đường đẫn video mình demo ở đây các bạn có thể xem cách sử dụng:

{@youtube: cCTLGKQdPJw}

# Tổng kết

Ở bài viết này mình đã trình bài cơ bản về các thành phần của một hệ thống IOT và một project nhỏ nhỏ mình đã làm để sử dụng. Tuy nhiên còn có khá nhiều vấn đề như: bảo mật của hệ thống chưa có ở chỗ hệ thống sử dụng phương thức http và cũng chưa có xác nhận có chính xác là dữ liệu từ hệ thông cảm biến gửi lên server hay không hay do người nào đó cố ý gửi request lên server, vấn đề này và các bước mình đã xây dựng project này sẽ được mình trình bài ở các phần tiếp theo của loạt bài viết này, mong mọi người sẽ đón đọc. Mọi thắc mắc về cách cài đặt, hay về phát triển hệ thống mọi người hãy bình luận phía dưới bài viết hoặc liên hệ với mình theo địa của [tdviet.dev@gmail.com](mailto:tdviet.dev@gmail.com). Cảm ơn mọi người đã theo dõi.