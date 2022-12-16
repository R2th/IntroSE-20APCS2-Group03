Hế lô anh em , lại là mình đây :sunglasses::sunglasses::sunglasses:

Hôm nay mình tiếp tục chia sẻ cho mọi người về một chủ đề mình nghĩ là hầu như anh em nào đi làm cũng đã biết và thuộc nằm lòng rồi, đó là git. 

Nhưng mình nghĩ là cũng có thể còn nhiều anh em vẫn còn quên cú pháp, hay những bạn mới vô đi làm có lẽ rất cần list này.

Dưới đây là danh sách các câu lệnh git được sử dụng nhiều nhất : 

-  **git init** đây là command được sử dụng khi chúng ta muốn bắt đầu một repository mới .
```
    git init [repository name]
```

- Muốn thiết lập tên người dùng / địa chỉ email, ta làm như sau :
```
    git config –global user.name "[name]"
    git config –global user.email "[email address]"
```
- **git clone** command này dùng để clone lại một project từ môt url (thường sử dụng khi anh em pull code từ dự án về từ trên gitlab hay github ) :
```
    git clone [url]
```
- **git status** đây chắc là câu lệnh thần thánh mà tất cả đều dùng, command này kiểm trả các file đã thay đổi trong project của bạn ( nếu anh em nào chưa biết thì git chạy lệnh này , các file có sự thay đổi sẽ hiện lên màu đỏ trong trình code của bạn)
```
    git status
```
- **git add** command này dùng để add những file thay đổi trong project :
```
    git add [file]
```
- Còn nếu muốn add một lúc hết luôn thì mình làm như sau :
```
    git add *
```
- Để ghi lại việc thêm/ thay đổi file hay thư mục vào repository thì sẽ thực hiện thao tác gọi là Commit. Khi thực hiện commit, trong repository sẽ tạo ra commit (hoặc revision) đã ghi lại sự khác biệt từ trạng thái đã commit lần trước đến trạng thái hiện tại.Vì vậy, sau khi add file thay đổi xong , mọi người nhớ commit code mình lại kèm theo message nhé :
```
    git commit -m “[ Type in the commit message]”
```
- **git commit -a** - Command nàysẽ commits  bất kỳ file nào bạn đã thêm bằng lệnh git add và cũng commits bất kỳ file nào bạn đã thay đổi kể trước đó:
```
    git commit -a
```

- **git diff** hiện thị thông tin thay đổi giữa thư mục làm việc và vùng index (staging) hoặc với commit cũ, thông tin thay đổi giữa index(staging) và commit, thông tin thay đổi giữa hai nhánh ... :
```
    git diff
```
- Kiểm tra sự thay đổi của index (staging) với commit cuối :
```
    git diff –staged
```
- Kiểm tra sự thay đổi giữa hai nhánh:
```
    git diff [first branch] [second branch]
```
- **git reset** được dùng để quay về một điểm commit nào đó, đồng thời xóa lịch sử của các commit trước nó.
```
    git reset --hard <commit_id> //xoá toàn bộ các commit trước đó và đưa branch về trạng thái của commit có commit_id đã chọn
```
- **git rm** - command này xóa file khỏi thư mục làm việc của bạn :
```
    git rm [file]
```
- **git log** - Command này được sử dụng để liệt kê lịch sử commits của branch hiện tại.
```
    git log
    // nếu muốn định dạng thông tin chung về commit (mã hash, dòng thông tin) trên một dòng thì dùng tham số --oneline :
    git log --oneline
```
- **git show** - Command này hiển thị các thay đổi  và nội dung của commit được chỉ định.
```
    git show [commit]
```
- **git tag** - Command này được sử dụng để cấp tag cho commit được chỉ định.
```
    git tag [commitID]
```

- **git branch** - Command này liệt kê tất cả các nhánh hiện tại ở local của bạn
```
    git branch
```

- Muốn tạo một nhánh mới **git branch [branch name]** :
```
    git branch [branch name]
    // hoặc có thể dùng: git checkout -b [branch name]
```

- Muốn xóa nhánh ở local :
```
    git branch -d [branch name]
```
- Muốn chuyển từ nhánh này sang nhánh khác :
```
    git checkout [branch name]
```

-** git merge** - Command này sẽ merge lịch sử của nhánh đã chỉ định vào nhánh hiện tại.
```
    git merge [branch name]
```
-  **git push** được sử dụng để đẩy các commit mới ở local lên remote. Nguồn để đẩy lên là nhánh mà con trỏ HEAD đang trỏ tới (nhánh làm việc).
```
    git push [variable name] [branch]
```

- Nếu đang làm việc ở nhánh này, mà có nhánh khác cần phải sửa thì sao, yên tâm đã có **git stash** :
```
    git stash - Command này tạm thời lưu trữ tất cả các tệp được theo dõi đã sửa đổi.
```
- Rồi sau khi làm việc ở nhánh vừa sửa xong, quay lại thì ta chỉ cần :
```
    git stash pop
```
- Muốn xem list stash thì ta làm như sau :
```
    git stash list
```
- **git stash drop** - Command này loại bỏ tập các thay đổi được lưu trữ gần đây nhất.
```
    git stash drop
```
- Và cuối cùng **git pull** - Command này tìm và kết hợp kéo các file thay đổi trên remote từ xa về thư mục làm việc của bạn :
```
    git pull
```

Riêng bài biết này mình sẽ còn cập nhật thêm các câu lệnh mà trong các trường hợp khác có thể anh em sẽ gặp phải.

Rât mong được mọi người ủng hộ.

Many thanksssss