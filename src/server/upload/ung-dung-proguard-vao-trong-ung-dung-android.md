## Proguard là gì ?

![](https://images.viblo.asia/3fb2371e-995d-490c-ac3a-6c47729a952b.png)

Proguard là công vụ để làm những chức năng sau cho ứng dụng android của bạn:

* Giảm bớt code

* Làm xáo trộn Code

* Tối ưu code



Proguard tạo các tác động sau :

* Giảm dụng lượng của ứng dụng
 
* Loại bỏ những lớp và phương thức dư thừa để góp phần vào giới hạn đếm phương thức 64k của ứng dụng Android

* Làm cho ứng dụng khó đảo ngược bởi làm xáo trộn code

### Rút gọn code

Thêm `minifyEnabled true` tới build type trong file build.gradle 

Khi rút gọn code sẽ làm giảm thời gian build, vì thế bạn nên tránh sử dụng nó khi bạn build debug nếu có thể. Tuy nhiên nó quan trọng với bản APK cuối cùng để testing bởi vì bạn có thể gặp một số lỗi bạn không biết. Bạn xem có thể đọc thêm tại đây :https://developer.android.com/studio/build/shrink-code#keep-code


Mẩu ví dụ dưới đây từ file build.gradle bất rút gọn code cho bản release:


```
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
                    'proguard-rules.pro'
        }
    }
    ...
}
```

Bây giờ chúng ta nhìn vào điểm quan trọng cần được cân nhắc khi áp dụng Proguard vào trong ứng dụng của bạn.

* Đừng quên thêm quy tắc của Proguard trong proguard-rules.pro file cho bất kì thư viện nào mà đưa vào dự án của bạn.


Chúng ta cùng nhìn vào ví dụ dưới đâu:

Tôi sử dụng Okio Library, bạn sẽ phải thêm những dòng code sau :

`-dontwarn okio.**`

Thêm quy tắc cho các lớp mà bạn không muốn  sử dụng Proguard để giữ lớp đó.

Bạn không muốn làm xáo trộn class AmitShekhar.java. bạn thêm những dòng sau :

`-keep class com.mindorks.AmitShekhar**`


## Rút gọn Resource
Rút gọn Resource chỉ làm việc khi kết hợp với rút gọn code. Sau khi loại bỏ những code không được sử dụng, rút gọn Resource sẽ xác định Resource nào ứng dụng vẫn còn đang sử dụng.
Để bật rút gọn Resource, thiết lập `shrinkResources true` trong file buid.gradle:

```
android {
    ...
    buildTypes {
        release {
            shrinkResources true
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'),
                    'proguard-rules.pro'
        }
    }
}
```

### Tùy chỉnh Resource cần giữ.
Nếu có Resource mà bạn cần giữ hoặc loại bỏ. Tạo XML file với thẻ <resources> mỗi resource được giữ trong thuộc tính tools:keep mỗi resource loại bỏ bỏ vào thẻ  tools:discard.
    Ví dụ :
```
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools"
    tools:keep="@layout/l_used*_c,@layout/l_used_a,@layout/l_used_b*"
    tools:discard="@layout/unused2" />
```
Lưu file này vào  trong resource của bạn, Ví dụ : res/raw/keep, Bản build sẽ không đóng gói file này vào APK của bạn.
    
Cảm ơn các bạn đã đọc bài của mình. Hy vọng nó có thể giúp ích được cho bạn. Nếu mình có thiếu xót nào hy vọng bạn có thể comment bên dưới ạ. 


Tài liệu tham khảo: 

https://blog.mindorks.com/applying-proguard-in-an-android-application

https://developer.android.com/studio/build/shrink-code