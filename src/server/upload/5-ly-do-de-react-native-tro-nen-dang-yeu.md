Xin chào các bạn

Hôm nay mình sẽ chia sẻ với các bạn những kinh nghiệm mà đã thu lượm được về React Native trong quá trình làm việc của mình.

Ngày nay, React Native đang dần trở nên phổ biến. Hàng nghìn ứng dụng được tạo ra có dính dáng đến React native.Những cái tên lớn như Facebook, AirBnB, Uber và nhiều công ty khác cũng đã chọn React native để xây dựng ứng dụng của họ.

Bạn không tin đúng không? Vậy thử vào trang chủ của React Native, mục “Who’s using React Native?” để kiểm chứng nhé

Bản thân mình cũng đang tham gia các dự án với React native. Dưới đây là một số những điểm mà mình cảm thấy React Native khác biệt so với phần còn lại.
![](https://vntalking.com/wp-content/uploads/2018/07/vntalking_reactjs_reactnative.jpg)
## 1. Nếu bạn đã biết về Javascript thì dễ dàng học được thôi

Trước khi mình tham gia dự án React Native, mình xuất thân là một Web developer. Vì vậy, kinh nghiệm về lập trình mobile của mình gần như là một con số 0 tròn trĩnh. Tuy nhiên, mình lại có kinh nghiệm về Javascript. Chắc đó là lý do tại sao sếp lại dí mình vào dự án React Native 🙂

Mặc dù mình có biết javascript nhưng mình chưa từng làm về ReactJs bao giờ. ReactJS hoàn toàn mới mẻ với mình ở thời điểm đó. Tuy nhiên, với cá nhân mình khi chuyển sang học React Native thì với hành trang Javascript là đủ. Những  nhà phát triển web có thể dựa vào kiến thức của họ về ngôn ngữ Javascript để viết những ứng dụng React native.

Bạn đã từng học về vòng đời của những components trong React và những thứ cơ bản nhất của ES6 (React Native sử dụng những tiêu chuẩn ES6 cho ngôn ngữ Javascript). Đó là tất cả những thứ bạn cần chuẩn bị để bắt đầu với ứng dụng React Native đầu tiên của mình.

Những tài liệu React Native chính thức của Facebook rất chi tiết và hữu ích. Nó cung cấp cho bạn cái nhìn sâu sắc hơn về những components trong React Native và APIs.
Còn chần chừ gì nữa, hãy thử [cài đặt react native](https://vntalking.com/react-native-huong-dan-chi-tiet-cai-dat-moi-truong.html) và bắt đầu với ứng dụng đầu tiên thôi.
## 2. Hot reloading! Không cần tốn thời gian để recompiling

Đó là một trong những tính năng mình thích nhất khi phát triển những ứng dụng React Native. Những ai từng lập trình Java, điều này sẽ cực kì có ý nghĩa.

Thử tưởng tượng khi bạn chỉ thay đổi mỗi String mà ứng dụng lại phải compile lại từ đầu và rồi bạn muốn kiểm tra thì lại phải mở ứng dụng từ màn hình chính và “chọt chọt” để đến được màn hình muốn kiểm tra. Haizz! mất thời gian phải không? Với React Native thì điều đó sẽ không còn nữa. Nó sẽ update luôn giá trị trên chính màn hình mà bạn thay đổi code, không hề compile lại ứng dụng. Vi diệu đúng không?

Với Hot Reloading, trạng thái của ứng dụng được duy trì, và nó sẽ reload lại chính màn hình đang sửa code,  tất cả ngay trước mắt bạn trong chỉ ít hơn vài giây thôi.

Để bật tính năng này trên emulator thì bạn làm như sau:

    Cmd+D  -> chọn  “Enable Hot Reloading”

## 3. Thực sự Native

Không giống những framework khác như Cordva cái mà thường chỉ là một Webview. React Native được sử dụng để xây dựng một ứng dụng Native thật sự.  Những Webview không thể cung cấp trải nghiệm chân thật cho người dùng – điều mà chỉ React Native có thể làm được.

Với React Native, những component cơ bản(View, Image, Button, Checkbox) đều là những component native. Do đó ứng dụng sẽ mang một trải nghiệm liền mạch với từng hệ điều hành. Điều đó thực sự làm lên một khác biệt lớn so với các framework lập trình cross-platform khác.

Nó thực sự ấn tượng hơn nữa khi bạn lại code bằng ngôn ngữ javascript và render ra các component native từ OS.

Mình lấy một ví dụ đơn giản: Đó chính là DatePicker widget. Bạn sẽ thấy  ứng dụng của bạn với widget này sẽ hiển thị khác nhau trên Android và IOS.

Đây chính là một đặc điểm tạo nên sự khác biệt: Không chỉ là tốc độ vì nó gần native nhất, mà nó còn làm cho cuộc sống của lập trình viên trở nên dễ dàng hơn. Họ không cần phải code lại một logic cho các nền tảng khác nhau mà vẫn có ứng dụng native cho từng nền tảng đó.
## 4. Code một lần, chạy nhiều chỗ

`your-choices-for-building-a-mobile-app`

Ví dụ sau đây sẽ đem đến lí do quan trọng tiếp theo rằng tại sao mình thích làm với React Native- Đó là khả năng đa hệ điều hành.

Bạn không cần biết Objective-C, Swift hay Java. Với Javascript và JSX, bạn có thể xây dựng một ứng dụng hoạt động đa hệ điều hành rất tốt.

Từ kinh nghiệm, mình thấy rằng gần 95% code được chia sẻ giữa iOS và Android,và chỉ cần tinh chỉnh nhỏ(tweak) để hoàn thiện sản phẩm cuối cùng cho từng hệ điều hành. Đó có phải là điều bạn hướng tới không? Bạn không cần phải có nhiều team và codebase để hỗ trợ các hệ điều hành khác nhau

Thay vào đó, bạn chỉ cần một nhóm và một codebase làm việc trên ứng dụng mà support cả iOS và Android. Điều này sẽ giúp tiết kiệm rất lớn về thời gian và tiền bạc cho công ty bạn đấy!

Mặc dù mình chưa thử, nhưng React Native cũng hoạt động tốt trên cả hệ điều hành Windows. Nếu bạn đã thử thì comment bên dưới cho mọi ngưới biết nhé

Rõ ràng là càng nhiều càng tốt đúng không?
## 5. Một cộng đồng hỗ trợ rất lớn

Nhiều năm trở lại đây, React Native đang trở lên rất phổ biến, nhiều nhà lập trình đang đóng góp để làm React Native tốt hơn mỗi ngày. Đặc biệt là nó được chống lưng bởi tập đoàn Facebook.

React Native Github repro là một nguồn mở và có hàng nghìn cộng tác viên hoạt động rất năng nổ.

Có một diễn đàn thảo luận mới về React Native và bạn cũng có thể là một phần trong đó nếu muốn.

Stack Overflow là một địa chỉ nữa nơi mà có nhiều tài liệu và câu hỏi đã được trả lời về React Native.

Cộng đồng rất lớn và đang dần phát triển hơn nữa. Nhiều vấn đề đã và đang được giải quyết và bạn sẽ không cần phải tốn thời gian để nghiên cứu lại trong suốt quá trình phát triển của bản thân.

Nói chung, mình nghĩ React Native sẽ trở thành một phần không thể thiếu  và chắc chắn có một  tương lai rực rỡ trong việc phát triển đa hệ điều hành. Mình hi vọng bạn cũng sẽ xây dựng được một ứng dụng React Native đầu tiên sớm thôi.

Các bạn có thể tham gia [khóa học miễn phí về React native](https://vntalking.com/series/react-native-training-for-beginner) mà mình nghĩ các bạn nên tham gia. Hẹn gặp lại ở những bài viết sau và đừng quên để lại comment ý kiến của bạn nhé.

Nguồn: [VNTALKING](https://vntalking.com)