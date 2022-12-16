{@embed: https://www.youtube.com/watch?v=uKLevglWL78}
# Mở bài
Ở những bài trước, chúng ta đã biết để hiển thị số trong VIM thì chúng ta sẽ dùng lệnh `:set nu` để hiển thị số dòng. Nhưng mà nếu bạn luôn muốn hiển thị số dòng mà mỗi lần mở VIM lại phải gõ lệnh như vậy thì thật là mệt. Thử tưởng tượng sẽ ra sao nếu như chúng ta có nhiều lệnh mà muốn dùng mặc định? Lúc đó nghỉ phẻ chứ dùng VIM làm gì nữa. Đó là lí do chúng ta có cách để setup mặc định ở trong VIM.
# Thân bài
Để setup những setting mặc định trong VIM, trước tiên bạn cần tạo một file tên là .vimrc ở thư mục home. Thì thư mục home của mình là `/home/lkp` nên file .vimrc của mình sẽ có đường dẫn là `/home/lkp/.vimrc`. Sau khi tạo xong, các bạn mở file này lên và gõ `set nu` sao đó lưu lại. Cuối cùng các bạn thử bật một file nào đó hoặc mở vim lên xem thử. Lúc này các bạn sẽ thấy là VIM đã có số dòng mà không cần phải chạy lệnh `:set nu`. Đó là do khi VIM khởi động, VIM sẽ đọc file `.vimrc` này trước, nếu chúng ta có setting gì trong này thì VIM sẽ chạy nó lên thay vì phải đợi người dùng chạy câu lệnh. Rất là tiện ích nếu các bạn muốn cài đặt cái gì đó mặc định. Thường thì mình sẽ cài đặt số dòng này, cài đặt tab là 4 space này, cài đặt colorscheme này.

Okla, mình sẽ cài đặt thêm một vài thứ. Để cài đặt colorscheme thì mình sẽ thêm câu lệnh này vào `colorscheme gruvbox` rồi mình bật luôn syntax highlight với câu lệnh `syntax on`.  Thêm những câu lệnh này để setup tabwidth bằng 4 space. Giải thích sơ bộ về những lệnh setup tab. Đầu tiên là `set tabstop=4`, tabstop này sẽ định nghĩa là bao nhiêu cột sẽ nhảy cho một lần bấm tab, mình set bằng 4 thì mỗi lần bấm tab thì con trỏ mình sẽ nhảy 4 cột. Tiếp theo là `set shiftwidth=2`, shiftwidth xách định số cột văn bản được thụt vào khi sử dụng thao tác reindent. Tiếp theo là `set expandtab` tức là dùng space thay cho tab. Và cuối cùng là `set autoindent` để tự động thụt vào khi mà đang sửa file. Tổng hợp lại, những setting cơ bản của mình sẽ như vầy:

![image.png](https://images.viblo.asia/6f8bee0b-6c58-4a7a-8ec5-3a08b35af8cc.png)
Sau đó, các bạn tắt vim rồi mở lại, các bạn sẽ thấy có số cho dòng, màu đổi, thử bấm tab, thử gõ code rồi enter xuống dòng nó sẽ tự nhận dạng và tự động indent. Nice xừ.
# Kết bài
Mong là sau bài này, các bạn sẽ biết được cách setup mặc định cho VIM. Nếu có setup nào hay ho thì hãy comment bên dưới để mọi người có thể tham khảo nhé. 

Tóm tắt:
{@embed: https://www.youtube.com/shorts/pWmqphyqK6Q}