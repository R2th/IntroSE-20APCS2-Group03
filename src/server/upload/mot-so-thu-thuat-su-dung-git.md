*Tiếp tục lưu lại các bài học từ dự án, lần này là với git*

### 1. Xử lý conflict khi rebase
Bài toàn mình hay gặp ở đây là rebase để update code mới nhất của nhánh develop(staging) hoặc master(production) và cứ phải liên tục fix conflict ở một vài file giống hệt nhau và nội dung conflict giống hệt nhau. Vấn đề là mình luôn xoá phần commit cũ và giữ lại commit mới nhất => luôn xảy ra conflict. Sau đó mình đã thử đổi ngc lại và dùng `git rebase --skip` liên tục và hết conflict . 

### 2. Chỉ deploy một vài feature lên production
Bài toán: Các feature f1, f2, f3 đã code xong và release lên staging. Nhưng vì lý do nào đó f1 và f2 bị pending release production, chỉ còn f3. Bây giờ, để release riêng f3 thì làm tn?

Cách 1:
- Checkout master sang một nhánh release
- Cherry pick các commit của f3 sang nhánh release
- Tạo PR merge với master
- 
Cách 2:
- Tạo PR với f3 với master (ez chưa, nhưng case này chỉ đúng nếu có 1 branch, với nhiều feature release hơn thì cần tích hợp chúng lại và merge với master. Nhưng cũng hãy cẩn thận nều f3 đã rebase với f1 và f2 thì k dùng đc vì nó sẽ chứa cả f1 và f2 rồi)

### 3. Loại bỏ một vài feature trước khi deploy lên production
Bài toán: Các feature f1, f2, f3 đã code xong và release lên staging. Nhưng vì lý do nào đó f1 bị pending release production, chỉ còn f2 và f3. Bây giờ, để release production thì làm tn?

Cách 1:
- Sử dụng cherry pick như bài toán 2 lấy f2 và f3. Cách này có thể áp dụng nếu lượng commit bỏ đi nhiều hơn lượng commit giữ lại

Cách 2:
- Với số lượng commit bỏ đi ít thì có thể dùng `git revert <hash_commit>`. Một lệnh tương tự là `git revert --strategy resolve <hash_commit>`. Mình thấy lệnh này cũng mang tác dụng tương tự.


Cách 3:
- Nếu f1 được merge vào cuối thì chỉ cần checkout về trước f1 và merge thôi

### 4. Hạn chế tạo local branch trên server
Thông thường, mình hay kéo một nhánh nào đó về server qua cách sau `git fetch origin remote-branch:local-branch` sau đó checkout sang `local-branch` và deploy. Sau nhiều lần deploy thì thấy có nhiều branch local quá mà ngại delete nên mình chuyển sang cách sau. 
-  `git fetch --all` để lấy toàn bộ branch remote về
-  `git checkout origin/<branch_name>` để checkout sang branch đó và deploy

Thật ra để đó cũng chả sao nhưng thấy ngứa mắt vs sợ rối nên sài cách trên :D

### 5. Nhánh master và develop (staging) conflict
Thông thường, nhánh develop sẽ rebase master trước khi merge để tránh conflict nhưng có đôi lần mình rebase xong vẫn bị conflict. Bài toán này dễ xảy ra với dự án có nhiều team cùng phát triển và không có git flow thống nhất.
- Checkout nhánh master sang nhánh phụ
- Merge nhánh develop vào nhánh phụ
- Merge nhánh phụ vào develop
- Tạo PR lên master