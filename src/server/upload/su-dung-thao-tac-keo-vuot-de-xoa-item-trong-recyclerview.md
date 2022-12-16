Một phần quan trọng của Material Design là cách người dùng có thể tương tác với các yếu tố trực quan của ứng dụng. 
Do đó, ngoài các thao tác cơ bản như chạm và nhấn, một ứng dụng Android tốt sẽ xử lý các thao tác phức tạp hơn như vuốt và kéo. 
Điều này đặc biệt quan trọng nếu ứng dụng sử dụng danh sách để hiển thị dữ liệu.

Bằng cách sử dụng tiện ích RecyclerView và một vài thành phần Android Jetpack khác, bạn có thể xử lý nhiều cử chỉ vuốt liên quan đến danh sách trong ứng dụng của mình. 
Hơn nữa, chỉ trong một vài dòng code, bạn có thể liên kết Material Motion với những cử chỉ đó.

Trong hướng dẫn này, chúng ta sẽ thêm một vài cử chỉ vuốt phổ biến, hoàn chỉnh với hình động trực quan, vào danh sách của bạn.

## Chuẩn bị

- Android Studio 3.2.1 trở lên.
- Điện thoại hoặc máy tính bảng chạy API Android level 23 trở lên.

## 1. Tạo một List

Để ngắn gọn, hãy sử dụng một trong các template có sẵn trong Android Studio để tạo ra List.

Khởi chạy Android Studio và tạo một Project mới, chọn **Empty Activity**.

![](https://images.viblo.asia/36f28500-39d5-425b-b7bd-5878196438e0.png)

Thay vì thư viện Hỗ trợ, chúng ta sẽ sử dụng Android Jetpack trong project này. 
Vì vậy, khi project đã được tạo, hãy đi tới **Refactor > Migrate to AndroidX** > Nhấn nút **Migrate**.

![](https://images.viblo.asia/e84af7c6-8f91-4158-bd15-ba0649eb98a2.png)

Tiếp theo, để thêm List vào project, hãy chuyển đến **File > New > Fragment > Fragment (List)**.
Trong hộp thoại bật lên, hãy tiếp tục và nhấn nút **Finish** mà không thực hiện bất kỳ thay đổi nào đối với các giá trị mặc định.

![](https://images.viblo.asia/5b5b9bea-b45f-4f0e-b76a-ee03aba3aac3.png)

Tại thời điểm này, Android Studio sẽ tạo một fragment mới chứa RecyclerView được cấu hình đầy đủ. 
Nó cũng sẽ tạo dữ liệu giả để hiển thị bên trong widget. 
Tuy nhiên, bạn vẫn sẽ phải thêm fragment vào Activity chính của mình theo cách thủ công.

Để làm như vậy, trước tiên hãy thêm interface OnListFragmentInteractionListener vào activity chính của bạn và implement phương thức duy nhất mà nó chứa.

```
override fun onListFragmentInteraction(
                            item: DummyContent.DummyItem?) {
   // leave empty 
}
```

Tiếp theo, nhúng fragment vào bên trong activity bằng cách thêm thẻ < fragment> sau vào tệp activity_main.xml :
    
   
```
    <fragment android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:id="@+id/list_fragment"
          android:name="com.tutsplus.rvswipes.ItemFragment" />
```

    
Tại thời điểm này, nếu bạn chạy ứng dụng của mình, bạn sẽ có thể thấy một danh sách giống như thế này:

![](https://images.viblo.asia/51432f16-7ecb-48df-9ffb-8c99fd328605.png)

## 2. Thêm action Swipe-to-Remove

Sử dụng lớp **ItemTouchHelper**, bạn có thể nhanh chóng thêm các thao tác vuốt và kéo vào bất kỳ RecyclerView nào. 
Lớp này cũng cung cấp các animation mặc định chạy tự động bất cứ khi nào một cử chỉ hợp lệ được phát hiện.

Lớp ItemTouchHelper cần một thể hiện của lớp ItemTouchHelper.Callback để có thể phát hiện và xử lý các cử chỉ. 
Mặc dù bạn có thể sử dụng nó trực tiếp, sử dụng lớp SimpleCallback sẽ dễ dàng hơn nhiều. 
Nó cũng là lớp abstract, nhưng bạn sẽ có ít phương thức hơn để override.

Tạo một thể hiện mới của lớp SimpleCallback bên trong phương thức onCreateView () của lớp ItemFragment. 
Là một đối số cho hàm tạo của nó, bạn phải truyền hướng vuốt mà bạn muốn nó xử lý. 
Ngay bây giờ, hãy chuyển **RIGHT** cho nó để nó xử lý cử chỉ vuốt sang phải.

```
val myCallback = object: ItemTouchHelper.SimpleCallback(0, 
                                 ItemTouchHelper.RIGHT) {
                                  
    // More code here
     
}
```

Lớp này có hai phương thức mà bạn phải override: phương thức onMove (), phát hiện các thao tác kéo và phương thức onSwiped () để phát hiện các thao tác vuốt. 
Vì chúng ta sẽ không xử lý bất kỳ thao tác kéo nào , hãy trả về false bên trong phương thức onMove ().

```
override fun onMove(
    recyclerView: RecyclerView,
    viewHolder: RecyclerView.ViewHolder,
    target: RecyclerView.ViewHolder
): Boolean = false
 
override fun onSwiped(viewHolder: RecyclerView.ViewHolder, 
                      direction: Int) {
 
    // More code here
 
}
```

Bên trong phương thức onSwiped (), bạn có thể sử dụng thuộc tính adapterPocation để xác định vị trí của item được vuốt. 
Vì chúng ta hiện đang thực hiện thao tác vuốt để xóa, truyền vị trí sang phương thức removeAt () của danh sách để xóa item tương ứng.

```
DummyContent.ITEMS.removeAt(viewHolder.adapterPosition)
```

Ngoài ra, bạn phải truyền vị trí xóa cho phương thức notifyItemRemond () của adapter, để đảm bảo rằng mục đó không được hiển thị nữa. 
Làm như vậy cũng chạy animation xóa mặc định.

```
adapter?.notifyItemRemoved(viewHolder.adapterPosition)
```

Tại thời điểm này, đối tượng SimpleCallback đã sẵn sàng. 
Tất cả những gì bạn cần làm bây giờ là tạo một đối tượng ItemTouchHelper và gắn RecyclerView vào nó.

```
val myHelper = ItemTouchHelper(myCallback)
myHelper.attachToRecyclerView(this)
```