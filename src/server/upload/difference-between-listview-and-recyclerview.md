### Mở đầu.
Theo trang chủ developer.android.com thì nếu ứng dụng Android của bạn cần hiển thị danh sách các phần tử cuộn dựa trên các tập dữ liệu lớn (hoặc dữ liệu thường xuyên thay đổi), bạn nên sử dụng RecyclerView.

RecyclerView là bản nâng cấp của ListView (có từ API 1.0) và linh hoạt hơn. Vậy so với ListView thì nó có những ưu điểm gì hơn?

(ListView)
![](https://images.viblo.asia/071f5a97-77e1-47dd-b7b6-f19251ab367b.jpg)
(RecyclerView)

![](https://images.viblo.asia/69d720cf-1edb-4e73-8801-0918eb21898f.png)

### 1.View Holder
Việc sử dụng ViewHolder trong ListView là không bắt buộc, nó là để xuất để giữ tham chiếu cho View. Việc không sử dụng ViewHolder thì sẽ phải findViewById mỗi lần scoll qua View. Việc này làm cho ListView dễ bị lag khi dữ liệu nhiều hoặc thay đổi liên tục.

Vấn đề này được khắc phục ở RecyclerView bằng cách sử dụng ViewHolder. Đây là một trong những khác biệt chính của RecyclerView và ViewHolder. Khi chúng ta sử dụng RecyclerView thì phải xác định một class ViewHolder, và được sử dụng bở Adapter để ràng buộc ViewHolder vào một vị trí.

Một điểm lưu ý ở đây à việc sử dụng Adapter cho RecyclerView thì cung cấp một ViewHolder là bắt buộc. Chúng ta phải triển khai gặp một chút phức tạp nhưng đã khắc phục được vấn đề bất cập của ListView.
### 2.Layout Manager
Khi nhắc đến ListView thì có nghĩa là chỉ có một loại mà ta biết đó là Vertical ListView, chỉ cho hiện thị danh sách theo chiều dọc mà thôi. Bạn không thể thực thi một ListView hiển thị danh sách dữ liệu theo chiều ngang. Có nhiều cách để hiện thị danh sách theo chiều ngang nhưng ListView quả thật không được thiết kế cho bài toán này.

Nhưng với RecyclerView thì khác, nó hỗ trợ hiển thị danh sách theo chiều ngang. Thực ra là nhiều loại danh sách. Để làm được điều này nó đã sử dụng đối tượng RecyclerView.LayoutManager. RecyclerView cung cấp 3 loại LayoutManagers:

**1.LinearLayoutManager**: Đây là loại LayoutManager thường hay dùng nhất trong RecyclerView. Thông quá nó ta có thể tạo danh sách theo chiều dọc (vertical) hoặc chiều ngang (horizontal).
![](https://images.viblo.asia/a19e039d-25a9-48d4-8d6d-38de1bdb5179.jpg)
**2.StaggeredGridLayoutManager**: Với loại này ta có thể bố trí các view con sole với nhau, ví dụ như hình dưới đây.

![](https://images.viblo.asia/14a0e54c-5bdd-41b9-bf64-fee78046cef9.jpg)

**3.GridLayoutManager**: Dùng để hiện thị các item theo dạng lưới, giống như  picture gallery.

![](https://images.viblo.asia/2822422c-bbef-4e97-af7e-80e00907c0b1.png)

### 3.Item Animator.
Animation khi hiện thị danh sách là một cái hoàn toàn mới. Trong ListView thường thì không có animation cho khi bạn add hay delete một item. Thay vào đó ViewPropertyAnimator được đưa ra bởi Google có thể tạo ra animation cho ListView.

Đối với RecyclerView thì nó có lớp RecylerView.ItemAnimator để xử lý animation. Thông qua lớp này, các hành động như add, delete hay remove sẽ được cung cấp animation. Bình thường RecyclerView cũng đã cung cấp một DefaultItemAnimator.

![alt](http://eitguide.net/wp-content/uploads/2016/08/recyclerview-itemanimator.gif)

### 4.Adapter
Trong ListView, Adapter rất đơn giản để thực hiện. ListView có một phương thức là getView(), là nơi xử lý chính, nơi các views được bind tới một position. Ngoài ra ListView còn có một method thú vị là registerDataSetObserver nơi có thể set một observer trong Adapter.Tính năng này cũng có trong RecyclerView bởi class RecyclerView.AdapterDataObserver.

Những ưu điểm của ListView là nó hỗ trợ ba cài đặt mặc định của Adapter:

**1. ArrayAdapter.**

**2. CursorAdapter.**

**3. SimpleCursorAdapter.**

Adapter ở RecyclerView có hầu hết các tính năng mà Adapter của ListView có. Trong RecyclerView.Adapter thường là chúng ta phải custom.
### 5. Item Decoration.
Để hiện thị một vạch chia item trong ListView thì thật dễ dàng, ta có thể thêm trong thẻ xml:
```java
    android:divider=”@android:color/transparent”

    android:dividerHeight=”4dp”
```
Trong RecyclerView mặc định không có hiện thị mộ divider giữa các item. Google đã bỏ điều này để cho lập trình viên có thể tùy chỉnh. Và điều đó đã làm tăng effort cho họ. Nếu bạn muốn thêm một đường phân các giữa các item thì có thể phải sử dụng lớp RecyclerView.ItemDecoration để custom.

![alt](https://cdn-images-1.medium.com/max/1600/1*Jk50iGRPixKN6oe9onq75w.gif)

### 6. OnItemTouchListener.
ListView được sử dụng vả chỉ phát hiện các sự kiện click đơn thuần, bằng cách sử dụng interface AdapterView.OnItemClickListener.

interface RecyclerView.OnItemTouchListener ở RecyclerView thì dùng để bắt các touch event trong Android. Nó khá phức tạp nhưng mang lại hữu ích cho các Developer để ngăn chặn touch event. Khi các thao tác được thực hiện thì các touch event trươc đó được chặn đứng, và chỉ sự kiện mới gửi đến RecyclerView.
### 7. Tổng kết.
Như vậy qua bài viết này mình đã trình mày những khác biệt cơ bản của 2 đối tượng dùng để hiện thị danh sách ListView và RecyclerView trong Android. Cám ơn các bạn đã theo dõi.

Để thực hiện bài viết, mình đã tham khảo những bài viết sau đây.
https://developer.android.com/guide/topics/ui/layout/listview
https://developer.android.com/guide/topics/ui/layout/recyclerview
https://developer.android.com/reference/android/support/v7/widget/RecyclerView
https://medium.com/@manuaravindpta/what-is-the-difference-between-listview-and-recyclerview-bcd82c64ffbb