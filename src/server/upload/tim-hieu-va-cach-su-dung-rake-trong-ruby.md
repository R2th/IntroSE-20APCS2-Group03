> Bài viết được dịch từ gốc [What is Rake in Ruby & How to Use it](https://www.rubyguides.com/2019/02/ruby-rake/)

Rake là một task runner phổ biến Ruby.

### Task là gì?
- Tạo backup cho database
- Chạy các test
- Thu thập và báo cáo số liệu thống kê

Những thứ trên là task nhỏ nhưng nếu không có Rake nó có thể ở rải rác trong project ở trên file khác nhau.

Rake tập trung truy cập tới các task. Rake cũng giúp đơn giản hóa như tìm kiếm file với mẫu cụ thể và đã sửa đổi thời gian gần đây.


##### Chú ý:

Tách biệt Rake với [Rack](https://www.rubyguides.com/2018/09/rack-middleware/), nghe đã thấy tên giống nhau nhưng là thứ hoàn toàn khác nhau.

- **Rake** là một task runner.
- **Rack** giúp các Ruby server và các framework làm việc với nhau.

![ruby-rake-mindmap](https://images.viblo.asia/37e643a3-5981-4d78-94a1-e50fa85e1838.png)

### Cái nào dùng Rake? 
-> `Rails`!

Nếu từng tương tác với `Rails` chắc chắn `rake db:migrate` hoặc `rake routes`  là command quen thuộc nhất. Đó là những thứ mà Rake làm.

Từ Rails bản 5.0 cho phép gọi `rake` command với `rails`.

vd: `rails db:migrate` nhưng Rake vẫn làm việc.

### Cách viết một Rake Task

Dưới đây là một Rake task đơn giản

```
desc "Print reminder about eating more fruit."

task :apple do
    puts "Eat more apples!"
end
```

Chúng ta có thể để đoạn code trên trong một file trên `Rakefile` hoặc trong `lib/tasks/apple.rake` đối với Rails.

Để chạy task trên : `rake apple` => `# "Eat more apples!"`

Bên trong task có thể viết code Ruby nhưng có một số methods hữu ích của Rake có thể sử dụng được
VD:
- ruby (chạy a Ruby file)
- sh (chạy system commands)
- safe_ln (tạo một [symbolic link](https://docs.microsoft.com/en-us/windows/desktop/fileio/symbolic-links) trong file system)

Có nghĩa là có thể dùng `cp` để sao chép file, tạo thư mục với `mkdir_p` và cũng có thể đổi các permission với `chown`.

Đây là một ví dụ
```
task :clean_cache do
  rm_r FileList["tmp/cache/*"]
end
```

Hãy cân nhắc khi sử dụng `rm_r` (remove with recursion) nó sẽ xóa các file mà không xác nhận, nếu như muốn được xác nhận có thể thêm `dependent task` và raise exception nếu không muốn tiếp tục.

### Cách sử dụng Namesapces trong Rake

Vấn đề là ở chỗ các task có thể trùng tên cho nên namespace được sinh ra để giải quyết vấn đề đó.

Vd: Chúng ta tạo một namespace `backup` cho tất cả các task backup.

```
namespace :backup do
  task :create do
    # ...
  end

  task :list do
    # ...
  end

  task :restore do
    # ...
  end
end
```

để chạy một namespace task: `rake backup:create`

### Dependent Task

Rake cho phép định nghĩa một danh sách các task khác mà phải chạy trước task hiện tại. Với cách này chúng ta có thể setup bất cứ task cần.

Vd: Trong ví dụ dưới `load_database` sẽ chạy trước `create_examples`.

```
task create_examples: "load_database" do
  # ...
end
```

**Note:** Danh sách các dependent task có thể là một array của các string hoặc array của các symbol.

### Rake Rules sử dụng như thế nào

Rules xác định biến file extension.

```
task compress: FileList["/tmp/*.txt"].ext(".txt.gz")
rule '.txt.gz' => '.txt' do |t|
  sh "gzip", "-k", "-f", t.source
end
```

Lợi ích của việc sử dụng các rules là khi một file đã nén nó không thể nén lại nữa cho đến khi nguồn file thay đổi.

##### Chú ý một số việc trong code:
1. Class `FileList` là một phần của Rake được sử dụng để định nghĩa một danh sách các file mà chúng ta cần làm việc với nó.
2. Các rule bắt đầu với extension `TARGET` để làm cho rule match chúng ta cần dùng `.ext(".txt.gz")` trên `FileList`.
3. `.txt.gz => .txt` không có nghĩa là đi từ `txt.gz` tới `txt` mà nó là hash syntax.

### Rake options và commands

Dưới đây là một danh sách Rake options hữu ích:

- rake -T (liệt kê các task)
- rake -P (liệt kê các task và các phụ thuộc của nó)
- rake -W (liệt kê các task và nơi nó được định nghĩa)
- rake -V (verbose mode, echo system commands)
- rake -t (debugging mode)
- rake -f (sử dụng một Rakefile cụ thể)

Vd: Trong một ứng dụng Rails:

```
> rake -T test
rake test         # Runs all tests in test folder except system ones
rake test:db      # Run tests quickly, but also reset db
rake test:system  # Run system tests only
```

#### Kết luận
Chúng ta đã học về Rake là một task runner phổ biến cho Ruby.
Sử dụng `rake -T` để tìm những task sẵn có, tạo các task của minh và thêm trong Rakefile hoặc trong thư mục `lib/tasks` và nhớ rằng `Rake` và `Rack` là thứ hoàn toàn khác nhau.

Cảm ơn bạn đã đọc ! :D