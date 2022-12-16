Lang thang trên các trang blog, mình tình cờ tìm được một bài viết rất thú vị.  
Chi tiết tại [đây](https://kipalog.com/posts/Tu-Visual-Studio-Code-den-NeoVim)  
Từ khi dùng ubuntu mình cũng đã nghe nói đến Vim nhưng vẫn chưa dùng thử, cũng do nghe nói Vim rất khó dùng. Sau khi đọc bài viết trên, tính hiếu kỳ đã thôi thúc mình "Tại sao lại không thử một editor mới, và còn trông rất ngầu nữa :)" sau một thời gian mò mẫm config cho Vim và đây là kết quả:  
![](https://images.viblo.asia/3a9170bc-d4db-4c5f-8ff1-5f18c11832fb.png)  
## Cài đặt
### macOS/OSX
```
brew update
brew install vim
```  
### Linux
Dành cho Debian hay Ubuntu: 
```
sudo apt-get update
sudo apt-get install vim
```  
> Nên dùng phiên bản Vim > 7.3  
Để kiểm tra phiên bản: `vim --version`  
## Config cho Vim
### Vundle
Vim có một vài trình quản lý extension, trong bài viết này mình đề xuất dùng Vundle.  
Cài đặt Vundle:  
`git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim`  

Sau khi cài đặt Vundle bạn có thể quản lý các extension và config Vim theo ý muốn của mình tại file `.vimrc`  
Tạo file `.vimrc`:  
`touch ~/.vimrc`  
### Config
Viết các config sau vào file `.vimrc`
```
set nocompatible              
filetype off                  

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'gmarik/Vundle.vim'

call vundle#end()            
filetype plugin indent on    
``` 
Sau đó lưu lại, khởi động Vim tại `NORMAL MODE` chạy `:PluginInstall`  để khởi tạo Vundle sau đó thoát Vim và quay trở lại file `.vimrc`  
Tiếp theo ta cài thêm một số plugin cho Vim, mình dùng ngôn ngữ python và ruby nên thêm các Plugin sau:  
```
 Plugin 'tmhedberg/SimpylFold' " Dùng để thu gọc các class hay function
 Plugin 'vim-scripts/indentpython.vim' " Fix indent theo chuẩn PEP8 của python
 Plugin 'vim-syntastic/syntastic' " Vim sẽ check syntax sau mỗi lân lưu
 Plugin 'nvie/vim-flake8' " Đi cùng với syntastic là cú pháp kiểm tra chuẩn PEP8 của python
 Plugin 'scrooloose/nerdtree' " Vim sẽ hiển thị cây thư mục của project
 Plugin 'jistr/vim-nerdtree-tabs' " Tương tự nerd-tree
 Plugin 'tpope/vim-fugitive' " Tích hợp Git vào Vim
 Plugin 'Lokaltog/powerline', {'rtp': 'powerline/bindings/vim/'} " Hiện thanh trạng thái 
 
 Bundle 'Valloric/YouCompleteMe' " Một plugin auto-complete
 
  Bundle 'tomasr/molokai' " Cài monokai theme, đây là theme mặc định của Sublime Text
 
 " Rails
 Bundle 'tpope/vim-rails.git'
 Bundle 'vim-ruby/vim-ruby'
 Bundle 'tpope/vim-surround' " Giúp bọc các đoạn ngoặc {, [, ( thuận tiện hơn
 Bundle 'jiangmiao/auto-pairs' " Tự động tạo các ngoặc đóng khi mở ngoặc
 ```  
 Cài indent:  
 ```
set expandtab                                                                                                                                                            
set smarttab
set shiftwidth=2
set tabstop=2
set softtabstop=2 
 ```  
 Bạn có thể đặt indent riêng biệt cho từng loại file:  
 ```
 au BufNewFile, BufRead *.py
     \ set tabstop=4
     \ set softtabstop=4
     \ set shiftwidth=4
     \ set textwidth=79
     \ set expandtab
     \ set autoindent
     \ set fileformat=unix
 
 au BufNewFile, BufRead *.js, *html, *.css
     \ set tabstop=2
     \ set softtabstop=2
     \ set shiftwidth=2
```  
Trên đây là một số config cơ bản.
Các bạn cũng có thể tham khảo config của mình:  
```
set nocompatible	" required
set encoding=utf-8
filetype off		" required

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
"call vundle#begin('~/some/path/here')

Plugin 'gmarik/Vundle.vim'
Plugin 'tmhedberg/SimpylFold'
Plugin 'vim-scripts/indentpython.vim'
Plugin 'vim-syntastic/syntastic'
Plugin 'nvie/vim-flake8'
Plugin 'jnurmine/Zenburn'
Plugin 'scrooloose/nerdtree'
Plugin 'jistr/vim-nerdtree-tabs'
Plugin 'kien/ctrlp.vim'
Plugin 'tpope/vim-fugitive'
Plugin 'Lokaltog/powerline', {'rtp': 'powerline/bindings/vim/'}

Bundle 'Valloric/YouCompleteMe'
" Rails
Bundle 'tpope/vim-rails.git'
Bundle 'tomasr/molokai'
Bundle 'vim-ruby/vim-ruby'
Bundle 'tpope/vim-surround'
Bundle 'jiangmiao/auto-pairs'


call vundle#end()		" required
filetype plugin indent on	"required

syntax enable

set background=dark
let g:molokai_original=1
let g:rehash256=1
set t_Co=256
colorscheme molokai
" Show trailing whitespace and spaces before a tab:
:highlight ExtraWhitespace ctermbg=red guibg=red
:autocmd Syntax * syn match ExtraWhitespace /\s\+$\| \+\ze\\t/

" Tab completion
set wildcharm=<tab>
set wildmode=list:longest,list:full
set wildignore+=*.o,*.obj,.git,*.rbc,*.class,.svn,vendor/gems/*

" Avoid using arrow
inoremap  <Up>     <NOP>
inoremap  <Down>   <NOP>
inoremap  <Left>   <NOP>
inoremap  <Right>  <NOP>
noremap   <Up>     <NOP>
noremap   <Down>   <NOP>
noremap   <Left>   <NOP>
noremap   <Right>  <NOP>

" highlight the current line
set cursorline
" Highlight active column
" set cuc cul

set splitbelow
set splitright
set expandtab
set smarttab
set shiftwidth=2
set tabstop=2
set softtabstop=2

set ai
set si


"split navigation
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
nmap <F6> :NERDTreeToggle<CR>

nnoremap <space> za

au FileType php setl ofu=phpcomplete#CompletePHP
au FileType ruby,eruby setl ofu=rubycomplete#Complete
au FileType html,xhtml setl ofu=htmlcomplete#CompleteTags
au FileType css setl ofu=csscomplete#CompleteCSS
au FileType python setl ofu=pythoncomplete#Complete

autocmd BufWritePre * :%s/\s\+$//e

au BufNewFile, BufRead *.py
    \ set tabstop=4
    \ set softtabstop=4
    \ set shiftwidth=4
    \ set textwidth=79
    \ set expandtab
    \ set autoindent
    \ set fileformat=unix

au BufNewFile, BufRead *.js, *html, *.css
    \ set tabstop=2
    \ set softtabstop=2
    \ set shiftwidth=2


au BufNewFile, BufRead *.erb, *.html.erb
    \ set tabstop=2
    \ set softtabstop=2
    \ set shiftwidth=2

let g:ycm_autoclose_preview_window_after_completion=1
map <leader>g  :YcmCompleter GoToDefinitionElseDeclaration<CR>

let python_highlight_all=1
syntax on

" Hide pyc file
let NERDTreeIgnore=['\.pyc$', '\~$'] "ignore files in NERDTree
set nu
set clipboard=unnamed
```
Đây là bài viết đầu tiên của mình, mọi góp ý các bạn comment phía dưới.  
Cảm ơn các bạn đã xem bài viết này :*  
Nguồn: 
https://realpython.com/vim-and-python-a-match-made-in-heaven/  
https://janjiss.com/walkthrough-of-my-vimrc-file-for-ruby-development/  
Cheat sheet của Vim cho bạn nào mới bắt đầu:    
https://vim.rtorr.com/