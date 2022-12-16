# Nguy hiểm - Không được thử
```
kernel.open("| rm -rf ~") # Rails c 
```
# Giới thiệu
Gần đây mình có cơ hội tìm hiểu về [OpenURI](http://ruby-doc.org/stdlib-2.2.0/libdoc/open-uri/rdoc/OpenURI.html). Khi sử dụng  thư viện này mình đã nghịch dại và làm mất dữ liệu trên máy tính.  Nên hôm nay mình sẽ giới thiệu nó lại với mọi người. Viết bài này xong là mình phải ngồi cài lại zhs, rails, ruby.v.v... :(

# OpenURI 
**OpenURI** là một module cho phép chúng ta làm việc với Net::HTTP, Net::HTTPS and Net::FTP.  
```
result = kernel.open("http://example.com/image.jpg")
result #=> #<Tempfile:/var/folders/k7/6zx6dx6x7ys3rv3srh0nyfj00000gn/T/20160524-10403-xpdakz>
```
## Lợi ích
Sử dụng module này có những lợi ích như sau:

* Download một file đang có trên hệ thống (using Tempfile).
* Hỗ trợ mở một URL http, https hoặc ftp như thể đó là một tệp.
* Hỗ trợ basic authentication dễ dàng.
* Tiết kiệm bộ nhớ.
* Dể dàng redirect.

## Vấn đề tồn tại
Tuy nhiên, Xem xét trường hợp. URL có thể là do người dùng truyền lên. **OpenURI**  sẽ tồn tại  nhiều hạn chế và vấn đề như sau:

### 1. Kernel#open
**Using Kernel#open [makes you vulnerable to remote code execution](https://sakurity.com/blog/2015/02/28/openuri.html)**

Quay trở lại với chủ đề đâu tiên mình nói trong bài viết này: Bạn hãy tưởng tượng ứng dụng của bạn lấy một url từ người dùng. Sau đó trên server sẽ có 1 một cái  gì đó trong như thế này:

```
kernel.open(params[:url])
```

Ruby có một phương thức *Kernel#open*, nó nhận một đường dẫn tệp. nhưng khi được cung cấp một chuỗi bắt đầu với dòng *|* , nó diễn giải chuổi đó như một lệnh shell và trả về một IO được kết nối với một pipe Ruby thực hiện nó

```
Kernel.open("| ls") # returns an IO connected to the `ls` shell command
```

Giả sử người dùng truyền lên 1 url là *| rm -rf ~*.
```
kernel.open("| rm -rf ~") # Thì nó sẽ xoá hết tệp tin trên máy chủ của mình.
```

Để giải quyết vấn đề này chúng ta làm như sau:

```
uri = URI.parse("http://example.com/image.jpg") #=> #<URI::HTTP>
uri.open #=> #<Tempfile:/var/folders/k7/6zx6dx6x7ys3rv3srh0nyfj00000gn/T/20160524-10403-xpdakz>
```

### 2. StringIO
Nếu tệp từ xa nhỏ hơn 10KB, **OpenURI** thực sự trả về StringIO thay vì Tempfile. Để nhất quán dữ liệu trả về và cho những xử lý sau đó. Chúng ta có thể dể dàng sửa như sau:
```
    stringio_or_tempfile = uri.open

    if stringio_or_tempfile.is_a? Tempfile
      stringio_or_tempfile
    else
      tempfile = Tempfile.new
      tempfile.binmode
      tempfile.write stringio_or_tempfile.read
      tempfile
    end
```

### 3. File extension
Phần extension của tệp  không được lưu giữ trong Tempfile đã tải xuống. **OpenURI** luôn tạo Tempfile mà không có phần mở rộng tập tin, ngay cả khi url có. Điều này làm chúng ta không biết được file tải xuống là file gì. Chúng ta có thể dể dàng sửa như sau:

```
 FileUtils.mv uri.path, tempfile.path
```

### 4. Maximum filesize
**OpenURI** Không thể giới hạn kích thước tệp tối đa. Khi bạn chấp nhận URL từ nguồn bên ngoài, bạn nên hạn chế kích thước tệp (vì kẻ tấn công muốn phá máy chủ của bạn). Chúng ta có thể dể dàng sửa nó bằng cách kiểm tra *Content-Length* trong header của request nếu nó quá lớn chúng ta sẽ không cho tải xuống. OpenURI có 1 tuỳ chọn *content_length_proc* hỗ trợ chúng ta làm điều này:

```
uri.open(
  content_length_proc: ->(size) { raise FileTooLarge if size > max_size },
)
```

Tuy nhiên, Kẻ tấn công có thể che dấu *Content-Length* trong header đi. Vì vậy OpenURI có hỗ trợ thêm 1 tuỳ chọn là *progress_proc*. Khi tuỳ chọn này được thiết lập thì trong quá trình tệp xuống khi kích thước vượt mức kích thước của chúng ta thiết lập thì nó sẽ dừng ngay lập tức quá trình tải xuống:

```
uri.open(
  content_length_proc: ->(size) { raise FileTooLarge if size && size > max_size },
  progress_proc:       ->(size) { raise FileTooLarge if size > max_size },
)
```

Có 1 gem hỗ trợ chúng ta làm những công việc trên khá hay là [Down](https://github.com/janko/down). Các bạn có thể tham khảo thêm.



# Tham khảo
https://www.rubydoc.info/stdlib/open-uri/OpenURI

https://twin.github.io/improving-open-uri

https://github.com/janko/down

https://sakurity.com/blog/2015/02/28/openuri.html