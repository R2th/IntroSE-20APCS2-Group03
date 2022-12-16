Tiếp nối bài viết trước 

https://viblo.asia/p/learning-git-with-help-of-real-world-scenarios-07LKXzXklV4

Mình xin tiếp tục chia sẻ một số lệnh git tuy cơ bản nhưng có thể sẽ hữu dụng trong nhiều trường hợp. Hi vọng chúng sẽ giúp ích cho các bạn 

# 1. Fetch pull request từ remote

Đôi khi việc review hay đọc một pull request của đồng đội thông qua github không đủ để có cái nhìn trực tiếp về những thay đổi có trong PR, bạn cần nhìn xem nó chạy thế nào, biết đâu lại tìm ra lỗi sai mà có thể bị bỏ lỡ nếu chỉ đọc qua thì sao.

Lệnh git sau đây có thể giúp bạn lấy code từ pull request về local

```
git fetch <remote_name> pull/1/head:<local_branch_name>
git checkout <local_branch_name>
```

số 1 ở đây chỉ là ví dụ thể hiện cho số hiệu của pull request

![](https://images.viblo.asia/fb904846-176c-442a-a657-a07064186638.png)

Ví dụ bạn muốn fetch pull số 4 như trên hình về nhánh pull_4 ở local chẳng hạn

```
git fetch origin pull/4/head:pull_4
```

# 2. Fetch a branch

Ở trên là lấy về local 1 pull request, thế còn đối với 1 branch thì sao ?

Bạn cần tạo một nhánh local theo dõi một nhánh remote. Lệnh sau sẽ tạo một nhánh local , theo dõi nguồn gốc của một nhánh remote nào đó bạn muốn. Khi bạn thay đổi, nhánh remote sẽ được cập nhật.

```
git checkout --track <remote_name>/<branch_name>
```

--track là cách viết tắt cho cú pháp 

```
git checkout -b <local_branch_name> <remote_name>/<branch_name>
```
lệnh này sẽ đặt tên local branch tương tự như remote branch mà bạn muốn lấy về.

Ví dụ bạn muốn lấy branch develop từ remote origin về local chẳng hạn

```
git checkout --track origin/develop
```

# 3. --skip-worktree

Một cách khác giúp bạn bỏ qua sự thay đổi đối với file được theo dõi bởi git thay vì dùng .gitignore. Đôi khi bạn chỉ muốn bỏ qua thay đổi ở local của bạn.

```
git update-index --skip-worktree <file>
```

Với lệnh trên git sẽ không track sự thay đổi của file được chỉ định. Để đảo ngược lại, tiếp tục để git theo dõi sự thay đổi của file chỉ cần sử dụng --no-skip-worktree

```
git update-index --no-skip-worktree <file>
```

# 4. Undo changes of file in working directory
Có 2 trạng thái của file thay đổi trước khi commit: stage và unstage, bạn có thể git status để xem. Chúng sẽ trông như thế này:

```
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   README.txt
#       modified:   test.js
#
```
Ngay dưới phần "Thay đổi sắp được commit", nó chỉ ra rằng "sử dụng git reset HEAD <file>... để loại bỏ khỏi khu vực tổ chức". Vậy thì hãy làm theo gợi ý đó để loại bỏ tập tin test.js

```
$ git reset HEAD benchmarks.rb
benchmarks.rb: locally modified
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   README.txt
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   test.js
#
```
Với lệnh reset trên file test.js đã được đưa về trạng thái unstage (chưa add).
    
Nếu bạn muốn loại bỏ luôn những thay đổi của file test.js thì sao ? Làm thế nào để dễ dàng phục hồi lại những thay đổi đó - phục hồi nó lại trạng thái giống như sau khi thực hiện commit cuối cùng (hoặc như sau khi sao chép (initialy cloned), hoặc như lúc bạn mới đưa chúng vào thư mục làm việc)? May mắn là, git status cũng sẽ cho bạn biết làm sao để thực hiện được việc đó. bạn có thể thấy lệnh *git checkout -- <file>* được liệt kê ở trên.
    
```
$ git checkout -- test.js
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   README.txt
#
```
    
Lúc này thì mọi thay đổi trong file test.js đã biến mất. Hãy nhớ là, bất cứ thứ gì đuợc commit vào Git luôn có thể phục hồi lại. Thậm chí cả các commit ở các nhánh đã bị xoá hoặc bị ghi đè bởi --amend (xem thêm về phục hồi dữ liệu ở Chuơng 9). Tuy nhiên, **bất cứ thứ gì bị mất mà chưa đuợc commit thì không có cơ hội phục hồi lại.** Vì vậy hãy chắc chắn rằng bạn không cần file đó thay đổi nữa hãy sử dụng đến lệnh *checkout --*.
    
# 5. git reflog
    
Một lệnh cuối cùng, đơn giản mà chắc ai cũng biết dành cho những ai bị "mất trí nhớ" không biết mình đã thao tác gì với git trước đó và cũng cần thiết cho bạn để tìm lại những commit khi bạn cần reset về chúng
    
```
$ git reflog
    
# eff544f HEAD@{0}: commit: migrate existing content
# bf871fd HEAD@{1}: commit: Add Git Reflog outline
# 9a4491f HEAD@{2}: checkout: moving from master to git_reflog
# 9a4491f HEAD@{3}: checkout: moving from Git_Config to master
# 39b159a HEAD@{4}: commit: expand on git context
# 9b3aa71 HEAD@{5}: commit: more color clarification
# f34388b HEAD@{6}: commit: expand on color support
# 9962aed HEAD@{7}: commit: a git editor -> the Git editor
```