Việc sử dụng nhiều modules trong một project Android cho phép chúng ta chia nhỏ được source code vào các components hợp lý. Nó cũng giúp tăng tốc quá trình build và module hóa source code.
Nhưng có một vấn đề với việc sử dụng nhiều modules trong project đó là sẽ phải viết rất nhiều cấu hình dài dòng. Bài viết này sẽ giới thiệu cho các bạn cách chia sẻ cấu hình chung giữa các library nhằm giảm cấu hình Gradle thừa thãi.

Tôi đã áp dụng cách này vào dự án ShoppingApp của tôi và kết quả là xóa được 90 dòng code trên 7 thư viện modules.
![](https://images.viblo.asia/f0366da1-207d-4836-a12d-dd268c76d60a.png)

### apply from: “____.gradle”

Bạn có thể thêm nội dung của một file Gradle khác vào trong file gradle hiện tại bằng cách sử dụng "apply from:" và chỉ định đến file mà bạn muốn sử dụng.
```
apply from: "$rootProject.projectDir/android-library.gradle"
```

### $rootProject.projectDir

Modules có thể tồn tại trong các cấu trúc thư mục khác nhau, vì vậy bằng cách tận dụng thuộc tính `$rootProject.projectDir`, chúng ta có thể chỉ định các đường dẫn dựa trên thư mục gốc của dự án.

### Original Library Module build.gradle
```
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

android {
    compileSdkVersion Versions.compile_sdk

    defaultConfig {
        minSdkVersion Versions.min_sdk
        targetSdkVersion Versions.target_sdk
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    implementation project(Modules.models)
    implementation Libs.kotlin_std_lib
}
```

### build.gradle sau khi sử dụng file chia sẻ
```
apply from: "$rootProject.projectDir/android-library.gradle"

dependencies {
    implementation project(Modules.models)
    implementation Libs.kotlin_std_lib
}
```

### File Gradle chung

```
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

android {
    compileSdkVersion Versions.compile_sdk

    defaultConfig {
        minSdkVersion Versions.min_sdk
        targetSdkVersion Versions.target_sdk
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
}
```

### Nếu bạn làm công việc nào đó quá 3 lần, hãy tổng quát hóa và sử dụng lại
Bất cứ khi nào có thể và có ý nghĩa, sử dụng cấu hình chung để giảm việc lặp những đoạn code dài dòng. Rule này cũng được áp dụng khi viết code hoặc viết file Gradle. 
Chúc các bạn thành công.

[Tham khảo](https://handstandsam.com/2019/03/12/sharing-gradle-configuration-in-multi-module-android-projects/)