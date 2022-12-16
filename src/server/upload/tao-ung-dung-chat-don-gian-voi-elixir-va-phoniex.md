### I. Elixir là gì
* Được tạo ra bởi kỹ sư José Valim (core contributor của Rails) vào năm 2011
* Elixir được viết dựa trên nền tảng của Erlang
* Erlang là một ngôn ngữ lập trình chủ yếu cho các chương trình phân tán, và đỏi hỏi tính song song lớn, tuy nhiên lại không được sử dụng rộng rãi bởi sự xấu xí về mặt syntax của nó
* Elixir được tạo ra nhằm cải thiện hiệu năng của các ứng dụng Rails chạy trên nhiều CPUs
* Có cú pháp dễ dùng và các công cụ kèm theo tiện lợi cho việc tạo gói (ứng dụng mix), test (với ExUnit), hay templating (với EEx) ...
* Được thiết kế với mục tiêu chạy song song để giúp tận dụng tối đa ưu thế của phần cứng máy tính.
* Phù hợp cho lập trình  network và những hệ thống phản hồi cao cấp  như phần mềm cho ngân hàng, và cho data processing .

### II. Phoenix Framework
* Là một backend framwork của Elixir được phát triển lần đầu tiền bởi Chrisis McCord
* Hiệu năng và tốc độ của Phoenix rất nhanh chỉ thua benchmark của Gin(Go framework)
* Cú phát đẹp, gọn gàng và hiện đại

### III. Cài Đặt

#### Elixir
* Thêm Packages Erlang : `wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb`
* Cài đặt Erlang: `sudo apt-get install esl-erlang`
* Cài đặt Elixir: `sudo apt-get install elixir`

#### Phoenix 

* Cài đặt Phoenix Framework: `mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez`
* Tạo Project: `mix phoenix.new my_project --database mysql`

### Ứng dụng chat
- Ứng dụng chat sẽ có database postgres, các bạn tham khảo cách cài đặt ở đây: `https://github.com/dwyl/learn-postgresql#installation`

#### Tạo Project
```
 mix phx.new chat
 cd chat
 mix phx.server
```

>  Trước khi chạy `mix phx.server`  cần cấu hình database trong file `config/dev.exs` 
```
config :Chat, Chat.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "admin",
  password: "password",
  database: "chat_dev",
  hostname: "localhost",
  pool_size: 10
```

khi chạy xong vào localhost:4000 sẽ thấy màn hình start của phoniex.
![](https://images.viblo.asia/6ec5fe31-e140-46df-a7b1-0206272dd56c.png)

#### Tạo room chanel
`mix phx.gen.channel Room`

bỏ comment trong file `/lib/chat_web/channels/user_socket.ex`

`# channel "room:*", ChatWeb.RoomChannel` to `channel "room:lobby", ChatWeb.RoomChannel`

#### Giao diện chat

update file `/lib/chat_web/templates/page/index.html.eex`

```
<!-- The list of messages will appear here: -->
<ul id='msg-list' class='row' style='list-style: none; min-height:200px; padding: 10px;'></ul>

<div class="row">
  <div class="col-xs-3">
    <input type="text" id="name" class="form-control" placeholder="Your Name" autofocus>
  </div>
  <div class="col-xs-9">
    <input type="text" id="msg" class="form-control" placeholder="Your Message">
  </div>
</div>
```

#### Update file js

update file `/assets/js/app.js `

```
var channel = socket.channel('room:lobby', {}); // kết nối với chat "room"

channel.on('shout', function (payload) { // nắng nghe sự kiện đến 'shout'
  var li = document.createElement("li"); 
  var name = payload.name || 'guest';  
  li.innerHTML = '<b>' + name + '</b>: ' + payload.message; // set li contents
  ul.appendChild(li);  
});

channel.join(); // join the channel.

var ul = document.getElementById('msg-list');   
var name = document.getElementById('name');
var msg = document.getElementById('msg'); 

// dự kiện người chát ấn enter
msg.addEventListener('keypress', function (event) {
  if (event.keyCode == 13 && msg.value.length > 0) { // don't sent empty msg.
    channel.push('shout', { // gửi message đến chanel
      name: name.value,  
      message: msg.value 
    });
    msg.value = '';  
  }
});
```

Tiếp tục reset lại server `mix phx.server` vào giao diện các bạn có thể chát đơn giản rồi

![](https://images.viblo.asia/f0aad516-3bf1-41f8-a93b-94e475fab434.gif)

#### Tạo database để lưu message

chạy `mix ecto.create` để tạo database.

`mix phx.gen.schema Message messages name:string message:string` để tạo migrate cho table messages.
`mix ecto.migrate` để chạy file migrate

#### Lưu messages vào database
update file `lib/chat_web/channels/room_channel.ex`

```
# join a room
def join("room:lobby", payload, socket) do
  if authorized?(payload) do
    {:ok, socket}
  else
    {:error, %{reason: "unauthorized"}}
  end
end

# khi co message den
def handle_in("shout", payload, socket) do
  Chat.Message.changeset(%Chat.Message{}, payload) |> Chat.Repo.insert  
  broadcast socket, "shout", payload
  {:noreply, socket}
end
```

Khởi động lại server `mix phx.server` để check thành quả.
>   Chú ý: nếu chạy `mix phx.server` để khởi động server mà bị báo trùng port cần tắt port đó đi rồi chạy lại
```
lsof -i :4000
kill -9 pid
mix phx.server
```

Các bạn có thể download source từ đây: 
`https://github.com/kenshin1102/chat_elixir_new`

### Tài liệu
- https://elixirschool.com/
- http://phoenixframework.org/
- https://github.com/dwyl/phoenix-chat-example