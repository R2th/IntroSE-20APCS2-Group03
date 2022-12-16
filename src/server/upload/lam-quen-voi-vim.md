# Giới thiệu
Nếu bạn đã từng sử dụng Vim, chắc hẳn bạn sẽ gặp rất nhiều khó khăn trong thời gian đầu sử dụng. Bạn sẽ thao tác chậm hơn rất nhiều so với việc sử dụng giao diện trên máy tính. Nhưng khi đã làm quen được với Vim, việc viết code của bạn sẽ đạt được hiệu quả cao hơn theo cấp số nhân. Trong bài viết này mình sẽ giới thiệu với mọi người một vài thao tác cơ bản của Vim.
# Chế độ
Vim có 2 chế độ:
* Normal ( Command mode)
* Insert ( Edit mode )
Khi bạn khởi động Vim, bạn sẽ bắt đầu với chế độ `Normal`. Để có thể trở lại chế độ `Normal` bất cứ lúc nào, bạn dùng phím `ESC` . Chế độ `Normal` cho phép bạn ra lệnh với danh sách các lệnh là vô tận.

 Có rất nhiều cách để bắt đầu chế độ `Insert`. Cách dễ sử dụng nhất là sử dụng lệnh `i`.  `i` là viết tắt của `Insert` . Khi đang ở chế độ `Normal`, bạn dùng lệnh `i` để đổi sang chế độ `Insert`.  Bây giờ mọi thứ bạn viết sẽ được hiển thị lên màn hình. Vì không có màn hình giao diện nên bạn sẽ không sử dụng được chuột. Sẽ không có menu tùy chọn, không có nhấp chuột. Thứ duy nhất bạn có thể thao tác là bàn phím.
  # Câu lệnh
   Với Vim, các câu lệnh được hiểu gần giống với ý nghĩa của chúng: Một tập hợp các kí tự được phân cách bằng khoảng trắng hoặc kí tự đặc biệt. Các câu lệnh trong Vim tuân theo một nguyên tắc nhất định. Biết được điều này sẽ giúp ta đặt mỗi lệnh vào một nhóm lệnh nhất định.
   Cấu trúc câu lệnh sẽ như sau: 
   
   `[action] <number> [motion]`
   
  `[action]` là những hành động ta muốn làm,
  
  `[number]` là số lần muốn thực hiện hành động,
  
  `[motion]` là phạm vi của hành động.
  
  Ví dụ sau sẽ giúp hiểu rõ hơn cấu trúc của câu lệnh.
  
  Giả sử ta muốn `xóa 3 từ tiếp theo, bắt đầu từ con trỏ`. Ở đây hành động (action) là xóa, số lần thực hiện hành động (number) là 3 và phạm vi của hành động là các từ. 
  Câu lệnh cho hành động xóa là `d` .
  Chúng ta có câu lệnh cho ví dụ trên như sau: `d3w` - xóa 3 kí tự tiếp theo. 
  `Motion` có thể sử dụng mà không cần `action`, nó sẽ tự điều hướng.
  Ví dụ đánh lệnh `w` thì con trỏ sẽ di chuyển con trỏ về phía trước một từ.
  # Các lệnh hữu ích
  ## Cách đóng Vim
  Chúng ta sẽ không muốn bị mắc kẹt lại Vim mà không biết cách để đóng nó lại. Phải luôn có cách để thoát khỏi màn hình Vim.
  
  `:q` để thoát 
  
  `:wq` lưu và thoát khỏi Vim.
  ## Các lệnh Action
  `d` : xóa 
  
  `i` : insert
  
  `p` : paste
  
  `y` : copy
  
  `x` : cut
  
  `u` : undo
  
  `di` : delete inside
  
  `v` : select
  
  `/` : search
  
  `:s` : tìm và thay thế (giống như replace)
  
   Các hành động này được thực hiện rất thường xuyên nên Vim có hỗ trợ cách viết ngắn gọn. 
   Ví dụ: 
    
   `dd` : Để xóa toàn bộ dòng hiện tại
   
   `yy` : Copy dòng hiện tại
   
   
## Các lệnh Motion
Các lệnh `motion` đi cùng với `action` và các `motion` cùng với `action`. Một số lệnh `motion` cơ bản : 

`w` : bắt đầu của từ tiếp theo

`e` : kết thúc của từ hiện tại

`b` : bắt đầu của từ phía trước

Các phím `h,j,k,l`  dùng để thay thế cho các phím điều hướng, các phím này giúp bạn không cần di chuyển tay ra xa khỏi bàn phím.
Một vài lệnh `motion` : 

`$` : kết thúc dòng.

`0` : đầu dòng.

`G` : cuối file

`nG` : nhẩy đến dòng thứ `n`

`)` : di chuyển đến câu phía trước

`(` : di chuyển đến đoạn phía trước

Để dễ hình dung hơn hãy xem ví dụ sau :

```

                ge      b          w                             e

               <-     <-         --->                          --->
               
  This is-a line, with special/separated/words (and some more). ~

     <----- <-----         -------------------->         ----->
     
         gE      B                   W                       E
         
```

Với những `action` và `motion` ở trên, ta có thể tạo hầu hết các lệnh cơ bản có trong Vim. Sau đây là 8 ví dụ cho những câu lệnh hay sử dụng nhất.
1. Xóa 3 dòng tiếp theo : `d3w`
2. Copy từ hiện tại (con trỏ ở đầu từ muốn copy) : `yw`
3. Copy từ hiện tại (con trỏ nằm giữa từ muốn copy) : `yiw` 
4. Di chuyển con trỏ xuống n dòng: `nj`
5. Xóa mọi thứ bên trong dấu ngoặc nhọn: `di}`
6. Di chuyển con trỏ lên 2 đoạn: `2{` (dùng `{` để di chuyển lên và `}` để di chuyển xuống dưới )
7. Paste văn bản đã chọn trước đó n lần `np`
8. Thêm vào tại vị trí con trỏ 1 đoạn text : "Hello Vim" `i Hello Vim` dùng `i` để chuyển sang chế độ `Insert` 
# Một vài lệnh khác
## Chia nhỏ màn hình
`:vsplit <filename>` Tạo một màn hình khác theo chiều dọc, cho phép bạn thao tác như trên màn hình cũ. Để chuyển qua lại các màn hình sử dụng tổ hợp phím `<ctrl-w>`. Hoặc có thể dùng thêm các phím điều hướng `h,j,k,l` để di chuyển.
Ví dụ: `<ctrl-w> h` để chuyển sang màn hình trước đó. Để đóng cửa sổ dùng lệnh `:q`
## Tạo thêm nhiều tab mới
`:tabnew <filename>` tạo một màn hình trên một tab mới.

`:tabn` chuyển sang tab vừa tạo ( hoặc có thể dùng `:gt`)

`:tabp` chuyển sang tab trước đó (hoặc dùng `:gT`)
# Tổng kết
Trên đây là một vài hướng dẫn cơ bản khi bắt đầu với Vim. Bài viết tuy còn nhiều thiếu sót nhưng hy vọng sẽ giúp mọi người bước đầu làm quen được với Vim.
Cám ơn mọi người đã đọc bài viết này.
# Link tham khảo
- https://medium.freecodecamp.org/how-not-to-be-afraid-of-vim-anymore-ec0b7264b0ae