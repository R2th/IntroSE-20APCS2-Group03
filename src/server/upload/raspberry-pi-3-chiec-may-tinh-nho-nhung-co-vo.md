# Mở đầu
Không phải tự dưng một thiết bị với một hình dáng nhỏ gọn chỉ bằng một bao thuốc lá Thăng Long (tính luôn phụ kiện), cấu hình so với các máy tính thậm chí smartphone ở thời điểm hiên tại thì được cho là "cùi bắp" lại có doanh số đứng hàng thứ 3 trong lĩnh vực máy tính chỉ sau Mac và Windows. Trong lúc rảnh rỗi, nếu bạn đang tìm một thứ gì đó để vọc vạch, chơi hay để nghiên cứu thì bài viết này xin gợi ý cho bạn một sản phẩm có rất nhiều tiềm năng để sử dụng trong cuộc sống hàng ngày đó chính là Raspberry Pi 3 (trong bài này mình sẽ gọi tắt là Pi cho gọn).
# Raspberry Pi 3 là gì?
Pi là một máy vi tính rất nhỏ gọn, kích thước hai cạnh chỉ cỡ một cái thẻ ATM. Người ta đã tích hợp mọi thứ cần thiết trong đó để bạn sử dụng như một cái máy vi tính. Trên bo mạch của Pi có CPU, GPU, RAM, khe cắm thẻ microSD, Wi-Fi, Bluetooth và 4 cổng USB 2.0.
![](https://iotmaker.vn/images/detailed/1/Pi3_Breakout_Feb_29_2016.png)
## Cấu hình của PI3
Đây là cấu hình của một chiếc PI3 Model B(cấu hình phổ biến, được nhiều người sử dụng hiện tại)
```
Broadcom BCM2837 chipset running at 1.2 GHz
64-bit quad-core ARM Cortex-A53
802.11 b/g/n Wireless LAN
Bluetooth 4.1 (Classic & Low Energy)
Dual core Videocore IV® Multimedia co-processor
1 GB LPDDR2 memory
Supports all the latest ARM GNU/Linux distributions and Windows 10 IoT
MicroUSB connector for 2.5 A power supply
1 x 10/100 Ethernet port
1 x HDMI video/audio connector
1 x RCA video/audio connector
4 x USB 2.0 ports
40 GPIO pins
Chip antenna
DSI display connector
MicroSD card slot
Dimensions: 85 x 56 x 17 mm
```
## Hệ điều hành và phần mềm
Sau khi mua về thì phải cài hệ điều hành, có nhiều hệ điều hành cho Pi như:
* Raspbian: OS chính thức, giao diện giống như Windows/Mac/Linux.
* OSMC: tích hợp KODI, dùng làm máy xem phim, nghe nhạc.
* RetroPie: dùng làm máy chơi game, hỗ trợ nhiều hệ máy khác nhau.
* Ngoài ra còn có Ubuntu, Windows 10 IoT, RiscOS...

Raspbian là OS chính thức dành cho Pi. Cách cài đặt rất đơn giản, chỉ cần tải Raspbian về, giải nén, copy vào thẻ nhớ microSD rồi gắn thẻ vào máy Pi cho nó chạy cài đặt là xong.

Qua liệt kê phía trên các bạn có thể thấy PI được hỗ trợ rất nhiều hệ điều hành cho nhiều mục đích khác nhau, từ giải trí, học tập, nguyên cứu, làm các ứng dụng IOT,v.v... chính sự đa dạng đó làm cho PI3 có sức hút rất lớn về mặt ứng dụng cho cuộc sống, đặc biệt cho những ai yêu thích và làm việc về công nghệ.
## Mua PI ở đâu và giá cả thế nào?
Raspberry Pi 3 là bản có cấu hình cao nhất hiện nay (trước đó có Pi, Pi 2, ngoài ra còn có bản siêu nhỏ: Pi Zero và Pi Zero W). Pi 3 có giá chỉ 35 USD nhưng thường là chúng ta sẽ mua thêm các phụ kiện ví dụ như case cho Pi 3, tản nhiệt cho chip, adapter nguồn, thẻ nhớ microSD. Giá tổng cộng (chưa tính thẻ nhớ) vào khoảng hơn 50 USD tức khoảng 1.500.000đ cho PI và các phụ kiện cơ bản, ngoài ra bạn có thể sắm thêm cho PI một màn hình cảm ứng hoặc có thể dùng màn hình của máy tính bình thường kết nối với PI qua cổng HDMI. Với mức giá này mình đánh giá là khá rẻ so với những gì PI mang lại. Các phụ kiện đi kèm với PI bạn có thể mua
![](http://mlab.vn/image/data/Bai%20viet%20ky%20thuat/Raspberry/kit3_1024x1024.jpg)
Việc mua PI thì rất dễ dàng, bạn có thế mua qua các cửa hàng bán linh kiện điện tử, qua các shop qua mạng. Tuy nhiên hãy mua ở nhưng trang mạng lớn hoặc của hàng uy tín vì PI cũng có rất nhiều hàng nhái, nhỡ mua phải thì sẽ không đảm bảo cấu hình cũng như tuổi thọ của thiết bị.
# Lợi ích PI mang lại
**1. Sử dụng Raspberry Pi như máy tính để bàn**

Hãy bắt đầu với cách sử dụng Raspberry Pi đơn giản nhất: sử dụng như một chiếc máy tính để bàn. 
![](https://images.viblo.asia/39b0f804-6032-477f-8d26-a5530d1fcfaa.jpg)
Khi đã cài đặt xong hệ điều hành (trừ khi được chỉ định, tất cả các dự án này yêu cầu phiên bản mới nhất của Raspbian), bạn sẽ tìm thấy tất cả các công cụ cần thiết để chạy Raspberry Pi như một máy tính để bàn. Các phần mềm như LibreOffice và trình duyệt Chromium được cài sẵn. Bạn có thể cài đặt bất kỳ công cụ nào khác thông qua các kho lưu trữ hoặc tải xuống qua trình duyệt.

**2. Làm đầu coi phim HD giống như Android Box, hỗ trợ KODI đầy đủ.**

Bạn có thể biến chiếc PI của mình thành 1 chiếc box TV, chiếc đầu xem phim HD khi PI được cài phần mềm tương ứng và kết nối với một chiếc màn hình qua cổng HDMI, PI cũng có sẵn cổng jack cắm âm thanh 3.5mm để bạn có thể xuất ra âm thanh, vì vậy PI có thể đáp ứng một phần nào đó nhu cầu giải trí của bạn. Trên internet có rất nhiều phần mềm, công cụ cũng như cách cài đặt chúng, vì vậy nếu sở hữu PI hãy cài thử và tận hưởng nhé. Đây là một giao điện khi cài dặt hệ thuống audio trên PI.
![](https://images.viblo.asia/a383edbb-eaaf-41b1-bb61-1229dfd21be0.jpg)

**3. Làm máy chơi game cầm tay, console, game thùng. Chơi như máy điện tử băng ngày xưa, giả lập được nhiều hệ máy.**

Đây là một ứng dụng mà mình rất thích ở PI, chỉ cần PI, một chiếc tay cầm chơi game, và mội màn hình, bạn có thể trở về tuổi thơ dữ dội của mình với các game điện tử bốn nút, máy chơi game cầm tay, những game mà chỉ có những chiếc đầu đĩa xịn ngày xưa mới có, hoặc phải ra hàng game mới có thể chơi. Chỉ cần cài phần mềm Retro Pie và kết nối tay cầm, màn hình bạn đã có thể chơi những game "huyền thoại" để nhớ về tuổi thơ sau những giờ làm việc căng thẳng.
![](http://i.ebayimg.com/00/s/MTE4NFgxNjAw/z/MyEAAOSwSdZWffke/$_57.JPG?set_id=880000500F)

**4. Sử dụng PI để cắm torrent.**


Các bạn có thể biến Raspberry Pi thành một máy tải Torrent chuyên dụng, thiết lập cho Pi tự động tải Torrent mỗi khi mở máy lên, có thể lưu Torrent trên thẻ nhớ hoặc USB/ổ cứng gắn ngoài và điều khiển Torrent từ xa thông qua một máy tính khác. Bởi vì Pi tiêu tốn rất ít điện (công suất dưới 5W) nên bạn có thể cho nó tải Torrent suốt 24/24, hiệu quả về chi phí và cũng tối ưu về cách làm bởi vì sau khi cài xong, bạn chỉ cần cắm duy nhất một sợi nguồn microUSB vào Pi là nó sẽ bắt đầu tải.

**5. Làm máy chủ web**

Một ứng dụng tuyệt vời của Raspberry Pi là thiết lập nó như là một máy chủ web. Điều này về cơ bản có nghĩa là nó có thể được cấu hình để lưu trữ một trang web như blog của bạn chẳng hạn.
Có một vài phương pháp có thể được sử dụng ở đây. Điều đầu tiên bạn cần thực hiện là cài đặt đúng phần mềm: Apache và các thư viện liên quan. Hoặc bạn có thể cài đặt LAMP stack đầy đủ với PHP và MySQL cùng với Apache. Nó rất hữu ích nếu người dùng cũng thiết lập FTP.

Cài đặt Apache2 với PHP5 và hỗ trợ MySQL trên Ubuntu 11.10 (LAMP)
Khi đã hoàn tất các bước trên, bạn có thể lưu các tệp HTML vào thư mục /www/ và máy chủ web đã sẵn sàng sử dụng. Hoặc bạn có thể cài đặt một số phần mềm web cụ thể như WordPress, hoặc đối thủ cạnh tranh của nó, Ghost.

Để trang web trực tuyến, sử dụng một giải pháp như No-IP.com có thể khắc phục vấn đề thiếu địa chỉ IP tĩnh từ nhà cung cấp dịch vụ Internet.

**6. Làm khung ảnh kỹ thuật số**

Bạn có thể sử dụng Raspberry Pi để tạo khung ảnh kỹ thuật số cho những bức ảnh của mình với dòng thông điệp cho mỗi bức hình. Bạn có thể sử dụng màn hình hiển thị cảm ứng Raspberry Pi cho dự án này, hoặc bất kỳ màn hình LCD nào có thể được kết nối với Pi.

**7. Làm thiết bị điều khiển Smart Home, điều khiển mọi thiết bị điện tử trong nhà.**

Dù sao đi nữa thì mực đích ban đầu của PI vẫn là một vi điều khiển và phục vụ cho các ừng dụng IOT, vì vậy nó có chức năng để điều khiển SmartHome cũng như các thiết bị điện tử là điều dễ hiểu.

**8. Xây dựng một hệ thống an ninh**

Với module camera được đính kèm trong Raspberry Pi Camera hoặc một webcam USB thông thường, bạn có thể xây dựng hệ thống an ninh chuyển động.

Lưu ý rằng bạn sẽ cần thẻ nhớ microSD dung lượng cao hoặc thiết bị lưu trữ USB để lưu trữ cảnh quay từ thiết bị. Dự án Raspberry Pi kết hợp phần mềm chuyển động với uvccapture, một công cụ để thu lại cảnh quay từ webcam và phần mềm ffmpeg được sử dụng để quản lý tốc độ bit và time lapse. Khi đã thiết lập xong và chạy, bạn có thể mong đợi hệ thống bắt đầu ghi bất cứ khi nào phát hiện chuyển động và cảnh báo qua email nếu được thiết lập.

**9. Tạo ra một siêu máy tính với các tập hợp các PI liên kết với nhau**

Nếu bạn muốn mày mò khám phá các máy tính được kết nối với nhau như thế nào để trở thành một hệ thống siêu máy tính, cách chúng chia sẻ tài nguyên tính toán, cách vận hành một hệ thống máy tính mà chi phí hạn hẹp cũng như không có điều kiện đến các phòng thí nghiệm, hãy thử sử dụng PI để thay thế, vì PI cho mức chi phí khá thấp và nương lượng cung cấp cho hệ thống PI cũng không lớn. Có thể nói đây là một lựa chọn khá tối ưu và được tin dùng rất nhiều ở thời điểm hiện tại. Bây giờ với PI và công nghệ cluster chúng ta hoàn toàn có thể xây dựng một hệ thống siêu máy tính cho mình (tùy vào điều kiện kinh tế).
![](https://images.viblo.asia/e0d90d62-597b-40dd-98bf-2a2b38e2e0ec.jpg)

Ngoài ra còn có rất nhiều ứng dụng vô cùng hữu ích mà PI có thể mang lại bạn có thể tìm trên internet, hiện tại có rất nhiều dự án được phát triển bảo cộng động những người yêu thích PI trên toàn thế giới.

# Kết luận
Qua bài viết mình đã trình bày cho các bạn những lợi ích mà PI mang lại. Qua một thời gian sử dụng mình thấy nó thực sự rất có ích so với số tiền mình phải bỏ ra. Vì vậy các bạn yêu thích công nghệ, lập trình nếu có điều kiện hãy thử sử dụng để phục vụ cho cuộc sống của mình. Cảm ơn mọi người đã theo dõi bài viết của mình.