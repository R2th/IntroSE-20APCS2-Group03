Tiếp nối series giải ngố về git, ở bài viết trước mình đã giải thích cho các bạn khá rõ ràng về cấu tạo bên trong một local repo của git gồm những gì, các commit được tạo ra như thế nào, chúng được lưu trữ ra sao trong local repo của chúng ta ( [Có thể đọc lại tại đây](https://viblo.asia/p/hieu-ro-hon-ve-git-qua-bai-toan-xay-dung-kho-hang-V3m5W1LEZO7) ).

Bài viết hôm nay mình muốn chia sẻ với mọi người về các khái niệm được coi là khá mù mờ, ít khi được đề cập đến rõ ràng khi mới tiếp cận với git, những vấn đề này đã gây không ít khó khăn cho mình khi mới làm quen với git và mình tin chắc rằng không ít bạn cũng sẽ cảm thấy như mình, vậy hãy bắt đầu đọc luôn nhé!

### 1. Git fetch ... thực sự fetch về đâu?
#### 1.1. Đặt vấn đề
Khi mới làm quen với git mình có 1 thắc mắc là `git fetch` và `git pull` khác gì nhau, các kết quả tìm kiếm được trên stackoverflow cũng như hỏi mọi người đều là 1 câu trả lời rất ez, nghe tưởng dễ mà nghĩ kĩ lại ko thấy dễ lắm: 

**Answer:** *Git fetch chỉ kéo về thôi còn pull thì kéo về xong rồi merge luôn! (what???)*

ậm ừ nghe thì cũng ok đấy nhưng cụ thể kéo về là kéo về đâu? nó nằm ở đâu? còn cái local repo của mình thì sao? cái kéo về và cái đang có ở local có bị xung đột hay không? thật là gây bối rối!
<br>
<br>
#### 1.2. Tổng quan về cấu trúc của GIT
Để trả lời được các câu hỏi này mình cần nhắc lại với mọi người rằng khi làm việc với git có 4 nơi cần được ghi nhớ:
* 1 là working directory ( hay cây thư mục nơi bạn làm việc, folder mà tại đó bạn trực tiếp mở lên từ editor và code trên đó)
* 2 là staged area hay index, là nơi bạn vứt những file đã thay đổi ở working directory vào trước khi thực hiện commit ( mục đích có lẽ là để xem xét lại những thay đổi chắc chắn đã đúng hay chưa, cân nhắc lần cuối trước khi commit).
* 3 là local repo ( hay cái kho lưu trữ toàn bộ code, các commit, branch,... của chúng ta)
* và 4 là remote repo, có thể hiểu là 1 kho chứa được vứt lên mây với mục đích chia sẻ, lưu trữ,...


Tuy nhiên ở đây ta sẽ tạm bỏ qua số 1 và 2 mà chỉ cần quan tâm đến 3 và 4 ( local và remote repo) vì đang cần xem xét thao tác `git fetch` sẽ xảy ra như thế nào.

![](https://images.viblo.asia/c3eeb500-130c-41fa-a063-db8895fb0a95.png)

#### 1.3. Cơ chế hoạt động
Hãy dựa vào hình trên để ví dụ cho trực quan, giả sử bạn đang làm việc trong 1 dự án có 1 repo github là `atom`, flow làm việc thông thường là fork `atom` về github của chúng ta bằng nút `fork` ở trên github sau đó clone nó về với local  bằng lệnh `git clone git@github.com:yourName/atom.git`. Lệnh `git clone` sẽ mang toàn bộ thư mục project về máy tính của chúng ta, tạo một local repo trên máy tính ( trong thư mục .git) trong đó bao gồm toàn bộ các branch, commit, ...và đặt tên cho remote repo chúng ta vừa clone về là `origin`. Sử dụng lệnh `git remote -v` sẽ thấy:
```
$ git remote -v
origin	git@github.com:yourName/atom.git (fetch)
origin	git@github.com:yourname/atom.git (push)
```
Tiếp tục, bây giờ ta muốn tạo một kết nối giữa repo gốc của dự án trực tiếp với máy tính của mình để tiện theo dõi những thay đổi của dự án bằng lệnh:
```
$ git remote add atom git@github.com:atomCompany/atom.git
```
Giờ gõ lại lệnh `git remote -v` xem có gì nhé:
```
$ git remote -v
atom	git@github.com:atomCompany/atom.git (fetch)
atom	git@github.com:atomCompany/atom.git (push)
origin	git@github.com:yourName/atom.git (fetch)
origin	git@github.com:yourname/atom.git (push)
```
Hiện tại ta đã có kết nới với 2 remote repo một là repo trên github của chúng ta tên là `origin` và repo trên github của dự án tên là `atom`. Trong khi bạn đang làm những task của mình thì những member khác trong dự án cũng đẩy những thay đổi của mình lên repo atom nên repo này sau một thời gian sẽ có rât nhiều thay đổi, các branch mới, code mới, ... và bạn muốn kéo hết cả repo atom về máy tính của mình nhưng độc lập với những thứ đang làm việc tại local, khi đó là lúc cần dùng `fetch`
```
$ git fetch atom
a1e8fb5..45e66a4 master -> atom/master
a1e8fb5..9e8ab1c develop -> atom/develop
* [new branch] some-feature -> atom/some-feature
```
một số thứ gần tương tự như trên sẽ xảy ra khi các bạn thực hiện fetch. **Tất cả những commit + branch mới fetch về từ atom đề được lưu hết trong folder object bên trong .git**, nhưng có bị chung đụng hay không thì câu trả lời là không!. Những commit đang được lưu tại local của bạn và những gì mới fetch về mặc dù đều nằm trong cùng 1 folder nhưng đã có 1 cơ chế để tách bạch chúng với nhau, có thể nói atom repo được fetch về là hoàn toàn độc lập với local repo của bạn. 

Để dễ hình dung, có thể nghĩ rằng trên local hiện tại đang có 2 phân vùng ( như kiểu ổ đĩa trên windows) 1 phân vùng là những gì mình đang làm việc và 1 phân vùng mới fetch từ atom về. Với phân vùng mới fetch về ta có thể kiểm tra được nó có bao nhiêu branch, các commit trên branch, có thể thực hiện merge một branch nào đó với 1 branch ở local của mình. 

Cơ chế đang được đề cập ở đây để tracking việc commit nào, branch nào thuộc về phân vùng nào là `branch refs`. Mở theo đường dẫn `.git/refs` có 2 folder là `heads` và `remote`, những gì dùng để giám sát local branch được lưu trong `.git/refs/heads` còn với các remote repo sẽ được lưu trong `.git/refs/remotes`
<br>
Tiếp tục mở `.git/refs/heads` sẽ thấy các file chính là tên của tất cả các branch trên local đang có
```
ls ./.git/refs/heads/
master
feature1
debug2
```
Mở `.git/refs/remotes` sẽ thấy các folder với tên chính là tên của cac remote repo, cụ thể ở đây có 2 folder:
```
ls ./.git/refs/heads/
atom
origin
```
Để tránh gây rối thì đến đây mọi người có thể hiểu được rằng trong `refs` là cơ chế để tracking những commit nào thuộc về phân vùng nào, mặc dùng chung 1 nhà nhưng khác phòng, đảm bảo hoàn toàn riêng tư.
<br>
<br>
Bonus thêm một chút, giả sử bây giờ chúng ta muốn lấy những thay đổi ở nhánh master trên atom vào với master ở local của mình thì sẽ làm sao nhỉ?
```
$ git checkout master
```
checkout chuyển nhánh về master của mình
```
$ git log atom/master
```
xem xét của một chút các commit trên master của atom
```
$ git merge atom/master
```
và merge master của atom với master trên local của ta

Hi vọng đến đây mọi người đã có một cái nhìn rõ hơn về **git fetch**, nếu có câu hỏi nào về phần này cứ comment nhé mình sẽ trao đổi cùng các bạn
### 2. Ngoài push, pull, merge, rebase thì còn gì quan trọng?
Mới làm quen với git thì ngoài việc tìm hiểu về cơ chế hoạt động của git cũng đủ làm các bạn bối rối rồi chứ chưa nói đến việc làm chủ được hàng chục, hàng trăm câu lệnh liên quan nữa. Mình chắc chắn rằng ai tiếp xúc với git cũng phải nắm được ít nhiều về các lệnh cơ bản như `push`, `pull`, `fetch`, `merge` hoặc thêm cả `rebase` nữa, nhưng... vâng chắc chắn mọi câu chuyện đều có nhưng...
<br>
<br>
Nhưng liệu như vậy đã đủ cho ta tự tin tương tác với GIT trong các thao tác thường ngày cũng như các tình huống xảy ra trong dự án, các lỗi làm ngớ ngẩn do 'lỡ tay' mà gây nên, vâng chắc chắn là chưa đủ. Có **2 lệnh rất quan trọng** mà mình đã từng bỏ qua trong giai đoạn đầu mới làn quen với git và nó đã gây cho mình không ít bỡ ngỡ trong các tình huống giải quyết sự cố, đó là **GIT checkout** và **GIT reset**. Đây có thể nói là 2 trong những công cụ hữu ích nhất cho các bạn, nếu chưa làm quen thì hãy tập làm quen ngay bây giờ đi nhé mọi người.
<br>
<br>
Cả 2 lệnh Git checkout và Git reset đều có **2 level (tạm gọi là level vì mình chưa nghĩ ra cách gọi nào dễ hiểu hơn) để tương tác, đó là tương tác ở level commit, và tương tác là level file**, tiếp tục đọc để hiểu rõ hơn nhé.
#### 2.1. Git checkout
Một trường hợp rất phổ biến để sử dụng checkout đó là việc tạo và chuyển branch, câu lệnh quen thuộc hay được sử dụng là `git checkout -b new-branch` và `git checkout branch`, đây chỉ là 1 case sử dụng nhỏ của lệnh checkout này, đúng như mình đã nói phía trên, checkout sẽ có 2 level tương tác:


|     Lệnh     | Level | Tác dụng |
| -------------| ------| -------- |
| git checkout |Commit      | Tạo và chuyển đổi giữa các branch, di chuyển HEAD về một commit bất kì (detachhead)    |
|git checkout| File  |Xóa bỏ những thay đổi với file ở working directory
<br>

**Với level commit:**

Giả sử bạn có 1 lịch sử commit như sau:
```
$ git log --oneline
272519d The last commit
ce81389 Commit one more time
6586599 Commit second time
64c24fc Commit message first time
```
Hiện tại HEAD của bạn đang ở commit mới nhất là `272519d Commit message first time`, bạn chợt nhận ra có gì đó sai lầm ở commit này mà sự sai phạm đó đã xuất hiện từ lâu rồi, giờ muốn kiểm tra lại xem từ commit nào bắt đầu xẩy ra dòng code ngu si đó, đơn giản dùng git checkout như sau: ( giả sử đó là commit thứ 2)
```
$ git checkout 6586599
Note: checking out '6586599'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at 6586599... Commit second time (#2)
```
Hiện tại HEAD của bạn đang trỏ vào commit 6586599, đây được gọi là trạng thái **detached HEAD**, khi ở trạng thái này nếu bạn tiếp tục sửa chữa thì những thay đổi của bạn sẽ không được lưu lại đâu nhé, nên hãy checkout sang một nhánh mới tại đây để tiếp tục làm việc hoặc chỉ là đơn giản kiểm tra xem xét có đúng là commit này là commit gây lỗi không rồi quay trở lại vị trí đầu tiên để fix nó.
<br>
**Với level File**

Đặt ra tình huống bạn code trên working directory tạo ra 10 file thay đổi, trong đó có 1 file A vô tình do các thao tác rake db gây nên những thay đổi cho file đó ra mà bạn không hề muốn commit file này, thay vì dùng tay xóa bỏ từng dòng thay đổi, rất dễ gây ra nhầm lần bạn hãy dùng:
```
$ git checkout path/to/fileA
```
Checkout ở level file sẽ discard những thay đổi của file ở working directory về như trạng thái của HEAD. Trong trường hợp giả sử muốn cho A quay về trạng thái trước HEAD 2 commit, hãy thực hiện như sau:
```
$ git checkout HEAD~2 path/to/fileA
```
sẽ đưa file A về trạng thái của 2 commit trước HEAD

Thêm một trường hợp nữa vô cùng hữu dụng để sử dụng git checkout, khi bạn lỡ tay commit rồi mới phát hiện ra trong đó có 1 file không nên xuất hiện ở đó, hãy kết hợp cả 2 cách trên
```
$ git checkout <commit hash> <path/to/file>

# tất nhiên để bỏ hẳn file đó ra khỏi commit vừa thực hiện, ta dùng:

$ git checkout HEAD path/to/fileA
```
Easy phải không nào, thao tác này sẽ giúp mang file từ commit mới nhất về một trạng thái mong muốn của bạn.
#### 2.2. Git reset
Tương tự như với checkout, `git reset` cũng có 2 level để sử dụng là git reset với commit và git reset với file
<br>


| Lệnh | Level | Tác dụng |
| -------- | -------- | -------- |
| Git reset     | Commit     |Reset trạng thái của branch về trạng thái của 1 commit nào đó xác định     |
|Git reset| File| Đưa 1 file ở trạng thái stage về working directory
<br>
**Với level commit:**

```
$ git checkout hotfix
$ git reset HEAD~2
```
Câu lệnh trên sẽ reset branch hotfix về trước commit mới nhất 2 commit, tuy nhiên cần lưu ý là chỉ xóa bỏ các commit chứ không xóa bỏ các thay đổi ở các file nhé mọi người, những thay đổi các bạn đã làm sẽ về lại working directory để bạn có thể thao tác lại từ  vị trí đó, tạo các commit mới chuẩn hơn, đúng ý hơn.

Trong trường hợp muốn về lại đúng vị trí mong muốn:
```
$ git log --oneline
$ git reset commit-hash
```
Kiểm tra log commit, chọn được mã commit mong muốn và reset branch về đó.

**Với level file:**

```
$ git reset path/to/file
```
sẽ đưa các file đã đưa vào staged về với working directory, hoặc cũng có thể dùng:
```
$ git reset HEAD~2 fileA
```
Sẽ đưa file A của bạn đang ở staged về trạng thái trước HEAD 2 commit

### 3. [To be continued ....](https://viblo.asia/p/nhung-dieu-khong-phai-ai-cung-noi-cho-ban-ve-git-part-2-GrLZDXrBZk0)