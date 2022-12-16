## Giới thiệu
   Bảo mật dữ liệu là vấn đề rất quan trọng trong bất kỳ ứng dụng nào. Bởi vì chúng ta đang lưu trữ dữ liệu cá nhân của người dùng như: ngày sinh, số điện thoại di động, địa chỉ, thông tin về ngân hàng, v.v.
   ![](https://images.viblo.asia/a916d6ee-ce3b-44cf-bf8e-5821c9936d8f.jpeg)
   
   Vì vậy, chúng ta nên thực hiện chức năng bảo mật dữ liệu với bất kì thông tin gì của người dùng. Có nhiều `gem` có sẵn trong thư viện của Ruby On Rails. Nhưng mình sẽ triển khai `gem attr_encrypted`.
### Bước 1:  Thêm gem  attr_encrypted 
   Trong thư mục GemFile thêm dòng 
   ```
   gem "attr_encrypted"
   ```
   ### Bước 2: Cài đặt gem
   Ở màn hình console chạy lệnh
   ```
   bundle install
   ```
   ### Bước 3: Tạo 1 model
   ```
   rails g model User
   ```
### Bước 4: Thêm các dữ liệu bạn muốn mã hóa vào trong file migration
 ```
class CreateUserDetails < ActiveRecord::Migration
    def change
        create_table :user_details do |t|
            t.string :last_name
            t.string :first_name
            t.string :encrypted_birth_date
            t.string :encrypted_birth_date_iv
            t.string :encrypted_mobile_no
             t.string :encrypted_mobile_no_iv
            t.timestamps null: false
        end
    end
end
```
Trong file migration ví dụ chúng ta muốn mã hóa 2 thông tin đó là ngày sinh và số điện thoại. Chúng ta thêm vào tiền tố `encrypted`trước tên cột.
Ví dụ:
```
t.string :encrypted_birth_date
```
trường `iv` nhằm mục đich giúp dữ liệu được bảo mật kĩ hơn

### Bước 5: Setting Model UserDetails
Trong file `UserDetail.rb` chúng ta thêm:
```
class UserDetail < ActiveRecord::Base
    secret_key = ENV['DB_COL_ENCRYPTED_KEY']
    attr_encrypted :birth_date, key: secret_key
    attr_encrypted :mobile_no, key: secret_key
    validates_presence_of :last_name
    validates_presence_of :first_name
    validates_presence_of :birth_date 
end
```
### Bước 6: Truy cập các thông tin mã hóa ngoài view hoặc trên rails console
Để truy cập các thông tin đã được mã hóa ở ngoài view hoặc trên rails console. Bạn chỉ cần gọi tên của trường đó (không cần thêm tiền tố `encrypted`).
Ví dụ:
Ở ngoài view:
```
<%= f.text_field :birth_date, class: 'form-control'  %>
<%= f.text_field : mobile_no, class: 'form-control'  %>
```
Trong controllser, thêm `permit params`
```
private
    def user_details_params
      params.require(:user_detail).permit(:id, :last_name, :birth_date, :mobile_no)
    end
```
Trong màn hình rails console:
1.Đầu tiên chúng ta tạo 1 bản ghi mới: 
![](https://images.viblo.asia/61c734ad-fbc9-42fc-83da-b0f7c47ef66f.png)
Trong ví dụ trên, bạn nhìn vào log có thể thấy 2 thông tin birth_date và mobile_no đã được mã hóa
2.Lấy thông tin của bản ghi vừa tạo:
![](https://images.viblo.asia/eef83a02-34a2-47e5-aca6-ef33b641b8b8.png)
Khi cần lấy thông tin gì, bạn chỉ cần gọi đến tên của trường đó (không cần tiền tố `encryption`)
```
usr = UserDetail.find(1)
usr.birth_date
usr.mobile_no
```
Và bạn sẽ thấy được dữ liệu trả về ở dạng chưa được mã hóa.

### Kết luận:
Với nhu cầu bảo mật thông tin cho dữ liệu thì `gem attr_encrypted` đã đáp ứng được nhu cầu cơ bản của chúng ta. Bài viết trên đây đã giới thiệu cho mọi người cách dùng cơ bản của `gem attr_encrypted`. Hy vọng bài viết có ích cho mọi người. Cám ơn mọi người đã đọc bài viết của mình.
### Nguồn: 
https://itnext.io/data-encryption-in-ruby-on-rails-4512fea27893