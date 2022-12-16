Git là 1 hệ thống quản lí phiên bản phân tán (DVCS - Distributed Version Control System). Hiểu một cách đơn giản, DVCS là hệ thống lưu trữ các tập tin ( file, thư mục, …) theo thời gian, tương ứng với nhiều phiên bản khác nhau của các tập tin đó, và bạn hoàn toàn có thể quay lại 1 phiên bản xác định nào đó sau này, xem lại các thay đổi thực hiện theo thời gian hay làm việc trên nhiều nhánh khác nhau của 1 dự án.
<br>Chúng ta sẽ bắt đầu từ những bước đầu tiên để làm việc với Git nhé!
# 1. Cài đặt git
Git có thể được cài đặt trên hầu hết hệ điều hành như Windows, Mac và Linux. Trên thực tế, Git được cài đặt sẵn trên hầu hết Mac và Linux.
## Kiểm tra bản cài đặt Git
Để biết liệu Git đã được cài đặt hay chưa, mở terminal của bạn, gõ `git version`. Kết quả hiện ra sẽ cho bạn biết phiên bản mà Git được cài đặt, hoặc nếu chưa, nó sẽ báo `git is an unknown command`. Nếu chưa được cài đặt, xem ngay cách cài đặt theo hướng dẫn sau:
## Cài đặt Git trên Windows
* Đi đến [ trình cài đặt Git dành cho Windows](https://gitforwindows.org/) và tải xuống phiên bản mới nhất.
* Khi trình cài đặt đã bắt đầu, hãy làm theo các hướng dẫn được cung cấp trong màn hình hướng dẫn **Cài đặt Git** cho đến khi quá trình cài đặt hoàn tất.
* Mở **command prompt** (hoặc **Git Bash**) rồi gõ` git version` để xác định Git đã được cài đặt thành công cùng phiên bản của nó.
## Cài đặt Git trên Mac
Hầu hết các phiên bản của MacOS đã cài đặt `Git` , và bạn có thể kích hoạt thông qua Terminal với `git version`. Tuy nhiên, nếu Git chưa được cài đặt vì một lý do nào đó, bạn hãy làm theo các bước sau:
* Đi đến [ trình cài đặt Git dành cho Macs](https://sourceforge.net/projects/git-osx-installer/files/git-2.23.0-intel-universal-mavericks.dmg/download?use_mirror=autoselect) và tải xuống phiên bản mới nhất.
* Thực hiện việc cài đặt theo hướng dẫn
* Mở terminal, rồi gõ `git version` để kiểm tra
## Trên Linux (Ubuntu)
* Mở command promt và chạy dòng lệnh `sudo apt-get update` để chắc chắn rằng mọi thứ đều được cập nhật.
* Sau đó, để cài đặt Git, chạy dòng lệnh: `sudo apt-get install git-all`
* `git version` để kiểm tra
Sau đó, bạn tạo một tài khoản Github [tại đây](https://github.com/join) nhé.
# 2. Tạo một kho chứa git tại máy của bạn (local git repository)
Để bắt đầu, mở terminal và di chuyển tới nơi mà bạn muốn tạo project của mình với dòng lệnh `cd` (viết tắt của change directory). Ví dụ, bạn có một project là "myproject" tại desktop:
```
$ cd ~/Desktop
$ mkdir myproject
$ cd myproject/
```
(mkdir myproject: tạo folder tên là myproject)
<br>Để khởi tạo kho chứa git (git repo) ở thư mục gốc, sử dụng câu lệnh `git init`:
```
$ git init
```
# 3. Tạo file mới vào git repo, git add
Bạn có thể tạo thủ công một file mới rồi save, hoặc sử dụng lệnh `touch`. Ví dụ `touch newfile.txt` sẽ tạo và lưu một file rỗng có tên là newfile.txt.
<br>Khi bạn thêm hoặc chỉnh sửa một file trong thư mục chứa git repo, file đấy sẽ tồn tại trong git repo. Nhưng git sẽ không theo dõi file nếu bạn không yêu cầu cụ thể. Git chỉ lưu hay quản lý những thay đổi đối với những file mà nó theo dõi, vì vậy chúng ta cần có dòng lệnh yêu cầu Git làm điều đấy.
```
$ touch newfile.txt
$ ls
newfile.txt
```
Sau khi tạo file, sử dụng **git status** để xem file nào mà git biết nó tồn tại:
```
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	newfile.txt

nothing added to commit but untracked files present (use "git add" to track)
```
Untracked files: những file chưa được theo dõi bởi git. Ta cần sử dụng `git add` để đưa những file mình muốn git theo dõi vào vùng theo dõi, bằng cách sử dụng câu lệnh `git add <file_name>` 
```
$ git add new.txt
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   new.txt
```
Nếu có nhiều file bạn muốn add, thay vì chỉ định file_name bạn có thể sử dụng `git add .` để đưa tất cả các file vào vùng theo dõi.
<br>Sau khi sử dụng git add, bạn thấy rằng git đã add các file vào vùng theo dõi, sẵn sàng để commit.
# 4. Tạo một commit
Đây là thời điểm để tạo commit đầu tiên của bạn.
Sử dụng câu lệnh git commit -m"Your message about the commit"
```
$ git commit -m"This is my first commit"
[master (root-commit) d1f07b8] This is my first commit
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 new.txt
```
Message ở cuối commit nên liên quan đến những cái mà bạn đã làm, thay vì chỉ nguệch ngoạc vài cái kiểu "mdsfdsf" hay "dejavu", để sau này khi tìm lại code, bạn sẽ biết được commit này mình đã làm gì.
<br>Để xem các commit của mình, sử dụng **git log** để xem chi tiết, **git log --oneline** để xem các commit mà mỗi commit chỉ hiển thị trên 1 dòng.
```
$ git log
commit d1f07b8b892e9b6a6a2e151727a8b30e9cd6200d (HEAD -> master)
Author: thaidoandat <thaidoandat1@gmail.com>
Date:   Wed Aug 11 23:18:32 2021 +0700

    This is my first commit
```
```
$ git log --oneline
d1f07b8 (HEAD -> master) This is my first commit
```
# 5. Tạo một branch mới
Bạn muốn làm một chức năng nhưng lại lo rằng sẽ thay đổi main project trong khi đang phát triển tính năng. Đây là lúc git branch lên ngôi. Nghĩa là bạn sẽ tạo một nhánh mới, sẽ chứa các phần của nhánh hiện tại nơi mà bạn đang đứng để tạo ra nhánh đó, và việc thay đổi trên nhánh này sẽ không ảnh hướng gì đến luồng chạy chính của project. Và sau khi bạn thấy code trên nhánh này hoạt động tốt rồi, bạn có thể **merge** hoặc **rebase** để gộp nó vào nhánh chính. 
Để tạo nhánh mới, sử dụng câu lệnh git checkout -b <branch_name>
```
$ git checkout -b new_branch
Switched to a new branch 'new_branch'
```
Sử dụng git branch để kiểm tra các nhánh hiện có:
```
$ git branch
  master
* new_branch
```
Dấu * để chỉ rõ hiện tại mình đang ở nhánh nào.
<br>Ở đây, mặc định, branch đầu tiên của mọi git repo đều có tên là master (một số nhóm người có thể sử dụng tên thay thế như main, primary). Nhưng bất kể tên gì, bạn nên để nhánh master làm luồng chạy chính cho chương trình của mình, coi như phiên bản chính thức của project.
# 6. Tạo một kho chứa trên Github
Nếu bạn chỉ muốn theo dõi code của mình ở local, bạn không cần sử dụng GitHub. Nhưng nếu bạn muốn làm việc với một nhóm, bạn có thể sử dụng GitHub để phối hợp cùng mọi người.
<br>Để tạo một repo trên GitHub, đăng nhập tài khoản mà bạn đã tạo ở mục 1 và đi đến trang chủ. Bạn có thể tìm thấy lựa chọn "New repository"  khi click vào dấu "+" ở góc phải trên màn hình. Sau khi chọn, GitHub sẽ yêu cầu bạn nhập tên repo và mô tả (nếu muốn).
<br>Bạn nên tích vào **Add a README file** và **Add .gitignore** (nếu chọn mục này bạn sẽ cần chọn thêm ngôn ngữ mình sử dụng) để sử dụng cho project của mình.
Sau đó, **Create repository** để tạo thôi.
Vậy là ta đã có remote repository rồi.
Để kết nối local repo với remote repo ta sử dụng git remote add <link_git_clone>
```
$ git remote add origin https://github.com/thaidoandat/abcdef.git
$ git push origin master
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 217 bytes | 217.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'master' on GitHub by visiting:
remote:      https://github.com/thaidoandat/abcdef/pull/new/master
remote:
To https://github.com/thaidoandat/abcdef.git
 * [new branch]      master -> master
```
Link ở câu lệnh git remote add bạn có thể lấy bằng cách nhấn vào Code -> HTTPs -> copy link
# 7. Push branch lên GitHub
Bây giờ chúng ta sẽ đẩy commit trong branch của bạn vào repo GitHub. Điều này cho phép người khác xem những thay đổi bạn đã thực hiện. Nếu chúng được chủ sở hữu kho lưu trữ chấp thuận, các thay đổi sau đó có thể được hợp nhất vào nhánh chính.
Để đẩy các thay đổi lên một nhánh mới trên GitHub, bạn chạy git push origin branch_name. GitHub sẽ tự động tạo nhánh cho bạn trên remote repo:
```
$ git push origin new_branch
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'new_branch' on GitHub by visiting:
remote:      https://github.com/thaidoandat/abcdef/pull/new/new_branch
remote:
To https://github.com/thaidoandat/abcdef.git
 * [new branch]      new_branch -> new_branch
```
Nếu bạn refresh GitHub, bạn sẽ thấy dòng thông báo một branch với tên của bạn vừa push lên repo. Bạn có thể click vào "branches" để xem các branch của bạn. Còn bây giờ thì click vào **Compare & pull request** để tạo pull request thôi nào.
# 8. Tạo pull request (PR)
PR là một cách để báo với chủ sở hữu repo rằng bạn muốn thay đổi code của họ, dùng trong làm việc nhóm. Nó cho phép họ review code và chắc chắn rằng nó ổn trước khi nhập nó vào branch chính.
Sau khi tạo PR, bạn có thể thấy một button màu xanh lá cây "Merge pull request" ở dưới cùng. Click vào button nghĩa là bạn sẽ merge thay đổi của mình vào nhánh chính, bạn nên làm điều này sau khi được sự chấp thuận của mọi người trong team.
# 9. Lấy code từ repo remote về local remote với git pull
Khi code ở repo remote khác với code ở local của bạn (do teammate push lên), bạn muốn nhập những thay đổi kia vào repo ở local, câu lệnh **git pull** là dành cho bạn.
```
$ git pull origin master
```
Khi pull về thành công, nó sẽ hiển thị tất cả các files đã thay đổi và cách mà nó thay đổi.
<br><br>
# Kết luận
Vậy là chúng ta đã đi qua các bước cơ bản để làm quen với Git rồi. Ngoài ra, còn có rất nhiều điều hay ho ở Git chờ bạn khám phá. Cảm ơn bạn đã dành thời gian đọc bài viết, hẹn gặp lại ở các bài viết tiếp theo!