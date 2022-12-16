Hôm qua, tôi cùng với đồng nghiệp đã cùng thảo luận về vấn đề "Các lập trình viên trên khắp thế giới đang thiết lập alias trong Terminal như thế nào?"
Do đó, tôi đã thử điều tra từ dữ liệu của hơn 1000 repository trên Github.
Nội dung bài viết này gồm nhiều thông tin và kết quả tôi đã điều tra thấy. Các bạn hãy cùng tham khảo nhé.
# alias là gì
Theo wikipedia thì:

>  nó là việc đăng ký command bằng tên khác trên UNIX...v.v. Là tên command được đăng ký với một tên khác.

Không biết các bạn thì sao, chứ với tôi: Việc nhập các command dài, hoặc những option thường xuyên sử dụng  khá là tốn công, phiền phức.
Tuy nhiên, bằng cách mô tả alias trên file setting của Terminal, bạn có thể định nghĩa những command dài, hay lặp bằng 1 tên khác.

# Cách thức điều tra

* Sử dụng GitHub API
* Lọc ra 1000 repository có gắn topping là dotfiles, sort theo star
* Search trong repository bằng các tên file sau: .bashrc, .bash_profile, .zshrc, .zsh_profile
* * Dấu chấm ở đầu: có hoặc không  đều được, không vấn đề gì.
* Từ trong file, trích xuất ra các dòng có chứa alias
* Các file thuộc đối tượng trong lần điều tra này: gồm 1602 file

[Source code ](https://github.com/reireias/dotseeker)khi chạy API


# Kết quả
Trước hết, tôi đã trình bày kết quả thu được vào gist theo thứ tự "Số lần xuất hiện" và  thứ tự Alphabet.

###  Thứ tự theo số lần xuất hiện nhiều nhất

https://gist.github.com/reireias/b986af3382d41c962ca6e8a78664c651
### Thứ tự Alphabet

https://gist.github.com/reireias/253ba410244e999a15002efb17311d34

# Giới thiệu
Ban đầu, tôi định viết bài tổng hợp kết quả theo hình thức Ranking. Tuy nhiên, nếu chỉ là số lần xuất hiện thôi, thì nó sẽ trở thành bảng tổng sắp (Ranking) thú vị. Vì vậy, tôi sẽ giới thiệu cho các bạn những kết quả đã được phân nhóm và các alias được nhiều người ưa chuộng.

# Nhóm ls
Lọt vào bảng xếp hạng với vị trí khá cao trong hạng mục "Số lần xuất hiện". 


```
alias ls='ls --color=auto'
alias ls='ls -G'
alias ll='ls -alF'
alias ll='ls -lh'
alias ll='ls -l'
alias la='ls -A'
alias la='ls -a'
alias l='ls -CF'
# Dạng như thế này
alias l='clear && ll'
alias l='clear && ls'
```

# Nhóm cd

Nhóm dùng để chuyển directory: cũng có dùng, như phần ghi dưới đây.
Có một vài lệnh để chuyển nhanh đến các thư mục bạn thường xuyên sử dụng.
```
# Liên kết các các chữ cái đầu của Directory mà bạn thường sử dụng
alias abc='cd ~/aaa/bbb/ccc'

# Tuy ghi là 'd', nhưng tùy người mà chỗ này sẽ đặt tên khác
alias d='cd ~/.dotfiles'
alias d='cd ~/Desktop'
alias d='cd ~/Documents/Dropbox'
alias d='cd ~/Dropbox'
```

Đáng ngạc nhiên là: các tên mà mọi người đã định nghĩa.
Hình như cách đặt tên, thể hiện bằng chữ số khá thuận tiện.
```
# Thể hiện bằng số lượng dấu chấm (dot)
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Thể hiện bằng chữ số
alias ..2='cd ../..'
alias ..3='cd ../../..'
```

#  Nhóm git

git command: khi sắp xếp theo thứ tự dùng nhiều, thì được list như sau:
Tôi cũng đang thực hiện thiết lập alias tương tự.

```
alias g='git'
alias ga='git add'
alias gd='git diff'
alias gs='git status'
alias gp='git push'
alias gb='git branch'
alias gst='git status'
alias gco='git checkout'
alias gf='git fetch'
alias gc='git commit'
```

# Liên quan tới dotfiles

Tôi sẽ giới thiệu tới các bạn một vài alias liên quan tới dotfiles - dùng để set alias.
Nhóm này có thể edit được, nghe nói rất tiện lợi nên không biết tôi có nên thử thiết lập không:D
```
# Độ rút gọn: sẽ thay đổi tùy theo người dùng muốn thế nào
alias d='/path/to/dotfiles'
alias dot='/path/to/dotfiles'
alias dotfiles='/path/to/dotfiles'
# Nhóm editable
alias zshrc='vi /path/to/dotfiles/.zshrc'
alias zshconfig='vi /path/to/dotfiles/.zshrc'
```

# Nhóm apt
Chủ yếu là các thiết lập dành cho ubuntu.
```
# apt
alias agi='sudo apt install'
alias agr='sudo apt remove'
alias agu='sudo apt update'

# apt-get
alias ag='sudo apt-get'
alias agi='sudo apt-get install'
alias agr='sudo apt-get remove'
alias agu='sudo apt-get update'
```

Nhân đây, tôi cũng muốn recommend một chút. Bạn nên sử dụng apt hơn là dùng apt-get.
Tham khảo: [「apt-get」lỗi thời rồi? Quản lý package của Ubuntu sử dụng command mới「apt」](https://linuxfan.info/package-management-ubuntu)
# Nhóm bundle
Đây là bundle quen thuộc trong Ruby on Rails.
Dưới đây là một số dạng đang được dùng phổ biến.
```
alias b='bundle'
alias be='bundle exec'
alias bx='bundle exec'
alias bi='bundle install'
alias bo='bundle outdated'
alias bu='bundle update'
alias rc='bundle exec rails c'
```

# Nhóm top
Tôi rất ngạc nhiên là: nhóm này cũng được định nghĩa.
Có lẽ nó sẽ giúp ích cho những người hay quên cpu hoặc mem.
```
# Tùy người
alias top='htop'
alias top='gtop'
alias top='vtop'
alias top='gotop'
# Tên khác
alias mem='top -o rsize'
alias cpu='top -o cpu'
```

# Phương án an toàn
Là các alias dùng để đặt câu hỏi bằng hình thức đối thoại trực tiếp khi ghi đè bằng option -i(--interactive) 
```
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -i'
```

# Nhóm chiến tranh tôn giáo
Hình như cũng có alias được coi là lời tuyên chiến khi bạn sử dụng nó
```
# Tấn công những kẻ ngoại đạo
alias atom='code'
alias v='code'
alias emacs='vi'
# Cạnh tranh edit khốc liệt
alias ed='atom .'
alias ed='emacs --daemon'
alias ed='vim'
alias edit="emacs -nw"
alias edit='subl'
alias edit='subl3'
alias edit='vim'
```

# Nhóm 1 ký tự
Tôi thì cảm thấy phần này hơi gây bối rối cho người dùng. Tuy nhiên, nếu đã quen thì sẽ rất dễ dùng.
Do phần này khá dài, nên tôi chỉ liệt kê ra những cách đặt tên có vẻ thú vị, hoặc những cách đặt mà tôi nghĩ là các bạn có thể tham khảo được.
```
# a
alias a='alias'
alias a='ansible'
alias a='apt'
alias a='apt-get'
alias a='atom'

# b
alias b='brew'
alias b='bundle exec'
alias b='bundle'
alias b='bundler'
alias b='cd ..'

# c
alias c='curl'
alias c='cd'
alias c='clear'
alias c='cat'
alias c='rails console'
alias c='pbcopy' # Đây là cách khá tiện lợi

# d
alias d='cd ~/.dotfiles'
alias d='cd ~/Desktop'
alias d='cd ~/Dropbox'
alias d='date +%Y%m%d'
alias d='docker' # Cái này tôi đang dùng
alias d='du -h -d=1'
alias d='git diff'
alias d='less' # display?
alias d='pwd'

# e
alias e='atom'
alias e='emacs'
alias e='emacsclient'
alias e='exit' # Cái này thì hơi khó hiểu?
alias e='vim'

# f
alias f='fg'
alias f='file'
alias f='find . -name'
alias f='finger'
alias f='fuck'
alias f='open -a Finder ./'

# g
alias g='git status'
alias g='git' 
alias g='googleit' # Google
alias g='googler' # Google
alias g='grep --color=auto'
alias g='grep' 

# h
alias h='cd ~' # liên quan tới home
alias h='git reset HEAD' # liên quan tới head
alias h='heroku'
alias h='history | grep'
alias h='history'
alias h='tldr' # Cái này khá là tiện vì hay dùng. help?

# i
alias i='sudo apt install --yes'

#j
alias j='jobs'
alias j='jump'

# k
alias k='kill -9'
alias k='kubectl' # Cái này tôi đang dùng
alias k='kwrapper'
alias k='tree' # Vì cái này gần với 1?

# l
# Hầu như toàn các cách set như tôi đã tổng hợp ở phần Nhóm ls

# m
alias m='cd ~/Music && ls -a' # musicのm!!!
alias m='make'
alias m='man'
alias m='mkdir' # Cái này chắc là do cá nhân tự nghĩ
alias m='rake db:migrate db:rollback && rake db:migrate db:test:prepare' # Cái này làm hơi quá:v
alias m='mv'
alias m='mvn'

# n
alias n='git checkout -b' # new branch
alias n='nano'
alias n='npm run'
alias n='npm' # Trong thực tế, cái này hay được type hơn node
alias n='nvim'
alias n='sudo netctl'
alias n='node'

# o
alias o='open' 

# p
alias p='cd ~/Documents/projects'
alias p='cd ~/Dropbox/Projects'
alias p='cd ~/Pictures && ls -a'
alias p='cd ~/Projects'
alias p='ping' 
alias p='popd' 
alias p='pwd'
alias p='python'
alias p='python3'
alias p='pacman' # Đây không phải là game nha:v

# q
alias q='exit' # Ngoài cái này ra thì không còn gì khác

# r
alias r='cd / && ls -a' # r của root
alias r='rails' # Developer rails sẽ hay bị nhầm chữ r này mất
alias r='rake'
alias r='ranger'
alias r='rgrep'
alias r='rm -i'
alias r='rspec'
alias r='screen -D -R'
alias r='source ~/.zshrc' # reload?
alias r='radian'

# s
alias s='cd ~/src'
alias s='git status'
alias s='ls' # Đối sách cho typo
alias s='screen'
alias s='spring'
alias s='ssh -l root'
alias s='ssh'
alias s='sudo su'
alias s='sudo'
alias s='svn'

# t
alias t='date +"%H%M%S"' # time
alias t='telnet'
alias t='terraform'
alias t='tig'
alias t='tmux -2'
alias t='tmux attach'
alias t='tmux new-session -A -s main'
alias t='tmux'
alias t='tree -C'
alias t='tree -Cfh'
alias t='tree -I "node_modules"' 
alias t='tree -a --ignore ".git|node_modules|bower_components|.DS_Store" -l 3' # Bản tăng cường

# u
alias u='cd ..' # up

# v
alias v='code' # VSCode
alias v='vagrant'
# Liên quan tới vim
alias v='mvim'
alias v='nvim'
alias v='vi'
alias v='vim'

# w Không có gì đặc biệt

# x
alias x='exit'
alias x='screen -A -x'
alias x='startx' # IBM?
alias x='/mnt/c/Windows/explorer.exe' 

# y
alias y='yarn' # Hãy sử dụng cái này
alias y='yaourt' # ArcLinux

# z
alias z='zathura' # Có vẻ cái này là PDF viewer
```

# Các loại khác
```
# Ngắn gọn thì có...
alias _='sudo'

# Có trường hợp nào cho option khó nhớ không?
alias allps='ps aux'

# Copy đường dẫn của thư mục hiện tại vào clipboardー(ví dụ cpwd, copypath...v.v)
alias pwdc='pwd | tr -d "\n" | pbcopy'
```

# Bản bổ sung
## global alias
* Chức năng của zsh
* alias chỉ hoạt động ở đầu câu lệnh. Tuy nhiên khi gắn kèm option g vào và định nghĩa, thì nó sẽ được triển khai ở giữa câu lệnh.
* Sử dụng các câu lệnh thường được gọi ra bằng pipe...v.v
```
# Một vài cách đặt tên tiện dụng
alias -g A='| awk'
alias -g C='| pbcopy' # copy
alias -g C='| wc -l' # count
alias -g G='| grep --color=auto' 
alias -g H='| head' #đương nhiên cũng có tail
alias -g L='| less -R'
alias -g X='| xargs'
```

## suffix alias
Chức năng zsh
Cho phép nhìn được đuôi của command
```
alias -s gz='tar -xzvf' # có thể mở bằng ./hoge.tar.gz 
alias -s html='open' # mở trên trình duyệt bằng ./index.html 
alias -s {mp3,mp4,wav,mkv,m4v,m4a,wmv,avi,mpeg,mpg,vob,mov,rm}='mplayer' # cũng có cả cách định nghĩa như này
```

# Cảm tưởng
* Nhóm liên quan tới aws khá là ít
* * CLI dựng các sub command khá lý tưởng?
* * do or dùng để bổ sung, nên không cần alias?
* docker và kubectl: không nghĩ tới
* Tôi cũng học được nhiều câu lệnh mà tôi không biết
* 

Link bài gốc :

https://qiita.com/reireias/items/d906ab086c3bc4c22147?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=d26eeec1b5-Qiita_newsletter_356_04_17_2019&utm_medium=email&utm_term=0_e44feaa081-d26eeec1b5-33433141