![](https://images.viblo.asia/760c1616-95c8-4e82-b1ee-536210361b11.png)


Chào mọi người, bài viết này là tìm hiểu của mình về **Rails Engine**.

## Rails engine
Mọi `Rails` developer đều quen với một `Rails` project (folder `app` với các subfolder `controllers`, `models`, ... , folder `config` chứa `routes` cho `app`, folder `db` chứa những `migrations`).

Nếu ta coi `Rails` project là một `main app` thì `Rails Engine` là những `mini app` được "nhúng" vào `main app` nhằm mục đích thêm những `functionality` riêng biệt cho `main app`. 

`main app` cũng thực chất cũng là 1 `Rails Engine`, với class `Rails::Application` kế thừa class `Rails::Engine`, do đó cả `main app` và các `Engine` đều có chung một cấu trúc thư mục giống nhau.

Một số gem quen thuộc có sử dụng `Rails engine`: [Devise](https://github.com/heartcombo/devise/blob/master/lib/devise/rails.rb#L7), [Spree](https://github.com/solidusio/solidus/blob/master/core/lib/spree/core/engine.rb#L7).

## Engine structure
Để nhúng một `engine` vào `main app`, ta dùng lệnh:
```bash
rails plugin new sherlock --mountable
```

Lệnh này làm 2 việc: tạo folder `sherlock` (cùng cấp với `app`, `config`, ... của `main app`) chứa `mini engine folder`, và thêm gem  `sherlock` vào `Gemfile` của `main app`:

```ruby
# Gemfile

gem 'sherlock', path: 'sherlock'
```
Và cấu trúc folder `sherlock` cơ bản sẽ giống với `main app`, trừ folder `lib`:

![](https://images.viblo.asia/6ec131c7-32e1-4936-9aa7-fd2092a3613d.png)

 Trong quá trình [khởi chạy](https://guides.rubyonrails.org/initialization.html#config-boot-rb) `main app`, nó sẽ setup các gem được chỉ định trong `Gemfile`,  vì đã thêm gem `sherlock` và `Gemfile` nên `bundler` sẽ đọc file `sherlock.gemspec` và require những file được chỉ định trong option `spec.files`:

```ruby
# sherlock/sherlock.gemspec

...
spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
```
như ta thấy ở trên, `bundler` sẽ require tất cả các file trong các folder `app`, `config`, `db` và `lib`

### folder lib
bắt đầu từ file `sherlock.rb` define module `Sherlock` và require tới `sherlock/engine`
```ruby
# lib/sherlock.rb
require "sherlock/engine"

module Sherlock
  # Your code goes here...
end

# lib/sherlock/engine.rb
module Sherlock
  class Engine < ::Rails::Engine
    isolate_namespace Sherlock
  end
end
```

dòng
```ruby
isolate_namespace Sherlock
```
chỉ định namespace của `engine`, mỗi `engine` đều được bọc bởi một module, thường là tên của`engine`đó (ở đây là module `Sherlock`), và tất cả các class trong `engine` cũng đều bọc trong module này.

class `Sherlock::Engine` là nơi ta định nghĩa các config, setup cần thiết cho `functions` được nhúng. Ví dụ ở `Spree`:

```ruby
# api/lib/spree/api/engine.rb
require 'rails/engine'
module Spree
  module Api
    class Engine < Rails::Engine
      isolate_namespace Spree
      engine_name 'spree_api'
      
      def self.root
        @root ||= Pathname.new(File.expand_path('../../../../', __FILE__))
      end
      
      initializer "spree.environment", :before => :load_config_initializers do |app|
        app.config.spree = Spree::Core::Environment.new
      end
      # ...
    end
  end
end
```

`initializer` là một class method của [`Rails::Railtie`](https://api.rubyonrails.org/classes/Rails/Railtie.html) hỗ trợ việc `hook` vào quá trình `Rails` init process nhằm mục đích thêm, sửa đổi config của cả `Rails app`. Ở đây params `app` chính là instance của `Rails::Application`, `Spree` khởi tạo config riêng của mình ở đây, từ đó config này (1 instance của class `Spree::Core::Environment`) có thể sử dụng ở mọi nơi trong `main app`:
```ruby
Rails.application.config.spree
```

### folder config
chứa `routes.rb` nơi define các endpoint của `engine`:

```ruby
# sherlock/config/routes.rb

Sherlock::Engine.routes.draw do
    get :home, to: "home#index"
end
```

ta cần mount `Sherlock::Engine` vào config routes của `main app` để sử dụng:

```ruby
# config/routes.rb

mount Sherlock::Engine => "/sherlock"
```

lúc này ở `main app` có thể truy cập endpoint: `/sherlock/home`.

### folder app
các folder con trong `app` đều giống với `main app`, mọi class, views đều được module hoá (`Sherlock`):

![](https://images.viblo.asia/2424ca57-21fc-4afd-b92a-d6e04369c705.png)


các `controller`, `helpers`, `models`, ... được define ở đây và được sử dụng ở `main app`.

`Devise` là một ví dụ điển hình:

![](https://images.viblo.asia/dfecbc50-9d7d-45f1-8be7-2bbdb0a83663.png)

các `controller`, `view`, `helper`, `mailer` đều được define sẵn và sử dụng ở `main app` như cách ta thường làm với `devise`: mount routes, include `devise` trong model => hoàn thành phần `authentication` với đầy đủ `routes`, `controllers`, `views`, ...

---

Trên đây là tìm hiểu của mình về `Rails::Engine`, cảm ơn mọi người đã đọc bài viết :grinning: .