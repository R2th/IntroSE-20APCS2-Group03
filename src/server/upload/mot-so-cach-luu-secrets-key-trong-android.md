Các ứng dụng android thường chứa rất nhiều secrets key liên quan đến các api hay thông tin publish app trên google play store. Việc lưu trữ thông tin các secrets key này khá quan trọng, nó đảm bảo cho ứng dụng được bảo mật. 
Một số cách lưu trữ secrets key 
* Lưu trữ trong file code 
* Lưu trữ trong file xml
* Lưu trong file code native libraries sử dụng NDK
* Lưu trữ trong env của máy . 
* Lưu trong file .properties
* Lưu trong thư mục .gradle
* ...

Còn một số cách để lưu trữ key nhưng trong bài viết này chỉ nêu một số cách trong tầm hiểu biết của tác giả. 

Chúng ta sẽ xem qua cách thực hiện và một số ưu và nhược điểm của từng cách trên. 
### Lưu secrets key trong file source code. 

Secrets key sẽ được lưu trong file `.java` hoặc `.kt` . Thông thường là dưới dạng biến constant và có thể được sử dụng trong bất cứ class nào . 
```
class ApiKey {
    companion object {
        val GOOGLE_API_KEY = "Nti4kWY-qRHTYq3dsbeip0P1tbGCzs2BAY163ManCAb"
    }
}
```
Cách làm này khá kém bảo mật, khi chúng ta decompile code từ project mặc dù code đã được mã hoá nhưng chúng ta vẫn có thể tìm thây ở đâu đó chỗi kí tự `Nti4kWY-qRHTYq3dsbeip0P1tbGCzs2BAY163ManCAb`. Hơn nữa key trong trường hợp này có thể phải đẩy lên repository của git và tất cả các thành viên trong team đều có thể thấy được key này. 

### Lưu trữ trong file .xml 

Secrets key được lưu trong file `.xml `như là string resource.
Như khi chúng ta tạo một project mới với template là Google maps Activity thì Android studio sẽ tự generate một file `google_maps_api.xml `để chứa key của google map api. Chúng ta có thể lưu trữ những secret keys khác trong file .xml tương tự như trong trường hợp này.
```
<resources>
    <!--
    TODO: Before you run your application, you need a Google Maps API key.

    To get one, follow this link, follow the directions and press "Create" at the end:

    https://console.developers.google.com/flows/enableapi?apiid=maps_android_backend&keyType=CLIENT_SIDE_ANDROID&r=4D:BB:A1:0D:27:EB:1B:46:7A:E5:14:A3:8E:8C:F4:38:38:7A:4D:90%3Bcom.example.nghican.myapplication

    You can also add your credentials to an existing key, using these values:

    Package name:
    4D:BB:A1:0D:27:EB:1B:46:7A:E5:14:A3:8E:8C:F4:38:38:7A:4D:90

    SHA-1 certificate fingerprint:
    4D:BB:A1:0D:27:EB:1B:46:7A:E5:14:A3:8E:8C:F4:38:38:7A:4D:90

    Alternatively, follow the directions here:
    https://developers.google.com/maps/documentation/android/start#get-key

    Once you have your key (it starts with "AIza"), replace the "google_maps_key"
    string in this file.
    -->
    <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">YOUR_KEY_HERE</string>
</resources>

```
Cách làm này có một bất tiện như việc truy xuất đến key phải thông qua Context của activity hoặc application và nó cũng khá kém bảo mật.

### Lưu trong file code native libraries sử dụng NDK

Secrets key được lưu trong file` .c` hoặc `.cpp`. Cần thêm NDK vào project để có thể load được keys.
Để thực hiện được chúng ta có thể sử dụng The Android Native Development Kit (NDK) hoặc `CMake`. Trong giới hạn bài viết này mình sẽ nói qua các lưu key với `CMake`.
* Việc đầu tiên chúng ta cần kiểm tra trên Android studio đã cài đặt CMake chưa. Nếu chưa chúng ta có thể cài đặt từ SDK Manager (Tools > Android > SDK Manager và lựa chọn cài đặt LLDB, CMake, NDK)
* Tạo thư mục cpp trong src/main (Tham khảo: https://developer.android.com/studio/projects/add-native-code)
* Thêm file `native-lib.cpp` là file c/c++ chứ keys, nó sẽ có nội dung như bên dưới

```
#include <jni.h>

extern "C" {

    JNIEXPORT jstring JNICALL
    Java_com_sample_secretkeys_MainActivity_getAPIKey(JNIEnv *env, jobject instance) {

        return env-> NewStringUTF("YOUR API KEY");
    }
}
```
* Tạo CMake build script CMakeLists.txt trong thư mục cpp

```
# Sets the minimum version of CMake required to build your native library.
# This ensures that a certain set of CMake features is available to
# your build.

cmake_minimum_required(VERSION 3.4.1)

# Specifies a library name, specifies whether the library is STATIC or
# SHARED, and provides relative paths to the source code. You can
# define multiple libraries by adding multiple add.library() commands,
# and CMake builds them for you. When you build your app, Gradle
# automatically packages shared libraries with your APK.

add_library( # Specifies the name of the library.
             native-lib

             # Sets the library as a shared library.
             SHARED

             # Provides a relative path to your source file(s).
             main/cpp/native-lib.cpp )
```
* Trong code java (Trong trường hợp này là MainActivity) cần khai báo 
```
static {
   System.loadLibrary("native-lib");
}
...
public native String getAPIKey();
...
```
*  Cuối cùng chúng ta có thể sử dụng hàm `getAPIKey() ` để load key từ file `.cpp`

Cách làm này được đánh giá có độ bảo mật cao và được khá nhiều lập trình viên sử dụng.
### Lưu trữ trong biến môi trường (env) của máy

Keys được lưu trữ như biến môi trường của máy, sử dụng System.getenv() để truy cập key từ file gradle.

Tuỳ thuộc vào os mà việc cài đặt biến môi trường sẽ khác nhau, trong bài viết này sẽ giới thiệu  việc cài đặt biến môi trường trên ubuntu và truy cập srecret keys từ  buld.gradle
* Trên ubuntu để kiểm tra các biến môi trường đã cài đặt có thể sử dụng câu lệnh `$ printenv`. Để lưu secret keys chúng ta tạo ra một file app-env có nội dung:

```
export API_KEY="Nti4kWY-qRHTYq3dsbeip0P1tbGCzs2BAY163ManCAb"
```
Sau đó chạy lệnh sau từ terminal 
```
$ source app-env
```
*  Bên trong file build.gradle module app có thể truy xuất được secret keys bằng cách sau 

```
def apiKey = System.getenv("API_KEY")
```
Để sử dụng key trong code Java/Kotlin hoặc xml cần tạo một buildConfigField và resValue từ apiKey đã lấy được từ biến môi trường ở trên

### Sử dụng file .properties

Keys được đặt trong file `.properties`  bên trong thư mục root của project và sử dụng build.gradle để load keys. Chúng ta sẽ cùng điểm qua một số bước để thực hiện việc này
* Việc đầu tiên cần làm đó là tạo một file .properties để chứa keys. Giả sử chúng ta tạo ra file secrets_key.properties để lưu secret keys có nội dung

```
api_key=Nti4kWY-qRHTYq3dsbeip0P1tbGCzs2BAY163ManCAb
```
*  Trong build.gralde module app sẽ tạo ra một hàm để load file secrets_key.properties và lấy api_key

```

def loadProperties(filename) {
    def keystorePropertiesFile = rootProject.file(filename)
    def keystoreProperties = new Properties()
    if (keystorePropertiesFile != null && keystorePropertiesFile.exists()) {
        keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
        return keystoreProperties
    }

    return null
}

.....
// Load file secrets_key.properties
def secrets = loadProperties("secrets_key.properties")
```
* Để sử dụng key trong code Java/Kotlin hoặc xml cần tạo một buildConfigField và resValue trong build.gradle

```
buildTypes {

        debug {
            signingConfig signingConfigs.debug
            buildConfigField("String", "API_KEY", "\"${secrets.api_key}\"")
            resValue("string", "api_key", "\"${secrets.api_key}\"")
        }
    }
```

*  Sử dụng 

```
val API_KEY = BuildConfig.API_KEY

...

<TextView
....
android:text="@string/api_key"
/>
```

Cách làm này cũng được đánh giá là một cách làm khá bảo mật, khi không muốn đẩy keys lên repo git có thể thêm file `.properties` vào `.gitignore`
### Kết luận
Việc lưu trữ keys còn rất nhiều giải pháp không được đề cập trong bài viết vì giới hạn hiểu biết của tác giả. Rất mong các bạn có thể góp ý và trao đổi để có thể tìm được một cách tối ưu nhất.