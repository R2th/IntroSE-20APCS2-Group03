![](https://images.viblo.asia/e414eda1-c746-4c98-9c6c-d014e69fef5e.png)

Xin chào mọi người. Trong bài viết này mình sẽ bàn luận về vấn đề "nhức nhối" đối với hầu hết anh em Android Developer : "**Chời đợi Android Studio build Gradle**". Với những device khủng, cấu hình mạnh thì vấn đề này có vẻ sẽ được giải quyết đơn giản. Nhưng với các thiết bị cấu hình yếu hơn thì có các  cách khắc phục nào để giảm bớt thời gian chờ đợi vô vị khi Gradle build. Mình sẽ đưa ra một số cách sau để có thể giải quyết phần nào vấn đề này.

## 1. Luôn sử dụng phiên bản mới nhất của Gradle Plugin
Google luôn quan tâm đến hiệu suất khi phát triển ứng dụng trên nền tảng Android. VÌ vậy Android Studio luôn được quan tâm, từng bước cải thiện hiệu suất gradle qua các phiên bản. Một cập nhật mới trên Android Studio , hiện tại nó sử dụng trình biên dịch DEX mới có tên là D8. So với trình biên dịch trước đó là DX, D8 sẽ biên dịch nhanh hơn và xuất ra các file DEX nhỏ hơn. Ở phiên bản Gradle 3.1.2 mới , hiệu suất đo được cải thiện lên tới 25%. 

## 2. Loại bỏ multiple apk trong quá trình phát triển
Chúng ta có thể tạo ra nhiều bản apk ứng dụng tương ứng với các cấu hình thiết bị cụ thể. Nó sẽ giảm kích thước ứng dụng khi phát hành sản phẩm. Tuy nhiên trong quá trình phát triển thì điều đó là không cần thiết. Vô hiệu hóa nó, chúng ta lại có thể giảm bớt thời gian xây dựng ứng dụng tới 10%. 


## 3. Vô hiệu hóa PNG Crunching 
Android tool thực hiện tối ưu hóa kích thước PNG theo mặc định. Điều này tốt khi phát hành sản phẩm, nhưng trong quá trình phát triển thì sẽ làm tăng thời gian build app. 

Để thực hiện vô hiệu hóa, trong build.gradle chúng ta thực hiện như sau :

```
android {
    buildTypes {
        release {
            // Disables PNG crunching for the release build type.
            crunchPngs false
        }
    }

// If you're using an older version of the plugin, use the
// following:
//  aaptOptions {
//      cruncherEnabled false
//  }
}
```

## 4. Không sử dụng dependences với version động
KHi khai báo và sử dụng các dependences trong build.gradle , chúng ta nên khai báo rõ ràng phiên bản của dependences đó.  
Ví dụ :
`compile 'com.squareup.retrofit2:retrofit:2.3.0'`

Và không nên dùng '+' để định nghĩa version như sau : 

`compile 'com.squareup.retrofit2:retrofit:2.+'`

## 5. Kích hoạt gradle caching 
Caching gradle sẽ thực thi lưu trữ kết quả đầu ra của các task từ các bản build trước. Khi kích hoạt chế độ này, sẽ tránh được phải build lại những dữ liệu cũ.

Để kích hoạt, trong file gradle.properties sẽ thực hiện lệnh sau :

`org.gradle.caching= true`

## 6. Kích hoạt chế độ offline
Nếu kết nối internet kém, khi build gradle sẽ cố gắng kết nối resource cho dependences từ trên mạng. Điều này làm chậm đáng kể quá trình build ứng dụng. Chúng ta có thể setting để Gradle chỉ sử dụng các tài nguyên đã được build và lưu lại trước đó thay vì hoàn toàn tải mới hoàn toàn.

Thực hiện các bước sau : 
1. Mở cửa sổ  **Preferences** bằng cách chọn **File -> Settings  ** 
2. Click chọn **Build, Execution, Deployment > Gradle**.
3. Check vào ô  **Offline work** 
4. Click **Apply** hoặc **OK**. 

## 7. Kích hoạt chế độ Instant Run 
Đây là chế độ mới của Android Studio. ![](https://images.viblo.asia/57d66e0f-5c4a-4ae2-8741-1f0135fde973.png)

Nó cho phép chạy ngay ứng dụng của bạn với các thay đổi mới mà không càn phải tạo lại bản Apk khác. Trong 1 số trường hợp thay đổi app cũng có thể không phải start lại.

Trong trường hợp không thấy icon trên, có thể làm theo các bước sau để chắc chán bạn đã bật chế độ Instant Run hay chưa :
1. Mở **Settings** hoặc **Preferences** .
2. Chuyển tới **Build, Execution, Deployment > Instant Run.**
3. Chắc chắn rằng  **Enable Instant Run **đã được tích chọn.

## 8. Tránh biên dịch những tài nguyên không cần thiết 
Tránh việc biên dịch những tài nguyên không cần thiết khi bạn thử nghiệm ứng dụng, ví dụ như ngôn ngữ hay mật độ điểm ảnh màn hình. Chúng ta có thể chỉ định chỉ một ngôn ngữ cũng như mật độ điểm ảnh màn hình theo cách sau: 

```
android {
  ...
  productFlavors {
    dev {
      ...
      // The following configuration limits the "dev" flavor to using
      // English stringresources and xxhdpi screen-density resources.
      resConfigs "en", "xxhdpi"
    }
    ...
  }
}
```

## 9. Kích hoạt cấu hình theo yêu cầu 
Để khiến Gradle biết chính xác nó cần build những gì cho ứng dụng của bạn, hệ thống sẽ thực hiện cấu hình tất cả các module trong project cũng như các dependences ( trừ khi bạn đang thực hiện test cho một module cụ thể nào đó ) . Điều này sẽ làm chậm quá trình build với những project có số lượng module lớn. 

Để Gradle biết chính xác module nào nên được build theo ý của bạn, cần thực hiện các bước như sau để chỉ định bật chế độ  **configuration on demand** : 
1. Mở cửa sổ **Preferences** bằng cách chọn **File > Settings**.
2. Tiếp theo chọn  **Build, Execution, Deployment > Compiler**.
3. Click chọn ô **Configure on demand**.
4. Lưu thay đổi với **Apply** hoặc **OK**.

## 10. Tạo một build variant cho quá trình phát triển 
Có nhiều cấu hình cần thiết khi sản phẩm được phát hành nhưng nó lại không cần thiết khi chúng ta đang trong quá trình phát triển nó. Việc cho phép build những cấu hình này sẽ giảm tốc độ của nó. Vì vậy, tạo ra một build variant riêng biệt cho phép chỉ chứa cấu hình dùng khi phát triển ứng dụng sẽ tránh khỏi việc build những tài nguyên không cần thiết. 

Để thực hiện điều này, chúng ta thêm phần cấu hình như sau cho phiên bản phát hành hiện tại :
```
android {
  ...
  defaultConfig {...}
  buildTypes {...}
  productFlavors {
    // When building a variant that uses this flavor, the following configurations
    // override those in the defaultConfig block.
    dev {
      // To avoid using legacy multidex when building from the command line,
      // set minSdkVersion to 21 or higher. When using Android Studio 2.3 or higher,
      // the build automatically avoids legacy multidex when deploying to a device running
      // API level 21 or higher—regardless of what you set as your minSdkVersion.
      minSdkVersion 21
      versionNameSuffix "-dev"
      applicationIdSuffix '.dev'
    }

    prod {
      // If you've configured the defaultConfig block for the release version of
      // your app, you can leave this block empty and Gradle uses configurations in
      // the defaultConfig block instead. You still need to create this flavor.
      // Otherwise, all variants use the "dev" flavor configurations.
    }
  }
}
```

Như các bạn thấy ở trên, chúng ta đang tạo một config mới cho productFlavors. Đoạn config mới này sẽ được hệ thống override lên khối defaultConfig mặc định. 

## 11. Vô hiệu hóa Crashlytics
Crashlytics là công cụ cung cấp thông tin chuyên sâu về những hành động, sự kiện chi tiết đến từng dòng code để mô tả những gì mà ứng dụng của bạn đang gặp phải. Tuy nhiên, nếu chưa thực sự cần thiết phải sử dụng đến nó ngay,  thì có thể vô hiệu hóa để tăng tốc quá trình build ứng dụng. 

```
android {
  ...
  buildTypes {
    debug {
      ext.enableCrashlytics = false
    }
}
```

Trong trường hợp mà vẫn muốn sử dụng, thì vẫn có thể tăng tốc nó bằng cách ngăn chặn Crashlytics cập nhật tài nguyên của ứng dụng trong mỗi lần build. Trong file build.gradle thực hiện cấu hình như sau: 

```
android {
  ...
  buildTypes {
    debug {
      ext.alwaysUpdateBuildId = false
    }
}
```

## 12. Chuyển đổi ảnh tới WebP
WebP là một định dạng ảnh có khả năng nén dữ liệu tương tự JPEG hay khả năng làm trong suốt ảnh như PNG. Tuy nhiên nó làm tốt hơn 2 định dạng này. Bằng việc chuyển đổi sang định dạng WebP sẽ làm cho kích thước tài nguyên của ứng dụng sẽ nhỏ đi, đặc biệt nó sẽ đáng kể nếu lượng ảnh sử dụng lớn. Tuy nhiên có một vấn đề cần cân nhắc, do cần chuyển đổi nên CPU của thiết bị sẽ phải hoạt động nhiều hơn trước.

Chi tiết cách chuyển đổi các bạn có thể tham khảo tại đường dẫn sau : 
https://developer.android.com/studio/write/convert-webp#convert_images_to_webp

Trên đây là một số cách để giảm thời gian build gradle cũng như là thời gian để phát triển ứng dụng Android. Cảm ơn các bạn đã đọc bài viết của mình !