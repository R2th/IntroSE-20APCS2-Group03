Trong bài viết này mình sẽ giới thiệu cho các bạn các kéo thả để đổi chỗ cho các item trong recycler view
![](https://images.viblo.asia/9839af4b-f638-4791-b891-abeb4b6ffbfd.gif)

Như được minh họa trong hình ảnh động ở trên, chúng tôi muốn cho phép người dùng

Sắp xếp lại các mục bằng cách kéo ở phía bên phải của ViewHolders

Sắp xếp lại các mục bằng cách nhấn giữ -> kéo ViewHolders

Mặc dù họ cảm thấy những hành động rất cơ bản, tuy nhiên nó sẽ tạo ra các trải nghiệm thân thiện với người dùng. Trong bài viết ngắn sau đây, tôi sẽ trình bày cách bạn có thể kéo thả để đổi vị trí các item.

Tất cả các mã ví dụ được viết bằng Kotlin.

# Bước 1: Implement ItemTouchHelper
Đầu tiên, hãy implement lớp ItemTouchHelper trong fragment hoặc activity của bạn như sau :
```
private val itemTouchHelper by lazy {
  // 1. Lưu ý rằng ở đây tôi cho phép di chuyển theo cả 4 hướng
  //    START, END , UP and DOWN      
  val simpleItemTouchCallback = 
    object : ItemTouchHelper.SimpleCallback(UP or 
                                            DOWN or 
                                            START or 
                                            END, 0) {
        
    override fun onMove(recyclerView: RecyclerView,
                        viewHolder: RecyclerView.ViewHolder,
                        target: RecyclerView.ViewHolder): Boolean {
      
      val adapter = recyclerView.adapter as MainRecyclerViewAdapter
      val from = viewHolder.adapterPosition
      val to = target.adapterPosition
      // 2. Update the backing model. Custom implementation in 
      //    MainRecyclerViewAdapter. You need to implement 
      //    reordering of the backing model inside the method.
      adapter.moveItem(from, to)
      // 3. Tell adapter to render the model update.
      adapter.notifyItemMoved(from, to)
  
      return true
    }
    override fun onSwiped(viewHolder: RecyclerView.ViewHolder,
                      direction: Int) {
        // 4. Code block for horizontal swipe. 
        //    ItemTouchHelper handles horizontal swipe as well, but 
        //    it is not relevant with reordering. Ignoring here.
    }
  }
  ItemTouchHelper(simpleItemTouchCallback)
}
```

Sau đó, chúng ta cần gán nó vào một recyclerview
```
override fun onCreate(savedInstanceState: Bundle?) {
  ...
  itemTouchHelper.attachToRecyclerView(recyclerView)
}
```
Kết quả thu được sẽ như này :
![](https://images.viblo.asia/6f53069d-48e5-4b8b-8293-57d7a868d17e.gif)

Bạn có thể nhấn từng hàng và bắt đầu sắp xếp lại!

Tuy nhiên, chúng tôi đã theo dõi các vấn đề UX với việc triển khai này.

Nó không trực quan người dùng có thể thấy rằng họ thực sự phải nhấn lâu để sắp xếp lại các item. Nhiều người dùng của bạn thậm chí có thể không nhận ra rằng họ có thể sắp xếp lại các mục.

Thật khó để biết khi nào bạn có thể bắt đầu sắp xếp lại sau khi nhấn lâu, bởi vì bạn không nhận được bất kỳ phản hồi nào khi hàng được chọn.
# Bước 2: Đánh dấu hàng trong khi được chọn
Chúng ta có thể giải quyết vấn đề thứ hai, khó biết khi nào bạn có thể bắt đầu sắp xếp lại các item, bằng cách tô sáng một hàng trong khi hàng đang được chọn. Có nhiều cách để làm nổi bật một hàng, nhưng trong ví dụ này, chúng ta chỉ làm cho nó mờ đi.
```
private val itemTouchHelper by lazy {
  val simpleItemTouchCallback = 
    object : ItemTouchHelper.SimpleCallback(UP or 
                                            DOWN or 
                                            START or 
                                            END, 0) {
    // 1. This callback is called when a ViewHolder is selected. 
    //    We highlight the ViewHolder here.
    override fun onSelectedChanged(viewHolder: ViewHolder?, 
                                   actionState: Int) {
      super.onSelectedChanged(viewHolder, actionState)
      
      if (actionState == ACTION_STATE_DRAG) {         
        viewHolder?.itemView?.alpha = 0.5f
      }
    }
    // 2. This callback is called when the ViewHolder is 
    //    unselected (dropped). We unhighlight the ViewHolder here.
    override fun clearView(recyclerView: RecyclerView, 
                           viewHolder: RecyclerView.ViewHolder) {
      super.clearView(recyclerView, viewHolder)
      viewHolder?.itemView?.alpha = 1.0f
    }
  }
  ...
}
```

Và kết quả chúng ta thu được :
![](https://images.viblo.asia/a9854326-6186-4cbf-a8af-72e1184491a1.gif)
Nó dễ dàng được nhận biết hơn khi việc bạn có thể bắt đầu di chuyển vật phẩm sau khi nhấn lâu. Tuyệt quá!

Tuy nhiên, chúng tôi vẫn có một vấn đề là người dùng không am hiểu về công nghệ có thể khó có thời gian để tìm ra cách sắp xếp lại các mục. Mặt khác, người dùng có thể cảm thấy căng thẳng khi bạn luôn phải chờ một giây để bắt đầu sắp xếp lại.

# Bước 3: Tạo ra một chỉ dẫn
Để giải quyết vấn đề, chúng tôi thêm một icon vào bên phải của mỗi hàng và chúng tôi cho phép hàng được chọn ngay lập tức khi người dùng chạm vào icon. Điều này là khá dễ dàng thực hiện.

Trong Activity / Fragment, bạn chuẩn bị một phương thức tùy chỉnh để gọi ItemTouchHelper.startDrag (...). Khi bạn gọi phương thức này, trạng thái của ViewHolder sẽ được chọn để kéo.

```
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): 
  MainRecyclerViewHolder {
  ...
  // 1. Implement `OnTouchListener` on handleView
  viewHolder.itemView.handleView.setOnTouchListener { 
    view, event ->
    if (event.actionMasked == MotionEvent.ACTION_DOWN) {
      // 2. When we detect touch-down event, we call the 
      //    startDragging(...) method we prepared above
      activity.startDragging(viewHolder)
    }
    return@setOnTouchListener true
  }
  ...
}
```
![](https://images.viblo.asia/44ee0d97-0b80-4857-961e-e65703436cd9.gif)
Khi bạn chạm vào icon, bạn có thể bắt đầu sắp xếp lại các item ngay lập tức.

# Tham khảo
https://medium.com/@yfujiki/drag-and-reorder-recyclerview-items-in-a-user-friendly-manner-1282335141e9