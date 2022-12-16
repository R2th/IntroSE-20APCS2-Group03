Trong phần trước chúng ta đã đi tìm hiểu về phép toán quan trọng và được sử dụng nhiều nhất trong Đại số quan hệ đó là **phép kết**. Ngày hôm nay chúng ta sẽ đi tìm hiểu các phép toán lựa chọn còn lại trong Đại số quan hệ đó là **Phép chọn** (selection), **phép chiếu** (projection) và **phép chia** (divsion). Đây là những phép toán hỗ trợ giúp loại bỏ những bộ hoặc những thuộc tính không cần thiết trong một quan hệ hoặc từ kết quả của việc kết hợp nhiều phép toán khác giữa các quan hệ với nhau.
# Phép chọn
Phép chọn được sử dụng khi muốn lấy ra những bộ trong một quan hệ thỏa mãn một điều kiện nào đó. Hãy cũng xem qua ví dụ sau:

![](https://images.viblo.asia/23461489-fca1-47d5-983e-0127efe2304b.jpg)

Khi thực hiện **phép chọn**  trên quan hệ **Employees** với điều kiện `{Age < 30, Salary > 4000}` ta được một quan hệ mới có cùng bậc với quan hệ **Employees** nhưng số bộ đã bị giảm đi.
# Phép chiếu
**Phép chọn** giúp ta chọn ra hoặc loại bỏ đi những bộ không thoản mãn một yêu cầu nào đó. Vậy khi muốn loại bỏ đi những thuộc tính không cần thiết thì phải làm thế nào. **Phép chiếu** sẽ giúp chúng ta làm điều đó:
![](https://images.viblo.asia/8690f56b-7786-40e7-86c8-808417245090.jpg)

Khi chiếu quan hệ **Employees** lên hai thuộc tính `{Surname, FirstName}` ta được một quan hệ mới có cùng số bộ với quan hệ **Employees** nhưng có bậc nhỏ hơn. Dễ dàng nhận thấy điểm khác nhau giữa **phép chọn** và **phép chiếu**:
![](https://images.viblo.asia/b520122b-daf7-46e8-8b4f-c0d1a688e656.jpg)

**Phép chọn** thao tác trên quan hệ theo chiều "dọc", ngược lại, **phép chiếu** thao tác trên quan hệ theo chiều "ngang".
# Phép chia
Nhắc lại một chút về **phép tích** mà chúng ta đã được tìm hiểu trong phần đầu tiên của series. Dưới đây là ví dụ  khi thực hiện phép tích giữa hai quan hệ **Employees** và **Projects**:
![](https://images.viblo.asia/c7dd949a-2fef-4355-88f8-737f488a7fc5.jpg)

Giống như trong toán học đại số, khi ta lấy quan hệ kết quả khi thực hiện phép tích giữa **Employees** và **Projects** `(Results = Employeess x Projects)` để chia cho một trong hai quan hệ ban đầu thì kết quả sẽ là quan hệ còn lại  `(Results -:- Employees = Projects)`. Vậy các bước thực hiện để có được kết quả đó như thế nào?

Đầu tiên từ quan hệ **Results** chúng ta lấy ra tất cả những bộ có cặp thuộc tính `{Employee, Project}` khớp với cặp thuộc tính tương ứng trong quan hệ **Employees** `[{Smith, A}, {Black, A}, {Black, B}]`. Sau đó chúng ta sử dụng **phép chiếu** lên quan hệ vừa mới thu được để loại bỏ đi các thuộc tính trùng với quan hệ **Employees**. Kết quả ta sẽ thu được một quan hệ với các bộ là các cặp thuộc tính `{Code, Name}` tương ứng như sau: `[{A, Venus}, {A, Venus}, {A, Venus}, {B, Mars}, {B, Mars}, {B, Mars}]`. Tiếp tục loại bỏ đi những bộ trùng nhau ta được `[{A, Venus}, {B, Mars}]`. Đây chính xác là những bộ có trong quan hệ **Projects**.

Vậy bản chất của phép chia là gì? Đó là việc thực hiện đồng thời **phép kết** (join) và **phép chiếu** (projection). Cụ thể trong ví dụ trên chúng ta có thể thực hiện kết bằng giữa **Results** và **Employees** trên các thuộc tính của **Employee**, sau đó là thực hiện phép chiếu lên các thuộc tính của **Results** mà không thuộc **Employess**.
# Kết luận
Như vậy là chúng ta đã hoàn thành xong việc tìm hiểu về các phép toán cơ bản nhưng quan trọng nhất trong Đại số quan hệ. Đến đây chắc hẳn chúng ta cũng đã nhận ra những nét tương đồng giữa các phép toán đó với các câu truy vấn trong SQL. Việc tìm hiểu về Đại số quan hệ giúp ta có cái nhìn tổng quan về cách thức hoạt động của các ngôn ngữ truy vấn nói chung và SQL nói riêng từ đó góp phần hiệu quả khi thao tác trên cơ sở dữ liệu.