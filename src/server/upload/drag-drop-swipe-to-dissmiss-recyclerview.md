Ở các bài viết trước mình đã hướng dẫn các bạn sử dụng Android Architeture Component, và Annotation.
Trong bài viết lần này mình sẽ hướng dẫn các bạn một phần rất thân thuộc hơn với các bạn "Drag & Drop, swipe to dissmiss RecyclerView"

Chắc hẳn các bạn đã nhìn thấy hoặc sử dụng rất nhiều thư viện cho phép các bạn có thể Kéo thả hay vuốt để dissmiss item của ReyclerView. Một ví dụ rất đơn giản là như sau.

<a href="https://gyazo.com/9c909b0743b21186106d27ebf5d2a786"><img src="https://i.gyazo.com/9c909b0743b21186106d27ebf5d2a786.gif" alt="https://gyazo.com/9c909b0743b21186106d27ebf5d2a786" width="322"/></a>

Có bao giờ các bạn tự hỏi làm sao để chúng có thể kéo thả mượn mà, đẹp mắt như vậy không? Thực ra nó không hề khó như các bạn nghĩ đâu. Chúng ta cùng tìm hiểu nhé

RecyclerView đã cung cấp một cơ chế cho phép chúng ta có thể Drag & Drop, swipe to dissmiss item, Đây là một điểm mạnh cực kì lớn của RecyclerView mà  ListView hay GridView không có được. Nếu bạn vẫn đang sử dụng ListView hay GridView hãy cân nhắc để sử dụng sang RecyclerView nhé!.

Để có thể sử dụng những tính năng vô cùng tuyệt vời ở trên, tất cả những thứ các bạn cần tìm hiểu là [ItemTouchHelper](https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.html) - một lớp tiện ích được thêm vào trong gói ```android.support.v7.widget.``` cho phép swipe to dissmiss, drag & drop của recyclerview. Nó hoạt động với một RecyclerView và một callback [ ItemTouchHelper.Callback](https://developer.android.com/reference/android/support/v7/widget/helper/ItemTouchHelper.Callback.html)

Ok, băt đầu thôi. Chúng ta sẽ bắt đầu đi tìm hiểu thứ quan trọng trong ItemTouchHelper là ItemTouchHelper.Callback
# I. Tìm hiểu ItemTouchHelper.Callback

 Về cơ bản thì ItemTouchHelper.Callback là một abstract class, cung cấp 3 abstract menthod chính là 
## 1. getMovementFlags
``` getMovementFlags(RecyclerView recyclerView,  ViewHolder viewHolder);``` 

Trả về giá trị là một số nguyên, định nghĩa cờ cho phép di chuyển item ở mỗi state.
Default là ```ACTION_STATE_IDLE = 0``` - Không cho phép drag & drop.

Bạn có thể trả về flag thông qua 2 menthod chính mà ItemTouchHelper cung cấp là ``` makeMovementFlags(int, int)``` và ``` makeFlag(int, int)```

Ở ví dụ của mình mình đã sử dụng  menthod makeMovementFlags
```
 @Override
    public int getMovementFlags(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
        int dragFlag = ItemTouchHelper.UP | ItemTouchHelper.DOWN;
        int swipeFlag = ItemTouchHelper.LEFT;
        return makeMovementFlags(dragFlag, swipeFlag);
    }
```
Ở đây mình cho phép người dùng có thể Drag Lên và xuống, và cho phép người dùng vuốt sang trái để dissmiss.
Nếu muốn cho phép người dùng vuốt sang phải để dissmiss thì mình khai báo ``` ItemTouchHelper.RIGHT```  còn muốn cả trái và phải thì 
sử dụng  ``` ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT ``` 

## 2. onMove
``` onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) ``` 
 
Menthod này được gọi khi người dùng kéo 1 item từ vị trí này đến vị trí khác. 
* ```viewHolder``` là viewHolder của Item hiện tại đang được kéo
* ```target``` là viewHolder của item đang được kéo tới.
    Bạn có thể dễ dàng xác định vị trí của 2 item này bằng cách sử dụng menthod ```getAdapterPosition``` của ViewHolder.
    
## 3. onSwiped
```onSwiped(RecyclerView.ViewHolder viewHolder, int direction)``` 

Trả về khi một item của recyclerview bị biến mất khi swipe. 
* ```viewHolder``` là ViewHolder của item vừa dissmiss
* ```direction``` là hướng dissmiss của item, có 2 kiểu dissmiss là ```START``` - Phải qua trái và ```END``` - Trái qua phải.

# II. Tạo interface lắng nghe sự kiện drag & drop, swipe : ItemTouchListenner 
Để dễ dàng bắt được sự kiện swipe và drag & drop, chúng ta tạo ra 1 listenner để lắng nghe các event đó
``` ItemTouchListenner.java
public interface ItemTouchListenner {
    void onMove(int oldPosition, int newPosition);

    void swipe(int position, int direction);
}
```

# III. Gắn sự kiện drag & drop trong ItemTouchHelper.Callback
Chúng ta sẽ custom class ItemTouchHelper.Callback để nhận sự kiện swipe và drag & drop
``` SimpleItemTouchHelperCallback.java
public class SimpleItemTouchHelperCallback extends ItemTouchHelper.Callback {
    private ItemTouchListenner mListenner;

    public SimpleItemTouchHelperCallback(ItemTouchListenner mListenner) {
        this.mListenner = mListenner;
    }

    @Override
    public boolean isLongPressDragEnabled() {
        return super.isLongPressDragEnabled();
    }

    @Override
    public boolean isItemViewSwipeEnabled() {
        return super.isItemViewSwipeEnabled();
    }

    @Override
    public int getMovementFlags(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder) {
        int dragFlag = ItemTouchHelper.UP | ItemTouchHelper.DOWN;
        int swipeFlag = ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT;
        return makeMovementFlags(dragFlag, swipeFlag);
    }

    @Override
    public boolean onMove(RecyclerView recyclerView,
                          RecyclerView.ViewHolder viewHolder,
                          RecyclerView.ViewHolder target) {
        mListenner.onMove(viewHolder.getAdapterPosition(), target.getAdapterPosition());
        return false;
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
        mListenner.swipe(viewHolder.getAdapterPosition(), direction);
    }
}
```

Như vậy là mỗi khi người dùng kéo thả hoặc vuốt thì ```mListenner``` sẽ báo về cho chúng ta thông qua 2 menthod ```swipe``` và ```onMove``` chúng ta chỉ cần update lai adapter khi có sự thay đổi về dữ liệu  là được rất đơn giản phải không nào?

# IV. Gắn ItemTouchHelper cho recyclerview
Để gắn ItemToucherHelper chúng ta sử dụng menthod ```attackToRecyclerView(RecyclerView view) ``` của lớp ItemTouchHelper
```
ItemTouchHelper.Callback callback = new SimpleItemTouchHelperCallback(new ItemTouchListenner() {
            @Override
            public void onMove(int oldPosition, int newPosition) {
                mAdapter.onMove(oldPosition, newPosition);
            }

            @Override
            public void swipe(int position, int direction) {
                mAdapter.swipe(position, direction);
            }
        });
        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(callback);
        itemTouchHelper.attachToRecyclerView(recyclerView);
```
Như vậy mỗi khi có sự kiện move và swipe ta sẽ gọi tới menthod update giao diện của adapter.
# V. Update lại adapter của RecyclerView khi có sự kiện thay đổi
Trong lớp adapter ta định nghĩa thêm 2 menthod để xử lý sự kiện là onMove và swipe. 
Đổi chỗ vị trí các item khi drag & drop
```
 public void onMove(int fromPosition, int toPosition) {
        if (fromPosition < toPosition) {
            for (int i = fromPosition; i < toPosition; i++) {
                Collections.swap(mData, i, i + 1);
            }
        } else {
            for (int i = fromPosition; i > toPosition; i--) {
                Collections.swap(mData, i, i - 1);
            }
        }
        notifyItemMoved(fromPosition, toPosition);
    }
```

Xóa item khi swipe thành công.
```
     public void swipe(int position, int direction) {
        mData.remove(position);
        notifyItemRemoved(position);
    }
```

Trên đây là phần giới thiệu của mình về Swipe, Drag & Drop trong RecyclerView, rất mong sẽ giúp ích được trong project của các 

Chúc các bạn học tốt ^^!

Các bạn có thể tham khảo demo của mình tại [đây](https://github.com/DoanVanToan/RecyclerViewDragAndDrop)