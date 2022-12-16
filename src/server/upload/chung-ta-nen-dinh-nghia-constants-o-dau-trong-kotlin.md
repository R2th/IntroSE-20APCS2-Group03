Đã có nhiều bàn luận về vấn đề cách tốt nhất để lưu các biến constants trong Kotlin, hay là `public static final` theo cách nói trong Java. Bài viết sau sẽ mô tả cho các bạn một số tuỳ chọn có thể sử dụng và chỉ ra một vài sai lầm các bạn có thể mắc phải. Trước khi bắt đầu, chúng ta hãy cùng nói về việc decompiling (dịch ngược) code Kotlin.

# Decompiling Kotlin
Nếu bạn đã sử dụng Kotlin một thời gian thì chắc bạn đã nhận ra rằng nó là một ngôn ngữ tuyệt vời giúp giảm thiểu rất nhiều code thừa. Kotlin giúp chúng ta diễn tả những thứ phức tạp bằng các dòng code đơn giản, là nhờ có compiler (trình biên dịch) đã thực hiện những việc rườm rà đó. Một ví dụ điển hình là tính năng `data class` cho phép bạn nhanh chóng giảm thiểu tới hàng chục dòng code bằng chỉ 1 dòng code Kotlin duy nhất. Tuy nhiên chúng ta đều biết rằng, sức mạnh càng nhiều thì trách nhiệm càng lớn. Không khó để khiến Kotlin compiler sinh ra bytecode, và đặc biệt là nếu bạn đang code Android bằng Kotlin, bạn cần phải biết số lượng các class, method và object mà code của bạn sẽ tạo ra. Thật may mắn vì JetBrains đã cung cấp một công cụ decompiler tích hợp sẵn trong Android Studio (đương nhiên Intellij IDEA cũng có), giúp chúng ta xem xét bytecode và thậm chí là sinh ra code java tương tự. Việc này giúp chúng ta dễ dàng tối ưu Kotlin.

Đã có nhiều bài viết nói về chủ đề decompiling Kotlin rồi nênmình sẽ ko đi sâu vào nữa mà chỉ chia sẻ một số link:

- "[Zero boilerplate delegation in Kotlin](https://proandroiddev.com/zero-boilerplate-delegation-in-kotlin-e383fdef28eb)" của Piotr Ślesarew cung cấp giải thích chi tiết cách sử dụng công cụ decompiler.
- "[Kotlin: Uncovered](https://collectiveidea.com/blog/archives/2017/05/16/kotlin-uncovered-part-1)" của Droidcon Boston và Victoria Gonda đều nói veef chi tiết việc decompiling Kotlin.
- "[Exploring Kotlin’s hidden costs](https://medium.com/@BladeCoder/exploring-kotlins-hidden-costs-part-1-fbb9935d9b62)" của Christophe B nói về một số thứ cần biết khi làm việc với Kotlin.

# Constants trong Kotlin

## Companion objects

Sẽ **KHÔNG** có từ khoá `static` trong Kotlin. Nếu bạn muốn truy cập kiểu static tới một số field hay method của class, bạn nên đặt chúng trong một `companion object`. Cách đơn giản nhất để định nghĩa constant sẽ trông như thế này:

```kotlin
class Constants {  
  companion object {
    val FOO = "foo"
  }
}
```

Field này có thể truy cập toàn cục qua `Constants.FOO`. Tuy nhiên hãy cùng dùng thử decompiler và xem đoạn code này sẽ như nào nếu được viết bằng java 

```kotlin
public final class Constants {  
   @NotNull
   private static final String FOO = "foo";
   public static final Constants.Companion Companion = new Constants.Companion((DefaultConstructorMarker)null);

   public static final class Companion {
      @NotNull
      public final String getFOO() {
         return Constants.FOO;
      }

      private Companion() {
      }

      // $FF: synthetic method
      public Companion(DefaultConstructorMarker $constructor_marker) {
         this();
      }
   }
}
```

Có điều quan trọng cần chú ý ở đây là `companion object` là một object thực sự. Lời gọi `Constants.FOO` trong Kotlin sẽ được dịch sang Java là `Constants.Companion.getFOO()`. Phiên bản này thực sự tệ vì nó sinh ra thừa một object và một method.

## const vals

Một cách đơn giản hơn để tối ưu là thêm `const` cho `FOO` như sau:

```kotlin
class Constants {  
  companion object {
    const val FOO = "foo"
  }
}
```

Và đây là phiên bản Java:

```kotlin
public final class Constants {  
   @NotNull
   public static final String FOO = "foo";
   public static final Constants.Companion Companion = new Constants.Companion((DefaultConstructorMarker)null);

   public static final class Companion {
      private Companion() {
      }

      // $FF: synthetic method
      public Companion(DefaultConstructorMarker $constructor_marker) {
         this();
      }
   }
}
```

Hàm get đã biến mất và chúng ta thực sự đã truy cập trực tiếp tới static field. Nhưng compiler vẫn sinh ra một `companion object` thừa. Và một điều cần lưu ý nữa là `const` chỉ có tác dụng với kiểu nguyên thuỷ (primitive) và Stirng.

```kotlin
class Constants {  
  companion object {
    // won't compile
    const val FOO = Foo()
  }
}
```

Cách khắc phục là sử dụng annotation `@JvmField` ở `val`

```kotlin
class Constants {  
  companion object {
    @JvmField val FOO = Foo()
  }
}
```

Sẽ giúp cho `FOO` trở thành `public static final`. Có sự khác biệt quan trọng giữa hành vi của `const` và `@JvmField` đó là: việc truy cập với một `const val` được `inline` bởi compiler, trong khi đó `@JvmField` thì không. Hãy cùng xem ví dụ sau:

```kotlin
fun main(args: Array<String>) {  
  println(Constants.FOO)
}
```

Đây sẽ là cái chúng ta có khi sử dụng `@JvmField val FOO = Foo() `

```kotlin
public final class MainKt {  
   public static final void main(@NotNull String[] args) {
      Intrinsics.checkParameterIsNotNull(args, "args");
      Foo var1 = Constants.FOO;
      System.out.println(var1);
   }
}
```

và với `const val FOO = "foo"`

```kotlin
public final class MainKt {  
   public static final void main(@NotNull String[] args) {
      Intrinsics.checkParameterIsNotNull(args, "args");
      String var1 = "foo";
      System.out.println(var1);
   }
}
```

Không hề có lời gọi tới `Constants.FOO` trong ví dụ thứ hai, giá trị đã được inline.

## object

Ngoài ra còn một cách nữa để định nghĩa constans có thể truy cập toàn cục trong Kotlin mà cho kết quả giống như Java đó là sử dụng `object` như sau:

```kotlin
object Constants {
    const val Foo = "foo"
}
```

## Bỏ qua class và object

Nếu chúng ta chỉ cần lưu một tập các constants thì chúng ta có thể bỏ qua class và object rồi sử dụng `val`

```kotlin
const val FOO = "foo"
```

Kết quả deompiler chính xác như những gì bạn viết bằng Java

```kotlin
public final class ConstantsKt {  
   @NotNull
   public static final String FOO = "foo";
}
```

Trong Kotlin, bạn có thể truy cập giá trị bằng tên toàn cục. Nếu bạn đang sử dụng giá trị trong code Java thì bạn hãy gọi `ConstantsKt.FOO`. Để tránh hậu tố `kt` ở tên class, hãy dùng annotation `file:@JvmName` trên đầu file để định nghĩa một các tên dễ đọc hơn:

```kotlin
@file:JvmName("Constants")
```

Compier sẽ sinh ra giá trị cho tên class đó

```kotlin
public final class Constants {  
   @NotNull
   public static final String FOO = "foo";
}
```

# Kết luận

Dù cho không có từ khoá `static` trong Kotlin nhưng vẫn rất dễ để định nghĩa các constant có thể truy cập toàn cục. Và cũng rất dễ để chúng ta bị sai và sinh ra các method và object thừa. Công cụ decompiler  giúp bạn có thể xác định và sửa những vấn đề kiểu như này, và hơn nữa là bạn có thể nhanh chóng học được những điều tuyệt vời mà Kotlin làm phía sau.

# Nguồn
Where Should I Keep My Constants in Kotlin?

https://blog.egorand.me/where-do-i-put-my-constants-in-kotlin/