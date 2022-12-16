Lý do tại sao phải sử dụng proguard cho các project đã có quá nhiều bài viết đã chia sẻ rồi nên mình xin phép sẽ không nhắc lại nữa.

Trong bài viết này mình sẽ hướng dẫn các bạn cấu hình proguard cho module library để mã hóa code khi export ra file `aar`


-----
### Xác định các thành phần sẽ chia sẻ
Khi bạn phát triển module library dĩ nhiên bạn sẽ cần bảo đảm tính chất bao đóng(OOP) cho các đối tương, phương thức, thuộc tính. Nên khi export module thành aar bạn cũng chỉ cần cung cấp cho người dùng những gì bạn đặt modifier là public hoặc protected


-----
### Cấu hình file proguard
bạn có thể tìm hiểu chi tiết về các cấu hình của proguard tại đây

https://www.guardsquare.com/en/products/proguard/manual/refcard

Dưới đây là những cấu hình mình hay sử dụng khi proguad library module
```
-optimizationpasses 5
-dontusemixedcaseclassnames
-repackageclasses ''
-allowaccessmodification
-dontskipnonpubliclibraryclasses
-dontskipnonpubliclibraryclassmembers
-dontpreverify
-verbose
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*,!code/allocation/variable
-keepparameternames
-renamesourcefileattribute SourceFile
-keepclassmembers,allowoptimization enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}
```
Đối với kotlin bạn có thể thêm
```
-dontwarn kotlin.**
-dontwarn kotlin.reflect.jvm.internal.**
```

Bây giờ chúng ta sẽ tiến hành cấu hình cho những class public/protected của mình(mặc định nếu bạn không cấu hình thì những class kể cả public thì bên ngoài cũng không thể truy cập được)

Trong module của mình có 2 class `Test` và `A` 
```
class Test {
    @Keep
    companion object {
        /**
         * Say hello to every body
         * @param name
         *@author BacNV
         * */
        @JvmStatic
        fun sayHello(name: String): String {
            return A.hello()
        }

        @JvmStatic
        fun getInstance(context: Context): Test {
            return Test()
        }
    }

    /**
     * Say hi to every body
     *@author BacNV
     * */
    fun sayHi(): String {
        goodMorning()
        return A().hi()
    }

    fun goodAfternoon(): String {
        return "Good afternoon"
    }

    private fun goodMorning() {
        Log.e(javaClass.name, "Good morning")
    }
}
```

**Note:** 
* đối với kotlin những method là static thì bạn phải thêm annotation `@JvmStatic` để các class java có thể gọi nó như 1 method static bình thường của java
* nếu bạn muốn giữ các method static khi build proguard bạn cần thêm annotation `@Keep`
```
class A{
    companion object {
        fun hello() = "AAAAAAAAAAAAA"
    }
    fun hi() = "bbbbbbbbbbbbbbbbb"
}
```
trong proguard mình sẽ cấu hình như sau
```
-keep class com.framgia.mylibrary.Test{
    static *** Companion;
    public static *** sayHello(...);
    public *** sayHi();
}
```
ở đây mình sẽ chỉ cấu hình để keep lại class Test và trong class test mình sẽ khai báo các phương thức hoặc thuộc tính mình muốn keep
**Note**: đối với kotlin bạn bắt buộc phải thêm `static *** Companion;` thì mới có thể truy xuất vào các method static được nhé


-----

### Enable proguard
mặc đinh proguard sẽ không được bật nên nếu proguard chưa được bật cho dù bạn đã cấu hình cho proguard như nào thì khi build ra aar thì code của bạn cũng vẫn hiển thị dưới dạng nguyên bản.

Để bật proguard các bạn vào build.gradle của module sau đó thêm vào root android:
```
buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
```

-----
### Thực thi
sau khi build ra `aar` và đưa vào trong project chúng ta sẽ nhìn thấy như sau
```
public final class Test {
   public static final Test.Companion Companion = new Test.Companion((DefaultConstructorMarker)null);

   @NotNull
   public final String sayHi() {
      this.a();
      return (new a()).a();
   }

   private final void a() {
      Log.e(this.getClass().getName(), "Good morning");
   }

   @JvmStatic
   @NotNull
   public static final String sayHello(@NotNull String name) {
      return Companion.sayHello(name);
   }

   @Metadata(
      mv = {1, 1, 11},
      bv = {1, 0, 2},
      k = 1,
      d1 = {"\u0000\u0014\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0002\b\u0002\n\u0002\u0010\u000e\n\u0002\b\u0002\b\u0087\u0003\u0018\u00002\u00020\u0001B\u0007\b\u0002¢\u0006\u0002\u0010\u0002J\u0010\u0010\u0003\u001a\u00020\u00042\u0006\u0010\u0005\u001a\u00020\u0004H\u0007¨\u0006\u0006"},
      d2 = {"Lcom/framgia/mylibrary/Test$Companion;", "", "()V", "sayHello", "", "name", "mylibrary_release"}
   )
   @Keep
   public static final class Companion {
      @JvmStatic
      @NotNull
      public final String sayHello(@NotNull String name) {
         Intrinsics.checkParameterIsNotNull(name, "name");
         return a.a.a();
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
bạn có thể thấy những class/method mà chúng ta không keep lại nó đã bị ẩn đi và không thể nhìn thấy được


-----
### Kết luận
Như vậy mình đã hướng dẫn các bạn có thể  sử dụng proguard để bảo vệ source code của mình, hi vọng các bạn có thể sử dụng nó linh hoạt trong các project của mình.