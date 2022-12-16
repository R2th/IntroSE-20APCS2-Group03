# Giới thiệu
Trước đây để người dùng đánh giá hoặc review ứng dụng của mình, chúng ta cần phải chuyển sang Google Play Store để người dùng có thể thực hiện việc này. Điều này làm sẽ khiến cho người dùng đôi lúc  cảm thấy bất tiện khi phải rời khỏi ứng dụng tạm thời để thực hiện và thường từ chối việc thực hiện đánh giá ứng dụng. 

Để loại bỏ việc bất tiện này, Google đã cung cấp các API cho phép thực hiện review ứng dụng ngay bên trong app của mình. Bài viết này xin giới thiệu đến các bạn các bước cần thực hiện để có thể cài đặt tính năng này cho ứng dụng.

# Cài đặt
## Thiết bị và các chú ý về thời điểm cần hiển thị
Tính năng in-app review chỉ có thể được thực hiện trên: 
* Các thiết bị chạy từ Android 5.0 (API 21) trở lên và được cài đặt sẵn Google Play Store.
* Các thiết bị Chrome OS được cài đặt sẵn Google Play Store.





Về thời điểm hiển thị, chúng ta nên tuân thủ theo các khuyến nghị từ Google
https://developer.android.com/guide/playcore/in-app-review#when-to-request
* Chỉ hiện thị tính năng in-app review khi người dùng đã sử dụng app được một khoảng thời gian đủ để có thể cảm nhận và đưa ra những phản hồi đúng cho ứng dụng
* Không nhắc người dùng về việc đánh giá ứng dụng một cách liên tục
* Không đưa ra những câu hỏi mang tính gợi ý, dự đoán như "Bạn có thích ứng dụng này?", "Bạn có muốn đánh giá 5 sao cho ứng dụng?"

## Thiết lập thư viện trong build.gradle
Để có thể sử dụng được tính năng in-app review ta cần cài đặt thư viện [Play Core](https://developer.android.com/guide/playcore) với phiên bản từ 1.8.0 trở lên.
 
```kotlin
// In your app’s build.gradle file:
...
dependencies {
    // This dependency is downloaded from the Google’s Maven repository.
    // So, make sure you also include that repository in your project's build.gradle file.
    implementation 'com.google.android.play:core:1.8.0'

    // For Kotlin users also import the Kotlin extensions library for Play Core:
    implementation 'com.google.android.play:core-ktx:1.8.1'
    ...
}
```

## Tích hợp vào trong mã nguồn của dự án
### Tạo đối tượng ReviewManager
Ta cần tạo một thể hiện của **ReviewManager**, **ReviewManager** là một interface để thực hiện một quá trình review. Để tạo đối tượng này ta sử dụng **ReviewManagerFactory**
```kotlin
val manager = ReviewManagerFactory.create(context)
```
### Request đối tượng ReviewInfo
Ta sẽ dùng đối tượng **ReviewManger** từ bước trên để tiến hành request một đối tượng **ReviewInfo**

```kotlin
val request = manager.requestReviewFlow()
request.addOnCompleteListener { request ->
    if (request.isSuccessful) {
        // Request thành công, sẵn sàng hiển thị in-app review dialog
        val reviewInfo = request.result
    } else {
        // Có vấn đề xảy ra hoặc đã đến giới hạn về hiển thị, tiếp tục app như bình thường
    }
}
```
### Hiển thị giao diện in-app review
Khi đã có được đối tượng **ReviewInfo** ta tiến hành hiển thị dialog review để người dùng bắt đầu đánh giá
```kotlin
val flow = manager.launchReviewFlow(activity, reviewInfo)
flow.addOnCompleteListener { _ ->
    // Khi kết thúc đánh giá, ta sẽ nhận được callback ở đây
    // Tiến hành các tính năng tiếp theo sau cho ứng dụng
    // Lưu ý API không chỉ định user có review hay không, dialog review có show hay không chỉ chị định    là kết thúc quá trình review
}
```
# Testing
Tính năng in-app reivew đòi hỏi ứng dụng của chúng ta cần phải được publish lên Play Store. Tuy nhiên, chúng ta có thể kiểm tra việc tích hợp này mà không cần phải publish ứng dụng ra bên ngoài bằng cách sử dụng tính năng internal test track hoặc internal app sharing. 
### Test sử dụng internal test track
Chúng ta cần upload ứng dụng đến internal test track và cài đặt nó thông qua thiết bị với tài khoản cho phép truy cập đến ứng dụng từ internal test track đó. Việc thiết lập này có thể truy cập từ menu App Releases-> Internal test track
![](https://images.viblo.asia/eb8d233c-5350-40af-87f9-351fb4dc2637.png)
Quá trình thiết lập cho việc upload ứng dụng thì làm giống như các bước chúng ta cần chuẩn bị để release 1 ứng dụng thực sự. Lưu ý có thể mất vài ngày để Google review ứng dụng của chúng ta.

Sau khi app được release dưới dạng internal test track ta có thể thực hiện test việc hiển thị dialog review từ bên trong ứng dụng của chúng ta
![](https://images.viblo.asia/2afecde7-668d-4375-80bf-cd1ad846b2ea.jpg)
![](https://images.viblo.asia/d7e7bce2-3ab4-4ec3-b309-827e887d46bd.jpg)
![](https://images.viblo.asia/57afafc3-aa2a-45c0-ba07-b2c6d45acbe0.jpg)
### Test sử dụng internal app sharing
Một phương pháp khác là chúng ta có thể sử dụng tính năng internal app sharing cho việc test. Phương pháp này giúp ta có thể test nhanh các thay đổi trong ứng dụng và chia sẻ nhanh đến các bên đảm nhận việc kiểm thử. Nhưng điều kiện cần là app phải được publish ở internal test track, release alpha hoặc beta.
![](https://images.viblo.asia/570e51aa-f0af-453a-8820-40caab5d5acc.png)

Bài viết đến đây là kết thúc, cảm ơn mọi người đã đọc :grinning:

# Tham khảo
https://developer.android.com/guide/playcore/in-app-review