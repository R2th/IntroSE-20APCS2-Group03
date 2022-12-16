![](https://images.viblo.asia/4bcbe3c0-c6e1-4119-9700-006e5d41657b.png)
# Giới thiệu
Trong Google IO '19, Google đã ra mắt Jetpack Compose để tạo UI khai báo. Về cơ bản, UI khai báo có nghĩa là tạo UI bằng cách chỉ định một tập hợp các thành phần UI cụ thể mà chúng ta cần và để cấu trúc nó theo một cách nào đó.

Vì vậy, hãy thảo luận từng cái một về cách chúng ta có thể sử dụng jetpack compose.

Nguồn: https://blog.mindorks.com/using-jetpack-compose-to-build-ui-in-android
# Bước 01. Cài đặt
thêm google () vào tệp build.gradle của dự án
```rust:kotlin
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```
# Bước 02. App's Gradle
```go:kotlin
android {
    defaultConfig {
        ...
        minSdkVersion 21
    }

    buildFeatures {
        // Enables Jetpack Compose for this module
        compose true
    }
    ...

    // Set both the Java and Kotlin compilers to target Java 8.

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = "1.8"
    }
}
```
# Bước 03. Project's gradle file
```css:kotlin
dependencies {
    classpath 'com.android.tools.build:gradle:4.0.0-alpha01'
    classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.60-eap-25"}
```
# Bước 04. Cuối cùng, thêm Project dependency
```shell:kotlin
implementation "androidx.compose:compose-runtime:0.1.0-dev02"
implementation "androidx.ui:ui-core:0.1.0-dev02"
implementation "androidx.ui:ui-layout:0.1.0-dev02"
implementation "androidx.ui:ui-framework:0.1.0-dev02"
implementation "androidx.ui:ui-material:0.1.0-dev02"
implementation "androidx.ui:ui-foundation:0.1.0-dev02"
implementation "androidx.ui:ui-text:0.1.0-dev02"
implementation "androidx.ui:ui-tooling:0.1.0-dev02"
```
Bây giờ, chúng ta đã hoàn tất việc thiết lập project. Hãy xây dựng UI. Bây giờ, chúng ta sử dụng setContentView để tăng bố cục từ một tệp XML. Nhưng trong hướng dẫn này, chúng ta sẽ sử dụng Jetpack compose để thiết kế tệp bố cục.
# Bước 05. Trong Activity File
```swift:kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
        //your design 
    }
}
```
Bây giờ, chúng ta đặt design trong *setContent*. Ở đây chúng tôi gọi sử dụng **composable functions**. Hãy bắt đầu với Hello World.
```swift:kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text("Hello world!")
        }
    }
}
```
# Bước 06. Hãy thảo luận về cách tạo một composable function.
để tạo một *composable function*, chúng ta cần sử dụng chú thích **@Composable**.
```swift:kotlin
@Composable
fun helloWorld() {
    Text(text = "Hello World")
}
```
và gọi helloWorld () trong setContent {}

* Các Composable function chỉ có thể được gọi từ một Composable function khác.
# Bước 07. Hãy xác định một container.
Ở đây nếu chúng ta cần có một hành vi trong linearLayout với định hướng ở chế độ dọc. Ở đây, chúng tôi sử dụng Container,
```go:kotlin
Column {
    //the inside widgets
}
```
Điều này sẽ xếp các phần tử trong bố trí tuyến tính theo thứ tự dọc. Trong phần này, hãy thảo luận với một ví dụ về các button,
```go:kotlin
Column {
    Button(
        text = "This is Button 1",
        onClick = {
            //the click listeners
        },
        style = ContainedButtonStyle()
    )
    HeightSpacer(32.dp)
    Button(
        text = "This is Button 2",
        onClick = {
            //the click listeners
        },
        style = OutlinedButtonStyle()
    )
}
```
Ở đây, chúng ta thiết kế hai loại nút khác nhau

* ContainedButtonStyle () - điều này sẽ xây dựng một nút với đầy màu sắc trong nút thiết kế vật liệu.
* OutlinesButtonStyle () - cái này sẽ chỉ có một nút phác thảo với màu trắng được lấp đầy
# Kết quả
![](https://images.viblo.asia/c1d61a69-aa7a-4fed-aafc-26f532fcbcaa.png)

* chúng ta cũng có thể có TextButtonStyle () nơi chúng ta chỉ có văn bản trong nút.
Nếu chúng ta muốn thiết kế nguyên tắc thiết kế Vật liệu trong Android, chúng ta có thể sử dụng MaterialTheme ()
```javascript:kotlin
MaterialTheme {
    // Widgets 1
    // Widgets 2
    // Widgets 3
}
```
# Bước 08. Hãy thảo luận về cách tạo danh sách bằng Jetpack Compose
```swift:kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
        createListView()
    }
}
```
Ở đây, createListView là một composable function. Và trong đó, chúng tôi xác định các list items.
```swift:kotlin
@Composable
private fun createListView() {
    MaterialTheme {
        VerticalScroller {
            Column {
                (0..10).forEachIndexed { index, _ ->
                    createListItem(index)
                    Divider(color = Color.Blue, height = 1.dp)
                }
            }
        }

    }
}
```
Bây giờ, trong này, hãy thảo luận từng cái một.

* MaterialTheme - điều này sẽ xác định theme của view lấy từ material container
* VerticalScroller - Cơ bản, điều này giúp cuộn các list items
* Column - Nó tạo một cột để tạo và xếp chồng tất cả các mục trong listview theo chiều dọc. Trong đó, chúng tôi tạo 10item bằng cách sử dụng forEachIndexed và chúng tôi gọi hàm createListItem(index) là composable function để tạo các list items một cách cụ thể.
Bây giờ, createdListItem trông giống như
```swift:kotlin
@Composable
private fun createListItem(itemIndex: Int) {
        Padding(left = 8.dp, right = 8.dp, top = 8.dp, bottom = 8.dp) {
            FlexRow(crossAxisAlignment = CrossAxisAlignment.Center) {
                expanded(1.0f) {
                    Text("Item $itemIndex")
                }
                inflexible {
                    Button(
                        "Button $itemIndex",
                        style = ContainedButtonStyle(),
                        onClick = {
                            Toast.makeText(
                                this@MainActivity,
                                "Item name $itemIndex",
                                Toast.LENGTH_SHORT
                            ).show()
                        })

            }
        }
    }
}
```
Trong phần này, chúng tôi thêm chỉ định phần đệm với đơn vị 8dp từ tất cả các phần cuối bằng cách sử dụng Padding và sau đó chúng tôi tạo FlexRow.

* FlexRow giống như một cột nhưng trong đó, nó xếp các phần tử theo hướng nằm ngang.
* crossAxisAlocation ở đây chỉ định sự liên kết của children.
* expanded giống như trọng lượng và trong đó chúng tôi tạo ra một Text.
* inflexible giống như wrap_content và trong đó chúng ta tạo một Button trong mỗi item có click listener.
Bây giờ, hãy chạy ứng dụng và xem bản xem trước

![](https://images.viblo.asia/7133d76f-2937-4737-95f0-bc886bc92a13.png)
Chúng ta đã hoàn thành việc tạo một List trong Jetpack Compose.

# Ngoài lề
để tạo Alert Dialog chúng tôi sử dụng,
```go:kotlin
AlertDialog(
    onCloseRequest = {
       //closing request
    },
    title = {
        Text("Title of Alert Box")
    },
    text = {
        Text("Message of Alert Box")
    },
    confirmButton = {
        Button(
            text = "OK",
            onClick = {
                //click listeners request
            }
        )
    }
)
```
Ở đây, onCloseRequest giống như *setCancelable* và phần còn lại giống như điền dữ liệu.

* Để thiết kế một floating action button, chúng ta sử dụng
```go:kotlin
FloatingActionButton(
    icon = imageFromResource(resources, R.drawable.ic_add),
    color = //color,
    onClick = {
        // TODO click action
    }
)
```
* Để tạo một progress bar, chúng tôi sử dụng,
```kotlin 
CircularProgressIndicator() //a circular progress bar
```
và
```shell:kotlin
LinearProgressIndicator() //a horizontal progress bar
```
Để xem bản xem trước  composable function, chúng ta thực hiện bằng cách sử dụng,
```swift:kotlin
@Preview
@Composable
private fun helloWorld() {

}
```
bạn có thể thấy chúng ta đang sử dụng Preview annotation để kiểm tra xem trước các composable functions.

Đây là cách chúng ta có thể làm việc với Jetpack Compose. Để đọc thêm về nó, hãy thử https://developer.android.com/jetpack/compose.