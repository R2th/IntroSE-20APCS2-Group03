Xin chào các bạn, mình là Đạt đây. Chắc hẳn rằng các bạn đang làm BA không ít nhiều gì cũng nghe đến Git. Vậy Git là gì? Là một BA có cần phải biết đến Git không? Cùng mình xem qua bài viết này nhé 😎 Get go

![](https://images.viblo.asia/82325b5b-b2d4-4c91-bb1b-53f186b17e33.gif)

# Tâm sự mỏng
Các bạn đang làm BA, ở một số công ty các bạn phải làm việc với team dev để nắm tiến độ dự án. Có lần qua thì bạn nghe dev nói: "Code hiện tại đang bị conflict trên nhánh staging, phải đợi một ông dev khác có mặt mới giải quyết được chứ fix lung tung sẽ bị mất code".

Nếu bạn không hiểu câu trên, bạn không thể nào báo cáo tình hình dự án cho sếp. Đó là lúc bạn cần phải biết một số kiến thức cơ bản về Git.

# Git là gì? Các thuật ngữ hay dùng trong Git.
Git là một hệ thống quản lý phiên bản phân tán (distributed version control system). Nhờ Git, việc quản lý code và làm việc nhóm của developer trở nên đơn giản, thuận tiện hơn. 

Hay nói đơn giản dễ hiểu, Git là một nơi quản lý code. Mỗi thành viên trong dự án đều có thể tải code người khác về và up code của mình lên để thành một source code chung, chính là source code dự án.

Và một điều khá hay đó chính là, tất cả các việc thay đổi source code đều được Git ghi lại. Dev sửa file nào, thêm dòng code nào, xóa dòng code nào, bỏ thừa dấu ở đâu, mọi thứ đều được lưu lại. 

Không dài dòng nữa, chúng ta cùng điểm qua một số thuật ngữ trong Git.

## 1. REPOSITORY
Repository là một kho chứa, lưu trữ source code. Trong đó có hai loại repository:

* **Local repository**: Là repository được lưu tại máy tính của các anh dev. Dev có thể thêm, sửa, xóa file để lưu lại nhưng chưa thể dùng để chia sẻ tới người khác.

* **Server repository**: Là repository được lưu tại server của các hosting-service sử dụng Git (Github, Gitlab,...). Những người khác có quyền truy cập thì họ có thể tải source code về.

![image.png](https://images.viblo.asia/f9af180e-99fd-4446-a607-de896eb21ebe.png)

<div align="center">*Một vài repository của mình*</div>

## 2. BRANCH
Branch hay còn gọi là nhánh, một repository sẽ có một hoặc nhiều nhánh. Có thể hiểu một nhánh là một tính năng của app hay một task nào đó của dev, để cuối cùng những dòng code trong nhánh này sẽ được hợp vào nhánh lớn nhất của repository. 

Ví dụ: Trong một dự án ta có thể có:

* M**aster branch**: là nhánh lớn nhất hay còn gọi là nhánh ông nội =))) code trong nhánh này thường là code cuối cùng của app. Chỉ cần thay đổi code ở nhánh này sẽ ảnh hướng đến app đang hiện hành, vì vậy các leader thường phải review code thật kỹ của các thành viên mới được merge code vào nhánh này.
* **Staging branch**: cũng là nhánh lớn, nhưng app từ nhánh này chưa phải là app chính thức để deliver cho end-user. App được export từ nhánh này thường được các nhân viên trong công ty và các stakeholder trải nghiệm trước để xem có vấn đề hay bug gì không? Nếu ổn mới merge code nhánh này vào nhánh master.
* **Và các branch nhỏ hơn**: Như mình đã nói, cách đặt tên nhánh có thể là một tính năng của app hay một task nào đó của dev. Hồi mình còn làm dev mình hay đặt tên nhánh kiểu như thế này: `"feature/add-post"`, `"task/update-api-login"` =)))

Vậy một câu hỏi đặt ra là trong một repository có thể đến hàng trăm nhánh lựn? Đúng vậy, nhưng để quản lý tốt hơn, các dev thường xóa nhánh đó đi khi up code lên nhánh đích. Như vậy trên **Server repository** sẽ không xuất hiện quá nhiều nhánh cũ mà không đá động gì tới nữa.

![image.png](https://images.viblo.asia/e942f1ba-85c2-49f1-ab61-c1417d2ea08f.png)

## 3. COMMIT 
Là BA thì mình nghĩ chỉ nên hiểu đơn giản cho đỡ rối, là khi dev muốn up code lên một nhánh nào đó bắt buộc phải commit. Commit chứa một số thông tin như:

* tên, email người tạo commit
* message: cái này buộc các ông dev phải mô tả mỗi khi commit, nó là nội dung mô tả những gì ổng làm trước đó. Nếu như bạn thấy ông nội dev nào mà commit kiểu "." hoặc kiểu "#@!#@!2132" thì kí đầu ổng liền nhé =)))
* id commit: cái này tiện, nếu ông dev nào bị mất code thì có thể khôi phục dựa vào commit id

## NGOÀI RA CÁC BẠN CÒN THƯỜNG NGHE VÀI THUẬT NGỮ HAY DÙNG NHƯ: 
**Clone**: là tải nguyên source code về.

**Pull code**: cũng là tải code nhưng chỉ tải những sự thay đổi mới về, thường thì mỗi sáng mấy ông dev đều phải pull code về mới bắt đầu code tiếp. Chính xác hơn, khi có một ông nội dev nào khác đẩy code ổng lên, thì các dev khác phải pull code về để làm tiếp. Mục đích là tránh tình trạng 2 3 ông code cùng 1 file mà đẩy lên cùng lúc là code chồng lên nhau dẫn đến tình trạng conflict code, mất code.

**Push code**: là đẩy code lên source code chung

**Tạo merge request/Pull request**: là gửi một thông báo cho lead/sếp yêu cầu review code, mục đích là để ổng apply code vào source chung.

**Merge request**: ổng apply code vào source

**Conflict**: Tức là tình trạng code bị chồng lên nhau, sảy ra khi 2 hay nhiều ông dev code cùng một hàm hay một file, code ông này đè lên ông kia. Kinh nghiệm của mình để tránh tình trạng này là phải pull code thường xuyên, khi có thông tin ai đó đẩy code lên được lead/sếp merge rồi thì phải pull về.

# Tổng kết
Chúng ta vừa điểm qua một vài kiến thức cơ bản về Git. Hy vọng bài viết này sẽ bổ trợ một phần nào đó trong công việc của các bạn. Follow Facebook mình để xem thêm nhiều bài viết trong tương lai nhé 😁

Linked: [tothanhdat](https://www.linkedin.com/in/tothanhdat/)

Email: todat999@gmail.com

# Ref
https://tothanhdat.com/blog/62dbcbfb750c72222be38315