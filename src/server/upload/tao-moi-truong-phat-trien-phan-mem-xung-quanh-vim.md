![](https://images.viblo.asia/a815610f-5cf0-4a54-b6d9-9327a93aedc1.jpg)


# Mở đầu
Trong bài trước, mình đã giới thiệu cho các bạn những thao tác cơ bản với **Vim**, với hi vọng rằng các bạn sẽ có chút hứng thú với cái đồ chơi nay.
Và hôm nay mình sẽ bắt đầu xây dựng môi trường xung quanh để tạo hứng thú hơn trong việc thao tác với **Vim** nói riêng và command line unix nói chung

# Font chữ
Font chữ tương đối quan trọng, với mình thì mình dùng Fira Code trong khoảng 1 năm gần đây và rất ưng với nó. Còn tùy khẩu vị mỗi người mà các bạn có thể tự chọn cho mình font vừa ý. Ngoài ra đối với Terminal thì cần chú ý chọn font mono, đặc biệt là tiếp theo đây mình cần nerd font. Thế nên mình recommend các bạn trang web này để tìm font phù hợp với bản thân nhất

https://www.nerdfonts.com/font-downloads

# Terminal

Là một web developer, mình thường dành nhiều thời gian gõ gõ các câu lệnh. Vì thế, lựa chọn phần mềm hợp lý cũng tương đối quan trọng. Tiêu chí của mình là, giao diện đẹp, hỗ trợ font ligatures, đổi được line height cho chữ dễ nhìn, cross platform vì mình dùng cả windows-wsl và ubuntu. Ở thời điểm hiện tại thì có rất nhiều lựa chọn cho các bạn, có thể kể đến như [iTerm2](https://iterm2.com/) dành riêng cho macOS, [Windows Terminal](https://github.com/microsoft/terminal) dành riêng cho Windows, [Kitty](https://sw.kovidgoyal.net/kitty/overview/) dành cho các hệ máy Unix, [Alacritty](https://alacritty.org/) cross-platform khá được cộng đồng đánh giá cao. Bản thân mình đang dùng [WezTerm](https://wezfurlong.org/wezterm/index.html). Và trong series này, mình sẽ cài riêng [HyperJS](https://hyper.is/) để demo cho các bạn.

Nói thêm thì **HyperJS**, là một terminal được xây dựng trên [Electron](https://www.electronjs.org/) - NodeJS. Lý do mình chọn nó thì do nó dễ dàng config khi file config của nó là 1 file js export ra json, khá dễ chỉnh sửa, hỗ trợ connect tới WSL2 (do mình tải bản ubuntu22.04 chỉ hỗ trợ wsl2).
Các bạn có thể tìm hiểu kỹ hơn về từng config của từng loại terminal trong documentation tương ứng.

![image.png](https://images.viblo.asia/ed3315e4-3110-4e82-91d2-4a7738758d66.png)

Đây là terminal của mình với font `FiraMono NF`, lineHeight `2`, letterSpacing `1.5`, plugins `hyper-one-dark` (theme), `hyperline` (cái dòng system status phía dưới)

# Shell
Shell là phần giao diện mềm, giúp biên dịch cái chúng ta gõ cho kernel xử lý được và giao lại kết quả. Shell mặc định của ubuntu là **bash**. Và mình không thích dùng *bash* cho lắm. Mình suggest sử dụng **zsh** như là một sự lựa chọn thay thế. Ngoài ra nên tìm kiếm sử dụng 1 layer phía trên **zsh** với giao diện thân thiện hơn và cung cấp định nghĩa sẵn các alias tiện lợi. Các bạn có thể tham khảo [Oh my zsh](https://ohmyz.sh/) cùng các theme xịn xò của nó, ví dụ như [Power Level 10k](https://github.com/romkatv/powerlevel10k).

Mình thì muốn mì ăn liền nên sẽ cài đặt [ZimFW](https://zimfw.sh/) có sẵn highlight và auto suggestion đi kèm. Dưới đây là các câu lệnh để setup Shell, các bạn có thể tham khảo cho hệ điều hành tương ứng của bản thân

```bash
sudo apt update && sudo apt install zsh -y
```

```bash
zsh
```

Trong lần khởi chạy đầu tiên, **Zsh** sẽ đưa một số câu hỏi để mình config shell theo ý muốn. Mình sẽ chọn 0 để nó tạo ra 1 file `.zshrc` rỗng.

```bash
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```

Các bạn để ý nếu nó hỏi password để đổi shell mặc định từ `Bash` thành `Zsh` thì hãy nhập vào nhé, lỡ chẳng may ấn nhầm skip thì có thể dùng câu lệnh dưới đây để đổi

```bash
chsh -s $(which zsh)
```
Sau đó tắt terminal đi bật lại. Đôi khi mình xài ubuntu thì phải restart hẳn lại luôn thì lần mở terminal kế mới nhận default shell zsh

![image.png](https://images.viblo.asia/1f16d8bf-21db-4095-a6f1-aadc906c8e1e.png)


# Zoxide

Đây là một package siêu nhỏ, nhưng mình vẫn muốn dành cho nó một vị trí trong series của mình giới thiệu về nó. Các bạn có thể tìm thấy cách cài đặt (cực kỳ đơn giản) của nó tại đây https://github.com/ajeetdsouza/zoxide.  Do mình dùng **Ubuntu** và shell **Zsh** nên mình sẽ install bằng câu lệnh

```bash
curl -sS https://webinstall.dev/zoxide | zsh
```

Mở  `.zshrc` ra và thêm khai báo như nó yêu cầu
```bash
vim ~/.zshrc
```
Bạn nào chưa nhớ thì mở file xong gõ `GO` để nó xuống dòng dưới cùng, thêm dòng mới và vào Insert Mode, khi đó có thể paste hoặc gõ lại tùy các bạn nhé. Sau đó ấn `Esc` để về *Normal Mode*, rồi gõ `:wq` để lưu và thoát. Sau đó chúng ta cần khai báo path như lúc cài đặt nó có ghi và nạp lại zshrc
```bash
source ~/.zshrc
```

Về cơ bản, tất cả những gì các bạn cần làm là dùng `z` thay cho `cd` mặc định của shell. **Zoxide** ghi nhớ đường dẫn. Những lần sau đó bạn chỉ việc viết một đoạn có trong path tới vị trí bạn cần cd tới, là nó sẽ tự tìm kiếm kết quả path liên quan, có tần suất dùng nhiều nhất cho bạn.


![zoxide.gif](https://i.imgur.com/xTxNbu3.gif)

# Tổng kết

Vì mình thường xài **Vim** trực tiếp trên Terminal nên với bài viết này, mình hi vọng đã cho các bạn thấy môi trường mà mình sẽ dùng để thao tác với **Vim** nói riêng và CLI nói chung. Hẹn gặp lại các bạn ở những bài kế tiếp!