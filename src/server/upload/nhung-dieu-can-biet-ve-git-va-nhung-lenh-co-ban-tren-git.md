## 1. Git là gì?
Git là tên gọi của một Hệ thống quản lý phiên bản phân tán (Distributed Version Control System – DVCS) là một trong những hệ thống quản lý phiên bản phân tán phổ biến nhất hiện nay. DVCS nghĩa là hệ thống giúp mỗi máy tính có thể lưu trữ nhiều phiên bản khác nhau của một mã nguồn được nhân bản (clone) từ một kho chứa mã nguồn (repository), mỗi thay đổi vào mã nguồn trên máy tính sẽ có thể ủy thác (commit) rồi đưa lên máy chủ nơi đặt kho chứa chính. Và một máy tính khác (nếu họ có quyền truy cập) cũng có thể clone lại mã nguồn từ kho chứa hoặc clone lại một tập hợp các thay đổi mới nhất trên máy tính kia. Trong Git, thư mục làm việc trên máy tính gọi là Working Tree.

Ngoài ra, có một cách hiểu khác về Git đơn giản hơn đó là nó sẽ giúp bạn lưu lại các phiên bản của những lần thay đổi vào mã nguồn và có thể dễ dàng khôi phục lại dễ dàng mà không cần copy lại mã nguồn rồi cất vào đâu đó. Và một người khác có thể xem các thay đổi của bạn ở từng phiên bản,  họ cũng có thể đối chiếu các thay đổi của bạn rồi gộp phiên bản của bạn vào phiên bản của họ. Cuối cùng là tất cả có thể đưa các thay đổi vào mã nguồn của mình lên một kho chứa mã nguồn.

## 2. Github là gì?
Khi nghe nói đến Git nhiều ngườu sẽ nghĩ ngay đến Github và có thể sẽ có một số hiểu lầm với họ. Git là tên gọi của một mô hình hệ thống. Như mình đã giải thích ở trên, các máy tính có thể clone lại mã nguồn từ một repository và Github chính là một dịch vụ máy chủ repository công cộng, mỗi người có thể tạo tài khoản trên đó để tạo ra các kho chứa của riêng mình để có thể làm việc.

Liên kết: https://github.com/join

### Tại sao nên sử dụng Git?
- Git dễ sử dụng, an toàn và nhanh chóng.
- Có thể giúp quy trình làm việc code theo nhóm đơn giản hơn rất nhiều bằng việc kết hợp các phân nhánh (branch).
- Bạn có thể làm việc ở bất cứ đâu vì chỉ cần clone mã nguồn từ kho chứa hoặc clone một phiên bản thay đổi nào đó từ kho chứa, hoặc một nhánh nào đó từ kho chứa.
- Dễ dàng trong việc deployment sản phẩm.

## 3. Những câu lệnh cơ bản thường sử dụng
**1. git config**

Tác dụng : Để set user name và email của bạn trong main configuration file.
Để kiểm tra tên và kiểu email trong cấu hình dùng:

`$ git config -- global user.name` 

`$ git config -- global user.email`. 

Để set email hoặc tên mới:

`$ git config -- global user.name = “Anh Nguyen”` 

`$ git config -- global user.email = “anh98052@gmail.com”`

**2. git init**

`$ git init`

Nếu như bạn muốn theo dõi một dự án cũ trong Git, bạn cần ở trong thư mục của dự án đó. Lệnh này sẽ tạo một thư mục mới có tên .git, thư mục này chứa tất cả các tập tin cần thiết cho kho chứa.

**3. git clone**

Copy 1 git repository từ remote source.

`$ git clone https://github.com/user/repository.git`

Câu lệnh trên sẽ tạo một thư mục mới có tên giống trên của repo.

**4. git status**

`$ git status`
Để check trạng thái của những file bạn đã thay đổi trong thư mục làm việc. VD: Tất cả các thay đổi cuối cùng từ lần commit cuối cùng.

Cách dùng: git status trong thư mục làm việc.

**5. git add .**

Sau khi bạn thay đổi source code: thêm mới, sửa, xoá files,… Bạn cần phải cập nhật lên Staging Area. Để cập nhật hết các files:

`$ git add .`

**6.  git commit**
Sau lệnh add, bạn cần sử dụng câu lệnh Commit để đây thông tin thay đổi lên Local Respository:

`$ git commit -m ”Đây là message, bạn dùng để note những thay đổi để sau này dễ dò lại”`

Commit nghĩa là một action để Git lưu lại một snapshot của các sự thay đổi trong thư mục làm việc. Và các tập tin, thư mục được thay đổi đã phải nằm trong Staging Area. Mỗi lần commit nó sẽ được lưu lại lịch sử chỉnh sửa của code kèm theo tên và địa chỉ email của người commit. Ngoài ra trong Git bạn cũng có thể khôi phục lại tập tin trong lịch sử commit của nó để chia cho một branch khác, vì vậy bạn sẽ dễ dàng khôi phục lại các thay đổi trước đó.

**7.  git push**

Sau câu lệnh Commit, thông tin mới chỉ được cập nhật lên Local Repository. Nếu muốn cập nhật lên server thì bạn phải sử dụng câu lệnh push:

`$ git push origin <name_branch>`

Ngoài ra, nếu chưa tồn tại remote trên server thì bạn cần phải add mới một remote trước rồi mới push:

`$ git remote add origin <remote_url>`

`$ git push origin <name_branch>`

**8. git pull**

Pull từ remote repository

`$ git pull origin master`

Lệnh trên sẽ gộp những thay đổi mới kéo về từ máy chủ từ xa với nhánh hiện tại trên máy local.

**9. git branch**

- Khi sử dụng Git, bạn có thể tạo ra nhiều nhánh (branch) khác nhau. Câu lệnh Git này dùng để kiểm tra branch hiện tại:

`$ git branch`

-Để tạo mới một branch:

` $ git branch <name_branch>`

- Để chuyển và tạo mới:

` $ git branch -b <name_branch>`


**10. git checkout**
Chuyển sang branch khác:

`$ git checkout <name_branch>`

**11. git merge**

Sau một thời gian cập nhật các file và push lên git trên branch mới, bây giờ mình cần ghép (merge) code lại vào nhánh gốc (master). Trước tiên, cần phải checkout ra khỏi branch hiện tại cần gộp để vào branch master, sau đó thì dùng lệnh merge để ghép branch mới vào master:

`$ git checkout master`

`$ git merge <new_branch>`

**12. git log**

`$ git log`

Lệnh git log sẽ cho bạn xem lại lịch sử commit: biết về người commit, ngày giờ, message của những lần commit đó.

**13. git diff**
Xem thay đổi trước khi push
  `$ git diff`
Lệnh này giúp bạn biết những gì đã được thay đổi giữa nhánh hiện tại và nhánh trước nó.

**14. git rebase**

`$ git rebase -i HEAD~`

LỆnh này giúp bạn gộp commit.  Sau dấu ~ là số commit bạn muốn gộp. Sau khi gõ lệnh này một cửa sổ trình soạn thảo hiện ra. Thay đổi ký tự pick của dòng các dòng sau dòng đầu thành s rồi lưu lại/kết thúc. Khi đó, trình soạn thảo để chỉnh sửa giải thích commit thiết lập cho commit sau khi đã tổng hợp sẽ được hiển thị, nên hãy chỉnh sửa lưu lại/kết thúc.