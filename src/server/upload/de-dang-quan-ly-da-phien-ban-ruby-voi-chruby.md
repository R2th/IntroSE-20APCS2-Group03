# Tại sao cần trình quản lý phiên bản?
Khi mới bắt đầu học và làm việc với Ruby, điều đầu tiên cần làm là cài đặt Ruby vào máy tính. Đối với nền tảng Linux, chắc hẳn bạn sẽ nghĩ ngay đến công thức quen thuộc: sử dụng package manager tương ứng với bản cài đặt Linux của bạn, vd: `apt install ruby`! Điều này tuy rõ ràng là cách cài đặt Ruby đơn giản nhất cho người mới. Tuy nhiên, việc cài đặt Ruby như trên thì phiên bản Ruby bạn cài đặt sẽ phải phụ thuộc vào phiên bản đang có ở package manager, khoản cập nhật phiên bản mới cũng vậy. Túm lại, dùng package manager để cài sẽ khó cho bạn phiên bản Ruby mình mong muốn.

Qua thời gian, sau khi đã làm qua nhiều dự án khác nhau sử dụng Ruby, sẽ có lúc bạn phải thường xuyên chuyển đi chuyển lại giữa các project mà phụ thuộc vào phiên bản Ruby khác nhau. Lúc này, bạn sẽ thấy một version manager như chruby càng cho thấy sức mạnh hơn!
# So sánh qua giữa rvm, rbenv và chruby
rvm, rbenv và chruby có lẽ là 3 công cụ phổ biến nhất giúp quản lý phiên bản cho Ruby. Thời đầu rvm là công cụ quản lý phiên bản Ruby "được việc", nhiều chức năng nhưng nặng nề nhất. Để tạo ra chức năng tự động chuyển đổi phiên bản, rvm sử dụng giải pháp *ghi đè câu lệnh `cd`* được cho là không thân thiện và dễ có khả năng nảy sinh vấn đề. rvm cũng đi kèm *gemsets*, vốn không còn cần thiết lắm sau sự phổ biến của *bundler*. 

Cái thứ 2 là rbenv, được thiết kế nhỏ nhẹ hơn và sử dụng cơ chế *shims* để xác định phiên bản Ruby cần sử dụng.  Nhược điểm là, cơ chế *shims* chưa 100% hoàn hảo. Mỗi khi cài mới một gem có thể thực thi (như *rails*), người dùng sẽ phải tự chạy lại câu lệnh `rbenv rehash`.

Cuối cùng là chruby, công cụ hiện nay có cách tiếp cận đơn giản và sạch sẽ nhất. Mã nguồn của chruby chỉ vỏn vẹn ~100 dòng code. Mỗi lần thay đổi phiên bản, chruby chỉ làm thay đổi các biến môi trường liên quan. Còn để tự động chuyển đổi giữa các phiên bản khi di chuyển thư mục, chruby sử dụng cơ chế *pre-prompt command* chứ không động chạm gì tới *cd*.

Bài viết này sẽ hướng dẫn bạn cài chruby, hiện mình đang sử dụng ubuntu 18.04 LTS nhưng có thể áp dụng hướng dẫn cho bất kỳ bản linux nào khác.
# Hướng dẫn cài đặt
## Cài đặt các build tool cần thiết
Lệnh dưới đây sẽ cài đặt các gói cần thiết để biên dịch từ mã nguồn của chruby và ruby-install mà ta sẽ cần thiết ở các bước tới.
```
sudo apt update
sudo apt install build-essential
```
## Cài đặt chruby
Bạn chỉ cần sử dụng lần lượt các dòng lệnh bên dưới:
```
wget -O chruby-0.3.9.tar.gz https://github.com/postmodern/chruby/archive/v0.3.9.tar.gz
tar -xzvf chruby-0.3.9.tar.gz
cd chruby-0.3.9/
sudo make install
```
## Cài đặt ruby-install
Cũng chỉ là chạy lần lượt vài câu lệnh. Nhớ để ý chút tới đường dẫn hiện tại của bạn.
```
wget -O ruby-install-0.7.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.7.0.tar.gz
tar -xzvf ruby-install-0.7.0.tar.gz
cd ruby-install-0.7.0/
sudo make install
```
## Cập nhật file .bashrc (hoặc .zshrc nếu bạn dùng ZSH)
Mở file `~/.bashrc` bằng trình soạn thảo văn bản bạn muốn, thêm vào cuối file như sau:
```
source /usr/local/share/chruby/chruby.sh
source /usr/local/share/chruby/auto.sh
```
Sau đó chạy lệnh này trên terminal: `source ~/.bashrc` hoặc mở lại terminal.
Gõ lệnh `chruby` để xem các phiên bản ruby hiện có và cái nào đang được chọn, nhưng vì ta chưa cài bản ruby nào nên hiện giờ bạn sẽ chưa thấy gì cả.
## Cài đặt phiên bản ruby
Để hiện ra các bản ruby khả dụng: gõ lệnh `ruby-install`:

![ruby-install](https://images.viblo.asia/d7960ce1-1289-447c-8d19-8799ad7dfbba.png)

Giờ giả sử mình muốn cài 2 phiên bản 2.5 và 2.6:
```
ruby-install ruby 2.5
ruby-install ruby 2.6.3
```
(quá trình cài sẽ hơi lâu đấy)

Sau khi cài đặt xong, chạy `source ~/.bashrc` hoặc mở lại terminal để các phiên bản mới được chruby nhận ra. Sau đó chạy `chruby` để xem các phiên bản đã được cài.
Bất cứ khi nào bạn muốn đổi giữa các phiên bản, sử dụng lệnh như sau:
```
chruby 2.6.3
```

![chruby change version](https://images.viblo.asia/d2979b91-8bb8-4887-88ea-584d032cf549.png)

*chruby* cũng có thể tự nhận dạng tệp *.ruby-version* ở thư mục hiện tại để tự đổi phiên bản phù hợp.
# Tham khảo
- [Simple Ruby installs with Chruby](https://marioharvey.com/blog/simple-ruby-installs-with-chruby/)
- [pbrisbin.com/posts/chruby](https://pbrisbin.com/posts/chruby/)
- [Towards Simplicity: From rbenv to chruby](https://zaiste.net/towards_simplicity_from_rbenv_to_chruby/)
- https://github.com/postmodern/chruby
- https://github.com/postmodern/ruby-install