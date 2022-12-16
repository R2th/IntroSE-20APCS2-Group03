Theo mặc định, Android sẽ cố gắng load resources dựa trên Ngôn ngữ hệ thống được đặt trên điện thoại của người dùng. Do đó, nếu người dùng ngôn ngữ Tamil, Kavi, với thiết bị Android của tôi được đặt thành ngôn ngữ Tamil, mở ứng dụng Android của tôi trên điện thoại, tôi sẽ thấy một ứng dụng được bản địa hóa (transalte auto) sang ngôn ngữ của mình.

Nhưng điều gì sẽ xảy ra nếu một người dùng khác muốn sử dụng ngôn ngữ Tamil cho ứng dụng Android của mình trên Android có ngôn ngữ mặc định được đặt thành tiếng Anh?

Để giải quyết vấn đề này, chúng tôi sẽ phải cập nhật theo chương trình ngôn ngữ của ứng dụng Android của mình để ghi đè ngôn ngữ mặc định được đặt trong hệ thống của người dùng. Ở đây chúng tôi sẽ yêu cầu người dùng chọn ngôn ngữ và chỉ chuyển đổi ngôn ngữ trong ứng dụng.

Hãy bắt đầu với việc tạo file resource mới cho ngôn ngữ Tamil bằng trình hướng dẫn tạo resource file của Android Studio.
Đầu tiên, nhấp chuột phải vào thư mục res và chọn "New -> Android resource file": Nó sẽ hiển thị thông báo như tên tệp loại này là string.xml, và chọn tiêu chi của loại resource là "Locale"

![](https://images.viblo.asia/31e47a93-f31b-404f-be51-c15ae7a255e4.png)

Tại đây bạn sẽ chọn ngôn ngữ,

![](https://images.viblo.asia/7308fc48-34e0-48d3-b9fc-499658e92e9a.png)

Nó sẽ tạo ra file XML cho bạn sau đó bạn có thể đặt chuỗi string mẫu như bên dưới.
Dưới đây là string.xml mặc định dành cho ngôn ngữ là Tiếng Anh:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="title_greatings">Hello</string>
    //... other strings
</resources>
```

Tương tự, các bạn sẽ tạo ra 1 file string.xml mới dành cho ngôn ngữ Tamil:
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="title_greatings">வணக்கம்</string>
    //... other strings
</resources>
```

Vậy là xong, chúng ta đã cấu hình ngôn ngữ với nhiều file string tùy í theo ngôn ngữ mà chúng ta muốn.

Bây giờ, hãy tạo một lớp utility class ContextUtils để chứa các function cập nhật ngôn ngữ của chúng ta. Đặt cái này trong gói utils trên ứng dụng android, như sau:

```kotlin
class ContextUtils(base: Context) : ContextWrapper(base) {

    companion object {

        fun updateLocale(c: Context, localeToSwitchTo: Locale): ContextWrapper {
            var context = c
            val resources: Resources = context.resources
            val configuration: Configuration = resources.configuration
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                val localeList = LocaleList(localeToSwitchTo)
                LocaleList.setDefault(localeList)
                configuration.setLocales(localeList)
            } else {
                configuration.locale = localeToSwitchTo
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
                context = context.createConfigurationContext(configuration)
            } else {
                resources.updateConfiguration(configuration, resources.displayMetrics)
            }
            return ContextUtils(context)
        }
    }
}
```

Ở đoạn code trên,
- Filed(trường) *configuration.locale* đã bị [deprecated](https://developer.android.com/reference/android/content/res/Configuration#locale) từ API level 24 (Nougat) trở đi. Điều này đã được các nhà phát triển Android API đưa ra để làm cho các lập trình viên chuyển sang sử dụng getters và setters thay vì truy cập trực tiếp vào các biến.
- Đây là cách thiết lập ngôn ngữ được ưa thích (thay vì sử dụng trình truy cập trực tiếp hoặc setLocale (java.util.Locale)) bắt đầu từ API 24.
- Trước API 24, các nhà phát triển (developer) có thể truy cập trực tiếp vào trường configuration.locale để thay đổi nó theo ý muốn.

Sau đó, chúng ta có thể sử dụng phương thức (func) này để áp dụng các thay đổi ngôn ngữ.

Tiếp theo, Tạo BaseActivity extend từ AppCompatActivity và nó phải được kế thừa bởi các activities khác.

Chúng ta sẽ sử dụng phương thức ghi đè *attachBaseContext*  để cập nhật cấu hình ngôn ngữ thành ACTIVITY để nó sẽ phản ánh trên tất cả các activity khác được extended.

```kotlin
open class BaseActivity: AppCompatActivity() {

   override fun attachBaseContext(newBase: Context) {
// get chosen language from shread preference
    val localeToSwitchTo = PreferenceManager(newBase).getAppLanguage()
    val localeUpdatedContext: ContextWrapper = ContextUtils.updateLocale(newBase, localeToSwitchTo)
    super.attachBaseContext(localeUpdatedContext)
}

}
```


> **Question**: What is the use of AttachBaseContext?

> **Anwser**: Phương thức attachBaseContext của lớp ContextWrapper đảm bảo rằng context chỉ được attached một lần. ContextThemeWrapper áp dụng theme từ Application hoặc Activity được định nghĩa ở thẻ *android: theme* trong tệp AndroidManifest.xml. Vì cả Application và Service không cần theme, chúng kế thừa nó trực tiếp từ ContextWrapper. Trong quá trình tạo activity, Application và Service được khởi tạo, một đối tượng *ContextImpl*  mới được tạo mỗi lần và nó thực thi các chức năng trong *Context*.

Ví dụ:
**LanguageChooseActivity** → **MainActvity**

```kotlin
class LanguageActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_language)
        tamil_bt.setOnClickListener {
            PreferenceManager(this).updateLanguage("ta")
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        english_bt.setOnClickListener {
            PreferenceManager(this).updateLanguage("en")
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }
}
```

> Ở đây chúng ta lưu trữ bên trong SharedPreference một chuỗi chứa mã ngôn ngữ như tamil → “ta”, English → ”en”, Hindi → ”hi”, v.v.

> Mã này được sử dụng để xác định Ngôn ngữ bằng Ngôn ngữ ("ngôn ngữ-mã")

Sau khi áp dụng trong base activity thì ở bất cứ đâu các chuỗi string được sử dụng sẽ được dịch tự động.

Dưới đây là ví dụ 1 activity extend từ BaseActivity().
```kotlin
class MainActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

}
```

Chỉ cần extend BaseActivity là đủ và bạn sẽ thấy điều kỳ diệu. ;) 

Thanks for reading!

TÀI LIỆU THAM KHẢO:
- https://medium.com/swlh/android-app-specific-language-change-programmatically-using-kotlin-d650a5392220