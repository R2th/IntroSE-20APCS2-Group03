## Giới thiệu
Github có chức năng rất nay là giúp các bạn đưa trang web của mình lên hoàn toàn miễn phí. Hôm mình mình sẽ hướng dẫn các bạn cách deploy 1 trang web Flutter lên Github nhé. Cùng bắt đầu thôi nào!

## Các bước thực hiện
Để deploy 1 trang web flutter lên github. Trước tiên chúng ta cần tạo 1 repository trên github, sau đó tạo 1 dự án flutter và đẩy nó lên github.

### Tạo repository Github
- Các bạn vào link github.com, đăng nhập vào và nhấn `New` nhé
![](https://images.viblo.asia/545caca1-2232-4163-8c42-f9485a260ffd.png)

- Ở Repository name mình sẽ điền đại 1 tên là `demo_flutter_web` và nhấn Create repository
![](https://images.viblo.asia/67d4a7c8-6f22-4896-abd2-f1fffd2a8aff.png)

- Sau đó mình sẽ được dẫn tới link repository `https://github.com/tiendung01023/demo_flutter_web`. Các bạn nhớ link github này nha, tý mình sẽ dùng tới
![](https://images.viblo.asia/3709fe46-2204-463c-9287-501e443dbcef.png)

Xong phần khởi tạo repository git. Giờ mình đến phần flutter thôi.

### Tạo dự án flutter

- Các bạn mở Terminal lên và tạo 1 project nha. Ở đây mình sẽ đặt tên là `demo_web`
```shell
flutter create demo_web
```

- Giờ tiếp tục tại terminal, mình `cd` vô dự án
```shell
cd demo_web
```

- Vì giờ mình quan tâm đến web, tạm thời bỏ qua mobile. Nên mình sẽ chạy lệnh build trên chrome xem trang web chạy trên local sẽ như thế nào ha

![](https://images.viblo.asia/7c4b7bdd-22bd-4e1f-9d04-3a16f4be15c6.png)

- Chạy demo xong các bạn nhấn `Ctrl + C` trên Windows hoặc `control + C ` trên MacOS để dừng demo.

- **Lưu ý**: khi bạn muốn deploy web của mình lên github. Bạn cần thêm tên repository vào file như sau:

-> Bạn mở file `demo_web/web/index.html` bằng bất kì trình chỉnh sửa nào

-> Dự án github mình đặt là `demo_flutter_web`. Tại thẻ `base` bạn sửa lại thành `<base href="/demo_flutter_web/">` và nhấn lưu lại

![](https://images.viblo.asia/df40bb83-b007-4823-a98d-201a0a5f2d74.png)

- Tiếp theo tại terminal mình sẽ chạy câu lệnh build flutter bản web
```shell
flutter build web
```

- Sau khi lệnh chạy xong bạn sẽ thấy thêm thư mục `demo_web/build/web`. Bạn `cd` terminal đến thư mục này. Mình sẽ chỉ publish thư mục này lên git thôi nha.

```shell
cd build/web
```

- Giờ mình upload thư mục này lên github. Các bạn mở lại link github repository sẽ có phần hướng dẫn nha, hoặc các bạn chạy từng dòng lệnh như mình làm dưới đây cũng được
```shell
git init
git add .
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:tiendung01023/demo_flutter_web.git
git push -u origin master
```

- Sau khi chạy hết các bạn lên repo github xem các file đã được upload lên chưa nha
![](https://images.viblo.asia/0b431b4c-9785-42a4-9fbd-72c0da8111ad.png)

Thế là đã xong phần tạo và upload dự án flutter_web lên github. Về sau khi bạn viết thêm chức năng cho dự án, bạn cần chạy lại câu lệnh build web và push data mới lên github nha.

### Tạo page demo trang web trên github

- Vào link github. Chọn tab `Settings`, xuống mục Pages
![](https://images.viblo.asia/83b2010a-6bc2-4bb2-9d0f-84cdb2dc203a.png)

- Trong Github Pages, bạn chọn nhánh mà muốn hiển thị trang web, hiện tại của mình thì chọn `master` nha. Sau đó nhấn `Save`

![](https://images.viblo.asia/9588d559-cf7d-4d2f-86d6-48211df6b455.png)

Như hình trên Github báo đã tạo thành công trang web `Your site is published at https://tiendung01023.github.io/demo_flutter_web/`. Bạn bấm vào link đó để xem thành quả nha


## Kết thúc
Hi vọng qua bài viết của mình sẽ giúp bạn sáng tạo thêm 1 số trò với flutter web này nha

Cảm ơn các bạn đã xem bài viết.
## Tác giả
Phạm Tiến Dũng
tiendung01023@gmail.com