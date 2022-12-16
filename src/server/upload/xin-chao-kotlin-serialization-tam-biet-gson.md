![](https://images.viblo.asia/8a6247f1-66ed-4367-88a4-9109010afe96.png)

## Kotlin Serialization là gì ?

Trong thế giới Android hiện nay đã có rất nhiều các thư viện nổi tiếng và hiệu quả dành cho serialization được ra mắt. Trong đó nổi tiếng nhất có lẽ là Gson - một thư viện đến từ chính ông chủ chủ của hệ điều hành Android - Google. Nhưng cho dù như vậy, team phát triển Kotlin vẫn quyết định cho ra đời một thư viện mới của riêng mình mang tên Kotlin Serialization, dành riêng cho Kotlin. Tại sao lại như vậy ?

Các thư viện serialization hiện có như Gson, Moshi... là những thư viện của Java sử dụng tính năng reflection (*) của Java, khá phù hợp đối với phát triển Android. Thế nhưng Kotlin không chỉ giới hạn trong mỗi Android (JVM), nó còn hỗ trợ các nền tảng khác như JavaScript (Kotlin/JS) và iOS (Kotlin/Native)... Các reflection chỉ hoạt động trên JVM chắc chắn bất khả thi khi làm việc với các nền tảng JS và Native. Ngoài ra, sử dụng reflection trong Android cũng là một nhược điểm lớn (gây memory leak).

> *Reflection is a feature in the Java programming language. It allows an executing Java program to examine or "introspect" upon itself, and manipulate internal properties of the program. For example, it's possible for a Java class to obtain the names of all its members and display them.*
>
> Lược dịch: *Reflection là một tính năng trong Java. Nó cho phép một chương trình Java đang thực thi kiểm tra hoặc "nội soi" chính nó và thao tác với các thuộc tính bên trong của chương trình. Ví dụ, một lớp Java có thể lấy tên của tất cả các thành viên của nó và hiển thị chúng.*
>
> Nguồn: [https://www.oracle.com/technical-resources/articles/java/javareflection.html](https://www.oracle.com/technical-resources/articles/java/javareflection.html)

Bên cạnh nguyên nhân cần hỗ trợ multiplatform và việc sử dụng reflections, còn có một điểm trừ khác đối với các thư viện serialization của Java đó là chúng không hỗ trợ các giá trị mặc định trong Kotlin. Để hiểu điều này một cách rõ ràng, hãy nhìn vào ví dụ dưới đây:

```kotlin
data class SimpleExample(
    val data : String,
    var optionalData : String = "empty"
)
```

Khi chúng ta parse một JSON với chỉ một thuộc tính `data` thì thuộc tính `optionalData` sẽ được gán thành `null` thay vì được gán với giá trị mặc định là `"empty"` như được khái báo trong data class. Điều này là một vấn đề lớn bởi vì khi một biến được khai báo với kiểu non-nullable (không có dấu ?) thì Kotlin compiler sẽ luôn đảm bảo rằng biến sẽ không bao giờ được gán giá trị `null`, nhưng các thư viện Java serialization lại không nhận thức được điều đó. Kết quả từ sự xung đột chức năng này là rất nhiều hành vi không mong muốn sẽ xảy ra trong ứng dụng.

Chính vì thế Kotlin team quyết định tạo ra một thư viện serializaition mà sẽ hoạt động trên tất cả các nền tảng nó đang hỗ trợ mà không dùng đến reflection.

## Tích hợp Kotlin Serialization vào dự án

Để sử dụng thư viện Kotlin Serialization, chúng ta cần tích hợp cả Gradle Plugin và thư viện runtime. Gradle plugin sẽ generate code để parse JSON mà không cần dùng bất kỳ reflection nào. Trong khi đó, thư viện runtime sẽ sử dụng code này để serialize các data class.

Để tích hợp plugin Kotlin Serialization, ta cần khai báo classpath trong file `build.gradle` của top-level như sau:

```groovy
classpath "org.jetbrains.kotlin:kotlin-serialization:1.4.20"
```

Nếu dùng Kotlin DSL (build.gradle.kts) thì:

```kotlin
classpath("org.jetbrains.kotlin:kotlin-serialization:1.4.20")
```

Sau đó khai báo plugin trong app level:

```groovy
apply plugin: 'kotlinx-serialization'
```

Kiểu mới:

```groovy
plugin {
  id 'kotlinx-serialization'
}
```

Dùng Kotlin DSL:

```kotlin
plugin {
  kotlin("plugin.serialization")
}
```

Sau đó, bạn có thể thêm implementation trong khối `dependencies`:

```kotlin
implementation("org.jetbrains.kotlinx:kotlinx-serialization-runtime:1.0.1")
```

## Cách dùng Kotlin Serialization với data class

Kotlin Serialization có thể được dùng một cách khá nhanh gọn vì đây là một thư viện native của Kotlin team. Chúng ta chỉ cần thêm annotation `@Serializable` ngay phía trên của class mong muốn. Kiểu như sau:

```kotlin
@Serializable
data class SampleDataClass(
    val data: String,
    var optionalData: String = "empty"
)
```

Vậy là xong! Bạn không cần phải thêm annotation với mọi thuộc tính của class như đối với Gson.

Tuy nhiên nếu muốn đặt tên tuỳ chỉnh để fit với các attribute name từ JSON chẳng hạn, ta có thể thêm các annotation `@SerialName` cho từng thuộc tính:

```kotlin
@Serializable
data class SampleDataClass(
    @SerialName("data")
    val data: String,
    @SerialName("optional_data")
    var optionalData: String = "empty"
)
```

## Tích hợp Kotlin Serialization vào Retrofit 2

Chúng ta đều đã quen với các Retrofit converter dành cho Gson, Moshi... rồi đúng không. Tương tự như vậy, ta cũng cần phải có một converter dành cho Kotlin Serialization. Có một số thư viện bên thứ ba hỗ trợ việc này. Nhưng để cho uy tín nhất thì có lẽ nên dùng thư viện của anh JakeWharton (một kỹ sư nổi tiếng đến từ Square, tác giả của Timber, Butter-Knife, ThreeTen ABP...).

Thêm vào dependencies:

```kotlin
implementation("com.jakewharton.retrofit:retrofit2-kotlinx-serialization-converter:0.8.0")
```

Sau đó thêm vào nơi khai báo Retrofit:

```kotlin
val contentType = "application/json".toMediaType()
val retrofit = Retrofit.Builder()
    .baseUrl("https://example.com/")
    .addConverterFactory(Json.asConverterFactory(contentType))
    .build()
```

## Các tính năng ẩn hữu ích

### Compile-time safety

Điều này dành cho lúc bạn làm việc với các serialization phức tạp, ví dụ như khi bạn có các class được lồng bên trong một response data class.

```kotlin
@Serializable
data class ProfileResponse(
    val id: Int,
    val name: String,
    val profile: Profile
)
```

Tất nhiên bạn cần phải thêm annotation `@Serialization` cho class `ProfileResponse`, nhưng nếu chẳng may bạn quên thêm annotation cho class `Profile` thì sao ? Ứng dụng sẽ crash lúc runtime ? Hay là bạn sẽ phải tự mình check để đảm bảo mọi class lồng bên trong đều đã được thêm annotation ?

Thật may là bạn không cần phải vất vả đến thế. Ứng dụng sẽ không bao giờ crash và bạn cũng không cần phải tự check do Kotlin Serialization là một compile-time safe. Nó sẽ hiển thị một error nếu bạn chưa thêm annotation trên bất kỳ nested class nào, bất kể cấu trúc class của bạn có sâu bao nhiêu.

### Các annotation @Transient và @Optional

- **Transient**: Bằng cách gán annotation này vào một thuộc tính trong data class, chúng ta đang chỉ định trường này **bị bỏ qua hoàn toàn** bởi Serializer.

- **Optional**: Bằng cách gán annotation này vào trong data class, chúng ta đang chỉ định trường này là **tuỳ chọn** do đó không được break process nếu không tìm thấy trường này trong response. Chúng ta cũng có thể gán một giá trị mặc định như dưới đây:

  ```kotlin
  @Optional
  var isOptional: Boolean = false
  @Transient
  var isTransient: Boolean = false
  ```

  Cả 2 annotation này đều rất hợp lý, nhưng không hiểu vì sao các thư viện của Java lại thiếu mất chúng.

---
- Blog của mình: https://phucynwa.github.io/programming/xin-chao-kotlin-serialization-tam-biet-gson/
- Nguồn chính: [https://medium.com/better-programming/why-and-how-to-use-kotlins-native-serialization-library-c88c0f14f93d](https://medium.com/better-programming/why-and-how-to-use-kotlins-native-serialization-library-c88c0f14f93d)
- Tham khảo từ: https://kotlinlang.org/docs/reference/serialization.html