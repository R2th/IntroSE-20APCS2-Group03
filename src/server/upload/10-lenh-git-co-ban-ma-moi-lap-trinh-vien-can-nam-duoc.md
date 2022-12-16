Trong bài viết này, chúng ta sẽ thảo luận về các lệnh Git cơ bản mà bạn nên biết khi muốn chở thành một lập trình viên chuyên nghiệp. Chúng ta sẽ tìm hiểu các chức năng của Git. Chúng a cũng sẽ đề cập đến các cách để thoát khỏi Vim và tiết kiệm thời gian với bí danh Bash và cấu hình trình soạn thảo Git. Mỗi lệnh sẽ link đến bài hướng dẫn cụ thể.
Dưới đây là 10 lệnh Git cơ bản cần biết và một số cú pháp phổ biến của chúng.

## Kiểm tra những thay đổi 
Hãy nhìn vào việc kiểm tra những sự thay đổi trước.

* [git diff](https://www.atlassian.com/git/tutorials/saving-changes/git-diff) xem các tập tin được thay đổi. Mỗi tên tệp có thể được thêm vào để hiển thị các thay đổi của tệp đó.
* [git log](https://www.atlassian.com/git/tutorials/git-log) Xem toàn bộ lịch sử commit. Cũng có thể sử dụng cho một file với cú pháp `git log -p my_file`. Sau đó ấn `q` để thoát
* [git blame my_file](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-blame) Hiển thị tên và thời gian người đã sửa file `my_file` của bạn.
* [git reflog](https://www.atlassian.com/git/tutorials/rewriting-history/git-reflog)  Hiển thị log các thay đổi ở máy tình của bạn. Rất tốt để tìm kiếm dữ liệu bị mất.
Kiểm tra mọi thứ với Git không phải là quá khó hiểu. Ngược lại, Git cung cấp rất nhiều tùy chọn để loại bỏ và hoàn tác các sự thay đổi trên file của bạn.
## Hoàn tác
`git reset`, `git checkout`, và  `git revert` được sử dụng để hoàn tác tất cả các thay đổi trên file của bạn. `git reset` và  `git checkout` có thể sử dụng cả khi đã `commit`  và khi đang ở trạng thái chưa `commit`.
`git revert` chỉ sử dụng khi đã thực hiện `commit`. Nếu bạn đã thực hiện `commit` trên máy của mình mà chưa `merge` `commit` vào nhánh làm việc trên git hub thì bạn có thể sử dụng bất kỳ lệnh nào trong số các lệnh trên.
Nếu bạn đã `merge`  và cần xóa một `commit` ở nhánh làm việc trên git hub thì bạn cần dùng lệnh `git revert` .
Mỗi lệnh trên đều có những tùy chọn khác nhau. Đây là những cách sử dụng phổ biến nhất.
* [git reset --hard HEAD](https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting) Hủy bỏ những thay đổi và trở về trạng thái `commit` gần nhất.
Chỉ định một nhánh khác thay vì HEAD để hoàn tác những thay đổi về nhánh mà bạn chọn.
Khi sử dụng `git reset --hard [tên commit]` hãy chắc chắn rằng bạn không hủy bỏ một nhánh mà đồng nghiệp của bạn đang sử dụng.
* [git checkout my_commit](https://www.atlassian.com/git/tutorials/undoing-changes) Xóa bỏ mọi thay đổi về lần commit có tên `my_commit`.
`HEAD`  thường sử dụng để hủy bỏ mọi thay đổi về lần `commit` gần nhất.
`checkout` là cách tốt nhất để hoàn tác khi làm việc ở local. Nó không gây ảnh hưởng đến lịch sử `commit` ở nhánh mà các đồng nghiệp cùng dự án đang dùng. Nếu bạn dùng `checkout` với tên nhánh thay vì tên commit, `HEAD` sẽ chuyển sang nhánh được chỉ định. Đây là cách sử dụng phổ biến của lệnh `checkout`
* [git revert my_commit](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert) Hoàn tác các thay đổi trong commit có tên `my_commit`. `revert` sẽ tạo ra 1 `commit` mới sau khi hoàn tác các thay đổi.


Đôi khi bạn chỉ muốn xóa các tập tin ở trạng thái untracked trong thư mục của bạn. Ví dụ: có thể bạn đã chạy một dòng code tạo ra nhiều loại tệp khác nhau mà bạn không muốn dùng trong repo của mình.

* [git clean -n](https://www.atlassian.com/git/tutorials/undoing-changes/git-clean) Xóa những file unstrack trong thư mục của bạn
Theo mặc định các file có trang thái unstrack được thêm trong file `.gitignore` sẽ không bị xóa, nhưng điểu này có thể thay đổi được.
Trên đây là các lệnh bạn có thể dùng để xóa mọi thay đổi trong Git. Bây giờ hãy tìm hiểu thêm các lệnh để sắp xếp mọi thứ gọn gàng hơn.
## Sắp xếp mọi thứ gọn gàng hơn.
* [git commit--amend](https://www.atlassian.com/git/tutorials/rewriting-history#git-commit--amend) thêm các thay đổi theo từng giai đoạn vào `commit` gần nhất.
Nếu không có gì thay đổi, lệnh này cho phép bạn chỉnh sửa nội dung `commit` gần đây nhất. Chỉ nên sử dụng lệnh này nếu `commit` chưa được `merge` vào nhánh làm việc trên github

## Thay đổi editor mặc định
Nếu bạn đang dùng Vim và muốn thay đổi sang một trình soạn thảo khác, bạn có thể sử dụng lệnh: 

`git config --global core.editor "atom --wait"`

Tất nhiên là máy tính của bạn đã được cài đặt trình soạn thảo bạn muốn thay đổi (ở đây là Atom)
## Tạo các alias khi sử dụng các lệnh Git
Bạn có thể tự định nghĩa các alias để sử dụng lệnh Git được thuận tiện hơn bằng cách thêm vào file `.bash_profile` các dòng sau: 

```
alias gs="git status"

alias ga="git add"

alias gaa="git add -A"

alias gb="git branch"

alias gc="git commit"

alias gcm="git commit -m"

alias gco="git checkout"

alias gp="git push"

```

bạn có thể thêm nhiều alias khác mà bạn muốn. Sau khi thêm xong, khi bạn gõ `gs` trên màn hình terminal sẽ tương đương với việc dùng lệnh `git status`

Trên đây là một số lệnh git cơ bản mà mọi lập trình viên nên biết khi làm việc.

Bài viết còn nhiều thiếu sót, cám ơn mọi người đã đọc bài. 

## Nguồn: https://towardsdatascience.com/10-git-commands-you-should-know-df54bea1595c