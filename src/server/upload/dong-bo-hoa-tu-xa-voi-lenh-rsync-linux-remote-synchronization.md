## 1. Mở đầu
Với người dùng Linux, đa số mọi người đều biết sử dụng SCP để copy và đồng bộ files từ xa. Bây giờ chúng ta sẽ tiến hành tìm hiểu thêm một lệnh copy file mới thay, đó là **RSYNC**, cũng có tác dụng tương tự, nhưng ở **RSYNC** nó còn thêm các tính năng cao hơn:

- Copy cả user, group, permission(quyền) giúp chúng ta bảo toàn dữ liệu.
- RSYNC kết hợp SSH bảo mật dữ liệu.
- RSYNC nén dữ liệu trên server trước khi gửi đi.
- Tự động xóa dữ liệu nếu dữ liệu đó không tồn tại trên source giúp đồng bộ dữ liệu giữa hai máy chủ.
- RSYNC nhanh hơn SCP.

Lệnh rsync trong linux là lệnh có chức năng mạnh mẽ, hỗ trợ và giúp chúng ta quản lý tốt hơn trong việc đồng bộ file hoặc thư mục giữa máy tính cá nhân, máy chủ từ xa, hoặc bất kỳ máy tính nào khác. Với bài viết này, chúng ta sẽ nhanh chóng tìm hiểu và làm chủ được lệnh Rsync.

Đồng bộ folder hoặc copy files thủ công thường rất tốn thời gian. Tính năng rsync lại có thể làm được hầu hết mọi công việc đó, giúp chúng ta tiết kiệm được nhiều thời gian. Thậm chí là khi bạn ngắt kết nối trong qua trình chuyển đổi, công cụ này sẽ tạm ngưng, và được mở lại tại điểm tạm ngưng đó khi kết nối lại.

## 2. Syntax cơ bản
Syntax cơ bản của rsync sẽ như sau:

`rsync [optional modifiers] [SRC] [DEST]`

Có nhiều cách khác nhau để dùng lệnh Linux Rsync. Ví dụ, **[optional modifiers]** để chỉ hành động nào sẽ được thực thi, **[SRC]** là thư muc gốc, và **[DEST]** là thư mục gốc của máy.

**Cú pháp cơ bản cho remote shell**
Khi sử dụng remote shell, như SSH hay RSH, cú pháp rsync sẽ khác nhau chút ít.

Để truy cập remote shell **(PULL)**, sử dụng lệnh rsync sau:

`rsync [optional modifiers] [USER@]HOST:SRC [DEST]`

Để truy cập remote shell **(PUSH)** sử dụng lệnh rsync sau:

`rsync [optional modifiers] SRC [USER@]HOST:[DEST]`

## 3. Kiểm tra phiên bản Rsync và cách cài đặt

Trước khi sử dụng Rsync, bạn cần đăng nhập vào VPS server trước. Nếu bạn đang dùng MacOS, hoặc máy Linux, chỉ cần mở terminal có sẵn lên để sử dụng.

Rsync đã được cài sẵn trong các phiên bản của Linux. Để kiểm tra xem rsync được cài trên máy chưa, thực thi lệnh sau:

`rsync --version`

Trên phiên bản Ubuntu của chúng tôi, lệnh trên cho kết quả như sau:

`rsync  version 3.1.1  protocol version 31`

Có nghĩa là rsync bản 3.1.3 đã có sẵn trên máy tính. Rất dễ, phải không?

Nếu máy của bạn không có rsync, bạn có thể cài đặt nó trong 1 phút! Những hệ điều hành nền Debian như Ubuntu có thể dùng lệnh sau để cài Rsync:

`apt-get install rsync`

Trên distribution nền rpm như Fedora hay CentOS, bạn dùng lệnh sau để cài:

`yum install rsync`

Trên MacOS, bạn cần dùng lệnh:

`brew install rsync`

Xong rồi! Rsync Linux đã sẵn sàng để đồng bộ dữ liệu, thực hiện chuyển đổi hay xóa file!

## 4. Cách sử dụng RSYNC
Trong bài hướng dẫn này, chúng mình tạo 2 thư mục trên máy Linux, có tên **Original** và **Duplicate**. Thư mục gốc (original) có 3 ảnh và thư mục duplicate thì trống.Gờ hãy xem cách rsync tăng năng xuất làm việc của bạn thế nào.

Để tạo 2 thư mục kiểm thử bạn dùng lệnh sau:

```
cd ~
mkdir original
mkdir duplicate
touch original/file{1..3}
```

Kiểm thử lại bằng command ls để liệt kê toàn bộ các file trong thư mục:

`ls original`

Kết quả sẽ trông như sau:

```
file1
file2
file3
```

Nếu dùng lệnh ls trên thư mục duplicate, kết quả sẽ trống.

Sau khi bạn đã có đủ thư mục. Hãy thử dùng vài lệnh để biết cách dùng Rsync Linux nhé.

Lệnh sau, khi gõ vào trong commanldn, sẽ copy và đồng bộ toàn files đặt trong thư mục **gốc** tới thư mục **đích**.

`rsync option original/* duplicate/`
(***** chỉ cho lệnh rsync biết để đồng bộ toàn bộ file trong thư mục gốc.)

Nếu chúng ta đặt một ảnh hoặc file mới vào trong thư mục gốc và chạy lại cùng lệnh trên, nó sẽ chỉ copy file mới tới thư mục đích. Lưu ý là lệnh này chỉ copy file trong thư mục gốc (Original theo ví dụ của chúng tôi), nó không copy các thư mục con trong đó.

Tính năng này hữu dụng để copy files giữa hệ thống mạng mà băng thông không cao.


### option: các tham số  tùy chọn
Đây là danh sách các option phổ biến nhất được dùng với rsync:

- `-a, --archive`: kích hoạt chế độ archive
- `-v, --verbose`: ệnh này sẽ giúp hiển thị tiến trình của thao tác:
- `-h, --human-readable format`: kết hợp với -v để định dạng dữ liệu show ra dễ nhìn hơn
- `-z, --compress`: nén dữ liệu trước khi truyền đi giúp tăng tốc quá trình đồng bộ file
- `-r`: Lệnh này dùng để copy dữ liệu toàn bộ (bao gồm thư mục con)
- `--delete`: xóa dữ liệu ở destination nếu source không tồn tại dữ liệu đó
- `--exclude:` loại trừ ra dữ liệu không muốn truyền đi, nếu cần loại ra nhiều file hoặc folder ở nhiều đường dẫn khác nhau thì mỗi cái bạn phải thêm –-exclude tương ứng( cũng có thể sử dụng –exclude-from chỉ đến một file liệt kê các file, thư mục không truyền đi)

Còn có rất nhiều option khác, các bạn có thể tham khảo thêm [ở đây](https://download.samba.org/pub/rsync/rsync.html)

### Làm thế nào sử dụng Rsync Commands với thư mục con

Nếu bạn muốn copy cả thư mục con, vậy hãy dùng lệnh sau:

`rsync -r original/ duplicate/`

Tham số **-r** nói cho rsync biết để copy mọi thứ bao gồm thư muc con và files từ thư mục gốc. Dấu **/** đặt sau thư mục **original** dùng để nói rsync copy nội dung từ thư mục gốc đến thư mục duplicate.

### Làm thế nào để đồng bộ files

Nếu bạn muốn đồng bộ files – tức là copy 2 chiều, những file nằm trong thư mục duplicate mà không có trong thư mục original sẽ được copy ngược lại, thì dùng lệnh sau::

`rsync -r original duplicate/`

Với lệnh này, bạn có thể chắc chắn rằng cả thư mục gốc và thư mục đích đều sẽ chứa các files giống nhau.

### Làm thế nào kết hợp các lệnh Rsync

Một tham số hữu dụng khác là -a (archive) và có thể kết hợp với các lệnh khác. Có nghĩa là nó không chỉ copy files, nó copies được các thuộc tính như quyền hạn, thời gian chỉnh sửa, và các loại ngày khác.

Để sử dụng -a kết hợp với -v lệnh sẽ như sau:

`rsync -av --dry-run  Original/ Duplicate/`

Chúng ta sẽ cùng nhau tìm hiểu từng tham số của option mà mình đã có nhắc qua ở đầu bài nhé.

Trước tiên, lệnh trên sẽ chỉ hiển thị những file sẽ được copy mà không thực sự copy file. Bạn sẽ thấy danh sách các file đó hiện lên màn hình.

Nếu các files hiển thị đúng ý với bạn, sau đó hãy chạy lại lệnh đó nhưng bỏ tham số **—dry-run** ra.

**—dry-run** hoặc **-n** tham số này dùng để chạy thử trước để bạn thấy thay đổi, nhưng hành động copy sẽ không thực sự diễn ra.

**-a** kích hoạt chế độ archive

**-v** thêm sau **-a** để kết hợp thành tham số **-av** trong lệnh, để mình xem được quá trình copy đang diễn ra như thế nào.

**Các lựa chọn khác của lệnh Rysnc Linux**

Khi thêm option **-a** và **-v**, nó trở thành lệnh **-av**

**rsync -av original/ duplicate/**

Nếu bạn muốn đồng bộ 2 thư mục, nhưng xóa những files bị trùng không có trong thư mục gốc, vậy thì thêm –delete, lệnnh rsync Linux sẽ như sau:

**rsync -av --delete  original/ duplicate/**

Bạn cũng có thể loại trừ file hoặc thư mục con nhất định khi đồng bộ. Thực hiện bằng cách dùng option **-exclude=**. Nếu muốn xác định nhiều hơn 1 file, ngăn cách chúng bằng dấu phẩy.

**rsync -av --exclude=file1,file2  original/ duplicate/**

Bạn cũng có thể kèm thêm file hay thư mục con khi đồng bộ. Bạn chỉ cần dùng option **-include=**. Ví dụ bên dưới là kèm file bắt đầu với chữ cái L, và loại bỏ những files còn lại:

`rsync -av --include=L* --exclude=*  original/ duplicate/`

Với Rsync, bạn có thể xác định kích thước size dùng để đồng bộ. Để làm vậy, dùng lệnh –max-size:

`rsync -av --max-size=10k original/ duplicate/`

Bằng option **-z (–compress)**, nó sẽ tổng hợp cái files lại và truyền qua mạng. Thêm nữa là, hãy xem cách làm thế nào để truyền file từ server này sang server khác. Lệnh rsync như sau:

`rsync -az ~/Desktop/Original edward@192.168.22.90:~/tmp/`

Như đề ở trước, **-z** dùng để nén files, **-a** dùng để copy toàn bộ các permisions của file.

**~/Desktop/Original** là thư mục nguồn. Nó là local directory – thư mục trên máy của bạn đang dùng, và `edward@192.168.22.90:~/tmp/` chỉ định thư mục đích. `edward@192.168.22.90` là địa chỉ server từ xa, trong khi đó:**~/tmp/** chỉ định một thư mục nhất định trên máy.

### Làm thế nào để thêm thanh tiến trình

Ngoài những lệnh trên, bạn còn có thể thêm option **-P** là kết hợp giữa **–progress** và **–partial**. Nó sẽ tạo ra thanh progress bar cho biết files đang được chuyển đi và cũng cho phép bạn ngắt việc truyền files.

`rsync -azP [SRC] [DEST]`

Kết quả sẽ tương tự như sau:

```
sending incremental file list
./
file1
         0 100%    0.00kB/s   0:00:00   (xfer#1, to-check=1/3)
file2
         0 100%    0.00kB/s   0:00:00   (xfer#2, to-check=2/3)
file3
         0 100%    0.00kB/s   0:00:00   (xfer#3, to-check=3/3)
```

Sau đó, nếu chúng ta chạy lệnh này, bạn sẽ thấy output ngắn hơn. Đây là vì không có thay đổi nào mới được tạo. Kết quả sẽ như sau:

```
sending incremental file list
send 26 bytes received 5 bytes 1200.00 bytes/sec
total size is 0 speedup is 0.00
```

Nó sẽ cho ra kết quả tương tự như lệnh trên nhưng chỉ những file được chỉ định trong dấu ngoặc mới được chuyển đi.

**Làm thế nào để tạo Rsync Backup**
Một lệnh quan trọng khác là tạo Rsync backup. Bạn kết hợp giữa option **–backup** với **–dir** để xác định nơi backup được chứa là ở đâu.

`rsync -a --delete --backup --backup-dir=/path/to/backup /path/to/SRC [DEST]`

## 5. Kết bài
Ở đây chúng ta chỉ mới đề cập đến các cách dùng cơ bản nhất của rsync linux! Rsync là một ứng dụng cực kỳ mạnh mẽ mà bất kỳ server admin hay developer Linux nào cũng cần biết. Nhưng bạn đã biết được cách dùng rsync linux cũng như cách cài đặt nó. Nếu bạn muốn tìm hiểu thêm các chức năng cao cấp khác – [xem bộ tài liệu chính thức của rsync tại đây](https://rsync.samba.org/documentation.html). Cảm ơn các bạn đã đọc bài.