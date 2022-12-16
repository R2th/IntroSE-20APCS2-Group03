Xây dựng cơ sở dữ liệu là một trong những bước vô cùng quan trọng khi bạn xây dựng bất cứ một chương trình nào. Đây là điều kiện tiên quyết để quyết định cho sự thuận lợi cũng như chuẩn xác mà chương trình bạn sẽ viết hay sự phát triển, mở rộng của hệ thống sau này. Để xây dựng một cơ sở dữ liệu tốt ngay lúc đầu bước vào dự án không phải điều đơn giản bởi trong quá trình chạy dự án sẽ phát sinh nhiều vấn đề mà khiến chúng ta phải thay đổi cơ sở dữ liệu. Tuy nhiên, để cho những sự thay đổi đổi đó không gây ảnh hưởng quá lớn tới chương trình, thì ngay từ ban đầu, bạn nên xây dựng một cơ sở dữ liệu hợp lí nhất có thể, ít nhất là tại thời điểm đó. Bài viết sau mình sẽ đưa ra các bước mình đã áp dụng để xây dựng một cơ sở dữ liệu mà theo mình là phù hợp. Để các bạn dễ hiểu, mình sẽ lấy ví dụ về làm về chương trình: "Hệ thống quản lí học tập". Mình có một số requirement như sau:
- Một người dùng có thể đăng kí, đăng nhập, đăng xuất một tài khoản duy nhất.
- Admin có thể tạo lớp học, sửa hay xóa lớp học đó.
- Mỗi Admin có thể quản lí những lớp của mình tạo ra.
- Admin có thể thêm học sinh, giáo viên vào mỗi lớp học, và mỗi lớp học có thể có nhiều giáo viên giảng dạy.
- Mỗi giáo viên có thể tham gia dạy nhiều lớp, với 1 môn nào đó.
- Mỗi học sinh sẽ thuộc về một lớp nào đó.
- Mỗi người dùng có thể thêm, sửa, xóa thông tin của bản thân.
- Giáo viên có thể xem thông tin các lớp mình dạy, danh sách học sinh các lớp đó.
- Học sinh có thể xem thông tin các lớp mình học.

# 1. Xác định bài toán

Ở bước này, từ các yêu cầu(requirement) của bài toán, ta cần xác định hệ thống sẽ làm những gì, làm với những đối tượng nào. Ví dụ với bài toán trên, mình sẽ nhận thấy một số điều như sau:
- Các tác nhân chính của hệ thống: Admin, giáo viên, học sinh
- Các chức năng chính:
    + Admin:
        * Thêm, sửa, xóa lớp học
        * Thêm học sinh, giáo viên vào lớp học
    + Giáo viên, học sinh:
        * Thêm, sửa, xóa thông tin cá nhân
        * Xem thông tin các lớp mình dạy(hoặc học)
Từ bước này ta có cái nhìn tổng quan hơn về hệ thống, về chức năng của từng tác nhân cũng như hướng bạn sẽ phát triển hệ thống từ đâu.
 
# 2. Xây dựng mô hình thực thể - liên kết

Đây là một bước yêu cầu sự chuẩn xác cao trước khi bạn muốn có một bảng cơ sơ dữ liệu hợp lí, nó có thể quyết định xem cơ sở dữ liệu của bạn có tốt hay không.

Ở bước này, bạn cần xác định từ những requirement của bài toán và những chức năng bạn đã xác định, các thực thể của hệ thống là gì, chúng sẽ có những thuộc tính gì, và quan hệ của chúng là gì.

## 2.1. Xác định thực thể

Để đơn giản, mình sẽ thiết kế một sơ đồ dễ hiểu nhất cho các bạn. Đầu tiên, hãy xác định các thực thể của bài toán. Thực thể ở đây là một đối tượng trong thế giới thực. Ta có thể dễ dàng nhận thấy các đối tượng trong bài toán như: Admin, giáo viên, học sinh, lớp học, tài khoản. Với mỗi thực thể đó, hãy xác định các thuộc tính của chúng, ví dụ như sau:

* Giáo viên: Mã giáo viên(MGV), Tên, Ngày sinh, Quê quán, Số điện thoại, Email, Trình độ giảng dạy
* Học sinh: Mã học sinh(MHS), Tên, Ngày sinh, Quê quán, Địa chỉ, Số điện thoại, Email, Hạnh kiểm, Xếp loại
* ...

## 2.2. Xác định khóa chính

Đối với mỗi đối tượng và các thuộc tính đó, bạn hãy xác định các khóa chính của các đối tượng đó. Khóa chính có thể hiểu đơn giản là các thuộc tính nhằm xác định ra một đối tượng duy nhất nào đó. Các khóa này sẽ ảnh hưởng tới quan hệ của các tập thực thể với nhau. Ví dụ đối với giáo viên, ta có thể thấy rằng, mỗi giáo viên sẽ có một MGV khác nhau, tức là không giáo viên nào có mã giống nhau, chứ không giống như các thuộc tính khác(2 giáo viên có thể trùng tên, hay trùng ngày sinh, ...). Một khóa chính có thể chứa nhiều thuộc tính (nếu như không có 1 thuộc tính đơn lẻ nào mà xác định được thực thể duy nhất). Một nguyên tắc đáng lưu ý khi chọn khóa đó chính là khóa tối thiểu, tức là bạn cần chọn khóa sao cho sô thuộc tính trong khóa chính đó là ít nhất có thể.

## 2.3. Xác định quan hệ giữa các thực thể

Khi đã xác định được các thực thể và thuộc tính của chúng, công việc tiếp theo sẽ là xác định ra quan hệ giữa các thập thực thể. Chúng ta có các kiểu quan hệ như sau:

* 1-1 (một-một): Là quan hệ mà mỗi đối tượng này chỉ có một đối tượng kia, và ngược lại. Ví dụ bài toán trên,mỗi người dùng chỉ có một tài khoản duy nhất, và ngược lại mỗi tài khoản chỉ thuộc về một người duy nhất. Vì thế, quan hệ giữa giáo viên - tài khoản, học sinh - tài khoản, admin - tài khoản là 1-1.
* 1-n (một-nhiều): Là quan hệ mà mỗi đối tượng này có nhiều đối tượng khác nhưng không có chiều ngược lại. Ví dụ ở trên, mỗi lớp có nhiều học sinh nhưng mỗi học sinh chỉ thuộc về một lớp. Vì vậy, quan hệ giữa lớp học - học sinh là 1-n.
* n-n (nhiều nhiều): Là quan hệ mà mỗi đối tượng này có nhiều đối tượng kia, và ngược lại. Ví dụ, mỗi giáo viên có thể dạy nhiều lớp và mỗi lớp có thể có nhiều giáo viên dạy nên quan hệ giữa chúng là n-n.

## 2.4. Vẽ mô hình thực thể - liên kết

Sau khi có một tập các quan hệ như vậy, ta sẽ vẽ sơ thực thể liên kết như sau:

![](https://images.viblo.asia/337bfcd7-1c92-4c39-87f9-11a61d2534cb.png)

Mỗi tập thực thể được thể hiện bằng hình chữ nhật, các thuộc tính là hình bầu dục, còn các quan hệ giữa các thực thể sẽ là hình thoi. Các khóa chính được đánh dấu bằng gạch dưới. Các kiểu liên kết được viết trên các đường nối tới quan hệ. Từ hình vẽ này, ta có thể có cái nhìn tổng quát về quan hệ của toàn hệ thống.

# 3. Chuyển đổi mô hình thành quan hệ dạng bảng
Từ sơ đồ thực thể liên kết, ta sẽ chuyển đổi thành quan hệ dưới dạng bảng. Đối với các thực thể, ta sẽ lưu giữ chúng dưới dạng một bảng với các trường là các thuộc tính tương ứng. Ngoài ra, ta cần phải xem xét các quan hệ giữa các thực thể để thêm các trường nhằm liên kết giữa các bảng với nhau, phục vụ cho việc truy vấn cơ sở dữ liệu sau này. Đối với mỗi kiểu liên kết, ta có kiểu liên kết giữa các bảng khác nhau:

* 1-1: Chúng ta sẽ liên kết các bảng này bằng cách thêm các khóa chính của một bảng vào bảng còn lại. Ví dụ: Quan hệ của Học sinh - Tài khoản là 1-1:
    * TaiKhoan = {**ID**, tenTaiKhoan, matKhau}
    * HocSinh = {**MHS**, ten, ngaySinh, queQuan, email, xepLoai, hanhKiem, ***idTaiKhoan***}

    Thông thường, bảng được thêm trường là bảng mà mang ý nghĩa thuộc về đối tượng của bảng còn lại mặc dù ta có thể làm ngược lại, không hề sai về mặt dữ liệu cũng như sử dụng. Ở đây mình dùng cách ngược lại cho thuận tiện khi dùng bảng tài khoản cho nhiều loại người dùng khác nhau.
    
* 1-n: Ta sẽ thêm khóa chính vào bảng đại diện cho quan hệ nhiều. Ví dụ: Quan hệ của  Lớp học - Học Sinh là 1-n:
    * LopHoc = {**maLop**, ten, diaDiem}
    * HocSinh = {**MHS**, ten, ngaySinh, queQuan, email, xepLoai, hanhKiem, ***maLop***}
* n-n: Ta sẽ tạo ra một bảng mới có chứ cả 2 khóa chính của 2 bảng có quan hệ n-n. Ngoài ra ta cũng có thể thêm các thuộc tính của mối quan hệ này. Ví dụ như Giáo viên - Lớp học là n-n:
    * LopHoc = {**maLop**, ten, diaDiem}
    * GiaoVien = {**MGV**, ten, ngaySinh, queQuan, email, sdt, trinhDo}
    * GiangDay = {***maLop***, ***MGV***, mon}
  
Như vậy ta đã có các bảng với các mối quan hệ và trường tương ứng. Ta có thể đưa chúng về dạng UML lớp để có thể có một hình dung chính xác về cơ sở dữ liệu của chúng ta:

![](https://images.viblo.asia/d321f71f-bd24-4ca3-8798-7b8f6c6ef0a1.png)

# 4. Kết luận
Như vậy chúng ta đã đi qua các bước để có một cơ sở dữ liệu cơ bản. Bài viết này chỉ là phần chia sẻ kinh nghiểm của bản thân mình khi mới bắt đầu với việc xây dựng cơ sở dữ liệu. Sẽ có rất nhiều cách để xây dựng lên một cơ sở dữ liệu cho một bài toán. Vì vậy, sẽ có rất nhiều cơ sở liệu phù hợp, nên vì vậy hãy chọn cơ sở dữ liệu nào phù hợp nhất. Mong rằng bài viết có thể giúp bạn có một hướng đi tốt cho việc xây dựng cơ sở dữ liệu.