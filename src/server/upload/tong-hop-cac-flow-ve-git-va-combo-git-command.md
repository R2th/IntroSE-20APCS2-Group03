# Các trang web thường dùng để tham khảo về Git
Trong quá trình thao tác với Git, khó tránh khỏi việc mình quên một số khái niệm, một số câu lệnh của Git. Và dưới đây là 2 trang web chính thống thường dùng để training và tham khảo về Git.

* [Git-book](https://git-scm.com/book/en/v2):Trang chính thức, trang chính thức nên các định nghĩa sẽ rất chính xác.
* [Nhập môn Git](https://backlog.com/git-tutorial/vn/): Trang web dạy nhập môn Git cực kì dễ hiểu

# Các flow liên quan đến Git
Nếu trong một dự án, mọi người sử dụng Git một cách tùy ý, bừa bãi thì sẽ dẫn đến nhiều hệ quả như: người khác không hiểu được tên nhánh đặt ra có nghĩa gì, sai thao tác khiến mất code, không deploy được,... Yêu cầu đặt ra cần có những quy trình cụ thể để mọi người cùng thống nhất thực hiện theo, vì vậy, Git-flow, GitHub-flow và Gitlad-flow đã xuất hiện.
Tuy nhiên, trong giới hạn bài viết này, mình xin phép không đề cập đến Gitlab-flow vì chưa thực sự hiểu rõ về nó.

### Git-flow
Git-flow là tên gọi của 1 tool/plugin hỗ trợ branch model gọi là A successful Git branching model do Vincent Driessen đề xuất ra. Ngoài ra, việc sử dụng pluging này để thực hiện mô hình branch của Git (giống như trình tự sử dụng) thì cũng được gọi chung là git-flow.

Chi tiết: [git-flow cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/index.vi_VN.html)

Ngoài ra có thể tham khảo thêm bài viết [này.](https://kipalog.com/posts/Ban-da-hieu-ro-ve-git-flow-chua)
![](https://images.viblo.asia/b1a8c312-957b-4e38-80b0-b911a19aa4e9.png)

### GitHub-flow
Github Flow là một quy trình đơn giản dựa trên các branch với mục đích hỗ trợ team và các project được deploy một cách thường xuyên.
Việc thao tác, vận dụng với Git-flow khá lằng nhằng, nên GitHub-flow đã đơn giản nó đi rất nhiều.
* GitHub-flow bao gồm nhánh master và nhánh feature.
* Từ nhánh master dùng cho Product, tạo 1 nhánh có tên phù hợp với mục đích. (ở đây gọi là feature, gần giống với feature/hotfix ở git-flow)
* Làm việc trên nhánh feater đã tạo, sau khi hoàn thành công việc thì push lên nhánh remote.
* Sử dụng chức năng tạo Pull Request của GitHub, sau khi review thì merge vào nhánh master.
* Sau khi merge vào nhánh master thì lập tức được deploy lên Product.
![](https://images.viblo.asia/8559f139-7ad2-4a78-bdc1-9323bb39d944.png)

Tham khảo thêm về Github-flow [tại đây](https://blog.haposoft.com/githubflow/)

# Tổng hợp các combo Git command
Khi đã áp dụng quen các process về Git, chúng ta ít khi sử dụng riêng lẻ từng command, mà nó sẽ đi theo bộ combo. Dưới đây là những bộ combo Git command thường dùng mà mình tổng hợp lại, nếu thiếu sót thì mong các bạn bổ sung nhé.

## Những thao tác chung
### Tạo branch mới
```
# Tạo repository local
git init

# Copy remote repo tới local
git clone REPOSITORY_PATH

# Tạo branch mới
git checkout -b BRANCH_NAME
```

### Thêm tập tin vào vùng index

```
# Thêm những tập tin bị thay đổi (thêm mới, sửa, xóa) vào vùng index
git add --A

# Vừa thêm tập tin vào vùng index, vừa phải xác nhận, kiểm tra lại phần sai khác

# Kiểm tra lại trạng thái
git status
```

### Commit và push lên Remote repository

```
# Gắn message vào commit
git commit -m 'MESSAGE'

# Push từ branch đã chỉ định lên Remote repository
git push origin BRANCH_NAME

# Push từ branch hiện tại lên Remote repository (cùng tên branch)
git push origin HEAD

# --force-with-lease : push ghi đè lên branch trên Remote repository
```
Tham khảo thêm về Git-push [tại đây.](https://git-scm.com/docs/git-push)
 
###  Xóa branch

```
# Xóa branch đã tồn tại
git branch -d BRANCH_NAME

# Xóa branch có commit nhưng chưa được merge
git branch -D BRANCH_NAME
```

## Thao tác thêm những thay đổi vào nhánh master mới nhất

### Dùng merge

```
# Chuyển sang nhánh master
git checkout master

# Lấy code mới nhất về nhánh master trên local
git pull origin master

# Quay lại nhánh bạn muốn thêm phần thay đổi vào master mới nhất
git checkout BRANCH_NAME

# Merge nhánh hiện taị vào nhánh master
git merge master
```

### Dùng rebase

```
# Chuyển sang nhánh master
git checkout master

# Lấy code mới nhất về nhánh master trên local
git pull origin master

# Quay lại nhánh bạn muốn thêm phần thay đổi vào master mới nhất
git checkout BRANCH_NAME

# Rebase nhánh hiện tại với nhánh master
git rebase master
```

Về cơ bản thì 2 combo trên đều giải quyết việc tích hợp code của nhánh hiện tại vào master, tuy nhiên về sự khác nhau của Merge và Rebase bạn có thể đọc thêm ở đây:
[Git Merging vs. Rebasing](https://viblo.asia/p/git-merging-vs-rebasing-3P0lPvoGKox)

### Nếu bị conflict khi rebase

```
# Kiểm tra các file bị conflict
git status

# Sửa các file bị conflict (sửa bằng tay)

# Sau khi sửa conflict, dùng lệnh add để phản ảnh sự điều chinhr
git add FILE_PATH

# Sau khi sửa conflict, tiếp tục lại lệnh rebase
git rebase --continue

# Hủy rebase
git rebase --abort
```

## Những command thường dùng khi thao tác nhầm

### Sửa commit message

```
# Xem lại lịch sử commit
git log --oneline

# Sửa lại commit message ngay trước đó
git commit --amend

# Xác nhận lại commit message đã sửa
git log --oneline
```

### Sửa lại tên branch

```
$ git branch -m <tên branch sau khi đổi>
```

### Muốn xóa một commit khi lỡ commit nhầm

```
# Tuỳ vào từng trường hợp mà ta có 3 cách sau để đưa lịch sử commit về như cũ
 
# 1. Chỉ đưa HEAD về như cũ
$ git reset --soft HEAD~
 
# 2. Đưa HEAD và index về như cũ
$ git reset HEAD~
 
# 3. Đưa cả index, working tree về 1 commit trước đó
$ git reset --hard HEAD~
```

### Khi lỡ tay xóa mất commit

```
# Xem lại toàn bộ lịch sử commit
$ git reflog 
 
# Chọn commit muốn phục hồi và khôi phục lại
# ví dụ）git reset --hard HEAD@{2}
$ git reset --hard <commit>
```

### Khi lỡ tay xóa mất branch

```
# Xem lại toàn bộ lịch sử commit
$ git reflog
 
# Từ các commit này, chọn rồi tạo branch mới
# ví dụ）git branch new-branch HEAD@{2}
$ git branch <tên branch> <commit>
```

### Khi muốn tạm dừng công việc hiện tại và chuyển sang một branch khác

```
# Tạm thời lưu lại các phần công việc còn đang làm dở
$ git stash -u
 
# Chuyển sang một branch khác và làm việc
$ git checkout -b other-branch
~làm việc, làm việc, làm việc~
$ git add <các file cần thiết>
$ git commit -m "commit message"
 
# Trở về branch cũ
$ git checkout origin-branch
 
# Lấy lại các nội dung công việc đang làm dở trước đó
$ git stash pop
```

# Kết
Những thông tin mình tổng hợp trên đây tuy không mới mẻ nhưng mình hy vọng sẽ giúp ích được các bạn trong quá trình thao tác với Git và bổ sung thêm chút kiến thức và các flow liên quan đến Git.