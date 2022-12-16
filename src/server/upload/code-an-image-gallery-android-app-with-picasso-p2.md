Ở [bài viết trước](https://viblo.asia/p/code-an-image-gallery-android-app-with-picasso-p1-V3m5WPYEKO7) mình đã giới thiệu các thông tin cơ bản và các tiện của thư viện load ảnh Picasso, hôm nay chúng ta sẽ cùng tìm hiểu làm sao để tạo ra một ứng dụng lưu trữ ảnh với Picasso nhé 
# 1. Khởi tạo adapter 
Ở đây, chúng ta sẽ sử dụng RecyclerView với dạng lưới để hiển thị danh sách các ảnh. Chúng ta cần tạo một adapter cho Recycleview.
```
class MainActivity : AppCompatActivity() {
 
    private lateinit var recyclerView: RecyclerView
    private lateinit var imageGalleryAdapter: ImageGalleryAdapter
 
    override fun onCreate(savedInstanceState: Bundle?) {
        //...
         
        val layoutManager = GridLayoutManager(this, 2)
        recyclerView = findViewById(R.id.rv_images)
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = layoutManager
        imageGalleryAdapter = ImageGalleryAdapter(this, SunsetPhoto.getSunsetPhotos())
    }
 
    override fun onStart() {
        super.onStart()
        recyclerView.adapter = imageGalleryAdapter
    }
    // ...
}
```

# 2. Khởi tạo activity
Tạo một activity mới và đặt tên là SunsetPhotoActivity. Chúng tôi có thêm đối tượng SunsetPhoto và chúng ta sẽ load ảnh trong hàm onStart () .
```
class SunsetPhotoActivity : AppCompatActivity() {
 
    companion object {
        const val EXTRA_SUNSET_PHOTO = "SunsetPhotoActivity.EXTRA_SUNSET_PHOTO"
    }
 
    private lateinit var imageView: ImageView
    private lateinit var sunsetPhoto: SunsetPhoto
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sunset_photo)
 
        sunsetPhoto = intent.getParcelableExtra(EXTRA_SUNSET_PHOTO)
        imageView = findViewById(R.id.image)
    }
 
    override fun onStart() {
        super.onStart()
 
        Picasso.get()
                .load(sunsetPhoto.url)
                .placeholder(R.drawable.placeholder)
                .error(R.drawable.error)
                .fit()
                .into(imageView)
    }
}
```
## Khởi tạo giao diện cho từng item
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
 
    <ImageView
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:adjustViewBounds="true"
            android:scaleType="fitCenter"
            android:layout_gravity="center"/>
</LinearLayout>
```
# 3. Cơ chế lưu trữ trong Picasso
Nếu bạn quan sát cẩn thận, bạn sẽ nhận thấy rằng khi bạn xem lại một hình ảnh đã được tải trước đó, nó sẽ tải nhanh hơn trước. Điều gì làm cho nó nhanh hơn? Đó là cơ chế lưu trữ của Picasso, đó là những gì.

Đây là những gì đang diễn ra nền. Sau khi hình ảnh được tải một lần từ internet, Picasso sẽ lưu nó vào bộ nhớ và trên đĩa, lưu các yêu cầu mạng lặp lại và cho phép truy xuất hình ảnh nhanh hơn. Khi cần hình ảnh đó một lần nữa, Picasso trước tiên sẽ kiểm tra xem hình ảnh có sẵn trong bộ nhớ hay không và nếu có, nó sẽ trả lại ngay lập tức. Nếu hình ảnh đó không có trong bộ nhớ, Picasso sẽ kiểm tra đĩa tiếp theo và nếu nó ở đó, nó sẽ trả lại nó. Nếu nó không ở đó, Picasso cuối cùng sẽ thực hiện một yêu cầu mạng cho hình ảnh đó và hiển thị nó.

Tóm lại, đây là những gì diễn ra (background) cho một yêu cầu tải hình ảnh: bộ nhớ -> đĩa -> mạng.

Tuy nhiên, tùy thuộc vào ứng dụng của bạn, bạn có thể muốn tránh lưu vào bộ nhớ cache, nếu hình ảnh được hiển thị có thể thay đổi thường xuyên và không được tải lại.

## Vậy làm thế nào để bạn vô hiệu hóa bộ nhớ đệm?
Bạn có thể bỏ qua việc lưu trữ tại bộ nhớ đệm bằng cách gọi memoryPolicy (MemoryPolicy.NO_CACHE). Điều này chỉ đơn giản là bỏ qua việc tra cứu bộ nhớ cache khi xử lý yêu cầu hình ảnh.
```
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .fit()
        .memoryPolicy(MemoryPolicy.NO_CACHE)
        .into(imageView)
```

Lưu ý rằng có một enum khác: MemoryPolicy.NO_STORE. Điều này rất hữu ích nếu bạn rất chắc chắn rằng bạn sẽ chỉ yêu cầu một hình ảnh một lần. Áp dụng điều này cũng sẽ không lưu trữ hình ảnh trong bộ nhớ cache Bộ nhớ do đó không buộc các bitmap khác từ bộ nhớ cache.

Nhưng hãy lưu ý rằng hình ảnh vẫn sẽ được lưu trong bộ nhớ cache trên đĩa để ngăn chặn điều đó, bạn sử dụng NetworkPolicy ( @NonNull NetworkPolicy, @NonNull NetworkPolicy ... bổ sung), lấy một hoặc nhiều giá trị enum sau:
* ` NetworkPolicy.NO_CACHE`: skips checking the disk cache and forces loading through the network.
*`NetworkPolicy.NO_STORE`: skips storing the result into the disk cache.
*`NetworkPolicy.OFFLINE`: forces the request through the disk cache only, skipping the network.
Để tránh cả bộ nhớ đệm và bộ nhớ đệm hoàn toàn, chỉ cần gọi cả hai phương thức lần lượt:
```
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .fit()
        .memoryPolicy(MemoryPolicy.NO_CACHE, MemoryPolicy.NO_STORE)
        .networkPolicy(NetworkPolicy.NO_CACHE)
        .into(imageView)
```
#  4. Request Listeners
Trong Picasso, bạn có thể sử dụng callback  hoặc listener để theo dõi trạng thái của yêu cầu bạn đã thực hiện khi tải hình ảnh. Chỉ một trong những phương thức này sẽ được gọi nếu bạn triển khai giao diện Target theo yêu cầu.

`void onBitmapFails (e: Exception?, errorDrawable: Drawable?)`: được kích hoạt bất cứ khi nào hình ảnh không thể được tải thành công. Ở đây, chúng ta có thể truy cập ngoại lệ đã được ném.

`void onBitmapLoaded (Bitmap bitmap, LoadedFrom from):` được kích hoạt bất cứ khi nào một hình ảnh được tải thành công. Ở đây, chúng tôi nhận được Bitmap để hiển thị cho người dùng.

`void onPrepareLoad (Drawable placeHolderDrawable): `được gọi ngay trước khi yêu cầu của bạn được gửi.

```
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .into(object : Target {
             
            override fun onPrepareLoad(placeHolderDrawable: Drawable?) {
            }
 
            override fun onBitmapFailed(e: Exception?, errorDrawable: Drawable?) {
            }
 
            override fun onBitmapLoaded(bitmap: Bitmap?, from: Picasso.LoadedFrom?) {
            }
        })
```
Ở đây bạn cũng có thể hiển thị và sau đó ẩn hộp thoại tiến trình nếu bạn có.

Có một  callback listener khác mà bạn có thể sử dụng nếu bạn muốn, được gọi là Callback. Giao diện này chỉ có hai phương thức: `onSuccess ()` và` onError (Exception e)`. `onSuccess () ` được gọi khi tải yêu cầu hình ảnh thành công và `onError (Exception e)` được gọi khi có lỗi khi xử lý yêu cầu.

Quay trở lại ứng dụng thư viện ảnh của chúng tôi (bên trong SunsetPhotoActivity), hãy sửa đổi màn hình một chút bằng cách sử dụng đối tượng `Callback` sẽ đặt bitmap thành ImageView và cũng thay đổi màu nền của bố cục bằng cách trích xuất màu tối và rực rỡ của hình ảnh của chúng tôi sử dụng API  Android color.

Vì vậy, bao gồm các tạo phẩm bảng màu trong build.gradle của mô-đun ứng dụng của bạn:
```
dependencies {
    //... 
    implementation 'com.android.support:palette-v7:27.1.1'
}
```
Bây giờ chúng ta hãy thực hiện `callback` trong yêu cầu Picasso của chúng tôi.
```
override fun onStart() {
    super.onStart()
 
    Picasso.get()
            .load(sunsetPhoto.url)
            .placeholder(R.drawable.placeholder)
            .error(R.drawable.error)
            .fit()
            .into(imageView, object : Callback {
 
                override fun onSuccess() {
                    val bitmap = (imageView.drawable as BitmapDrawable).bitmap
                    onPalette(Palette.from(bitmap).generate())
                }
 
                override fun onError(e: Exception?) {
                }
            })
}
 
fun onPalette(palette: Palette?) {
    if (null != palette) {
        val parent = imageView.parent.parent as ViewGroup
        parent.setBackgroundColor(palette.getDarkVibrantColor(Color.GRAY))
    }
}
```

# 5. Kiểm tra ứng dụng
Cuối cùng, bạn có thể chạy ứng dụng! Nhấp vào hình thu nhỏ để có được một phiên bản kích thước đầy đủ của hình ảnh.
![](https://images.viblo.asia/c829f58a-fef8-47e7-8bea-6b8284c11c84.png)

# 6. Prioritizing Requests
Khi bạn muốn tải các hình ảnh khác nhau cùng một lúc trên cùng một màn hình, bạn có tùy chọn để đặt cái nào quan trọng hơn cái kia. Nói cách khác, bạn có thể tải hình ảnh quan trọng đầu tiên.

Bạn chỉ cần gọi priority() trong trường hợp yêu cầu Picasso của bạn và chuyển vào bất kỳ enum nào: Priority.LOW, Priority.NORMAL hoặc Priority.HIGH.

```
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .fit()
        .priority(Picasso.Priority.HIGH)
        .into(imageView)
 
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .fit()
        .priority(Picasso.Priority.NORMAL)
        .into(imageView)
 
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .error(R.drawable.error)
        .fit()
        .priority(Picasso.Priority.LOW)
        .into(imageView)
```

# 7. Tagging Requests

Bằng cách gắn thẻ các yêu cầu, bạn có thể tiếp tục, tạm dừng hoặc hủy các yêu cầu được liên kết với các thẻ cụ thể. Tùy thuộc vào trường hợp sử dụng của bạn, bạn có thể gắn thẻ các yêu cầu của mình bằng một chuỗi hoặc các đối tượng sẽ xác định phạm vi yêu cầu là `Context`, một `Activity`, hoặc một `Fragment`. Bạn có thể dễ dàng gắn thẻ yêu cầu Picasso bằng cách gọi thẻ (tag @NonNull Object) trên một. Truyền cho nó một thể hiện của Object dùng làm thẻ.

Dưới đây là các thao tác sau bạn có thể thực hiện đối với các yêu cầu Picasso được gắn thẻ:

`pauseTag (tag):` tạm dừng tất cả các yêu cầu được liên kết với thẻ đã cho.

`CVT (tag):` tiếp tục các yêu cầu bị tạm dừng với thẻ đã cho.

`CancTag (tag):` hủy bỏ mọi yêu cầu hiện có với thẻ đã cho.

```
Picasso.get()
        // ...
        .tag(context
```

# 8. Tham khảo
https://code.tutsplus.com/tutorials/code-an-image-gallery-android-app-with-picasso--cms-30966