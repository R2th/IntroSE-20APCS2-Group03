# Flutter so với React Native
![](https://images.viblo.asia/cab32e6b-1faa-49e9-857e-d0b6e9c29d63.png)

Hai Framework phát triển ứng dụng di động đa nền tảng phổ biến nhất hiện nay là Flutter và React Native . Hai “thế lực” này được hỗ trợ bởi hai trong số những công ty công nghệ lớn nhất trên thế giới: Flutter được tạo ra bởi Google và React Native được tạo ra bởi Facebook.
Trong bài viết này, mình sẽ so sánh Flutter và React Native , khám phá điều gì làm cho mỗi framework đó trở nên đặc biệt và khám phá lý do tại sao chúng được sử dụng nhiều như vậy.
# Flutter là gì?
Flutter là một framwork giao diện người dùng đa nền tảng do Google phát triển. Nó được phát hành lần đầu tiên vào tháng 5 năm 2017 và đã dần trở nên phổ biến trong những năm qua.

Một trong những điểm hấp dẫn chính của Flutter là nó cho phép bạn tạo các ứng dụng đa nền tảng bằng cách sử dụng một ngôn ngữ lập trình duy nhất. Theo truyền thống, nếu một công ty muốn tạo một ứng dụng có sẵn trên web, thiết bị di động và máy tính để bàn, thì công ty đó sẽ phải sử dụng nhiều hơn một công cụ để đạt được mục tiêu đó. Ví dụ: cần phải thuê một dev chuyên về phát triển web, một dev khác có kinh nghiệm xây dựng ứng dụng dành cho máy tính để bàn và một dev khác nữa chuyên dụng để xây dựng ứng dụng cho iOS và Android.
Trong tình huống như vậy, bạn có thể có một dev sử dụng React để xây dựng trang web, một dev sử dụng C # và Java để tạo phiên bản dành cho máy tính để bàn và một dev khác sử dụng Kotlin hoặc Swift để tạo ứng dụng Android và iOS tương ứng. Điều này đòi hỏi rất nhiều nhân lực cũng như sự đồng bộ giữa các nền tảng (vd câu lệnh query, hiển thị…)

Với Flutter, các công ty có thể thuê một dev để tạo ứng dụng trên các nền tảng chỉ với ngôn ngữ lập trình-framwork . Điều này cắt giảm đáng kể thời gian và tài nguyên cần thiết để khởi chạy và duy trì một ứng dụng.
# **React Native là gì?**
React Native là một framework đa nền tảng do Facebook tạo ra. Nó làm cho việc tạo các ứng dụng đa nền tảng trở nên khá đơn giản vì codebase về cơ bản được viết bằng JavaScript. Điều này làm giảm rào cản gia nhập đối với các nhà phát triển JavaScript vì họ không cần phải học một ngôn ngữ hoàn toàn xa lạ.

Việc phát triển web đã có từ nhiều năm và hầu hết các nhà phát triển web đã sử dụng JavaScript trong phần lớn sự nghiệp của họ. Sự phát triển di động vẫn còn khá mới mẻ, nhưng hệ sinh thái đã trưởng thành khá nhiều trong vài năm qua. Nếu bạn đã biết JavaScript, thì con đường học tập để phát triển ứng dụng dành cho thiết bị di động bằng cách sử dụng React Native sẽ không quá khó khăn.

Ngày nay, nhiều công ty đang sử dụng React Native để phát triển ứng dụng. Microsoft gần đây đã phát triển ứng dụng cửa hàng Xbox mới của mình bằng cách sử dụng React Native, là một ví dụ nổi bật. Giống như Flutter, React Native giúp bạn có thể tạo ứng dụng trên nhiều nền tảng khác nhau bằng cách sử dụng một mã code duy nhất.
# Sự khác biệt chính giữa Flutter và React Native
Flutter và React Native có rất nhiều điểm tương đồng, nhưng chúng cũng khá khác nhau ở một số điểm chính.

Đối với người mới bắt đầu, Flutter sử dụng ngôn ngữ lập trình Dart trong codebase của nó trong khi React Native sử dụng JSX, viết tắt của JavaScript XML. Cả hai ngôn ngữ đều dựa trên kiểu cú pháp kiểu C và tuân theo các nguyên tắc hướng đối tượng. Điểm chung này có nghĩa là Flutter và React Native về cơ bản giống nhau về thiết kế và code cũng rất giống nhau.

Lập trình dynamic so với static
Có một sự khác biệt đáng kể khi nói đến ngôn ngữ lập trình cốt lõi. Bản chất JavaScript là động. Điều này có nghĩa là bạn có thể thay đổi giá trị của nhiều kiểu dữ liệu khác nhau, điều này làm cho nó rất linh hoạt. Dart vừa động vừa tĩnh, điều này cho phép nó có được những điều tốt nhất của cả hai loại lập trình trên.

Một ngôn ngữ được nhập tĩnh thường được coi là an toàn hơn nhiều vì nó buộc bạn phải khai báo và sử dụng đúng kiểu dữ liệu. Ví dụ, bạn không thể gán một số cho một chuỗi; làm như vậy sẽ tạo ra một lỗi.

Tĩnh nghĩa là bạn có thể gặp ít lỗi hơn. Có thể thực thi thêm tính năng kiểm tra lỗi và an toàn kiểu với JavaScript nếu bạn chọn sử dụng TypeScript, thay vào đó là một tập hợp siêu cú pháp nghiêm ngặt của JavaScript.
# **Layout**
Flutter sử dụng kiểu widget để xây dựng giao diện người dùng trong khi React Native sử dụng JavaScript và JSX. Các widget Flutter được tạo sẵn, vì vậy về mặt kỹ thuật, bạn không cần phải tạo các widget tùy chỉnh của riêng mình trừ khi bạn muốn. Vì chúng được tạo và thử nghiệm bởi Google, bạn không cần phải lo lắng về vấn đề không tương thích.

Một điều tôi nên đề cập là nếu bạn đang sử dụng một ngôn ngữ lập trình như Swift để phát triển ứng dụng dành cho thiết bị di động, bạn thường không thể thấy mã nguồn mà Apple đã sử dụng để tạo các thành phần giao diện người dùng, chẳng hạn như các nút. Ngược lại, với Flutter, mã có thể xem được nên bạn có thể thấy cách Google tạo ra tất cả các tiện ích.

Flutter và React Native có điểm chung khi xây dựng bố cục ở chỗ cả hai đều sử dụng CSS Flexbox . Cách họ triển khai nó là khác nhau, nhưng miễn là bạn biết Flexbox, bạn sẽ không gặp bất kỳ vấn đề nào khi xây dựng bố cục cho ứng dụng của mình. Nhóm làm việc trên Flutter cũng đã làm việc trên các công cụ dành cho nhà phát triển cho trình duyệt Google Chrome, giúp chuyển đổi nhanh chóng vì các công cụ gỡ lỗi khá giống nhau.
# **Tại sao phát triển ứng dụng di động lại phổ biến như vậy?**
Lĩnh vực phát triển ứng dụng dành cho thiết bị di động đã tăng trưởng đều đặn trong vài năm qua. Hầu như tất cả mọi người trên trái đất đều có điện thoại di động, vì vậy số lượng người dùng rất lớn. Ngày nay, bạn có thể tìm thấy một ứng dụng cho hầu hết mọi thứ.
Có khá nhiều con đường bạn có thể thực hiện nếu muốn tạo một ứng dụng dành cho thiết bị di động. Bạn có thể chọn đi theo hướng Native, có nghĩa là sử dụng Swift để tạo ứng dụng IOS hoặc Kotlin để tạo ứng dụng Android. Đây là các ngôn ngữ lập trình chính thức mà Apple và Google sử dụng, vì vậy bạn có thể mong đợi sự hỗ trợ của các bên và các tính năng sẽ update thường xuyên.

Ngoài ra, bạn có thể chọn con đường đa nền tảng và sử dụng Flutter hoặc React Native. Thông thường, một nhà phát triển bản địa sẽ sử dụng Xcode và Swift để xây dựng các ứng dụng iOS và Android Studio và Kotlin cho các ứng dụng Android. Những công cụ này có thể áp dụng cho công việc đa nền tảng. Việc các nhà phát triển sử dụng môi trường phát triển tích hợp (IDE) như Visual Studio Code cũng khá phổ biến .

Tại thời điểm viết bài, React Native phổ biến hơn Flutter một chút, một phần nhờ vào sự liên kết của React Native với React-web framework phổ biến. React Native cũng đã tồn tại lâu hơn nên lượng người dùng của nó lớn hơn. Do đó, nhu cầu hiện tại đối với các công ty phát triển ứng dụng dựa trên React Native cao hơn so với các công ty phát triển ứng dụng dựa trên Flutter.
# **Flutter so với React Native: Hiệu suất**
Cả Flutter và React đều là mã nguồn mở, có nghĩa là chúng được sử dụng miễn phí. Cả hai thư viện đều được duy trì tốt, như bạn mong đợi khi chúng được tạo bởi Google và Facebook. Có thể kiểm tra các ứng dụng được tạo bằng cả hai nền tảng, hầu như bằng cách sử dụng trình mô phỏng tích hợp trên máy tính của bạn cho iOS và Android hoặc nguyên bản trên điện thoại của bạn. Bạn sẽ cần một máy tính Apple nếu bạn định phát triển trên iOS vì SDK chỉ khả dụng trên máy tính Apple. Người dùng Windows và người dùng Linux được hưởng quyền lợi đó. Nhưng cũng có 1 chút vớt vát :D , bạn có thể phát triển các ứng dụng phát triển Android trên bất kỳ hệ điều hành nào.

Cả hai framework đều sử dụng tính năng host reload để bạn có thể thực hiện các thay đổi và xem chúng ngay lập tức. Điều này làm cho việc phát triển hiệu quả hơn vì bạn không phải tiếp tục dừng và khởi động ứng dụng của mình để xem các bản cập nhật.

Có một số cuộc tranh luận về việc liệu Flutter và React Native có thực sự có hiệu suất như Native hay không. Được coi là Native 100%, chúng sẽ cần được viết bằng ngôn ngữ mà chúng được thiết kế - cụ thể là Swift cho iOS và Kotlin / Java cho Android.

Công ty tạo ra Reflectly gần đây đã chuyển ứng dụng từ React Native sang Flutter và thấy hiệu suất tăng đáng kể . Đây là một ví dụ về sự cải tiến. Tuy nhiên, nó sẽ không giống nhau cho mọi ứng dụng; Có nhiều trường hợp cần xem xét, chẳng hạn như loại ứng dụng, cơ sở dữ liệu, điện thoại, hệ điều hành, v.v.
# **Flutter so với React Native: Hệ sinh thái nhà phát triển**
Các dev quan tâm đến việc xây dựng ứng dụng Flutter có xu hướng tham khảo tài liệu chính thức . Tuy nhiên, trong trường hợp của React Native, bạn có một số tùy chọn. Bạn có thể sử dụng tài liệu chính thức hoặc bạn có thể sử dụng một số tài liệu khác, phổ biến nhất là Expo . Expo cung cấp nhiều tính năng và tùy chỉnh hơn, bao gồm cả thư viện biểu tượng tích hợp, trong khi các tài liệu chính thức của React Native lại đơn giản hơn.

Hệ sinh thái React Native đã trưởng thành hơn và có nhiều người dùng hơn kể từ khi JavaScript xuất hiện từ năm 1995. Ngược lại, Flutter được phát hành vào năm 2017. React có lẽ là frontend framework phổ biến nhất vào thời điểm hiện tại và có một cộng đồng rất tích cực trên các phương tiện truyền thông xã hội. Flutter không phải là slouch; tại thời điểm viết bài, nó có nhiều sao hơn React Native trên GitHub.

Cả Flutter và React Native đều đã được sử dụng trong các ứng dụng thương mại phổ biến. Flutter đã được sử dụng để tạo ra các ứng dụng cho Reflectly, Stadia, Baidu, Groupon và eBay. Trong khi đó, các ứng dụng cho Facebook, Instagram, Shopify và Discord được xây dựng bằng React Native .

Các con số cũng khá giống nhau trên các phương tiện truyền thông xã hội, với Flutter có nhiều người theo dõi hơn trên Twitter và React Native có lượng người theo dõi lớn hơn trên Reddit .

  
# **Bạn nên sử dụng Flutter hay React Native?**
Không có người chiến thắng rõ ràng ở đây: cả Flutter và React đều có ưu và khuyết điểm, và lựa chọn phù hợp sẽ phụ thuộc vào kinh nghiệm của bạn cũng như mục tiêu và yêu cầu của dự án của bạn.

Nếu bạn đã biết JavaScript, viết ứng dụng di động trong React Native là điều không cần bàn cãi. Tuy nhiên, nếu bạn đang tìm kiếm hiệu suất và độ ổn định tốt hơn cũng như môi trường gắn kết hơn giữa các hệ sinh thái, bạn nên cân nhắc dùng thử Flutter.