Chắc hẵn với những người mới bắt đầu tiếp cận với Git thì lúc nào cũng cảm giác Git thật rắc rối và khó sử dụng, kèm theo đó là hàng loạt sự cố, sai lầm với Git đã xảy ra, khi tôi mới bắt đầu với git cũng thế, đã quá nhiều lần tôi rebase bị mất code, hay là khi người khác base trên nhánh của tôi thì tôi thay dổi lịch sử commit xoành xoạch may mà những người ae thiện lành không có ăn đấm, hay trong lúc 'ngáo cần' lại code ở một nhánh khác và commit như đúng rồi, hay nhỡ tay xóa nhánh xóa commit vừa tạo xong v.v và v.v... nhưng có nhưng sai lầm thì mình mới tìm cách sửa sai và tránh nhưng lần khác lặp lại phải không. Dưới đây là nhưng trường hợp tôi đã từng mắc phải và cách tôi giải quyết nó, mong bạn đọc xem và góp ý giúp tôi những cách hay ho hơn nếu có nhé:

# 1. Đặt sai tên branch
Đôi khi đặt tên một nơi mà code những thứ chẳng liên quan gì đến branch đó hay đặt sai chính tả
```
# Rename the local branch to the new name
git branch -m <old_name> <new_name>
```

Khi bạn đã push lên remote thì làm sao? 

```

# Delete the old branch on remote - where <remote> is, for example, origin
git push <remote> --delete <old_name>

# Or shorter way to delete remote branch [:]
git push <remote> :<old_name>

# Push the new branch to remote
git push <remote> <new_name>

# Reset the upstream branch for the new_name local branch
git push <remote> -u <new_name>
```

# 2. Khi bạn viết nhầm và muốn thay đổi message của commit vừa tạo

```
$ git commit --amend
# Then, change commit message
```

# 3. Khi lỡ commit và giờ muốn gỡ commit đó
```
git reset --soft HEAD^     # Use --soft if you want to keep your changes
git reset --hard HEAD^     # Use --hard if you don't care about keeping the changes you made
```

- Note: Trường hợp sửa dụng `git reset --soft HEAD^` trường hợp này rất tốt trong việc muốn gỡ 1 commit nhưng vẫn cần giữ lại nhưng thay đổi của commit đó, mình có thể thêm tiếp những gì muốn muốn thay đổi và tạo một commit mới

Lưu ý nếu đã push lên và người khác đã pull về hay base trên nhánh của bạn thì không nên dùng cách trên mà hãy dùng
```
git revert <hash_commit>
```
nó sẽ tạo một commit xóa những gì bạn đã làm việc trên commit đó.

# 4. Loại file ra khỏi commit vừa tạo
Nếu bạn muốn bỏ luôn commit vừa tạo sau đó thêm thay đổi và sẽ tạo commit mới sau thì hãy xem note thứ 3

Hoặc bạn có thể làm theo cách này

```
git reset --soft HEAD^ 

# or

git reset --soft HEAD~1

# Then reset the unwanted files in order to leave them out from the commit:
git reset HEAD path/to/unwanted_file

# Now commit again, you can even re-use the same commit message:
git commit -c ORIG_HEAD
```
Có thể bạn chưa biết ORIG_HEAD là gì hãy xem ở [đây](https://viblo.asia/p/mot-vai-lenh-git-huu-dung-3P0lPQoP5ox)


Cách trên thì nguy hiểm quá, như này dễ hơn nè =))
```
git reset HEAD^ -- path/to/file
git commit --amend --no-edit
```

# 5. Khi bạn commit nhầm vào một nhánh khác
Nếu chỉ có 1 commit ta có thể làm theo cách này:

```
# Get commit hash 

# Switched to destination branch
git checkout destination_branch

$ git cherry-pick <commit_hash>
```

Cách này không tốt ở chỗ ở nhánh commit nhầm vẫn còn commit đó, vì vậy cần mắc công quay lại xóa commit đó. Cách làm thế nào các bạn có thể xem bên trên

Mở rộng hơn 
# 6. Chuyển các commit từ branch này sang branch khác
Vậy với trường hợp thế này thì sao?
```
master A - B - C - D - E
```

-> 

```
newbranch     C - D - E
             /
master A - B 
```

Trường hợp đã có nhánh đó rồi

```
git checkout existingbranch
git merge master         # Bring the commits here
git checkout master
git reset --keep HEAD~3  # Move master back by 3 commits.
git checkout existingbranch
```

Trường hợp muốn cắt 3 commit kia sang nhánh mới
```
git branch newbranch      # Create a new branch, containing all current commits
git reset --keep HEAD~3   # Move master back by 3 commits (Make sure you know how many commits you need to go back)
git checkout newbranch    # Go to the new branch that still has the desired commits
# Warning: after this it's not safe to do a rebase in newbranch without extra care.
```

Như phía trên ta sử dụng cherry-pick để chuyển 1 commit vậy ta có thể áp dụng với nhiều commit được không? Tất nhiên là có rồi ta có thể thực hiện n lần cherry-pick cơ mà. Tuy nhiên ai lại làm thủ công thế, vì cherry-pick ta có thể sử dụng ranges(từ phiên bản Git 1.7.2)

Giả sử ta ta có 
```
C commit: 9aa1233
D commit: 453ac3d
E commit: 612ecb3
```

Thì ta có thể sử dụng

```
git checkout newbranch
git cherry-pick 612ecb3~1..9aa1233

# git cherry-pick applies those three commits to newbranch.
```

# 7. Đặt lại author là tên mình khi làm việc trên máy người khác
Ta thêm option `author` vào commit như sau
```
git commit --author="Name <email>" -m "commit message"
```

Nếu đã nhỡ commit rồi muốn sửa lại thi ta có thể sử dụng
```
$ git commit --amend --author="Name <email>" -m "commit message"
```

# 8. Nhỡ tay xóa commit và muốn khôi phục lại
* Khi bạn nhỡ tay `git reset --hard HEAD~1` và phát hiện ngay thì chỉ cần sử dụng ngay `git reset --hard HEAD@{1}`

* Còn không thì hãy bình tĩnh xem lịch sử các commit bằng lệnh `git reflog`
Sau đó tìm commit muốn phục và khôi phục bằng lệnh `git reset --hard <commit_hash>`

# 9. Khi lỡ tay xoá mất branch và muốn lấy lại
Khi bạn đã commit rồi thì chứ yên tâm sẽ chẳng bao giờ có thể mất được code đâu chứ bình tĩnh =))
Đầu tiên hãy xem lại hết lịch sử commit bằng cách `git reflog` hãy tìm commit bạn đã commit ở branch bạn xóa, sau đó sử dụng `git branch <new_branch> <commit_hash>` ta có thể thay commit hash bằng HEAD@{n}

# 10. Sau khi merge mà không tự tin lắm muốn trở lại trước lúc merge
 ```
 git reset --hard ORIG_HEAD
 ```
 Cách trên cũng áp dụng được với rebase , hoặc không thì ta có lại sử dụng đến `git reflog` sau đó `git reset --head <commit_hash>` để tìm lại commit cuối cùng của branch trước khi merge hoặc rebase
 
 * Trong khi merge hay rebase nếu thấy không ổn hơi nhiều mà chán quá không muốn nữa thì dùng `git merge --abort` hay `git rebase -- abort` các bạn nhé.
 # 11. Gộp các commit trong một branch và merge vào một nhánh khác
 Ví dụ merge branch `issue` gồm nhiều commit vào branch `master`
```
# Switched to branch 'master'
$ git checkout master
$ git merge --squash issue
```
Lệnh này giống với cái nút merge trong option `squash` trên github web

# 12. Khi tạo một nhánh từ nhánh A nhưng đổi ý muốn nhánh đó phải được tạo từ nhánh B
Giả sử nhánh cần tạo là C

Cách 1:
Cách nghĩ tới đầu tiên là xóa nhánh đó đi `git branch -d <branch_name>` hoặc `git branch -D <branch_name>`
```
The -d option stands for --delete, which would delete the local branch, only if you have already pushed and merged it with your remote branches.
The -D option stands for --delete --force, which deletes the branch regardless of its push and merge status, so be careful using this one!
```
Sau đó checkout sang nhánh B và tạo nhánh C

Cách 2 nhanh hơn: Ta checkout sang nhánh B sao đó sử dụng `git checkout -B <branch_name>`

# 13. Nhỡ pull về mà conflic nhiều quá, fix không nổi nản quá muốn trở lại =))
Sử dụng lệnh pull `git pull origin master`
Sau đó conflic nhiều muốn trở lại bạn có thể dùng 1 trong 2 lệnh
 ```
 git merge --abort
 or
 git reset --hard ORIG_HEAD 
 ```
 
 # 14. Khi bạn muốn change base
 
 ```
 (commit 1) - master
                \-- (commit 2) - (commit 3) - demo

Và bạn muốn change base nhánh PRO từ demo sang master

(commit 1) - master
                |-- (commit 2) - (commit 3) - demo
                \-- (commit 4) - (commit 5) - PRO
 ```
 
 Ta có thể dễ dàng làm việc này với lệnh này
 ```
 git rebase --onto newBase oldBase feature/branch
 ```
 
 Với ví dụ trên ta sẽ làm thế này
 
 ```
git checkout PRO # Just to be clear which branch to be on.
git rebase --onto master demo PRO
 ```
 
 Lệnh này cũng rất hữu dụng khi bạn làm việc khi bạn phải base trên nhánh đang phát triển của một người khác(nhánh A), và nhánh đó sau đó được merge vào 1 nhánh khác (nhánh B), bạn sẽ phải đổi base từ nhánh A sang nhánh B.
 
 # Tổng kết
 Bài viết mang tính ghi chú và lưu lại những khó khăn cũng như sai lầm và cách giải quyết mình tìm được mong bạn đọc được nếu có cách giải quyết hay hơn hãy comment và chỉ cho mình với nhé. Bài viết sẽ được cập nhật qua nhưng lần mình gặp khó và có những pha ngu người với git =)) hi vọng nó sẽ không dài đến mức không thể kéo hết =))