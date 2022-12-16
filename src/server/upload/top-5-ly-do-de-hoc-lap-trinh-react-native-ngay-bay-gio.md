### I. Mở đầu
Hôm nay mình sẽ chia sẻ với các bạn những kinh nghiệm về học lập trình React Native mà đã thu lượm được trong quá trình học tập và làm việc của mình. Ngày nay, React Native đang dần trở nên phổ biến. Hàng nghìn ứng dụng được tạo ra có dính dáng đến React Native. Những cái tên lớn như Facebook, AirBnB, Uber và nhiều công ty khác cũng đã chọn React Native để xây dựng ứng dụng của họ. Bạn không tin đúng không? Vậy thử vào trang chủ của React Native, mục “Who’s using React Native?” để kiểm chứng nhé.Bản thân mình cũng đang tham gia các dự án với React native. Dưới đây là một số những điểm mà mình cảm thấy React Native khác biệt so với phần còn lại.
### II. Lý do để học lập trình React Native
Học lập trình React Native càng sớm càng tốt vì những lý do sau
1. Đã biết Javascript thì học React Native cực nhanh
2. Hot reloading! Không cần tốn thời gian để recompiling
3. Thực sự Native
4. Code một lần, chạy nhiều chỗ
5. Một cộng đồng hỗ trợ rất lớn
![](https://images.viblo.asia/45e6b2b5-7bfd-4f35-b21b-f0bc71db99e8.png)
### III. Đã biết Javascript thì học React Native cực nhanh
Trước khi mình tham gia dự án React Native, mình xuất thân là một back-end developer. Vì vậy, kinh nghiệm về lập trình mobile của mình gần như là một con số 0 tròn trĩnh. Tuy nhiên, mình lại có kinh nghiệm về Javascript. Chắc đó là lý do tại sao sếp lại dí mình vào dự án React Native. Mặc dù mình có biết javascript nhưng mình chưa từng làm về ReactJs bao giờ. React JS hoàn toàn mới với mình ở thời điểm đó. Tuy nhiên, với cá nhân mình khi chuyển sang học React Native thì với hành trang Javascript là đủ. Những nhà phát triển web có thể dựa vào kiến thức của họ về ngôn ngữ Javascript để viết những ứng dụng React Native.
- Tất cả những thứ bạn cần chuẩn bị để bắt đầu với ứng dụng React Native đầu tiên của mình đó là vòng đời của những components trong ReactJS và ES6 (React Native sử dụng những tiêu chuẩn ES6 cho ngôn ngữ Javascript). 
- Tài liệu React Native chính thức của Facebook rất chi tiết và dễ hiểu. Nó cung cấp cho bạn cái nhìn sâu sắc hơn về components trong React Native và APIs sử dụng chúng.

### IV. Hot reloading! Không cần tốn thời gian để recompiling
Đây là một trong những tính năng mình thích nhất khi phát triển những ứng dụng React Native. Những ai từng lập trình Android, điều này sẽ cực kì có ý nghĩa. Thử tưởng tượng khi bạn chỉ thay đổi mỗi String mà ứng dụng lại phải compile lại từ đầu và rồi bạn muốn kiểm tra thì lại phải mở ứng dụng từ màn hình chính và “chọt chọt” để đến được màn hình muốn kiểm tra. Haizz! mất thời gian phải không? 

- Với React Native thì điều đó sẽ không còn nữa. Nó sẽ update luôn giá trị trên chính màn hình mà bạn thay đổi code, không hề compile lại ứng dụng. Vi diệu đúng không? 
- Với Hot Reloading, trạng thái của ứng dụng được duy trì, và nó sẽ reload lại chính màn hình đang sửa code,  tất cả ngay trước mắt bạn trong chỉ ít hơn vài giây.
- Bật tính năng này trên emulator như sau:
`Cmd+D  -> chọn  “Enable Hot Reloading”`
Tính năng sẽ tiết kiệm được rất nhiều thời gian của người lập trình. Nếu bạn vẫn chưa hiểu rõ tính năng này như nào thì tham khảo video bên dưới nhé

- [Các bạn có thể tham khảo ở đây ](https://www.youtube.com/watch?v=2uQzVi-KFuc)
### V. Thực sự Native
- Không giống những framework khác như Cordva cái mà thường chỉ là một Webview. React Native được sử dụng để xây dựng một ứng dụng Native thật sự.  Webview không thể cung cấp trải nghiệm chân thật cho người dùng – điều mà chỉ React Native có thể làm được.
- Ứng dụng Native là gì? Là những ứng dụng được viết riêng cho một loại nền tảng như iOS, Android, Windows Phone bằng các ngôn ngữ tương ứng của mỗi nền tảng đó ví dụ Java trên Android, Object C trên iOS, C# trên winphone. Mỗi Native App chỉ chạy được trên một nền tảng và không thể mang sang các nền tảng khác. Ví dụ game cho iOS sẽ không thể chạy được trên các máy Android. Đa phần các game mobile hiện nay là Native App.
- Với React Native, những component cơ bản (View, Image, Button, Checkbox) đều là những component native. Do đó ứng dụng sẽ mang một trải nghiệm liền mạch với từng hệ điều hành. 
- Điều này thực sự tạo ra khác biệt lớn so với các framework lập trình cross-platform khác.
Nó thực sự ấn tượng hơn nữa khi bạn lại code bằng ngôn ngữ javascript và render ra các component native từ OS. 
- Mình lấy một ví dụ đơn giản: DatePicker widget. Bạn sẽ thấy  ứng dụng của bạn có widget này sẽ hiển thị khác nhau trên Android và IOS.
### VI. Code một lần, chạy nhiều chỗ
- Đây chính là một đặc điểm tạo nên sự khác biệt: Không chỉ là tốc độ vì nó gần native nhất, mà nó còn làm cho cuộc sống của lập trình viên trở nên dễ dàng hơn. 
- Họ không cần phải code lại một logic cho các nền tảng khác nhau mà vẫn có ứng dụng native cho từng nền tảng đó.
- Ví dụ sau đây sẽ đem đến lí do quan trọng tiếp theo rằng tại sao mình thích React Native: Đó là khả năng đa hệ điều hành. Bạn không cần biết Objective-C, Swift hay Java. Với Javascript và JSX, bạn có thể xây dựng một ứng dụng hoạt động đa hệ điều hành rất tốt. 
- Từ kinh nghiệm, mình thấy rằng gần 95% code được chia sẻ giữa iOS và Android,và chỉ cần tinh chỉnh nhỏ(tweak) để hoàn thiện sản phẩm cuối cùng cho từng hệ điều hành. 
- Đó có phải là điều bạn hướng tới không? Bạn không cần phải có nhiều team và codebase để hỗ trợ các hệ điều hành khác nhau. Thay vào đó, bạn chỉ cần một nhóm và một codebase làm việc trên ứng dụng mà support cả iOS và Android. 
- Điều này sẽ giúp tiết kiệm rất lớn về thời gian và tiền bạc cho công ty bạn đấy! Và đây là một thứ mà các Start up đang thực sự hướng đến
- Mặc dù mình chưa thử, nhưng React Native cũng hoạt động tốt trên cả hệ điều hành Windows. Nếu bạn đã thử thì comment bên dưới cho mọi ngưới biết nhé
Rõ ràng là càng nhiều càng tốt đúng không?
![](https://images.viblo.asia/be939f04-05ce-4ecb-be79-da83b837d226.jpg)
### VII. Một cộng đồng hỗ trợ rất lớn
- Gần đây, React Native đang trở lên rất phổ biến, nhiều developer đang đóng góp để làm React Native tốt hơn. Đặc biệt là nó được chống lưng bởi tập đoàn Facebook.
-  React Native Github repro là một nguồn mở và có hàng nghìn cộng tác viên hoạt động rất năng nổ. Với nền tảng là Javascript mà JS lại là một ngôn ngữ quá phổ biến, ngoài ra còn sử dụng base từ React JS nên số lượng thư viện hỗ trợ của React Native khá là nhiều. 
-  Có một diễn đàn thảo luận mới về React Native và bạn cũng có thể là một phần trong đó nếu muốn. 
-  Stack Overflow là một địa chỉ nữa nơi mà có nhiều tài liệu và câu hỏi đã được trả lời về React Native. Cộng đồng rất lớn và đang phát triển mạnh mẽ. Nhiều vấn đề đã và đang được giải quyết và bạn sẽ không cần phải tốn thời gian để nghiên cứu lại trong suốt quá trình làm việc với React Native.
-  ![](https://images.viblo.asia/eecab84b-ddcb-4827-b5e8-1de3dc0ab5be.png)
### VIII. Tổng kết
- Nói chung, mình nghĩ React Native sẽ trở thành một phần không thể thiếu và có một tương lai rực rỡ trong việc phát triển ứng dụng đa hệ điều hành. Vì vậy, lời khuyên của mình là bắt tay vào học học lập trình React Native ngay trước khi quá muộn.