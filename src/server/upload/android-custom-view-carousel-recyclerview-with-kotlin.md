Chào mọi người, hôm nay chúng ta sẽ cùng thực hiện custom view đối với RecyclerView, để hiển thị được một danh sách RecyclerView theo kiểu Carousel
### 1. Config build.gradle
- Đầu tiên, chúng ta phải thêm vào file build.gradle 2 thư viện như bên dưới
```
dependencies {
    ...
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'com.google.android.material:material:1.0.0'
}
```
### 2. HorizontalCarouselRecyclerView.kt
- Tiếp theo, chúng ta sẽ thực hiện custom recyclerView của mình với việc tạo 1 class mới và đặt tên nó là HorizontalCarouselRecyclerView.kt
```
class HorizontalCarouselRecyclerView(
    context: Context,
    attrs: AttributeSet
) : RecyclerView(context, attrs) {
    // TODO
}
```
- Đây là nơi mà hầu hết tất cả code quan trọng, chúng ta sẽ tạo tiếp một funtion cho phép khởi tạo RecyclerView với mọi thứ mà chúng ta cần
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
- Trong bài viết này, chúng ta sẽ làm cho LinearLayoutManager nằm ngang, bạn có thể sửa lại theo chiều dọc nếu bạn muốn
- Chúng ta sẽ đăng ký một AdapterDataObserver để có thể cập nhật tất cả các view của chúng ta khi dữ liệu mới được thiết lập
- Đối với việc thiết lập padding, chúng ta sẽ padding RecyclerView để các item đầu và cuối RecyclerView có thể đặt nó vào giữa màn hình, sau đó ta sẽ gọi scrollToPosition(0) để bắt đầu ở đầu danh sách
- Cuối cùng, ta thiết lập một onScrollListener để mỗi pixel mà recyclerView được cuộn, tất cả các kích thước và màu sắc item của nó sẽ được cập nhật. 
- Bây giờ, hãy quan sát  onScrollChanged() và thêm code như bên dưới vào RecyclerView custom của chúng ta
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
- Các phần quan trọng nhất của chức năng này là chúng ta đang lặp qua tất cả các item con RecyclerView, và sẽ thiết lập tỷ lệ và màu sắc cho view đó.
- Chúng ta sẽ sử dụng hệ số tỷ lệ Gaussian cho item con, điều này sẽ cho phép chúng ta chia tỷ lệ khung nhìn lớn hơn ở giữa màn hình và nhỏ hơn về phía rìa màn hình. 
- Hãy tiếp tục quan sát sâu hơn vào function getGaussianScale()
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
- Bây giờ, điều này hơi phức tạp, nhưng nếu bạn xem base function cho Gaussian cuver, nó sẽ giúp bạn dễ hiểu hơn 

![](https://images.viblo.asia/6abf8791-2252-423f-b9c7-45f8e3b9f992.png)
- Trong function Gaussian ở trên, alpha (a) là độ lớn của đường cong hình chuông (tỷ lệ mà chúng ta muốn chế độ xem nằm ở giữa màn hình), x là tâm ngang của item con, b là tâm của RecyclerView và c là 'độ căng ra' của đường cong hình chuông. 
- C càng cao, đường cong chuông càng rộng và càng nhiều view sẽ được thu nhỏ khi ở cạnh màn hình. Điều này sẽ giải thích mọi thứ trong phương thức getGaussianScale (), ngoại trừ minScale Offerset. Chúng ta cần điều đó bởi vì không có nó, phương thức sẽ trả về cho chúng ta một giá trị từ 0 đến ScaleFactor. Nếu chúng ta để nó ở đó, view của chúng ta sẽ được thu nhỏ xuống 0 ở cạnh màn hình. Chúng ta muốn chúng ở kích thước bình thường ở cạnh màn hình, vì vậy độ lệch của chúng ta là 1f.
###  3. Activity_main.xml 
- Đến lúc này, mọi thứ ở trên  bao gồm tỷ lệ của view liên quan đến vị trí màn hình. Hãy thiết lập RecyclerView của chúng ta trong Activity_main.xml 
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
- Dòng quan trọng nhất ở đây là android:clipToPadding = "false". Điều này cho phép phần custom padding hoạt động chính xác trong chức năng khởi tạo của chúng ta. Không có dòng này, item con sẽ bị cắt bởi phần padding của RecyclerView.
- Bây giờ chúng ta có mọi thứ được thiết lập đúng để các view được thu nhỏ theo vị trí của chúng trên màn hình.
- Hãy để di chuyển vào thay đổi màu sắc của khung nhìn cùng với tỷ lệ

- Quay trở lại file HorizontalCarouselRecyclerView.kt, chúng ta cần một số member variables mới 
```
private val activeColor
        by lazy { ContextCompat.getColor(context, R.color.blue) }
private val inactiveColor
        by lazy { ContextCompat.getColor(context, R.color.gray) }
private var viewsToChangeColor = listOf<Int>()
```
- Chúng ta sẽ sử dụng một giá trị giữa activeColor và inactiveColor dựa trên vị trí màn hình của nó. Chúng ta sẽ chuyển một danh sách các view tới RecyclerView mà  ta muốn thay đổi màu sắc vì RecyclerView không nên trực tiếp biết về các view ngẫu nhiên trong view layout ngẫu nhiên. Chúng ta sẽ để lại phần đó cho bất cứ ai đang thực hiện điều này để họ có thể chọn chế độ xem thay đổi màu sắc.
-  Bây giờ chúng ta cần một cách để chuyển các view vào custom RecyclerView của chúng ta. Hãy để thêm một phương thức vào HorizontalCarouselRecyclerView.kt
```
fun setViewsToChangeColor(viewIds: List<Int>) {
    viewsToChangeColor = viewIds
}
```
- Cuối cùng, thêm phương thức vào để thay đổi màu của view con
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
- Điều này rất quan trọng cần lưu ý ở đây là với mọi loại view bạn định thay đổi màu sắc, chúng ta cần phải thêm một kiểm tra cho block when với loại view đó
- Điều này là do không có color của view Android được đặt theo cùng một cách, vì vậy chúng ta phải xử lý từng trường hợp một cách rõ ràng.
- Tuy nhiên, trong trường hợp này của chúng ta thì chỉ thay đổi ImageView và TextView, vì vậy đó là tất cả những gì chúng ta cần xử lý ngay bây giờ.
- Chúng ta sẽ sử dụng ‘scaleValue để mở rộng view của mình, nó có phạm vi từ 1 - 2
-  Đối với ColorMatrix mà chúng ta sẽ sử dụng để đặt màu trên ImageView sẽ cần một giá trị từ 0 - 1, vì vậy chúng ta phải làm một số phép toán để sửa phạm vi.
- Điều tương tự đối với alphaPercent, nhưng chúng ta sử dụng phạm vi 1- 2 để tính một giá trị từ 122,5 - 255, bởi vì alpha không được đặt với giá trị 0 - 1.
- ArgbEvaluator cho phép chúng ta tính toán một giá trị màu giữa hai màu tại một điểm nhất định trong thang đo đó. Điều này cho phép chuyển đổi suôn sẻ giữa hai màu của chúng ta tùy thuộc vào vị trí màn hình.
### 4. Setup adapter & recyclerview
- Điều cuối cùng chúng ta cần làm là thiết lập adapter và RecyclerView trong Activity / Fragment của chúng ta. Hãy để ở đầu của file MainActivity.kt
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    item_list.initialize(itemAdapter)
   item_list.setViewsToChangeColor(listOf(R.id.list_item_background, R.id.list_item_text))
    itemAdapter.setItems(getLargeListOfItems())
}
```
- Điều quan trọng ở đây là chúng ta chỉ cần gọi function initialize trên custom RecyclerView của mình và chuyển qua adapter. Adapter có thể được tạo theo bất kỳ cách nào bạn muốn, nó chỉ cần extend RecyclerView.Adapter và bao gồm các mẫu soạn sẵn thích hợp để bind (ràng buộc) view của bạn.
- Và đây là thành quả thu được: 

![](https://images.viblo.asia/27be4603-6584-4f7e-96aa-c5f262c64acc.gif)
### 5. Conclusion
- Như vậy chúng ta đã thực hiện custom recyclerview thành kiểu Carousel recyclerview, hy vọng sau bài viết này, các bạn có thể áp dụng được trong dự án của mình
- Xin cảm ơn các bạn đã đọc, hẹn gặp lại trong các bài viết tiếp theo 
- Source code đầy đủ ở đây, các bạn có thể xem chi tiết hơn: https://github.com/SupahSoftware/AndroidExampleCarousel
- Nguồn tham khảo: https://medium.com/@supahsoftware/custom-android-views-carousel-recyclerview-7b9318d23e9a