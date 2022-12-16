# 1. Sửa trực tiếp trên github
Khi bạn đang ở trên github, khi đang ở 1 file cụ thể nào đó thì ở phía trên bên phải sẽ có 1 biểu tượng bút chì. Thì đây chính là chỗ để bạn sửa file trực tiếp trên git. Khi bạn chỉnh sửa xong thì click vào **Commit changes** các bạn nhớ điền đầy tên commit như bình thường nhé.
![](https://images.viblo.asia/ce44b879-4842-4ed2-85e2-74fc1b37d8f9.png)
Không cần fork hay tạp pull để thay đổi, các bạn có thể nhanh chóng sửa lại code khi cần thiết. Mình thấy nó khá hữu dụng.
# 2. Paste file ảnh
Ở trong comment, hay description giờ đây ngoài nội dung text ra bạn hoàn toàn có thể paste hình ảnh vào trong đó bằng clipboard. 
![](https://images.viblo.asia/72c50c4a-1680-4312-8783-aab9edb3dbe0.png)
# 3. Đóng issues với câu lệnh trong PRs
Giả sử bạn tạo một yêu cầu kéo để fixes issue # 234. Bạn có thể thêm “fixes # 234” trong phần mô tả của PR. Sau đó, khi `merged` pull sẽ tự động đóng vấn đề đó.
Bạn tham khảo thêm [tại đây](https://help.github.com/en/articles/closing-issues-using-keywords) nhé.
# 4. Lấy link tới comment, dòng code
Đôi lúc bạn muốn lấy link dẫn tới 1 comment nào đó, hay 1 dòng code nhưng bạn không tìm ra cách? Thực ra nó cũng đơn giản thôi, bạn chỉ cần click vào dòng hiển thị thời gian của comment như hình bên dưới.
![](https://images.viblo.asia/3e9bb6ec-9b41-432a-a89c-6baa28433a81.png)

Còn đối với link tới dòng code thì các bạn chỉ cần click vào số thứ tự của dòng trong file là được, có số ở lề bên trái đó. Khi click vào thì trên thanh gõ url dòng sẽ đc gen ra tương ứng thôi.
![](https://images.viblo.asia/02195b91-f1b3-43a9-89b6-04c4d098d621.png)
# 5. Tạo lists, trong issues, pulls
Tạo các check boxes trong phần description dễ dàng bằng cú pháp sau:
```
 - [ ] Screen width (integer)
 - [x] Service worker support
 - [x] Fetch support
 - [ ] CSS flexbox support
 - [ ] Custom elements
```

Và kết quả sẽ là:

![](https://images.viblo.asia/6509853a-37c4-461f-ad6c-1c9f52fa1dbf.png)

Việc tạo check list như thế này vừa để chúng ta check lại nội dung đầu việc, cũng như các thành viên trong dự án có thể xem được tiến độ chúng ta đang làm đến đâu.

![](https://images.viblo.asia/f799a8b2-6c92-4a40-83d1-72a360547a92.png)
# 6. Octotree Chrome extension
Các bạn nên cài [Octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc?hl=en-US) nó sẽ rất hữu dụng cho công việc tìm file code cho bạn. Vì nó sẽ hiện thư mục code code bạn giống như editor vậy.  Sau khi cài đặt xong thì các bạn nhớ config theo hướng dẫn nhé.
![](https://images.viblo.asia/e1c78b75-e81e-4a30-a772-5a9ef8253565.png)