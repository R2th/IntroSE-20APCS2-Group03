Chào mọi người, hôm nay mình viết một số trường hợp đã gặp khi làm việc với Git, Gitlab. Nội dung của bài viết chỉ tập trung nói một số về Git như: conflict, merge wrong branch, create title and template for merge request.

## **1.  Git Conflict**

###  Conflict

![img_merge-conflict.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630758001424/BQIq-8p1L.png)

###  Conflict là gì?
Conflict nghĩa là xảy ra xung đột. Khi nhiều người cùng sửa một file, cụ thể cùng sửa nội dung dòng trên file đó.    
Git so sánh từng dòng trong file, để theo dõi sự thay đổi của file đó.

### Conflict có thể xảy ra ở đâu?
Xung đột có thể xảy ra ở kho lưu trữ cục bộ (local repository) của mỗi cá nhân hoặc kho lưu trữ từ xa (remote repository) Gitlab.

###  Conflict xảy ra khi nào?
Khi mà chúng ta cố gắng merge hoặc pull về nhánh làm việc.        
Nói tóm lại conflict xảy ra khi chúng ta thực hiện merge hoặc pull về nhánh làm việc, khi mà có nhiều người cùng sửa các hàng trong 1 file.

```
git merge --no-ff name-branch
git pull origin name-branch
``` 

### Cách giải quyết
  
- Xác định nội dung xung đột
- Chỉnh sửa tệp bị xung đột bằng cách loại bỏ tất cả bộ chia xung đột, cần phải làm cẩn thận và thảo luận với team để biết giữ cái nào, bỏ cái nào.
- Thực hiện cam kết

```
git add .
git commit -m "Resolve conflict"
``` 

### Đề xuất giảm thiểu conflict:
- Xác định quy trình ngay từ đầu
- Commit thường xuyên, pull code thường xuyên
- Chia công việc để mỗi người có thể làm trên từng tính năng riêng biệt.


## **2. Merge wrong branch**
### Thường hợp này xảy ra ở local repository hoặc remote repository.
- Ở local repository, khi mà merge nhầm nhánh mình có thể dễ dàng reset lại trạng thái trước đó với điều kiện chưa có push lên remote repository.
- Ở remote repository, trường hợp này xảy khi tạo merge request từ nhánh feature lên develop (quy trình làm việc với git), có thể bị nhầm sang nhánh main (mặc định của Gitlab).    
Reviewer accept merge request.         
Nội dung thay đổi của nhánh feature có thể merge trực tiếp vào nhánh main.

### **Cách giải quyết**
- Khi chưa có ai pull về và mình hiểu rõ nội dung cần revert. Nếu có quyền Maintainer trở lên, bạn có thể revert về commit trước khi merge và push force lên remote repository.     
Điều này khá nguy hiểm và có thể bị cấm ở một số công ty vì khi đó sẽ thay đổi lại hoàn toàn lịch sử commit.

```
git log --oneline # choose commit hash before merge (commit-hash)
git reset --hard commit-hash
git push origin name-branch -f
``` 

- Sử dụng revert trên chính merge request Gitlab. Khi nhấn vào đây, nội dung sẽ được revert lại trước khi merge.       
Tuy nhiên cần để ý lịch sử commit vì khi đó commit merge vẫn nằm trong lịch sử commit.     
Nên khi bạn tạo merge request lên nhánh main có thể sẽ không thấy được nội dung của file đó nếu không có chỉnh sửa thêm.     
Cần phải thêm revert commit.


![5.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1630756968204/5OWTBsGt0.png)

## **3. Create title and template for merge request**

### **Title **
Tạo quy trình, giúp cho Reviewer thuận tiện trong quá trình review code.
![3.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1630756167474/v0yT5UPMX.png)

### **Templates**
+ Từ nhánh mặc định của Gitlab, tạo folder .gitlab/merge_request_templates. 
+ Trong folder sẽ gồm những file markdown.
+ Những templates thường được sử dụng feature, bug, chore, spike.

![4.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1630756273558/5UjgT6YT9.png)

Thank you for watching!      
Good luck!