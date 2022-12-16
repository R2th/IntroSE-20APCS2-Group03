**IoT** - Internet of Things, hẳn bạn đã nghe đến những khái niệm này rất nhiều lần trong những năm gần đây. Và không thể phủ nhận rằng các thiết bị IoT ngày càng trở nên phổ biến. Điển hình trong IoT chính là smarthome, những căn nhà thông minh. Tính đến cuối năm 2017, 26,5% hộ gia đình Mỹ đã áp dụng công nghệ nhà thông minh vào ngôi nhà của họ, và con số này dự kiến sẽ tăng lên gấp đôi vào năm nay. Ở Việt Nam bạn có thể biết đến hai giải pháp nhà thông minh là Bkav Smarthome và Lumi khá nổi tiếng.

Smarthome hay Nhà thông minh là thuật ngữ công nghệ được sử dụng để chỉ những ngôi nhà có thiết bị gia dụng, đèn, máy sưởi, tivi, máy tính, hệ thống âm thanh & video, hệ thống camera an ninh, hệ thống sân vườn,... có khả năng kết nối với nhau và có thể được điều khiển từ xa theo lịch trình thời gian, từ bất kỳ phòng nào trong nhà cũng như bất kỳ vị trí nào trên thế giới, thông qua điện thoại, Internet. Nhờ đó, những ngôi nhà thông minh mang đến cho người chủ cảm giác an toàn, thoải mái, tiện lợi, tiết kiệm năng lượng hơn theo cách mà họ muốn.

Để có được một smarthome bạn cần có nền tảng để làm điều đó. Hãy tưởng tượng ngôi nhà thông minh cũng giống như chiếc máy tính, nếu chưa cài hệ điều hành thì nó chỉ là cái xác máy, bạn cần cài một hệ điều hành như Windows, Linux hay macOS để có thể dùng nó. Chỉ khác là, nền tảng của nhà thông minh thì đa dạng hơn, tùy từng hãng phát triển mà nó có những đặc điểm khác nhau.

Hôm nay mình sẽ giới thiệu với bạn một nền tảng tự động hóa ngôi nhà khá nổi tiếng, được cộng đồng yêu thích và sử dụng khá nhiều, đó là **Home Assistant.**

## 1. Home Assistant là gì?

Home Assistant hay anh em thường gọi nhanh là Hass, nhiều lúc gọi là HA, hoặc hassio, hoặc Hassbian, là một nền tảng tự động hóa ngôi nhà mã nguồn mở chạy trên Python 3.x, được thiết kế để dễ dàng triển khai trên bất kỳ máy tính nào từ Raspberry Pi đến các thiết bị lưu trữ trên mạng (NAS) và thậm chí là một container Docker để triển khai trên các hệ thống khác một cách dễ dàng

Hass ra đời từ năm 2013 do sự sáng tạo của đại ca Paulus Schoutsen hay nick trên community của anh ấy là balloob. Hiện tại, dự án này đã thu hút được 20 người hoạt động tích cực và phát hành cập nhật 2 lần mỗi tuần.

![](https://images.viblo.asia/a61f2d34-9332-4a62-b1f5-cc2dbf03ce47.jpg)

Home Assistant tích hợp với một số lượng lớn các sản phẩm mã nguồn mở cũng như thương mại, cho phép bạn liên kết các thiết bị, dữ liệu với nhau, ví dụ như IFTTT (if this then that - công cụ để tự động hóa các thao tác), thông tin thời tiết hay Amazon Echo, để kiểm soát phần cứng trong nhà, từ khóa cửa cho đến đèn điện.

Một số nền tảng tự động hóa nhà chỉ hỗ trợ Python như một phần mở rộng, nhưng Home Assistant có thể chạy trên bất cứ thiết bị, dịch vụ nào có thể chạy Python 3, từ máy tính để bàn đến Raspberry Pi.

## 2. Khái niệm về HUB

Hub giống như một bộ não trung tâm, nhận lệnh từ các nơi gửi về và xử lý rồi lại gửi đi các thiết bị đích để thực thi. Home Assistant cũng là một Hub thôi. Nhưng nó có thế mạnh ở chỗ khả năng tích hợp cao với các thiết bị khác.


![](https://images.viblo.asia/ea2aea21-d4b5-4391-93cc-f4680fa564a9.jpg)

*Ví dụ trong hình trên thì SmartThinQ đó chính là Hub vì nó đứng ở vị trí trung tâm để liên kết các thiết bị khác và xử lý các tác vụ*

Khi các thiết bị được tích hợp vào cùng 1 Hub thì chúng sẽ làm việc chung với nhau, dù chúng là những hãng khác nhau.  Nếu chúng ta chỉ dùng Hub của riêng một hãng nào đấy thì hầu như chỉ các thiết bị của hãng mới hoạt động liên kết được với nhau. Trong khi với Hass, báo động Xiaomi có thể làm công tắc đèn Sonoff bật, quá tuyệt phải không nào.

## 3. Một số đặc điểm của Home Assistant

Giống như hầu hết các hệ thống tự động, Home Assistant cung cấp bản client trên điện thoại và máy tính để điều khiển các thiết bị nhà thông minh từ xa.

Home Assistant cũng không có các thành phần điện toán đám mây. Schoutsen lập luận rằng, loại bỏ những thành phần này sẽ giúp tăng cường an ninh, bảo mật, riêng tư và tính ổn định cao hơn

![](https://images.viblo.asia/d9a1fb52-4747-49a6-9902-5afe6c2dd401.png)

Có một điểm mạnh của Home Assistant do Python mang tới đó là: Việc mở rộng hệ thống rất dễ dàng. Python là ngôn ngữ năng động, nó cho phép tạo ra sự linh hoạt mà những nhà lập trình Java luôn thèm khát. Với Python thật dễ dàng để kiểm tra và tạo các mẫu thử cho từng phần mới trên bản cài đặt hiện có mà không bị ảnh hưởng vĩnh viễn đến các thành phần khác. Đặc biệt là với phiên bản Python mới mà MicroPython vừa đưa ra dành cho các hệ thống nhúng, như Arduino và ESP8266 thì khả năng nó sẽ trở thành ngôn ngữ chung cho tất cả các mức độ IoT, từ cảm biến đến tự động hóa để tích hợp với các dịch vụ của bên thứ ba.

Home Assistant là một chương trình dựa trên sự kiện, kết hợp máy trạng thái theo dõi thực thể - tất cả các thiết bị được chọn và người bạn muốn theo dõi. Mỗi thực thể có một định danh, điều kiện trạng thái và các thuộc tính. Thuộc tính là các mô tả của trạng thái, chẳng hạn như màu sắc, mức độ sáng trên bóng đèn thông minh [Philips Hue](https://www2.meethue.com/en-us).

Ví dụ, để tích hợp Philips Hue vào hệ thống, bạn cần sử dụng thành phần ánh sáng, có thể bật đèn và biết cách đọc trạng thái của đèn (bật hoặc tắt). Home Assistant cung cấp các thành phần cho mọi thiết bị, dịch vụ được hỗ trợ, hay truy cập dễ dàng vào các nhóm thành phần như ánh sáng, nhiệt, công tắc, cửa garage. Quá trình thiết lập cũng dễ dàng nhờ khả năng phát hiện các thành phần và quét mạng. Nếu có một thiết bị được hỗ trợ, thì việc thiết lập nó gần như là một quá trình tự động.

## 4. Tính năng của Home Assistant

* ### Giám sát

Home Assistant sẽ theo dõi tình trạng của tất cả các thiết bị trong nhà bạn thay cho bạn, miễn là các thiết bị đó nằm trong danh sách được Home Assistant hỗ trợ

Tính tới thời điểm viết bài nền tảng này hỗ trợ 1348 thiết bị đến từ Nest, IFTTT, Google, Hue, MQTT, Wemo, KODI, Plex, IKEA, vera, Arduino, Adobe, Amazon, Apple, Asus, Cisco, D-Link, Facebook, Huawei, LG, Microsoft,... Các bạn có thể tìm thấy danh sách đầy đủ những thiết bị này[ tại đây](https://www.home-assistant.io/components/#all)

* ### Điều khiển

Điều khiển tất cả các thiết bị từ một giao diện duy nhất, thân thiện với điện thoại. Đặc biệt, nền tảng này không lưu trữ bất kỳ dữ liệu nào của người dùng trên máy chủ, vì thế đảm bảo tính riêng tư khá cao. Tất cả thông tin về thiết bị, bạn có nhà hay không, bạn đang ở phòng nào, camera…đều hoàn toàn bảo mật. Những dữ liệu đó không hề đưa ra khỏi nhà của bạn, nó chỉ quanh quẩn trong mạng LAN nhà bạn thôi.

* ### Tự động hoá

Thiết lập các quy tắc tiên tiến để kiểm soát thiết bị và biến ngôi nhà của bạn thành một thiên đường sống đáng mơ ước.

Một điểm mạnh của Hass nữa là Automation. Hass có thể giúp chúng ta thiết lập những ngữ cảnh phức tạp. Ví dụ, khi chúng ta về nhà, Google Home tự phát thông báo chào, nếu trời tối tự mở đèn, mở máy lạnh thấp hơn nhiệt độ bên ngoài 4 độ và hạ xuống từ từ, chọn một bài hát nào đấy để phát. Hass sẽ giúp bạn làm những ngữ cảnh đại loại như thế hết sức dễ dàng và thậm chí còn phức tạp, chi tiết hơn nhiều.

**Ví dụ như:**
* Đèn tự động bật lên khi mặt trời lặn và lúc đó bạn đang ở nhà
* Đèn bật lên khi ai đó trở về nhà và trời đã tối
* Làm giảm độ sáng của đèn khi bạn xem phim
* Nhận được thông báo khi đèn bật lên trong khi bạn không ở nhà

## 5. Kết luận

Home Automation và sau này là Smart Home sẽ còn là một chủ đề được đề cập đến nhiều và phát triển trong tương lai, nếu các bạn muốn tự tìm hiểu về nền tảng tự động hoá SmartHome này thì có thể vào [trang chủ](https://www.home-assistant.io/) của Home Assistant để tìm hiểu thêm. Nó bao gồm toàn bộ hướng dẫn về Home Assistant, từ cài đặt trên hệ điều hành, nền tảng tới cấu hình cơ bản - nâng cao, script, tool, điều khiển,...

Hy vọng bài viết của mình đã cung cấp cho các bạn một lượng thông tin nho nhỏ về Home Assistant, nếu cảm thấy thú vị bạn có thể tìm hiểu và biết đâu sẽ tự tạo được một ngôi nhà thông mình cho mình thì sao :)

### Tư liệu tham khảo

* [https://quantrimang.com/tim-hieu-ve-home-assistant-nen-tang-tu-dong-hoa-ngoi-nha-cua-ban-145430](https://quantrimang.com/tim-hieu-ve-home-assistant-nen-tang-tu-dong-hoa-ngoi-nha-cua-ban-145430)
* [https://lbminhautomation.com/home-assistant-la-gi.html](https://lbminhautomation.com/home-assistant-la-gi.html)
* [https://www.home-assistant.io/](https://www.home-assistant.io/)