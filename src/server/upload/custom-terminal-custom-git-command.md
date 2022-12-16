![](https://images.viblo.asia/f1364737-f817-4a75-8ff1-ac2a8b53801f.png)

Nhìn vào ảnh chắc mọi người nghĩ, ui giới, mấy cái màu mè, lệnh tắt của git kia, cài zsh cho nhanh. Tin mình đi, rồi cũng sẽ có lúc bạn đang cài 1 cái gì đó thì thằng zsh này dở chứng.

Thay vào đó, chỉ cần với dòng viết trong .bashrc là bạn có thể tự custom được cái terminal của mình rồi.

Dưới đây là file .bash_aliases của mình. Sao phải viết vài 1 file khác mà không phải là viết thẳng vào .bashrc, vì nhỡ đâu có lỗi gì, xóa cái file này là xong

```
# file bash: sudo nano ~/.bash_aliases
# https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
# tạo file: sudo nano /etc/bash_completion.d/git-completion.bash


# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
# Reset
Color_Off="\[\033[0m\]"       # Text Reset

# Regular Colors
Black="\[\033[0;30m\]"        # Black
Red="\[\033[0;31m\]"          # Red
Green="\[\033[0;32m\]"        # Green
Yellow="\[\033[0;33m\]"       # Yellow
Blue="\[\033[0;34m\]"         # Blue
Purple="\[\033[0;35m\]"       # Purple
Cyan="\[\033[0;36m\]"         # Cyan
White="\[\033[0;37m\]"        # White

# Bold
BBlack="\[\033[1;30m\]"       # Black
BRed="\[\033[1;31m\]"         # Red
BGreen="\[\033[1;32m\]"       # Green
BYellow="\[\033[1;33m\]"      # Yellow
BBlue="\[\033[1;34m\]"        # Blue
BPurple="\[\033[1;35m\]"      # Purple
BCyan="\[\033[1;36m\]"        # Cyan
BWhite="\[\033[1;37m\]"       # White

# Underline
UBlack="\[\033[4;30m\]"       # Black
URed="\[\033[4;31m\]"         # Red
UGreen="\[\033[4;32m\]"       # Green
UYellow="\[\033[4;33m\]"      # Yellow
UBlue="\[\033[4;34m\]"        # Blue
UPurple="\[\033[4;35m\]"      # Purple
UCyan="\[\033[4;36m\]"        # Cyan
UWhite="\[\033[4;37m\]"       # White

# Background
On_Black="\[\033[40m\]"       # Black
On_Red="\[\033[41m\]"         # Red
On_Green="\[\033[42m\]"       # Green
On_Yellow="\[\033[43m\]"      # Yellow
On_Blue="\[\033[44m\]"        # Blue
On_Purple="\[\033[45m\]"      # Purple
On_Cyan="\[\033[46m\]"        # Cyan
On_White="\[\033[47m\]"       # White

# High Intensty
IBlack="\[\033[0;90m\]"       # Black
IRed="\[\033[0;91m\]"         # Red
IGreen="\[\033[0;92m\]"       # Green
IYellow="\[\033[0;93m\]"      # Yellow
IBlue="\[\033[0;94m\]"        # Blue
IPurple="\[\033[0;95m\]"      # Purple
ICyan="\[\033[0;96m\]"        # Cyan
IWhite="\[\033[0;97m\]"       # White

# Bold High Intensty
BIBlack="\[\033[1;90m\]"      # Black
BIRed="\[\033[1;91m\]"        # Red
BIGreen="\[\033[1;92m\]"      # Green
BIYellow="\[\033[1;93m\]"     # Yellow
BIBlue="\[\033[1;94m\]"       # Blue
BIPurple="\[\033[1;95m\]"     # Purple
BICyan="\[\033[1;96m\]"       # Cyan
BIWhite="\[\033[1;97m\]"      # White

# High Intensty backgrounds
On_IBlack="\[\033[0;100m\]"   # Black
On_IRed="\[\033[0;101m\]"     # Red
On_IGreen="\[\033[0;102m\]"   # Green
On_IYellow="\[\033[0;103m\]"  # Yellow
On_IBlue="\[\033[0;104m\]"    # Blue
On_IPurple="\[\033[10;95m\]"  # Purple
On_ICyan="\[\033[0;106m\]"    # Cyan
On_IWhite="\[\033[0;107m\]"   # White

# Various variables you might want for your PS1 prompt instead
Time12h="\T"
Time12a="\@"
PathShort="\w"
PathFull="\W"
NewLine="\n"
Jobs="\j"
# https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html

export PS1='$(git branch &>/dev/null;\
if [ $? -eq 0 ]; then \
  echo "'$BYellow$PathShort$Color_Off'$(echo `git status` | grep "nothing to commit" > /dev/null 2>&1; \
  if [ "$?" -eq "0" ]; then \
    # @4 - Clean repository - nothing to commit
    echo "'$Green'"$(__git_ps1 "(%s)"); \
  else \
    # @5 - Changes to working tree
    echo "'$IRed'"$(__git_ps1 "{%s}"); \
  fi)'$Color_Off' \$'$Cyan::$Color_Off' "; \
else \
  # @2 - Prompt when not in GIT repo
  echo "'$BYellow$PathShort$Color_Off' \$'$Cyan::$Color_Off' "; \
fi)'



source /etc/bash_completion.d/git-completion.bash
alias t='cd /home/hatd/tilani_backend'
alias ..='cd ..'
alias b='bundle install'
alias rc='rails c'
alias rr='rails routes'
alias rdm='rails db:migrate'
alias rdmr='rails db:migrate:reset'
alias gl='git log --oneline -n 10'
alias gs='git status'
alias gd='git diff'
alias grb='git rebase'
alias grl='git reflog'
alias pull='git pull'
alias pushh='git push heroku deploy:master -f'
alias add='git add -A'
alias gr='git reset --soft HEAD^'
alias amend='git commit --amend'
gb(){
  git branch $*
}

rs(){
  rails s $*
}

gco(){
  git checkout $*
}

push(){
  branch=$(__git_ps1)
  current_branch=${branch:2:${#branch}-3}
  gcm
  git push origin $current_branch -f;
}

gcm(){
  if [ -n "$*" ]
  then
    add
    git commit -m "$*";
  else
    branch=$(__git_ps1)
    current_branch=${branch:2:${#branch}-3}
    temp=$(git log -1 --pretty=%B)
    log=${temp:0:18}
    cm=$(echo `git status` | grep "nothing to commit")
    if [ "$cm" = "" ]
    then
      git add -A;
      if [ "$log" = "Merge pull request" ]
      then
        git commit -m $current_branch;
      else
        git commit --amend --no-edit;
      fi
    fi
  fi
}

fetch(){
  git fetch source
}

fetchp(){
  gb -D $1
  git fetch source pull/$1/head:$1
}

fetchb(){
  git fetch source $1
}

__git_complete gco _git_checkout
__git_complete gb _git_branch
__git_complete gd _git_diff
__git_complete b _git_bundle
__git_complete grb _git_rebase
__git_complete grl _git_reflog
__git_complete gs _git_status
__git_complete pull _git_branch

export DATABASE_USERNAME='root'
export DATABASE_PASSWORD='123456'
export DATABASE_HOSTNAME='localhost'
export DATABASE_HOSTNAME='localhost'
```

### Giải thích 1 chút nào

- Vì mình lưu file này trên gg drive, nên để luôn cái câu lệnh tạo file `sudo nano ~/.bash_aliases` cho đỡ quên :laughing::laughing::laughing:
- Cái `private bin` là cái quái gì ý, chả nhớ tại sao có nó nữa, nhưng không liên quan đến bài này nên bỏ qua đi :stuck_out_tongue_winking_eye:
- Tiếp là mấy cái RVM, do lúc cài rvm để cài ruby nên có mấy cái này, cũng bỏ qua nốt.

### Màu mè & custom các phần hiển thị

Bắt đầu từ đoạn `Color_Off` là định nghĩa cái màu từ [code](https://misc.flogisoft.com/bash/tip_colors_and_formatting) ra text cho dễ chọn.

Trong ngôn ngữ [BASH](http://www.gnu.org/software/bash/manual/html_node/index.html) thì để set màu cho 1 đoạn text cần:
```
mã_màu đoạn_text reset_màu
```
nếu không có cái reset_màu (Color_Off) thì tất cả text sao `đoạn_text` sẽ có màu như `mã_màu`

Rồi, giờ vào phần chính
```
export PS1='$(git branch &>/dev/null;\
if [ $? -eq 0 ]; then \
  echo "'$BYellow$PathShort$Color_Off'$(echo `git status` | grep "nothing to commit" > /dev/null 2>&1; \
  if [ "$?" -eq "0" ]; then \
    # @4 - Clean repository - nothing to commit
    echo "'$Green'"$(__git_ps1 "(%s)"); \
  else \
    # @5 - Changes to working tree
    echo "'$IRed'"$(__git_ps1 "{%s}"); \
  fi)'$Color_Off' \$'$Cyan::$Color_Off' "; \
else \
  # @2 - Prompt when not in GIT repo
  echo "'$BYellow$PathShort$Color_Off' \$'$Cyan::$Color_Off' "; \
fi)'
```
đoạn này sẽ quyết định những gì sẽ hiển thị

![](https://images.viblo.asia/da7df9df-b090-40b1-89c6-320286c3b655.png)

- PS1 chính là dòng sẽ hiển thị ra, nên chúng ta sẽ custom nó
- `$()` mấy cái lệnh git phải viết trong này, mình cũng chưa tìm hiểu rõ lắm tại sao phải vậy, sau này sẽ có bài cụ thể hơn về cái này
- `git branch &>/dev/null;` gần như kiểu check xem có repo git hay không, để xuống đoạn if else ở dưới
- trong bash language cú pháp của câu lệnh điều kiện có dạng 

```
if [điều kiện]
then to_do
else to_do
fi
```

- `if [ $? -eq 0 ]; then \` nếu có repo git thì:
- `echo "'$BYellow$PathShort$Color_Off'` hiển thị ra đoạn `~/tilani_backend` màu vàng
- `$(echo 'git status` | grep "nothing to commit" > /dev/null 2>&1;` check xem có gì cần commit hay không
- nếu không có gì để commit (`[ $? -eq 0 ]`), hiển thị `(development)` màu xanh, `echo "'$Green'"$(__git_ps1 "(%s)");`

-- `$Green`: màu xanh

-- `__git_ps1` câu lệnh để lấy tên branch

-- `"(%s)"` định dạng để hiện thị tên branch, ở đây tên branch sẽ trong dấu ()

- tương với, nếu có gì đó để commit,  `echo "'$IRed'"$(__git_ps1 "{%s}");`, hiển thị `{development}` màu đỏ
- `fi)'$Color_Off'` kết thúc if else và reset màu
- `\$'$Cyan::$Color_Off'` cái này là mình thêm `::` vào cho vui thôi
- nếu k có repo thì chỉ đơn giản `echo "'$BYellow$PathShort$Color_Off' \$'$Cyan::$Color_Off' ";`
- fi

ok, thế là xong phần custom đoạn text hiển thị, có git repo, có cần commit hay k. Còn rất nhiều thứ có thể cho hiển thị ra như: thời gian, tên người dùng... xem thêm từ cái đoạn:
```
# Various variables you might want for your PS1 prompt instead
Time12h="\T"
....
```
và cái link ngay dưới đó

### Custom mấy cái câu lệnh git

- Bắt đầu với `alias`, đơn giản, hiểu nó như kiểu gán 1 đoạn lệnh này = với 1 lệnh khác

```
alias rc='rails c'
```
thay vì phải gõ `rails c`, thì ta gõ `rc` là được

Cái này dùng cho những câu lệnh đơn giản thì ok đấy, nhưng với những câu lệnh cần truyền biến vào thì sao.

Ta phải viết các function

```
gco(){
  git checkout $*
}
```
ví dụ lệnh `gco` như này, cái `$*` nó sẽ nhận hết tất cả những gì ta gõ phía sau `gco`

```
gco tên_branch
```
= git checkout tên_branch

```
gco tên_file1 tên_file2
```
= git checkout tên_file1 tên_file2

nếu muốn lấy chính xác biến thứ mấy thì dùng $1, $2....

#### Giờ đến phần tự sướng: lệnh `gcm`, `push`

Gõ `gcm`: 

- nếu commit trước đó là 1 commit merge, sẽ tạo 1 commit mới với mess là tên branch.
- nếu commit trước đó k phải là commit merge, thì sẽ commit amend.

 vì sao ư, vì conventions về git ở [sun*](https://sun-asterisk.com) quy định 1 pull chỉ được 1 commit
 
 Còn nếu muốn thêm 1 commit với message thì: `gcm "message"`
 
 Lệnh `push`, gõ `push` 1 phát là xong, tự commit, xong push -f lên branch hiện tại của origin (vì sao -f ư, vì ở trên kia kìa)
 
 Rất nhanh và tiện đúng không:grinning::grinning::grinning:
 
 #### Còn 1 phần nhỏ nữa
 
 Đống `__git_complete`
 
 Bình thường, khi gõ `git checkout dev`, gõ đến đây xong tab 1 cái là nó tự complete thành `development` cho mình. Vì đây là câu lệnh của git nên nó support việc đó, còn với mấy cái câu lệnh mà mình tự viết ở trên thì phải thêm chút công sức nữa.
 
 - tạo 1 file: `sudo nano /etc/bash_completion.d/git-completion.bash`
 - vào trang https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash , copy hết, và lưu vào cái file vừa tạo
 - và thêm đống sau vào .bash_aliases
 
 ```
 __git_complete gco _git_checkout
__git_complete gb _git_branch
__git_complete gd _git_diff
__git_complete b _git_bundle
__git_complete grb _git_rebase
__git_complete grl _git_reflog
__git_complete gs _git_status
__git_complete pull _git_branch
```

khi đó, nó sẽ complete `gco` y hệt `git checkout`

Mấy cái `export` ở cuối thì bảo qua đi nhé :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

P/s: Viết bài này mình mới để ý mấy function `gb`, `rs`, `gco` thừa, viết kiểu alias là được, k cần `$*`

tham khảo: 

https://github.com/ryanoasis/public-bash-scripts/blob/master/ultimate-git-ps1-bash-prompt.sh

https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html

https://misc.flogisoft.com/bash/tip_colors_and_formatting