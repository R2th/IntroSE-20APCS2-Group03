Chúng ta thường xuyên sử dụng List để chưa một danh sách dữ liệu đúng không nào? Nó cũng yêu cầu cập nhật dữ liệu danh sách khi người dùng cuộn danh sách. Để đạt được điều này, chúng tôi thường lấy dữ liệu từ máy chủ và cập nhật các mục mới nhận được. Nếu có một độ trễ nhỏ trong quá trình này, nó sẽ ảnh hưởng đến trải nghiệm người dùng, vì vậy chúng tôi muốn việc này được thực hiện càng sớm càng tốt cùng với ít tài nguyên hơn. Khi nội dung của List đó bị thay đổi, thì ta phải gọi `notifyDataSetChanged ()` để update lại data nhưng việc này rất tốn tài nguyên và thời gian. Nó sẽ có rất nhiều lần lặp lại để hoàn thành công việc trong trường hợp `notifyDataSetChanged ()`. Ở đây, lớp `DiffUtil` xuất hiện và Android đã phát triển lớp tiện ích này để xử lý các cập nhật dữ liệu cho RecyclerView.

### DiffUtil là gì?

Kể từ gói thư viện version 24.2.0, thư viện hỗ trợ RecyclerView, gói v7 cung cấp lớp tiện ích thực sự tiện dụng có tên là DiffUtil. Lớp này tìm thấy sự khác biệt giữa hai danh sách và cung cấp danh sách được cập nhật dưới dạng đầu ra. Lớp này được sử dụng để thông báo các bản cập nhật cho Bộ điều hợp RecyclerView. Nó sử dụng thuật toán khác biệt của Eugene W. Myers, để tính toán số lượng cập nhật tối thiểu.

### Sử dụng nó như thế nào?

DiffUtil.Callback là một lớp trừu tượng và được DiffUtil sử dụng làm lớp gọi lại trong khi tính toán sự khác biệt giữa hai danh sách. Nó có bốn phương thức trừu tượng và một phương pháp không trừu tượng. Bạn phải mở rộng nó và ghi đè tất cả các phương thức của nó-

**getOldListSize () **- Trả về kích thước của danh sách cũ.

**getNewListSize ()** - Trả về kích thước của danh sách mới.

**areItemsTheSame (int oldItemPocation, int newItemPocation) **- Nó quyết định xem hai đối tượng có đại diện cho cùng một mục hay không.

**areContentsTheSame (int oldItemPocation, int newItemPocation)** - Nó quyết định hai mục có cùng dữ liệu hay không. Phương thức này được gọi bởi DiffUtil chỉ khi areItemsTheSame () trả về true.

**getChangePayload (int oldItemPocation, int newItemPocation)** - If areItemTheSame () trả về true và areContentsTheSame () trả về false so với DiffUtil gọi phương thức này để nhận tải trọng về thay đổi.

Dưới đây là một class Employee đơn giản đang sử dụng trong EmployeeRecyclerViewAdapter và EmployeeDiffCallback để sắp xếp danh sách nhân viên.

```
public class Employee {
    public int id;
    public String name;
    public String role;
}
```
Dưới đây là việc implementation class `Diff.Callback`. Bạn có thể nhận thấy rằng `getChangePayload ()` không phải là phương thức trừu tượng.

```
public class EmployeeDiffCallback extends DiffUtil.Callback {

    private final List<Employee> mOldEmployeeList;
    private final List<Employee> mNewEmployeeList;

    public EmployeeDiffCallback(List<Employee> oldEmployeeList, List<Employee> newEmployeeList) {
        this.mOldEmployeeList = oldEmployeeList;
        this.mNewEmployeeList = newEmployeeList;
    }

    @Override
    public int getOldListSize() {
        return mOldEmployeeList.size();
    }

    @Override
    public int getNewListSize() {
        return mNewEmployeeList.size();
    }

    @Override
    public boolean areItemsTheSame(int oldItemPosition, int newItemPosition) {
        return mOldEmployeeList.get(oldItemPosition).getId() == mNewEmployeeList.get(
                newItemPosition).getId();
    }

    @Override
    public boolean areContentsTheSame(int oldItemPosition, int newItemPosition) {
        final Employee oldEmployee = mOldEmployeeList.get(oldItemPosition);
        final Employee newEmployee = mNewEmployeeList.get(newItemPosition);

        return oldEmployee.getName().equals(newEmployee.getName());
    }

    @Nullable
    @Override
    public Object getChangePayload(int oldItemPosition, int newItemPosition) {
        // Implement method if you're going to use ItemAnimator
        return super.getChangePayload(oldItemPosition, newItemPosition);
    }
}
```

Sau khi implementation `DiffUtil.Callback`, bạn phải cập nhật thay đổi danh sách trong *RecyclerViewAdapter* như dưới đây :
```
public class CustomRecyclerViewAdapter extends RecyclerView.Adapter<CustomRecyclerViewAdapter.ViewHolder> {

  ...
       public void updateEmployeeListItems(List<Employee> employees) {
        final EmployeeDiffCallback diffCallback = new EmployeeDiffCallback(this.mEmployees, employees);
        final DiffUtil.DiffResult diffResult = DiffUtil.calculateDiff(diffCallback);

        this.mEmployees.clear();
        this.mEmployees.addAll(employees);
        diffResult.dispatchUpdatesTo(this);
    }
}
```
Gọi `ClarkUpdatesTo (RecyclerView.Adapter)` để gửi danh sách cập nhật. Đối tượng `DiffResult` được trả về từ tính toán diff, gửi các thay đổi tới Adapter và Adapter sẽ được thông báo về sự thay đổi. 

Đối tượng được trả về trong `getChangePayload () `được gửi từ DiffResult bằng cách sử dụng `notifyItemRangeChanged (position, count, payload)`, theo đó được gọi là phương thức Adapter trênBindViewHolder (… List<Object> payloads).
```
@Override
public void onBindViewHolder(ProductViewHolder holder, int position, List<Object> payloads) {
// Handle the payload
}
```
****
    
DiffUtil cũng sử dụng các phương thức RecyclerView.Adapter để thông báo cho Adapter để cập nhật tập dữ liệu:

* *notifyItemMoved ()*
* *notifyItemRangeChanged ()*
* *notifyItemRangeInserted ()*
* *notifyItemRangeRemoved()*
* 
Bạn có thể đọc thêm chi tiết về RecyclerView.Adapter và method của nó ở [đây](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html) .

### Lưu ý:
Nếu là một list có dung lượng item lớn, thao tác này có thể mất nhiều thời gian, do đó bạn nên chạy nó trên background Thread, lấy DiffUtil #DiffResult sau đó áp dụng nó trên RecyclerView trên main Thread. Ngoài ra kích thước tối đa của list có thể là 2²⁶ do các implementation constraints.

### Hiệu suất
DiffUtil yêu cầu không gian O (N) để tìm số lượng tối thiểu các hoạt động thêm và xóa giữa hai danh sách. Hiệu suất dự kiến của nó là O (N + D²) trong đó N là tổng số mục được thêm và xóa và D là độ dài của tập lệnh chỉnh sửa. Bạn có thể đi qua trang chính thức của Android để biết thêm số liệu hiệu suất.

Bạn có thể tìm thấy triển khai tham chiếu của ví dụ DiffUtil ở trên trên [GitHub](https://github.com/search?q=DiffUtil)

Cảm ơn các bạn đã theo dõi.