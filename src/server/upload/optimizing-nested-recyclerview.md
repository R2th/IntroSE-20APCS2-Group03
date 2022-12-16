RecyclerView là phiên bản ListView nâng cao hơn, sử dụng lại cùng một view để ngăn việc tạo thêm các view để cung cấp trải nghiệm cuộn mượt mà. RecyclerView đạt được điều này bằng cách giữ một View Pool giữ các view không còn hiển thị và có thể được tái chế.

Đôi khi chúng ta cần lồng RecyclerViews để tạo một số bố cục. Hãy xem xét trường hợp bạn có RecyclerView nằm ngang bên trong RecyclerView dọc.

![](https://images.viblo.asia/b66d8ff6-42b8-4020-b173-0061a2c2ac33.jpeg)

Trong hình ảnh, bạn có thể thấy vertical scroling list của horizontal scroling list. Điều này đạt được bằng cách đặt một recyclerView bên trong một recyclerView khác.

Khi người dùng vuốt sang bên, RecyclerView bên trong sẽ tái chế các khung nhìn và cho bạn cuộn mượt mà. Nhưng đây không phải là trường hợp khi người dùng cuộn theo chiều dọc. Mỗi khung nhìn của RecyclerView bên trong được inflated lần nữa. Điều này là do mỗi RecyclerViews lồng nhau có một View Pool riêng.

Chúng ta có thể khắc phục điều này bằng cách đặt một view pool duy nhất cho tất cả các RecyclerViews bên trong.

`RecyclerView.setRecyclViewPool (RecyclViewPool)` cho phép bạn đặt một custom view pool cho recyclerView của bạn. Code như thế này"

```JAVA
public OuterRecyclerViewAdapter(List<Item> items) {
    //Constructor stuff
    viewPool = new RecyclerView.RecycledViewPool();
}
@Override
public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    //Create viewHolder etc
    holder.innerRecyclerView.setRecycledViewPool(viewPool);
    
}
```

Vì vậy, bây giờ khi tất cả các RecyclerView bên trong có cùng một view pool, nó có thể sử dụng các views bị loại bỏ khác. Điều này cho phép tạo view ít hơn nhiều và hiệu suất cuộn tốt hơn.

Nguồn: [Medium](https://proandroiddev.com/optimizing-nested-recyclerview-a9b7830a4ba7)