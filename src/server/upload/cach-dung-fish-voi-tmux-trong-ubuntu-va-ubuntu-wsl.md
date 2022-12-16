Bài viết này mình sẽ giới thiệu tới mọi người sự kiết hợp giữa Fish và Tmux trong công việc lập trình hàng ngày trên môi trường Ubuntu (đã test trên cả Ubuntu 18.04 WSL). Trong đó thì:
- Fish là một loại shell khá ngon
- Tmux là `terminal multiplexer`  mình chả biết dịch như nào cho hợp lý, thôi cứ gọi là chung là terminal vậy.

Để tạo ra một terminal có giao diện như này:

![](https://images.viblo.asia/634dc790-fdd4-47f2-8e96-1282a0999d1f.gif)

## Tại sao mình lại dùng Fish và Tmux?

Phải thừa nhận là Oh My Zsh đã là một sự lựa chọn tuyệt vời khi mình dùng Ubuntu. Ấy dẫu là thế nhưng đời lại trớ trêu thay, sau khi [cài đặt WSL / WSL2 trên Windows 10 để code như trên Ubuntu](https://viblo.asia/p/cai-dat-wsl-wsl2-tren-windows-10-de-code-nhu-tren-ubuntu-4P856oM1KY3) thì ngay khi bắt đầu sử dùng đã mình bị dính ngay quả issue *Command line bị lag khi hoạt động với thư mục được mount vào distro của WSL2*. Mình đã không nghĩ là bug của WSL2 mà cho rằng vấn đề nằm ở ZSH. Vậy là mình đã chuyển qua dùng Fish Shell thay thế... và vẫn bị bug trên. Nhưng mình vẫn quyết định sử dụng tiếp Fish để trải nghiệm.

Còn với Tmux, cũng do distro Ubuntu 18.04 đã cài sẵn Tmux nên mình sử dụng luôn cho tiện. Công nhận nó khá tiện lợi ngoại trừ duy nhất một điểm mình chưa hài lòng về việc copy nội dung trên nhiều dòng trên màn hình.

![](https://images.viblo.asia/26988680-8d72-4b32-9376-9c0d6a21c011.png)

Ví dụ như ảnh trên, mình muốn copy nội dung 4 dòng ở pane bên phải, sau khi select rồi copy thì kết quả lại ra như này:

![](https://images.viblo.asia/e503dc9c-cb73-4cf0-b9ac-491fd0bf2b1f.png)

Tuy nhiên nó không phải vấn đề lớn lắm và vẫn có cách khắc phục được :D

Nếu bạn đang làm DevOps, thao tác hàng ngày với server và có nhiều script riêng của bản thân với bash thì có lẽ bạn không nên chuyển qua Fish vì cú pháp của fish có nhiều điểm khác so với Bash/ZSH. Do vậy, nếu muốn chuyển qua Fish thì sẽ phải convert lại các script, alias cũ sang syntax của fish.

## Ưu điểm Fish và Tmux

### Ưu điểm Fish

Đối với Fish, đúng như tìm hiểu trước đó:
- Fish thì thật dễ dàng cài đặt thông qua command line
- Fish tích hợp sẵn tab completion, autosuggestion và syntax highlighting nên việc setup khá nhanh
- Fish có Oh My Fish, cũng là một framework tương tự như Oh My ZSH, nhưng lại dễ dàng sử dụng hơn Oh My ZSH
- Theo cảm quan của cá nhân mình thì độ trễ khi dùng Fish có vẻ giảm hơn so với ZSH
- Config fish qua giao diện UI trên web
- Support `alias`  và `abbreviations`

![](https://images.viblo.asia/d9ac19eb-2151-4d73-9316-6ee8d386ed1a.png)
![](https://images.viblo.asia/2a24491a-8365-471e-a47d-e220d6736f66.png)


### Ưu điểm Tmux

Còn với Tmux, một số ưu điểm:
- Cài đặt dễ dàng thông qua command line
- Hỗ trợ multi-pane, multi-windows giúp dễ dàng chia màn hình thành nhiều pane
- Hỗ trợ multi-session, có thể attach lại vào session trước đó để tiếp tục. Ví dụ như trên Windows, nếu mình tắt terminal Ubuntu 18.04, thì các process trong session trước vẫn chạy, và mình có thể tiếp tục. Hay nếu SSH vào server, nếu mình chạy một lệnh lâu quá rồi bị ngắt kết nối, thì tmux vẫn sẽ tiếp tục giữ cho command đó được tiếp tục chạy.
- Có thêm thanh status bar nho nhỏ nhưng tiện lợi giúp mình có thể hiển thị thêm các thông tin như: Battery, Time, Username / Hostname (hữu ích khi ssh lên server)
- Có các tổ hợp phím tắt để sử dụng như chia màn hình, chuyển focus giữa các vùng..

## Cài đặt

Dưới đây là command để cài đặt Fish / Oh My Fish, Tmux trên Ubuntu 18.04 (đã test cả Ubuntu 18.04 và distro Ubuntu 18.04 WSL).

### Cài đặt Tmux

```bash
# Install tmux:
sudo apt-get install tmux

# Launch tmux:
tmux
```

Sau khi cài đặt bạn sẽ thấy là Tmux không có icon để chạy nó lên mà phải mở một terminal rồi chạy lệnh `tmux` để launch. Với Ubuntu bạn dùng luôn `"Terminal"` hoặc bất cứ cái nào khác. Với Ubuntu WSL thì bản thân nó đã là một cái terminal rồi. Bạn chỉ cần chạy Ubuntu WSL lên và gõ `tmux`.

Bây giờ, chạy thử tmux sẽ có giao diện mặc định như này:

![](https://images.viblo.asia/30db274a-00c4-463a-b23e-e8e94161c8d5.jpg)

Nếu muốn bớt nhàm chán hơn, chúng ta clone config  [Oh My Tmux](https://github.com/gpakosz/.tmux) này về dùng nữa:

![](https://images.viblo.asia/45389fd3-471a-48f7-9a49-abde9ebdd478.png)

```bash
# Install Oh My Tmux
cd ~
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
cp .tmux/.tmux.conf.local .
```


### Cài đặt Fish / Oh My Fish

Lưu ý là bạn nên cài Fish 3 vì nó có nhiều cải tiến hơn so với Fish 2. Cài đặt như sau:

```bash
# Install Fish
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt-get update
sudo apt-get install fish

# Install Oh My Fish
curl -L https://get.oh-my.fish | fish

# Test
fish --version

# Đặt Fish làm shell mặc định
chsh -s $(which fish)
```

## Cách dùng Fish

### Chạy Fish shell

Đặt Fish làm shell mặc định cho terminal:

```bash
chsh -s $(which fish)
```

Hoặc không thì chạy lệnh sau để dùng thử fish 1 lần :)

```bash
fish
```

### Tùy chỉnh Fish shell

Lưu các tùy chỉnh cho fish vào file `~/.config/fish/config.fish`, chức năng tương tự như như file `~/.bashrc` hăy `~/.zshrc` vậy.

Ví dụ như:

```bash:~/.config/fish/config.fish
# Set vim as Editor:
set -gx EDITOR vim

# Set $PATH to load binary:
set -gx PATH $PATH ~/.fnm ~/.yarn/bin ~/.composer/vendor/bin

# Auto open TMUX with base session:
if not set -q TMUX
    set -g TMUX tmux new-session -d -s base
    eval $TMUX
    tmux attach-session -d -t base
end

# ...
```

Ngoài ra, có thể tùy chỉnh fish thông qua công cụ `fish_config` được tích hợp sẵn. Một website sẽ được chạy lên sau khi chạy command:

```bash
fish_config
```

![](https://images.viblo.asia/57a026c1-a7c5-4b30-8126-9a5af173625f.png)
![](https://images.viblo.asia/b3b909e1-2633-4d58-a567-b5a8fb3ba531.png)

Giao diễn khá dễ dùng và tiện lợi, bạn có thể tìm hiểu thêm nhé: Từ màu sắc, theme, dấu nhắc lệnh, function, environment variable, lịch sử command đã dùng...

### Sử dụng Alias / abbreviations

Bạn có thể tạo các câu lệnh tắt cho command line của bản thân. Ví dụ, thay vì gõ:

```bash
docker exec -it web_server sh
```

thì sẽ gõ:

```bash
dke web_server sh
```

Trong đó, alias và abbreviations đều chung mục đích. Nhưng abbreviations khác alias đó là khi bạn gõ lệnh tắt `dke` ở trên rồi gõ các thì fish sẽ tự generate ra full command đã được config. Ví dụ như này:

![](https://images.viblo.asia/dacc7f39-eeac-4abd-8339-4fc9fc4bf4ec.gif)

Cách định nghĩa một alias và abbreviations cũng khác nhau một chút. Cụ thể như sau:

```bash:~/.config/fish/config.fish
# Define abbreviations:
 alias dklo "docker logs"

# Define alias:
abbr dkps="docker ps --format '{{.ID}} ~ {{.Names}} ~ {{.Status}} ~ {{.Image}}'"
```

Cá nhân mình thì thích abbr, còn bạn thì sao? Comment phía dưới bài viết nhé. Cách dùng thì như nhau, chỉ cần chạy lệnh tắt:

```bash
dkps
dklo 
```

### Fish vs Bash

Một số tính năng của fish có cú pháp khác với bash chẳng hạn như:

- Tạo environemnt variable:
```bash
# bash / zsh
export CHANNEL=develop

# fish
set CHANNEL develop
```
- Sử dụng command substitution:
```bash
# bash
docker stop $(docker ps -q)

# fish
docker stop (docker ps -q)
```
- Loop:
```bash
# bash
for i in $(seq 3); do echo $i; done;

# fish
for i in (seq 3); echo $i; end;
```

> - Nếu dùng environemnt variable cho một lần thì fish vẫn có syntax giống các shell khác:
> ```bash
> CHANNEL=develop TAG=v1.0.0 echo $CHANNEL $TAG
> ```

 Vậy nên vẫn như ở trên, nếu bạn đang thao tác hàng ngày với server và có nhiều script riêng của bản thân thì có lẽ bạn không nên chuyển qua Fish vì cú pháp của fish có nhiều điểm khác so với Bash/ZSH. Do vậy, nếu muốn chuyển qua Fish thì sẽ phải convert lại các script, alias cũ sang fish.
 
 ### Sử dụng Oh My Fish
 
 - Xem danh sách các theme/plugin đã cài:
```bash
omf list
```

![](https://images.viblo.asia/0c0236eb-c2de-453d-9311-ddb54aa935a0.png)

- Xem danh sách theme mà chúng ta có thể cài luôn:
```bash
omf theme
```

![](https://images.viblo.asia/0c0236eb-c2de-453d-9311-ddb54aa935a0.png)

- Cài đặt hoặc gỡ bỏ theme / plugin:
```bash
omf install <tên theme / tên plugin>
omf uninstall <tên theme / tên plugin>

# Install plugin bang-bang
omf install bang-bang
omf uninstall bang-bang

# Install theme 'gitstatus'
omf install gitstatus
omf uninstall gitstatus
```

Ngoài ra có thể tham khảo thêm tại Github của [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish)

## Sử dụng Tmux / Oh My Tmux

### Chạy tmux

Về Tmux, để chạy tmux lên chúng ta thực hiện lệnh `tmux` thôi là được. Mở Terminal hoặc Ubuntu WSL terminal sau đó chạy lệnh `tmux`. 

```bash
tmux
```

### Tạo một window mới kèm sesison cụ thể

Trong Tmux có khái niệm Window, Pane và Session. Trong đó, session sẽ là một phiên làm việc. Nếu session chưa bị kill mà chẳng may lỡ tay tắt terminal đi thì khi bật lại terminal bạn lại thấy các process đang chạy trong session đấy vẫn còn như trước khi tắt. Còn window là một cửa số hiển thị. Là cái to nhất, bên trong window thì chúng ta có thể chia nhỏ ngang dọc thành nhiều `pane` tùy ý.

```bash
# Tạo một window mới dưới session có tên là `base`
tmux new -s base
```

Nhưng chả nhẽ mỗi lần đều phải bật terminal rồi gõ `tmux` như này à? Câu trả lời là không, dưới đây là script config cho Fish mà mình dùng để tự động bật Tmux và attach vào session có tên là `base`. Rất tiện lợi phải không nào! ^^

```bash
# Auto open TMUX with base session:
if not set -q TMUX
    set -g TMUX tmux new-session -d -s base
    eval $TMUX
    tmux attach-session -d -t base
end
```

### Tổ hợp phím tắt thông dụng của Tmux / Oh My Tmux

Tmux hỗ trợ tổ hợp phím tắt rất đầy đủ. Toàn bộ phím tắt đều dưới dạng:
```bash
<prefix> + <hot key>
```

Trong đó prefix là `Ctrl + B`, tổ hợp key binding thông dụng của Tmux / Oh My Tmux gồm:

| Key Binding | Chức năng |
| -------- | -------- |
| `<prefix>  + m`     | Bật / tắt chế độ sử dụng chuột     |
| `<prefix>  + "` hoặc `<prefix> + -`     | Tách đôi pane hiện tại theo chiều dọc    |
| `<prefix>  + %` hoặc `<prefix> + _`     | Tách đôi pane hiện tại theo chiều ngang    |
| `<prefix>  + j`, `<prefix> + k`    | Chuyển focus qua pane khác theo chiều dọc (`j` - dưới, `k` - trên)     |
| `<prefix>  + h`, `<prefix> + l`    | Chuyển focus qua pane khác theo chiều ngang (`h` - trái, `l` - phải)    |
| `<prefix>  + H`, `<prefix> + L`,  `<prefix> + J`, `<prefix> + K`     | Dịch chuyển pane qua trái / phải / dưới / trên một tẹo    |
| `<prefix>  + c`     | Mở một window mới trong tmux    |
| `<prefix>  + Ctrl-C`     | Mở một window mới trong tmux với session mới    |
| `<prefix>  + $`     | Đổi tên session hiện tại     |
| `<prefix>  + l`     | Xóa dữ liệu đang hiển thị trên màn hình hiện tại + tmux history     |
| `<prefix>  + ,`     | Đổi tên của window hiện tại     |
| `<prefix>  + w`     | Xem danh sách window đang mở     |
| `<prefix>  + s`     | Xem danh sách session đang chạy     |
| `<prefix>  + z`     | Zoom pane hiện tại ra full màn hình     |

> Tips:
> - Nếu bật mouse mode, chúng ta có thể sử dụng chuột để chọn pane cần focus vào bằng cách click chuột trái.
> - Sử dụng mouse mode khi select đoạn text cần copy thì phải nhấn giữ phím `shift`
> - Khi chuyển focus giữa các pane thì có thể nhấn nhanh các hot key, ví dụ `<prefix> jl` - Chuyển qua pane bên dưới rồi chuyển tiếp qua pane ở bên phải
>- Khi copy không đúng format xuống dòng, nhấn `<prefix> z` để zoom toàn màn hình rồi mới copy thì sẽ không bị lỗi.

## TL;DR

Trên đây là phần những chia sẻ của mình về cách sử Tmux + Fish trong công việc. Hy vọng sẽ giúp ích các bạn nhiều để tạo terminal nhẹ, đẹp và thuận tiện trong công việc hàng ngày. Mọi thắc mắc trợ giúp vui lòng comment xuống dưới bài viết này để được hỗ trợ. Đừng quên upvote và follow mình nếu bạn thấy các bài viết của mình hữu ích với bạn nha. Cảm ơn và hẹn gặp lại! ^^

## Reference

- https://github.com/fish-shell/fish-shell
- https://github.com/oh-my-fish/oh-my-fish
- https://linuxize.com/post/getting-started-with-tmux/
- https://github.com/gpakosz/.tmux
- [Cài đặt WSL / WSL2 trên Windows 10 để code như trên Ubuntu](https://viblo.asia/p/cai-dat-wsl-wsl2-tren-windows-10-de-code-nhu-tren-ubuntu-4P856oM1KY3)

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***