Trong bài này, chúng ta sẽ tìm hiểu cách tạo animation RecyclerView sau.

![](https://images.viblo.asia/e03947f1-05da-473e-bf9a-2efc0fbf9d36.gif)

Dưới đây là những thư viện bạn sẽ cần cho ứng dụng này ở file build.gradle

##### build.gradle

```
dependencies {
    ...
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'com.google.android.material:material:1.0.0'
}
```

Tiếp theo, chúng ta sẽ bắt đầu xây dựng code custom RecyclerView. Hãy tạo một class mới có tên là **HorizontalCarouselRecyclerView.kt**

#### HorizontalCarouselRecyclerView.kt

```
class HorizontalCarouselRecyclerView(
    context: Context,
    attrs: AttributeSet
) : RecyclerView(context, attrs) {
    // TODO
}
```

Đây là nơi gần như tất cả code của chúng ta sẽ được viết vào. Hãy tạo một function cho phép chúng ta khởi tạo RecycleView với mọi thứ chúng ta cần.

```
fun <T : ViewHolder> initialize(newAdapter: Adapter<T>) {
    layoutManager = LinearLayoutManager(context, HORIZONTAL, false)
    newAdapter.registerAdapterDataObserver(object : RecyclerView.AdapterDataObserver() {
        override fun onChanged() {
            post {
                val sidePadding = (width / 2) - (getChildAt(0).width / 2)
                setPadding(sidePadding, 0, sidePadding, 0)
                scrollToPosition(0)
                addOnScrollListener(object : OnScrollListener() {
                    override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                        super.onScrolled(recyclerView, dx, dy)
                        onScrollChanged()
                    }
                })
            }
        }
    })
    adapter = newAdapter
}
```

Có một vài ghi chú về phần này. Chúng ta làm với LinearLayoutManager ngang, bạn cũng có thể làm cho chiều dọc nếu bạn thích, nhưng những đoạn code này viết để hoạt động theo chiều ngang.

Chúng ta muốn đăng ký một AdapterDataObserver, nên chúng ta có thể update tất cả children khi data mới được set. Điều này rất tốt khi ẩn những thứ như thế này trong code thay vì trong Activity hoặc Fragment.

Đối với việc setting padding, chúng ta muốn đệm RecyclerView để các children ở đầu và cuối trong RecyclerView có thể đặt nó vào giữa màn hình. Sau đó, chúng ta gọi scrollToPocation(0) để đảm bảo chúng ta bắt đầu ở đầu list.

Cuối cùng, chúng ta thiết lập một onScrollListener để mỗi pixel mà recyclerView được cuộn, tất cả các kích thước và màu sắc của children của nó sẽ được cập nhật.

Hãy nhìn sâu hơn vào onScrollChanged(). Hãy thêm đoạn code dưới đây vào RecycleView của chúng ta.

```
private fun onScrollChanged() {
    post {
        (0 until childCount).forEach { position ->
            val child = getChildAt(position)
            val childCenterX = (child.left + child.right) / 2
            val scaleValue = getGaussianScale(childCenterX, 1f, 1f, 150.toDouble())
            child.scaleX = scaleValue
            child.scaleY = scaleValue
            colorView(child, scaleValue)
        }
    }
}
```

Các thành phần quan trọng nhất của function này là chúng ta đã lặp qua tất cả các children của RecyclerView, và chúng ta sẽ thiết lập một tỉ lệ và màu sắc cho view này.

Chúng ta sẽ sử dụng hệ số tỉ lệ Gaussian cho children, điều này sẽ cho phép chúng ta chia tỷ lệ cho view lớn hơn ở giữa màn hình, và nhỏ hơn khi ở về phía rìa màn hình. Hãy đi sâu hơn vào hàm getGaussianScale() ngay bây giờ

```
private fun getGaussianScale(
    childCenterX: Int,
    minScaleOffest: Float,
    scaleFactor: Float,
    spreadFactor: Double
): Float {
    val recyclerCenterX = (left + right) / 2
    return (Math.pow(
        Math.E,
        -Math.pow(childCenterX - recyclerCenterX.toDouble(), 2.toDouble()) / (2 * Math.pow(
            spreadFactor,
            2.toDouble()
        ))
    ) * scaleFactor + minScaleOffest).toFloat()
}
```

Bây giờ, điều này hơi phức tạp. Nhưng nếu bạn tra cứu hàm base cho một đường cong Gaussian, nó sẽ có ý nghĩa hơn một chút

![](https://images.viblo.asia/421a03cf-ecd4-4a7c-b1e4-5a86df6aa2cd.png)

Trong công thức Gaussian ở trên, alpha (a) là độ lớn của đường cong (tỷ lệ mà chúng ta muốn có ở view nằm ở giữa màn hình), x là chiều ngang của child nằm giữa, b là trung tâm RecyclerView, và c là "độ căng ra" của đường cong. c càng cao, đường cong càng rộng và càng nhiều views sẽ được thu nhở khi ở bên cạnh màn hình. Điều này sẽ giải thích mọi thứ trong hàm getGaussianScale(), ngoại trừ minScaleOffset. Chúng ta cần điều đó bởi vì khi không có nó, phương thức sẽ trả về cho chúng ta một giá trị từ 0 đến ScaleFactor. Nếu chúng ta để nó ở đó, view của chúng ta sẽ được thu nhỏ xuống 0 khi ở cạnh màn hình. Chúng ta muốn chúng ở kích thước bình thường ở cạnh màn hình, vì vậy offset của chúng ta là 1f.

Cho đến hiện tại, mọi thứ ở trên bao gồm tỉ lệ của view liên quan đến vị trí trên màn hình. Nhưng chúng ta thiếu một điều. Cùng setup RecyclerView của chúng ta trong **activity_main.xml**

#### activity_main.xml

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ffffff">
    <supahsoftware.androidexamplecarousel.HorizontalCarouselRecyclerView
        android:id="@+id/item_list"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:clipToPadding="false"
        android:overScrollMode="never" />

</LinearLayout>
```

Điều quan trọng nhất ở đây là `android:clipToPadding=”false”`. Nó cho phép custom padding hoạt động chính xác trong function khởi tạo của chúng ta. Nếu không có dòng này, children sẽ bị clipped bởi RecyclerView padding.

Bây giờ chúng ta đã có mọi thứ để setup đúng cách, vậy view của chúng ta sẽ co giãn theo vị trí của nó trên màn hình.

Hãy chuyển sang việc thay đổi màu sắc của view cùng với tỉ lệ.

Quay lại **HorizontalCarouselRecyclerView.kt**, chúng ta cần thêm một vài biến mới

#### HorizontalCarouselRecyclerView.kt

```
private val activeColor
        by lazy { ContextCompat.getColor(context, R.color.blue) }
private val inactiveColor
        by lazy { ContextCompat.getColor(context, R.color.gray) }
private var viewsToChangeColor = listOf<Int>()
```

Chúng ta sẽ sử dụng 1 giá trị giữa activeColor và inactiveColor dựa trên vị trí của nó. Chúng ta sẽ thông qua một list các view vào RecyclerView, chúng ta sẽ thay đổi màu sắc vì RecyclerView không thể trực tiếp biết về random view trong một random view layout. Chúng ta sẽ 
để lại phần đó cho ai đang implement điều này để họ có thể chọn màu mong muốn cho view.

Chúng ta cần 1 cách để truyền vào view trong custom RecyclerView. Hãy add thêm 1 method vào **HorizontalCarouselRecyclerView.kt**

#### orizontalCarouselRecyclerView.kt

```
fun setViewsToChangeColor(viewIds: List<Int>) {
    viewsToChangeColor = viewIds
}
```

Cuối cùng, thêm method vào để thay đổi màu của view con

```
private fun colorView(child: View, scaleValue: Float) {
    val saturationPercent = (scaleValue - 1) / 1f
    val alphaPercent = scaleValue / 2f
    val matrix = ColorMatrix()
    matrix.setSaturation(saturationPercent)

    viewsToChangeColor.forEach { viewId ->
        val viewToChangeColor = child.findViewById<View>(viewId)
        when (viewToChangeColor) {
            is ImageView -> {
                viewToChangeColor.colorFilter = ColorMatrixColorFilter(matrix)
                viewToChangeColor.imageAlpha = (255 * alphaPercent).toInt()
            }
            is TextView -> {
                val textColor = ArgbEvaluator().evaluate(saturationPercent, inactiveColor, activeColor) as Int
                viewToChangeColor.setTextColor(textColor)
            }
        }
    }
}
```

Có một điều rất quan trọng cần lưu ý ở đây là với một loại view type bạn định thay đổi màu sắc, bạn cần thêm một kiểu tra trong khối 'when' cho loại view type đó. Điều này là do không có màu của Android view để set theo cùng cách, vì vậy chúng ta phải xử lý từng trường hợp một cách rõ ràng. Tuy nhiên, trong trường hợp của chúng ta, chúng ta chỉ thay đổi ImageView và TextView, vì vậy đó là tất cả những gì chúng ta cần xử lý bây giờ.

Vì vậy, chúng ta sử dụng 'scaleValue', cái mà chúng ta sử dụng để scale view của chúng ta. Nó có phạm vi từ 1 - 2. Đối với ColorMatrix mà chúng ta sẽ sử dụng để set màu cho ImageView, chúng ta cần một giá trị trong khoảng 0 - 1, vì vậy chúng ta phải thực hiện một số phép toán để điều chỉnh phạm vi. Điều tương tự với alphaPercent, nhưng chúng ta sử dụng phạm vi 1–2 để tính toán cho chúng ta một giá trị từ 122.5 - 255, bởi vì alpha không được set giá trị 0 - 1.

ArgbEvaluator cho phép chúng ta tính toán một giá trị màu giữa 2 màu tại một điểm nhất định trong thang đo đó. Điều này cho phép chúng ta chuyển đổi suôn sẻ giữa 2 màu của chúng ta tùy thuộc vào vị trí trên màn hình.

Điều cuối cùng chúng ta cần để compile là setup adapter của chúng ta và RecyclerView trong Activity/Fragment. Cùng xem **MainActivity.kt**

#### MainActivity.kt

```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    item_list.initialize(itemAdapter)
   item_list.setViewsToChangeColor(listOf(R.id.list_item_background, R.id.list_item_text))
    itemAdapter.setItems(getLargeListOfItems())
}
```

#### Nguồn tham khảo
https://medium.com/@supahsoftware/custom-android-views-carousel-recyclerview-7b9318d23e9a

Link source code: https://github.com/SupahSoftware/AndroidExampleCarousel