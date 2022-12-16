![](https://images.viblo.asia/05120b5f-c6a5-42a2-8231-740e55b7c76d.jpeg)

Những dòng lệnh làm cho cuộc sống của chúng ta dễ dàng hơn rất nhiều vì chùng ra có thể tự động một số nhiệm vụ và làm cho mọi thứ chạy trơn tru hơn. Thay vì click xung quanh trong Graphical User Interface (GUI), chúng ta có thể loại bỏ một vài lệnh và gọi đó là công việc được thực hiện. 

Một Unix shell là trình thông dịch dòng lệnh hoặc shell cung cấp giao diện người dùng dòng lệnh cho các hệ điều hành giống Unix. Shell là cả ngôn ngữ lệnh tương tác và ngôn ngữ script và được hệ điều hành sử dụng để kiểm soát thực thi hệ thống bằng cách sử dụng shell script.

Mọi hệ điều hành dựa trên Linux hoặc Mac đều có một dòng lệnh được cài đặt theo mặc định, thường là dưới tên là Terminal. Dòng lệnh (CLI) cho phép chúng ta dễ dàng di chuyển và đổi tên các tệp, sắp xếp dữ liệu và điều hướng xung quanh máy tính.


Nếu không có gì khó chịu, đây là 11 console commands sẽ giúp cuộc sống của bạn dễ dàng hơn.

# 1. grep
```
$ grep "some string" file
```

Lệnh `grep` tìm kiếm các patterns trong mỗi tệp. Nó cũng tìm kiếm các mẫu được phân tách bằng các ký tự dòng mới và `grep` in từng dòng phù hợp với một mẫu.

![](https://images.viblo.asia/30e4a35a-6cca-452e-a823-cfdd3c475ac2.png)

 Tùy chọn `-i` cho phép chúng tôi tìm kiếm một chuỗi ký tự case-insensitively trong tệp đã cho. Nó phù hợp với các từ như REACT,” “REact,” và “react.”
 
```
$ grep -i "REact" file
```

 Chúng ta có thể tìm thấy số dòng khớp với chuỗi / mẫu đã cho bằng `-c (count)` flag.
 
 ![](https://images.viblo.asia/39036359-1c10-4fb1-8e8e-519f1e3ac651.png)

Ở đây, một trò vui và một truyện tranh về lệnh grep tôi tìm thấy trên internet.

![](https://images.viblo.asia/cbe2a3f7-084e-4f92-94b6-c77db9cc45f6.jpeg)

Ngoài ra, các chương trình biến thể `egrep` và `fgrep` giống như `grep -E` và `grep -F`, tương ứng. Những biến thể này không được chấp nhận, nhưng được cung cấp để tương thích ngược.

Bạn có thể làm rất nhiều với `grep`, đọc tài liệu [ở đây](http://man7.org/linux/man-pages/man1/grep.1.html).

# 2. ls
```
$ ls
```

`ls` liệt kê các tập tin và thư mục trong đường dẫn hoạt động hiện tại. Nếu tên đường dẫn là một tệp, `ls` sẽ hiển thị thông tin trên tệp theo các tùy chọn được yêu cầu. Nếu tên đường dẫn là một thư mục, `ls` sẽ hiển thị thông tin về các tệp và thư mục con trong đó.

![](https://images.viblo.asia/85d8b002-bf2c-4e28-89ab-cca5ae295b14.png)

Bạn có thể nhận thấy các tệp đang được hiển thị dưới dạng màu xám, trong khi các thư mục có màu xanh lam. Điều này là để giúp chúng tôi phân biệt giữa các thư mục và tập tin.

# 3. pwd
```
$ pwd
```

![](https://images.viblo.asia/ab89e6c2-b26f-4eaa-9f26-c86f964732fb.png)

Lệnh `pwd` là một tiện ích dòng lệnh để in thư mục làm việc hiện tại. Đầu ra sẽ in đường dẫn hệ thống đầy đủ của thư mục làm việc hiện tại sang đầu ra tiêu chuẩn. Theo mặc định, lệnh `pwd` bỏ qua các symlinks, mặc dù đường dẫn vật lý đầy đủ của một thư mục hiện tại có thể được hiển thị với một tùy chọn.

# 4. cat
```
$ cat somefile.js
```

![](https://images.viblo.asia/5cbc5aff-fb26-4e51-81ab-a857e60cf256.png)

Lệnh cat có ba chức năng liên quan đến một tệp văn bản:
* Hiển thị chúng
* Kết hợp các bản sao
* Tạo cái mới

 Việc sử dụng `cat` phổ biến nhất là đọc nội dung của các tệp và `cat` thường là chương trình thuận tiện nhất cho mục đích này.
Trong ví dụ sau, đầu ra tiêu chuẩn của `cat` được chuyển hướng bằng cách sử dụng toán tử chuyển hướng đầu ra (được biểu thị bằng dấu ngoặc nhọn hướng phải) sang tệp2:

```
$ cat somefile > somefile2
```

![](https://images.viblo.asia/c9a2302a-8de5-44da-b6b5-55c10fa4a16e.png)

# 5. echo
```
$ echo "some text"
```

Lệnh `echo` trong Linux được sử dụng để hiển thị một dòng văn bản / chuỗi mà truyền qua như một đối số. `echo` là một lệnh tích hợp mà hầu hết được sử dụng trong các tập lệnh shell và các batch files để xuất văn bản trạng thái ra màn hình hoặc một tệp.

![](https://images.viblo.asia/a2e16244-348f-4d99-ab97-f29ec2f96f7d.png)

# 6. touch
```
$ touch somefile
```

Lệnh `touch` được sử dụng để tạo một tập tin mà không có bất kỳ nội dung nào. Lệnh `touch` có thể được sử dụng khi người dùng không có dữ liệu để lưu trữ tại thời điểm tạo tệp.

![](https://images.viblo.asia/959870cc-cb80-4ba9-bcff-7ef9350528fd.png)

Lưu ý cách chúng tôi sử dụng `touch` để tạo tệp và `cat` để nhìn vào bên trong tệp. Vì tệp index2.js mới tạo trống, `cat` không trả về gì.

Dưới đây là những khác biệt chính giữa `cat` và `touch`:

* cat: Được sử dụng để tạo tập tin với nội dung
* touch: Tạo một tập tin mà không có bất kỳ nội dung hoặc tập tin trống. Hãy nhớ rằng, tập tin được tạo bằng lệnh `touch` là trống. Lệnh này hữu ích khi người dùng không có dữ liệu để lưu trữ tại thời điểm tạo tệp.

# 7. mkdir
```
$ mkdir some-directory
```

`mkdir` tạo một thư mục trống mới trong đường dẫn hoạt động hiện tại. Thay vì nhấp xung quanh trong trình soạn thảo văn bản hoặc GUI của bạn, hãy sử dụng lệnh này để tạo các thư mục mới.

![](https://images.viblo.asia/954faa2a-98a3-4745-95ba-ce93e7a04c9a.png)

## 7.1 rm
```
$ rm someFile
```

`rm` là viết tắt của remove, nó thực hiện chính xác những gì nó nói. Xóa, hay nói cách khác, xóa một tập tin.

![](https://images.viblo.asia/c2eab9cb-f504-4b88-9fb1-901c4545d277.png)

Theo mặc định, lệnh `rm` không xóa thư mục. Bạn cần phải thêm `-rf` để xóa thư mục.

![](https://images.viblo.asia/fdb13187-a438-47b4-85f9-a6d0cd24b1e1.png)

Lưu ý: Điều này loại bỏ thư mục vô điều kiện, cho dù thư mục có nội dung bên trong hay không.

## 7.2 rmdir
```
$ rmdir some-directory
```

Lệnh `rmdir` sẽ xóa thư mục nếu không có nội dung bên trong thư mục.

![](https://images.viblo.asia/f9b9f7b0-d3de-45b3-9ed0-f2f2210099dc.png)

# 8. tail
```
$ tail somefile
```

Lệnh `tail` đọc một tập tin và xuất ra phần cuối cùng của nó.

![](https://images.viblo.asia/10ff0e64-c8ec-4712-b9b4-9faf958779b3.png)

Lệnh `tail` rất hữu ích khi đi qua các báo cáo sự cố hoặc history logs trước đó. Dưới đây, một ví dụ về tính hữu dụng của nó khi làm việc với logs.

# 9. wget
```
$ wget someurl
```

GNU Wget là gói phần mềm miễn phí để truy xuất các tệp bằng HTTP, HTTPS, FTP và FTPS - các giao thức internet được sử dụng rộng rãi nhất. Nó có một công cụ dòng lệnh không tương tác, vì vậy nó có thể dễ dàng được gọi từ các scripts, CRON jobs, terminals mà không có hỗ trợ X-Windows, ... .

![](https://images.viblo.asia/4f252dab-39b2-4537-9fde-ecfd4e1462fd.png)

# 10. find
```
$ find path -name filename
```

Lệnh `find` cho phép bạn nhanh chóng tra cứu một tập tin hoặc thư mục. Nó có ích khi bạn làm việc trong một dự án lớn với hàng trăm file và nhiều thư mục.

![](https://images.viblo.asia/b6e5b0af-0387-4593-afb8-2d32ff026324.png)

### Tìm kiếm các tập tin của một loại cụ thể

Lệnh `find` cũng cho phép bạn tìm kiếm cùng loại tệp trong một thư mục (và thư mục con của nó). Ví dụ: lệnh sau sẽ tìm kiếm tất cả các tệp `.js` trong thư mục làm việc hiện tại của bạn.
```
$ find . -name "*.js"
```
![](https://images.viblo.asia/3183db20-9729-42e4-99a3-8e625dbfdff9.png)

# 11. mv
```
$ mv somefile /to/some/other/path
```

Lệnh `mv` di chuyển các tập tin hoặc thư mục từ nơi này sang nơi khác. Lệnh `mv` hỗ trợ di chuyển các tệp đơn, nhiều tệp và thư mục.

![](https://images.viblo.asia/0026ff03-f052-411b-85ec-a13a5efbf1cc.png)

# Tham khảo
https://medium.com/better-programming/here-are-11-console-commands-every-developer-should-know-54e348ef22fa