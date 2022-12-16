# Mở đầu
Discord là một nền tảng giao tiếp được thiết kế cho cộng đồng game thủ rất phổ biến trong những năm trở lại đây, với các tính năng nổi bật như gọi VoiP, gửi tin nhắn, hình ảnh, video trực tiếp hoặc thông qua các Server/ Channel. Tính đến 21 tháng 7 năm 2019, Discord đã có hơn 250 triệu người dùng toàn cầu. Hiện nay Discord hướng tới nhiều cộng đồng khác như nhóm bạn bè, lớp học, câu lạc bộ,...

Ở trong bài viết này mình sẽ hướng dẫn cách tạo một con Discord Bot đơn giản với Ruby, sử dụng gem `discordrb`.
![](https://images.viblo.asia/9a557771-a5fd-4a91-885a-1888035129d6.jpg)

# Nội dung
Đầu tiên chúng ta hãy vào https://discordapp.com/developers/applications để tạo một con bot cho riêng mình nào.

![](https://images.viblo.asia/97d0a909-59c9-4d83-8254-691748e06d35.png)


Sau khi tạo xong, hãy vào Application của bạn, vào tab Bot và chọn Add Bot
![](https://images.viblo.asia/11bb2ffb-62ab-406c-9c2e-7692031710e2.png)

Sau khi hoàn thành, bạn hãy copy lại Token của Bot
![](https://images.viblo.asia/6e445178-dc51-43b4-865f-3f1e1d77a4b5.png)

Tạo một thư mục mới có chứa Gemfile và thêm gem `discordrb` vào:
```ruby
# Gemfile
source 'https://rubygems.org'

gem 'discordrb'
```

Tạo 1 file `hello.rb` và copy token Bot của bạn vào YOUR_TOKEN

```ruby
require 'discordrb'

bot = Discordrb::Bot.new token: "YOUR_TOKEN"

puts "This bot's invite URL is #{bot.invite_url}."

# Trả lời khi nhận được tin nhắn Hello! từ user
bot.message(content: 'Hello!') do |event|
  event.respond 'Chào bạn, mình đứng đây từ chiều.'
end

# Trả về thời gian hiện tại
bot.message(content: 'Time!') do |event|
  event.respond Time.now.strftime("%k:%M")
end

bot.run
```

Chạy nó !

```shell
bundle exec ruby hello.rb                                  
This bot's invite URL is https://discordapp.com/oauth2/authorize?&client_id=582975188xxxx4583&scope=bot.
[INFO : websocket @ 2020-04-23 18:01:54.049] Discord using gateway protocol version: 6, requested: 6
```
Ở output sẽ có một đường link để invite bot của bạn vào Server. Chọn Server mà bạn muốn invite bot vào (yêu cầu bạn phải có quyền Manage Server) và chọn Authorize.

![](https://images.viblo.asia/b4fed241-b113-42e8-a93d-b649b546a811.png)

Vậy là chúng ta đã invite được bot vào server rồi.
![](https://images.viblo.asia/9725e403-d4ba-45e0-b36e-094c648dad51.png)

Thử Ping nó xem nó đã hoạt động chưa nào.
![](https://images.viblo.asia/00978063-8e22-4923-9ad0-30908d1ce67b.png)

It's working, it's workingggggg !

Tiếp theo chúng ta sẽ viết một module để thực hiện việc tra cứu thời tiết.


# Kết luận
Ví dụ trên chỉ là một con bot Discord đơn giản tạo bởi Ruby bằng gem `discordrb`. Bạn có thể tham khảo document của `discordrb` để mang lại nhiều tính năng cho bot của bạn hơn nữa, ví dụ:
* Quản lí Server/ Channel
* Mini-games như Trivia, giải đố,...
* Tự động queue và phát nhạc trên Youtube, Soundcloud,...
* Tra cứu (lời bài hát, tỷ giá vàng, giá rau muống hiện tại,...)
* ...

Cảm ơn mọi người đã dành thời gian đọc hết bài viết của mình.

P/s: Cảm ơn Discord đã giúp mình có một bạn nồi cơm đáng yêu ~

# Tham khảo
https://github.com/discordrb/discordrb