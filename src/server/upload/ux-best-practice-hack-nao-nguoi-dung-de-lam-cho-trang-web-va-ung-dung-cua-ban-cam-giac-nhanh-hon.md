![](https://images.viblo.asia/78136040-e89d-45ae-8549-50cc30401107.gif)

Trong bài viết này, tôi sẽ thử cho bạn xem một số kỹ thuật design mà bạn có thể dùng, để giúp cho người dùng **"bị đánh lừa"** và cảm thấy trang web hoặc application của bạn chạy **"nhanh hơn thực tế"**.


> Bài viết này được lấy cảm hứng từ một cuộc trò chuyện của tôi với [Ada Rose Cannon](https://twitter.com/lady_ada_king), là developer thuộc team làm ra [trình duyệt web của điện thoại Samsung](https://twitter.com/SamsungInternet), khi chúng tôi gặp nhau ở hội thảo [ các nhà phát triển Google Chrome](https://www.youtube.com/playlist?list=PLNYkxOF6rcIC60856GnLEV5GQXMxc9ByJ). Đó là một cuộc nói chuyện khá thú vị giữa "Designer và Developer". Bạn cũng có thể nghe bản đầy đủ của cuộc trò chuyện bằng cách [tải xuống file podcast mp3](https://developers.google.com/web/shows/designer-vs-developer/podcast/) hoặc đăng ký podcast (đài radio online) của tôi ở [iTunes](https://itunes.apple.com/gb/podcast/are-designers-born-or-made/id1232586843?i=1000385044461) hoặc [Google PlayMusic](https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&isi=691797987&ius=googleplaymusic&link=https://play.google.com/music/m/Ivkbr5tikljngkr5nuzlogjwf7a?t%3DDesigner_Vs_Developer%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16) .

Đã bao giờ bạn rơi vào tình huống này chưa, bạn gọi cho một công ty bán hàng nào đó, và khi họ bảo bạn hãy đợi một lát trong khi họ đi tìm giá tiền hoặc xem sản phẩm còn hàng không, đầu dây bên kia phát nhạc chờ để bạn nghe cho đỡ chán. Giả sử như cửa hàng đó không có chức năng phát nhạc chờ thì sao? bạn có thể sẽ cảm thấy buồn chán muốn chết, thậm chí đợi khoảng 1 phút là quá quắt lắm rồi và nhiều người thô lỗ gác máy luôn. [Tòa soạn báo CNN đã tiến hành một cuộc khảo sát](http://work.chron.com/importance-onhold-messages-4665.html) cho thấy 70% người gọi đang bị giữ im lặng trong vòng **60 giây**. Bởi vì sự im lặng sẽ làm cho bạn nghĩ rằng người bên kia có lẽ đã ngắt kết nối, và sự chờ đợi sẽ cảm thấy lâu hơn thực tế. Ý tưởng của việc **phát nhạc chờ** là làm khoảng thời gian chết đó có ý nghĩa hơn, bớt căng thẳng hơn, giữ chân được khách hàng lâu hơn.

Sân bay Houston cũng có một vấn đề tương tự, hành khách đã phàn nàn về thời gian phải chờ đợi quá lâu khi đứng đợi hành lý của họ chạy ra băng chuyền sau khi hạ cánh. Khi máy bay hạ cánh gần nhà ga, không mất nhiều thời gian để hành khách đến được băng chuyền, nhưng cho dù họ đến sớm, họ vẫn phải đợi trung bình 7 phút sau khi hạ cánh để lấy được túi xách của mình. Khiếu nại vẫn tiếp tục xảy ra ngay cả sau khi sân bay thuê thêm nhiều nhân viên bốc dỡ hành lý. Sau đó, họ quyết định đỗ máy bay xa hẳn khỏi nhà ga, nghĩa là hành khách phải đi bộ xa hơn (lâu hơn) để đến được nhà chờ lấy đồ hành lý, và thật ngạc nhiên là, [các khiếu nại giảm xuống còn gần như bằng 0](https://www.nytimes.com/2012/08/19/opinion/sunday/why-waiting-in-line-is-torture.html?_r=0) .

### Nhận thức về thời gian

Mỗi người cảm nhận thời gian khác nhau tùy thuộc vào cảm giác lo lắng của họ, và tùy thuộc vào họ đang ở trong môi trường như thế nào, đang thoải mái như ở nhà hay là đang vội vàng như khi đi ra ngoài. Trong nghiên cứu tôi tại Google, tôi nhận thấy rằng **75%** người dùng cảm thấy một trang web chạy nhanh khi họ đang ngồi duyệt web ở nhà, nhưng nếu họ ra ngoài và cũng vào trang web đó, chỉ còn **52%** người dùng cảm thấy trang web vẫn chạy nhanh, những người còn lại cho biết cảm thấy phải đợi trang web lâu hơn khi ngồi ở nhà. Người dùng trẻ tuổi cũng cảm thấy các trang web tải chậm hơn những người lớn tuổi. Nhìn chung, tôi nghe người dùng mô tả là nó chậm hơn khoảng **80 mili giây** so với thực tế. Vì vậy, nếu bạn đang đi ra ngoài, và bạn phải chờ đợi thứ gì đó, thì bạn sẽ cảm thấy quá trình chờ đợi nó lâu hơn thực tế.

Các trang web và ứng dụng trước và sau khi đã được tôi ưu hóa vẫn sẽ cho trải nghiệm là loading chậm, 30% người dùng sẽ vẫn nhận thấy chúng chậm hơn so với thực tế. Vậy làm thế nào chúng ta có thể giải quyết vấn đề này? Vâng, chúng ta cần phải **"hack não"** người dùng bằng cách **đánh lừa thị giác** của họ.

### Hiển thị là "Đang tải..." (Loading)

Hiển thị một màn hình trắng trơn là rất tệ, khiến cho người dùng ngồi nhìn và không biết có chuyện gì đang xảy ra, không biết app có đang chạy hay là bị **"đơ"**. Một số lập trình viên tiến bộ đã chuyển qua dùng một ảnh động (gif) có thêm 1 con trỏ xoay xoay (spinner) trong khi app làm gì đó, nhưng thật ra việc có thêm con trỏ xoay xoay cũng cho cảm giác tù túng là như nhau.

Trong ví dụ này, tôi sẽ vẽ lại giao diện ứng dụng đọc báo Tailpiece để làm demo. Như bạn thấy ở hình bên dưới, màn hình loading cảm thấy lâu hơn vì người dùng phải ngồi chờ nội dung tải về. Ngoài ra, con trỏ quay quay cho thấy ứng dụng trong trạng thái "đang suy nghĩ" thay vì "đang chạy".

![](https://images.viblo.asia/7bbeb6eb-0bc4-4d05-a33e-de904664a0ab.gif)


### Lấp đầy khung màn hình (Skeleton Screens)

Trong ví dụ này, thay vì sử dụng **con trỏ quay quay loading**, tôi sẽ lấp đầy màn hình bằng nội dung fake dạng khung màu xám (skeleton content). Mặc dù ví dụ thứ 2 này tốt hơn một chút so với ví dụ trên, việc sử dụng các vị trí tiêu đề tin tức và ảnh tin tức dạng màu xám chưa hẳn là tốt nhất. Nó vẫn cho cảm giác giao diện bị lỗi và không hiển thị bất cứ thông tin gì, thể hiện là sắp có nội dung sẽ được bắn ra màn hình, cứ chịu khó ngồi đợi đi.

![](https://cdn-images-1.medium.com/max/800/1*HMLUpXDWdbIdh39KpjosPA.gif)



### Làm kinh ngạc người dùng (Staggering)

Sử dụng hỗn hợp giao diện gồm màn hình khung (Skeleton Screens), các text mô tả đang tải cái gì về và cả các đoạn ảnh động gif để thể hiện **"đang cố gắng lôi content về cho mày"**, bạn có thể khiến người dùng há hốc mồm ngồi nhìn và làm cho toàn bộ trải nghiệm cảm thấy nhanh hơn. Ý tưởng là đưa ra các thông tin là app đang làm cái này cái kia, cho người dùng biết là họ đang chờ đợi cái gì và cái gì load được trước thì hiện ngay ra trước.

![](https://cdn-images-1.medium.com/max/800/1*baJ8AGpSL8npMPX8sagLUQ.gif)

Bạn cũng có thể viết thêm một màn hình animation riêng (splash screen) và show nó lên để ẩn cái màn hình thực sự đang tải dữ liệu bên dưới. Tôi thử sử dụng [giao diện dạng material của anh Google phát minh ra](https://material.io/design/material-studies/) để vẽ vời một vài animation nhí nhố như bạn thấy bên dưới.

![](https://cdn-images-1.medium.com/max/600/1*SKruiplo6bLHmjke2lNq6g.gif)

![](https://cdn-images-1.medium.com/max/600/1*U2E1SfeS8B8BJXcEO-D90A.gif)

Việc có một hoạt cảnh (animation) tốt làm cho người dùng thực sự kinh ngạc và nghĩ rằng app này hẳn phải được đầu tư rất **"chất"** để làm ra, sẽ đáng công chờ đợi.

Sự chuyển động mượt mà của animation cũng khiến cho người dùng cảm thấy app nhẹ nhàng, lung linh, có sự đầu tư nghiêm túc và khá **"đẹp"**. Một lần nữa xin khẳng định, tất cả chỉ nhằm mục đích làm người dùng đỡ nhàm chán.

Hình bên dưới cho thấy, nên cho thêm các animation vào cả các icon khi được nhấn vào, giúp người dùng nghĩ là app này khá **"nhạy"**

![](https://cdn-images-1.medium.com/max/600/0*T-n3O2qZjNNDxZQ9)

![](https://cdn-images-1.medium.com/max/600/0*KkYg4Dy1IkTBENB6)


### Tạo animation cho cả thanh Menu (Navigation)

Các nghiên cứu của [Facebook](https://techcrunch.com/2013/09/18/facebooks-new-mobile-test-framework-births-bottom-tab-bar-navigation-redesign-for-ios-5-6-7/) , [RedBooth](https://redbooth.com/blog/hamburger-menu-iphone-app) , [Spotify](https://techcrunch.com/2016/05/03/spotify-ditches-the-controversial-hamburger-menu-in-ios-app-redesign/) và [Google Plus](https://youtu.be/OkeJg92PA4E?t=2617) cho thấy rằng nếu để các mục menu bi ẩn đi thì người dùng sẽ ít khi nhấn hoặc không thèm nhấn vào chúng. Facebook cũng thấy rằng việc chuyển thanh menu app xuống bên dưới sẽ khiến cho họ nghĩ là ứng dụng chạy *có vẻ* như nhanh hơn. Bởi vì thanh menu nằm ngay trong tầm mắt, và di ngón tay là menu bật lên nhanh chóng làm cho người ta cảm thấy nhanh hơn. **`Vì vậy, nên cố gắng đưa thanh menu của bạn xuống bên dưới, ngang tầm mắt của người dùng, và đưa thêm hoạt ảnh animation khi show menu để thể hiện là menu rất "nhạy"`**. Bạn có thể thấy ví dụ bên dưới viết dưới dạng UI material của tôi, [Owl](https://material.io/design/material-studies/owl.html#motion), tôi đã tự custom thanh menu nhưng luôn giữ triết lý chung là menu **không bị ẩn đi vào icon 3 dấu gạch**, mà luôn luôn nằm cố định bên dưới app để dễ nhìn thấy và dễ di ngón tay vào. Điều hướng bên dưới app cũng tiện lợi hơn trên các thiết bị di động, vì người dùng có thể tiếp cận các button chỉ bằng một tay, một lần nữa giúp giữ trải nghiệm ấn menu nhanh chóng và tự nhiên.

![](https://cdn-images-1.medium.com/max/800/0*6GyLCtZK6wAGaqX7)

### Phản hồi ngay tức thì

Để người dùng hiểu điều gì sẽ xảy ra tiếp theo là rất quan trọng, nhưng việc phản hồi cho người dùng về các thao tác họ đang thực hiện cũng sẽ giúp ứng dụng hoặc trang web của bạn cảm thấy chạy nhanh. Bằng cách sử dụng các chuyển động animation hoặc hiện ra thông tin khi di chuột (hover) vào icon bạn đảm bảo với người dùng rằng hành động họ thực hiện được phản hồi **"ngay lập tức".**

![](https://cdn-images-1.medium.com/max/800/0*RuSUSzYxUWxXLFgy)

Bằng cách sử dụng một số kỹ thuật thiết kế này, bạn có thể làm người dùng có được cái họ muốn một cách nhẹ nhàng thanh thản, và cũng làm cho ứng dụng của bạn cảm thấy nhanh hơn bằng cách giảm sự lo lắng của người dùng. Để tìm hiểu thêm về nhận thức của người dùng và cách bạn có thể thiết kế phù hợp với nó, hãy thử đọc Ebook của tôi, [Need for speed](https://www.awwwards.com/brain-food-perceived-performance/?utm_source=thinkwgoogle&utm_campaign=brainfood) để có thêm thông tin.

*Bạn có thể tìm hiểu thêm về thiết kế UX tại [Nguyên tắc cơ bản về thiết kế trải nghiệm](https://developers.google.com/web/fundamentals/design-and-ux/ux-basics/).*



-----
Bài này là một bài dịch, các bạn có thể đọc bài gốc tại đây: https://medium.com/dev-channel/hacking-user-perception-to-make-your-websites-and-apps-feel-faster-922636b620e3