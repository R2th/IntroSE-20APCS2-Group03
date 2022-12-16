# Mở đầu

Giả sử bạn phải thiết kế một giao diện với một số mô tả như sau 

![](https://images.viblo.asia/02409f8a-14b8-4aca-a894-18aef762fa87.gif)

![](https://images.viblo.asia/e87395c7-d00a-4e42-bd4e-24ac9849fa2f.png)

![](https://images.viblo.asia/7ee6e937-c793-4cc2-9473-5f6448fb0dcb.png)

![](https://images.viblo.asia/a8e80254-681f-458c-9f3d-9417813b13cc.png)

Giao diện bên trên có thể gặp ở ứng dụng về phim hoặc tv.

Về tổng quan sẽ có những đặc điểm sau:

- Yêu cầu 1: Danh sách 2 chiều

- Yêu cầu 2: Vuốt chuyển từng item

- Yêu cầu 3: Có hiệu ứng khi chuyển đổi giữa các item bao gồm: thay đổi kích thước item ở 2 bên so với ở giữa, hiển thị một phần item 2 bên (nếu có), phần  hiển thị bằng nửa phần khoảng trống ở một bên, thay đổi độ sáng tối,

Sau khi có những mô tả ngắn gọn về giao diện cần xây dừng thì chúng ta bắt đầu suy nghĩ đến giải pháp thiết kế:

1. Để có được danh sách 2 chiều thì chúng ta có thể nghĩ đến list lồng nhau: mỗi list sẽ là recyclerview hoặc viewpager.

2. Để có thể có list ngang và list dọc

- recyclerview có vẻ dễ làm vụ này, tuy nhiên sẽ mất công làm vuốt từng item cho giống viewpager như spec yêu cầu. Ngoài ra còn phải custom hiệu ứng cho việc chuyển item, có thể dùng CustomLayoutManager, hay xài thư viện này nhỉ? Có nét giống yêu cầu đấy

https://github.com/yarolegovich/DiscreteScrollView

![](https://images.viblo.asia/d88bdfd2-688d-496b-8e57-a351106e11ca.gif)

Nhưng mà vẫn thiếu phần hiệu ứng rồi, sẽ phải sửa lib nếu muốn dùng. Có vẻ chưa dễ lắm
- viewpager thì sao nhỉ? Viewpager1 thì làm được dạng ngang rồi, còn dọc thì phải dùng trick một chút mới được.
Search thử thì có bạn cũng từng làm rồi.

Implementing BiDirectional ViewPager by overriding onInterceptTouchEvent & onTouchEvent
https://bloggie.io/@_junrong/implementing-bidirectional-viewpager-by

Còn option nào khác khoog nhỉ?. Ồ may sao gần đây đã có viewpager2 hỗ trợ sẵn cả list dọc và ngang rồi.

Vậy còn vấn đề hiệu ứng chuyển item thì sao nhỉ, viewpager có PageTransformer, xem qua ví dụ thì có vẻ để làm được như yêu cầu thì cũng khả thi

https://developer.android.com/training/animation/screen-slide-2

https://proandroiddev.com/look-deep-into-viewpager2-13eb8e06e419

=> Chốt lại là theo hướng dùng **viewpager2** lồng nhau và làm hiệu ứng bằng **PageTransformer** có vẻ khả thi nhất hiện tại.

Giờ chúng ta cùng đi thực hiện xem sao nhé.

# Thực hiện

```kotlin
implementation ("androidx.viewpager2:viewpager2:1.0.0")
```

## Fragment cha chứa một viewpager dọc với mỗi item là một fragment chứa một viewpager ngang

Viewpager2 có nhiều tahy đổi trong đó có thay đổi adapter. 

- FragmentStateAdapter thay cho FragmentStatePagerAdapter
- RecyclerView.Adapter thay cho PagerAdapter

Nếu item của bạn là fragment thì bạn sẽ cần dùng FragmentStateAdapter, còn item của bạn chỉ là view thì bạn chỉ cần tới  RecyclerView.Adapter.

Và ở đây chúng ta cần adapter có chứa các fragment con nên sẽ cần tới FragmentStateAdapter.

`MovieListPagerFragment`
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/movielistpager/MovieListPagerFragment.kt
```kotlin
class MovieListPagerFragment {
...
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        val movieListPagerAdapter = MovieListPagerAdapter(
            ArrayList<MovieListType>().apply {
                add(MovieListType.POPULAR)
                add(MovieListType.TOP_RATED)
            }, this
        )

        movie_list_pager?.apply {
            clipToPadding = false
            clipChildren = false
            // retain 1 page on each size
            offscreenPageLimit = 1
            orientation = ViewPager2.ORIENTATION_VERTICAL

            adapter = movieListPagerAdapter
        }
        
    override fun onStart() {
        super.onStart()
        activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
    }

    override fun onStop() {
        activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        super.onStop()
    }
}
```


`MovieListPagerAdapter`https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/movielistpager/MovieListPagerAdapter.kt
```kotlin
class MovieListPagerAdapter(
    val typeList: ArrayList<MovieListType>,
    val fragment: Fragment
) : FragmentStateAdapter(fragment) {

    override fun getItemCount(): Int {
        return typeList.size
    }

    override fun createFragment(position: Int): Fragment {
        return MoviePagerFragment.newInstance(typeList[position].type, position)
    }
}
```

## Fragment con chứa viewpager ngang

`MoviePagerFragment` https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/moviepager/MoviePagerFragment.kt
```kotlin
class MoviePagerFragment {
...
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        viewModel.apply {
            mode.value = arguments?.getInt(TYPE)
        }

        val adapter = MoviePagerAdapter(
            itemClickListener = { toMovieDetail(it) }
        )

        container.setBackgroundColor(Color.BLACK)
        movie_pager?.apply {
            this.adapter = adapter
            setPageTransformer { view, position ->
                // TODO implement PageTransformer
            }
        }

        viewModel.apply {
            listItem.observe(viewLifecycleOwner, Observer {
                adapter.submitList(it)
            })
            firstLoad()
        }
    }

    override fun onStart() {
        super.onStart()
        activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
    }

    override fun onStop() {
        activity?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        super.onStop()
    }
}
```

Đến đây thì yêu cầu 1 và 2 đã được đáp ứng, còn yêu cầu số 3 về hiệu ứng chuyển đổi item thì chúng ta sẽ phải cài đặt thêm PageTransformer

## Hiệu ứng chuyển đổi item bằng PageTransformer

Trước khi đi vào làm hiệu ứng chúng ta cần hiệu 2 param của `setPageTransformer { view, position ->`

- view là view của item trong viewpager
- position là vị trí của view đó, nếu viewpager ở trạng thái dừng ko di chuyển có 3 item là trái, giữa, phải thì giá trị của position từ trái sang phải lần lượt là -1, 0 và 1 như hình vẽ.

![](https://images.viblo.asia/465b4455-9583-4b2f-b65b-e072ed76253a.JPG)

### Hiệu ứng sáng tối

Giả sử bạn có 2 giá trị alpha như sau:
```kotlin
    private const val MAX_ALPHA = 1.0f
    private const val MIN_ALPHA = 0.3f
```

`MAX_ALPHA` cho item ở giữa và `MIN_ALPHA` cho item 2 bên và chúng ta dùng hàm `view.alpha` để set

```kotlin
            setPageTransformer { view, position ->
                // position  -1: left, 0: center, 1: right
                val absPosition = abs(position)
                // alpha from MIN_ALPHA to MAX_ALPHA
                view.alpha = MAX_ALPHA - (MAX_ALPHA - MIN_ALPHA) * absPosition
```

### Hiệu ứng scale

Giữ sử bạn có giá trị scale như sau:
```kotlin
        private const val MAX_SCALE = 1f
        private const val SCALE_PERCENT = 0.8f
        private const val MIN_SCALE = SCALE_PERCENT * MAX_SCALE
```

`MAX_SCALE` cho item ở giữa và `MIN_SCALE` cho item 2 bên và chúng ta dùng hàm `view.scaleY` và `view.scaleX` để set
```kotlin
            setPageTransformer { view, position ->
               ...
                // scale from MIN_SCALE to MAX_SCALE
                val scale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * absPosition
                view.scaleY = scale
                view.scaleX = scale
            }
```

### Hiệu ứng dịch item bên cạnh

Nhắc lại một chút yêu cầu hiển thị một phần item 2 bên (nếu có), phần  hiển thị bằng nửa phần khoảng trống ở một bên. Như vậy chúng ta cần tính khoảng cách cần đề dịch chuyển và thực hiện set bằng hàm `view.translationX`

Thêm một chút nữa là theo design thì item width không bằng màn hình và chúng ta giả sử nó bằng 2/3 (~0.67) bề ngang của màn hình mà thôi. item height thì mình set là 0.76 height của màn hình.

- item width = 0.67 screen width
- item height = 0.76 screen height

Để biết khoảng cách dịch chuyển là bao nhiêu thì chúng ta phải tính thôi, chứ không thể mò được. 

Chúng ta cùng vẽ sơ đồ cho dễ hình dung và tính toán

![](https://images.viblo.asia/a0f062fd-9555-426f-bf2e-1d8056b98528.JPG)

trên hình chúng ta cần tính khoảng cách của dấu "?"

Khoảng cách đó sẽ bằng 1/12 + 1/6 + (1/10) * (2/3) = 19/60 (chiều ngang của màn hình)

Và item bên trái cần dịch phải (dx > 0), item bên phải cần dịch trái (dx < 0)

từ đó chúng ta có kết quả
```kotlin
        movie_pager?.apply {
            clipToPadding = false
            clipChildren = false
            ...
            // do mình thực hiện xoay màn hình nên cần lấy height chứ ko phải width
            val screenHeight = resources.displayMetrics.heightPixels
            val nextItemTranslationX = 19f * screenHeight / 60
            setPageTransformer { view, position ->
                ...
                // translation X
                view.translationX = -position * nextItemTranslationX
            }
        }
```

Từ đó chúng ta có full code của PageTransformer như sau:

https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/moviepager/MoviePagerFragment.kt#L61
```kotlin
        movie_pager?.apply {
            clipToPadding = false
            clipChildren = false
            // retain 1 page on each size
            offscreenPageLimit = 1
            this.adapter = adapter
            val screenHeight = resources.displayMetrics.heightPixels
            val nextItemTranslationX = 19f * screenHeight / 60
            setPageTransformer { view, position ->
                // position  -1: left, 0: center, 1: right
                val absPosition = abs(position)
                // alpha from MIN_ALPHA to MAX_ALPHA
                view.alpha = MAX_ALPHA - (MAX_ALPHA - MIN_ALPHA) * absPosition
                // scale from MIN_SCALE to MAX_SCALE
                val scale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * absPosition
                view.scaleY = scale
                view.scaleX = scale
                // translation X
                view.translationX = -position * nextItemTranslationX
            }
        }
```

### [Cập nhật 20/01/2020] Mở rộng hiệu ứng dịch item bên cạnh

Nếu bạn phải làm hiệu ứng dịch cho nhiều màn hình khác nhau với các số đo khác nhau thì chả lẽ mỗi trường hợp lại phải ngồi lẩn thẩn tính như này à? Có vẻ không ổn cho lắm vì mất công mà lại dễ sai nhỉ?

Vậy có cách nào tốt hơn ko, liệu có tìm được công thức ngon ngon cho nó không nhỉ? Chúng ta cùng đi vào phân tích nhé.

Từ yêu cầu thì mình sẽ lọc ra một số param như sau (mình đang xét với trường hợp horizontal viewpager)
- widthPercent = widthItem / widhtScreen
- translationPercent = kích thước item bên cạnh nhô ra / kích thước phần trống của một bên
(ví dụ: muốn item bên cạnh hiển thị 50% trong khoảng trống còn lại ở mỗi bên thì param này giá trị 0.5)
- scalePercent = kích thước màn bên cạnh / kích thước màn chính giữa

Các bạn hãy kiểm chứng công thức dưới đây nhé :D

`
translationsValue = [(1 - widthPercent) / 2 * translationPercent + (1 - widthPercent) / 2 + (1 - scalePercent) / 2 * widthPercent] * screenWidth
`

rút gọn lại sẽ có

`
translationsValue = [(1 - widthPercent) * (translationPercent + 1) + (1 - scalePercent) * widthPercent)] / 2 * screenWidth
`

với vertical viewpager các bạn chỉ cần thay param tương tự là được.

# Kết

Như vậy là đã xong phần hiệu ứng khi chuyển item của viewpager.

Từ một số yêu cầu và ví dụ cách giải quyết như vậy, các bạn có thể tùy theo yêu cầu riêng của mình mà tiến hành phân tích, bóc tách các yêu cầu để tùy chỉnh cho phù hợp.

Các bạn có thể tham khảo source code ở đây https://github.com/dangquanuet/The-Movie-DB-Kotlin

Cảm ơn các bạn đã theo dõi và hẹn gặp lại trong các bài sau :D

Ngoài ra các bạn có thể đọc thêm về viewpager 2 ở đây:

* Slide between fragments using ViewPager2:
https://developer.android.com/training/animation/screen-slide-2

* Look Deep Into ViewPager2:
https://proandroiddev.com/look-deep-into-viewpager2-13eb8e06e419