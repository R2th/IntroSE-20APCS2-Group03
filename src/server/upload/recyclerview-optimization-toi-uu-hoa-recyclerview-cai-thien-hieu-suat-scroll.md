![](https://images.viblo.asia/bb6a2f66-5f0d-48f9-bb51-c2063983a5ad.png)


Trong bài viết này, chúng ta sẽ tìm hiểu cách tối ưu hóa hiệu suất RecyclerView trong Android. Với những tối ưu hóa này, chúng ta có thể làm cho việc scroll RecyclerView trở nên mượt mà.

Khi chúng ta triển khai RecyclerView trong Ứng dụng Android của mình, đôi khi, chúng ta gặp phải các vấn đề như: Các mục RecyclerView scroll không trơn tru. Nó dẫn đến trải nghiệm người dùng không tốt vì có vẻ như Ứng dụng Android của chúng ta bị lag.

Hãy xem những điều chúng tôi có thể làm để cải thiện hiệu suất của RecyclerView và  chúng ta có được thao tác scroll mượt mà.

# Kỹ thuật tối ưu hóa RecyclerView

### Sử dụng Thư viện tải hình ảnh

Khi Bộ thu thập rác (GC) chạy trên main thread, một trong những lý do khiến giao diện người dùng không phản hồi là việc phân bổ và phân bổ bộ nhớ liên tục, dẫn đến việc chạy GC rất thường xuyên. Bằng cách sử dụng khái niệm bitmap pool , chúng ta có thể tránh được nó.

Phần tốt nhất là các thư viện Image-Loading như Glide, Fresco sử dụng khái niệm nhóm bitmap này. Vì vậy, hãy luôn sử dụng thư viện Image-Loading.

Ủy quyền tất cả các tác vụ liên quan đến hình ảnh cho các thư viện này.

### Đặt chiều rộng và chiều cao của hình ảnh

Nếu chiều rộng và chiều cao hình ảnh của chúng ta là động (không cố định) và chúng ta đang lấy imageUrltừ máy chủ.

Nếu chúng ta không đặt chiều rộng và chiều cao hình ảnh chính xác trước đó, giao diện người dùng sẽ nhấp nháy trong quá trình chuyển đổi tải và hiển thị hình ảnh vào ImageView.

Vì vậy, chúng ta nên yêu cầu phía BackEnd của chúng ta gửi kích thước hình ảnh hoặc tỷ lệ khung hình, theo đó, chúng ta có thể tính toán chiều rộng và chiều cao cần thiết của ImageView.

Sau đó, chúng ta sẽ chỉ có thể đặt  chiều rộng và chiều cao. Do đó không nhấp nháy. Vấn đề đã được giải quyết!

### Làm ít hơn trong phương thức onBindViewHolder

Phương thức onBindViewHolder của chúng ta sẽ thực hiện rất ít công việc hơn. Chúng ta nên kiểm tra phương thức onBindViewHolder của mình và tối ưu hóa nó. Chúng ta có thể thấy sự cải thiện trong RecyclerView của mình bằng cách làm như vậy.
Cố gắng ko để việc xử lí logic ở trong phương thức onBindViewHolder.

### Sử dụng Notify Item RecyclerView API

Bất cứ khi nào chúng ta có trường hợp sử dụng của việc xóa, cập nhật, bổ sung item, hãy sử dụng API Notify Item.

```
adapter.notifyItemRemoved(position)
adapter.notifyItemChanged(position)
adapter.notifyItemInserted(position)
adapter.notifyItemRangeInserted(start, end)
```

ngoài ra cũng có thể dùng DiffUtil  với ListAdapter.


### Tránh nested view

Nếu có thể, chúng ta nên tránh chế độ xem lồng nhau và cố gắng tạo chế độ xem phẳng (không lồng) ở bất cứ đâu có thể. Việc lồng nhau làm giảm hiệu suất RecyclerView. Chế độ xem phẳng cải thiện hiệu suất.

### Sử dụng setHasFixedSize

Chúng ta nên sử dụng phương pháp này nếu chiều cao của tất cả các mục bằng nhau. 

### Sử dụng setItemViewCacheSize

Theo tài liệu chính thức: Nó đặt số lượng chế độ xem ngoài màn hình cần giữ lại trước khi thêm chúng vào nhóm chế độ xem tái chế.Bộ nhớ cache của chế độ xem ngoài màn hình luôn nhận biết được các thay đổi trong Adapter,
 cho phép LayoutManager sử dụng lại các chế độ xem đó chưa được sửa đổi mà không cần quay lại Adapter để gắn lại chúng (gọi onBindViewHolder).