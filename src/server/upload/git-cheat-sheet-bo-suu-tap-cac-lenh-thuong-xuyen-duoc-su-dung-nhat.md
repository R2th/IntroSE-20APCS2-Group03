Git là công cụ kiểm soát phiên bản dành cho các nhà phát triển phần mềm vì nó cho phép các lập trình viên quản lý hiệu quả mã nguồn và theo dõi các file thay đổi trong khi làm việc nhóm. Trên thực tế, Git có rất nhiều cách sử dụng nên việc ghi nhớ các lệnh khác nhau của nó có thể là một nhiệm vụ khó khăn. Trong bài viết này giới thiêu một số lệnh git hữu ích và thường gặp nhất trong quá trình sử dụng git
## Git là gì?
Git là phần mềm quản lý mã nguồn phân tán được phát triển bởi Linus Torvalds vào năm 2005, ban đầu dành cho việc phát triển nhân Linux. Hiện nay, Git trở thành một trong các phần mềm quản lý mã nguồn phổ biến nhất.
<br>
Git là hệ thống kiểm soát phiên bản phân tán mã nguồn mở được sử dụng rộng rãi nhất trong một thập kỷ sau khi phát hành lần đầu. Không giống như các hệ thống kiểm soát phiên bản khác lưu trữ lịch sử phiên bản đầy đủ của dự án tại một nơi, Git cung cấp cho mỗi nhà phát triển kho lưu trữ riêng chứa toàn bộ lịch sử thay đổi.
## Thuật ngữ trong Git
Trước khi bắt đầu, chúng ta cùng tìm hiểu các thuật ngữ quan trọng trong Git:
### Repository
Kho lưu trữ (Repository) Git chứa tất cả các tệp dự án của bạn bao gồm các `branch`, `tags`và `commits`.
### Branch
Các `Branch` đại diện cho các phiên bản cụ thể của một kho lưu trữ ( repository ) chương trình chính của bạn. `Branch` cho phép bạn theo dõi các thay đổi bạn thực hiện đối với kho lưu trữ và hoàn tác về các phiên bản cũ hơn
### Commit
Một `commit` đại diện cho một điểm cụ thể trong lịch sử dự án của bạn. Sử dụng lệnh `commit` kết hợp với lệnh `git add` để cho `git` biết những thay đổi bạn muốn lưu vào kho lưu trữ cục bộ. Và hành động này không được tự động gửi đến máy chủ từ xa.
### Checkout
Sử dụng lệnh `git checkout` để chuyển giữa các `branch`. Chỉ cần nhập `git checkout` theo sau là tên của `branch` bạn muốn chuyển đến. Hãy nhớ các `commit` của bạn khi bạn chuyển đổi giữa các `branch`
### Fetch
Lệnh `git fetch` sao chép và tải xuống tất cả các tệp của nhánh vào thiết bị của bạn. Sử dụng nó để lưu các thay đổi mới nhất vào kho của bạn. Nó có thể `fetch` nhiều nhánh cùng một lúc.
### Fork
Fork là một bản copy của kho lưu trữ chính dự án của bạn. Những thay đổi của bản trên bản Fork sẽ không ảnh hưởng đến dự án chính của bạn 
### Head
Các commit ở đầu của một nhánh được gọi là `HEAD`. Nó đại diện cho `commit` mới nhất của kho lưu trữ mà bạn hiện đang làm việc.
### Index
Bất cứ khi nào bạn thêm, xóa hoặc thay đổi một tập tin, nó vẫn nằm trong `index` cho đến khi bạn sẵn sàng `commit` các thay đổi. Nó như khu vực tổ chức cho Git. Sử dụng lệnh `git status` để xem nội dung của `index` của bạn. Những thay đổi được tô sáng bằng màu xanh lá cây đã sẵn sàng để được `commit` trong khi những thay đổi màu đỏ vẫn cần được thêm vào `staging`.
### Master
Master là nhánh chính của tất cả các kho lưu trữ của bạn. Nó nên bao gồm những thay đổi và `commit` gần đây nhất.
### Merge
Sử dụng lệnh `git merge` để thêm các thay đổi từ nhánh này sang nhánh khác.
### Pull
Lệnh `git pull` được sử dụng để thêm các thay đổi vào nhánh chính. 
### Push
Lệnh `git push` được sử dụng để cập nhật các nhánh từ xa với những thay đổi mới nhất mà bạn đã commit.
### Rebase
Lệnh `git rebase` cho phép bạn tách, di chuyển hoặc thoát khỏi các commit. Nó cũng có thể được sử dụng để kết hợp hai nhánh khác nhau.
### Stash
Lệnh `git stash` sẽ loại bỏ các thay đổi khỏi `index` của bạn và xóa stash chúng sau đó. Nó có ích nếu bạn muốn tạm dừng những gì bạn đang làm và làm việc khác trong một thời gian. Bạn có thể đặt stash nhiều hơn một bộ thay đổi cùng một lúc.
### Tags
`Tags` cung cấp một cách để theo dõi các commit quan trọng.
## Các lệnh để cấu hình Git
Đặt tên người dùng:
```
git config --global user.name "name"
```
Đặt email người dùng:
```
git config --global user.email abc@gmail.com
```
Đặt trình soạn thảo:
```
git config --global core.editor emacs
```
Công Cụ So Sánh Thay Đổi:
```
git config --global merge.tool vimdiff
```
Cho phép tô sáng dòng lệnh:
```
git config –global color.ui auto
```
Kiểm tra cấu hình:
```
git config --list
```
## Các lệnh để thiết lập Git Repository
Khởi tạo một `Repository:
<br>
Nếu như bạn muốn theo dõi một dự án trong Git, bạn cần ở trong thư mục của dự án đó và gõ lệnh sau:
```
git init
```
Sao chép một kho lưu trữ từ GitHub và thêm nó vào thư mục dự án:
```
git clone (repo URL)
```
Sao chép một kho lưu trữ vào một thư mục cụ thể:
```
git clone (repo URL) (folder)
```
Hiển thị danh sách các kho lưu trữ từ xa với URLs:
```
git remote -v
```
Xóa một kho lưu trữ từ xa:
```
git remote rm (remote repo name)
```
Lấy các thay đổi gần đây nhất nhưng không hợp nhất:
```
git fetch
```
Lấy các thay đổi gần đây nhất từ và hợp nhất:
```
git pull
```
## Các lệnh để quản lý file thay đổi
Thêm file thay đổi vào staging:
```
git add (file name)
```
Thêm tất cả các file thay đổi vào staging:
```
git add .
```
Thêm file mới và sửa đổi vào staging:
```
git add -A
```
Xóa một file và ngừng theo dõi nó:
```
git rm (file_name)
```
Untrack file hiện tại:
```
git rm –cached (file_name)
```
Hiển thị trạng thái của các file sửa đổi:
```
git status
```
Hiển thị danh sách các file bị ignore:
```
git ls-files –other –ignored –exclude-standard
```
Hiển thị tất cả các thay đổi chưa unstaged trong `index` và thư mục hiện tại:
```
git diff
```
Hiển thị sự khác biệt giữa các file trong staging và phiên bản mới nhất:
```
git diff –staged
```
Hiển thị các thay đổi trong một file so với `commit` gần đây nhất:
```
git diff (file_name)
```
## Các lệnh Git Commit
`Commit` thay đổi cùng với một thông báo tùy chỉnh:
```
git commit -m "(message)"
```
`Commit` và thêm tất cả các thay đổi vào `staging`:
```
git commit -am "(message)"
```
Chọn tới một `commit` ở `branch` hiện tại:
```
git checkout <commit>
```
Hiển thị metadata và nội dung thay đổi của một cam kết:
```
git show <commit>
```
Hủy tất cả các thay đổi đối với một `commit`:
```
git reset –hard <commit>
```
Hủy tất cả các thay đổi cục bộ trong thư mục:
```
git reset –hard Head
```
Hiển thị lịch sử thay đổi:
```
git log
```
Bỏ tất cả các file đã sửa đổi:
```
git stash
```
Truy xuất các file đã `stashed`:
```
git stash pop
```
Xóa các file đã `stashed`:
```
git stash drop
```
## Các lệnh với Git Branch
Hiển thị tất cả các nhánh:
```
git branch
```
Tạo một nhánh mới và chuyển sang nó:
```
git checkout -b <branchname>
```
Di chuyển tới một nhánh:
```
git checkout <branchname>
```
Xóa một nhánh:
```
git branch -d <branchname>
```
Hợp nhất một nhánh khác với nhánh hiện tại của bạn:
```
git merge <branchname>
```
Lấy một nhánh từ kho lưu trữ:
```
git fetch remote <branchname>
```
Xem conflict khi `merge` các nhánh:
```
git diff <sourcebranch> <targetbranch>
```
Xem trước các thay đổi trước khi `merge` nhánh:
```
git diff <sourcebranch> <targetbranch>
```
## Lời kết
Bài viết này mình đã giới thiệu một số thuật ngữ và các câu lệnh Git mà mình thường xuyên sử dụng nhất. Bạn có thể sử dụng bài viết này của mình để tham khảo khi bạn cần một lệnh cụ thể. Và bạn cũng có thể tạo Git cheat Sheet của riêng mình với các lệnh bạn sử dụng thường xuyên nhất. Cảm ơn các bạn đã theo dõi bài viết của mình :D