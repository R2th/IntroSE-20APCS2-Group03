# Mở đầu
![](https://images.viblo.asia/052a2bad-230c-4d42-813b-0f95a9cbd9d7.jpg)

Có bao giờ bạn mong muốn mình sẽ trở thành admin của một Server game, quản lý toàn bộ thông tin của một Server, nắm trong tay toàn bộ quyền lực có thể kick, ban, thêm vật phẩm cho bất cứ một player nào không? 

Bài viết này sẽ hướng dẫn các bạn cách để có thể tạo ra server game của riêng mình. Bài viết sẽ không hướng dẫn từng bước để bạn có thể tạo ra một Server game cụ thể mà mình sẽ chỉ ra những thứ bạn cần và các bước bạn phải làm để cho đa số các Server game có thể chạy được và mọi người từ bất cứ đâu có thể vào Server của bạn.

# Tìm hiểu về game bạn muốn mở Server
![image.png](https://images.viblo.asia/98bcdbf3-6757-4c73-b3a6-ff316a416ea3.png)
Một số Game sẽ cho phép bạn mở các Community Server (đây là kiểu server bạn có thể mở được), ví dụ như: CSGO, Rust, Unturned, Arma, 7 Days to Die,... Hầu hết các game kiểu survival sẽ cho phép bạn mở Server riêng còn các game khác thì không. Vậy làm sao để biết game nào cho phép bạn mở ra các Server riêng biệt với Server chính thức được nhà phát hành cung cấp? Đây là 2 cách bạn có thể tìm hiểu game có hỗ trợ mở Server riêng hay không:

* **Trải nghiệm chơi game, tìm kiếm các thể loại trong game**: Thường nếu các bạn đã chơi game thì sẽ dễ dàng phát hiện ra các Server Community nếu có, tuy nhiên trong 1 số trường hợp những Server này sẽ được bố trí để khó nhìn thấy, nhường phần cho Server Offical.
* **Tìm kiếm từ khóa "How to host Game ABC XYZ"**: Cách này là cách dễ nhất, vì đơn giản trừ khi game đó quá ít người chơi không thì sẽ có những người đã tạo Server và viết các bài hướng dẫn mở Server Community cho game đó.

Tại bước này bạn cũng có thể nắm thêm 1 vài thông tin hữu ích cho phần sau như: Hệ điều hành hỗ trợ chạy Server game, Cấu hình cần thiết, port mà server sử dụng,...

Ví dụ: Bài viết hướng dẫn cách host server CSGO từ steam 
https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Dedicated_Servers
# Chuẩn bị hạ tầng (infrastructure)
Bây giờ bạn đã xác định được game nào có thể mở Server, game nào không thể. Lúc này sẽ là lúc đến bước tiếp theo, chuẩn bị hạ tầng cho Server game của bạn hoạt động. Server game thực ra chính là 1 Service (dịch vụ) hoạt động trên 1 máy tính, tương tự như web service (apache2, nginx), database service (mysql, redis),... Hạ tầng ở đây chính là một chiếc máy tính để có thể chạy server game của mình trên đó.

## Chọn nơi sẽ chạy máy chủ
Về cơ bản để có thể chạy được một Server game thì bạn chỉ cần 1 cái máy tính là có thể bắt đầu setup và chạy rồi, tuy nhiên phụ thuộc vào tùy nhu cầu thì ta cần có các lựa chọn khác nhau, ở đây mình sẽ đưa ra vài lựa chọn chính.
![image.png](https://images.viblo.asia/16ddb8db-56fd-48e4-9703-9c5f9bcc8c11.png)
* **Sử dụng máy tính tại nhà:** Đối với trường hợp này sẽ chỉ phù hợp với các bạn muốn mở server để chơi chung với bạn bè trong 1 thời gian ngắn mà không cần Online 24/7. Bởi lẽ nếu bạn chạy máy tính ở nhà 24/7 (không tính các bạn sử dụng máy workstation) thì khả năng cao tuổi thọ máy tính sẽ xuống rất nhanh và có thể đột tử bất cứ lúc nào. Cùng với đó hiệu năng của Server cũng sẽ không được tối ưu và bị ảnh hưởng nhiều do trên máy tính cá nhân bạn cũng sẽ sử dụng các phần mềm khác.
![image.png](https://images.viblo.asia/bafa96e9-9bb8-4d60-ad37-3b7f0002e7d3.png)
* **Thuê VPS (Virtual Private Server) từ bên thứ 3:** Đây là cách **tối ưu nhất** cho một Server quy mô nhỏ < 100 players active thường xuyên cần online 24/7. Cách này bạn sẽ đi thuê máy chủ từ các nhà cung cấp dịch vụ, có thể kể đến vài cái tên như (BizflyCloud, LongVan, Vietnix,...) để cài đặt server game lên trên đó. Các máy chủ này thường sẽ chia sẻ CPU với các người dùng khác nên giá thành sẽ rẻ hơn chỉ từ vài trăm đến hơn triệu. **Điểm lợi khi sử dụng VPS** là bạn sẽ không phải mất công phải setup nhiều về phần mạng, khi thuê 1 VPS bạn đã có 1 WAN IP để người dùng từ bất cứ đâu kết nối vào server của bạn.
![image.png](https://images.viblo.asia/3a655cb7-75fe-4621-9e13-9112158b080d.png)
* **Thuê Dedicated Server:** Đây là lựa chọn dành cho các đại gia muốn mở server một cách nghiêm túc và mong muốn cho doanh thu. Dedicated Server là các máy tính chạy độc lập và được đặt ở các Datacenter, các máy chủ này thường có xung nhịp CPU cao (~ 3GHz). Xung nhịp CPU cao sẽ giúp một số game chỉ chạy trên 1 Core hoạt động hiệu quả hơn. Vì hoạt động độc lập nên Dedicated Server cũng sẽ dễ dàng thêm các tính năng hơn như Firewall hoặc Application ở tầng network hỗ trợ chống DDOS chẳng hạn. Chính vì hiệu năng cao và các tính năng có thể thêm vào nên chi phí hàng tháng cho các Dedicated Server này sẽ không hề nhỏ, thường sẽ từ vài triệu đến hàng chục triệu mỗi tháng.

## Hệ điều hành

Ôi nhưng mình biết dùng mỗi Windows thì làm sao mà cài được Server game, chắc Server game phải gõ dòng lệnh tùm lum để cài đặt khó lắm? Sai hoàn toàn, các game hướng đến mở Community Server thì hầu hết đều hỗ trợ chạy trên hệ điều hành Windows, hướng đến những người hiểu biết không nhiều về IT. Ngoài ra bạn có thể host Server game trên đa dạng các OS khác nhau tùy thuộc game có hỗ trợ hay không:
* Linux
* MACOS
* thậm chí Docker

## Cấu hình
![image.png](https://images.viblo.asia/287872e3-9dd5-4c14-a0a0-5946210441c4.png)

### RAM
Cấu hình máy chủ cũng rất quan trọng, thường thì mức độ yêu cầu về tài nguyên sẽ phụ thuộc vào game và số lượng người chơi active (đang online) trong server game. Có một cách để có thể ước lượng tương đối lượng tài nguyên cần thiết, lấy ví dụ game CSGO:

**Ví dụ:** Bạn mở game CSGO chơi map Mirage, tiến trình CSGO chiếm của bạn 2GB ram thì Server game khả năng cao khi host map đó cũng chiếm tầm ~ 2GB Ram.

Để có thể dễ dàng chọn được lượng RAM cần thiết cho Server game thì tốt nhất ta nên host thử cho server game online thì ta sẽ xác định được lượng RAM cần thiết. Tuy nhiên nếu chạy máy chủ với mức RAM luôn gần full (90-100%) thì cũng không phải tốt. Theo kinh nghiệm của mình **mức độ sử dụng RAM nên ở tầm 70%** là ổn nhất để tối ưu chi phí.

### CPU
Tiếp theo đến CPU, CPU thường sẽ khó để có thể ước lượng bởi CPU sẽ phụ thuộc vào số Players đang online. Bởi CPU sẽ phụ trách việc xử lý những hoạt động, thao tác của User nên càng nhiều User sẽ càng ngốn nhiều CPU. Cần bao nhiêu CPU sẽ phải xây dựng thực tế mới biết được. 

Vậy nếu gồng gánh 1 Server siêu nặng trên 1 con máy cùi bắp thì sao? Hay máy chủ phải hoạt động ở mức quá tải thì hiện tượng gì sẽ xảy ra?
Câu trả lời rất đơn giản, có lẽ các bạn cũng đã đoán được một phần, người chơi trong server sẽ bị giật lag vì máy chủ không thể xử lý được các hành động của người chơi. Mà đối với game thì tối kỵ nhất là việc giật lag, ai hay chơi game cũng hiểu rất rõ vấn đề này!

### Ổ đĩa (Disk)
Ổ đĩa đối với 1 số game sẽ không quan trọng lắm, chỉ cần dư dả không bị full (<80%) thì server game có thể hoạt động hoàn toàn bình thường, tuy nhiên đối với 1 số game sử dụng các database lớn lưu trữ dữ liệu của người chơi thì nên cân nhắc sử dụng ổ HDD có tốc độ đọc ghi (IOPS) cao hoặc sử dụng ổ SSD cho Server. Việc sử dụng ổ SSD cũng sẽ giúp khởi động máy chủ và server game nhanh hơi đôi chút.

### Mạng (Network)
Tùy vào từng game sẽ yêu cầu lưu lượng mạng khác nhau, cùng với đó nếu người chơi của bạn đến từ nước ngoài hay trong nước cũng sẽ yêu cầu băng thông khác nhau. Đối với Server game hiện tại của mình với tầm 50 players online đến từ nước ngoài thì bằng thông 100mbps khá dư dả.

Một vấn đề nữa về mạng nữa các bạn cần quan tâm đó là khi bạn host server tại các máy tính ở nhà thì bạn sẽ cần Port Forwarding từ modem về máy tính của bạn, bởi modem sẽ như cánh cửa nhà, sau cánh cửa nhà đó sẽ có rất nhiều phòng (các thiết bị điện tử khác) chính vì vậy bạn sẽ phải chỉ cho cái modem biết nếu có người yêu cầu đến server game của bạn thì dẫn vào đúng phòng của bạn (máy tính cá nhân của bạn). **Rất nhiều các bạn tự host server game ở nhà sẽ gặp khó khăn ở bước này.**

Còn nếu bạn sử dụng VPS hoặc dedicated Server thì cần chú ý đến Firewall của nhà cung cấp dịch vụ và Firewall trong hệ điều hành, nếu có bất cứ một firewall nào không mở thì người chơi đều không thể kết nối đến server của bạn. 

Như vậy các bạn đã có các kiến thức cơ bản về để có thể bắt đầu tạo ra một server game của riêng mình rồi đấy! 
# Sáng tạo thêm cho Server game
Đối với một số game sẽ có các nhà phát triển bên thứ 3 tạo ra các module miễn phí và trả phí giúp những người quản trị phát triển thêm tính năng cho server game. Ví dụ:
* **Rust** : uMod, Oxide
* **Unturned**: RocketMod, OpenMod
* **CSGO**: SourceMod
* ...

Ngoài ra như một số game trên Steam sẽ có **workshop** để các nhà phát triển tạo ra các item mới với các công dụng mới cho từng game.
# Kết
Vậy một server game hoạt động trông sẽ như thế nào?
![image.png](https://images.viblo.asia/e7401c96-24d7-4b44-85ca-95973163240a.png)
Đây là máy chủ Windows Server của mình đang chạy 3 Server game Unturned, nếu bạn để ý sẽ thấy câu lệnh của từng user nhập vào, khá thú vị đúng không :) 

Hy vọng bài viết này sẽ giúp bạn có những trải nghiệm mới vào một năm mới, không thì cũng là chút kiến thức về hạ tầng cho các server game. HAPPY NEW YEAR!!!