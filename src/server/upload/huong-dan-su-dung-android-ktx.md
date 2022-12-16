Android KTX là một tập hợp các phần mở rộng Kotlin được bao gồm trong Android Jetpack và các thư viện Android khác. 
Phần mở rộng KTX cung cấp Kotlin ngắn gọn, dễ hiểu cho Jetpack, nền tảng Android và các API khác.

Để làm như vậy, các tiện ích mở rộng này tận dụng một số tính năng của ngôn ngữ Kotlin, bao gồm các tính năng sau:

* Chức năng mở rộng
* Thuộc tính mở rộng
* Lambdas
* Các thông số được đặt tên
* Giá trị mặc định của tham số
* Coroutines

Ví dụ: khi làm việc với SharedPreferences, bạn phải tạo một trình chỉnh sửa trước khi có thể thực hiện sửa đổi dữ liệu tùy chọn. 
Bạn cũng phải áp dụng hoặc cam kết những thay đổi đó khi hoàn tất chỉnh sửa, như được hiển thị trong ví dụ sau:

```
sharedPreferences
        .edit()  // create an Editor
        .putBoolean("key", value)
        .apply() // write to disk asynchronously
```

Kotlin lambdas hoàn toàn phù hợp cho trường hợp sử dụng này. 
Chúng cho phép bạn thực hiện một cách tiếp cận ngắn gọn hơn bằng cách chuyển một khối mã để thực thi sau khi trình chỉnh sửa được tạo, cho phép mã thực thi và sau đó cho phép API SharedPreferences áp dụng các thay đổi.

Đây là ví dụ về một trong những chức năng Android KTX Core, SharedPreferences.edit, bổ sung chức năng chỉnh sửa cho SharedPreferences.

Hàm này lấy cờ boolean tùy chọn làm tham số đầu tiên của nó cho biết có nên cam kết hoặc áp dụng các thay đổi hay không. 
Nó cũng nhận được một hành động để thực hiện trên trình soạn thảo SharedPreferences dưới dạng lambda.

```
// SharedPreferences.edit extension function signature from Android KTX - Core
// inline fun SharedPreferences.edit(
//         commit: Boolean = false,
//         action: SharedPreferences.Editor.() -> Unit)

// Commit a new value asynchronously
sharedPreferences.edit { putBoolean("key", value) }

// Commit a new value synchronously
sharedPreferences.edit(commit = true) { putBoolean("key", value) }
```

Người gọi có thể chọn cam kết hoặc áp dụng các thay đổi. 
Bản thân action lambda là một hàm mở rộng ẩn danh trên SharedPreferences.Editor trả về Unit, như được chỉ ra bằng chữ ký của nó. 
Đây là lý do tại sao bên trong block code, bạn có thể thực hiện công việc trực tiếp trên SharedPreferences.Editor.

Cuối cùng, SharedPreferences.edit () chứa từ khóa nội tuyến. 
Từ khóa này cho trình biên dịch Kotlin biết rằng nó nên sao chép và dán mã bytecode đã biên dịch cho hàm mỗi khi hàm được sử dụng. 
Điều này giúp tránh tốn tài nguyên khởi tạo một lớp mới cho mọi hành động mỗi khi hàm này được gọi.

## Sử dụng Android KTX trong Project

Để sử dụng Android KTX trong Project, bạn thêm dependency sau trong **/build.gradle** :

```
repositories {
    google()
}
```

## AndroidX Modules

KTX Android được tổ chức thành các mô-đun, trong đó mỗi mô-đun chứa một hoặc nhiều packages.

Bạn phải thêm dependency cho từng phần mô-đun trong build.gradle của ứng dụng. 
Hãy nhớ thêm số phiên bản tương ứng vào. 
Bạn có thể tìm số phiên bản mới nhất trong phần tương ứng của mỗi hiện vật trong chủ đề này.

Android KTX chứa một **single core module** cung cấp phần mở rộng Kotlin cho các API chung và một số phần mở rộng dành riêng biệt.

Ngoại trừ core module, tất cả các tạo tác mô-đun KTX thay thế dependency  Java cơ bản trong tệp build.gradle của bạn. 
Ví dụ: bạn có thể thay thế  **androidx.fragment:fragment** bằng **androidx.fragment:fragment-ktx**. 
Cú pháp này giúp quản lý việc lập phiên bản tốt hơn và không thêm các yêu cầu khai báo phụ thuộc bổ sung.

## Core KTX

Mô-đun Core KTX cung cấp các phần mở rộng cho các thư viện phổ biến là một phần của khuôn khổ Android Framework. 
Các thư viện này không có các phụ thuộc dependencies Java mà bạn cần thêm vào build.gradle.

Để thêm mô-đun này, hãy thêm phần sau vào build.gradle của ứng dụng:

```
dependencies {
    implementation "androidx.core:core-ktx:1.3.2"
}
```

Dưới đây là danh sách các package có trong Core KTX module :

androidx.core.animation
androidx.core.content
androidx.core.content.res
androidx.core.database
androidx.core.database.sqlite
androidx.core.graphics
androidx.core.graphics.drawable
androidx.core.location
androidx.core.net
androidx.core.os
androidx.core.text
androidx.core.transition
androidx.core.util
androidx.core.view
androidx.core.widget

## Collection KTX

Các extension Collection  chứa các chức năng tiện ích để làm việc với các thư viện Collection tiết kiệm bộ nhớ của Android, bao gồm **ArrayMap, LongParseArray, LruCache** và các thư viện khác.

Để sử dụng mô-đun này, hãy thêm phần sau vào build.gradle của ứng dụng:

```
dependencies {
    implementation "androidx.collection:collection-ktx:1.1.0"
}
```

Extension Collection tận dụng tính năng nạp chồng toán tử của Kotlin để đơn giản hóa những thứ như nối Collection, như được minh họa trong ví dụ sau:

```
// Combine 2 ArraySets into 1.
val combinedArraySet = arraySetOf(1, 2, 3) + arraySetOf(4, 5, 6)

// Combine with numbers to create a new sets.
val newArraySet = combinedArraySet + 7 + 8
```

## Fragment KTX

Mô-đun Fragment KTX cung cấp một số phần mở rộng để đơn giản hóa Fragment API.

Để sử dụng mô-đun này, hãy thêm phần sau vào build.gradle của ứng dụng:

```
dependencies {
    implementation "androidx.fragment:fragment-ktx:1.2.5"
}
```

Với mô-đun Fragment KTX, bạn có thể đơn giản hóa fragment transaction với lambdas, ví dụ:

```
fragmentManager().commit {
   addToBackStack("...")
   setCustomAnimations(
           R.anim.enter_anim,
           R.anim.exit_anim)
   add(fragment, "...")
}
```

Bạn cũng có thể liên kết với ViewModel trong một dòng, bằng cách sử dụng thuộc tính viewModels và activityViewModels:

```
// Get a reference to the ViewModel scoped to this Fragment
val viewModel by viewModels<MyViewModel>()

// Get a reference to the ViewModel scoped to its Activity
val viewModel by activityViewModels<MyViewModel>()
```

## Lifecycle KTX

Lifecycle KTX định nghĩa một LifecycleScope cho mỗi đối tượng Lifecycle. 
Bất kỳ quy trình đăng ký nào được khởi chạy trong phạm vi này sẽ bị hủy khi Lifecycle bị phá hủy.

Bạn có thể truy cập CoroutineScope of the Lifecycle bằng cách sử dụng thuộc tính lifeecycle.coroutineScope hoặc lifeecycleOwner.lifecycleScope.

Để sử dụng mô-đun này, hãy thêm phần sau vào build.gradle của ứng dụng:

```
dependencies {
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.2.0"
}
```

Ví dụ sau minh họa cách sử dụng lifecycleOwner.lifecycleScope để tạo một TextView không đồng bộ được tính toán trước:

```
class MyFragment: Fragment() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewLifecycleOwner.lifecycleScope.launch {
            val params = TextViewCompat.getTextMetricsParams(textView)
            val precomputedText = withContext(Dispatchers.Default) {
                PrecomputedTextCompat.create(longTextContent, params)
            }
            TextViewCompat.setPrecomputedText(textView, precomputedText)
        }
    }
}
```

## LiveData KTX

Khi sử dụng LiveData, bạn có thể cần tính toán các giá trị một cách không đồng bộ.

Ví dụ: bạn có thể muốn truy xuất tùy chọn của người dùng và cung cấp chúng cho UI của bạn.

  Đối với những trường hợp này, LiveData KTX cung cấp hàm liveData builder, mà gọi hàm suspend  và cung cấp kết quả dưới dạng đối tượng LiveData.
  
  Để sử dụng mô-đun này, hãy thêm phần sau vào build.gradle của ứng dụng:
  
```
dependencies {
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.2.0"
}
```

Trong ví dụ sau, loadUser () là một hàm suspend được khai báo ở nơi khác. 
Bạn có thể sử dụng hàm liveData  builder để gọi loadUser() không đồng bộ, sau đó sử dụng emit() để đưa ra kết quả:

```
val user: LiveData<User> = liveData {
    val data = database.loadUser() // loadUser is a suspend function.
    emit(data)
}
```

## Kết luận

Như vậy, bài này mình đã hướng dẫn các bạn sử dụng Android KTX, là tập hợp các extension Kotlin.
Android KTX sẽ giúp cho code của bạn ngắn gọn, dễ hiểu và tiện sử dụng hơn.