![](https://images.viblo.asia/4ff09461-b0af-4f7f-bcdf-7cd2e2e65279.png)


# Lời nói đầu
Mặc dù sở hữu keymap bá đạo và giúp cho người dùng trở nên vô cùng ảo ma một khi đã thuần thục, bản thân **Neovim** hay cả **Vim** đều có giao diện mặc định khá tệ hại, ảnh hưởng rất lớn tới người muốn tiếp cận. Trong nội dung bài này, mình sẽ cùng các bạn setup một môi trường code tốt hơn (rất nhiều), thậm chí có thể đáp ứng daily workflow của các bạn 😊

![image.png](https://images.viblo.asia/a87f1ba3-04c2-4b10-848e-5db83c94f308.png)

# Cài đặt Neovim

Có nhiều cách để cài đặt **Neovim** thậm chí ngay từ command line, như sử dụng LaunchPad PPA repo, Snapcraft, Flatpak,... Tuy nhiên phần lớn những bên này đều chưa update phiên bản mới nhất. Tại thời điểm viết bài, **Neovim** đã ra phiên bản 0.7 được 2 tuần. Và trong bài này mình sẽ cố gắng sử dụng phiên bản mới nhất này để demo, giúp cho cả những bạn tiếp cận sau không bị quá outdated 😂 Và trong bài này mình sẽ sử dụng [Homebrew](https://docs.brew.sh/Homebrew-on-Linux)

```bash
brew install neovim
```

Sau khi cài đặt thành công, bạn có thể gõ `nvim` (không phải `neovim` nhé) và nó sẽ đưa bạn vào màn mình start của **Neovim**. *Bản mới nhưng giao diện mặc định vẫn tệ như những phiên bản trước =))*

Ok nếu bạn nào đã vào trong rồi thì hãy `:q` để thoát, sau đó chúng ta sẽ tạo 1 file config và bắt đầu hành trình tùy biến **Neovim**

# Option

Như bài trước mình đã nói thì **Neovim** hỗ trợ cả **VimScript** lẫn **Lua**, tuy nhiên do trình độ có hạn và mình lỡ tiếp cận **Vim** bằng **VimScript** nên trong bài này, các config sẽ viết trên **VimScript**.
**Neovim** (và cả **Vim**) nhận config từ một path cụ thể là `~/.config/nvim/init.vim` (hoặc `~/.config/nvim/init.lua` nếu bạn dùng **Lua**). Thời điểm hiện tại file này hẳn chưa tồn tại do mình mới cài đặt, và **Neovim** đang dùng mọi config mặc định. Chúng ta sẽ tạo và mở file này.

```bash
install -Dv /dev/null ~/.config/nvim/init.vim
nvim ~/.config/nvim/init.vim
```

Tiếp theo chúng ta cùng thêm một vài options tăng độ thiện cảm cho người dùng
```bash
set number
set relativenumber
set tabstop=4
set softtabstop=4
set shiftwidth=4
set smarttab
set expandtab
set autoindent
set list
set listchars=tab:▸\ ,trail:·
set clipboard=unnamedplus
set encoding=UTF-8

syntax on
filetype plugin on
```

Giải thích qua một chút thì 
* `number` và `relativenumber` giúp hiện hàng đánh số thứ tự line dạng relative, bạn có thể nhìn vào và biết tổ hợp hành động của mình sẽ như nào, ví dụ đang ở dòng 5, muốn xóa tới hết dòng `set mouse=a` thì ấn `d7j` (ấn `u` để undo nhé =)))
* `tabstop`, `softtabstop`, `shiftwidth`, `smarttab`, `expandtab`, `autoindent` nhằm định nghĩa lại một số behavior của nút `Tab`và indent
*  `list` và `listchars` giúp chúng ta dễ hình dung những khoảng trống là gì
*  `clipboard=unnamedplus` giúp **Neovim** sử dụng chung bộ nhớ clipboard với hệ thống 
*  Danh sách đầy đủ cũng như giải thích chi tiết có ở đây. https://neovim.io/doc/user/options.html 
    
Sau khi lưu lại `:w`, các bạn có thể quit vào lại, hoặc gõ `:source %` để nạp lại luôn options mới
    
![image.png](https://images.viblo.asia/5a569bc6-a28e-4297-8bbf-8cb23ad95fb4.png)

# Keymap
    
 Keymapping nhằm mục đích tạo shortcut để lặp lại một hoặc một tổ hợp các lệnh. Keymap mặc định của **Neovim** là tương đối mạnh mẽ, nhưng mình vẫn muốn custom thêm một chút cho phù hợp với thói quen/sở thích bản thân.
 
 ## Tạo keymap
 
 ### Cú pháp cơ bản để set một keymap 
 
 ```bash
 {context} {attribute?} {input} {result}

trong đó

{context} - ngữ cảnh mà shortcut này có thể khởi động
{attribute?} - thuộc tính, không bắt buộc, có thể là các giá trị sau: <buffer>, <silent>,
       <expr> <script>, <unique> and <special>. Có thể có nhiều attribute cùng lúc
{input} - là một hoặc tổ hợp các key bạn muốn ấn để khởi động shortcut này
{result} - là sự phối hợp của các key mặc định hoặc câu lệnh cụ thể để tạo ra kết quả bạn mong muốn
```

Ví dụ, đang ở trong *Insert Mode*, mình thấy với tay lên `<Esc>` để trở lại `Normal Mode` là hơi tốn kalo, nên mình muốn khi đang trong *Insert Mode*, có thể ấn `jj` để thoát, thì mình sẽ khai báo trong file config thêm 1 dòng là

```
imap jj <esc>
```

### Các loại context


Mặc định khi khai báo map là nó sẽ đệ quy. Giả sử bạn map `j` thành `k`, và `k` thành `j` => khi bạn ấn `j` nó sẽ foward gọi thành `k`, `k` forward gọi thành `j` và 💥Để tránh điều này xảy ra thì **VimScript** có một khai báo `nore` - no recursive. Dưới đây là các context khả dụng



| Flag |Mode | Cú pháp khả dụng |
| -------- | -------- | -------- |
| n    | Normal mode     | `nmap` `nnoremap`     |
| i | Insert mode | `imap` `inoremap`|
| v | Visual + Select mode | `vmap`  `vnoremap` |
| x | Visual mode | `xmap` `xnoremap` |
| s | Select mode | `smap` `snoremap` |
| o | Operator Pending mode | `omap` `onoremap` |
| ! | Insert + Command Line mode | `map!` `noremap!` |
| | Normal + Visual + Operator Pending mode | `map` `noremap` |


## Một số keymap mình thấy hữu ích

```bash
let mapleader = "\<space>"

" Quick edit and reload vim config
nmap <leader>ve :edit ~/.config/nvim/init.vim<cr>
nmap <leader>vr :source ~/.config/nvim/init.vim<cr>

" Remove all buffers (recent open files)
nmap <leader>Q :bufdo bdelete<cr>

" Remove highlight
noremap <silent> <esc> :noh <CR>

" Allow gf to open/create non exists file
map gf :edit <cfile><cr>

" Maintain the cursor position when yanking a visual selection
" http://ddrscott.github.io/blog/2016/yank-without-jank/
vnoremap y myy`y
vnoremap Y myY`y

" Make Y behave like other capitals
nnoremap Y y$

" Quicky escape to normal mode
imap jj <esc>

" Save file the traditional way
imap <C-s> <esc> :w <cr>
nmap <C-s> :w <cr>

" Search selected text
vnoremap // y/\V<C-R>=escape(@",'/\')<CR><CR>
```

# Chia để trị

Nếu các follow mình thì hiện cái file `init.vim` sẽ tựa tựa như này.

![image.png](https://images.viblo.asia/1b5364a2-cb97-4ead-9c44-ec759515a9a4.png)

Có chút lộn xộn rồi đấy. Mà mình chỉ mới config cho options và keymaps thôi. Còn cả đống plugins cần giới thiệu. Chúng ta sẽ chia nhỏ những config này ra để tiện quản lý nhé.

* Đầu tiên, gõ `ggO` để tạo một dòng trên cùng của file và type vào:
```bash
source ~/.config/nvim/options.vim
```

* Trở về *Normal Mode*, ấn `j` để xuống dòng thứ 2, mình sẽ thấy dòng `filetype plugin on` của mình đang được đánh số 14, nên mình sẽ cut phần này bằng lệnh `d14j`, rồi ấn `k` để quay lại dòng 1.

* ở keymap mình có khai báo `gf` để tạo 1 file chưa tồn tại, mình sẽ để con trỏ vào địa chỉ file `options.vim` kia (chỗ nào trên đường dẫn là được) và gõ `gf` để mở.
* ấn `p` để paste đoạn options, `kdd` cho nó xóa dòng bị thừa do dính ký tự xuống dòng, và `ctrl s` để lưu
* ấn `:bn` để quay lại file `init.vim`, ấn `yyp` để clone dòng source options.vim đó
* ấn `fp` để đi tới word `options`, ấn `ciw` và sửa thành `keymaps` rồi `ctrl s` 
* tiếp tục navigate tới dòng `let mapleader`, lần này mình sẽ cắt hết đoạn dưới luôn bằng lệnh `dG`
* làm tương tự như trên, `k` `f/` `gf` `pkdd`, `ctr s`
* nạp lại bằng lệnh `space vr` xem nó còn ok chứ 🤣

# Plugin
Trước tiên để cài đặt được plugin trên **Neovim** thì chúng ta cần sử dụng một trình quản lý plugin. Và trong series này thì mình sẽ sử dụng [VimPlug](https://github.com/junegunn/vim-plug) vì nó dễ sử dụng và hỗ trở cả trên **Vim** lẫn **Neovim**.

Tại file `init.vim`, chúng ta tiếp tục clone 1 dòng nữa xuống dưới cùng và đặt tên là `plugins.vim` chẳng hạn, sau đó `gf` để mở file

![image.png](https://images.viblo.asia/52960759-604d-4416-8afe-a01576762166.png)

Chi tiết về quá trình cài đặt các bạn có thể tìm trong hướng dẫn của **VimPlug** mà mình đã dẫn link ở trên. Tuy nhiên, mình mò được một trick trên mạng, giúp tự cài đặt **VimPlug**, bằng cách copy đoạn sau và dán lên trên cùng

```bash
" Automatically install vim-plug
let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin(data_dir . '/plugins')


call plug#end()
```

Các bạn chú ý 2 dòng `call plug#begin` và `call plug#end`, tiếp theo, các package chúng ta muốn cài sẽ cần phải đặt giữa 2 dòng này. Ngoài ra lệnh trên sẽ được thực thi khi sự kiện `VimEnter` xảy ra, nên chúng ta cần thoát **Neovim** và vào lại nhé. Tiếp theo đây chúng ta có thể bắt đầu cài plugin được rồi 😂

## Theme
Cùng bắt đầu với customtize cái statusline, ở đây mình sử dụng [Lightline](https://github.com/itchyny/lightline.vim) là một package giúp hiện trạng thái của con trỏ, như Mode, dòng, cột,...

Để cài đặt một plugin, chúng ta sẽ cần khai báo `Plug '<link-github-của-plugin>'`. Có thể khai báo tối giản kiểu `itchyny/lightline` nhưng nên gõ đầy đủ để có thể dễ mở link hơn. Đối với cái statusline này chúng ta chỉ cần copy dòng dưới đây và nhét vào giữa 2 cái dòng `call plug#`

```bash
Plug 'https://github.com/itchyny/lightline.vim'
```

Sau khi khai báo link của plugin, việc cần làm còn lại là :
* Lưu config `ctr s`
* Nạp lại config `space vr`
* Tải plugin `:PlugInstall` và ấn enter
* Nạp lại editor lần nữa  `space vr`
* Một số plugin có thể sẽ yêu cầu khởi động lại editor để có hiệu lực
 
Tới lúc này sẽ có một cái status thay cho cái mặc định ở dưới, nhìn qua cũng không tệ 🤣

![image.png](https://images.viblo.asia/754333c7-ef4d-47be-9f66-cdadc78875de.png)

Tiếp đến là colorscheme. Ở đây mình chọn [OneDark](https://github.com/navarasu/onedark.nvim) Cái này là tùy khẩu vị mỗi người, các bạn có thể tự chọn màu khác trên mạng nhé.

```bash
Plug 'https://github.com/navarasu/onedark.nvim'
```

Tiếp tục làm các bước để cài đặt plugin. Sau đó chúng ta cần define colorscheme cho editor, và việc khai báo này cần nằm dưới `call plug#end()`, nếu không lần mở editor sau nó sẽ hú lỗi vì không tìm thấy colorscheme 😰 Vì mình dùng theme `onedark` nên mình cũng sẽ khai báo lightline dùng theme `one` luôn
```bash
colorscheme onedark
let g:lightline = {
    \ 'colorscheme': 'one'
    \ }
```

![image.png](https://images.viblo.asia/fa3a83e2-5d5d-4a54-83de-17f3686ba7cd.png)

## Chia nhỏ config plugin và Auto command

Một lần nữa, mình sẽ tiếp tục chia nhỏ các plugin và config của những plugin đó vào từng file riêng, tránh tạo ra 1 god file để định nghĩa các plugin. Thoát khỏi **Neovim** và tạo một file `theme.vim` nằm trong sub-directory `plugins`

```bash
install -Dv /dev/null ~/.config/nvim/plugins/theme.vim
```

Quay trở lại `plugins.vim` và move những gì liên quan tới statusline và colorscheme vào trong file `theme.vim` vừa tạo

![image.png](https://images.viblo.asia/aa584c78-8b21-4261-81be-89d53bf8c64c.png)
![image.png](https://images.viblo.asia/7b49e5de-fef9-4ee8-8607-0cc27a71fe91.png)

Lúc này nếu bạn nạp lại config thì sẽ không có vấn đề gì, nhưng nếu khởi động lại **Neovim** thì hẳn sẽ thấy lỗi kiểu như này.
![image.png](https://images.viblo.asia/40cb3dce-a6b6-471c-a69d-0225263d2abe.png)

Lý do thì cũng như mình vừa nói ở trên, đoạn source file này đã đưa khai báo colorscheme vào bên trong `call plug#`, chúng ta cần phải tìm cách để đưa nó ra ngoài một lần nữa. Và mình sẽ sử dụng Auto Command. Đầu tiên mình sẽ tạo ra một sự kiện phía dưới `call plug#`, nằm trong namespace là `User` để nó không tự động thực thi, tên là `PlugLoaded` chẳng hạn. 

```bash
doautocmd User PlugLoaded
```

![image.png](https://images.viblo.asia/532924e8-122f-43f4-9bb3-e584a9009e71.png)

Tiếp theo, trong file `theme.vim`, mình sẽ khai báo chạy lệnh colorscheme dưới namespace của `PlugLoaded`, tức là khi nào `PlugLoaded`, thì mới gọi `colorscheme onedark` ra.

![image.png](https://images.viblo.asia/e99846d9-7670-4f52-a5ec-62e27bea062e.png)

Thời điểm này nếu khởi động lại **Neovim** thì sẽ ổn rồi đấy 😍

## Tìm kiếm file

Navigate giữa các file trong một project lớn là một điều quan trọng, và thật may mắn khi có [Telescope](https://github.com/nvim-telescope/telescope.nvim) cover phần này. Các package mà Telescope đề nghị gồm:
* [ripgrep](https://github.com/BurntSushi/ripgrep) - để tìm kiếm dựa trên nội dung file
*  [Fd](https://github.com/sharkdp/fd#installation) hỗ trợ tìm kiếm file
*  [Fzf](https://github.com/junegunn/fzf) tăng hiệu suất tìm kiếm

Chi tiết cách cài đặt có ở link. Mình dùng Ubuntu nên sẽ cài thông qua apt:
```bash
sudo apt install ripgrep
sudo apt-get install fd-find
sudo apt-get install fzf
```


Xong rồi thì quay lại `plugins.vim` và thêm một entry nữa, đặt tên là `telescope.vim` chẳng hạn

![image.png](https://images.viblo.asia/9097f84b-992c-4182-9ad4-93b142020edb.png)

Tiếp tục `gf` vào file và điền các package yêu cầu, cũng như keymap đề nghị và setup config cho Telescope. Ngoài ra mình setup thêm tổ hợp `ctr p` để find file vì là phím tắt quen thuộc của mình trên VSCode 🤣
```bash
Plug 'https://github.com/nvim-telescope/telescope.nvim'
Plug 'https://github.com/nvim-lua/plenary.nvim'
Plug 'https://github.com/nvim-telescope/telescope-fzy-native.nvim'
Plug 'https://github.com/sharkdp/fd'

" Find files using Telescope command-line sugar.
nnoremap <C-p> <cmd>Telescope find_files<cr>
nnoremap <leader>ff <cmd>Telescope find_files<cr>
nnoremap <leader>fg <cmd>Telescope live_grep<cr>
nnoremap <leader>fb <cmd>Telescope buffers<cr>
nnoremap <leader>fh <cmd>Telescope help_tags<cr>

function SetupTelescope()
lua << EOF
require'telescope'.setup({
    defaults = {
        file_ignore_patterns = { "^./.git/", "^node_modules/", "^vendor/" },
    },
    pickers = {
        find_files = {
            hidden = true
        }
    }
})
require'telescope'.load_extension('fzy_native')
EOF
endfunction

augroup TelescopeOverrides
    autocmd!
    autocmd User PlugLoaded call SetupTelescope()
augroup END
```

Sau khi install và quite editor, chúng ta cùng trải nghiệm nó một chút chính thư mục config nào bằng cách mở nvim tại thư mục config nhé
```bash
z ~/.config/nvim
nvim .
```

lúc này bạn có thể thử `ctrl p` hoặc `space ff` để mở tìm kiếm bằng tên file, `space fg` để tìm kiếm nội dung file, `space fb` để mở buffers coi các file đã mở gần đây. Và rất nhiều shorcut key cho từng màn, các bạn có thể tìm hiểu thêm trên trang chủ telescope.

## LSP + Treesitter

Nhằm giúp tăng trải nghiệm code của **Neovim**, chúng ta sẽ tiếp tục setup các thành phần LSP, popup, treesitter mà mình đã giới thiệu ở bài truớc. Đầu tiên vẫn là tạo 1 thêm 1 file config riêng, mình sẽ đặt là `intel.vim`

```bash
Plug 'https://github.com/junnplus/nvim-lsp-setup'
Plug 'https://github.com/neovim/nvim-lspconfig'
Plug 'https://github.com/williamboman/nvim-lsp-installer'
Plug 'https://github.com/hrsh7th/cmp-nvim-lsp'
Plug 'https://github.com/hrsh7th/cmp-buffer'
Plug 'https://github.com/hrsh7th/cmp-path'
Plug 'https://github.com/hrsh7th/cmp-cmdline'
Plug 'https://github.com/hrsh7th/nvim-cmp'
Plug 'https://github.com/hrsh7th/cmp-vsnip'
Plug 'https://github.com/hrsh7th/vim-vsnip'
Plug 'https://github.com/nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}

function SetupTreesitter()
lua << EOF
require'nvim-treesitter.configs'.setup {
  ensure_installed = {
      "lua",
      "php",
      "html",
    }
}
EOF
endfunction

function SetupLsp()
lua << EOF
require('nvim-lsp-setup').setup({
    mappings = {
        gf = 'lua vim.lsp.buf.formatting()',
        gd = 'lua require"telescope.builtin".lsp_definitions()',
        gi = 'lua require"telescope.builtin".lsp_implementations()',
        gr = 'lua require"telescope.builtin".lsp_references()',
    },
    servers = {
        intelephense = {},
    },
})
EOF
endfunction

function SetupCompletion()
lua <<EOF
  local cmp = require'cmp'

  cmp.setup({
    snippet = {
      expand = function(args)
        vim.fn["vsnip#anonymous"](args.body) -- For `vsnip` users.
      end,
    },
    mapping = cmp.mapping.preset.insert({
      ['<C-b>'] = cmp.mapping.scroll_docs(-4),
      ['<C-f>'] = cmp.mapping.scroll_docs(4),
      ['<C-Space>'] = cmp.mapping.complete(),
      ['<C-e>'] = cmp.mapping.abort(),
      ['<CR>'] = cmp.mapping.confirm({ select = true }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
    }),
    sources = cmp.config.sources({
      { name = 'nvim_lsp' },
      { name = 'vsnip' }, -- For vsnip users.
    }, {
      { name = 'buffer' },
    })
  })

  -- Use buffer source for `/` (if you enabled `native_menu`, this won't work anymore).
  cmp.setup.cmdline('/', {
    mapping = cmp.mapping.preset.cmdline(),
    sources = {
      { name = 'buffer' }
    }
  })

  -- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).       
  cmp.setup.cmdline(':', {
    mapping = cmp.mapping.preset.cmdline(),
    sources = cmp.config.sources({
      { name = 'path' }
    }, {
      { name = 'cmdline' }
    })
  })

EOF
endfunction


augroup LspOverrides
    autocmd!
    autocmd User PlugLoaded call SetupTreesitter()
    autocmd User PlugLoaded call SetupLsp()
    autocmd User PlugLoaded call SetupCompletion()
augroup END
```

Đây là config mẫu cho project php cơ bản, mà mình đã sử dụng **intelephense**. Các bạn sẽ thấy mình đã chia việc setup này làm 3 hàm cho dễ hình dung
* ở `SetupTreesitter()` thì các bạn cần chú ý thêm các ngôn ngữ bạn muốn vào trong object `ensure_installed`, hoặc replace object đó với `"all"` để cài đặt (cỡ 160 ngôn ngữ gì đó)
* ở `SetupLsp()`, mình dùng package [nvim-lsp-setup](https://github.com/junnplus/nvim-lsp-setup) để nó cover hầu hết phần khó cho mình, còn lại mình chỉ khai báo thêm keymap tích hợp **telescope** và LSP mà mình dùng, cụ thể là **intelephense**. Coi default keymap ở document trên cái link trên. Ngoài ra các bạn cần chú ý các requirement của **LSP** tại https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md. Ví dụ mình dùng `intelephense` thì cần cài đặt npm package `intelephense` ở mức global (`npm i -g intelephense`) và thêm dòng `intelephense = {},` bên trong object `servers`
* đối với `SetupCompletetion()`, các bạn chỉ cần để ý setup keymap là được 😊

## Và các plugin khác

Sau khi hoàn thành cài đặt như trên, **Neovim** của chúng ta đã tương đối ra dáng một IDE rồi 😊 Và bạn hẳn cũng đã hình dung ra cách cài đặt plugins. Ở phần này mình sẽ liệt kê các plugin khác mà mình dùng cho daily workflow để các bạn có thể tìm hiểu và tự cài đặt
* [Coc Explorer](https://github.com/weirongxu/coc-explorer) - là một phần mở rộng của [Coc](https://github.com/neoclide/coc.nvim), plugin này cho bạn một UI của explore cực kỳ đẹp mắt, đầy đủ chức năng cho việc navigate + manipulate file/directory
* [Github Copilot](https://github.com/github/copilot.vim) - trợ lý ảo suggest code cực bá đạo
* [EasyMotion](https://github.com/easymotion/vim-easymotion) - navigate trong screen, vô cùng nhanh và dễ dàng.
* [Floaterm](https://github.com/voldikss/vim-floaterm) - mở 1 popup terminal ngay trong editor và sử dụng
* [NerdCommeter](https://github.com/preservim/nerdcommenter) - thêm một action `gc` để comment. ví dụ `gcc` để comment dòng hiện tại, `gc4j` để comment dòng hiện tại và 4 dòng phía dưới.
* [Surround](https://github.com/tpope/vim-surround) - thêm một count `s` để làm việc với xung quanh tương tự như [tổ hợp với inside/around](https://viblo.asia/p/vim-la-gi-va-tai-sao-nen-hoc-su-dung-6J3ZgR0gKmB#_to-hop-voi-insidearound-10). Ví dụ muốn đổi `"hello"` thành `'hello'`, ta chỉ cần sử dungj `cs"'`
* [Neoformat](https://github.com/sbdchd/neoformat) - format sử dụng prettier
* [Sayonara](https://github.com/mhinz/vim-sayonara) - tắt file và xóa khỏi buffers (recent files)
* [NeoScroll](https://github.com/karb94/neoscroll.nvim) - scroll mượt hơn
* [WordMotion](https://github.com/chaoren/vim-wordmotion) - phân tách các word được viết bằng `camelCase` hoặc `snake_case`

Và còn nhiều nữa...

# Tổng kết

Chúng ta đã vừa điểm qua cách mình biến **Neovim** thành một code editor có tương đối đấy đủ các chức năng. Hi vọng qua bài này, các bạn làm quen với cách cài đặt cũng như sử dụng **Vim** thông qua các ví dụ.

![image.png](https://images.viblo.asia/66446a4b-d2e7-4dce-a6d0-375f4dc3a78f.png)

Ngoài ra các bạn có thể tham khảo phiên bản đầy đủ toàn bộ [dotfiles của mình](https://github.com/l3aro/dotfiles). Dưới đây là preview **Neovim** mà mình xài, cùng một spotlight với ảnh trên

![image.png](https://images.viblo.asia/67659fce-5112-4f57-a8fa-993a3f1c0b5b.png)

Hẹn gặp lại các bạn trong những bài viết tiếp theo của series.