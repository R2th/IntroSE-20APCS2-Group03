## Giới thiệu chung

Sau khoảng thời gian làm việc trên Ubuntu, có quá nhiều lệnh bạn phải nhớ, hoặc đôi khi bạn phải thực hiện đi thực hiện lại nhiều lần, giá như terminal ngoài `auto-complete` mà có thể suggest được lệnh cho chúng ta thì tốt biết mấy. Bài viết này giúp bạn giải quyết điều đó!

Về mình, thực ra mình là một thằng Developer khá đơn giản :D nên mình thích mọi thứ cũng đơn giản, rộng rãi và thoáng đãng. Cũng bởi lẽ đó nên ngay từ khi bắt đầu sử dụng Ubuntu để làm việc, mình đã yêu thích Terminal mặc định của nó; ngay từ khi nhìn cái logo đơn giản nhưng không kém phần bắt mắt.

Để làm được việc suggest lệnh thì với `/bin/bash` là không đủ, chúng ta cần đổi bộ `shell` mặc định này sang một thằng khác mạnh mẽ hơn đó là `Z-Shell` hay còn gọi là `zsh`.

Đi kèm `zsh` có một framework đó là `oh-my-zsh` support mọi thứ từ theme, command line prompts, auto suggestions, .etc. Trong bài mình sẽ hướng dẫn mọi người cài đặt `zsh` và `oh-my-zsh` trên Ubuntu 18.04, tích hợp plugin `zsh-autosuggestions` cho `oh-my-zsh` để terminal có thể tự động suggest lệnh cho chúng ta. Hãy cùng bắt đầu nhé!

## Cài đặt zsh

Cài đặt trực tiếp `zsh` thông qua `apt-get` như sau:

```bash
$ sudo apt-get install zsh -y

Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  zsh-common
Suggested packages:
  zsh-doc
The following NEW packages will be installed:
  zsh zsh-common
0 upgraded, 2 newly installed, 0 to remove and 126 not upgraded.
Need to get 4,066 kB of archives.
```

Kiểm tra xem đã cài đặt thành công chưa:

```bash
$ which zsh

/usr/bin/zsh
```

Trên máy mình, `zsh` vừa được cài đặt và store tại đường dẫn `/usr/bin/zsh`. Như vậy là chúng ta đã cài đặt thành công nhé, nhưng đừng vội vã sử dụng. Nếu bạn chạy nó luôn bây giờ thì cần phải config một tỉ thứ loằng ngằng bắt đầu như này:

![](https://images.viblo.asia/1ab85844-5bc2-4014-9377-152a58b73d74.png)

Nếu lỡ chạy, bạn nhập `q` và nhấn enter để thoát cài đặt nhé. Sau khi thoát nó sẽ hiển thị như này trên terminal, bạn đừng lo lắng, cứ nhập lệnh bình thường nhé:

```bash
webee-srv1%
```

## Cài đặt oh-my-zsh

Bây giờ chúng ta cài đặt `oh-my-zsh`, là một framework cho `zsh` sẽ giúp mình cài đặt nhiều thứ như theme, PS1 prompts:

```bash
$ sudo curl -L http://install.ohmyz.sh | sh

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0   115    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100  8445  100  8445    0     0  11170      0 --:--:-- --:--:-- --:--:-- 11170
Cloning Oh My Zsh...
Cloning into '/home/kimnh/.oh-my-zsh'...
remote: Enumerating objects: 1136, done.
remote: Counting objects: 100% (1136/1136), done.
remote: Compressing objects: 100% (1101/1101), done.
remote: Total 1136 (delta 22), reused 938 (delta 17), pack-reused 0
Receiving objects: 100% (1136/1136), 739.38 KiB | 1.27 MiB/s, done.
Resolving deltas: 100% (22/22), done.

Looking for an existing zsh config...
Using the Oh My Zsh template file and adding it to ~/.zshrc.

         __                                     __
  ____  / /_     ____ ___  __  __   ____  _____/ /_
 / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / /
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/
                        /____/                       ....is now installed!


Please look over the ~/.zshrc file to select plugins, themes, and options.

p.s. Follow us on https://twitter.com/ohmyzsh

p.p.s. Get stickers, shirts, and coffee mugs at https://shop.planetargon.com/collections/oh-my-zsh

Run zsh to try it out.
```

Thoát terminal hiện tại và mở lại terminal mới để thưởng thức giao diện mới:

```bash
[12:13] kimnh@webee-srv1 ~  $ zsh
➜  ~
```

![](https://images.viblo.asia/34c1424e-8036-4409-adad-116f4ba9f0d6.png)

Mình phải thực hiện chạy `zsh` để bắt đầu bật và dùng, để set nó làm mặc định, bạn chạy lệnh sau:

```bash
$ chsh -s $(which zsh)
Password:
```

Lại thực hiện khởi động lại. ZSH được tự động bật.

![](https://images.viblo.asia/caf7ad1c-56c0-4403-8830-903c199c3480.png)


## Cài đặt zsh-autosuggestions

Cài đặt plugin `zsh-autosuggestions`, giúp tự động suggetions các lệnh mà mình đã dùng:

```bash
$ git clone git://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

Cloning into '/home/kimnh/.oh-my-zsh/custom/plugins/zsh-autosuggestions'...
remote: Enumerating objects: 2385, done.
remote: Total 2385 (delta 0), reused 0 (delta 0), pack-reused 2385
Receiving objects: 100% (2385/2385), 541.32 KiB | 844.00 KiB/s, done.
Resolving deltas: 100% (1531/1531), done.
```

Theo như mình đọc các bài viết tham khảo trên Viblo thì chúng ta kích hoạt plugin bằng lệnh sau:

```bash
➜  ~ plugins=(zsh-autosuggestions)
```

Cơ mà mình làm 4 lần trên cả 4 con server + 1 PC cũng đều không thấy plugin này nó hoạt động. Dù có khởi động lại terminal, hay là restart máy.

Cách giải quyết đó là bạn thêm dòng sau vào cuối file `~/.zshrc` để kích hoạt plugin `zsh-autosuggtestions` lên:

```bash:~/.zshrc
➜  ~ vi ~/.zshrc
...
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
```

Lưu lại và khởi động lại terminal và tận hưởng:

![](https://images.viblo.asia/6b1c0b92-e735-49d5-960d-a3f3fbd582ac.png)

Khi suggestion hiện ra, nếu bạn muốn dùng luôn suggestion đấy thì nhấn nút: Up Arrow (mũi tên đi lên) để chọn. Tuy nhiên cá nhân mình thấy dùng phím này khá bất tiện với các bàn phím dạng Full, Lite phổ thông bởi thường vị trí nút này ở ngoài vùng soạn thảo chính (A-Enter). Do đó, mình sẽ custom sang tổ hợp `Shift + Enter` để chọn suggestion. Bản thân mình thấy nó tiện hơn vì khi muốn thực thi luôn suggestion sau khi chọn thì tương đương `Shift + Enter + Enter`. :D

```bash:~/.zshrc
➜  ~ vi ~/.zshrc

source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh

## Add shortcut "Shift + Enter"
bindkey '^[OM' autosuggest-accept
```

## Tổng kết

Như vậy, mình đã thực hiện xong việc hướng dẫn cài đặt `zsh` và `zsh-autosuggestions` để việc sử dụng terminal trong công việc bớt nhàm chán hơn. Nếu bạn không thích Terminal mặc định trên Ubuntu, bạn có thể sử dụng một số terminal sau như:
- Terminator
- KDE Konsole -> MÌnh thích thằng này vì nó đơn giản giống Terminal, nhưng có thêm cả Split view:

```bash
sudo apt-get install konsole
```

Ở chế độ Split View của Konsole sẽ như này, tất nhiên bạn có thể chia dọc màn hình:

![](https://images.viblo.asia/e6ec2cd8-17cd-4a4e-8b04-3453c09db30b.png)

## P/S

**P/S:** Nếu bạn đã thực hiện đầy đủ các bước trên nhưng khi nhấn khi mở `Terminal` của Ubuntu mà vẫn không thấy giao diện của `zsh` được tự động kích hoạt thì hãy làm thêm bước sau cho `Terminal`:
- Mở `Terminal` (Ctrl+Alt+T)
- Ediit > Preferences, chọn tab Command ở bên phải
- Tích chọn *Run a custom command instead of my shell*, điền */usr/bin/zsh* vào ô `Custom Command` phía ngay dưới
- Nhấn Close rồi tắt bỏ Terminal và mở lại là sẽ được

![](https://images.viblo.asia/7924d53b-fa70-4c08-a0f7-aff395fc1523.png)

Nếu muốn cài đặt Konsole hay một cái khác làm terminal mặc đinh, bạn chạy lệnh sau trên Ubuntu:

```bash
➜  ~ sudo update-alternatives --config x-terminal-emulator 
There are 6 choices for the alternative x-terminal-emulator (providing /usr/bin/x-terminal-emulator).

  Selection    Path                             Priority   Status
------------------------------------------------------------
* 0            /usr/bin/gnome-terminal.wrapper   40        auto mode
  1            /usr/bin/gnome-terminal.wrapper   40        manual mode
  2            /usr/bin/koi8rxterm               20        manual mode
  3            /usr/bin/konsole                  40        manual mode
  4            /usr/bin/lxterm                   30        manual mode
  5            /usr/bin/uxterm                   20        manual mode
  6            /usr/bin/xterm                    20        manual mode

Press <enter> to keep the current choice[*], or type selection number: 3
```

Chọn terminal bằng cách nhập các số tương ứng. Của mình Konsole tương ứng là 3.

Hy vọng bài viết này sẽ là tiền đề để các bạn dần biết cách tùy biến Terminal của mình sao cho phù hợp. Ví dụ như cài thêm plugin [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) nữa chẳng hạn. :thinking:

Chúc các bạn thành công!

## New update

Phần update này mình xin tổng hợp thêm một vài comment hay ho từ cộng đồng anh em Viblo đã suggest phía dưới. Rất cảm ơn mọi người vì sự chia sẻ:

> bạn nào sau khi chạy `chsh -s $(which zsh)` rồi khởi động lại terminal mà vẫn shell cũ thì ` logout rồi login lại máy ` là ok nhé

> A đã từ bỏ zsh và dùng fish

> zsh mỗi lần update version là xóa hết history của terminal

> Em thì trước có dùng Oh My Zsh, xong sau này đổi sang những cái alternative nhẹ nhanh hơn như là [prezto](https://github.com/sorin-ionescu/prezto) hay [zimfw](https://github.com/zimfw/zimfw). Đặc biệt là zimfw khởi động [chỉ mất một nửa thời gian](https://github.com/zimfw/zimfw/wiki/Speed) so với Oh My Zsh. Mặc định khi cài zim là đã có sẵn syntax highlight, suggestion, auto completion đầy đủ và việc cài/gỡ module rất đơn giản. Nên mọi người có thể thử dùng và cảm nhận nhé :D

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***