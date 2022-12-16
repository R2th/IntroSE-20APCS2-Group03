Chào mọi người,

Mình đọc viblo đã lâu nhưng chưa hề có bài viết chia sẽ nào vì hôm nay mình khá rảnh nên viết 1 bài lảm nhảm với các bạn :D

Như mọi người cũng biết hiện nay nhà nhà docker, người người docker, docker hiện tại là công cụ sử dụng hàng ngày có khi thà cả ngày chả làm được chút output nào ngoài việc đánh docker command build/run và nhìn màn hình  :D.
Hiện tại mình đang sài docker như 1 development environment, nhưng mình không thích việc mỗi lần exit container và 1 lúc sau start lại hoặc build lại image bị mất tất cả previous command của mình. vì vậy mình không thể đánh `ctrl+R` để search hay `ctr+P/ctr+N` để quay lại command trước đó, quá mệt mỏi 😥

Nên mình đã thử search cách nào để giữ được history trong docker.ok mở bài vậy đủ rồi vào chủ đề chính nào :D

Đầu tiên, làm sao bash lưu previous commands của mình? là do có 1 biến tên là `HISTFILE` nó sẽ lưu đường dẫn tới 1 file text mà trong đó chưa bash history, default path là `$HOME/.bash_history` nếu container của bạn chạy shell khác như ZSH, FISH,... thì cũng phải tìm ra cái file mà shell đó input history.

Cách 1- Sử docker file và docker-compose
Docker file:
```shell
    # make bash history persistent
    SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=~/commandhistory/.bash_history" && \
    mkdir ~/commandhistory && \
    touch ~/commandhistory/.bash_history && \
    echo $SNIPPET >> ~/.bashrc
```

Sao đó bạn vào docker-compose thêm persistent volume cho container của để khi restart container để không bị mất file history.
Docker compose:
```shell
    dev-env:
        extends: cx-env
        volumes:
            - ${HOME}/.ra6/commandhistory:${HOME}/commandhistory
```

Cách 2:
bạn có thể truyền enviroment dô trong command start, một lưu ý ở đây là bạn đã tạo folder commandhistory hoặc bạn có thể để bashhistory ở ngay workspace.
```shell
docker exec -it -e HISTFILE=/commandhistory/.bash_history -v ${HOME}/commandhistory:${HOME}/commandhistory <image>
```

nếu sài zsh bạn có thể thêm mấy cái sau .zshrc rồi copy vào container :D:
```shell
export histfile=~/.zsh_history
export histsize=50000
export savehist=$(( 1.2 * savehist )) # zsh recommended value
export histtimeformat="[%f %t] "
setopt inc_append_history extended_history hist_find_no_dups hist_verify
```

Vậy thôi, chào các bạn nhé... :D