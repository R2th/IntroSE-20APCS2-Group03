![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)
# Mở đầu
**Emacs** (**E**ditor **MAC**ro**S**) là một trình biên soạn văn bản đa chức năng, là một bên chiến tuyến trong cuộc chiến giữa các trình biên soạn văn bản dòng lệnh (phía còn lại là **Vi/VIM**). **Emacs** là một phần mềm tự do, chạy được trên nhiều loại hệ điều hành khác nhau như **Windows**, **UNIX**, **Linux**, **macOS**.... Được phát triển dựa trên ngôn ngữ lập trình `Lisp`, do đó **Emacs** có thể dễ dàng mở rộng các tính năng hơn **Vi/VIM** (vốn sử dụng một ngôn ngữ riêng biệt là `Vim Script`). Mặc dù là một trình soạn thảo văn bản nhưng **Emacs** chủ yếu được sử dụng trong giới lập trình máy tính và người thông thạo kĩ thuật, do chức năng của nó đa phần là hướng tới lập trình, đồng thời nó chứa khá nhiều tổ hợp phím từ đơn giản đến phức tạp, có thể không phù hợp lắm với người dùng thông thường.
**Emacs** được phát triển lần đầu tiên vào năm 1976 bởi `Richard Stallman` (nhà sáng lập **GNU**), `Guy Steele` và `Dave Moon`. Ngày nay, đã có rất nhiều phiên bản **Emacs** được phát triển dựa trên **Emacs** ban đầu, tuy nhiên chỉ có 2 phiên bản phổ biến nhất là **GNU Emacs** (do `Richard Stallman` viết lại vào năm 1984 để hoàn thiện dự án **GNU**) và **XEmacs** (một biến thể của **GNU Emacs** tập trung nhiều vào giao diện đồ họa).

# Cài đặt và sử dụng
Cũng giống như các chương trình phần mềm khác, trước hết bạn cần cài đặt để có thể sử dụng. Với mỗi hệ điều hành khác nhau sẽ có một cách cài đặt riêng biệt:

### Windows
Tải file zip từ server FTP: http://ftp.gnu.org/gnu/emacs/windows/, sau đó giải nén file và thực thi chương trình thông qua `bin/runemacs.exe`

### Linux
Thông thường, với các hệ điều hành phổ biến, **Emacs** luôn có mặt trên kho phần mềm. Chỉ cần thực thi một câu lệnh cài đặt tương ứng là được.
 - Với **Ubuntu/Debian/Mint**: `sudo apt install emacs`
 - Với **RedHat/Fedora/CentOS**: `sudo yum install emacs`
 - Với **Arch/Manjaro**: `sudo pacman -S emacs`

Note: Để sử dụng **Emacs** chỉ cần gõ lệnh `emacs` trên Terminal.
 
 ### macOS
 Có 2 cách để cài đặt:
 - Dùng [Homebrew](https://brew.sh): `brew install emacs`
 - Dùng [MacPorts](https://www.macports.org/): `sudo port install emacs`

Note: Để sử dụng **Emacs** chỉ cần gõ lệnh `emacs` trên Terminal.

# Bước đầu làm quen
Khi mở **Emacs**, giao diện sẽ trông như sau:

![](https://images.viblo.asia/8e351166-80e0-4b1e-828d-eaf9300353b1.png)

Giao diện **Emacs** sẽ gồm 3 phần:
- Thanh menu: có thể truy cập bằng tổ hợp phím ``` Alt-` ``` hoặc `F10`/`Fn-F10`, chứa các tính năng để sử dụng cho việc soạn thảo từ cơ bản đến nâng cao.
- Cửa sổ soạn thảo: vùng làm việc chính cho việc biên soạn văn bản
- Thanh trạng thái: hiển thị các tổ hợp phím được gõ, hoặc các câu lệnh thực hiện.

Để hủy bất kì một câu lệnh nào, bạn cần gõ tổ hợp phím `Ctrl-g` hoặc `ESC ESC ESC`
Để thoát **Emasc**, bạn hãy gõ tổ hợp phím `Ctrl-x Ctrl-c`

# Nhập xuất file
### Mở file
Để mở file có thể dùng một trong các cách sau:
- Mở từ terminal: dùng cú pháp `emacs [file_path]`
- Mở sau khi vào **Emacs**: gõ tổ hợp phím `Ctrl-x Ctrl-f`, sau đó gõ `[file_path]` và `Enter`

![](https://images.viblo.asia/47331e97-19b2-43b2-a668-c2a651787aac.png)

### Lưu file
Để lưu file trong **Emacs** thì có 2 cú pháp:
- Ghi đè file hiện tại hoặc lưu file mới: `Ctrl-x Ctrl-s`
- Lưu bản sao: `Ctrl-x Ctrl-w`

# Chỉnh sửa nhiều file cùng lúc
**Emacs** cho phép mở nhiều file trong cùng một thời điểm thông qua buffer. Một số câu lệnh hỗ trợ như sau:
- Mở một buffer mới: dùng tương tự cú pháp mở file `Ctrl-x Ctrl-f`
- Đóng buffer hiện tại: `Ctrl-x k`
- Hiện danh sách tất cả các buffer: `Ctrl-x Ctrl-b`

![](https://images.viblo.asia/c7a53adc-4fbc-4197-b217-5a7c761a6070.png)

- Chuyển qua lại giữa các buffer: `Ctrl-x b`

**Emacs** cũng hỗ trợ mở nhiều buffer trên cùng một cửa sổ:
- Chia cửa sổ theo chiều dọc: `Ctrl-x 2`

![](https://images.viblo.asia/709f61a2-c8db-41c6-856c-49192f0617c3.png)

- Chia cửa sổ theo chiều ngang: `Ctrl-x 3`

![](https://images.viblo.asia/f8ff7dc6-bc64-4f9b-87e4-511fb54a0372.png)

- Chuyển qua lại giữa các cửa sổ: `Ctrl-x o`
- Xóa cửa sổ hiện tại: `Ctrl-x 0`
- Xóa các cửa sổ khác: `Ctrl-x 1`

# Chỉnh sửa văn bản
Về cơ bản, sau khi mở file trong **Emacs** là có thể bắt đầu chỉnh sửa. Chế độ mặc định của **Emacs** là chế độ soạn thảo, để truy cập chế độ câu lệnh thì chỉ cần gõ `Alt-x` kèm theo câu lệnh. Trái ngược với **Vi/VIM**, mặc định mở lên là chế độ câu lệnh, và phải dùng thêm 1 số phím khác để chuyển sang chế độ soạn thảo.

![](https://images.viblo.asia/497de2f2-8869-494d-a1a0-694259ddc8b1.png)

> Kí hiệu **M-x** kèm thêm con nhắc lệnh ở dưới cùng cửa sổ là dấu hiệu cho biết bạn đang ở chế độ câu lệnh.

Để chọn một đoạn văn bản, bạn cần gõ một trong các tổ hợp phím: `Ctrl-SPACE`, `Ctrl-@` hoặc `Alt-x set-mark-command`. Sau đó dùng các phím điều hướng để chọn đoạn văn bản như mong muốn.

![](https://images.viblo.asia/714c8e59-68fd-4683-b1bb-58a3caeef74d.png)

- Để cắt đoạn văn bản: `Ctrl-w`
- Để sao chép đoạn văn bản: `Alt-w`
- Để dán đoạn văn bản: `Ctrl-y`
- Để chọn toàn bộ nội dung file: `Ctrl-x h`
- Để quay lại nội dung trước đó (Undo): `Ctrl-x u`
- Để tìm kiếm: `Ctrl-s`, sau đó gõ cụm từ cần tìm

![](https://images.viblo.asia/fe195310-1e62-4350-a156-e5d1fae1558d.png)

- Để thay thế:
    - Gõ `Alt-%`
    - Tiếp theo gõ cụm từ cần thay thế => `Enter`
    - Kế đến gõ cụm từ muốn thay thế => `Enter`
    - Gõ `y` để thay từ hiện tại ở vị trí con trỏ, `n` để dừng từ hiện tại, `!` để thay thế toàn bộ các từ thỏa mãn.
    - Có thể gõ `?` để xem các câu lệnh khác sử dụng khi thay thế văn bản.

![](https://images.viblo.asia/1b193276-19ec-42a8-877f-70544f5a4ccf.png)

# File khởi tạo
Mặc định, khi khởi động emacs, ta có thể tạo sẵn một file cấu hình cần thiết để tiện cho công việc. Thường là một trong các file sau: `~/.emacs`, `~/.emacs.el`, `~/.emacs.d/init.el`.
Trên trang https://github.com/purcell/emacs.d có rất nhiều file cấu hình phù hợp với từng nhu cầu cho bạn sử dụng.

# Cài đặt các thư viện mở rộng
Cũng giống như các trình biên soạn văn bản khác, **Emacs** cũng cho phép người dùng cài thêm các thư viện để mở rộng tính năng.
Bạn cần thêm đoạn mã sau vào file khởi tạo
```lisp
(require 'package)
  (add-to-list
   'package-archives
   ;; '("melpa" . "http://stable.melpa.org/packages/") ; many packages won't show if using stable
   '("melpa" . "http://melpa.milkbox.net/packages/")
   t)
```

Sau đó khi khởi động **Emacs**, bạn cần gõ lệnh: `Alt-x list-packages`.

![](https://images.viblo.asia/97336934-6ac9-48c1-b16c-350b9610e039.png)

Tiếp theo, hãy di chuyển đến gói bạn muốn cài đặt và ấn `Enter`. Một cửa sổ chi tiết xuất hiện cho ta thấy thông tin của gói.

![](https://images.viblo.asia/8ee5676c-596f-4ea8-b363-7120a12bc2c6.png)

Gõ `Ctrl-x o` để di chuyển đến cửa sổ chi tiết xuất hiện bên dưới, sau đó di chuyển đến đường dẫn **Install** và ấn `Enter` => `y` để cài đặt gói.

![](https://images.viblo.asia/dc865bab-e2fa-496d-ac82-1f2657c48bf1.png)

# Kết thúc
Trên đây chỉ là những hiểu biết cơ bản của mình về trình biên soạn văn bản **Emacs**, do mình là lập trình viên và cũng chủ yếu làm việc trên môi trường dòng lệnh nên bài viết này cũng tập trung chủ yếu vào mảng này. **Emacs** tuy cũng có giao diện đồ họa nhưng hầu như không được nhiều người sử dụng và các chức năng cũng tương tự giao diện dòng lệnh. Hi vọng qua bài viết này của mình, mọi người có thể thấy hiếu kì về **Emacs** và bắt đầu tìm hiểu về nó cũng như sử dụng trong công việc hàng ngày. Xin cảm ơn mọi người đã đọc bài viết.
# Tài liệu tham khảo
* https://en.wikipedia.org/wiki/Emacs
* https://www.gnu.org/s/emacs/
* https://www.emacswiki.org/