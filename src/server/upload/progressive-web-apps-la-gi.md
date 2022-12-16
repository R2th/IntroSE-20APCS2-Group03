Bài viết này giới thiệu tổng quan này là những điều được mình đúc kết lại từ course [Progressive Web Apps (PWA) - The Complete Guide](https://www.udemy.com/course/progressive-web-app-pwa-the-complete-guide) cùng với những suy nghĩ dựa trên quan điểm của mình về Progressive Web App. Bạn cũng có thể tham gia khóa học này để ủng hộ tác giả. Còn bây giờ mời mọi người cùng đón đọc!

## Progressive Web App là gì?

Để tìm hiểu về Progressive Web Apps thì trước tiên chúng ta cần trả lời một câu hỏi quan trọng:

**Vậy Progressive Web App là gì?**

![](https://images.viblo.asia/1f7b6a6c-68ad-46ac-8c13-7529690b55f2.png)

Mình cũng hơi khó để  giải thích cho các bạn nghĩa của 3 từ *Progressive Web App*  là gì!!! Và tốt nhất thì mình nghĩ bạn đừng nên cố gắng giải nghĩa nó làm gì! :laughing:  Thực ra nó chỉ là một thuật ngữ để ám chỉ tới một vài tính năng mà bạn có thể thêm vào bất kỳ ứng dụng web nào, bất kỳ trang web nào, miễn là nó đang chạy trên trình duyệt :heart_eyes: :laughing: để làm gia tăng khả năng của bản thân website (thêm nhiều cái mới mà trước đây website không làm được), đồng thời cũng tăng khả năng tiếp cận tới người dùng.

## PWA hoạt động như nào?

Để dễ hình dung hơn, hãy hiểu PWA là một website được tích hợp các chức năng ở trên. Kịch bản sẽ như sau:
- Người dùng tiếp cận với hệ thống của chúng ta thông qua website
- Trình duyệt sẽ detect được PWA và hiện thông báo nhắc cài PWA vào điện thoại
- Nếu người dùng đồng ý, icon của app sẽ hiển thị ra Homescreen và họ có thể sử dụng như dùng một app thông thường. (dù vẫn chạy trên web browser nhưng app sẽ không còn address bar của browser nữa, tất nhiên vẫn có thể show nếu muốn)
- Nếu người dùng không đồng ý thì họ sẽ tiếp tục sử dụng trên nền tảng web cùng với những trải nghiệm dùng web tốt hơn trước.

## Mục đích sử dụng

![](https://images.viblo.asia/4613baff-d05d-400a-949e-16b2b8787130.png)

Mục đích cuối cùng khi cải tiến web sang *Progressive Web App* là để mang lại cho người dùng sự trải nghiệm mới có cách thức hoạt động giống như là một ứng dụng native trên điện thoại mà bạn cài từ AppStore hay PlayStore về.

Có thể tạm phân chia ứng dụng bạn dùng trên điện thoại thành ba loại theo cách thức nó được triển khai:
* Native app: Các app viết theo ngôn ngữ riêng của từng nên tảng điện thoại như Java/Android, Swift/IOS..
* Web app: Chính là các hệ thống website truy cập thông qua browser
* Hybrid app: Là các app viết bằng các ngôn ngữ sử dụng trên web (Javascript) nhưng lại build thành kiểu native app để upload lên store. => PWA, React Native sẽ nằm thuộc nhóm app loại này.

Nếu nói tới đây có thể các bạn đã liên tưởng luôn tới web app có hỗ trợ responsive - co giãn được theo màn hình điện thoại. Cái này chúng ta đã làm dăm bảy năm nay rồi nhưng nó lại không phải là progressive web app. Xin anh em đừng hiểu nhầm nhé! :D Một số bạn khác có thể nghĩ tới dạng web theo kiểu universal giống như Viblo là PWA. =)) Sự thật, nó cũng chưa phải là progressive web app đâu nha!

*Một vài tính năng* mà mình đề cập tới ở phần trước để làm giàu thêm khả năng làm việc của cái web, mang tới trải nghiệm như dùng native mobile app bao gồm:
- App vẫn hoạt động khi bạn ở trạng thái offline - không có mạng
- Có Icon của app trên màn hình home
- Truy cập và sử dụng camera trên điện thoại
- Sử dụng được location
- Đồng bộ dữ liệu khi app ở trạng thái background

Mấy cái này thì chúng ta khó lòng mà thực hiện được với kiểu web thông thường. Nhưng bây giờ khi hầu hết các trình duyệt phổ biến đều hỗ trợ nên chúng ta có thể sử dụng chúng.

## PWA sẽ chỉ hỗ trợ các trình duyệt mới??

Nếu bạn để ý mình có đề cập ở phần trên đó là chúng ta sẽ thêm các tính năng mới trên vào một website của bạn để nó trở thành Progressive Web App, nghĩa là bạn mang thêm điều mới chứ không phải là xóa bỏ các cái đã có. Tất nhiên không phải là chúng ta sẽ cần phải thay đổi tất cả code cũ, cũng không phải là sẽ không sửa đổi gì ở code cũ nhưng một vài điều quan trọng chúng ta cần hiểu đó là:
- Website của bạn, nó vẫn hoạt động trên các trình duyệt cũ, thật đấy!
- Nó sẽ mang lại trải nghiệm tốt hơn nếu người dùng sử dụng các trình duyệt hiện đại với các tính năng mới
- Tất nhiên, có thể một số tính năng sẽ không khả dụng với trình duyệt cũ, nhưng mà cái web của bạn thì chắc chắn là nó vẫn sẽ hoạt động. Na ná tương tự như web kiểu universal thì nếu bạn dùng một trình duyệt mới, khi click link chuyển sang một trang khác, website sẽ không tải lại mà nó chỉ render lại những phần cần thay đổi; ngược lại nếu bạn dùng trình duyệt cũ, khi nhấn link thì browser cũ vẫn sẽ load lại cả trang và điều này không hề ảnh hướng tới những user dùng loại trình duyệt này. Chỉ là nhưng ai mà dùng trình duyệt support PWA thì lúc đó, họ sẽ có những trải nghiệm tốt hơn mà thôi.

Vậy thì lợi ích của PWA mang lại là gì để có thể thuyết phục chúng ta migrate website?

## Tại sao PWA lại được ra đời?

### Mobile Web vs Native Apps

![](https://images.viblo.asia/1d5ee044-110d-45b4-8c98-13ec64c2ff51.png)

Chúng ta sẽ so sánh một chút giữa Mobile Web (*không phải PWA*) và Native apps trong biểu đồ trên. Đây là số liệu khá cũ được thống kê từ năm 2015 được thực hiện bởi comScore tại Mỹ về thời lượng sử dụng smartphone mà chúng ta có thể dùng làm tư liệu tham khảo.

Trong đó thì 87% thời gian người dùng sử dụng smartphone sẽ dành cho các ứng dụng native. Chỉ 13% là sẽ mở browser lên để vào web. Theo cá nhân mình nghĩ thì cũng bởi bản thân người dùng đã quen với việc sử dụng các app đang cài sẵn trên điện thoại bởi tính tiện lợi không phải đắn đo sau khi mở browser xem URL là gì rồi mới truy cập. Thay vào đó thì các icon của app đã hiển thị ở homescreen luôn rồi.

Ngoài ra, một điểm rất quan trọng đó là native app thì có Push Notification tới điện thoại. Điều mà mobile web không có. Và tất nhiên, nó sẽ làm tăng lượt tương tác giữa người dùng với ứng dụng native lên. Và đây là điểm lôi kéo người dùng mở lại ứng dụng trên điện thoại. Chưa kể tới các chức năng khác mà native app có đã được liệt kê ở phần trước.

Chính bởi vậy, khi dùng PWA được ra đời để xóa bỏ lằn ranh giới về chức năng ở trên. PWA sẽ mang cơ hội để chia sẻ miếng bánh 87%. (y)

### 80% thời gian dùng điện thoại chỉ cho top 3 app

![](https://images.viblo.asia/326de17e-e857-4ec9-9601-d3db57fbc8b1.png)

Nếu 87% thời lượng user là sẽ dành cho các ứng dụng native thì 80% thời lượng đó lại sẽ chỉ dành cho Top 3 apps được dùng trên điện thoại. Những app thuộc top này chắc có lẽ như là Facebook, Google, Twitter. Vậy thì chỉ còn lại 20% thời lượng ít ỏi là sẽ dành cho tất cả các ứng dụng còn lại trên điện thoại.

Một thống kê khác với top 1000 native apps chỉ ra rằng, với top 1000 native app này thì có 3.3 triệu người dùng native, nhưng có tới 8.9 triệu người sử dụng web. Điều này nói lên, web thực sự tiếp cận được tới nhiều người dùng hơn là native app. Trong khi với native, hầu như hàng tháng chúng ta chẳng cài thêm mới ứng dụng nào vào máy cả.

Liệu có một cách nào đó để 80% thời lượng của user sẽ dành thêm được cho web của bạn? PWA sẽ chính là giải pháp mang web của bạn chạy giống như một ứng dụng native dưới mobile. Chủ động gợi ý cài web app vào điện thoại khi chúng ta vào web trên trình duyệt điện thoại và họ không cần phải truy cập vào PlayStore, AppStore để tìm kiếm.

![](https://images.viblo.asia/f1c124a3-b8cc-452a-a020-645d6b57f004.png)

Vậy nên PWA như đã tổng hợp được ưu điểm của Native app với các chức năng mà trước đây web không làm được + khả năng tiếp cận được người dùng cao của nền tảng web.

## Chi phí phát triển

Quay lại với các loại app mà mình đã nêu ở phần đầu bài viết: Native app, Web app và Hybrid app.

Nếu phát triển một sản phẩm mình thí dụ bạn cần:
- Developer riêng để tạo phiên bản web
- Developer riêng để tạo bản mobile app cho mobile: Android, IOS, hoặc nếu dùng react-native hoặc vue-native thì bạn vẫn cần một ông chuyên làm hybrid app với react hoặc vue.

Nếu biến web của bạn thành Progressive Web App, thì đồng nghĩa với việc bạn không cần thiết tới dev riêng chuyển để phát triển bản mobile native hoặc react-native nữa. Hãy nhớ lại là progressive web app vẫn tạo Icon ứng dụng, sử dụng location, camera và push notification về điện thoại nhé. Tất nhiên, nó còn phù thuộc lớn vào loại hình của web, những dạng business logic không quá phức tạp như tin tức, blog.. thì việc dùng PWA mình nghĩ đó sẽ là hợp lý. :)

## Tổng kết

Với những phần nội dung đã đề cập ở trên, bạn có thể thấy được rằng Progressive web app chung quy rút lại sẽ có 3 điểm chính:
- Be reliable: Lần đầu tải trang nhanh hơn, hỗ trợ chạy app ngay cả khi offline
- Fast: Phản hồi lại các hành động của người dùng trên app trở lên nhanh chóng
- Engaging: Cung cấp trải nghiệm tốt hơn khi hoạt động của app trở nên giống native app

Trên đây là nội dung mà mình muốn chia sẻ, cảm ơn mọi người đã theo dõi và đọc bài viết này. Mọi câu hỏi thắc mắc, góp ý mọi người hãy thả cho mình comment phía dưới nhé! Xin chân thành cảm ơn!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***