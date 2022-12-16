# 1. Introduce
- Gem `paper_trail` được dùng để tracking sự thay đổi của model object và chia thành các version khác nhau
- Với gem `paper_trail` ta có thể revert model object về version nào đó bất kỳ hoặc restore model object sau khi đã bị xoá

# 2. Install
- Thêm gem `paper_trail` vào `Gemfile`
    ```
    #Gemfile
    gem "paper_trail"
    ```
- Chạy command để install gem
    ```sh
    bundle install
    ```
- Chạy migration để tạo table `versions`
    ```ruby
    bundle exec rails generate paper_trail:install
    ```
- Chạy command để chạy file migration và tạo table `versions`
    ```sh
    bundle exec rails db:migrate
    ```
- Table được tạo có các column với kiểu dữ liệu như sau

    | Column | Type |
    | -------- | -------- |
    | item_type | string |
    | item_id | bigint |
    | event | string |
    | whodunnit | string |
    | object | text |

- `item_type` là class của object model (ví dụ: `User`)
- `item_id` là id của object model (ví dụ: `123`)
- `event` sẽ nhận 1 trong các giá trị sau: `create`, `update`, `destroy`
- `whodunnit` là user đã thực hiện event, có thể là if (default) hoặc email, name do mình quy định (custom)
- `object`:  string ứng với version trước của object model 
- Thêm `has_paper_trail` vào model muốn tracking
    ```ruby
    class User < ActiveRecord::Base
      has_paper_trail
    end
    ```
- Thêm `before_action: set_paper_trail_whodunnit` vào `ApplicationController`
    ```ruby
    class ApplicationController < ActionController::Base
      before_action: set_paper_trail_whodunnit
    end
    ```

# 3. Basic usage
- Truy vấn version của object model
    ```ruby
    user = User.first
    user.versions
    ```
- Truy vấn các attribute của version
    ```ruby
    user = User.first

    # version ứng với action create
    version = user.versions.first
    version.id        #1
    version.item_type # User
    version.item_id   # 1
    version.event     # "create"
    version.whodunnit # nil (khi mình update trong rails console)
    version.object    # nil
    
    # version ứng với action update
    version = user.versions.last
    version.id                 # 1
    version.item_type          # User
    version.item_id            # 1
    version.event              # "update"
    version.whodunnit          # nil (khi mình update trong rails console)
    version.object             # "---\nid: 1\nemail: sheree@price.info\nname: Alton Anderson\ncreated_at: 2021-02-21 13:41:46.608329000 Z\nupdated_at: 2021-02-21 13:42:06.384486000 Z\n"
    version.object.split("\n") # ["---", "id: 1", "email: sheree@price.info", "name: Alton Anderson", "created_at: 2021-02-21 13:41:46.608329000 Z", "updated_at: 2021-02-21 13:42:06.384486000 Z"]
    ```

- Truy vấn object được lưu trong version
    ```ruby
    user = User.first

    # version ứng với action create
    version = user.versions.first
    version.event     # "create"
    version.object    # nil
    version.reify     # nil
    
    # version ứng với action update
    version = user.versions.last
    version.event              # "update"
    version.object             # "---\nid: 1\nemail: sheree@price.info\nname: Alton Anderson\ncreated_at: 2021-02-21 13:41:46.608329000 Z\nupdated_at: 2021-02-21 13:42:06.384486000 Z\n"
    version.object.split("\n") # ["---", "id: 1", "email: sheree@price.info", "name: Alton Anderson", "created_at: 2021-02-21 13:41:46.608329000 Z", "updated_at: 2021-02-21 13:42:06.384486000 Z"]
    version.reify              # <User id: 1, email: "sheree@price.info", name: "Alton Anderson", created_at: "2021-02-21 13:41:46", updated_at: "2021-02-21 13:42:06">
   ```

- Thêm 1 số truy vấn khác với version
    ```ruby
    user = User.first
    version = user.versions.last
    version.index
    version.next
    version.previous
    ```

# 4. Config
## a. Global config
- Tạo file `config/initializers/paper_trail.rb` để config các global option cho `paper_trail`
    ```ruby
    # config/initializers/paper_trail.rb
    PaperTrail.config.enabled = true
    PaperTrail.config.has_paper_trail_defaults = {
      on: %i[create update destroy]
    }
    PaperTrail.config.version_limit = 3
    ```
- `enabled`: enable hoặc disable paper_trail
- `has_paper_trail_defaults`: tracking version cho các action `create, update, destroy`
- `version_limit`: số lượng version tối đa
## b Model config
- Thêm các option cho hàm `has_paper_trail` 
### i. on
- Enable `paper_trail` cho từng event
    ```ruby
    has_paper_trail on: [:update]
    ```
- Option `on` có thể nhận các giá trị trong mảng `[:create, :destroy, :touch, :update]`
### ii. if, unless
- Enable `paper_trail` theo điều kiện 
    ```ruby
    has_paper_trail if: Proc.new { |user| user.active? }
    ```
### iii. ignore
- Skip các attribute không cần tracking
    ```ruby
    has_paper_trail ignore: [:email, :name]
    has_paper_trail ignore: [:email, { name: proc { |user| user.active? } }]
    ```
### iv. only
- Chỉ tracking các attribute cần thiết
    ```ruby
    has_paper_trail only: [:email, :name]
    has_paper_trail only: [:email, { name: proc { |user| user.active? } }]
    ```
### v. limit
- Số lượng version tối đa
    ```ruby
    has_paper_trail limit: 2
    ```