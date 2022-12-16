![](https://images.viblo.asia/4e30d6eb-5d14-4485-b82f-14acdff9d4f3.jpeg)


Ảnh lấy từ nguồn : https://medium.com/@mitchell.687/an-introduction-to-viewpager2-84dfa06c8b23

Đầu năm 2019, Google đã công bố bản Viewpager2 alpha-04 trong Google IO/19. Viewpager2 là sự thay thế của Viewpager và nhiều vượt trội hơn thế nữa. Sự thay đổi lớn nhất trong viewpager2 là bây giờ nó sử dụng RecyclerView. Trên hết , Bạn cần phải chuyển sang AndroidX bởi vì Viewpager2 không hỗ trợ `android.support library`. Trong bài báo này, mình sẽ không đi quá sâu vào vấn đề chuyển sang AndroidX hay bất kì vấn đề trong quá trình  chuyển sang AndroidX kể cả trong dự án lớn. Để chuyển sang AndroidX bạn có thể làm với Android Studio bằng cách click vào Refactor và sau đó lựa chọn **Migrate to AndroidX**. Bạn có thể tham khảo vào link này : https://developer.android.com/jetpack/androidx/migrate

### ViewPager2 có gì mới ?

Như mình đã cập ở trên, Điểm quan trọng nhất trong Viewpager2 là được dựng lên dựa vào RecyclerView Component. Vì thế nên bạn có thể sử dụng RecyclerView.Adapter với Viewpager2 trong Adapter class của bạn. RecyclerView mang lại cho chúng ta nhiều lợi thế hơn nó cũng có một tập hợp fragment cần sửa đổi và nhiều hơn thế nữa,

Những thay đổi mới dưới đây, đó là lý do để chọn ViewPager2 thay vì ViewPager: 
- Viewpager2 dựa trên RecyclerView.
- Hỗ trợ Right-to-left(RTL)
- Cho phép thiết lập phân trang theo chiều dọc => có hỗ trợ LayoutManager. 
- Kiểm tra sự thay đổi được cải thiện.
- Khả năng scroll 
- Diff Util được hỗ trợ từ khi có RecyclerView.
- ItemDecorator cũng được hỗ trợ
- CompositePageTransformer được giới thiệu để kết hợp với chuyển dịch trang
- MarginPageTransformer được giới thiệu để tạo khoảng cách giữa cách trang.

### API
- FragmentStateAdapter  thay thế FragmentStatePagerAdapter
- RecyclerView.Adapter thay thế PagerAdapter
- RegisterOnPageChangeCallback  thay thế addPageChangeListener()

Google Dev đã chuyển 1 cách hoàn thiện từ Viewpager sang Viewpager2 với nhiều tính năng mới vượt trội hơn.

### Chúng ta cùng đi vào tìm hiểu sâu hơn về Viewpager2 nhé!

Khi tôi nhìn vào trong source code của ViewPager2, Tôi nhận ra rằng Viewpager2 chỉ có 1 class duy nhất, có nghĩa rằng nó không có thừa kế từ Viewpager2 suy ra nó không phải là CustomViewpager. Viewpager2 cơ bản extend từ ViewGroup. Nó thực lòng làm mình tò mò và bắt đầu so sánh sự khác biệt  về source code và tôi nhận ra rằng Viewpager có gần 3000 dòng code trong khi Viewpage2 chỉ có gần 1500 dòng code ít phức tạp hơn bởi vì nó dựa vào RecyclerView ám chỉ rằng sử dụng RecyclerView và không có sự khác biệt quá nhiều so với RecyclerView.

Trong Constructor method in VP2, Có một phương thức được gọi initialize().

Các nhà phát triển của Google đã sửa đổi một chút RecyclerView để tận dụng khả năng truy xuất, điểu khiển scroll và cũng khởi tạo LinearLayoutManager. Thông qua LinearLayoutManager để điều chỉnh khả năng truy cập của người dùng khi scroll của người dùng bị vô hiệu hóa. Sau tất cả , Đối tượng LayoutManager  được thiết lập tới RecyclerView 

setOrientation() được đặt bên trong Viewpager. ViewPager2 có Vertical và Horizontal . Horizontal là mặc định.

Bạn có thể sử dụng PagerSnapHelper cùng với RecyclerView. PagerSnapHelper giúp bạn có cử xử như là Viewpager . Vì thế PagerSnapHelper được đính kèm với RecyclerView trong ViewPager2

### Các bước thực hiện ViewPager2

1) Viewpager2 được khai báo trong Gradle, Bạn có thể kiểm trả version cuối cùng tại link : https://developer.android.com/jetpack/androidx/releases/viewpager2

 ```
dependencies {
    implementation "androidx.viewpager2:viewpager2:1.0.0"
}
```

2) Sau khi Sync lại Gradle ,Chúng ta đã có ViewPager2 trong project của chúng ta rồi.  Và chúng ta sử dụng nó trong XML : 

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.viewpager2.widget.ViewPager2
   xmlns:android="http://schemas.android.com/apk/res/android"
   android:id="@+id/viewPager2"
   android:layout_width="match_parent"
   android:layout_height="match_parent" />
```

Đơn giản chúng ta tạo 1 list để lưu dữ liệu cho Adapter của chúng ta:

```
val categories = listOf(
   Category(1, "Your Recording"),
   Category(2, "Film"),
   Category(3, "Series"),
   Category(4, "Kids"),
   Category(5, "Sport")
)
```

4) Tạo Adapter bằng cách sử dụng :

**RecyclerView.Adapter**
```
class CategoryAdapter : RecyclerView.Adapter<CategoryViewHolder>() {
    var list: List<Category> = listOf()
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CategoryViewHolder {
        return CategoryViewHolder(parent)
    }
    
     override fun onBindViewHolder(holder: CategoryViewHolder, position: Int) {
        holder.bind(list[position])
    }
    
    fun setItem(list: List<Category>) {
        this.list = list
        notifyDataSetChanged()
    }
    
    override fun getItemCount(): Int = list.size
}
```

**ViewHolder:**
```
class CategoryViewHolder constructor(itemView: View) : RecyclerView.ViewHolder(itemView) {

    constructor(parent: ViewGroup) : this(LayoutInflater.from(parent.context).inflate(R.layout.category_item, parent, false))
    
    fun bind(category: Category) {
        itemView.categoryName.text = category.name
    }
}
```

5) Gán Adapter cho Viewpager2
```
viewPager2.adapter = CategoryAdapter()
adapter.setItem(categories)
```

6) Bước này là bước quan trọng nhất là kết quả bạn vừa làm xong.

![](https://images.viblo.asia/b1c06873-a043-4960-8557-cc80fce7a8f5.gif)


Ngoài ra , Viewpager2 mang lại cho bạn 1 trải nghiệm mới nữa là orientation điều chỉnh trong code của bạn. Nếu bạn cần thiết lập Vertical cho viewpager2:

`viewPager2.orientation = ViewPager2.ORIENTATION_VERTICAL`

![](https://images.viblo.asia/3603edf2-6f57-4073-a94c-4214cd58e62b.gif)


Sau khi chúng ta thực hiện xong một ví dụ đơn giản với Viewpager2 chắc các bạn cũng nhận ra mình thực thi nó như là mình đang làm với RecyclerView nhỉ.

**Sử dụng OnPageChangeCallback()**

Một điểm lợi thế của Viewpager2 nữa là các phương thức của  OnPageChangeCallback : onPageSelected(), onPageScrollStateChanged() and onPageScrolled(). Với Viewpager2 bạn không cần phải override tất cả chúng, chỉ lấy nhưng method mà  bạn cần thôi.

Để sử dụng OnPageChangeCallback bạn cần phải đăng kí :

```
viewPager2.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
    //override method(s) what you need it
})
```
onPageSelected() : Phương thức này được gọi khi page mới được chọn

onPageScrollStateChanged() : Được gọi khi được cuộn

onPageScrolled() : Được gọi khi page hiện tại đã được cuộn xong

Và bạn cũng đừng có quên **unregister** nhé : 

```
override fun onDestroy() {
    super.onDestroy()
    viewPager2.unregisterOnPageChangeCallback(viewPager2PageChangeCallback)
}
```

### Sử dụng PageTransformer, MarginPageTransformer, and CompositePageTransformer

Để làm cho việc chuyển đổi Page của chúng ta có ít Animation hay hiệu ứng chúng ta sử dụng PageTransformer.

Tạo hiệu ứng  và tạo Animation một cách dễ dàng bằng sự trợ giúp của PageTransformer, MarginPageTransformer và CompositePageTransformer. Bạn có thể dễ dàng tạo animations với PageTransformer như sau : 

```
class ViewPager2PageTransformation : ViewPager2.PageTransformer {
override fun transformPage(page: View, position: Float) {
        when {
            position < -1 ->
                page.alpha = 0.1f
            position <= 1 -> {
                page.alpha = Math.max(0.2f, 1 - Math.abs(position))
            }
            else -> page.alpha = 0.1f
        }
    }
}
```

Thêm hiệu ứng của Animation bằng cách áp dụng translation  theo trục X và Y của page.

```
class ViewPager2PageTransformation : ViewPager2.PageTransformer {
override fun transformPage(page: View, position: Float) {
        val absPos = Math.abs(position)
        page.apply {
            translationY = absPos * 500f
            translationX = absPos * 500f
            scaleX = 1f
            scaleY = 1f
        }
        when {
            position < -1 -> page.alpha = 0.1f
            position <= 1 -> page.alpha = Math.max(0.2f, 1 - Math.abs(position))
            else -> page.alpha = 0.1f
        }
    }
}
```

Sau tất cả ,  Bạn vẫn cần phải gán cho ViewPager2:

`viewPager2.setPageTransformer(ViewPager2PageTransformation())`

Hơn thế nữa nếu bạn muốn tạo khoảng trắng giữa các pages , bạn chỉ cần sử dụng `MarginPageTransformer(marginPx) `đó là cái mới trong Viewpager2

**Chú ý** : marginPx không được là giá trị âm nếu không app của bạn sẽ bị cash. 

`val marginPageTransformer = MarginPageTransformer(50)`

**CompositePageTransformer** nếu bạn để ý tên của hàm này cũng chính là tác dụng của nó là tổng hợp lại . Nếu bạn có 1 chuỗi tuần tự CompositePageTransformer cho phép bạn tổng hợp tất cả chúng lại :

```
viewPager2.setPageTransformer(CompositePageTransformer().also {
    it.addTransformer(marginPageTransformer)
    it.addTransformer(translationPageTransformer())
})
```

và đây là kết quả :

![](https://images.viblo.asia/de072284-141b-4ab4-b2a6-f809b4929588.gif)

**Và cuối cùng ...**

Cám ơn các bạn đã đọc bài viết này, Hy vọng nó giúp ích cho các bạn trong các project mà bạn dự tính làm hay dự án có dự định sẽ chuyển AndroidX.  Vì Viewpager2 có nhiều lợi thế hơn rất nhiều so với Viewpager của ngày xưa.

Hẹn gặp bạn trong 1 bài gần nhất . Nếu có sai xót gì bạn có thể comment bên dưới để mình cải thiện hơn nhé :kissing_heart::kissing_heart::kissing_heart:

Link tham khảo : https://proandroiddev.com/look-deep-into-viewpager2-13eb8e06e419