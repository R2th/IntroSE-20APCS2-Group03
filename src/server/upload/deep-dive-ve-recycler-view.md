# 1. Cách hoạt động

![](https://images.viblo.asia/c3e86bf6-60b4-49cc-883a-04f39cd104fb.PNG)

Một khi RecyclerView được kết nối với Adapter , Adapter sẽ tạo ra đối tượng của các hàng (ViewHolder object) cho đến khi lấp đầy kích thước của RecyclerView và lưu trong HeapMemory . Sau đó sẽ không tạo thêm bất kỳ hàng nào để lưu trong bộ nhớ nữa Theo cách này nếu người dùng trượt danh sách, các item đã trượt khỏi màn hình sẽ được giữ ở trong bộ nhớ để tái sử dụng lại sau và mỗi khi một hàng mới được chèn vào màn hình thì đối tượng ViewHolder được lưu trong bộ nhớ sẽ được mang ra để tái sử dụng và gán dữ liệu . Nếu không gán lại dữ liệu cho ViewHolder object thì sẽ hiện thị dữ liệu được gán trước đó. Theo cách này thì kể cả danh sách có 1000 item, thì chỉ có khoảng 7 đối tượng ViewHolder được tạo ra .

- Khi danh sách được hiển thị lần đầu tiên , nó sẽ gán dữ liệu cho một vài ViewHoler object . Ví dụ nếu các View hiển thị trên màn hình có vị trí từ 0 - 9 , thì RecyclerView sẽ tạo và gán dữ liệu cho các ViewHolder đó, ngoài ra còn tạo thêm và gán dữ liệu cho View thứ 10 . theo cách này thì nếu người dùng trượt danh sách , thế View kế tiếp đã sẵn sàng để hiển thị .
- Nếu người dùng trượt danh sách , RecyclerView sẽ tạo mới một ViewHolder object nếu nó thực sự cần thiết. Và nó cũng lưu lại các ViewHolder object đã bị trượt khỏi màn hình để tái sử dụng lại sau. Nếu người dùng đổi hưởng trượt thì các ViewHolder Object vừa bị trượt ra khỏi màn hình sẽ đc show lại. Mặt khác nếu người dùng trượt danh sách theo cùng một hướng thì những ViewHolder nào bị trượt khỏi màn hình xa nhất sẽ được mang quay trở lại để gán dữ liệu mới. Viewholder sẽ không cần được tạo mới mà chỉ cập nhật dữ liệu của chúng.
- Khi các item được hiển thị thay đổi, bạn có thể thông báo cho adapter bằng cách gọi một phương thức RecyclerView.Adapter.notify ... () thích hợp. Mình sẽ nói rõ ở phần Adapter

# 2. Các thành phần của RecyclerView

## RecyclerView.Adapter
Có thể bạn ứ biết thì cái củ sạc điện thoại của bạn cũng được gọi là adapter đó, nó chuyển dòng điện dật chết người về các thông số mà điện thoại, laptop có thể nhận được :v tương tự vậy với recycler view, nó như 1 bộ chuyển đổi, lấy dữ liệu từ Datasource + kết hợp với Viewholder để pass sang LayoutManager hiển thị lên Rcv. Để implement nó cần override 3 hàm: 
- `getItemCount()` : cho biết số phần tử của dữ liệu
- `onCreateViewHolder` : tạo ra đối tượng ViewHolder, trong nó chứa View hiện thị dữ liệu
- `onBindViewHolder`: chuyển dữ liệu phần tử vào ViewHolder

## RecyclerView.ViewHolder
Là cái hồn của RecyclerView, sự khác biệt chính so với ListView hay GridView. Nó dùng để cache View trong bộ nhớ Heap. Mỗi 1 ViewHolder object tượng trưng cho 1 hàng item hiển thị trên mà hình. Như bên trên mình có giải thích, khi user cuộn xuống, các object này sẽ được tái chế lại view để bind dữ liệu lên

## LayoutManagers
Layout manager sẽ xác định các item bên trong RecyclerView được hiển thị như thế nào và khi nào phải tái sử dụng lại các item view (những item đã bị trượt khỏi màn hình)

- LinearLayoutManager : hiển thị các item trong danh sách có thể cuộn theo chiều dọc (horizontal) hoặc chiều ngang ( Vertical).
![](https://images.viblo.asia/4fc6cae6-3e5f-415a-bd54-31bfc9ae5271.PNG)

- GridLayoutManager : hiển thị các item trong danh sách theo dạng lưới.
![](https://images.viblo.asia/dd91df6a-af69-4baa-8f0a-263ddfc58c84.PNG)

- StaggeredGridLayoutManager : hiển thị các item trong danh sách theo dạng lưới so le nhau. 
![](https://images.viblo.asia/6bf9c19f-40bd-47ec-be49-25149461c3e3.PNG)

- Bạn cũng có thể custom LayoutManager theo cách của bạn :D. Còn nếu k set LayoutManager, thì rcv sẽ k hiển thị và log này sẽ đc show 
>E/RecyclerView: No layout manager attached; skipping layout

## ItemAnimator
RecyclerView.ItemAnimator sẽ tạo ra các hiệu ứng cho ViewGroup khi các item thay đổi như thêm, sửa, xóa. DefaultItemAnimator được sử dụng cho các hoạt ảnh cơ bản và nó hoạt động khá ổn. Bạn cũng có thể custom nó, nếu lười thì [Đây](https://github.com/wasabeef/recyclerview-animators) là 1 thư viện sẽ giúp bạn :D

## ItemDecoration
Các phần tử được vẽ trong RecyclerView, có thể thêm các trang trí (vẽ thêm vào) ví dụ sau mỗi phần tử có đường kẻ ngang phía dưới, phía trên, hay khoảng cách giữa các phần tử... đây là 1 ví dụ đơn giản, nếu bạn muốn đâm sâu vào nó hãy bay sang [đây](https://kipalog.com/posts/Android--Implement-StickyHeaderRecyclerView-voi-ItemDecoration-cua-RecyclerView)

```java

//Chèn một kẻ ngang giữa các phần tử
DividerItemDecoration dividerHorizontal =
    new DividerItemDecoration(this, DividerItemDecoration.VERTICAL);

recyclerView.addItemDecoration(dividerHorizontal);

//Chèn một kẻ đứng giữa các phần tử
DividerItemDecoration dividerVertical =
    new DividerItemDecoration(this, DividerItemDecoration.HORIZONTAL);
recyclerView.addItemDecoration(dividerVertical);
```

# 3. Cải thiện hiệu năng của RecyclerView

## setHasFixedSize 
`recyclerView.setHasFixedSize(true)`: nói với RecyclerView rằng không tính toán kích thước của các View mỗi lần chúng được thêm vào hoặc bị đẩy ra khỏi RecyclerView

## setItemViewCacheSize 
`recyclerView.setItemViewCacheSize(20)`: Khi thêm dòng này vào phần khởi tạo của RecyclerView thì chúng ta sẽ tùy chỉnh lại số lượng các ViewHolder sẽ được lưu lại trước khi chúng bị đưa vào nhóm ViewHolder có khả năng được tái sử dụng để gán data mới Thêm vào đó các ViewHolder này cũng nhận biết được có sự thay đổi về datasource cho phép Layoutmanager tái sử dụng lại các ViewHolder không bị sửa đổi mà không cần phải tái sử dụng lại ViewHolder( Cụ thể là gán lại data cho chúng)

Một cách dễ hiểu hơn là khi chúng ta cuộn RecyclerView sao cho các item gần như biến mất hoàn toàn khỏi màn hình. Thì RecyclerView sẽ giữ chúng lại để khi cuộn theo chiều ngược lại thì các item được mang trở lại ngay lập tức mà không cần phải tái sử dụng lại ViewHolder rồi gán lại data cho chúng

## setHasStableIds 
`adapter.setHasStableIds(true)`
`override fun getItemId(position: Int): Long { return position.toLong() }`  Khi này RecyclerView sẽ tổng hợp lại các sự kiện thay đổi cho adapter và báo cáo ID của chúng. Điều này có thể giúp cho animation và các sự kiện của các itemView đang hiển thị sẽ vẫn được phản hồi tới người dùng. 

## Không lên sử dụng ConstraintLayout ở trong RecyclerView
ConstraintLayout là ViewGroup tuyệt vời để thiết kế, nó rất dễ sử dụng và dễ hiểu, nhưng trong trường hợp này, mình nghĩ rằng nó thực sự rất tệ. Nó rất nặng về việc inflate và rằng buộc giữa các view ở trong itemView. 

Với ConstraintLayout: 

![](https://images.viblo.asia/36c4b738-43d2-4376-8fae-86772752a560.gif)

Và không sử dụng ConstraintLayout:

![](https://images.viblo.asia/a108274c-ba4c-40e8-afa5-7eb9715fba53.gif)

## Dùng SnapHelper trong Recycler View thay cho ViewPager

![](https://images.viblo.asia/c907a8b5-fada-4b58-99a5-e04aba76388e.PNG)

Ở đây chúng ta có một RecyclerView với các ItemView được bố trí theo chiều dọc và bên trong mỗi ItemView có một danh sách các ảnh trượt theo chiều ngang. Các danh sách Ngang này là PhotoSlider và nếu chúng ta search cách tạo ra cái Photoslider này thì đa số kết quả sẽ chỉ cho bạn rằng sử dụng ViewPager để tạo ra PhotoSlider

Nhưng trong trường hợp này , trong RecyclerView có nhiều ItemView trong mỗi ItemView lại có ViewPager và vấn đề giật lag ở đây là do một fragment ở trong ViewPager sẽ chỉ dùng để hiển thị một hình ảnh. Do đó cách giải quyết tối ưu trong trường hợp này là sử dụng một RecyclerView ngang với linearSnapHelper () để hoạt động như ViewPager thay vì ViewPager cho PhotoSlider.

## Cải thiện Nest Recycler View với RecycledViewPool

Trong Nest(lồng nhau) Recycler View, khi người dùng vuốt theo chiều ngang, mỗi RecyclerView bên trong sẽ tái sử dụng các views và cho bạn một trải nghiệm cuộn trơn tru. Khi người dùng cuộn theo chiều dọc, thì mỗi RecyclerView trong ItemView bên trong sẽ được inflate (khởi tạo) lại. Điều này xảy ra là do mỗi RecyclerView lồng nhau có một khung nhìn (view pool) riêng của nó.

Chúng ta có thể tối ưu bằng cách tạo một view pool duy nhất cho tất cả các RecyclerViews bên trong.
```java
public OuterRecyclerViewAdapter(List<Item> items) {
    //Constructor stuff
    viewPool = new RecyclerView.RecycledViewPool();
}
@Override
public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    //Create viewHolder etc
    holder.innerRecyclerView.setRecycledViewPool(viewPool);
    
}

Khi đó các RecyclerViews bên trong có cùng một view pool. Với cách làm này sẽ giúp RecyclerView có thể sử dụng lịch sử view của nhau, từ đó cải thiện đáng kể hiệu năng
```

## Cải thiện RecyclerView.Adapter với ListAdapter và DiffUtil
Từ thuở sơ khai cho đến tận ngày này, `RecyclerView.Adapter` vẫn đang thống trị thế giới dev android, nhưng nó vẫn có 1 số điều hạn chế. Khi có sự thay đổi database (thêm sửa xóa), chúng ta set lại list ntn? Cao thủ thì dùng `notifyItemChanged(int pos)`, `notifyItemInserted(int pos)`, `notifyItemRemoved(int pos)` cơ mà phức tạp vãi chưỡng. Gà mờ như mình thì làm phát `notifyDataSetChanged()` cho ăn chắc cái đã, cơ mà cách này thì hiệu năng rất thấp, đặc biệt là với list nhiều item, View bị nháy, và animation k có, trải nhiệm người dùng ứ sướng.

Để khắc phục nhược điểm đó thì DiffUtils (sử dụng thuật toán của Eugene W. Myers để tính số cập nhật tối thiểu) ra đời nhưng vẫn phức tạp, r mới năm 2018 thì phải, ListAdapter ra đời sp cho DiffUtils, khiến cho mọi việc ngon ngọt hơn. All hàm trên thay bằng `summitList()`, so izi, tính toán, thuật toán thế nào thì kệ mé nó hôi =))) Đây là 1 xíu animation sau khi dùng ListAdapter:

![](https://images.viblo.asia/b45383eb-a4ef-4852-a92b-9ff115df9cb8.gif)

### DiftUtils

Trước khi tìm hiểu ListAdapter là gì, chúng ta cùng đả lại 1 thứ mà có thể bạn chưa biết đó là `DiffUtils`.

`DiffUtil` là 1 Class cung cấp các hàm tính toán sự khác biệt giữa 2 danh sách và đưa ra 1 danh sách sự thay đổi (thêm phần tử, xóa và chỉnh sửa phần tử) giữa 2 danh sách đó. Dựa vào đó thì DiffUtil được sử dụng để tính toán sự khác biệt về dữ liệu của RecyclerView trong 2 lần cập nhật. Hơn nữa DiffUtil còn cung cấp thêm lựa chọn có thể chạy ở background thread. Để implement nó thì cũng có vài hàm khá mệt, nhưng giờ có listAdapter rồi nên chúng ta chỉ cần mỗi cái `DiffUtil.ItemCallback` hôi, trông nó ntn: 

```kotlin
data class MainModel(val id: String, val title: String) {

    class MainDiffCallback : DiffUtil.ItemCallback<MainModel>() {

        override fun areItemsTheSame(oldItem: MainModel, newItem: MainModel) = oldItem.id == newItem.id

        override fun areContentsTheSame(oldItem: MainModel, newItem: MainModel) = oldItem == newItem
    }
}
```

`DiffUtil.ItemCallback` yêu cấu chúng ta override 2 hàm để thực hiện việc so sánh.

- Hàm `areItemsTheSame` để kiểm tra xem 2 Object có khác nhau hay không, thường ở đây mọi người lên so sánh 2 khóa chính (những gì mà chỉ Object đấy có hoặc điểm khác nhau đặc trưng giữa 2 đối tượng) của 2 object
- Hàm `areContentsTheSame` là để kiểm tra sự khác biệt về giữa liệu giữa 2 Object có cùng khóa chính. Các bạn lưu ý ở đây mình viết return oldItem == newItem là do object MainModel mình sử dụng kiểu data class của Kotlin nên khi so sánh oldItem == newItem thực chất là so sánh các trường nằm trong class. Còn nếu bạn dùng class thường thì ở đây là nơi bạn định nghĩa những trường nào thay đổi trong Object

### ListAdapter

`ListAdapter` thực chất là 1 Wraper của `RecyclerView.Adapter` và cung cấp thêm cho chúng ta các sự kiện, các hàm để hỗ trợ DiffUtil

Khi implement ListAdapter với cái DiffUtils ở trên thì cũng sâu i zi, k khác gì adapter thường ngoài việc extend adapter từ ListAdapter: 

```kotlin
class MainAdapter: ListAdapter<MainModel, MainAdapter.MainViewHolder>(
    AsyncDifferConfig.Builder<MainModel>(MainModel.MainDiffCallback())
        .setBackgroundThreadExecutor(Executors.newSingleThreadExecutor())
        .build()
) {
    override fun onBindViewHolder(holder: MainViewHolder, position: Int) {
        holder.bindData(getItem(position), clickListener)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MainViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return MainViewHolder(inflater.inflate(R.layout.item_note, parent,  false))
    }
}
```

và k cần override lại `getItemCount()` hay tạo list chứa model trong adapter nữa. list trong đây là `currentList` được tạo sẵn trong ListAdapter rồi, ae chỉ việc lôi ra sài hôi. 1 điều nữa cũng chả cần tạo hàm set lại list khi có thay đổi, sài luôn `summitList(list)`. Mọi tính toán hay notify cứ để thằng cha ListAdapter lo. Sao mà nó dễ thế k biết :v 

```kotlin
 AsyncDifferConfig.Builder<MainModel>(MainModel.MainDiffCallback())
        .setBackgroundThreadExecutor(Executors.newSingleThreadExecutor())
        .build()
```

Thằng cu này để chỉ định là MainDiffCallback được chạy dưới BackgroundThread để tránh gây giật lag View

>Nguồn [1](https://blog.usejournal.com/improve-recyclerview-performance-ede5cec6c5bf) [2](https://viblo.asia/p/su-dung-recyclerview-trong-android-RQqKLNe6l7z) [3](https://viblo.asia/p/su-dung-recyclerview-trong-android-phan-2-Eb85omPBZ2G) [4](https://xuanthulab.net/su-dung-recyclerview-trong-lap-trinh-android.html)