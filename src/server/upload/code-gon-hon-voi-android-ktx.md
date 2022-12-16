# **Mở bài**
- `Android KTX` được giới thiệu tại IO 2018 vừa rồi. Nếu bạn đã code bằng `Kotlin` thì sẽ cảm thấy code nó gắn hơn `Java` nhiều rồi nhưng với `KTX` thì nó sẽ giúp code của chúng ta ngắn hơn nữa :v: 
-  Các bạn có thể tìm hiểu rõ tại trang chủ ở [đây](https://developer.android.com/kotlin/ktx)
# **Cấu hình**
- Đầu tiên hãy thêm phần dưới đây vào `build.gradle (Project)` file :
```
repositories {
    google()
}
```
- Sau đó thêm phần dưới này tại  `build.gradle (App)` nữa để hoàn tất :
```
dependencies {
    implementation 'androidx.core:core-ktx:1.0.0-alpha1'
}
```
# **So sánh với kotlin**
- Ví dụ dưới đây sẽ cho chúng ta thấy được rằng với `KTX` thì code sẽ gọn hơn như thế nào nhé.

## **String to Uri**
Android KTX thêm chức năng mở rộng vào lớp `String` cho phép chuyển đổi string thành URI luôn
- Kotlin :
```
val uri = Uri.parse(myUriString)
```
- Kotlin with KTX : 
```
val uri = myUriString.toUri()
```
## **Edit SharedPreferences**
- Kotlin :
```
sharedPreferences.edit()
           .putBoolean(key, value)
           .apply()
```
- Kotlin with KTX : 
```
haredPreferences.edit { 
    putBoolean(key, value) 
}
```
## **Action on View onPreDraw**
- Kotlin :
```
view.viewTreeObserver.addOnPreDrawListener(
       object : ViewTreeObserver.OnPreDrawListener {
           override fun onPreDraw(): Boolean {
               viewTreeObserver.removeOnPreDrawListener(this)
               actionToBeTriggered()
               return true
           }
       })
```
- Kotlin with KTX : 
```
view.doOnPreDraw { actionToBeTriggered() }
```
# **Kết thúc**
- Các bạn có thể thấy thì việc sử dụng `Android KTX` giúp cho code của chúng ta ngắn gọn hơn rất nhiều.
- Cảm ơn các bạn đã đọc bài viết của mình.