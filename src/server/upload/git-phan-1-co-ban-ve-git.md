# Git là gì?
Git là một hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS), nó là một trong những hệ thống quản lý phiên bản phân tán phổ biến nhất hiện nay. Git cung cấp cho mỗi lập trình viên kho lưu trữ (repository) riêng chứa toàn bộ lịch sử thay đổi.
Git coi thông tin được lưu trữ là một tập hợp các snapshot – ảnh chụp toàn bộ nội dung tất cả các file tại thời điểm.
Mỗi khi bạn “commit”, Git sẽ “chụp” và tạo ra một snapshot cùng một tham chiếu tới snapshot đó. Để hiệu quả, nếu các tệp không thay đổi, Git sẽ không lưu trữ lại file — chỉ là một liên kết đến tệp giống file trước đó mà nó đã lưu trữ. Git nghĩ về dữ liệu của nó giống như dưới đây:
![](https://images.viblo.asia/623f2e8f-a226-43e5-836d-5cac146fac82.png)
Các dự án thực tế thường có nhiều lập trình viên làm việc song song. Vì vậy, một hệ thống kiểm soát phiên bản như Git là cần thiết để đảm bảo không có xung đột code giữa các lập trình viên.
Ngoài ra, các yêu cầu trong các dự án như vậy thay đổi thường xuyên. Vì vậy, một hệ thống kiểm soát phiên bản cho phép các nhà phát triển revert và quay lại phiên bản cũ hơn của code.
# Các thuật ngữ Git quan trọng
## Repository?
Là nơi lưu trữ source code, mỗi repository sẽ đại diện cho một dự án. Repository sẽ chia làm 2 loại, là Local repository và Remote repository.
* Remote repository: Là repository để chia sẻ giữa nhiều người và bố trí trên server chuyên dụng.
* Local repository: Là repository bố trí trên máy của bản thân mình, dành cho một người dùng sử dụng.
![](https://images.viblo.asia/539587b2-40e1-4762-80bb-51d457c8ce7d.png)
* Init repository: Là thao tác khởi tạo một Local repository.
* Clone: Là thao tác nhân bản một Remote repository thành Local repository trên máy của bạn.
## Branch?
GIT quản lý các phiên bản source dưới dạng cây có nhiều nhánh, mỗi nhánh là một phiên bản. 
![](https://images.viblo.asia/105bfc59-301b-4812-9af0-1f0957a20839.png)

Các thành viên của nhóm sẽ tạo branch dùng riêng cho công việc của mình từ branch chính để không ảnh hưởng đến công việc của các thành viên khác. Sau đó, những thành viên đã hoàn thành công việc của mình sẽ thực hiện đưa thay đổi của mình vào branch chính. Theo cách như vậy, sẽ không bị ảnh hưởng từ công việc của các thành viên khác, và bản thân mình có thể thực hiện công việc của mình.
branch đã phân nhánh có thể chỉnh sửa tổng hợp lại thành 1 branch bằng việc hợp lại (**merge**) với branch khác.
![](https://images.viblo.asia/38417f30-d8bf-4964-a0b8-dd0592df6111.png)

Branch trong GIT được chia làm 2 loại, là branch master (nhánh chính) và các branch khác do bạn tạo ra trong quá trình làm việc.
***Branch master***: Là nhánh đầu tiên khi khởi tạo một GIT repository, branch master thường là nơi chứa source code đang chạy ổn định.
Các loại branch:
* *Branch local*: là branch lưu ở local (tất nhiên rồi). Nó có thể được liên kết với 1 branch ở remote hoặc không.
Hiển thị branch có trên local ta dùng lệnh git branch
* *Branch remote*: là branch lưu ở remote. Branch này có thể fetch về local nhưng không tạo thêm branch ở local.
Hiểu đơn giản là bạn có thể tải branch ở remote về nhưng không tạo 1 branch ở local với tên tương tự và tất nhiên sẽ không liên kết nó với một branch local nào cả.
Để hiển thị branch remote có trên local dùng lệnh git branch -r
### Tạo branch
`$ git branch <branchname>`
### Xoá một branch ở phía local
**Cách 1:*** `$ git branch --delete <branch_name>`
    
hoặc   `$ git branch -d <branch_name>`
    
**Cách 2:***  `git branch --delete --force <branch_name>`

hoặc   `$ git branch -D <branch_name>`
### Xoá một branch remote lưu ở local
`$ git branch --delete --remotes <remote_name>/<branch_name>`

 hoặc  `$ git branch -d -r <remote_name>/<branch_name>`

Chú ý:
    
Cách 1 chỉ xóa được branch local khi nó đã được Merge vào branch hiện tại và nó đã được push lên remote nếu nó có liên kết với một branch remote.
    
Cách 2 sẽ xóa được mọi branch kể cả không thỏa mãn điều kiện kể trên.
Chỉ xóa được branch khi đang ở branch khác
### Xoá một branch ở phía remote
`$ git push <remote_name> --delete <branch_name>`
    
VD:  ` $ git push origin --delete <branch_name>`
    
Chú ý:
    
Phải checkout ra branch cùng tên với branch trên remote thì mới xóa được. Tức là khi ta đang ở branch develop thì ta không thể xóa branch master trên remote.
### Chuyển đổi giữa các branch
Để chuyển đổi branch làm việc thì sẽ thực hiện thao tác gọi là checkout. 
    
`$ git checkout <branch>`
    
Khi thực hiện checkout, trước tiên nội dung của lần commit cuối cùng trong branch chuyển đến sẽ được mở ra trong worktree. Và commit đã tiến hành sau khi check out thì sẽ được thêm vào branch sau khi di chuyển đến.
### Merge branches
Merge branch sẽ được thực hiện bằng lệnh merge.
    
`$ git merge <commit>`
    
## Git Rebase
    
 Rebase là một cách thuận tiện để kết hợp lại những commit mới trong một branch trên đỉnh của một branch khác.
    
Để hiểu hơn định nghĩa trên thì cách tốt nhất đó là bắt đầu sử dụng câu lệnh này.
    
Ví dụ repository của bạn có hai branch là master và topic. Trong branch topic bạn có các commit mới với tên là A, B và C mà branch master không có. Đồng thời lúc này branch topic cũng không có các commit E, F và G trên branch master. Bạn có thể tham khảo hình minh hoạ sau để dễ hình dung:
    ![](https://images.viblo.asia/afeb735d-386a-4067-9968-e6e197e5cf8f.png)
Lúc này sử dụng câu lệnh:
    
`$ git rebase master topic`
    
Sẽ áp dụng các commit mới trong branch topic trên commit mới nhất của branch A. Kết quả sau khi chạy câu lệnh sẽ như trong hình minh hoạ sau đây:
    ![](https://images.viblo.asia/1cc0830b-97c4-4cc5-ba3f-dc26e5be896d.png)
Nếu branch hiện tại bạn đang làm việc là topic thì bạn có thể bỏ qua tên branch này khi chạy câu lệnh trên:
    
`$ git rebase master`
    
Trong trường hợp master branch đã có một commit từ branch topic thì khi rebase Git sẽ bỏ qua commit này. Ví dụ như trường hợp commit A trên branch topic đã được merge vào branch master ở commit A' 
    ![](https://images.viblo.asia/9290d585-080a-40cd-85b0-3d957e9791f9.png)
    
Lúc này khi thực hiện rebase kết quả sẽ như sau:
    
![](https://images.viblo.asia/ca96613b-7ab2-4b96-af1c-1abf0e54245e.png)
###     Phân biệt rebase và merge
Giả sử chúng ta có 2 thanh tre với nhiều đốt tre , khi chúng ta muốn chập 2 thanh tre này thành một khối, thì ta sẽ nối các mấu đốt tre lại với nhau bằng nhiều cách thức. Thì rebase và merge ở đây là 2 cách thức dùng để nối các mấu đốt tre. Hay nói một cách chuyên môn thì chúng dùng để tích hợp các thay đổi từ các branches vào 1 base branch ( có thể hiểu là master ) . Sau khi dùng 2 cách thức này để nối , chúng ta sẽ đều có được một khối liên kết chặt chẽ giữa các thanh tre, nhưng hình dạng của chúng sẽ hoàn toàn khác nhau.
 
* Với merge chúng ta sẽ phải thực hiện bằng cách chập 2 đầu mấu đốt lại theo hình chữ V và buộc vào với nhau. Ban đầu 2 thanh tre sẽ có những đầu mấu đốt riêng của chúng, sau khi chập lại kèm với keo hoặc dây buộc chúng sẽ có 1 đầu mấu mới là đầu mấu chung .
       ![](https://images.viblo.asia/b5eb9b00-48b2-4dd4-85d6-51e421690920.PNG)
* Nếu như ở merge chúng ta tiến hành nối 2 thanh tre theo hình chữ V thì ở rebase chúng ta sẽ tiến hành nối các thanh tre lại thành một thanh tre có nhiều đốt hơn . chúng ta sẽ đặt các thanh tre thành một đường thẳng ngay ngắn , và gắn chúng ta sao cho không tạo ra them mấu đốt nào nữa. Có thể hiểu là nó lấy tất cả các commit từ lúc chúng ta tách nhánh feature từ master rồi đem từng commit đó đặt lên master theo đúng thứ tự
    ![](https://images.viblo.asia/54d0deed-1197-4fea-85b9-9d221f0541b5.PNG)
    
* **Vậy khi nào cần dùng rebase** : Khi muốn một history ( thanh tre dài ) rõ ràng dễ nhìn, hay còn gọi là linear history và tránh được trường có thêm các merge commit
* **Vậy khi nào cần dùng merge** : Nếu muốn lưu vết hay bảo toàn được history của repo ( Vd như xem được commit này từ branch nào ) và tránh đươc trường hợp rewrite lại tất cả các changes

# Tổng kết
Trên đây là những kiến thức cơ bản khi làm quen với git mà mình đã tổng kết lại trong quá trình tìm hiểu.  Trong phần tiếp theo mình sẽ giới thiệu tiếp với các bạn những lệnh cơ bản và thường dùng để xử lý với git trong quá trình làm việc.