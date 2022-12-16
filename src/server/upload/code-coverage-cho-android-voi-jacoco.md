Trong bài viết này, chúng ta sẽ tìm hiểu cách để tạo một test coverage report trong dự án Android bao gồm cả unit tests (thường được viết bằng **[JUnit](http://junit.org/)**, **[Mockito](http://mockito.org/)** và **[Robolectric](http://robolectric.org/)**) và instrumented test (thường được viết bằng **[Espresso](https://google.github.io/android-testing-support-library/docs/espresso/index.html)**).

### Tổng quan về coverage reports
Test coverage reports là một công cụ quan trọng để đo lường bao nhiêu test của chúng ta thực sự thực hiện với code. Mặc dù không đảm bảo rằng phần mềm không có lỗi, nhưng cho chúng ta thấy số phần trăm test bao phủ trong dự án.

Để tạo coverage report trong Android, chúng ta sử dụng **[Jacoco](http://eclemma.org/jacoco/)** (**Ja**va **Co**de **Co**verage), một trong những công cụ được sử dụng nhiều nhất trong Java với mục đích này. Nhưng môi trường phát triển Android có một kịch bản cụ thể, vì chúng ta có hai test artifacts khác nhau, thường được đại diện bởi hai thư mục **test** (unit) và **androidTest** (instrumented).

Trước tiên, hãy tạo coverage report của Espresso tests. Chẳng hạn, chúng ta có một Activity đơn giản:
```
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView text;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.button).setOnClickListener(this);
        findViewById(R.id.hide).setOnClickListener(this);
        text = (TextView) findViewById(R.id.text);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.button) {
            text.setText("Hello World!");
        } else {
            v.setVisibility(View.GONE);
        }
    }
}
```
Layout của nó là: 
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello" />

    <Button
        android:id="@+id/button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Click Me!" />

    <Button
        android:id="@+id/hide"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Don't Click Me!" />

</LinearLayout>
```

Bây giờ, hãy tạo một test Espresso để đảm bảo rằng text của TextView được thay đổi thành **Hello World!** khi click vào button:
```
@RunWith(AndroidJUnit4.class)
@LargeTest
public class MainActivityTest {

    @Rule
    public ActivityTestRule<MainActivity> rule = new ActivityTestRule<>(MainActivity.class);

    @Test
    public void shouldUpdateTextAfterButtonClick() {
        onView(withId(R.id.button)).perform(click());

        onView(withId(R.id.text)).check(matches(withText("Hello World!")));
    }
}
```
Sau khi thực hiện, report sẽ được tạo ra:

![](https://images.viblo.asia/3ba34374-1231-41ca-ad87-f5bc2d923214.png)

Tuy nhiên, coverage report chưa được tạo ra. Để enable tuỳ chọn này, chúng ta cần thêm một thuộc tính vào *debug*  build variant như sau:
```
android {
    ...
    buildTypes {
        debug {
            testCoverageEnabled true
        }
        ...
    }
}
```

Bây giờ chỉ cần run task **createDebugCoverageReport** để chạy các test và tạo report.

![](https://images.viblo.asia/89b14c3d-9f89-421b-8bd3-24f1aba57b94.png)

Tuyệt vời, chúng ta đã có coverage report!

Bây giờ, chúng ta hãy viết test sử dụng **Robolectric** để test các logic khác trong Activity.
Chẳng hạn, một test với Robolectric kiểm tra hành vi hide button, có khả năng thay đổi visibility khi click sẽ như sau:
```
@RunWith(RobolectricTestRunner.class)
@Config(constants = BuildConfig.class, sdk = 22)
public class MainActivityTest {

    @Test
    public void shouldHideButtonAfterClick() {
        MainActivity activity = Robolectric.setupActivity(MainActivity.class);

        Button button = (Button) activity.findViewById(R.id.hide);
        button.performClick();

        assertThat(button.getVisibility(), is(View.GONE));
    }
}
```

### Sử dụng Jacoco Coverage report unit test
Theo mặc định, Android plugin chỉ tạo coverage report từ instrumented tests. Để có thể tạo coverage cho unit test, chúng ta phải tự tạo một task bằng tay với Jacoco test.
Trước tiên, chúng ta thêm Jacoco version vào classpath dependencies cùng với Android plugin:
```
buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'
        classpath 'org.jacoco:org.jacoco.core:0.8.0'
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

Trong file **build.gradle** của app, ngay sau khi apply Jacoco plugin, chúng ta thiết lập version của nó đúng với version được thiết lập trong file build.gradle của root ở trên:
```
// app/build.gradle

apply plugin: 'com.android.application'
apply plugin: 'jacoco'

jacoco {
    toolVersion = '0.8.0'
}

tasks.withType(Test) {
    jacoco.includeNoLocationClasses = true
}

...
```

Bây giờ chúng ta có thể tạo task **jacocoTestReport** như sau:
```
task jacocoTestReport(type: JacocoReport, dependsOn: 'testDebugUnitTest') {

    reports {
        xml.enabled = true
        html.enabled = true
    }

    def fileFilter = ['**/R.class', '**/R$*.class', '**/BuildConfig.*', '**/Manifest*.*', '**/*Test*.*', 'android/**/*.*']
    def debugTree = fileTree(dir: "${buildDir}/intermediates/classes/debug", excludes: fileFilter)
    def mainSrc = "${project.projectDir}/src/main/java"

    sourceDirectories = files([mainSrc])
    classDirectories = files([debugTree])
    executionData = files("${buildDir}/jacoco/testDebugUnitTest.exec")
}
```

Kết quả tạo coverage report cho unit test sẽ như sau:

![](https://images.viblo.asia/6432ef05-502b-4bb1-b2ab-c52c0f753482.png)

Tuy nhiên, vẫn còn vấn đề: làm thế nào để kết hợp coverage results của 2 nhóm test trên.
Nguyên nhân chính là do Espresso tạo ra file **.ec**, trong khi unit test lại tạo ra **.exec**, 2 định dạng này là khác nhau.
Để tích hợp cả 2 định dạng này, chúng ta cần chỉnh sửa lại task, thêm file coverage.ec như một param của thuộc tính **executionData**:
```
task jacocoTestReport(type: JacocoReport, dependsOn: ['testDebugUnitTest', 'createDebugCoverageReport']) {

    reports {
        xml.enabled = true
        html.enabled = true
    }

    def fileFilter = ['**/R.class', '**/R$*.class', '**/BuildConfig.*', '**/Manifest*.*', '**/*Test*.*', 'android/**/*.*']
    def debugTree = fileTree(dir: "${buildDir}/intermediates/classes/debug", excludes: fileFilter)
    def mainSrc = "${project.projectDir}/src/main/java"

    sourceDirectories = files([mainSrc])
    classDirectories = files([debugTree])
    executionData = fileTree(dir: "$buildDir", includes: [
            "jacoco/testDebugUnitTest.exec", 
            "outputs/code-coverage/connected/*coverage.ec"
    ])
}
```
Cuối cùng khi thực hiện task:
```
gradle clean jacocoTestReport
```
Sẽ có kết quả:

![](https://images.viblo.asia/2d10ec14-857e-4f3b-a009-36e43585d84e.png)

### Áp dụng với Kotlin
Để enable coverage với Kotlin, chỉ cần một vài tinh chỉnh nhỏ - thay đổi location của source files và class files.
```
task jacocoTestReport(type: JacocoReport, dependsOn: ['testDebugUnitTest', 'createDebugCoverageReport']) {

    reports {
        xml.enabled = true
        html.enabled = true
    }

    def fileFilter = [ '**/R.class', '**/R$*.class', '**/BuildConfig.*', '**/Manifest*.*', '**/*Test*.*', 'android/**/*.*' ]
    def debugTree = fileTree(dir: "$project.buildDir/tmp/kotlin-classes/debug", excludes: fileFilter)
    def mainSrc = "$project.projectDir/src/main/kotlin"

    sourceDirectories = files([mainSrc])
    classDirectories = files([debugTree])
    executionData = fileTree(dir: project.buildDir, includes: [
            'jacoco/testDebugUnitTest.exec', 'outputs/code-coverage/connected/*coverage.ec'
    ])
}
```

Report cuối cùng cho Kotlin cũng hiển thị tương tự, nhưng khi liệt kê các class, các lambda được hiển thị như các class.

![](https://images.viblo.asia/a9c3ee4c-49c8-491d-be42-195b0d69a953.png)

![](https://images.viblo.asia/bb58346e-6920-4ab8-9b7d-f64aa8214692.png)