Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng App Bundles để giảm kích thước của ứng dụng mà người dùng của bạn tải xuống thiết bị của họ.

App Bundle là định dạng phân phối mới cho các ứng dụng Android giúp cung cấp phiên bản APK được tối ưu hóa của bạn bằng cách chỉ bao gồm những gì người dùng của bạn cần, giảm kích thước ứng dụng của bạn và làm cho người dùng của bạn hài lòng hơn.

Thông thường, khi người dùng tải xuống ứng dụng của bạn, họ sẽ nhận được cái được gọi là APK toàn thể. Đây là một tệp chứa tất cả các tài nguyên cho tất cả các cấu hình thiết bị, như hình ảnh, chuỗi, bố cục, v.v. Người dùng sẽ không cần tất cả chúng, điều này gây lãng phí không gian và để lại ít chỗ hơn cho các ứng dụng hoặc trò chơi.

Với App Bundles, người dùng của bạn sẽ nhận được một phiên bản APK đặc biệt chỉ bao gồm ngôn ngữ, mật độ màn hình và tài nguyên họ cần cho mỗi cấu hình người dùng duy nhất.

Hãy tưởng tượng một trong những người dùng của bạn đã chọn tiếng Anh làm ngôn ngữ mặc định và thiết bị của họ hỗ trợ mật độ cực cao (hay còn gọi là xxhdpi). Sử dụng App Bundles, Google Play Store sẽ chỉ tải xuống một tệp APK có tài nguyên `value-en/string.xml` và `xxhdpi`, giảm dung lượng và chi phí cần thiết của ứng dụng.

> Lưu ý: Hướng dẫn này giả định rằng bạn đã quen thuộc với những điều cơ bản về phát triển Android. Các điều kiện tiên quyết khác bao gồm kiến thức về sử dụng bash/Terminal, Gradle và tài khoản nhà phát triển trên [Google Play Console](https://play.google.com/apps/publish).
> 

## App Bundle hữu ích như thế nào?
Dung lượng là một lý do chính tại sao người dùng sẽ cài đặt hoặc gỡ cài đặt ứng dụng của bạn. Khi người dùng tải xuống một ứng dụng mới, họ phải cân nhắc hai điều: tiêu thụ dữ liệu và lưu trữ.

Nếu ứng dụng của bạn quá lớn, người dùng có thể phải gỡ cài đặt một hoặc nhiều ứng dụng khác để cài đặt ứng dụng của bạn.
![](https://images.viblo.asia/e0f1c4cd-f8a8-4116-bd9c-bf587002f48a.png)

Một sự đánh đổi khác là ứng dụng của bạn sẽ tiêu tốn bao nhiêu dữ liệu, tùy thuộc vào gói dữ liệu của họ. Người dùng thường có gói dữ liệu di động hạn chế, điều đó có nghĩa là việc tải xuống ứng dụng của bạn có thể khiến người dùng rơi vào tình huống khó khăn. Họ sẽ cần phải quyết định xem điều gì quan trọng hơn: streaming video hoặc tải xuống ứng dụng của bạn.

Bạn không muốn trở thành ứng dụng tăng hóa đơn điện thoại của họ, phải không?
![](https://images.viblo.asia/9732b031-d125-454c-bbc0-99eb4962b10f.png)

Có một APK nhẹ sẽ giúp bạn thu hút người dùng mới vào ứng dụng của bạn và giữ người dùng hiện tại.

> Lưu ý: Để sử dụng App Bundles, bạn cần cài đặt Android Studio 3.2 trở lên. Nếu bạn không có nó, vui lòng [tải xuống](https://developer.android.com/studio/) trước khi tiếp tục.
> 

## Bắt đầu tạo App Bundle
App Bundle là một định dạng mới có tên `.aab` (Android App Bundle), mà bạn tải lên Play Store thay vì `apk` truyền thống. Với định dạng mới này, Play Store sẽ tạo ra nhiều biến thể khác nhau của APK của bạn, tùy thuộc vào cấu hình thiết bị người dùng của bạn.

App Bundles tận dụng một khái niệm gọi là [split APK](https://developer.android.com/studio/build/configure-apk-splits) (chia APK). Như tên gọi của nó, APK phân chia tương tự như `.apk` bình thường. Sự khác biệt là một tệp APK tách có thể được chia thành các phần nhỏ riêng biệt, một tệp chứa mã cơ sở và các APK nhỏ khác chứa tài nguyên ứng dụng có thể được cài đặt sau này.

Cái hay của việc chia tách là hệ điều hành Android xử lý toàn bộ ứng dụng và mỗi phần tách là một phần nhỏ có thể được thêm độc lập. Nó giống như một ứng dụng với các khối Lego nhỏ để thêm vào.

Để xem App Bundle được cấu trúc như thế nào, bạn sẽ tạo một gói cho ứng dụng bằng cách chọn: **Build ▸ Build Bundle (s) / APK (s) ▸ Build Bundle** trong menu Android Studio.
![](https://images.viblo.asia/5ece65fa-0c95-429b-9d23-e13afdcbb5c3.png)

Hoàn tất build ứng dụng, Android Studio sẽ hiển thị cho bạn lời nhắc về nơi tìm file. Nhấn vào **locate** để mở vị trí file trong trình xem hệ thống file của bạn, ví dụ: Finder trên macOS.
![](https://images.viblo.asia/c2842b05-3185-4517-81ee-f4e2b1c6220d.png)

Vì file `.aab` chỉ là một file nén, hãy giải nén nó để xem nội dung của nó.
![](https://images.viblo.asia/a3161b6f-f6f4-4a28-a25b-6d59a92551f6.png)

Cấu trúc của một `.aab`.
![](https://images.viblo.asia/6f98d804-8cfd-42da-be0a-17d21dd6b39b.png)

* **base/, feature1/, và feature2/**: Thư mục cấp cao nhất có chứa từng module của ứng dụng của bạn. Trong ví dụ trên, bạn chỉ có một thư mục base, vì bạn chỉ có một module. Thư mục base luôn chứa module chính của ứng dụng của bạn. Mỗi module tính năng động (dynamic feature) sẽ có thư mục feature riêng của nó.
* **BUNDLE-METADATA/**: Các tệp siêu dữ liệu có thể bao gồm ánh xạ ProGuard và danh sách các tệp DEX ứng dụng của bạn. Thư mục này sẽ chỉ khả dụng khi proguard được bật.
* **Module Protocol Buffer (.pb) files**: Cung cấp siêu dữ liệu mô tả nội dung của từng mô-đun ứng dụng cho Play Store. Chẳng hạn, `BundleConfig.pb` cung cấp thông tin về chính bundle đó, giống như phiên bản nào của các build tools đã được sử dụng để build App Bundle.
* **dex**: Chứa các tệp DEX cho mỗi mô-đun trong một thư mục riêng.
* **res, lib, và assets**: Các thư mục này được sử dụng giống như APK thông thường, ngoại trừ đối với App Bundle, chúng được Google Play sử dụng để chỉ đóng gói các tệp thỏa mãn cấu hình của thiết bị đích.
* **root**: Thư mục này lưu trữ các tệp mà sau đó được chuyển đến thư mục gốc của APK bao gồm mô-đun tương ứng.

Điều duy nhất bạn phải làm để sử dụng App Bundle là tạo một .aab và tải nó lên Google Play Store. Play Store sẽ xử lý mọi thứ từ việc tạo nhiều phiên bản APK của bạn, đến việc chọn đúng phiên bản cho người dùng của bạn.

## Tạo App Bundle được ký từ Android Studio
Chọn **▸ Build ▸ Generate Signed Bundle / APK** từ Android Studio.
![](https://images.viblo.asia/757828d9-34e3-4c9e-af0b-bba170d1ecdf.png)

Chọn Android App Bundle và click Next.
![](https://images.viblo.asia/27a7fd86-678f-4e7f-8b21-1fb079032dbb.png)

Nhập vào cấu hình ký ứng dụng của bạn và click Next.
![](https://images.viblo.asia/521afd3e-3d4f-40a2-b1f4-a84da6d93bf6.png)

Trên màn hình tiếp theo, chọn **Destination Folder** và **Build Type**, sau đó bấm **Finish**. Rất đơn giản.
![](https://images.viblo.asia/02606029-69bc-48b1-8f5c-38a17eca62fa.png)

## Publish ứng dụng App Bundle lên Play Store
Để xuất bản App Bundle của bạn lên Play Store, điều đầu tiên bạn cần làm là đăng ký [App Signing bằng Google Play](https://support.google.com/googleplay/android-developer/answer/7384423?hl=en). Sau khi đăng ký, bạn có thể quản lý các bản phát hành của mình như đã làm với APK.
![](https://images.viblo.asia/a500715b-685e-4ed7-981d-dc54dad83d7d.png)

Sau khi tải lên App Bundle của bạn, bạn có cơ hội để xem lại bản phát hành của mình.
![](https://images.viblo.asia/2143f91e-30df-40c9-9b36-63a24af23fc4.png)

Google Play console sẽ tạo tất cả APK cho cấu hình người dùng của bạn. Một công cụ tuyệt vời để trực quan hóa tất cả các APK đó là **Bundle Explorer**.

Chuyển đến **Release Management ▸ Artifact library**, sau đó chọn một trong các bundles bạn đã tải lên và nhấp vào **EXPLORE**
![](https://images.viblo.asia/773199a2-251d-49a2-98ca-6f7eeaac765d.png)

Bây giờ bạn có thể thấy tất cả các khoản tiết kiệm mà App Bundle cung cấp và tất cả các tệp APK mà nó tạo ra.
![](https://images.viblo.asia/cabfe00e-5ea1-4fe5-bbba-dab89c344622.png)

Bạn có thể đi sâu hơn nữa bằng cách nhấp vào **VIEW DEVICES** và xem các thiết bị cụ thể mà APK sẽ được gửi tới.
![](https://images.viblo.asia/14e5789f-9695-417b-b9c8-555dc2a043b5.png)

Bundle Explorer có thể là một công cụ tuyệt vời trong khi gỡ lỗi, khi bạn muốn biết chính xác tệp mà người dùng nhận được trên thiết bị của họ.

App Bundle cũng có sẵn trong [Publishing API](http://developer.google.com/android-publisher) để tự động hóa.

## Khả năng tương thích
Các thiết bị trên Android 4.4 (API cấp 19) trở xuống không hỗ trợ split APK, là nền tảng của việc phân phối nhiều tệp APK cho thiết bị. Google Play phục vụ một phiên bản APK duy nhất bao gồm resources cho tất cả các ngôn ngữ mà ứng dụng của bạn hỗ trợ trên các phiên bản Android đó. Để tương thích ngược, bạn không nên thực hiện các bước bổ sung vì Google Play sẽ lo mọi thứ cho bạn.

## Kết luận
Bây giờ, bạn đã bắt đầu với App Bundles, bạn nên thử sử dụng App Bundles với các ứng dụng của riêng bạn và xuất bản một bản nội bộ trên Google Play Store.

Để tìm hiểu thêm về App Bundles, hãy xem [tài liệu tham khảo chính thức](https://developer.android.com/guide/app-bundle/). Bạn cũng có thể tìm hiểu thêm về App Bundles và Dynamic Delivery với các mô-đun tính năng (feature modules) [tại đây](https://codelabs.developers.google.com/codelabs/your-first-dynamic-app/index.html?index=..%2F..io2018#0).

Reference: https://www.raywenderlich.com/9043-android-app-bundles-getting-started