## Git là gì

Git là  một hệ thống quản lý phiên bản phân tán (Distributed Version Control System)  vốn được phát triển nhằm quản lý mã nguồn (source code) hữu hiệu. Git có thể  lưu trữ nhiều phiên bản khác nhau của một mã nguồn được nhân bản (clone) từ một kho chứa mã nguồn (repository), mỗi thay đổi vào mã nguồn trên máy tính sẽ có thể đưa lên kho chứa chính. Và một máy tính khác (nếu họ có quyền truy cập) cũng có thể clone lại mã nguồn từ kho chứa hoặc clone lại một tập hợp các thay đổi mới nhất trên máy tính kia.
### Repository là gì ? 

Repository  (kho chứa) là nơi sẽ ghi lại trạng thái thư mục và file của toàn bộ project. Trạng thái được lưu lại đang được chứa như là lịch sử thay đổi của nội dung. Bằng việc đặt thư mục muốn quản lý lịch sử thay đổi dưới sự quản lý của repository, có thể ghi chép lại lịch sử thay đổi của thư mục và file trong thư mục đó.
Dữ liệu của Repository được lưu trữ trong thư mục dưới dạng folder ẩn có tên là .git

### Repository của Git được chia thành 2 loại là remote repository và local repository.
- Remote repository: Là repository để chia sẻ giữa nhiều người và bố trí trên server chuyên dụng.
- Local repository: Là repository bố trí trên máy của bản thân mình, dành cho một người dùng sử dụng.

### Branch là gì ?
    
branch là những phân nhánh ghi lại luồng thay đổi của lịch sử, các hoạt động trên mỗi branch sẽ không ảnh hưởng lên các branch khác nên có thể tiến hành nhiều thay đổi đồng thời trên một repository, giúp giải quyết được nhiều nhiệm vụ cùng lúc.
     
###   Sử dụng branch khi nào ?

   Đối với những dự án làm việc theo nhóm thì mỗi thành viên sẽ nhận nhiều task,  vì vậy khi làm này các task này trên cùng một thời gian là rất khó vì dễ bị đụng code. Đây là lúc ta sử dung branch, với mỗi task ta sẽ làm trên một branch và việc làm nhiều task trong cùng một thời gian thì ta chỉ cần chuyển sang branch tương ứng để làm, các brach độc lập với nhau nên sẽ không ảnh hưởng đến nhau.
### Để tạo brach mới ta có thể dùng 2 lệnh sau
* `git branch <branchname>` . Lệnh này dùng để tạo branch mới từ branch đang đứng
* `git checkout -b <branchname>`  .Lệnh này dùng để tạo branch mới và chuyển vùng làm việc đến branch mới vừa tạo
###  Xóa branch locall và xóa branch remote
* Xoá một branch ở phía local: `git branch --delete <branch_name>` Hoặc `git branch --delete --force <branch_name>`
* Xoá một branch remote lưu ở local: `git branch --delete --remotes <remote_name>/<branch_name>` Hoặc `git branch -d -r <remote_name>/<branch_name>`
* Xoá một branch ở phía remote: `git push <remote_name> --delete <branch_name>`
  Chú ý:
  Phải checkout ra branch cùng tên với branch trên remote thì mới xóa được. Tức là khi ta đang ở branch develop thì ta không thể xóa branch master trên remote.
###  Push một branch ở local lên remote
* Push branch giữ nguyên tên branch: `git push <remote_name> <branch_name>`
* Push branch với một cái tên khác: `git push <remote_name> <task#1>:<task#2>`
## Thế nào là rebase? Phân biệt rebase với merge?
### Git rebase là gì ?
Git Rebase là một chức năng được dùng khi gắn nhánh đã hoàn thành công việc vào nhánh gốc . Về mặt nội dung thì là việc điều chỉnh nhánh công việc gắn vào với nhánh gốc nên các commit sẽ được đăng kí theo thứ tự gắn vào . Chính vì thế sẽ có đặc trưng là dễ nhìn hơn sau khi xác nhận commit .
### Khác biệt giữa rabase và merge là gì ?
   Điểm khác biết giữa rabase và merge chính là lịch sử commit của branch đó, với rebase thì các commit sẽ là  các commit mới nhất và lịch sử commit sẽ bị thay đổi, còn với merge thì lịch sử commit không bị thay đổi.
## Thế nào là git fetch ? Phân biệt fetch với pull?
### Git fetch là gì ?
Khi chạy câu lệnh git fetch $remote_origin, Git sẽ tải về dữ liệu của tất cả các branch của repository trên remote server nằm tại địa chỉ quy định bởi $remote_origin và cập nhật dữ liệu này với dữ liệu của cách branch phía dưới máy local.
Tuy nhiên git fetch không cập nhật dữ liệu của working copy. 
### Phân biệt fetch với pull
* Câu lệnh `git pull $remote_origin $branch_name` sẽ tải về (hay fetch) dữ liệu từ một branch duy nhất $branch_name từ remote server và sau đó merge các thay đổi từ remote này vào repository dưới local.

* Ngược lại `git fetch $remote_origin` sẽ tải về (fetch) dữ liệu của toàn bộ các branch trên URL quy định bởi $remote_origin nhưng không thực hiện việc merge các thay đổi này vào local.<br>
Như vậy  Git pull bằng với Git fetch cộng với Git meger.
## Thế nào là git stash

Git stash  là lệnh dùng để thiết lập trạng thái ban đầu cho tất cả các file nằm trong thư mục làm việc (working directory). Trạng thái ban đầu ở đây chính là nội dung dữ liệu ban đầu của file (so với commit cuối cùng hoặc pull từ remote repository). Các commit được lưu lại,  thường rất hữu dụng khi bạn muốn đổi sang 1 branch khác mà lại đang làm dở ở branch hiện tại.
* Dưới đây là một trong những tính năng về Git stash:
1. Xem danh sách stash: `git stash list`
2. Xem lại lịch sử thay đổi cùng nội dung của nó: `$ git stash list -p`
3. Xem nội dung stash: `git stash show stash@{<index>}`
4. Xóa toàn bộ: `$ git stash clear'
5. Apply stash: `$ git stash apply stash@{<index>}`
6. Apply stash gần nhất và xóa stash đó: `git stash pop`
7. Xóa stash: `git stash drop stash@{<index>}`
## Làm thế nào xóa bỏ trạng thái của một vài commit gần đây
* Cách 1: dùng git reset hard<br>
    `git reset --hard <commit_id>`<br>
    Lệnh này sẽ xóa bỏ toàn bộ các commit trước đó đưa branch về trạng thái của commit có Id được chỉ định.<br>
    `git reset --hard HEAD~<n>`<br>
    Lệnh này sẽ xóa n commit trước đó.<br>

* Cách 2: dùng git revert<br>
    `git revert <commit_id>`<br>
    hoặc<br>
    `git revert HEAD~<index>`<br>
## Gộp một vài commit thành một commit duy nhất.
* Để gộp một nhóm commit thành 1 commit duy nhất ta dùng lệnh<br>
`$ git rebase --interactive <id_commit_end>`<br>
hoặc <br>
`$ git reset <id_commit_end>`<br>
Trong đó <commit_end> là id của commit cuối cùng.<br>
## Phân biệt git reset, git reset --hard, git reset --soft
* git reset<br>
`git reset HEAD~<index>`<br>
Reset trạng thái file của commit, con trỏ về vị trí commmit reset, Loại bỏ các thay đổi khỏi stage.<br>
* git reset --hard<br>
`git reset --hard HEAD~<index>`<br>
Reset trạng thái file của commit, file thay đổi về thời thời điểm commit, di chuyển HEAD về vị trí commmit reset.<br>
* git reset --soft<br>
`git reset --soft HEAD~<index>`<br>
File không thay đổi, Di chuyển HEAD về vị trí commmit reset. Trạng thái của stage được giữ nguyên.<br>
## Thế nào là cherry-pick? Khi nào thì dùng cherry-pick?
Cherry-pick thực chất là một cách để checkout một commit tại branch nhất định về branch hiện tại, hiểu cách dân dã thì cherry-pick dùng để bưng các thay đổi trong một commit trên một nhánh nào đó áp dụng về nhánh hiện tại.<br>
Cú pháp:<br>
`$ git checkout $my_branch`<br>
`$ git cherry-pick $git_revision`<br>
## Git Flow là gì?<br>
* Git Flow được Vincent Driessen đưa ra nhằm cải thiện quá trình làm việc cùng Git. Thực chất, đấy là cách chia nhánh và merge nhánh vào khi hoàn thành một tập hợp tính năng hoặc fix.<br>

Git Flow làm việc dựa trên merge, chứ không phải thao tác cherry-pick thường thấy.<br>
* Khi làm việc nhóm, điều quan trọng là phải đồng nhất về quy trình làm việc. Git cho phép bạn thực hiện bằng nhiều con đường, nhiều cách khác nhau.Tuy nhiên, nếu bạn không đồng nhất quy trình làm việc chung trong nhóm của bạn, sự nhầm lẫn là không thể tránh khỏi.

## Kết luận
Trên đây là một số  vấn đề cơ bản khi làm việc với Git mình học được và cũng là một số chia sẻ của mình về Git. Xin cảm ơn!