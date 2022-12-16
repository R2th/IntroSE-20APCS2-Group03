Đã một thời gian kể từ khi phiên bản alpha của Android ViewPager2 được Google phát hành vào ngày 7 tháng 2 năm 2019. Bạn có thể tìm thêm thông tin về bản phát hành alpha tại [đây](https://developer.android.com/jetpack/androidx/releases/viewpager2). Hãy cùng xem những gì ViewPager2 mang đến cho bạn!

# Các tính năng mới
* Hỗ trợ bố cục right to left (RTL)
* Hỗ trợ bố trí theo chiều dọc
* Sự kiện PageChangeListener tốt hơn

# Những gì đã được thay đổi so với phiên bản trước
- Ở phiên bản trước sử dụng **PageAdapter** đã được thay thế bằng **RecyclerView.Adapter**
- **FragmentStateFragmentAdapter** được thay thế bằng **FragmentStateAdapter**
-  **registerOnPageChangeCallback** được thay thế bằng **addPageChangeListener**

ViewPager2 được phát hành cho [Android X](https://developer.android.com/jetpack/androidx/),  vì vậy nếu bạn muốn sử dụng nó thì các project của mình thì phải được chuyển sang Android X. Hãy để xem cách chúng ta có thể sử dụng ViewPager2 mới này như thế nào nhé :grinning:
### Điều đầu tiên: Gradle Dependency
Thêm dependency dưới đây vào app build.gradle trong dự án của bạn 
```
dependencies {
    implementation "androidx.viewpager2:viewpager2:1.0.0-alpha01"
}
```
Chọn sync now để thêm ViewPager2 vào dự án của bạn. Bước đầu rất dễ dàng phải không nào !
### Cài đặt nào !
Thêm ViewPager2 vào trong giao diện của Activity hoặc Fragment của bạn
```
<androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager2"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
```
Nhớ hãy tạo một layout cho nó nha
**item_page.xml**
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
Tiếp theo chúng ta cần tạo Adapter cho ViewPager2. Đây là một cải tiến tuyệt vời trong phiên bản ViewPager2, chúng ta có thể tạo nó bằng RecyclerView.Adapter. Thật tuyệt vời phải không nào !!!

**ViewPagerAdapter.kt

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
Chỉ đơn giản như vậy thôi, thật tuyệt vời. Bạn có cảm thấy nó giống hệ so với việc tạo adapter cho RecyclerView mà chúng ta hay tạo không , thật quen thuộc và dễ dùng.
Bước cuối cùng chúng ta setAdapter cho ViewPager2
```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        viewPager2.adapter = ViewPagerAdapter()
    }
}
```
Vậy là chúng ta đã hoàn thành xong . 
![](https://images.viblo.asia/030d43f6-ed6c-4f49-a2f4-abd86f015da1.gif)

ViewPager2 mặc định cuộn theo chiều ngang (horizontal). Khác với ViewPager trước , ở phiên bản này nó hỗ trợ cả cuộn theo chiều dọc nữa, Awesome ! Hãy xem cách cài đặt ViewPager2 theo chiều dọc như thế nào nha
### Vertical Scrolling
Thông thường chúng ta có thể sử dụng một số thư viện để custom sử dụng ViewPager theo chiều dọc do Google không hỗ trợ điều đó. Nhưng với ViewPager2 đã hỗ trợ điều đó. Thật đơn giản bạn chỉ cần xét orientation cho nó theo chiều dọc và nó sẽ hoạt động theo đúng ý bạn muốn
Đây là kết quả :
![](https://images.viblo.asia/5c06f9ab-f1bc-417e-8874-1c5ebdcb1a38.gif)

### Sử dụng FragmentStateAdapter
Bạn cũng có thể sử dụng các Fragment như ở phiên bản cũ. ViewPager2 có hỗ trợ FragmentStateAdapter . Đầu tiên chúng ta cần khởi tạo một Fragment.
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
Tiếp theo sẽ khởi tạo Adapter cho ViewPager2. Nó sử dụng **FragmentManager** để quản lý các Fragment được thêm vào 
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
setAdapter cho ViewPager2 và xem chúng hoạt động như thế nào nhé !
```
viewPager2.adapter = ViewPagerFragmentStateAdapter(supportFragmentManager)
```

### OnPageChangeCallback thật dễ dàng 
Trong phiên bản ViewPager cũ hơn, một interface là OnPageChangeListner đã được hiển thị để lắng nghe các sự kiện thay đổi / cuộn trang. Chúng ta cần phải ghi đè cả ba phương thức (onPageScrollStateChanged, onPageScrolled, onPageSelected) ngay cả khi chúng bạn không muốn sử dụng đến chúng.
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
Đã qua rồi, giờ chúng ta có OnPageChangeCallback, một lớp abtract với **các phương thức non abtract**. Điều đó có nghĩa là chúng ta không cần ghi đè tất cả các phương thức này, chúng ta chỉ cần ghi đè lên những phương thức chúng ta quan tâm, sử dụng chúng. Tiện lợi và không còn những đoạn code bị thừa khi lắng nghe sự kiện cuộn /thay đổi trang.
```
viewPager2.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
    override fun onPageSelected(position: Int) {
        super.onPageSelected(position)
        // No boilerplate, only useful
    }
})
```

## Chú ý!
Vì đây là giai đoạn alpha, có một số tính năng của ViewPager cũ chưa được triển khai hoặc đã không hoạt động đúng trong phiên bản này.
Theo tài liệu trên trang chủ của Google đã liệt kê ra một số lỗi sau:

- ClipToPadding
- Không triển khai để tích hợp với TabLayout
- Không kiểm soát giới hạn màn hình
- Không có setWidth (bắt buộc 100% / 100%)

Hi vọng những điều này sẽ được chỉnh sửa ở phiên bản chính thức. Với sự thay đổi giúp tiện lợi hơn trong việc sử dụng và lắng nghe các sự kiện thì nó thật đáng để mong chờ !

### Tổng kết
Trên đây là một số tìm hiểu của mình về ViewPager2. Chúng ta cùng theo dõi vào góp ý nha !