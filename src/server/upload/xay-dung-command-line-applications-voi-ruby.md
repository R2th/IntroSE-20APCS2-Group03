> Bài viết gốc [Source](https://www.rubyguides.com/2018/12/ruby-argv/)

Nhiều người có thể quên ruby có thể hỗ trợ ngoài ứng dụng web. Trong bài viết này sẽ mô tả cách xây dựng một ứng dụng command-line để giúp trong công việc hàng ngày dễ dàng hơn.

Dưới dây có lễ là một số ứng dụng command-line quen thuộc:
- `psql`
- `rails`
- `bundler`
- `gem`
- `git`

Trong đó có rất nhiều cách để xây dựng một ứng dụng command-line và trong trong bài viết này sẽ tập trung vào 3 cái trong đó là:
- Mảng ARGV
- Thư viện Optparse
- Gem Thor

### Ruby ARGV Constant

Các ứng dụng command-line thường nhận một số tùy chọn `options` hoặc cờ `flags`.
Vd: ` psql --help`
- Làm thế nào để truy cập các tùy chọn này trong Ruby?
- > Sử dụng mảng `ARGV`

Tạo một file với tên argv.rb và có nội dung như bên dưới:
```
p ARGV
```

Nếu chúng ta chạy code này sử dụng `ruby argv.rb test abc 1 2 3` sẽ nhận được kết quả trả về:
```
["test", "abc", "1", "2", "3"]
```

Đây là một mảng với tất cả các tùy chọn.
Chúng ta có thể kiểm trả tùy chọn truyền vào cụ thể bằng thực hiện phân tích tùy chọn. Dưới đây là một ví dụ `process_argv.rb`:

![process_argv_ruby](https://images.viblo.asia/66b2de50-94bd-400b-b739-c2bd29f36842.png)

Nếu chúng ta chạy command

```
ruby process_argv.rb -v -c
```

Chúng ta sẽ thấy trả về:

```
{:verbose=>true, :syntax_highlighting=>true}
```

Đến đây chỉ có thể giúp cho một số ứng dụng thông thường, nếu muốn giải quyết cho ứng dụng to hơn cần phải tìm giải pháp khác.

### Cách sử dụng thư viện The Option Parser

Ruby đã tích hợp sẵn class `OptionParser` để dùng cho việc phân tích cách tùy chọn command-line. Dưới đây là ví dụ:

![optparse](https://images.viblo.asia/452aa411-13c0-443c-ae74-bd4ec2ef99bf.png)

Chúng ta có thể nhận được một số thuật lợi khi sử dụng `optparse` ngoài giải pháp tùy chọn của minh.

Ví dụ:
- Chúng ta có thể có `-v` và `--verbose` của tất cả flag mà không cần làm gì thêm
- Tất cả tùy chọn có miêu tả sẽ trả thành phần help menu
- Help menu sẽ tự động built vậy chúng ta không cần cập nhật bằng tay mỗi khi thêm hoặc xóa các tùy chọn.

Đây là menu và tất các thứ này đã tích hợp sẵn trong Ruby mà không cần cài thêm gì khác.

![optparse menu](https://images.viblo.asia/c9f0685a-b87c-4223-9e55-439b3dcafe7a.png)

### Cách sử dụng gem Thor

Nếu chúng ta muốn tiếp cận cách xử lý tùy chọn khác, hãy tìm hiểu về gem [Thor](http://whatisthor.com/). Dưới đây là nhưng thứ mà Rails sử dụng.

Trong Rails chúng ta hay dùng các lệnh sau:

- `rails new`
- `rails generate`
- `rails console`

Để tái tạo một phần lệnh `rails` chúng ta có thể làm như sau:

![rails thor](https://images.viblo.asia/31199662-b534-493b-b7fc-780385df361b.png)

Ở đây rất khác biệt so với `OptionParser` và nó không phải là lựa chọn tốt nhất nếu chỉ làm việc với vài biến tùy chọn.

Thế nhưng nếu chúng ta có lệnh giống `rails` dùng với rất nhiều công việc khác nhau vậy Thor mới là sự lựa chọn đúng đắn.

### Thư viện Readline

Trong thường hợp muốn build một ứng dụng có tương tác giao diện như `pry` hoặc `psql` thì hãy tìm đến module `Readline` có thể giúp việc đó.
Dưới đây là ví dụ:

![readline-ruby](https://images.viblo.asia/4733de15-9747-41e7-8e9a-042f56a81939.png)

Ở đây sẽ cho một prompt và lặp echo lại nhưng gì gõ trong terminal sau khi ấn enter.

![readline-ruby-eg](https://images.viblo.asia/f777c163-cb06-4503-aaed-7ac154c0bf8e.png)

Chúng ta có thể kết thúc chương trình bằng ấn `CTRL + C`.

Readline sẽ luôn giữ a một lịch sử mọi thứ đã gõ và nó cho phép tìm kiếm lịch sử bằng `CTRL + r` hoặc `Readline::HISTORY.to_a` bên trong code.

Chúng ta có thể thực hiện giống auto-completion với `Readline` hãy tham khảo thêm [link](http://ruby-doc.org/stdlib-2.5.1/libdoc/readline/rdoc/Readline.html#method-c-completion_proc-3D-label-Completion+for+a+Static+List) này.

#### Tài liệu tham khảo
- [How to Build Command-Line Applications with Ruby - Jesus Castello](https://www.rubyguides.com/2018/12/ruby-argv/)
- [OptionParser](https://ruby-doc.org/stdlib-2.5.3/libdoc/optparse/rdoc/OptionParser.html)
- Gem [Thor](https://github.com/erikhuda/thor)  [doc](http://whatisthor.com/)
- [Readline](http://ruby-doc.org/stdlib-2.5.1/libdoc/readline/rdoc/Readline.html)