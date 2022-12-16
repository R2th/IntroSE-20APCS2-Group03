Bài viết này mình muốn chia sẻ một chút kiến thức về GIT cho các beginer nắm được các lệnh và khái niệm cơ bản để làm việc suôn sẻ hơn.

# Ba trạng thái trong GIT
Đầu tiên chúng ta cần hiểu về các trạng thái trong GIT trước khi đến các lệnh thao tác. 
![](https://images.viblo.asia/8293dc5c-edbb-483c-a951-386bcfdc354d.png)
**Working directory:**

Hiểu là 1 bản sao phiên bản của dự án, nơi mà chúng ta đang thao tác các thay đổi với dữ liệu tại local (ví dụ máy tính cá nhân) của chúng ta.
Ở tại đây chúng ta sẽ có các file data, nếu có bất kỳ thay đổi (thêm mới/chỉnh sửa/xóa) thì nó sẽ ở trạng thái *"Modified"*

Trường hợp muốn bỏ đi các thay đổi trong 1 file nào đó, chuyển từ modify --> unmodify chúng ta có thể dùng lệnh checkout:
```
$ git checkout -- <file name/path file>
ví dụ: git checkout -- package.json
```

**Staging area (Index):**

Đây là vùng chứa thông tin về những gì sẽ được commit trong lần commit sắp tới. Hiểu là vùng để chúng ta tổ chức các file thay đổi, đánh dấu (tracking) các file thay đổi sẽ được lưu lại thành 1 version khi commit. Nó như là cách để chúng ta giới hạn các file chúng ta cần quan tâm hoặc "suy nghĩ lại" có nên lưu trữ trong phiên bản sắp tới hay không.

Để đưa các file "Modified" vào vùng này thì chúng ta phải **"staged"** bằng lệnh:
```
# Stage các file xác định:
$ git add <file name/path file>
ví dụ: git add README.md

# stage tất cả các file thay đổi/thêm mới hiện có:
$ git add .

# stage tất cả các file thay đổi/thêm mới/xóa bỏ hiện có:
$ git add -A
```

**Git directory:**

Đây là nơi Git lưu trữ các data và cơ sở dữ liệu cho dự án của chúng ta khi commit và những gì liên quan đến git mà chúng ta thao tác. Để có được vùng này yêu cầu chúng ta phải khởi tạo (init git) ở tại thư mục làm việc mong muốn.
Để đưa các file* "staged"* vào vùng này thì chúng ta phải thực hiện *"commit"* 

# Một số khái niệm cơ bản
## 1. Repository
Repository là một kho chứa, lưu trữ dữ liệu của bạn
* Local repository: Là repository được lưu tại cục bộ (máy tính của bạn)
* Server repository (Remote repository): Là repository nhưng được lưu tại server của các hosting-service sử dụng Git (ví dụ: Github, GitLab, Bitbucket ...)
#### Các lệnh thao tác thông dụng:
Tạo một git repository:
```
$ git init
```
Sao chép Repository đã tồn tại:
```
$ git clone [url]
#ví dụ: 
$ git clone https://github.com/schacon/grit.git
```
Tham khảo cách lấy url của server repository trên github:

![](https://images.viblo.asia/86de33b9-1bd3-4599-80e1-8cbeee8c70df.png)
## 2. Commit
Ghi lại thay đổi vào git repository, một version mới được tạo ra bằng cách tạo một "**commit**" cho các sự đổi của dữ liệu.
#### Một số lệnh thông dụng:
Tạo mới một commit:
```
$ git commit -m "Nội dung commit"
```
	
Lưu lại thay đổi nhưng ghi đè lên commit trước đó:
```
$ git commit --amend -m "Nội dung mới nếu có thay đổi"
```
	
Xem lại danh sách commit đã tạo, mỗi commit trên một dòng:
```
$ git log --oneline
```
	
Hoặc giới hạn một số lượng n dòng đầu tiên:
```
$ git log --oneline -n
```
	
Kiểm tra trạng thái của file:
```
$ git status
```
    
Theo dõi các tập file mới:
```
$ git add <file_name>
```
    
Xem thay đổi giữa working với stage:
```
$ git diff
```  
Xem thay đổi giữa working với HEAD (vùng sau commit):
```
$ git diff HEAD
```
Xem thay đổi giữa stage với HEAD:
```
$ git diff --staged
```
Bỏ qua các file: đưa danh sách các file không muốn theo dõi ***.gitignore***

Đây là một ví dụ của .***gitignore***:
```ruby
# không theo dõi tập tin có đuôi .a 
*.a
# nhưng theo dõi tập lib.a, mặc dù bạn đang bỏ qua tất cả tập tin .a ở trên
!lib.a
# chỉ bỏ qua tập TODO ở thư mục gốc, chứ không phải ở các thư mục con
/TODO
# bỏ qua tất cả tập tin trong thư mục build/
build/
# bỏ qua doc/notes.txt, không phải doc/server/arch.txt
doc/*.txt
# bỏ qua tất cả tập .txt trong thư mục doc/
doc/**/*.txt
```

## 3. Branch
Một nhánh trong Git là một con trỏ (index) có khả năng di chuyển được, trỏ đến một trong những commit. 
Khi git init thì chúng ta sẽ có branch ***master*** - nhánh chính của git, thông thường chúng ta sẽ thực hiện gộp các thay đổi trong quá trình phát triển vào branch ***master***, và dùng nó để tổ chức thành các version cho production.
![](https://images.viblo.asia/c39db3a8-9682-4f69-87bb-563c3a9e6bc1.png)
#### Một số lệnh thông dụng:
Tạo mới branch:
```
$ git branch <branch_name>

vd: git branch testing
```

Để chuyển sang một nhánh đang tồn tại:
```
$ git checkout <branch_name>

vd: git checkout master
```

Để tạo một nhánh và chuyển sang nhánh đó đồng thời:
```
$ git checkout -b <branch_name>

vd: git checkout -b iss53
```

![](https://images.viblo.asia/5d3ff73d-36b8-43da-a05e-0de17f4ee551.png)
Xóa một nhánh:
```
$ git branch -d <branch_name>

vd: git branch -d iss53
```

Để tạo một nhánh và chuyển sang nhánh đó đồng thời:
```
$ git checkout -b <branch_name>

vd: git checkout -b iss53
```

Xóa một nhánh:
```
$ git branch -d <branch_name>

vd: git branch -d iss53
```

## 4. Remote
Mỗi tham chiếu đến server repository được gọi là một remote
Mỗi remote sẽ có các thông tin:
* **Tên remote**: Không được trùng lặp trong cùng một .Git repository
* **URL**: đường link của server repository (cung cấp 2 giao thức http hoặc ssh)
![](https://images.viblo.asia/782f75d4-dae6-477b-88a2-7554323a17ee.png)
Một số lệnh thông dụng:
Thêm một remote:
```
$ git remote add <remote_name> <url>
```

vd: git remote add sun-asterisk https://github.com/schacon/grit.git

Xem danh sách remote:
```
$ git remote -v
```
    
Thay đổi url của remote:
```
$ git remote set-url <remote_name> <remote_url>

vd: git remote set-url sun-asterisk https://github.com/framgia/git_lecture.git
```

Thay đổi tên của remote:
```
$ git remote rename <old_name> <new_name>

vd: git remote rename sun-asterisk framgia
```
    

Xóa một remote:
```
$ git remote remove <remote_name>

vd: git remote remove framgia
```
    


# Một số tip sử dụng để giải quyết 1 số vấn đề của bạn

### 1. Gộp nhiều commit thành một commit
```
$ git rebase -i HEAD~<số lượng commit>

# Ví dụ) git rebase -i HEAD~3

# (trước khi sửa) các commit cũ từ trên xuống dưới
pick aa11bbc commit message 1
pick b2c3c4d commit message 2
pick 4e56fgh commit message 3
・・・

# (sau khi sửa) các commit trước là f sẽ bị xóa bỏ, chỉ giữ lại commit trước đó
pick aa11bbc commit message 1
f b2c3c4d commit message 2
f 4e56fgh commit message 3
・・・
```

#### 2. Ignore một số file commit thừa
```
# Đầu tiên là xoá các file đã commit khỏi repository
$ git rm --cached <tên file>

# Sau đó là thêm vào gitignore
$ echo <đường dẫn tên file> >> .gitignore

# Ví dụ:
$ git rm --cached config/database.yml
$ echo config/database.yml >> .gitignore
```

#### 3. Commit nhầm sang một branch khác
```
# Đầu tiên là tạo một branch khác chứa trạng thái mà ta đã commit
$ git branch <other branch>

# Đưa HEAD, index của master về 1 commit trước đó
$ git reset --hard HEAD~
#Hoặc đưa index của branch về commit cụ thể dựa vào ID commit (có thể xem log để biết được ID)
$ git reset --hard <ID commit>

# Check out sang branch có commit trước đó
$ git checkout <other branch>
```
#### 4. Lỡ tay commit và muốn xóa commit
```
# 1. Chỉ đưa HEAD về như cũ
$ git reset --soft HEAD~

# 2. Đưa HEAD và index về như cũ
$ git reset HEAD~

# 3. Đưa cả index, working tree về 1 commit trước đó
$ git reset --hard HEAD~

# 4. Xóa luôn commit, về lại trước đó
$ git revert <commit>
```

#### 5. Đang làm dở dang và chuyển branch khác
```
# Tạm thời lưu lại các phần công việc còn đang làm dở
$ git stash
Hoặc 
$ git stash -u

# Chuyển sang một branch khác và làm việc
$ git checkout -b <other branch>
~làm gì đó mà các bạn muốn ở nhánh này~
$ git add <các file cần thiết>
$ git commit -m <Nội dung commit>

# Trở về branch cũ
$ git checkout <branch name>

# Lấy lại các nội dung công việc đang làm dở trước đó
$ git stash pop
#Trường hợp stash nhiều lần thì kiểm tra log stash rồi lấy ra stash mong muốn theo id:
$ git stash list
$ git stash pop <stash ID>
```

#### 6. Lỡ xóa mất commit quan trọng
```
# Đầu tiên là xem lại toàn bộ lịch sử commit
$ git reflog
# Từ đó chọn commit muốn phục hồi và khôi phục lại
$ git reset --hard <commit>
```

#### 7. Lỡ xóa mất branch
```
# Đầu tiên là xem lại toàn bộ lịch sử commit
$ git reflog

# Từ các commit này, chọn rồi tạo branch mới
$ git branch <tên branch> <commit ID>
# ví dụ）git branch new-branch abc123f
```

#### 8. Đã merge nhưng muốn trở lại như trước
```
# tiến hành merge
$ git checkout <tên branch nguồn>
$ git merge <tên branch muốn merge>

# Sau khi merge, nhưng lại muốn trở lại như trước thì làm như sau
$ git reset --hard ORIG_HEAD
```

Trên đó là những gì mình tổng hợp và chia sẻ, hi vọng hữu ích với các bạn đọc! Bài viết chưa hoàn thiện và còn nhiều thiếu xót, hi vọng các bạn sẽ góp ý để cải thiện bài viết tốt hơn :grinning:
#### Nguồn tham khảo
https://git-scm.com/book/en/v2