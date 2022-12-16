## Giới thiệu 
Trong cuộc sống của 1 một developer không ít thì nhiều đã từng nghe qua về **Git**. Vậy **Git** là gì?  Tại sao **Git** lại được sử dụng nhiều trong các dự án đến như vậy? Trong bài viết này, chúng ta cùng tìm hiểu qua một số vấn đề cơ bản của **Git**, qua đó giúp cho việc quản lý source code trở nên dễ dàng hơn.
## Nội dung
**Git** là một hệ thống quản lý phiên bản phân tán (distributed version control system). Nhờ **Git**, việc quản lý code và làm việc nhóm của developer trở nên đơn giản, thuận tiện hơn. Để tìm hiểu thêm về Git, bạn có thể vào trang chủ của Git tại [đây](https://git-scm.com/)
### 1. Thế nào là repository, branch.
**Repository**: Repository(kho chứa) là nơi lưu trữ source code, thông tin cần thiết, lịch sử  thay đổi của từng thành viên đến project.

* Tất cả dữ liệu của repo được lưu trữ trong 1 folder ẩn có tên là .git.Ta có thể tạo thư mục này với câu lệnh  `$ git init `
* Có 2 loại repository là:
  + Local Repository: Là repo trên máy người dùng
  + Remote Repository: Là repo trên 1 server chuyên dụng được chia sẻ với nhiều người. VD: Github, GitLab, ..

**Branch**: Branch là nhánh làm việc của repo. Nó ghi lại luồng thay đổi của lịch sử. 
* Các hoạt đọng trên mỗi branch sẽ không gây ảnh hưởng đến branch khác nên có thể tiến hành nhiều thay đổi đồng thời trong cùng một repo, giúp giải quyết được nhiều nhiệm vụ cùng một lúc.
* Khi tạo một repo mới thì nhánh mặc định sẽ là master. Nhánh master thường là nhánh chính của ứng dụng 
* Branch đã phân nhánh có thể chỉnh sửa tổng hợp lại thành 1 branch bằng việc hợp lại (merge) với branch khác

### 2. Làm thế nào để xoá một branch ở phía local, làm thế nào để xoá một branch remote.
**Local branch**: là branch lưu ở máy tính cá nhân.

Để kiểm tra danh sách local branch, sử dụng lệnh: 
```
$ git branch
```

Để tạo mới một branch:
```
$ git branch <Tên branch>
```

Để tạo mới một branch và di chuyển sang branch đó: 
```
$ git checkout -b <Tên branch>
```

Để di chuyển đến một branch:
```
$ git checkout <Tên branch>
```
Để xóa một local branch khi nó đã được merge 

```
$ git branch -d <Tên branch>
```

Để xóa một local branch bất kể có được merge hay không
```
$ git branch -D <Tên branch>
```

**Remote branch**: là nhánh của remote repository 

Để kiểm tra danh sách remote branch:
```
$ git branch -r
```

Để xóa 1 remote branch
```
$ git push <Tên remote> --delete <Tên branch>
```

hoặc 
```
$ git push <Tên remote> :<Tên branch>
```

### 3. Push 1 branch ở local lên remote với một cái tên khác.

Local và remote có cùng tên branch 
```
$ git push <Tên remote> <Tên branch>
```

Local và remote khác tên branch
```
$ git push <Tên remote> <Tên local branch>:<Tên remote branch>
```

### 4. Phân biệt rebase với merge

Trong Git, có 2 cách chính để tích hợp thay đổi từ nhánh này vào nhánh khác là `merge` và `rebase`. 

`rebase`: Giả sử bạn đang làm việc trên nhánh `working_branch` và trước đó bạn có nhánh `rebase_branch`. Bạn muốn rebase nhánh `rebase_branch` vào nhánh `working_branch` ta sử dụng lệnh 
```
$ git rebase rebase_branch
```

`merge`: Tương tự như `rebase`, để `merge`  nhánh `merge_branch` vào nhánh `working_branch` ta sử dụng lệnh;
```
$ git merge merge_branch
```

1 VD cho các bạn dễ hình dung.

Giả sử ban đầu có 3 commit là A,B,C

![](https://images.viblo.asia/54d4df0f-d5d0-4f21-94ef-ba2bb2960c65.png)

Sau đó anh D tạo 1 commit D, anh E tạo 1 commit E đều được tách ra từ commit C

![](https://images.viblo.asia/17839436-a97e-4431-acd8-1d0f0e444ab8.png)

**Merge**: Để gộp 2 commit D, E , `git merge` sẽ sinh ra 1 commit tích hợp 2 commit này lại![](https://images.viblo.asia/d4314c81-0889-4866-a21a-0cfa69ce99b9.png)

Tuy nhiên nếu bạn có hàng chục commit D và E thì không biết khi log commit ra sẽ rối đến mức nào

**Rebase**: Khác với `merge`, `rebase` sẽ đi tới commit chung của 2 nhánh( Tức là commit C) sau đó tìm sự khác biệt trên các commit, khôi phục lại nhánh hiện tại về cùng một commit với nhánh bạn đang rebase, và cuối cùng áp dụng lần lượt các thay đổi.![](https://images.viblo.asia/6b19a7f6-1ae1-4ac2-b27d-9b5a1c109d8f.png)

Ưu điểm của phương pháp này là giúp loại bỏ những commit không cần thiết  cho lịch sử commit rõ ràng, dễ theo dõi hơn.

Tóm lại, cả 2 cách này đều có thể khiến mọi thứ quay lại với nhau, tùy từng trường hợp mà chọn sử dụng rebase và merge 

### 5. Thế nào là git stash ?
Trong quá trình phát triển đôi khi bạn đang làm việc trên một nhánh và đang rất lộn xộn thì đột nhiên 1 nhánh khác lại cần phải chỉnh một số thứ. Bạn cố gắng checkout nhưng ăn hành ngay vì sẽ nhận được một thông báo không thể chuyển sang nhánh khác khi chưa commit. Tuy nhiên bạn không muốn commit thì phải làm như nào? Để khắc phục tình trạng này bạn có thể dùng `git stash`

Một số thao tác với git stash
* Lưu stash: `$ git stash`
* Xem danh sách các stash: `$ git stash list`
* Áp dụng thay đổi từ stash vào trạng thái hiện tại: `git stash apply stash@{stash_id}`
* Xóa 1 stash: `$ git stash pop stash@{stash_id}`
* Xóa toàn bộ các thay đổi: `$ git stash clear` 

### 6. Phân biệt git fetch với pull?
Khi muốn cập nhật những thay đổi từ trên remote server ta cũng có 2 cách để thực hiện điều này
```
$ git pull <tên remote> <tên remote-branch>
```
Lệnh này sẽ tiến hành kéo các thay đổi từ trên remote server về local đồng thời `merge` các thay đổi đó ngay
```
$ git fetch <tên remote> <tên remote-branch>
```
Lệnh này sẽ tiến hành kéo các thay đổi từ trên remote server về nhưng không merge ngay mà thực hiện việc này sau khi đã review lại các thay đổi trước khi tiến hành merge.

Có thể hiểu đơn giản là:
* `git pull` = `git fetch` + `git merge`

### 7.  Làm thể nào để xóa bỏ trạng thài vài commit gần đây?
Để thực hiện công việc này ta có thể sử dụng 1 trong 2 cách sau 
```
$ git revert <commit_id>
```

Lệnh này tạo ra 1 commit mới đảo ngược commit có commit_id được chỉ định

```
$ git reset --hard <commit_id>
```

Lệnh này sẽ xóa bỏ toàn bộ các commit trước đó và đưa branch về trạng thái của commit có `commit_id`

* Để lấy commit_id ta sử dụng lệnh: 
```
git log --oneline
```

### 8. Làm thế nào để gộp một vài commit thành 1 commit duy nhất?

Khi làm việc chúng ta không thể tránh khỏi việc tạo ra một số commit dư thừa và sau đó muốn gộp chung số commit đó lại 
với một message rõ ràng hơn . Để làm được điều này, ta sử dụng lệnh sau:
```
$ git rebase -i <commit_id>
```
với `commit_id` là id của commit cuối cùng của nhóm cần gộp 

Ngoài ra chúng ta có thể sử dụng cách khác là:
```
$ git rebase -i HEAD~<index>
```
Trong đó index là số lượng commit cần gộp so với commit cuối cùng

### 9. Phân biệt git reset, git reset --hard, git reset --soft

```
$ git reset <commit_id>
```
Lệnh này sẽ di chuyển con trỏ HEAD về commit có `commit_id` và giữ lại trạng thái thay đổi của file và loại bỏ file ra khỏi stage 
```
$ git reset --hard <commit_id>
```
Lệnh này chuyển con trỏ HEAD về commit có `commit_id` và loại bỏ hoàn toàn các thay đổi của file cũng như thay đổi trong stage 
```
$ git reset --soft <commit_id>
```
Lệnh này sẽ chuyển con trỏ về commit có `commit_id` và giữ lại các thay đổi của file và trạng thái của stage 

### 10. Thế nào là cherry-pick?
Đây là khả năng lấy các thay đổi trong 1 commit trên 1 nhánh bất kỳ để áp dụng vào nhánh hiện tại 
```
$ git cherry-pick <commit_id>
```

### 11. Git flow
* Git flow là một quy trình làm việc với git được phát triển bởi Vincent Driessen. Git flow đưa ra một mô hình phân nhánh giúp cho quản lý dự án dễ dàng hơn. Sơ đồ tổng quan:<br>
![](https://images.viblo.asia/3a9bf5b9-059f-4408-bbda-0408875ebf92.png)

#### Các branch trong gitflow:
* Master branch:  là branch dùng cho sản phẩm chính thức
* Develop branch:  là nhánh dùng cho sản phẩm trong quá trình phát triển
* Feature:  mỗi tính năng mới cho sẩn phẩm sẽ được tạo và phát triển trên một branch mới với tên quy ước feature/tên_branch. Các **feature** này sẽ tạo ra từ **develop branch** và khi được hoàn thiện sẽ được gộp trở lại với **develop branch**  (Lưu ý: các Feature không được phép gộp trực tiếp với master branch)
* Release: khi **develop branch** đã có đủ số tính năng cần thiết để có thể release, ta có thể tạo branch mới với tên quy ước release/tên_version. Branch này sau khi được tạo xong sẽ tiến hành merge nó với đồng thời cả **master branch** và **develop branch**
* Hotfix branch: khi sản phẩm trên **master branch** của chúng ta gặp phải trục trặc và cần có bản vá ngay lập tức thì ta sẽ tạo ra **hotfix branch**. Branch này tương tự như **release branch** nhưng nó được tạo ra từ master branch thay vì từ **develop branch** như release (Chú ý **hotfix branch** cũng cần được gộp lại với **master branch** với **develop branch**)

### Kết luận
Trên đây là tất cả những gì mình học được về git. Cảm ơn mọi người đã theo dõi. Mọi người có góp ý xin hãy để lại ở phía comment.  
Tài liệu tham khảo:<br>
https://learngitbranching.js.org/<br>
https://git-scm.com/book/vi/v1