Trong lập trình, chúng ta luôn muốn tìm các phương thức tốt nhất để refactor code để chúng ngày càng đơn giản hơn nữa. 
Bài viết này sẽ chỉ ra một cách đơn giản hơn để giải thích Dagger 2. Bạn có thể coi nó như là một hướng dẫn nhanh về Dagger 2.

## Chỉ với 3 dòng code
Để làm cho Dagger 2 có thể hoạt động, chúng ta sẽ chỉ cần 3 dòng code này

```
class Info @Inject constructor()
@Component interface MagicBox { val info: Info }
fun main() { println(DaggerMagicBox.create().info) }
```

![](https://images.viblo.asia/29c30c78-b4a1-4f68-bb3a-d2457b8a7399.png)

Chỉ cần thêm những dòng code này với bất kỳ file Kotlin nào trong project của bạn, và click nút  ▶️ ở bên cạnh method `fun main()`, và nó sẽ được thực thi.

> Ghi chú: Bạn sẽ cần include thư viện trước tiên trong file `build.gradle`

```
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
```

và 

```
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    // ... other dependencies ...
    implementation 'com.google.dagger:dagger:2.13'
    kapt 'com.google.dagger:dagger-compiler:2.13'
}
```

## Phần đặc biệt của Dagger 2

Từ 3 dòng code ở trên, bạn sẽ nhìn thấy 3 unique chỉ định đặc biệt của Dagger 2, như giải thích ở dưới đây.

### @Inject constructor()

Đây là phần mà nó chỉ ra cho Dagger 2 để tự động xây dựng đối tượng này.

### @Component interface

Đây là phần mà nó chỉ ra cho Dagger 2 để implement interface (trong trường hợp của chúng ta là `MagicBox`) sẽ có code được generates và xây dựng tất cả các injectable dependency. Việc thực hiện được đặt tên là `DaggerMagicBox`.

> Để có code chi tiết, bạn có thể tham khảo tại đây
> [3 lines of Working Dagger 2 Example Code](https://medium.com/dataseries/3-lines-of-working-dagger-2-example-code-c2529015cb65)

### DaggerMagicBox.create()

Như đã đề cập trong mục trên, `DaggerMagicBox` được auto-generated implementation của `@component interface` đã được khai báo. Nó có function `create()` được tạo khởi tạo việc thực hiện này. Từ đó, chúng ta có thể trích xuất đối tượng phụ thuộc một cách dễ dàng.

Từ trên, chúng ta thấy rằng Dagger 2 tự động tạo đối tượng `Info` thông qua lớp container `DaggerMagicBox`.

## Làm thế nào tôi có thể tự động inject dependency của tôi?

Đoạn code ta có ở trên có vẻ không giống như một Dependency Injection pattern, nhưng thay vào đó là một Service Locator pattern, như `fun main()` cần lấy đối tượng `Info` từ `DaggerMagicBox`. Điều này tương tự với việc đặt nó thành một biến như dưới đây.

```
val myInfo = DaggerMagicBox.create().info
```

Nhưng cái chúng ta muốn là auto-injection, như là đoạn code Dagger 2 bên duowis:

```
@Inject lateinit var myInfo: Info
```

Để đạt được điều này, chúng ta chỉ cần thực hiện một số công việc bổ sung ngoài 3 dòng code ở trên.

### 1. Tạo một class mục tiêu để chứa sự phụ thuộc

```
class MainClass {
    @Inject lateinit var info : Info
}
```

Ở đoạn code bên trên, chúng ta cần `lateinit var` bởi vì biến đó không được biết trong quá trình xây dựng lớp đối tượng.

### 2. Thay thế thành phần val bằng function để inject đối tượng đích

Thay đổi đoạn code dưới đây:

```
// Remove this line and replace with the one with `poke`
// @Component interface MagicBox { val info: Info2 } 
@Component interface MagicBox { fun poke(myTarget: MainClass) }
```

Từ đó, nó thông báo tới các thành phần, thay vì có cách tạo `Info` trong chính `MagicBox`. Nó có thể inject the dependencies (ví dụ như `Info`) ở trong đối tượng target class (ví dụ `MainClass`) khi function `poke` được gọi.

### 3. Inject the dependencies ở trong một target class

Cuối cùng, chỉ cần khởi tạo `DaggerMagicBox` trong target class, và yêu cầu nó inject các dependencies cần thiết (sử dụng function `poke`), như ví dụ bên dưới.

```
class MainClass {
    @Inject lateinit var info : Info
    init { DaggerMagicBox.create().poke(this) }
}
```

Với ở trên, toàn bộ code trông như dưới đây.

```
class MainClass {
    @Inject lateinit var info : Info
    init { DaggerMagicBox.create().poke(this) }
}
class Info @Inject constructor()
@Component interface MagicBox { fun poke(mainClass: MainClass) }
fun main() { println(MainClass().info) }
```

![](https://images.viblo.asia/e2f9ed0b-29a3-4f91-b299-e4d83791fc2f.png)

Nói tóm lại, ưu điểm của Dagger 2 nằm ở đằng sau việc tự động tạo đối tượng `DaggerMagicBox`, đó là việc implementation `MagixBox` interface.

--------------------------------------

Hy vọng bài viết này sẽ giúp ích được nhiều cho các bạn.

Nguồn tham khảo: https://levelup.gitconnected.com/even-simpler-dagger-2-tutorial-9691c9bf2c05