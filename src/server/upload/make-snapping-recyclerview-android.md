# Giới thiệu
Chắc hẳn đối với các lập trình viên mobile bạn đã từng gặp trường hợp tạo một UI với list item được canh giữa và có hiệu ứng zoom item được chọn. Trong trường hợp này thì có nhiều cách để thực hiện công việc trên: đối với Android chúng ta có thể sử dụng ViewPager hoặc RecyclerView. Trong bài viết này mình sẽ hướng dẫn cho các bạn cách custom một RecyclerView hỗ trợ snapping item ở giữa và hiệu ứng zoom
![](https://images.viblo.asia/328af07a-74ff-4919-a18b-0d6eca6e415c.png)

# Tiến hành
Đầu tiên là giới thiệu file custom RecyclerView, các bạn đọc qua có thể hiểu được dễ dàng, về cơ bản chúng ta sẽ lắng nghe sự kiện scroll của recyclerview và tiến hành scroll item vào giữa và scale các item còn lại để được hiệu ứng Zoom item được chọn. 
```
class SnappingRecyclerView : RecyclerView {
    private var snapEnabled = false
    private var userScrolling = false
    private var scrolling = false
    private var scrollStateTemp: Int = 0
    private var lastScrollTime: Long = 0
    private val handlerUpdate = Handler()
    private var scaleUnfocusedViews = false
    private var onItemSelectedListener: OnItemSelectedListener? = null

    private val centerView: View?
        get() = getChildClosestToPosition(measuredWidth / 2)

    val horizontalScrollOffset: Int
        get() = computeHorizontalScrollOffset()

    val verticalScrollOffset: Int
        get() = computeVerticalScrollOffset()

    constructor(context: Context) : super(context)

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs)

    /**
     * Enable snapping behaviour for this recyclerView
     * @param enabled enable or disable the snapping behaviour
     */
    fun setSnapEnabled(enabled: Boolean) {
        snapEnabled = enabled

        if (enabled) {
            addOnLayoutChangeListener(object : View.OnLayoutChangeListener {
                override fun onLayoutChange(
                    v: View, left: Int, top: Int, right: Int, bottom: Int, oldLeft: Int,
                    oldTop: Int, oldRight: Int, oldBottom: Int
                ) {
                    if (left == oldLeft && right == oldRight && top == oldTop && bottom == oldBottom) {
                        removeOnLayoutChangeListener(this)
                        updateViews()
                        handlerUpdate.postDelayed({
                            scrollToView(getChildClosestToPosition(adapter?.itemCount?.minus(1) ?: 0 / 2)) }
                            , 20)
                    }
                }
            })

            addOnScrollListener(object : RecyclerView.OnScrollListener() {
                override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                    updateViews()
                    super.onScrolled(recyclerView, dx, dy)
                }

                override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                    super.onScrollStateChanged(recyclerView, newState)

                    /** if scroll is caused by a touch (scroll touch, not any touch)  */
                    if (newState == SCROLL_STATE_TOUCH_SCROLL) {
                        /** if scroll was initiated already, this is not a user scrolling, but probably a tap, else set userScrolling  */
                        if (!scrolling) {
                            userScrolling = true
                        }
                    } else if (newState == SCROLL_STATE_IDLE) {
                            scrollToView(centerView)

                        userScrolling = false
                        scrolling = false
                    } else if (newState == SCROLL_STATE_FLING) {
                        scrolling = true
                    }

                    scrollStateTemp = newState
                }
            })
        }
    }

    /**
     * Enable snapping behaviour for this recyclerView
     * @param enabled enable or disable the snapping behaviour
     * @param scaleUnfocusedViews downScale the views which are not focused based on how far away they are from the center
     */
    fun setSnapEnabled(enabled: Boolean, scaleUnfocusedViews: Boolean) {
        this.scaleUnfocusedViews = scaleUnfocusedViews
        setSnapEnabled(enabled)
    }

    private fun updateViews() {
        for (i in 0 until childCount) {
            val child = getChildAt(i)
            setMarginsForChild(child)
            if (scaleUnfocusedViews) {
                val percentage = getPercentageFromCenter(child)
                val scale = 1f - 0.5f * percentage
                child.scaleX = scale
                child.scaleY = scale
            }
        }
    }

    /**
     * Adds the margins to a childView so a view will still center even if it's only a single child
     * @param child childView to set margins for
     */
    private fun setMarginsForChild(child: View) {
        val lastItemIndex = layoutManager!!.itemCount - 1
        val childIndex = getChildAdapterPosition(child)
        val startMargin = if (childIndex == 0) measuredWidth / 2 else 0
        val endMargin = if (childIndex == lastItemIndex) measuredWidth / 2 else 0
        (child.layoutParams as MarginLayoutParams).apply {
            marginStart = startMargin
            marginEnd = endMargin
            setMargins(startMargin, 0, endMargin, 0)
        }
        child.requestLayout()
    }

    override fun dispatchTouchEvent(event: MotionEvent): Boolean {
        if (!snapEnabled)
            return super.dispatchTouchEvent(event)

        val currentTime = System.currentTimeMillis()

        /** if touch events are being spammed, this is due to user scrolling right after a tap,
         * so set userScrolling to true  */
        if (scrolling && scrollStateTemp == SCROLL_STATE_TOUCH_SCROLL) {
            if (currentTime - lastScrollTime < MINIMUM_SCROLL_EVENT_OFFSET_MS) {
                userScrolling = true
            }
        }

        lastScrollTime = currentTime

        val targetView = getChildClosestToPosition(event.x.toInt())

        if (!userScrolling && event.action == MotionEvent.ACTION_UP && targetView !== centerView) {
            scrollToView(targetView)
            return true
        }
        return super.dispatchTouchEvent(event)
    }

    override fun onInterceptTouchEvent(e: MotionEvent): Boolean {
        if (!snapEnabled) return super.onInterceptTouchEvent(e)
        val targetView = getChildClosestToPosition(e.x.toInt())
        return if (targetView !== centerView) {
            true
        } else super.onInterceptTouchEvent(e)

    }

    private fun getChildClosestToPosition(x: Int): View? {
        if (childCount <= 0) return null
        val itemWidth = getChildAt(0).measuredWidth

        var closestX = 9999
        var closestChild: View? = null

        for (i in 0 until childCount) {
            val child = getChildAt(i)

            val childCenterX = child.x.toInt() + itemWidth / 2
            val xDistance = childCenterX - x

            /** if child center is closer than previous closest, set it as closest   */
            if (abs(xDistance) < abs(closestX)) {
                closestX = xDistance
                closestChild = child
            }
        }

        return closestChild
    }

    public fun scrollToView(child: View?) {
        if (child == null)
            return
        stopScroll()
        val scrollDistance = getScrollDistance(child)
        if (scrollDistance != 0)
            smoothScrollBy(scrollDistance, 0)
        onItemSelectedListener?.onItemSelected(getChildAdapterPosition(child))
    }

    private fun getScrollDistance(child: View): Int {
        val itemWidth = getChildAt(0).measuredWidth
        val centerX = measuredWidth / 2

        val childCenterX = child.x.toInt() + itemWidth / 2

        return childCenterX - centerX
    }

    private fun getPercentageFromCenter(child: View): Float {
        val centerX = (measuredWidth / 2).toFloat()
        val childCenterX = child.x + child.width / 2
        val offSet = max(centerX, childCenterX) - min(centerX, childCenterX)
        val maxOffset = measuredWidth / 2 + child.width
        return offSet / maxOffset
    }

    fun isChildCenterView(child: View): Boolean {
        return child === centerView
    }

    fun smoothUserScrollBy(x: Int, y: Int) {
        userScrolling = true
        smoothScrollBy(x, y)
    }

    fun addOnItemSelectedListener(onItemSelectedListener: OnItemSelectedListener) {
        this.onItemSelectedListener = onItemSelectedListener
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        handlerUpdate.removeCallbacksAndMessages(null)
    }

    companion object {
        private const val MINIMUM_SCROLL_EVENT_OFFSET_MS = 20
    }

    interface OnItemSelectedListener {
        fun onItemSelected(position: Int)
    }
}
```

# Sử dụng
Để đơn giản mình sẽ tạo một Adapter nhận vào list url image để hiển thị

 activity_main.xml
```
 <?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="jp.co.mec.saai.presentation.DemoSnappingRecyclerView">

    <com.duong.demosnappingrecyclerview.SnappingRecyclerView
        android:layout_marginTop="100dp"
        android:id="@+id/rc_image"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

```
class DemoSnappingRecyclerView : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_demo_snapping_recycler_view)

        val listImage =
            listOf<String>("https://ss-images.catscdn.vn/wm500/2020/01/20/6853789/untitled-3.jpg",
                "https://img-amp.tinmoi.vn/thumbamp/upload/camnhung/2019/05/03/luu-diec-phi-bi-boc-me-o-ban-dung-phan-thom-de-giau-mui-hoi1556848990.jpg",
                "https://cdn.vietnammoi.vn/stores/news_dataimages/vudt/112017/29/23/5204_ebvv-fyfzhap5408766-1497427103-2487-8512-1511842926.jpg",
                "https://vtv1.mediacdn.vn/thumb_w/640/2019/1/8/494679537232642480462234859189762331770880o-15469384676461258280100.jpg",
                "https://images.vov.vn/w720/uploaded/cizotokek8ly8uzveukg/2018_08_17/mulan_1200_r_aoby.jpg"
            )
        rc_image.apply {
            setSnapEnabled(enabled = true, scaleUnfocusedViews = true)
            adapter = ListAdapter(listImage)
        }
    }
}
```

Adapter

```
class ListAdapter(private val list: List<String>) : RecyclerView.Adapter<ListAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return ViewHolder(inflater, parent)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val url = list[position]
        holder.bind(url)
    }

    override fun getItemCount(): Int = list.size

    class ViewHolder(inflater: LayoutInflater, parent: ViewGroup) :
        RecyclerView.ViewHolder(inflater.inflate(R.layout.item_image, parent, false)) {
        private var imageView: ImageView = itemView.findViewById(R.id.iv_banner)

        fun bind(url: String) {
            Glide.with(itemView.context).load(url).into(imageView)
        }

    }
}
```

Chạy lên sẽ được thành quả như này nhé. Cảm ơn các bạn đã theo dõi, chúc các bạn thành công

![](https://images.viblo.asia/328af07a-74ff-4919-a18b-0d6eca6e415c.png)