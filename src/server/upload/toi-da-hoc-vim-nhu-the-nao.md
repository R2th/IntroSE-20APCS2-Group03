# Mở đầu
>Nếu ví VSCode như một cô gái Sài Gòn trẻ trung năng động thì Vim sẽ giống như một cô gái Huế, dịu dàng, e ấp. Cách chinh phục cũng sẽ khác nhau. Trong bài viết này mình sẽ nói về lộ trình mình đã dùng để tán đổ cô gái Huế kia.

Vim là một code editor tương tự như Notepad++, Sublime ... Vì mỗi code editor đều có những ưu nhược điểm riêng nên mình sẽ không đi sâu vào so sánh Vim với Notepad++ hay Sublime. Bài viết hướng tới những bạn muốn và đang tìm cách học Vim. 

Nội dung bài viết sẽ gồm: 
- Vim có gì hay?
- Tại sao Vim không phổ biến?
- Tiếp cận Vim thế nào nhanh nhất?
- Tôi đã setup Vim như thế nào?
- Kết luận

#  Vim có gì hay?
Theo như mình tìm hiểu thì mọi người tìm đến Vim vì khi đã làm quen thì tốc độ code với Vim nhanh hơn rất nhiều với các code editor khác. Thật ra mình thấy đối với dev thì việc code là một phần, việc chính vẫn là suy nghĩ. Do vậy việc code nhanh hơn một chút cũng không tăng hiệu suất của bạn lên bao nhiêu.
Dưới đây là một vài lợi ích mà mình thấy điểm "được" của Vim:
+ Nhẹ và khoẻ. Nó nhẹ vì nó đơn giản, khoẻ vì nó làm được mọi thao tác như các code editor khác. Nhẹ thì các bạn sẽ biết khi tải nó tại [trang chủ](https://www.vim.org/), còn khoẻ thì mình sẽ nói ở phần tiếp theo.
+ Hỗ trợ code trên server, việc này mình thấy là điểm lợi nhất. Rất thích hợp cho các bạn backend hoặc devops.
+ Kho plugin cực kì đầu đủ và nhẹ nhàng : nếu bạn cần màu sắc màu mè, highlight như vscode đã có vim-monokai-pro, muốn autocomplete đã có coc-nvim, muốn show sidebar đã có nerdtree, muốn comment code đã có tpope/vim-commentary và còn rất nhiều nữa, các bạn có thể tìm tại đây vim-awesome.com.
+ Bonus thêm một lý do nữa đó là code bằng Vim nó **ngầu**. Thay vì phải dùng chuột thì bạn chỉ cần thao tác qua bàn phím, ~~các em gái tester hay BA nhìn vào sẽ thấy rất ngưỡng mộ.~~

![](https://images.viblo.asia/9c0a78ea-cb47-4d53-ad22-1bb69d3a4aa2.jpeg)

# Tại sao Vim không phổ biến?
Với những người mới tiếp cận Vim sẽ gặp một số vấn đề như dưới đây:
## Khó dùng
Đây chắc chắn là điều ai chuyển sang vim cũng gặp phải. Khi bạn đang dùng VScode quen, bạn mở Terminal và gõ `vim` và `<Enter>`.
Và rồi đây là cái gì?

![](https://images.viblo.asia/9fd7d568-668b-4ddc-94f4-a965ee8d6edd.png)

Sao mọi người bảo nó là text editor thay thế được Vscode, vậy giờ 
+ Import project như nào?
+ Chạy command ở đâu?
+ Tìm kiếm file như nào?
+ Auto complete như nào?


.... hoang mang lần 1.
## Vẫn là khó dùng
Sau khi làm quen với vim bằng cách gõ `vimtutor` vào `terminal` và làm theo hướng dẫn. Bạn sẽ tiếp tục bị hoang mang đó là việc phải **nhớ**. Tất cả câu lệnh phải nhớ, di chuyển con trỏ chuột bằng nút nào, tìm kiếm thế nào,  autocomplete bằng cách nào? ....

Chỉ có một điểm sáng cho ai đang đọc đến đoạn này đó là mình cũng bắt đầu từ người không biết gì về Vim, quen các thao tác với chuột, quen với plugin mà chỉ cần `tab` là biết các function gợi ý. Nhưng mình đã tìm ra cách tiếp cận để học và hiện tại đang chuyển hẳn sang Vim.

Có người sẽ thắc mắc sao mình phải cố gắng học làm gì trong khi có thể dùng VScode, dễ dùng, thân thiện. Thì mình sẽ cho bạn lý do cuối cùng và thuyết phục nhất:
![](https://images.viblo.asia/febe2473-4603-41da-ae8a-31b50cdd6405.png)


#  Tiếp cận Vim thế nào nhanh nhất 
> Để học nhanh nhất mình sẽ giải quyết những nhược điểm gặp phải khi dùng Vim.


 ## Giao diện
Giao diện mặc định sẽ chỉ giúp ta thao tác với một file, do vậy khi cần thao tác với một project ta sẽ gặp khó. Tuy nhiên các nhà phát triển của Vim họ đã biết được điều này và cho ra đời nhưng plugin để hỗ trợ điều đó.

Do vậy nêu bạn gặp khó khăn với giao diện mặc định của Vim thì điều này có thể giải quyết được. Ở những bước dưới mình sẽ nói về cách custom giao diện của Vim. Kết quả đạt được như sau:

![](https://images.viblo.asia/518e2b61-20a8-4311-a198-1cc68b7f57b5.png)

Sau khi custom, bạn sẽ có:
+ File explorer bên cạnh
+ Mở file trên nhiều tab
+ Highlight code, highlight tag,
+ Các thông tin về git .... 

Nhìn giao diện này chắc chắn là sẽ dễ tiếp cận hơn phải không

## Vimtutor
Tiếp theo là  học những câu lệnh cơ bản của Vim, phần này thì rất nhiều hướng dẫn rồi. Để bắt đầu mọi ng có thể tham khảo tại link: https://kipalog.com/posts/Lam-quen-VIM-trong-5-phut.

Sau bài viết trên bạn sẽ có được những thao tác cơ bản. Sau khi `bò` được rồi, thì theo mình cách nhanh nhất để chuẩn bị `đi` đó là xoá bỏ những code editor hiện tại đi. Nhược điểm là 1-2 tuần tới bạn sẽ code chậm hơn. Nhưng sau đó sẽ khác. có thể bạn sẽ code nhanh lên hoặc là bạn sẽ tải lại VScode (your life, your choise). Không nên dùng song song vì như thế rất nhanh nản.

Khi đã không còn phải vừa code vừa google search câu lệnh nữa, thì mình recommend tut này: https://learnvimscriptthehardway.stevelosh.com/(Đây là việc của tương lai, nên ta sẽ dùng đến nó sau)

# Tôi đã setup Vim như thế nào?
Ở phần này mình sẽ nói về cách setup sao cho Vim thân thiện nhất. Link [github](https://github.com/editor-bootstrap/vim-bootstrap#installation) cho bạn nào muốn tìm hiểu kỹ hơn. Trong bài này mình sẽ nói về cách cài đặt và sử dụng NeoVim.

Với máy mac như mình đang dùng sẽ được cài sẵn một trình soạn thảo là `vi`. Nếu chỉ nhìn giao diện thì sẽ không khác gì nhiều nhưng bạn đừng hiểu làm `vi` và `vim` là khác nhau đó. 
## Cài vim
Cách cài đặt các bạn tham khảo tại trang chủ của [NeoVim](https://neovim.io/). Tuỳ vào hệ điều hành mà có cách cài đặt khác nhau.

Sau khi cài đặt thành công, bạn kiểm tra bằng lệnh 

```
nvim
```
![](https://images.viblo.asia/62e3a71f-57ac-41b8-9bd5-b9ff79ed075f.png)

Version hiện tại của NeoVim là 0.4.4 và vẫn được nâng cấp.
## Custom giao diện
Vim có một lợi thế đó là nó vẫn được cập nhật sau 30 năm, các nhà phát triển cũng ra các bản plugin tuỳ chỉnh cho từng mục đích. Ở phần này ta sẽ cài đặt `plugin` cho vim. Tất cả các file cấu hình sẽ lưu tại `~/.config/nvim/init.vim`, [vim-bootstrap](https://vim-bootstrap.com/) sẽ hỗ trợ bạn tạo nhanh file này.

Truy cập  [vim-bootstrap](https://vim-bootstrap.com/) và chọn ngôn ngữ bạn đang code, giao diện hay dùng, sau đó ấn nút `Generate!`. File được lưu tại `Downloads`. Sau đó chạy lệnh:
```
mv ~/Downloads/generate.vim ~/.config/nvim/init.vim
```
Bây giờ chỉ cần nhập vào lệnh
```
nvim
``` 
rồi để vim làm những phần còn lại
![](https://images.viblo.asia/a417bad2-7da5-4536-9364-3d784c8965e1.png)
## File explorer
Ta dùng NERDtree cho việc hiển thị thư mục và file. Để đóng/mở cây thư mục lên bạn ấn `F3`, để chuyển đổi qua lại con trỏ giữa file và cây thư mục ta ấn `F2`. Config này có thể tuỳ chỉnh khi bạn chỉnh sửa trong file `.init.vim`

Các thao tác trên cây thư mục:
+ Sử dụng phím `j` để xuống dưới, `k` để lên trên. Việc này tương tự việc di chuyển con trỏ trong file.
+ `<Enter>` để đóng/mở thư mục hoặc mở file.
+ Ấn `m` để hiện thị các tuỳ chọn của NERDtree, ví dụ: `a` để tạo mới file, `d` để xoá file ...

**Sau khi cài NERDtree bạn sẽ thao tác được với file trong project mà không cần dùng tới chuột.**

## Terminal
Có thể bạn biết thừa, vim cũng được tích hợp sẵn terminal từ phiên bản 8.1. Để sử dụng bạn mở vim lên và nhập vào `:term`. Một vài tip có thể xem tại https://www.youtube.com/watch?v=S6lK0437hQM.

Một plugin hay được dùng là `floaterm`. Hướng dẫn cài đặt tại https://github.com/voldikss/vim-floaterm

Sau khi cài đặt, bạn nên cài đặt một số phím tắt khi sử dụng. Của mình là:
```
" Configuration example
let g:floaterm_keymap_new    = '<F6>'
let g:floaterm_keymap_prev   = '<F7>'
let g:floaterm_keymap_next   = '<F8>'
let g:floaterm_keymap_toggle = '<F9>'
let g:floaterm_keymap_kill = '<F10>'
let g:floaterm_width = 0.8
let g:floaterm_height = 0.8

" Set floaterm window's background to black
hi Floaterm guibg=black
" Set floating window border line color to cyan, and background to orange
hi FloatermBorder guibg=orange guifg=cyan
```

3 phím tắt quan trọng là:
* F6 để tạo mới một tab terminal
* F9 để ẩn / hiện terminal
* F10 để kill một tab

**Sau khi cài floaterm bạn sẽ thao tác được với terminal ngay trong vim bằng các nút F6, F9.**
## Dracula
Theme mình hay dùng khi code Sublime hay VScode là `dracula`. Và tất nhiên nó cũng được hỗ trợ trên vim.

Hướng dẫn cài đặt tại https://draculatheme.com/vim

Để list ra danh sách nhưng plugin thì rất nhiều, tuỳ vào mục đích sử dụng mà bạn cài đặt plugin thích hợp

## And more
Một vài tính năng mình hay dùng là:
+ `:e <tên file>` để mở nhanh một file
+ Khi trên cây thư mục của NERDtree: ấn phím `t` để mở file trong tab mới, ấn `s` để mở file tại và chia đôi màn hình
+ `:Ag <tên >` để tìm kiếm theo tên. Ấn `Ctrl+t` hoặc `Ctrl+s` để mở file theo 2 cách trên.
+ `Ctrl+D` (Down) hoặc `Ctrl+F` để di chuyển con trỏ nhanh xuống dưới.
+  `Ctrl+U` (Up) hoặc `Ctrl+B` để di chuyển con trỏ nhanh lên trên.
+  `gg` để về đầu trang, `G` để đến cuối trang.
+  `/<từ khoá>` để tìm kiếm theo từ khoá.
# Kết luận
Dù có muốn hay không bạn phải công nhận rằng Vim giống như một cô gái xinh đẹp và khó tính. Việc chinh phục cô gái này không phải một sớm hay chiều. Trên đây mình đã đưa ra một `roadmap` của mình cho các bạn tham khảo. 

Chúc các bạn sớm chinh phục được cô gái này.