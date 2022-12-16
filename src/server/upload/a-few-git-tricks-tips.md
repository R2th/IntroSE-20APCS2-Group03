Đối với developer chắc hẳn chúng ta cũng đã từng nghe đến hay làm việc với `git` để quản lý và chia sẻ mã nguồn đến cộng đồng hay các thành viên khác trong team. Bài viết dưới đây mình sẽ chia sẻ cho các bạn một số tips khi làm việc với git. 
# I. Init
Chúng ta sử dụng lệnh `git init` để khởi tạo một git repository theo đường dẫn hiện tại của bạn. Chúng ta cũng có thể initialized theo specify path mà mình mong muốn, ví dụ init git cho thư mục `Test` ở màn hình `Desktop` như sau: 
```
git init ~/Desktop/Test
```
# II. Clone
Để clone source code từ server về local ta sử dụng lệnh: 

`git clone <url_of_the_repo>`

Chúng ta cũng có thể chỉ định đường dẫn cụ thể để lưu vào máy local: 

`git clone <url_of_the_repo> <path_of_the_empty_directory>`
### Cloning a specific branch only
Nếu chỉ muốn clone từ một banch cụ thể nào đó ta sử dụng lệnh sau: 

`git clone -b <name_of_the_branch> --single-branch <url_of_the_git_repo>`
# Diff
Để kiểm tra sự khác biệt trước khi staging ta sử dụng keyword diff 
```
// Shows changes made to all files in current working tree
git diff
// Shows changes made so far on a specific file only
git diff <path_to_file>
// Shows differences made on files even when they are staged
git diff --staged
```
# Config
Trong thực tế đôi lúc chúng ta phải làm việc trên máy tính của người khác, khi đó chúng ta cần config thông tin user trước khi commit để tránh gây nhầm lẫn. 
```
git config --local user.name 'your_user_name'
git config --local user.email 'your_user_email_id'
// You also need to disable current credential helper 
git config credential.helper ''
```
Sau khi config như trên `git` sẽ yêu cầu username và password trước khi ta thực hiện push code. 

#  Add & commit in a single command
Thông thường ta sử dụng lệnh `git add` để thêm file mới hay thay có sự thay đổi rồi sau đó thực hiện `commit` chúng. Tuy nhiên nếu không có bất kỳ file mới được thêm vào ta có thể gộp 2 lệnh trên bằng cách sau: 
```
git commit -a -m 'your commit message'
```
# Discarding changes made on a file
Sử dụng `git checkout` để hủy bỏ thay đổi trên file: 
```
git checkout -- <path_to_file>
```
# Unstaging a file
```
git reset HEAD <path to file>
```
# Editing last commit message
Sửa commit message ta sử dụng keyword `amend`:
```
git commit --amend
```
# Discarding commits
Khi muốn hủy bỏ commit nhưng vẫn muốn giữ lại thay đổi ta dùng option `--soft`:
```
// Moves the added files in last commit back to staged area
git reset --soft HEAD^
// Discards last two commits and HEAD points two commits back
git reset --soft HEAD^^
// Discards last n commits and HEAD points n commits back
git reset --soft HEAD~n
```
Nếu không muốn dữ lại thay đổi 
```
git reset --hard
```

# Discarding your last push ( Emergency only🚨 )
```
// Move back to one commit earlier
git reset --hard HEAD^ 
// Push the commit forcefully to remote
git push -f
```
# Pull 
### Pull down a single branch only
```
// Basic Syntax
git pull <remote> <remote-branch-name>
// Example
git pull origin feat/ios/address_management
```
### git pull: Behind the Hood
1. `git fetch` kéo các branches từ server 
2. `git merge FETCH-HEAD` merge local với latest HEAD cho mỗi branch 

# Branch
### List down all branches
```
git branch -a // Shows remote and local branches
git branch    // Shows only local branches
```
### Creating and checkout into a branch
```
// Syntax
git branch <branch_name>
// Creating a feature branch for address management
git branch feat/ios/address_management
// Checking into that
git checkout feat/ios/address_management
// Creating and checking in with a single line
git checkout -b feat/ios/address_management
```
### Deleting local branch
Chúng ta thường tạo branch cho mỗi feature và sau khi nó đã hoàn thành (được merge), ta có thể xóa nó vì không cần thiết nữa. 
```
// Syntax
git branch -d <branch>
// Deleting a local feature branch
git branch -d feat/ios/address_management
```
### Deleting branch from remote
Ta có thể delete branch để làm gọn gàng trên remote server bằng cách sau: 
```
// The basic syntax to delete a remote branch
git push <remote> :<branch_name>
// Deleting feat/ios/address_management from remote origin
git push origin :feat/ios/address_management
// Deleting multiple remote branches at once
git push origin :feat/ios/address_management :feat/deal_management
```
### Set upstream for a local branch
Giả sử ta đã có một local branch và muốn tracked nó với một remote branch nào đấy, ta thực hiện dòng lệnh sau:
```
git branch --set-upstream-to=origin/<branch> develop/functionality-new
```


-----

Trên đây mình đã chia sẻ một số kiến thức khi sử dụng git hi vọng sẽ giúp ích cho các bạn. Chúc các bạn một ngày làm việc vui vẻ.

Bài viết được tham khảo từ nguồn: 
[A few git tricks & tips
](https://medium.com/@sauvik_dolui/a-few-git-tricks-tips-b680c3968a9b)