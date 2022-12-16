Tiếp theo của [Phần 1](https://viblo.asia/p/data-privacy-cho-android-phan-1-Do754oG4lM6) chúng ta sẽ cùng tìm hiểu về các phương pháp còn lại trong việc bảo vệ dữ liệu cá nhân trong quá trình xây dựng ứng dụng Android:

* Chống chụp ảnh màn hình
* Mã hoá dữ liệu cá nhân
* Bảo vệ mã nguồn của ứng dụng
* Cài đặt bảo vệ sinh trắc học

## Chống chụp ảnh màn hình
Khi chúng ta đã đảm bảo rằng mọi thông tin **log** đã không được in ra khi chạy ứng dụng, các **cache** đã được xoá khi thoát ứng dụng. Nhưng nó vẫn có thể dễ dàng để cho người dùng chụp ảnh màn hình liên quan đến ứng dụng của chúng ta, điều này có thể dẫn đến những vi phạm bản quyền. Ví dụ như việc đọc một truyện tranh có bản quyền, người dùng cần xác nhận thông tin trước khi có thể mở được truyện đọc, nhưng tại đây người dùng vẫn có thể chụp ảnh màn hình cửa từng trang truyện và lưu lại. Nhằm hạn chế việc này, chúng ta có một phương án hiệu quả là chống chụp ảnh màn hình. Chúng ta có thể thêm đoạn code sau vào hàm **onCreate()** trong **Activity** của ứng dụng

```kotlin
window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
```

Đoạn mã trên sẽ báo đến hệ thống rằng cửa sổ ứng dụng của chúng ta có **FLAG_SECURE**, cái mà sẽ ngăn chặn việc chụp màn hình dù là cố tình hay vô tình.

Khi build và chạy ứng dụng trên máy thật, tại cửa sổ chương trình chúng ta cố gắng chụp ảnh màn hình sẽ nhìn thấy một tin nhắn dạng Toast có nội dung như sau **"Couldn't capture screenshot"** hay **"Can't take screenshot due to security policy"**, hoặc một **Toast** có nội dung tương tự.

## Mã hoá dữ liệu cá nhân
Với những thông tin cá nhân quan trọng khi được lưu trữ, hay những file báo cáo, thông tin của ứng dụng được gửi lên server chúng ta nên ưu tiên lựa chọn việc mã hoá thông tin của nó trước khi được lưu xuống bộ nhớ máy hay gửi đi.

Để làm việc này ta có thể sử dụng một thuật toán khá mạnh và phổ biến trong cộng đồng là **AES** (Advanced Encryption Standard). Thuật toán này có nhiều chế độ mã hoá khác nhau là **ECB, CBC, CFB, OFB, CTR** trong đó **CBC** (Cipher Block Channing) là chế độ bảo mật tốt và cũng khá dễ sử dụng.

Sau đây là cách sử dụng thuật toán này trong ứng dụng, đầu tiên ta khai báo thuật toán cần sử dụng, chế độ mã hoá, kiểu Padding là kiểu nào.
```kotlin
    private const val MODE = "AES/CBC/PKCS5Padding"
    private const val ALGORITHM = "AES"

    private fun cipher(opMode: Int, secretKey: String): Cipher {
        if (secretKey.length != 32) throw RuntimeException("SecretKey length is not 32 chars")
        val c = Cipher.getInstance(MODE)
        val sk = SecretKeySpec(secretKey.toByteArray(Charsets.UTF_8), ALGORITHM)
        val iv = IvParameterSpec(secretKey.substring(0, 16).toByteArray(Charsets.UTF_8))
        c.init(opMode, sk, iv)
        return c
    }
```
Ở đoạn code trên ta sử dụng thuật toán **AES** để mã hoá, chế độ mã hoá là **CBC**, kiểu Padding là "**PKCS5Padding**". Hàm "cipher" nhận 2 tham số:
* opMode: chế độ là mã hoá hay giãi mã
* secretKey: khoá dùng đễ mã hoá cũng như giải mã, khoá này phải sử dụng thống nhất trong cả 2 trường hợp mã hoá và giải mã, nếu không thì sẽ không thì  giải mã được thông tin đã mã hoá.

Tiếp theo ta tạo hai hàm **encrypt** để mã hoá và **decrypt** để giãi mã như bên dưới

```kotlin
    fun encrypt(strToEncrypt: String, secretKey: String = BuildConfig.AES_SECRET_KEY): String? {
        try {
            val encrypted = cipher(
                Cipher.ENCRYPT_MODE,
                secretKey
            ).doFinal(strToEncrypt.toByteArray(Charsets.UTF_8))
            return String(Base64.encode(encrypted, Base64.DEFAULT))
        } catch (e: Exception) {
            Timber.e(e)
        }

        return null
    }

    fun decrypt(strToDecrypt: String?, secretKey: String = BuildConfig.AES_SECRET_KEY): String? {
        try {
            val byteStr = Base64.decode(strToDecrypt?.toByteArray(Charsets.UTF_8), Base64.DEFAULT)
            val decrypted = String(cipher(Cipher.DECRYPT_MODE, secretKey).doFinal(byteStr))
            return decrypted
        } catch (e: Exception) {
            Timber.e(e)
        }

        return null
    }
```
* Hàm encrypt: nhận một chuỗi và key đã mã hoá
* Hàm decrypt: nhận chuỗi đã mã hoá và key để giải mã

Đễ mã hoá một chuỗi thông tin trong ứng dụng, chúng ta chỉ cần gọi như sau:
```kotlin
val textEncrypt = encrypt("String for encrypt", "password")
```

Với việc giải mã chỉ đơn giản gọi như sau
```kotlin
val textDecrypt = decrypt(textEncrypt, "password")
```
Chúng ta có thể thấy việc mã hoá khá đơn giản, nhưng nó sẽ giúp thông tin chúng ta được bảo mật hơn, tránh việc truy cập trái phép thông tin.

## Bảo vệ mã nguồn của ứng dụng
Khi build một ứng dụng thành file APK để phục vụ cho việc **release**, tại đây các mã nguồn của ứng dụng sẽ được đóng gói trong file **classes.dex**.
Việc này dẫn đến tính trạng là nếu ứng dụng chúng ta phân phối cho người dùng thì rất có thể mã nguồn của ứng dụng sẽ dễ dàng bị đọc trộm hoặc tái sử dụng cho mục đích khác. Điều này là hết sức nguy hiểm và dễ dẫn đến những vấn đề nghiêm trọng khi ứng dụng là những sản phẩm thương mại, có liên quan đến thông tin người dùng, thẻ tín dụng, tài khoản ngân hàng...

Nhằm hạn chế việc lộ mã nguồn, chúng ta có thể sủ dụng một phương pháp có sẵn là [ProGuard](https://www.guardsquare.com/en/products/proguard). Đây là một công cụ giúp cho việc tối ưu mã Java bytecode, nó giúp cho các ứng dụng Java và Android giảm đáng kể size khi có thể loại bỏ các biến và hàm không cần dùng đến trong ứng dụng. ProGuard được quảng cáo là làm giảm size của ứng dụng xuống 90% và hoạt động nhanh hơn 20%, nhưng chức năng hữu hiệu của nó còn ở việc có thể hạn chế đến mức thấp nhất việc "**reverse**" mã nguồn khi nó có thể làm xáo trộn tên của lớp, các biến và hàm đến mức rất khó hiểu để đọc và dịch ngược lại.

Để thực hiện việc này chúng ta cần chú ý đến 2 file sau:
1. File **build.gradle** của ứng dụng: để khai báo việc sử dụng proguard trong bản build nào debug hay release, các phương thức bảo vệ mã nguồn.
2. File **proguard-rules.pro**: khai báo các hàm, các lớp không cần phải ProGuard vì nó liên quan đến ứng dụng thứ 3, hoặc đầu vào của ứng dụng nếu ProGuard thì tên file hoặc lớp sẽ không tìm thấy đúng tên và ứng dụng không thể start.

Đầu tiên chúng ta cần phải xác định việc Proguard nằm trong bản build nào của ứng dụng debug hay release, và thường thì Proguard chỉ thực hiện cho việc release vì lúc này đã hoàn thành và sẵn sàng phân phối đến người sử dụng, sau đây là khai báo cho việc kích hoạt ProGuard cho bản build release từ file build.gradle
```kotlin
android {
    buildTypes {
        debug {
            testCoverageEnabled !project.hasProperty('android.injected.invoked.from.ide')
        }
        release {
            shrinkResources true
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```
Với khai báo trên chúng ta có thể thấy
* minifyEnabled: dùng để kích hoạt ProGuard, thực hiện việc loại bỏ code không sử dụng, đổi tên class, biến và hàm khi build
* shrinkResources: dùng để loại bỏ các resource không cần sử dụng khi build
* proguardFiles: để khai báo danh sách các lớp, biến, hàm  và thư viện không cần phải ProGuard

Tiếp đến, chúng ta sẽ khi báo các lớp, hàm, thư viện chúng ta nên bỏ qua không cần phải ProGuard để đảm bảo chương trình có thể hoạt động đúng. Dưới đây là một file mẫu cho việc bỏ qua việc ProGuard với các thư viện bên ngoài phạm vi ứng dụng của chúng ta

```java
# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Support libs
-keep class * implements android.support.v4.app.Fragment
-keep class * implements android.arch.lifecycle.ViewModel
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

-keep class android.support.v7.widget.** { *; }
-keep interface android.support.v7.widget.** { *; }
-keep class android.support.v4.app.** { *; }
-keep interface android.support.v4.app.** { *; }

-keep class android.support.test.espresso.IdlingResource { *; }
-keep class android.support.test.espresso.IdlingRegistry { *; }
-keep class com.google.common.base.Preconditions { *; }

-keep class android.arch.** { *; }
-keepclassmembers class android.arch.** { *; }
-keep class android.arch.** { *; }
-dontwarn android.arch.**

# Guava
-dontwarn javax.annotation.**
-dontwarn javax.inject.**
-dontwarn sun.misc.Unsafe

# Test
-ignorewarnings
-dontnote junit.framework.**
-dontnote junit.runner.**
-dontwarn android.test.**
-dontwarn android.support.test.**
-dontwarn org.junit.**
-dontwarn org.hamcrest.**
-dontwarn com.squareup.javawriter.JavaWriter
-dontwarn org.mockito.**

# Retrofit
-keepattributes Signature, InnerClasses, EnclosingMethod
-keepclassmembers,allowshrinking,allowobfuscation interface * {
    @retrofit2.http.* <methods>;
}
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn javax.annotation.**
-dontwarn kotlin.Unit
-dontwarn retrofit2.-KotlinExtensions

# Glide
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

# RxJava & RxAndroid
-keep class rx.schedulers.Schedulers {
    public static <methods>;
}
-keep class rx.schedulers.ImmediateScheduler {
    public <methods>;
}
-keep class rx.schedulers.TestScheduler {
    public <methods>;
}
-keep class rx.schedulers.Schedulers {
    public static ** test();
}
-keepclassmembers class rx.internal.util.unsafe.*ArrayQueue*Field* {
    long producerIndex;
    long consumerIndex;
}
-keepclassmembers class rx.internal.util.unsafe.BaseLinkedQueueProducerNodeRef {
    long producerNode;
    long consumerNode;
}
-keep class * extends io.reactivex.observers.DisposableObserver {
   *;
}

# Google Play Service
-keep public class com.google.android.gms.* { public *; }
-dontwarn com.google.android.gms.**
-keep class * extends java.util.ListResourceBundle {
    protected Object[][] getContents();
}

-keep public class com.google.android.gms.common.internal.safeparcel.SafeParcelable {
    public static final *** NULL;
}

-keepnames @com.google.android.gms.common.annotation.KeepName class *
-keepclassmembernames class * {
    @com.google.android.gms.common.annotation.KeepName *;
}

# Gson
-keepattributes Signature
-keepattributes *Annotation*
-keep class sun.misc.Unsafe { *; }
-dontwarn sun.misc.**
-keep class com.google.gson.examples.android.model.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer


# OkHttp3
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**
-dontnote okhttp3.**

# Okio
-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement

-keep interface org.parceler.Parcel
-keep @org.parceler.Parcel class * { *; }
-keep class **$$Parcelable { *; }

-dontwarn java.lang.invoke.*
-keepclassmembers class com.codepath.models** { <fields>; }

# Dagger 2
-dontwarn com.google.errorprone.annotations.*
-keep class * extends javax.inject.Provider
-keep class * implements javax.inject.Provider
-keep class dagger.** { *; }

-keepclassmembers,allowobfuscation class * {
    @javax.inject.* *;
    @dagger.* *;
    <init>();
}
-keep class **$$ModuleAdapter
-keep class **$$InjectAdapter
-keep class **$$StaticInjection
-keep class javax.inject.** { *; }
-dontwarn dagger.internal.codegen.**
-dontwarn dagger.producers.internal.**
-dontwarn dagger.shaded.auto.common.**

# LifecycleObserver's empty constructor is considered to be unused by proguard
-keepclassmembers class * implements android.arch.lifecycle.LifecycleObserver {
    <init>(...);
}
# ViewModel's empty constructor is considered to be unused by proguard
-keepclassmembers class * extends android.arch.lifecycle.ViewModel {
    <init>(...);
}
# Keep Lifecycle State and Event enums values
-keepclassmembers class android.arch.lifecycle.Lifecycle$State { *; }
-keepclassmembers class android.arch.lifecycle.Lifecycle$Event { *; }
-keepclassmembers class * {
    @android.arch.lifecycle.OnLifecycleEvent *;
}
-keepclassmembers class * implements android.arch.lifecycle.LifecycleObserver {
    <init>(...);
}
-keep class * implements android.arch.lifecycle.LifecycleObserver {
    <init>(...);
}
-keep class * implements android.arch.lifecycle.GeneratedAdapter {<init>(...);}

# Enum classes
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Logs
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** w(...);
    public static *** v(...);
    public static *** i(...);
}

## Fabric
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.Exception

-keep class com.crashlytics.** { *; }
-dontwarn com.crashlytics.**

-optimizations !class/merging/*
```

Như đã nói việc sử dụng ProGuard sẽ giúp hạn chế đến mức tối đa việc dịch ngược mã nguồn của ứng dụng, giúp hạn chế việc lộ mã nguồn hay đọc trộm các thông tin quan trọng. Chúng rất cần thiết cho việc build ứng dụng phân phối lên Google Play.

## Cài đặt bảo vệ sinh trắc học
Ứng dụng của chúng ta có thể được an toàn khi yêu cầu người dùng phải nhập mật khẩu trước khi mở một giao diện nào đó. Nhưng nó cũng sẽ tiềm ẩn rủi ro là mật khẩu của chúng ta vô tình bị đánh cấp bởi một người nào đó hoặc chính là các hackers.

Vì vậy, để bảo đảm rằng chỉ chính chúng ta không phải ai khác có thể truy cập được ứng dụng, các thiết bị điện thoại thông minh hiện nay đã hổ trợ các chứng thực bằng sinh trắc học.  Khuôn mặt, mống mắt hay dấu vân tay là những ví dụ điển hình. Chúng ta sẽ đi thiết lập việc chứng thực bằng sinh trắc học trên ứng dụng của chúng ta để đảm bảo rằng chỉ chính chúng ta mới có quyền truy cập vào ứng dụng mà không phải ai khác.

Đầu tiên tại phần **build.gradle** của ứng dụng, ta khai báo sử dụng thư viện **biometric**
```java
implementation 'androidx.biometric:biometric:1.0.1'
```

Kế tiếp, đế ngăn chặn việc crash chúng ta cần kiểm tra thiết bị có hổ trợ việc chứng thực dạng sinh trắc học hay không. Nếu không có thì nhắc nhở người dùng chọn một phương pháp khác thay thế như chứng thực dạng mật khẩu thông thường...
```java
        val biometricManager = BiometricManager.from(this)
        when (biometricManager.canAuthenticate()) {
            BiometricManager.BIOMETRIC_SUCCESS ->
                showAuthentication()
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE ->
                toast("Biometric features no support with current hardware.")
                //Use password authentication in this case
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE ->
                toast("Biometric features are currently unavailable.")
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED ->
                toast("Please associate a biometric credential with your account.")
            else ->
                toast("An unknown error occurred. Please check your Biometric settings")
        }
```
Nếu thiết bị có hổ trợ chứng thực sinh trắc học, chúng ta sẽ gọi hàm **showAuthentication()** để hiện thông tin chứng thực đến người dùng.

```java
    private fun showAuthentication() {
        val executor = Executors.newSingleThreadExecutor()
        biometricPrompt = BiometricPrompt(this, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationError(
                    errorCode: Int,
                    errString: CharSequence
                ) {
                    super.onAuthenticationError(errorCode, errString)
                    runOnUiThread {
                        toast("Authentication error: $errString")
                    }
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    runOnUiThread {
                        toast("Authentication failed")
                    }
                }

                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)

                    runOnUiThread {
                        toast("Authentication succeeded!")
                        showListPerson()
                    }
                }
            })

        promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric login for your app")
            .setSubtitle("Log in using your biometric credential")
            .setDeviceCredentialAllowed(true)
            .build()

        biometricPrompt.authenticate(promptInfo)
    }
```
Hàm này có tác dụng hiển thị giao diện chứng thực như bên dưới.
![](https://images.viblo.asia/fdb0e729-3994-4dab-86b0-37fd8209a18a.jpg)


Nếu người dùng chứng thực thành công thì sẽ gọi hàm **showListPersion()** đây là hàm hiển thị danh sách người dùng, ta có thể thấy qua hình mình hoạ bên dưới.

![](https://images.viblo.asia/da2541aa-98e2-4b0b-8957-bf9d924f6bd5.jpg)

Như chúng ta thấy việc sử dụng thư viện chứng thực dạng sinh trắc học khá đơn giản nhưng lại có tính bảo mật rất cao. Chúng ta nên ưu tiên lựa chọn cài đặt nếu ứng dụng của chúng ta cần xác thực trước khi có thể truy cập ứng dụng.

# Tham khảo
1. https://www.raywenderlich.com/6901838-data-privacy-for-android#toc-anchor-009
2. https://gist.github.com/jidolstar/9ca129d4f3e9632b12a820f0784eb353