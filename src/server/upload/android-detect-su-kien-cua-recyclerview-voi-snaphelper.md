# Giới thiệu
* Chào các bạn! Khi đến với bài viết này, hẳn là các bạn đã rất quen thuộc với [RecyclerView](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter#notifyItemChanged(int))  .  Trong quá trình sử dụng, các bạn đã gặp vấn đề là detect các hành vi (behavior) của RecyclerView chưa nhỉ? Và với [SnapHelper](https://developer.android.com/reference/android/support/v7/widget/SnapHelper) chính là công cụ để giúp ta làm điều đó. 
* Mặc định khi thao tác cuộn, vuốt dừng lại, recyclerview có thể dừng lại ở bất kỳ vị trí nào. Tuy nhiên, nếu muốn cuộn phần từ đầu của danh sách dừng lại ở biên hoặc các hình thức khác thì chúng ta phải dùng đến các lớp SnapHelper và extend của nó để làm việc này. Đây là công dụng dễ thấy nhất của SnapHelper.
* Không chỉ dừng lại ở đó, chúng ta còn có thể làm được nhiều hơn với SnapHelper như sau:
    * Tìm vị trí hiện tại của item đang được focus.
    * Lắng nghe event các item đã bị thay đổi.

# Nội dung:
Đầu tiên mình xin nhắc lại các lớp con của SnapHelper và công dụng chính của nó:
* `LinearSnapHelper` có tác dụng là tự động đưa các item gần trung tâm nhất của RecyclerView vào giữa : 

![](https://images.viblo.asia/cff72220-72ce-466e-8663-4b4f12503f2d.gif)

* `PagerSnapHelper` thì làm cho 1 item hiển thị trên toàn màn hình, và hoạt động tương tự như một [Viewpager](https://developer.android.com/reference/android/support/v4/view/ViewPager).

![](https://images.viblo.asia/748a29ef-0192-448f-b44b-b3bf7a0720fa.gif)

Rất dễ dàng để chúng ta có thể implement được các lớp con này như sau:

```
val snapHelper = LinearSnapHelper() // Or PagerSnapHelper
snapHelper.attachToRecyclerView(recyclerView)
```

*  Và vấn đề của chúng ta muốn biết khi nào vị trí snap đã thay đổi. Ví dụ, bây giờ chúng ta đang sử dụng `PagerSnapHelper` và muốn hiện thị một page indicator. Làm sao để chúng ta có thể thực hiện được điều này? Các class kế thừa từ `SnapHelper` như `PagerSnapHelper` rất phức tạp và không có nhiều module nên do đó việc kế thừa class này không phải là một ý tưởng hay.
*  Rất may là chúng ta có thể sử dụng các class của RecyclerView có sẵn để làm điều này như sau:

### 1. Tìm vị trí snap (snap position)
* Bước đầu tiên là chúng ta cần là xác định vị trí đang được snap. Và hiện tại chưa có bất cứ method có sẵn nào giúp chúng ta làm điều này trong `SnapHelper`. Nên chúng ta phải tự làm thôi.
*  `SnapHelper` đang chỉ cung cấp cho chúng ta cách để tìm một snap view ở hiện tại. Và việc của chúng ta là phải truyền [LayoutManager](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager) đang được sử dụng bởi RecyclerView đang được attach: 
```
val layoutManager = recyclerView.layoutManager
val snapView = snapHelper.findSnapView(layoutManager)
```
* Và sau đó chúng ta có thể sử dụng `LayoutManager ` để xác định vị trí của itemView này :

```
val snapPosition = layoutManager.getPosition(snapView)
```

* Chúng ta có thể đưa nó vào extension để tái sử dụng như sau : 
```
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.SnapHelper

fun SnapHelper.getSnapPosition(recyclerView: RecyclerView): Int {
    val layoutManager = recyclerView.layoutManager ?: return RecyclerView.NO_POSITION
    val snapView = findSnapView(layoutManager) ?: return RecyclerView.NO_POSITION
    return layoutManager.getPosition(snapView)
}
```

### 2. Lắng nghe sự thay đổi vị trí của snap:
* Trước khi đào sâu vào tìm hiểu cách chúng ta xác định vị trí thay đổi thì cần có 1 interface callback: 

```
interface OnSnapPositionChangeListener {

    fun onSnapPositionChange(position: Int)
}
```
**Xác định sự thay đổi vị trí snap**
* Chúng ta biết rằng vị trí của snap chỉ thay đổi khi RecyclerView được scroll. Như vậy, để xác định sự thay đổi, chúng ta sẽ kết hợp medthod `getSnapPosition` mà chúng ta đã làm trước đó với một subclass của OnScrollListener. Điều này quan trọng để có thể theo dõi sự thay đổi của vị trí snap. Vì vậy class của chúng ta cần giữ một tham chiếu đến vị trí cuối cùng đã thay đổi, và đây sẽ là nơi đặt callback:

```
private var snapPosition = RecyclerView.NO_POSITION

override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
    maybeNotifySnapPositionChange(recyclerView)
}

private fun maybeNotifySnapPositionChange(recyclerView: RecyclerView) {
    val snapPosition = snapHelper.getSnapPosition(recyclerView)
    val snapPositionChanged = this.snapPosition != snapPosition
    if (snapPositionChanged) {
        onSnapPositionChangeListener
            .onSnapPositionChange(snapPosition)
        this.snapPosition = snapPosition
    }
}
```
![](https://images.viblo.asia/a0e36267-8935-4ab3-a408-b47f113d2cc4.gif)

**Thêm một option để notify là việc scroll đã kết thúc**:
 Những method được implement ở trên sẽ thông báo cho chúng ta mỗi khi có sư thay đổi vị trí của snap trong suốt quá trình scroll, cụ thể khi sử dụng một `LinearSnapHelper` .  Và đôi khi điều này là hơi dư thừa, chẳng hạn như chúng ta chỉ muốn được notify khi mà quá trình scroll đã kết thúc thôi thì sao? Chúng ta sẽ làm như sau
* Đầu tiên , tạo một enum class để định nghĩa 2 options:

```
enum class Behavior {
    NOTIFY_ON_SCROLL,
    NOTIFY_ON_SCROLL_STATE_IDLE
}
```
* Sau đó sử dụng callback `OnScrollListener` để lắng nghe điều các option theo điều kiện :

```
override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
    if (newState == RecyclerView.SCROLL_STATE_IDLE) {
        maybeNotifySnapPositionChange(recyclerView)
    }
}
```
Và đây là kết quả : 

![](https://images.viblo.asia/e23cc2cb-f0a1-491d-8b26-9839327d25fa.gif)

### Toàn bộ implement của chúng ta :
Đây là sự kết hợp toàn bộ những gì chúng ta đã tìm hiểu nãy giờ và có thêm check nullable, default param:

```
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.SnapHelper

class SnapOnScrollListener(
        private val snapHelper: SnapHelper,
        var behavior: Behavior = Behavior.NOTIFY_ON_SCROLL,
        var onSnapPositionChangeListener: OnSnapPositionChangeListener? = null
) : RecyclerView.OnScrollListener() {

    enum class Behavior {
        NOTIFY_ON_SCROLL,
        NOTIFY_ON_SCROLL_STATE_IDLE
    }

    private var snapPosition = RecyclerView.NO_POSITION

    override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
        if (behavior == Behavior.NOTIFY_ON_SCROLL) {
            maybeNotifySnapPositionChange(recyclerView)
        }
    }

    override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
        if (behavior == Behavior.NOTIFY_ON_SCROLL_STATE_IDLE
                && newState == RecyclerView.SCROLL_STATE_IDLE) {
            maybeNotifySnapPositionChange(recyclerView)
        }
    }

    private fun maybeNotifySnapPositionChange(recyclerView: RecyclerView) {
        val snapPosition = snapHelper.getSnapPosition(recyclerView)
        val snapPositionChanged = this.snapPosition != snapPosition
        if (snapPositionChanged) {
            onSnapPositionChangeListener?.onSnapPositionChange(snapPosition)
            this.snapPosition = snapPosition
        }
    }
}
```
Và chúng ta sẽ sử dụng implement như sau : 
```
val snapHelper = LinearSnapHelper()
val snapOnScrollListener = SnapOnScrollListener(snapHelper, behavior, onSnapPositionChangeListener)
recyclerView.addOnScrollListener(snapOnScrollListener)
```

Bonus thêm một chút tiện lợi khi tạo nó ở trong extension function nào :
```
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.SnapHelper

fun RecyclerView.attachSnapHelperWithListener(
        snapHelper: SnapHelper,
        behavior: SnapOnScrollListener.Behavior = SnapOnScrollListener.Behavior.NOTIFY_ON_SCROLL,
        onSnapPositionChangeListener: OnSnapPositionChangeListener) {
    snapHelper.attachToRecyclerView(this)
    val snapOnScrollListener = SnapOnScrollListener(snapHelper, onSnapPositionChangeListener, behavior)
    addOnScrollListener(snapOnScrollListener)
}
```
Bây giờ việc implement `RecyclerView` với `SnapHelper` ngắn gọn và xúc tích :D
```
recyclerView.attachSnapHelperWithListener(snapHelper, behavior, onSnapPositionChangeListener)
```
# Kết luận
* Trong bài viết này chúng ta đã cùng tìm hiểu về một số kiến thức về `SnapHelper`, và cách chúng ta có thể lắng nghe, detect sự thay đổi của snap trong `RecyclerView`. Nếu có bất cứ chỗ nào cần góp ý hãy để nó ở dưới phần bình luận nhé.
* Hi vọng bài viết sẽ bổ ích với các bạn. Xin chào và hẹn gặp lại

### Reference:
* Android Developer : https://developer.android.com/reference/android/support/v7/widget/SnapHelper
* Detecting snap changes with Android’s RecyclerView SnapHelper: https://medium.com/over-engineering/detecting-snap-changes-with-androids-recyclerview-snaphelper-9e9f5e95c424