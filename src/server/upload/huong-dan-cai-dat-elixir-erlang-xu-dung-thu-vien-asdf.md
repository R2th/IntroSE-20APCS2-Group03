Xin chào các bạn. Hôm nay mình sẽ giới thiếu với các bạn về thư viện ASDF dùng để cài đặt Elixir .



# asdf

- [Giới thiệu](#setup)
- [Cài đặt](#setup)
- [Sử dụng](#basic-usage)
- [Gỡ cài đặt](#uninstall)

## Giới thiệu

`asdf` là một thư viện dùng để cài đặt và quản lý các ngôn ngữ lập trình. `asdf` hỗ trợ có các ngôn ngữ lập trình như: Ruby, Node.js, Elixir và rất nhiều ngôn ngữ lập trình khác
## Cài đặt
Đầu tiền cần mở command line ra và chạy  câu lệnh sau: 
```PHP
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.6.1
```
Dùng để tải thư viện asdf về máy.

Sau đó tùy thuộc vào hệ điều điều hành trên máy của bạn sẽ chạy các câu lệnh sau
* Ubuntu:
    ```PHP
    echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
    echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
    ```
* macOS:

   ```PHP
  echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
  echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile
    ```
* Zsh:
     ```PHP
     echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.zshrc
    echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.zshrc
    ```
nếu khi bắt đầu chạy bạn bạn thấy lỗi thông báo `command not found: compinit`.Hãy chạy dòng lệnh này để sửa lỗi:
  `
autoload -Uz compinit && compinit
  `
 ##
* Fish: 
   ```PHP
   echo 'source ~/.asdf/asdf.fish' >> ~/.config/fish/config.fish
   mkdir -p ~/.config/fish/completions; and cp ~/.asdf/completions/asdf.fish ~/.config/fish/completions
    ```
   Khởi động lại thiết bị của bạn để các thay đổi trên PATH có hiệu lực.
> Đối với hầu hết các plugin sẽ hoạt động tốt nếu bạn đã cài đặt các packages sau

> * **macOS**: cài đặt qua  homebrew `coreutils automake autoconf openssl libyaml readline libxslt libtool unixodbc`
> * **Ubuntu**: `automake autoconf libreadline-dev libncurses-dev libssl-dev libyaml-dev libxslt-dev libffi-dev libtool unixodbc-dev`
> * **Fedora**: `automake autoconf readline-devel ncurses-devel openssl-devel libyaml-devel libxslt-devel libffi-devel libtool unixODBC-devel`
---

## Sử dụng 
### Quản lý plugins
##### Thêm một  plugin

```bash
asdf plugin-add <name>
# asdf plugin-add erlang
```

Nếu plugin mà bạn muốn cái đặt không có trong list của asdf. Bạn có thể thêm nó bằng đường dẫn URL:

```bash
asdf plugin-add <name> <git-url>
# asdf plugin-add elm https://github.com/vic/asdf-elm
```

##### Danh sách các  plugins được asdf hỗ trợ

```bash
asdf plugin-list
# asdf plugin-list
# java
# nodejs
```

```bash
asdf plugin-list --urls
# asdf plugin-list
# java            https://github.com/skotchpine/asdf-java.git
# nodejs          https://github.com/asdf-vm/asdf-nodejs.git
```
##### Xóa plugin

```bash
asdf plugin-remove <name>
# asdf plugin-remove erlang
```

##### Cập nhật plugins

```bash
asdf plugin-update --all
```

Nếu muốn cập nhật 1 package cụ thể . Dùng câu lệnh sau:

```bash
asdf plugin-update <name>
# asdf plugin-update erlang
```

##### Cập nhật asdf

```bash
asdf update
```


### Quản lý  versions

```bash
asdf install <name> <version>
# asdf install erlang 17.3

asdf current
# asdf current
# erlang 17.3 (set by /Users/kim/.tool-versions)
# nodejs 6.11.5 (set by /Users/kim/cool-node-project/.tool-versions)

asdf current <name>
# asdf current erlang
# 17.3 (set by /Users/kim/.tool-versions)

asdf uninstall <name> <version>
# asdf uninstall erlang 17.3
```

##### Danh sách các  versions đã được cài đặt

```bash
asdf list <name>
# asdf list erlang
```

##### Danh sách các  versions có sẵn

```bash
asdf list-all <name>
# asdf list-all erlang
```

#### Xem version hiện tại

```bash
asdf current <name>
# asdf current erlang
# 17.3 (set by /Users/kim/.tool-versions)
```

#### Đặt version hiện tại

```bash
asdf global <name> <version>
asdf local <name> <version>
# asdf global elixir 1.2.4
```

`global` ghi version vào  `$HOME/.tool-versions`.

`local`  ghi version vào `$PWD/.tool-versions`, Khởi tạo nếu cần thiết.
## Gỡ cài đặt
1. Trong `.bashrc` (hoắc `.bash_profile` nếu đang ở trong OSX)hoặc `.zshrc` tìm các dòng có nguồn` asdf.sh` và  tự động hoàn thành.
Các dòng sẽ giống như :
```bash
    . $HOME/.asdf/asdf.sh
    . $HOME/.asdf/completions/asdf.bash
```
Xóa các dòng này và lưu lại
2. Chạy `rm -rf ~ / .asdf /` để xóa hoàn toàn tất cả các file asdf khỏi hệ thống của bạn


Rất đơn giản phải không nào

Dưới đây mình  đã giới thiệu về cách cài đặt và sử dụng plugins `asdf`. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

Thao Khảo

https://github.com/asdf-vm/asdf