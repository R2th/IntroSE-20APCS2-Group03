Ý tưởng thú vị là một khởi đầu tuyệt vời đối với một ứng dụng làm thỏa mãn người dùng, nhưng đó mới chỉ là khởi đầu. Bước tiếp theo là tối đa hóa hiệu suất ứng dụng của bạn. Người dùng mong muốn gì từ ứng dụng của bạn:
* Sử dụng pin một cách tiết kiệm.
* Khởi động nhanh chóng.
* Phản hồi nhanh với các tương tác của người dùng
...

Loạt bài này sẽ cung cấp cho bạn bí quyết cần để làm cho ứng dụng không chỉ tuyệt vời mà còn hoạt động hiệu quả, đảm bảo việc tiết kiệm pin, phản hồi nhanh, hiệu quả và hoạt động tốt.

Đầu tiên, ngay từ lúc tìm kiếm và tải ứng dụng về để sử dụng, kích thước tập tin tải về bao giờ cũng được người dùng quan tâm trước tiên. Người dùng thường tránh tải xuống các ứng dụng có vẻ quá lớn, đặc biệt là ở các thị trường mới nổi, nơi thiết bị kết nối với mạng 2G và 3G thường xuyên hoặc hoạt động trên các gói trả tiền theo dung lượng. Các phần bên dưới đây sẽ mô tả cách giảm kích thước ứng dụng của bạn, điều này kích thích nhiều người dùng tải xuống ứng dụng của bạn hơn.

## 1. Tải ứng dụng của bạn lên bằng Android App Bundles

Cách dễ nhất để giảm kích thước ứng dụng khi upload lên Google Play là upload ứng dụng lên dưới dạng **Android App Bundle**, đây là một định dạng tải lên mới bao gồm tất cả các file code và resource đã biên dịch của ứng dụng, nhưng đã làm mất khả năng tạo file APK và đăng nhập vào Google Play .

Sau đó, mô hình phân phối ứng dụng mới của Google Play sẽ sử dụng file bundle đó của bạn để tạo và phân phát các APK được tối ưu hóa cho cấu hình thiết bị của mỗi người dùng, vì vậy họ chỉ tải xuống code và resource (ví dụ như file drawable) mà họ cần để chạy ứng dụng của bạn. Bạn không còn phải tạo, ký và quản lý nhiều APK để hỗ trợ các thiết bị khác nhau và người dùng nhận được các bản tải xuống nhỏ hơn, được tối ưu hóa hơn.

## 2. Sử dụng Android Size Analyzer

Android Size Analyzer là công cụ cho phép dễ dàng để xác định và triển khai nhiều chiến lược để giảm kích thước ứng dụng của bạn. Nó có sẵn dưới dạng một plugin trong Android Studio cũng như một file jar độc lập.

### 2.1 Sử dụng analyzer trong Android Studio

Bạn có thể tải xuống plugin** Android Size Analyzer** như sau:
1.  File > Settings
2.  Click Plugins
3.  Click Marketplace tab
4.  Search với tên "Android Size Analyzer"
5.  Cài đặt plugin Android Size Analyzer đã được tìm thấy

![](https://images.viblo.asia/08183837-2ce6-44b0-8790-fbcdd062f110.png)

Sau khi cài đặt xong, chạy plugin bằng cách chọn **Analyze > Analyze App Size** từ thanh menu. Sau khi phân tích project của bạn, một cửa sổ công cụ xuất hiện với các đề xuất về cách giảm kích thước ứng dụng của bạn, như thể hiện trong hình bên dưới.

![](https://images.viblo.asia/2829b3a1-4a16-490a-b780-d2c6aefbbb6d.png)

### 2.2 Sử dụng analyzer từ command line

Bạn có thể tải xuống phiên bản mới nhất của **Android Size Analyzer**, dưới dạng tệp TAR hoặc ZIP, từ [GitHub](https://github.com/android/size-analyzer/releases/tag/v0.3.1). Sau khi giải nén, hãy chạy **size-analyzer** (trên Linux hoặc MacOS) hoặc **size-analyzer.bat** (trên Windows) trên project hoặc file Android App Bundle của bạn bằng một trong các lệnh sau:
```
./size-analyzer check-bundle <path-to-aab>
./size-analyzer check-project <path-to-project-directory>
```

## 3. Hiểu cấu trúc file APK

Trước khi tìm hiểu về cách giảm kích thước ứng dụng, bạn nên hiểu cấu trúc file APK của ứng dụng. Tệp APK bao gồm một file ZIP chứa tất cả các file trong ứng dụng của bạn. Các tệp này bao gồm file Java, file resource và các file chứa resource đã biên dịch.

Một APK chứa các thư mục sau:
* **META-INF/**: Chứa các file chữ ký **CERT.SF** và **CERT.RSA**, cũng như file **MANIFEST.MF**
* **asset/**: Chứa tài nguyên của ứng dụng mà ứng dụng có thể truy xuất bằng đối tượng **AssetManager**
* **res/**: Chứa các file resource không được biên dịch thành **resources.arsc**
* **lib/**: Chứa mã đã biên dịch cụ thể cho tầng software của bộ xử lý. Thư mục này chứa một thư mục con cho từng loại nền tảng, như **armeabi**, **armeabi-v7a**, **arm64-v8a**, **x86**, **x86_64** và **mips**

File APK cũng chứa các tệp sau, trong số đó, chỉ **AndroidManifest.xml** là bắt buộc.
* **resources.arsc**: Chứa resource đã biên dịch. Tệp này chứa nội dung XML từ tất cả các cấu hình của folder **res/values/**. Nội dung này bao gồm strings và styles, cũng như các đường dẫn đến nội dung không được bao gồm trực tiếp trong tệp resources.arsc, chẳng hạn như file layout và ảnh.
* **class.dex**: Chứa các class được biên dịch ở định dạng tệp DEX mà máy ảo Dalvik/ART hiểu được.
* **AndroidManifest.xml**

## 4. Giảm số lượng và kích thước của các file resource

Kích thước file APK của bạn có ảnh hưởng đến tốc độ tải của ứng dụng, dung lượng bộ nhớ sử dụng và lượng pin tiêu thụ. Một trong những cách đơn giản để làm cho file APK của bạn nhỏ hơn là giảm số lượng và kích thước các file resource mà nó chứa. Đặc biệt, bạn có thể xóa các file resource mà ứng dụng không  sử dụng và có thể sử dụng các đối tượng **Drawable** có thể mở rộng thay cho các file image (png, jpg...). Phần này thảo luận về các phương pháp này cũng như một số cách khác mà bạn có thể giảm resource trong ứng dụng của mình để giảm kích thước tổng thể của fileAPK.

### 4.1 Xóa các file resource không sử dụng

Công cụ lint, một trình phân tích mã tĩnh có sẵn trong Android Studio, phát hiện các file resource trong thư mục **res/** của bạn mà mã của bạn không tham chiếu. Khi công cụ lint phát hiện ra một file resource có khả năng không sử dụng trong dự án của bạn, nó sẽ in một thông báo như ví dụ sau.
```
res/layout/preferences.xml: Warning: The resource R.layout.preferences appears
    to be unused [UnusedResources]
```

Các thư viện mà bạn thêm vào code của mình có thể bao gồm các resource không sử dụng. Gradle có thể tự động xóacác file resources thay cho bạn nếu bạn enable **shrinkResources** trong tệp build.gradle của ứng dụng.
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

Khi enable shrinkResources, trong quá trình build, đầu tiên R8 sẽ xóa các file code không sử dụng. Sau đó, plugin Android Gradle sẽ xóa các file resource không sử dụng.
Để biết thêm thông tin, hãy xem [Shrink, obfuscate, and optimize your app](https://developer.android.com/studio/build/shrink-code).

### 4.2 Giảm thiểu việc sử dụng resource từ các thư viện

Khi phát triển ứng dụng Android, bạn thường sử dụng các thư viện bên ngoài để cải thiện khả năng sử dụng và tính linh hoạt của ứng dụng. Ví dụ: bạn có thể tham khảo** Android Support Library** để cải thiện trải nghiệm người dùng trên các thiết bị cũ hơn hoặc bạn có thể sử dụng **Google Play Services** để truy xuất bản dịch tự động cho văn bản trong ứng dụng của mình.

Nếu một thư viện được thiết kế cho máy chủ hoặc máy tính để bàn, thì nó có thể bao gồm nhiều đối tượng và phương thức mà ứng dụng của bạn không cần. Để chỉ bao gồm các phần của thư viện mà ứng dụng của bạn cần, bạn có thể chỉnh sửa tệp của thư viện nếu giấy phép cho phép bạn sửa đổi thư viện. Bạn cũng có thể sử dụng thư viện thân thiện với thiết bị di động thay thế để thêm chức năng cụ thể vào ứng dụng của mình.

### 4.3 Chỉ support một số densities cụ thể

Android hỗ trợ số lượng thiết bị rất lớn, bao gồm nhiều loại mật độ màn hình. Trong Android 4.4 (API cấp 19) trở lên, framework hỗ trợ các loại density khác nhau: ldpi, mdpi, tvdpi, hdpi, xhdpi, xxhdpi và xxxhdpi. Mặc dù Android hỗ trợ tất cả các density này, nhưng bạn không cần phải export riêng lẻ theo từng loại density.

Nếu bạn biết rằng chỉ một tỷ lệ nhỏ người dùng của bạn có thiết bị với density cụ thể, hãy cân nhắc xem bạn có cần phải gộp các density đó vào ứng dụng của mình hay không. Nếu bạn không bao gồm các resource cho một màn hình  có density cụ thể, Android sẽ tự động chia tỷ lệ các resource hiện có được thiết kế ban đầu cho các màn hình với density khác nhau.
Nếu ứng dụng của bạn chỉ cần hình ảnh được chia tỷ lệ, bạn có thể tiết kiệm nhiều dung lượng hơn nữa bằng cách có một biến thể duy nhất của hình ảnh trong **drawable-nodpi/**. 

Để biết thêm thông tin về mật độ màn hình, hãy xem [Screen Sizes and Densities](https://developer.android.com/about/dashboards#Screens).

### 4.4 Sử dụng drawable objects

Một số hình ảnh không yêu cầu là ảnh tĩnh; thay vào đó, framework có thể tự động vẽ hình ảnh trong lúc runtim,e. Các đối tượng **drawable** (**<shape>** trong XML) có thể chiếm một lượng nhỏ dung lượng trong file APK của bạn. Ngoài ra, các đối tượng drawable tạo ra hình ảnh đơn sắc và vẫn tuân theo các nguyên tắc thiết kế material design.
    
### 4.5 Tái dử dụng resources
    
Bạn có thể bao gồm từng resource riêng cho các biến thể của hình ảnh, chẳng hạn như các phiên bảnvới color, shadow, rotate của cùng một hình ảnh. Tuy nhiên, chúng tôi khuyên bạn nên sử dụng lại cùng một bộ tài nguyên, tùy chỉnh chúng khi cần thiết trong quá trình runtime.
    
### 4.6 Render từ code
    
Bạn cũng có thể giảm kích thước APK của mình bằng cách hiển thị hình ảnh của bạn bằng cách tải về từ một nguồn nào đó trong quá trình runtime. Việc này đảm bảo được răng file APK không chứa các hình ảnh thừa thãi khi app không còn chạy nữa.
    
### 4.7 Nén file PNG
    
Công cụ **aapt** có thể tối ưu hóa resource loại hình ảnh được đặt trong **res/ drawable/** bằng cách nén mà không mất dữ liệu trong quá trình build. Ví dụ: công cụ aapt có thể chuyển đổi PNG có màu thực không yêu cầu nhiều hơn 256 màu thành PNG 8 bit với bảng màu. Làm như vậy dẫn đến hình ảnh có chất lượng tương đương nhưng bộ nhớ nhỏ hơn.

Hãy nhớ rằng aapt có những hạn chế sau:
* Công cụ aapt không thu nhỏ các tệp PNG có trong folder **asset/**.
* Các file hình ảnh cần sử dụng 256 màu trở xuống để công cụ aapt tối ưu hóa chúng.
* Công cụ aapt có thể làm tăng kích thước các tệp PNG đã được nén. Để ngăn chặn điều này, bạn có thể sử dụng flag **cruncherEnabled** trong Gradle để vô hiệu hóa quá trình này cho các tệp PNG:
```
aaptOptions {
    cruncherEnabled = false
}
```
    
### 4.8 Nén file PNG và JPEG
    
Bạn có thể giảm kích thước tệp PNG mà không làm giảm chất lượng hình ảnh bằng các công cụ như **pngcrush**, **pngquant** hoặc **zopflipng**. Tất cả các công cụ này có thể giảm kích thước tệp PNG trong khi vẫn giữ được chất lượng hình ảnh dễ nhận biết.

Công cụ **pngcrush** đặc biệt hiệu quả: Công cụ này lặp lại các bộ lọc PNG và các thông số zlib (Deflate), sử dụng từng tổ hợp bộ lọc và thông số để nén hình ảnh. Sau đó, nó chọn cấu hình mang lại đầu ra nén nhỏ nhất.

Để nén các tệp JPEG, bạn có thể sử dụng các công cụ như **packJPG** và **guetzli**.
    
### 4.9 Sử dụng định dạng WebP
    
Thay vì sử dụng tệp PNG hoặc JPEG, bạn cũng có thể sử dụng định dạng tệp WebP cho hình ảnh của mình khi nhắm mục tiêu Android 3.2 (API cấp 13) trở lên. Định dạng WebP cung cấp khả năng nén mất dữ liệu (như JPEG) cũng như trong suốt (như PNG) nhưng có thể cung cấp khả năng nén tốt hơn JPEG hoặc PNG.

Bạn có thể chuyển đổi hình ảnh BMP, JPG, PNG hoặc GIF tĩnh hiện có sang định dạng WebP bằng Android Studio. Để biết thêm thông tin, hãy xem [Create WebP Images Using Android Studio](https://developer.android.com/studio/write/convert-webp).
    
### 4.10 Sử dụng ảnh vector
    
Bạn có thể sử dụng ảnh **vector** để tạo các biểu tượng độc lập với độ phân giải và các phương tiện có thể scale khác. Sử dụng ảnh **vector** có thể làm giảm đáng kể kích thước file APK của bạn. Hình ảnh vector được biểu diễn trong Android dưới dạng các đối tượng **VectorDrawable**. Với đối tượng **VectorDrawable**, tệp 100 byte có thể tạo ra hình ảnh sắc nét có kích thước bằng kích thước của màn hình.

Tuy nhiên, phải mất một khoảng thời gian đáng kể để hệ thống hiển thị từng đối tượng **VectorDrawable** và các hình ảnh lớn hơn thậm chí còn mất nhiều thời gian hơn để xuất hiện trên màn hình. Do đó, **hãy xem xét chỉ sử dụng ảnh vector này khi hiển thị các hình ảnh nhỏ**.

Không sử dụng **AnimationDrawable** để tạo hoạt ảnh từng khung hình vì làm như vậy yêu cầu bạn phải bao gồm tệp bitmap riêng biệt cho từng khung của hoạt ảnh, điều này làm tăng đáng kể kích thước APK của bạn.

Thay vào đó, bạn nên sử dụng **AnimatedVectorDrawableCompat** để tạo các vector có thể hiển thị các animation.
    
## 5 Giảm native code và Java code
    
Có một số phương pháp bạn có thể sử dụng để giảm kích thước của file Java và file native trong ứng dụng của mình.
    
### 5.1 Xóa các generated code không sử dụng
    
Đảm bảo hiểu rõ bất kỳ mã nào được generated. Ví dụ: nhiều công cụ cho bộ đệm giao thức tạo ra quá nhiều function và class, có thể tăng gấp đôi hoặc gấp ba kích thước ứng dụng của bạn.
    
### 5.2 Hạn chế sử dụng các đối tượng enum
    
Một enum duy nhất có thể thêm khoảng 1,0 đến 1,4 KB kích thước vào tệp **class.dex** của ứng dụng của bạn. Những bổ sung này có thể nhanh chóng tích lũy cho các hệ thống phức tạp hoặc các thư viện dùng chung. Nếu có thể, hãy xem xét sử dụng anotation **@IntDef** và **code shrinking** để tách các giá trị enum ra và chuyển đổi chúng thành số nguyên. Việc chuyển đổi kiểu này vẫn bảo toàn tất cả các lợi ích an toàn của enums.
    
### 5.3 Giảm kích thước của các file native nhị phân
    
Nếu ứng dụng của bạn sử dụng native code và Android NDK, bạn cũng có thể giảm kích thước phiên bản phát hành của ứng dụng bằng cách tối ưu hóa code của mình. Hai kỹ thuật hữu ích là loại bỏ các ký hiệu gỡ lỗi và không trích xuất các thư viện gốc.
1. xóa các ký hiện debug
Sử dụng công cụ **arm-eabi-strip**, được cung cấp trong Android NDK, để xóa các ký hiệu gỡ lỗi không cần thiết khỏi các thư viện native. Sau đó, bạn có thể build lại bản release của mình.
2. Tránh trích xuất các thư viện gốc
Khi build các bản release cho ứng dụng của bạn, hãy đóng gói các tệp **.so** không nén trong APK bằng cách đặt **android: extractNativeLibs = "false"** trong phần tử **<application>** của file **AndroidManifest.xml**. Việc tắt cờ này ngăn **PackageManager** sao chép các tệp **.so** từ APK sang hệ thống tệp trong khi cài đặt và có thêm lợi ích là làm cho các bản cập nhật của ứng dụng của bạn nhỏ hơn. Khi xây dựng ứng dụng của bạn bằng plugin Android Gradle 3.6.0 trở lên, plugin đặt thuộc tính này thành "false" theo mặc định.
    
## 6. Duy trì nhiều bản build tinh gọn
    
File APK của bạn có thể chứa nội dung mà người dùng tải xuống nhưng không bao giờ sử dụng, chẳng hạn như ngôn ngữ bổ sung hoặc resources cho các màn hình có mật độ khác device đang có của người dùng. Để đảm bảo người dùng tải xuống ít nhất, bạn nên tải ứng dụng của mình lên Google Play bằng Android App Bundles. Việc tải lên các file bundle để Google Play tạo và phân phát các APK được tối ưu hóa cho cấu hình thiết bị của mỗi người dùng, vì vậy họ chỉ tải xuống code và resource mà họ cần để chạy ứng dụng của bạn. Bạn không còn phải tạo, ký và quản lý nhiều APK để hỗ trợ các thiết bị khác nhau và người dùng nhận được các bản tải xuống nhỏ hơn, được tối ưu hóa hơn.

Nếu không public ứng dụng của mình lên Google Play, bạn có thể chia nhỏ ứng dụng của mình thành nhiều APK, được phân biệt bởi các yếu tố như kích thước màn hình hoặc hỗ trợ kết cấu GPU.

Khi người dùng tải xuống ứng dụng của bạn, thiết bị của họ sẽ nhận đúng APK dựa trên các tính năng và cài đặt của thiết bị. Bằng cách này, thiết bị không nhận được nội dung cho các tính năng mà thiết bị không có. Ví dụ: nếu người dùng có thiết bị hdpi, họ không cần tài nguyên xxxhdpi mà bạn có thể đưa vào cho các thiết bị có màn hình mật độ cao hơn.