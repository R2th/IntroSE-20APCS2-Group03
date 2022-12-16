![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)
# Mở đầu
**VIM** hay **Vi IMprove** là một trình biện soạn văn bản nổi tiếng trên UNIX và Linux và có rất nhiều người đã cảm thấy ghét nó trong lần đầu tiên sử dụng. Tuy nhiên, bên cạnh số lượng lớn người ghét và không muốn sử dụng **VIM** thì cũng có một số lượng lớn người thích sử dụng nó, và những ai đã thích **VIM** rồi thì sẽ không muốn sử dụng bất cứ một trình soạn thảo nào khác như Sublime Text, Visual Studio Code hay Atom .... Ưu điểm của **VIM** là không cần đến bất cứ một thao tác nào cần sử dụng chuột, chỉ cần bàn phím là đủ, và **VIM** có một bộ quy tắc đồ sộ, các phím tắt, các cách thao tác nhanh và tất nhiên nhược điểm của nó cũng chính là bộ quy tắc khổng lồ này, nó dễ làm nản lòng bất cứ ai mới làm quen và bắt đầu sử dụng.
Cũng như tên gọi, **VIM** được phát triển từ **Vi**, được nâng cấp và bổ sung các tính năng để giúp người sử dụng có thể dễ dàng thao tác hơn. 
Trong bài viết này, mình sẽ trình bày về các thao tác cơ bản để sử dụng **VIM** và các bước để xây dựng một môi trường phát triển Ruby on Rails dựa trên trình biên soạn này.
# Thao tác cơ bản với VIM
### Khởi động VIM
Do **VIM** là một trình biên soạn dòng lệnh nên để khởi động nó chúng ta cần khởi động trước một cửa sổ dòng lệnh **Terminal**. Sau đó trên dấu nhắc chúng ta gõ lệnh `vim`.
Giao diện đầu tiên của **VIM** sẽ như sau:

![](https://images.viblo.asia/3e0b181b-3f1d-4748-8902-7552545f2a90.png)

Với giao diện bắt đầu, **VIM** chỉ bao gồm một con trỏ ở đầu dòng thứ nhất và một số thông tin như phiên bản, nhà phát triển và một số gợi ý để tìm hướng dẫn sử dụng.

### Các chế độ chỉnh sửa
Trong **VIM** có tất cả 7 chế độ bao gồm *normal*, *insert*, *visual*, *replace*, *Ex-mode*, *select* và *command-line*. Tuy nhiên chỉ có 3 chế độ thường được sử dụng nhất, đó là:
* Normal: Chế độ căn bản nhất của **VIM**, được tự động mở khi bắt đầu khởi động và có thể mở lại từ chế độ khác sau khi ấn phím `ESC`. Chế độ này cho phép người sử dụng có thể thao tác với các câu lệnh, được bắt đầu bằng dấu `:` hoặc các phím tắt.

![](https://images.viblo.asia/7e42dfda-bb86-4336-a39a-880134e3e3bf.png)
* Insert: Chế độ chỉnh sửa, dùng để thao tác với văn bản tương tự như các trình biên soạn khác bằng cách gõ các kí tự mong muốn. Để chuyển vào chế độ `insert` từ chế độ `normal` thì có thể gõ một trong phím `i`, `I`, `o`, `O`,  `a` hoặc `A`.

![](https://images.viblo.asia/0272421e-112c-42d5-aba0-495fe7d90233.png)
* Visual: Tương tự chế độ normal nhưng cho phép bôi đen (select) đoạn văn bản để thao tác. Chế độ này sẽ tự động bắt đầu khi gõ phím `v` trong chế độ **normal**.

![](https://images.viblo.asia/4decb9f7-a96c-4ec0-bd52-68270f4dba60.png)

### Mở một file để bắt đầu chỉnh sửa
Có một vài cách để có thể mở một file với **VIM**
- Cách đầu tiên là mở file cùng lúc khi khởi động **VIM**, bằng cách thêm đường dẫn của file ngay sau câu lệnh `vim`. VD: `vim textfile.txt` hoặc `vim /home/user/textfile.txt`.
- Ngoài ra sau khi khởi động vim có thể dùng một trong các command: `:edit`, `:open`, `:tabedit`, `:split` hoặc `:vsplit` để mở file.

Một ví dụ mở bằng `:tabedit`

![](https://images.viblo.asia/998db73f-fd4c-415c-827b-d8000371db74.png)

Một ví dụ khác mở file bằng `:vsplit`

![](https://images.viblo.asia/0344393b-7d40-4297-bc77-6dffd0eb3c70.png)

### Di chuyển con trỏ
Ở **VIM** đã có cải tiến đáng kể so với kẻ tiền nhiệm **Vi** về thao tác di chuyển. Nếu ở **Vi** ta chỉ có thể di chuyển bằng các phím `h` (sang trái), `j` (xuống dưới), `k` (lên trên) và `l` (sang phải) thì **VIM** đã cho phép di chuyển cả bằng các phím điều hướng Up, Down, Left, Right.
Thực tế thì phần lớn người khi bắt đầu sử dụng **VIM** đều thích sử dụng các phím điều hướng hơn nhưng khi đã quen thì họ lại thường sử dụng các phím `h-j-k-l` do vị trí thuận tiện hơn.

### Thao tác xóa
Một số phím dùng để xóa trong **VIM**:
- `x`: xóa một kí tự tại vị trí con trỏ hiện tại
- `dw`: xóa một từ tính từ vị trí con trỏ hiện tại đến bắt đầu của từ tiếp theo (không bao gồm kí tự đầu tiên của từ tiếp theo và xóa cả các dấu cách)
- `d` hoặc `dd`: xóa dòng hiện tại
- `d$`: xóa từ vị trí con trỏ đến hết dòng hiện tại
- `d{num}`: xóa số dòng bằng giá trị {num} tính từ dòng hiện tại (VD: xóa 10 dòng thì dùng `d10`)

### Thao tác chèn
Để chèn văn bản thì các phím được sử dụng cũng chính là các phím dùng để chuyển từ chế độ `normal` vào chế độ `insert`:
- `i`: con trỏ sẽ ở luôn vị trí hiện tại
- `I`: con trỏ sẽ ở đầu dòng hiện tại
- `a`: con trỏ sẽ ở ngay sau vị trí hiện tại 1 kí tự
- `A`: con trỏ sẽ ở cuối dòng hiện tại
- `o`: **VIM** sẽ thêm một dòng bên dưới dòng hiện tại và đặt con trỏ tại dòng này
- `O`: tương tự `o` nhưng thay vì thêm 1 dòng bên dưới thì sẽ thêm 1 dòng bên trên dòng hiện tại

### Thao tác phục hồi
Nếu chẳng may có một thao tác không mong muốn thì ta hoàn toàn có thể khôi phục lại trạng thái trước đó bằng cách sử dụng phím `u`. Đồng thời cũng có thể khôi phục lại trạng thái trước khi gõ phím `u` bằng cách dùng `Ctrl+R`.

### Lưu và thoát
Và cuối cùng, sau khi đã chỉnh sửa một file hoàn tất, ta có thể lưu lại file và thoát khỏi trình soạn thảo **VIM**.
- Để lưu lại file sau khi chỉnh sửa thì cần gõ lệnh `:w` hoặc `:w filename` trong chế độ **normal**.
- Để thoát file thì gõ lệnh `:q`, có thể dùng `:q!` để thoát mà không lưu thay đổi của file hoặc `:qa` để thoát tất cả các file đang mở.
- Có thể kết hợp việc lưu và thoát bằng lệnh `:wq` hoặc `:x`.

###  Một số command hữu ích
- `set number`: hiện số thứ tự của dòng (ẩn đi bằng `set nonumber`)
- `set compatible`: tắt toàn bộ các phần bổ sung của **VIM**, tức là sẽ dùng giống như `original VI` (mặc định là `nocompatible`)
- `set hlsearch`: khi search trong **VIM** thì từ khóa tìm kiếm sẽ được highlight
- `set cursorline`: đánh dấu dòng hiện tại bằng bóng mờ
- `set expandtab`: tự động dùng `space` khi phím `TAB` được gõ
- `set tabstop=[n]`: điều chỉnh số lượng kí tự cho `TAB` (= n)
- `colorscheme [profile]`: thay đổi profile màu cho editor
- `source ~/.vimrc`: tải lại file cấu hình

### Một số phím tắt hay dùng
- `cw`: xóa 1 từ
- `gg=G`: tự động indent file cho đúng với cài đặt tab, space và indent hiện tại
- `$`: xuống cuối dòng hiện tại
- `:$`: xuống dòng cuối cùng
- `0`: về đầu dòng hiện tại
- `:0`: về dòng đầu tiên
- `ctrl+w` và kết hợp phím điều hướng: di chuyển cửa sổ trong chế độ split
# Kết luận
Trên đây là một vài thao tác cơ bản khi sử dụng trình biên soạn **VIM** để chỉnh sửa nội dung file. Mặc dù các thao tác này không nhiều tác dụng nhưng lại là những thao tác được sử dụng nhiều nhất khi biên soạn file. Và phần lớn các thao tác nâng cao khi sử dụng **VIM** đều ít nhiều dựa trên các thao tác này.
Bài viết còn nhiều thiếu sót, hy vọng mọi người có thể comment bên dưới để mình có thể hoàn thiện bài viết hơn. Cảm ơn mọi người đã đọc.
# Tài liệu tham khảo
http://vim.wikia.com/wiki/Tutorial