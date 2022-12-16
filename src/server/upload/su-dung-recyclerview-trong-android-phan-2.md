# Sử dụng RecyclerView trong android phần 2
### 1 Thông báo cho adapter có sự kiện thay đổi datasource
Khi chúng ta cần thêm , sửa, xóa ... các item ở trong RecyclerView thì chúng ta cần thay đổi trực tiếp nguồn dữ liệu và thông báo cho Adapter về bất kỳ thay đổi nào. Ngoài ra, bất cứ khi nào thêm hoặc xóa các item, thì chúng ta luôn luôn phải thay đổi data hiện có. Rồi phải thông báo cho adapter rằng datasource dã bị thay đổi để RecyclerView có thể update lại 
```
|          Method            |                Description                                                          |
| notifyItemChanged(int pos) | Notify that item at position has changed.                                           |
| notifyItemInserted(int pos)| Notify that item reflected at position has been newly inserted.                     |
| notifyItemRemoved(int pos) | Notify that items previously located at position has been removed from the data set.|
| notifyDataSetChanged()     | Notify that the dataset has changed. Use only as last resort.                       |

```
Mỗi lần chúng ta muốn thêm hoặc xóa các item khỏi RecyclerView, chúng ta sẽ cần thông báo rõ ràng sự kiện đó cho adapter. Không giống như adapter của ListView, Adapter RecyclerView không nên dựa vào notifyDataSetChanged () và nên sử dụng các hành động rõ ràng hơn. Xem [API Documentation](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter) để biết thêm chi tiết.


### 2 Tùy chỉnh lại RecyclerView
#### Layouts
vị trí của các item trong RecyclerView sẽ được xác định bởi LayoutManager . Chúng ta có thể chọn giữa `LinearLayoutManager`, `GridLayoutManager`, và `StaggeredGridLayoutManager`. Linear sẽ hiển thị các item theo Vertical hoặc Hoziizontal:
```
// Setup layout manager for items with orientation
// Also supports `LinearLayoutManager.HORIZONTAL`
LinearLayoutManager layoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);
// Optionally customize the position you want to default scroll to
layoutManager.scrollToPosition(0);
// Attach layout manager to the RecyclerView
recyclerView.setLayoutManager(layoutManager);
```
Còn muốn hiển thị theo grid hoặc staggered grid thì làm tương tự nhau:
```
// First param is number of columns and second param is orientation i.e Vertical or Horizontal
StaggeredGridLayoutManager gridLayoutManager =
    new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
// Attach the layout manager to the recycler view
recyclerView.setLayoutManager(gridLayoutManager);
```
Ví dụ một staggered grid sẽ giống như này:
![alt](https://i.imgur.com/AlANFgj.png)

Hoặc chúng ta có thể custom lại [Layout Manager] (http://wiresareobsolete.com/2014/09/building-a-recyclerview-layoutmanager-part-1/) link tham khảo mình đã gắn kèm cùng dòng nhé !!

#### Decorations
Như mình đã trình bày ở phần 1 RecyclerView mặc định sẽ không có [Divider](https://developer.android.com/reference/android/support/v7/widget/DividerItemDecoration) giữa các item như trong ListView nếu muốn chúng ta có thể thêm vào bằng đoạn code sau đây:
```
RecyclerView.ItemDecoration itemDecoration = new
    DividerItemDecoration(this, DividerItemDecoration.VERTICAL);
recyclerView.addItemDecoration(itemDecoration);
```
Và đây là kết quả
![alt](https://i.imgur.com/penvJxw.png)
#### Animators
RecyclerView hỗ trợ hoạt ảnh cho các item khi chúng được thêm vào, di chuyển hoặc bị xóa bằng cách sử dụng [ItemAnimator](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ItemAnimator). Các hiệu ứng hoạt ảnh mặc định được xác định bởi [DefaultItemAnimator](https://developer.android.com/reference/android/support/v7/widget/DefaultItemAnimator)
việc thiết lập các hoạt ảnh cho các item thường rất khó và tốn nhiều thời gian nên cách nhanh nhất là sẽ sử dụng thư viện của bên thứ ba như: https://github.com/wasabeef/recyclerview-animators
Việc đầu tiên cần làm là sửa lại file `app/build.gradle` :
```
repositories {
    jcenter()
}

//If you are using a RecyclerView 23.1.0 or higher.
dependencies {
    implementation 'jp.wasabeef:recyclerview-animators:2.2.3'
}

//If you are using a RecyclerView 23.0.1 or below.
dependencies {
    implementation 'jp.wasabeef:recyclerview-animators:1.3.0'
}
```
Và công việc còn lại rất đơn giản chúng ta có thể chọn bất kỳ Animation nào cho RecyclerView:
```
recyclerView.setItemAnimator(new SlideInUpAnimator());
```
và đây là thành quả khi chúng ta trượt các item:
![alt](https://i.imgur.com/v0VyQS8.gif)
### 3 Cải thiện hiệu năng của RecyclerView
Dưới đây mình có muộn đoạn video demo:
![](https://images.viblo.asia/8f1a1aca-0434-4c67-8d31-a4c955f8e54a.gif)
Các bạn có thể nhận thấy một vài vấn đề ở đây:
*  Khi trượt RecyclerView thì không được mượt mà có sự giật lag nhẹ
*  Một vài item đầu tiên trượt rất chậm còn lại trượt rất nhanh
*  Photoslider( Giống với instagram) hoạt động cũng không mượt mà lắm

#### 3.1 Vấn đề thứ nhất
Như mình đã nói ở trên khi mình trượt RecyclerView thì không được mượt mà có sự giật lag nhẹ. Trong item của RecyclerView này có photo slider, một vài đoạn text, một rating bar, một image button để đổi trạng thái sang yêu thích , và một button.

![alt](https://cdn-images-1.medium.com/max/800/1*NPRpkrZ0lCadNLvuvYhceA.png)
Chúng ta có thể thấy itemView này cũng không phức tạp lắp có chăng cũng chỉ là cái Photo slider mà thôi. 
#### Cách giải quyết
##### 1 thêm method setHasFixedSize :
Hãy thêm đoạn code này vào phần khởi tạo RecyclerView:
`recyclerView.setHasFixedSize(true)`
Khi thêm đoạn code này thì chúng ta đã nói với RecyclerView rằng không tính toán kích thước của các View mỗi lần chúng được thêm vào hoặc bị đẩy ra khỏi RecyclerView
##### 2 thêm method setItemViewCacheSize :
`recyclerView.setItemViewCacheSize(20)`
Khi thêm dòng này vào phần khởi tạo của RecyclerView thì chúng ta sẽ tùy chỉnh lại số lượng các ViewHolder sẽ được lưu lại trước khi chúng bị đưa vào nhóm ViewHolder có khả năng được tái sử dụng để gán data mới
Thêm vào đó các ViewHolder này cũng nhận biết được có sự thay đổi về datasource cho phép Layoutmanager tái sử dụng lại các ViewHolder không bị sửa đổi mà không cần phải tái sử dụng lại ViewHolder( Cụ thể là gán lại data cho chúng)

Một cách dễ hiểu hơn là khi chúng ta cuộn RecyclerView sao cho các item gần như biến mất hoàn toàn khỏi màn hình. Thì RecyclerView sẽ giữ chúng lại để khi cuộn theo chiều ngược lại  thì các item được mang trở lại ngay lập tức mà không cần phải tái sử dụng lại ViewHolder rồi gán lại data cho chúng

##### 3 thêm method setHasStableIds :
Thêm đoạn code này vào sau phần gán adapter cho RecyclerView
`adapter.setHasStableIds(true)`
tiếp đó sửa lại hàm getItemId trong adapter như sau:

`override fun getItemId(position: Int): Long {
    return position.toLong()
}`
Khi này RecyclerView sẽ tổng hợp lại các sự kiện thay đổi cho adapter và báo cáo ID của chúng.
Điều này có thể giúp cho animation và các sự kiện của các itemView đang hiển thị sẽ vẫn  được phản hồi tới người dùng.
Đó là một vài method có thể giúp chúng ta cải thiện hiệu năng của RecyclerView . Nhưng trong trường hợp này khi mình chạy trên thiết bị Samsung khi trượt danh sách vẫn bị giật lag một chút và mình tìm ra thêm giải pháp ngoài việc sử dụng những method ở trên là sử dụng Linear hoặc Relative  layout để tạo ra Layout cho ItemView .
Trước đó do mình sử dụng ConstrainLayout cho ItemView nên có rất nhiều thẻ bị rằng buộc nên nó rất khó xử lý .
Bạn có thể xem hiệu năng của chúng:

![](https://images.viblo.asia/90402831-fa83-49e2-b303-cbda376e5c63.gif)

RecyclerView sử dụng ConstraintLayout

![](https://images.viblo.asia/64b677e8-4d31-4302-9d97-17cde726e4fe.gif)

RecyclerView không sử dụng ConstraintLayout

ConstraintLayout là ViewGroup tuyệt vời để thiết kế, nó rất dễ sử dụng và dễ hiểu, nhưng trong trường hợp này, mình nghĩ rằng nó thực sự rất tệ. Nó rất nặng về việc inflate và rằng buộc giữa các view ở trong itemView
> Mình khuyên đừng sử dụng ConstraintLayout ở trong RecyclerView
#### 3.2 Vấn đề thứ hai:

Vấn đề thứ hai là một số mục đầu tiên cuộn chậm vì onCreateViewHolder () đã được gọi để khởi tạo 6 ViewHolder đầu tiên
Vì vậy, chúng ta có thể yêu cầu RecyclerView khởi tạo tất cả 6 mục đầu tiên trong lần khởi tạo đầu tiên.
Nhưng làm thế nào ? PreCachingLayoutManager là giải pháp cho trường hợp này !!!

Chúng ta sẽ CustomLayoutmanager để khởi tạo một vài ItemView trong lần chạy đầu tiên.
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

Ở trên đây là  PreCachingLayoutManager được extend từ LinearLayoutManager các bạn có thể thấy ở đây có phương thức setExtraLayoutSpace với một tham số duy nhất. Phương thức này sẽ trả về khoảng không gian cần được bố trí bởi LayoutManager và prameter trong trường hợp này là pixel . Điều này có nghĩa là nếu chúng ta muốn khởi tạo một vài item trước  chungs có thể gán nó thành [Chiều cao của thiết bị * 2] làm không gian cho Layout.

> Chú ý một điều ở đây là vì chúng ta mở rộng không gian của Layout điều này dẫn đến việc tiêu tốn tài nguyên của thiết bị vì vậy sau lần khởi tạo các itemView đầu tiên thì nên nhớ đặt nó về giá trị mặc định
#### 3.3 Vấn đề cuối cùng:
  ![alt](https://cdn-images-1.medium.com/max/800/1*NPRpkrZ0lCadNLvuvYhceA.png)
Ở đây chúng ta có một RecyclerView  với các ItemView được bố trí theo chiều dọc và bên trong mỗi ItemView có một danh sách các ảnh trượt theo chiều ngang. Các danh sách Ngang này là PhotoSlider và nếu chúng ta search cách tạo ra cái Photoslider này thì đa số kết quả sẽ chỉ cho bạn rằng sử dụng ViewPager để tạo ra PhotoSlider

Nhưng trong trường hợp này , trong RecyclerView có nhiều ItemView trong mỗi ItemView lại có ViewPager và vấn đề giật lag ở đây là do một fragment ở trong ViewPager sẽ chỉ dùng để hiển thị một hình ảnh. 
Do đó cách giải quyết tối ưu trong trường hợp này là sử dụng một RecyclerView ngang  với [linearSnapHelper ()](https://proandroiddev.com/android-recyclerview-snaphelper-19eaa9598da6) để hoạt động như ViewPager thay vì ViewPager cho PhotoSlider.

Bằng cách sử dụng một RecyclerView thay thế cho ViewPager thì việc trượt các bức ảnh đã mượt mà hơn nhưng bên cạnh đó lại có vấn đề nhỏ với RecyclerView Parent . Khi người dùng trượt RecyclerView Parent thì mỗi RecyclerView trong ItemView sẽ lại khởi tạo lại điều này xảy ra là do các Nested RecyclerView cũng có View pool của chính nó.
 Để sửa vấn đề trên thì chúng ta sẽ gán một ViewPool duy nhất cho tất cả RecyclerView trong itemView 
    
    `override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
    //Create viewHolder etc
    holder.photoSliderRecyclerView.setRecycledViewPool(viewPool);
}`
Cảm ơn các bạn đã đọc bài viết của mình!!!
Theo [Amir Hossein Ghasemi Moroodi ](https://medium.com/@amir.ghm) đã chia sẻ kiến thức !