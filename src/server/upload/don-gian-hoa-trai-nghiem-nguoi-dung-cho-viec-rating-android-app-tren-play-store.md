![](https://images.viblo.asia/9ab42026-a29a-41ba-83a7-7333afcd1902.jpeg)

Khi chúng ta có một Adnroid app trên Play Store thì ai cũng muốn là người dùng sẽ để lại lượt đánh giá cho app. Tuy nhiên thì việc để lại đánh giá này thường không được người dùng quan tâm nhiều. Tệ hơn là họ thường quan tâm đến việc đánh giá app khi cảm thấy app đem lại một trải nghiệm tệ.

Thông thường thì người dùng sẽ phải thực hiện các bước sau đây để có thể đánh giá ứng dụng trên Play Store:
* Mở Play Store (đồng nghĩa với việc là bỏ qua bất kỳ điều gì họ đang làm)
* Tìm app của bạn với thanh search
* Tìm app của bạn trong hàng loạt kết quả được hiển thì
* Chọn app và dể lại đánh giá

Bạn có thể thấy là  các bước trên rõ ràng là khá phiền phức đối với người dùng.
### Đơn giản hóa
Có lẽ bạn cũng đã thấy khi mà ở nhiều ứng dụng thì các nhà phát triển cung cấp cho người dùng một nút hoặc một thứ gì đó tương tự để có thể chuyển hướng trực tiếp từ ứng dụng qua trang ứng dụng cụ thể của nó trên Play Store. Diều này giúp người dùng lược bớt được ba bước đầu tiên và nó thực sự sẽ cải thiện trải nghiệm nguời dùng trong việc để lại đánh giá cho ứng dụng

Để cung cấp một tùy chọn như vậy thì cần yêu cầu 2 bước từ nahf tuyển dụng:
* Hiển thị một tùy chọn cho người dùng để xếp hạng ứng dụng (hiển thị nút, hộp thoại hoặc thứ khác)
* Khởi chạy trang Play Store của ứng dụng đó khi nhấp vào tùy chọn được trình bày ở trên

### Hiển thị tùy chọn "Rate-Me"
Có nhiều tùy chọn để hiển thị một tùy chọn cho người dùng để họ có thể đánh giá ứng dụng của bạn. Tôi sẽ sử dụng một nút đơn giản cho mục đích này.
```xml
<Button
    android:id="@+id/button_rateMe"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Rate Me!"
    android:onClick="rateApp" />
```
Bạn có thể chọn những lựa chọn khác như :
* Dialog
* Menu item
* Floating Action Button trong "About app" screen
### Chuyển Hướng đến Play Store
Bây giờ đến phần chúng ta chuyển hướng đến Play Store cho ứng dụng của mình khi người dùng nhấp vào bất cứ thứ gì chúng tôi hiển thị ở trên. Tiếp tục ví dụ trên, tôi có đoạn mã dưới đây bên trong Acitvity chứa tùy chọn "Rate-Me" ở trên:
```kotlin
public fun rateApp(rateMeButton: View): Unit {
    val packageName = this.packageName
    val playStoreAppUri = "market://details?id=$packageName"
    val playStoreSiteUri = "https://play.google.com/store/apps/details?id=$packageName"
    
    try {
        val playStoreAppIntent = Intent(Intent.ACTION_VIEW, Uri.parse(playStoreAppUri))
        startActivity(playStoreAppIntent)
    } catch (e: ActivityNotFoundException) {
        val playStoreBrowserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(playStoreSiteUri))
        startActivity(playStoreBrowserIntent)
    }
}
```
Để tôi giải thích đoạn code ở trên.

Nếu bạn để ý thì URL của một store-listing của một ứng dụng bất kỳ trên Play Store chính sẽ được sử dụng làm định danh duy nhất cho ứng dụng đó trên Store. 

Cấu trúc của URL cho phiên bản web thường sẽ như thế này:
```
https://play.google.com/store/apps/details?id=<package-name-of-your-app>
```
Còn bản Play Store sẽ như thế này:
```
market://details?id=<package-name-of-your-app>
```
Và như thế thì đâu tiên tôi định hướng từ ứng dụng đến ứng dụng Play Store. Nếu như trong một số trường hợp Play Store không khả dụng thì Exception ActivityNotFoundException sẽ được trả về và ta sẽ tiếp tục chuyển hướng đến Play Store phiên bản web trên browser.

Đó là tất cả. Cảm ơn vì đã đọc bài chia sẽ.

ref: https://medium.com/code-better/simplifying-user-experience-for-rating-your-android-app-3e15f03768f6