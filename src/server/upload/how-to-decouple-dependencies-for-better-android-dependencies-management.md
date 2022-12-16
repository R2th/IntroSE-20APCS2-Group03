# Context
Từ khi làm việc với các thư viện bên thứ 3 từ các nguồn `gradle, maven, jitpack`... (hay việc sử dụng các `external/remote library`), mọi thứ đã trở nên rất dễ dàng cho lập trình viên (`android, java` nói riêng). Bạn không còn phải tự *download* những gói `jar`, hay `source code` rồi `import`, `config` các kiểu. Đơn giản chỉ cần vài dòng *code*, *tool* sẽ tự động *download* về dùng.

Tuy nhiên, tự bây giờ những vấn đề khác đã có thể xảy ra đối với bạn
1. Việc `conflict library` xảy ra nhiều hơn? Thư viện bạn dùng, sử dụng / phụ thuộc vào *library A version X*, còn ứng dụng của bạn lại muốn dùng *library A version Y*.
2. Bạn là người viết `SDK / library`, có nhiều chức năng, nhiều *feature* khác nhau, *library* của bạn lại phụ thuộc vào các *external library X, Y, Z*... khác, tuy nhiên, việc chia *module* hạn chế làm cho các ứng dụng sử dụng *SDK / library* của bạn phải phụ thuộc các *library X, Y, Z*... mặc dù họ có thể chỉ sử dụng 1 phần chức năng trong *library* của bạn.
3. ...

Vậy câu hỏi được đặt ra là: **Có cách nào để xây dựng một `SDK / library` mà các `external library` nó phụ thuộc, không bao giờ gây `conflict` với một ứng dụng sử dụng `SDK / library` này?**
# Idea
Bạn có biết lúc bạn *build 1 library* và *release* lên các nguồn như *gradle, maven, jitpack*..., các *external dependency* của *SDK / library* của bạn sẽ được đưa vào 1 file *xml* (`pom.xml`), và khi 1 ứng dụng *SDK / library* của bạn vào, `android studio` sẽ *download source* thư viện, kèm theo file *xml* này và khi *resolve dependency task* chạy, nó sẽ tiến hành *download* các *external library* có liên quan.

Vậy ý tưởng để giải quyết việc bài toán của chúng ta sẽ là **chúng ta gôm toàn bộ external library code, `repackage (đổi package name)` và `embed` (nhúng) toàn bộ chúng vào bản release của SDK/library, điều này có nghĩa là SDK/library là một single `jar/aar` và không có internal / external dependency** 

Điều quan trọng ở đây là bạn phải `repackage` *external library*, vì nếu không sẽ không thể giải quyết được nếu phía ứng dụng cũng có dùng *library* đó (khác *version*), việc *conflict* là có thể xảy ra sau quá trình *merge source*.

Tuy nhiên, hiện tại vẫn chưa có *tool* hay *plugin* hiện thực hoàn hảo idea này. Vậy, các giải pháp thay thế nào có thể giải quyết 1 phần của *idea*?
# Alternative Solution

## Application side
Ở phía ứng dụng, chắc hẳn anh em hay dùng một trong 3 cách dưới đây để giải quyết vấn đề *conflict* khi ứng dụng dùng một *library* nào đó. Chi tiết mọi người có thể đọc thêm ở [bài viết này](https://medium.com/mindorks/avoiding-conflicts-in-android-gradle-dependencies-28e4200ca235)

Ví dụ về 1 trường hợp có thể gây *conflict*:
```java
implementation 'junit:junit:4.12' // (Depends on org.hamcrest:hamcrest-core version 1.3)
testImplementation 'org.mockito:mockito-core:1.10.19' // (Depends on org.hamcrest:hamcrest-core version 1.1)
```
### 1. Exclude the conflicted module/library from one of the dependencies

Đại khái ý tưởng là loại bỏ phần *module* của *library* có *version* mà ứng dụng không mong muốn.

```java 
// bỏ qua phần module hamcrest-core version 1.3, dùng 1.1
implementation ('junit:junit:4.12') {
    exclude group: 'org.hamcrest', module:'hamcrest-core'
}
```
Đây là cách nhiều người vẫn hay sử dụng.
### 2. Explicitly define the conflicted library in build.gradle

Ý tưởng là bạn định nghĩa *version* cụ thể của *library* mà ứng dụng mong muốn phụ thuộc.

```java
implementation 'junit:junit:4.12' // (Depends on org.hamcrest:hamcrest-core version 1.3)
testImplementation 'org.mockito:mockito-core:1.10.19' // (Depends on org.hamcrest:hamcrest-core version 1.1)
testImplementation 'org.hamcrest:hamcrest-core:1.3' // force use 1.3
```

Điểm yếu là nếu bạn mong muốn chọn verison khác (vd `hamcrest-core : 1.2`) với các *version* bị *conflict*, thì *version library* bạn chọn có thể bị *override* nếu nó vẫn thấp hơn 1 trong các *conflict* *version*. Ngoài ra, khi bạn thay đổi *version* các *conflict library*, thì bạn phải thay đổi cả version mà bạn mong muốn.

### 3. Force resolution of the library

Ý tưởng là bạn *force version* mong muốn cho tất cả các *configuration*.

```kotlin
android {
    configurations.all {
        resolutionStrategy.force 'org.hamcrest:hamcrest-core:1.1'
    }
}
```
Vì *solution* này mang nghĩa tổng quát của *solution* 2, nhưng vì nó *force version* cho toàn bộ các *module*, nên đây cũng có thể tìm ẩn một vài *issue* nào đó.

> Nhìn chung cả 3 giải pháp này là phía ứng dụng, không giải quyết hoàn toàn được *issue* đặt ra, bởi lẽ khi bạn *force* sử dụng một *version*, thì bản thân ứng dụng hoặc *library* có thể đã thiếu những phần chức năng vì *external dependency verison* của 1 trong 2 đã khác. 

## SDK / Libary side

### Fat AAR
Ý tưởng của *Fat AAR* là gôm toàn bộ *dependency (internal & external)* và đóng gói vào *library* của bạn. Tuy nhiên, khác với các *library* khác việc *merge source* của *android* phức tạp hơn nhiều vì ngoài *source code*, bạn còn phải *merge resource* và *manifest*, những thứ thực sự dễ bị *conflict* và việc *combine* là không hề dễ dàng.

Đây là phần rep của một [tech-er bên google](https://stackoverflow.com/a/20715155/3682565)
> There is no mechanism to combine library. It's a bit complicated as you probably want to control which dependencies get merged (for instance you probably don't want to include support-v4 in there). Also you'd need to merge the resources and Android manifest.
>
>  At this time there's no way to easily hack something, unless you are sure the resources have no conflicts between the two res folders (for instance you could have strings_a.xml in one lib and strings_b.xml in the other lib). This way you can just "merge" the two res folders by copying them both into the same location (as opposed to do a merge at the android res level).
>
> For the Manifest it'd be more complicated, but doable with some custom code.
>
> Providing a built-in mechanism for this is very low on our priority so don't expect it anytime soon


Các *Fat AAR plugin* hiện có chỉ có thể sử dụng cho 1 vài mục đích cụ thể và còn nhiều hạn chế, issue. Nên cân nhắc khi sử dụng. Vài `plugin` cho mọi người tham khảo:

https://github.com/Mobbeel/fataar-gradle-plugin

https://github.com/kezong/fat-aar-android
### Use dependency from application

Ý tưởng của việc này là tạo ra một *SDK / library* mà giảm tối đa việc ứng dụng phải *download* toàn bộ các *external dependency* của *SDK / library* của bạn phụ thuộc. Phía *SDK / library* sẽ sử dụng những *external library* do chính phía ứng dụng *import* vào.

Ví dụ *SDK* của bạn hỗ trợ `Video Ad, Chromcast`... nếu ứng dụng sử dụng *SDK*, ứng dụng có thể tự *import Video Ad library* hoặc *Chromcast library* để sử dụng các chức năng trên.

Để làm được điều này, phía *library* sẽ làm những bước sau đây:

1. Xác định các *external library*, chức năng có thể *optional import* từ phía ứng dụng.

Đa phần các *library* này nên là các *library* có khả năng `back compatibility` và khoảng *version* hỗ trợ *back compatibility* rộng. VD: *Exoplayer, Goolge service ads, cast*...

2. Phía *SDK* sẽ phải *import* các *library* này sử dụng [`compileOnly`](https://developer.android.com/studio/build/dependencies) để *import* các *library* lúc *build time*.

```java
 // ad 
 compileOnly 'com.google.android.gms:play-services-ads:17.1.3'
 // cast
 compileOnly 'com.android.support:mediarouter-v7:28.0.0'
 compileOnly 'com.google.android.gms:play-services-cast-framework:16.1.2'
```
Điều này có nghĩa là các *library* này không *required* cho phía ứng dụng, phía ứng dụng sẽ không phải tải về các *library* này.

3.  Việc nặng nề nhất đối với *library* là sử dụng các *logic* để *check dependency* có *available* hay không lúc *runtime* để thay đổi các hành vi sao cho phù hợp.

```kotlin
fun anyFunction() {
    if (!isCastDependencyAvailable()) {
        println("Missing libs")
        return
    }
    println("Dependency libs is ok")
    // Do logic with lib
}

fun isCastDependencyAvailable():Boolean {
    try {
        Class.forName("com.google.android.gms.cast.MediaTrack")
        return true
    } catch (ignored: ClassNotFoundException){}
    return false
}
```

Với cách này, bạn sẽ giảm việc *conflict library version* ở phía ứng dụng vì sẽ chỉ có 1 version được import từ phía ứng dụng, điều này sẽ giúp giảm *size* ứng dụng. Tuy nhiên, phía *SDK / library* nên *note* rõ hướng dẫn *import dependency*, các *version* phù hợp (nên nằm trong khoảng *back compatibility*) mà phía ứng dụng nên sử dụng.

# Conclusion
Bài viết trên đây là chưa trọn vẹn, chỉ là đưa ra vài ý kiến cá nhân, mọi người đọc nếu có những ý tưởng hay, hãy *comment* để cùng học hỏi thêm.

**References:**

https://developer.android.com/studio/build/dependencies

https://github.com/Mobbeel/fataar-gradle-plugin

https://github.com/kezong/fat-aar-android

https://code.google.com/archive/p/jarjar