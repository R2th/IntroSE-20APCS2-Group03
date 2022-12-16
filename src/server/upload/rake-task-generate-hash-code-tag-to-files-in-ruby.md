### Intro

Thời gian qua trong dự án đang gặp một tính huống cần thêm hash code tag vào tất cả các file của có đuổi `.rb` như các bạn biết một dự án sẽ có file code vừa phải cũng tầm nghìn file rồi, trong đó cần loại đi một số file kiểu `db/schema.rb` chẳng hạn vì file này sẽ không giữ lại hash tag đó mỗi khi chạy `rails db:migrate` xong.
Trong bài viết này đi qua một số phần để làm việc với File, Dir, cách viết rake task, xử lý xong xong trong Ruby.

### IO trong Ruby
Input/Output thường gọi tắt là I/O, là một thuật ngữ bao quát một cách mà một máy tính tương tác với thế giới. Màn hình, bàn phím, các file và mạng tất cả hình thành từ I/O. Dữ liệu từ các device được gửi tới và từ các chương trình kiểu stream của các ký tự/bytes.
Ruby có sẵn một số subclass của IO để dùng cho một số mục đích cụ theo kiểu IO:
#### File
`File` là một subclass rất phổ biến của `IO`. File cho phép read/write các file mà không cần làm việc phức tạp với các [file descriptors](https://en.wikipedia.org/wiki/File_descriptor). Với class `File` có thêm một số phương thức tiện lợi như `File#size`, `File#chmod`, `File#path`,....
#### The Sockets
Đa số socket class kế thừa từ `IO`.
Các bạn có thể tham khảo: [TCPSocket](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/socket/rdoc/TCPSocket.html), [UDPSocket](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/socket/rdoc/UDPSocket.html), [UNIXSocket](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/socket/rdoc/UNIXSocket.html), [Socket](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/socket/rdoc/Socket.html)
#### StringIO
[StringIO](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/stringio/rdoc/StringIO.html) cho phép chuỗi string có hành vi như `IO`. Nó có ích khi muốn truyền string vào các hệ thống sử dụng streams.
#### Temfile
[Temfile](http://www.ruby-doc.org/stdlib-2.1.2/libdoc/tempfile/rdoc/Tempfile.html) là một class không kế thừa từ `IO` thay vì đó nó thực thực thi lớp giao diện của class `File` và xử lý các temporary file. Nó có thể truyền cho bất kỳ đối tượng mà sử dụng kiểu đối tượng `IO`.
Có thể tham khảo thêm ở [bài post](https://viblo.asia/p/cach-tao-temporary-files-trong-ruby-V3m5WGXv5O7).

### Dir trong Ruby
Các đối tượng của class `Dir` là các directory streams biểu diễn các thư mục trong file system. Nó cung cấp một số cách để liệt kể thư mục và nội dung của chúng.
Trong ruby có thể thao tác `Dir.mkdir("testing")`, `Dir.pwd` tương tự trong command line `mkdir testing`, `pwd`. 
Truờng hợp có lỗi sẽ trả về một số error sau: `Errno::EEXIST` thư mục đã tồn tại, `Errno::EACCES` quyền bị từ chối, `Errno::ENOENT` khi cố tình tạo một thư mục dưới cấp một thư mục chưa tồn tại.
Một điều thú vị là [Dir.glob](https://ruby-doc.org/core-2.6.5/Dir.html#method-c-glob) cho phép chọn những file cần sử dụng/tìm kiếm. eg.  `Dir.glob("**/*.rb")` sẽ trả về một mảng với tất cả các file có đuổi `.rb`.

### Rake trong Ruby
Chi tiết bạn hãy tham khảo [Tìm hiểu và cách sử dụng Rake trong Ruby](https://viblo.asia/p/tim-hieu-va-cach-su-dung-rake-trong-ruby-maGK7DG9Zj2)

### Coding
#### Processor
Ở đây sẽ tạo một class gọi `Processor` để xử lý check file đã có hash code tag hay chưa nếu chưa thì thêm vào ở line đầu tiên.

``` ruby
class Processor
  attr_reader :code, :files, :sample_format, :sample_format_regex
  def initialize code, files
    @code = code
    @sample_format = "# hash_code: #{@code}"
    @sample_format_regex = %r{#{@code}}
    @files = files
    @modified_files = []
  end

  def execute
    files.each do |file|
      # Next if hash code existed
      next if sample_format == IO.binread(file, sample_format.length).strip

      File.open(file, "r+") do |f|
        content = f.read
        content.insert 0, "#{sample_format}\n"
        f.seek 0, IO::SEEK_SET
        f.write content
      end

      modified_files << file
    end
  end
end
```

- Khởi tạo nhận biến `code, files` truyền vào, tạo `sample_format_regex` để check trong code, `modified_files` tổng hợp lại các file thay đổi.
- Trong hàm `execute` loop các file
    - đọc mỗi file bằng `binary mode` và loại khoảng trắng với hàm `String#strip` để so sánh với regex đã khởi tạo trên
    - `next` khi đã tồn tại hash key tag
    - Khi chưa có hash key tag sẽ mở file đó, `content` nội dung file đã đọc là string sau đó chèn bằng hàm `insert` tại vị trí 0
    - `f.seek 0, IO::SEEK_SET` để [seek](https://ruby-doc.org/core-2.7.1/IO.html#method-i-seek) về offset 0 trước khi ghi vào file
    - file được ghi lại với nội dung  `content`
- Thu lại những file thay đổi vào `modified_files`

Như các bạn biết loop trong ruby thực thi rất chậm vậy có cách để tăng tốc không? Cóa đó là sử dụng [Mutex](https://ruby-doc.org/core-2.6/Mutex.html) và [Thread](https://ruby-doc.org/core-2.6/Thread.html)

Sau khi thêm ingredient vào nó sẽ trở thành

``` ruby
  def initialize code, files
    ...
    # Calculate batch size for feed to 100 threads, only use 1 thread if less 
    @batch_size = files.size >= 100 ? (files.size / 100.0).floor : 1
  end
  
  def execute
    # To coordinate access to shared data from multiple concurrent threads.
    m = Mutex.new
    threads = files.in_groups_of(batch_size, false).map do |g_files|
      Thread.new(g_files) do |batch_files|
        batch_files.map do |file|
          ...
          m.synchronize { modified_files << file }
        end
      end
    end
    
    threads.each &:join
```

- Tạo 100 thread và chia mỗi thread theo số lượng file gọi là `batch_size` (có thể thay đổi cách tính tùy ý)
- `Mutex` để chia sẻ truy cấp giữa nhiều thread cho `modified_files`
- [join](https://ruby-doc.org/core-2.6/Thread.html#method-i-join) để đình chỉ main thread cho đến các sub thread `Thread.new` thực thi xong.

#### Rake task

``` ruby
namespace :file_header do
  desc "Add hash code tag to ruby files"
  task start: :environment do
    p "Start"
    files = Dir["{app,config,db,lib,spec}/**/*.rb"] - Dir["db/schema.rb"]
    processor = Processor.new("XYZ", files)
    processor.execute
    p "#{processor.modified_files.size} files changed"
  end
end
```

Chỉ cần nhập `bundle exec rake file_header:start` các file sẽ thêm hash key tag vào.

Đến đây là hết cảm ơn các bạn đã đọc. 

### Tài liệu tham khảo
- [io in ruby](https://thoughtbot.com/blog/io-in-ruby)
- [Ruby File](https://ruby-doc.org/core-2.6.5/File.html)
- [Ruby Dir](https://ruby-doc.org/core-2.6.5/Dir.html)
- [Mutex](https://ruby-doc.org/core-2.6/Mutex.html) 
- [Thread](https://ruby-doc.org/core-2.6/Thread.html)