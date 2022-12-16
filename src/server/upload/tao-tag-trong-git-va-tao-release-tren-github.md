Git và GitHub ngày nay không còn xa lạ với bất kì lập trình viên nào. Git là một hệ thống kiểm soát phiên bản (version), nó cũng là công cụ (tool) giúp ta quản lý lịch sử source code.
GitHub là dịch vụ lưu trữ (hosting) source code dự án sử dụng Git.
## 1. Tag trong Git
Tag là chức năng đặt tên một cách đơn giản của Git, nó cho phép ta xác định một cách rõ ràng các phiên bản mã nguồn (code) của dự án.
Ta có thể coi tag như một branch không thay đổi được. Một khi nó được tạo (gắn với 1 commit cụ thể) thì ta không thể thay đổi lịch sử commit ấy được nữa.

Có 2 loại tag là **annotated** và **lightweight**.

**Lightweight** tag thực chất chỉ là đánh dấu (bookmark) cho một commit, vì chúng chỉ lưu trữ hàm băm (hash) của commit mà chúng tham chiếu. Chúng được tạo chỉ gồm tên mà không có các tùy chọn -a, -s hoặc -m và không chứa bất kỳ thông tin bổ sung nào.

Để tạo một lightweight tag có tên "v1.0.0" cho Head commit hiện tại ta dùng lệnh sau,
```Git
$ git tag v1.0.0
```

**Annotated** tag thì mạnh hơn. Ngoài tên nó còn có thể lưu trữ dữ liệu bổ sung như Tên tác giả (-s), tin nhắn (-m: message), và ngày dưới dạng các đối tượng đầy đủ trong cơ sở dữ liệu Git. Tất cả thông tin ấy quan trọng cho việc release dự án của ta.

Lệnh tạo annotated tag có tên "v1.0.0" với thông điệp release như sau (chú thích -a nghĩa là anotated, -m nghĩa là message),
```Git
$ git tag -a v1.0.0 -m "Releasing version v1.0.0"
```

Một số lệnh thông dụng với tag trong Git.
* Liệt kê danh sách tag
Liệt kê -n tag đầu của toàn bộ danh sách tagg
```Git
$ git tag -l -n3
v1.0            Release version 1.0
v1.1            Release version 1.1
v1.2            Release version 1.2
```
* Thông tin chi tiết tag
```Git
$ git show v1.0
tag v1.0
Tagger: Kolosek 
Date:   Fri May 11 10:45:33 2018 +0100

Release version 1.0
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1

iMTvhAA...
-----END PGP SIGNATURE-----

commit 7d44b6bb8abb96dee33f32610f56441496d77e8a
Author: Kolosek 
Date:   Fri May 11 9:50:13 2018 +0100

    Edited the Login form
...
```
Lệnh xem chi tiết tag (ở đây là anotated tag) liệt kê tên tác giả, ngày tạo, thông điệp (message), chữ kí và thông tin commit mà nó trỏ đến.
* Sửa tag

Nếu ta tạo một tag mới trùng tên (ví dụ 'v1.0') với tag đã có thì Git sẽ bắn ngoại lệ *"fatal: tag 'v1.0' already exists"*.

Thay vì xóa tag đó và tạo lại tag khác, đơn giản ta thay thế nó trong khi vẫn giữ mô tả tag. Chọn commit_id trong lịch sử commit của ta mà ta muốn tag (cũ) dời đến và thêm tùy chọn -f hay -force vào lệnh git của ta.
```
$ git tag -a -f <tag_identifier> <commit_id>
```
* Xóa tag

Nói chung thì ta không có lý do gì phải xóa tag vì tag không chiếm nhiều tài nguyên. Chừ trường hợp ta đã tạo tag cho một commit sai, khi ấy mới cần xóa tag.
```
$ git tag -d <tag_identifier>
```
Trường hợp tag đó đã được **push** khi đó ta cần xóa nó từ remote repository như sau.
```
$ git push origin :v1.0
```
* Công khai (public) tag

Giống như commit, khi tag được tạo ra nó luôn ở local repository. Nó không thể tự động push lên remote repository mà ta phải push nó.

Đẩy toàn bộ tag ở local lên remote repository.
```
$ git push --tags
```
Đẩy riêng một tag lên remote repo.
```
$ git push <location> <tag_identifier>
```
```
$ git push origin v1.0
```
## 2. Tạo release (phiên bản phát hành) trên GitHub
Mục đích tạo **release** là để chia sẻ đóng gói ứng dụng, cùng các ghi chú phát hành và các link tới các file tài liệu ứng dụng cho mọi người trong team, công ty có sửa dụng.

Release dựa trên Git tag, nó đánh dấu một điểm cụ thể ở lịch sử repository của ta. Các release được sắp xếp theo thời gian chúng được tạo trên GitHub.

![](https://images.viblo.asia/3684d2bf-4f65-4334-917c-6369e5f298c1.png)

Lưu ý: Chỉ những user có quyền *push* lên repository mới có quyền tạo release.

Các bước tạo **release**.
* B1: Di chuyển đến trang chủ (main page) của repository trên GitHub mà ta cần tạo release.
* B2: Chọn **release*** - nút link ngay dưới tên repositry.

![](https://images.viblo.asia/421f23f2-7ba8-4b2a-b59d-5f924c0ae24a.png)

* B3: Click chọn **Draft a new release**.
![](https://images.viblo.asia/ae5a43ac-6778-4db1-b3b5-a06281fd648a.png)

* B4: Nhập phiên bản cho release của ta. Phiên bản dựa trên Git tag.

![](https://images.viblo.asia/9a8ac30f-e7f1-49d5-9bfa-f0c971d9b06a.png)
* B5: Ngay ô bên phải chọn branch của dự án cần release (drop-down-list)

![](https://images.viblo.asia/e41522d9-ea5b-4853-aefb-e090c78dcd94.png)
* B6: Nhập tiêu đề và nội dung cho release này.
* B7: Bạn có thể kéo thả các file tài liệu liên quan cho release phiên bản này lên *binaries box*.

![](https://images.viblo.asia/9d410ccf-b30a-4c0f-9580-c1a1fc9f4a56.gif)
* B8: Nếu release là không ổn định, chưa chính thức thì ta cần thông báo cho mọi người (liên quan) biết bằng cách chọn **This is a pre-release**.

![](https://images.viblo.asia/f7ab1c59-5a7c-4fde-8a74-a2416cb01593.png)
* B9: Nếu bạn sẵn sàng công khai bản release này thì click chọn **Publish release** , bằng không thì chọn **Save draft**.

![](https://images.viblo.asia/2e481703-56e9-4fbd-aeb8-4613250ac33d.png)

## Tài liệu tham khảo
* [Creating release on GitHub](https://help.github.com/en/articles/creating-releases)
* [Creating tag in Git](https://dev.to/neshaz/a-tutorial-for-tagging-releases-in-git-147e)