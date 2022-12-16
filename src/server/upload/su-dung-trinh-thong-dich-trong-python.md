Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về việc Sử dụng trình thông dịch  trong Python

- [Khởi động trình thông dịch](#khoidong)
    - [Truyền đối số](#truyendoiso)
    - [Chế độ tương tác](#tuongtac)
- [Trình thông dịch và môi trường](#moitruong)
    - [Mã hóa Source Code](#mahoa)


## Khởi động trình thông dịch

Trình thông dịch Python thường được cài đặt tại địa chỉ `/usr/local/bin/python3.6` trên các hệ máy Unix/Linux; bạn cần đặt đường dẫn `/usr/local/bin` vào biến đường dẫn của Unix shell (biến $PATH) để có thể khởi động bằng lệnh:

```text
python3.6
```

Vì việc lựa chọn thử mục chứa trình thông dịch có thể thực hiện trong quá trình cài đặt, các đường dẫn khác có thể được sử dụng; hãy hỏi quản trị viên hoặc người hướng dẫn để biết chi tiết \(v.d., một đường dẫn thay thế hay được dùng là `/usr/local/python` \)

Trên các máy Windows, Python thường được cài đặt tại `C:\Python36`, mặc dù vậy bạn cũng có thể thay đổi đường dẫn này trong quá trình cài đặt. Để thêm thư mục này vào đường dẫn, bạn có thể nhập lệnh sau vào hộp lệnh DOS:

```text
set path=%path%;C:\python36
```

Gõ ký tự kết thúc file \(Control-D trên Unix, Control-Z trên Windows\) để thoát khỏi trình thông dịch. Nếu không được, bạn có thể thoát bằng câu lệnh: `quit()`.

Các tính năng line-editing của trình thông dịch bao gồm chỉnh sửa tương tác \(interactive editing\), lịch sử thay thế và hoàn thành mã nguồn trên các hệ thống hỗ trợ readline. Có lẽ cách nhanh nhất để kiểm tra xem việc chỉnh sửa có được hỗ trợ hay không là nhấn tổ hợp Control-P vào dấu nhắc đầu tiên mà bạn nhận được. Nếu nó kêu beeps, bạn có thể chỉnh sửa dòng lệnh; xem Appendix [Interactive Input Editing and History Substitution](https://docs.python.org/3/tutorial/interactive.html#tut-interacting) để đọc giới thiệu về các phím. Nếu không có gì xuất hiện, hoặc nếu `^P` được in ra, dòng lệnh chỉnh sửa không có hiệu lực; bạn chỉ có khả năng sử dụng phím backspace để xóa các ký tự ở dòng hiện tại.

Trình thông dịch hoạt động có phần giống với Unix shell: khi được gọi với đầu vào vào chuẩn kết nối với một thiết bị đầu cuối (tty device), trình thông dịch sẽ tương tác để đọc và thực thi các lệnh ; khi được gọi với một đối số là tên tệp hay một tệp đầu vào chuẩn, trình thông dịch đọc và thực thi một _kịch bản_ từ các file ấy.

Cách thứ hai để bắt đầu với trình thông dịch là sử dụng lệnh `python -c command [arg] ...`, để thực thi các lệnh trong _command_, tương tự với tuỳ chọn [`-c`](https://docs.python.org/3/using/cmdline.html#cmdoption-c) của shell. Do các câu lệnh Python thường chứa nhiều khoảng trống hoặc các ký tự đặc biệt, bạn nên đóng trích dẫn toàn bộ các _câu lệnh_ với dấu nháy đơn.

Một số mô-đun Python cũng hữu ích như các mã kịch bản. Các mô-đun này có thể được gọi bằng lệnh `python -m module [arg] ...`. Lệnh này thực thi mã nguồn của _mô-đun_ tương tự như việc viết đầy đủ tên mô-đun trên dòng lệnh.

Khi một tệp mã kịch bản được sử dụng, đôi khi việc chạy và truy cập chế độ tương tác sẽ rất hữu ích. Để vào chế độ tương tác, bạn dùng tuỳ chọn [`-i`](https://docs.python.org/3/using/cmdline.html#cmdoption-i) đặt trước script.

Tất cả các truỳ chọn cho dòng lệnh trình thông dịch được mô tả tại [Command line and environment](https://docs.python.org/3/using/cmdline.html#using-on-general).

### Truyền đối số

Khi được trình thông dịch biết đến, tên script và các đối số bổ sung được chuyển thành một danh sách các chuỗi và được gán cho biến `argv` trong module `sys`. Bạn có thể truy cập danh sách này bằng cách import modules sys này `import sys`. Độ dài tối thiểu của một list; khi không có script và các đối số được truyền, `sys.argv[0]`là một chuỗi trống. Khi tên của script là `'-'` \(\), `sys.argv[0]` sẽ trở thành `'-'`. Khi sử dụng _command_ [`-c`](https://docs.python.org/3/using/cmdline.html#cmdoption-c), `sys.argv[0]` được đặt là `'-c'`. Khi _module_ [`-m`](https://docs.python.org/3/using/cmdline.html#cmdoption-m) được sử dụng, `sys.argv[0]` được đặt thành tên vị trí đầy đủ của modules. Các thiết đặt được tìm thấy sau _lệnh_ [`-c`](https://docs.python.org/3/using/cmdline.html#cmdoption-c) hoặc _module_ [`-m`](https://docs.python.org/3/using/cmdline.html#cmdoption-m) không được trình thông dịch Python xử lý nhưng còn lại trong`sys.argv` thì được lệnh hoặc modules xử lý.

### Chế độ tương tác

Khi các câu lệnh được đọc từ một tty, trình thông dịch sẽ chuyển sang chế độ tương tác _interactive mode_. Trong chế độ này, các dấu nhắc cho câu lệnh tiếp theo là _primary prompt_, thường là 3 dấu lớn hơn \(`>>>`\); các dòng tiếp theo bắt đầu bằng dấu _secondary prompt_, mặc định là 3 chấm thế này \(`...`\). Trước khi xuất hiện dấu nhắc đầu tiên, trình thông dịch in ra một dòng thông báo chào mừng bắt đầu là số hiệu phiên bản và chứng chỉ bản quyền :

```text
$ python3.6
Python 3.6 (default, Sep 16 2015, 09:25:04)
[GCC 4.8.2] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Các dòng cần được viết liên tục khi bạn muốn thực hiện một cấu trúc gồm nhiều dòng. Ví dụ về cầu lệnh rẽ nhánh [`if`](https://docs.python.org/3/reference/compound_stmts.html#if):

```text
>>> the_world_is_flat = True
>>> if the_world_is_flat:
...     print("Be careful not to fall off!")
...
Be careful not to fall off!
```

Để xem nhiều hơn về chế độ này, xem [Interactive Mode](https://docs.python.org/3/tutorial/appendix.html#tut-interac).

## Trình thông dịch và môi trường

### Mã hóa Source Code

Mặc định, các tệp nguồn Python được định dạng mã hóa UTF-8. Trong mã hóa này, các ký tự của hầu hết ngôn ngữ trên thế giới có thể được sử dụng đồng thời trong chuỗi ký tự, định danh và comments — mặc dù thư viện chuẩn chỉ sử dụng các ký tự ASCII cho các định danh, một quy ước mà bất kỳ portable code nào cũng phải tuân thủ. Để hiển thị đúng tất cả các ký tự, trình soạn thảo của bạn phải nhận ra được các file đó là UTF-8, và nó phải sử dụng phông chữ hỗ trợ tất cả các ký tự trong file.

Để khai báo một mã hóa khác với kiểu mặc định, một comment đặc biệt phải được thêm vào dòng _đầu tiên_ của file. Cú pháp:

```text
# -*- coding: encoding -*-
```

Trong đó _encoding_ là một trong các [`codecs`](https://docs.python.org/3/library/codecs.html#module-codecs) được Python hỗ trợ.

Ví dụ, để khai báo mã hóa Windows-1252, dòng đầu tiên trong mã nguồn sẽ là:

```text
# -*- coding: cp1252 -*-
```

Một ngoại lệ là khi mã nguồn bắt đầu bằng dòng chứa ký tự `#!`\([UNIX “shebang” line](https://docs.python.org/3/tutorial/appendix.html#tut-scripts)\). Trong trường hợp này, dòng khai báo được đặt ở dòng thứ 2. Ví dụ:

```text
#!/usr/bin/env python3
# -*- coding: cp1252 -*-
```

Chú thích

 Trên Unix, mặc định trình thông dịch Python 3.x không được cài đặt với tệp thực thi có tên là `python`, làm vậy để nó không xung đột với Python 2.x đã được cài đặt. 

Dưới đây mình  đã bước đầu giới thiệu Cách xử dụng Trình Thông Dịch trong Python. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.


### Thao Khảo

https://docs.python.org/3/tutorial/interpreter.html