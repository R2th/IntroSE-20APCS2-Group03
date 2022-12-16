Một ứng dụng mobile tốt thì đòi hỏi việc load data phải nhanh, performence phải tối ưu. Đó là điều kiện cần phải có nếu như mong muốn người dùng có trải nghiệm tốt nhất.. :grinning:.. Trong bài viết này chúng ta cũng đi vào tìm hiểu kỹ thuật Progressive Image Loading mà hầu hết các web hiện nay đều sử dụng.
## kỹ thuật Progressive Image Loading
Để xem cách mà hình ảnh được load theo kỹ thuật progressive thì chúng ta hãy xem video bên dưới
{@embed: https://www.youtube.com/watch?v=wmwfYEzv3aQ}

*1. Đầu tiên ứng dụng sẽ load 1 ảnh từ assets để hiển thị.* <br />
*2. Sau đó sẽ load 1 phiên bản thu nhỏ (thumbnail) của ảnh, ảnh này có kích thước rất nhỏ khoảng từ 1-10kb. nên ảnh này được load rất nhanh* <br />
*3. Sau khi ảnh thu nhỏ được tải xong thì ảnh gốc sẽ được load vào để hiển thị* <br />
## Cách thực hiện trên flutter
**1. Thêm package**
>     progressive_image: ^1.0.1
   Truy cập vào link https://pub.dev/packages/progressive_image/instal. để thêm package mới nhất <br />
**2. Thêm hình ảnh placeholder vào assets.** <br />
    Truy cập https://bit.ly/34Kxhbo để tải hình ảnh placeholder và thêm vào project như hình bên dưới nhé. Nếu chưa có thư mục assets thì hãy tạo một thư mục mới.  <br />
    ![](https://images.viblo.asia/72a1f48c-5aa1-4f5a-a7e9-3711241c05a8.png) <br />
    Sau khi thêm hình ảnh vào assets thì chúng ta hãy vào file pubspec.yaml để thêm đường dẫn truy cập vào assets. Bạn nào chưa rõ về assets trong flutter thì tham khảo thêm tại https://flutter.dev/docs/development/ui/assets-and-images.
    
![](https://images.viblo.asia/33a3a818-5f61-47c7-8f23-06e53046cf36.png)
Chạy lệnh pub get để cập nhật lại thay đổi
>  flutter pub get
 <br />
 
 **3. Bắt đầu code**
```
ProgressiveImage(
    placeholder: AssetImage('assets/placeholder.jpg'),
    thumbnail: NetworkImage('https://i.imgur.com/7XL923M.jpg'),
    image: NetworkImage('https://i.imgur.com/xVS07vQ.jpg'),
    height: 300,
    width: 500,
),
```

Khá đơn giản phải không nào :joy::joy:

Source code
>https://github.com/longth97/progressive-image