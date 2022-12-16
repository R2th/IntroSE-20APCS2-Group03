![](https://miro.medium.com/max/1667/1*F8aymrD8vHCfS5zDyDZN7g.jpeg)

Nếu bạn giống như hầu hết các nhà phát triển khác thích viết ứng dụng Android bằng ngôn ngữ lập trình **Kotlin**, sử dụng **Coroutine** để chạy **Blocking và Non-Blocking calls** và bạn đang cần một thư viện load ảnh cho ứng dụng của mình thì **Coil** (Coroutine Image Loader) chính là thứ bạn cần.

Thư viện này hoàn toàn được viết bằng **Kotlin** và rất nhẹ vì nó sử dụng các thư viện khác mà nhiều nhà phát triển Android đã implement trong các dự án của họ như **Coroutine**, **Okhttp**. **AndroidX**,...

# Các tính năng của Coil
Coil cung cấp một số lượng lớn các tính năng mà trong đó đáng chú ý là:
* **Tận dung các tính năng của Kotlin**: bao gồm extension functions, inline, lambda và sealed classes.
* **Nhẹ**: Coil có số dòng mã **ít hơn 8 lần** so với Glide và it hơn một chút so với Picasso
* **Drawable transformation**: Coil cho phép chúng ta sửa đổi dữ liệu pixel của hình ảnh trước khi có thể lấy được nó từ yêu cầu. Có bốn loại transformation là **blur**, **circle crop**, **greyscale** và **rounded corners**.
* **Suspended method**: Để có được drawable đồng bộ, sử dụngtreo.Coil.get
* **Disk caching**: giống như Picasso và Glide, Coil tải hình ảnh từ URL đã cho, thay đổi kích thước của nó và lưu vào **disk cache**. Điều này sẽ tăng kích thước của ** disk cache** nhưng nó sẽ tăng tốc độ xử lý.
* **Bitmap pool**: tương tự như Gilde, Coil có hỗ trợ bitmap pool - một kỹ thuật để sử dụng lại các đối tượng **Bitmap** một khi chúng không còn được sử dụng. Điều này có thể cải thiện đáng kể hiệu năng bộ nhớ (đặc biệt là trên các thiết bị từ Oreo trở về trước).

# Sử dụng Coil trong Android
Để sử dụng thư viện Coil trong ứng dụng Android của bạn, trước hết hãy thêm dòng sau vào tệp **build.gradle** trong thư mục **app**
```
implementation("io.coil-kt:coil:0.7.0")
```
Sau đó hãy tải xuống một số hình ảnh và hiển thị chúng trong **ImageView**.

## Tải xuống hình ảnh bằng extension functions
Coil cung cấp một extension function là **load** cho **ImageView**.
```
val requestDisposable : RequestDisposable = imageView.load("https://www.example.com/image.jpg")
```
Coil tự động tải xuống hình ảnh từ URL đã cho và hiển thị kết quả trên **ImageView**. Bạn có thể hủy hoặc xem yêu cầu tải xuống hình ảnh có hoàn thành hay không với interface [RequestDisposable](https://coil-kt.github.io/coil/api/coil-base/coil.request/-request-disposable/).
```
disposable.dispose()
```

Mặc định, mọi yêu cầu được khởi tạo với [các tùy chọn mặc định](https://coil-kt.github.io/coil/api/coil-base/coil/-default-request-options/) nhưng bạn cũng có thể tùy chỉnh yêu cầu với lambda.
```
imageView.load("https://www.example.com/image.jpg") { loadRequestBuilder : LoadRequestBuilder ->
    loadRequestBuilder.crossfade(true)
    loadRequestBuilder.scale(Scale.FIT)
    loadRequestBuilder.placeholder(R.drawable.my_place_holder)
    loadRequestBuilder.size(width = 250, height = 300)
    // and many more request options
}
```
Lưu ý: Yêu cầu sẽ tự động bị hủy nếu **ImageView** bị gỡ ra khỏi mà hình.

## Các kiểu dữ liệu được hỗ trợ
* String (mapped to a Uri)
* HttpUrl
* Uri (android.resource, content, file, http, and https schemes only)
* File
* Int (DrawableRes)
* Drawable
* Bitmap

## Tải xuống hình ảnh với Custom Target View
Bây giờ thay vì tải trực tiếp **drawable** vào **ImageView**, chúng ta sẽ tải kết quả vào một mục tiêu tùy chỉnh. Bằng cách này, chúng ta có thể truy cập được vào **drawable**.
```
val disposable: RequestDisposable = Coil.load("https://www.example.com/image.jpg") { loadRequestBuilder : LoadRequestBuilder -> 
    loadRequestBuilder.target(object : coil.target.Target {
         override fun onSuccess(result: Drawable) {
                    super.onSuccess(result)
                    // use the drawable maybe extract color from it etc.
                    imageView.setImageDrawable(result)
                }

         override fun onStart(placeholder: Drawable?) {
                    super.onStart(placeholder)
                }

         override fun onError(error: Drawable?) {
                    super.onError(error)
                }
    })
    // other request options
}
```
Lưu ý: Các phương thức **onStart** và **onError** là không bắt buộc.

## Thêm suspension để tải hình ảnh
Để lấy được hình ảnh và tạm dừng luồng hiện tại cho đến khi hoàn thành thao tác, sử dụng phương pháp sau.
```
class MyViewModel : ViewModel() {
   
    val coroutineContext = Dispatchers.IO + SupervisorJob()

    fun downloadImage(url : String) {
        viewModelScope(coroutineContext) { 
             val drawable = Coil.get(url) { 
                   // customize the request options
             }
             // send drawable back to activity or fragment
        }
    }

    fun cancelDownloading() {  
        coroutineContext.cancelChildren()
    }
}
```

## Drawable Transformation
```
imageView.load("https://www.example.com/image.jpg") { loadRequestBuilder : LoadRequestBuilder -> 
    loadRequestBuilder.transformations(
       CircleCropTransformation(),
       BlurTransformation(context = this@activity),  // requires context
       GrayscaleTransformation()
    )
}
```

## Lắng nghe các sự kiện khi tải ảnh
Bạn có thể thêm **listener** vào **LoadRequestBuilder** để lắng nghe sự kiện khi quá trình tải xuống hình ảnh bắt đầu, tải thành công, yêu cầu bị hủy và không tải được hình ảnh.
```
imageView.load("https://www.example.com/image.jpg") { loadRequestBuilder : LoadRequestBuilder -> 
     loadRequestBuilder.listener(object : Request.Listener {
                override fun onError(data: Any, throwable: Throwable) {
                    super.onError(data, throwable)
                    throwable.printStackTrace()
                }

                override fun onCancel(data: Any) {
                    super.onCancel(data)
                }

                override fun onStart(data: Any) {
                    super.onStart(data)
                }

                override fun onSuccess(data: Any, source: DataSource) {
                    super.onSuccess(data, source)
                }
            })
            // other request options
}
```

# Tài liệu tham khảo
* https://github.com/coil-kt/coil/
* https://coil-kt.github.io/coil/

Cảm ơn các bạn đã dành thời gian quý báu để đọc bài viết. Lần tới, tôi sẽ viết một bài viết khác về Coil với các tính năng nâng cao cũng như so sánh nó với các thư viện khác như Glide, Picasso,... Hy vọng các bạn hãy đón xem.