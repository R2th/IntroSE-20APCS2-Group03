### Chào mọi người

Vấn đề này thực chất là một câu hỏi mình, sau đó mình mò mẫm rồi xử lý được, nên share đây cùng thảo luận

Giả sử mình có model user.rb, hàm find(:id), mình muốn cache query của hàm này của 1 model nào đó chứ ko phải all thì sẽ xử lý thế nào

Đây là cách xử lý của mình


model: user.rb

```ruby
def self.find(id)
    user = Rd.user_get(id)
    if !user
      puts "OVERRIDING no user #{id}"
      user = super
      Rd.user_set(id, user, {:ex => 3600})
    end

    return user
  end
```

services/rd.rb
```ruby
class Rd
  def self.user_get(id)
    begin
      user = $rd.get("user_info_#{id}")
      puts "user redis #{id}"
      return User.new(JSON.parse(user))
    rescue
      return nil
    end
  end


  def self.user_set(id, user, options={})
    $rd.set("user_info_#{id}", user.to_json, options)
  end
end
```

$rd là redis client connection chỗ config/application.rb
```ruby
$rd = Redis.new(
        :url => "redis://#{ENV['REDIS_CONNECT']}/0",
        :connect_timeout => 0.2,
        :read_timeout    => 1.0,
        :write_timeout   => 0.5
    )
```

Mọi người có cách nào hay có đóng góp gì vui lòng comment, cảm ơn :D