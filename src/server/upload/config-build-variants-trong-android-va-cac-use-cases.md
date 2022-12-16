# Giới thiệu

Mình đã từng giới thiệu tới các bạn cách config build trong android ở bài [Configure your build in Android
](https://viblo.asia/p/configure-your-build-in-android-GrLZDQoVlk0), hôm nay mình sẽ nói thêm về một dự án android thì nên có những build variant nào và các use case hay dùng với từng loại.

# Build variants = productFlavors x buildTypes

Một project android thường có config như sau

## buildTypes

Các loại bản build

### debug

```kotlin
        getByName("debug") {
            isDebuggable = true
            isMinifyEnabled = false
            isShrinkResources = false
            firebaseCrashlytics {
                mappingFileUploadEnabled = false
            }
            applicationIdSuffix = ".debug"
            signingConfig = signingConfigs.getByName("debug-key")
        }
```

Type `debug` dùng khi phát triển, có bật debug, tắt các quá trình tối ưu source để rút ngắn thời gian build trong quá trình làm task

### staging

```kotlin
        create("staging") {
            isDebuggable = true
            isMinifyEnabled = true
            isShrinkResources = true
            firebaseCrashlytics {
                mappingFileUploadEnabled = true
            }
            proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
            applicationIdSuffix = ".staging"
            signingConfig = signingConfigs.getByName("debug-key")
        }
```

Type `stagging`, có bật debug, bật tối ưu source như bản release. Mục đích tạo ra môi trường giống với release nhưng vẫn có thể debug và fix lỗi nếu có.

### release

```kotlin
        getByName("release") {
            isDebuggable = false
            isMinifyEnabled = true
            isShrinkResources = true
            firebaseCrashlytics {
                mappingFileUploadEnabled = true
            }
            proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release-key")
        }
```

Type `release`, tắt debug, bật tối ưu source. Mục đích đóng gói bản cuối cùng và phát hành tới end user.

## productFlavors

Các loại sản phẩm, có thể là sản phẩm đang develop hay là sản phẩm chính thống, bản free hay bản full, ...

### dev

```kotlin
        create("dev") {
            versionCode = 1
            versionName = "1.0.0"
            applicationIdSuffix = ".dev"
            resValue("string", "app_name", "Movie DB Dev")
            buildConfigField("boolean", "MOCK_DATA", "false")
        }
```

Flavor `dev` trỏ tới server phát triển nội bộ, server này có thể chứa các dữ liệu test.

### prd

```kotlin
        create("prd") {
            versionCode = 1
            versionName = "1.0.0"
            resValue("string", "app_name", "Movie DB")
            buildConfigField("boolean", "MOCK_DATA", "false")
        }
```

Flavor `prd` trỏ tới server production của dự án, server này chứa các thông tin thật quan trọng của service.

# Build Variants Use Cases

Từ config `buildTypes` và `productFlavors` ở trên chúng ta sẽ có các `buiol variants ` sau:

## devDebug

Variant được dev sử dụng chính trong quá trình phát triển dự án

## devStaging

Sử dụng variant này để build các bản test cho QA của dự án.  

Ngoài ra quá trình tối ưu source của bản release có thể gây lỗi nên bản staging cũng có config tương tự sẽ giúp chúng ta check được các lỗi này.

## devRelease

Ít dùng

## prdDebug

Variant được dev sử dụng khi muốn check lỗi xảy ra trên flavor prd.

## prdStaging

Ít dùng

## prdRelease

Sử dụng variant này để build sản phẩm cuối cùng để phát hành cho end user.

# Kết

Từ những kiến thức về build variants thì các bạn hãy chọn loại phù hợp mà mình cần trong quá trình làm dự án android nhé.

Các bạn có thể tham khảo thêm source tại https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/build.gradle.kts#L58

Nếu thấy bài viết có ích thì hãy upvote và star repo của mình nhé :D