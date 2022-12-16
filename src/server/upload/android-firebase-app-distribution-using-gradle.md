Phần tiếp theo trong seri ["Cải thiện code base cho android project"](https://viblo.asia/s/cai-thien-code-base-cho-android-project-24lJDzM8KPM), mình sẽ chia sẻ cho bạn cách *upload apk* tự động lên [firebase app distribution bằng gradle task](https://firebase.google.com/docs/app-distribution/android/distribute-gradle?authuser=1).

## Set up your Android project
### 1. Tạo Firebase project
Để thực hiện thêm `Firebase` vào *project android* của bạn khá đơn giản, chi tiết tất cả các bước bạn có tham khảo **3 step đầu tiên** từ [link chính chủ Firebase](https://firebase.google.com/docs/android/setup?authuser=1#console).

![Firebase Project console](https://images.viblo.asia/047f945c-e05b-4cb1-a543-a839a972847f.png)

Các điểm cần lưu ý:

1. `Package name` phải là *package name* chính xác (*case-sensitive*) của *project* của bạn, lưu ý thêm *prefix* hoặc *surfix* của các *flavor* nếu có khai báo. Nếu đăng kí sai, bạn chỉ có thể xoá *firebase project* và tạo lại vì không thể thay đổi sau khi đã đăng ký.
2. Nếu có nhiều *Flavor (develop, staging, product)* thì phải đăng kí đủ.
> Lưu ý: có thể các *flavor* chung 1 *firebase project* hoặc tách riêng từng *firebase project* tuỳ vào mục đích và yêu cầu của dự án.
3. Tải `google-services.json` *file* vào các thư mục *flavor* tương ứng (tham khảo các bước tiếp theo).
4. Nếu có nhiều *project/flavor*, từng bước phải chú ý *project/flavor* được chọn phải đúng với *project* đang *setup*.

Bước tiếp theo, chọn `Quality > App Distribution > Get Started` để *enable firebase app distribution*

![Get Started](https://images.viblo.asia/183efa74-88e6-44dd-a4e5-e3abb2e68695.png)

Sau cùng, tạo *group testers* chứa những *email* của *tester* sẽ được tham gia test dự án

![](https://images.viblo.asia/632e44f4-0c2d-4b57-9b7f-4006838ce7a4.png)


### 2. Thêm Firebase App Distribution Gradle plugin

Nếu bạn viết theo *Groovy*, [tham khảo chi tiết tại đây](https://firebase.google.com/docs/app-distribution/android/distribute-gradle?authuser=1#step_1_set_up_your_android_project). Mình sẽ hướng dẫn thêm phần `Kotlin DSL`.

1. Khai báo *dependency*.

```kotlin
// file buildSrc/Config.kt
object Versions {
    const val firebase_distribution_plugin = "2.0.1"
    ...
}
object ClassPaths {
    const val firebase_distribution_plugin = "com.google.firebase:firebase-appdistribution-gradle:${Versions.firebase_distribution_plugin}"
}

object Plugins {
    const val firebase_distribution = "com.google.firebase.appdistribution"
}
```
2. *File build.gradle level project*.
```kotlin
buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath(ClassPaths.android_gradle_plugin)
        classpath(ClassPaths.kotlin_gradle_plugin)
        classpath(ClassPaths.firebase_distribution_plugin)
    }
    ...
}
```
3. *File build.gradle level app (app/build.gradle.kts)*
```kotlin
plugins {
    id(Plugins.androidApp)
    id(Plugins.firebase_distribution)
    // other plugins
}
```
## Authenticate with Firebase
Để thực hiện *distribute firebase* tự động bạn cần cung cấp cơ chế *authenticate* cho *gradle task*. Có 3 cách:

[1. Sign in to your Google Account via the Gradle plugin](https://firebase.google.com/docs/app-distribution/android/distribute-gradle?authuser=1#authenticate_using_a_google_account)

[2. Use Firebase service account credentials](https://firebase.google.com/docs/app-distribution/android/distribute-gradle?authuser=1#authenticate_using_a_service_account)

[3. Sign in to Firebase using the Firebase CLI](https://firebase.google.com/docs/cli?authuser=1#sign-in-test-cli)

Trong 3 cách này thì cách số 1 bạn phải làm thủ công, cách số 3 mình sẽ để các bạn thử sức, mình sẽ chỉ cách số 2.

1. Trên [Google Cloud Platform console](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts), chọn *project* của bạn và tạo mới một *service account* (`CREATE SERVICE ACCOUNT` *button*).

![](https://images.viblo.asia/1d124ec7-376d-4115-bb40-31feab663550.png)

2. Chọn role là `Firebase App Distribution Admin`

![](https://images.viblo.asia/264a17bd-d60a-4034-a4e4-afd0096bdbd7.png)

3. Tạo một `private json key` và cất *key* này cẩn thận vì nó được cấp quyền ***admin*** có thể *access* được *App Distribution* trên *Firebase project* của bạn.

![](https://images.viblo.asia/dc603750-7d2b-4299-b653-697f06173bf2.png)

Ok, đến đây tạm xong bước chuẩn bị cho *authenticate* vào *firebase project*.

## Configure your distribution properties

### 1. Tạo task cho distribution

**NOTE:** Bước quan trọng là cần ẩn đi các thông tin mật tránh *leak* lên *github* hoặc nơi chứa *code*, thêm các dòng sau vào `.gitignore`
```
# ignore to upload keystore & private firebase key file
*.jks
androidsetup-private-key.json # private json key bạn tạo ở bước Authenticate with Firebase
```

1. Tạo thư mục `distribution`.
2. Tạo 1 `keystore` file chuẩn bị cho việc *build app* (Ex: `dev_keystore.jks`).
3. Tạo file `distribution.gradle.kts` để tạo các *task release* tương ứng.

```kotlin
tasks.register("distributeDevelopRelease", Exec::class) {
    workingDir = rootDir
    commandLine = "./gradlew assembleDevelopRelease appDistributionUploadDevelopRelease".split(" ")
}
// Add similar task for production, staging... if have
```
Các điểm lưu ý:
+ `distributeDevelopRelease` là tên *task*, tuỳ ý bạn đặt.
+ `assembleDevelopRelease` là *build apk command* với cú pháp `assemble[Flavor][BuildType]`, Ví dụ nếu bạn muốn *build* `staging debug` thì lệnh sẽ là `assembleStagingDebug`...
+ `appDistributionUploadDevelopRelease` là lệnh *upload apk* lên *firebase* với cú pháp tương tự `appDistributionUpload[Flavor][BuildType]`.
4. Tạo file `keystore.properties` để chứa thông tin liên quan đến *keystore*. File này bạn nên để như bên dưới và *upload* lên *git* chỉ lần đầu tiên. Sau đó, không nên *upload* phần thay đổi lên.

```yaml
# Make sure these below steps are finished:
# 1. Check keystore + private key in distribution folder
# 2. Fill correct these below info
# 3. Correct versionName and versionCode
# 4. Correct testers group that you want to share.
storeFile=../distribution/name_of_keystore.jks
storePassword=store_password
keyAlias=key_alias
keyPassword=key_password
```

Mỗi lần *build apk* chỉ cần thay đổi chính xác các thông tin nêu trên dưới *local* (không *upload* phần thay đổi này lên *git*). Ví dụ:
```yaml
storeFile=../distribution/dev_keystore.jks
storePassword=Aa@123456
keyAlias=AndroidSetup
keyPassword=Aa@123456
```

> Cấu trúc thư mục *distribution* của bạn sẽ như sau:
> - ProjectFolder
>   - app
>   - distribution
>     - dev_keystore.jks // ignore upload to github
>     - androidsetup-private-key.json  // ignore upload to github
>     - distribution.gradle.kts // contains task to upload
>     - keystore.properties // ignore upload change to github

5. Tạo thư mục flavor tương ứng. Ví dụ bạn có flavor là develop, staging, production thì sẽ tạo tương ứng 3 thư mục develop, staging, production. Mỗi thư mục sẽ chứa file `google-services.json`.
6. Tạo file release_notes.txt tương ứng ở mỗi thư mục. File này sẽ chứa tất cả các thay đổi so với version trước đó của bạn.
> Cấu trúc thư mục của bạn sẽ như sau:
> - ProjectFolder/app/src
>   - main
>   - develop 
>     - release_notes.txt 
>     - google-services.json

### 2. Signing config và register task

Sau khi tạo xong các *file* cần thiết, giờ là lúc *update signing config* và *register distribution task* vào *app/build.gradle.kts*.

```kotlin

import java.io.FileInputStream
import java.util.*
//...

// Load signing configs for release
val keystorePropertiesFile = rootProject.file("distribution/keystore.properties")
val keystoreProperties = Properties()
keystoreProperties.load(FileInputStream(keystorePropertiesFile))

android {
    compileSdkVersion(Versions.compile_sdk_version)
    // ...
    
    // Add release keystore info
    // ref: https://developer.android.com/studio/publish/app-signing#secure-shared-keystore
    signingConfigs {
        create("release") {
            storeFile = file(keystoreProperties["storeFile"] as Any)
            storePassword = keystoreProperties["storePassword"] as? String
            keyAlias = keystoreProperties["keyAlias"] as? String
            keyPassword = keystoreProperties["keyPassword"] as? String
        }
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android.txt"),
                file("proguard-rules.pro")
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }

    flavorDimensions("default")
    productFlavors {
        create("develop") {
            manifestPlaceholders = mapOf("applicationName" to "@string/app_name_dev")
            // setup release note and group of testers
            // ref: https://firebase.google.com/docs/app-distribution/android/distribute-gradle?authuser=1#step_3_configure_your_distribution_properties
            firebaseAppDistribution {
                appId = "1:578593782165:android:a7777d0c48a2b35aac5e9c" // firebase project appid, có thể xem trên firebase project hoặc mobilesdk_app_id key trong google-service.json
                releaseNotesFile = "app/src/develop/release_notes.txt" // release note của develop flavor
                groups = "my-testers" // Tester group của dự án 
                serviceCredentialsFile = "distribution/androidsetup-private-key.json" // file private key tạo ở bước 3.
            }
        }
        // other flavor
    }
}

```
## Test the distribution
Sau khi setup thành công, bạn có thể test việc upload apk lên firebase bằng lệnh dưới. `distributeDevelopRelease` là tên task bạn tạo ở trên 

```
./gradlew distributeDevelopRelease
```

## Summary

OK, như vậy là mình đã hướng dẫn các bạn `upload apk` tự động bằng `gradle task`. Hy vọng sẽ tăng một chút năng suất và chất lượng cho dự án bạn đang tham gia.

Tham khảo thêm:

- [Pull request](https://github.com/huunam1108/AndroidSetup/pull/5/commits/cb0da45940f9a47c863cfc472729c23a5f1c1a7e)
- [Tài liệu hướng dẫn](https://firebase.google.com/docs/app-distribution/android/distribute-gradle?authuser=1)