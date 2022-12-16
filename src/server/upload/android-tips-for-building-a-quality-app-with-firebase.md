# Overview
Trong vài năm qua, kỳ vọng của người dùng về ứng dụng đã ngày càng cao. Nếu một ứng dụng gặp sự cố, treo hoặc hao pin, và có thể 1 đối thủ của bạn đang cung cấp các tính năng tương tự nhưng có trải nghiệm tốt hơn rất nhiều. Để đáp ứng những kỳ vọng này và làm sao để luôn dẫn đầu trước các đối thủ cạnh tranh, các nhà phát triển đang phải đầu tư nhiều hơn vào khả năng sử dụng và khả năng kỹ thuật của ứng dụng của họ.

Trong bài viết này, mình sẽ giới thiệu cho bạn một số điều mà làm để đảm bảo ứng dụng của các bạn luôn hoạt động tốt nhất.

# What is app quality?
Trước khi mình xem các mẹo (tips), hãy cùng xem điều gì tạo nên chất lượng ứng dụng. Chất lượng ứng dụng là cái nhìn tổng thể về trải nghiệm của khách hàng: từ việc tương tác với chức năng của ứng dụng - mọi người có thể thực hiện công việc mà họ phải làm một cách nhanh chóng và dễ dàng không? - hay là thông qua các vấn đề kỹ thuật - ứng dụng có bị crash hoặc bị treo (freezes), có vấn đề về hiệu suất không, tải có chậm không? Tất cả những điều này tạo nên chất lượng ứng dụng.

![](https://images.viblo.asia/76690b2d-e4b1-4841-99c5-56cdf0730d2e.png)

Hãy cùng tìm hiểu 1 số tips nhỏ nhé!

# Tips
## Tip 1: Test and test again
Testing là một trong những bước quan trọng mà chúng ta thực hiện để đảm bảo ứng dụng của chúng ta ổn định. Bắt đầu với những điều cơ bản, kiểm tra mã code của bạn với các bài Unit test, tích hợp (integration) và giao diện người dùng (UI tests). Sử dụng nhóm của bạn và những người khác trong tổ chức của bạn để kiểm tra nội bộ trước khi bạn triển khai. Hãy cân nhắc liên quan đến cộng đồng của bạn trong các thử nghiệm kín hoặc mở (closed or open tests).

Có các công cụ để hỗ trợ [kiểm tra mã code trong Android Studio](https://developer.android.com/studio/test) và Google Play Console, chẳng hạn như kiểm tra nội bộ, kín và mở ( [internal, closed, and open testing](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en)). Firebase cũng bao gồm các công cụ để cho phép kiểm tra, chẳng hạn như  [Firebase Test Lab](https://firebase.google.com/products/test-lab)

## Tip 2: Use feature flags
[Firebase remote config](https://firebase.google.com/products/remote-config) có thể cho phép bạn tích hợp  integrate feature flags (cờ tính năng) vào quy trình làm việc của chúng ta, giúp nâng cao chất lượng ứng dụng:
1. Khi bạn giới thiệu một bản phát hành mới (new release) và phát hiện ra một tính năng không hoạt động như dự kiến, bạn sử dụng cờ tính năng để tắt chức năng đó, tránh việc phải quay lại toàn bộ bản phát hành (release).
2. Khi bạn sử dụng cờ tính năng để triển khai nhiều phiên bản cập nhật bằng cách bật hoặc tắt các tính năng dựa trên thiết bị. Điều này giúp thực hiện kiểm tra triển khai để xác định bộ tính năng nào hoạt động tốt nhất trên các thiết bị khác nhau và quyết định tính năng nào được phân phối cho tất cả người dùng.

## Tip 3: Setup release readiness metrics
Thường có thể là một thách thức để tìm ra khi nào một bản build  sẵn sàng để release. Sử dụng các công cụ Firebase khác nhau, chẳng hạn như [App Distribution](https://firebase.google.com/products/app-distribution), [Crashlytics](https://firebase.google.com/products/crashlytics), and [Performance Monitoring](https://firebase.google.com/products/crashlytics), chúng ta có thể dễ dàng chia sẻ các phiên bản trước khi phát hành của ứng dụng (pre-release) với nhóm để thử nghiệm nội bộ (internal testing). Chúng ta Đồng thời nhận các báo cáo hiệu suất (crash) và sự cố chuyên sâu giúp chúng tôi tự tin khởi chạy ứng dụng. Ví dụ mình đã chuyển từ 99,35% crash-free sessions lên > 99,7% bằng cách sử dụng Crashlytics để xác định, sửa lỗi và theo dõi các bản phát hành (releases).

## Tip 4: Automate your release
Đừng dựa vào các bước phát hành được thực thi thủ công, mà hãy đưa mọi thứ vào tập lệnh (scripts) càng sớm càng tốt. Tại 1 số dự án mình đã làm, tự động hóa bao gồm kiểm tra continuous integration (CI) để đảm bảo các chuỗi đã dịch ở đúng định dạng. Chúng tôi cũng chạy một bản phát hành tập lệnh để tạo tag trên GitHub, kích hoạt bản build release  trên CI và tải bản build lên play store. Việc chuyển sang tập lệnh tự động khiến thời gian tiếp thị (market) của nhóm giảm đáng kể.

## Tip 5: Set your rollout thresholds in advance
Sau khi bắt đầu triển khai (rollout), chúng ta không muốn nhanh chóng tìm hiểu xem một số liệu cụ thể, có nghĩa là chúng ta nên tạm dừng hay từ bỏ việc phát hành(release) hay không. Chúng ta thiết lập đường cơ sở cho tỷ lệ sự cố tối đa có thể chấp nhận được (*baseline for the maximum acceptable crash rate*). Nếu tỷ lệ sự cố vượt quá mức tối đa này Tính năng này có nghĩa là chúng ta có thể nhận được thông báo ngay từ khi bắt đầu triển khai, thay vì sau đó vài giờ. Chúng ta sử dụng cảnh báo tốc độ của Firebase Crashlytics để có thông báo nhanh hơn cho các bản phát hành chỉ mới ra mắt khi có đủ người dùng trên bản phát hành.

Do đó, điều quan trọng là phải đặt ngưỡng điểm chuẩn cho các chỉ số quan trọng. Sau đó, bạn có thể chủ động khắc phục mọi vấn đề về độ ổn định của ứng dụng bất cứ khi nào các chỉ số quan trọng của bạn gần đến ngưỡng.

## Tip 6: Use stage rollouts
Khi giới thiệu bản cập nhật, hãy sử dụng [rollouts theo stage trong Play Console](https://support.google.com/googleplay/android-developer/answer/6346149?hl=en). Với 1 staged rollout, bản cập nhật của bạn sẽ được phân phối đến một nhóm nhỏ người dùng của bạn. Nếu tính năng hoạt động tốt với tập hợp con người dùng của bạn, bạn có thể tăng số lượng người dùng nhận được Cập nhật. Ngoài ra, nếu tính năng không hoạt động như dự kiến, bạn có thể tạm dừng triển khai để khắc phục sự cố hoặc từ bỏ hoàn toàn việc phát hành. Cách tiếp cận này giúp giảm thiểu số lượng người dùng bị ảnh hưởng bởi các sự cố không mong muốn.

## Tip 7: Set up alert notifications
Sử dụng các **alert notifications** để thông báo sự cố ngay khi chúng xảy ra. Ví dụ: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics/velocity-alerts) có thể thông báo cho nhóm của bạn khi một vấn đề đang gây ra sự cố khẩn cấp trong ứng dụng của bạn. Bạn cũng có thể sử dụng [tùy chọn thông báo trong Play Console](https://play.google.com/console/developers/preferences) để thiết lập cảnh báo qua email khi ứng dụng của bạn được xếp hạng một sao.

Ví dụ như bạn có thể xuất dữ liệu sang BigQuery và nhập dữ liệu đó vào một công cụ nội bộ (internal tool) để thiết lập các alerts cần thiết để tìm hiểu xem một bản phát hành đang diễn ra như thế nào. Ví dụ: trong quá trình triển khai, vì chúng ta có thể nhóm các lỗi, chúng ta có thể tìm hiểu dữ liệu trong BigQuery để xem điều gì đang xảy ra và có bao nhiêu người dùng bị ảnh hưởng.

## Tip 8: Use custom logs and keys in Crashlytics
Một trong những thách thức phổ biến khi rollout  là hiện tượng “nó hoạt động trên máy của tôi”. Ứng dụng của bạn có thể được cài đặt trên hàng trăm loại thiết bị khác nhau, với nhiều cấu hình khác nhau trên mỗi loại thiết bị. Do đó, các nhà phát triển có thể mất nhiều thời gian không thành công cố gắng tái hiện sự cố crashes vì họ không thể tìm ra nguyên nhân gây ra sự cố. Crashlytics giúp nắm bắt cấu hình của thiết bị, action của người dùng và trạng thái của ứng dụng. Khi sự cố phát sinh, sử dụng [custom logs and keys](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=android#add-keys) trong Crashlytics giúp dễ dàng tái hiện một sự cố và biết những sự kiện nào đã dẫn đến sự cố.

## Tip 9: Review and monitor user feedback.
[Monitor user ratings and reviews](https://support.google.com/googleplay/android-developer/answer/138230?hl=en) là một cách tuyệt vời để luôn cập nhật mọi thứ. Deliveroo (1 nhóm phát triển) đã giám sát cách thức giao đơn đặt hàng và khách hàng của họ có hài lòng không. Mặc dù điều này nằm ngoài quy trình phát triển ứng dụng nhưng nó cung cấp phản hồi cho nhóm phát triển. Một cách tiếp cận khác là sử dụng một công cụ phân tích để kiểm tra xem có bao nhiêu người dùng đang sử dụng các tính năng chính. Nếu việc sử dụng một tính năng đột ngột giảm xuống, có thể đã xảy ra sự cố.
Xem hướng dẫn dành cho Nhà phát triển Android về cách Duyệt và trả lời các bài đánh giá ứng dụng để tương tác tích cực với người dùng để có thêm lời khuyên về cách tương tác với người dùng thông qua các bài đánh giá.

# Conclusion
Users’ expectations (Kỳ vọng của người dùng) đã tăng lên và nhiều công ty đang đầu tư nhiều hơn vào khả năng sử dụng và khả năng kỹ thuật của ứng dụng để giúp giữ chân người dùng. Và tóm lại các công cụ chất lượng ứng dụng của Firebase và Google Play đã giúp làm cho ứng dụng của các bạn thực sự tốt nhất và đảm bảo mọi người có thể tận dụng tối đa dịch vụ của các bạn. 

Các bạn có thể tìm hiểu thêm về cách tích hợp các công cụ chất lượng ứng dụng của Firebase và Google Play vào quy trình phát hành (release) của bạn từ bài viết này [How to increase app quality with Firebase and Google Play](https://viblo.asia/p/android-lam-the-nao-de-tang-chat-luong-app-voi-firebase-va-google-play-3P0lP1np5ox)

Thanks for reading!

Nguồn tham khảo: https://medium.com/googleplaydev/tips-for-building-a-quality-app-with-firebase-dd21cbbb7b99