Nếu bạn đã từng xuất bản một ứng dụng lên Google Play, bạn có thể đã trải qua một thời điểm hoang mang trước khi phát hành. “Ứng dụng của tôi có đủ ổn định để xử lý hàng nghìn người dùng không? Nó sẽ hoạt động như được thiết kế trên các thiết bị? " Nếu bạn từng có những suy nghĩ như thế này khi release ứng dụng của mình, thì đừng lo lắng. Việc relase ứng dụng của bạn không phải là một trải nghiệm quá căng thẳng và có những công cụ bạn có thể sử dụng để đảm bảo ứng dụng của mình ổn định và performing cao.

Bạn có thể đã sử dụng các công cụ app quality tools của Google Play, chẳng hạn như Android vitals và chuẩn bị report trước khi public trong quy trình release của mình, nhưng việc sử dụng cùng nhau các công cụ chất lượng của Firebase và Google Play có thể nâng chất lượng ứng dụng của bạn lên một tầm cao mới. Các công cụ chất lượng của Google Play cung cấp cái nhìn tổng thể về tính ổn định của ứng dụng, trong khi các công cụ chất lượng của Firebase, chẳng hạn như App Distribution, Crashlytics, Test Lab và Performance Monitoring, cung cấp thêm tùy chỉnh và thông tin chi tiết chuyên sâu hơn. Việc sử dụng kết hợp các công cụ chất lượng của Google Play và Firebase cung cấp cho bạn thông tin chi tiết hữu ích về tính ổn định và hiệu suất của ứng dụng trước, trong và sau khi khởi chạy để bạn có thể tự tin khi biết người dùng của mình đang trải nghiệm phiên bản ứng dụng tốt nhất.

Trong bài viết này, tôi sẽ trình bày cách sử dụng các công cụ chất lượng ứng dụng Firebase cùng với các công cụ chất lượng của Google Play để cải thiện trải nghiệm của người dùng trong ứng dụng của bạn. 

![](https://images.viblo.asia/b04c67f9-1531-4886-b9bc-82b6d94b6994.png)
*Bảng liệt kê các công cụ Google Play và Firebase giúp cải thiện chất lượng ứng dụng của bạn*

## 1. Thu thập phản hồi
Là thu thập phản hồi từ các nhóm nội bộ (internal team) và người dùng bên ngoài (external users).

Một trong những cách tốt nhất để xác định và sửa lỗi (fixbug) là thông qua phản hồi từ những người tester đáng tin cậy, nhưng user testing có thể là một quá trình phức tạp. Bạn phải tuyển dụng người thử nghiệm (tester), tìm cách phân phối (distribute) các bản build thử nghiệm của mình và cấp quyền truy cập cho tester. **[Firebase App Distribution](https://firebase.google.com/products/app-distribution)**, một công cụ kiểm tra trước khi phát hành, cung cấp cho bạn sự linh hoạt để dễ dàng phân phối các bản build thử nghiệm của bạn giữa những người tester đáng tin cậy trên Android và iOS bằng Firebase console hoặc máy chủ CI của bạn để bạn có thể thu thập phản hồi sớm và phát hiện lỗi. Ngoài ra, không cần cài đặt SDK, bạn có thể thiết lập tester của mình và run một cách nhanh chóng. 

Nếu đang muốn test các format đặc biệt ở Play, chẳng hạn như App Bundles, bạn có thể sử dụng [ Google Play Internal App Sharing](https://play.google.com/console/about/internalappsharing/) để nhanh chóng tải lên và chia sẻ các bản dựng thử nghiệm với nhóm nội bộ của bạn.

Khi bạn đã hoàn tất quá trình thử nghiệm nội bộ và muốn thu thập thêm phản hồi trên quy mô lớn, hãy sử dụng các phiên bản **[open testing](https://play.google.com/console/about/opentesting/)** và **[close testing](https://play.google.com/console/about/closed-testing/)** của Google Play để nhắm mục tiêu những người dùng tương tác nhất của bạn nhằm kiểm tra chất lượng lần cuối trước khi phát hành tính năng mới. Với thử nghiệm open và close, bạn nhận được phản hồi trực tiếp từ người dùng bên ngoài mà không ảnh hưởng đến xếp hạng hoặc bài đánh giá của bạn trên Google Play.

## 2. Test App trên các device khác nhau
Với rất nhiều thiết bị Android trên thị trường, điều quan trọng là phải thử nghiệm ứng dụng của bạn trên nhiều thiết bị khác nhau để đảm bảo ứng dụng hoạt động như mong muốn cho tất cả người dùng. Bạn có thể đã sử dụng **[pre-launch reports](https://play.google.com/console/about/pre-launchreports/)** khi ra mắt trên Google Play Console để chạy thử nghiệm trên các thiết bị được chọn trước. Tuy nhiên, bạn có thể muốn linh hoạt hơn một chút, với điều kiện bạn hiểu rõ người dùng của mình nhất và thiết bị nào phổ biến nhất với họ. **[Firebase Test Lab](https://firebase.google.com/products/test-lab)** cho phép bạn chạy các thử nghiệm đặc biệt tùy chỉnh tại bất kỳ thời điểm nào trong quá trình phát triển trên vô số thiết bị vật lý và ảo tự chọn.

Cả *pre-launch reports* và *Firebase Test Lab* đều cung cấp kiểm tra [Robo](https://firebase.google.com/docs/test-lab/android/robo-ux-test) (Robo test), một trình thu thập thông tin tự động điều hướng ứng dụng của bạn và xác định các vấn đề mà không cần phải tự thiết lập kiểm tra (test). Để có nhiều quyền kiểm soát hơn đối với thử nghiệm của mình, bạn cũng có thể chạy thử nghiệm custom [instrumentation tests](https://firebase.google.com/docs/test-lab/android/instrumentation-test) trên Firebase Test Lab cho phép bạn điều khiển giao diện người dùng của ứng dụng.

Đối với các nhà phát triển trò chơi, *pre-launch reports* và *Firebase Test Lab* cung cấp các bài kiểm tra Vòng lặp **[Game Loop tests](https://firebase.google.com/docs/test-lab/android/game-loop)**, trò chơi mô phỏng hành động của người chơi thực và cung cấp một cách nhanh chóng và có thể mở rộng để xác minh rằng trò chơi của bạn hoạt động tốt cho người dùng của bạn.

*pre-launch reports* và *Firebase Test Lab* cung cấp cho bạn các bước tiếp theo có thể hành động về cách giải quyết độ ổn định, khả năng tương thích Android, hiển thị, khả năng truy cập và các lỗ hổng bảo mật trên các thiết bị mà không cần phải tự bảo trì cơ sở hạ tầng này.

## 3. Theo dõi và nhanh chóng khắc phục sự cố xảy ra
Bất kể bạn kiểm tra bao nhiêu, tất cả các ứng dụng thỉnh thoảng đều bị lỗi. Bạn không muốn tìm hiểu về các vấn đề trong ứng dụng của mình từ các bài đánh giá tiêu cực hoặc vé ủng hộ từ những người dùng thất vọng. Cách tốt nhất để theo dõi tính ổn định của ứng dụng là tìm hiểu các vấn đề ngay khi chúng xảy ra.
Để đảm bảo bạn đang ưu tiên các sự cố phổ biến nhất, hãy bắt đầu bằng cách xem lại trang tổng quan **[Android vitals](https://play.google.com/console/about/vitals/)** của bạn để có cái nhìn tổng quan về sự cố và tỷ lệ ANR của bạn.

Khi bạn đã xem qua các chỉ số Android vitals của mình, đã đến lúc bắt đầu khắc phục sự cố nhưng việc khắc phục sự cố có thể mất thời gian. **[Firebase Crashlytics](https://firebase.google.com/products/crashlytics)** có thể giúp bạn khắc phục sự cố ổn định nhanh hơn bằng cách cung cấp ngữ cảnh bổ sung giúp bạn nhanh chóng hiểu được nguyên nhân gốc rễ của sự cố. Ví dụ: [custom keys](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=android#add-keys) cung cấp cho bạn ảnh chụp nhanh về trạng thái ứng dụng của bạn trước khi ứng dụng gặp sự cố và [custom log](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=android#add-logs) ghi lại các sự kiện mà người dùng đã trải qua trong session của họ. Bạn cũng có thể tích hợp Crashlytics với Google Analytics để sử dụng breadcrumbs, tự động nắm bắt các sự kiện Google Analytics được xác định trước hiển thị các hành động mà người dùng đã thực hiện trước khi gặp sự cố, cũng như các thông số trong sự kiện. Tìm hiểu *[predefined Google Analytics events ](https://support.google.com/analytics/answer/9234069?hl=en&visit_id=637508154330721775-3199936803&rd=1)*

Ví dụ: Gameloft, một nhà phát triển trò chơi được giới phê bình đánh giá cao, đã tận mắt chứng kiến lợi ích của việc sử dụng logs and keys để lấy thông tin chi tiết và bối cảnh xung quanh các sự cố, điều này đã giúp họ giảm tỷ lệ sự cố và tăng thời lượng session của người chơi lên 16%.


Để có thông tin chi tiết chuyên sâu hơn nữa, hãy xuất dữ liệu sự cố của bạn sang **[BigQuery](https://firebase.google.com/docs/crashlytics/bigquery-export)** trong thời gian thực để xác định các sự cố mới xuất hiện trong code mới hoặc xem các sự cố hàng đầu trong ngày, để bạn có thể ưu tiên và khắc phục chúng nhanh hơn.

Tìm hiểu thêm về *[Crashlytics ](https://firebase.googleblog.com/2020/07/top-five-reasons-to-use-crashlytics.html)*

## 4. Phân tích hiệu suất ứng dụng sau khi khởi chạy
Sau khi ứng dụng của bạn hoạt động, bạn sẽ muốn theo dõi cách ứng dụng hoạt động trên cơ sở người dùng của mình và phát hiện bất kỳ sự cố kỹ thuật nào một cách nhanh chóng và dễ dàng. Bạn có thể sử dụng Android vitals tại đây để theo dõi, không chỉ sự cố mà còn cả việc wakeup quá nhiều ứng dụng của bạn và wakeup data một phần bị kẹt, cũng như thời gian khởi động ứng dụng. Bạn có thể xem ứng dụng của mình đang hoạt động như thế nào so với các ứng dụng ngang hàng bằng cách sử dụng các **custom peer groups**

Đối với các nhà phát triển trò chơi, bạn cũng có thể có thêm thông tin chi tiết về hiệu suất trong Android vitals bằng cách tích hợp  **[Android Performance Tuner](https://developer.android.com/games/sdk/performance-tuner)** vào trò chơi của bạn để đo lường và tối ưu hóa hiệu suất tốc độ khung hình cũng như độ trung thực đồ họa của bạn trên toàn hệ sinh thái thiết bị Android.

Để tìm hiểu sâu hơn về hiệu suất của ứng dụng, **Firebase Performance Monitoring** sử dụng các **[custom traces](https://firebase.google.com/docs/perf-mon#custom-traces)** để nắm bắt hiệu suất ứng dụng của bạn trong các tình huống cụ thể để bạn có thể hiểu bối cảnh mà các vấn đề về hiệu suất diễn ra và dễ dàng giải quyết chúng hơn. Bạn cũng có thể lọc cả dữ liệu theo dõi và dữ liệu mạng của ứng dụng thành các thứ như loại thiết bị, vị trí địa lý và phiên bản ứng dụng để tìm hiểu sâu vấn đề.

Việc hiểu hiệu suất của ứng dụng không chỉ cung cấp cho bạn thêm thông tin về chất lượng tương đối của ứng dụng mà còn giúp bạn đưa ra quyết định kinh doanh đúng đắn trong khi vẫn đảm bảo chất lượng của ứng dụng trên Cửa hàng Play.

# Kết luận
Bằng cách sử dụng Firebase và Google Play cùng nhau, bạn sẽ có một bộ công cụ mạnh mẽ giúp bạn có cái nhìn tổng quan cũng như thông tin chi tiết chuyên sâu về các vấn đề ổn định, giúp quá trình phát hành(release) của bạn bớt căng thẳng hơn, ứng dụng của bạn ít lỗi hơn và người dùng của bạn hài lòng về ứng dụng hơn. Để bắt đầu với các công cụ chất lượng của Firebase, bạn có thể tạo một dự án [tại đây](https://console.firebase.google.com/u/0/?pli=1) và tìm hiểu về cách liên kết nó với Google Play[ tại đây](https://support.google.com/firebase/answer/6392038).



Tài liệu tham khảo: https://medium.com/googleplaydev/how-to-increase-app-quality-with-firebase-and-google-play-bccf59f8d92e