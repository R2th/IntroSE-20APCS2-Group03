![](https://images.viblo.asia/7b5246a5-a7dd-496f-99c2-62fb626ceea0.jpg)

Kết nối không dây đã ra đời cách đây hơn hai mươi năm. Hiện tại, chúng đã trở thành xu thế và không ngừng tăng lên. Điểm truy cập WiFi công cộng ở khắp mọi nơi như: Nhà hàng, quán cà phê, trung tâm thương mại... Thậm chí là toàn bộ thành phố. Nhưng những điểm truy cập này luôn chứa đựng những rủi ro đối với người dùng. Khi kết nối với internet công cộng, dữ liệu của bạn có thể bị đánh cắp thông qua một phương thức được gọi là cuộc tấn công Evil Twin. Bài viết này sẽ cho bạn thấy tấn công Evil Twin là gì, cách thức nó hoạt động và bạn cần làm gì để bảo vệ bản thân khỏi nó.
## 1. Evil Twin là gì?
Evil Twin là một kiểu tấn công Man-in-the-Middle (MITM, tôi đã có một bài viết về hình thức tấn công này, bạn có thể xem thêm tại [đây](https://viblo.asia/p/man-in-the-middle-attack-mitm-aWj53LMbK6m)) trong đó điểm truy cập giả được sử dụng để theo dõi hoạt động người dùng. Evil Twin hợp pháp hóa bằng cách nhân bản địa chỉ Media Access Control (MAC) và Name or Service Set Identifier (SSID) của mạng. Evil Twin sử dụng nhiều chiến thuật tương tự website spoofing (Một hình thức khác của MITM).

Evil Twin bắt đầu bằng cách nhân bản SSID mạng và giả vờ là một điểm truy cập an toàn. Khi người dùng kết nối với chúng và tin rằng đó là nó đảm bảo mà không hay biết sự thật là kẻ tấn công đang chặn tất cả lưu lượng giữa người dùng và máy chủ, đồng thời đánh cắp dữ liệu cá nhân mà không để lại dấu vết gì. Hậu quả của việc này đó là thông tin bị đánh cắp nhằm phục vụ hành vi trộm cắp danh tính hoặc tổn thất tài chính. Cuộc tấn công này rất hiệu quả vì phần lớn các thiết bị truy cập mạng hiện nay không thể phân biệt hai mạng có cùng tên. Nếu bạn muốn xem cách thức hoạt động của nó, bạn có thể tạo một điểm truy cập WiFi trên điện thoại và đặt tên giống như mạng gia đình của mình, tiếp đó dùng máy tính truy cập WiFi, máy tính của bạn sẽ coi cả hai như cùng một mạng.

Dễ hình dung hơn, Evil Twin là một sự gian lận, trong đó kẻ tấn công thiết lập mạng WiFi giả trông giống như một điểm truy cập hợp pháp để đánh lừa nạn nhân truy cập. Nạn nhân không hay biết gì mà đăng nhập vào những tài khoản cá nhân, những thứ này sẽ được gửi thẳng đến kẻ tấn công và khi sở hữu chúng kẻ tấn công có thể thay nạn nhân thực hiện các hành vi tiếp theo như thực hiện một giao dịch ngân hàng chẳng hạn. Dễ dàng thấy rằng nạn nhân của các cuộc tấn công kiểu này chính là những người bình thường như bạn và tôi.

Evil Twin là một trong những mối đe dọa WiFi nguy hiểm nhất, chúng đã tồn tại gần hai thập kỷ.
## 2. Ảnh hưởng của Evil Twin đến an ninh mạng
Cuộc tấn công Evil Twin gây ra rủi ro đáng kể cho an ninh mạng. Kẻ tấn công có thể đánh cắp dữ liệu hoặc thiết lập phần mềm độc hại. Người dùng cuối là mục tiêu chính cho hình thức tấn công này.

Ví dụ: Một quán cà phê mới mở ra, họ cung cấp WiFi miễn phí cho khách hàng của họ. Một kẻ tấn công, sử dụng máy tính xách tay của mình và một vài thiết bị khác giúp tạo một điểm truy cập giả gần đó, nhưng vì tín hiệu mạnh hơn mạng thực. Khách hàng sẽ dễ dàng bị cám dỗ chọn nó để kết nối. Người dùng thường lướt các mạng xã hội, kiểm tra tài khoản ngân hàng hoặc đăng nhập vào một trang nào đó. Trong khi đó, kẻ tấn công đã chiếm được tất cả thông tin đăng nhập và dữ liệu của người dùng và điều dĩ nhiên là những kẻ này có thể truy cập các tài khoản này như một người dùng thực sự.
## 3. Cách Evil Twin hoạt động
![](https://images.viblo.asia/70270fce-96f7-40bc-a305-bbb88dc9337c.png)

Kịch bản tấn công Evil Twin phổ biến nhất mà bạn có thể gặp trong thực tế là kiểu Captive Portals (CP). Nhiều mạng WiFi công cộng sử dụng các website yêu cầu đăng nhập để cấp quyền truy cập. Những thông tin này có thể bị lợi dụng để lừa người dùng. Hãy đi sâu hơn vào những gì xảy ra ở mỗi bước của cuộc tấn công này:

**Bước 1: Kẻ tấn công thiết lập điểm truy cập không dây giả**

Kẻ tấn công thường chọn một nơi công cộng có nhiều điểm truy cập công cộng, chẳng hạn như sân bay. Những nơi như vậy thường có nhiều điểm truy cập WiFi có cùng tên. Rất tiện lợi trong việc bạn đi mọi nơi trong khuôn viên sân bay mà không bị ngắt kết nối, nhưng điều đó cũng giúp công việc của kẻ tấn công dễ dàng hơn nhiều khi tạo ra một điểm phát sóng giả có cùng tên WiFi.

Bây giờ, kẻ tấn công có thể sử dụng bất cứ thứ gì từ card mạng, máy tính bảng hoặc máy tính xách tay đến bộ định tuyến di động để tạo điểm phát sóng. Nó khá dễ, tương tự khi bạn sử dụng điện thoại làm điểm phát sóng để chia sẻ kết nối với bạn bè của bạn. Tuy nhiên, họ sử dụng cùng tên SSID.

Dùng cách này bởi vì hầu hết các thiết bị không đủ thông minh để phân biệt điểm truy cập hợp pháp và giả nếu chúng có cùng SSID (Một số kẻ tấn công có thể đi xa hơn bằng cách nhân bản địa chỉ MAC của mạng đáng tin cậy).

**Bước 2: Kẻ tấn công tạo Captive Portal giả mạo**

Nếu bạn đã từng sử dụng WiFi công cộng, có lẽ bạn đã thấy trang CP. Chúng thường yêu cầu bạn nhập thông tin đăng nhập WiFi. Vấn đề với CP là không có tiêu chuẩn nào về vẻ ngoài của chúng và chúng thường được thiết kế rất đơn giản, do đó dễ giả mạo.

Những người sử dụng WiFi công cộng đã quá quen với chúng theo cách này đến nỗi thật khó để phân biệt sự khác biệt giữa trang hợp pháp và trang giả mạo. Thật không may, nếu bạn gặp phải cái sau, nó sẽ gửi thông tin truy cập WiFi cho kẻ tấn công.

Nếu là WiFi công cộng không có mật khẩu thì kẻ tấn công có thể bỏ qua bước này

**Bước 3: Kẻ tấn công khiến nạn nhân kết nối với WiFi Evil Twin**
Giờ đây, kẻ tấn công đã có một điểm truy cập và một cổng thông tin giả mạo, chúng cần phải khiến mọi người bỏ kết nối hợp pháp và kết nối với chúng. Điều này có thể được thực hiện theo hai cách:
- Họ tạo ra tín hiệu Wi-Fi mạnh hơn, điều này sẽ dẫn đến việc các thiết bị tự động kết nối với Evil Twin.
- Họ ngắt kết nối tất cả mọi người ra khỏi mạng chính bằng cách thực hiện cuộc tấn công khác là de-authentication. Các thiết bị được kết nối với mạng hợp pháp sẽ bị ngắt kết nối, điều này sẽ làm người dùng phải thực hiện kết nối lại. Bây giờ họ sẽ thấy một mạng mới có cùng tên, rất có thể sẽ ghi là "Unsecure". Điều này sẽ gióng lên hồi chuông cảnh báo cho người dùng nhận biết bảo mật, nhưng nhiều người sẽ gạt đi. Phương pháp này có thể không hoạt động trong môi trường văn phòng, nơi nó sẽ gây nghi ngờ. Những kẻ tấn công tìm cách tránh sự nghi ngờ thường chọn một công cụ phổ biến có tên là bettercap, có thể chạy trên các hệ thống Linux, Mac, Windows và Android.

**Bước 4: Kẻ tấn công đánh cắp thông tin đăng nhập**

Bây giờ kẻ tấn công có toàn quyền với những dữ liệu người dùng cung cấp khi truy cập WiFi của họ.

Khi một người dùng được kết nối với AP Evil Twin, cuộc tấn công kết thúc. Toàn bộ quá trình này được sử dụng để cho phép kẻ tấn công thiết lập các vị trí MITM từ đó chúng có thể đánh cắp dữ liệu và tiêm phần mềm độc hại hoặc vào kiểm soát các thiết bị nạn nhân từ xa. Khi ở vị trí MITM, kẻ tấn công có toàn quyền kiểm soát WiFi. 

**Để cuộc tấn công này hoạt động, một vài yêu cầu chính cần được đáp ứng:**
- Đầu tiên, cuộc tấn công này đòi hỏi người dùng không biết gì. Nếu mục tiêu am hiểu về công nghệ hoặc đã tham gia khóa đào tạo về an ninh mạng thì cuộc tấn công này có thể không hoạt động.
- Thứ hai, nạn nhân phải truy cập vào điểm kết nối giả mạo.
- Cuối cùng, nạn nhân phải tiếp tục truy cập internet sau khi kết nối điểm truy cập giả.
## 4. Cách để bảo vệ chính bạn
Evil Twin rất khó phát hiện. Nhưng bạn có thể thực hiện như sau để ngăn chặn kết nối với Evil Twin.

**Các công ty:**
- Sử dụng WiFi Intrusion Prevention Systems (WIPS) được thiết kế để phát hiện các điểm truy cập trùng lặp trái phép. Điều này có thể giúp ngăn chặn nhân viên hoặc khách hàng kết nối với một điểm truy cập Evil Twin.
- Bảo vệ các điểm truy cập thông qua việc sử dụng  Personal Security Key (PSK) và cung cấp cho nhân viên và khách hàng.

**Người dùng cuối:**
- Vô hiệu hóa tính năng tự động kết nối trên tất cả các thiết bị kết nối không dây.
- Sử dụng Virtual Private Network (VPN) nếu sử dụng điểm truy cập công cộng. Nó sẽ mã hóa lưu lượng truy cập của bạn, đảm bảo rằng không ai đánh hơi được lưu lượng truy cập của bạn.
- Cố ý gõ sai khóa. Một số Evil Twin sẽ cấp quyền truy cập vào điểm truy cập bất kể khóa nào được nhập.
- Hạn chế truy cập WiFi công cộng và tuyệt đối không dùng những WiFi không có mật khẩu.
- Không đăng nhập vào bất kỳ tài khoản nào trên WiFi công cộng. Bằng cách này, kẻ tấn công sẽ không thể đánh cắp thông tin đăng nhập của bạn và sử dụng chúng để chống lại bạn.
- Tránh kết nối với các điểm truy cập WiFi có cảnh báo "Unsecure", ngay cả khi nó có tên quen thuộc.
- Sử dụng xác thực 2 yếu tố cho tất cả các tài khoản nào của bạn. Bằng cách này, ngay cả khi kẻ tấn công chiếm được thông tin đăng nhập của bạn, họ vẫn sẽ không thể truy cập tài khoản của bạn.
- Cách tốt nhất để bảo vệ chống lại một cuộc tấn công Evil Twin là biết về chiến thuật này.

Đây là những cách tốt nhất để sử dụng các điểm truy cập WiFi công cộng. Thực hiện theo các bước này có thể giúp bảo vệ bạn khỏi một cuộc tấn công Evil Twin.

***Tham khảo***

[The Evil Twin Attack: Safe use of Public Internet](https://www.uscybersecurity.net/evil-twin/)

[How to identify and prevent evil twin attacks](https://nordvpn.com/blog/evil-twin-attack/)

[Understanding Evil Twin AP Attacks and How to Prevent Them](https://www.darkreading.com/attacks-breaches/understanding-evil-twin-ap-attacks-and-how-to-prevent-them-/a/d-id/1333240)

[Stealing WiFi Passwords with an Evil Twin Attack](https://null-byte.wonderhowto.com/how-to/hack-wi-fi-stealing-wi-fi-passwords-with-evil-twin-attack-0183880/)