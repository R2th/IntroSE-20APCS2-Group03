Xin chào các mọi người, như đã ghi ở tiêu đề thì hôm nay mình xin phép giới thiệu tới các bạn một số tip nhỏ để custom `command prompt` để thêm `git branch` vào `command` và custom một chút color cho rực rỡ. :vulcan_salute: 

Như các bạn đã biết, Zsh là một trình Shell cực mạnh, nó là phiên bản mở rộng của bash shell và đã được thêm nhiều chức năng và tiện ích. Phải kể đến thư viện phổ biến với developer đó chính là [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
Với `oh-my-zsh` thì bạn có thể được hỗ trợ về giao diện rất nhiều và hỗ trợ gõ tắt câu lệnh, ví dụ như bình thường thì 
```shell
$ git branch
```
thì nó thành
```shell
$ gb
```
hay là câu lệnh rất đỗi quen thuộc mà dài dòng đó là
```shell
$ git push origin branch-name -f
```
và nó thành 
```shell
$ ggf
```
Và đây là chi tiết các câu lệnh viết tắt đầy đủ nhất trong `oh-my-zsh`: https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git
Và một điểm nữa mà mình cực thích ở `oh-my-zsh` đó chính là hiển thị tên của branch của git lên `command prompt` nhìn rất tiện và tránh được nhầm lẫn rằng nghĩ đang ở branch này nhưng thực thế lại ở branch khác.
Tuy nhiên bài viết hôm này mình lại không đề cập đến sử dụng `zsh` như thế nào mà mình sẽ hướng dẫn các bạn làm thế nào để hiện tên của branch lên `command prompt` như thế nào.
Mình sẽ đi theo từng bước một như sau:

1. **Add name branch to command prompt**
2. **Custom color**
3. **Change color by status branch**

### Add name branch to command prompt
Chắc hẳn một số người đã từng biết đến `.bashsrc` và cũng có người chưa biết đến nên mình xin mạn phép điểm lại chút `.bashsrc`  là một shell script, nó được `bash` gọi ngay sau khi bash `start` nói một cách dễ hiểu là file script config để hiển thị ra bash. Vì vậy mà chúng ta sẽ làm việc trực tiếp với file này để sửa cái mình cần nhé ;)
Đầu tiên thì chúng ta mở file `.bashsrc` này lên nhé, chúng ta có thể sử dụng nano, vim, subl, hay là gedit cho dễ dàng cũng được
```shell
$ sudo <name_explorer> ~/.bashrc
```
và sau đó add đoạn này vào dòng bất kỳ của file nhẽ, và dĩ nhiên là phải riêng ra nhé, :v: 
```shell
git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

export PS1="[\u@\h \W]\$(git_branch)\$ "
```
![](https://images.viblo.asia/c622ac93-d01a-4e24-9046-ff6a24f717f0.png)

Như chúng ta có thể thấy thì


| Ký hiệu | Giải thích  |
| -------- | -------- |
| \u     | Tên người dùng    |
| \h    | Tên thiết bị   |
| \W    | Thư mục hiện tại    |
| git_branch    |Gọi function để lấy tên branch   |
Nhìn sơ qua thì chúng ta có thể thấy khá là đầy đủ để làm việc rồi, tuy nhiên nó lại chưa được đẹp cho lắm thì chúng ta sẽ cùng đến với bước 2 để thêm corlor cho `command prompt` nhé. (go)

### Custom color
Để thêm color thì mình cần đến mã màu của shell scrip
```shell
'\[0;30m' # Black - Regular
'\[0;31m' # Red
'\[0;32m' # Green
'\[0;33m' # Yellow
'\[0;34m' # Blue
'\[0;35m' # Purple
'\[0;36m' # Cyan
'\[0;37m' # White
'\[1;30m' # Black - Bold
'\[1;31m' # Red
'\[1;32m' # Green
'\[1;33m' # Yellow
'\[1;34m' # Blue
'\[1;35m' # Purple
'\[1;36m' # Cyan
'\[1;37m' # White
'\[4;30m' # Black - Underline
'\[4;31m' # Red
'\[4;32m' # Green
'\[4;33m' # Yellow
'\[4;34m' # Blue
'\[4;35m' # Purple
'\[4;36m' # Cyan
'\[4;37m' # White
'\[40m'   # Black - Background
'\[41m'   # Red
'\[42m'   # Green
'\[43m'   # Yellow
'\[44m'   # Blue
'\[45m'   # Purple
'\[46m'   # Cyan
'\[47m'   # White
'\[0m'    # Text Reset
```
Thì tùy vào sự lựa chọn của bạn mà bạn custom color theo format sau đây:
```shell
export PS1="[\u@\h \W]\[\033[01;31m\]\$(git_branch)\[\033[00m\$ "
```
`[01;31m\` chúng ta có thay thế màu vào chỗ này

result:
![](https://images.viblo.asia/a60fcec3-1a88-406f-a86f-daff001e9d88.png)
Tiện tay thì mình nhét màu luôn vào cả user name, device name, and workplace

![](https://images.viblo.asia/8e5cf1ae-be53-4f5a-9c94-00208c13bec8.png)
code: 

```shell
export PS1="[\[\033[01;32m\]\u\[\033[00m\]@\[\033[01;32m\]\h\[\033[00m\] \[\033[01;34m\]\W\[\033[00m\]\[\033[01;31m\]\$(git_branch)\[\033[00m\$ "
```
### Change color by status branch
Và cuối cùng để tiện lợi nhất cho việc check status của branch thì chúng ta sẽ đổi màu mỗi khi branch có file change hay là đã commit chẳng hạn. Thì chúng ta sẽ phải viết một function tương tự như `git_branch` để lấy đươc status của branch đó.

```shell
COLOR_RED="\033[01;31m"
COLOR_YELLOW="\033[01;33m"
COLOR_GREEN="\033[01;32m"
COLOR_WHITE="\033[01;37m"

git_color() {
  local git_status="$(git status 2> /dev/null)"

  if [[ $git_status == *"Changes to be committed"* ]]; then
    echo -e $COLOR_RED
  elif [[ $git_status == *"Changes not staged for commit"* ]]; then
    echo -e $COLOR_YELLOW
  elif [[ $git_status == *"nothing to commit, working directory clean"* ]]; then
    echo -e $COLOR_GREEN
  else
    echo -e $COLOR_WHITE
  fi
}

export PS1="[\[\033[01;32m\]\u\[\033[00m\]@\[\033[01;32m\]\h\[\033[00m\] \[\033[01;34m\]\W\[\033[00m\]\[$(git_color)\]\$(git_branch)\[\033[00m\$ "
```
![](https://images.viblo.asia/5af27efb-f9b8-45a8-97ed-236413ef3e5e.png)

EZ và Cool ngầu phải không ạ! :v:

### SUMMARY
Qua bài viết này thì mình cũng đã hướng dẫn các bạn một vài tip nhỏ để custom `command prompt` sao cho tiện lợi nhất có thể, hy vọng sẽ giúp ích phần nào cho các bạn trong công việc!

Tuy nhiên ở đây thì mình lại chưa tìm được cách khi enter để load file `bashrc` or auto cập nhật color. MÌnh sẽ tìm hiểu thêm và update sau khi mình tìm ra vấn đề ạ. Nếu mọi người ai có thể thì xin vui lòng để lại comment và mình sẽ update ạ.

*Thank you!*

Nguồn tham khảo:

https://coderwall.com/p/pn8f0g/show-your-git-status-and-branch-in-color-at-the-command-prompt