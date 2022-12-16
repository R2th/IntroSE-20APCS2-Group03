# Những điều cơ bản về Git.
* Thế nào là repository, branch.
* Làm thế nào để xoá một branch ở phía local, làm thế nào để xoá một branch remote.
* Làm thế nào để push một branch ở local lên remote dưới một cái tên khác (Ví dụ như ở local tên branch là task#1, và muốn push lên branch task#2 ở remote).
* Thế nào là git rebase. Phân biệt rebase với merge.
* Thế nào là git stash.
* Làm thế nào xoá bỏ trạng thái của một vài commit gần đây.
* Làm thế nào để gộp một vài commit thành 1 commit duy nhất.
* Phân biệt git reset, git reset --hard, git reset --soft.
# Bắt đầu
# 1. Thế nào là repository, branch
##     Thế nào là repository?
Git là một công cụ quản lý mã nguồn, toàn bộ mã nguồn sẽ được lưu trữ trên một kho lưu trữ là Repository.
   * Repository là một kho chứa tất cả những thông tin cần quản lý, duy trì, phát triển cùng với lịch sử thay đổi của toàn bộ project.
 * Repository có 2 loại local repository và remote repository.
## Branch là gì?
   *    Branch là nhánh của repository và các branch hoạt động riêng biệt với nhau.
   *    Các branch cũng có thể được hợp nhất lại với nhau thông qua thao tác `merge`.
    
##  2. Vậy làm thế nào để xoá một branch ở local hay remote?
###     Xóa một branch ở local:
> $ git branch -d <ten_branch>
*  Đây là cách xóa an toàn  nếu branch cần xóa đã được merge vào một branch khác hay đã được tạo pull request và được merge thì bạn có thể xóa branch bằng cách này.
> $ git branch -D <ten_branch>
*  Cách này sẽ xóa nhánh cho dù nhánh chưa được merge hay chưa.
> Note: bạn có thể xóa nhiều branch bằng cách thêm nhiều tên branch. VD: git branch -d <ten_branch1> <ten_branch2>....
### Xóa một branch ở remote:
> $ git push --delete <ten_remote> <ten_branch>
hoặc
> $ git push <ten_remote> --delete <ten_branch>

>Tương tự như ở local, ta cũng có thể xóa một lúc nhiều branch.

## 3. Push branch với tên khác
Bình thường, chúng ta thường push lên branch giống với tên branch ở local. Tuy nhiên, vì lý do gì đó mà muốn push branch với một tên khác, ta có thể làm như sau:
> $ git push origin <local_branch>:<remote_branch>

## 4.Thế nào là git rebase, merge.
### Git rebase là gì?
Git rebase là tích hợp các thay đổi từ nhánh này vào nhánh khác. Trong git có 2 cách để thực hiện công việc này, đó là `git rebase` và `git merge`.

#### 1. Git rebase.

Đầu tiên bạn cần checkout sang nhanh bạn đang làm việc.
> $ git checkout <branch_name>

Thực hiện rebase `<rebase_branch>` vào branch đang làm:
> $ git rebase <rebase_branch>

*  Nó sẽ lấy code từ `<branch_reabse>` sau đó từ những commit tại `<branch_rebase>` sẽ tạo ra những commit tương tự tại `<branch_name>`. Khi thực hiện `rebase` commit cũ tại `<branch_name>` sẽ được tái tạo nó dẫn đếm commit ở local và remote sẽ khác nhau.
*  Đặc điểm:
 
    *    Các commit của `<branch_name>` sẽ là commit mới nhất.
    *    Lịch sử commit sẽ bị thay đổi.

#### 2.Git merge.
> $ git checkout <branch_name>
> 
> $ git merge <merge_branch>

* git dùng 2 bản commit cuối cùng của từng nhánh rồi tích hợp lại với nhau tạo thành 1 commit mới theo kiểu hình thoi. Thực hiện `merge` thì các commit đã tồn tại không bị thay đổi, chỉ tạo ra 1 commit mới tích hợp của 2 commit mới nhất.

* Đặc điểm: Lịch sử commit không bị thay đổi.



## 5. Thế nào là git stash
### thế nào là stash?
Cho phép bạn chuyển nhánh khách khi đang làm việc mà không cần tạo commit để lưu lại sự thay đổi.

Để lưu lại những thay đổi đang làm dở, ta sử dụng lệnh:
> $ git stash save

hay
> $ git stash

Một số lệnh với stash:

* Xem danh sách stash: `git stash list`.
* Apply stash gần nhất và xóa stash đó: `git stash pop`.
* Apply stash: `git stash apply stash@{<index>}`.
* Xem nội dung stash: `git stash show stash@{<index>}`.
* Xóa stash: `git stash drop stash@{<index>}`.
* Xóa toàn bộ stash: `git stash clear`.

### Xoá bỏ trạng thái của một vài commit.
#### Cách 1: dùng git reset hard

> git reset --hard <commit_id>

Hoặc

> git reset --hard HEAD~<index>

VD:

`git reset --hard HEAD~2`

`git reset --hard 2e07fbe`

Lệnh này sẽ xóa bỏ toàn bộ các commit trước đó đưa branch về trạng thái của commit có Id được chỉ định.

#### Cách 2: dùng git revert

> git revert <commit_id>

hoặc

> git revert HEAD~<index>

VD:

`git revert HEAD~1`

`git revert 2e07fbe`

Lệnh này sẽ tạo 1 commit mới với nội dung đảo ngược lại một commit cũ.

Kết quả sau khi commit mới được tạo thì branch sẽ loại bỏ thay đổi của commit cũ.

Hiểu đơn giản là xóa bỏ những commit được chỉ định.
#### Gộp một vài commit thành 1 commit duy nhất
Để gộp một nhóm commit thành 1 commit duy nhất ta dùng lệnh:
> git rebase --interactive <commit_end>
    
hoặc 
 > git rebase -i <commit_end>

 > Note: <commit_end> là id của commit cuối trong nhóm cần gộp.
    
## 6. Phân biệt git reset, git reset --hard, git reset --soft.
### 1. git reset.
Câu lệnh:

> git reset HEAD~<index>

hoặc

> git reset <commit_id>

Chức năng:

Di chuyển HEAD về vị trí commmit reset.

Giữ nguyên tất cả các thay đổi của file đến vị trí hiện tại.

Loại bỏ các thay đổi khỏi stage.
    
### 2. git reset --hard.

Câu lệnh:

> git reset --hard HEAD~<index>

hoặc

> git reset --hard <commit_id>

Chức năng:

Di chuyển HEAD về vị trí commmit reset.
Loại bỏ tất cả sự thay đổi của file sau thời điểm commit reset.
### 3. git reset --soft
Câu lệnh:

> git reset --soft HEAD~<index>

hoặc

> git reset --soft <commit_id>

Chức năng:

Di chuyển HEAD về vị trí commmit reset.
    
Giữ nguyên tất cả các thay đổi của file đến vị trí hiện tại.
Giữ nguyên các thay đổi ở stage.
    
Lệnh này chỉ di chuyển HEAD về vị trí commit. Trạng thái của stage và tất cả sự thay đổi của file sẽ được giữ nguyên.
## Kết luận.
Trên đây là những gì cơ bản về Git cần ghi nhớ. Hi vọng nó sẽ giúp ích cho mọi người.