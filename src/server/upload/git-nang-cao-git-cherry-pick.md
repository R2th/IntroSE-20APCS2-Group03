# Vấn đề
Hôm nay, mình gặp một trường hợp là cần apply cùng 1 thay đổi(commit A) cho cả 2 branches trong project của mình. Chi tiết thì sẽ như thế này: 
Mình đang viết 1 feature A, và feature này cần phải  được apply vào trong 2 branches (giả sử là branch X và branch Y).
Và mình muốn chỉ 1 lần commit, nhưng sẽ apply vào cả 2 branches X và Y.

Ở 1 trường hợp khác: Giả sử mình đang làm chức năng quản lý User (CRUD user tương ứng sẽ có 4 commit) tại branch manage-users. Bỗng khách hàng yêu cầu là cần release gấp chức năng show user.  Nghĩa là mình cần merge code commit show user vào branch master.

# Giải quyết
Đôi khi, chúng ta chỉ muốn lấy **1 hay n commits từ 1 brach bỏ vào master**, hoặc **commit 1 lần và lên 2 branch**, thì việc mình nghĩ tới git merge hay rebase thì đôi khi quá dư thừa.

Vì sao mình lại nói như vậy:

Đối với git rebase/merged nó sẽ làm như thế nào? Vì đối với git merge, Git sẽ thực hiện áp dụng các thay đổi của commit mới nhất vào nhánh mình muốn merge. Rõ hơn chúng ta xem ví dụ và mô tả cụ thể:

Mình cần merge các thay đổi có trong branch feature-A và brach master
```
// Tại branch feature-A
git log --oneline
-> ...
    ...
-> commit hash: c1
    fisnish C1
-> commit hash: c2
    fisnish C2
-> commit hash: c3
    fisnish C3

// Tại brach master
git merge feature-A
```
Với lệnh này, Git sẽ lấy toàn bộ thay đổi trong commit C3 của brach feature-A đưa vào branch master.
Tức là, git merge và git rebase thường được áp dụng  đưa thay đổi của nhìu commit lên 1 nhánh khác.
Như vậy, rõ ràng **git merge** hay **git rebase** không thể giải quyết được.

Để giải quyết 2 trường hợp trên, chúng ta sẽ nghe đến 1 kỹ thuật của git support là **git cherry-pick**

# Git cherry-pick
Là một cách để checkout 1 commit bất kỳ tại 1 branch được chỉ định về branch hiện tại. Hay chính là git cherry-pick sẽ bốc thay đổi của 1 commit trên 1 nhánh nào đó áp dụng vào nhánh hiện tại.

#### Cú pháp
```
git cherry-pick [--edit] [-n] [-m parent-number] [-s] [-x] [--ff]
		  [-S[<keyid>]] <commit>…
git cherry-pick --continue
git cherry-pick --quit
git cherry-pick --abort
```

Cùng xem thao tác cụ thể nào:
#### Lấy 1 commit từ 1 branch bỏ vào master
```git
git checkout master

git cherry-pick feature-A~1

# Hoặc chúng ta có thể chỉ định hash commit
git cherry-pick C2

```
Quá đơn giản nhỉ, trên đó, nghĩa là ta đã đưa thay đổi của commit C2 thuộc branch feature-A vào branch master


#### Lấy n commits từ 1 brach bỏ vào master
Giả sử, bây giờ mình cần đưa n commits (giả sử ở đây là 2 commits) thì mình làm như sau:
```
# Nếu muốn thêm 1 vài commit, không liên tục
git cherry-pick commit_id1 commit_id3

# Nếu muốn thêm 1 loạt commit lần lượt cạnh nhau
git cherry-pick commit_id1...commit_id5

# Với code trên, thì  commit_id1 sẽ ko được thêm vào
# Để đưa commit được tính vào trong branch muốn thêm thì 
git cherry-pick commit_id1^..commit_id5
```


#### 1 lần commit cho cả 2 branches
Commit A cần apply cho 2 branchres là branch-X và branch-Y
``` git
# Đang ở branch-X, thực hiện commit để tạo ra commit A
git add -A
git commit -m " finish commit A"

# Checkout sang branch Y và dùng cherry-pick nào
git checkout branch-Y
git cherry-pick branch-X
```
Với lệnh này, cherry-pick sẽ lấy commit cuối cùng ở branch branch-X và merge vào branch branch-Y

#### Fix conflict
Cũng như **git merge hay rebase, git cherry-pick** cũng xãy ra conflict nếu xung đột code. việc của chúng ta chỉ đơn giản là fix conflict sau đó dùng:
```
git add .
git commit
```
Như vậy là done.
# Tham khảo
Bài viết được tham khảo từ nhiều nguồn trong đó có nguồn chính là https://git-scm.com/docs/git-cherry-pick & https://backlog.com/git-tutorial/vn/stepup/stepup7_4.html