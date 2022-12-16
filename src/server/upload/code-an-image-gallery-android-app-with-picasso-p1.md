![](https://images.viblo.asia/981f54cf-298e-4cc0-a985-f759685f5cae.png)

Picasso là một thư viện load ảnh rất phổ biến trên Android. Ở bài viết này chúng ta sẽ cùng tìm hiểu cách sử dụng nó để xử lý các nhu cầu tải hình ảnh của bạn.

# 1. Giới thiệu về Picasso
Picasso (tên lấy cảm hứng từ nghệ sĩ nổi tiếng người Pháp Pablo Picasso) là một thư viện Android nguồn mở rất phổ biến để tải hình ảnh trong ứng dụng Android của bạn. Theo các tài liệu chính thức, nó nói:

... Picasso cho phép tải hình ảnh một cách dễ dàng trong ứng dụng của bạn chỉ với một dòng code !

Lưu ý rằng Picasso sử dụng OkHttp (thư viện mạng từ cùng một nhà phát triển) dưới nền để tải hình ảnh qua internet.

# 2. Tại sao nên sử dụng Picsso ?
Khi bạn muốn tải và hiển thị hình ảnh theo cách  của riêng bạn trong Java hoặc Kotlil, các vấn đề bạn có thể gặp phải: bạn phải chăm sóc nhớ đệm, giải mã, quản lý kết nối mạng, phân luồng, xử lý ngoại lệ và hơn thế nữa. Picasso là một thư viện dễ sử dụng, được lên kế hoạch tốt, được ghi chép kỹ lưỡng và được kiểm tra kỹ lưỡng, có thể giúp bạn tiết kiệm rất nhiều thời gian quý giá và giúp bạn đỡ đau đầu.

Dưới đây là nhiều cạm bẫy phổ biến của việc tải hình ảnh trên Android được Picasso xử lý cho bạn, theo các tài liệu chính thức:

- Xử lý hủy bỏ ImageView và hủy tải xuống trong bộ điều hợp

- Biến đổi hình ảnh phức tạp với việc sử dụng bộ nhớ tối thiểu

- Bộ nhớ tự động và bộ nhớ đệm

Thêm hình ảnh vào ứng dụng của bạn có thể làm cho ứng dụng Android của bạn trở nên sống động. Vì vậy, trong hướng dẫn này, chúng ta sẽ tìm hiểu về Picasso 2 bằng cách xây dựng một ứng dụng thư viện ảnh đơn giản. Nó sẽ tải hình ảnh qua internet và hiển thị chúng dưới dạng hình thu nhỏ trong RecyclerView và khi người dùng nhấp vào hình ảnh, nó sẽ mở ra một hoạt động chi tiết có chứa hình ảnh lớn hơn.

# 3 Cấu hình
Sau khi tạo một dự án mới, chỉ định các phụ thuộc sau trong build.gradle của bạn. Tại thời điểm viết bài, phiên bản mới nhất của Picasso là 2.71828.
```
dependencies {
    implementation 'com.android.support:recyclerview-v7:27.1.1'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```
Hoặc với Maven
```
<dependency>
  <groupId>com.squareup.picasso</groupId>
  <artifactId>picasso</artifactId>
  <version>2.71828</version>
</dependency>
```

Thêm quyền cho phép kết nối mạn
```
<uses-permission android:name="android.permission.INTERNET" />
```

# 4 Tạo giao diện
Chúng ta sẽ bắt đầu bằng cách tạo RecyclerView của chúng ta bên trong tệp bố trí Activity_main.xml.
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/activity_main"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
 
    <android.support.v7.widget.RecyclerView
            android:id="@+id/rv_images"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>
</RelativeLayout>
```
Tạo bố cục mục tùy chỉnh

Tiếp theo, hãy tạo bố cục XML (item_image.xml) sẽ được sử dụng cho từng mục (ImageView) trong RecyclerView.
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="wrap_content">
     
    <ImageView
            android:id="@+id/iv_photo"
            android:adjustViewBounds="true"
            android:layout_height="200dp"
            android:scaleType="centerCrop"
            android:layout_margin="2dp"
            android:layout_width="match_parent"/>
</LinearLayout>
```
Bây giờ chúng tôi đã tạo các bố cục cần thiết cho ứng dụng thư viện đơn giản của mình, bước tiếp theo là tạo bộ điều hợp RecyclerView để hiển thị dữ liệu. Tuy nhiên, trước khi chúng ta làm điều đó, hãy tạo mô hình dữ liệu đơn giản.
# 5. Tạo data model
Chúng tôi sẽ định nghĩa một mô hình dữ liệu đơn giản cho RecyclerView của chúng tôi. Mô hình này triển khai Parcelable để vận chuyển dữ liệu hiệu suất cao từ thành phần này sang thành phần khác trong Android. Trong trường hợp của chúng tôi, dữ liệu sẽ được chuyển từ SunsetGalleryActivity sang SunsetPhotoActivity.
```
data class SunsetPhoto(val url: String) : Parcelable {
 
    constructor(parcel: Parcel) : this(parcel.readString())
 
    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(url)
    }
 
    override fun describeContents(): Int {
        return 0
    }
 
    companion object CREATOR : Parcelable.Creator<SunsetPhoto> {
        override fun createFromParcel(parcel: Parcel): SunsetPhoto {
            return SunsetPhoto(parcel)
        }
 
        override fun newArray(size: Int): Array<SunsetPhoto?> {
            return arrayOfNulls(size)
        }
    }
}
```
Lưu ý rằng mô hình SunsetPhoto này chỉ có một trường duy nhất được gọi là url (cho mục đích demo), nhưng bạn có thể có nhiều hơn nếu bạn muốn. Lớp này triển khai Parcelable, có nghĩa là chúng ta phải ghi đè một số phương thức. Chúng tôi có thể sử dụng Android Studio IDEA để tạo các phương thức này cho chúng tôi, nhưng nhược điểm của việc này là bảo trì. Làm sao? Bất cứ khi nào chúng tôi thêm bất kỳ trường mới nào vào lớp này, chúng tôi có thể quên cập nhật rõ ràng các phương thức constructor và writeToParcel, điều này có thể dẫn đến một số lỗi nếu chúng tôi không cập nhật các phương thức. Bây giờ, để tránh việc cập nhật hoặc viết các phương thức soạn sẵn này, Kotlin 1.1.14 đã giới thiệu chú thích @Parcelize. Chú thích này sẽ giúp chúng tôi tự động tạo các phương thức writeToParcel, writeFromParcel và descriptionContents

```
@Parcelize
data class SunsetPhoto(val url: String) : Parcelable
```
Bây giờ, lớp SunsetPhoto của chúng tôi chỉ là hai dòng! Tuyệt vời!

Hãy nhớ thêm đoạn mã sau vào mô-đun ứng dụng của bạn build.gradle

```
androidExtensions {
    experimental = true
}
```

Ngoài ra, tôi đã bao gồm một đối tượng đồng hành (hoặc phương thức tĩnh trong Java) getSunsetPhotos () trong lớp mô hình SunsetPhoto, đơn giản sẽ trả về một ArrayList của SunsetPhoto khi được gọi.

```
@Parcelize
data class SunsetPhoto(val url: String) : Parcelable {
 
    companion object {
        fun getSunsetPhotos(): Array<SunsetPhoto> {
            return arrayOf<SunsetPhoto>(SunsetPhoto("https://goo.gl/32YN2B"),
                    SunsetPhoto("https://goo.gl/Wqz4Ev"),
                    SunsetPhoto("https://goo.gl/U7XXdF"),
                    SunsetPhoto("https://goo.gl/ghVPFq"),
                    SunsetPhoto("https://goo.gl/qEaCWe"),
                    SunsetPhoto("https://goo.gl/vutGmM"))
        }
    }
}
```
# 8. Tạo Adapter
Chúng tôi sẽ tạo một bộ chuyển đổi để điền dữ liệu RecyclerView của chúng tôi. Chúng tôi cũng sẽ triển khai một trình nghe nhấp để mở hoạt động chi tiết, Sunset SunsetPhotoActivity, thông qua đó là một ví dụ của SunsetPhoto như một mục đích bổ sung. Các hoạt động chi tiết sẽ hiển thị cận cảnh của hình ảnh. Chúng tôi sẽ tạo nó trong phần sau.`class MainActivity : AppCompatActivity() {
    //...
    private inner class ImageGalleryAdapter(val context: Context, val sunsetPhotos: Array<SunsetPhoto>) 
     : RecyclerView.Adapter<ImageGalleryAdapter.MyViewHolder>() {
 
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageGalleryAdapter.MyViewHolder {
            val context = parent.context
            val inflater = LayoutInflater.from(context)
            val photoView = inflater.inflate(R.layout.item_image, parent, false)
            return MyViewHolder(photoView)
        }
 
        override fun onBindViewHolder(holder: ImageGalleryAdapter.MyViewHolder, position: Int) {
            val sunsetPhoto = sunsetPhotos[position]
            val imageView = holder.photoImageView
        }
 
        override fun getItemCount(): Int {
            return sunsetPhotos.size
        }
 
        inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
 
            var photoImageView: ImageView = itemView.findViewById(R.id.iv_photo)
 
            init {
                itemView.setOnClickListener(this)
            }
 
            override fun onClick(view: View) {
                val position = adapterPosition
                if (position != RecyclerView.NO_POSITION) {
                    val sunsetPhoto = sunsetPhotos[position]
                    val intent = Intent(context, SunsetPhotoActivity::class.java).apply {
                        putExtra(SunsetPhotoActivity.EXTRA_SUNSET_PHOTO, sunsetPhoto)
                    }
                    startActivity(intent)
                }
            }
        }
    }
}`
Lưu ý rằng chúng tôi đã sử dụng chức năng mở rộng áp dụng để đặt một đối tượng là thêm vào mục đích. Xin nhắc lại, hàm áp dụng trả về đối tượng được truyền cho nó dưới dạng đối số (nghĩa là đối tượng người nhận).
# 9. Tải ảnh từ URL
Chúng ta sẽ cần Picasso thực hiện công việc của mình trong phần này không phải là vẽ cho chúng ta một tác phẩm nghệ thuật, mà là lấy hình ảnh từ internet và hiển thị chúng. Chúng tôi sẽ hiển thị các hình ảnh này một cách riêng lẻ trong ImageViews tương ứng của chúng bên trong phương thức RecyclerView onBindViewHolder () của chúng tôi khi người dùng cuộn ứng dụng.
```
override fun onBindViewHolder(holder: ImageGalleryAdapter.MyViewHolder, position: Int) {
    val sunsetPhoto = sunsetPhotos[position]
    val imageView = holder.photoImageView
 
    Picasso.get()
            .load(sunsetPhoto.url)
            .placeholder(R.drawable.placeholder)
            .error(R.drawable.error)
            .fit()
            .into(imageView)
 
}
```
Phương thức get () trả về một instance  Picasso  duy nhất, được khởi tạo với các cấu hình mặc định sau:

- Bộ nhớ cache bộ nhớ LRU 15% RAM ứng dụng có sẵn.

- Bộ nhớ cache của dung lượng lưu trữ 2% lên tới 50MB nhưng không dưới 5 MB. Lưu ý: điều này chỉ khả dụng trên API 14+.

- Ba chủ đề tải về để truy cập đĩa và mạng.

Lưu ý rằng nếu các cài đặt này không đáp ứng các yêu cầu của ứng dụng của bạn, bạn có thể tự do xây dựng phiên bản Picasso của riêng mình với toàn quyền kiểm soát các cấu hình này bằng cách sử dụng Picasso.Builder.
```
val picassoBuilder = Picasso.Builder(context)
// do custom configurations
 
// Specify the {@link Downloader} that will be used for downloading images.
picassoBuilder.downloader() 
// Specify the ExecutorService for loading images in the background.
picassoBuilder.executor()
// Specify the memory Cache used for the most recent images.
picassoBuilder.memoryCache()
// and more
val picasso = picassoBuilder.build()
```
Cuối cùng, bạn gọi phương thức build () để trả về cho bạn một cá thể Picasso với các cấu hình của riêng bạn.

Chúng tôi khuyên bạn nên làm điều này trong Application.onCreate và sau đó đặt nó làm đối tượng đơn lẻ với Picasso.setSingletonInstance trong phương thức đó để đảm bảo rằng đối tượng Picasso là đối tượng toàn cầu.

Phương thức `load () `bắt đầu một yêu cầu hình ảnh bằng cách sử dụng đường dẫn đã chỉ định. Đường dẫn này có thể là URL từ xa, tài nguyên tệp, tài nguyên nội dung hoặc tài nguyên Android.

Phương thức **placehodel(int placeholderResId)**: id tài nguyên giữ chỗ cục bộ hoặc có thể vẽ được sử dụng trong khi hình ảnh đang được tải và sau đó được hiển thị. Nó phục vụ như một trải nghiệm người dùng tốt để hiển thị hình ảnh giữ chỗ trong khi hình ảnh đang tải xuống.

Lưu ý rằng Picasso trước tiên kiểm tra xem hình ảnh được yêu cầu có trong bộ nhớ cache hay không và nếu có, nó sẽ hiển thị hình ảnh từ đó (chúng ta sẽ thảo luận về bộ nhớ đệm trong Picasso nhiều hơn trong phần sau).
Các phương pháp khác

- `error (int errorResId)`: có thể rút ra được sử dụng nếu không thể tải hình ảnh được yêu cầu vì có thể trang web bị sập.

- `noFade ():` Picasso luôn mờ dần trong hình ảnh để được hiển thị trong ImageView. Nếu bạn không muốn hoạt hình mờ dần này, chỉ cần gọi phương thức noFade ().

- `into (ImageView imageView)`: chế độ xem hình ảnh mục tiêu mà hình ảnh sẽ được đặt.

### **Thay đổi kích thước hình ảnh và chuyển đổi**
Nếu máy chủ bạn yêu cầu hình ảnh từ không cung cấp cho bạn hình ảnh bạn cần ở kích thước yêu cầu, bạn có thể dễ dàng thay đổi kích thước hình ảnh đó bằng cách thay đổi kích thước (int targetWidth, int targetHeight). Gọi phương thức này sẽ thay đổi kích thước hình ảnh và sau đó hiển thị nó trên ImageView. Lưu ý rằng kích thước được tính bằng pixel (px), không phải dp.
```
Picasso.get()
        .load(sunsetPhoto.url)
        .placeholder(R.drawable.placeholder)
        .resize(400, 200)
        .into(imageView)
```

Bạn có thể chuyển tài nguyên kích thước Android cho cả chiều rộng và chiều cao bằng cách sử dụng phương thức resizeDimen (int targetWidthResId, int targetHeightResId). Phương pháp này sẽ chuyển đổi kích thước kích thước thành pixel thô và sau đó gọi resize () trong hood hood chuyển qua các kích thước được chuyển đổi (tính bằng pixel) làm đối số.
```
Picasso.get()
   //...
    .resizeDimen(R.dimen.list_detail_image_size, R.dimen.list_detail_image_size)
    //...
```
Lưu ý rằng các phương thức thay đổi kích thước này sẽ không tôn trọng tỷ lệ khung hình. Nói cách khác, tỷ lệ khung hình ảnh của bạn có thể bị bóp méo.

May mắn thay, Picasso cung cấp cho chúng ta một số phương pháp hữu ích để giải quyết vấn đề này:

- `centreCrop ()`: chia tỷ lệ hình ảnh một cách đồng đều (duy trì tỷ lệ khung hình của hình ảnh) để hình ảnh lấp đầy khu vực nhất định, với càng nhiều hình ảnh hiển thị càng tốt. Nếu cần, hình ảnh sẽ được cắt theo chiều ngang hoặc chiều dọc để phù hợp. Gọi phương thức này cắt một hình ảnh bên trong các giới hạn được chỉ định bằng cách thay đổi kích thước ().

- `centreInside ():` chia tỷ lệ hình ảnh sao cho cả hai kích thước bằng hoặc nhỏ hơn giới hạn được yêu cầu. Điều này sẽ căn giữa một hình ảnh bên trong các giới hạn được chỉ định bởi thay đổi kích thước ().

- o`nlyScaleDown ()`: chỉ thay đổi kích thước hình ảnh nếu kích thước hình ảnh gốc lớn hơn kích thước đích được chỉ định bởi thay đổi kích thước ().

- `fit ()`: cố gắng thay đổi kích thước hình ảnh để khớp chính xác vào giới hạn của ImageView đích.

### Image Rotation

Picasso có một API dễ dàng để xoay một hình ảnh và sau đó hiển thị hình ảnh đó. Phương pháp xoay (độ nổi) xoay hình ảnh theo độ đã chỉ định.
```
Picasso.get()
    //...
    .rotate(90f)
    //...
```

Trong ví dụ trên, điều này sẽ xoay hình ảnh 90 độ. Phương thức xoay (độ nổi, trục xoay, trục xoay) xoay hình ảnh theo các độ được chỉ định xung quanh điểm xoay.
```
Picasso.get()
    //...
    .rotate(30f, 200f, 100f)
    //..
```

### Transformation

Ngoài việc điều khiển một hình ảnh bằng cách xoay nó, Picasso còn cho chúng ta tùy chọn áp dụng một phép biến đổi tùy chỉnh cho một hình ảnh trước khi hiển thị nó.

Bạn chỉ cần tạo một lớp thực hiện giao diện Picasso Transform. Sau đó, bạn phải ghi đè hai phương thức:

`Bitmap transform(Bitmap source)`: điều này biến đổi bitmap nguồn thành một bitmap mới.

`String key():` trả về một khóa duy nhất cho phép chuyển đổi, được sử dụng cho mục đích lưu trữ.

```
Picasso.get()
        // ...
        .transform(CropCircleTransformation())
        .into(imageView)
```

Ở đây, tôi đã áp dụng chuyển đổi cắt vòng tròn cho hình ảnh từ thư viện Android nguồn mở Picasso Transformations. Thư viện này có nhiều biến đổi mà bạn có thể áp dụng cho một hình ảnh với Picasso, bao gồm các biến đổi để làm mờ hoặc thu nhỏ màu xám của một hình ảnh. Hãy kiểm tra xem nếu bạn muốn áp dụng một số biến đổi thú vị cho hình ảnh của mình.
- Nguồn: https://code.tutsplus.com/tutorials/code-an-image-gallery-android-app-with-picasso--cms-30966