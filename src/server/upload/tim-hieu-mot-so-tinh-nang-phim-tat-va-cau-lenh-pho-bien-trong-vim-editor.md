# 1. Giới thiệu
Trong công việc của một developer như chúng ta, nhiều lúc chúng ta không thể dùng những IDE ưa thích đầy mạnh mẽ với khả năng support một cách tận răng để thao tác với các files trong hệ thống, hoặc với source code trên server việc cài đặt trình soạn thảo như Sublime Text, Gedit,...để chỉnh sửa file là điều không khả thi mà buộc phải sử dụng trình chỉnh sửa văn bản khác như Nano, Vim,... Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về cách sử dụng Vim để "thuần phục" nó nhé, hy vọng rằng qua bài viết này các bạn mới tập làm quen với Vim sẽ cảm thấy dễ dàng hơn, Vim bớt phức tạp, khô khan và yêu thương Vim nhiều hơn 😆

# 2. Một vài sự lợi hại của Vim
* Với một file "khổng lồ", mở bằng Vim sẽ là lựa chọn cực kỳ hợp lý, sẽ nhẹ nhàng hơn so với nhiều trình chỉnh sửa khác.
* Vim được hỗ trợ trên nhiều hệ điều hành (trước thì Vim chỉ có trên nền của Linux và Unix, sau này cũng xuất hiện luôn trên Windows).
* Trong một số trường hợp, sử dụng Vim để chỉnh sửa file thậm chí còn nhanh hơn cả sử dụng trình chỉnh sửa văn bản khác (dĩ nhiên là bạn cần phải thành thạo 😅).
* Mọi thao tác đều có thể thực hiện thông qua các phím tắt, vì vậy chúng ta có thể không cần dùng đến chuột khi sử dụng Vim. Trông bạn đã cool ngầu sẽ càng cool ngầu hơn khi sử dụng Vim với các phím tắt, dòng lệnh một cách nhanh như điện xẹt, gõ phím tạch tạch rồi enter cái cách và...Xong!!! 😎

# 3. Các mode và phím tắt tương ứng trong Vim
## 3.1. Normal mode
Đây là mode đầu tiên khi bản mở một file với Vim, là nơi chúng ta sử dụng các câu lệnh và phím tắt để thực hiện các tác vụ tiếp theo trong Vim.
Phím tắt để vào mode normal là: `Esc`(sử dụng khi bạn đang ở một mode khác, còn bình thường thì khi vừa vào Vim thì đã là normal).
## 3.2. Insert mode
Đây là mode dùng để thay đổi nội dung, chèn kí tự vào file.

Phím tắt vào insert mode:

`i - Chèn vào ngay trước vị trí hiện tại của con trỏ`

`a - Chèn vào ngay sau vị trí hiện tại của con trỏ`

`I - Chèn vào ngay đầu dòng hiện tại`

`A - Chèn vào ngay cuối dòng hiện tại`

## 3.3. Visual mode
Mode này cho phép bạn chọn các vùng văn bản để thao tác với chúng(bôi đen) (vd như chọn một vùng văn bản để copy, cut, delete).

Phím tắt vào visual mode:

`v - Lựa chọn vùng(bôi đen) ngay tại vị trí con trỏ hiện tại, lựa chọn vùng bôi đen bằng cách sử dụng các phím điều hướng mũi tên lên, xuống, phải, trái`

`V - Lựa chọn vùng theo nguyên dòng, điểu chỉnh vùng chọn bằng phím lên, xuống`

## 3.4. Command mode
Mode này dùng để thao tác các lệnh trong Vim, chẳng hạn như lưu nội dung đã được thực hiện ở các mode khác, thoát khỏi Vim,...

Phím tắt để vào mode command: `:`

# 4. Tập hợp các câu lệnh và phím tắt trong Vim
## Mở file với Vim:
`$ vim file_name` hoặc `$ vi file_name`

## Các phím di chuyển con trỏ:
Ngoài các phím mũi tên thì ta có thể sử dụng các phím sau để điều hướng con trỏ:

`h - sang trái`

`l - sang phải`

`k - lên`

`j - xuống`

`gg - lên đầu file với ký tự đầu dòng`

`G - xuống dưới cùng file với ký tự đầu dòng`

`10G hoặc :10 - nhảy đến dòng thứ 10 của file`

`Ctrl + G - xem thông tin của dòng hiện tại` (vd đang ở dòng thứ mấy của file, cột số mấy,...)

`w - từ kế tiếp`

`e - kết thúc của từ hiện tại`

`0 - đến đầu dòng`

`$ - đến cuối dòng`

`% - di chuyển đến các ngoặc trong dòng`

`[[ - nhảy đến nơi bắt đầu function`

## Các lệnh Copy, Cut và Paste
`y - copy phần text đã chọn vào clipboard`

`yy - copy dòng hiện tại`

`y$ - copy đến cuối dòng`

`D - copy đến cuối file`

`p - paste`

`dd - cut dòng hiện tại`

## Các lệnh lưu và thoát Vim sau khi hoàn tất chỉnh sửa:
`:q - Thoát khỏi Vim và không lưu`

`:q! - Bắt buộc thoát khỏi Vim và không lưu`

`:w - Lưu file`

`:w! - Bắt buộc ghi đè file`

`wq - Lưu file và thoát`

## Search
`/từ cần tìm - tìm kiếm từ "từ cần tìm" từ trên xuống dưới`

`/từ cần tìm - tìm kiếm từ "từ cần tìm" từ dưới lên trên`

`/\cWord - tìm cả chữ hoa lẫn thường từ "Word"`

`/< val - tìm từ bắt đầu bằng "va". Vd value, valid`

`/end> - tìm từ kết thúc bằng end`

`* hoặc n - di chuyển con trỏ đến vị trí có từ đang cần tìm kiếm tiếp theo`

`10yy - copy 10 dòng đầu của file`

## Replace
`:%s/oldword/newword/g - replace toàn bộ oldword thành newword trong file`

`:%s/oldword/newword/gc - replace toàn bộ oldword thành newword trong file kèm theo confirm`

# 5. Làm việc với nhiều file cùng lúc
## 5.1. Mở nhiều file để edit:
`$ vi file1.txt file2.txt file3.php file4.html`

`$ vi *.txt`

* Một số lệnh hữu ích khi làm việc với nhiều file cùng lúc:
`:ls - xem danh sách các file đang được mở`
`:bnext hoặc pn- chuyển sang file tiếp theo`
`:bprev hoặc bp - chuyển sang file trước đó`
`:bfirst - chuyển tới file đầu tiên`
`:blast - chuyển tới file cuối cùng`

## 5.2. Làm việc với nhiều cửa sổ
* Chúng ta có thể edit file dễ dàng hơn bằng cách sử dụng chức năng cửa sổ song song trong Vim
`:sp filename.txt - Chia 2 file thành 2 cửa sổ theo chiều ngang`

`:vs filename.txt - Chia 2 file thành 2 cửa sổ theo chiều dọc`

Trong trường hợp filename.txt chưa tồn tại thì nó sẽ tạo file mới có tên là filename.txt

Sử dụng 2 lần `Ctrl + w` để chuyển qua lại giữa các file.

# 6. Kết thúc
Trên đây là một số lệnh và phím tắt thường dùng trong Vim, theo mình thì với nhiêu đó nếu chúng ta nhớ và áp dụng tốt thì đã có thể sử dụng Vim một cách khá thành thạo rồi 😎🤩. Dĩ nhiên bài viết của mình chắc chắn còn nhiều thiếu sót về các chức năng, phím tắt và câu lệnh trong Vim nên có gì hay ho các bạn hãy bổ sung thêm cho mình nhé 😅Cảm ơn!