Gửi anh em một nội dung khá hay về việc clone App Uber mà mình học được từ một bài dịch

### Tôi đã học được gì?
Trong quá trình làm, tôi đã khám phá ra khá nhiều thứ bất ngờ. Ví dụ như việc team Uber đã sử dụng và tận dụng khá nhiều material design cho ứng dụng chạy native trên iOS này. Ví dụ:

![](https://images.viblo.asia/2852be82-790b-4b16-bf4a-f7d77d585ee4.png)
*Ứng dụng của Uber trên iOS*

Để ý thử nhé, phiên bản này nhìn gần như giống y đúc phiên bản Android, ví dụ như các staple Android UI, floating action button, material design, v.v…

Trước đó tôi từng nghĩ những thứ như native widgets chỉ giống về phần engagement thôi. Tôi với bạn của mình thường tranh cãi về vấn đề này khá nhiều, tôi thì thiên về phần “native widget feel” nhiều hơn, trong khi Chen bạn tôi lại nghiên hẳn về single UI trên tất cả các platform.

Lần này Uber đã “ủng hộ” và đứng về phía Chen nhiều hơn, có thể nói phần UI của Uber được thiết kế gần như 1:1 giữa iOS và Android

Lý do cho triết lý thiết kế này cũng dễ hiểu thôi, họ có thể dùng đi dùng lại cho các platform. Dùng 1 screenshot dùng chung cho cả iOS và Android cho phần tài liệu training. Nói tóm lại, chỉ cần mọi thứ chạy mượt là ngon.

Ở thời điểm Android 2.x và iOS 6.x, sự khác biệt của 2 hệ điều hành này là khá lớn. Ví dụ chuyện có một vài tính năng khác biệt trên Android thôi cũng là một vấn đề. Nói chuyện hiện tại, nếu bạn không quy hết mọi về chung một nhà bằng các công cụ crossplatform thì sẽ khá tốn kém đấy. Nói về chuyện crossplatform, bạn cũng có thể tìm hiểu thêm [những công cụ crossplatform khá hay mà tôi từng đề cập đến. ](https://topdev.vn/blog/biet-chon-gi-day-flutter-react-native-hay-xamarin/)

### Transition vẫn còn nhiều khác biệt

Không biết có phải cố tình hay không, nhưng các transition giữa Android và iOS lại khá khác biệt. Ví dụ như Android thì dùng nhiều material style transition, trong khi iOS dùng cover và slide transition.

Nếu đây là cố tình, thì điều này có nghĩa là cái họ đã tư duy theo kiểu “feel” đập chết cái “look”. Hoặc cũng có thể họ không quan tâm lắm đến mấy cái transition này.

### Bug Portability

Đây là màn hình đăng nhập gốc của Uber trên Android:
![](https://images.viblo.asia/0a750c53-6bea-419d-b381-186e059193db.png)

Cùng một màn hình trên iOS trông giống nhau nhưng lại có lỗi hiển thị:
![](https://images.viblo.asia/57ee5012-ec84-4ecb-a375-e34a391eecd6.png)

Ở đây bạn không nhìn thấy phần text “Enter your mobile number”.

Dù Uber có dùng khá nhiều QA. Nhưng rõ ràng ta thấy rằng lỗi hiển thị này xảy ra ở những quốc gia có 3 mã dial digit. Phiên bản Android (phiên bản của tôi) xử lý vụ này ngon hơn hẳn. Tuy nhiên vì nó được mặc định trong lúc phát triển, nên lỗi này họ đã không chú ý tới.

Dù biết rằng Uber có rất nhiều QA. Nhưng lỗi hiển thị này đa phần vẫn xảy ra với những quốc gia có 3 dial digit. Bản Android của tôi build thì không gặp tình trạng này. Có lẽ vì tính “toàn cầu hóa” và hợp nhất như có đề cập ở trên, mà bên phát triển đã không nhìn ra lỗi này, hoặc không sửa được?

Các bản sửa lỗi được thực hiện cho phiên bản Android không được sửa trên iOS.

### Một số tính năng sẽ khó nhằn hơn trên Android

Nếu bạn chạy bản Uber trên iOS, để ý thử phần login screen ở trên, bạn sẽ thấy phần pattern của background sẽ xoay (rotate). Đây là một phần effect nhìn khá bắt mắt và dễ chịu.

Tuy nhiên không hiểu sao họ lại không làm cái hiệu ứng tương tự cho Android, có lẽ là thiếu lập trình viên để triển khai phần này?

Sau một thời gian triển khai thử trên Android, tôi mới nhận ra vì sao điều này không khả thi trên Android. Android gặp nhiều vấn đề ở phân khúc vector graphic, tức là khi bạn thử generate cái path tương tự và chạy rotation effect thì sẽ gặp error, lỗi báo như thế này

“OpenGLRenderer: Path too large to be rendered into a texture”

Một trong những cách xử lý trong trường hợp của tôi là disable hardware rendering. Vấn đề nằm ở chỗ bạn không thể biết được chuyện gì đã xảy ra. Rendering path không show exception nào cả. Đọc code Android liên quan đến lỗi đó cũng không tìm ra nguyên nhân.

Dù không có được hiệu ứng ngon lành như trên iOS thì cũng đành phải chấp nhận sự khác biệt này.

### Không có tính năng SMS trên Android

Điều tôi thích nhất của Android chính là việc nó cho developer có nhiều tự do hơn. Đây tuy nhiên, cũng là con dao 2 lưỡi. Bạn có thể xem thêm một số c[ông cụ khá tốt dành cho Android tại đây.](https://topdev.vn/blog/30-cong-cu-phat-trien-ung-dung-android-chuyen-nghiep/)

Một ví dụ điển hình là SMS interception support. Khi bạn có một tin nhắn SMS activation, Android có thể lấy luôn thông tin trên SMS và skip luôn bước type in.

Vậy mà, phiên bản Uber Android lại không có tính năng đó, chỉ vì họ không dùng native Android activation

Sau khi đọc nhiều tài liệu, thì tôi mới nhận ra rằng Uber cũng gặp nhiều vấn đề vì “too many permissions”. Tôi không biết liệu bất cập này có phải do API level 23 (nơi cho phép Android dùng permission) hay không? Dù thế nào đi nữa, tôi cũng đã thêm tính năng này vào phiên bản của mình và cải thiện đáng kể phần signup cho sản phẩm.

Điều tôi yêu thích nhất về Android là mức kiểm soát thấp mà bạn nhận được với tư cách là nhà phát triển. Đây là một con dao hai lưỡi nhưng trong một số trường hợp nó đánh bại tất cả mọi thứ khác …

Một ví dụ tuyệt vời là hỗ trợ chặn chặn tin nhắn SMS. Khi bạn có khả năng kích hoạt với SMS, Android có thể lấy được SMS sẽ đến và nhập nó vào.

Đáng ngạc nhiên là ứng dụng Uber bản địa không làm điều đó. Họ không áp dụng tính năng kích hoạt SMS cho Android.

Sau khi đọc một chút, có vẻ như Uber đã nhận được nhiều flak trong nhiều năm cho “quá nhiều quyền cho phép”. Tôi nghĩ họ chỉ quan tâm đến việc cho phép thực hiện các phone call …

Tôi không chắc chắn nếu điều này sẽ áp dụng nhiều như thế nào với mức API 23 (khi Android chuyển sang lời nhắc cho phép). Dù bằng cách nào tôi đã thêm chức năng này vào phiên bản Uber và làm cho quá trình đăng ký trở nên dễ dàng hơn trên Android.

Potrait Lock ứng dụng

Đây là một tính năng mà tôi khá thích, tuy nhiên Uber đã lock tính năng này. Tôi cũng khá hiểu rằng việc cho phép việc xoay landscape trên điện thoại sẽ khiến sinh ra nhiều vấn đề hơn về mặt tính năng. Điều này cũng vô tình chỉ ra một điểm khá hay rằng, Uber tư duy tập trung vào tính năng nhiều hơn là tốn nhân lực vào trải nghiệm này. Rất đáng nể.

Suy ra, triết lý của Uber chính là function over form (chú trọng tính năng hơn). Gạt bỏ những thứ rườm rà không quá cần thiết, tập trung vào các tính năng chủ lực (core functionality)

Họ thay đổi thiên biến vạn hóa
Cho tới khi nhúng tay vào làm sản phẩm tôi mới thấy sự thay đổi liên tục của Uber là như thế nào. Khi mới bắt đầu, nút history được đặt dưới bottom, nhưng sau đó họ lại dời nó lên nằm ở phần search.

Việc dám thay đổi và thể nghiệm là rất quan trọng với một ứng dụng như Uber.
 
### Khổng Minh nói, phải biết MƯỢN!

Tôi dùng khá nhiều từ những thứ đã được phát triển, đa phần là từ Google. Ví dụ như, native Google Maps widget và một vài Google webservices (geocoding, directions, v.v). Tôi còn dùng Twilio và Braintree cho SMS/billing. Với những trợ giúp này, bạn có thể build những tính năng quan trọng của một sản phẩm lớn như Uber trong khoảng dưới 1 tuần

Việc dùng một API như Google Maps cho các tool crossplatform này sẽ giúp bạn giảm nhân lực đáng kể.

![](https://images.viblo.asia/406111f9-a4ef-4b5b-a78f-2a957314b3d3.png)

Tôi thật sự khâm phục các kỹ sư Uber. Đây là một ứng dụng phức tạp với giao diện tuyệt vời.

Sự đột phá luôn bắt đầu từ việc xây dựng một thứ gì đó mới, nhưng cũng không cần quá mới. Chúng ta có thể cải tiến từ những thứ có sẵn và xây dựng những cái kinh khủng hơn. Tôi nghĩ nếu tư duy việc build app như Uber trở nên đơn giản hơn, thì chúng ta sẽ có cơ hội thấy được những ứng dụng còn khủng hơn.

### Chúng ta học được gì

* Uber có giao diện người dùng gần như giống hệt nhau trong iOS và Android
* Các bản sửa lỗi được thực hiện cho phiên bản Android không được sửa trên phiên bản iOS
* Dù có giao diện giống hệt nhau, nhưng các tính năng giữa 2 phiên bản có sự khác biệt
* Họ không sử dụng tính năng kích hoạt SMS trên Android
* Uber tin thiên về cải thiện tính năng vận hành hơn là form hiển thị.
* Việc thao tác nhanh chóng và trải nghiệm rất quan trọng đối với một ứng dụng như Uber
* Với một số trợ giúp từ các công cụ hiện có, việc xây dựng ứng dụng như Uber thực sự không khó.