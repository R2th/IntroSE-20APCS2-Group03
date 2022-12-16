Trong quá trình xây dựng ứng dụng Android, có thể các bạn đã sử dụng Proguard trong dự án của mình. Ở bài viết này, chúng ta sẽ tìm hiểu về tất cả các tính năng và cách sử dụng Proguard hiệu quả nhất trong Android.

# I. ProGuard là gì?
Proguard là một java tool miễn phí trong Android, giúp chúng ta thực hiện các thao tác sau:
* Thu nhỏ (Giảm thiểu) code: Loại bỏ mã không sử dụng trong dự án.
* Obfuscate code: Đổi tên tên của lớp, trường, ...
* Tối ưu hóa code: Thực hiện những việc như nội tuyến các hàm.
Nói tóm lại, Proguard tạo ra tác động sau đây cho dự án:
* Làm giảm kích thước của ứng dụng.
* Loại bỏ các lớp và phương thức không sử dụng góp phần vào phương thức đếm giới hạn 64k method của ứng dụng Android.
* Giúp cho ứng dụng khó bị dịch ngược hơn bằng cách làm xáo trộn mã.
# II. ProGuard hữu ích thế nào trong một ứng dụng?
Trong Android, proguard rất hữu ích để tạo ra một ứng dụng production-ready. Nó giúp chúng ta giảm mã và làm cho ứng dụng chạy nhanh hơn. Proguard được khởi tạo mặc định trong Android Studio và nó giúp chúng ta theo nhiều cách, một vài trong số chúng được đề cập dưới đây:
* Nó làm xáo trộn mã, có nghĩa là nó thay đổi tên các class thành một cái tên mới có số chữ cái ít hơn. Ví dụ như MainViewModel nó có thể đổi tên thành A. Kỹ thuật đảo ngược ứng dụng của bạn sẽ trở thành một nhiệm vụ khó khăn sau khi proguard làm xáo trộn ứng dụng.
* Nó thu nhỏ tài nguyên, tức là bỏ qua các tài nguyên không được gọi bởi các tệp class của chúng ta, không được sử dụng trong ứng dụng Android của chúng ta như hình ảnh từ drawables, ... Điều này sẽ làm giảm kích thước ứng dụng rất nhiều. Bạn luôn luôn cần chú ý tối ưu hóa ứng dụng của mình để giữ cho nó nhẹ và nhanh.
# III. Làm thế nào để sử dụng ProGuard trong dự án của chúng ta?
Để bật Proguard trong dự án của bạn, trong thư mục build.gradle (app) hãy thêm dòng dưới đây:
```
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```
`minifyEnabled true` sẽ kích hoạt proguard lấy từ file proguard-android.txt.
Nó nằm trong khối release, có nghĩa là nó sẽ chỉ được áp dụng khi chúng ta build bản release. Nhưng đôi khi có trường hợp proguard loại bỏ quá nhiều mã và nó có thể phá luồng hoạt động đúng trong ứng dụng của bạn. Vì vậy, cấu hình mã chúng ta phải thêm một số quy tắc tùy chỉnh để đảm bảo bộ mã của chúng ta không bị xáo trộn. Có thể khắc phục điều này bằng cách viết ra các quy tắc tùy chỉnh trong proguard của mình. Bây giờ, chúng ta hãy xem làm thế nào chúng ta có thể viết các quy tắc tùy chỉnh trong proguard.
## 1. Keeping class files
Giả sử chúng ta có một lớp dữ liệu, một số API cần lớp này để thực hiện nhưng việc tạo ra một bản build release lại làm xáo trộn lớp đó (obfuscate class). Ví dụ, chúng ta có lớp dữ liệu người dùng:
```
data class User(val id: String = "")
```
Và chúng ta không muốn hiện tượng obfuscate class xảy ra khi chúng ta build app thì hãy sử dụng annotation @Keep và update code trong file proguard-android.txt như dưới đây:
```
@Keep
data class User(val id: String = "")
```
Annotation này giúp lớp bị bỏ qua bằng cách sử dụng proguard trong khi rút gọn. Điều này sẽ bảo toàn lớp và các hàm thành viên của nó ngay cả khi lớp này không được sử dụng. Bạn cũng có thể viết
```
-keep
```
để bảo tồn các tùy chọn của lớp trong khi tạo bản dựng. Sử dụng -keep trên @Keep, chúng ta sẽ kiểm soát nhiều hơn những gì cần bảo tồn và những gì không.
Nhưng, chúng ta cũng có thể bảo vệ khóa của trường id trong lớp mô hình dữ liệu bằng cách sử dụng @SerializedName (khi sử dụng thư viện Gson) như sau:
```
data class User(@SerializedName("id")
                 val id: String = "")
```
## 2. Keeping the members for a class
Trong trường hợp chúng ta chỉ muốn duy trì các thành viên trong class chứ không phải bảo tồn cả class đó trong quá trình thu gọn mã thì hãy sử dụng:
```
-keepclassmembers
```
trong file proguard. Điều này sẽ giúp chúng ta bỏ qua các thành viên của một lớp cụ thể. Hãy xem xet class user ở trên và chúng ta muốn duy trì tất cả phương thức public bên trong nó hãy viết như sau:
```
-keepclassmembers class com.mindorks.sample.User{
    public *;
}
```
Class User sẽ bảo tồn tất cả thành viên có phạm vi truy cập public
## 3. Keeping names of the class and members
Giả sử chúng ta muốn giữ tên của lớp và các thành viên của lớp nếu nó được sử dụng trong mã, nếu lớp này không được sử dụng, nó sẽ bị thu hẹp bởi proguard nhưng không bị obfuscate. Để làm được việc này, chúng ta sử dụng:
```
-keepnames
```
Trong thực tế nó sẽ trông như thế này:
```
-keepnames class com.mindorks.sample.GlideModule
```
Ở đây, GlideModule sẽ giữ tất cả tên của lớp và hàm thành viên.
## 4. Using any Library in Android
Khi sử dụng bất kỳ thư viện nào, chúng ta có thể muốn viết một số quy tắc tùy chỉnh cho proguard. Có thể xảy ra trường hợp khi thư viện đưa ra cảnh báo trong logcat hoặc họ thậm chí không có quy tắc bảo vệ riêng của mình. Để khắc phục điều đó, chúng ta cần thêm các quy tắc tùy chỉnh ở phía ứng dụng của mình. Ví dụ nếu bạn bắt đầu nhận được cảnh báo từ bất kỳ thư viện nào thì hãy thêm dòng này:
```
-dontwarn com.somelibrary.annotations.*
```
Để viết các quy tắc tùy chỉnh cho thư viện, bạn có thể viết nó như bất kỳ quy tắc nào khác cho lớp của riêng bạn.
## 5. Only Obfuscate your project
Hãy xem xét trường hợp bạn chỉ muốn làm xáo trộn mã và không thu hẹp bất kỳ tài nguyên nào. Đây là trường hợp rất hiếm khi sử dụng nhưng có thể hữu ích cho một số thư viện nhỏ, hãy viết các cờ như sau:
```
-dontshrink
-dontoptimize
```
Điều này sẽ giúp chúng ta không thu nhỏ hay tối ưu hóa mã mà chỉ làm xáo trộn mã.
## 6. Maintaining annotations
Khi xây dựng ứng dụng, ProGuard sẽ xóa tất cả các annotation và nó vẫn có thể hoạt động tốt đối với một số bộ mã trong dự án của bạn. Nhưng khi cần giữ lại các annotation chúng ta hãy viết:
```
-keepattributes *Annotation*
```
Nó sẽ giữ tất cả các annotation được lưu trữ trong ứng dụng của bạn.
## 7. Optimization
Sau khi viết số lượng quy tắc này trong ProGuard, chúng ta có thể cần cung cấp thêm một lớp tối ưu hóa cho ứng dụng của mình. Đầu tiên, chúng ta cập nhật tệp build.gradle như sau:
```
android {
  buildTypes {
    release {
      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
    }
  }
}
```
Nếu chúng ta muốn optimiztion nhiều lần (5 lần chẳng hạn) hãy viết như sau: 
```
-optimizationpasses 5
```
Tại đây, các lớp cuối cùng sẽ được tối ưu hóa tối đa 5 lần hoặc thậm chí có thể kết thúc sớm nếu việc tối ưu hóa đã được thực hiện.
Bây giờ, nếu chúng ta muốn tối ưu hóa các trường riêng mà chúng ta sử dụng:
```
-optimizations field/marking/private
```
Phần lớn việc tối ưu hóa sẽ được thực hiện ở lần đầu tiên.
Nếu bạn không muốn tối ưu hóa tất cả những gì bạn sử dụng, hãy thêm:
```
-dontoptimize
```
Đây là những cách khác nhau để làm cho ứng dụng của bạn an toàn hơn và nhẹ hơn bằng cách sử dụng proguard.
# IV. Những điều quan trọng cần lưu ý.
- Đừng sử dụng thứ gì đó như MainFragment. Class.getSimpleName () làm TAG cho Fragment. Vì proguard có thể gán cùng tên (A.class) cho hai fragment khác nhau trong các package khác nhau trong khi che giấu. Trong trường hợp này, hai fragment sẽ có cùng một TAG. Nó sẽ dẫn đến lỗi trong ứng dụng của bạn.
- Giữ mapping file của Proguard để theo dõi lại mã gốc. Bạn có thể phải tải nó lên ở những nơi khác nhau như PlayStore Console để xem nguồn gốc xảy ra crash.
# V. Tài liệu tham khảo
https://blog.mindorks.com/things-to-care-while-using-proguard-in-android-application
https://medium.com/mindorks/mastering-proguard-in-android-6bb13a6d9e6c