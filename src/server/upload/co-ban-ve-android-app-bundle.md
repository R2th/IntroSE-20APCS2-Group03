# 1. Giới thiệu
Android App Bundle là 1 định dạng upload mới bao gồm tất cả các resource và mã code được compile trong ứng dụng của bạn, nhưng không tạo APK và chữ ký Google Play.

Mô hình mới của Google Play, được gọi là **Dynamic Delivery** sau đó sử dụng gói ứng dụng của bạn để tạo và cung cấp APKs tối ưu hóa cho từng cấu hình thiết bị của người dùng, nên họ chỉ download mã code và tài nguyên họ cần để chạy ứng dụng. Bạn không cần phải build, ký và quản lý nhiều APKs để support nhiều thiết bị khác nhau và từ đó người dùng có các bản tải xuống nhỏ hơn, tối ưu hơn. 

Thêm vào đó, bạn có thể thêm các module dynamic feature vào ứng dụng và đưa chúng vào app bundle. Những module này chứa các tính năng và assets mà bạn có thể quyết định không bao gồm khi người dùng tải ứng dụng lần đầu và cài đặt ứng dụng. Sử dụng Play Core Library, ứng dụng của bạn có thể yêu cầu tải xuống sau các module dưới dạng các APKs dynamic feature, và thông qua Dynamic Delivery, Google Play chỉ cung cấp mã và tài nguyên của module đó cho thiết bị.

Publish ứng dụng với Android App Bundle cũng tăng kích thước ứng dụng lên 500MB mà không phải sử dụng tệp mở rộng APK. Nhưng đó là kích thước áp dụng cho việc tải xuống chứ không phải là kích thước xuất bản. Nên người dùng có thể download ứng dụng có dung lượng lên tới 500MB và với dynamic delivery, tất cả dung lượng được sử dụng chỉ được sử dụng cho mã code và resources cần thiết để chạy ứng dụng. Khi kết hợp với các thư viện hỗ trợ gốc không nén, các ứng dụng sẽ lớn hơn, như các game chẳng hạn, có thể cắt giảm disk usage và tăng khả năng giữ người dùng sử dụng ứng dụng.
# 2. Bắt đầu nào
Để xây dựng app bundles và hỗ trợ Dynamic Delivery, thực hiện theo các bước:
* Download Android Studio 3.2 hoặc cao hơn - cách dễ nhất để thêm dynamic feature module và xây dựng app bundles
* Thêm các thành phần hỗ trợ Dynamic Delivery bằng cách sử dụng base module, mã code và resources cho cấu hình APKs, và thêm dynamic feature module.
* Xây dựng Android App Bundle sử dụng Android Studio. Nếu không sử dụng IDE, có thể thay thế bằng cách sử dụng command line
* Test Android App Bundle sử dụng bundletool để generate APKs từ app bundle và deploy sang thiết bị kết nối
* Đăng ký vào Google Play. Nếu không, bạn không thể upload app bundle trong Play Console.
* Upload app bundle tới Play Console. Bạn có thể sử dụng Play Console internal test track để test việc download ứng dụng thông qua Dynamic Delivery.

Cân nhắc việc sử dụng dynamic feature beta tester
Nếu muốn publish ứng dụng bao gồm dynamic feature module sang bản production, bạn phải áp dụng dynamic feature beta program. Nếu bạn chấp thuận theo beta program, theo những điều sau khi bạn phát triển ứng dụng dynamic feature:
* Chỉ thiết bị chạy Android 5.0 (API 21) và cao hơn hỗ trợ download và cài đặt dynamic feature. Để dynamic feature có sẵn trong vesion Android, chắc chắn rằng enabled **Fusing** khi tạo dynamic feature module.
* Chắc chắn rằng enable **SplitCompat**, để ứng dụng lập tức truy cập để download dynamic feature modules
* Nếu kích thước download lớn, ứng dụng của bạn cần xác nhận thông tin từ người dùng trước khi download 
* Dynamic feature module không nên khai báo activities trong manifest khi mà set **android:exported** là true. Vì không có sự đảm bảo nào để thiết bị download dynamic feature module khi 1 ứng dụng khác đang cố gắng hiển thị lên giao diện. Thêm nữa là ứng dụng của bạn cần xác nhận rằng dynamic feature được downloaded trước khi cố gắng truy cập mã code và resources. 
* Trước khi publish ứng dụng, chắc chắn rằng test dynamic feature sử dụng Play Console's test track. 
# 3. Dynamic Delivery với APKs chia nhỏ
Thành phần cơ bản của Dynamic Delivery là cơ chế phân chia APK có sẵn trên Android 5.0 (API 21) và cao hơn. APK phân chia giống với APK thông thường, chúng bao gồm mã bytecode DEX được biên dịch, resources và Android manifest. Tuy nhiên, nền tảng Android có thể ghép các phần APK chia nhỏ như 1 ứng dụng. Nghĩa là bạn có thể cài đặt nhiều APK chia nhỏ mà bạn có quyền truy cập mã code và resource và xuất hiện dưới dạng ứng dụng được cài đặt trên thiết bị.
Lợi ích của việc phân chia APk là dễ dàng phân chia nhỏ APK lớn thành các phần nhỏ giúp hỗ trợ các gói nhỏ hơn, được cài đặt trên thiết bị người dùng theo yêu cầu.
Ví dụ như 1 APK phân chia bao gồm các mã code và resources cho tính năng bổ sung mà chỉ 1 số người dùng cần, trong khi APK khác chỉ bao gồm tài nguyên cho ngôn ngữ hoặc mật độ màn hình cụ thể. Mỗi APK phân chia này được tải xuống và cài đặt khi người dùng yêu cầu. 

Có các loại APK sau đây:
*Base APK*: APK này chứa mã code và resources phân chia APK có thể truy cập và cung cấp chức năng cơ bản cho ứng dụng. Khi người dùng yêu cầu download ứng dụng, APK này được download và cài đặt. 

*Configuration APK*: mỗi phần APK bao gồm thư viện native và resources cho 1 màn hình riêng, cấu trúc CPU hoặc ngôn ngữ. Khi 1 user download app, thiết bị của họ download và install chỉ configuration APK phù hợp với thiết bị. Mỗi configuration APK phụ thuộc base APk hoặc dynamic feature APK.

*Dynamic feature APK*: mỗi phần của APK chứa mã code và resources cho tính năng của ứng dụng mà không yêu cầu ứng dụng phải được cài đặt. Sử dụng Play Core Library, dynamic APK có thể được cài đặt sau khi base APK được cài đặt trên thiết bị để cung cấp chức năng bổ xung cho người dùng. 

![](https://images.viblo.asia/11766cf9-3685-4ba2-97e4-34fd152e7998.png)

Hình trên mô tả cây phụ thuộc sử dụng nhiều APK, các APK đều dựa trên base APK.

Các thiết bị Android 4.4 (API 19) và thấp hơn
Vì thiết bị chạy Android 4.4 và thấp hơn không hỗ trợ download và cài đặt API phân chia, Google Play thay thế các thiết bị single APK, gọi là **multi-APK** để tối ưu việc cấu hình thiết bị. Do đó, multi-APK thể hiện đầy đủ trải nghiệm ứng dụng của bạn nhưng không bao gồm mã code và resources không cần thiết.
Tuy nhiên, chúng bao gồm các tài nguyên cho tất cả các ngôn ngữ mà ứng dụng của bạn hỗ trợ. Điều đó cho phép người dùng thay đổi cài đặt ngôn ngữ ưa thích mà không cần tải xuống các APK khác nhau.

Multi-APK không có khả năng download dynamic feature module sau. Để có dynamic module trong APK, bạn phải disable **On-demand** hoặc enable **Fusing** khi tạo dynamic feature module.

# 4. Android App Bundle format
Android App Bundle là một file (với phần đuôi mở rộng **.aab**) để bạn upload lên Google Play để hỗ trợ Dynamic Delivery.

App bundle là các tệp nhị phân được ký và sắp xếp mã và resources trong module. Google Play sau đó sử dụng app bundle để generate các APK khác nhau tới users như base APk, dynamic feature APK, configuration APK và multi-APK. Các thư mục được tô màu xanh như "drawable/, value/, lib/" đại diện cho mã code và resources mà Google Play sử dụng để tạo cấu hình APK cho mỗi module

![](https://images.viblo.asia/d0edf1d5-f986-4645-acef-36d08528d95d.png)
Android App Bundle với 1 base module và 2 dynamic feature modules

App bundle file và directories:
* **base/, feature1/, feature2/** : thư mục cấp cao đại diện cho 1 module khác nhau của ứng dụng. 
* **BUNDLE_METADATA/**: thư mục này bao gồm file metadata chứa thông tin tools và app stores. VD metadata file có thể chứa ProGuard ánh xạ với DEX files. 
* **Module Protocol Buffer(.pb) file**: files cung cấp metadata giúp mô tả nội dung mỗi app module tới app stores như Google Play. VD  BundleConfig.pb cung cấp thông tin về bundle chính nó như phiên bản build tools nào được sử dụng để build app bundle…
* **manifest/**: app bundles lưu trữ AndroidManifest.xml file cho mỗi module trong thư mục riêng.
* **dex/**: app bundle lưu trữ DEX file cho mỗi module trong thư mục riêng
* **res/, lib/, assets/**: các thư mục này có chức năng gần giống nhau trong APK điển hình. 
* **root/**: thư mục này lưu trữ file root của bất kỳ APK bao gồm module thư mục được chứa.
# 5. Build và deploy Android App Bundles

App bundle khác với APK ở chỗ bạn không thể deploy cho 1 thiết bị. Thay vào đó, nó có định dạng tải lên bao gồm tất cả các mã code và resource được biên dịch trong 1 sản phẩm duy nhất. Do đó, sau khi tải lên app bundle đã ký, Google Play có mọi thứ nó cần để xây dựng và ký APK app của bạn, và mang nó đến tất cả người dùng thông qua Dynamic Delivery.
# 6. Test app bundle với bundletool
Sau khi xây dựng Android App Bundle, bạn nên test các Google Play sẽ sử dụng nó để generate APK và cách APK được deployed trên thiết bị.

Có thể thực thi việc test sử dụng bundletool- command line tool mà Gradle, Android Studio và Google Play sử dụng để xây dựng Android App Bundle hoặc chuyển đổi app bundle thành APK được deployed cho các thiết bị. 

Sau khi testing app bundle cục bộ, bạn nên kiểm tra nó thông qua Google Play bằng cách upload app bundle lên Play Console. Internal test track cho phép bạn upload app bundle lên Play Console và bắt đầu testing trên thiết bị với Dynamic Delivery trong vài phút.

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
# 7. Tài liệu tham khảo
https://developer.android.com/guide/app-bundle/