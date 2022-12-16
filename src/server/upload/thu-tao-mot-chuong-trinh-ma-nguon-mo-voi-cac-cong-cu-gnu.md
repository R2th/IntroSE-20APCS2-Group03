![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)
# Mở đầu
Phần mềm máy tính từ khi ra đời đến giờ luôn đóng vai trò quan trọng và quyết định đến sự thành công của các thiết bị máy tính. Và ngày nay, phần mềm máy tính vẫn đang ngày càng phát triển, đa dạng cả về số lượng lẫn tính năng. Mọi công việc trong cuộc sống có sử dụng máy tính thì đều có những phần mềm riêng để sử dụng. Với công việc văn phòng chúng ta có `Microsoft Office`, `Kingsoft Office` hay `Google Docs/Sheets/Slides` ..., với duyệt web có `Google Chrome`, `Mozilla Firefox` hay `Apple Safari` ..., với chỉnh sửa ảnh có `Gimp`, `Photoshop` ... 

Phần mềm là những đoạn mã nguồn được viết bằng một ngôn ngữ lập trình nào đó, và sau đó được biên dịch/thông dịch ra một chương trình có thể thực thi được trên máy tính, với một chức năng nhất định nào đó. Phần mềm nếu xét về mặt sở hữu thì có 3 loại, bao gồm phần mềm thương mại (mã nguồn chỉ có nhà phát triển được biết), phần mềm chia sẻ (ngoại trừ nhà phát triển thì có một số bạn bè hoặc đối tác cũng biết được mã nguồn) và phần mềm mã nguồn mở (mã nguồn được chia sẻ cho tất cả mọi người trên toàn thế giới, miễn là họ có một chiếc máy tính và một đường truyền internet).

Phần mềm mã nguồn mở tuy sinh sau đẻ muộn, nhưng lại đóng vai trò rất quan trọng trong sự phát triển của phần mềm ngày nay. Hầu hết phần mềm ngày nay đều học hỏi ít hoặc nhiều từ các phần mềm mã nguồn mở. Một số phần mềm nguồn mở còn được sử dụng để kiểm tra độ ổn định trước khi phần mềm chính được phát hành (như trường hợp Google Chrome sử dụng Chromium để kiểm tra tính ổn định).

# Linux và GNU
Phần mềm mã nguồn mở có rất nhiều loại, tuy nhiên nổi tiếng nhất trên thế giới thì phải nhắc đến **Linux** và **GNU**. **Linux** là nhân hệ điều hành mở, được sử dụng cho rất nhiều hệ điều hành mã nguồn mở ngày nay (các **Linux Distro**). Còn **GNU** (*GNU's Not Unix*), đây là một tổ chức do [Richard Stallman](https://en.wikipedia.org/wiki/Richard_Stallman) khởi xướng. Tổ chức này tập hợp rất nhiều công cụ và phần mềm mã nguồn mở, tương thích hoàn toàn với **Linux**, và có thể sử dụng trên hầu hết các hệ điều hành phổ biến.
Ban đầu, **Richard Stallman** có dự định xây dựng một hệ điều hành mã nguồn mở, hoạt động giống như Unix nhưng không phải Unix. Ông và tổ chức của mình đã xây dựng được hầu hết các chương trình và phần mềm cần thiết, tuy nhiên còn thiếu duy nhất nhân hệ điều hành (`kernel`). Đúng vào thời điểm đó, nhân **Linux** được [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) chia sẻ trên toàn thế giới. Và cuối cùng **Stallman** đã quyết định sử dụng **Linux** làm nhân hệ điều hành của mình. Và hệ điều hành GNU/Linux chính thức ra đời, với **Linux** là nhân và **GNU** là vỏ (các phần mềm).

Kể từ đó đến nay, các phần mềm của **GNU** vẫn không ngừng phát triển, tạo tiền đề để hàng loạt các phần mềm mã nguồn mở hiện đại được ra đời. Trong số các phần mềm đó, nổi tiếng nhất có lẽ là bộ công cụ **GNU Build System** (hay còn gọi là `autotools`). Đây là bộ công cụ được sử dụng để đóng gói mã nguồn, giúp cho mã nguồn có thể được biên dịch tại bất cứ môi trường nào có thể sử dụng phần mềm **GNU**.

# GNU Build System
**GNU Build System** không phải là các công cụ biên dịch mã nguồn, mà chỉ đơn giản là các công cụ giúp cho việc biên dịch phần mềm mã nguồn mở có thể diễn ra trên bất cứ hệ điều hành nào. Lý do là vì phần lớn các phần mềm mã nguồn mở được viết bằng ngôn ngữ C/C++, mà mỗi hệ điều hành lại thường sử dụng một trình biên dịch khác nhau, cũng như thư viện hệ thống khác nhau.
Quá trình chuyển đổi phần mềm mã nguồn mở từ mã nguồn (code) thành chương trình (program) sẽ diễn ra theo 2 giai đoạn:
* `configure`: tạo file `Makefile` tương thích với hệ điều hành và công cụ biên dịch cụ thể
* `make`: biên dịch mã nguồn ra chương trình dựa theo `Makefile` ở bước trên

Bộ công cụ **GNU Build System** bao gồm các công cụ sau:
* `GNU Autoconf`: chuyển các file config chung của phần mềm thành các file config riêng cho từng môi trường cụ thể
* `GNU Automake`: chuyển các file config chung của `Makefile` và các file config riêng sinh ra bởi `Autoconf` thành các file `Makefile` dùng để chỉ thị biên dịch mã nguồn
* `GNU Libtool`: xử lý việc tạo các file thư viện tĩnh hoặc động cho phần mềm sử dụng
* `Gnulib`: quản lý việc chuyển đổi môi trường của phần mềm, cũng tức là tạo tính tương thích cho toàn bộ mã nguồn ở nhiều môi trường khác nhau.

Sơ đồ của quá trình chuyển đổi mã nguồn thành chương trình sẽ như sau:

![](https://images.viblo.asia/48c65987-6d24-4196-9d06-93579c4ba376.png)

# Demo tạo một chương trình với các công cụ GNU
Hầu hết phần mềm mã nguồn mở ngày nay đều sử dụng **GNU Build System** để tăng tính tương thích cho phần mềm trên nhiều môi trường khác nhau. Và giờ tôi sẽ thử tạo ra một số mã nguồn đơn giản,  kèm theo đó là viết các file config để sử dụng với bộ công cụ này.

Đầu tiên, việc cần làm là tạo một thư mục để chứa toàn bộ mã nguồn và các file config.
Trong thư mục này, tôi có cây thư mục như sau:

![](https://images.viblo.asia/1c3cdbe4-feb2-4c44-a7da-8aed9d71d277.png)

Trong đó:
* Thư mục `src`: chứa mã nguồn của ứng dụng, ở đây của tôi là ứng dụng Hello
* Thư mục `man`: chứa hướng dẫn sử dụng và giới thiệu về ứng dụng
* Các file `Makefile.am`: file config của **GNU Automake**
* File `configure.ac`: File config của **GNU Autoconf**
* File `autogen.sh`: File script để thực thi toàn bộ quá trình của `autotools`

Mình có tạo một repository trên Gitlab có chứa toàn bộ mã nguồn chương trình của mình: [](https://gitlab.com/thanhhungchu95/demo-project)

Để thực hiện quá trình biên dịch phần mềm thì cần làm như sau:
* Bước 1: Clone repository: `git clone https://gitlab.com/thanhhungchu95/demo-project && cd demo-project`
* Bước 2: Cài đặt các công cụ cần thiết:
    * Trên Linux (VD: Ubuntu): cài các gói `autotools-dev`, `autoconf`, `automake` và `libtool` (sử dụng `apt`)
    * Trên macOS: cài các gói `autoconf`, `automake` và `libtool` (sử dụng `brew`)

* Bước 3: Chạy file autogen.sh trong thư mục `demo-project` bằng lệnh `./autogen.sh`. Kết quả sẽ sinh ra một số file cần thiết để thực hiện quá trình tạo `Makefile`, trong đó quan trọng nhất là file `configure`, đây là file script chính dùng để tạo `Makefile` cho ứng dụng.

![](https://images.viblo.asia/9982b285-4f93-4066-8f61-6dd7925db4b7.png)

* Bước 4: Chạy file configure bằng lệnh `./configure`. Sau khi chạy file này, `Makefile` sẽ được sinh ra, đây là file config của chương trình `make`, và sẽ dùng để biên dịch ứng dụng.

![](https://images.viblo.asia/f79a2a56-2312-4e92-9e37-40d08910dac3.png)

* Bước 5: Chạy command `make` để tiến hành biên dịch chương trình. Sau đó, chạy `make install` để cài đặt chương trình vào đúng vị trí (mặc định sẽ cài vào `/usr/local/bin`).
* Bước 6: Test chương trình.
    * Đầu tiên là chương trình `hello`. Bạn có thể gõ command `hello` để in ra dòng chữ `Hello World!` (sau khi chạy `make install`)
    * Sau đó có thể dùng lệnh `man hello` để xem man page của chương trình hello.

![](https://images.viblo.asia/df6d133e-064c-4b4a-858f-04a22a2bd577.png)

![](https://images.viblo.asia/0c4718fa-83a8-43e2-8009-c8ae7dc99749.png)

Nếu các bạn gặp lỗi như hình sau khi chạy command `hello`:
> hello: error while loading shared libraries: lib_hello.so.0: cannot open shared object file: No such file or directory.

Hãy thử chạy lệnh `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib` thì có thể fix được lỗi này.

# Kết luận
Trên đây mình đã trình bày những hiểu biết cơ bản của mình về **GNU** và demo thử một chương trình **hello** đơn giản có sử dụng bộ công cụ **GNU Build System** để cấu hình và biên dịch. Mọi thắc mắc về các file cấu hình trong mã nguồn cũng như nội dung bài viết mọi người có thể comment bên dưới ạ. Mình sẽ cố gắng hoàn thiện bài viết hơn. Cảm ơn mọi người đã đọc ^^.
# Tài liệu tham khảo
* https://en.wikipedia.org/wiki/GNU
* https://www.gnu.org/software/software.en.html
* https://en.wikipedia.org/wiki/GNU_Build_System
* https://gitlab.com/thanhhungchu95/demo-project