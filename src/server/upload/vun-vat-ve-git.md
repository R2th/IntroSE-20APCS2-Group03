Chắc cũng gần 1 tháng rồi mình không tham gia vào các dự án > 1 người để còn được dùng git. Thay vào đó mình làm đồ án tốt nghiệp và cũng sử dụng git để làm 1 mình cũng như tự sướng để tạo conflict (chumchan). Lâu lâu không làm lại cứ bị ... nên hôm nay nhân dịp được có thời gian để nghiên cứu lại về git nên mình sẽ tổng hợp lại một số thứ cơ bản hơi hướng lý thuyết. Lúc đầu định tổng hợp Word nhưng viết được cả trang rồi thấy như mình đang viết bài chém gió blog vì vậy lại viết lên đây vậy. Nội dung bài viết có thể các bạn đã đọc và gặp nhiều không chỉ trên Viblo mà cả những trang khác nên các bạn không cần bảo là mình đi cop đâu ạ. Go go...

# Repository
Vào những ngày giữa tháng 1 chết rét mình được bắt đầu khai sáng git và các mà mình cảm thấy hoang mang nhất có khi lại là Repository. Vâng nó là gì?

Repository là nơi lưu trữ công việc của bạn. Nó là kho chứa mã nguồn được quản lý bởi Git. Các thông tin về lịch sử hoạt động, nhánh... đều được lưu trữ trong thư mục con `.git`. Vâng là thư mục ẩn đấy ạ. Nếu bạn có được thư mục như vậy thì đường có mà tự vào thư mục của mình để tự tạo nhé. Hãy cài đặt git và dùng lệnh sau:

`git init`

Có 2 loại repository chúng ta cần nhắc đến là:
1. **Local Repository**: Repo trên máy của người dùng
1. **Remote Repository**: Repo trên server chuyên dụng  (Github, GitLab, Bitbucket) dùng để chia sẻ với nhiều người dùng
# Branch
## Đây là định nghĩa Branch
* Là nhánh làm việc của repo
* Là những phân nhánh ghi lại luồng thay đổi của lịch sử thay đổi.
* Các hoạt động trên mỗi branch không gây ảnh hưởng đến những branch khác trong cùng đồng thời trên 1 repo.
* Đối với các branch tuy là phân nhánh nhưng có khả năng chỉnh sửa, tổng hợp lại với nhau.
* Khi tạo 1 repo thì nhánh mặc định là master đóng vai trò cập nhật dữ liệu và đồng bộ với Remote Repository.

## Một số thao tác với Branch nè
> Đây là những câu lệnh mình thường dùng còn có thể không phải là tất cả đâu nhá (bow).

### **1. Danh sách branch**
```bash
git branch
```
Với `git branch -r` liệt kê danh sách remote branch.

Còn với `git branch -a` bao gồm danh sách của remote branch và local branch.

### **2. Tạo branch**
* `git branch branch_name`
* `git checkout -b branch_name` cái này là vừa tạo branch mới vừa chuyển sang branch ý luôn nè.

### **3. Đổi tên branch**
* `git branch -m old_name new_name` dùng lệnh này nếu bạn đang ở 1 nhánh bất kỳ nào đấy bao gồm cả nhánh bạn đang muốn đổi tên.
* `git branch -m new_name` nếu bạn đang muốn đổi tên chính nhánh bạn đang làm việc thì chính là nó rồi.

### **4. Xóa branch**

**Local branch**
* `git branch -d branch_name` Với lệnh này bạn có thể xóa branch có tên được định nghĩa, tuy nhiên bạn không thể xóa branch đang làm việc. Tuy nhiên branch này chỉ được xóa nếu nó đã ở trạng thái **"fully merged - đã hợp nhất hoàn toàn"**. Nếu đang không ở trạng thái kia thì git sẽ thông báo lỗi và đồng thời nhánh cũng sẽ không được xóa.
* `git branch --delete branch_name` Câu lệnh này thì cũng chỉ có chức năng giống với như trên. Chỉ khác là dùng tùy chọn `--delete` thay vì `-d`. Đây có cách viết tắt cho mục đích nhanh, gọn, nhẹ.
* `git branch -D branch_name` Như đã nói ở trên nếu nhánh bạn muốn xóa không ở trạng thái ***"fully merged"*** thì bạn không thể xóa với câu lệnh mình đã đưa ra ở trên. Để giải quyết cho vấn đề như trên ta có thể dùng câu lệnh xóa branch với tùy chọn là `-D`. 
* `git branch --delete --force branch_name` Chức năng cái này giống `-D` kia kìa nhưng là nghĩa tường minh. Vâng là ***force*** nhé.

**Remote branch**

Tìm được hẳn 2 cách nè, cách sau hình như mình chưa dùng:
```bash
git push remote_name --delete branch_name
```
```bash
git push remote_name :branch_name
```
### **5. Push branch từ local lên remote**

**2 branch cùng tên (ez)**
```bash
git push remote_name branch_name
```
**2 branch khác tên**
```bash
git push remote_name local_branch:remote_branch
```
Theo kinh nghiệm của mình thì như này dễ conflict lắm nà. Ít ít dùng thôi mọi người nha.
# Merge và Rebase
## **Merge**
```bash
git merge destination_branch source_branch
```
Hoặc merge cho branch hiện tại đang làm việc
```bash
git merge destination_branch
```
Cái này sẽ tạo 1 commit merge mới trong nhánh **source_branch**.

## **Rebase**

```bash
git rebase destination_branch
```
Câu lệnh này đưa toàn bộ commit ở nhánh hiện tại nối tiếp vào nhánh **destination_branch**.
## Interactive Rebase
Nếu 1 phút bạn yếu lòng tạo nhiều commit rồi lại muốn gộp đống ý vào cho gọn. Bạn hãy tìm đến phần này nha. Đây là kỹ thuật chỉnh sửa commit rất linh hoạt.
```bash
git rebase -i HEAD~number
```
Cái chỗ **number** là số tự nhiên > 0 thể hiện số lượng commit mới nhất mà bạn muốn chỉnh sửa.

Editor sẽ hiện lên danh sách các commit mới nhất từ cái **number** bạn nhập vào ý. Có một số tùy chọn như sau:

* **p, pick = use commit** vẫn sử dụng commit nè
* **r, reword = use commit, but edit the commit message** cũng là vẫn sử dụng commit này, nhưng viết lại message
* **e, edit = use commit, but stop for amending** lại là sử dụng commit này tiếp nhưng dừng để sửa đổi
* **s, squash = use commit, but meld into previous commit** sử dụng commit này nhưng gộp vào commit trước
* **f, fixup = like "squash", but discard this commit's log message** giống với squash nhưng loại bỏ message của commit
* **x, exec = run command (the rest of the line) using shell**
# Fetch vs Pull
`git fetch remote_name`: Lấy các thay đổi từ remote repository nhưng không tích hợp bất kỳ dữ liệu mới vào các tệp mà bạn đang chỉnh sửa. Nếu dùng fetch chúng ta có khả năng xem lại và quyết định có gộp mã nguồn từ remote repository với local remote không. Sau khi dùng `git fetch ...` thì nó chỉ cập nhật mã nguồn vào nhánh không tên và ta có thể checkout đến nó với tên FETCH_HEAD. 

`git pull remote_name branch_name`: Cập nhật **nhánh hiện tại** của local repository với những thay đổi của remote repository. Nó không cho phép bạn xem xét các sự thay đổi và kết quả là các xung đột có thể xảy ra.
# Git stash
Đôi khi bạn đang làm việc trên một nhánh và đang rất lộn xộn và bạn lại dở chứng rằng ở 1 nhánh khác bạn cần chỉnh sửa một số thứ. Bạn cố gắng checkout nhưng ăn hành ngay vì sẽ được thông báo bạn không thể chuyển sang nhánh khác khi mà bạn chưa commit. Tuy nhiên, bạn vẫn không muốn commit thì làm sao bây giờ? Yên tâm rằng git hiểu bạn muốn gì. Để khắc phục trường hợp như trên bạn có thể dùng `git stash`.

Stashing được xem như một **bãi rác** - nơi này lưu trữ các tệp được theo dõi nhưng bị sửa đổi và các giai đoạn thay đổi theo thời gian. Những thay đổi này được lưu và bạn có thể lấy ra để áp dụng lại cho mã nguồn của bạn trong bất kỳ thời điểm nào.

Một số thao tác với stash:

* Lưu thay đổi: `git stash` hoặc `git stash save`
* Xem danh sách các lần thay đổi: `git stash list`. 
* Xem danh sách các thay đổi nhưng với một cách chi tiết hơn: `git stash list -p`
* Xem nội dung của một stash; `git stash show@{stash_id}`
* Áp dụng thay đổi từ stash vào trạng thái hiện tại: `git stash apply stash@{stash_id}`
* Xóa 1 stash: `git stash drop stash@{stash_id}` hoặc `git stash pop stash@{stash_id}`
* Xóa tòan bộ các thay đổi: `git stash clear`
#  Phục hồi trạng thái của commit
Bạn đang hăng say làm việc, bạn đã đưa file vào commit và bạn nhận ra commit đấy có gì sai sai. Bạn có thể dùng một trong các cách sau để có thể sửa sai nhé (ahihi).
## Reset
Bạn có thể dùng 2 cú pháp như sau đều tương đương nhau:
* `git reset --hard HEAD~index` với **index** là bước nhảy của commit muốn phục hồi so với commit hiện tại. Nếu muốn trở về vị trí của commit ngay trước đấy ta có thể dùng `git reset --hard HEAD^`
* `git reset --hard commit_id` với **commit_id** là chỉ số của commit, để kiểm tra chỉ số của commit bạn có thể dùng `git log`
### Phân biệt một số tùy chọn của reset
* `--hard` loại bỏ hoàn toàn commit bao gồm cả những thay đổi chưa được commit
* `--soft` bỏ đi commit nhưng vẫn giữ nguyên thay đổi chưa được commit
## Revert
`git revert commit_id` tạo một commit mới đảo ngược nôị dung commit được lựa chọn, các bạn có thể hiểu là nếu nội dung thay đổi trong `commit_id` là thêm 1 file mới thì sau khi revert file ấy sẽ bị mất đi tuy nhiên commit được lựa chọn thì vẫn còn trong lịch sử và bạn hoàn toàn có thể lấy lại nội dung của commit vừa bị revert nếu cần.
## --amend
`git commit --amend` ghi đè nội dung của commit cũ và có thay đổi **commit hash**.
# Cherry-pick
Đây là khả năng lấy các thay đổi trong 1 commit trên 1 nhánh bất kỳ để áp dụng vào nhánh hiện tại.
```bash
git cherry-pick commit_id
```
So với chức năng merge thì cái này có vẻ cũng tương đối giống. Vậy sinh ra nó để làm gì vậy? Tuy nhiên, ta cần hiểu rằng merge là áp dụng thay đổi của commit mới nhất còn cherry-pick này là áp dụng thay đổi của 1 commit bầt kỳ.
# Kết luận
Sau có vài bài viết hình như trình chém gió tăng lên. Bài viết dài quá ạ. Mong rằng sẽ có ai lướt đến đây. Bài viết còn nhiều thiếu sót mong mọi người thông cảm. Để có thể hiểu thêm chi tiết về git mọi người có thể vào [https://git-scm.com/](https://git-scm.com/) để hiểu thêm. Còn để thực hành với git, bạn có thể vào trang này nhé [https://learngitbranching.js.org/](https://learngitbranching.js.org/). 

Mong gặp mọi người ở bài chém gió tiếp theo.