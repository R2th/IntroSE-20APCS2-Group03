Bạn có biết Git không? Đó là một người bạn vô cùng đáng yêu và dễ thương mà mình đang theo đuổi. Trước đây, khi mới quen cậu ấy, mình đã cảm thấy cậu ấy thật phức tạp và rắc rối. Có những người, dù lúc đầu người đó làm bạn bực đến phát điên, nhưng khi hiểu về người đó rồi, bạn lại không thể ngừng yêu quý người đó được. Và mình với Git cũng vậy, càng tiếp xúc với cậu ấy, mình mới phát hiện ra cậu ấy không thật sự khó hiểu như mình nghĩ. Vì vậy, mình lỡ yêu cậu ấy mất rồi. Và hôm nay, mình sẽ kể cho bạn nghe về cậu ấy. Tất nhiên, mình sẽ không nói rõ Git là ai? Hihi, không phải tại mình ghen đâu nhé ^^. 
# 1. Đầu tiên là giải thích một chút nào.
### - Thế nào là repository, branch?
   - repository: Đó là kho chứa, gồm nhiều branch(nhánh), lịch sử thay đổi của các files và commit gắn với mỗi lần thay đổi trên mỗi nhánh.
    - branch: nhánh làm việc, gồm lịch sử code và commit trên nhánh. Các nhánh thì độc lập với nhau.
- Có 2 loại repository:
    - local repository: Là kho chứa tại máy tính của bạn. 
    - remote repository: Là kho chứa tại server của Github.

    Minh họa chút nhỉ ^^
    ![](https://images.viblo.asia/72d217c0-427c-42de-81ac-531398252d0f.png)
    
    Trong trường hợp bạn chỉ làm project cá nhân độc lập, không fork project để phát triển tiếp, thì remote của bạn sẽ chỉ bao gồm github cá nhân của bạn (Origin).
    
### - Phân tích chu kì của 1 file tại local:
![](https://images.viblo.asia/ed166a1d-1b36-4510-92c2-aeff333808cc.png)
Như hình vẽ trên, lệnh add sẽ chuyển file mới từ khu vực untracked sang tracked (đã được theo dõi). Và sau khi add, file có thể được chỉnh sửa, và commit sẽ kiểm tra lại xem file có bị chỉnh sửa hay không. Nếu sau khi add, không có sự chỉnh sửa thì file mới có thể push được. Ngược lại, nếu có chỉnh sửa, file phải được add, để ghi lại lịch sử thay đổi rồi mới có thể push. Lệnh commit sẽ đảm bảo các file đã được ghi lại trạng thái thay đổi và đã unmodified (không thay đổi nữa). Đồng thời, commit sẽ lưu lại ghi chú tóm tắt về những thay đổi mà bạn đã làm, khi đó, các file sẽ sẵn sàng để có thể push lên remote.

>> Có thể có bạn sẽ thắc mắc tại sao lại phải `add` rồi mới` commit` mà không `commit` luôn. Mục đích của việc tách 2 bước này là nhằm giúp bạn có thể phân loại các file đã thay đổi theo nhóm, mỗi nhóm có 1 commit riêng. Điều này giúp bạn có thể phân loại ghi chú files khi trong một pull request của bạn có nhiều sự thay đổi với ý nghĩa khác nhau.

# 2. Nên merge hay rebase
### Merge:
- Lệnh gộp code (lịch sử thay đổi code)
- Gộp commit hai nhánh vào một commit mới

Ví dụ minh họa việc merge nhánh login vào nhánh master

  ![](https://images.viblo.asia/e603ee9a-c7a0-4864-99a1-1307f937058d.png)
  
 > Lịch sử commit của nhánh master sau khi merge sẽ phức tạp như hình vẽ, có nghĩa là sẽ bao gồm cả nhánh login. Hãy sử dụng lệnh `$ git log --graph` để có thể thấy rõ hơn lịch sử commit.
### Rebase:
- Gộp code và các commit 
- Mang commit của nhánh khác sang nhánh hiện tại
- Commit mới nhất là commit cuối cùng trước khi rebase của nhánh hiện tại.

Đây là quá trình rebase code từ nhánh login sang nhánh master

![](https://images.viblo.asia/00da02fe-bbc2-4cbb-8334-8fb9c17226dd.png)

Và đây là  kết quả sau khi rebase tại nhánh master
![](https://images.viblo.asia/be070c93-9400-4b0b-a6f7-f94553b36eca.png)

> Chú ý: Thứ tự 1,2,3,... là thứ tự commit được tạo ra.

**Kết luận**: Nếu bạn muốn lưu giữ lịch sử commit đơn giản hãy dùng rebase. Ngược lại, nếu bạn muốn lịch sử commit cụ thể, rõ ràng thì bạn hãy dùng merge. Tuy nhiên, khi dùng rebase, trạng thái các file ở commit hiện tại (commit 3) sẽ bị thay đổi, nên có thể dẫn tới commit gốc không hoạt động. Phần tiếp theo sẽ giúp bạn giải quyết vấn đề này.

# 3. Đừng lo lắng khi không thấy code đâu.

Dù bạn có yêu quý một người đến thế nào, thì cũng sẽ khó tránh khỏi những lúc hai bạn giân dỗi nhau. Và với Git, đôi lúc mình cũng không hiểu (dù có hiểu cũng vậy) bạn ấy đã làm gì với cái project của mình, làm mình hết cả hồn. Ví dụ như khi fix conflict hay khi rebase code, hoặc là khi commit, sử dụng git reset để ignore files,... Những lúc ấy, code lại hay tìm cách chia tay bạn ấy thì thật không khả thi (nhất là khi đã phải lòng bạn ấy mất rồi huhu). Liệu trong tình huống ấy, chúng ta nên làm gì? cùng tìm hiểu nào.

**Đầu tiên, hãy cẩn thận với git reset nhé:**

Lệnh này sẽ di chuyển con trỏ HEAD về vị trí commit, nhưng tùy vào option, lịch sử các files sẽ có hoặc không được giữ nguyên.

| `$ git reset <id>`| `$ git reset --hard <id>`| `$ git reset --soft <id>` |
| -------- | -------- | -------- |
| Giữ nguyên trạng thái của các file nhưng sẽ loại bỏ các file đã commit khỏi stage.|Không giữ trạng thái thay đổi của các files.    | Giữ nguyên những trạng thái thay đổi của các files, cũng stage.     |
> <id> là mã commit được lấy bằng lệnh `$ git log --oneline`

-----


    
Và nếu như bạn lỡ `$ git reset --hard` và mất hết mọi thứ thì đừng lo. Chỉ cần bạn đã commit, thì chắc chắn bạn sẽ lấy lại được code thôi vì Git thực sự đáng yêu lắm.

*Đầu tiên, hãy xem lại lịch sử làm việc bằng git reflog:*


`$ git reflog`


*Tiếp theo, hãy chọn lịch sử bạn muốn quay lại. Lấy id của nó, và thực hiện lệnh:*
<br>

`$ git reset --hard <id>`


Vậy là mọi thứ đã quay lại như lúc ban đầu. Lệnh này thật sự rất tuyệt, nó giống như một cỗ mãy thời gian, giúp bạn có thể quay lại bất kì thời điểm nào, nhưng với điều kiện là thời điểm đấy đã được **commit** nhé.
    
Hi vọng bài viết này hữu ích với bạn. Hẹn gặp lại bạn ở bài viết tiếp theo nhé. ;)

Một số tài liệu tham khảo hay và hữu ích:

https://viblo.asia/p/co-ban-ve-git-Eb85oXROK2G
    
https://backlog.com/git-tutorial/vn/intro/intro1_1.html
    
https://git-scm.com/book/vi