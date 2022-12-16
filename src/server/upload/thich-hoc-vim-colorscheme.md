{@embed: https://www.youtube.com/watch?v=QqEhxIeq3tY}
# Mở bài
VIM hiện tại nhìn thật tẻ nhạt vì chỉ có màu trắng và màu đen. Trong cuộc sống, để bớt tẻ nhạt thì chúng ta làm màu. Còn trong VIM, để bớt tẻ nhạt thì chúng ta làm colorscheme.
# Thân bài
## Xem danh sách colorscheme
Trước khi làm colorscheme thì hãy xem chúng ta hiện đang có những colorscheme nào bằng cách gõ lệnh `:colorscheme` xong rồi các bạn bấm `space` rồi bấm `Ctrl+d` thì các bạn sẽ thấy hiển thị ra những colorscheme chúng ta hiện có. Các bạn cũng có thể gõ `:colo` thay vì `:colorscheme` nhé. Đây là những cái colorscheme hiện tại mà mình đang có:
![image.png](https://images.viblo.asia/ec035066-6ac4-4863-8537-fc0d3550cba8.png)
## Chọn colorscheme
Để thay đổi sang một colorscheme nào đó thì các bạn gõ lệnh `:colorscheme colorscheme-name`, thay thế `colorscheme-name` bằng tên colorscheme mà bạn chọn. Giả sử bạn muốn chọn colorscheme blue thì bạn sẽ gõ lệnh `:colorscheme blue`, chọn desert thì gõ lệnh `:colorscheme desert`.
## Cài thêm colorscheme
Để cài colorscheme thì trước tiên các bạn cần có thư mục `.vim` ở trong home của mình và các bạn tạo thư mực colors bằng câu lệnh này trong linux `mkdir ~/.vim/colors`. Sau đó, các bạn tìm đến colorscheme của vim và sao chép file `.vim` vào trong thư mục colors mới tạo. Tiếp đến các bạn mở VIM và gõ `:colorscheme` thì sẽ thấy có màu mình mới vừa thêm vào. Trong trường hợp của mình thì mình mới thêm vào colorscheme gruvbox.

Thường mình sẽ xem colorscheme của VIM ở đây. https://vimcolorschemes.com/. Sau khi xem tên colorscheme thì mình sẽ vào trong github và tìm file `.vim`. Ví dụ như cài gruvbox thì mình sẽ tìm đến file này https://github.com/morhetz/gruvbox/tree/master/colors. Sau đó mình copy cái file này vào thư mục vim và bật vim lên gõ `:colorscheme <spac> <Ctrl+d>` để xem màu gruvbox của mình có chưa, nếu có rồi thì mình sẽ gõ `:colorscheme gruvbox` để chuyển sang colorscheme gruvbox.
## Syntax highlight
Để highlight syntax theo colorscheme mới thêm thì các bạn có thể dùng lệnh này `:syntax on`.
# Kết bài
Như vậy là chúng ta đã tìm hiểu xong về cách make colorscheme trong VIM. Mong là sau bài này thì thế giới VIM của bạn sẽ nhiều màu sắc hơn nhé. Tóm tắt:
https://youtube.com/shorts/wZktkBSPLtY?feature=share