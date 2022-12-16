![](https://images.viblo.asia/2795c58b-4d76-46fa-850b-12be3b21e4bf.jpg)
Github Pages là một từ khóa không còn xa lạ gì với dân dùng git nữa. Với Github Pages bạn có thể sử dụng làm demo cho project của mình hoặc xa hơn có thể host một web tĩnh/blog cá nhân với chi phí 0 đồng. Tuy nhiên bạn đã biết Github Pages có chức năng tùy chỉnh tên miền chưa ? Bạn đã biết trỏ Github Pages về tên miền tùy chỉnh của mình chưa ? Nếu chưa biết hãy cùng mình tìm hiểu trong bài viết này

**Điều kiện cần:** bạn phải có cho mình một tên miền đã đăng ký và truy cập vào được cPanel quản lý DNS. Trong bài này mình sẽ sử dụng tên miền free của FreeNom để demo

## Bước 1: Push Repo
Push repo của mình lên Github, đừng quên đặt file `index.html` tại thư mục root
## Bước 2: Bật Github Pages
Chuyển sang tab `Settings`, kéo xuống tìm phần `Github Pages` và chọn nhánh master để bật.

![](https://images.viblo.asia/f6276b49-38dc-40af-b9f2-38d8e39c72e1.png)

Lúc này bạn đã có thể truy cập Github Pages của mình

![](https://images.viblo.asia/3e8aa083-5b1f-490f-a691-76da9f16d9e7.png)

## Bước 3: Trỏ IP
Tại đây bạn truy cập cPanel quản lý tên miền đã mua và lần lượt tạo 4 bản ghi A với giá trị như sau
* 185.199.108.153
* 185.199.109.153
* 185.199.110.153
* 185.199.111.153

![](https://images.viblo.asia/8e8d8246-e363-4be5-b278-626b115445bf.png)
## Bước 4: Nhập tên miền tùy chỉnh
Quay trở lại setting của Github Pages và nhập tên miền tùy chỉnh của bạn vào
![](https://images.viblo.asia/3cc5d496-9354-4fa7-a92e-b086124315af.png)

Bạn lưu ý nếu lựa chọn Enforce HTTPS tạm thời chưa được tích thì hãy kiên nhẫn đợi một khoảng thời gian để hệ thống update DNS nhé, kiểu gì cũng sẽ tích được :D

Và cuối cùng là tận hưởng thành quả thôi !

![](https://images.viblo.asia/d2ba9214-c3ac-4869-ac87-779c920c17f8.png)

### Mở rộng
Trong trường hợp bạn không muốn sử dụng tên miền chính của mình cho Github Pages thì có thể tạo thêm các subdomain để dễ dàng custom cho từng project. Cách thức thực hiện như sau

Quay trở lại cPanel và tạo thêm một bản ghi CNAME **có name là subdomain bạn muốn tùy chỉnh và value là domain github page của bạn**

![](https://images.viblo.asia/81bdf889-0635-42c6-8837-df2dc113a63a.png)

Cuối cùng chỉnh lại domain trong Github Pages
![](https://images.viblo.asia/e293338b-b167-4dd8-8431-795a4b50fd0d.png)

## Kết luận
Trên đây mình đã giới thiệu tới các bạn cách 'Cấu hình tên miền tùy chỉnh cho Github Pages', với con hàng ngon bổ rẻ này chắc chắn chúng ta có thể làm được nhiều điều hay ho với nó.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !