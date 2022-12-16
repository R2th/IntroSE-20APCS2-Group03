# I. Lời mở đầu
* **ListView** là một đối tượng cũ nằm trong framework chuẩn của Android.
* **RecyclerView** là một đối tượng nằm trong bộ support libary của Android.
* **RecyclerView** khả chuyển và dễ dàng sử dụng hơn **ListView**.
* Hôm nay mình sẽ viết bài so sánh về hai đối tượng này.

# II. So sánh


|  | ListView | RecyclerView |
| -------- | -------- | -------- |
| **ViewHolder**     | Không bắt buộc tạo đối tượng **ViewHolder**.     | Bắt buộc phải tạo đối tượng **ViewHolder**.     |
|**Adapter**|Kế thừa từ **AdapterView**.| Tạo ra đối tượng kế thừa từ **RecyclerView**|
|**LayoutManager**|Mặc định là **Horizontal vertical**. Việc custom LayoutManager rất khó khăn| Hỗ trợ **LinearLayoutManager (vertical hoặc horizontal)**, **StaggeredGridLayoutManager**, **GirdLayoutManager** ...|
|**ItemAnimation**|Mặc định không hỗ trợ Animation| Hỗ trợ Animation cho item: add, move, remove|
|**Listener**|Mặc định có 2 sự kiện là **itemClick** và **longItemClick**|Mặc định không có|
|**Notify data**|Chỉ có **notifyDataChange()**|Bao gồm: **notifyDataChange()**, **notifyItemChange()**, **notifyItemMoved()**, **notifyItemInserted()** ...|

# III. Kết luận
* Trên đây là những kinh nghiệm làm việc từ đó rút ra sự so sánh của mình.
* Mong mọi người có sự đóng góp của mọi người.