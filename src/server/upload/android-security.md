Vấn đề an ninh trong Android luôn là sự nhức nhối của bất kỳ developer nào. Sau đây là 1 số cách để hack cũng như phòng chống cho các ứng dụng Android.

**1. Decode file apk**

Để có thể xem được nội dung của một apk, chúng ta cần 1 số chuẩn bị. Trước hết, cần một công cụ để giao tiếp với mobile device trên máy tính - [Android Debug Bridge](https://developer.android.com/studio/command-line/adb) chẳng hạn. Thứ 2, nếu muốn phân tách các tệp .apk của mình thành các file source code riêng biệt (các class .smali), [Apktool](https://ibotpeaches.github.io/Apktool/) dường như là sự lựa chọn hoàn hảo. Có thể bạn sẽ không biết file ".smali", sau đây là 1 chút giải thích: khi tạo một application code, file .apk sẽ chưa 1 file .dex với binary Dalvik bytecode ở bên trong, platform có thể hiểu được format này, nhưng ta không thể read hay edit. Và Apktool là công cụ để ta convert file .dex sang 1 định dạng khác mà con người có thể đọc được, phổ biến nhất hiện nay là định dạng Smali.

Đây là các bước:

Step 1: In tên của device package ( những app đã cài ) sử dụng Android Debug Bridge:

```
adb shell list packages -f
```

Đây là 1 ví dụ:

![](https://images.viblo.asia/8400f110-0277-4f5f-b1ef-e686e320aded.png)

Step 2: Chọn app và download nó sử dụng adb tool:

```
adb pull <package-name>/base.apk
```

Bước 3: Decompile apk sử dụng apktool:

```
apktool d -r base.apk
```

'd'-decode, '-r'- không decode resources

Bước 4: Mở file .smali và đọc source.

**2. Vấn đề với lưu trữ storage**

Hầu hết các dự án chúng ta giao tiếp Restful API, và cần 1 token để định danh. Sẽ rất nguy hiểm nếu bị lộ token này.
Đây là 1 ví dụ đơn giản khi code với token:

```java
class MainActivity : AppCompatActivity() {

    companion object {
        private const val SECRET_TOKEN = "jb&1a=U51-ng2="
    }

    private val superService by lazy {
        SuperService()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        connectToWebservice()
    }

    private fun connectToWebservice() {
        superService.connect(SECRET_TOKEN)
    }
}
```

Dùng thủ thuật trình bày ở mục 1, chúng ta có thể đọc đoạn code này, và hãy xem chúng ta có gì:

```java
.method private final connectToWebservice()V
    .locals 2

    .line 38
    invoke-direct {p0}, Ltech/skyrise/adriandefus/testsecurityapp/MainActivity;->getSuperService()Ltech/skyrise/adriandefus/testsecurityapp/SuperService;

    move-result-object v0

    const-string v1, "jb&1a=U51-ng2="

    invoke-virtual {v0, v1}, Ltech/skyrise/adriandefus/testsecurityapp/SuperService;->connect(Ljava/lang/String;)V

    return-void
.end method
```

Có thể dễ dàng nhận thấy giá trị của SECRET_TOKEN được gán ở dòng số 9. Rất dễ để hack phải không nào.

Ví dụ thứ 2, sẽ liên quan đến project build tool - Gradle. Trước hết, chung ta tạo một file keystore.properties trong thư mục project gốc. sẽ define giá trị của SECRET_TOKEN.

```java
SECRET_TOKEN = "jb&1a=U51-ng2="
```

Và chúng ta sẽ include file này trong build.gradle của app:

```java
android {

    (...)
    
    def keystorePropertiesFile = rootProject.file("keystore.properties")
    def keyStoreProperties = new Properties()
    keyStoreProperties.load(new FileInputStream(keystorePropertiesFile))
    
    defaultConfig {
    
        (...)

        buildConfigField("String", "SECRET_TOKEN", keyStoreProperties["SECRET_TOKEN"])
    }
}
```

Và cuối cùng, sử dụng class BuildConfig, bạn có thể obtain SECRET_TOKEN trong function connectToWebservice:

```java
private fun connectToWebservice() {
    superService.connect(BuildConfig.SECRET_TOKEN)
}
```

Lại sử dụng thủ thuật ở mục 1, chúng ta sẽ có kết quả sau:

```java
.method private final connectToWebservice()V
    .locals 2

    .line 38
    invoke-direct {p0}, Ltech/skyrise/adriandefus/testsecurityapp/MainActivity;->getSuperService()Ltech/skyrise/adriandefus/testsecurityapp/SuperService;

    move-result-object v0

    const-string v1, "jb&1a=U51-ng2="

    invoke-virtual {v0, v1}, Ltech/skyrise/adriandefus/testsecurityapp/SuperService;->connect(Ljava/lang/String;)V

    return-void
.end method
```

Vẫn dễ dàng thấy được token, buồn ghê. Có vẻ như nó đã được decode ở NDK layer.

Hãy thử giấu TOKEN dưới tầng NDK xem sao:

```java
class MainActivity : AppCompatActivity() {

    companion object {
        init {
            System.loadLibrary("native-lib")
        }
    }

    private external fun secretKey(): String

    private val superService by lazy {
        SuperService()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        connectToWebservice()
    }

    private fun connectToWebservice() {
        superService.connect(secretKey())
    }
}
```

Khi Activity được tạo, “native-lib” sẽ được load. Chúng ta có thể sử dụng external function getSecretKey() , return String với SECRET_TOKEN trực tiếp từ NDK layer.

```java
extern "C" JNIEXPORT jstring JNICALL
Java_tech_skyrise_adriandefus_testsecurityapp_MainActivity_secretKey(
        JNIEnv* env,
        jobject /* this */) {
    std::string appKey = "jb&1a=U51-ng2=";
    return env->NewStringUTF(appKey.c_str());
}
```

Và lại thử lại, sẽ không còn thấy được SECRET_TOKEN nữa:

```java
.method private final connectToWebservice()V
    .locals 2

    .line 42
    invoke-direct {p0}, Ltech/skyrise/adriandefus/testsecurityapp/MainActivity;->getSuperService()Ltech/skyrise/adriandefus/testsecurityapp/SuperService;

    move-result-object v0

    invoke-direct {p0}, Ltech/skyrise/adriandefus/testsecurityapp/MainActivity;->secretKey()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ltech/skyrise/adriandefus/testsecurityapp/SuperService;->connect(Ljava/lang/String;)V

    return-void
.end method
```

Nguồn: https://medium.com/skyrise/android-applications-security-part-1-2782d73771e0