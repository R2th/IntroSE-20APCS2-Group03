## Cài đặt Neovim
* Mac
```
brew install neovim
```

* Ubuntu
```
sudo apt install neovim
```

* Window
```
choco install neovim
```

## Tạo file cấu hình
Đầu tiên tạo thư mục để chứa file cấu hình Neovim
```
mkdir ~/.config/nvim
```
Sau đó tạo file init.vim
```
touch ~/.config/nvim/init.vim
```

## Cài đặt vim-plug
```
curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```
Nếu bạn có file ```plugs.vim``` trong thư mục ```autoload``` là bạn đã cài đặt thành công

## Thêm một file mới cho plugins
Chúng ta sẽ đặt plugins trong những file riêng biệt để dễ quản lý 
```
mkdir ~/.config/nvim/vim-plug

touch ~/.config/nvim/vim-plug/plugins.vim
```

Thêm đoạn code sau vào file ```~/.config/nvim/vim-plug/plugins.vim```
```
" auto-install vim-plug
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  "autocmd VimEnter * PlugInstall
  "autocmd VimEnter * PlugInstall | source $MYVIMRC
endif

call plug#begin('~/.config/nvim/autoload/plugged')

    " Better Syntax Support
    Plug 'sheerun/vim-polyglot'
    " File Explorer
    Plug 'scrooloose/NERDTree'
    " Auto pairs for '(' '[' '{'
    Plug 'jiangmiao/auto-pairs'

call plug#end()
```
Sau đó thêm ```source $HOME/.config/nvim/vim-plug/plugins.vim``` vào file ```init.vim``` và lưu lại

## Một số câu lệnh vim-plug
Mở Neovim

``` nvim```

Kiểm tra status của plugins 

``` :PlugStatus ``` (Khi bạn đang ở trong ```nvim``` thì bạn nhấn ```Shift + ;``` để có dấu ```:```)

Cài đặt tất cả plugins

```:PlugInstall```

Cập nhật plugins

```:PlugUpdate```

Sau khi cập nhật xong bạn có thể nhấn ```d``` để thấy sự khác nhau hoặc chạy câu lệnh sau

```:PlugDiff```

Để xóa plugins trong file plugins.vim

```:PlugClean```

Nếu bạn muốn nâng cấp vim-plug

```:PlugUpgrade```

Cám ơn mọi người!:heart:

Xem thêm về vim-plug trên github: [https://github.com/junegunn/vim-plug](https://github.com/junegunn/vim-plug)

### Nguồn: [https://www.chrisatmachine.com/Neovim/01-vim-plug/](https://www.chrisatmachine.com/Neovim/01-vim-plug/)