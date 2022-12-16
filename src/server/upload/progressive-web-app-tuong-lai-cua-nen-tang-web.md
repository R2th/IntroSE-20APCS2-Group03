![](https://images.viblo.asia/82bbfd65-0744-4181-b6b0-f8c44e2a9871.jpg)

"Mobile first" hay "Think mobile" là một trong những hot trend mà chúng ta thường được nghe gần đây, khi mà số lượng thiết bị di động và số lượng người sử dụng các thiết bị di động ngày càng lớn. Nhưng think như thế nào cho đúng là điều cần làm rõ. Bài viết này sẽ cung cấp thông tin cho bạn về cách tư duy theo [PWA](https://en.wikipedia.org/wiki/Progressive_web_app).

> PWA không hoàn toàn là một giải pháp về công nghệ, mà là một tập các tiêu chuẩn được định nghĩa cho các ứng dụng web huóng theo, nhằm mang lại trải nghiệm tốt nhất cho người dùng, với sự hỗ trợ của browser về các API có liên quan như Service Worker, Push Notification v.v...

Trước khi bàn đến các tiêu chuẩn của PWA và cùng tìm hiểu các nghiên cứu mới về trải nghiệm của người dùng, các công nghệ hứa hẹn... Chúng ta sẽ cùng điểm qua một vài cảm nhận và suy nghĩ trong lược sử thời gian của ngành công nghệ web. Bên cạnh đó, chúng ta cũng sẽ nói đôi chút về Native App đến Hybird App và từ đó hiểu thêm về lý do ra đời của PWA.

Bài viết sẽ cung cấp cho chúng ta cái nhìn tổng quát về các vấn đề ưu nhược khi phát triển ứng dụng web follow các tiêu chuẩn của PWA, những khó khăn mà lập trình viên có thể gặp phải, hơn nữa, bài viết sẽ cung cấp view nhìn để có thể scale được một dự án PWA về yếu tố con người cũng như về chi phí, hạ tầng.

Bài viết khá dài, nên bạn có thể phải kiên nhẫn đọc hết những phần bên dưới, hoặc lướt qua các các heading để có thể chọn các đề mục mà mình tâm.

# Lời cảm ơn.

Cảm ơn [TheDevBand - An assistant to developers](https://thedevband.com/) đã tài trợ bài viết này.

# Một vài cảm nhận về nền tảng Web & App.
## Từ Web App đến Single Page (Web) Application

Bạn có thể tìm thấy các nét sơ lược về lịch sử của trong ngành web theo [Wikipedia](https://vi.wikipedia.org/wiki/World_Wide_Web) với các cột mốc quan trọng ở đây [evolutionoftheweb](http://www.evolutionoftheweb.com/?hl=en), và theo quan điểm cá nhân của tác giả thì trong hơn 10 năm qua có thể kể đến hai nhóm sự kiện tiêu biểu:

1. Sự ra đời của các browsers chịu thay đổi và mau lẹ trong sự thay đổi như Firefox, Chrome. Vì chính sự ra đời này, các tiến bộ mới được nhanh chóng cài đặt và phổ biến đến cộng đồng lập trình viên và người sử dụng.

2. Sự ra đời của AJAX có thể nói là một cột mốc đáng chú ý nhất của nền tảng web, đã có thời chúng ta đi đâu cũng nghe người ta nói về điều này như là một phương tiện mang đến sức mạnh to lớn cho bất kì một website nào. Một trong các ứng dụng mang đậm dấu ấn của sự thay đổi này là Gmail, nó thay đổi cách chúng ta suy nghĩ về một phần mềm quản lý email trên nền web.

Chúng biến công việc phát triển các website, các ứng dụng web trở nên thú vị dành cho lập trình viên và không gian sáng tạo danh cho designer.

Từ các trang web chậm chạm, dưới sự bùng nổ của internet, cho đến sự ra đời của AJAX, đã khiến các website trở nên nhanh hơn, có hiệu năng và trải nghiệm giống như một phần mềm trên desktop và được gọi là một Single Page Application (SPA).

## Từ Native App đến Hybird App

Ngay từ những ngày bắt đầu, các ứng dụng di động đã tạo ra những điều "thật không thể tin nổi" về sự trải nghiệm đa dạng. Các thiết bị di động với cấu hình ngày càng mạnh mẽ với chu kỳ nâng cấp 1 đến 2 lần mỗi năm và người sử dụng ngày càng chịu móc hầu bao, bỏ thời gian cho các ứng dụng trên di động của mình.

Bên cạnh đó, các nền tảng di động còn sự phong phú về chuẩn loại phù hợp túi tiền, sở thích của người tiêu dùng nhanh chóng trở thành mảnh đất màu mở để các nhà phát triển nghĩ các ứng dụng nhằm nhằm tạo kết nối giữa mọi người, giải quyết công ăn việc việc, nhu cầu học tập giải trí, cải thiện cuộc sống, chăm sóc sức khoẻ...

Như Grab là một ví dụ về ứng dụng mobile đã tạo ra không chỉ chông ăn việc làm cho mọi người như thế nào, mà còn làm thay đôi cái nhìn và thói quen truyền thống về việc sử dụng dịch vụ xe ôm.

Có thể kể đến các nền tảng huy hoàng một thời như: Symbian của đế chế Nokia, Windows Phone với điện thoại O<sub>2</sub> một thời làm mưa gió, dâu đen Blackberry những ngày hoàng kim đình đám... cho đến khi chỉ còn hai cái tên thống trị thị trường rộng lớn và màu mỡ này là iOS, Android như chúng ta đã biết. Dù vậy, trong trò chơi vương quyền này vốn nguy hiểm này, tuy chưa biết kẻ nào sẽ chiến thắng cuối cùng, song vẫn có rất nhiều ông lớn vẫn không cam chịu, không dễ dàng bỏ cuộc chơi và tham vọng của mình. Thời gian sẽ cho chúng ta thấy điều phải thấy.

Và ngày nay, các ứng dụng build trên hai nền tảng Android của Google, và iOS của Apple đã lên đến những con số khổng lồ tạo ra một cộng đồng người sử dụng trung thành. Điều đó cũng có nghĩa là nếu bạn muốn xây dựng ứng dụng bằng Native App bạn cũng phải sẳn lòng phát triển hai phiên bản cho hai nền tảng này. Thật không may là chi phí phát triển cho hai nền tảng này không hề nhỏ, khi mà bạn biết rằng chi phí đó kèm theo việc maintain theo thời gian là một ác mộng, và phần lớn code của chúng gần như là không thể tái sử dụng cho nhau.

Đó là lúc người ta nghĩ đên điều làm thế nào đê có thể viết một lần và chạy trên nhiều nền tảng, và có nhiều giải pháp cho điều này, ví dụ:

1. Các nền tảng build/compile ra Native App như: (a) Xamarin, bạn có thể code với C# và build ra các nền tảng khác nhau như Android, iOS, Windows Phone. (b) React Native, bạn có thể Javascript để build ra Android, iOS.

2. Các nền tảng cho phép porting các trang web hiện có, hoặc xây dựng app trên nền tảng html để build ra các ứng dụng chạy trên cả Andriod, iOS như PhoneGap, gọi là Hybird App bằng cách cung cấp bên dưới một Native App như là một brigde software để giúp ứng dụng có thể tương tác với phần cứng bên dưới.

Hybird app ra đời tận dụng được những ưu điểm của nền tảng web, tận dụng nguồn nhân lực to lớn từ nền tảng web, giờ đây dân lập trình web cũng có thể viết app, porting ứng dụng của mình lên nền tảng App một cách dễ dàng.

Thật vi diệu phải không?

# Các so sánh giữa Web và App

## Web App

### Ưu điểm

1. Chạy được trên nhiều nền tảng, từ mobile đến desktop, từ Andriod đến iOS, từ Windows đến Linux v.v...
2. Người dùng không phải cài đặt ứng dụng, không phải nâng cấp version, chúng luôn được cập nhật mới nhất.
3. Có thể searchable từ Google
4. Scale ứng dụng dễ dàng với một cộng đồng năng động và đông đảo.

### Nhược điểm

1. Không thể can thiệp được sâu vào hệ thống mà phụ thuộc vào trình duyệt của người dùng.
2. Các chức năng về offline có giới hạn như phụ thuộc vào trình duyệt có support hay không.
3. Nhiều trình duyệt và các phiên bản khác nhau bạn sẽ tốn thời gian để đảm bảo chúng chạy giống nhau.
4. Sẽ mất rất nhiều chi phí nếu bạn muốn tạo UX/UI giống Native App

> `Bonus:` Bạn có thể xem qua hình bên dưới để nhìn thấy những gì mà Chrome có thể support

![Chrome Can Do](https://images.viblo.asia/0bd8947b-b3d3-4a5b-8504-8b3934077d0b.png)
## Native App

### Ưu điểm

1. Có thể sử dụng hầu hết các tính năng của thiết bị như camera, la bàn...
2. Cảm giác và cái nhìn (feel and look) thân thiện với người dùng vì sử dụng các control native của thiết bị, do hệ điều hành của thiết bị cung cấp.
3. Do sự dụng native app, nên khi hệ điều hành của thiết bị được nâng cấp (ví dụ khi nâng cấp lên IOS 10, thì sẽ thừa kế được)
4. Có thể work offline
5. Có thể tận dụng các chức năng như tăng tốc nên tốc độ của Native App sẽ có peformanace tốt.

### Nhược điểm

1. Chi phí phát triển cao, phải gần như làm cho 2 bản dành cho iOS, Android
2. Phải opitimze cho các dòng điện thoại không phải flagship
3. Phải cài đặt, không thể được searchable
4. Dung lượng cài đặt rất lớn chiếm một khoảng đáng kể đặt biệt với các hiết bị có bộ nhớ thấp, việc các đặt còn làm tăng chí phí về mặt dung lượng sử dụng 3G và người sử dụng có thể sẽ phải cân nhắc thời điểm tải.
4. Người dùng sau khi đã cài đặt thường cũng sẽ không nhớ tới ứng dụng và họ cũng dễ dàng remove vì chiếm tài nguyên và cảm thấy chật chội.
6. Thời gian submit và release rất lâu phải chờ đội ngũ Reviewers của App Stores duyệt.

## Hybird App

### Ưu điểm

1. Viết một lần và chạy trên nhiều nền tảng, chúng ta chỉ code một lần cái app của mình, phần còn lại cái cầu nối lo.
2. Với các ứng dụng có porting từ web, hoặc có tính năng giống như mobile web, liên quan nặng về xử lý dữ liệu thì loại ứng dụng này là phù hợp.
3. Có thể chạy background, offline.

### Nhược điểm

1. Peformance kém: Có thể nói các ứng dụng Hybird gặp phải các vấn đề lớn về performance, bởi phải chạy trên một bridge app được viết tất cả trong 1 cồng kềnh, chúng thật sự gần như là một mobile brower mở rộng thêm các API.
2. Khó customize và optimize phù hợp với chức năng của mình, đặt biệt cho các ứng dụng như Game.
3. Các API vẫn chưa hỗ trợ đầy đủ để theo kịp sự phát triển của phần cứng và sự đa dạng của các nền tảng khác nhau.

### PhoneGap - Nền tảng nổi bật của Hybird App

[PhoneGap](https://phonegap.com/) là một đại diện tiêu biểu cho nhóm nền tảng Hybird App, được phát triển bởi [Adobe System](http://www.adobe.com/) dùng để phát triển mobile app, nhưng không đòi hỏi user có kiến thức về Andriod, hay iOS, mà chỉ cần kiến thức về web như hình minh họa bên dưới.

![PhoneGap](https://images.viblo.asia/7cf942e6-bb4a-4bbd-ae6d-a1b96395fcf7.png)

# Bảng thống kê so sánh các công nghệ

Nếu bạn cảm thấy quá mệt và loạn vì đống chữ ở phía trên, thì có thể nhìn vào bảng tổng hợp bên dưới để có cái nhìn nhanh về so sánh tương đối giữa các nền tảng này.

| Tính năng                 | Web app  | Native App  | Hybird App | Ý nghĩa     |
|---------------------------|----------|-------------|------------|-------------|
| Cài đặt                   | NO       | YES         | YES        | NO tốt hơn  |
| Quản lý phiên bản         | NO       | YES         | YES        | NO tốt hơn  |
| Xuất hiện ở màn hình Home | LIMITED  | YES         | YES        | YES tốt hơn |
| Truy cập hệ thống         | LIMITED  | YES         | YES        | YES tốt hơn |
| Chức năng thông báo       | LIMITED  | YES         | YES        | YES tốt hơn |
| Background/Offline        | LIMITED  | YES         | YES        | YES tốt hơn |
| Danh bạ                   | NO       | YES         | YES        | YES tốt hơn |
| SEO/Bot có thể tìm kiếm   | YES      | NO          | NO         | YES tốt hơn |
| CrossPlatform             | YES      | NO          | YES        | YES tốt hơn |
| Hiệu năng                 | LIMITED  | GOOD        | LIMITED    | --          |

# Sự ra đời của PWA.

## Các thống kê thú vị

1. 5 tỉ thiết bị đã và sẵn sàng cho nền tảng web.
2. Có hơn 1 tỉ trang web trên thế giới.
3. Tới quý 2, 2015, cho thấy 90% thời gian người sử dụng điện thoại ở Mỹ là tương tác với Native App, chỉ có 10% sử dụng browser. Nhưng điều này không có nghĩa là bạn cần phải xây dựng một Native App cho ứng dụng của mình, vì phần lớn thời gian người sử dụng bỏ ra lại cho những App phổ biến như Facebook, Twitter, YouTube, Instagram v.v..
4.  Người dùng download app dễ dàng nhưng cũng dễ dàng gỡ bỏ app, bởi phần lớn các app được chạy các chương trình marketing hấp dẫn để thu hút người cài đặt, nhưng vì điện thoại rất dễ bị hết dung lượng nên user sẽ gỡ những app mà họ ít khi dùng đến. 65% người sử dụng điện thoại không hề download ứng dụng mới hàng tháng. Điều này có nghĩa là chi phí cài đặt ứng dụng ngày càng cao.
5. Tất cả những điều này cho thấy mobile web vẫn còn rất quan trọng. Nhưng lại có thêm một nghịch lý là, trong khi tỉ lệ người dùng mobile web so với tỉ lệ người dùng desktop web tăng trưởng rất nhanh và cao, nhưng tỉ lệ convert thành giá trị như đơn hàng lại rất thấp. Một phần trong đó là vì các ứng dụng web hiện tại không được optimize cho mobile cho các vấn đề về UX/UI và trong điều kiện mạng chậm.
6. Một website có thể tải về dưới 3s người sử dụng sẽ happy với website của bạn, và có nghĩa là tỉ lệ rời bỏ thấp, đơn hàng sẽ tăng lên. Còn từ 3s-10s thì người sử dụng chỉ có thể nói là sẽ cố kiên nhẫn. Quá 10s người sử dụng sẽ rời bỏ trang web của bạn vì họ nghĩ nó không hoạt động.

![Statictistic](https://images.viblo.asia/067525f3-b107-4823-8448-5715d72b2dc7.png)


> (`Phần viết này dựa trên sự suy đoán của tác giả`) Sự phát triển mạnh mẽ của Native App, thách thức sự thống trị của Google Search Engine, nếu người sử dụng dùng app, họ sẽ không còn cần vào Google để tìm kiếm thông tin nữa và sản phẩm cốt lỗi của google sẽ gặp rất nhiều vấn đề mà kể đến là sự sụt giảm người sử dụng do các thông tin không còn đưa lên web để có thể crawl được, và kèm theo đó là sự sụt giảm về khả năng kiếm tiền của Google. Tác giả nghĩ đó cũng có thể là lý do khiến Google phải đẩy mạnh phát triển PWA để hỗ trợ cho nền tảng web, níu giữ người sử dụng ở lại nền tảng này.


Có thể nói, sự ra đời của Hybird app là một cộc mốc khá quan trọng thể hiện rõ cách nhìn và sự mong mỏi của các nhà phát triển trong việc optimize chi phí phát triển ứng dụng. Và câu hỏi đặt ra là, tại sao các trình duyệt bản thân nó không nên là một bridge software cung cấp các API để có thể cho các ứng dụng web có thể truy cập vào phần cứng của thiết bị. Chúng ta có thể bắt đầu nghĩ rằng, đó là một phần trong những thay đổi sắp tới của các browsers, và đó là lý do lý luận về PWA và sự hỗ trợ cho lý luận đó được hình thành và đẩy mạnh.

Các tiêu chí về [PWA](https://developers.google.com/web/progressive-web-apps/):
 
* Progressive - Hoạt động cho tất cả mọi người, không liên quan tới việc lựa chọn browser, bởi chúng được xây dựng với những sự cải tiến như là một nguyên lý cốt lỗi.
* Responsive - Có thể hoạt động tốt trên mọi thiết bị như desktop, mobile, tablet, với mọi kích thước màn hình.
* Connectivity independent - Có thể hoạt động ngay cả khi offline (dựa trên Service Worker) và hoạt động tốt trong điều kiện network chậm.
* App-like - Sử dụng app-shell để cung cấp các chức năng định hướng và sự tương tác giống như app.
* Fresh - Luôn update phiên bản mới nhất (dựa trên Service Worker)
* Safe - Tất cả phải được phục vụ thông qua HTTPS để tránh bị nghe lén và đảm bảo nội dung không bị giả mạo.
* Discoverable - Có để được nhận dạng như là ứng dụng (dựa trên Service Worker, và W3C manifests ) và cho phép Search Engines có thể tìm thấy.
* Re-engageable - Tạo ra sự tương tác lại ứng dụng dễ dàng thông qua các chức năng chẳng hạn như Push Notification.
* Installable - Có thể Add to Homescreen để giữ lại ứng dụng trên màn hình.
* Linkable - Dễ dàng share, chia sẽ điều mình muốn đến với người khác thông qua URL mà không cần phải cài đặt.

> 10 tiêu chí nhận dạng một ứng dụng được xem là PWA với sự giúp đỡ của Google Translator.

PWA không hoàn toàn là một giải pháp về công nghệ, mà là một tập các tiêu chuẩn được định nghĩa cho các ứng dụng web follow theo nhằm mang lại sự trải nghiệm tốt nhất cho người dùng, với sự hỗ trợ của browser về các API có liên quan như Service Worker, Push Notification v.v...

Điều ý nghĩa của một ứng dụng theo tiêu chuẩn của PWA không phải là nó có thể tận dụng được sức mạnh từ phần cứng của người sử dụng hay không như cách mà nhiều lập trình viên lần đầu nghe qua quan tâm, mà là nó giúp cho các ứng dụng web có thể tốt hơn từ góc độ performance  bên trong ứng dụng, đến trải nghiệm về UX/UI bên ngoài cho người sử dụng.

Để hiểu được PWA là gì, cần phải nhìn về Native App và Web App ở góc độ ưu nhược điểm của từng đối tượng. Và khi nhìn thấy nhược điểm của chúng, cũng là lý do đầy đủ để chúng ta hiểu PWA ra đời như là một giải pháp hoàn thiện cả hai nền tảng này bằng cách mang ưu điểm của cả hai.

## Nghiên cứu mới về trải nghiệm người sử dụng

Ngày trước, một website tốt là một website có **Page Speed** cao, điều đó có nghĩa là trong thời gian vài giây nó phải tải toàn bộ nội dung cần thiết về thiết bị, và từ đó trình duyệt có thể hiển thị giao diện và cho người dùng tương tác. Điều đó có nghĩa là, trong thời gian tải toàn bộ nội dung của website, người dùng chỉ nhìn thấy một màn hình trắng tinh khôi, hoặc là một dấu hiện đang tải trang với animation nhàm chán và có thể họ sẽ bắt đầu thấy mất kiên nhẫn trong các điều kiện như network bị chậm.

Theo nghiên cứu của Google, một website tốt phải cho một sự trải nghiệm liên tục không gián đoạn thuyết phục người dùng tin là nó đang hoạt động để họ không rời bỏ ứng dụng, cũng như không cảm thấy phải khó chịu khi phải chờ đợi.

Sự tải trang, các nội dung cần thiết để có thể tạo ra một ứng dụng hoàn chỉnh có thể chia thành nhiều giai đoạn phù hợp với nhu cầu và khả năng tương tác của người dùng. Ứng dụng không cần phải load tất cả mọi thứ lên sẳn trong khi có rất nhiều tính năng người dùng có thể chưa cần dùng tới hoặc là ít khi dùng tới.

## Các giai đoạn trải nghiệm cơ bản

1. **First Paint** - Định nghĩa việc website cần tải thật nhanh để người sử dụng thấy nó hoạt động chứ không phải là một màn hình trắng tinh vô hồn.
2. **First Meaningful Paint** - Định nghĩa về việc website cần phải hiển thị những điều có ý nghĩa để người sử dụng có thể nhìn thấy ví dụ như những hình ảnh banner, video v.v... gọi là **Hero Element**
3. **Time to Interactive** - Định nghĩa về cách làm thế nào người sử dụng có thể bắt đầu tương tác với website của bạn cũng trong gian nhanh nhất, có thể thao tác với điều họ cần, mà không cần phải đợi tải hoàn toàn trang, ví dụ như họ đã có thể bắt đầu với search box, hoặc xem video, đi vào sản phẩm chi tiết.

# Tại sao PWA có thể trở thành tương lai của ngành web

Như đã nói, việc mobile web vẫn có những thế mạnh mà không thể bị đánh bại, bởi những giá trị cốt lỗi chưa thể bị thay thế trong tương lai gần như đã đề cập vốn rất chi tiết ở trên.

Nhưng với sự thay đổi nhanh về phần cứng cũng cũng như về hệ sinh thái các phần mềm từ hệ điều hành cũng như Native App trên các thiết bị di động, đòi hỏi các ứng dụng web phải thay đổi để thích nghi với sự kỳ vọng cao hơn về nhu cầu trải nghiệm của người dùng. Rất khó để chấp nhận với một thiết bị đẹp, cấu hình mạnh mẽ, và đắc đỏ lại tải một trang web lên có vẻ chậm chạp, hiệu năng kém và thiết kế cẩu thả.

Những lý luận và tư tưởng của PWA là tuyệt vời và có thể áp dụng để làm cho sản phẩm của chúng ta tốt hơn, điều đó hứa hẹn một thị trường hấp dẫn về các website đã có cần phải thay đổi và các website mới cần phải được built trên các nền tảng công nghệ mới và tư tưởng mới. 

Nếu chúng ta không nắm bắt đúng thời điểm, đúng điểm rơi của công nghệ, chúng ta sẽ bị bỏ lại phía sau, lạc hậu và khi phần lớn khách hàng quay lưng đi với mình thì đã muộn. Có rất nhiều bài học về điều này như của Nokia, của Yahoo... có thể sự đỗ vỡ của các tập đoàn khổng lồ này đến từ nhiều nguyên nhân, nhưng trong số đó chắc chắn phần lớn từ các sản phẩm thiếu sản tạo, kém hấp dẫn đối với người tiêu dùng, thậm chí không muốn nói là lạc hậu trong tồn tại của nó so với đối thủ.

# Những khó khăn khi ứng dụng PWA

1. Nguồn nhân lực về PWA hiện tại đang thiếu hụt mà chưa dễ dàng được khoả lấp trong thời gian ngắn sắp tới, do các công nghệ và nền tảng vẫn còn mới. Tác giả sẽ viết một bài sắp tới để nói sâu hơn về vấn đề này cũng như giải pháp khắc phục cho các tổ chức muốn phát triển sản phẩm theo tư tưởng của PWA.
2. Sự thiếu hỗ trợ đầy đủ từ các nhà phát triển chẳng hạn như từ Apple, nhưng điều này đang và sẽ sớm được khắc phục, bạn có thể tham khảo ở đây để thấy tính năng này [đang được phát triển](https://webkit.org/status/#?search=service%20workers) bởi Apple
3. Những lo ngại của cộng đồng developer do cách hiểu sai là nó không thể sử dụng được phần cứng của thiết bị.
4. Các lãnh đạo, cấp trên vẫn chưa thấy được nhiều value để chuyển đổi từ những website truyền thống sang nền tảng mới. Nhưng các con số và thống kê cũng cho thấy việc chuyển đổi theo tương tưởng và mô hình công nghệ mới hơn là điều không thể nào né tránh.

# Những nhà phát triển tiêu biểu

Bạn có thể nhìn qua các website này để tìm hiểu các website đó hoạt động như thế nào để tham khảo cho website của mình.

Ở nước ngoài có thể kể đến:

1. Flipkart - Ấn độ, xem chi tiết [tại đây](https://developers.google.com/web/showcase/2016/flipkart).
  - Với phiên bản PWA mobile thời gian user ở lại website là: 3.5 minutes so với phiên bản mobile cũ không PWA là 70 giây.
  - 3x tăng thời gian user ở lại website.
  - 40% tỉ lệ tương tác tăng thêm.
  - 70% nhiều hơn CR đến từ Add to Homescreen.
  - 3x giảm tỉ lệ sử dụng dữ liệu.
2. Aliexpress - Trung Quốc, xem chi tiết [tại đây](https://developers.google.com/web/showcase/2016/aliexpress).
 - 104% CR cho người dùng mới tất cả trình duyệt; 82% CR tăng thêm trên iOS
 - 2X những trang mà người sử dụng xem thêm với mỗi session cho tất cả trình duyệt.
 - 74% tăng thêm thời gian người sử dụng thành thêm với mỗi session tất cả trình duyệt.

Ở thị trường Việt Nam, các site nổi tiếng có thể kể đến:

1. [Sendo.vn](https://www.sendo.vn/)  đã release bản PWA dành cho mobile và đang làm tiếp cho Desktop.
3. Ngoài ra còn có các ông lớn khác như: [Shopee](https://shopee.vn/), [Lazada](https://www.lazada.vn/), [Tiki](https://tiki.vn/)

# PWA dưới góc nhìn cho doanh nghiệp

Đối với doanh nghiệp điều quan trọng là giảm chi phí, tăng doanh thu và lợi nhuận thì việc phát triển một ứng dụng PWA với các phương pháp luận và các giải pháp mới khiến cho chi phí phát triển dự án xét về lâu dài càng giảm, và lợi nhuận ngày càn được tối đa hoá.

Sản phẩm theo nền tảng này được thừa hưởng một hệ thống lý luận và phương pháp lập trình tốt để dễ dàng scale, maintain, improve, và thay đổi trong tương lai. Điều đó có nghĩa là các tính năng được thêm mới dễ dàng với chi phí thấp, rủi ro về lỗi được giảm.

# PWA dưới góc nhìn cho lập trình viên

## Bạn cần học gì, làm gì.

Nếu bạn chưa từng biết làm thế nào thì đọc bài viết này [Làm thế nào để trở thành Frontend developer](https://www.linkedin.com/pulse/làm-thế-nào-để-trở-thành-một-frontend-developer-phu-tran-phong/)

## Khả năng scale của dự án PWA

PWA đã được đưa ra từ cách đây từ vài năm trước, nhưng đây là điểm rơi để các ứng dụng có thể chuyển đổi sang nền tảng này, do sự phát triển vô cùng mạnh mẽ của các framework, thư viện được xây dựng và phát triển trên nền Nodejs, đáng để kể đến như React, Angular, Polymer dựa trên trên các công cụ bundle như Grunt, Gulp, Webpack... Chúng khiến cho việc tổ chức, tối ưu code được dễ dàng, tổ chức team hiệu quả và tránh được các rủi ro. Khản năng scale của dự án là dễ dàng cả về yếu tố con người, vật lý, và chi phí.

Không có sự hỗ trợ về các công cụ phát triển phần mềm từ hệ sinh thái của Nodejs, rất khó để có thể ứng dụng được các triết lý mà PWA đã đề ra, vì có thể dự án sẽ có chi phí phát triển cực lớn và rủi ro phát sinh theo nó là không thể nào dự đoán hay kiểm soát.

### Từ góc nhìn outsourcing

1. Làm thế nào để decoupling các task chức năng của ứng dụng, sao cho khi có nhiều tính năng thì có thể đẩy người vào, vì nếu không thể decoupling được tính năng, các chức năng được code độc lập, mỗi người làm một phần thì khi càn push người vào, thì sự phát triển của dự án chưa chắc tương xứng.
2. Giúp debug dễ dàng, khi có vấn đề gì xảy ra không được như mong đợi.
3. Dự án dễ testable, có thể viết chức năng test một cách dễ dàng.

### Từ góc nhìn production

1. Bao gồm cả các yếu tố của outsourcing.
2. Điều quan tâm là việc tính scale như thế nào khi có sự tăng tưởng của người sử dụng, đặc biệt là khi các phương pháp xây dựng một ứng dụng PWA phụ thuộc nặng nào Nodejs ngay cả khi bạn dùng framework/library nào đi chăng nữa thì các công cụ để xây dựng và tổ chức source code, build source code, debug sẽ cần đến gulp/grunt hoặc là Webpack. Nodejs về hiệu năng có thể được mọi người nghĩ là kém so với các ngôn ngữ khác và khó scale. Nhưng cái nhìn đơn giản đó là chưa đúng. Chúng ta cần nhìn về ứng dụng với các công nghệ được build stack với nhau như: Nginx, Redis, Database v.v... một ứng dụng chạy nhanh cần một thiết kế tốt, có thể hoạt động ổn định và scale theo chiều ngang chứ không nên được thiết kế chỉ dựa vào ngôn ngữ.
3. Ở góc nhìn production, các kỳ vọng về sản phẩm, về chi phí, thời gian, con người đều có đủ phương pháp lý luận và tổ chức để có thể đi đến việc dễ dàng kiểm soát và đạt được các tiêu chí đề ra.

> Ở một bài viết tiếp theo, chúng ta sẽ xem xét một ứng dụng open source PWA mẫu, để tìm hiểu các công nghệ được stacked như thế nào.

# Kết luận

Qua một bài viết khá dài, tác giả hi vọng sẽ mang lại cho bạn một trong những bài viết đầy đủ và chi tiết nhằm cung cấp các view nhìn mang giá trị tham khảo về một trong những nền tảng rất hứa hẹn thay đổi tương lai của ngành lập trình và phát triển ứng dụng web.

Bài viết sẽ không tránh khỏi các thiếu sót mang tính chủ quan của tác giả và cả các sai sót về các thông số, cách bình bày, bố cục, lỗi chính tả... nên hi vọng bạn đọc thông cảm bỏ qua.

Nếu bạn có bất kì câu hỏi hay phản biện bổ sung nào vui lòng để lại comment bên dưới.

Cảm ơn vì đã kiên nhẫn đọc đến đây.

# Tham khảo 

1. [Getting started with Progressive Web Apps
](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/)
2. [Mobile Web Hay Mobile App?](https://www.linkedin.com/pulse/mobile-web-hay-app-bui-quang-tinh-tu/)
3. [Why "Progressive Web Apps vs. native" is the wrong question to ask](https://medium.com/dev-channel/why-progressive-web-apps-vs-native-is-the-wrong-question-to-ask-fb8555addcbb)

# Nguồn bài viết

[Progressive Web App tương lai của nền tảng web](https://www.linkedin.com/pulse/progressive-web-app-t%C6%B0%C6%A1ng-lai-c%E1%BB%A7a-n%E1%BB%81n-t%E1%BA%A3ng-phu-tran-phong/)