## Vim là gì?
`Vim` ( /vɪm/; viết tắt của Vi IMproved) là một bản sao, với một số bổ sung, của trình soạn thảo vi của Bill Joy cho Unix. Nó được viết bởi Bram Moolenaar dựa trên mã nguồn của một port của Stevie editor lên Amiga và phát hành lần đầu vào năm 1991.
`Vim` là một trình soạn thảo để tạo hoặc chỉnh sửa tệp văn bản. 
Có hai chế độ trong `vim`. Một là chế độ lệnh và một là chế độ chèn.
Trong chế độ lệnh, người dùng có thể di chuyển xung quanh tệp, xóa văn bản, v.v.
Trong chế độ chèn, người dùng có thể chèn văn bản.

## Thay đổi chế độ từ cái này sang cái khác
Từ chế độ lệnh đến chế độ chèn loại `a / A / i / I / o / O`
Từ chế độ chèn đến chế độ lệnh loại `Esc`

## Một số lệnh hữu ích cho VIM
### Lệnh nhập văn bản (Được sử dụng để bắt đầu nhập văn bản)

`a` Nối văn bản sau vị trí con trỏ hiện tại

`A` Nối văn bản đến cuối dòng hiện tại

`i` Chèn văn bản trước vị trí con trỏ hiện tại

`I` Chèn văn bản ở đầu dòng con trỏ

`o` Mở một dòng mới theo dòng hiện tại và thêm văn bản ở đó

`O` Mở một dòng mới ở phía trước của dòng hiện tại và thêm văn bản ở đó

### Các lệnh sau chỉ được sử dụng trong chế độ lệnh.

***Lệnh di chuyển con trỏ***

`h` Di chuyển con trỏ một ký tự sang trái

`l` Di chuyển con trỏ một ký tự sang phải

`k` Di chuyển con trỏ lên một dòng

`j` Di chuyển con trỏ xuống một dòng

`nG` hoặc `:n` Con trỏ đi đến dòng (n) đã chỉ định

(ví dụ 10G đi đến dòng 10)

`^F` (CTRl F) Chuyển tiếp sàng lọc

`^B` lùi về phía sau

`^f` Một trang chuyển tiếp

`^b` Một trang lạc hậu

`^U` Lên nửa màn hình

`^D` Xuống một nửa màn hình

`$` Di chuyển con trỏ đến cuối dòng hiện tại

`0` (không) Di chuyển con trỏ đến đầu dòng hiện tại

`w` Chuyển tiếp một từ

`b` lùi một từ

***Lệnh thoát***

`:wq` Ghi tập tin vào đĩa và thoát khỏi trình chỉnh sửa

`:q!` Thoát (không cảnh báo)

`:q` Thoát (cảnh báo được in nếu tệp đã sửa đổi chưa được lưu)

`ZZ` Lưu không gian làm việc và thoát khỏi trình chỉnh sửa (giống như `:wq`)

`: 10,25 w temp`

ghi các dòng 10 đến 25 vào tệp có tên temp. Tất nhiên, dòng khác

số có thể được sử dụng. (Sử dụng `:f` để tìm ra số dòng bạn muốn.)

 

***Các lệnh xóa văn bản***

`x` Xóa ký tự

`dw` Xóa từ khỏi con trỏ trên

`db` Xóa từ lạc hậu

`dd` Xóa dòng

`d$` Xóa đến cuối dòng

`d^` (d caret, không phải CTRL d) Xóa đến đầu dòng

***Yank (có hầu hết các tùy chọn của delete) - VI của bản sao commmand***

`yy` yank dòng hiện tại

`y$` yank đến cuối dòng hiện tại từ con trỏ

`yw` yank từ con trỏ đến hết từ hiện tại

`5yy` yank, ví dụ, 5 dòng

***Dán (được sử dụng sau khi xóa hoặc kéo để khôi phục dòng.)***

`p` dán bên dưới con trỏ

`P` dán phía trên con trỏ

`"2p` dán từ bộ đệm 2 (có 9)

`u` Hoàn tác thay đổi cuối cùng

`U` Khôi phục dòng

`J` Tham gia dòng tiếp theo xuống đến cuối dòng hiện tại

***Các lệnh thao tác tệp***

`:w` Ghi không gian làm việc vào tệp gốc

`:w tập_tin` Viết không gian làm việc vào tập tin được đặt tên

`:e tập_tin` Bắt đầu chỉnh sửa tập tin mới

`:r tập_tin` Đọc nội dung của tệp vào không gian làm việc

Để tạo ngắt trang, trong khi ở chế độ chèn, hãy bấm phím `CTRL`

Và `l` thì `^L` sẽ xuất hiện trong văn bản của bạn và sẽ khiến máy in bắt đầu một trang mới.

 

 

***Các lệnh hữu ích khác***

Hầu hết các lệnh có thể được lặp lại n lần bằng cách gõ một số, n, trước

lệnh. Ví dụ `10dd` có nghĩa là xóa 10 dòng.

`.` Lặp lại lệnh cuối cùng

`cw` Thay đổi từ hiện tại sang một từ mới

`r` Thay thế một ký tự ở vị trí con trỏ

`R` Bắt đầu quá mức hoặc thay thế chế độ sử dụng phím `ESC` để thoát

`:/` mẫu Tìm kiếm về phía trước cho mẫu

`:?` mẫu Tìm kiếm ngược cho mẫu

`n` (được sử dụng sau một trong 2 lệnh tìm kiếm ở trên để

tiếp tục tìm sự xuất hiện tiếp theo của mẫu.

`:g / pat1 / s // pat2 / g` thay thế mọi lần xuất hiện của mẫu1 (pat1) bằng

pat2

Ví dụ: `g / tIO / s // Ada.Text_IO / g`

Điều này sẽ tìm và thay thế tIO bởi Ada.text_IO ở mọi nơi trong tệp.

`:g / a / s // / g` thay thế chữ a, bằng khoảng trống

`:g / a / s /// g` thay thế a bằng không có gì

lưu ý: Ngay cả lệnh này được hoàn tác bởi `u`

 

## Ví dụ

***Mở một tệp mới***

Bước 1 gõ `vim tên_tệp` (tạo một tệp có tên tệp )

Bước 2 loại	`i` (chuyển sang chế độ chèn)

Bước 3 nhập văn bản (nhập chương trình Ada của bạn)

Bước 4 nhấn	phím `Esc` (chuyển về chế độ lệnh)

Bước 5 gõ	`:wq` (ghi tập tin và thoát `vim`)

 

***Chỉnh sửa tập tin hiện có***

Bước 1 gõ `vim tên_tệp` (chỉnh sửa tệp hiện có tên tệp)

Bước 2 di chuyển xung quanh tệp bằng phím `h / j / k / l` hoặc bất kỳ lệnh thích hợp nào

`h` Di chuyển con trỏ một ký tự sang trái

`l` Di chuyển con trỏ một ký tự sang phải

`k` Di chuyển con trỏ lên một dòng

`j` Di chuyển con trỏ xuống một dòng

`nG` hoặc `:n` Con trỏ đi đến dòng (n) đã chỉ định

(ví dụ `10G` đi đến dòng 10)

Bước 3	chỉnh sửa văn bản cần thiết (thay thế hoặc xóa hoặc chèn)

Bước 4 nhấn phím `Esc` (thoát khỏi chế độ chèn nếu bạn chèn hoặc thay thế văn bản)

Bước 5 `:wq` (ghi tập tin và thoát `vim`)

## Tài liệu tham khảo
[VIM Editor Commands](https://www.radford.edu/~mhtay/CPSC120/VIM_Editor_Commands.htm)