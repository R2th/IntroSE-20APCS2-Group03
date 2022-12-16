[Tôi nên sài flutter hay react native để phát triển mobile app?](https://hoovada.com/question/toi-nen-sai-flutter-hay-react-native-de-pha-trien-mobile-app) Đây là một câu hỏi từ một bạn trên [Hoovada](https://hoovada.com/) - nền tảng hỏi và đáp chuyên nghiệp trên nhiều lĩnh vực khác nhau giúp giải đáp thắc mắc của mọi người.

Đáp án đến từ bạn [Nguyễn Phúc](https://hoovada.com/profile/nguyen-phuc) - một thành viên của [Hoovada](https://hoovada.com/) sống tại TPHCM

Giữa Flutter và React Native, bạn không biết nên chọn cái nào để phát triển ứng dụng điện thoại? Đừng lo lắng, vì đã có mình ở đây để giúp đỡ bạn. Flutter và React Native, mỗi cái đều có điểm mạnh và điểm yếu của nó, vậy nên tùy thuộc vào sản phẩm mà bạn muốn làm ra thì bạn có thể cân nhắc giữa một trong hai. Ở đây mình sẽ nói đến những sự khác biệt để bạn có thể dễ dàng chọn lựa phương án nào phù hợp với mình nhất.

**1. Nó là gì?**

**Flutter:** Bộ công cụ UI di động dùng để tạo ra những ứng dụng được biên dịch nguyên bản trên thiết bị di động, web và máy tính bàn từ một cơ sở mã duy nhất

**React Native:** Một khuôn khổ để xây dựng các ứng dụng gốc bằng React

**2. Ngôn ngữ lập trình**

**Flutter:** Dart

**React Native:** JavaScript

**3. Phần UI**

**Flutter:**

Ứng dụng của Flutter trông đẹp mắt trên hệ điều hành mới nhất như trên các phiên bản cũ hơn. Vì chúng chỉ có một cơ sở mã nên các ứng dụng nhìn và hoạt động tương tự trên iOS và Android - nhưng nhờ Material Design và các tiện ích của Cupertino, chúng cũng có thể bắt chước chính thiết kế nền tảng. Làm sao nó lại như thế được?

Flutter chứa hai bộ tiện ích con tuân theo các ngôn ngữ thiết kế cụ thể: các tiện ích con Material Design triển khai ngôn ngữ thiết kế cùng tên của Google; Các tiện ích của Cupertino bắt chước thiết kế iOS của Apple.

Điều này có nghĩa là ứng dụng Flutter của bạn sẽ bắt chước các thành phần gốc của mỗi nền tảng và sẽ trông và hoạt động như một phần của nền tảng đó.

**React Native:**

Các thành phần ứng dụng trông giống như các thành phần gốc (ví dụ: một nút trên thiết bị iOS trông giống như một nút iOS gốc và tương tự trên Android).

Thực tế là React Native sử dụng các thành phần gốc sẽ giúp bạn tin tưởng rằng các thành phần của ứng dụng của bạn sẽ được cập nhật ngay tức thì với mỗi bản cập nhật giao diện người dùng của hệ điều hành.

Dù đã nói như vậy nhưng điều này có thể phá vỡ giao diện người dùng của ứng dụng nhưng nó rất hiếm khi xảy ra.

Nếu bạn muốn ứng dụng của mình nhìn tương đồng với nhau trên các nền tảng khác nhau cũng như trên các phiên bản hệ điều hành cũ hơn thì bạn nên cân nhắc việc sử dụng các thư viện của bên thứ ba vì thay vì sử dụng các thành phần gốc, chúng sẽ cho phép bạn sử dụng các thành phần Material Design.

**4. Việc chia sẻ mã code**

**Flutter:**

Với Flutter 2 được công bố vào tháng 3/2021, bạn có thể sử dụng cùng một cơ sở mã để gửi các ứng dụng gốc cho năm hệ điều hành: iOS, Android, Windows, macOS và Linux; cũng như các tiện ích của trang web hướng tới các trình duyệt như Firefox, Chrome, Safari hoặc Edge.

Flutter thậm chí có thể được đưa vào sử dụng ở trên ô tô, TV và các thiết bị gia dụng thông minh.

Có lẽ thông báo lớn nhất trong Flutter 2 là hỗ trợ chất lượng sản xuất cho web. Nó có thể được sử dụng cho:

* Ứng dụng web tiến bộ (PWA) kết hợp khả năng của ứng dụng dành cho máy tính để bàn với phạm vi tiếp cận của web
* Ứng dụng Trang đơn (SPA) tải một lần và truyền dữ liệu 2 chiều đến các dịch vụ internet.
* Các ứng dụng di động hiện có - cho phép các ứng dụng Flutter chạy trên máy tính để bàn.

**React Native:**

Dành cho iOS và Android - nhưng có một số thư viện cho phép bạn sử dụng cùng một mã để tạo ứng dụng iOS, Android, web và Windows10.

Bạn cũng có thể trích xuất mã được chia sẻ trong các ứng dụng di động, máy tính để bàn và web, vào một kho lưu trữ riêng biệt và coi nó như một dự án riêng biệt. Sau đó, tiêm nó theo cách tương tự như tiêm phụ thuộc vậy.

Điều này cho phép nhà phát triển tập trung vào việc viết mã cho một nền tảng cụ thể mà không cần phải xem xét khả năng tương thích với một nền tảng khác.

**5. Thời gian để tới được thị trường**

**Flutter:** Thường nhanh hơn nhiều so với Native App.

**React Native:** Có thể nhanh như phát triển với Flutter. Tuy nhiên, React Native sử dụng các yếu tố cầu nối và nguyên bản, vì vậy nó có thể yêu cầu tối ưu hóa riêng cho từng nền tảng - một vấn đề mà Flutter dựa trên tiện ích con không gặp phải. Nó có thể làm cho việc phát triển ứng dụng với React Native tốn nhiều thời gian hơn.

**6. Điểm cạnh tranh**

**Flutter:**

* Giao diện tuyệt vời nhờ các vật dụng phong phú
* Cộng đồng đang phát triển nhanh chóng và phổ biến
* Tài liệu xuất sắc với sự hỗ trợ mạnh mẽ từ nhóm Flutter (giúp bạn bắt đầu phát triển với Flutter dễ dàng hơn)
* Cải thiện Flutter cho Web, tạo ra nhiều tiềm năng mới cho cơ sở mã trên các nền tảng di động và web
* Khó đánh bại thời gian đưa ra thị trường

**React Native:**

* Đảm bảo tính ổn định với hơn 5 năm trên thị trường
* Nhiều người chơi thành công, nổi bật trên thị trường sử dụng React Native
* Một cộng đồng rộng lớn, được phát triển đầy đủ
* Công nghệ dễ học
* Rất nhiều tài liệu hướng dẫn và thư viện, cho phép bạn nhanh chóng bắt tay vào việc phát triển ứng dụng
* Có thể dễ dàng sử dụng lại mã cho cả ứng dụng web và ứng dụng dành cho máy tính để bàn

**7. Trường hợp không nên sử dụng**

**Flutter:**

* Ứng dụng của bạn cần hỗ trợ 3D Touch (hiện tại Flutter chưa hỗ trợ 3D, nhưng sau này khả năng cao là nó sẽ được hỗ trợ)
* Thiết kế ứng dụng của bạn dành riêng cho 1 nền tảng nhất định
* Ứng dụng của bạn yêu cầu nhiều tương tác với một hệ điều hành; hoặc yêu cầu các thư viện gốc hiếm, ít được biết đến
* Bạn cần một giao diện người dùng tối giản, nhưng hầu như dựa vào việc sử dụng phần cứng điện thoại (ví dụ: một ứng dụng phát nhạc hoặc chỉ chụp ảnh)
* Bạn muốn tạo một ứng dụng tức thì (ứng dụng có kích thước nhỏ)

**React Native: **

* Ứng dụng của bạn cần xử lý các tác vụ ít sử dụng hoặc một số tác vụ cụ thể (như tính toán) trong nền
* Bạn yêu cầu giao tiếp tùy chỉnh qua Bluetooth (có thể khó triển khai bằng React Native)
* Bạn chỉ muốn tạo một ứng dụng cho Android. Trên thực tế, nếu bạn có hiểu biết về JavaScript cũng như mong muốn xây dựng một ứng dụng dành cho iOS, bạn nên cân nhắc sử dụng React Native - nhưng nếu bạn muốn một ứng dụng chỉ dành cho Android, tốt hơn là bạn nên xây dựng Native App với một nhóm khác. Tại sao? Hiện tại, iOS được hỗ trợ tốt hơn Android.
 

Nếu ứng dụng của bạn giống bất kỳ điều nào ở trên, thì tốt hơn hết bạn nên chọn phát triển Native App.

Đáp án đến từ bạn [Nguyễn Phúc](https://hoovada.com/profile/nguyen-phuc) - một thành viên của [Hoovada](https://hoovada.com/) sống tại TPHCM. Các bạn có thể kết nối với nhau thông qua [Hoovada trên Facebook](https://www.facebook.com/groups/144206164549707). Những câu hỏi hay khác trên [Hoovada](https://hoovada.com/):

* [Những phần mềm thiết kế hình ảnh tốt trên smartphone?](https://hoovada.com/question/nhung-phan-mem-thiet-ke-hinh-anh-tot-tren-smartphone)
* [Vì sao càng ngày ngành công nghệ thông tin lại được quan tâm và trở thành mục tiêu của nhiều bạn trẻ ?](https://hoovada.com/question/vi-sao-cang-ngay-nganh-cong-nghe-thong-tin-lai-duoc-quan-tam-va-tro-thanh-muc-tieu-cua-nhieu-ban-tre)
* [Lịch sử hình thành youtube?](https://hoovada.com/question/lich-su-hinh-thanh-youtube)