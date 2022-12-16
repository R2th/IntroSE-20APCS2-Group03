Việc tạo blog trên Github Pages khó hơn rất nhiều so với những Wordpress.org, Blogspot, Tumblr, LiveJournal, Medium... nhưng đánh đổi lại là khả năng tùy biến rất cao.
#  TẠO BLOG THEO MẪU JEKYLL-NOW
## 1. Chuẩn bị
* Tài khoản Github, tên tài khoản sẽ là tên miền của bạn luôn nên nhớ chọn cái tên đẹp đẹp xíu, đừng số má dài dòng hoặc ngố quá như o0oprincecutezzo0o :laughing:, mọi người nhìn vào mà. 
* Hiểu sơ sơ về HTML và CSS nếu có nhu cầu trang trí chút đỉnh. Còn không thì bạn sẽ có một blog giống như mặc định của Barry Clark thế này

![](https://images.viblo.asia/109f5131-c825-4cf8-9e6f-0a93f40bdeb7.png)

## 2. Tiến hành
### 2.1 Lấy code blog mẫu về
[Vào link này của Barry Clark](https://github.com/barryclark/jekyll-now) rồi nhấn fork cái repo (tên gọi mỗi project trên Github) đó về.
![](https://images.viblo.asia/84865afd-7868-45ba-a367-20b201340743.png)

Sau ít phút sẽ fork xong. bây giờ nhấn Setting

![](https://images.viblo.asia/71085490-073e-408a-8de2-c076e6c56bad.png)

Trong ô repository name, xóa chữ jekyll-now đi và điền tên tài khoản github của bạn kèm đuôi github.io, ví dụ như mình sẽ điền là leducson.github.io

![](https://images.viblo.asia/4e204ea0-5f77-4d43-b06c-68b5f715cf31.png)

Xong rồi đó, bây giờ cũng trong trang Settings đó, bạn kéo kéo xuống dưới phần Github page, sẽ thấy thông báo thành công. 
![](https://images.viblo.asia/d01e76cb-3419-4298-a08a-138d42837aff.png)

Thông báo thì nhanh nhưng trình duyệt có khi mất vài phút để cập nhật nên bạn truy cập vào tên.github.io vẫn hiện cái màn hình 404 như này thì đừng hoảng hốt nhé.

![](https://images.viblo.asia/1d101763-84c1-41b2-abf2-78c4d377d92e.png)

### 2.2 Thay base url, tên, thay avatar
Vào github.com, tìm đến cái repo (project) mà bạn vừa tạo. 
Để ý kĩ sẽ thấy có biểu tượng cái dĩa (hay mỏ neo gì đó mình không nhìn rõ) ở đầu repo đó, ám chỉ là đồ đi fork về chứ không phải tự tạo ra... nghĩa là bạn đã làm đúng rồi đó
![](https://images.viblo.asia/f0183be2-a918-4373-bdff-c633ab9e3681.png)

Sau khi vào được web thì bạn sẽ thấy nó không có CSS gì cả, là do chưa thay base url trong config nên file css chưa link vào được.

Đi vào bên trong repo đó sẽ thấy một loạt file và thư mục, bạn tìm đến file` _config.yml` rồi tìm biểu tượng chỉnh sửa
![](https://images.viblo.asia/60e126ff-e8b4-435c-a8b3-9afa7f0a79c6.png)

![](https://images.viblo.asia/016d5e50-7025-4d5a-8e2b-a5917ada075b.png)

### Thay url
Nếu repo của bạn là username.github.io thì bỏ qua chỗ này, nếu là 1 repo khác thì chỗ base url điền tên repo của bạn vào
![](https://images.viblo.asia/9f29e595-55e2-463d-8fb5-1759be225e4d.png)

### Thay avatar
Điền tên trang, mô tả trang, và link avatar của bạn vào phần tương ứng
![](https://images.viblo.asia/95c70802-e4bb-40a0-ae31-0938ab9d79a6.png)

Ở ngay dưới là link các mạng xã hội của bạn, cứ thế điền vào thôi, mình thì chỉ xóa đi những link mẫu đã
![](https://images.viblo.asia/325f29f1-4a44-4475-90c2-8cd846b550b4.png)

Ở dưới nữa thì cũng sẽ có lúc cần đến đấy, nhưng tạm thời bây giờ thì chưa cần, bỏ qua.
Có thể coi như tạm tạo lập xong. Lúc này bạn vào tên miền của mình thì sẽ thấy vẫn là Your Name... thì đừng lo lắng quá. Mất vài phút để trình duyệt cập nhật thôi mà. Sau khi chời đợi một xíu thì sẽ thấy là được rồi nè
![](https://images.viblo.asia/dd6a7f27-9cbf-465a-8481-6f986c07ce1b.png)

# Kết
Vậy là đã xong các bước config để tạo 1 website cở bản với github page và jekyll.
Ở bài viết sau mình sẽ hướng dẫn các bạn thêm bài viêt trên github pages.

Chúc các bạn thành công!