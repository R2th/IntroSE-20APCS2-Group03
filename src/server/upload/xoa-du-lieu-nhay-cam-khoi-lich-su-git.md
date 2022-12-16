Chắc có lẽ chúng ta đều đã từng lỡ lầm phạm phải những nguyên tắc bảo mật như vô tình push một file mật nào đó (access token, password hay các chuỗi kết nối,...) lên git server và không có cách nào sửa sai kịp thời. Nếu là trước đây chắc thao tác này hẳn sẽ khiến chính chủ phải sống trong sợ hãi. Nhưng bây giờ thì mọi chuyện sẽ đơn giản hơn khi có BFC, một tool cho phép xoá sạch git repos của chính mình và có thể xoá cả những dữ liệu nhạy cảm một cách nhanh chóng chính xác. Hãy đảm bảo rằng bạn đã tải file jar BFC [tại đây](https://rtyley.github.io/bfg-repo-cleaner/) và có cài đặt sẵn java trong máy để chạy được tool. Khi nguyên liệu đã đủ, nào thì cùng bắt đầu thôi.

**Xóa dữ liệu nhạy cảm (Dữ liệu cũng có cảm xúc đấy)**

Xoá các file mật từ cả tệp lẫn trong commit của bạn trên branch master. Lý do vì sao phải làm vậy là vì HEAD commit luôn được coi là một commit cần bảo vệ và BFC tool chắc chắn sẽ không đụng tới nó.

```
git commit -m "Oops"
```
Thiết lập một bản sao mới từ Git. Sẽ cần sử dụng * --mirror* flag ở đây vì chúng ta chỉ cần chỉnh sửa trong lịch sử git chứ không đụng đến hầu hết các file trong repos.
```
git clone --mirror your_repo_url
```
Sao lưu bản sao này lại đề phòng xảy ra chuyện gì bất trắc. Tạo một file .txt và thêm vào đó các thông tin nhạy cảm mong muốn xoá. Nên tách mỗi mục một dòng riêng biệt. BFG sẽ tìm kiếm các từ khoá đã tạo thông qua lịch sử Git.
```
superawesomeapikey1
password123
```
Chạy lệnh dưới để dọn dẹp hết các bí mật không muốn bị tiết lộ.
```
java -jar bfg.jar --replace-text secrets.txt  your_repo.git
```
Thay đổi thư mục trong git repo và chạy lệnh sau để dọn dẹp các dữ liệu "bẩn" trong git.
```
cd your_repo
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```
Câu lệnh trên khá lằng nhằng khi còn sử dụng cả đến toán tử &&. Hãy thử bóc tách chúng ra riêng xem sao.
```
git reflog expire --expire=now --all
```
Đầu tiên, *reflog* ở đây là viết tắt của "Reference Logs". Reference logs sẽ chỉ theo dõi lịch sử Git lần cuối update. *expire --expire=now* trong câu lệnh trên dùng để cắt tỉa bớt các git reflog cũ. Cuối cùng, thêm thẻ* --all* để chỉ định câu lệnh chạy trên tất cả các tham chiếu.
```
git gc --prune=now --aggressive
```
Tiếp theo, chúng ta chạy lệnh *git gc*. Lệnh này về cơ bản là dùng để dọn sạch repos của mình. *--prune=now* dùng để xoá tất cả các references đến bất kì đối tượng git đơn lẻ hay cả những git không thể truy cập được. *--aguptsive* dùng để tăng tốc độ git để dọn dẹp mọi thứ sạch sẽ nhất có thể.
Khi mọi thứ đã xong xuôi, thao tác cuối để hồi phục về ban đầu như mong muốn:
```
git push 
```
Giờ thì tất cả những bí mật nhạy cảm đã bị cho bay màu một cách nhanh chóng.

Điều quan trọng khi sử dụng tool này là nó sẽ giúp bạn có một lịch sử Git sạch đẹp như omo. Và nếu có làm như này trong khi đang làm việc nhóm thì hãy lưu ý và đảm bảo cho đồng nghiệp của bạn có một bản sao git clone mới nhất nhé.

Link bài viết tham khảo [tại đây](https://dev.to/edmondso006/removing-sensitive-data-from-git-history-5g63)