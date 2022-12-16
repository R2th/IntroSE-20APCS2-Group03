# Introduction
Timezone của các người dùng trong hệ thông không phải đều như nhau. Vậy hệ thống cần biết là người dùng nào đó đang ở timezone nào để thực hiện các action nào đó như: gửi email, hiển thị đúng datetime cho user ....

# Cách để xác nhận timezone của user
Đầu tiên mình phải add column timezone vào user

```ruby
class AddTimezoneToUser < ActiveRecord::Migration
  def change
    add_column :users, :timezone, :string
  end
end
```

```ruby
$ rake db:migrate
```


Mình có thể xác nhận được timezone của user theo cách như sau: 

1. Cách đơn giản là mình có thể sử dụng [time_zone_select](https://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-time_zone_select) để cho user chọn timezone ngay khi đăng ký vào hệ thống. Nhưng cách này đòi hỏi người dùng phải biết là mình đang ở timezone nào, mà không phải ai cũng biết timezone là gì, vậy cách này cũng không tiện cho người dùng lắm. 

```ruby
<%= form.select :time_zone, time_zone_options_for_select(form.object.time_zone, nil, ActiveSupport::TimeZone) %>
```

2. Cách khác là hệ thống sẽ tự xác nhận được timezone khi người dùng đăng ký. Cách này sẽ sử dụng javascript để xác định timezone: [ jsTimezoneDetect](https://bitbucket.org/pellepim/jstimezonedetect/src/default/)

## Implement trong Rails
Gemfile
```ruby
gem "rails-assets-jsTimezoneDetect"
```

app/assets/javascripts/application.js

```ruby
//= require jsTimezoneDetect
```

Bây giờ `jsTimezoneDetect` đã add vào trong project rails. 
Để biết nó chạy hay không, vào console trong browser:
```js
jstz.determine().name() // trả về timezone hiện tại của mình
```

Thêm hidden_field vào trong form đăng ký như sau:
```ruby
<%= form.hidden_field(:time_zone, value: nil) %>
```

Viết javascript để set timezone vào trong thẻ hidden field trên.

```js
<script type='text/javascript'>
    $(document).ready(function(){
      document.getElementById('user_time_zone').value = jstz.determine().name();
    })
</script>
```

Khi người dùng vào trang đăng ký, js sẽ set timezone cho hidden field. Vậy khi submit đăng ký, hệ thống sẽ nhận được params timezone hiện tại của user đó và lưu vào database.

Hàm set time zone:
```ruby
def set_time_zone(user)
  time_zone = params[:user][:timezone]
  if time_zone.present?
    user.time_zone = ActiveSupport::TimeZone::MAPPING.key(time_zone)
    user.save
  end
end
```
jsTimezoneDetect library xác nhận timezone theo format: America/Los_Angeles, .... vậy ở đây mình sử dụng `ActiveSupport::TimeZone::MAPPING.key(time_zone)` để convert thành timezone chuẩn của `ActiveSupport::TimeZone` : Pacific Time (US & Canada) ...

```
> ActiveSupport::TimeZone::MAPPING
=> {"International Date Line West"=>"Pacific/Midway",
 "Midway Island"=>"Pacific/Midway",
 "American Samoa"=>"Pacific/Pago_Pago",
 "Hawaii"=>"Pacific/Honolulu",
 "Alaska"=>"America/Juneau",
 "Pacific Time (US & Canada)"=>"America/Los_Angeles",
 "Tijuana"=>"America/Tijuana",
 "Mountain Time (US & Canada)"=>"America/Denver",
 "Arizona"=>"America/Phoenix",
 "Chihuahua"=>"America/Chihuahua",
 "Mazatlan"=>"America/Mazatlan",
 ...
 
```

# References:
https://blog.bullettrain.co/auto-detecting-a-users-time-zone-in-rails/
http://nithinbekal.com/posts/rails-user-timezones/

https://www.youtube.com/watch?v=X-1ISHNEB9U