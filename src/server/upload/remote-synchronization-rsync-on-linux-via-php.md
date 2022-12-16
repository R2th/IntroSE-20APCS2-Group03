### A. Giới thiệu
Mình được khách giao cho một task khá lạ (ít nhất là đối với bản thân mình), đó là yêu cầu đồng bộ dữ liệu ảnh từ 1 server sang 1 ( hoặc 2, 3 server khác). Mới đầu đọc spec mình cũng không hiểu lắm, vào thư mục của các server thì ngoài folder chứa ảnh thì chả có cái gì khác (sad) nên lại càng hoang mang vì mình nghĩ răng việc thực hiện save ảnh chỉ xảy ra khi cùng đường dẫn thư mục, hoặc thực hiện qua một function của server khác...bla bla chứ không thể khác server được. Sau đấy tình cờ quá lại bắt gặp được cô em rsync này nên bài viết này mình sẽ giới thiệu về Rsync trong Linux
### B. Rsync
#### 1. Rsync là gì
- Lệnh rsync Linux copy và đồng bộ file hoặc thư mục giữa máy tính cá nhân, máy chủ từ xa, hoặc bất kỳ máy tính nào khác. Ai làm việc với hệ máy Linux đều cần dùng chức năng mạnh mẽ này để hỗ trợ quản lý tốt hơn. Với bài này, bạn sẽ biết nhanh chóng làm chủ được lệnh Rsync
- Đồng bộ folder hoặc copy files thủ công thường rất tốn thời gian. Tính năng rsync lại có thể làm được hầu hết mọi công việc đó, giúp bạn tiết kiệm được nhiều thời gian. Thậm chí là khi bạn ngắt kết nối trong qua trình chuyển đổi, công cụ này sẽ tạm ngưng, và được mở lại tại điểm tạm ngưng đó khi kết nối lại.
#### 2. Syntax cơ barn
Syntax cơ bản của rsync sẽ như sau:
```
rsync [optional modifiers] [SRC] [DEST]
```
Có nhiều cách khác nhau để dùng lệnh Linux Rsync. Ví dụ, `optional modifiers` để chỉ hành động nào sẽ được thực thi, `src` là thư muc gốc, và `dest` là thư mục gốc của máy.
#### 3. Cài đặt Rsync
Nếu máy của bạn không có rsync, bạn có thể cài đặt nó trong 1 phút! Những hệ điều hành nền Debian như Ubuntu có thể dùng lệnh sau để cài Rsync:
```
apt-get install rsync
```
Trên distribution nền rpm như Fedora hay CentOS, bạn dùng lệnh sau để cài:
```
yum install rsync
```
Xong rồi! Rsync Linux đã sẵn sàng để đồng bộ dữ liệu, thực hiện chuyển đổi hay xóa file! Xem kết quả cài đặt bằng lệnh kiểm tra phiên bản rsync như trước:
```
rsync -version
```
#### 4. Thao tác trên Rsync
- Trong bài hướng dẫn này, mình tạo 2 thư mục trên máy Linux, có tên `Original` và `Duplicate`. Thư mục gốc (original) có 3 ảnh và thư mục duplicate thì trống. Giờ chúng tôi sẽ chỉ bạn cách dùng Rsync Linux nhé.
- Lệnh sau, khi gõ vào trong commanldn, sẽ copy và đồng bộ toàn files đặt trong thư mục gốc tới thư mục đích.
```
rsync original/* duplicate/
```
* chỉ cho lệnh rsync biết để đồng bộ toàn bộ file trong thư mục gốc.
- Nếu chúng ta đặt một ảnh hoặc file mới vào trong thư mục gốc và chạy lại cùng lệnh trên, nó sẽ chỉ copy file mới tới thư mục đích.
- Tính năng này hữu dùng để copy files giữa hệ thống mạng mà băng thông không cao.
- Lưu ý là lệnh này chỉ copy file trong thư mục gốc (Original theo ví dụ của chúng tôi), nó không copy các thư mục con trong đó.
- Nếu bạn muốn copy cả thư mục con, vậy hãy dùng lệnh sau:
```
rsync -r original/ duplicate/
```
- Tham số `-r` nói cho rsync biết để copy mọi thứ `bao gồm thư muc con` và files từ thư mục gốc.
- Dấu `/` đặt sau thư mục `original` dùng để nói rsync `copy` nội dung từ thư mục gốc đến thư mục duplicate.
- Nếu bạn muốn `đồng bộ files` – từ là copy 2 chiều, những file nằm trong thư mục duplicate mà không có trong thư mục original sẽ được copy ngược lại, thì dùng lệnh sau:
```
rsync -r original duplicate/
```
- Với lệnh này, bạn có thể chắc rằng cả thư mục gốc và thư mục đích đều sẽ chứa các files giống nhau.
- Một tham số hữu dụng khác là `-a`. Nó đại diện cho archive và có thể kết hợp với các lệnh khác. Có nghĩa là nó không chỉ copy files, nó copies được các thuộc tính như quyền hạn, thời gian chỉnh sửa, và các loại ngày khác.
- Để sử dụng -a lệnh sẽ như sau:
```
rsync -av --dry-run  Original/ Duplicate/
```
- Trước tiên, lệnh trên sẽ chỉ hiển thị những file sẽ được copy mà không thực sự copy file. Bạn sẽ thấy danh sách các file đó hiện lên màn hình.
- Nếu các files hiển thị đúng ý với bạn, sau đó hãy chạy lại lệnh đó nhưng bỏ yếu tố `—dry-run` ra.
- `—dry-run` tham số này dùng để chạy thử trước để bạn thấy thay đổi, nhưng hành động copy sẽ không thực sự diễn ra.
- `-a` kích hoạt chế độ archive
- `-v` thêm sau `-a` để kết hợp thành tham số `-av` trong lệnh, để mình xem được quá trình copy đang diễn ra như thế nào.
- Nếu bạn muốn đồng bộ 2 thư mục, nhưng xóa những files bị trùng không có trong thư mục gốc, vậy thì thêm `–delete`, lện rsync Linux sẽ như sau:
```
rsync -av --delete  original/ duplicate/
```
Lệnh sau cùng chúng tôi muốn nói đến là `-z`. Lệnh này dùng để `nén (compress)` file để chuyển trên mạng. Hãy xem chúng tôi dùng lệnh này để chuyển file từ server này sang server khác:
```
rsync -za ~/Desktop/Original ip:~/tmp/
```
- Như đã đề cập từ trước, `-z` nén file, `-a` tạo archive để đảm bảo các permissions bên trong files được copy.
- `~/Desktop/Original` là thư mục nguồn. Nó nằm trong máy bạn, thư mục này là trong máy nơi bạn đặng nhập vào và `ip:~/tmp/` là ip của server từ xa và thư mục đích của servre đó
### C. Kết thúc
Trên đây là phần tìm hiểu của mình về Rsync vậy trong php làm thế nào để có thể thực hiện được nó (Yêu cầu nên cấp quyên cao nhất nhé)
Đây là 2 câu lệnh mình sử dụng trong dự án của mình như sau
#### 1. Thực hiện đồng bộ dữ liệu sau khi upload ảnh
```
$command = sprintf('rsync %s --rsync-path="mkdir -p %s && rsync" %s:%s', $saveImagePath, $folderImage, $hostname, $saveImagePath);
exec($command, [], $returnVal)
```
- Việc upload ảnh mình sẽ cho vào từng thư mục ứng với từng model (product, post...etc) vậy nên phải chia theo thư mục vậy với câu lệnh `--rsync-path="mkdir -p %s && rsync"` nó sẽ tạo ra thư mục cần thiết (nếu có sẽ không tạo nữa dựa vào tham số `-p`) còn các giá trị còn lại thì dễ rồi.
- $returnVal ở đây là giá trị command trả về (true/false).
#### 2. Xóa dư liệu trong thư mục đích
```
$command = sprintf('rsync --delete %s:%s', $hostname, $fileName);
$cmd = exec($command, [], $return_val);
```
Bài viết của mình xin kết thúc ở đây, hi vọng bài viết này sẽ giúp ích được trong dự án nếu bạn găp phải nó.
Cảm ơn các bạn đã xem