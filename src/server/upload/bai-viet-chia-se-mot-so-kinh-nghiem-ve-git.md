## Giới thiệu
Đôi lời đầu tiên mình xin giới thiệu qua về lý do bạn lên cần sử dụng **Git**, và **Git** sẽ giúp đỡ bạn trong công việc quản lý code như thế nào. Vậy chúng ta cùng bắt đầu nhé :).

Đầu tiên hãy tưởng tượng vào một ngày mưa bạn xóa, thay đổi một đoạn code vì một số lý do nào đó chương trình vẫn chạy bình thường, chẳng hạn như do chương trình đang lưu cache vì vậy nên nó vẫn chạy, bạn nghĩ rằng chương trình hoạt động rất tốt. Nhưng trước ngày phải mang ra thuyết trình bạn test lại chương trình thì bất ngờ nó bug, bây giờ ngày thuyết trình thì gần kề, chương trình của bạn thì tương đối lớn, và bạn không thể nhớ nổi mình đã sửa nhưng cái gì. Vâng không cần nói thì đó đúng thật là một thảm họa. Đây là một trong các lý do bạn nên sử dụng **Git**, ngoài ra **Git** còn giúp bạn

   - Lưu lại các phiên bản khác nhau của mã nguồn mã nguồn dự án phần mềm
   - Khôi phục lại mã nguồn từ một phiên bản bất kỳ
   - Dễ dàng so sánh giữa các phiên bản
   - Phát hiện được ai đã sửa phiên bản vào thời gian nào làm phát sinh bug
   - Khôi phục tập tin đã mất
   - Dễ dàng phát triển tính năng mới của dự án mà không làm ảnh hưởng tới phiên bản chính `master branch`
   
Cuối cùng là một trong những chức năng mình cảm thấy quan trọng nhất của **Git**, khi bạn làm việc nhóm thì thật sự quản lý là một cái gì đó rất lan giải, bạn có thể có kế hoạch tốt nhưng nếu bạn không kiểm soát tiến độ, chất lượng của từng đoạn code thì khó mà bạn có một dự án thành công, còn chưa kể lỡ như một thành viên thay đổi dù chỉ là một đoạn code nhỏ và dẫn tới chương trình bị bug, thật khó để bạn kiểm soát nó. Thay vì quản lý thủ công và soát từ đầu đến cuối bạn lên sử dụng **Git**. Khi mỗi thành viên đẩy code của họ lên chương trình chung bạn kiểu soát và check được, nếu có phát sinh lỗi bạn có thể yêu cầu thành viên chỉnh sửa đến khi khắc phục được thì bạn mới thực hiện `merged` vào chương trình trung của nhóm việc này sẽ tiết kiệm được rất nhiều thời gian sau này, và bạn có thể kiểm soát được tốc độ phát triển của dự án.
## Các khái niệm cơ bản trong GIT
### 1. Repository
Trong **Git**, Repository là nơi lưu trữ, quản lý các thông tin cần thiết VD như: Thư mục, file code vv... và những thông tin cần thiết để duy trì và quản lý các sửa đổi và lịch sử dự án.<br>
Repository của **Git** được phân thành 2 loại là `remote repository` và `local repository` <br>
- **Remote repository**: Là repository được lưu trữ trên server chuyên dụng, và có thể chia sẻ với mọi người 
- **Local repository**: Là repository lưu trữ trên máy tính cá nhân và được quản lý hoàn toàn bởi người code đó


Do tính chất của repository ở trên bạn hoàn toàn có thể thực hiện các giai đoạn phát triển ở `local repository` của mình, khi đạt được một số mục tiêu nào đó bạn có thể đẩy lên `remote repository` để công khai, chia sẻ. Khi đẩy lên remote repository thì bạn và mọi người có thể tiến hành lấy về nội dung, phần này mình xin phép chia sẻ ở phần sau.<br>
**Tạo repository:** Theo 2 phần của repository là `local repository` và `remote repository` thì sẽ có các cách để tạo repository như sau.
* Tạo **local repository** <br>
```js
git init
```
Cậu lệnh sẽ giúp bạn tạo ra một thư mục ẩn `.git` khi bạn đặt code, thư mục nằm cùng với thư mục này thì **Git** mới có thể thực thi lưu trữ, giám sát vv…
* Kéo một **remote repository** từ một nguồn bất kỳ <br>

Đầu tiên bạn cần có một tài khoản **github**, một dự án **git** mà bạn muốn làm việc <br>
Tiếp theo bạn nhấn vào nút **fork** ở trên cùng bên phải của git và copy link tại phần **clone or download**<br>
Tiếp theo bạn vào **terminator** (chú ý: bạn nhớ chú ý đến đường dẫn file thư mục của nơi chứa git của mình) và thực hiện câu lệnh:
```js
git clone <và_link_mà_bạn_bừa_fork_về>
```
**Chú ý nhỏ:** Nếu bạn đang cố tìm các thư mục ẩn các bạn có thể thực hiện theo các sau: view->show hidden files(ctrl+h)
### 2. Branch
* Branch là cái dùng để phân nhánh và ghi lại luồng của lịch sử. Branch đã phân nhánh sẽ không ảnh hưởng đến branch khác nên có thể tiến hành nhiều thay đổi đồng thời trong cùng một repository. Hơn nữa, branch đã phân nhánh có thể chỉnh sửa tổng hợp lại thành một branch bằng việc hợp lại với branch khác<br>
* Khi đã phân nhánh thì các branch sẽ làm việc độc lập, khi bạn chỉ sửa một branch thì các branch khác không bị ảnh hưởng<br>
* Câu lệnh để tạo một branch mới:
```js
git branch <branch_name>
```
hoặc bạn có thể sử dụng câu lệnh (câu lệnh sẽ tạo một bản sao của branch bạn đang đứng):
```js
git checkout -b <branch_name>
```
* Khi bạn tạo một repository thì **Git** sẽ thiết lập một branch mặc định có tên là `master`, thường thì branch này bạn không lên đẩy code vào mà đấy sẽ là nơi chứa code mới nhất sau khi được `merged`<br>
* Có 2 loại branch gồm `local branch`: là branch lằm trên máy tính cá nhân, `remote branch` là branch lằm tại server
###  3. Làm thế nào để xóa một local branch,hoặc xóa một branch remote
Trong một số trường hợp cụ thể chúng ta cần phải xóa branch thì sẽ có một số lệnh như sau:
* Đối với **local branch**:
```js
git branch -d <tên_ branch>
```
Với cách xóa này, nếu branch cần xóa chưa được gộp thay đổi với branch khác sẽ lập tức báo lỗi vào yêu cầu gộp với branch khác trước khi thực hiện xóa
```js
git branch -D <tên_branch>
```
Với cách này thì branch chỉ định lập tức bị xóa kể cả trong trường hợp nó chưa được gộp với branch khác
* Đối với **remote branch**:
```js
git push --delete <tên_remote> <tên_ branch>
```
hoặc
```js
git push <ten_remote> --delete <branch_name>
```
### 4. Làm thế nào để push một branch ở local lên remote với một cái tên khác
Thường thì **local branch** trùng tên với **remote branch**, nếu bạn đang trường hợp này thì ta sẽ sử dụng lệnh:
```js
git push <tên_remote><tên_branch>
```
VD: Push một nhánh product của local lên nhánh product của remote
```js
git push origin product
```
Với trường hợp **local branch** khác tên với **remote branch**
```js
git push <tên_remote> <tên_local_branch>:<tên_remote_branch>
```
VD: Push một nhánh edit_product_1 của local lên nhánh product của remote
```js
git push origin eidt_product_1:product
```
### 5. Thế nào là git rebase, phân biệt git rebase với merged
* **Git rebase**: Là cách tích hợp nhánh này vào nhánh khác. Trên thực tết có 2 cách để tích hợp nhánh này vào nhánh khác là rebase và merged. Ví dụ nhỏ về rebase :) bạn code một chức năng mới trên một nhánh test và bạn muốn chạy thử chức năng mới, nhưng bạn cần các phần trước đó của đồng đội (vì thường một dự án sẽ được giao cho nhiều người mà đúng không :) ), rất may đồng đội bạn đã hoàn thành phần việc và được merged. Để bạn có code mới nhất của đồng đội mà không phải viết lại code của mình thì bạn hoàn toàn có thể rebase nhánh chứa code mới nhất vào nhánh của mình (thường thì mình sẽ để là developer)
* Câu lệnh rebase
```js
git rebase <tên_branch>
```
* Câu lệnh merged
```js
git merged <tên_branch>
```
![](https://images.viblo.asia/93a73f89-3e86-4902-a705-c4c64e355f7d.png)

Với việc merged sẽ gộp 2 comit cuối cùng của 2 nhánh với nhau nó giúp bảo toàn `history` của repo(VD: xem được commit này là của branch nào và sắp xếp các commit của branch sau các commit mới merged ...) và tránh được trường hợp rewire lại tất cả các changes. Còn rebase thì sẽ đưa toàn bộ các commit mới nhất của branch hiện tại lên đầu các commit mới ở master trong `history`
### 6. Thế nào là git fetch, Phân biệt fetch với pull
Khi thực hiện fetch, lệnh này truy cập vào repository trên server và kéo toàn bộ dữ liệu mà dự án của bạn chưa có về. Sau đó bạn có thể tích hợp vào branch vào bất cứ lúc nào
```js
git fetch <tên_remote><tên_remote_branch>
```
Ví dụ: Bạn muốn fetch từ branch product trên server về branch product trên local
```js
git fetch framgia product:product
```
Sự khác biệt cơ bản của fetch với pull là các thay đổi kéo về từ `remote server` git sẽ không tự động gộp code mà ta có thể thực hiện việc này sau khi đã review lại các thay đổi đó trước khi tiến hành `merged`, ngược lại hoàn toàn với fetch khi bạn pull về git sẽ tự động gộp code của bạn vì vậy rất dễ xuất hiện xung đột. Có thể nói một cách dễ hiểu `pull = fetch + merged` <br>
**Chú ý**: Khi sử dụng fetch các thay đổi được đẩy sang 1 nhánh khác ta có thể sử dụng lệnh 
```js
git branch -a
```
Để có thể xem được, đồng thời có thể checkout sang nhánh đó để xem các thay đổi
### 7. Thế nào là git stash
`git stash` được sử dụng để lưu lại các thay đổi do bạn tạo ra nhưng chưa commit, thường rất hữu dụng khi bạn muốn đổi sang 1 branch khác mà lại đang làm dở ở branch hiện tại <br>
*Một số lệnh liên quan đến git stash:*
* Để đưa toàn bộ các thay đổi vào trang thái stage
```js
git add
```
* Để lưu các thay đổi mà k cần commit
```js
git stash save
```
Hoặc
```js
git stash
```
* Xem các stash đã lưu
```js
git stash list
```
* Xem danh sách các stash đã lưu, trong trường hợp muốn xem nội dung thay đổi
```js
git stash list -p
```
* Xem nội dung stash
```js
git stash show stash@{<index>}
```
* Để apply stash gần nhất
```js
git stash pop
```
* Để xóa stash
```js
git stash drop stash@{<index>}
```
* Để xóa toàn bộ stash
git stash clear
### 8. Làm thế nào để xóa trạng thái của commit
* Đầu tiên bạn cần sử dụng câu lệnh:
```js
git log --oneline
```
Câu lệnh sẽ giúp bạn biết được lịch sử commit của mình và id của các commit đó
* Tiếp theo để xóa bỏ trạng thái của commit ta sử dụng một số lệnh sau: 

Sử dụng `git reset`
```js
git reset --hand <id_commit>
```
Lệnh này sẽ đưa bạn về trạng thái của commit mà bạn chỉ định qua id_commit và sẽ xóa tất cả các commit trước đó
```js
git reset --soft <id_commit>
```
Lệnh này cũng sẽ đưa bạn về trạng thái của commit mà bạn chỉ định qua id_commit nhưng code của bạn sẽ không bị xóa mà được đưa về trạng thái checking 
### 9. Làm thế nào để gộp commit
Thường như các chuyên gia khuyên thì một branch lên chỉ có một commit, vì một số lý do không may bạn tạo ra qúa nhiều commit dẫn đến việc bạn đẩy lên git có một lịch sử commit rất tệ. Và để phù hợp hơn bạn muốn gộp các commit đó lại, ở đây mình xin trao đổi với các bạn một cách như mình thấy rất đơn giản và dễ áp dụng <br>
* Đầu tiên bạn sẽ xem qua lịch sử commit của bạn bằng lệnh:
```js
git log --online
```
* Bạn sẽ hướng tới commit mà mình muốn gộp tới và copy id của commit đó. Sau đó bạn sử dụng lệnh:
```js
git reset --soft <id_commit>
```
* Bây giờ là gần xong rồi đấy, tất cả các commit trước đó của bạn đã được xóa và đưa về trạng thái checking. Bạn có thể sử dụng lệnh `git status` để có thể thấy được chúng. Và bây giờ bạn làm như thể tạo một commit mới thôi bằng các lệnh:
```js
git add
```
* Và tạo commit
```js
git commit -m <name_new_commit> 
```
### 10. Phân biệt git reset, git reset --soft, git reset --hand
```js
git reset <id_commit>
```
Sẽ di chuyển đến commit mà bạn chỉ định, và xóa các commit đi qua, nhưng code của bạn không bị xóa mà chỉ chuyển về trạng thái checking và rời bỏ trạng thái staged
```js
git reset --soft <id_commit>
```
tương tự git reset nhưng nó sẽ sẽ vẫn dữ được trạng thái staged
```js
git reset --hand <id_commit>
```
Tương tự 2 lệnh trên nhưng thay vì chuyển về trạng thái checking thì nó sẽ xóa. Vì vậy bạn hãy cân nhắc khi sử dụng lệnh này
### 11. Thế nào là cherry-pick, khi nào thì sử dụng cherry-pick
Tương tự với merge và `rebase cherry-pick` cũng kéo code từ một branch được chỉ định vào branch hiện đang làm việc của bạn. Nhưng sự khác biệt `cherry-pick` chỉ gộp một commit được chỉ định từ một nhánh khác vào nhánh hiện tại<br>
```js
git cherry-pick <id_commit>
```
để có được id_commit bạn chú ý sử dụng lệnh `git log --online` nhe :)<br>
Vậy khi nào thì lên sử dụng `cherry-pick`. Mình sẽ lấy một ví dụ để các bạn thấy rõ hơn nhé
![](https://images.viblo.asia/68ade644-20d8-40bf-af3f-67be1c0c570e.png)<br>
Đầu tiên bên nhánh product mình có 2 commit là G và H, Hiện tại bên nhánh develop của mình cần commit H nhưng mình không cần đến commit G, vậy chúng ta sẽ làm như thế nào ạ, tương đối phức tạp đúng không ạ. Vâng đây là lý do chúng ta lên sử dụng `cherry-pick` :)
![](https://images.viblo.asia/6dc1a0c7-4ce3-4127-afe7-0540e5e6f385.png)<br>
Sau khi sử dụng `cherry-pick` thì như các bạn có thể thấy mình đã mang được duy nhất commit H sang nhánh develop đúng không ạ. 
### 12. Git flow
Git flow là một kỹ thuật hay có thể nói là một mô hình, được thiết kế bởi Vincent Driessen giúp người sử dụng git giảm bớt những sai lầm không đáng có <br>
**Các branch trong git flow:**
* **Master branch**: Là branch dành cho sản phẩm chính thức, branch này luôn ổn định nhất và nó chứa lịch sử những lần `release`.
* **Develop branch**: Là nhành dành cho phát triển sản phẩm
* **Feature**: Mỗi tính năng mới đang được phải triển cho sản phẩm sẽ là một branch mới với tên quy ước: feature/tên_branch. Các feature này sẽ được tạo ra từ develop ví dụ checkout về develop và dùng lệnh git checkout -b <tên_ branch>. Khi đã hoàn thiện nó sẽ được gộp vào develop
* **Release**: Mình sẽ lấy một ví dụ để bạn có thể dễ hiểu được `release` dùng để làm gì. Ví dụ như các phiên bản của laravel thì như các bạn có thể thấy trên github của laravel sẽ có những phiên bản khi nhấn vào branch đúng không nào, đó là một ví dụ cơ bản về `release`. Sau khi bạn đã hoàn một sản phẩm tại một thời điểm nào đó, bạn có thể tạo một `release` với tên quy ước: `release/tên_release` nhánh này sẽ được merge trực tiếp vào `master branch`, về sau bạn có thể hoàn tiếp tục phát triển sản phẩm khi hoàn thiện các tính năng các bạn tiếp tục tạo `release` để merge vào master
*  **Hotfix branch**: Khi master có một số vấn đề nghiêm trọng và bạn cần có bản vá ngay vào master thì bạn sẽ tạo ra hotfix branch

**Các lệnh trong gitflow**: 
* Để khởi tạo một git-flow cho một project, ta dùng lệnh sau
```js
git flow init
```
Lệnh này sẽ tạo ra 2 branch mặc định là master và develop
* Để bắt đầu một feature ta dùng lệnh
```js
git flow feature start <tên_feature>
```
Tạo ra branch mới có tên feature/<tên_feature>
* Để tạo một bản release ta dùng lệnh:
```js
git flow release start <verion>
```
* Để tạo một bản hotfix ta dùng lệnh:
```js
git flow hotfix start <tên-hotfix>
```
## Kết luận
Bài viết ở trên chủ yếu giới thiệu cho mọi người về các khái niệm trong git cũng như cách sử dụng nó trong công việc thường ngày của mình một cách hiệu quả hơn. Cám ơn bạn đã theo dõi.