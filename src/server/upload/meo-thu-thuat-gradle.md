## Project and Customized Global Variables

Sau khi Sync project , class BuildConfig được tạo tự động và bạn có thể thêm các trường bổ sung vào nó. Điều này có thể hữu ích cho nhiều công dụng như cấu hình URL máy chủ và dễ dàng bật và tắt các tính năng.

```
defaultConfig {
   buildConfigField "String", "BASE_URL", "\" https: //www.yourserver.com/ \ ""
}
```

Bạn có thể thêm string resources:

```
defaultConfig {
   resValue "string", "google_map_key", "AIzaSyCPnMMqVqnvHpEKKLDKJDJKSMCJ"
}
```

Bạn cũng có thể thêm cùng tên với giá trị khác nhau cho mỗi build type

```
buildTypes {
   debug {
      buildConfigField "String", "BASE_URL" "\"https://www.test.yourserver.com/\""
      buildConfigField "boolean", "REPORT_CRASHES" "true"
   }
   release {
      buildConfigField "String", "BASE_URL", "\"https://www.live.yourliveserver.com/\""
      buildConfigField "boolean", "REPORT_CRASHES", "false"
   }
}
```

## Tùy chỉnh tên, phiên bản và ID ứng dụng cho mỗi loại biuld type
Điều này cho phép bạn có cả phiên bản gỡ lỗi và phát hành của ứng dụng được cài đặt cùng một lúc

```
android {
   buildTypes {
      debug {
         applicationIdSuffix ".debug"
         versionNameSuffix "-debug"
         resValue "string", "app_name", "CoolApp (debug)"
         signingConfig signingConfigs.debug
      }
      release {
         resValue "string", "app_name", "CoolApp"
         signingConfig signingConfigs.release
      }
   }
}
```

**Private Information**
Có một số thông tin mà bạn không nên thêm vào điều khiển nguồn (url cơ sở, khóa fb, khóa bản đồ, v.v.) và thông tin đăng nhập của bạn được yêu cầu để xuất bản ứng dụng của bạn nhằm ngăn chặn bất kỳ ai có quyền truy cập vào mã thậm chí có thể build dự án. Bạn KHÔNG BAO GIỜ nên cho loại thông tin này vào mã nguồn của bạn. và một trong những cách tốt nhất để thực hiện việc này bằng cách thêm thông tin này vào thuộc tính cục bộ như bên dưới:

```
Properties properties = new Properties ()
properties.load (project.rootProject.file ('local.properties'). newDataInputStream ())
buildConfigField "String", "BASE_URL", properties.getProperty ("BASE_URL")
buildConfigField "String", "API_KEY", properties.getProperty ("API_KEY")
```

Thêm vào các thuộc tính cục bộ của bạn

```
BASE_URL = "https://www.yourserver.com/"
API_KEY = "AKDKDLLAOWEK_KAKJDK"
keyAlias ​​= "YourAllias"
storePassword = "YourStorePassword"
keyPassword = "YourKeyPassword"
```

Đối với các Key của bạn, bạn nên tạo thư mục và thiết lập các tập tin chìa khóa trên nó và thêm thư mục này vào tập tin bỏ qua git của bạn và nếu bạn đang sử dụng jenkins làm quá trình tương tự trong máy CI của bạn

## Tăng tốc các bản dựng Android Gradle của bạn
Cuối cùng google IO đã có một cuộc nói chuyện tuyệt vời về các bước để cải thiện quá trình xây dựng của bạn trong chế độ phát triển ở đây. Tôi sẽ cố gắng tóm tắt các bước này nhiều nhất có thể

**1. Sử dụng plugin gradle Android mới nhất.**

**2. Tránh multidex thừa kế.**

Đa nhiệm cũ == multidex + minSdkVersion <21
Đa nhiệm cũ làm chậm đáng kể.
Để giải quyết vấn đề này (nếu minsdk của bạn <21) là bằng cách thêm productFlavor vào gradle của bạn như dưới đây

```
productFlavors {
   development {
      minSdkVersion 21
   }
}
```

**3. Vô hiệu hóa multi-APK for phát triển**
Khối split {} tạo nhiều APK nhỏ hơn nhắm mục tiêu cấu hình thiết bị cụ thể để phát hành.

```
splits {
   api {
      enable false
   }
   density {
      enable false
   }
}
```

Nhưng khối này là toàn cầu cho tất cả các môi trường build của bạn. Và để làm điều đó đúng cách

```
android {
   if (project.hasProperty ("devBuild") {
      splits.api.splits = false
      splits.density.splits = false
   }
}
```

Vì vậy, nếu bạn sử dụng dòng lệnh để xây dựng dự án của bạn, nó sẽ như thế này

./gradlew assembleDebug -PdevBuild

Và nếu bạn đang sử dụng nút chạy trong Android Studio, bạn nên làm theo các bước sau,

**Preferences -> Build, Execution, Deployment -> Compiler -> Command-line Options**

Đặt giá trị này (-PdevBuild).

**4.Include một tài nguyên tối thiểu.**

Xây dựng dự án bao gồm tất cả các ngôn ngữ và tài sản có mật độ và các thư viện mà ứng dụng của bạn đang sử dụng. Vì vậy, nếu ứng dụng hỗ trợ nhiều ngôn ngữ khác nhau hoặc nhiều màn hình khác nhau, thì bạn thực sự lãng phí rất nhiều thời gian làm việc vì không có lý do, bởi vì trong quá trình phát triển, bạn sẽ chỉ sử dụng một bộ tài nguyên này. Do đó, nên sử dụng cấu hình bên dưới

```
productFlavors {
   development {
      minSdkVersion 21
      resConfigs(“en”, “xxhdpi”)
   }
}
```

**5. Vô hiệu hóa png crunching**

Các công cụ xây dựng Android thực hiện tối ưu hóa kích thước PNG theo mặc định
Quá trình này là một điều tuyệt vời cho việc phát hành APK, nhưng điều đó không quan trọng đối với việc build dev. Để tránh điều này, hãy kiểm tra bên dưới
```
android {
   if (project.hasProperty ("devBuild") {
      splits.api.splits = false
      splits.density.splits = false
      aaptOptions.cruncherEnabled = false // vô hiệu hóa crunching
   }
}
```

**6. Sử dụng instant run.**

**7. Tránh những thay đổi vô ý.**

Bởi vì nó sẽ buộc bản kê khai Android của bạn thay đổi ở mọi bản dựng. Kiểm tra giải pháp bên dưới
```
def buildDateTime = project.hasProperty("devBuild") ? 100: new Date().format("yyMMddHHmm").toInteger()
android {
   …
   defaultConfig {
      versionCode buildDateTime
      …
   }
}
```
**8. Sử dụng crashlytics là rất hữu ích chỉ khi bạn đang sử dụng nó một cách chính xác.**

Crashlytics theo mặc định sẽ luôn tạo một BuildID duy nhất trên mỗi bản dựng nhưng cung cấp một flag để bạn tắt tính năng này. Vì vậy, bạn nên gắn cờ này trong các bản dựng gỡ lỗi của mình
```
android {
   …
   buildTypes {
      ext.alwaysUpdateBuildId = false
      …
   }
}
```

**9. Tránh sử dụng các phiên bản động.**

Gradle cung cấp một cách rất thuận tiện cho bạn để nói với gradle rằng bạn muốn phiên bản mới nhất của thư viện này như
```
compile  ‘com.android.support:appcompat-v7:+’
```

Từ quan điểm hiệu suất sẽ làm cho việc kiểm tra gradle cho phiên bản mới sau mỗi 24 giờ làm cho bạn tăng thời gian giải quyết sự phụ thuộc.
Nó làm cho bản build không xác định phiên bản của bạn ngày hôm nay có thể là một điều hoàn toàn khác nhau bởi vì thư viện đã thay đổi bên dưới của bạn.
Vì vậy, bạn nên tránh làm điều này và chỉ định phiên bản thư viện của bạn.

**10. Xem bộ nhớ của bạn**

Bạn nên quan tâm về số lượng bộ nhớ bạn đang đưa ra để gradle.
Khi bạn tạo một dự án mới Trong Android Studio, nó sẽ cung cấp dung lượng bộ nhớ 1.5GB tốt nhất theo mặc định. Đó có thể là một cài đặt tốt hay xấu cho dự án của bạn vì nó phụ thuộc vào đặc điểm của dự án của bạn. Vì vậy, bạn nên tinh chỉnh cài đặt này để xem điều gì là tối ưu.

**11. Kích hoạt bộ nhớ đệm gradle.**

Đây là cơ chế lưu bộ nhớ cache mới từ cấp độ mà bạn có thể lưu trữ tất cả các kết quả của tác vụ từ mọi tác vụ
Để có thể bắt đầu bộ nhớ đệm, hãy thêm dòng này vào gradle.properties của bạn
```
org.gradle.caching = true
```

Nguồn:
`https://medium.com/@abozaid/gradle-tips-tricks-6271dcb67fd6`