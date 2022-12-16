Chắc hẳn với những developers chúng ta đều quen thuộc với bash shell mặc định của Ubuntu, đồng ý rằng nó rất tiện lợi và mạnh mẽ nhưng nó có phần hơi bị nhàm chán. Sau đây mình sẽ hướng dẫn các bạn làm cho terminal của chúng ta đẹp đẽ và mạnh mẽ hơn theo cách đơn giản và dễ hiểu nhất :D 
![](https://images.viblo.asia/5f5065f9-c556-4cfd-8c92-102e2153a98d.png)

Terminal trên Ubuntu budgie với theme agnoster 
# Giới thiệu qua
## Zsh
> Zsh là chữ viết tắt của Z-shell, được giới thiệu lần đầu tiên vào năm 1990 bơi Paul Falstad. Zsh là phiên bản mở rộng của bash shell, và nó được thêm rất nhiều chức năng và tiện ích. 
## Oh-my-zsh!
Là một frameworks giúp quản lý cấu hình zsh. Nghe có vẻ hơi nhàm chán ha, nhưng một khi cài Oh-my-zsh! vào thì bạn sẽ có thể sử dụng hơn 200 plugins (rails, git, OSX, hub, capistrano, brew, ant, php, python, etc) và hơn 140 themes có sẵn, trong đó có theme agnoster mình đang dùng.

Github repo: https://github.com/robbyrussell/oh-my-zsh
# Cài đặt 
## 1. Cài đặt zsh
```
sudo apt-get install zsh
```

Sử dụng zsh làm default shell
```
chsh -s $(which zsh)
```
Sau khi chạy lệnh này thì bạn nên log out rồi vào lại.

## 2. Cài đặt Oh-my-zsh!
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
Lưu ý sau khi cài thì các bạn cần phải chuyển các biến path trong bashrc sang zshrc bằng cách vào trong `~/.zshrc` và xóa dòng comment `export PATH=$HOME/bin:/usr/local/bin:$PATH`

Nếu bạn sử dụng RVM thì thêm dòng `[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" `  vào cuối file.
## 3. Cài đặt Powerline fonts 
Để thêm mắm thêm muối cho CLI bằng màu sắc và icon thì bạn nên cài đặt powerline fonts (nhiều themes bắt buộc cài powerline fonts) 

Github: https://github.com/powerline/fonts
```
sudo apt-get install fonts-powerline
```
## 4. Tùy chỉnh themes
Oh-my-zsh! có rất nhiều themes cho bạn lựa chọn, các bạn có thể vào link [này](https://github.com/robbyrussell/oh-my-zsh/wiki/themes) để lựa chọn theme phù hợp với mình. 
Ở đây mình sẽ hướng dẫn với theme agnoster.

Chúng ta sẽ chỉnh sửa file ~/.zshrc, ở đây mình dùng vscode để chỉnh, các bạn có thể dùng nano hay sublime hay editor gì cũng được.
```
code ~/.zshrc
```

Tìm dòng `ZSH_THEME` và gán cho nó giá trị bằng "agnoster" sau đó lưu lại và khởi động lại terminal.

Các bạn có thể thay đổi colorscheme của terminal sang Solarized Dark để nhìn xịn hơn bằng cách chọn prefences trong terminal, chọn profile, chuyển sang tab color và chọn colorscheme là Solarized Dark.
## 5. Một số plugins nên dùng 
Các bạn có thể xem tất cả các plugins mặc định ở [đây](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins). Để dùng các plugins này thì bạn chỉ việc thêm tên của plugins vào trong mục `plugins` trong file `~/.zshrc` 
### Zsh-syntax-highlighting 
Nghe tên chắc các bạn cũng đoán thằng này dùng để làm gì rồi.

![](https://images.viblo.asia/c2791ab1-d538-4f63-b3be-0e868f81eae9.png)

Nó dùng để highlight các lệnh mà bạn dùng trong terminal để tiện phân biệt tên lệnh và tham số truyền vào.
1. Clone this repository in oh-my-zsh's plugins directory:

    ```zsh
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    ```

2. Activate the plugin in `~/.zshrc`:

    ```zsh
    plugins=( [plugins...] zsh-syntax-highlighting)
    ```

3. Restart zsh (such as by opening a new instance of your terminal emulator).
### Zsh-autosuggestions
Plugin này sẽ suggest lệnh dựa trên lịch sử các câu lệnh mà bạn gõ, mình khuyên các bạn nên dùng thằng này vì nó giúp tiết kiệm rất nhiều thời gian. 
![](https://images.viblo.asia/739feff3-5a02-4c32-b843-0b662c3fd9be.png)
1. Clone this repository into `$ZSH_CUSTOM/plugins` (by default `~/.oh-my-zsh/custom/plugins`)

    ```sh
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    ```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

    ```sh
    plugins=(zsh-autosuggestions)
    ```
Ngoài ra còn nhiều plugins khác mà các bạn có thể tìm hiểu thêm, tuy nhiên không nên dùng quá nhiều vì nó sẽ làm chậm tốc độ khởi động của terminal.

## 6. Thay console font trong IDE/editors để sử dụng powerline
Hiện tại khi các bạn mở terminal bên trong ide/editors như rubymine hay vscode thì nó sẽ bị lỗi các icon như này
![](https://images.viblo.asia/fb278075-931d-4e3a-ae4b-9169db89570b.png)

Chúng ta cần sử dụng font powerline thay cho font mặc định của editor. Các bạn có thể search với từ khóa tên font + powerline trên google để kiếm font phù hợp với mình. Ở đây thì mình dùng font Meslo, tải xuống ở [đây](https://github.com/powerline/fonts/blob/master/Meslo%20Slashed/Meslo%20LG%20M%20Regular%20for%20Powerline.ttf). Các bạn tải rồi cài đặt font vào máy bằng cách mở file lên và bấm install.

### Với VSCode
Chúng ta thêm dòng `"terminal.integrated.fontFamily": "Meslo LG M DZ for Powerline"` vào trong Settings, với giá trị là tên font mà bạn dùng. Sau đó lưu lại và chạy lại terminal trong VSCode các bạn sẽ không bị lỗi nữa.

![](https://images.viblo.asia/9422334f-8d4c-49b1-9a30-e47ed2ae4872.png)

### Với RubyMine

Các bạn vào File > Settings > Editor > Console font, bỏ tick ở mục Show only monospaced font và chọn tên powerline font bạn dùng.
![](https://images.viblo.asia/4551be92-9f8d-4405-87bf-d5cedf0427f4.png)

# Lời kết
Hi vọng sau bài hướng dẫn này thì các bạn có thể tùy chỉnh lại terminal theo ý thích của mình, cá nhân hóa những thứ chúng ta hay dùng sẽ giúp ta cảm thấy có thêm hứng thú, bớt nhàm chán và làm việc hiệu quả hơn. 

Nguồn tham khảo: 

http://iot2vn.com/zsh-la-gi-co-nen-dung-zsh-thay-cho-bash/

https://medium.com/wearetheledger/oh-my-zsh-made-for-cli-lovers-installation-guide-3131ca5491fb