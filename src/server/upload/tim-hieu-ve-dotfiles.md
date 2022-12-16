![](https://images.viblo.asia/cff60aaa-28f5-4f27-81e3-fed335a566c7.png)

Đã bao giờ vào 1 ngày đẹp trời, máy tính của chúng ta bỗng tự nhiên lăn đùng ra chết. Và sau đó ta phải cài lại 1 hệ điều hành mới, toàn bộ phần mềm, setting cho các chương trình cũ đều bị mất? Chúng ta mất hàng giờ (có khi là cả ngày) chỉ để ngồi cài lại những chương trình đó, sau đó lần mò settings lại? Nếu đã gặp những trường hợp như thế thì DOTFILES chính là giải pháp cho trường hợp này. <br>
# 1. Khái niệm
Ta có thể hiểu Dotfiles đơn giản là tập hợp tất cả các files có dấu chấm ở đầu. Tuy nhiên, các files đó chứa các config của 1 chương trình hay 1 hệ thống nào đó. <br>
Các files này xuất hiện rất nhiều trong công việc lập trình hàng ngày. Set biến môi trường thì cài đặt trong ~/.bashrc, set ignore git thì thêm vào file gitignore, … Cái tên “Dotfiles” cũng bắt đầu từ việc các file này luôn có dấu “.” ở đầu. Nó mặc định sẽ bị ẩn đi khi ta mở thư mục. <br>
## Tại sao nên sử dụng Dotfiles?
Dù không hề biết đến Dotfiles, ta vẫn có thể sử dụng máy tính bình thường, thế thì cần gì tới Dotfiles. Hơn nữa, cho dù có phải cài lại máy tính, ta vẫn có dư thời gian để có thể ngồi cài lại máy tính, thế thì ta có nhất thiết cần biết tới Dotfiles? <br>
Câu trả lời là không. Tuy nhiên, Dotfile sẽ mang lại cho bạn rất nhiều điều thú vị: <br>
- Giúp tự động hóa mọi thứ có thể <br>
- Tạo ra những config của chính mình <br>
- Giúp học được những điều mới từ config của người khác <br>

Trong lập trình có 1 nguyên tắc DRY - Don’t repeat yourself - Không bao giờ lặp đi lặp lại 1 cái gì đó. Vì thế hãy làm mọi thứ trở thành tự động. Đừng bao giờ gõ đi gõ lại những dòng config, những lệnh cài đặt phần mềm, … trong khi chúng ta có thể làm việc đó trở nên đơn giản hơn rất nhiều lần. Dotfiles giúp ta backup, restore hay đồng bộ những đoạn setting giữa các thiết bị 1 cách dễ dàng. <br>
Thêm vào đó, Dotfiles chính là nơi để ta thỏa sức sáng tạo. Chúng ta có thể đặt vào đó những config mang đậm phong cách cho mình. Việc tự mình cài đặt, map phím, viết thêm extend functions sẽ tạo ra những chương trình phù hợp vs thói quen, mục đích sử dụng chương trình của ta. Điều này sẽ mang tới cảm giác có thể kiểm soát mọi thứ theo ý của mình, tự mình tạo nên 1 chiếc máy cho chính mình. <br>

Trong quá trình cài đặt đó, chúng ta sẽ học được rất nhiều thứ, sẽ hiểu hơn về cách 1 ứng dụng sẽ chạy như thế nào, học hỏi được những config thú vị từ repo dotfiles của những người khác, cách nhận ra các vấn đề và hướng giải quyết, … Việc tự mình giải quyết các vấn đề cho mình là một cách rất tốt để học hỏi điều mới <br>

# 2. Cấu trúc
Dưới đây là một ví dụ về cấu trúc của Dotfiles. Chúng ta sẽ tìm hiểu về từng thành phần của nó <br>
```
    .
    ├── git
    │ ├── .gitconfig
    │ └── .gitignore_global
    ├── install.sh
    ├── osxdefaults.sh
    ├── runcom
    │ ├── .bash_profile
    │ └── .inputrc
    └── system
     ├── .alias
     ├── .env
     ├── .function
     ├── .path
     └── .prompt
```
## .bash_profile
Trong Bash shell, file này sẽ được load trước khi Terminal load môi trường của nó, file này sẽ chứa tất cả những config, command line của ta. Trong file này, ta có thể thay đổi các setting khác nhau như các lệnh terminal, thêm aliases cho các function hay sử dụng thường xuyên... <br>
## .inputrc
Các hành động khi input, phím bấm sẽ được lưu tại file này. Ví dụ <br>
```
    # Phím Tab sẽ tự động hoàn thành không quan tâm đến chữ hoa hay chữ thường của tên file
    set completion-ignore-case on
    # List tất cả các tên trong trường hợp có nhiều case 
    set show-all-if-ambiguous on
    # Chuyển giữa các match với Shift-Tab
    "\e[Z": menu-complete
    # Filter lịch sử search
    "\e[A": history-search-backward
    "\e[B": history-search-forward
```
## .alias
File này ta sẽ định nghĩa các shorcuts cho các câu lệnh. Ví dụ: <br>
```
    alias l="ls -la"       
    alias ld="ls -ld */"  
    alias ..="cd .."
    alias ...="cd ../.."
    alias ....="cd ../../.."
    
    alias cleanupds="find . -type f -name '*.DS_Store' -ls -delete"
```
## .functions
Nếu câu lệnh quá phức tạp để tạo một alias, ta có thể định nghĩa một function. Một function có thể nhận vào tham số theo ý muốn. <br>
```
    # Function tạo mới một thư mục và truy nhập vào đường dẫn thư mục đó
    function mk() {
      mkdir -p "$@" && cd "$@"
    }
    # Function mở một page dưới dạng pdf
    function manpdf() {
     man -t "${1}" | open -f -a /Applications/Preview.app/
    }
```
## .env
Chứa các biến có thể sử dụng cho các file khác <br>
```
    export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$DOTFILES_DIR/bin"
    export EDITOR="subl -w"
    export CLICOLOR=1
    export LSCOLORS=gxfxcxdxbxegedabagacad
    # highlight match khi dùng grep
    export GREP_OPTIONS='—color=auto'
    # Tự động sửa sai path name khi dùng cd
    shopt -s cdspell
```
## Các file khác
Có nhiều các file khác có thể sử dụng trong dotfiles như: <br>
- .gitconfig cho Git
- .vimrc cho Vim
# 3. Cách để custom Dotfiles
## Đọc dotfiles được viết từ người khác
Mỗi dotfiles của một người nào đó có rất nhiều config hay và hữu dụng, đặc trưng cho công việc, thói quen sử dụng của từng người. Chúng ta có thể đọc các file từ người khác để học những config phù hợp với mình. Ví dụ một file được viết: <br>
```
    FZF_TMUX_HEIGHT=20

    # Open file with Vim
    v() {
      local file
      file=$(fzf --query="$1") && vim "$file"
    }

    # cd to folder
    fd() {
      local dir
      dir=$(find ${1:-*} -path '*/\.*' -prune \
                      -o -type d -print 2> /dev/null | fzf +m) &&
      cd "$dir"
    }

    # show all hidden folder to 'cd'
    fda() {
      local dir
      dir=$(find ${1:-.} -type d 2> /dev/null | fzf +m) && cd "$dir"
    }

    # Search in history
    fh() {
      eval $(history | fzf +s | sed 's/ *[0-9]* *//')
    }

    # Kill a process
    fk() {
      ps -ef | sed 1d | fzf -m | awk '{print $2}' | xargs kill -${1:-9}
    }

    # Checkout a branch
    fbr() {
      local branches branch
      branches=$(git branch) &&
      branch=$(echo "$branches" | fzf +s +m) &&
      git checkout $(echo "$branch" | sed "s/.* //")
    }

    # Checkout a commit
    fco() {
      local commits commit
      commits=$(git log --pretty=oneline --abbrev-commit --reverse) &&
      commit=$(echo "$commits" | fzf +s +m -e) &&
      git checkout $(echo "$commit" | sed "s/ .*//")
    }

    # Search tags
    ft() {
      local line
      [ -e tags ] &&
        line=$(grep -v "^!" tags | cut -f1-3 | cut -c1-80 | fzf --nth=1) &&
        $EDITOR $(cut -f2 <<< "$line")
    }

    # fq1 [QUERY]
    # - Immediately select the file when there's only one match.
    #   If not, start the fuzzy finder as usual.
    fq1() {
      local lines
      lines=$(fzf --filter="$1" --no-sort)
      if [ -z "$lines" ]; then
        return 1
      elif [ $(wc -l <<< "$lines") -eq 1 ]; then
        echo "$lines"
      else
        echo "$lines" | fzf --query="$1"
      fi
    }

    # fe [QUERY]
    # - Open the selected file with the default editor
    #   (Bypass fuzzy finder when there's only one match)
    fe() {
      local file
      file=$(fq1 "$1") && ${EDITOR:-vim} "$file"
    }
```
Trong file này có rất nhiều hàm thú vị, ta có thể dễ dàng thực hiện 1 lệnh mà không cần thực hiện các thao tác dài dòng. Tất cả các hàm trên sẽ được gọi dưới dạng 1 alias của zsh. <br>
## Viết thêm các config khác
Ta hoàn toàn có thể tự viết ra các config cho chính mình <br>
Ví dụ như đoạn mã check thời tiết ngày hôm nay ở Hà Nội: <br>
```
    weather() {
      local CITY=${1:-Hanoi}
      curl -4 "wttr.in/$CITY"
    }
```
hoặc translate nhanh 1 từ bằng google nếu bạn cài [translate-shell](https://github.com/soimort/translate-shell):  <br>
```
    # Translate with google
    alias t="trans -b :vi"
```
hay tra cứu nhanh trên stackoverfolow từ terminal với [howdoi](https://github.com/gleitz/howdoi)
```
    # How do I ....
    alias how="howdoi"
```

Như vậy, bài viết đã tìm hiểu cơ bản về Dotfiles và một số cách sử dụng nó. Hi vọng bài viết sẽ giúp ích cho mọi người để có thể tự tạo 1 repo Dotfiles của riêng mình, phục vụ tốt nhất cho công việc và thói quen sử dụng máy tính của mình. See you! <br>

# Reference
https://medium.com/@webprolific/getting-started-with-dotfiles-43c3602fd789#.hjk1r1vls <br>
https://www.freecodecamp.org/news/dive-into-dotfiles-part-1-e4eb1003cff6/