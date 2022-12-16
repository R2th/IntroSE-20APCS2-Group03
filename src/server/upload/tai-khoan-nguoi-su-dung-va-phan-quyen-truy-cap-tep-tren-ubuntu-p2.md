Tại bài viết [Tài khoản người sử dụng và phân quyền truy cập tệp trên Ubuntu](https://viblo.asia/p/tai-khoan-nguoi-su-dung-va-phan-quyen-truy-cap-tep-tren-ubuntu-p1-Az45bLNgZxY) (P1) mình đã giới thiệu về người sử dụng và quản lý tài khoản người sử dụng trên Ubuntu. Trong bài viết lần này, mình sẽ trình bày về quản lý quyền truy cập trên Ubuntu.
# Các nhóm người sử dụng
Mỗi tệp hay thư mục luôn thuộc về một người sử dụng và một nhóm xác định. Mỗi file bao gồm 3 nhóm người sử dụng. Người tạo ra chúng sẽ thuộc nhóm người sở hữu (owner), còn nhóm chứa người tạo ra file hay thư mục đó thì sẽ thuộc nhóm sở hữu (group). Bất kì người sử dụng nào không phải chủ sở hữu hoặc nhóm sở hữu thì sẽ thuộc nhóm những người sử dụng khác (others). Mỗi nhóm 
# Các quyền truy cập và phân quyền truy cập
## Các quyền truy nhập 
Các quyền của file/folder đó sẽ xác định xem người sử dụng có thể thực hiện được những hành động nào lên file/folder đó. Mỗi nhóm người sử dụng như trên sẽ có một tập các quyền (r,w,x) xác định, trong đó:
- Quyền đọc (**r**): 
    - Cho phép hiển thị nội dung của file hoặc thư mục.
- Quyền ghi (**w**): 
    - Cho phép thay đổi nội dung của file.
    - Cho phép thêm hoặc xóa các file trong một thư mục
- Quyền thực thi (**x**):
    - Cho phép thực thi file dưới dạng một chương trình
    - Cho phép chuyển đến thư mục cần truy cập.
## Hai định dạng của quyền truy cập
Quyền truy cập file của Linux được hiển thị dưới hai định dạng là **symbolic notation** (kí hiệu tượng trưng) và **numeric notation** (kí hiệu số)
### 1. Định dạng symbolic notation
Loại định dạng này là một chuôi gồm 10 ký tự trong đó một kí tự đại diện cho loại file và 9 kí tự còn lại đại diện cho các quyền đọc, ghi và thực thi file theo các thứ tự người sở hữu, nhóm sở hữu và người dùng khác. Dấu gạch ngang (-) sẽ được sử dụng trong trường hợp không cho phép người dùng thực hiện quyền.
Giả sử một file có quyền thực thi như sau: `-rwxr-xr--`. Ta có thể dễ dàng thấy rằng file này là một file thông thường với quyền đọc, ghi và thực thi cho chủ sở hữu, đọc và thực thi cho nhóm và chỉ đọc cho những người khác.
Ta có thể kiểm tra quyền của một tệp bằng cách sử dụng lệnh `ls -l <tên tệp>` hay kiểm tra quyền của một thư mục bằng cách sử dụng lệnh `ls -l <tên thư mục>`

![](https://images.viblo.asia/d4456e00-2173-45c7-9b09-8e2f879b05b5.png)

### 2. Định dạng numeric notation
Định dạng numeric notation là một chuỗi gồm ba chữ số, mỗi chữ số tương ứng với user, nhóm và các người sử dụng khác. Mỗi chữ số nằm trong khoảng từ 0 đến 7 và mỗi giá trị của chữ số có được bằng cách tính tổng các quyền của lớp:
- 0: Không được phép thực hiện bất kỳ quyền nào
- 1: Thực thi
- 2: Viết
- 3: Viết và thực thi
- 4: Đọc
- 5: Đọc và thực thi
- 6: Đọc và viết
- 7: Đọc, viết và thực thi

Vì vậy, nếu một file có quyền thực thi hiển thị theo định dạng symbolic notation là `-rwxr-xr--` thì khi chuyển sang dạng numeric notation sẽ là 754.
# Thay đổi quyền truy cập
Để thay đổi quyền truy cập của một tệp hay thư mục, ta sử dụng lệnh `$chmod <mode> <files>` với **chmod** (change mode) là một lệnh cấp hệ thống, cho phép bạn thay đổi cài đặt quyền của file theo cách thủ công.
Các lệnh **chmod** thường xuyên được sử dụng để cấp quyền cho một đối tượng như:
- Chmod 644: cho phép chủ sở hữu có thể truy cập và sửa đổi file, trong khi mọi người dùng khác chỉ có thể truy cập mà không thể sửa đổi. Bên cạnh đó, không ai có thể thực thi file ngay cả chủ sở hữu.
- Chmod 755: cho phép chủ sở hữu có thể truy cập và sửa đổi file, trong khi mọi người dùng khác chỉ có thể truy cập mà không thể sửa đổi và mọi người đều có quyền thực thi. 
- Chmod 555: file không thể bị sửa đổi bởi bất kỳ ai, ngoại trừ superuser (siêu người dùng) của hệ thống. 
- Chmod 777: cho phép mọi người có thể làm bất cứ điều gì họ muốn với file. Đây là một rủi ro bảo mật rất lớn, đặc biệt là trên các máy chủ web nên bạn cần thận trọng khi cấp quyền 777 cho bất kì một file nào nhé.


Như vậy, thông qua 2 bài viết, mình đã giới thiệu cơ bản về tài khoản sử dụng và phân quyền truy nhập trên Ubuntu. Cảm ơn các bạn đã theo dõi