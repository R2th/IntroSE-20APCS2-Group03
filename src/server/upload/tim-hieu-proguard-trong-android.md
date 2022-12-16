## 1. Proguard là gì ?
Proguard là một công cụ java miễn phí trong android. 
Cụ thể nó giúp ứng dụng của chúng ta:
* Giảm kích thước của ứng dụng đi đáng kể
* Tối ưu hoá code bằng cách xoá đi những class và method không được sử dụng,  tạo những inlining function từ function sẵn có có thể chuyển.
* Góp phần chống dịch ngược code của chúng ta bằng viết thay đổi tên lớp, phương thức, biến, tên hàm, etc...
## 2. Lợi ích của proguard 
Proguard là một công cụ rất hữu ích cho việc tạo một ứng dụng tối ưu. Nó giúp ứng dụng của ta giảm được một lượng mã lệnh thừa (unusing code), ứng dụng được tối ưu hoá rất đáng kể vì vậy sẽ giúp cho ứng dụng chạy mượt mà hơn. Proguard được tạo mặc định khi tạo một ứng dụng Android từ Android Studio, đồng thời chúng ta có thể tuỳ chỉnh một số cấu hình cho phù hợp với dự án. Chúng đem lại rất nhiều lợi ích, như là:
* Nó làm cho việc dịch ngược mã lệnh trong ứng dụng của chúng ta là điều vô cùng khó khăn. Bằng cách thay đổi tên, đặt lại tên một cách ngắn gọn các lớp, ... Ví dụ như: CategoriesViewModel có thể đổi tên thành CV.
* Giúp ứng dụng chúng ta có một kích thước giảm đi đáng kể bằng cách bỏ qua những tài nguyên không được sử dụng đến có trong dự án giống như ảnh trong drawable. Điều đó sẽ giúp ứng dụng của giúp ta nhẹ hơn và nhanh hơn.
## 3. Sử dụng proguard trong ứng dụng như thế nào ?
Trong build grandle của app:
```go
android {
    buildTypes {
        release {
            // Enables code shrinking, obfuscation, and optimization for only
            // your project's release build type.
            minifyEnabled true

            // Includes the default ProGuard rules files that are packaged with
            // the Android Gradle plugin. To learn more, go to the section about
            // R8 configuration files.
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```
* `minifyEnabled true` : Khi gắn giá trị cho nó bằng **true** thì mã lệnh của giúp ta lúc này khi build bản release version sẽ được tối ưu, chống dịch ngược, ... Hay hiểu cách khác nó sẽ kích hoạt những rule có trong file proguard-rules.pro này. 

Đây cũng là nơi ta sẽ thêm những rule mong muốn và rule cần thiết của thư viện ta đang dùng trong dự án. Để tránh trên bản release, proguard sẽ loại bỏ một lượng lớn mã lệnh và phá vỡ luồng hoạt động của ứng dụng. Trường hợp thường gặp nhất đó là ở những thư viện chúng ta sử dụng trong ứng dụng, có những function chúng ta không dùng đến nhưng khi bị xoá đi sẽ phát sinh ra lỗi vì vậy chúng ta phải thêm một số rule đã được nhà phát hành thư viện đề xuất hoặc trên cộng đồng sử dụng thư viện đó. Là cách hiệu quả nhất để tránh lỗi không mong muốn xảy ra.

Bây giờ, chúng ta hãy cùng nhau tìm hiểu một số custom rules hữu ích trong proguard.

### 3.1 Keep class files
Giả sử chúng ta có một data class như bên dưới:
```scala:scala
data class User(val id: String = "", val name: String = "")
```
Và chúng ta không muốn proguard làm xáo trộn nó. Ta có thể làm như sau: 
```scala:scala
@Keep
data class User(val id: String = "", val name: String = "")
```
**@Keep** sẽ giúp cho class này được bỏ qua khi proguard tiến hành minified.
Cho dù nó class này hoặc method của nó không được sử dụng thì vẫn không bị loại bỏ khỏi bản sau khi build.

Chúng ta cũng có thể dùng `-keep` trong file proguard-rules.pro để quản lý không khác gì @Keep ở trên. Có điều dùng -keep sẽ tốt hơn @Keep ở chỗ ta có thể kiểm sát được tốt hơn, method nào cần giữ và method nào không cần giữ.

Ngoài 2 cách trên, điều duy nhất chúng ta muốn làm là giữ một thuộc tính duy nhất của class thì ta có thể dùng một anotation của thư viện Gson như sau:
```scala:scala
data class User(@SerializedName("id") val id: String = "", val name: String = "")
```

### 3.2 Keep member for a class 
Trong trường hợp chúng ta muốn giữ các member của class khỏi việc bị xáo trộn và thu hẹp. Trong file proguard-rule.pro hãy thêm:
```markdown
-keepclassmembers
```
Giả sử cũng với class User ở trên, ta muốn giữ lại tất cả các members public của class nó, thì ta làm như sau:
```java
-keepclassmembers class com.mindorks.sample.User{
    public *;
}
```

### 3.3 Keeping names of the class and members
Giả sử trường hợp chúng ta muốn giữ tên class và các method của nó nếu chúng được gọi, bằng cách thêm dòng bên dưới vào file proguard rules:
```markdown
-keepnames
```
Chúng ta cùng xem xét một ví dụ cụ thể như bên dưới:
```java
-keepnames class com.android.sample.GlideModule
```
Nếu các method trong GlideModule này không được sự dụng chúng sẽ bị loại bỏ. Còn đối với những method còn lại chúng không cần xáo trộn hay đổi tên.
### 3.4 Using any Library in Android
Khi sử dụng bất kỳ thư viện nào chúng ta cần thêm một số câu lệnh proguard yêu cầu của thư viện đó để tránh một số trường hợp lỗi.
Ví dụ như đối với thư viện Glide, họ sẽ cung cấp cho chúng ta một số rules như sau:
```java
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep class * extends com.bumptech.glide.module.AppGlideModule {
 <init>(...);
}
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
-keep class com.bumptech.glide.load.data.ParcelFileDescriptorRewinder$InternalRewinder {
  *** rewind();
}

# for DexGuard only
-keepresourcexmlelements manifest/application/meta-data@value=GlideModule
```

Đối với một số thư viện thường xuyên hiện cảnh báo hoặc logcat thì ta có thể fix nó bằng cách thêm một số custom rules:
```scala:scala
-dontwarn com.somelibrary.annotations.*
```
Chúng ta có thể viết bất kỳ rule khác cho thư viện giống như đối với class của chúng ta.

### 3.5 Only Obfuscate your project
Trong một số trường hợp những thư viện nhỏ, chúng ta chỉ muốn xáo trộn code chống dịch ngược code của chúng ta. Ngoài ra không muốn proguard thực hiện shrink và optimize nó.
Ta hoàn toàn có thể giải quyết được bằng cách thêm vào proguard rule file đoạn lệnh như sau:
```markdown
-dontshrink
-dontoptimize
```
### 3.6 Maintaining annotations
Trong khi build ứng dụng, những annotation sẽ bị loại bỏ tất cả và app của chúng ta vẫn hoạt động ổn định. Tuy nhiên một số trường hợp muốn giữ những annoutation này, thì vẫn có cách đó là:
```objectivec
-keepattributes *Annotation*
```

### 3.7 Optimization
Sau khi viết một số lệnh trong Proguard, chúng ta có thể cần cung cấp thêm một tầng tối ưu hóa cho app của chúng ta. Trước tiên, cần cập nhật file build.gradle như bên dưới:
```go
android {
  buildTypes {
    release {
      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
    }
  }
}
```
Thông thường, chúng ta không cần tới option này. Tuy nhiên trong một số trường hợp chúng ta phải thêm nó để tăng số chu kỳ trong quá trình tối ưu hóa. Ví dụ như: Chúng ta muốn kiểm tra xem quá trình tối ưu hóa có diễn ra đúng hay không, nếu không thì nó sẽ tối ưu hóa lại một số lần nhất định.
```markdown
-optimizationpasses 5
```
Với đoạn lệnh trên, việc tối ưu hóa sẽ xảy ra 5 lần để làm cho nó tối ưu hơn.
```perl
-optimizations class/marking/final
```
Với đoạn lệnh trên, những class final sẽ được tối ưu hóa tối đa 5 lần và nó có thể kết thúc sớm hơn nếu quá trình tối ưu hóa thực hiện hoàn tất.
Tương tự, nếu bạn muốn tối ưu hóa những trường private, chúng ta có thể làm như sau:
```cpp
-optimizations field/marking/private
```

* Quá trình tối ưu hóa phần lớn sẽ được thực hiện đầu tiên.

Ngoại lệ, nếu chúng ta không muốn chạy optimize trong ứng dụng:
```markdown
-dontoptimize
```

Việc tối ưu hóa file Proguard sẽ giúp cho ứng dụng của chúng ta thêm an toàn và nhẹ hơn.
## 4. Những lưu ý quan trọng
* Chúng ta không nên dùng MainFragment::class.java.simpleName để set TAG cho một fragment. Bởi vì trong quá trình proguard xáo trộn code, 2 fragment cùng tên nằm ở 2 package khác nhau có thể bị đổi tên trùng nhau thành A.class chẳng hạn. Điều này sẽ dẫn đến 2 fragment này mang cùng một TAG. Vì vậy có thể dẫn đến lỗi.
* Luôn giữ mapping file của Proguard để theo dõi lại những đoạn code cũ. Bạn có thể phải tải nó lên ở những nơi khác nhau như PlayStore Console để theo dõi.

### Tham khảo:
* blog.mindorks : https://sal.vn/1Wi0r5
* https://developer.android.com/studio/build/shrink-code