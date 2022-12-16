- Nếu bạn đang sử dụng bất cứ hệ điều hành lớn nào, nghĩa là bạn đang gián tiếp tương tác với Shell. Nếu bạn đang chạy Ubuntu, Linux Mint hoặc bất cứ bản phân phối Linux nào khác, bạn đang tương tác với **shell** mỗi khi bạn sử dụng **terminal**.
- Trong bài viết này tôi sẽ giới thiệu tới các bạn tổng quan về **shell linux** và **shell script**. Để hiểu **shell script** chúng ta cần phải làm quen với một số thuật ngữ sau:
    + Kernel
    + Shell
    + Terminal
## Kernel là gì?
- Kernel là một chương trình máy tính là cốt lõi của hệ điều hành máy tính, với toàn quyền kiểm soát mọi thứ trong hệ thống. Nó quản lý các tài nguyên sau của hệ thống Linux:
    + File management
    + Process management
    + I/O management
    + Memory management
    + Device management ect.
- Người ta thường nhầm rằng [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) đã phát triển hệ điều hành Linux, nhưng thực ra ông chỉ chịu trách nhiệm phát triển nhân Linux.
- Toàn bộ hệ thống Linux = Kernel + GNU system utilities and libraries + other management scripts + installation scripts.

## Shell là cái gì?
- Shell là chương trình người dùng đặc biệt, cung cấp giao diện cho người dùng sử dụng các dịch vụ hệ điều hành. **Shell** chấp nhận các lệnh có thể đọc được từ người dùng và chuyển đổi chúng thành thứ mà **kernel** có thể hiểu được.
- Nó là một trình thông dịch ngôn ngữ lệnh thực thi các lệnh được đọc từ các thiết bị đầu cuối vào như  keyboard hoặc từ file. **Shell** được bắt đầu khi người dùng đăng nhập hoặc khởi động **terminal**.

![](https://images.viblo.asia/f1543025-339d-43f9-948a-ebb559f16cb2.png)

- **Shell** được chia làm 2 loại:
    + Command Line Shell
    + Graphical shell

### Command Line Shell
- **Shell** có thể được truy cập bởi người dùng bằng cách sử dụng **command line interface**. Một chương trình đặc biệt có tên **Terminal** trong linux/ macOS hoặc **Command Prompt** trong Windows OS, được cung cấp để nhập vào các lệnh có thể đọc được của người dùng như "cat", "ls" etc. và sau đó nó được thực thi. Kết quả sau đó được hiển thị trên **Terminal**, một Terminal trong hệ thống Ubuntu 16.04 trông sẽ như thế này:

![](https://images.viblo.asia/52e7ebdb-96ce-4aa2-aa5e-ab424451064e.png)

- Làm việc với **command line shell** sẽ có một chút khó khăn cho người mới bắt đầu bởi vì thật khó để nhớ hết các lệnh. Nhưng khi chúng ta đã quen thì nó rất mạnh mẽ, nó cho phép người dùng lưu trữ các lệnh trong một file và thực thi chúng cùng nhau. Với tính năng này, bất kỳ nhiệm vụ lặp đi lặp lại nào có thể xử lý tự động. Các tệp này thường được gọi là **batch file** trong Windows và **Shell Script** trong Linux / macOS.

### Graphical Shells
- **Graphical Shells** cung cấp phương tiện để thao tác với các chương trình dựa trên graphical user interface (GUI), bằng cách cho phép các hoạt động như **open, close, move and resize window**, cũng như chuyển trọng tâm giữa các cửa sổ.
- Window OS hoặc Ubuntu OS có thể được coi là ví dụ điển hình cung cấp GUI cho người dùng để tương tác với chương trình. Người dùng không cần nhập lệnh cho mọi hành động.
- Một số **shell** có sẵn trong các hệ thống Linux:
    + BASH (Bourne Again SHell) - Được sử dụng rộng rãi nhất trong các hệ thống Linux. Nó được sử dụng làm vỏ đăng nhập mặc định trong Linux / macOS. Nó cũng có thể cài đặt trên Window OS.
    + CSH (C Shell) - Cú pháp và cách sử dụng của **C shell** rất giống với ngôn ngữ lập  trình C.
    + KSH (Korn SHell) - Korn Shell cũng là cơ sở cho các thông số kỹ thuật tiêu chuẩn của POSIX Shell,v.v.
- Mỗi shell thực hiện cùng một công việc nhưng hiểu các lệnh khác nhau và cung cấp các hàm dựng sẵn khác nhau.

### Shell Script
- Thường **shell** sẽ tương tác, có nghĩa là nó sẽ chấp nhận lệnh là đầu vào từ người dùng và thực thi chúng. Tuy nhiên, đôi khi chúng ta muốn thực thi một loạt các lệnh, để làm như thế chúng ta sẽ phải gõ tất cả các lệnh vào Terminal. Điều này sẽ làm cho lệnh của chúng ta dài và gây khó hiểu.
- Vì **shell** cũng có thể nhận các lệnh làm đầu vào từ file, chúng ta có thể viết các lệnh trong một file và có thể thực thi chúng trong shell, tránh các công việc lặp đi lặp lại. Các file này được gọi là **Shell Script** hoặc **Shell Programs**. Các **Shell script** tương tự như **batch file** trong MS-DOS. Mỗi shell script được lưu với phần mở rộng tệp **.sh**.
- Một **shell script** có cú pháp giống bất kỳ ngôn ngữ lập trình khác. Nếu bạn có kinh nghiệm với bất kỳ ngôn ngữ lập trình nào thì sẽ rất dễ dàng bắt đầu với nó.
- **Shell script** bao gồm các thành phần sau:
    + Shell Keywords – if, else, break etc.
    + Shell commands – cd, ls, echo, pwd, touch etc.
    + Functions
    + Control flow – if..then..else, case and shell loops etc.

####  Tại sao cần shell script?
- Có nhiều lý do để viết shell script:
    + Tránh các công việc lặp đi lặp lại và tự động hóa.
    + System admins sử dụng shell script để sao lưu thường xuyên
    + Giám sát hệ thống (System monitoring)
    + Thêm chức năng mới vào shell etc.
####  Ưu điểm của shell script
- Lệnh và cú pháp hoàn toàn giống với lệnh được được nhập trực tiếp trong dòng lệnh. Vì vậy lập trình viên không cần phải chuyển sang cú pháp hoàn toàn khác.
- Viết Shell script sẽ nhanh hơn nhiều.
- Quick start
- Interactive debugging etc.
####  Nhược điểm của shell script
- Dễ xảy ra lỗi tốn kém, một lỗi duy nhất có thể thay đổi lệnh có thể gây hại.
- Tốc độ thực hiện chậm.
- Lỗi thiết kế trong cú pháp ngôn ngữ hoặc thực hiện.
- Không phù hợp cho các task lớn và phức tạp.
- Cung cấp cấu trúc dữ liệu ít không giống như các ngôn ngữ khác.
####  Ví dụ đơn giản shell script sử dụng Bash Shell.
- Nếu bạn làm việc trên terminal, bạn đang ở thư mục phía trong. Sau đó, bạn muốn trở về thư mục phía trước, chúng ta phải thực thi lệnh như dưới đây:
![](https://images.viblo.asia/351caa89-5c3e-48c9-8754-0ae1992b403a.png)

- Nó khá mất công, vậy tại sao chúng ta không làm một tiện ích mà chúng ta chỉ cần nhập folder name và chúng ta có thể di chuyển đến folder đó mà không cần thực thi lệnh "**cd ..**". Lưu tập lệnh với tên là “**jump.sh**”:

![](https://images.viblo.asia/78bbbebb-d30b-4338-ba8c-abd0287431fd.png)

- Chúng ta cần cấp quyền để có thể thực thi shell script này:
```
$ chmod -x path/to/our/file/jump.sh
```
- Bây giờ, để làm cho có luôn có sẵn trong mọi phiên làm việc của Terminal, chúng ta phải đặt nó trong tệp **“.bashrc”**.
- “**.bashrc**” là một shell script mà Bash shell chạy bất cứ khi nào nó được khởi động. Mục đích của tệp .bashrc là cung cấp nơi bạn có thể thiết lập các variable, function and aliase... Bây giờ hãy mở terminal và gõ lệnh sau:
```
$ echo “source ~/path/to/our/file/jump.sh”>> ~/.bashrc
```
- Bây giờ chúng ta có thể sử dụng shell script chúng ta đã tạo:
```
$ jump dir_name
```
![](https://images.viblo.asia/8bb0724b-fb09-45b3-a964-b3e16a937d0b.png)

##  Tổng kết
- Trong bài viết này, tôi đã giới thiệu tổng quan về Shell Linux, Shell Script và ví dụ đơn giản tới các bạn. Trong bài tới, tôi sẽ hướng dẫn các bạn viết Shell Script một cách chi tiết hơn (syntax, function, operators...). Cảm ơn các bạn đã đọc.
#### Tài liệu về Bash script
- [The bash shell](https://bash.cyberciti.biz/guide/The_bash_shell)
- [Advanced Bash-Scripting Guide](http://tldp.org/LDP/abs/html/)
####  Tài liệu về shell
- [Shell (computing)](https://en.wikipedia.org/wiki/Shell_(computing))
- [Shell script](https://en.wikipedia.org/wiki/Shell_script)
####  Update
- Bài 2: [Linux Shell và Shell Script - Variables - Basic Operators](https://viblo.asia/p/linux-shell-va-shell-script-variables-basic-operators-Ljy5V1rolra)