Hiện này các ứng dụng chỉnh sửa hình ảnh khá phổ biến trong android . Cũng có rất nhiều các thư viện hỗ trợ chúng ta phát triển những chức năng liên quan đến chỉnh sửa một hình ảnh thông qua ứng dụng android. Vì vậy trong bài viết chúng ta sẽ tìm hiểu cách xây dựng một tính năng của chỉnh sủa ảnh đó là thay đổi độ trong suốt cũng như độ tương phản của hình ảnh thông qua ColorMatrix và ColorMatrixColorFilter

Để hiểu rõ hơn chúng tao tìm hiểu một số điều căn bản về ColorMatrix nhé .
# ColorMatrix là gì?
ColorMatrix là ma trận 4x5 để chuyển đổi các thành phần màu và alpha của Bitmap. Ma trận có thể được truyền dưới dạng một mảng và được xử lý như sau:
```
[a, b, c, d, e,
    f, g, h, i, j,
    k, l, m, n, o,
    p, q, r, s, t]
```
Khi áp dụng cho một màu [R, G, B, A], màu kết quả được tính là:
```
 R '= a * R + b * G + c * B + d * A + e;
   G '= f * R + g * G + h * B + i * A + j;
   B '= k * R + l * G + m * B + n * A + o;
   A '= p * R + q * G + r * B + s * A + t;
```
Màu kết quả [R’, G’, B’, A’] đó sau đó có mỗi kênh được kẹp 0vào 255 phạm vi.

ColorMatrix mẫu bên dưới đảo ngược các màu đến bằng cách chia tỷ lệ từng kênh theo -1, sau đó dịch chuyển kết quả lên 255 để duy trì trong không gian màu tiêu chuẩn.
```
[-1, 0, 0, 0, 255,
     0, -1, 0, 0, 255,
     0, 0, -1, 0, 255,
     0, 0, 0, 1, 0]
```
# Hãy bắt đầu viết code
## Chuẩn bị cho phương thức chỉnh sửa
Trước tiên ta tạo một file kotlin với tên là AdjustImageView.kt 
```
class AdjustImageView {

    companion object {
        private val DEFAULT_VALUE = 0f
        private val ONE_VALUE = 1f

        fun changeBitmapImageView(
            bitmap: Bitmap,
            brightness: Float,
            contrast: Float,
            saturation: Float
        ): Bitmap {
            //Matrix: 4x5
            val colorMatrix = ColorMatrix(
                floatArrayOf(
                    contrast, saturation, saturation, DEFAULT_VALUE, brightness,
                    DEFAULT_VALUE, contrast, DEFAULT_VALUE, DEFAULT_VALUE, brightness,
                    DEFAULT_VALUE, DEFAULT_VALUE, contrast, DEFAULT_VALUE, brightness,
                    DEFAULT_VALUE, DEFAULT_VALUE, DEFAULT_VALUE, ONE_VALUE, DEFAULT_VALUE
                )
            )
            val btp = Bitmap.createBitmap(bitmap.width, bitmap.height, bitmap.config)
            val canvas = Canvas(btp)
            val paint = Paint()
            paint.colorFilter = ColorMatrixColorFilter(colorMatrix)
            canvas.drawBitmap(bitmap, DEFAULT_VALUE, DEFAULT_VALUE, paint)
            return btp
        }
    }
}
```
Giải thích : Ở đây ta viết một phương thức là changeBitmapImageView() phương thức này với đối số truyền vào là một bitmap , brightness (chỉ số độ sáng ) , contrast ( chỉ số độ tương phản ) , saturation ( chỉ số bão hòa đỏ) và phương thức này sẽ trả về một bitmap để tao cập nhật lại imageview

Tiếp theo dựa vào các kiến thức cơ bản về ColorMatrix ta tạo một ma trận 4x5 với các chỉ số mặc định cũng như vị trí của các tham số truyền vô để có được một ma trận chuyển đổi màu cho hình ảnh

Chúng ta tạo một hai đối tượng Canvas và Paint để sẽ và tô màu hình ảnh ở dạng bitmap với các thuộc tính như :
```
            paint.colorFilter = ColorMatrixColorFilter(colorMatrix)
            canvas.drawBitmap(bitmap, DEFAULT_VALUE, DEFAULT_VALUE, paint)
```
## Tạo mã nguồn cho lớp giao diện 
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white">

    <TextView
        android:id="@+id/textViewCancel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/dp_16"
        android:layout_marginTop="@dimen/dp_16"
        android:text="Cancel"
        android:textStyle="bold"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textViewSave"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="@dimen/dp_16"
        android:layout_marginTop="@dimen/dp_16"
        android:text="Save"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/imageViewAdjust"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="@dimen/dp_8"
        app:layout_constraintBottom_toTopOf="@id/constraintLayout"
        app:layout_constraintTop_toBottomOf="@id/textViewCancel" />

    <android.support.constraint.ConstraintLayout
        android:id="@+id/constraintLayout"
        android:layout_width="match_parent"
        android:layout_height="@dimen/dp_120"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@id/imageViewAdjust">

        <TextView
            android:id="@+id/textViewBrightness"
            android:layout_width="@dimen/dp_100"
            android:layout_height="wrap_content"
            android:text="Brightness"
            app:layout_constraintBottom_toTopOf="@+id/textViewContrast"
            app:layout_constraintEnd_toEndOf="@+id/textViewContrast"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="@+id/textViewContrast"
            app:layout_constraintTop_toTopOf="parent" />

        <SeekBar
            android:id="@+id/seekBarBrightness"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginEnd="@dimen/dp_8"
            android:layout_marginStart="@dimen/dp_8"
            android:max="200"
            android:progress="100"
            app:layout_constraintBottom_toBottomOf="@+id/textViewBrightness"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/textViewBrightness"
            app:layout_constraintTop_toTopOf="@+id/textViewBrightness" />

        <TextView
            android:id="@+id/textViewContrast"
            android:layout_width="@dimen/dp_100"
            android:layout_height="wrap_content"
            android:layout_marginBottom="@dimen/dp_8"
            android:layout_marginStart="@dimen/dp_8"
            android:layout_marginTop="@dimen/dp_8"
            android:text="Contrast"
            app:layout_constraintBottom_toTopOf="@+id/textViewSaturation"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/textViewBrightness" />

        <SeekBar
            android:id="@+id/seekBarContrast"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginEnd="@dimen/dp_8"
            android:layout_marginStart="@dimen/dp_8"
            android:max="255"
            android:progress="125"
            app:layout_constraintBottom_toBottomOf="@+id/textViewContrast"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/textViewContrast"
            app:layout_constraintTop_toTopOf="@+id/textViewContrast" />

        <TextView
            android:id="@+id/textViewSaturation"
            android:layout_width="@dimen/dp_100"
            android:layout_height="wrap_content"
            android:text="Saturation"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="@+id/textViewContrast"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="@+id/textViewContrast"
            app:layout_constraintTop_toBottomOf="@+id/textViewContrast" />

        <SeekBar
            android:id="@+id/seekBarSaturation"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginBottom="@dimen/dp_8"
            android:layout_marginEnd="@dimen/dp_8"
            android:layout_marginStart="@dimen/dp_8"
            android:max="30"
            android:progress="0"
            app:layout_constraintBottom_toBottomOf="@+id/textViewSaturation"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/textViewSaturation"
            app:layout_constraintTop_toTopOf="@+id/textViewSaturation" />
    </android.support.constraint.ConstraintLayout>
</android.support.constraint.ConstraintLayout>
```
## Chúng ta bắt đầu viết code cho Mainactivity.kt
```
class MainActivity : AppCompatActivity(), SeekBar.OnSeekBarChangeListener {
    var bitmap: Bitmap? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        bitmap = (imageViewAdjust.drawable as BitmapDrawable).bitmap
        initView()
    }

    override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
        val brightness = seekBarBrightness.progress - BRIGHTNESS
        val contrast = seekBarContrast.progress / CONTRAST
        val saturation = seekBarSaturation.progress * STATURATION
        imageViewAdjust.setImageBitmap(
            AdjustImageView.changeBitmapImageView(
                bitmap!!,
                brightness,
                contrast,
                saturation
            )
        )
    }

    override fun onStartTrackingTouch(seekBar: SeekBar?) {
    }

    override fun onStopTrackingTouch(seekBar: SeekBar?) {
    }

    private fun initView() {
        imageViewAdjust.setImageBitmap(bitmap)
        seekBarBrightness.setOnSeekBarChangeListener(this)
        seekBarContrast.setOnSeekBarChangeListener(this)
        seekBarSaturation.setOnSeekBarChangeListener(this)
    }

    companion object {
        private val BRIGHTNESS = 100f
        private val CONTRAST = 170f
        private val STATURATION = .10f
    }
}
```
Ở đây chúng tạo một biến bitmap và gắn nó bằng bitmap của imageview để chuyền vào phương thức để chỉnh sửa hình ảnh . Đồng thời cũng implement SeekBar.OnSeekBarChangeListener để bắt event lấy được các chỉ số độ sáng , độ tương phản của seekBar . Sau khi có được bitmap chỉnh sủa thì ta có thể cập nhật lại ImageView với câu lệnh sau : 
```
 imageViewAdjust.setImageBitmap(
            AdjustImageView.changeBitmapImageView(
                bitmap!!,
                brightness,
                contrast,
                saturation
            )
        )
```
Chạy chương trình và xem thành quả nào:

**STATURATION**
![](https://images.viblo.asia/3390255a-9553-47ec-a176-1fec42f34a3f.jpg)

**CONTRAST**
![](https://images.viblo.asia/67f46353-7a26-4855-8cc8-369401915485.jpg)

**BRIGHTNESS**
![](https://images.viblo.asia/68a092ea-327c-44ac-8ded-d71b0b2b09f8.jpg)

**Chúc các bạn thành công.**