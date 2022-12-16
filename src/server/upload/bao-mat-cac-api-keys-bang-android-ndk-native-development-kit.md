# Giới thiệu
![](https://images.viblo.asia/116db3ba-5abc-4f32-8b2c-2313367bfe92.png)
Nếu bạn đang đọc bài viết này thì bạn hẳn là một Android developer hoặc bạn sẽ trở thành một Android developer trong tương lai. Là Android developer, chúng ta tạo các ứng dụng Android và sử dụng một số thư viện của bên thứ ba (công cụ SDK) vì chúng ta không thể tự phát triển mọi thứ.

Có thể bạn phải sử dụng dịch vụ Google maps hoặc bất kỳ dịch vụ Google play nào. Hầu hết các dịch vụ này đều được thanh toán và nó trở thành một nhiệm vụ quan trọng để bảo mật các khóa API của các thư viện này trong mã ứng dụng của chúng ta. Một số bạn có thể đã sử dụng cách tiếp cận XML hoặc lớp để bảo mật các khóa API nhưng chúng có thể dễ dàng bị lộ bởi kỹ thuật đảo ngược.
> If you reveal your secrets to the wind, you should not blame the wind for revealing them to the trees. 

Vì vậy, trong bài viết này, chúng ta sẽ tìm hiểu cách bảo mật các khóa API bằng Android Native Development Kit. Để dễ hiểu hơn, tôi đã chia toàn bộ blog thành các chủ đề sau:

* Vấn đề hiện tại
* Giải pháp đề xuất
* Làm thế nào để làm điều này trong Android? (ba cách)
* Lưu ý kết thúc

Ngay cả sau khi sử dụng phương pháp NDK của Android để bảo mật các khóa API, bằng cách thực hiện kỹ thuật đảo ngược, bạn vẫn có thể lấy được các khóa API đó nhưng thực tế ở đây là chúng tôi chỉ tạo thêm các lớp để bảo mật các khóa API vì có gì đó tốt hơn không có gì và chúng ta có mọi thứ ;) Vì vậy, hãy bắt đầu.

Bài viết được sử dụng nguồn từ : https://blog.mindorks.com/securing-api-keys-using-android-ndk

# Vấn đề hiện tại
Khi phát triển ứng dụng Android, chúng ta sử dụng các thư viện bên thứ ba khác nhau giúp phát triển ứng dụng của chúng tôi nhanh chóng. Trong các thư viện này, chúng tôi chỉ gọi một số chức năng theo nhu cầu của chúng tôi và chúng tôi không thể biết mã của các chức năng này và chúng tôi không quan tâm đến điều đó. Nhưng để gọi các hàm này, chúng ta cần các khóa API khác nhau cho những người dùng khác nhau. Một số thư viện này được thanh toán và nếu bằng cách nào đó, ai đó nhận được khóa API của bạn thì bạn có thể gặp phải các hóa đơn thanh toán cao và nhiều vấn đề khác. Trong những ngày bắt đầu phát triển Android, chúng tôi đặt các khóa API của mình trong tệp String.xml hoặc trong tệp gradle. Sau đây là một ví dụ về việc lưu trữ khóa API trong tệp String.xml:

```kotlin
<resources>
    <string name="app_name">SecureAPI</string>
    <string name="MyAPIKey">YOU_AWESOME_API_KEY_HERE</string>
</resources>
```
Vấn đề với cách tiếp cận là bất kỳ ai cũng có thể lấy khóa API bằng kỹ thuật đảo ngược.

Một cách tiếp cận khác đã được sử dụng là cách tiếp cận tập tin **gradle**. Ở đây chúng tôi thêm khóa API trong tệp **gradle.properties**:
```kotlin
#gradle.properties file

#API Key
MyAwesomeKey = "YOUR_AWESOME_API_KEY_HERE"
```
Sau đó, nhập khóa API dưới dạng *buildConfigField* trong tệp **build.gradle**.
```kotlin
buildTypes {
    debug {
        buildConfigField 'String', "ApiKey", MyAwesomeKey
        resValue 'string', "api_key", MyAwesomeKey
    }
    ...
}
```
Nhưng vẫn có ai có thể lấy khóa API bằng cách thiết kế ngược mã của bạn.

Vì vậy, cả hai phương pháp đều thất bại trong việc bảo mật các khóa API. Chúng ta cần một phương thức cụ thể nhất định có thể được sử dụng để ngay cả sau khi thiết kế ngược mã, không ai có thể nhận được khóa API mong muốn. Hãy cùng tìm một giải pháp.
# Giải pháp đề xuất
Chúng ta đã thảo luận vấn đề trong phần trước. Vậy, chúng ta nên làm gì để ngay cả sau khi kỹ thuật đảo ngược không ai có thể lấy khóa API?

Một giải pháp cho vấn đề trên có thể là việc sử dụng native language trong code của chúng ta. Trong các native languages như C, C ++ hoặc Android Native Development Kit(NDK) sẽ biên dịch mã thành tệp **.so**. Lợi ích với tệp **.so** này là nó chứa các số nhị phân, tức là ở dạng 0 và 1. Vì vậy, ngay cả sau khi kỹ thuật đảo ngược, bạn sẽ nhận được 0 và 1 và rất khó để xác định những gì được viết dưới dạng 0 và 1.

Không còn nghi ngờ gì nữa, có nhiều phương pháp để lấy mã từ 0 và 1, nhưng như tôi đã nói trước đó, chúng ta chỉ cung cấp một số lớp bảo mật bổ sung cho mã của chúng ta.
# Làm thế nào để làm điều này trong Android? (ba cách)
Trong Android, chúng ta có sự hỗ trợ của các native languages với sự trợ giúp của Android Native Development Kit (NDK). Ngoài ra, có JNI (Java Native Interface) trong Android. JNI định nghĩa một cách cho mã byte được tạo từ mã Java hoặc mã Kotlin để tương tác với mã gốc, tức là mã được viết bằng C hoặc C ++.

Vì vậy, với sự trợ giúp của Android NDK, chúng tôi có thể bảo mật các khóa API. Dựa trên các phiên bản của Android Studio, chúng tôi có ba cách tiếp cận để bảo mật các khóa API của mình:

1. Sử dụng mẫu C ++ gốc
2. Sử dụng CMake
3. Sử dụng ndk-build

Nhưng trước khi chuyển sang các phương pháp này, có một số điều kiện tiên quyết.
## Điều kiện tiên quyết
Trong blog này, bạn sẽ học ba cách khác nhau để bảo mật các khóa API bằng cách sử dụng NDK của Android. Vì vậy, trước khi chuyển sang đó, bạn phải tải xuống một số công cụ. Thực hiện theo các bước dưới đây:

1. rong Studio Android của bạn, nhấp vào  **Tools > SDK Manager > SDK Tools.**
2. Chọn *LLBD*, *NDK* và *CMake*.
3. Nhấp vào **Apply** và sau khi tải xuống và cài đặt, nhấp vào **OK**.
![](https://images.viblo.asia/d2222eab-a746-4de6-8b8c-76c2a6ddee3d.jpg)

**LLBD**: Nó được Android Studio sử dụng để gỡ lỗi mã gốc có trong dự án của bạn.

**NDK**: Bộ phát triển bản địa (NDK) được sử dụng để viết mã bằng C và C ++, tức là ngôn ngữ bản địa cho Android.

**CMake**: Đây là một hệ thống nguồn mở quản lý quá trình xây dựng trong một hệ điều hành và theo cách thức độc lập với trình biên dịch.

Bây giờ, chúng tôi đã thực hiện với việc tải xuống các công cụ, hãy nhanh chóng chuyển sang các phương pháp bảo mật các khóa API.
## Sử dụng mẫu C ++ gốc
Trong các phiên bản mới nhất của Android Studio, chúng tôi có hỗ trợ mã gốc, tức là cho C và C ++. Thực hiện theo các bước dưới đây để thêm Native C ++ trong dự án của bạn:

**Bước 1**: Tạo một dự án mới trong studio Android với **Native C++** template.
![](https://images.viblo.asia/56a7b8ee-329e-4955-a445-db0d4af2adab.jpg)

**Bước2**: Thêm chi tiết của dự án và nhấp vào Next.
![](https://images.viblo.asia/6f220ecc-42b0-49c6-ad81-c6b4e6c583a6.jpg)

**Bước 3**: Giữ các cài đặt về default và nhấp vào Finish.

**Bước 4**: Bạn có thể thấy rằng theo mặc định, bạn sẽ có tệp **native-lib.cpp** và tệp **CMakeLists.txt** được thêm vào dự án của bạn trong thư mục *cpp*.

![](https://images.viblo.asia/de749af1-0b01-4903-87a5-07935b352f82.png)

Tệp **native-lib.cpp** là tệp chứa các khóa API của bạn. Bạn có thể thêm các khóa API của mình trong tệp như dưới đây:
```C
#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_mindorks_myapplication_APIKeyLibrary_getAPIKey(JNIEnv* env, jobject /* this */) {
    std::string api_key = "YOUR_AWESOME_API_KEY_GOES_HERE";
    return env->NewStringUTF(api_key.c_str());
}
```
Sau đây là mô tả của mã trên:

* Tại đây, bạn phải tuân theo sự kết hợp của *PackageName_ActivityName_MethodName*.
* Trong ví dụ trên, com_mindork_myapplication là tên gói, APIKeyLibrary là tên tệp và getAPIKey là phương thức được sử dụng để lấy các khóa API từ mã gốc.
* Bạn có thể trực tiếp trả lại khóa API nhưng thông thường mọi người sử dụng một số kỹ thuật mã hóa để mã hóa khóa API. Vì vậy, method *NewStringUTF()* được sử dụng để thực hiện mã hóa UTF-8.

**Bước 5**: Bây giờ, để sử dụng khóa API của bạn trong Activity hoặc trong bất kỳ tệp nào, hãy chuyển đến Activity hoặc tệp mà bạn muốn sử dụng các khóa API của mình. Để tải native code mà bạn đã viết, bạn cần gọi phương thức *System.loadLibrary(“native-lib”)* trong khối init.
```kotlin
init {
        System.loadLibrary("native-lib")
}
```
**Bước 6**: Bây giờ, khai báo một hàm ngoài Kotlin có cùng tên như được sử dụng trong mã gốc.

```kotlin
external fun getAPIKey(): String
```
**Bước 7**: Cuối cùng, bạn có thể lấy khóa API bằng cách gọi:
```kotlin
APIKeyL Library.getAPIKey ()
```
Đó là tất cả! Bạn đã bảo mật khóa API của mình :)

Nếu bạn đang có phiên bản Android Studio cũ hơn mà không có sự hỗ trợ của mẫu C ++ gốc. Vậy, bạn có thể sử dụng **CMake**. Sự khác biệt giữa hai cách tiếp cận này là trong cách tiếp cận CMake, bạn phải thêm các tệp theo cách thủ công trong khi ở cách tiếp cận trước đó, mọi thứ được thêm theo mặc định.
## Sử dụng CMake
Ngoài việc sử dụng mẫu C ++ gốc, chúng tôi có thể sử dụng CMake để bảo mật các khóa API, tức là chúng tôi có thể thêm các tệp theo cách thủ công vào dự án của mình.

> CMake is used to control the software compilation process using simple platform and compiler independent configuration files, and generate native makefiles and workspaces that can be used in the compiler environment of your choice.

Sau đây là các bước có thể được theo dõi để bảo mật các khóa API bằng CMake:

**Bước 1**: Cài đặt các công cụ cần thiết được đề cập trong phần tiên quyết của blog này.

**Bước2**: Trong thư mục **app/src/main**, tạo một thư mục có tên **cpp**.

**Bước 3**: Trong thư mục cpp, tạo một tệp native nơi bạn muốn lưu trữ các khóa API của mình. Vì vậy, hãy tạo một tệp có tên **api-keys.cpp** và thêm mã dưới đây:
```C
#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_mindorks_myapplication_APIKeyLibrary_getAPIKey(JNIEnv* env, jobject /* this */) {
    std::string api_key = "YOUR_AWESOME_API_KEY_GOES_HERE";
    return env->NewStringUTF(api_key.c_str());
}
```
**Bước 4**: Trong **app**/ directory, của bạn, bạn cần thêm một tệp văn bản có tên là tệp **CMakeLists.txt**. Nó là một CMake build script. Thêm nội dung dưới đây vào nó:
```
# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

# Creates and names a library, sets it as either STATIC
# or SHARED, and provides the relative paths to its source code.
# You can define multiple libraries, and CMake builds them for you.
# Gradle automatically packages shared libraries with your APK.

add_library( # Sets the name of the library.
api-keys

# Sets the library as a shared library.
        SHARED

# Provides a relative path to your source file(s).
src/main/cpp/api-keys.cpp )

# Searches for a specified prebuilt library and stores the path as a
# variable. Because CMake includes system libraries in the search path by
# default, you only need to specify the name of the public NDK library
# you want to add. CMake verifies that the library exists before
# completing its build.

find_library( # Sets the name of the path variable.
log-lib

# Specifies the name of the NDK library that
# you want CMake to locate.
        log )

# Specifies libraries CMake should link to your target library. You
# can link multiple libraries, such as libraries you define in this
# build script, prebuilt third-party libraries, or system libraries.

target_link_libraries( # Specifies the target library.
native-lib

# Links the target library to the log library
# included in the NDK.
        ${log-lib} )
```
**Bước 5**: Bây giờ, bạn phải chỉ định đường dẫn của tệp CMakeLists trong tệp **build.gradle**. Vì vậy, hãy thêm mã dưới đây vào tệp **build.gradle**:
```kotlin
android {
    ...
    defaultConfig {
        ...
    }
    buildTypes {
        ...
    }
    externalNativeBuild {
        cmake {
            path 'CMakeLists.txt'
        }
    }
}
```
Bây giờ, để truy cập các khóa API từ Hoạt động hoặc tệp của bạn, bạn có thể làm theo các bước tương tự (Bước 5, 6 và 7) như sau trong cách tiếp cận trước đó, tức là cách tiếp cận mẫu Native C ++ .

Nếu phiên bản Android Studio của bạn không có sự hỗ trợ của CMake thì bạn cũng có thể sử dụng NDK để bảo mật các khóa API của mình. Tại đây, bạn có thể sử dụng quy trình xây dựng ndk. Hãy để xem cách làm điều này.
## Sử dụng ndk-build
Để biên dịch mã gốc có trong dự án, Android Studio hỗ trợ *ndk-build*. Tại đây, bạn sẽ có tệp xây dựng **Android .mk** được *ndk-build* sử dụng.

Tệp **Android .mk** có trong **jni** /directory. Nó mô tả các nguồn và thư viện chia sẻ của bạn với hệ thống xây dựng. Mục đích cơ bản của tệp Android .mk là xác định các cài đặt trong toàn dự án không được xác định bởi hệ thống xây dựng hoặc bởi Application .mk hoặc bởi các biến môi trường. Ngoài ra, cú pháp của tệp Android .mk cho phép bạn nhóm các nguồn của mình thành các mô-đun.

Thực hiện theo các bước dưới đây để sử dụng ndk-build:

**Bước 1**: Trong **app/src/main**, tạo một thư mục có tên **jni**. Ở đây chúng tôi sẽ có các tệp .mk của chúng tôi và tệp native code.

**Bước 2**: Trong thư mục **jni** mà bạn đã tạo ở bước trước, hãy thêm một tệp có tên Android .mk và thêm các dòng mã dưới đây vào đó:
```
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := api-keys
LOCAL_SRC_FILES := api-keys.c

include $(BUILD_SHARED_LIBRARY)
```
Sau đây là mô tả của mã trên:

* Biến *LOCALPATH* cho biết vị trí của tệp nguồn. **my-dir** là một hàm macro được cung cấp bởi hệ thống xây dựng để trả về thư mục hiện tại.
* *CLEARVARS* được sử dụng để xóa nhiều biến LOCAL_XXX cho bạn như *LOCALMODULE, LOCALSRCFILES*, v.v. Nó không xóa rõ ràng *LOCALPATH*.
* Biến *LOCALMODULE* lưu trữ tên của mô-đun mà bạn muốn xây dựng. Tên mô-đun phải là duy nhất và bạn không nên sử dụng bất kỳ khoảng trống nào trong tên mô-đun.
* Biến *LOCALSRCFILES* chứa danh sách các tệp C hoặc C ++ có trong mô-đun.
* Biến *BUILDSHAREDLIBRARY* được sử dụng để liên kết mọi thứ lại với nhau. Nó quyết định những gì cần xây dựng, và làm thế nào để làm điều đó. Nó thu thập thông tin mà bạn đã xác định trong các biến LOCAL_XXX kể từ lần gần đây nhất bao gồm.

**Bước 3**: Trong thư mục **jni**, tạo một tệp khác có tên là tệp Application .mk và thêm mã dưới đây:
```
APP_ABI := all
```
Tệp Application .mk được sử dụng để chỉ định cài đặt toàn dự án cho ndk-build.

Biến APP_ABI được sử dụng để chỉ định ABI có mã nên được tạo bởi hệ thống xây dựng. Theo mặc định, hệ thống xây dựng tạo mã cho tất cả các ABI không được khấu hao.

**Bước 4**: Tệp cuối cùng được thêm vào trong thư mục **jni** là tệp mã gốc của bạn. Vì vậy, trong thư mục jni, thêm một tệp có tên **api-keys.c** và thêm mã dưới đây vào đó:
```kotlin
#include <jni.h>

//For first API key
JNIEXPORT jstring JNICALL
Java_com_mindorks_myapplication_APIKeyLibrary_getAPIKey(JNIEnv *env, jobject instance) {

    return (*env)->  NewStringUTF(env, "YOUR_AWESOME_API_GOES_HERE");

}
```
**Bước 5**: Sau khi thêm các tệp cần thiết vào thư mục jni của bạn, mục tiêu tiếp theo của chúng tôi là cung cấp đường dẫn của tệp Android .mk trong tệp build.gradle.
```kotlin
android {
    ...
    defaultConfig {
        ...
    }
    buildTypes {
        ...
    }
    externalNativeBuild {
        ndkBuild {
            path 'src/main/jni/Android.mk'
        }
    }
}
```
Bây giờ, để truy cập các khóa API từ Hoạt động hoặc tệp của bạn, bạn có thể làm theo các bước tương tự (Bước 5, 6 và 7) như sau trong cách tiếp cận trước đó, tức là cách tiếp cận mẫu NativeC ++.

# Kết luận
Trong blog này, chúng ta đã tìm hiểu cách bảo mật các khóa API của mình với sự trợ giúp của Android Native Development Kit. Chúng ta đã thấy ba phương thức thực hiện, tức là phương pháp build-ndk, phương thức CMake và phương pháp dễ nhất là sử dụng mẫu Native C++  trong dự án của chúng ta.