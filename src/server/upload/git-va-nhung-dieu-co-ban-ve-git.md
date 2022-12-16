# Giới thiệu
Git là một công cụ không thể thiếu của developer. Các developer sử dụng git hàng ngày để quản lý code và làm việc nhóm trở nên thuận tiện hơn.
# Những khái niệm cơ bản cần biết
## 1. Git là gì?
Git là một hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS).
## 2. Repository là gì?
Repository là nơi lưu trữ trạng thái các thư mục và các file của project. Trạng thái lưu lại chứa các lịch sử thay đổi của từng file.

Repository được chia làm hai loại là remote repository và local repository:

* Remote repository là repository được lưu trữ trên một server chuyên dụng như là của github, gitlab, bitbucket thường được dùng để chia sẻ giữa nhiều người với nhau.
* Local repository là repository được lưu trữ trên máy của chính chúng ta và cho một cá nhân sử dụng. Để tạo một local repository thì chúng ta sử dụng lệnh` $ git init`
## 3. Commit là gì?
Commit là việc ghi lại sự thay đổi của các file hoặc các thư mục vào trong repository.

Khi chạy lệnh ` $ git commit ` thì repository sẽ tạo ra một commit để ghi lại sự khác biệt giữa lần commit trước và lần commit hiện tại.
## 4. Làm thế nào xoá bỏ trạng thái của một vài commit gần đây?

Để xóa bỏ trạng thái của một vài commit gần đây chúng ta có hai cách như sau 

Cách 1 : sử dụng revert 
```
$ git revert <commit-id>
```
Cách 2 : sử dụng reset --hard
```
$ git reset --hard <commit-id>
```
## 5. Gộp vài commit thành một commit duy nhất
Trong vài trường hợp chúng ta muốn gộp 2 hoặc nhiều commit vào một commit duy nhất thì chúng ta có cách sử lý sau đây.

Ví dụ chúng ta có 3 commit như dưới đây 
```
commit C
commit B
commit A
```

### Cách 1: Sử dụng git reset 

Để gộp 3 commit này thì chúng ta sẽ sử dụng 
```
$ git reset <commit-a-id>
```
Khi này thì HEAD sẽ được đưa về commit A và commit B, commit C sẽ bị loại bỏ. Code của hai commit trên sẽ được đưa về vùng working directory (giống như mới thêm code nhưng chưa chạy git add).
Để gộp commit thì ta chạy tiếp :
```
$ git add .
$ git commit --amend --no-edit
```
Ngoài ra chúng ta có thể dùng tham số `--soft` để thêm commit B và commit C vào vùng staging sau khi reset.
```
$ git reset --soft <commit-a-id>
```
Khi này thì commit B và commit C sẽ được đưa vào cùng staging(đã chạy git add)
> Ngoài ra thì git reset còn một tham số nữa là --hard. Khi chúng ta sử dụng --hard thì hai commit B và commit C sẽ bị xóa bỏ hoàn toàn kể cả code thay đổi của chúng.
### Cách 2: Sử dụng git rebase -i
```
$ git rebase -i <commit-a-id>
```
Khi chạy lệnh trên thì terminal sẽ hiển thị ra một màn hình editor có các lựa chọn pick|squash để gộp commit.

Ngoài ra chúng ta có thể sử dụng `HEAD~<index>` thay cho id của commit 
```
$ git rebase -i HEAD~<index>
```
Với index là số lượng commit muốn gộp (ví dụ 2, 3, 4, ..).
> git rebase -i HEAD~~ là gộp commit với index = 2
## 6. Branch là gì?
Trong quá trình làm việc nhóm thì mỗi thành viên đồng thời làm những việc khác nhau và chúng ta cần lưu trữ những thay đổi mà từng thành viên đó làm nên branch được sinh ra để hỗ trợ quản lý các phiên bản được tiến hành song song, và các branch thì độc lập với nhau.

Chúng ta chia branch làm hai loại là local branch và remote branch tương ứng với local repository và remote repository.

Để tạo một branch thì chúng ta sử dụng lệnh :
```
$ git branch <branch-name>
```
Hoặc dùng lệnh dưới đây để tạo branch và checkout sang branch đó:
```
$ git checkout -b <branch-name>
```
## 7. Xóa một branch ở cả local và remote.
### Xóa branch ở local
```
$ git branch -d <branch-name>
or 
$ git branch -D <branch-name>
```
Với tham số tùy chọn `-d` thì branch cần xóa phải thỏa mãn yêu cầu đã được merge với một branch khác, còn tùy chọn `-D` thì không cần thỏa mãn điều kiện trên.
### Xóa branch ở remote 
```
$ git push branch -d <remote-name> <branch-name>
```
## 8. Push một branch ở local lên remote với một cái tên khác.
Để push một branch ở local lên remote với một cái tên khác thì chúng ta sử dụng :
```
$ git push <remote-name> <branch-name>:<remote-branch-name>
```
## 9. Git rebase và git merge
Để gộp hai branch với nhau thì chúng ta có thể sử dụng `git rebase` hoặc `git merge`. Vậy `git rebase` và `git merge` được thực hiện như thế nào? Chúng ta hãy cùng tìm hiểu sau các phần dưới đây.
```
      C--D  task.1703
    /
A--B--E--F  develop
```
### Git rebase 
```
$ git checkout task.1703
$ git rebase develop
```
Ở câu lệnh trên thì chúng ta gộp hai branch task.1703 với develop. Khi thực hiện rebase thì các commit thay đổi ở branch develop sẽ được chuyển qua branch task.1703
```
         C'--D'  task.1703
        /
A-B-E-F  develop
```
### Git merge
```
$ git checkout develop
$ git merge task.1703
```
Git Merge sẽ lấy hai nhánh và tìm thấy một commit cơ sở chung giữa chúng. Khi Git tìm thấy một commit cơ sở chung, nó sẽ tạo một commit merge mới và hợp nhất các thay đổi theo trình tự của mỗi commit cần hợp nhất.
```
     C--D  task.1703
    /     \
A--B--E--F--G develop (G là commit merge)
```
## 10. Git stash là gì
Đôi khi chúng ta đang làm việc ở branch A nhưng chúng ta muốn chuyển qua branch B để sửa lỗi mà không muốn commit ngay ở branch A thì chúng ta dùng git stash để lưu lại những gì chúng ta đã làm và thực hiện checkout.
* `git stash save` để tạm thời lưu lại công việc hiện tại
* `git stash list` để hiển thị danh sách các công việc lưu tạm
* `git stash prop` để quay lại tiếp tục công việc lưu tạm
* `git stash drop` để xóa công việc lưu tạm
* `git stash clear` để xóa tất cả các công việc lưu tạm

## 11. Cherry-pick là gì?
Cherry-pick là việc di chuyển các thay đổi của một commit ở một branch khác tới branch hiện tại
```
$ git cherry-pick <commit-id>
```
## 12. Git flow là gì?
Git flow là một tool hỗ trợ branch model do Vincent Driessen đề xuất ra. Git flow đưa ra các quy ước để triển khai công việc, giúp các nhóm công việc triển khai song song nhưng không ảnh hưởng tới nhau. Các môi trường deplopment, staging, production tách biệt giúp quá trình kiểm thử, feedback, xử lý các issue được dễ dàng hơn.
### Các branch trong git flow 
* **Master Branch:** là branch dùng để sử dụng cho production, chứa lịch sử các lần release của dự án. Branch này chỉ dùng để merge các commit từ các branch khác.
*  **Develop Branch:** là branch trung tâm cho việc phát triển sản phẩm.
*  **Feature Branch:** là branch dùng để phát triển các tính năng riêng biệt. Feature branch sẽ được checkout từ develop và sau đó lại được merge về develop 
*   **Hotfix Branch :** là branch dùng để sửa những lỗi nghiêm trọng trên master. Branch này được checkout từ master và sau đó khi sửa xong thì lại được merge về master.
*   **Release Branch:** là branch dùng để release sản phẩm khi develop có đủ những tính năng cần thiết để release. Branch này được checkout từ develop và sau đó được merge vào develop và master
# Kết luận
Cảm ơn các bạn đã theo dõi bài viết. Mong bài viết đem lại những kiến thức hữu ích cho các bạn.