# I. Giới thiệu
ViewPager2 đã được Google phát hành phiên bản alpha vào ngày 07/02/2019. Bạn có thể xem thông tin chi tiết về nó tại [đây](https://developer.android.com/jetpack/androidx/releases/viewpager2)

Cùng xem ViewPager2 mang đến cho chúng ta những gì?
# II. Những tính năng mới
Nếu so sánh với phiên bản trước đó của nó tức là: `android.support.v4.view.ViewPager`
* Hỗ trợ layout Right-to-left (RTL) 
* Hỗ trợ vuốt dọc
* `PageChangeListener` được cải tiến

 ViewPager2  được phát hành cho Android X, vì vậy nếu bạn muốn sử dụng nó thì project của bạn phải được chuyển sang Android X. Cùng xem cách chúng ta có thể sử dụng ViewPager2 mới này.
 
 # Bắt đầu
 ## 1. Gradle Dependency
 Import vào build.gradle file:
 
 ```
 dependencies {
    implementation "androidx.viewpager2:viewpager2:1.0.0-alpha01"
}
 ```
 
Sync lại project của bạn và tiếp tục nhé...

## 2. Setup
Thêm viewpager2 vào activity hoặc fragment
```
<androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager2"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
```

### 2.1. item_page.xml

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.appcompat.widget.AppCompatTextView
        android:id="@+id/tvTitle"
        android:textColor="@android:color/white"
        android:layout_width="wrap_content"
        android:layout_centerInParent="true"
        tools:text= "item"
        android:textSize="32sp"
        android:layout_height="wrap_content" />

</RelativeLayout>
```

TIếp theo, Chúng ta cần tạo Adapter cho ViewPager2 . Đây là bước quan trọng 
Bước này, chúng ta có thể sử dụng RecyclerView.Adapter. 

### 2.2. ViewPagerAdapter.kt
```
class ViewPagerAdapter : RecyclerView.Adapter<PagerVH>() {

    private val colors = intArrayOf(
        android.R.color.black,
        android.R.color.holo_red_light,
        android.R.color.holo_blue_dark,
        android.R.color.holo_purple
    )

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PagerVH =
        PagerVH(LayoutInflater.from(parent.context).inflate(R.layout.item_page, parent, false))

    override fun getItemCount(): Int = colors.size

    override fun onBindViewHolder(holder: PagerVH, position: Int) = holder.itemView.run {
        tvTitle.text = "item $position"
        container.setBackgroundResource(colors[position])
    }
}

class PagerVH(itemView: View) : RecyclerView.ViewHolder(itemView)
```

Chỉ đơn giản như vậy, không có gì thay đổi adapter! Nó giống như adapter sử dụng cho RecyclerView

Bước cuối cùng, set adapter cho ViewPager2.

```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        viewPager2.adapter = ViewPagerAdapter()
    }
}
```

Với nhưng bước trên thì viewpager hoạt động giống với Viewpager phiên bản cũ. Chúng ta cùng làm những điều mới ở version mới này

### 2.3. Vertical Scrolling
Ở version mới này. cuộn dọc được Google support trực tiếp mà bạn không cần phải custom hoặc sử dụng một thư viện của bên thứ 3. Chỉ cần đơn giản như sau
```
viewPager2.orientation = ViewPager2.ORIENTATION_VERTICAL
```

Và nó sẽ hoạt động như sau:

![](https://images.viblo.asia/e6709d97-2250-4bb3-83fe-5fa7a0a4b3ff.gif)

### 2.4. Using FragmentStateAdapter
Bạn cũng có thể sử dụng các Fragment  với ViewPager cũ. Đối với điều đó,  có FragmentStateAdapter. Chúng ta có thể sử dụng: 
```
class PagerFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.item_page, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        arguments?.let {
            container.setBackgroundResource(it.getInt("color"))
            tvTitle.text = "Item ${it.getInt("position")}"
        }
    }
}
```
Bây giờ, chúng ta sẽ tạo Adapter cho ViewPager2. 
```
class ViewPagerFragmentStateAdapter(fm: FragmentManager) : FragmentStateAdapter(fm) {

    private val colors = intArrayOf(
        android.R.color.black,
        android.R.color.holo_red_light,
        android.R.color.holo_blue_dark,
        android.R.color.holo_purple
    )

    override fun getItem(position: Int): Fragment = PagerFragment().apply {
        arguments = bundleOf(
            "color" to colors[position],
            "position" to position
        )
    }

    override fun getItemCount(): Int = colors.size
}
```
```
viewPager2.adapter = ViewPagerFragmentStateAdapter(supportFragmentManager)
```

### 2.5. OnPageChangeCallback dễ dàng
Trong ViewPager cũ , interface OnPageChangeListner đã được implement để nhận các sự kiện thay đổi / cuộn trang. Khá bất tiện khi chúng ta cần phải ghi đè cả ba phương thức (onPageScrollStateChanged, onPageScrolled, onPageSelected) ngay cả khi chúng ta không muốn.
```
oldViewPager.addOnPageChangeListener(object:ViewPager.OnPageChangeListener{
    override fun onPageScrollStateChanged(state: Int) {
        // useless
    }

    override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {
        // useless too
    }

    override fun onPageSelected(position: Int) {
        // useful
    }
})
```

Với **** Viewpager2**** chúng ta không cần phải implement tất cả các method của interface. Chỉ cần quan tâm những method chúng ta cần dùng nhờ có OnPageChangeCallback

```
viewPager2.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
    override fun onPageSelected(position: Int) {
        super.onPageSelected(position)
        // No boilerplate, only useful
    }
})
```

# III. Tổng kết
Bài viết này mình giới thiệu về ViewPager2 mà Google mới ra mắt cũng nhớ một số tiện ích nó mang lại.
Cảm ơn các bạn đã theo dõi bài viết.
Nguồn tham khảo: https://blog.usejournal.com/early-introduction-of-viewpager2-ff38c60d2169