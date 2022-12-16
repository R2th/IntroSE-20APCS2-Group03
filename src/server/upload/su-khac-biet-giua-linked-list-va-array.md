Điểm khác biệt mấu chốt giữa Array và Linked list liên quan đến cấu trúc của chúng. Array có cấu trúc dữ liệu dựa trên index, trong đó mỗi phần tử tương ứng với một index. Trong khi đó, Linked list lại dựa trên tham chiếu, mỗi node chứa dữ liệu và các tham chiếu tới phần tử trước và sau nó.

Về cơ bản, array là một tập hợp các object tương tự nhau được lưu trữ một cách tuần tự trong bộ nhớ với cùng một heading chung hoặc một tên biến chung. Còn linked list là một data structure chứa một tập tuần tự các phần tử, mà từng phần tử được liên kết tới phần tử tiếp theo. Trong mỗi phần tử của linked list có hai trường. Một là trường dữ liệu, hai là trường link, trường dữ liệu chứa giá trị của nó, còn trường link chứa địa chỉ của phần tử tiếp theo trong list. Địa chỉ này được dùng để truy cập tới một node cụ thể, nó còn được gọi là con trỏ (pointer).

Một điểm khác biệt đáng chú ý giữa array và linked list nữa là array có kích thước cố định và đòi hỏi phải được khai báo giới hạn, nhưng linked list không bị giới hạn gì về kích thước, tính mở rộng trong suốt quá trình thực thi.

### Bảng so sánh

| So sánh | Array | Linked list |
| -------- | -------- | -------- |
| Cơ bản    | Là một tập cố định các phần tử  | Một tập hợp lớn các dữ liệu được sắp xếp theo thứ tự nào đó |
| Kích thước      | Cố định, được định nghĩa lúc khai báo     | Không cần định nghĩa, nó tự lớn lên và thu gọn lại lúc thực thi      |
| Nơi lưu trữ     | Địa điểm của các thành phần được lưu trữ trong suốt thời gian compile      | Vị trí của các thành phần được chỉ định ở run time     |
| Thứ tự sắp xếp |  Được lưu trữ liên tiếp nhau | Được lưu trữ ngẫu nhiên |
| Cách truy cập | Trực tiếp hoặc ngẫu nhiên | Truy cập một cách tuần tự |
| Chèn và xoá phần tử | Tương đối chậm do cần phải shifting mảng | Dễ dàng, nhanh chóng và tiện lợi |
| Tìm kiếm | Tìm kiếm nhị phân và tìm kiếm tuyến tính | Tìm kiếm tuyến tính
| Bộ nhớ | Cần ít | Cần nhiều hơn |
| Sử dụng bộ nhớ | Không hiệu quả  | Hiệu quả |

 
### Định nghĩa Array

Một mảng được định nghĩa là một tập hợp một số lượng nhất định các phần tử đồng nhất hoặc các mục dữ liệu. Tức là một mảng chỉ có thể chứa một loại dữ liệu duy nhất, hoặc tất cả đều là integer, hoặc tất cả là character.

`int a [10];`

Trong đó int là định nghĩa kiểu dữ liệu của array, a là tên array và 10 là số phần tử mà array này lưu trữ, nó chính là kích thước hay độ dài của array.

**Một số tác vụ với array**
* Tạo mới array
* Duyệt qua mảng
* Chèn mới phần tử
* Xoá bớt phần tử
* Chỉnh sửa phần tử
* Gộp nhiều array lại với nhau

### Định nghĩa Linked List

Linked list là một danh sách cụ thể của một số thành phần dữ liệu được liên kết với nhau. Trong đó, mọi phần tử đều trỏ đến phần tử tiếp nhằm thể hiện thứ tự logic. Mỗi phần tử được gọi là một node, và nó có hai phần. Phần info chứa thông tin và phần pointer chứa con trỏ chỉ tới phần tử tiếp theo. 

Có một số loại linked list như Singly-linked list, Doubly linked list, Circular linked list, Circular double linked list.

**Một số tác vụ với Linked List**
* Tạo mới
* Duyệt phần tử
* Chèn phần tử
* Xoá phần tử
* Tìm kiếm 
* Ghép các linked list lại với nhau
* Hiển thị

### Tổng kết

Array và linked list là những loại cấu trúc dữ liệu khác nhau trong cấu trúc của chúng, trong việc truy cập và các phương thức thao tác, trong yêu cầu về bộ nhớ và sử dụng bộ nhớ. Cả hai đều có những ưu điểm và nhược điểm riêng của mình. Vì vậy, mỗi loại vẫn có những nhu cầu sử dụng riêng của nó, không thể thay thế cho nhau được.