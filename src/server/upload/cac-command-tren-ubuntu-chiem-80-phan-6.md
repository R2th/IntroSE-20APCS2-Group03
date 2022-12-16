Hello 500 ae, sau 5 số trong seri này mình thấy có vẻ ae có hứng thú đọc chủ đề này ghê. Hi vọng những gì mình tìm hiểu được sẽ giúp ích được cho nhiều bạn hơn. Vậy là chúng ta đã đi ra được gần hết được các command quan trọng rồi đó. Sốc lại tinh thần với bài tiếp theo thôi. Cho một thế giới awesome hơn.

![](https://images.viblo.asia/fc8dcf65-1d7c-4261-b3eb-7f19eaf1f353.jpg)

Nào tiếp tục seri 20% command line sử dụng nhiều nhất. Bạn có thể xem phần trước tại [đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-5-eW65Gm8aZDO#_jobs-4).

-----

# bg
Khi một command đang chạy bạn có thể dừng nó bằng cách sử dụng `ctrl + Z`. Command đó sẽ dừng ngay lập tức, và bạn có thể trở lại terminal - shell terminal.

![](https://images.viblo.asia/c463f157-609c-4c08-aff2-430340f219e0.png)

Bạn cũng có thể tiếp tục thực thi command trong background, nó tiếp tục chạy và không ngăn bạn thực hiện các công việc khác trong terminal. Trong trường hợp job của tôi bị dừng lại vì một lý do nào đó - ở trạng thái stopped. Tôi có thể chạy câu lệnh `bg %1` - background để tiếp tục chạy job có id là 1 chạy ở trong background.

![](https://images.viblo.asia/e5b25493-86b2-4bdf-a8ff-8cd7faa46a36.png)

# fg
Khi một command đang chạy trong background khi bạn sử dụng ký tự `&` ở cuối câu lệnh như trong phần trước (vd: `top &`) hoặc bạn cho nó chạy background với câu lệnh `bg`, thì bạn có thể chạy câu lệnh này trở lại ngay trên terminal bằng cách sử dụng câu lệnh `fg` - foreground.

`fg`

Khi chạy mặc định như trên thì nó sẽ chọn job cuối cùng. Bạn cũng có thể chỉ định job bằng cách thêm job number.

![](https://images.viblo.asia/5e5cc873-1bbc-4207-a02e-200246991a77.png)

# type
Mỗi một command có thể là một trong 4 loại:
* executable
* shell built-in program
* shell function
* alias

Command type có thể cho biết nó thuộc loại nào. Nó sẽ cho bạn biết câu lệnh bắt đầu từ đâu. Kết quả trả về sẽ phụ thuộc vào  commsnd và shell mà bạn sử dụng.
* Đây là Bash:

![](https://images.viblo.asia/7e5c4b1b-ab46-4136-8f7f-401114ef858d.png)

* Đây là Zsh:

![](https://images.viblo.asia/1c4ecf45-fafb-4179-8dca-052f1a681dcb.png)

* Đây là Fish:

![](https://images.viblo.asia/0a8e2e19-5eb6-4968-85ac-79674d047a90.png)

# which
Giả sử bạn có một command ,mà bạn muốn thực thi nhưng nó nằm trong đường dẫn shell mà bạn muốn biết nó được đặt ở đâu. Khi đó bạn có thể sử dụng `which`. Command sẽ trả về đường dẫn của command:

![](https://images.viblo.asia/7a27306a-ca1b-4bb3-a22e-e455729bf1ae.png)

which chỉ hoạt động đối với các command được lưu trong disk, không hoạt động đối với các aliases hoặc các shell buildt-in.

# nohup
Đôi lúc bạn phải chạy một tiến trình có thời gian thực thi rất lâu trên một máy ở xa và sau đó bạn cần ngắt kết nối đến máy này (cụ thể là chạy các tiến trình trên server bằng ssh chẳng hạn).

Hoặc đơn giản là bạn muốn ngăn lệnh bị tạm dừng nếu có bất kỳ sự cố nào về đường truyền mạng giữa máy của bạn và server.

Để chạy được một command sau khi bạn thoát khỏi hệ thống hoặc đóng phiên làm việc của bạn tới một máy chủ sử dụng câu lệnh `nohup`

`nohup <command>`

# xargs
Command xargs được sử dụng trong Unix shell để chuyển đầu vào thành các đối sổ của một command. Thông qua việc sử dụng xargs, output của một command được sử dụng làm đầu vào của một command khác. Dưới đây là cú pháp sử dụng:

`command1 | xargs command2`

Chúng ta sử dụng `|` để chuyển output đến `xargs`. Dưới đây là một ví dụ đơn giản. Bạn muốn xóa một vài file chỉ định trong một thư mục. Tên các file sẽ được liệt kê bên trong 1 file. Chúng ta có 3 file: `file1`, `file2`, `file3`. Trong file `todelete.txt` chúng ta sẽ liệt kê các file chúng ta muốn xóa:

![](https://images.viblo.asia/7e33f997-f04d-49cb-9da3-4433e97e2384.png)

Chúng ta sẽ lấy nội dung của file bằng câu lệnh `cat todelete.txt` sau đó chuyển vào câu lệnh rm thông qua `xargs`.

`cat todelete.txt | xargs rm`

và đây sẽ là kết quả:

![](https://images.viblo.asia/d43496ce-4f21-47e6-866a-1247b433894d.png)

Cách mà nó làm việc: xargs sẽ chạy câu lệnh rm 2 lần do có 2 đối số chuyền vào mỗi lần sẽ là 1 dòng đọc được bởi câu lệnh cat. Có một vài option khi sử dụng với xargs. Một trong hầu hết các option hữu dụng nhất theo quan điểm của tôi là `-p`. Khi sử dụng option này kèm với `xargs` sẽ hiển thị xác nhận - confirmation hoạt động.

![](https://images.viblo.asia/58706d27-95e3-4a2f-b493-7b1a12f9739a.png)

Option `-n` sẽ cho phép bạn thực hiện từng đối số truyền vào câu lệnh thứ 2, kết hợp với `-p` để xác nhận xóa trên từng file.

![](https://images.viblo.asia/e2563e8f-dc89-4fd0-bb2b-57b2b1f1c692.png)

# vim
Vim là một trình soạn thảo - editor được sử dụng phổ biến, đặc biệt là các lập trình viên sau nano, và được cài đặt sẵn trên một số hđh ubuntu. Nó được phát triển và thường xuyên được cập nhật và có một cộng đồng lớn. Thạm chí còn có một hội nghị [Vim](https://vimconf.org). Bạn có thể bắt đầu sử dụng vim bằng cách sử dụng `vi`.

![](https://images.viblo.asia/cd831ab4-a7d7-4c04-a9bd-562b19090c6f.png)

Bạn cũng có thể chỉ định 1 file để chỉnh sửa, hoặc là đường dẫn đến file đó:

![](https://images.viblo.asia/b896fd67-cbe5-4732-b68a-69bdcb6347ea.png)

Vim có 2 chế độ:
* command (hoặc normal)
* insert

Để vào chế độ insert thì bạn sử dụng key `i`, để thoát chế độ này sử dụng key `esc`. Ngoài ra còn có một số key khác bạn cần biết khi sử dụng vim:
* `:wq` save and quit
* `:q!` quit without saving
* `u` undo
* `ctrl + r` redo

-----

Done. Đây là phần 6 nhé. Mình sẽ back lại chuỗi bài này sau. Các bạn đón đọc phần 7 link ở đây. Cảm ơn mọi người đã quan tâm.