![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)
# Mở đầu
Nếu chỉ là làm việc với file, thì cũng không có gì để nói nhiều lắm. Hiện nay có rất nhiều công cụ đồ họa hỗ trợ đắc lực cho việc này. Đơn giản là chỉ cần với vài click chuột, rê rê, kéo kéo, chọn rồi thả và rồi mọi thao tác đã xong. Nhưng mà đó là khi thao tác trên giao diện đồ họa, tất cả đều trực quan sinh động, cái gì cũng dễ thấy được. Với môi trường **Linux**, đặc biệt là với môi trường server, thường chúng ta sẽ không có một giao diện đồ họa như vậy. Các hệ thống server hầu hết đều phải thao tác thông qua cửa sổ dòng lệnh, màn hình đen và các dòng chữ trắng. Khi đó, những thao tác với chuột là quá xa xỉ. Chúng ta chỉ có một màn hình, và một bàn phím, làm việc trực tiếp với các dòng lệnh. Với những người không thường xuyên thao tác trên hệ thống dòng lệnh thì đây quả là một cơn ác mộng, các lệnh quá khó nhớ, cũng quá khó để sử dụng. Vì vậy, bài viết này của tôi ra đời với mục đích giúp mọi người làm quen với một số lệnh cơ bản để quản lý file trong hệ thống **Linux**.
# Các lệnh điều hướng và thăm dò
### Xác định vị trí với *pwd*
Thông thường khi ta truy cập vào server Linux nào đó, ta sẽ ở tại thư mục Home của tài khoản ta truy cập. Tuy nhiên, sau một thời gian làm việc, đôi khi ta không thể nhớ chính xác được mình đang ở tại thư mục nào. Và những lúc như thế này ta cần đến lệnh `pwd`.
Cách sử dụng lệnh này cũng rất đơn giản, chỉ cần gõ: `pwd`

![](https://images.viblo.asia/2bcbd247-3b05-455e-8956-66a865c5a822.png)

Kết quả hiện ra là thư mục hiện tại đang làm việc. Theo như hình thì thư mục hiện tại của tôi là `sandbox`, và nó ở trong thư mục `share`, thư mục `share` này lại ở bên trong thư mục `usr`, và cuối cùng là đến thư mục `/` - một thư mục đặc biệt gọi là `root`, mọi thư mục khác đều có gốc là từ thư mục này.

### Xác định các thư mục và file với *ls*
Lệnh `ls` là lệnh dùng để giúp ta biết được trong một thư mục nào đó có chứa các file và thư mục con nào. Khi làm việc trên dòng lệnh, ta không thấy được gì ngoài dấu nhắc lệnh. Vì thế lệnh này rất hữu ích, nó cho ta biết được ta có thể thao tác với chính xác file hoặc thư mục nào đó tồn tại.
Để sử dụng lệnh này, ta chỉ cần gõ: `ls [target]`. `target` có thể là file (dùng khi muốn xem thông tin cơ bản của file), thư mục (dùng khi muốn biết trong thư mục đó có những file và thư mục con nào), hoặc để trống (tương tự như thư mục nhưng trong trường hợp này ta muốn xem thông tin của thư mục hiện tại).

![](https://images.viblo.asia/83b49428-f3ea-43f7-8041-3d54ec79f54a.png)

Một ví dụ để xem các file và thư mục con của thư mục `usr`.
Lệnh `ls` có thể có các tùy chọn sau:
- `-a`: xem cả các file và thư mục ẩn
- `-l`: xem thông tin chi tiết bao gồm ACL (access control list), kích cỡ, ngày tháng cập nhật, chủ sở hữu ....
- `-p`: thêm slash (`/`) để đánh dấu các thư mục
- `-R`: xem cả cây thư mục

### Chuyển thư mục với *cd*
Không có gì để nói về lệnh này ngoại trừ tên của nó. `cd` (change directory) là lệnh dùng để chuyển thư mục làm việc hiện tại sang thư mục sang thư mục làm việc khác.

![](https://images.viblo.asia/ce39e195-994a-4fea-8e8c-70ec0c892aff.png)

Tác dụng của nó đơn giản chỉ là để chuyển thư mục, và tất cả cũng chỉ có như vậy.

# Xem nội dung của file
### Hiển thị nội dung toàn bộ file với *cat*
Cách sử dụng của lệnh này về cơ bản cũng rất dễ, chỉ cần `cat [filename]`, và sau đó ta có thể thấy được toàn bộ nội dung của file.

![](https://images.viblo.asia/c46318ec-8e23-4c0e-996a-c11fb9233fdc.png)

Tuy nhiên, một hạn chế của `cat` là khi in ra nội dung của file thì nếu file quá dài ta không thể xem hết được, mà buộc phải kết hợp với các câu lệnh khác.

### Phân trang với `less`
Lệnh `less` là một bổ sung cần thiết cho `cat` khi xem nội dung của file. Với tính năng phân trang dữ liệu, `less` có thể giúp chúng ta xem toàn bộ nội dung của một file dài. Cú pháp sử dụng cũng chỉ cần `less [filename]`, khá tương đồng với `cat`.

![](https://images.viblo.asia/b8445895-dea9-4301-960c-9d58367ad803.png)

Ta có thể sử dụng các phím điều hướng lên, xuống hoặc `f` (scroll forward) và `b` (scroll backward) cho việc chuyển trang. Ngoài ra, để thoát chế độ xem với `less`, ta dùng `q`.

# Các thao tác với file và thư mục
### Tạo file với *touch*
Mặc dù có rất nhiều câu lệnh có thể dùng để tạo file, nhưng lệnh cơ bản nhất vẫn là `touch`, câu lệnh có tác dụng tạo ra một file với tên và đường dẫn chỉ định.
Cú pháp cơ bản là `touch [filename_with_path]`. Nếu chỉ có `filename` thì mặc định là file sẽ được tạo ra ở thư mục hiện tại. Ta có thể tạo nhiều file cùng lúc với `touch`.

![](https://images.viblo.asia/8470aa62-0e94-4733-94e9-4fe9076add95.png)

### Tạo thư mục với *mkdir*
Tương tự với `touch`, `mkdir` cũng có tác dụng tạo ra 1 file, nhưng file ở đây là dạng file thư mục. Đặc biệt, có thể dùng tùy chọn `-p` để tạo cả 1 cây thư mục.

![](https://images.viblo.asia/5221fb97-723d-4f9a-b9b1-ad66e6295e7e.png)

### Di chuyển hoặc đổi tên file và thư mục với *mv*
Lệnh `mv` có 2 tác dụng: di chuyển (chuyển file hoặc thư mục nào đó ra một thư mục khác) hoặc đổi tên (đổi tên của file hoặc thư mục).
Cú pháp chung là `mv file_or_dir1[, file_or_dir2, ...] new_location`

![](https://images.viblo.asia/765fb51d-4a7c-4c1a-9a6a-bdbff13c98ba.png)

### Sao chép file hoặc thư mục với *cp*
Lệnh `cp` được dùng để sao chép file hoặc thư mục, hay nói cách khác là tạo bản sao của file hoặc thư mục nào đó.
Cú pháp sử dụng: `cp file_or_dir target_location`. Nếu muốn sao chép cả cây thư mục thì cần sử dụng tùy chọn `-r`.

![](https://images.viblo.asia/6019c4b7-c9c1-4f8b-939b-9a6d7efd6ac1.png)

### Xóa file hoặc thư mục
Để xóa file, ta dùng lệnh `rm`, còn để xóa một thư mục, ta dùng lệnh `rmdir`.
Tuy nhiên, `rmdir` có một hạn chế là chỉ xóa được thư mục trống. Để xóa cả một cây thư mục, ta cần sử dụng `rm` với tùy chọn `-r`.

![](https://images.viblo.asia/f5413627-0902-40aa-ab39-47d168eca623.png)

> Nếu như bạn đã quen với việc sử dụng Linux, thì có một lệnh được liệt kê vào danh sách lệnh nguy hiểm tuyệt đối không nên thao tác, đó là `rm -rf /`. Khi thực thi lệnh này, tất cả cây thư mục tính từ `root` sẽ bị xóa (`-r`), và không hỏi lại (`-f`). Nếu bạn không chắc chắn, thì tốt nhất không nên sử dụng tùy chọn `-r`, hoặc có thể sử dụng `-i` (sẽ hỏi trước khi xóa để chắc chắn).

# Công cụ quản lý file tổng hợp
Thông thường khi nghĩ đến các công cụ quản lý file, người ta thường sẽ nghĩ ngay đến một ứng dụng File Explorer nào đó. Trên các hệ điều hành Linux thì có thể kể đến Nautilus, Dolphin, Thunar, PCManFm, .... Tuy nhiên, trên giao diện dòng lệnh cũng có một số công cụ quản lý file như vậy, điển hình là Midnight Commander (MC).

Để có thể sử dụng `mc` thì ta cần cài đặt nó:
- Trên Ubuntu: `sudo apt install mc`
- Trên Fedora: `sudo yum install mc`

Giao diện cơ bản sẽ như sau:

![](https://images.viblo.asia/b388b7e6-4495-4b01-adb6-f2b86a488c76.png)

Giao diện của **MC** sẽ bao gồm 2 cửa sổ được mở song song để dễ thao tác. 
- Phía trên có một thanh menu đa chức năng, để active menu này ta cần dùng `F9` (một số máy sẽ cần sử dụng kết hợp với phím `Fn`)
- Phía dưới có mô tả một số tùy chọn sử dụng nhanh cho chương trình:
    - `F1`: Xem trợ giúp
    - `F2`: Hiện menu chức năng dành cho người dùng
    - `F3`: Xem nội dung file
    - `F4`: Chỉnh sửa file
    - `F5`, `F6`, `F7`, `F8`: Sao chép(`cp`), Di chuyển(`mv`), Tạo thư mục(`mkdir`), Xóa(`rm`)
    - `F9`: Kích hoạt top menu
    - `F10`: Thoát chương trình
# Kết luận
Trên đây chỉ là một số lệnh cơ bản để thao tác với file và thư mục trên một hệ thống **Linux**. Và khi bắt đầu làm quen với **Linux**, theo tôi đây là những lệnh nên được thực hành sử dụng trước tiên để làm quen với môi trường của nó. Mọi ý kiến đóng góp vui lòng comment bên dưới bài viết. Xin cảm ơn các bạn đã đọc bài viết.
# Tài liệu tham khảo
* http://linuxcommand.org/lc3_lts0020.php
* http://linuxcommand.org/lc3_lts0030.php
* http://linuxcommand.org/lc3_lts0050.php
* https://midnight-commander.org/