Xin chào mọi người, giữa mùa dịch bệnh hoành hành thế này mọi người vẫn tươi chứ ạ? Sức khỏe vẫn ổn để mà mắt đọc bài Viblo, tay gõ code, miệng thì cãi nhau với QA đều chứ ạ? :laughing:
Đùa tí thôi, mình mong là mọi người đều khỏe mạnh, cũng như giữ cho mình an toàn giữa mùa dịch bệnh phức tạp. Mình thì chắc cũng không khác mọi người là mấy, đã bước vào mùa remote thứ N (chả buồn đếm nữa), thời gian rãnh thì cũng chả đi đâu chơi được ngoài dành thời gian cho gia đình và vọc vạch mấy thứ linh tinh.

Mà nhắc tới đây thì nhớ ra vừa rồi quởn quá, được ông anh cho mượn một con Rasperry Pi 3 B+ để chơi thì cũng nổi hứng lên tìm kiếm trò gì đó vui vui để vọc, sẵn tiện có một con ổ cứng thừa, thế là nổi ý build thử một con NAS cho mạng nhà mình luôn (Mấy trò khác thì đa số phải mua thêm module mà đồ mượn nên mình lười quá, mọi người có trò gì hay thì comment bên dưới suggest cho mình với nhé :heart_eyes:)

Bài viết mình vừa muốn giới thiệu về Rasperry Pi, Samba và NAS, hướng dẫn mọi người cài đặt Pi, cũng như cách setup Samba để tự làm một con NAS tại gia với Samba Server. Nhưng mà gộp lại vô 1 bài thì nhiều quá, nên xin phép mọi người mình sẽ tách ra làm 2 phần. Phần đầu chủ yếu giới thiệu và cài đặt Pi. Phần 2 sẽ bắt đầu vào setup Samba nhé mọi người. Giờ thì bắt đầu phần 1 thôi, follow me.


# 1. Rasperry Pi là gì vậy?
Rasperry Pi *(mình xin phép gọi tắt là Pi)* là một máy tính có kích thước siêu nhỏ gọn, nếu mọi người từng thấy Mac Mini và nghĩ nó nhỏ thì "âu nâu", con Pi này nó còn nhỏ hơn thế nữa. Kích thước của một con Pi thường chỉ cỡ một cái thẻ ngân hàng mà mọi người hay xài thôi, trên đó nó sẽ trang bị hết thảy nhưng thứ cơ bản mà một chiếc máy tính cần để vận hành, như CPU, RAM, khe cắm thẻ nhớ để chưa hệ điều hành, các cổng kết nối, blah blah, còn nhiều thứ đồ chơi khác mà mọi người có thể mua gắn thêm vào qua các cổng PIN được trang bị sẵn. mọi người có thể xem hình dạng của một con Pi y như bên dưới nhé, bên dưới là hình con Pi 3 B+ mình đang xài, mỗi dòng chắc khác nhau tẹo.

![Rasperry Pi 3 Model B+](https://images.viblo.asia/46046c70-60db-4a23-80d9-b5a4dce7e257.jpg)

Hệ điều hành thì có khá nhiều option như Rasperry PI OS (hàng chính chủ Rasperry Pi làm), hoặc có thể chọn Ubuntu Core/Server/Desktop, v.v. Với các hệ điều hành là Desktop thì bạn cần gắn thêm chuột, bàn phím và màn hình để sử dụng. Còn nếu hệ điều hạnh dạng Server thì chỉ cần gắm dây LAN vào đợi Pi boot xong và SSH vào như bạn đang thao tác với 1 server bình thường thôi (mình đang dùng cách này). Còn bên dưới là ảnh thực tế con Pi của mình nhé (Khác với ảnh trên là do có cái case ở ngoài rồi á ae, chứ tháo case ra thì y như nhau thôi à)

![](https://images.viblo.asia/b3e88a62-4d59-48a7-b2c2-181f98aae537.jpg)

Ngoài ra cũng còn nhiều dòng máy tính nhỏ mà có võ kiểu này nữa cho mọi người lựa chọn để vọc chứ không riêng gì Rasperry Pi nhé, mình chỉ giới thiệu vì đang sử dụng con này thôi, có thể kể đến Orange Pi, ASUS Tinker Board, hay Adruino, v.v.

Giờ sang phần tiếp theo nào :smiley:

# 2. Thế còn NAS là gì?

NAS là từ viết tắt của Network Attached Storage nhé mọi người, nhìn qua cái tên thì chắc cũng đoán được sơ sơ rồi mọi người nhỉ. Thì nó là một thiết bị lưu trữ được kết nối vào mạng của mọi người, còn các ổ cứng gắn thẳng vào máy như mọi người hay xài thì được gọi là DAS (Direct Attached Storage). NAS thì thường mọi người sẽ thấy các doanh nghiệp hay sử dụng hơn, người ta dùng để tập trung dữ liệu lại cho dễ quản lý cũng như lấy dữ liệu, chia sẻ dữ liệu tiện hơn khi cần, ngoài ra thì có thể dùng để streaming các dữ liệu đa phương tiện nữa đó mọi người.

Các hệ thống NAS thì cũng có một máy tính thu nhỏ gồn CPU, RAM và chạy những phiên bản hệ điều hành đơn giản nhẹ nhàng thôi (thường là Linux), có khả năng kết nối qua Ethernet hay kể cả Wi-Fi luôn. Hầu hết các NAS thì sẽ sử dụng ổ gắn trong, mình nghĩ là để tối ưu hóa tốc độ truyền tải dữ liệu, vì các ổ gắn ngoài thì thường tốc độ sẽ phụ thuộc vào ổ cứng đó nữa.

![Simple NAS Architecture](https://images.viblo.asia/6fee25f3-0df1-4e5e-8dee-ced944556cb7.jpg)


Nói vậy là mọi người đủ hiểu NAS là gì rồi nha, vòng vo mãi mọi người đọc lại buồn ngủ, giờ mình xin phép giới thiệu nốt ông còn lại trước khi bước vào phần hướng dẫn và thực hành :stuck_out_tongue_closed_eyes:

# 3. Samba nữa?

Samba là một ứng dụng free dùng để triển khai lại giao thức SMB, nó có thể cung cấp khả năng chức năng chia sẻ file hoặc cung cấp dịch vụ in (print service), biến con máy tính của mọi người (cụ thể ở đây là Rasperry Pi) trở thành một Samba Server. Từ đó mọi người có thể truy cập vào để quản lý dữ liệu của mình.

![](https://images.viblo.asia/11f1807d-e873-49ad-87e1-b058ce7bf8d8.png)


Mọi người có thể tìm hiểu thêm ở những nguồn ngoài về Samba, Samba Server hay giao thức SMB nhé. Thông tin mình có hạn và cũng mới tìm hiểu thôi nên không giải thích nhiều cho mọi người về phần này được, gomen :sweat:

Rồi, giờ chúng tay vào setup một con Pi từ lúc mới đập hộp mọi người nhé.

# 4. Cài đặt và khởi động Rasperry Pi

Những thứ cần có để cài đặt Pi:

* Thẻ microSD (ít nhất 16GB, mà càng nhiều càng tốt cho chắc nhé mọi người, dư ra thì chúng ta sử dụng làm vùng lưu trữ luôn :grin: )
* Dây LAN để kết nối Pi với Router.
* Quyền access vào Router để xem IP của Pi phục vụ việc SSH.
* Và đương nhiên là một máy tính để flash OS vào microSD cũng như ssh vào Pi nữa

Đủ đồ rồi thì mình triển thôi

### Step 1: Tải file image Ubuntu Server cho Rasperry Pi



Trong bài này thì mình sẽ dùng Ubuntu Server 20.04 LTS, vì hiện tại Ubuntu chưa có bản Desktop chính thức cho các dòng Pi 2, 3, 4 và mình cũng không có nhu cầu sử dụng chuột hay bàn phím để mà phải sử dụng bản desktop :smile: 

File image của Ubuntu Server thì mọi người lên trang chủ của Ubuntu tải luôn vì Ubuntu có làm riêng cho mấy con Pi rồi đấy, link download ngay bên dưới nhé. mọi người có thể tham khảo thêm Rasperry Pi OS, ngoài ra còn rất nhiều nữa như Windows IOT, Raspian, Kali Linux hay cả Android.

**Ubuntu cho Rasperry Pi:** https://ubuntu.com/download/raspberry-pi

### Step 2: Flash file image vừa tải lên thẻ microSD

Để flash file image lên thẻ nhớ microSD dễ dàng và tiện lợi thì mình suggest mọi người sử dụng Etcher, ứng dụng hỗ trợ Windows, Linux, và cả macOS luôn. Có thể tải Etcher ở link bên dưới.

**Etcher:** https://www.balena.io/etcher/

Chạy Etcher và chọn tệp image mà cũng như thẻ microSD của mọi người. *(À mà không cần giải nén file hay gì đâu mọi người nhé, cứ file .img hoặc .img.xz mà chiến thôi)*


![image.png](https://images.viblo.asia/11f1a9a3-33e1-4866-9669-472fde1f2bd7.png)

Xong thì bấm flash, rồi xuống pha ly cà phê nào :coffee: ... Xong rồi, giờ thì Eject và rút thẻ ra chuẩn bị cho em Pi khởi động nào.

### Step 3: Setup cho Pi

* Cắm dây LAN để kết nối Pi với router nào.
* Khi đã xong thì hãy cấp sự sống cho Pi bằng cách cắm dây nguồn vào.

### Step 4: Pi Hello world!

Sau khi đã cắm dây nguồn thì các bạn đợi một lát để Pi hoàn tất khởi động nhé. Để check thử khi nào khởi động xong thì mọi người có thể vào router và xem các IP đang kết nối tới.

> Phần làm sao truy cập được vào router để xem IP thì mỗi router mỗi nhà một khác, mọi người tìm hiểu thêm nhé. Như mình thì xài router TP-Link nó có cái App để xem các clients đang connect luôn.

Sau khi đã có được IP thì mọi người tiến hành ssh vào Pi (nhớ là phải cùng network nha mọi người).

```
ssh ubuntu@<Pi’s IP address>
```

Thông tin login default là `username: ubuntu, password: ubuntu` nhé mọi người.

Lần đầu thì mọi người sẽ được hỏi để xác nhận kết nới tới Pi, cứ yes để xác nhận tôi nhé. Cũng như nó sẽ yêu cầu thay luôn cái password nữa, thay cho bảo mật tí nào :D

```
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Xong xuôi, mọi người sẽ thấy màn hình bên dưới, vậy là Pi đã Hello World thành công :tada:

![](https://images.viblo.asia/4c43f903-a3e2-4c73-a455-a24400de58e5.jpg)

Khi Pi gửi lời chào đầu tiên đến thế giới thì cũng là lúc chúng ta tạm gác series này lại đây vì cũng khá dài rồi. Trong thời gian mình viết phần 2 thì mọi người ai có hứng thù, nhanh trí tậu ngay cho mình một con Rasperry Pi ( hoặc một lựa chọn rẻ hơn là Orange Pi nhé mọi người) để vọc vạch thôi nào. Biết đâu lại có mấy trò hay hay :stuck_out_tongue_closed_eyes:

Chào tạm biệt mọi người, và gặp mọi người ở phần sau, phần sau chúng ta sẽ cùng bắt đầu setup Samba và config để share file trong mạng nội bộ nhé.
Chúc mọi người ở nhà vui vẻ và an toàn mùa dịch 

Stay tune :fist_right::fist_left: