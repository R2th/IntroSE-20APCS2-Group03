Redis Cache Store là 1 feature mới trong Rails 5.2
1. Caching in Rails
Rails hỗ trợ caching fragment. Trong views, chúng ta có thể sử dụng như sau:
```
<% @messages.each do |message| %>
  <% cache message do %>
    <%= render message %>
  <% end %>
<% end %>
```
Fragment này sẽ được caching. Rails sẽ check cache store, nếu data đã tồn tại, Rails sẽ sử dụng data đó. Còn không, Rails sẽ render như thông thường, và lưu lại cho lần tiếp theo.

2. Redis Cache Store
Để sử dụng Redis Cache Store, chúng ta có thể cài đặt trong file `config/environments/production.rb` hoặc `config/environments/development.rb`.

`config.cache_store = :redis_cache_store`

Sử dụng redis chạy trên localhost với cổng là 6379 trên môi trường development. Trên production, chúng ta có thể cấu hình lại:

`config.cache_store = :redis_cache_store, {url: "redis://192.168.0.10:6379/0"}`

3. Hiredis

Bên cạnh dùng redis, chúng ta có thể dùng Hiredis. Để sử dụng Redis Cache Store, cấu hình như sau:

config.cache_store = :redis_cache_store, {driver: :hiredis, url: "redis://192.168.0.10:6379/0"}

Thêm các gem sau vào Gemfile:

```
gem "hiredis"
gem "redis", "~> 4.0"
```

4. Multiple Redis Servers

Chúng ta có thể sử dụng nhiều máy chủ Redis, nếu một máy chủ Redis ngừng hoạt động, bạn sẽ bỏ lỡ bộ nhớ cache cho các khóa được lưu trữ trên máy chủ đó, nhưng các khóa khác trên các máy chủ còn lại vẫn hoạt động.

```
redis_servers = %w[ 
  redis://hostname-1:6379/0
  redis://hostname-2:6379/0
  redis://hostname-3:6379/0
  redis://hostname-4:6379/0
]
```

`config.cache_store = :redis_cache_store, {driver: :hiredis, url: redis_servers}`

5. Redis in Development

Sử dụng package manager để cài Redis, 
`brew install redis`

Sử dụng Docker để test multiple Redis servers.

`docker run --rm -p 6379:6379 redis`

```
redis_servers = %w[ 
  redis://localhost:6379/0
  redis://localhost:6380/0
  redis://localhost:6381/0
]

config.cache_store = :redis_cache_store, {driver: :hiredis, url: redis_servers}
```