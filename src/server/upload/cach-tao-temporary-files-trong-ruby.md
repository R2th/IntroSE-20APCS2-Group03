> Bài viết này được dịch từ nguồn [How to Create Temporary Files in Ruby - Jesus Castello](https://www.rubyguides.com/2019/05/ruby-tempfile/)


Tạo một temporary file cho bạn một file rỗng với tên bất kỳ trong thư mục temporary của hệ điều hành (Operating System).

File này sẽ **tự động** bị xóa đi.

Làm thế nào để thực hiện như trên trong Ruby?

Đây nè:

```
require "tempfile"
Tempfile.create { |f| f << "abc\n" }
```

Trong đó `f` là file và `<<` ghi nội dùng vào file.

Thư viện này đã sẵn có trong Ruby vậy không cần cài đặt bất cứ gems nào cả.

Như vậy là đơn giản chứ, nhưng tiếp đến là có mấy câu hỏi sau:

* Khi nào file thật sự bị xóa đi?
* Tại sao không thể đọc lại temp file?
* Các tempfiles đảm bảo là duy nhât không?

Dưới đây sẽ trả lời câu hỏi trên, một số nội dung khác để tiếp tục phát triển và hiểu sâu hơn.

### New và Create có những sự khác biệt gì?

Bạn sẽ thấy rằng `Tempfile` có 2 phương thức để tạo file.

Thứ nhất là `new` và một cái nữa là `create`.

#### Sự khác biệt giữa chúng?

Theo tài liệu, `new` tạo một đối tượng `Tempfile` (như bạn mong ước) nhưng `create` cho bạn một đối tượng `File`.

Nó thật sự không vấn đề gì bởi vì `Tempfile` delegate cho `File`.

Điểm khác biệt đó là `create` nhận một block mà `new` không nhận.

Hãy thử:

```
Tempfile.new {}
```

Sẽ nhận được cảnh báo sau 

```
# warning: Tempfile.new doesn't call the given block.
```

Bạn có thể dùng block với `create` để chắc chắn rằng temporary file bị xóa đi sau khi block kết thúc. 

Với câu trên dẫn đến câu hỏi tiếp theo ....

#### Khi nào một tempfile bị xóa?

Bạn có thể điều khiển khi nào file bị xóa bằng cách xóa bằng tay như một file thường (phương thức `delete`) hoặc sử dụng `create` với block.

Việc xóa tự động thực thi khi:

* Chương trình kết thúc.
* File nhận garbage collected từ bộ nhớ.

Tiếp đến có thể xảy ra nếu không có bất kỳ tham chiếu nào tới file.

Như một biến,

```
t = Tempfile.new
```

Khi `t` nằm [ngoài scope](https://www.rubyguides.com/2019/03/ruby-scope-binding/) thì temporary file có thể bị xóa.

Nếu bạn dùng Linux một công cụ để theo dõi các file tạo và xóa là [inotify-tools](https://packages.debian.org/jessie/misc/inotify-tools).

Thư dòng lệch sau:

```
inotifywait /tmp -m --format "%w %e %f %T" --timefmt "%H:%m:%S"
```

Tiếp đến chạy Ruby code tạo file.

Ví dụ:

```
ruby -rtempfile -e "def c; t = Tempfile.new('testing'); end; c; sleep 10"
```

Chúng ta sẽ thấy như sau:

```
/tmp/ CREATE testing20190506-11391-1wqcng0 14:51:48
/tmp/ OPEN testing20190506-11391-1wqcng0 14:51:48
/tmp/ CLOSE_WRITE,CLOSE testing20190506-11391-1wqcng0 14:51:58
/tmp/ DELETE testing20190506-11391-1wqcng0 14:51:58
```

### Tại sao không thể đọc lại từ Temp file?

Nếu bạn muốn đọc lại từ một temporary file sẽ nhận được string rỗng.

Ví dụ:

```
Tempfile.create { |f| f << "abc\n"; f.read }
# ""
```

Tạo sao nó như thế? (??)

Hóa ra `Files` là các đối tượng `IO`.

Các đối tượng IO có một **position pointer** khi [ghi vào một file](https://www.rubyguides.com/2015/05/working-with-files-ruby/) vị trí này tăng lên.

Nếu muốn đọc phải tua lại pointer này như sau  

```
Tempfile.create { |f| f << "abc\n"; f.rewind; f.read }
# "abc\n"
```

Có khi cần in ra nội dùng thì làm như sau

```
temp = Tempfile.new

temp << "1"
temp << "2"

temp.flush
```

### Các tempfile thật sự duy nhất?
Tempfile tạo một filename duy nhất và set permission mode 600 có nghĩa là chỉ người tạo file mới có thể đọc nó.

Có khi nào tên bị trùng không?

> Phương thức chọn tên của Tempfile  là `thread-safe` và `inter-process-safe` nó đảm bảo rằng không có threads hoặc process nào chọn cùng tên file.

Với mô tả của `new` cũng viết là nó có thể nêu error nếu nó không thể tìm được tên file duy nhất.

Đây cũng là một điều tốt nếu bạn đặt tiên tố chỏ các file.

```
Tempfile.new("banana-").path
# "/tmp/banana-20190426-25403-1cm7sjt"
```

Như vậy nó sẽ giúp khả năng bị trùng tên.

### Mở một Tempfile với Binary mode

Nếu làm việc với các ảnh, âm nhạc hoặc các thứ khác ngoài văn bản có thể set file mode sang binary.

Binary file mode sẽ ngừng việc chuyển đôi cuối dòng(line-ending conversion).

Kết quả cho thấy dữ liệu vẫn giữa nguyên và tránh được tách thành phần nội dung của binary file.

#### Binary mode không bật mặc định

```
temp = Tempfile.new
temp.binmode?
# false
```

Để bật phải làm như sau:

```
temp = Tempfile.new.binmode
temp.binmode?
# true
```

Với phương thức `create` cũng được 

```
Tempfile.create do |f|
  f.binmode
  f << "bacon\n"
end
```

#### Kết luận
Cảm ơn bạn đã đọc bài viết, hy vọng bài giúp bạn hiểu thêm về class `Tempfile`.