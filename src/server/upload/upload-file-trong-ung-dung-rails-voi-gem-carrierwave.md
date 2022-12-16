## Giới thiệu
Một trong những phương pháp mà tôi tiếp cận ban đầu trong việc upload file ở trong Rails là sử dụng gem Carrierwave, một gem được sử dụng khá phổ biến. Chúng ta có thể xem qua [Source github](https://github.com/carrierwaveuploader/carrierwave), được rate khá cao với gần 10k.

Với gem Carrierwave thì nó khá dễ để bắt đầu, nó có rất nhiều tính năng và cung cấp rất nhiều bài viết về "cách thực hiện" được viết bởi các thành viên trong cộng đồng.

## Bắt đầu nhỉ?

### Chuẩn bị

Tạo 1 dự án mới:
```
rails new upload-file-with-carrierwave
```
```
cd upload-file-with-carrierwave
```
Ở Gemfile,
```
gem "carrierwave"
```
Sau đó,
```
bundle install
```
Generate model User với 3 thuộc tính, trong đó có thuộc tính avatar để chứa đường dẫn ảnh
```
rails generate model User username:string email:string avatar:string
```
Generate controller users_controller với action update_avatar
```
rails generate controller Users update_avatar
```
Phake 1 user
```
rails c
User.create username: "tran.xuan.loc", email: "tran.xuan.loc@gmail.com"
```

### Thực hiện với gem 
Sau khi đã có những thứ cần thì chúng ta sẽ thực hiện các kĩ thuật để có thể upload được file

Tạo 1 kênh tải lên avatar_uploader
```
rails generate uploader Avatar
```
1 file được tạo ra `app/uploaders/avatar_uploader.rb`, chúng ta sẽ config vài thứ trong này, function

store_dir: Đường dẫn file sẽ được tạo ra ở đây

extension_allowlist: Limit đuôi file, ví dụ file ảnh thì png, jpg, gif

...

Sử dụng trình tải lên này cho User, trong User model: sử dụng AvatarUploader cho field avatar của model User
```
mount_uploader :avatar, AvatarUploader
```

Ở trong controller chúng ta chỉ cần, với params[:file] trong form-data
```
class UsersController < ApplicationController
  def update_avatar
    current_user.update avatar: params[:file]
    render json: {status: :ok, message: "File upload successful", data: current_user.avatar}, status: status
  end
end
```
### Chạy thử (mình dùng Postman)
Call api POST http://localhost:3000/users/update_avatar

form-data: params là file, với file ảnh tên tran-xuan-loc.png

Quan sát ảnh sau
![](https://images.viblo.asia/2bdebea7-31b6-4f39-9aa3-571d63829564.png)

Send thử và nhận được response
```
{
    "status": "ok",
    "message": "File upload successful",
    "data": {
        "url": "/uploads/user/avatar/1/tran-xuan-loc.png"
    }
}
```
![](https://images.viblo.asia/90438171-1aa5-493f-8d58-7030c50b952f.png)

Như vậy là chúng ta đã tạo được 1 kênh upload đơn giản với gem carrierwave.

Chạy thử đường dẫn ảnh trên trình duyệt
![](https://images.viblo.asia/4aa489c4-0fae-4963-adda-6cb32b1004b4.png)


## Kết
Trên đây là cách mà mình đã bắt đầu với việc upload 1 file đơn giản lên ứng dụng Rails. Mình có để [Source](https://github.com/loctx-2273/upload-file-with-carrierwave/) đã demo các bước ở trên. Nếu có góp ý về mặt hình thức cũng như nội dung, vui lòng để lại nhận xét ở phần comments để mình hoàn thiện bài viết hơn cho bạn đọc sau. Cám ơn các bạn đã quan tâm./.