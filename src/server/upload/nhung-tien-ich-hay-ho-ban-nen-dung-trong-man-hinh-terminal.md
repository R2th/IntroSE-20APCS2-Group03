## Mở đầu.
Nếu bạn là một lập trình viên lâu năm, chắc chắn bạn sẽ thường xuyên làm việc trên cửa sổ Termial . Mỗi dòng lệnh trên cửa sổ  Terminal đều có một giá trị nhất định. Mọi thứ bạn cần làm chỉ là mở cửa sổ `Terminal` lên và ra lệnh cho máy tính. Nghe có vẻ rất "pro" phải không ? 

![](https://images.viblo.asia/a19254d1-a5d2-4c57-965e-8df92b51bccf.jpeg)

Sau đây mình xin giới thiệu một số công cụ bạn nên dùng để đạt hiệu quả cao và trở nên ngầu hơn khi làm việc với Terminal
## 1. Shell (zsh)
Nhiều người nói rằng zsh không thật sự giúp gì nhiều trong khi làm việc. Nhưng với mình zsh giúp mình làm việc nhanh và hiệu quả hơn rất nhiều.
### Zsh đi kèm với một loạt các tính năng: 
* Tự động sửa chính tả
* Dễ dàng làm việc với bash
* Tự động hoàn thành dòng lệnh với phim `Tab`
*  Còn nhiều nữa, các bạn có thể xem thêm tại [đây](http://zsh.sourceforge.net/Doc/Release/zsh_toc.html)
### Đi kèm với zsh là một giao diện tuyệt vời để quản lý cấu hình zsh của bạn: 
[Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) bao gồm hơn 200 plugin và hơn 140 theme để sử dụng trên màn hình `Terminal` của bạn. Ví dụ:
* [git](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git) - có rất nhiều alias và chức năng hữu ích dành cho `git`
* [tmux](https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/tmux/tmux.plugin.zsh) - alias và các cài đặt để tích hợp zsh với tmux 
* [node](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/node) - thêm lệnh `node-docs` để mở tài liệu trên trình duyệt web
* [osx](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/osx) - có rất nhiều tiện ích để làm việc với OSX
* [web-search](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/web-search) - tìm kiếm trên web từ dòng lệnh
...

Còn rất nhiều tính năng hay từ zhs, bạn có thể tìm mọi thứ tại [đây](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)
## 2. Session Management (tmux)
Là một lập trình viên đôi lúc chúng ta sẽ rơi vào tình trạng rơi vào mớ hỗn độn vì đôi lúc chúng ta phải làm việc trên nhiều dự án cùng một lúc. Đây là lúc chúng ta cần dùng đến [tmux](https://github.com/tmux/tmux)
Tmux cho phép bạn tạo ra các phiên làm việc.Mỗi phiên làm việc có thể tùy chỉnh theo bố cục mà bạn cần. Bạn có thể đặt tên cho mỗi phiên làm việc để dễ dàng quản lý. Thậm chí có thể khôi phục các phiên làm việc này nếu chẳng may màn hình `Terminal` của bạn bị đóng lại. Hơn nữa, nó còn có thể tùy chỉnh cho phép bạn hiển thị những thông tin như thời gian, ngày tháng, mức sử dụng CPU và nhiều thứ khác. Và nếu bạn không biết mức sử dụng CPU của mình tại bất kì thời điểm nào, liệu bạn có phải là một lập trình viên chuyên nghiệp ? 

![](https://images.viblo.asia/468e1435-3632-4bc6-9507-53c93dc86f6b.gif)
Tmux thậm chí có cả một trình quản lý [plugin](https://github.com/tmux-plugins/tpm) với một loạt những  [plugin và những tính năng tuyệt vời](https://github.com/rothgar/awesome-tmux)
## 3. Search (ripgrep)
Việc tìm kiếm trong project của bạn là một điều phải làm thường xuyên. Điều này nên được thực hiện một cách nhanh chóng và nó không nên chiếm nhiều thời gian của bạn. Điều này có nghĩa là việc tìm kiếm của bạn sẽ bỏ qua những thứ mà file `.gitignore` của bạn bỏ qua, bỏ qua mọi tệp nhị phân và tệp ẩn. Đó là lý do tại sao chúng ta lại dùng [ripgrep](https://github.com/BurntSushi/ripgrep)

![](https://images.viblo.asia/07fa9fe5-d76f-43a9-aef5-a70669d7dac3.gif)
Theo lời của người sáng tạo: "Dùng ripgrep nếu bạn muốn nhanh, ít lỗi hơn và hỗ trợ Unicode"
## 4. Fuzzy Finding (fzf)
Người dùng bình thường sẽ cảm thấy thật khó để có thể nhớ chính xác vị trí của những file cần thiết có trong project của họ và việc này có thể làm tốn nhiều thời gian của họ. Nhưng với những người dùng `fzf` họ chỉ cần nhập tên tệp hoặc một số đường dẫn và có thể nhanh chóng tìm được tệp mà họ đang muốn tìm kiếm. Fzf có thể được sử dụng với bất kì đối tượng nào như "file, lịch sử lệnh trên `Terminal`, tên máy chủ, dấu trang, tên commit v.v.."
![](https://images.viblo.asia/cf888c03-706e-4a69-8087-7f7464e6547c.gif)

Có rất nhiều ví dụ, bạn có thể tìm tại [fzf wiki](https://github.com/junegunn/fzf/wiki/examples)
## 5. Changing directories (z)
Người dùng bình thường : muốn đổi thư mục sang thư mục `project` nằm trong 1 folder trong 1 thư mục cha `parent` nằm trong một thư mục cha `cool` sẽ phải thao tác như sau: 
```
    cd ~/code/parent/cool/project
```
Thật nhiều bước đúng không? 
Với người dùng sử dụng changing directoríe thì chỉ cần dùng lệnh sau: 
```
    z project
```
Nhập đường dẫn đến tệp một cách đầy đủ là cách dành cho những người mới còn ít kinh nghiệm làm việc. Khi là một lập trình viên có kinh nghiệm lâu năm bạn sẽ sử dụng đến [z](https://github.com/rupa/z)
Khi mới cài đặt nó sẽ bắt đầu học những thứ bạn mới truy cập. Sau đó điều bạn cần làm là nhập cho nó tên thư mục đơn giản để đi đến thư mục bạn cần đi tới.

## 6. Một số tiện ích khác
1.   [wttr.in](https://github.com/chubin/wttr.in) Xem thời tiết hiện tại trên Terminal
 ```curl wttr.in/Hanoi```
Bạn có thể xem thời tiết real time bằng dòng lệnh trên 

![](https://images.viblo.asia/145774d8-ddd5-4fdc-8274-4e0543e7132a.png)

2. Star Wars - Xem Star wars trên Terminal ? Tại sao không 

Dùng lệnh:  ```telnet towel.blinkenlights.nl``` và bắt đầu xem phim thôi :v
![](https://images.viblo.asia/2ec64528-8ac7-4362-810b-76e36ce734ae.gif)

Trên đây là một số tiện ích mình nghĩ mọi người nên dùng để có thể tiết kiệm thời gian cũng như rút gọn thao tác khi làm việc. Mong rằng bài viết sẽ giúp mọi người có thêm một chút kĩ năng khi làm việc với màn hình Terminal. 
Cám ơn mọi người đã đọc bài.

Nguồn : https://medium.freecodecamp.org/coding-like-a-hacker-in-the-terminal-79e22954968e