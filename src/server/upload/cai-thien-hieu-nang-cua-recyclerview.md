Trong dự án trước của tôi, tôi đã làm việc trên một ứng dụng có list dọc mà mọi item trong list đó đều có list hình ảnh ngang, giống như Instagram. Và tôi đã gặp phải một số vấn đề với RecyclerView đó.
Nếu bạn tìm kiếm trên google, bạn có thể tìm được một số giải pháp hữu ích để cải thiện hiệu năng, nhưng với trường hợp của tôi (cũng có thể là của bạn nữa) thì nó không giúp được gì!
Vậy nên, tôi quyết định chia sẻ vấn đề của tôi và giải pháp của tôi.

### Vấn đề của tôi là gì
* RecyclerView khi scroll không được mượt.
* Một số item đầu tiên cuộn chậm
* Slider ảnh ngang (giống Instagram) không hoạt động tốt

### Vấn đề đầu tiên
Như tôi đã nói vấn đề đầu tiên của tôi là về smooth scroll của RecyclerView. Tôi có một RecyclerView dọc và mỗi item của nó có một photo slider, một số văn bản, thanh đánh giá, nút hình ảnh yêu thích và nút... như bên dưới

![](https://images.viblo.asia/eb11d866-2658-4e6e-9c36-437a997a5d88.png)

Như bạn thấy thì nó không phải là một view phức tạp, ngoại trừ photo slider, mặt khác chúng ta có thể thấy photo slider này trong các ứng dụng như Instagram và Airbnb và nó hoạt động một cách hoàn hảo mà không có độ trễ.

Điều đầu tiên tôi nghĩ đến là loại bỏ photo slider, tôi đã chỉ nhận xét nó để khởi tạo từ adapter của mình, nhưng RecyclerView không cuộn lại một cách trơn tru.

### Vì vây, cùng giải quyết vấn đề này nào
#### 1. Điều đầu tiên là khởi tạo RecyclerView

Nếu có thể set width and height của items trong XML file và chúng không thay đổi dựa trên nội dung của Adapter, hãy thêm dòng này vào phương thức Khởi tạo RecycleView của bạn:

`recyclerView.setHasFixedSize(true)`

Với method này, bạn đã nói với RecycleView để không tính toán kích thước của item mỗi lần chúng thêm và xóa khỏi RecycleView.

#### 2. Một phương thức khác là `ItemViewCacheSize`

`recyclerView.setItemViewCacheSize(20)`

Thiết lập số views ngoài màn hình để giữ lại trước khi thêm chúng vào pool các view có khả năng được recycle.

Cache của view ngoài màn hình nhận biết các thay đổi trong adapter đính kèm, cho phép LayoutManager sử dụng lại các view không được sửa đổi mà không cần phải quay lại adapter để rebind lại chúng.

Nói cách khác, khi bạn scroll RecyclerView sao cho có một view gần như hoàn toàn ngoài màn hình, RecyclerView sẽ giữ nó xung quanh để bạn có thể scroll nó trở lại vào view mà không phải thực thi lại phương thức `onBindViewHolder()`

#### 3. Phương thức `setHasStableIds`

`adapter.setHasStableIds(true)`

và trong adapter của bạn có dòng code này

```
override fun getItemId(position: Int): Long {
    return items[position].id.hashCode().toLong()
}
```

RecyclerView sẽ cố gắng tổng hợp các sự kiện thay đổi cấu trúc có thể nhìn thấy cho các adapter báo cáo rằng chúng có IDs ổn định khi phương thức này được sử dụng. Điều này có thể giúp cho các mục đích của animation và sự kiên trì của đối tượng trực quan nhưng các item views sẽ vẫn cần được rebound  và relaid out.

------------------

Các phương pháp này giúp bạn cải thiện hiệu suất RecyclerView của bạn và có thể chúng có thể giải quyết tất cả các vấn đề của bạn, nhưng trong trường hợp của tôi, danh sách của tôi bị cuộn với độ trễ xấu đặc biệt là trên các thiết bị Samsung. vì vậy hãy cố gắng tìm các giải pháp khác bên cạnh những phương pháp hữu ích này.

Sau 2 ngày tôi đã tìm thấy vấn đề, thật không may, đó là về ConstraintLayout.
Tôi thiết kế bố cục các mục của mình bằng ConstraintLayout và do nhiều thẻ bị ràng buộc nên nó rất nặng, vì vậy tôi thay đổi nó thành bố cục Linear và Relative và hầu hết các vấn đề của tôi đã được giải quyết.

Nó rất tuyệt, ConstraintLayout là một bố cục tuyệt vời để thiết kế, nó rất dễ sử dụng và dễ hiểu, nhưng trong trường hợp này, tôi nghĩ rằng nó thực sự khủng khiếp. Nó rất nặng để inflating và binding views.

> Don’t use ConstraintLayout in RecyclerView

### Vấn đề thứ 2
Vấn đề thứ 2 là một số items đầu tiên scroll chậm bởi vì `onCreateViewHolder()` đã gọi 6 items đầu tiên.
Vì thế, chúng ta đã cho RecyclerView load tất cả 6 items trong lần khởi tạo đầu tiên.

`PreCachingLayoutManager` chính là giải pháp

Chúng ta có thể tạo một layout manager để load một số offscreen (out of screen) items trong lần đầu.

```
class PreCachingLayoutManager : LinearLayoutManager {
    private val defaultExtraLayoutSpace = 600
    private var extraLayoutSpace = -1
private var context: Context? = null
constructor(context: Context?) : super(context) {
        this.context = context
    }
constructor(context: Context, extraLayoutSpace: Int) : super(context) {
        this.context = context
        this.extraLayoutSpace = extraLayoutSpace
    }
constructor(context: Context, orientation: Int, reverseLayout: Boolean) : super(
        context,
        orientation,
        reverseLayout
    ) {
        this.context = context
    }
fun setExtraLayoutSpace(extraLayoutSpace: Int) {
        this.extraLayoutSpace = extraLayoutSpace
    }
override fun getExtraLayoutSpace(state: RecyclerView.State): Int {
        return if (extraLayoutSpace > 0) {
            extraLayoutSpace
        } else defaultExtraLayoutSpace
    }
}
```

Đây là PreCachingLayoutManager được extended từ LinearLayoutManager. Như bạn có thể thấy có một phương thức có tên là `setExtraLayoutSpace` với một tham số. Method này trả về lượng không gian bổ sung cần được bố trí bởi LayoutManager, và tham số có đơn vị là pixel, nó có nghĩ là nếu bạn muốn preload items, bạn có thể set nó thành [DeviceHeight2] như là không gian layout mở rộng.

Nhưng hãy cẩn thận, mở rộng không gian layout thêm đặc biệt tốn kém. Vì vậy, sau của bạn, một số items đầu tiên được tải đặt nó thành giá trị mặc định.

### Vấn đề cuối cùng
Ở đây chúng ta có một RecyclerView dọc với một số list ngang trong mỗi item.
Những list ngang này là PhotoSlider và nếu bạn tìm kiếm cách để implement PhotoSlider bạn sẽ tìm được rất nhiều thư viện implement bằng ViewPager.

Nhưng với trường hợp này, chúng ta có rất nhiều items, và đương nhiên là ứng với mỗi item là rất nhiều ViewPagers, vì vậy chúng ta phải đối mặt với một loạt các Fragments chỉ để hiển thị vài hình ảnh.

Vì vậy, tôi khuyên bạn nên sử dụng RecyclerView theo chiều ngang với `linearSnapHelper()` để hoạt động như ViewPager thay vì ViewPager cho PhotoSlider.

#### Chúng ta có một số tối ưu ở đây
Khi người dùng vuốt sang bên, RecyclerView sẽ recyclers lại views và cho người dùng scroll mượt hơn. Nhưng đây không phải là trường hợp khi người dùng scrolls theo chiều dọc. Mỗi views trong RecyclerView được inflated  lại. Điều này là do mỗi RecyclerView lồng nhau có một view pool của riêng nó.

Chúng tôi có thể khắc phục điều này bằng cách đặt một view pool duy nhất cho tất cả các RecyclerViews bên trong.

```
photoSliderRecyclerView.setRecycledViewPool(RecyclerView.RecycledViewPool())
```

cho phép bạn đặt custom view pool cho recyclerView của bạn, giống như đoạn code dưới đây

```
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
    //Create viewHolder etc
    holder.photoSliderRecyclerView.setRecycledViewPool(viewPool);
}
```

-------------------------------------
Hy vọng bài viết này sẽ giúp ích được nhiều cho các bạn.

Nguồn tham khảo: https://blog.usejournal.com/improve-recyclerview-performance-ede5cec6c5bf