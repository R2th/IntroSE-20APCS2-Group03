## Config your output file name in Gradle Kotlin DSL
Thời gian qua mình có làm việc khá nhiều với [Gradle Kotlin DSL](https://gradle.org/kotlin/). Có lần, mình cần config output file name của file `.apk` sau khi build để hỗ trợ cho CI/CD. Nếu sử dụng Groovy thì Okie, câu chuyện cũng khá đơn giản, mọi người có thể tìm thấy [ở đây](https://stackoverflow.com/questions/28249036/app-release-apk-how-to-change-this-default-generated-apk-name). 

Nhưng với Gradle Kotlin DSL thì lại khác, mình cũng đã mất nữa buổi "chời ơi đất hởi" để tìm giải pháp cho vấn đề này. Cuối cùng mình tìm được [bài post này](https://stackoverflow.com/questions/50792428/how-to-access-variant-outputfilename-in-kotlin).

Sau đó mình cũng đã chỉnh sửa lại đôi chút để nó work được. Sẵn đây chia sẻ với anh em bạn dì...

#### `./app/build.gradle.kts`
```kotlin 
import com.android.build.gradle.api.ApplicationVariant
import com.android.build.gradle.api.BaseVariantOutput
import com.android.build.gradle.internal.api.BaseVariantOutputImpl
import java.text.SimpleDateFormat
import java.util.*

plugins {
    //...
}

android {
    compileSdkVersion(Android.targetSdk)

    defaultConfig {
        applicationId = Android.applicationId
        minSdkVersion(Android.minSdk)
        targetSdkVersion(Android.targetSdk)
        versionCode = Android.versionCode
        versionName = Android.versionName

        testInstrumentationRunner = AndroidJUnitRunner.runner
    }

    // Config your output file name
    applicationVariants.all(ApplicationVariantAction())
}

class ApplicationVariantAction : Action<ApplicationVariant> {
    override fun execute(variant: ApplicationVariant) {
        val fileName = createFileName(variant)
        variant.outputs.all(VariantOutputAction(fileName))
    }

    private fun createFileName(variant: ApplicationVariant): String {
        return "YourAppName" +
                "_${variant.name}" +
                "_verCode${Android.versionCode}" +
                "_${getDateTimeFormat()}.apk"
    }

    private fun getDateTimeFormat(): String {
        val simpleDateFormat = SimpleDateFormat("yyMdHms", Locale.US)
        return simpleDateFormat.format(Date())
    }

    class VariantOutputAction(
        private val fileName: String
    ) : Action<BaseVariantOutput> {
        override fun execute(output: BaseVariantOutput) {
            if (output is BaseVariantOutputImpl) {
                output.outputFileName = fileName
            }
        }
    }
}

dependencies {
    //...
}
```

- `applicationVariants`: Chứa tất cả thông tin về buildTypes, productFlavors, outputs, bla.bla...
- `variant.outputs`: Chứa thông tin về output file, bạn cần cast về `BaseVariantOutputImpl` thì mới change file name của nó được. 

Khi build App, thì `applicationVariants` sẽ gọi `execute()` của `ApplicationVariantAction`. Tiếp theo, `variant.outputs` sẽ gọi `execute()` của `VariantOutputAction`. 

Về file name, thì mình format `AppName_variantName_versionCode_DateTime.apk`. Mọi người có thể thay đổi tùy thích, xem function `createFileName()` nhé.


#### Đây là kết quả cuổi cùng, 
![](https://images.viblo.asia/48ce78ce-ef6b-45a7-9d13-6ccade4c8347.PNG)

Mọi người có thể xem full source demo của mình [ở đây](https://github.com/huuphuoc1396/AndroidCleanArchitecture). 

Hoặc `gist` cho nó gọn [Config your output file name in Gradle Kotlin DSL](https://gist.github.com/huuphuoc1396/1487f317f3001b78b77776391e084956)

Chúc mọi người thành công,


### Additional
Từ Gradle 6.5 và trở lên, bạn có thể sử dụng như bên dưới nhé, cho gọn gàn. Phía trên vì mục đích giải thích nên mình khai báo hơi cụ thể xíu. =)) (Thanks [Chú An](https://viblo.asia/u/NguyenHungAn) đã góp ý)
```kotlin
android {
    //...

    applicationVariants.all {
        val outputFileName = "YourAppName" +
                "_${name}" +
                "_verCode${Android.versionCode}" +
                "_${SimpleDateFormat("yyMdHms", Locale.US).format(Date())}.apk"
        outputs.all {
            val output = this as? BaseVariantOutputImpl
            output?.outputFileName = outputFileName
        }
    }
}
```

**Happy coding!!! **