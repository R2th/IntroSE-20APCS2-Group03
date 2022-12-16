## Làm việc với Keyword View

### 1. Keyword view là gì?

* Là chế độ xem từ khóa bao gồm một chế độ xem giống như bảng. Trong đó mỗi bước là một hàng riêng biệt trong bảng và mỗi cột biểu thị các phần khác nhau của các bước.
* Cột Mục chứa mục mà bạn muốn thực hiện bước. Cột này sử dụng các biểu tượng hiển thị phân cấp của đối tượng GUI mà thao tác được thực hiện
* Cột hoạt động chứa các hoạt động được thực hiện trên các mục.
* Cột giá trị chứa các giá trị đối số cho thao tác đã chọn,
* HP QTP tự động ghi lại từng bước để dễ hiểu trong Cột Tài liệu
* 4 cột này là mặc định nhưng bạn cũng có thể sử dụng các cột phân công và nhận xét trong Keyword View

Giới thiệu về Action: Các thử nghiệm trong QTP được ghi lại dưới dạng hành động. Hành động không là gì ngoài một tập hợp các câu lệnh thực hiện một chuỗi các hành động. Thông thường một hành động chỉ đơn giản là một đơn vị logic của modul. 
Sau đây là một ví dụ đơn giản của action keyword view:
| Action | Description     |
| -------- | -------- |
| Action 1     | Login     |
| Action 2     | Compose and send email     |
| Action 3     | Logout     |

Khi thực hiện lệnh ta sẽ có 3 lệnh:
- Lệnh 1 gọi hành động Login
- Lệnh 2 gọi hành động soạn và gửi email
- Lệnh 3 gọi hành động logout

    Việc phân rã các thao tác nhiều action thành đơn giản như thế này giúp người dùng cụ thể hóa các bước kiểm thử, mỗi action sẽ trở nên dễ dàng hơn là gộp tất cả các bước thành một action. Chính vì vậy mà trong quá trình kiểm thử, chúng ta nên chú ý phân chia các action sao cho hợp lý thì khi kịch bản kiểm thử lớn hơn sẽ tránh được các rắc rồi về mặt thao tác và có thể duy trì nó một cách dễ dàng.
    
    Ngoài ra, còn có một chế độ khác gọi là Thư mục action tái sử dụng. Điều đó có nghĩa là QTP cũng ưu việt như một số công cụ kiểm thử khác vì nó cho phép người dùng biến các action có thể sử dụng lại trong nhiều bài kiểm thử hoặc nhiều lần trong cùng một bài thử  nơi nó được tạo ra. Sau này chúng ta sẽ tìm hiểu sâu hơn về vấn đề này.

### 2. Làm việc với Keyword view

Lấy ví dụ về một bài kiểm thử mở ứng dụng chuyến bay. Nhập tên đại lý và mật khẩu trong trang đăng nhập và nhấp vào OK.
Chúng ta có 3 action cụ thể như sau:
| Item  | Operation | Value | Documentation |
| -------- | -------- | -------- | -------- |
| Action 1 | Set      | swati     | Nhập tên đại lý  là swati vào box Agent Name    |
| Action 2 | Set secure    | 5112fd3c42beb7a58069b67...     |Nhập mật khẩu là chuỗi  5112fd3c42beb7a58069b67... vào box Password  |
| Action 3 | click    | | Nhấp button OK     |

Ngoài ra, chúng ta cũng có thể hiển thị các bước kiểm thử  bằng chế độ expert view và thấy cách chúng xuất hiện dưới dạng bảng trong chế độ Keyword view như sau:
Trong đó chúng ta chỉ quan tâm từ dòng 1 đến 3: Thực hiện thao tác đăng nhập.
- Mở ứng dụng có form Login
- Nhập tên đại lý
- Nhập mật khẩu
- Nhấn nút OK

![](https://images.viblo.asia/625bfc0a-e9b8-411b-96b0-e93c7d76e36c.PNG)

Còn đây là giao diện của code ở chế độ keyword view:

![](https://images.viblo.asia/0a3190b9-863e-471c-b569-5bac40aa79f8.PNG)

Chúng ta có thể thấy có 4 cột là Item, Operation, Value và Documentation.
Bảng có thể được mở rộng hoặc thu gọn bằng cách nhấp vào mũi tên nhỏ bên cạnh tên hành động.

**Item**: Mỗi bước là một chuỗi các sự kiện được thực hiện trên một item. Item này có thể là một trong những điều sau đây: 
- Đối tượng thử nghiệm (ví dụ: Hộp Chỉnh sửa Tên Tác nhân)
- Utility Object: Đây là một số đối tượng được QTP dành riêng để sử dụng trong các thử nghiệm. Ví dụ: đối tượng DataTable.
- Statement: Bất kỳ tuyên bố lập trình VB Script hoặc thậm chí bình luận
- Function call: như hộp tin nhắn msgbox chẳng hạn

**Operation**: Nó cho thấy các hoạt động được thực hiện trên các item. Khi cột này được bấm cho một mục cụ thể, nó liệt kê tất cả các hoạt động có sẵn có thể được thực hiện trên đối tượng.

![](https://images.viblo.asia/f748c92d-bde4-40a2-8f1d-29db41271be2.png)

**Value**: Cột này có thể được coi là đối số của câu lệnh được hiển thị. Trong ví dụ này, lệnh gọi hàm hộp thông báo có giá trị văn bản. Có thể có nhiều đối số cho một câu lệnh trong trường hợp này cột này sẽ được chia tương ứng.

**Documentation**: Một cột chỉ đọc có thể dịch một statement  thành các bình luận dễ hiểu.

Ngoài ra, có hai cột khác là Assignment và Comment có thể được thêm vào bảng Keyword view. Để làm như vậy, tùy chọn để chọn là Tool > View options và chọn các cột bắt buộc từ danh sách được hiển thị.

![](https://images.viblo.asia/c4e9a9e3-00e6-4a6b-819d-6eddfc110863.png)

**Assignment**: Cột này không được sử dụng rộng rãi và những gì nó làm là gán giá trị cho hoặc nhận giá trị từ một biến.

![](https://images.viblo.asia/5b459322-892b-4e52-b944-c5224c527340.png)

**Comment**: Người kiểm tra có thể viết bất cứ điều gì dưới cột này. Nó sẽ được coi là ý kiến trong quan điểm kiểm thử.

Nguồn: 
https://www.softwaretestinghelp.com/

http://ww8.redmine.com/