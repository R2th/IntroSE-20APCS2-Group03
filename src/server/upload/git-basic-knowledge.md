Note of Git basic knowledge
### 1. Thế nào là repository, branch.
- Repository: chứa file, history, các branch
- Branch: Nhánh của repository, để phát triển mà không ảnh hưởng đến các nhánh khác, branch chính là master, được tạo khi repository mới được khởi tạo
### 2. Làm thế nào để xoá một branch ở phía local, làm thế nào để xoá một branch remote
- Xóa branch ở local: git branch -d <branchname>
- Xóa branch ở remote: git push origin --delete <branchname>
### 3. Làm thế nào để push một branch ở local lên remote dưới một cái tên khác (Ví dụ như ở local tên branch là task-1, và muốn push lên branch task-2 ở remote)
- git push origin <localbranch>:<remotebranch>
### 4. Thế nào là git rebase. Phân biệt rebase với merge 
- rebase là gì: là sử dụng tất cả các thay đổi được commit ở 1 nhánh và chạy lại chúng trên một nhánh khác.
- So sánh rebase và merge:
+ Rebase: - Ví dụ: git checkout rebase-branch
                    git rebase master
        - Nguyên lý: Lấy code từ master, sau đó áp từng commit từ rebase-branch lên bộ code mới đó và tạo commit cùng tên rebase-branch. Thực hiện rebase thì các commit đã tồn tại bị bỏ đi và tái tạo lại các commit tương tự nhưng thực ra là khác biệt. Điều này làm lịch sử commit ở local và remote khác nhau.
        - Đặc điểm: các commit của nhánh được tạo mới sẽ nằm liền mạch, và các commit của rebase-branch sẽ là các commit mới nhất.
+ Merge:- Ví dụ: git checkout merge-branch
                    git merge master
        - Nguyên lý: git dùng 2 bản commit cuối cùng của từng nhánh rồi tích hợp lại với nhau tạo thành 1 commit mới. Thực hiện merge thì các commit đã tồn tại không bị thay đổi, chỉ tạo ra 1 commit mới tích hợp của 2 commit mới nhất.
        - Đặc điểm: các commit của 2 nhánh được sắp xếp theo thời gian tạo commit.
### 5. Thế nào là git stash 
- git stash là gì: được sử dụng khi muốn lưu lại các thay đổi chưa commit. Hữu dụng trong trường hợp muốn đổi sang 1 branch khác mà đang làm dở branche hiện tại.
- Cú pháp git stash save
### 6. Làm thế nào xoá bỏ trạng thái của một vài commit gần đây
- Hủy bỏ trạng thái của 1 commit: git revert <commit>
### 7. Làm thế nào để gộp một vài commit thành 1 commit duy nhất 
- Gộp commit dùng : git rebase --i <commit_name_before_start> hoặc git rebase --i HEAD~<commit_number>
### 8. Phân biệt git reset, git reset --hard, git reset --soft
Phân biệt git reset, git reset --hard, git reset --soft:
- git reset <commit>: reset trạng thái file của commit, file không thay đổi, con trỏ về vị trí commit
- git reset --hard <commit>: reset trạng thái file của commit, file thay đổi về thời thời điểm commit, con trỏ về vị trí commit
- git reset --soft <commit>: không reset trạng thái file của commit, file không thay đổi, con trỏ về vị trí commit