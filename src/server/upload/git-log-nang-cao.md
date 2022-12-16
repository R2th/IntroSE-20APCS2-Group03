Xin chào các bạn, hôm nay mình xin giới thiệu về câc tính năng nâng cao của gitlog để giúp mọi người có thể xem lịch sử git  một cách hiệu quả hơn

### Xem gitlog một cách gọn gàng
Với `git log --oneline `, lịch sử của mỗi commit sẽ được rút gọn lại còn 1 dòng. Nếu bạn chỉ dùng `git log --oneline`, git sẽ hiển thị tuần tự id và dòng commit message đầu tiên của commit. 

### Xem commit cùng các nhánh liên quan
Với lệnh `git log --decorate`, bạn có thể xem các nhánh nào đang trỏ tới từng commit nào.

### Xem những thay đổi trong code của từng commit
Có 2 loại cờ mà bạn có thể truyền vào để git hiển thị thay đổi qua từng commit. `--stat` và `-p`.
Với `git log --stat`, git sẽ hiển thị số dòng code được thêm vào và xóa đi trong từng commit.
Với `git log -p`, git sẽ hiển thị thay đổi trong code của từng commit

### Gộp commit theo người viết
Với `git shortlog`, bạn có thể gộp commit theo người viết. Git sẽ hiển thị tên người viết, theo sau là số commit và dòng đầu tiên của mỗi commit.

### Xem đồ thị nhánh của lịch sử git
Với `git log --graph`, git sẽ hiển thị đồ thị hình nhánh của lịch sử git, gồm các commit nào được `checkout` từ nhánh nào, v.v

### Lọc lịch sử git
Bạn có thể lọc lịch sử git theo các tiêu chí mà bạn muốn.
1. Lọc theo số lượng commit
Dùng lệnh `git log -n`, git sẽ hiển thị `n` commit gần nhất
2. Lọc theo ngày
Dùng lệnh `git log --after='YYYY-MM-DD'`, bạn có thể lọc commit sau một ngày nhất định. 
Dùng lệnh `git log --before='YYYY-MM-DD'`,
bạn có thể lọc commit trước một ngày nhất định
`YYYY-MM-DD` cũng có thể được thay thế với các mốc thời gian nhất định bằng tiếng anh, ví dụ `yesterday` hoặc  `1 month ago`
3. Lọc theo tác giả
Dùng lệnh `git log --author='authorname'`, bạn có thể lọc commit theo tác giả
4. Lọc theo commit message
Dùng lệnh `git log --grep="commit_message"`, bạn có thể lọc theo `commit_message` mà bạn cần
5. Lọc theo file 
Dùng lệnh `git log -- file1.js file2.js`, bạn có thể xem các commit theo file
6. Lọc theo nội dung
Dùng lệnh `git log -S"content"`, bạn có thể lọc commit theo nội dung sửa đổi `content` ở code.
7. Lọc theo khoảng 
Dùng lênh `git log commitA..commitB`, git sẽ hiển thị các commit trong khoảng `commitA` đến `commitB`
Nếu dùng lệnh này với nhánh, ví dụ
`git log master..develop`, git sẽ in ra sự khác biệt giữa 2 nhánh `master` và `develop`
8. Lọc các merge commit
Với `git log --no-merges`, git hiển thị các commit không phải là merge commit
### Lưu ý
Một điểm mạnh của git là bạn có thể kết họp nhiều cờ cùng một lúc. Giả dụ, bạn muốn xem commit rút gọn của người viết `TuanAnhK`, từ ngày `2019-6-16`, trong file `main.py`, bạn có thể kết hợp các tiêu chí như sau:
`git log --oneline --after='2019-6-16' --author='TuanAnhK' -- main.py`

Đó là tóm tắt qua một số tính năng hữu dụng của git log. Mình hy vọng mọi người sẽ xem được lịch sử git hiệu quả hơn sau bài viết này. Cảm ơn vì đã đọc.

P/s: Bài đăng được viết khi tác giải đang lắc lư trên tàu hỏa, sẽ không thể tránh khỏi sạn. Có gì mong người đọc thông cảm.