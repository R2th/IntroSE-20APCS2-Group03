# Intro
Việc gửi dữ liệu JSON được tạo ra từ các chuỗi string tới một API hầu như thật dễ dàng để chúng ta dễ hiểu. Nhưng đối với việc gửi các tệp bao gồm nhiều dòng dữ liệu nhị phân với các định dạng khác nhau thì sao? Chúng sẽ có một cách tiếp cận khác để gửi tệp lên API. Tôi sẽ dùng phuơng pháp mã hóa base64 thông qua API Rails .
# In Angular 2
Ở phía client, đầu tiên tạo một model cho user
```
// src/app/shared/models/user.ts

export class User {
    id: number;
    name: string;
    avatar: string|any;
}
```

Tạo component post bằng lệnh `ng generate component post`
Ta viết giao diện trong file
```
// src/app/user/user.component.html

<form [formGroup]="formUser" novalidate (ngSubmit)="save(formUser)">
  <div class="row">
    <div class="col-md-9">
      <label>Username</label><br>
      <input type="text" formControlName="name" value=""><br>
      <label for="avatar">Avatar</label>
      <input name="file" type="file" (change)="onFileChange($event)">
      <input type="hidden" name="fileHidden" formControlName="avatar">  
      <button type="submit" class="btn-save">save changes</button>
    </div>
  </div>
</form>
```
điều chú ý ở đây là `<input name="file" type="file" (change)="onFileChange($event)">` Tôi đang đính kèm một sự thay đổi ở đây (onFileChange), nó sẽ xử lý nếu muốn tải tệp lên. Trong component.ts bạn viết hàm như sau:

```
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formUser.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
```
FileReader chịu trách nhiệm đọc nội dung của tệp gửi lên

Ta viết một service gửi dữ liệu lên server rails
```
// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../user'

@Injectable()
export class UserService {
  addUser(user): Observable<User> {
    return this.http.post(`localhost:3000/auth/users/${user.id}`, user)
      .map(mapUser);
  }
}

function toUser(r:any): User{
  let user = <User>({
    id: (r.id),
    name: r.name,
    avatar: r.avatar
  });
  return user;
}

function mapUser(response:Response): User{
  console.log(response.json().data)
  return toUser(response.json().data);
}

```
Thông tin gửi lên sẽ có định dạng như sau
```
{
  name: "TuAnh",
  avatar: {
    filename: "10x10png",
    filetype: "image/png",
    value: "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAGFBMVEXMzMyWlpajo6O3t7fFxcWcnJyxsbG+vr50Rsl6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVQImWNgwADKDAwsAQyuDAzMAgyMbOYMAgyuLApAUhnMRgIANvcCBwsFJwYAAAAASUVORK5CYII="
  }
}
```
# Rails API
Ở phía server đầu tiên thiết lập API Rails 5, bạn cần cài Ruby 2.2.4 và rails 5
Tạo ứng dụng Rails api bằng lệnh `rails _5.0.0.beta3_ new fileuploadapp --api` nó sẽ tạo ra một app rails API. 
Thêm các gem cần thiết jbuilder và rack-cors.
```
# Gemfile.rb
gem 'jbuilder', '~> 2.0'
gem 'rack-cors'
```
JBuilder được sử dụng để tạo các cấu trúc JSON cho các phản hồi từ ứng dụng. Trong các điều khoản MVC, các câu trả lời JSON sẽ là lớp xem (lớp giao diện người dùng AKA hoặc lớp trình bày) của ứng dụng. 
rack-cors cho phép chia sẻ tài nguyên gốc ( CORS ). Nói một cách đơn giản, rack-cors sẽ cho phép các ứng dụng dựa trên trình duyệt (AngularJS, React) và các ứng dụng di động yêu cầu thông tin từ API. 
Tiếp theo tạo bảng dữ liệu cho người dùng sử dụng lệnh `rails g scaffold User name:string avatar:text`
Tiếp theo mình sẽ thêm vào controllers cho users_controller.rb
```
class Api::V1::Auth::UsersController < Api::V1::BaseController
  validate_params on: :create, require: User::SIGN_UP_REQUIRE_PARAMS
  
  def edit
    @user = User.find_by! id: params[:id]
    render_success data: Api::V1::UserSerializer.new(@user)
  end

  def update
    @user = User.find_by! id: params[:id]
    Authenticates::UpdateService.new(user_params: user_update_params, user: @user).perform
    render_success data: Api::V1::UserSerializer.new(@user)
  end
  
  private

  def user_update_params
    params.permit User::UPDATE_PARAMS
  end
```
Để tải tệp mới chúng ta sử dụng gem CarrierWave. Thêm gem carrierwave vào gemfile
```
#Gemfile.rb
gem 'carrierwave'
```
CarrierWave làm việc thông qua một class của Ruby goi là Uploader vì thế chúng ta sẽ bắt đầu bằng cách chạy lệnh `rails generate uploader Avatar`
Sau khi chạy lệnh sẽ tạo ra file 'avatar_uploader.rb' (trong thư mục Uploader)
```
class AvatarUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
```
Trong model user chúng ta thêm ` mount_base64_uploader :avatar, AvatarUploader`
```
class User < ApplicationRecord

  mount_base64_uploader :avatar, AvatarUploader

  validates :name, presence: true

  UPDATE_PARAMS = [
    :name,
    :avatar
  ]
```

Kết quả khi bạn upload 
![](https://images.viblo.asia/eeaca520-ea6b-49b5-90a7-a0e0c92caab4.png)
# Tài liệu tham khảo
https://nehalist.io/uploading-files-in-angular2/