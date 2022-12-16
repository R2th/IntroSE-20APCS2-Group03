Đầu tiên muốn sửa được lỗi trong git ta phải thực hiện tạo ra nó trước đã. Vậy phần 1 mình sẽ nói 1 số lệnh cơ bản trong git theo follow tạo và sử dụng 1 project.

## Các lệnh cơ bản
**1. Khởi tạo git**
- Chắc ai cũng biết rồi muốn khởi tạo 1 repo ta dùng lệnh
``` shell
git init
```

**2. Thêm mới remote vào project**
``` shell
# hiển thị danh sách remote trong git của project
git remote -v

# Thêm mới một remote vào git
git remote add origin <url>
```
**3. Clone project**
- Bạn phát hiện ra là bạn đã có url của project sẵn rồi thì tội gì phải khởi tạo git mới nữa. Thay vào đó hãy dùng clone
``` shell
git clone
```
**4. Làm việc cùng branch**
- Git là một hệ thống quản lý phiên bản phân tán, vì thế mô hình của nó giống như một cái cây. Vậy bạn có thể nhận ra luôn là mỗi cái cây luôn có một thân cây chính, và các cành, nhánh nhỏ. Tương tự trong git ta có `branch` thể hiện mỗi nhánh nhỏ của một cái cây và nhánh chính tương đương với thân cây thường được gọi là master. Nếu từng làm việc thực tế trong các dự án bạn thường thấy nhánh master sẽ là nhánh rỗng, thay vào đó những developer sử dụng các nhánh có tên như development, product, test,.... Điều này giúp cho các lập trình viên phân biện và thao tác trên những môi trường tương ứng quan quá trình phát triển phần mềm một cách dễ dàng và minh bạch hơn.

![](https://images.viblo.asia/3b171116-23fb-4bd2-a8ac-65b63fe65372.png)

- Một số lệnh cơ bản
``` shell
# Danh sách branch
git branch

# tạo mới branch
git branch (<name>)

# Di chuyển từ branch hiện tại đến một branch khác bằng tên branch đó
git checkout <name>

# Tạo và di chuyển từ branch hiện tại đến một branch mới
git checkout -b <name>
```markdown

**5. Hợp nhất branch**
- Đây là một trong những câu lệnh cơ bản thường dùng của quy trình. Nhưng với việc các tool hỗ trợ như github, gitlab,... thì việc sử dụng câu lệnh này chỉ còn nằm ở dưới local mà thôi.

``` shell
# để hợp nhất nhánh branch-name vào nhánh master
git merge <branch-name>
```

**6. Cập nhật code mới nhất về**

Khi làm việc một mình thực tế bạn sẽ không cần đến git nhưng khi làm việc nhóm và muốn lấy code mới nhất từ một nhánh nào đó trên repo online về thì bạn sẽ dùng lệnh sau:

``` shell
git pull origin <branch>
```

**7. xem status và một vài thứ nữa**

``` shell
git status

git diff –-stat
```

## Những sự cố thường gặp trong Git

### 1. Viết sai  message commit
- Để thay đổi nộ dung commit, thêm, sửa file vào commit rất đơn giản bạn chỉ cần sử dụng

``` shell
git commit --amend
```

### 2. Đặt sai tên branch
- Việc gõ nhầm hay thiết thành phần theo convention khi đặt tên branch là không hiếm. Lúc mới tiếp cận bạn thường lựa chọn giải pháp là tạo một branch mới. Có một cách nhanh hơn rất nhiều giống như rename trong các phần làm việc với file đó là dùng câu lệnh:

``` shell
git branch -m <tên branch sau khi đổi>
```

### 3. Commit chơi chơi và giờ muốn nó bay màu
- Việc làm ngốc ngếch này diễn ra thường xuyên trong quá trình làm việc, vậy làm thế nào để code dữ nguyên và xóa commit đó đi, đầu tiên bạn phải tìm hiểu một số lý thuyết sau:

**Note: HEAD, Working tree, Index trong git là gì?**

- Git giữ một con trỏ đặc biệt có tên HEAD. Trong Git, đây là một con trỏ tới nhánh nội bộ mà bạn đang làm việc
- Trên Git, những thư mục được đặt trong sự quản lý của Git mà mọi người đang thực hiện công việc trong thực tế được gọi là working tree.
- Giữa repository và working tree tồn tại một nơi gọi là index. Index là nơi để chuẩn bị cho việc commit lên repository

#### Cách 1: Sử dụng reset (khi chưa có ai pull về)
- `git reset HEAD~`

    Di chuyển HEAD về vị trí commit reset và vẫn giữ nguyên tất cả các thay đổi của file, nhưng loại bỏ các thay đổi khỏi stage (Đưa HEAD và index về như cũ)
``` shell
git reset {commit_id}
```

- `git reset --hard HEAD~`

    - Di chuyển con trỏ HEAD về vị trí commit reset và loại bỏ tất cả sự thay đổi của file sau thời điểm commit reset
    - HEAD~ có ý nghĩa giống với HEAD^ hay @^, nghĩa là quay về trước 1 commit
    - Muốn quay về trước n commit, VD 5 commit thì có thể thay bằng HEAD~5.
    - `--hard` có nghĩa là bỏ commit đi và bỏ cả những thay đổi chưa được commit trong working space. Khi này môi trường sẽ hoàn toàn "sạch sẽ" như thời điểm trước khi commit

- `git reset --soft HEAD~`
    - Lệnh này chỉ di chuyển HEAD về vị trí commit reset. Trạng thái của stage và tất cả sự thay đổi của file sẽ được giữ nguyên
    - `--soft` có nghĩa là bỏ commit đi nhưng giữ nguyên những thay đổi chưa được commit trong working space.
    - `--soft` hữu dụng khi bạn muốn giữ lại những thay đổi chưa commit cho lần commit tiếp theo

#### Cách 2: Sử dụng revert (người khác đã pull về)
``` shell
# commit_hash là mã commit
git revert <commit_hash>
```

#### Cách 3: Sử dụng --amend
``` shell
git commit --amend
# Bạn có thể sử dụng lệnh này để viết lại commit message
# Option --no-edit sử dụng khi bạn chỉ muốn thêm file mà không muốn sửa commit message
git commit --amend --no-edit
```

### 4. Khi lỡ tay commit nhầm sang một branch khác
- Có những lúc ta sơ suất lỡ tay commit thẳng vào master trong khi thực ra là muốn commit vào một branch khác

``` shell
#Đầu tiên là tạo một branch khác chứa trạng thái mà ta đã commit
$ git branch other-branch
#Đưa HEAD, index của master về 1 commit trước đó
$ git reset --hard HEAD~
#Check out sang branch có commit trước đó
$ git checkout other-branch
```

### 5. Gộp nhiều commit thành một commit

Sử dụng rebase + squash (or fixup) để tổng hợp lại các commit cũ
- Squash: giữa nguyên commit message của những commit trước
- Fixup: xoá commit message của những commit trước

``` shell
Rebase về n commit trước (có bao gồm cả HEAD)
# Ví dụ) git rebase -i HEAD~3
$ git rebase -i HEAD~<số lượng commit>
# Sau lệnh này sẽ mở ra editor nên hãy sửa lại như sau rồi lưu lại
# Note: Với vim bấm “a” để bắt đầu edit → Bấm ECS để dừng thao tác edit → Bấm “shift + z + z” để save
# (trước khi sửa) các commit cũ từ trên xuống dưới
pick aa11bbc commit message 1
pick b2c3c4d commit message 2
pick 4e56fgh commit message 3
・・・
# (sau khi sửa) các commit trước là squash sẽ được tổng hợp vào 1 commit ở đằng trước
pick aa11bbc commit message 1
squash b2c3c4d commit message 2
squash 4e56fgh commit message 3
```

### 6. Chia commit to thành nhiều commit nhỏ
``` shell
# Đầu tiên là đưa HEAD và index về 1 commit trước đó.
# Nói cách khác là ta coi như là chưa từng có commit to đùng kia và chỉ giữ lại trạng thái của working tree
$ git reset HEAD~
# Dùng lệnh sau đây để thêm các phần nhỏ vào index
$ git add -p
# Khi các phần cần thay đổi đã có thì ta commit
$ git commit -m "commit message"
# Sau đó ta lặp đi lặp lại các bước như trên cho phần còn lại
```

### 7. Chuyển xang nhánh khác khi đang làm việc giở
``` shell
# Tạm thời lưu lại các phần công việc còn đang làm dở
$ git stash -u
# Chuyển sang một branch khác và làm việc
$ git checkout -b other-branch
$ git add <các file cần thiết>
$ git commit -m "commit message"
# Trở về branch cũ
$ git checkout origin-branch
# Lấy lại các nội dung công việc đang làm dở trước đó
$ git stash pop
```

### 8. Hồi phục commit quan trọng khi lỡ tay xóa nó đi

- Đây hẳn là sự cố khủng khiếp nhất. Có thể xảy ra khi lỡ tay git reset --hard .Tuy nhiên, commit nào cũng có thể hồi phục được

``` shell
# Đầu tiên là xem lại toàn bộ lịch sử commit
$ git reflog
# Từ đó chọn commit muốn phục hồi và khôi phục lại
# ví dụ: git reset --hard HEAD@{2}
$ git reset --hard <commit>
```

### 9. Khôi phục branch đã xóa
``` shell
# Đầu tiên là xem lại toàn bộ lịch sử commit
$ git reflog
# Từ các commit này, chọn rồi tạo branch mới
# ví dụ: git branch new-branch HEAD@{2}
$ git branch <tên branch> <commit_id>
```

### 10. Khôi phục về trạng thái trước khi merge
- Note: Chỉ cho trường hợp mà người khác vẫn chưa pull code về

``` shell
git reset --hard ORIG_HEAD
# Commit trước khi reset được tham chiếu bằng ORIG_HEAD
```

### 11. Khôi phục về trạng thái trước khi pull từ remote
- Sau khi pull code về cập nhật nhưng thấy conflict nhiều như núi thì quả là muốn trở lại như cũ

``` shell
# Lấy từ code mới remote
$ git pull origin master
# Phát sinh conflict
# Suy nghĩ lại thì trong pull(fetch + merge) muốn bỏ phần merge đi: 
$ git reset --hard ORIG_HEAD
```

### 12. Khi bạn muốn rename 1 nhánh cả ở local và trên remote (github)

``` shell
git branch -m new-name
git push remote-name :old-name new-name
```

### 13. Khi bạn muốn xoá 1 branch trên remote từ xa

``` shell
git push origin --delete remote-branch-name
```

Đó là các thao tác cơ bản và cách sửa một số lỗi thường gặp khi làm việc với git của mình. Rất mong các bạn góp ý để mình cải thiện bài viết này và các bài sau hơn nữa. :)