Thành thạo Vim là chặng đường không hề dễ dàng. Có một vài phím tắt không trực quan chút nào để ta dễ dàng ghi nhớ (Ví dụ: Lệnh copy trong Vim là y viết tắt của từ yank), và nhiều cài đặt mặc định không awesome cho lắm. Bài viết này sẽ giúp các bạn cấu hình các cài đặt của Vim ở phần cuối.

### 1. Bắt đầu
Ok, như vậy đa phần ai đọc bài viết này đều chọn Vim để sử dụng hoặc có thể được ai đó thuyết phục sử dụng :D 

Tin vui là cấu hình Vim vô cùng đơn giản và bất cứ điều gì bạn không thích cũng có thể thay đổi được. Nhưng tin không vui là cấu hình mặc định có thể khá là khó dùng (tùy vào hệ thống của bạn) và điều này có thể khiến ta khó bắt đầu.

**Lưu ý**, đây không phải là một tutorial về vim, chỉ là cách cấu hình làm sao. Bạn có thể tìm thấy phần giới thiệu cơ bản về vim bằng cách chạy vimtutor từ terminal.
Tôi cũng giả sử rằng phiên bản vim của bạn là phiên bản mới đây. Nếu phiên bản vim của bạn không hỗ trợ các options bên dưới, bạn có thể nâng cấp phiên bản vim của mình hoặc chỉ cần xóa option đó khỏi .vimrc.

### 2. Basic Configuration

Hầu hết cấu hình vim đều nằm trong ~/.vimrc. Dưới đây là một số option phổ biến cùng với giải thích về chúng.

**Lưu ý:** trong .vimrc, bất kỳ văn bản nào sau dấu **"** đều bị bỏ qua. Chúng được gọi là comments.

```
" Option này làm Vim hoạt động một cách hữu ích hơn
set nocompatible
" Có những tác động bảo mật tiềm năng khi sử dụng modelines 
" (Nếu bạn không biết chúng là gì, tốt hơn là không nên dính dáng đến nó.
set nomodeline

" Việc này đang bật ba options liên quan cho filetypes; detection, plugins và indentation. 
" Vim sẽ tự động phát hiện nhiều filetypes và bật các options/indentation tùy chỉnh cho mỗi filetype.
filetype plugin indent on

" Bật highlight cú pháp. Nếu bạn muốn sử dụng bảng màu tùy chỉnh, nó
" nên được load *sau khi* bật cú pháp.
syntax on

" Bật chuột ở tất cả các chế độ. Điều này có nghĩa là việc sao chép sẽ yêu cầu giữ
" shift.
set mouse=a

" Turns on the wildmenu.  When on, command-line (the mode when you start with a
" `:`) completion operates in an "enhanced" mode.
" Bật wildmenu. Khi bật, command-line (chế độ khi bạn bắt đầu với
" `: `) hoạt động ở chế độ "nâng cao".
set wildmode=longest:full,full
set wildmenu

" Đặt chiều rộng tối đa của văn bản.
set textwidth = 80
" Chuỗi các chữ cái mô tả cách thức thực hiện định dạng tự động.
" c - Xóa text được định nghĩa theo motion, sau đó tự chuyển về chế độ insert.
" q - Cho phép format comments với "gq".
set formatoptions=cq

" Bật hiển thị số dòng.
set number

" Cài đặt số dòng màn hình tối thiểu để giữ ở trên và dưới con trỏ.
set scrolloff=5

" Cài đặt backspace hoạt động theo cách bạn mong đợi.
set backspace=indent,eol,start
" Cho phép các phím mũi tên hoạt động theo cách bạn mong đợi.
set whichwrap+=<,>

" Sao chép thụt lề từ dòng hiện tại khi bắt đầu một dòng mới.
set autoindent

" Đặt cài đặt thụt lề
" softtabstop cài đặt bao nhiêu dấu cách khi nhấn tab / bs sẽ chèn / xóa
" shiftwidth đặt số lượng khoảng trắng được sử dụng cho mỗi cấp thụt lề
" expandtab làm cho vim chèn khoảng trắng thay vì ký tự tab
" shiftround làm tròn thụt đầu dòng thành shiftwidth
" Một số plugin kiểu tệp (hãy nhớ những thứ chúng tôi đã bật trước đó) sẽ
" ghi đè những thứ này. Ví dụ: python có thể đặt thụt lề mặc định thành 4
" dấu cách.
set softtabstop=3 shiftwidth=3 expandtab shiftround

" Bật incremental search
set incsearch

" Hiển thị số dòng và cột của vị trí con trỏ ở phía dưới bên phải.
set ruler
" Hiển thị từng phần lệnh ở dòng cuối cùng của màn hình.
set showcmd
```

Có nhiều options hơn không? Vâng! Có rất nhiều! Để có cái nhìn tổng quan nhanh (nhanh là một thuật ngữ tương đối) về tất cả chúng, hãy chạy: `:help option-list` từ bên trong vim (`:q` để thoát khỏi trang help). Để có danh sách chi tiết của tất cả chúng, hãy chạy: `:help options` (và một lần nữa `:q` để thoát). Vim cũng có các trang trợ giúp khác (rất nhiều trang) đi sâu vào chi tiết về mọi chủ đề (tốt, mọi chủ đề vim) mà bạn có thể thắc mắc (bạn có thể chạy `:help` của chính nó để có trang trợ giúp liệt kê các trang trợ giúp ...).


### 3. I Just Want to Copy and Paste
**WARNING:** Thao tác này sẽ xóa mọi thứ trong .vimrc của bạn. Tôi làm theo cách này vì một số vim options không tương thích với nhau hoặc dẫn đến kết quả không trực quan khi đứng chung. Nếu bạn có bất cứ thứ gì bạn thích và không muốn mất, thì chỉ cần chọn ra một cách có chọn lọc và chọn những thứ cần thêm từ gợi ý này nhé.

```
cat << EOD > ~/.vimrc
set nocompatible
set nomodeline

filetype plugin indent on

syntax on

set mouse=a

set wildmode=longest:full,full
set wildmenu

set textwidth=80
set formatoptions=cq

set number

set scrolloff=5

set backspace=indent,eol,start
set whichwrap+=<,>

set autoindent

set softtabstop=3 shiftwidth=3 expandtab shiftround

set incsearch

set ruler
set showcmd
EOD
```

References: https://medium.com/the-new-blackboard/toolkit-configuring-your-vim-42eb09bcb55f