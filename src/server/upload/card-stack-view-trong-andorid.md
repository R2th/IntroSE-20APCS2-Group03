Xin chào mọi người. Hôm nay mình sẽ chi sẻ một thư viện khá hữu ích khi làm việc với stackview.
Chắc hẳn mọi người đã biết app Tinder, mình sẽ làm chức năng giống như vậy. HIển thị stackview và có thể swiper nó.

Vậy stackview là  gì ? 

Trước tiên, ta phải hiểu khái niệm stack .  Theo wiki định nghĩa: 
> Một ngăn xếp là một cấu trúc dữ liệu dạng thùng chứa (container) của các phần tử (thường gọi là các nút (node)) và có hai phép toán cơ bản: push and pop. Push bổ sung một phần tử vào đỉnh (top) của ngăn xếp, nghĩa là sau các phần tử đã có trong ngăn xếp. Pop giải phóng và trả về phần tử đang đứng ở đỉnh của ngăn xếp. Trong stack, các đối tượng có thể được thêm vào stack bất kỳ lúc nào nhưng chỉ có đối tượng thêm vào sau cùng mới được phép lấy ra khỏi stack.
> 
Hiểu đơn giản, stackview có nghĩa là các view xếp trồng lên nhau.

## Thêm thư viện
```
dependencies {
    implementation "com.yuyakaido.android:card-stack-view:${LatestVersion}"
}
```
## SetUp
Ta cần khai báo card stackviewManager và adapter.
Khi chọc sâu vào code thư viện ta thấy :

`public class CardStackView extends RecyclerView`

Ở đây, CardStackView được extends từ RecyclerView vì vậy sẽ có đầy đủ các thuộc tính từ RecyclerView
```
val cardStackView = findViewById<CardStackView>(R.id.card_stack_view)
cardStackView.layoutManager = CardStackLayoutManager()
cardStackView.adapter = CardStackAdapter()
```

## Custom animation swipe
Chúng ta có thể custom thời gian hiển thị (Duration), hướng vuốt (Direction) và kiểu hiển thị (setInterpolator)
```
val setting = SwipeAnimationSetting.Builder()
        .setDirection(Direction.Right)
        .setDuration(Duration.Normal.duration)
        .setInterpolator(AccelerateInterpolator())
        .build()
CardStackLayoutManager.setSwipeAnimationSetting(setting)
CardStackView.swipe()
```
## Rewind setup
Khi vuốt 1 item đi rồi, chúng ta có thể Rewind lại bằng phương thức sau:
Tương tự như khi swipe, cũng có các thuộc tính như : Duration,Direction và setInterpolator
```
val setting = RewindAnimationSetting.Builder()
        .setDirection(Direction.Bottom)
        .setDuration(Duration.Normal.duration)
        .setInterpolator(DecelerateInterpolator())
        .build()
CardStackLayoutManager.setRewindAnimationSetting(setting)
CardStackView.rewind()
```
## Overlay View
![](https://images.viblo.asia/2d0370f2-3152-4f0c-aac4-56d6d10ee3f9.png)
Khi chúng ta muốn hiển thị 1 layout đè lên trên như hình like 
Chỉ cần định nghĩa như sau: 
```
<FrameLayout
    android:id="@+id/right_overlay"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView .../>

</FrameLayout>
```
Tương tự, muốn hiển thị khi vuốt qua bên trái ta chỉ cần đồi id từ "right_overlay" -> "left_overlay" : 
![](https://images.viblo.asia/44e76845-f391-4dce-9fa7-9759735f32e5.png)
```
<FrameLayout
    android:id="@+id/left_overlay"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView .../>

</FrameLayout>
```
## Card loadmore 
THư viện này cung cấp cho chúng ta cả loadmore (ngon)
ta chỉ cần khai báo paging :

```
   private fun paginate() {
        val old = adapter.getSpots()
        val new = old.plus(createSpots())
        val callback = SpotDiffCallback(old, new)
        val result = DiffUtil.calculateDiff(callback)
        adapter.setSpots(new)
        result.dispatchUpdatesTo(adapter)
    }
```

Trước đó, ta tạo ra 1 class để diff item: 
```

import android.support.v7.util.DiffUtil

class SpotDiffCallback(
        private val old: List<Spot>,
        private val new: List<Spot>
) : DiffUtil.Callback() {

    override fun getOldListSize(): Int {
        return old.size
    }

    override fun getNewListSize(): Int {
        return new.size
    }

    override fun areItemsTheSame(oldPosition: Int, newPosition: Int): Boolean {
        return old[oldPosition].id == new[newPosition].id
    }

    override fun areContentsTheSame(oldPosition: Int, newPosition: Int): Boolean {
        return old[oldPosition] == new[newPosition]
    }

}
```

Và gọi khi vuốt còn lại vài item
```
    override fun onCardSwiped(direction: Direction) {
        Log.d("CardStackView", "onCardSwiped: p = ${manager.topPosition}, d = $direction")
        if (manager.topPosition == adapter.itemCount - 5) {
            paginate()
        }
    }
```
Rất đơn giản để có thể tạo ra 1 card stackview bằng cách sử dụng thư viện rất hữu ích này.

Bên trên, mình đã hướng dẫn cách để tạo ra 1 card stackview.

Code các bạn có thể thao khảo tại: https://github.com/yuyakaido/CardStackView/tree/master/sample

Các bạn có thể xem thêm các phương thức và thư viện tại đây: https://github.com/yuyakaido/CardStackView#public-interfaces