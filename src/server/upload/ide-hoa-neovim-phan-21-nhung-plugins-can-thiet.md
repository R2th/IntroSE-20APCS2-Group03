Tiếp tục series IDE hoá neovim, hôm nay mình sẽ giới thiệu với các bạn những plugins nên có khi setup neovim của bạn cho bất kì ngôn ngữ nào.
# Nerdtree
Nerdtree là một sidebar quản lý cây thư mục của project. Tương tự như sidebar của vscode, nerdtree cung cấp function tạo bookmark, folder, file, copy, thêm, xoá, sửa... ngay trong context của nerdtree cực kì tiện lợi.
```sh
// 01.pugins.nvim
Plug 'scrooloose/nerdtree'
```
 Sau khi cài đặt xong bạn map lại keys để toggle nerdtree theo ý mình:
 ```sh
 // 02.plugin-settings.nvim
 map <C-b> :NERDTreeToggle<CR> 
// nhấn tổ hợp phím Ctrl +b để show/hide Nerdtree 
map <C-i> :NERDTreeFind<CR> 
//từ màn hình code
// nhấn tổ hợp phím Ctrl + i để tìm vị trí của file trong nerdtree 
// xem phim nhiều tuỳ chỉnh tại 
https://github.com/scrooloose/nerdtree
 ```
 
Khi đang trong context của nerdtree, bạn nhấn **?** để xem cách sử dụng nerdtree.
![](https://i.gyazo.com/19b8b61d9e503ffa075d139d04dc554e.png)

# Theme 
Đối với mình phần syntax, màu sắc text, highlight ...  sẽ là những thứ truyền cảm hứng khi code. Sau khi thử qua rất nhiều theme thì hiện tại mình đang dừng lại với [gruvbox](https://github.com/morhetz/gruvbox). Các bạn có thể search google với keyword "neovim themes" là ra cả núi, các bạn có thể tham khảo theme được nhiều người đánh giá và sử dụng ở [đây](https://blog.pabuisson.com/2018/06/favorite-color-schemes-modern-vim-neovim/).

```sh
// 01.plugins.nvim
Plug 'morhetz/gruvbox'
// 03.plugin-settings.nvim
syntax enable
set background=dark
highlight Normal ctermbg=None
colorscheme gruvbox // vì mình xài theme gruvbox
set termguicolors
```
# Vim-airline
![](https://raw.githubusercontent.com/wiki/vim-airline/vim-airline/screenshots/demo.gif)
[Vim-airline](https://github.com/vim-airline/vim-airline) hiển thị status/tabline , có thể integrate với các plugin khác để hiển thị message, status như git, nerdtree, linter.
![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1573382563060.png)
# Ctrlp.vim

Nếu các bạn sử dụng editor như vscode, sublime, atom chắc quá quen thuộc với tổ hợp phím Ctrl+P dùng để tìm kiếm file trong project hiện tại.

[Ctrlp.vim](https://github.com/kien/ctrlp.vim) có chức năng tương tự, nhưng  có nhiều function hơn, bạn có thể mở file hiện tại ra một buffer | tab mới mà vẫn giữ buffer cũ.
```sh
// 01.plugins.nvim
Plug 'kien/ctrlp.vim'
// 03.plugin-settings.nvim
let g:ctrlp_custom_ignore = {
    \ 'dir':  '\v[\/](node_modules|build|public|lib|dist)|(\.(git|svn))$',
    \ 'file': 'tags\|tags.lock\|tags.temp',
\ }
```
Keys binding:
![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1573374163776.png)
Sử dụng:
![](https://i.gyazo.com/774a32a022a9197e80f29358ad0a70e3.gif)
# Vim-surround
[Vim-surround](https://github.com/tpope/vim-surround) cung cấp function để thao tác xung quanh 1 chủ thể ( một đoạn code, một từ, một object.....)

Ở trang git của vim-surround đã nói rất chi tiết về cách sử dụng nên mình sẽ không trình bày lại nữa, các bạn có thể xem tại github của vim-surround.
```sh
//01.plugins.nvim
Plug 'tpope/vim-surround'
```
### Một số Use-case:
Usecase:
```javascript
const Component = ({label, ...rest}) => {
  return <div>default text</div>;
};
// mình kiểm tra nếu label =true thì sẽ dùng label,
// ngược lại show mặc định
```
![](https://i.gyazo.com/c0159d5a8d2685fc247d356eb070c062.gif)

Usecase:
```javascript
<Provider store=[store]>
  <App />
</Provider>
// mình muốn đổi [store] thành {store} 
// sau đó wrap lại với BrowserRouter
```
![](https://i.gyazo.com/58e88b2a619e4f6eb7612a592bfad7f4.gif)

# Vim-easymotion
Di chuyển đến bất kì vị trí nào trong màn hình code của bạn với vim-easymotion. Chỉ cần input vào 1|2 kí tự là prefix của từ đó, [vim-easymotion](https://github.com/easymotion/vim-easymotion) sẽ bind tất cả các key để nhảy đến những từ match với kí tự đó.
```sh
//01.plugins.nvim
Plug 'easymotion/vim-easymotion'
// 03.plugin-settings.nvim
nmap <silent> gw <Plug>(easymotion-overwin-f2) // nhận vào 2 kí tự prefix
let g:EasyMotion_smartcase = 1
```
![](https://i.gyazo.com/17e6fb57a853cd1db9b233d94bbe6f5b.gif)
# Kết bài

Mình xin kết thúc phần 1 tại đây ( mình sẽ chia ra làm 2 phần). Ở đây mình chỉ giới thiệu  những plugins mang tính chất chung cho một IDE như quản lý thư mục, theme, navigator, search file ...., những plugins không thuộc về bất kì một  ngữ nào hết.

Các bạn đăng kí vào Codefun để cùng tham gia bàn luận, viết bài, chia sẻ và học hỏi những kiến thức bổ ích cùng nhau nhé. Trong quá trình tìm hiểu nếu có thắc mắc gì các bạn cứ để lại ở phần comment mình sẽ giải đáp sớm nhất có thể.

Cảm ơn các bạn đã đọc bài và....hẹn gặp lại ở phần 2.
# Nguồn
https://nextlint.com/technology/cai-dat-plugins-va-setup-neovim-co-ban-ccfa0f7a3ff7