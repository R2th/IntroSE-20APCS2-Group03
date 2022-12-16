Git là một khái niệm đã rất quen thuộc với những lập trình viên có kinh nghiệm. Những đối với những sinh viên mới ra trường, những người chưa có kinh nghiệm làm việc thì đây lại là một thứ khá là mới mẻ. Những kiến thức về Git là vô cùng quan trọng, và nếu bạn có thể nắm vững và sử dụng thành tạo Git thì sẽ để lại ấn tượng rất tốt với những nhà tuyển dụng  :smile:.

Vậy trước khi đi sâu vào Git, chúng ta hãy cùng tìm hiểu một vài khái niệm cơ bản trước nhé!
# Git là gì
Git là một hệ thống quản lý phiên bản phân tán. Hãy thử tưởng tượng bạn tham gia vào project gồm 5 lập trình viên, mỗi người sẽ được giao 1 task khác nhau. Và mỗi lần bạn muốn lấy những đoạn code mà teammate của mình code về để sử dụng, bạn lại phải cầm USB đi copy sau đó về thêm vào project của mình, như vậy sẽ tốn rất nhiều thời gian và cực kì dễ gây ra lỗi :sweat:. Nhưng Git đã giúp chung ta giải quyết được bài toán đó.

# Repository và Branch
## Repository
Repository hay còn gọi là kho chứa, được hiểu đơn giản là nơi sẽ lưu chữ tất cả những thông tin cần thiết để duy trì, quản lý project của bạn

Tất cả dữ liệu của Repository đều được chứa trong thư mục ẩn (`.git`) của thư mục project của bạn

Phân loại:

* Remote Repository: Là repository để chia sẻ giữa nhiều người
* Local Repository: Được đặt trên máy tính cá nhân, dành riêng cho bạn sử dụng

## Branch
Branch (nhánh) dùng để phân nhánh và ghi lại luồng của lịch sử. Việc bạn thay đổi code trên branch này sẽ không ảnh hưởng tới branch khác. Bạn cũng có thể kết hợp các nhánh lại với nhau (merge)

Phân loại:

* Local branch: Branch ở phía local, có thể được liên kết với branch trên remote
* Remote branch:  Branch ở phía remote. Branch này có thể fetch về local những không tạo thêm branch ở local

### Một vài câu lệnh làm việc với branch

* `git branch`: Hiển thị danh sách branch trên local
* `git branch -r`: Hiển thị danh sách branch remote có trên local
*  `git checkout <branch_name>`: Checkout sang 1 branch đã tồn tại trên local
* `git checkout -b <branch_name>`: Tạo và checkout sang branch mới trên local

#### 1. Xóa branch

##### Xóa branch phía local

* `git branch -d <branch_name>`
* `git branch -D <branch_name>` (force delete)


##### Xóa branch remote lưu trên local
* `git branch -d <remote_name>/<branch_name>`

**Lưu ý**: Phải checkout vào branch khác branch muốn xóa thì mới có thể xóa được

##### Xóa branch phía remote
* `git push <remote_name> --delete <branch_name>

**Lưu ý**: Phải checkout vào branch cùng branch trên remote thì mới có thể xóa được

#### 2. Push branch từ local lên remote
*  2 branch cùng tên: `git push <remote_name> <branch_name>`
*  2 branch khác tên: `git push <remote_name> <local_branch_name>:<remote_branch_name>`

# Rebase
## Rebase là gì
* Rebase là việc bạn sẽ áp dụng những commit mới nhất của 1 nhánh trên 1 nhánh khác, hiểu đơn giản là bạn gộp source code của 2 nhánh lại với nhau, và nếu có xung đột (conflict) thì sẽ xảy ra lỗi (vấn đề về conflict và fix conflict mình sẽ nói sau)
* Rebase cũng có thể sử dụng để gộp các commit thành 1

**Câu lệnh**: 

Giả sử mình có 2 brach là master và develop. Branch master sẽ có commit D, E mà develop không có. Đồng thời trong develop có commit F, G mà master không có. Nếu đang đứng trên develop

```
git rebase master
```

Còn nếu không thì sẽ là:

```
git rebase master develop
```

Mình sẽ ví dụ qua với hình minh họa cho dễ hiểu 1 nhé :smile:

Trạng thái ban đầu của 2 nhánh
![](https://images.viblo.asia/752a353c-66c3-425d-8e1b-211bc7b43bfb.png)

Sau khi rebase
![](https://images.viblo.asia/3a3d56ec-e8a6-4197-adea-721f6196cfb4.png)

## Fix conflict
Conflict chắc chắn là điều không tránh khỏi trong quá trình làm việc với Git.  Vậy nếu trong quá trình rebase hay merge mà bị conflict, thì hãy sửa lại những file bị conflict, sau đó  add lại các file đó với lệnh `git add`, tiếp đến dùng lệnh: `git rebase --continue`

## Gộp nhiều commit thành 1 commit duy nhất
Như mình đã nói ở trên thì rebase còn có tác dụng gộp những commit. Để gộp các commit, ta dùng lệnh:
```
git rebase -i <commit_end>
``` 
`<commit_end>` là id của commit cần gộp

hoặc ta có thể dùng lệnh:

```
git rebase -i HEAD~<number>
```
`<number>` sẽ là số commit bạn muốn gộp tính từ commit mới nhất (commit mới nhất sẽ là 1)

Trong text editor,  sử dụng pick|squash|fixup các commit cần gộp lại sau đó save file và thoát.



# Fetch
Khi bạn pull 1 nhánh từ trên remote về phía local, điều này đồng nghĩa với việc bạn sẽ thực hiện merge nhánh đó với nhánh hiện tại đang checkout. Nhưng nếu bạn chỉ đơn giản muốn kiểm tra nội dung của remote repository mà không muốn merge thì hãy dùng fetch.

Khi sử dụng fetch thì sẽ chỉ lấy được lịch sử mới nhất của remote repository. Bạn có thể xem được bằng cách checkout sang nhánh FETCH_HEAD sau khi fetch.

# Git stash
Khi mà bạn muốn lưu lại nhưng lịch sử thay đổi nhưng chưa commit thì hãy dùng git stash

Để lưu lại những thay đổi, ta dùng lệnh: `git stash save` hoặc `git stash`

**Câu lệnh**

*  Xem danh sách: `git stash líst`
*  Apply stash: `git apply stash@{index}`
*  Apply stash mới nhất và xóa nó: `git stash pop`
*  Xem nội dung: `git show stash@{index}`
*  Xóa stash: `git drop stash@{index}`
*  Xóa toàn bộ: `git stash clear`

# Git reset
Đây là 1 phần rất quan trọng đó. Có thể vào một ngày đẹp trời nào đó, bạn vô tình nghịch ngợm lung tung và làm mất code :cold_sweat:, nhưng đừng lo, bạn có thể dùng git reset để có thể đưa branch của bạn về 1 commit nào đó. Trước hết, bạn muốn xem lại lịch sử các commit của mình để có thể biết được id của các commit thì có thể sử dụng lệnh: `git reflog`

### Git reset 
Câu lệnh:
```
git reset <commit_id>
```

Chức năng:

* Di chuyển HEAD về vị trí commit reset
* Giữ nguyên tất cả các thay đổi của file đến vị trí hiện tại 
* Loại bỏ các thay đổi khỏi stage

### Git reset soft
Câu lệnh:
```
git reset --soft <commit_id>
```

Chức năng:

* Di chuyển HEAD về vị trí commit reset
* Giữ nguyên tất cả các thay đổi của file đến vị trí hiện tại 
* Giữ nguyên các thay đổi ở stage

### Git reset hard
Câu lệnh:
```
git reset --hard <commit_id>
```
Chức năng

* Di chuyển HEAD về vị trí commit reset
* Loại bỏ tất cả các thay đổi của file sau thời điểm commit reset 

# Cherry-pick
Cherry-pick dùng để checkout một commit tại branch nhất định về branch hiện tại

Nói chung chung như vậy cũng khá là khó hiểu, vậy mình sẽ đi vào 1 ví dụ cụ thể nhé.

Bạn đang ở trên repository local của bạn, có 2 nhánh là master và payment (làm tính năng thanh toán cho website). Để phát triển tính năng thanh toán, bạn cần có 2 hình thức thanh toán như sau:
* Thanh toán khi nhận hàng
* Thanh toán trực tuyến qua ngân hàng

Khi bạn vừa làm xong chức năng thanh toán khi nhận hàng, sếp yêu cầu bạn deploy lên VPS để khách hàng có thể kiểm tra. Vậy là chúng ta chưa hoàn thành được đủ các tính năng. Đây là lúc bạn có thể sử dụng cherry-pick. Giả sử lịch sử commit của bạn sẽ như sau:
```
commit 1: bắt đầu làm thanh toán khi nhận hàng
commit 2: hoàn thành thanh toán khi nhận hàng
commit 3: bắt đầu làm thanh toán trực tuyến
```

Vậy để đảm bảo khách hàng vẫn có thể sử dụng được chức năng thanh toán khi nhận hàng, bạn sẽ cần lấy commit 2 và áp dụng vào master

Đầu tiền
```
git checkout master
```

Sau đó
```
git cherry-pick commit3
```


# Kết luận
Trên đây là một vài kiến thức cơ bản mà mình nghĩ các bạn có thể nên biết. Mong rằng bài viết này có thể giúp ích cho các bạn :smiley: