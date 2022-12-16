### 1. Tối ưu hóa Image
Kích thước hình ảnh có thể được giảm thuận tiện mà không làm loãng độ phân giải. Ví dụ: hình ảnh .jpg và .png có thể được chuyển đổi sang định dạng hình ảnh web .webp để thu nhỏ ứng dụng mà không ảnh hưởng đến chất lượng. Định dạng .webp cung cấp tính năng nén mất mát như .jpg và độ trong suốt như .png. Nói tóm lại, nó có thứ tốt nhất của cả hai loại.

Có một số công cụ có sẵn để chuyển đổi như vậy. Các công cụ như guetzli và packjpg phù hợp với tệp .jpg nén tốt nhất trong khi pngcrush và zopflipng cho các tệp .png. Ngoài ra, các designer có thể implement đồ họa vector để tạo ra các hình ảnh độc lập với độ phân giải đơn giản. Các ứng dụng này có sẵn trong Android dưới dạng các đối tượng `VectorDrawable` và cho phép tệp 100 byte tạo ra hình ảnh sắc nét và có kích thước màn hình.

```
android {
     defaultConfig {
         vectorDrawables.useSupportLibrary true
     }
 }
```

Được biết, một số hình ảnh có thể làm mà không cần static resources. Framework là quá đủ để vẽ các hình ảnh đó một cách linh hoạt khi chạy. Sử dụng các đối tượng Vector Drawables là một ý tưởng tuyệt vời khi các ứng dụng kích thước nhỏ được phát triển.

Chúng có thể tồn tại trên không gian tối thiểu trong tệp APK và tạo hình ảnh tuân thủ các nguyên tắc thiết kế material. Tuy nhiên, có thể có một sự tranh cãi khi sử dụng CPU và RAM vì các đối tượng phức tạp có xu hướng làm chậm chúng.

Ngoài ra, sử dụng công cụ Draw 9-patch cũng có thể tiết kiệm không gian. Đây là trình chỉnh sửa hình ảnh WYSIWYG và là một trong những cách thú vị nhất để cắt kích thước hình ảnh. Công cụ cho phép bạn tạo hình ảnh bitmap có thể tự động thay đổi kích thước để phù hợp với các kích thước màn hình khác nhau của các thiết bị di động khác nhau. Chọn các phần trong ảnh có thể được thu nhỏ theo chiều dọc hoặc chiều ngang tùy thuộc vào các chỉ số được vẽ trong đó.

Một cách khác là sử dụng công cụ **aapt** để crunch hình ảnh .png, các tài nguyên có trong `res/drawable/`. Việc nén là lossless. Chẳng hạn, một hình ảnh .png màu thật mà không cần nhiều hơn 256 màu có thể được chuyển đổi thành bảng màu được bật 8 bit. Sau này vẫn giữ được chất lượng nhưng giảm kích thước.

Tuy nhiên, các nhà phát triển phải nhớ rằng công cụ **aapt** sẽ không nén các tệp .png trong thư mục` asset/`. Nó cũng sẽ không thể tối ưu hóa bất kỳ hình ảnh nào sử dụng hơn 256 màu. Ngoài ra, nó có thể làm phồng các tập tin .png đã bị thu hẹp. Nhược điểm này có thể được bỏ qua bằng cách sử dụng cờ `cruncherEnables` trong Gradle như sau:

```
aaptOptions {
    cruncherEnabled = false
}
```

### 2. Loại bỏ Code dư thừa (Redundant)
Trong khi phát triển một ứng dụng dành cho thiết bị di động, điều cơ bản là bạn sẽ hiểu được dấu vết của mã trong một hệ thống nơi nó được tạo tự động. Ví dụ, có một số công cụ protocol buffer có thể tạo ra các phương thức và các lớp dư thừa.

Các phương thức và lớp này không làm được gì cho ứng dụng. Thay vào đó, chúng chỉ làm mở rộng kích thước của ứng dụng một cách nhanh chóng. Các mã lặp đi lặp lại như vậy cần phải được loại bỏ để kích thước ứng dụng vẫn tối ưu mà không có sự ảnh hưởng của các phần thừa.

### 3. Loại bỏ dead code
Kích thước tệp APK tỷ lệ thuận với tốc độ tải của ứng dụng, bộ nhớ mà nó sử dụng và năng lượng mà nó tiêu thụ. Như vậy, bất kỳ mã không sử dụng hoặc không hoạt động nào được giữ chỉ vì mục đích lưu giữ sẽ chỉ thêm vào số lượng lớn. Giống như việc loại bỏ các mã dư thừa, việc loại bỏ mã chết là cần thiết để ứng dụng của bạn duy trì năng lượng bất cứ lúc nào, bất cứ ngày nào.

Quá trình này không ảnh hưởng đến chức năng của ứng dụng, bởi vì các mã như vậy không phải là một phần của ứng dụng này ngay từ đầu. Tuy nhiên, loại bỏ chúng giúp tăng cường chất lượng của mã nguồn và giảm nhu cầu duy trì kích thước mã. Ngoài ra, giới thiệu các lỗi được ngăn chặn, do đó nó biểu hiện cho một ứng dụng lành mạnh.

### 4. Loại bỏ các tài nguyên và lớp không sử dụng
Một bộ phân tích mã tĩnh được gọi là lint là một phần của Android Studio và có thể phát hiện các tài nguyên trong thư mục res/ không được tham chiếu trong mã. Tài nguyên như vậy không được sử dụng và do đó, vô nghĩa. Bất cứ khi nào công cụ lint tìm thấy một tài nguyên như vậy, nó sẽ in thông báo này:

```
res/layout/preferences.xml: Warning: The resource R.layout.preferences appears
    to be unused [UnusedResources]
```

Chẳng hạn, khi bạn thêm thư viện vào mã, các tài nguyên không sử dụng có thể theo sau. Công cụ lint sẽ phát hiện điều này và gửi cho bạn cảnh báo. Tuy nhiên, các nhà phát triển nên nhớ rằng công cụ sẽ bỏ qua việc quét thư mục assets/ hoặc assets một tài liệu tham khảo mã thông qua sự phản chiếu (reflection) hoặc thậm chí các nhà phát triển tệp thư viện liên kết với ứng dụng. Và sẽ không bao giờ nó tự xóa tài nguyên!

Để tự động loại bỏ các tài nguyên và lớp không sử dụng, Gradle là công cụ tốt nhất. Bạn chỉ cần kích hoạt thu hẹp mã để có thể sử dụng `shrinkResources` và cho phép nó trong tệp `build.gradle` của ứng dụng.

Trong quá trình này, một công cụ khác có tên ProGuard sẽ ra đời. Đây là một công cụ thu nhỏ tệp, trình tối ưu hóa của lớp Java có thể xác định và loại bỏ các tài nguyên, lớp, phương thức, trường và thuộc tính không sử dụng hoặc đổi tên chúng bằng cách sử dụng các tên ngắn không có nghĩa. Nó có thể loại bỏ tất cả các phương thức không sử dụng và cắt tệp `class.dex` sau khi bạn đặt `minifyEnables` thành `true`.

```
android {
    // Other settings

    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

Tuy nhiên, trong trường hợp này, ProGuard sẽ chỉ xóa mã không sử dụng, sau đó Gradle xóa các tài nguyên không sử dụng.

Khi bạn khai báo các cấu hình được ứng dụng của bạn hỗ trợ, Gradle cung cấp cho hệ thống xây dựng các thông tin cần thiết với sự trợ giúp của các tùy chọn resConfig. Sử dụng thông tin này, các tài nguyên từ các cấu hình không được hỗ trợ sẽ bị hệ thống xây dựng ngăn chặn xuất hiện trong APK, do đó làm giảm kích thước ứng dụng.

### 5. Tái sử dụng tài nguyên
Tái sử dụng là tốt hơn và dễ dàng hơn loại bỏ. Nó cũng là một cách tuyệt vời để sử dụng tài nguyên cho các nhiệm vụ khác. Chẳng hạn, bạn có thể có một nguồn tài nguyên kín đáo để xác định các biến thể trong một hình ảnh liên quan đến sắc thái, sắc độ và hướng.

Tuy nhiên, bạn cũng có thể sử dụng cùng một tài nguyên cho các hình ảnh khác, tùy chỉnh khi cần thiết. Việc sử dụng lại các tài nguyên giúp tiếp tục duy trì hiệu suất cuộn của ứng dụng một cách tối ưu và giảm đáng kể kích thước của nó.

Android cung cấp một số tiện ích để thay đổi các thuộc tính của tài sản. Chẳng hạn, để thay đổi màu sắc trong một nhà phát triển hình ảnh, có thể sử dụng các thuộc tính `android:tint` và `tintMode` trên các phiên bản cao hơn hoặc lớp `ColorFilter` trong các phiên bản thấp hơn.

Tuy nhiên, một lần nữa, một số tài nguyên chỉ tương đương với một tài nguyên khác, có thể được bỏ qua. Ví dụ:
```
<?xml version="1.0" encoding="utf-8"?>
<rotate xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_thumb_up"
    android:pivotX="50%"
    android:pivotY="50%"
    android:fromDegrees="180" />
```

### 6. Sử dụng tối thiểu các Tài nguyên từ Thư viện
Các thư viện bên ngoài thường được sử dụng trong khi phát triển ứng dụng Android để khả năng sử dụng và tính linh hoạt có thể được phân phối tối đa. Các dịch vụ phổ biến là Google Play Services, được sử dụng để truy xuất các bản dịch tự động của văn bản ứng dụng và Thư viện hỗ trợ Android, được sử dụng để nâng cao trải nghiệm người dùng trên các thiết bị cũ.

Tuy nhiên, các thư viện như vậy cũng được thiết kế cho máy chủ hoặc máy tính để bàn và đi kèm với vô số phương thức và đối tượng không thể phục vụ ứng dụng cho bất kỳ mục đích nào. Tuy nhiên, bạn có thể chỉnh sửa các tệp và chỉ giữ lại những phần mà ứng dụng của bạn yêu cầu.

Tất nhiên, để điều này xảy ra, bạn cần có quyền sửa đổi. Ngoài ra, bạn cũng có thể sử dụng thư viện phù hợp với thiết bị di động cho các chức năng cụ thể.

### 7. Hỗ trợ cho mật độ màn hình cụ thể
Android có số lượng thiết bị di động khổng lồ với mật độ màn hình đa dạng, bao gồm ldpi, tvdpi, mdpi, hdpi, xhdpi, xxhdpi và xxxhdpi. Tuy nhiên, bạn không cần tất cả chúng cho ứng dụng. Android sẽ tự động mở rộng quy mô các tài nguyên có sẵn cho các mật độ khác.
```
android {
    splits {
        density {
            enabled true
        }
    }
}
```

### 8. Giảm kích thước của Native Binaries
Trong trường hợp ứng dụng của bạn chạy trên native code, đây là một cách hiệu quả để giảm số lượng native and Java codebase cũng như thu nhỏ kích thước của phiên bản phát hành. Có hai cách chính để giảm kích thước của Native Binaries:

* Bằng cách sử dụng công cụ **arm-eabi-strip** trong Android NDK để loại bỏ các biểu tượng gỡ lỗi không sử dụng
* Bằng cách thiết lập `android:extractNativeLibs=”false”` để tránh việc trích xuất các native libraries bằng cách ngăn `PackageManager` sao chép các tệp `.so` từ APK sang hệ thống tệp.

### 9. Tránh Enumerations
Enums là khó vận dụng. Một Enum duy nhất có thể thêm bất cứ nơi nào từ 1.0 đến 1.4 KB vào tệp class.dex của một ứng dụng. Chúng có thể tích lũy ở tốc độ ninja, đặc biệt nếu có thư viện dùng chung hoặc hệ thống phức tạp.

Đây là lý do tại sao tốt hơn là tránh xa các enumeration. Bằng cách sử dụng ProGuard và chú thích `@IntDef` để chuyển đổi số liệt kê thành số nguyên. Đổi lại, bạn sẽ có một kích thước giảm với tất cả sự tốt đẹp của enums còn nguyên vẹn.

### 10. Bảo trì nhiều tệp APK
Một số APK đi kèm với nội dung được tải xuống nhưng hầu như không được sử dụng. Đối với các instances, các tiện ích bổ sung như ngôn ngữ bổ sung không phải lúc nào cũng cần thiết, nhưng dù sao cũng được tải xuống. Điều này không chỉ tiêu thụ dữ liệu mà còn mở rộng ứng dụng và chiếm dung lượng trong bộ nhớ điện thoại.

Một giải pháp cho vấn đề này đã được thảo luận - tải lên ứng dụng trong Google Play thông qua Android App Bundles, cho phép Google kích hoạt APK được tối ưu hóa theo cấu hình thiết bị.

Ngoài ra, bạn cũng có thể chia nó thành nhiều APK dựa trên các assets cụ thể. Khi bạn thực hiện việc này, người dùng sẽ nhận được APK duy nhất bổ sung cho các tính năng và cài đặt của thiết bị. Chẳng hạn, nếu một thiết bị di động nào đó đi kèm với hdpi, nó sẽ không cần tài nguyên xxxhdpi.

### 11. Implementation các Downloadable Font
Đây là một bổ sung mới cho Android. Google nhận ra thực tế là phần lớn các ứng dụng trên Play Store có các phông chữ chung. Tuy nhiên, các phông chữ này đã là một phần của app bundle.

Do đó, các ứng dụng khác nhau trên cùng một thiết bị mang các bản sao của cùng một phông chữ. Ngoài ra, gần như tất cả các ứng dụng này đã được tối ưu hóa cho các thiết bị di động. Đây là lý do tại sao Google quyết định giới thiệu Downloadable Fonts trong Support Library 26.
![](https://images.viblo.asia/5d4b1bb9-c637-48b7-91d4-017264d51e4d.png)

Theo đó, các API hiện có thể yêu cầu phông chữ từ một ứng dụng cung cấp phông chữ và loại bỏ các tệp vào APK hoặc cho phép các tệp ứng dụng tải xuống phông chữ. Phông chữ có thể tải xuống không chỉ làm giảm kích thước tệp APK mà còn giúp lưu dữ liệu di động và bộ nhớ điện thoại.


### 12. Sử dụng Trình phân tích kích thước APK
Nếu bạn muốn tìm hiểu những gì trong ứng dụng của bạn, Trình phân tích kích thước APK là một công cụ tuyệt vời. Đây có lẽ là cách dễ nhất để thực hiện và thực hiện các cách có thể dẫn đến giảm kích thước ứng dụng. Có hai phương pháp để làm điều đó:

* Sử dụng Android Studio: Android Studio > File > Settings > Plugins > Marketplace > Android Size Analyzer > Install > Analyze > Analyze App Size
* Dùng Command Line: `./size-analyzer check-bundle` `./size-analyzer check-project `

Tham khảo: https://www.mindinventory.com/blog/how-to-reduce-android-app-size/