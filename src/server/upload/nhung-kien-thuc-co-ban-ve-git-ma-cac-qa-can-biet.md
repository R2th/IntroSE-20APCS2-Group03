# I. Tổng quan về GIT

Git là tên gọi của một Hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS) là một trong những hệ thống quản lý phiên bản phân tán phổ biến nhất hiện nay. 
 DVCS nghĩa là hệ thống giúp mỗi máy tính có thể lưu trữ nhiều phiên bản khác nhau của một mã nguồn được nhân bản (clone) từ một kho chứa mã nguồn (repository), mỗi thay đổi vào mã nguồn trên máy tính sẽ có thể ủy thác (commit) rồi đưa lên máy chủ nơi đặt kho chứa chính. Và một máy tính khác (nếu họ có quyền truy cập) cũng có thể clone lại mã nguồn từ kho chứa hoặc clone lại một tập hợp các thay đổi mới nhất trên máy tính kia. Trong Git, thư mục làm việc trên máy tính gọi là Working Tree.
⇒  Lưu lại các phiên bản của những lần thay đổi vào mã nguồn và có thể dễ dàng khôi phục lại dễ dàng mà không cần copy lại mã nguồn rồi cất vào đâu đó.
GIT và GIT HUB
* Git là tên gọi của một mô hình hệ thống, các máy tính có thể clone lại mã nguồn từ một repository. 
* Github chính là một dịch vụ máy chủ repository công cộng, mỗi người có thể tạo tài khoản trên đó để tạo ra các kho chứa của riêng mình để có thể làm việc.

**Ưu điểm của GIT**
* Git dễ sử dụng, an toàn và nhanh chóng.
* Có thể giúp quy trình làm việc code theo nhóm đơn giản hơn rất nhiều bằng việc kết hợp các phân nhánh (branch).
* Bạn có thể làm việc ở bất cứ đâu vì chỉ cần clone mã nguồn từ kho chứa hoặc clone một phiên bản thay đổi nào đó từ kho chứa, hoặc một nhánh nào đó từ kho chứa.
* Dễ dàng trong việc deployment sản phẩm.

# II. Làm việc với Git

### **Branch**
Tại sao phải dùng branch?

Khi làm việc với git chúng ta luôn có một nhánh chính gọi là “master” - nó là nhánh chứa toàn bộ mã nguồn chính trong repository, và nếu muốn chỉnh sửa mã nguồn mà không muốn làm thay đổi mã nguồn hiện tại thì làm cách nào? 
Branch trong git sẽ giúp chúng ta chuyển sang một nhánh làm việc khác mà không làm ảnh hưởng đến mã nguồn hiện có trên nhánh master.
	Các thao tác với branch:
- 	Để tạo một branch chúng ta sử dụng lệnh: “git branch tên_branch” và để kiểm tra chúng ta gõ lệnh “git branch” thì sẽ xuất hiện branch vừa tạo.
- 	Checkout một branch là chuyển sang một branch khác để làm việc với lệnh: “git checkout tên_branch”
Ngoài ra, bạn có thể tạo một branch mới trực tiếp từ lệnh checkout bằng cách: “git checkout -b tên_branch”. 

Mỗi khi thực hiện lệnh checkout vào branch nào đó thì toàn bộ mã nguồn trên working tree sẽ được đổi sang môi trường dành cho branch đang checkout.
- 	Merge dữ liệu từ một branch:

Khi chúng ta muốn áp dụng mã nguồn ở một branch cho một branch khác thì chúng ta làm cách nào?
Trước tiên dữ liệu ở branch cần merge phải đã commit, sau đó chúng ta phải ở tại branch chúng ta muốn merge dữ liệu vào đó (checkout tới branch đó). Cuối cùng sử dụng lệnh: “git merge tên_branch”.  

Ví dụ muốn merge dữ liệu từ branch “a” vào “master” ta gõ thực hiện các bước:
**git checkout master**
**git merge a**

- 	Xóa branch:
Sau khi dữ liệu đã được merge vào nhánh master chúng ta có thể xóa branch đó đi với lệnh: “git branch -d tên_branch. Nếu chưa gộp dữ liệu với master thì chúng ta không thể xóa branch đó.

- Remote branch:

Lấy dữ liệu về từ remote branch:
Khi bạn có một remote repository, bạn có thể xem toàn bộ các branch của remote đó bằng lệnh: “git remote show tên_remote” 

Sau đó bạn có thể chọn một trong các remote branch đã show ở trên để lấy dữ liệu về bằng lệnh “git pull tên_remote tên_remote_branch”

Ví dụ bạn có remote là “hoadc” và nó có branch là “hoa1; hoa2”. Bạn muốn lấy dữ liệu từ remote branch “hoa1” về local branch “hoa_branch_local”. Các bước như sau:
**git remote show hoadc**
**git checkout hoa_branch_local**
**git pull hoadc hoa1**

### **Commit**

 - Như mọi người đã biết, thì với Git có 3 khu vực làm việc chính: Trên máy tính cá nhân, trên kho chứa mã nguồn(repository) và khu vực trung gian(staging area). Staging area là khi vực sẽ lưu trữ những thay đổi của bạn trên tập tin để nó có thể commit được, vì muốn commit được tệp tin của bạn phải nằm trong Staging area.
Vậy commit là gì và nó hoạt động ra sao?
 - Hiểu đơn giản, commit nghĩa là một hành động để Git lưu lại một bản chụp của các sự thay đổi trong thư mục làm việc, và các tệp thư mục được thay đổi đã phải nằm trong Staging area. Mỗi lần commit nó sẽ lưu lại lịch sử chỉnh sửa của mã nguồn kèm theo tên và địa chỉ email của người commit. Ngoài ra bạn có thể khôi phục lại tập tin trong lịch sử commit của nó để chia cho một branch khác, điều này sẽ dễ dàng cho khôi phục lại các thay đổi trước đó.
Lệnh commit trong Git sẽ là: git commit -m "Lời nhắn"
Và nếu bạn muốn đưa tập tin lên repository thì chắc chắn bạn phải commit nó trước rồi mới dùng lệnh để push mã nguồn lên(git push origin master: đưa toàn bộ tập tin đã commit lên repository).
- Tệp tin trong git sẽ có 2 trạng thái: Tracked và Untracked: 
 + Có thể đưa tệp tin từ Untracked --> Tracked bằng câu lệnh: git add tên_file
 + Hoặc đưa tệp tin từ Tracked về Untracked bằng câu lệnh: rm tên_file(chú ý: câu này sẽ xóa file hiện tại trong thư mục project, nhưng không xóa trong ổ cứng, nghĩa là có thể khôi phục lại bằng câu lệnh: git reset id_log).
Tracked là tệp tin là được đưa vào Staging area và đang được theo dõi. Còn Untracked nghĩa là không đụng tới nó và sẽ không làm việc với nó. Lúc commit mà tệp tin còn chưa Tracked, tất nhiên bạn sẽ không commit được.
Remote
Thông thường khi làm việc chúng ta thường thao tác nhiều trên local repository, nhưng khi làm việc ở nhiều máy (ở văn phòng, ở nhà,...) hay với một nhóm nhiều người thì chúng ta cần sử dụng một repository ở sever được gọi là Remote repository. Một dịch vụ remote repository thông dụng đó là github. Chúng ta có thể tạo một remote repository trên github rồi clone về máy tạo thành một local repository để làm việc và khi cần thì đẩy mã nguồn lên remote.

Khi bạn clone một repository về máy thì tên remote mặc định là “origin”.  Để kiểm tra tên remote thì bạn gõ lệnh “git remote -v”.

ví dụ:
**$ git remote -v**
origin  https://github.com/caohoa13/Test.git (fetch)
origin  https://github.com/caohoa13/Test.git (push)

“origin” là tên remote trong local, còn https://github.com/caohoa13/Test.git là địa chỉ của remote repository trên server.

Để đổi tên remote đang có chúng ta dùng lệnh: “git remote rename tên_cũ tên_mới”.

Ví dụ:
**$ git remote rename origin hoadc**
**$ git remote -v**
hoadc   https://github.com/caohoa13/Test.git (fetch)
hoadc   https://github.com/caohoa13/Test.git (push)

Bây giờ tên remote đã đổi thành hoadc.

Để thêm một remote ta dùng lệnh: “remote add tên_remote url”

Ví dụ:
$ git remote add addremote https://github.com/hoadc/AddRemote.git
$ git remote -v
addremote       https://github.com/hoadc/AddRemote.git (fetch)
addremote       https://github.com/hoadc/AddRemote.git (push)
hoadc   https://github.com/caohoa13/Test.git (fetch)
hoadc   https://github.com/caohoa13/Test.git (push)

Các lệnh thường sử dụng:

Ở mỗi ví dụ trên ta thấy mỗi remote repository bạn sẽ có 2 hành động là fetch - lấy giữ liệu từ server  và push - đẩy dữ liệu lên server.  Việc lấy dữ liệu về từ server ngoài fetch ra chúng ta còn biết tới clone và pull. Vậy sự khác nhau giữa chúng là gì?

git clone: lệnh này chúng ta sao chép toàn bộ dữ liệu repository bao gồm cả thông tin thiết lập của repository đó về máy của bạn. Nên sử dụng khi tạo một repository mới trong local. 

git pull: lệnh này sao chép toàn bộ dữ liệu repository ở server về máy tính của bạn đồng thời merge chúng với nhánh mà bạn đang làm việc
“git pull tên_remote tên_branch”

git fetch: lệnh này cũng sao chép toàn bộ dữ liệu từ repository về máy nhưng nó không tự động merge mà cho phép bạn merge thủ công.
“git fetch tên_remote”

git push: lệnh này dùng để gửi dữ liệu lên remote repository, “git push tên_remote tên_branch”.

# III. Một vài sự cố khi làm việc với Git và cách khắc phục

Remove a file from git without removing it from your file system
Nếu bạn không cẩn thận trong khi git add, bạn có thể sẽ thêm các tệp mà bạn không muốn commit . Tuy nhiên, git rm sẽ xóa nó ra khỏi trạng thái staging, cũng như hệ thống tệp của bạn, có thể không phải là thứ bạn muốn. Trong trường hợp đó, hãy đảm bảo bạn chỉ xóa khỏi trạng thái staged và thêm tệp vào .gitignore của bạn để tránh mắc lỗi tương tự lần thứ hai.
git reset filename          # or git remove --cached filename
echo filename >> .gitingore # add it to .gitignore to avoid re-adding it

### 2. Edit a commit message

khi bạn commit, làm như thế nào để sửa message trong commit của bạn,thật rất dễ dàng để sửa chúng.
git commit --amend                  # start $EDITOR to edit the message
git commit --amend -m "New message" # set the new message directly
Nhưng đó không phải là tất cả các sửa đổi git có thể làm cho bạn. Bạn đã quên git add một tệp chưa? Chỉ cần add nó và amend commit trước đó!
git add forgotten_file 
git commit --amend
git commit --amend sẽ tạo ra một commit mới sẽ thay thế commit trước đó vì thế đừng sử dụng nó để thay đổi commit đã được push lên repository. Một ngoại lệ cho quy tắc này có thể được thực hiện nếu bạn hoàn toàn chắc chắn rằng không có developer nào khác đã kiểm tra phiên bản trước và dựa trên công việc của riêng họ trên đó, trong trường hợp đó, việc ép buộc (git push --force) có thể vẫn ổn. Tùy chọn --force là cần thiết ở đây vì lịch sử của cây đã được sửa đổi cục bộ có nghĩa là thao push sẽ bị từ chối bởi máy chủ từ xa vì không thể fast-forward merge trước đó.
3. Khi đã lỡ tay commit một số file thừa nhưng sau khi nghĩ lại thì nên ignore thì hơn
Trường hợp commit xoá
Nếu có những phần thừa thì ta xoá đi rồi thêm vào ignore

### Đầu tiên là xoá các file đã commit khỏi repository
$ git rm --cached <tên file>

### Sau đó là thêm vào gitignore
$ echo '<tên file>' >> .gitignore


Trường hợp muốn coi như là chưa từng có file đó
Khi mà bạn muốn: "Hả, file nào cơ, là gì có file nào như thế ?"
### Trường hợp chỉ xoá khỏi lịch sử commit （để lại ở working tree）
$ git filter-branch -f --index-filter 'git rm --cached -rf --ignore-unmatch <tên file>' HEAD

### Trường hợp xoá khỏi lịch sử commit và cả ở working tree
$ git filter-branch -f --index-filter 'git rm -rf --ignore-unmatch <tên file>' HEAD

4. Khi mà tên branh bạn đặt quá là "chuối"
Nếu không ai nhìn thấy thì ta "bí mật" sửa lại tên branch thôi nào !
$ git branch -m <tên branch sau khi đổi>

5. Khi trong phút nông nổi bạn lỡ commit và giờ muốn commit đó biến mất
Không để cho ai biết （＝ người khác vẫn chưa pull về）
Sửa lại phần lịch sử commit ngay trước đó
### Tuỳ vào từng trường hợp mà ta có 3 cách sau để đưa lịch sử commit về như cũ

### 1. Chỉ đưa HEAD về như cũ
$ git reset --soft HEAD~

### 2. Đưa HEAD và index về như cũ
$ git reset HEAD~

### 3. Đưa cả index, working tree về 1 commit trước đó
$ git reset --hard HEAD~


Trường hợp đã bị ai đó phát hiện（＝ người khác đã pull về）
Nếu thay đổi lịch sử commit sẽ dẫn đến tình trạng lộn xộn nên ta cầm dùng commit xoá để giải quyết
$ git revert <commit>
    
### 4. Khi lỡ tay xoá mất một commit cực kì cực kì quan trọng
Đây hẳn là sự cố khủng khiếp nhất. Có thể xảy ra khi lỡ tay git reset --hard Tuy nhiên, commit nào cũng có thể hồi phục được
Đầu tiên là xem lại toàn bộ lịch sử commit
$ git reflog
Từ đó chọn commit muốn phục hồi và khôi phục lại
ví dụ）git reset --hard HEAD@{2}
$ git reset --hard <commit>

### 5. Khi lỡ tay xoá mất branch và muốn lấy lại
Nếu vẫn còn reflog thì không có sao. Vẫn có thể hồi phục lại được Nếu commit lên một branch không tên, sau đó check out sang một branch khác bị xoá mất thì cũng tương tự
Tương tự giống như sự cố 13 dưới đây
Đầu tiên là xem lại toàn bộ lịch sử commit
$ git reflog
Từ các commit này, chọn rồi tạo branch mới
ví dụ）git branch new-branch HEAD@{2}
$ git branch <tên branch> <commit>
    
### 6. Cho dù đã push nhưng vẫn không phản ánh trên remote repository
Tạo mới repository, rồi clone, rồi tạo local repository, và ở trên local repository đó rồi thực hiện push thì cũng có trường hợp log như bên dưới được xuất ra.
$ git push
No refs in common and none specified; doing nothing.
Perhaps you should specify a branch such as 'master'.
Everything up-to-date
Cái này là do trên remote branch thì master branch chưa được tạo ra. Trường hợp tham số khi push được tĩnh lược thì mặc định là branch tồn tại ở cả 2 remote repository với local repository sẽ trở thành đối tượng. Chính vì vậy, trường hợp thực hiện push branch không tồn tại trong remote repository thì cần thiết phải chỉ định rõ repository và branch.
$ git push -u origin master
Khi thực hiện push 1 lần thì master branch sẽ được tạo ra, do đó những lần push sau thì cũng có thể tĩnh lược việc chỉ định repository và branch.

### 7. Muốn tìm kiếm commit bao hàm bình luận đặc định
$ git log --grep "<pattern>"
Chỉ hiển thị những commit bao hàm commit log có chứa những ký tự được thiết lập trong <pattern>
    
### 8. Stash trước khi thay đổi branch
Quy trình làm việc của một lập trình viên phần mềm hiếm khi bằng phẳng. Người dùng có thể bị gây khó khăn khi báo cáo lỗi vô cớ, các manager có quyền ưu tiên cho các task khác so với task bạn đã chọn để thực hiện và có thể thay đổi ý định về những gì bạn muốn làm.
Ví dụ, bạn có ba tệp commit để phát hành và một tệp thứ tự trong một state được thay đổi nhưng không hoạt động. (Lệnh git status sẽ cho bạn biết tất cả những điều này nếu bạn không nhớ ở đâu). Đột nhiên bạn cần làm việc để sửa lỗi trong một phiên bản production. Bạn cần phải thay đổi branch ngay, nhưng bạn không thể. Thư mục làm việc của bạn “bẩn” và bạn không muốn hoang phí công sức suốt 2 tiếng.
Nhập git stash. Cuối cùng! Bây giờ bạn đã có tất cả các thay đổi được lưu trữ trong branch WIP (đang tiến hành) và bạn có thể chuyển sang production branch từ thư mục “sạch” của bạn. Khi bạn hoàn thành với điều đó, hãy chuyển về nơi của bạn với git stash apply.
https://backlog.com/git-tutorial/vn/reference/stash.html

# IV. Làm thế nào để KHÔNG bị conflict khi làm việc với Git

### 1. Chia công việc để tránh conflict khi merge code
Conflict có thể xảy ra ở một module chung mà mọi người trong team cùng dùng và chỉnh sửa. Cách đơn giản để xử lý conflict là so sánh. Bạn sẽ luôn có 1 bản clone và 1 bản dev, khi bắt đầu merge hay rebase thì bạn copy nguyên cái gốc (ở bản clone mới nhất), sau đó update phần bạn làm ở phía cuối.
Với mỗi function sẽ có những sub-function khác nhau, mọi người trong team nên biết cách phân chia công việc sao cho mỗi người làm một việc cụ thể, hạn chế tối đa việc hai hay nhiều người cùng thao tác trên một file.
Với những file dùng chung thì nên thống nhất cách đặt tên biến, hàm … và một khi người nào muốn cập nhật file dùng chung như thêm, sửa, xóa … thì nên confirm hoặc thông báo với những người còn lại để mọi người cùng nhận thức được và có xử lý phù hợp tránh để xảy ra conflict

### 2. Thực hiện pull trước khi push
Khi bạn pull, git sẽ tìm nạp các cam kết trên origin và sẽ cố gắng fast-forward cam kết cục bộ của bạn ở trên cùng, thực hiện hợp nhất. Sau đó, bạn có thể push theo cách này, bạn sẽ không tạo xung đột với các cập nhật khác.
 Trước khi bắt đầu một thay đổi nào đó, bạn nên chủ động pull code về trước. Điều này giúp bạn có được phiên bản code mới nhất, bạn sẽ biết được có hay không sự thay đổi tại các file mà bạn sẽ thao tác

### 3. Merge liên tục để tránh tồn đọng code gây ra conflict
Merge code liên tục cung cấp phiên bản code mới nhất của bạn cho tất cả các thành viên trong nhóm dự án, mọi người đều có thể lấy về và tiếp tục làm công việc của họ mà không sợ gây ảnh hưởng cho bạn
Người khác merge code liên tục sẽ cung cấp code mới cho bạn khi pull về liên tục. Điều này đồng nghĩa với việc bạn luôn luôn có phiên bản code mới nhất như mong muốn
### 
### 4.  Define một flow riêng để làm việc
git status > git add > git commit > git stash > git pull --rebase > gitk > git push > git stash pop