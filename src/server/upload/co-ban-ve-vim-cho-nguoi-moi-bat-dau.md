## Tản mạn
Hmm.. Mình nhớ lần đầu tiên mình gặp Vim. Đó là khi mình bắt đầu ra trường và đi làm việc, khi đó mình được yêu cầu dùng một hệ điều hành mà mình chưa dùng bao giờ đó là ubuntu linux. Đây là lần đầu tiên mình cần sử dụng hệ điều hành Linux thường xuyên, cho nên khi mà đang dùng window mà chuyển sang ubuntu thì mình không khác gì học sinh lớp 1 cả, choáng ngợp :sweat_smile:.  Khi đó mình được một người anh hướng dẫn cài các chương trình, phần mềm liên quan. Trong đó có Vim và mình cũng chỉ hiểu là trình sửa file gì gì đó, và mình cài xong để đấy ít khi dùng :)))

Sau này khi làm việc thỉnh thoảng dùng đến nó và nhìn mọi người dùng Vim khi chỉnh sửa file mà không cần đến chuột thì thấy "òaa... điêu luyện thật sự", điều đó cũng đã khiến mình tò mò nhiều hơn về nó. Mình thì dùng nano nhiều hơn vì nó dễ hơn rất nhiều, nhưng chuyển sang Vim thì bối rối từ lúc insert text luôn. Cho đến dạo gần đây mình bắt đầu tìm hiểu deploy server thì phải thao tác với nó nhiều hơn nên hôm nay mình quyết tâm tìm hiểu về nó. Điểm khởi đầu luôn luôn là điều quan trọng, và mình muốn làm cho trải nghiệm bắt đầu dễ dàng nhất có thể.

## Vim là gì
Vim - viết tắt của từ **Vi IMproved** là một bản sao, với một số bổ sung, của trình soạn thảo `vi` của `Bill Joy` cho Unix. Nó được viết bởi Bram Moolenaar dựa trên mã nguồn của một port của Stevie editor lên Amiga và phát hành lần đầu vào năm 1991. Vim được sử dụng rất mạnh mẽ trong CLI (command-line interface). Linux sử dụng rất nhiều file cấu hình, mình thường sẽ cần chỉnh sửa chúng và `vim` là một công cụ tuyệt vời để làm điều đó. Ngoài ra các lựa chọn thay thế cho vim là nano của trình soạn thảo command-line.

![](https://images.viblo.asia/9cf25204-eee0-439e-8b03-b6b5c1b0942b.png)

## Cài đặt Vim trên linux
Để sử dụng được Vim  thì mình phải cài đặt nó thông qua câu lệnh sau:
```python:text
sudo apt update
sudo apt-get install vim
```
Trên hệ điều hành MacOS cũng có thể cài được, bạn có thể tự tìm hiểu cách cài đặt nhé :D

## Các bước thao tác với Vim cơ bản
### Bước 1: Mở Terminal

Trước khi sử dụng Vim, mình cần chuẩn bị một chút. Ở đây mình sẽ tạo một thư mục **Tutorial** và đi vào bên trong thư mục đó.

![](https://images.viblo.asia/72975498-7c31-43f2-9b7d-2ea4bdc73e98.png)

Xong xuôi, giờ là lúc chuyển sang phần vui nhộn, bắt đầu sử dụng Vim.

### Bước 2: Tạo và đóng file Vim mà không lưu

Như trên mình đã nói là rất bối khi bắt đầu sử dụng Vim. Phần sợ nhất là "nếu mình thay đổi một file hiện có và làm rối tung lên thì sao?". Vậy nên mình muốn biết: *Làm cách nào mình có thể mở và đóng file mà không lưu các thay đổi của mình?*

Mình có thể sử dụng cùng một lệnh để tạo hoặc mở file bằng Vim như sau:
```html:text
vi <FILE_NAME>
```
Bây giờ, đây là một khái niệm rất quan trọng cần nhớ trong Vim. Vim có nhiều chế độ, dưới đây là ba điều cần biết để làm cơ bản với Vim:
| Chế độ | Mô tả |
| -------- | -------- |
| Normal    | Mặc định; để điều hướng và chỉnh sửa đơn giản     |
| Insert | Để chèn và sửa đổi văn bản rõ ràng |
| Command Line | Đối với các hoạt động như saving, exiting, etc|

Vim có các chế độ khác như Visual, Select và Ex-mode, nhưng với ba chế độ bên trên là đủ tốt để bắt đầu rồi.

Bây giờ mình đang ở chế độ Normal. Nếu trong file có dữ liệu thì có thể di chuyển xung quanh bằng các phím mũi tên hoặc tổ hợp phím điều khác. Để đảm bảo mình đang ở chế độ Normal, chỉ cần nhấn phím **Esc** (Escape). Tiếp theo nếu mình nhấn dấu hai chấm trong chế độ Normal thì sẽ chuyển Vim sang chế độ Command Line và gõ **:q!** - lệnh thoát khỏi trình soạn thảo mà không lưu. Ngoài ra cũng có thể sử dụng tổ hợp phím **ZQ**, nhưng mình thích dùng cái nào thuận tiện hơn như `:q!`. Khi nhấn **Enter**, mình sẽ thoát khỏi Vim.

![](https://images.viblo.asia/cc7db4ea-95cf-4303-8a2d-42f656f07164.png)

### Bước 3: Thực hiện và lưu các sửa đổi trong Vim

Mở lại file mình vừa tạo ở bước 1. Đầu tiên nhấn **Esc** để đảm bảo đang ở chế độ Normal, sau đó nhấn **i** để vào chế độ Insert. Chữ i mà :v: 

Nhìn phía dưới bên trái, bạn sẽ thấy **-- INSERT --**. Điều này có nghĩa là bạn đang ở chế độ Insert rồi đó.

![](https://images.viblo.asia/6caac5d5-2710-43c6-8822-e5f5c3ec1b2c.png)

Mình sẽ viết một đoạn code vào đây
```php
<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
echo "Hello World!";
?>

</body>
</html>
```

Để lưu đoạn code trên lại thì bạn cần thoát khỏi chế độ Insert bằng **Esc** rồi vào chế độ Command Line. Khi đó gõ **:x!** hoặc **:wq** và nhấn **Enter** để lưu và thoát khỏi file.

### Bước 4: Điều hướng cơ bản trong Vim

Mặc dù mình có thể sử dụng các phím mũi tên :arrow_up: :arrow_down: :arrow_left: :arrow_right: để di chuyển xung quanh một file. Vậy nếu file có dữ liệu lớn thì sao, sẽ rất khó khăn đúng không. Vim có rất nhiều tính năng điều hướng tuyệt vời, nhưng đầu tiên là cách di chuyển đến dòng cụ thể.

Tiếp tục với phím **Esc** để ở trạng thái Normal, sau đó nhập **:set number** và nhấn **Enter**, Yeahhh... Mình đã có số thứ tự ở bên trái mỗi dòng.

![](https://images.viblo.asia/26921117-50c8-424b-ac91-f491ddd6aab7.png)

Good, good :D *Vậy làm thế nào để mình nhảy đến một dòng nào đó?*, khi đó bạn sẽ viết lệnh **:<LINE_NUMBER>** , trong đó LINE_NUMBER là số dòng mình muốn đến và nhấn **Enter**. Ví dụ mình di chuyển đến dòng 8 thì sẽ là
```cmd
:8
```
Và giờ thì mình đã ở dòng số 8.

![](https://images.viblo.asia/523f2f81-b49e-4046-8cd4-04027410a9e0.png)

Vậy giờ tưởng tượng chút, file bên trên có khoảng 1000 dòng và mình muốn đi đến cuối file đó. Làm thế nào bây giờ?

Nhấn **Esc** ở chế độ Normal, sau đó nhập **: $** và nhấn **Enter**. Mình đã ở dòng cuối cùng!

![](https://images.viblo.asia/594095f6-5248-4457-9a5d-bd49b27a8861.png)

### Bước 5: Chỉnh sửa cơ bản trong Vim

Khi mình đã điều hướng cơ bản trong file được rồi, giờ thì áp dụng nó để thực hiện  một số chỉnh sửa cơ bản trong Vim. Chuyển sang chế độ Insert (phím **i**). Khi đó mình có thể sử dụng bàn phím để xóa hoặc chèn ký tự, nhưng Vim cũng có những điều hay ho của nó.

Di chuyển đến dòng 8, nhấn phím **d** hai lần liên tiếp thật nhanh (**dd** - nhớ tắt Vietkey đi nhá :v). Bùm! dòng 8 biến mất và mỗi dòng  tiếp theo được di chuyển lên, tức dòng 9 thành dòng 8.

![](https://images.viblo.asia/a55b00dd-b400-412d-ab44-d068f3f76c36.png)

Vậy đó là lệnh *delete*. Giờ thì nhấn phím **u** thì bạn sẽ thấy dòng 8 vừa xóa xong được phục hồi. Đây là lệnh *undo*.

![](https://images.viblo.asia/86075002-52a6-4b89-a6dd-a0d779ece880.png)

Tiếp theo là *copy and paste* văn bản, nhưng trước tiến là học cách làm `hightlight` đoạn text trong Vim. Nhấn phím **v** và các phím mũi tên :arrow_left: :arrow_right: để chọn và bỏ chọn đoạn text. Nó cũng có thể giúp ích cho bạn nếu bạn đang muốn cho người khác xem đoạn code đó rõ ràng hơn.

![](https://images.viblo.asia/41bca456-4c60-4bf6-91ff-4fabd30fec68.png)

Khi đánh dấu đoạn text muốn copy thì nhấn phím **y** - chế độ *yank* và nó sao chép vào bảng tạm. Tiếp theo, tạo một dòng mới bên dưới bằng phím **o**. Lưu ý là nó sẽ đưa mình vào chế độ Insert, nhấn tiếp phím **Esc** để thoát và nhấn phím **p**  - *paste* để dán đoạn text vừa copy vào dòng đó. Khi đã hoàn tất thì mình sẽ lưu tệp bằng **:wq**.

![](https://images.viblo.asia/174455e3-214f-4713-b3c0-4cb6485bcc98.png)

### Bước 6: Tìm kiếm cơ bản trong Vim

Khi bạn muốn sửa code ở một dòng nào đó trong file, vậy làm thế nào để làm điều đó một cách nhanh chóng? Bạn cũng có thể di chuyển theo số thứ tự của dòng nếu bạn biết nó nằm trên dòng nào? Hoặc có thể muốn tìm kiếm đoạn code đó bằng từ khóa nhất định.

Vim cũng có chức nên tìm kiếm rất hữu ích. Bạn chuyển sang chế độ Command Line, sau đó nhấn dấu hai chấm theo cú pháp sau:
```cmd
:/<SEARCH_KEYWORD>
```
Trong đó **<SEARCH_KEYWORD>** là chuỗi văn bản bạn muốn tìm. Ở đây mình tìm bằng keyword "Hello world".

![](https://images.viblo.asia/9fc1a38d-7f58-4abe-abaa-8deec07b9435.png)

Tuy nhiên từ khóa đó có thể xuất hiện nhiều lần, vì vậy bạn có thể sử dụng phím **n** - *Next* để đi tới vị trí tiếp theo của keywork (nhớ thoát khỏi chế độ Insert. Vậy là đã hoàn thành các bước sử dụng Vim cơ bản rồi đó!

### Sử dụng chế độ phân chia trong Vim

Thoát khỏi `hello.php` và tạo file `goodbye.php`.  Trong Terminal nhập **vi goodbye.php** và nhấn **Enter** để tạo file mới có tên là *goodbye.php*. Nhập bất kỳ đoạn code bạn muốn và lưu lại thay đổi.

Trong chế độ Command Line, mình nhập **:split hello.php**, và nhìn điều gì sẽ xảy ra.

![](https://images.viblo.asia/a3217812-8087-4e53-b6f1-0247e980400c.png)

Ohh! Lệnh **split** tạo các cửa sổ theo chiều ngang phân chia 2 fille khác nhau. Để chuyển đổi giữa các cửa sổ thì cần giữ **Control** trên Mac hoặc **Ctrl** trên PC, sau đó nhấn **ww** (hai lần **w** liên tiếp).

Lưu ý:
> Nếu bạn muốn hiển thị cửa sổ theo chiều dọc thì sử dụng lệnh **:vsplit <FILE_NAME>** thay vì **:split <FILE_NAME>**.
> 
> Bạn có thể mở nhiều hơn hai file bằng cách lặp lại một trong hai lệnh trên.

## Một số lệnh cơ bản

Vim có rất nhiều câu lệnh khác nhau, bạn có thể tìm hiểu [tại đây](https://coderwall.com/p/adv71w/basic-vim-commands-for-getting-started) về một lệnh cơ bản của Vim nhé!

## Kết luận

Trong bài viết này, mình đã tìm hiểu cách sử dụng Vim vừa đủ để có thể phục vụ cho công việc và dự án. Nhưng đây mới chỉ là khởi đầu cho một hành trình trở thành master Vim nếu ai muốn. Bạn cần phải học thêm rất nhiều các bộ lệnh khác của Vim và thành thục với chúng. Hi vọng bài viết của mình giúp ích được cho các bạn đôi chút :D

Tài liệu tham khảo:

https://vi.wikipedia.org/wiki/Vim_(tr%C3%ACnh_so%E1%BA%A1n_th%E1%BA%A3o)

https://www.computerhope.com/unix/vim.htm

https://coderwall.com/p/adv71w/basic-vim-commands-for-getting-started