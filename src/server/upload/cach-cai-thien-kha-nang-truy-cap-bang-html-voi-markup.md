Khả năng truy cập web đề cập đến việc thiết kế các ứng dụng web theo cách mà người dùng phổ thông có thể sử dụng dễ dàng. Một số người dùng này dựa vào trình đọc màn hình để đọc nội dung trong các trang web. Trình đọc màn hình diễn giải mã có trên trang và đọc nội dung của nó cho người dùng.

<table> là một yếu tố HTML được sử dụng rộng rãi để hiển thị dữ liệu theo kiểu có cấu trúc trong các trang web. Thiết kế của nó bao gồm từ những cái đơn giản đến những cái phức tạp, hoàn chỉnh với các tiêu đề hàng, các tiêu đề hợp nhất, v.v.

Nếu một bảng không được thiết kế có khả năng truy cập, người đọc màn hình sẽ khó dịch dữ liệu trong các bảng phức tạp một cách có ý nghĩa cho người dùng. Do đó, để làm cho các bảng HTML phức tạp dễ hiểu hơn, đối với khả năng truy cập, chúng ta phải đảm bảo rằng các tiêu đề, nhóm cột, nhóm hàng, v.v ... được xác định rõ ràng. Chúng ta sẽ thấy bên dưới làm thế nào đạt được điều này trong **markup**.
##  The Scope Attribute
Ngay cả đối với một bảng đơn giản có thẻ <th> xác định rõ các tiêu đề, bạn có thể cải thiện khả năng truy cập của nó với thuộc tính scope và không đưa ra bất kỳ sự nhầm lẫn nào có thể phát sinh từ các loại dữ liệu tương tự trong các ô.
    ![](https://images.viblo.asia/9758cfaa-03b2-4ac6-aded-1361ddc79989.jpg)
```
<table>
    <tr>
        <th scope="col">Employee Name</th>
        <th scope="col">Employee Code</th>
        <th scope="col">Project Code</th>
        <th scope="col">Employee Designation</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>32456</td>
        <td>456789</td>
        <td>Director</td>
    </tr>
    <tr>
        <td>Miriam Luther</td>
        <td>78902</td>
        <td>456789</td>
        <td>Deputy Director</td>
    </tr>
</table>
```
Phạm vi thuộc tính làm gì? Theo W3C:
Nói cách khác, nó giúp chúng ta liên kết các ô dữ liệu với các ô tiêu đề tương ứng của chúng.

Xin lưu ý rằng trong ví dụ trên, bạn có thể chuyển <th> cho <td>. Miễn là phạm vi của nó có giá trị col, nó sẽ được hiểu là tiêu đề cột tương ứng.

Thuộc tính scope có thể có bất kỳ một trong bốn giá trị này; col, row, rowgroup, colgroup để chỉ một tiêu đề cột , một tiêu đề hàng , một nhóm các tiêu đề cột và một nhóm các tiêu đề hàng hàng tương ứng.
## Bảng phức tạp
 Bây giờ chúng ta hãy chuyển sang một bảng phức tạp hơn.
   ![](https://images.viblo.asia/3ca9afa3-0573-45c7-a0e1-f75297346338.jpg)
 Trên đây là bảng liệt kê các sinh viên trong một lớp và điểm số của họ về thực hành và lý thuyết cho ba môn học.

Đây là mã HTML cho nó. Bảng đã sử dụng rowspan và colspan để tạo các tiêu đề hợp nhất cho các ô dữ liệu.
```
<table>
    <tr>
        <th rowspan="2">Student Name</th>
        <th colspan="2">Biology</th>
        <th colspan="2">Chemistry</th>
        <th colspan="2">Physics</th>
    </tr>
    <tr>
        <th>Practical</th>
        <th>Theory</th>
        <th>Practical</th>
        <th>Theory</th>
        <th>Practical</th>
        <th>Theory</th>
    </tr>
    <tr>
        <th>John Doe</th>
        <td>A</td>
        <td>A+</td>
        <td>B</td>
        <td>A</td>
        <td>A</td>
        <td>A-</td>
    </tr>
    <tr>
        <th>Miriam Luther</th>
        <td>A</td>
        <td>A</td>
        <td>C</td>
        <td>C+</td>
        <td>A</td>
        <td>A-</td>
    </tr>
</table>
```
 Trong bảng trên, mỗi ô dữ liệu, là mỗi ô trong bảng hiển thị điểm, được liên kết với ba mẩu thông tin:

Học sinh này thuộc lớp nào?
Lớp học này thuộc về môn nào?
Là lớp này cho phần Thực hành hoặc Lý thuyết?
Ba thông tin này được định nghĩa trong ba loại ô tiêu đề khác nhau về cấu trúc và trực quan:

Tên học sinh
Tên chủ đề
Thực hành hay lý thuyết
Hãy để định nghĩa tương tự cho khả năng tiếp cận.
```
<table>
    <col>
    <colgroup span="2"></colgroup>
    <colgroup span="2"></colgroup>
    <colgroup span="2"></colgroup>
    <tr>
        <th rowspan="2" scope="col">Student Name</th>
        <th colspan="2" scope="colgroup">Biology</th>
        <th colspan="2" scope="colgroup">Chemistry</th>
        <th colspan="2" scope="colgroup">Physics</th>
    </tr>
    <tr>
        <th scope="col">Practical</th>
        <th scope="col">Theory</th>
        <th scope="col">Practical</th>
        <th scope="col">Theory</th>
        <th scope="col">Practical</th>
        <th scope="col">Theory</th>
    </tr>
    <tr>
        <th scope="row">John Doe</th>
        <td>A</td>
        <td>A+</td>
        <td>B</td>
        <td>A</td>
        <td>A</td>
        <td>A-</td>
    </tr>
    <tr>
        <th scope="row">Miriam Luther</th>
        <td>A</td>
        <td>A</td>
        <td>C</td>
        <td>C+</td>
        <td>A</td>
        <td>A-</td>
    </tr>
</table>
```
Trong phần markup ở trên, chúng ta đã thêm phạm vi cho các ô chứa thông tin tiêu đề về các ô dữ liệu.    
Nguồn: hongkiat.com