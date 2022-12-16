# Mở đầu
##### Trong bài này mình sẽ hướng dẫn cách deploy dự án ReactJS lên Heroku chỉ với một vài bước đơn giản.
Bạn cần deploy một dự án ReactJS hay NodeJS vừa hoàn thành cho nhà tuyển dụng xem, hay cần deploy để trình bày đồ án tốt nghiệp trước hội đồng trường mà không muốn sử dụng localhost hoặc đơn giản là cho bạn bè xem thành quả của mình thì đây là cách đơn giản để bạn deploy một dự án.
## Các bước chuẩn bị
1. Tạo tài khoản **Heroku** tại [https://www.heroku.com/](https://www.heroku.com/)
2. Tạo repo và đẩy code dự án của bạn lên **Github** ( Nếu chưa biết Github bạn có thể tham khảo [ở đây](https://techmaster.vn/posts/35408/huong-dan-day-code-len-github) )
# Bắt đầu 
1. Đăng nhập vào **Heroku** tại  [https://www.heroku.com/](https://www.heroku.com/).
2. Chọn **New** > Chọn **Create new app** để tạo mới một app.
![](https://images.viblo.asia/de697a41-2285-4be4-ba5d-939ed7863007.png)
3. Nhập tên dự án ( ở đây mình nhập new-app-example-deploy ) .
![](https://images.viblo.asia/045373ff-e0de-40e3-b088-3952f28316cc.png)
4. Chọn **Create app** để tạo app.
5. Ở tab **Deploy** chọn Github làm phương thức deploy và nhập repo name của project vào phần search.
![](https://images.viblo.asia/7b8dc7b2-c621-413b-857b-2dc329170e89.png)
6. Sau đó chọn **Search** để tìm repo và chọn **Connect** để kết nối đến sourse code.
7. Ở phần **Automatic deploy**  chọn **branch master** hoặc **main** tùy vào dự án của bạn và chọn **Enable Automatics Deploys**, nghĩa là sau khi branch **master** hoặc **main**  thay đổi thì **Heroku** sẽ tự động deploy lại theo code mới nhất của branch đó.
![](https://images.viblo.asia/e6bf8d51-e707-40b6-bb37-3bad37a58273.png)
8. Sau đó chuyển sang tab **Setting**.
![](https://images.viblo.asia/9464682b-85eb-4f87-b0f4-c9ef4572c61b.png)
9. Ở mục **Buildpacks** ta chọn **Add Buildpack** sau đó paste [https://github.com/mars/create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack) vào ô URL và chọn **Save changes**.
![](https://images.viblo.asia/e3d688e6-19eb-4ec3-94e5-f01d076b13e0.png)
10. Sau đó quay lại tab **Deploy** và tiến hành **Deploy** lần đầu.
![](https://images.viblo.asia/23b88720-9994-46ef-831f-e6f1331443af.png)
11. Cuối cùng hãy chọn **View buildlog** để xem quá trình deploy của bạn.
![](https://images.viblo.asia/39cd5143-6d0b-438c-ad92-9199eb850fb6.png)
Sau đó...
![](https://images.viblo.asia/80264f98-dbb9-49f1-903f-09609249fd2e.png)
Vậy là bạn đã hoàn thành quá trình Deploy một dự án ReactJS, giờ đây bạn có thể truy cập vào link ( phần gạch đỏ như trên hình ) để xem thành quả.
## Lưu ý
Có thể xảy ra lỗi ở quá trình Deploy thường là không tìm thấy **modules** nào đó vì vậy hãy **uninstall** các thư viện trong **devDependencies** và **install** lại trong **Dependencies**.
Cảm ơn bạn đã đọc bài viết.
Chúc bạn thành công.