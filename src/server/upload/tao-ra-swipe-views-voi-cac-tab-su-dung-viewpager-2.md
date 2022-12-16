### Tổng quan
Swipe views cho phép chúng ta điều hướng các màn hình  ví dụ như các tab, bằng cử chỉ ngón tay ngang hoặc vuốt. Kiểu điều hướng này còn được gọi là phân trang ngang, bài viết này sẽ chỉ ra cách để tạo ra TabLayout cùng với Swipe views để có thể trượt giữa các tab kèm với title của tab.

### Setup
Bạn có thể tạo ra swipe views bằng cách sử dụng [ViewPager2](https://developer.android.com/reference/kotlin/androidx/viewpager2/widget/ViewPager2) trong AndroidX. Để sử dụng ViewPager2 và tabs, bạn cần phải thêm [ViewPager2](https://developer.android.com/jetpack/androidx/releases/viewpager2#androidx-deps) trong[ Material Component](https://material.io/develop/android/docs/getting-started/) vào project của bạn.
Để thiết lập layout của bạn với ViewPager2, hãy thêm phần tử <ViewPager2> vào layout XML của bạn. Ví dụ: nếu mỗi trang trong swipe views sẽ hiển thị  toàn bộ với parent layout, thì layout của bạn sẽ trông như thế này:
```
<androidx.viewpager2.widget.ViewPager2
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/pager"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
    
    
  Để chèn các view con đại diện cho mỗi trang, bạn cần liên kết layout này vào FragmentStateAdapter. Đây là cách bạn có thể sử dụng nó để vuốt qua  các đối tượng Fragment:

```
class CollectionDemoFragment : Fragment() {
    // When requested, this adapter returns a DemoObjectFragment,
    // representing an object in the collection.
    private lateinit var demoCollectionAdapter: DemoCollectionAdapter
    private lateinit var viewPager: ViewPager2

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.collection_demo, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        demoCollectionAdapter = DemoCollectionAdapter(this)
        viewPager = view.findViewById(R.id.pager)
        viewPager.adapter = demoCollectionAdapter
    }
}

class DemoCollectionAdapter(fragment: Fragment) : FragmentStateAdapter(fragment) {

    override fun getItemCount(): Int = 100

    override fun createFragment(position: Int): Fragment {
        // Return a NEW fragment instance in createFragment(int)
        val fragment = DemoObjectFragment()
        fragment.arguments = Bundle().apply {
            // Our object is just an integer :-P
            putInt(ARG_OBJECT, position + 1)
        }
        return fragment
    }
}

private const val ARG_OBJECT = "object"

// Instances of this class are fragments representing a single
// object in our collection.
class DemoObjectFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_collection_object, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        arguments?.takeIf { it.containsKey(ARG_OBJECT) }?.apply {
            val textView: TextView = view.findViewById(android.R.id.text1)
            textView.text = getInt(ARG_OBJECT).toString()
        }
    }
}
```
Các phần sau cho biết cách bạn có thể thêm các tab để giúp điều hướng giữa các trang.
    
### Thêm tab bằng TabLayout
TabLayout cung cấp một cách để hiển thị các tab theo chiều ngang. Khi được sử dụng cùng với ViewPager2, TabLayout có thể cung cấp giao diện quen thuộc để điều hướng giữa các trang trong chế độ vuốt.
![](https://images.viblo.asia/76dc67a2-a38c-484a-be18-7ae316a3535d.png)
Hình 1: Một TabLayout có bốn tab.
Để bao gồm một TabLayout trong ViewPager2, hãy thêm phần tử <TabLayout> phía trên phần tử <ViewPager2>, như được hiển thị bên dưới:
```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tab_layout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

</LinearLayout>
```
Tiếp theo, tạo một TabLayoutMediator  để liên kết TabLayout với ViewPager2 và đính kèm như sau:
```
class CollectionDemoFragment : Fragment() {
    ...
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val tabLayout = view.findViewById(R.id.tab_layout)
        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            tab.text = "OBJECT ${(position + 1)}"
        }.attach()
    }
    ...
}
```
Cảm ơn các bạn đã đọc bài dịch của mình. 
Nguồn: https://developer.android.com/guide/navigation/navigation-swipe-view-2