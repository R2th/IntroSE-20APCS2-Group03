# Giới thiệu
Ở [bài viết trước](https://viblo.asia/p/nhung-lenh-git-co-ban-can-nho-V3m5W1OyZO7), mình đã giới thiệu các lệnh cơ bản thường dùng trong git. Trong bài viết tiếp theo này, mình sẽ giới thiệu cho các bạn một số lỗi khi sử dụng git và cách khắc phục các lỗi đó.

# Các trường hợp thường gặp
## 1. Đặt tên sai cho Branch
Khi bạn đặt sai tên branch hoặc vì một lý do nào đó bạn muốn đổi lại tên branch: Ví dụ bạn có branch_1 mà muốn đổi thành branch_2.

- Nếu bạn đang ở bất kỳ một branch nào và muốn đổi branch_1 => branch_2, Syntax như sau:

```
git branch -m branch_1 branch_2
```

- Nếu bạn đang ở branch_1, Syntax như sau:
```
git branch -m branch_2
```

Đó là ở dưới local khi bạn chưa push lên, nếu muốn đổi ở trên server git origin mà không làm ảnh hưởng gì đến local hiện tại của bạn. Cách thực hiện Syntax chung như sau:
```
git push <remote> <remote>/<old_name>:refs/heads/<new_name> :<old_name>
```

Ví dụ: git push origin origin/branch_1:refs/heads/branch_2 :branch_1

## 2. Xóa branch
Ví dụ: bạn muốn xóa branch_delete.

**Xóa branch ở local**

- Nếu bạn đang ở branch branch_delete, thì bạn cần checkout sang branch khác: `git checkout master`
- Thực hiện xóa branch: `git branch -D branch_delete`

**Xóa branch ở server**
```
git push origin --delete branch_delete
```

**Xóa tất các nhánh ở local**

```
git branch | grep -v "master" | xargs git branch -D
```

## 3. Khôi phục branch

Giả sử, bạn có một branch developer_branch,́ và branch này bạn không hợp nhất với nhánh master và xóa mất nó, kết quả bạn bị mất hết những gì đã làm ở branch đó. Và bạn cũng quên không đẩy branch này đến một kho lưu trữ từ xa, giờ thì phải làm sao để lấy lại? Rất may là git theo dõi và giữ một mục nhật ký của tất cả các thay đổi được thực hiện trên mỗi file trong một bảng riêng biệt gọi là reflog.

Có 2 cách để khôi phục một Branch và nội dung của nó dựa trên HEAD~n hoặc id của lịch sử reflog. Nhưng đầu tiên bạn cần phải kiểm tra lịch sử trên reflog bằng lệnh sau:

```
git reflog
```

- Cách 1: Về thời điểm bạn mong muốn ví dụ như trước khi xóa branch chẳng hạn. 

```
 git hard reset
```

Cách trên sẽ thay đổi commit Head~1 của branch master, trường hợp xấu nhất còn gây mất commit mới nhất của branch master nếu thứ tự commit của branch master nhỏ hơn thứ tự commit mới nhất của branch cần lấy dựa trên reflog.

- Cách 2:  Lấy lại lịch sử commit dựa trên reflog.
```
cherry-pick <id-commit>
```
Cách này sẽ báo xung đột conflict file, do file đã bị xóa. Do đó, bạn phải thực hiện git add và git commit lại.

## 4. Chỉnh sửa commit cuối cùng
Khi bạn thực hiện commit xong, nhưng nội dung commit sai hoặc bạn muốn thay đổi nội dung khác. Bạn thực hiện lệch sau:
```
git commit --amend
```

Lưu ý: Không sửa đổi nội dung commit đã được đẩy vào kho lưu trữ từ xa và đã chia sẻ với người khác, vì điều đó sẽ làm cho lịch sử cam kết trước đó không hợp lệ và do đó mọi công việc dựa trên đó có thể bị ảnh hưởng. Sau khi thực hiện thay đổi commit ID sha-1 của commit đó cũng sẽ bị thay đổi.

## 5. Thay thế commit mới nhất bằng một commit khác

Khác với tùy chọn 'mixed' tùy chọn '--soft' chỉ cần xóa các tệp đã commit khỏi kho lưu trữ cục bộ "local repository" trong khi chúng vẫn được giữ lại trong chỉ mục "stagging area" và bạn có thể thực hiện cam kết lại chúng sau khi xem xét.

Tương tự <commit-id> là sha-1 của ảnh chụp nhanh mà bạn muốn xóa khỏi local repo và <HEAD ~ n> trong đó n là số thứ tự commit như đã nói ở trên.
    
Ví dụ: Bạn tạo ra 2 file mới là demo1.txt và demo2.txt, lúc đầu bạn thực hiện commit cho cả 2 file cùng lúc. Nhưng sau đó bạn lại muốn thực hiện commit lại cho từng file mà không thay đổi nội dung file, thì bạn làm theo cách sau:
 
```
git reset --soft [<commit-id>/HEAD~n>]
```
## 6. Commit sai dữ liệu

Giả sử bạn có tạo một file mới và bạn lỡ thực hiện commit cho nó xong nhưng chợt nhận ra file này là file nháp bị lỗi. Bây giờ bạn muốn lấy lại commit cũ và xóa luôn file này khỏi kho lưu trữ của mình. Bạn làm như sau:
```
git reset --hard HEAD~n hoặc git reset --hard <commit-id>
```

Chú ý: Git reset --hard là một lệnh nguy hiểm khiến bạn mất tập tin trong thư mục làm việc. Nó không được đề xuất trên một kho lưu trữ được chia sẻ từ xa.

## 7. Xóa file trong một commit local
 Ví dụ bạn có 2 file: a.txt và b.txt
    
 Bạn lỡ tay commit cả 2 file. Trong khi file a.txt là file bạn không muốn commit. Giờ làm sao để xóa file a.txt ra khỏi commit hiện tại đúng ko? Các thao tác như sau:
- Lùi một commit so với commit hiện tại, nhưng ko xóa code:  
```
git reset --soft HEAD^ hoặc git reset --soft HEAD~1
```
- Xóa file a.txt khỏi commit: `git reset HEAD a.txt`
- Thực hiện commit lại.
  
## 8. Lấy lại dữ liệu cá nhân đã được commit vào kho lưu trữ cục bộ
    
Khi bạn muốn xóa một số dữ liệu khỏi kho lưu trữ cục bộ local repository nhưng giữ các tệp trong thư mục làm việc working directory. 
    
Giả sử có một dự án, trong đó có file chứa nội dung về username và password tài khoản hosting của bạn. Nhưng bạn lỡ thực hiện commit cho nó, bây giờ làm thế nào để lấy lại và loại trừ nó khi thực hiện các commit tiếp theo.
```
git reset --mixed HEAD~n
```
## 9. Revert commit hiện tại
 Sử dụng cho việc ghi lại một số commit để đảo ngược tác dụng của một số commit trước đó.
    
```
git revert
```
    
Ví dụ:
`git revert HEAD~3`
    
Revert các thay đổi được chỉ định bởi commit cuối cùng thứ tư trong HEAD và tạo một commit mới với các thay đổi được hoàn tác.
    
`git revert -n master~5..master~2`
    
 Revert các thay đổi được thực hiện bởi các commit từ commits cuối cùng thứ năm trong master (bao gồm) sang commit cuối cùng thứ ba trong master (bao gồm), nhưng không tạo bất kỳ commit nào với các thay đổi được hoàn tác. Việc hoàn tác chỉ sửa đổi working tree và chỉ mục.
    
## 10. Unstage file hoặc thư mục
 
Khi thêm hoặc sửa đổi các file, bạn thường sử dụng lệnh 'git add', đó là thêm tất cả các file và thư mục vào chỉ mục để chuẩn bị commit. Tuy nhiên, sau khi xem xét lại bạn cảm thấy cần phải hủy bỏ một số file nhất định hoặc sửa đổi chúng lần cuối trước khi commit chúng. Bạn có thể làm như sau:
    
```
git reset <tên file/tên thư mục> hoặc git restore --staged <tên file / thư mục>
```
    
Un-staging hoặc restore file/thư mục ra giúp chúng ta có chuyển các file hoặc thư mục đã sử dụng lệnh git add từ stagging-area về lại working-directory. Sau khi chuyển xong bạn có thể thay đổi lại file, rồi thực hiện thêm vào lại chỉ mục để chuẩn bị commit.
 
## 11. Gộp các commit
    
Khi bạn đã push lên server một branch, mà trong branch đó có khá nhiều commit thừa. Vậy bạn phải thực hiện gộp chúng lại thành một commit chung có nội dung phù hợp mới branch bạn thực hiện, bạn dùng lệnh sau:
```
git rebase -i HEAD~n
```
    
Trong đó: n là số commit muốn gộp.
    
Một trình soạn thảo được mở ra, bạn thay đổi ký tự pick của dòng 2 thành s rồi lưu lại/kết thúc. Khi đó, trình soạn thảo để chỉnh sửa giải thích commit thiết lập cho commit sau khi đã tổng hợp sẽ được hiển thị, nên hãy chỉnh sửa lưu lại/kết thúc.

## 12. Tìm kiếm một tập tin
Giả sử bạn muốn tìm một file nhưng không nhớ tên file nhưng bạn có thể nhớ lại các từ nhất định trong nội dung của file. Trong trường hợp này, bạn có thể làm như sau:

Liệt kê tất cả các commit đã từng chứa ảnh chụp nhanh file với mẫu tìm kiếm
```
git rev-list --all | xargs git grep -i 'nội dung trong tập tin'
```
## 13. Tìm kiếm branch
Khi bạn phát hiện ra một id commit lỗi, bạn cũng có thể muốn biết tất cả các branch chứa commit này trên chúng từ đó bạn tìm và sửa tất cả chúng. Nếu kiểm tra lịch sử của mỗi branch là không thực tế trong một dự án lớn có nhiều branch.

Để liệt kê các nhánh có id commit đó bạn sử dụng lệnh sau:
```
git branch --contains <commit-id>
```
## 14. Không thể checkout sang nhánh khác

Nhiều trường hợp, có những file chẳng biết nó từ đâu, hoặc lúc mới đầu import project sẽ thấy rất nhiều file mà mình không làm cách nào có thể xử lý được cũng như không thể checkout được sang nhánh khác.
    
```
git checkout [tên branch] -f
```
    
Ví dụ: Bạn đang ở branch master mà muốn checkout sang branch_developer:
    
`git checkout branch_developer -f`
    
## 15. Xoá file đã push
Làm thế nào để xoá tận gốc file mà nó đã từng commit và push lên server, file đó lại ở nhiều nhánh nữa.
    
Ví dụ: Bạn có 3 branch: master, branch_1, branch_2 và file template.txt. File này đều có ở cả 3 branch và đã được commit push lên server. Giờ để xóa hết file ở các branch bạn thực hiện như sau:
    
**Xóa ở local**
```
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch <path_of_file>" \
  --prune-empty --tag-name-filter cat -- --all
```
    
path_of_file: là đường dẫn tới file đó. Sau khi thực hiện câu lệnh trên thì git nó sẽ xoá toàn bộ các file ở local trong các branch và các commit rồi.
 
**Xóa  ở remote**
    
Để xoá được trên remote thì cần push force. Force là ép remote theo cái mới mất mà client gửi lên. 
```
git push origin --force --all
```
    
Lưu ý: Khi dùng force để push này các bạn phải quan sát, kiểm tra lại xem có đúng file các bạn muốn xoá không nhé. Vì nó rất nguy hiểm, có thể bạn sẽ xóa nhầm file quan trọng.
## 16. Git conflict
    
Khi bạn làm việc teamwork thì việc xảy ra conflict là khá thường xuyên. Nó xảy khi khi bạn rebase code từ một branch khác.
    
Các bước để thực hiện sửa conflict như sau:
Ví dụ: bạn có branch developer_conflict, bạn thực hiện rebase một branch khác sau khi thực hiện lệnh này đã xảy ra conflict
- Bạn kiểm tra các file bị conflict:` git status`
- Tìm đến từng file bị conflict và sửa chúng. Lưu ý rằng, khi làm việc teamwork bạn cần phải hỏi những người có liên quan đến phần đó để thực hiện chỉnh sửa cho đúng, tránh việc xóa nhầm gây mất code.
- Thêm lại các file sửa đổi vào commit: `git add .`
- Tiếp theo thực hiện lệnh: `git rebase --continue`
    
    Nếu có vấn đề gì xảy ra trong quá trình rebase thì bạn có thể hủy quá trình rebase bằng lệnh: `git rebase --abort`
    
    Hoặc có những file thay đổi chưa được thêm trong branch đó, bạn cần thêm lệnh sau để tránh mất code: `git rebase --skip`
- Sau đó thực hiện commit: `git commit --amend`
- Cuối cùng là push lên server: `git push origin <tên branch> -f`
    
## 17. Thay thế code ở một branch bởi code ở branch khác
Ví dụ: Bạn có 2 branch là master và developer. Và bạn muốn thay thế code ở branch master bằng code ở branch developer. Các bước bạn cần thực hiện như sau:
    
**Đổi tên nhánh**
    
```
# Đổi tên branch master thành master-branch
$ git branch -m master master-branch

# Đổi tên branch developer thành master
$ git branch -m developer master
```
    
**Push branch master lên remote**

```
# Force push branch master lên remote
$ git push origin master -f
```
**Đổi lại tên branch như ban đầu**

```
# Đổi tên branch master hiện tại thành developer
$ git branch -m master developer

# Đổi tên branch master-branch từ bước 1 thành master
$ git branch -m master-branch master
```
**Cập nhật local master với remote master**

```
# Fetch tất cả thông tin ở remote về local repo và không merge
$ git fetch --all

# Thay thế hoàn toàn local master với remote master
$ git reset --hard origin/master
```
## 18. Apply một commit từ branch này sang branch khác
    
Ví dụ: Bạn muốn apply một commit thực hiện ở branch master vào branch apply-commit. Bạn sẽ thực hiện cherry-pick để apply một commit từ master sang apply-commit như sau:

**Sử dụng git log để biết và lấy ra hash-commit ứng với commit mà bạn muốn thực hiện cherry-pick.**

```
# Checkout master
$ git checkout master

# Hiển thị log
$ git log
```
Câu lệnh trên sẽ liệt kê ra các commit mà bạn đã thực hiện. Bạn tìm trong đó và chọn ra hash-commit mong muốn.

**Apply commit trên vào apply-commit**

```
# Checkout branch apply-commit
$ git checkout apply-commit

# Thực hiện cherry-pick
$ git cherry-pick <hash-commit>
```
Đến đây là bạn đã thực hiện xong việc apply một commit từ branch master sang branch apply-commit.