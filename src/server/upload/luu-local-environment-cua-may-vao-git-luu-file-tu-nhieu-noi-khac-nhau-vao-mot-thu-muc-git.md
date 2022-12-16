# Bạn quá mệt mỏi vì phải cài đặt lại mọi thứ từ đầu khi đổi máy cũ sang máy mới (cài lại terminal pluggins, cài lại các phần mềm cần thiết,...)?
# Đừng lo, đã có bài viết này.

 Hôm ấy là một ngày tháng 7 nắng nhẹ, một lập trình viên tên Annie giấu tên đang đi đến công ty với tâm trạng đầy hứng khởi. 
 
Bỗng đột nhiên trời chuyển mưa nặng hạt.

Vì chủ quan nên cô đã không mang theo áo mưa, kết quả là chiếc laptop trong cặp của cô ướt nhẹp.

Annie lái xe bạt mạng thật nhanh, mặc kệ tiếng còi xe ing ỏi, mặc kệ xe ben xe tải chạy vèo vèo đằng sau, cô tạt đầu xe, lạng lách đánh võng, vặn ga hết cỡ, bất chấp mạng sống của mình, chỉ cầu mong sao chiếc laptop không bị làm sao.

Vừa đến công ty, cô tháo lap thật nhanh, lau chùi cẩn thận, nhưng k may lap đã tắt ngủm không một lời chào thân ái.

Annie đã khóc. Cô không tiếc mấy chục củ sửa máy hay mua máy mới, mà cô khóc vì khi đổi máy cô phải mất hàng giờ, có khi cả ngày, cả tuần để cài lại mọi thứ.

Đừng như Annie.

### Bài học rút ra: Ngay từ bây giờ phải lưu lại tất cả cài đặt có thể lưu, đẩy lên git, để sau này có đổi máy chỉ cần clone repo đó về, bấm enter và ngồi húp cà phê chờ đợi thôi. Đỡ mất công.

## 1. Xác định những gì có thể lưu
* Các file config của terminals: `.bashrc`, `.zshrc`, `.fishrc` ,...
* Git ssh keys: `~/.ssh`(không khuyến khích, bay acc như chơi, tốt nhất đừng đẩy các loại key lên git)
* Các file settings của editors như Vim, IntelliJ, Vscode,...
* Tạo ra một executable file để tự động cài đặt các phần mềm cần thiết. [Tham khảo repo này để viết nha](https://github.com/TinyAnnie/install_tools_script) 
* Các file/folder ở các nơi khác nhau nhưng bạn muốn lưu tất cả vào một git repo.
* Vân vân mây mây.
## 2. Tạo một git repo
Tạo một folder để lưu những thứ có thể lưu trên. Lưu đâu kệ bạn.
Let's say: `~/env_setup/`
```
mk dir env_setup
```
And then:
```
git init
```
## 3. Link các file config vào git repo trên
Chúng ta sẽ tạo một [Symbolic Links](https://linuxize.com/post/how-to-create-symbolic-links-in-linux-using-the-ln-command/). Hiểu đơn giản là tạo ra một file, file này liên kết trỏ đến một file khác. Ví dụ bạn tạo một file A link đến file B ở một thư mục khác, khi sửa file A thì tức là đang sửa file B.
```
ln -S {tên file/folder gốc} {tên link file/folder đó ở folder vừa tạo} 
```
Ví dụ:
Thông thường file config của terminal nằm ở `~/.bashrc`. 

Mình muốn lưu file này vào folder `~/env_setup/` mình vừa tạo ở trên để đẩy lên git lưu trữ, sau này khi đổi máy mới mình clone về và thay thể file ~/.bashrc ở máy mới bằng file ~/.bashrc ở máy cũ lấy từ git.

Thay vì mình copy file từ folder `~/` vào `~/env_setup`. Để rồi một lúc nào đó bạn sửa file  `~/.bashrc` thì muốn cập nhật lại file đó ở `~/env_setup` bạn phải remove, copy/edit lại. 

Thì mình sẽ link file `~/env_setup/.bashrc` đến file `~/.bashrc`. Khi sửa file gốc thì file link tới nó cũng tự động cập nhật.

```
ln -S ~/.bashrc ~/env_setup/.bashrc 
```

Để kiểm chứng, bạn link như trên, rồi vào sửa file `~/.bashrc` rồi vào xem file `~/env_setup/.bashrc` xem nó có đổi theo không nhé, không lại bảo mình điêu kk.
## 4. Đẩy lên git
Đẩy lên đâu tuỳ bạn. 😁