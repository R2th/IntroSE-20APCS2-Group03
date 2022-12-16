# 1. Mở đầu

Đối với những người mới dùng Ubuntu, việc lựa chọn trình chỉnh sửa văn bản, người ta thường nhớ tới `gedit`, `sublime text`, tù tù tí thì là `nano`. Mọi người thường không thích dùng `vim` vì độ phức tạp, lằng nhằng, nhiều lệnh khó nhớ. Hi vọng bài viết sau sẽ có bạn có nhiều thiện cảm hơn với `Vim` :D
![](https://images.viblo.asia/9ea9e8d3-86dd-42b2-a674-0ad3a098d862.png).
So với một số trình chỉnh sửa văn bản, VIM có một số lợi thế sau:
* Bạn có thể chỉnh sửa các đoạn văn bản mà không cần dùng chuột, chỉ sử dụng bàn phím (tiết kiệm được tầm từ 150k đến 500k :v).
* Sở hữu rất nhiều phím tắt đa dạng, đầy đủ giúp bạn hoàn thành các tác vụ lặp đi lặp lại một các nhanh chóng và dễ dàng. Bạn trông ngầu hơn khi sử dụng phím tắt này, chỉnh sửa văn bản cũng dùng lệnh, bụp bụp `Ctrl` `Shift` `Shift` `Ctrl` `Delete` là xong :v: . Tuy nhiên nó đồng nghĩa với việc bạn cần luyện tập để nhớ lệnh thì mới ngầu được.
* Nhẹ. Cùng một file lớn, mở bằng vim sẽ nhẹ hơn so với các trình soạn thảo khác (ít nhất là so với gedit).
* Phổ biến: Vim có trên cả MAC, Ubuntu và Windows.
* Khi triển khai các server, việc remote vào máy ảo, việc cài đặt `gedit` hay`sublime text` rõ ràng không khả thi mà cần một số trình chỉnh sửa văn bản dòng lệnh. `Vim` là một lựa chọn không hề tồi :D.
# 2. Cài đặt

(Trong phạm vi bài viết mình hướng dẫn cài Vim trên ubuntu)
```
$ sudo apt-get update
$ sudo apt-get install vim
```
Mở 1 file với vim

```
$ vim file.txt
```

# 3. Các chế độ với Vim

## 3.1. Chế độ dòng lệnh

Đây là chế đầu tiên khi bạn khởi động Vim
Chế độ này là nơi bạn phô diễn kỹ thuật với hàng loạt các lệnh và các phím tắt trong Vim. Với một người dùng Vim chuyên nghiệp, đây có lẽ là chế độ bạn dùng nhiều nhất.

## 3.2. Chế độ insert

Chế độ này cho phép bạn chèn kí tự vào trong văn bản.

## 3.3. Chế độ Visual

Chế độ này cho phép bạn chọn các vùng văn bản để thao tác với chúng (ví dụ như chọn đoạn văn bản để copy, cut hay xóa ...).

Để chuyển qua giữa các chế độ này với nhau ta sử dụng các phím `Esc` (chuyển chế độ dòng lệnh), `i` để sang chế độ insert và `V` hoặc `v` để chuyển sang chế độ Visual.

# 4. Một vài lệnh thao tác cơ bản

- Các lệnh lưu và thoát VIM:
```
:q: Thoát khỏi Vim
:q!: Bắt buộc thoát không cần lưu
:w: Lưu file
:w!: Bắt buộc ghi file (ghi đè)
:wq: Lưu xong thoát
```
- Di chuyển chuột:
```
H: Đi qua TRÁI
J: Đi xuống
K: Đi lên
L: Đi qua PHẢI
```
- Nhảy đến đầu dòng và cuối dòng:
```
$: nhảy về cuối dòng hiện tại
0 (số không @@): nhảy về đầu dòng hiện tại
```
- Di chuyển đầu file hoặc cuối file:
```
gg: nhảy lên đầu file
G: nhảy xuống cuối file
50G: nhảy tới dòng 50 của file
Ctrl + G: Xem thông tin dòng hiện tại
```
 
# 5. Lệnh chấm (.)

Câu lệnh giúp bạn lặp lại thay đổi trước đó. Đây là một lệnh mạnh mẽ và đa năng trong Vim. Xét ví dụ sau để hiểu rõ.

Ví dụ 1: Thêm dấu chấm phẩy vào file sau:
```
var foo = 1
var bar = 'a'
var foobar = foo + bar
```
Ta sẽ thêm kí tự ; vào dòng đầu sau đó lặp lại hành động bằng dấu ; (len)

![](https://images.viblo.asia/6e126e06-bab6-4bbc-92fb-40b992c0d78a.png)

Giải thích qua 1 chút về các lệnh bạn sử dụng
* `A`: Chuyển về chế độ cuối dòng và chuyển Vim sang chế độ insert mode (còn a là chuyển về sau vị trí con trỏ chuột và chuyển sang chế độ insert mode)
* `;`: thêm kí tự ; khi ở chế độ insert mode
* `Esc`: chuyển về chế độ dòng lệnh
* `j`: chuyển đến vị trí dòng sau (như trường hợp này là cuối dòng kế tiếp)
* `.`: lặp lại hành động thêm ;
* `j.`: chuyển đến dòng tiếp theo và lặp lại hành động thêm ;

Như vậy câu lệnh `.` giúp bạn lặp lại hành động thêm dấu `;` một cách dễ dàng và có thể sử dụng lại :D.

# 6. Tìm kiếm và thay đổi kí tự

Ví dụ 2: Tìm kiếm chuỗi `'content'` và thay nó bằng kí tự `'copy'` trong file.

Giải quyết:

## 6.1: Sử dụng lệnh trực tiếp

Sử dụng lệnh thay thế như sau ở chế độ dòng lệnh
```
:%s/content/copy/g
```
Cách này nhanh chóng, tuy nhiên câu lệnh nội dung tìm kiếm (content) không có sẽ có thể gây lỗi

## 6.2: Cách thủ công
Cách này thủ công hơn và cho phép bạn thay thế có thể toàn bộ nội dung file hoặc chỉ `'content'` nào tùy ý thành `'copy'`

* Bước 1: Search `/content`
* Bước 2: Di chuyển tới nội dung tìm kiếm: `*` (đi đến nơi mà bạn muốn thay thế kí tự) hoặc sử dụng `n`
* Bước 3: `cw` copy `<Esc>`

`cw`: xóa đến hết từ và chuyển vim sang chế độ insert

copy: nhập thay thế kí tự trong chế độ insert mode

`Esc`: chuyển về chế độ dòng lệnh

* Bước 4: `n`: đi đến kí tự tiếp theo
* Bước 5 `.` : lặp lại hành động thay thế nếu bạn muốn :D

# 7. Copy, cut dữ liệu

Một vài lệnh sau trong chế độ dòng lệnh hữu dụng cho bạn
* `yy`: copy dòng hiện tại
* `dd`: cut dòng hiện tại
* `p`: paste
* `v`: chuyển sang chế độ visual để chọn văn bản (chọn xong nhấn y hoặc d để copy hay cut là tùy bạn)
* `V`: chuyển sang chế độ visual nhưng bôi đen theo dòng
* `20yy`: copy 20 dòng đầu của file hiện tại

# 8. Act, Repeat và Reverse

Các câu lệnh tiếp theo là các câu lệnh giống như Ctrl Z và undo trong các trình soạn thảo như word :D


|  Intent |  Act | Repeat | Revert
| -------- | -------- | -------- | ------|
| Make a change     | {edit}     | .     | u |
| Scan line for next character     | f{char} / t{char}     | ;     | , |
| Scan line for previous character     | F{char} / T{char}     | ;     | , |
| Scan document for next match     | /pattern <CR>     | n     | N |
| Scan document for previous match     | ?pattern <CR>     | n     | N |
| Perform substitution     | :/s/target/replacement     | &     | u |
| Execute a sequence of changes     | qx{changes}q     | @x     | u |


# 9. Làm việc nhiều file cùng lúc với Vim

Phần cuối cùng mình sẽ hướng dẫn các bạn sử dụng Vim để mở nhiều file cùng 1 lúc.

## 9.1. Mở trên cùng một cửa sổ

Để mở nhiều file trên cùng một cửa sổ, bạn truyền thêm tham số vào `vim` là được
```
$ vim *.txt
$ vim file1.txt file2.txt
```
Một số lệnh hữu ích:
```
:ls: xem danh sách các file đang được mở
:bnext: chuyển sang file tiếp theo
:bprev: chuyển sang file trước đó
```

Sau khi đi qua 1 lượt các file, có thể sử dụng `Ctrl ^` để chuyển qua các file

*Lưu ý: Phải đi qua file mới sử dụng được Ctrl ^. Nguyên nhân ở đây là Vim tối ưu, chỉ khi đọc file nào nó **mới load nội dung file đó vào bộ nhớ**, vì vậy phải mở qua thì mới mở lại được. Chi tiết bạn có thể đọc ở Tip 37 trong tài liệu tham khảo để hiểu về cơ chế load file trong Vim (**Buffers và File** :3)*.

## 9.2. Mở trên đa cửa sổ
Sử dụng `:vsp` hoặc `:sp` nếu bạn muốn mở file sang cửa sổ bên cạnh hoặc ở dưới, chia đôi màn hình

```
$ vim file1.txt
:vsp file2.txt
(trong trường hợp file2.txt chưa tồn tại thì nó sẽ tạo file mới)
```
Sử dụng 2 lần `ctrl W` để chuyển qua lại giữa các file.

Ví dụ 3: Copy 20 dòng đầu của file có sẵn vào file mới tên là `copy.txt`

```
$ vim file1.txt  // mở file1.txt bằng vim
:vsp copy.txt    // chia đôi màn hình để làm việc 2 file 1 lúc
2 x Ctrl W       // chuyển về file1.txt
20yy             // copy 20 dòng đầu từ file1.txt
2 x Ctr W        // chuyển sang file đích: copy.txt
p                // paste vào thôi
:wq              // lưu file copy.txt
```

Trên đây là một vài câu lệnh mình hay sử dụng khi thao tác với VIM. Ngoài ra như đã nói ở trước, VIM cung cấp rất rất nhiều tổ hợp phím tắt hữu dụng khác giúp bạn thao tác nguy hiểm hơn. Chi tiết bạn có thể đọc thêm các Tip hướng dẫn trong tài liệu tham khảo

# Tài liệu tham khảo

* [Practical Vim](https://www.amazon.com/Practical-Vim-Edit-Speed-Thought-ebook/dp/B018T6ZVPK)

* [Làm quen với Vim trong 5 phút](https://kipalog.com/posts/Lam-quen-VIM-trong-5-phut)