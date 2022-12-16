# Khởi động
Để chuẩn bị tốt cho các chiêu thức sắp được trình bày, chúng ta cùng khởi động, ôn luyện một chút nhé.
![](https://images.viblo.asia/cbf5fc02-68b2-4df9-8463-69373cc82a9f.png)


```
Working directory: chính là project mà chúng ta đang code, nơi mà ta thực thi các task ở local.

Staging area: Là nơi lưu trữ thay đổi trước khi commit. Mỗi khi chúng ta gõ lệnh git add thì tất cả thay những thứ được
thêm vào đó, sẽ được lưu vào staging area.

Repository: ở đây là local repo. Là project khi đã commit. Sau khi gõ lệnh commit, những sự thay đổi sẽ được đưa 
vào đây.
```

Giả sử ta có các dãy commit như sau: A - B - C (HEAD -> master)

HEAD chính là con trỏ, trỏ tới commit hiện đang đứng. 

Chắc chắn bạn đã bắt gặp HEAD~1 rồi đúng không, bạn có hiểu về nó chứ. Đây là cách diễn đạt chỉ tới commit đứng ngay trước HEAD trên cùng nhánh (Trong trường hợp này chính là B)

# Các chiêu thức
### Chiêu thức 01: Sửa lại tên nhanh, message commit
Đối với đổi tên nhánh. Đầu tiên chúng ta đổi tên ở local. Trường hợp đang đứng ở nhánh cần đổi, chỉ cần gõ
`git branch -m new_name`. Trường hợp đang ở nhánh khác, chúng ta gõ `git branch -m old_name new_name`.

Trong trường hợp bạn cần đổi tên cả nhánh đã push lên remote, thì tiếp tục thực hiện bước sau. Xóa tên cũ ở remote và push nhánh với tên mới lên. Gõ lệnh `git push origin :old_name new_name`.

Nếu bạn muốn thay đổi message của commit trường hợp chưa push lên, ta có thể gõ lệnh `git commit --amend new_message`.

### Chiêu thức số 02: Di chuyển sự thay đổi ở 1 nhánh sang nhánh khác
Giả sử bạn nhận task về, task khá dài, việc thực thi task mất rất nhiều thời gian và rồi bạn cũng đã hoàn thành. Khi hí hửng để chuẩn bị commit code, bạn chợt nhận ra bạn đang code trên nhanh dev mà đáng lý nó phải là nhánh feature. Bạn bối rối không biết phải sửa sai như thế nào. Thế rồi ông thần "Stash" xuất hiện và cứu bạn khỏi cơn lầm lũ này.

Để thực hiện công việc này, rất đơn giản thực hiện các bước sau đây. Bước 1, lưu toàn bộ sự thay đổi bằng thực hiện lệnh `git stash`. Bước 2 checkout sang nhánh mong muốn, trong trường hợp này là feature: `git checkout feature`. Bước cuối cùng cập nhật sự thay đổi vào nhánh đó bằng cú pháp `git stash pop`. Có rất nhiều cách để lấy code bằng stash nhưng trong phạm vi bài viết này mình chỉ đề cập tới  `stash pop`.

### Chiêu thức số 03: Apply commit từ nhánh này sang nhánh khác
Giả sử chúng ta có 2 nhánh A và B. Sau khi nhận task và code hoàn thiện ở trên nhánh B. thì đột nhiên ở nhánh A chúng ta cũng cần đoạn code thay đỏi đó. Có thể các bạn nghĩ copy code ra đâu đó rồi parse ở nhánh A. Cách đó ok với code thay đổi ít, còn với lượng code thay đổi nhiều thì sao nhỉ. Bắt buộc phải có giải pháp khác để thay thế. Và đây, thiên hạ gọi tên `cherry-pick`.

Bước 1: checkout sang nhánh B, gõ `git log` để lấy được danh sách list commits. Chọn ra hash-commit mà mình muốn apply. Bước 2, checkout về nhánh A, thực hiện cherry-pick `git cherry-pick has-commit`. Kiểm tra xem code đã được apply chưa nhé.

### Chiêu thức số 04: Khôi phục commit lỡ tay xóa đi
Trường hợp này thường gặp với những người mới, trong khi luống cuống, lỡ tay gõ lệnh `reset --hard HEAD~1` rồi bay màu luôn commit vừa hỳ hục code. Không phải xoắn, bởi vì git reflog là tấm bùa hộ mệnh của bạn. Rất đơn giản chúng ta chỉ cần cần thực hiện 2 bước sau. 

Bước 1: xem lại toàn bộ lịch sử commit bằng `git reflog`. Bước 2: chọn commit muốn khôi phục và khôi phục lại nó git reset --hard HEAD@{2}. Số 2 ở đây chính là số hiệu commit mà bạn muốn khôi phục lại. số hiệu này hiển thị khi bạn chạy git reflog ở bước 1.

### Chiêu thức số 05: Tuyệt chiêu với git reset
Ta nhắc lại dãy commit được nêu lên ở phần khởi động: A - B - C (HEAD->master). Để hiểu một cách đơn giản chúng ta sẽ chia dãy trên thành các trạng thái sau đây.

Ban đầu tại B chưa có gì thay đổi hết, ta gọi đây là (1). Sau đó ta change code, thực thi task, ta gọi đây là (2). Tiếp đến git add, code được lưu vào staging are, ta gọi đây là (3). Tiếp tục git commit, push, đẩy code change vào Repository (4). Con trỏ nhảy HEAD đến C.
Git reset và những người bạn sẽ hỗ trợ bạn tối đa trong công việc này.

Đầu tiên, `git reset --soft B`: sẽ giúp ta quay trở về vị trí (3), code thay đổi vẫn được giữ nguyên, và đây là ngay sau khi git add.

Tiếp đến `git reset B`: Quay về vị trí (2), lúc mới code xong và còn chưa git add.

Cuối cùng `git reset --hard B`: quay về vị trí (1), trống rỗng, code thay đổi sẽ được bỏ đi hết.

Và đừng quên câu nói này mình đã đưa ra ở đầu bài nhé: 
> Chắc chắn bạn đã bắt gặp HEAD~1 rồi đúng không, bạn có hiểu về nó chứ. Đây là cách diễn đạt chỉ tới commit đứng ngay trước HEAD trên cùng nhánh (Trong trường hợp này chính là B)

# Tổng kết
Trên đây là 5 chiêu thức mà mình muốn gửi tới các bạn để luyện công với bộ môn Git nhé. Chắc chắn trong quá trình làm việc bạn sẽ nhiều lần gặp phải các trường hợp như thế này. Đừng quá lo lắng, hãy tham khảo và thực hiện theo những hướng dẫn trên. Hy vọng trong thời gian tới mình sẽ có thêm cơ hội để chia sẻ với các bạn những bài tập khác không kém phần hữu ích nha. Chúc các bạn luyện công vui vẻ!!