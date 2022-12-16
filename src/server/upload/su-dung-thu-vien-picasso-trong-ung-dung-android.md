## 1. Picasso là gì

Picasso là một thư viện Android mã nguồn mở rất phổ biến, dùng để load hoặc hiển thị hình ảnh trong ứng dụng Android.

*... Picasso cho phép hiển thị các hình ảnh phức tạp trong ứng dụng của bạn — chỉ trong một dòng code!*

Lưu ý rằng Picasso sử dụng OkHttp (một thư viện network từ cùng một nhà phát triển) để load các hình ảnh qua internet.

## 2. Tại sao sử dụng Picasso

Tự phát triển chức năng load và hiển thị hình ảnh của riêng bạn trong Java hoặc Kotlin là một nỗi đau thực sự: bạn phải quan tâm đến caching, decoding, quản lý kết nối mạng, luồng, xử lý exception và hơn thế nữa. 
Picasso là một thư viện dễ sử dụng, được tổ chức tốt, tài liệu đầy đủ và được testing kỹ lưỡng, giúp bạn tiết kiệm rất nhiều thời gian quý báu.

Dưới đây là nhiều lỗi phổ biến của việc tải và hiển thị hình ảnh trên Android được Picasso xử lý, dựa theo các tài liệu chính thức:

*  Xử lý việc tái sử dụng ImageView trong adapter.
*  Hiển thị hình ảnh phức tạp mà chỉ sử dụng bộ nhớ tối thiểu.
*  Bộ nhớ đệm và bộ nhớ đĩa tự động.

Thêm hình ảnh vào ứng dụng của bạn có thể làm cho ứng dụng Android của bạn trở nên sống động. 
Vì vậy, trong hướng dẫn này, chúng ta sẽ tìm hiểu về Picasso 2 bằng cách xây dựng một ứng dụng thư viện hình ảnh đơn giản. 
Nó sẽ tải hình ảnh qua internet và hiển thị chúng dưới dạng hình thu nhỏ trong RecyclerView và khi người dùng nhấp vào hình ảnh, nó sẽ mở Activity chi tiết chứa hình ảnh lớn hơn.

## 3. Tạo Project

Để bắt đầu, bạn cần có :

* Hiểu biết cơ bản về các API Android và Kotlin.
* Android Studio 3.1.1 trở lên.
* Plugin Kotlin 1.2.30 trở lên.

Mở Android Studio và tạo một Project mới (bạn có thể đặt tên nó là PicassoDemo), với một Activity là MainActivity. Đảm bảo rằng Project có hỗ trợ Kotlin.

![](https://images.viblo.asia/4dd1de72-3189-43ee-a94a-f732bc0ea95d.png)

## 4. Khai báo Dependencies

Sau khi tạo Project, thêm Dependencies trong build.gradle.

```
dependencies {
    implementation 'com.android.support:recyclerview-v7:27.1.1'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```
Sau đó, hãy Sync Project.

## 5. Thêm Permission

Vì Picasso sẽ thực hiện một request mạng để load hình ảnh qua internet, chúng ta cần permission INTERNET trong AndroidManifest.xml.

```
<uses-permission android:name="android.permission.INTERNET" />
```

Permission này cho phép bạn load và hiển thị hình ảnh từ internet. Nếu bạn load hình ảnh trong thiết bị thì ko cần đến Permission này.

## 6. Tạo Layout

Trong activity_main.xml, chúng ta sẽ thêm RecyclerView như sau :

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

**Tạo item cho RecyclerView**

Chúng ta sẽ tạo layout item_image.xml, sử dụng cho mỗi item của RecyclerView :

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

## 7. Tạo Data Model

Chúng ta sẽ định nghĩa một modelcho RecyclerView của chúng ta. 
Model này sẽ kế thừa từ Parcelable, để phục vụ cho việc truyền dữ liệu hiệu suất cao từ một thành phần này sang thành phần khác trong Android. 
Trong trường hợp này, dữ liệu sẽ được chuyển từ SunsetGalleryActivity sang SunsetPhotoActivity.

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

Lưu ý rằng model này SunsetPhoto chỉ có một trường duy nhất, được gọi là url (cho mục đích demo), nhưng bạn có thể có nhiều trường hơn nếu bạn muốn. 

Chú ý, model này kế thừa từ Parcelable. Chúng ta sẽ thêm annotation để  các phương thức writeToParcel, writeFromParcel và describeContents một cách tự động.

```
@Parcelize
data class SunsetPhoto(val url: String) : Parcelable
```

Nhớ add đoạn sau vào file app/build.gradle :

```
androidExtensions {
    experimental = true
}
```

Ngoài ra, chúng ta viết thêm một hàm getSunsetPhotos() trong SunsetPhoto, nó sẽ trả về một ArrayList của SunsetPhoto :

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

## 8. Tạo Adapter

```
class MainActivity : AppCompatActivity() {
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
}
```

## 9. Load Image từ URL

Chúng ta sẽ dùng Picasso để lấy hình ảnh từ internet và hiển thị chúng. 
Picasso sẽ hiển thị những hình ảnh riêng lẻ trong ImageViews tương ứng bên trong phương thức RecyclerView onBindViewHolder() khi người dùng cuộn ứng dụng.

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

## 10. Khởi tạo Adapter

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

## 11. Tạo DetailActivity

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

**Tạo Detail Layout**

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

## 12. Build ứng dụng

![](https://images.viblo.asia/dc8038a0-c9ef-4919-a216-7905c23d55af.png)