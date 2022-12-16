### Khác biệt giữa DiffCallback và DiffUtil.Callback
Một class được gọi là `DiffUtil` đã được giới thiệu trong version 24.2 của thư viện hỗ trợ dùng để update  `RecyclerView.Adapter`. Trong version 27.0 của thư viện hỗ trợ leanback, thằng này được thêm vào để support cho  [ArrayObjectAdapter](https://developer.android.com/reference/android/support/v17/leanback/widget/ArrayObjectAdapter#setItems%28java.util.List,%20android.support.v17.leanback.widget.DiffCallback%29).
`ArrayObjectAdapter` có 1 method mới được gọi là `setItems(final List itemList, final DiffCallback callback)`  cho phép truyền vào 1 đối số là một [DiffCallback](https://developer.android.com/reference/android/support/v17/leanback/widget/DiffCallback). `DiffCallback` cũng giống như DiffUtil.Calbback ngoại trừ việc nó ít method hơn so với thằng kia.

```javascript
public abstract class DiffCallback<Value> {

   public abstract boolean areItemsTheSame(@NonNull Value oldItem, 
                                           @NonNull Value newItem);

   public abstract boolean areContentsTheSame(@NonNull Value oldItem,
                                              @NonNull Value newItem);

   @SuppressWarnings("WeakerAccess")
   public Object getChangePayload(@NonNull Value oldItem, @NonNull Value newItem) {
       return null;
   }
}
```

Các phương thức về size của một list hầu như biến mất hoàn toàn. Và hàm `setItems()` trong adapter sẽ biết về các old và new item, nó sẽ override lại 2 hàm getOldListSize() và  getNewListSize() cho phép chúng ta tiến hành tập trung vào việc so sánh các item trong list.

```javascript
val diffCallback = object : DiffCallback<DummyItem>() {
    override fun areItemsTheSame(oldItem: DummyItem, 
                                 newItem: DummyItem): Boolean = 
        oldItem.id == newItem.id
    override fun areContentsTheSame(oldItem: DummyItem, 
                                    newItem: DummyItem): Boolean =
        oldItem == newItem
}
itemsAdapter.setItems(randomItems(), diffCallback)
```

Sau đó adapter sẽ update các item và đi kèm với các animation phù hợp.

![](https://images.viblo.asia/89c6b069-4ab2-4690-b7e7-f9ca91bba3e0.gif)

Chúng ta không nên gọi  hàm `setItems()` mà không có 1DiffCallback. Bởi vì nếu chúng ta không cung cấp thằng này thì adapter nó sẽ clear sạch tất cả các item hiện tại và add toàn bộ các item mới. Điều này sẽ dẫn đến màn hình hiển thị của chúng ta nó sẽ bị nhấp nháy như dưới đây.

![](https://images.viblo.asia/79cfe89c-2f73-4da8-92b4-1e29f30238c0.gif)

Nhìn vào code của hàm `setItems()` này  chúng ta có thể thấy được cách mà thằng `ArrayObjectAdapter` nó tiến xử lý mới từ code có sắn của thằng DiffUtil - đưa cho các lập trình viên chúng ta 1 api nhìn clean hơn.
![](https://images.viblo.asia/9c531a18-9dbb-4273-bd6f-2603257a63c0.png)
<div align="center">

*Một phần source code của hàm setItems() trong ArrayObjectAdapter*
    
</div>

### Tổng kết
Dưới đây mình đã giới thiệu cho các bạn về việc sử dụng DiffCallback, nếu có gì sai xót mong nhận được sự góp y