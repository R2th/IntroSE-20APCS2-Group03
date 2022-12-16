Xin chào tất cả mọi người, như ở bài tiếp trước [Progressive Web Apps: What, Why and How](https://viblo.asia/p/progressive-web-apps-what-why-and-how-Qpmle2975rd) thì mình đã giới thiệu sơ qua về PWAs là gì? tại sao lại sử dụng PWAs? và dùng như thế nào? Và hôm nay mình sẽ xin phép được tiếp tục câu chuyện về PWAs khác, đó là câu chuyện về sự so sánh giữa PWAs và Native App để chúng ta có cái nhìn tổng quan hơn cũng như là chọn cái nào để ứng dụng vào product sao cho hợp lý với product đó. OK, Let's GO! :sunglasses::sunglasses::sunglasses::muscle:

Theo như thống kê thì hằng năm, con người chúng ta đang dành rất nhiều thời gian cho các thiết bị di động để truy cập internet. Trên thực tế cho thấy thì lượng truy cập bằng điện thoại còn gấp đôi so với truy cập bằng máy tính. Bởi lẽ vậy mà mấy năm trở lại đây thì thị trường mobile rất bùng nổ, và cháy rất mạnh. :joy: Từ đó mà các nhà phát triển web luôn phải tìm mọi cách để đưa website của mình len lỏi vào app để hy vọng được nhiều người sử dụng cũng như tăng doanh thu, vì thế mà các nhà phát triển web luôn đưa nó về app trên mobile hoặc làm cho web của mình đáp ứng resonsive trên web để đáp ứng trải nghiệm người dùng trên web bằng điện thoại, mà ví dụ điển hình của app trên mobile là Native App. Và bây giờ công nghệ ngày càng phát triển thì chúng ta cũng đã cho ra đời của Progress Web Apps mà mình đã giời thiệu ở bài viết trước, và đây cũng là cách để đưa web tiếp cận với người dùng mobile nhiều hơn. Vậy câu hỏi ở đây là giữa Native App và PWAs có khác nhau hay không, và nếu có khác nhau thì nó khác cái gì??? :anguished:
## Sự khác nhau giữa PWAs và Native App?? 

Và để rõ hơn cũng như tổng quan hơn thì mình sẽ chia nó ra thành các yếu tố nhỏ nhé:
1. Installation
2. Cross-Platform Availability
3. Offline Usage
4. Storage, Data, and Power
5. Updates
6. Discovery
7. Push Notifications
8. Security
9. Device Features
10. Cost
Chúng ta sẽ đi từng cái một nhé!
### Installation
Sự khác nhau đầu tiên về cách cài đặt của 2 cái nêu trên liên quan đến cách mà người dùng truy cập vào.

Đối với native app thì có lẽ chúng ta không lạ lẫm gì nữa, đến trẻ con ở Việt Nam hay bất kỳ đâu trên thế giới thì đều có thể biết được rằng muốn tìm mua hay download thì nhất định truy cập vào CH Play đôi với Android OS và App Store đối với IOS. Ở trên 2 chợ mua bán ứng dụng này thực sự rất là nhiều App với những nội dung khác nhau, từ giải trí, học tập, thậm chí là kiếm tiền từ app rồi shopping thì với người dùng nó thực sự là rất dễ dàng để tìm kiếm nội dung tương thích, phổ biến và rất tin tưởng vào những app ở đây, vì trước khi được publish lên 2 chợ này thì phải  qua vòng kiểm duyệt về nội dung, hình ảnh, ngôn từ của 2 nhà quản lý đứng sau là Google và Apple. Đó dường như là thói quen đối với chúng ta mất rồi!. :D

![](https://images.viblo.asia/c3661e7c-1a99-45f5-8732-322bb85cb72e.png)

Và sau khi đã đựợc publish thì tất các các native app đều có lượng rate, review, commend để từ đó chính là cái mà người dùng tin tưởng vào app đó, và sau khi OK thì chỉ cần click tải xuống và sử dụng thôi, EZ quá nhỉ!

Còn với PWA thì sao, nó có giống với Native App hay không? Câu trả lời là nó hoàn toàn không giống nhé! Bạn không vào App Store hay là CH Play để tải app về mà bạn sẽ vào trang web để download về, ví dụ điển hình mà chúng ta thấy đó chính là Intasgram:
![](https://images.viblo.asia/8e439fae-b381-4c13-96ae-180fa9a5dd5d.jpg)
 và đây cũng là một sản phẩm demo của mình, các bạn có thể mở bằng điện thoại Android or Iphone(IOS 11) và access bằng Chrome nhé thì nó sẽ hỏi là bjan có add vào app hay không thì nhấn có và cùng trải nghiệm nhé.
 [PWAs Demo](https://pwa-demo-29122018.herokuapp.com/)
 
 Mà nếu như bạn không biết về nó thì bạn sẽ rất ngạc nhiên đấy,, tôi cũng đã từng như vậy. :D và thực sự thì trải nghiệm người dùng khá là thú vị. 
 
 Tuy nhiên là đối với Android thì nó sẽ tự nhắc là bạn có thêm vào màn hình chinhs không, còn đối với Iphone thfi bạn phải chọn share rồi vô mục add to homescreen, Về khoản cài đặt này thì mình vẫn thực sự thích về native app hơn, bởi lẽ nó cũng đơn gian với nhiều người. Tuy nhiên hành động add này thì mình nghĩ nó là bị động bởi vì người dùng đa số là vô web chứ không phải vô web để download về rồi dùng app, và nữa là không có nhiều web có như vậy, cho nên là sự tiếp cận chưa được mạnh lắm.
 
 ![](https://images.viblo.asia/d30b4700-02d9-4765-b6c9-f665318256a4.png)
 
 ### Cross-Platform Availability
 Bởi vì hiện nay thì cũng đã có nhiều chương trình build multii platform rồi cho nên là việc build ra đưowjc nhiều nền tảng không còn là khó khăn nữa, tuy nhiên nó vẫn có một số trường hợp nhất định không làm như thế được, vậy nên nó phải đảm bảo được rằng mỗi nền tảng là một app khác để mà tương thích cho từng platform khác nhau, đó là native app
 
 Còn đối với PWAs thì nó lại là một câu chuyện khác hoàn toàn, đã từng được sử dụng nhiều như twiter, Forbes họ đã triển khai PWAs cho web app của họ, và điề đặc biệt là họ không cần code native gì cả mà điều họ chỉ cần làm là tích hợp PWAs vào Web app của họ để khi người dùng truy cập trang web bằng di động thì nó sẽ add to homescreen và nó chính là app rồi.
 
 Tuy nhiên không hẳn cái gì cũng tốt cả, việc responsive cho mobile cũng là một câu chuyện khác, để trải nghiệm người dùng đúng với app thực sự thì nó lại khác, và trải nghiệm người dùng rất là quan trọng, bởi vì nếu cảm thấy khó sử dụng thì họ thậm chí có thể là gỡ app đi luôn. 
 
 Còn với Native App thì người ta sẽ thiết kế một trải nghiệm người dùng theo chuẩn của mobile app chứ không phải là app trải nghiệm như web.
 ![](https://images.viblo.asia/d82bb276-ed70-45a4-a991-725e3dd522a4.png)
 
 ### Offline Usage
 Một chức năng mà hầu như mọi Native App đều có đó chính là Offline usage, mọi app có thể hoạt động khi không có internet. Và PWA cũng vậy, đã là App thì phải cho giống với native app, PWA cũng tích hợp cho mình cái gọi là offline usage này, nó có thể hoạt động được khi không có internet và nó được lưu vào bộ nhớ cache.
 
 Serrvice worker là công nghệ quan trọng nhất cho phép sử dụng offline trong PWA, SW về cơ bản nó là những file JS chạy độc lập với Web App. Nó giúp cải thiện được hiệu suât và tính năng bằng cách xử lý các yêu cầu network, caching app resource và tốt nhất đó chính là cho phép push notification ngay cả khi offline.
 
 Tuy nhiên không phải tất cả những gì trong PWA đều có thể sử dụng ở chế độ offline được mà chỉ một phần của PWA có thể sử dụng offline được cho nên nhà phát triển phải cân nhắc xem là cần cái gì thiết thực nhất để sử dụng ở trong app khi offline. Và như thế sẽ dẫn đến là phần không được kết nối sẽ là phần bị ngoại tuyến khi truy cập vào lúc không có internet.
 
 Và dĩ nhiên Native App sẽ ăn đứt PWA trong offline này rồi, mặc dù cho PWA đang cố gắng xây dựng và bắt kịp cho phép người dùng truy cập được nội dung lưu trong cache và đương nhiên là không thể tự nhiên mà truy cập vào để lấy thông tin được.
 ### Store, Data and Power
 Khi một Native App được cài đặt lên máy thì đương nhiên nó sẽ lấy trực tiếp bộ nhớ của máy, và nếu như nó là một ứng dụng nặng và sử dụng nhiều tài nguyên Ram thì các bạn biết rồi đó, nó sẽ ảnh hưởng trực tiếp đến hiệu năng, pin, và tuổi thọ của ram.
Và điều đó là điều mà không ai mong muốn cả, còn đối với PWA thì sao nhỉ?

PWA hầu như không xảy ra hiện tượng như vậy, bởi vì PWA đã cắt đi 92% mức sử dụng dữ  liệu. VÌ thế mà lượng dữ liệu cũng như truy cập cực nhanh và dễ dàng. 

Tóm lại là đối với native app thì nó có thể lưu lại dữ liệu lại để hoạt động ngoại tuyến, tuy nhiên nó sẽ không chính xác khi đó. Còn với PWA thì sẽ connect trực tiếp nhưng lượng dữ liệu là không nhiều.

### Updates
Nói về update thì chúng ta có thể nghĩ về 2 mặt là update của người dùng và update của nhà phát triển App.

Đối với native app thì nó sẽ có thể có cách update thủ công kiểu như là vô CH Play nhấn cập nhật cho từng ứng dụng, nhưng cũng có có những người để nó là tự động và hầu hết thì mọi người k biết được quá trình diễn ra quá trình cập nhật đó cho đến khi có bản gọi là big  update.

Còn đối với PWA thì cũng là update nhưng nguời dùng không cần phải cập nhật bằng tay mà nó là tự động, mỗi khi nhà phát triền cập nhật web thì tương tự app cũng được cập nhật theo lúc có mạng.

Như vậy thì về mặt update thì PWA rất tiện hơn nhiều, bởi lẽ không cần mất công vô cửa hàng để cập nhật mà là tải về, hơn nữa là tải về không phải là tải về phần thay đổi mà là tải toàn bộ và ghi đè lên app cũ và giữ nguyên dữ liệu. Còn PWA thì easy, không phải làm gì cả.  :vulcan_salute: 

### Discovery
Đối với Native App thì để mà tìm ra được nó thì dựa vào 2 kết quả search chính là 

1. App  Store, CH play...
2. Search Engine(Google, bings....)
Tuy nhiên để xuất hiện ở kết quả tìm kiếm trên 2 công cụ này thì thực sự không hề đơn giản, bởi lẽ là vì, những App store này thì hầu hết đều dựa vào cái gọi là App Store Optimization(ASO) - Chiến thuật tối ưu hóa:

* Để xác định một từ khóa thường được tìm kiếm được dựa vào phần mô tả của ứng dụng, title của app
* Sử dụng từ in đậm, title hợp lý với từ khóa đã chọn
* Mô tả ứng dụng phải thực sự là chu đáo, viết ra phải đảm bảo rõ ràng, dễ hiểu để tiếp cận người dùng dễ hơn, và chắc chắn là từ khóa phải có trong đoạn này.
* Lượng rate của app cũng là một cái rất quan trọng, nó đánh giá app của bạn có tốt hay không. Vì vậy mà mỗi App hầu hết đều thông báo rằng hãy rate 5* và commend. 
* Số lượt tải xuống cũng quan trọng không kém
Và nếu như app của bạn được đặt đúng vào category, label thì kết quả tìm kiếm cũng không tệ đâu.

 Còn PWA thì nó sẽ khác bởi vì nó hoạt động bình thưowfng như bao trang web khác và đơn giản là bạn search thêm pwa thì nó sẽ dễ dàng ra luôn.  Nên có thể là lượng truy cập vào PWA sẽ cao hơn Native App
 
 ### Push Notifications
 Đây cũng là một tính năng mà vì sao các nhà phát triền web đang xây dựng cho mình một ứng dụng mobile
 
 Nó là cách truyền thông nhanh nhất, so với email, hay tin nhắn. Nếu như có một chiến lược push notification hợp lý thì nó sẽ là con đường dẫn đến thành công của app đó,  bỏi lẽ người dùng thấy hợp lý thì vô app, cứ như thế nó sẽ trở thành thói quen.
 
 Ví dụ nhé, Ví dụ như hơi lâu lâu bạn bận bịu công việc mà quên mất ghi lại thu chi của hôm nay đi thì app sẽ giúp bạn nhắc nhở bạn, khoảng 9h hằng ngày nó sẽ nhắc nhở bạn rằng: "Hình như bạn quên tôi rồi phải không?" đại khái như vậy. thì người dùng sẽ truy cập thông qua notify đó, rất tiện phải không ạ.
 
 PWA thì hiện tại nó đang giới hạn trên Android chứ IOS thì chưa có về push notification này. Nhưng mình nghĩ rằng nó nhanh thôi, rồi cái gì cũng có cả thôi. :D
 
 
 ###  Sẹc-ciu-ri-ty(Security)
 Đây có thể nói là mọi Web App hay Mobile App thì rất cần thiết để bảo mật, đảm bảo về mặt dữ liệu không bị đánh cắp.
 
 Native App cũng có một giải pháp an toàn cho cả nhà phát triển và người dùng. Đó là sử dụng bảo mật nhiều lớp, và dễ dàng sử dụng hơn là PWA, điều này rất hữu ích nếu như nó có chức năng đăng nhập. HƠn thế nữa là nó cũng có thể sử dụng certificate để ngăn chặn một số loại tấn công nhất định, mà các ứng dụng PWA có thể mô phỏng được. Mặc dù vậy nhưng PWA vẫn được sử dụng thông qua HTTPS, cho phép mã hóa từ client đến server.
 
 Native app thì dù gì cũng được ủy quyền bởi GG và Apple nến cũng là nguồn đáng tin cậy, vậy nên khi mà bạn cài ứng dụng từ những nguồn như thế này thì rất đáng tin cậy, vậy nên khi bạn tải từ nguồn khác thì thiết bị sẽ cảnh báo là nguồn không đáng tin cậy đấy.
 
 Và dĩ nhiên là chúng ta có thể xây dựng một hệ thống bảo mật cho PWA nhưng chung quy lại thì về vấn đề bảo mật thì native app thì vẫn hơn hẳn.
 
 ### Devise Features
 Một trong những điều tốt nhất về việc xây dựng ứng dụng của bạn cho các thiết bị di động chính là khả năng đồng bộ hóa với các chức năng khác của địện thoại như là Camera, alarm, clock, gps, calendar....
 và nó không giống như trên trình duyệt thì chỉ có thể yêu cầu được gửi thông báo đến máy đó một lần trước khi bị chặn, còn app thì nó sẽ có thể được setting trong app.
 
 PWA cơ bản cũng có thể bị hạn chế giống như trang web vậy, điều đó có nghĩa là bạn không cần phải thêm quyền truy cập vào các tính năng của thiết bị. Bạn có thể tạo một kết nối nối để có thể thực hiện thông qua API (đăng nhập bằng Facebook...) để cải thiện trải nghiệm người dùng những vẫn tồn tại những hạn chế.
 
 Nếu bạn muốn ứng dụng của mình được hưởng lợi từ việc khai thác các tính năng của thiết bị như là quét vân tay, Face ID mà các Native App có thể thì vẫn luôn là sự lựa chọn phù hợp hơn là tích hợp API
 
 ### Cost
 
 Về cơ bản thì một native app được xây dựng bằng java, Kotlin cho androi or Objective-C, swift cho IOS. Nhược điểm của phương pháp này là đòi hỏi một quá trình phát triển, rồi update, bảo trì cho mối nền tảng, Còn bây giờ thì đã có React native đã suppport mình build multi flatform rồi nên cũng đỡ đi phần nào.
 Hơn nữa, người dùng ở mỗi nền tảng có mỗi cách trải nghiệm khác nhau, đối với các nhà phát triển indie thì không dễ để control việc này mà phải thuê thêm nhân viên hỗ trợ.
 Và kể cả về lộ trình ra mắt một App thì PWA cxung nhanh hơn vì nó đã được tích hợp trong lúc phát triển rồi, còn native app thì cần thời gian để duyệt qua GG và Apple
 
 ## SUMMARY
 
 Tóm lại là để mà chọn  được 1 trong 2 cái mà mình nhắc đến thì thực sự là rất khó, bởi lẽ là mô hình là một đặc điểm, ưu nhược điểm khác nhau, tùy vào mục đích sử dụng, đôi khi còn phải cần cả 2 nữa. Vì vậy mà hay cân nhắc khi sử dụng chúng nhé. 

Cảm ơn mọi người đã đọc tới đây!

**Tài liệu tham khảo**

https://www.mobiloud.com/blog/progressive-web-apps-vs-native-apps/