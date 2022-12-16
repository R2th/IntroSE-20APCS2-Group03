# Giới thiệu
* Chào các bạn! Khi đến với bài viết này, hẳn là các bạn đã rất quen thuộc với [RecyclerView](https://developer.android.com/guide/topics/ui/layout/recyclerview). Đây là một component gần như không thể thiếu khi làm việc với list trong các ứng dụng Android ở hiện tại. Và là một android developer thì mình chắc là các bạn đã nắm khá rõ cũng như sử dụng component này nhiều rồi, nào là khả năng mở rộng tốt, có thể sử dụng hiển thị kiểu dạng lưới (grid) hay list, animation, ... mình xin phép không liệt kê những tính năng hay ho và cách implement nó ở bài viết này, vì hiện tại thì những bài viết như vậy đã quá nhiều rồi.

![](https://images.viblo.asia/aeaa6b22-578d-4ef7-8821-ae0e3ae31882.png)

* Tạm gác qua những tính năng ưu việt trên, có bao giờ bạn sử dụng RecyclerView mà cảm thấy các vấn như:
    * Khi cuộn hay bị khựng, lag, không mượt mà.
    * Một số item đầu tiên cuộn rất chậm
    * Item chứa slide ảnh có thể cuộn ngang hoạt động  không ổn định.

# Nội dung
##  Vấn đề 1 : 
* Như mình đã nói ở phía trên vấn đề đầu tiên là làm sao để scroll một cách mượt mà. Ví dụ dưới đây có một vertical RecyclerView, mỗi itemView đều chứa một slider ảnh, vài TextView, một Rating bar,  2 button như sau:

![](https://images.viblo.asia/0bd070f1-21c6-4a15-8564-e1e3814570be.png)
* Như bạn thấy thì itemView này khá phức tạp, có nhiều các TextView, các Button, một Rating bar và một photo slider với cái chấm indicator. Và đúng vậy, khi đưa itemView này vào RecyclerView, nó gây ra sự giật lag, thậm chí đôi khi mình không thể cuộn ngang photo slider được. 

Và dưới đây là những cách mình đã giải quyết được vấn đề này:

### 1. Khi khởi tạo RecyclerView
* Nếu như có thể set width và height của các item trong file xml và những chỉ số này sẽ không bị thay đổi trong adapter, thì hãy thêm dòng code dưới đây khi khởi khởi tạo RecyclerView
```
recyclerView.setHasFixedSize(true)
```
* Theo cách này, chúng ta đã nói với RecyclerView
 là **không cần** tính toán lại item size mỗi khi bind thêm hoặc remove item khỏi RecyclerView. Nhờ giảm đi quá trình tính toán này mà RecyclerView sẽ mượt hơn đáng kể khi scroll.
 
###  2. Sử dụng method `setItemViewCacheSize()`

```
recyclerView.setItemViewCacheSize(20)
```
*  Đặt giới hạn số itemView được giữ lại khi đang không hiển thị trước khi thêm chúng vào view pool có thể tái sử dụng (recycled view pool). 
*  Như chúng ta đã biết thì luôn có bộ nhớ cache giữ một số itemView vẫn tồn tại khi khi mà nó bị cuộn ra khỏi phần hiển thị của màn hình. [LayoutManager](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager) cho phép RecyclerView tái sử dụng lại những view này. Nếu như không có gì update trong các view này thì khi chúng ta scroll lại vào những view này, adapter không cần phải bind lại chúng. Và khi sử dụng hàm `setItemViewCacheSize()` chúng ta có thể tăng số lượng view được giữ lại, tránh việc phải bind lại hoặc tệ hơn là phải tạo lại, nhờ như vậy mà chúng ta có thể cải thiện được tốc độ của recyclerview.   
*  Tuy nhiên, hãy lưu ý khi sử dụng method này. Việc giữ lại quá nhiều view có thể gây tốn bộ nhớ, và có thể sinh ra bug(hiển thị sai data) khi data trong view này bị thay đổi.

### 3. Sử dụng method `setHasStableIds()`
Hãy thêm:
```
adapter.setHasStableIds(true)
```
Và override lại method `getItemId()` trong adapter của chúng ta như sau:

```
// Bên trong class adapter
override fun getItemId(position: Int): Long {
    return items[position].id.hashCode().toLong()
}
```
* RecyclerView sẽ cố gắng tổng hợp các event thay đổi cấu trúc đang hiển thị cho adapter là chúng có Ids ổn định khi method này được sử dụng. Điều này sẽ giảm đi hiện tượng giật nháy khi dữ được bind lại và thêm được animation khi các item bị thay đổi vị trí (có animation thì trông mượt hơn thì rõ rồi :D ). Tuy nhiên, cần phải đảm bảo rằng với mỗi các data trên item thì chỉ có một id tương ứng và id này sẽ không đổi khi submit data.
 
 
-----

Trên đây là những method có thể giúp chúng ta cải thiện được đáng kể hiệu suất của RecyclerView và gần như có tránh được hiện tượng giật và lag trong RecyclerView. 

Nhưng trong trường hợp của mình (ở trên), tình trạng lag của list vẫn diễn ra, đặc biệt làm trên các device Samsung. Và sau vài ngày tiếp tục đào xới google, đọc lại code thì mình đã tìm ra nguyên nhân trong recyclerview của mình đó chính là *ConstraintLayout*. Mình đã code tất cả các item xml bằng *ConstraintLayout*. Và do cơ chế rằng buộc của layout này, làm nhiều tag bị ràng buộc lẫn nhau nên nó rất nặng. Vì vậy nên mình đã thay đổi layout khi code lại xml itemView bằng LinearLayout hoặc RelativeLayout. Và gần nhưng vấn đề của mình đã được giải quyết.   

*ConstraintLayout* đúng là rất tuyệt với, nó cơ động, dễ dàng để hiểu và sử dụng, có thể áp dụng vào những case khó mà các layout khác không làm được hoặc cần phải tốn nhiều effort. Tuy nhiên, trong trường hợp sử dụng để design cho ItemView của RecyclerView thì thật sự không ổn. *ConstraintLayout* quá nặng trong việc inflating và binding view. Đây cũng là lý do mà Android compiler chặn không cho developer sử dụng  *ConstraintLayout* khi design notfication bar của app.

>  **Don’t use ConstraintLayout in RecyclerView**
##  Vấn đề 2 : 
* Vấn đề thứ 2 là một vài các item đầu tiên bị cuộn khá là chậm chạp bởi vì RecyclerView đã gọi  `onCreateViewHolder() ` khi cuộn cho 6 item đầu tiên. Vì vậy nên chúng ta có thể làm cho RecyclerView load trước 6 item này khi khởi tạo.
* Nhưng bằng cách nào? Giải pháp đó là sử dụng `PreCachingLayoutManager` . Chúng ta có thể tạo một layout manager để load trước các item không được hiển thị ở lần đầu tiên.

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

* Đây là `PreCachingLayoutManager` được kế thừa từ `linearLayoutManager` . Như chúng ta có thể thấy có một phương thức có tên setExtraLayoutSpace với một parameter. Method này trả về lượng không gian bổ sung cần được bố trí bởi LayoutManager và parameter nằm trong pixel, điều đó có nghĩa là muốn tải trước các item, chúng ta có thể đặt nó thành [DeviceHeight * 2] làm space bổ sung.
* Nhưng hãy cẩn thận, việc mở rộng không gian bố trí thêm sẽ tốn kém bộ nhớ. Vì vậy, sau khi chúng ta set, một số item đầu tiên được load gán nó về giá trị mặc định.

# Kết luận
* Trên đây là một vài cách để cải thiện perfomance của RecyclerView mà mình tìm hiểu được, mỗi cách đều có lưu ý khi implement. Việc nắm rõ cơ chế hoạt động của từng cách rất quan trọng để tránh phát sinh bug khi implement.
* Hi vọng những điều này có thể giúp ích cho các bạn. Nếu chỗ nào chưa ổn thì để lại dưới phần bình luận nhé. Bye!

## Reference : 
* **Stackoverflow** : https://stackoverflow.com/a/49460900/8062903
* **Improve RecyclerView Perfomance** artical: https://blog.usejournal.com/improve-recyclerview-performance-ede5cec6c5bf
* **Android develop**: https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager