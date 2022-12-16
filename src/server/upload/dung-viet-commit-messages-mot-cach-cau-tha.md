## Đặt vấn đề
Bạn đang làm việc trong một dự án và đang dùng Git để quản lý source code.
Bạn đã code xong chức năng mà mình đã nhận, và muốn push code lên để mọi người review. Bạn sẽ thao tác với trên màn hình terminal như sau
```
git add .
git commit -m "added new feature"
git push your_branch
```
Sau đó qua vài thao tác test chương trình, bạn thấy xuất hiện có bug trong code của mình, bạn fix bug, chương trình hết lỗi, sau đó lại thực hiện thao tác 
```
git add .
git commit -m "fix bug"
git push your_branch
```
Bạn thực hiện quá trình này một vài lần, và sau đó bạn có một log các `git commit` của mình như sau:

![](https://images.viblo.asia/11b7b1e7-39d9-4692-a811-f405193c31ae.jpg)

Ở thời điểm hiện tại, bạn nhận thấy chưa có vấn đề gì xảy ra với mình. Bạn vẫn làm việc bình thường và có thể hiểu và giải thích những gì mà mình đã làm ngay cả khi những `commit messages` kia không giải thích rõ được những gì bạn vừa làm.

## Vấn đề gặp phải

Sau vài tháng, bạn không làm dự án này nữa, thay vào đó là một người khác. Người mới này sẽ phải xem lại những thay đổi bạn đã làm trước đó và cố gắng hiểu được nó. Nhưng vì các `commit messages` của bạn được miêu tả không rõ ràng nên nhân viên này không 
có thêm được thông tin nào khác. Sau đó họ dùng cách đọc lần lượtqua từng `commit messages` khác nhau. Tuy nhiên, ngay cả sau khi làm như vậy, họ vẫn không thể hiểu được logic của bạn sau các dòng code mà bạn đã làm.
Bây giờ, nhờ vào `git blame`, nhân viên mới biết được bạn đã viết những dòng code này và bắt đầu đặt ra những câu hỏi cho bạn. Tuy nhiên, đã rất lâu rồi, bạn không thể nhớ được nhiều. Bạn kiểm tra lại thông qua  những `commits` của mình, và cũng không thể nhớ được 
những logic mà mình đã làm trước đó. Và bạn cũng không thể cung cấp thêm thông tin gì khác ngoài những thứ bạn nhân viên mới đã có được trước đó.


### Viết một commit messages tốt hơn

Hy vọng rằng, tình huống trên đã chứng minh tại sao việc viết một `commit messages` tốt lại quan trọng đến thế. Trong lĩnh vực như công nghệ thông tin, điều bắt buộc là chúng ta phải giúp các đồng đội dễ dàng nhanh chóng hiểu được bối cảnh trong công việc của mình. 
Lý tưởng nhất, một `commit messages` tốt sẽ được cấu trúc thành ba phần:  chủ đề, nội dung và kết thúc.
### 1. Phần chủ đề
Chủ đề phải là một dòng duy nhất tóm tắt các thay đổi trong `commit-messages` của bạn.  Phần này nên được viết bắt đầu bằng chữ in hoa, không kết thúc bằng dấu chấm và có từ 50 ký tự trở xuống. Một dòng chủ đề tốt sẽ hoàn thành câu “This commit will …”. Một `commit-messages` tốt như “add new neural network model to back-end”, kết thúc câu nói một cách hoàn chỉnh. Một `commit-message,` không tốt như  “fix bug”  không hoàn thành được nội dung câu “This commit will …” thay vào đó nội dung `commit-messages` như “This commit will fix bug” sẽ tốt hơn nhiều.
### 2.Phần nội dung
Phần nội dung sẽ chứa thông tin chính trong `commit-messages` của bạn, phần này sẽ nói chi tiết những thay đổi trong code của bạn. Đối với những thay đổi nhỏ như sửa lỗi chính tả thì phần này sẽ không cần thiết vì câu chủ đề của bạn đã có đủ thông tin rồi. Trong phần nội dung, bạn nên đi sâu vào chi tiết hơn về những thay đổi bạn đang thực hiện và giải thích bối cảnh của những gì bạn đang làm. Bạn có thể giải thích lý do tại sao bạn thực hiện những thay đổi này, tại sao bạn chọn thực hiện các thay đổi theo cách cụ thể này và bất kỳ điều gì khác có thể giúp mọi người hiểu bạn đang làm gì với `commit-messages` này. Cố gắng không lặp lại những điều rõ ràng từ những thay đổi trong phần code của bạn trong pull request vừa gửi. Không cần phải đưa ra lời giải thích từng dòng về những thay đổi của bạn có trong code. Mục tiêu cuối cùng là cung cấp bối cảnh xung quanh sự thay đổi này.
### 3.Phần kết 
Cuối cùng, phần kết thúc là dòng cuối cùng của `commit-messages` của bạn.  Đây là nơi bạn có thể đưa những thông tin hữu ích vào trong `commit-messages` của mình. Ví dụ như: link ticket, link spec... các lệnh cần chạy trước để code của bạn hoạt động được. Điều này có thể giúp liên kết các thông tin quan trọng trong `commit-messages` của bạn với nhau
Một `commit-messages` hoàn chỉnh sẽ có dạng như sau: 

![](https://images.viblo.asia/ed08fb27-f038-41a8-ab03-de5f6cf97402.png)

## Kết luận
Trên đây là một vài lưu ý nhỏ của mình khi tạo 1 pull request với `commit-messages` được viết rõ ràng. Để người review hoặc đồng nghiệp có thể hiểu được nội dung pull request của bạn.
Bài viết còn nhiều thiếu sót, mong mọi người thông cảm.
Cám ơn mọi người đã đọc bài viết của mình.
### Nguồn: https://medium.com/better-programming/stop-writing-bad-commit-messages-8df79517177d