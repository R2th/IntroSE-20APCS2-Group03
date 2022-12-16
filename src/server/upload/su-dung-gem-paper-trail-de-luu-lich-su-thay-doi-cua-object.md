Ngày nay, việc lưu lại log và kiểm soát các hành động thay đổi dữ liệu trong hệ thống là việc ngày càng cần thiết. Rails cung cấp cho chúng ta rất nhiều tính năng hữu ích, nhưng mặc định, nó lại không cung cấp cho chúng ta công cụ nào có liên quan đến mục đích trên. Hầu hết, chúng ta chỉ biết ngày thay đổi cuối cùng của 1 bản ghi cụ thể và ngày tạo ra nó dựa vào 2 thuộc tính tương ứng là updated_at và created_at. 

[Paper_trail](https://github.com/paper-trail-gem/paper_trail) gem đã đáp ứng được nhu cầu của chúng ta về vấn đề trên, nó có thể lưu lại các thay đổi quan trọng trong hệ thống xuất phát từ hành động của người dùng, chẳng hạn như tạo, cập nhật hoặc xóa bản ghi, đồng thời có khả năng hoàn nguyên nó về trạng thái trước đó nếu cần thiết mà không ảnh hưởng đến hiệu suất. Nó cũng là đáp án khi chúng ta phân vân tìm câu trả lời cho các câu hỏi:
- Ai, khi nào và một hành động đã thực hiện những gì trong hệ thống?
- Làm thế nào để tôi có thể quay ngược thời gian và đảo ngược object về 1 hành động thay đổi trước đó?
- Làm thế nào để tôi có thể theo dõi các thay đổi cho một thuộc tính của 1 object, nhưng chỉ trong một số điều kiện cụ thể?

Vậy hãy tìm hiểu cách sử dụng gem paper_trail này để hiểu rõ hơn nhé.
### 1. Cài đặt
1. Thêm gem paper_trail vào trong Gemfile:
    ```
    gem 'paper_trail'
    ```
2. Thêm bảng `versions`  vào trong database:
     ```
     bundle exec rails generate paper_trail:install [--with-changes] [--with-associations]
     ```
     `paper_trail:install` sẽ tạo ra file migrate với bảng `versions` với các cột mặc định:
     
     ```
     create_table :versions, { options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci" } do |t|
      t.string   :item_type, {:null=>false, :limit=>191}
      t.integer  :item_id,   null: false
      t.string   :event,     null: false
      t.string   :whodunnit
      t.text     :object, limit: TEXT_BYTES

      t.datetime :created_at
    end
    add_index :versions, %i(item_type item_id)
    ```
    Trong đó, `item_type` và `item_id` giúp lưu object bị thay đổi, `event` lưu loại sự kiện xảy ra với object, `whodunnit`: người thực hiện thay đổi, `object`: trạng thái của object trước khi version được tạo.
    - Nếu chạy lệnh trên với option `--with-changes` , migrate sẽ tạo thêm 1 cột `object_changes` cho bảng versions và cột này lưu `changes` (sự thay đổi khi thực hiện hành động )của object 
    
        ** Cột `object` và `object_changes` được lưu mặc định dưới format `YAML`, để lấy ra dữ liệu của nó, bạn có thể chạy:
        ```
        YAML.load(object) hoặc YAML.load(object_changes)
        ```
    - Nếu chạy lệnh với option `--with-associations`, nó sẽ tạo thêm 1 bảng mới là `version_associations`:
        ```
        def self.up
        create_table :version_associations do |t|
          t.integer  :version_id
          t.string   :foreign_key_name, null: false
          t.integer  :foreign_key_id
          t.string   :foreign_type
        end
        add_index :version_associations, [:version_id]
        add_index :version_associations,
          %i(foreign_key_name foreign_key_id foreign_type),
          name: "index_version_associations_on_foreign_key"
      end
      ```
      bảng này sẽ hữu ích nếu bạn muốn sử dụng paper_trail cho bảng khác có quan hệ với bảng chính thông qua các associations: has-one, has-many, has-many-through.
      
      Để sử dụng được paper_trail với asociation, chúng ta cần sử dụng thêm gem `paper_trail-association_tracking`:
      - Thêm 
          `gem 'paper_trail-association_tracking'`
          vào trong Gemfile
      - Để
          `PaperTrail.config.track_associations = true`
          trong file config paper_trail.rb trong folder `config/initializers`
      - Thêm `has_paper_trail` vào trong model cần sử dụng association với model chính.
      PaperTrail sẽ lưu trong bảng version_associations các thông tin bổ sung liên quan đến các version của association và các version của model khi 1 association bị thay đổi. Khi lấy version của object cùng với association của nó tại 1 thời điểm, cột `transaction_id` có tác dụng giúp paper_trail tìm kiếm đúng các version được tạo ra trong cùng 1 transaction.
      
      Ví dụ: khi bạn có 1 Order và Order này có các order_details lưu thông tin chi tiết các loại sản phẩm được order, khi đó, nó là cần thiết để lưu log cho cả order và order_detail và khi check thay đổi của order tại 1 thời điểm, ta có thể xem được cả trạng thái của các order_details của order đang tồn tại tại thời điểm đó nữa.
     
   - Sau khi chạy lệnh trên, các file migration đã được tạo ra, bạn chạy:
       ```
       bundle exec rake db:migrate
       ```
   
3. Thêm `has_paper_trail` vào model bạn muốn theo dõi
   ```
       class Order < ActiveRecord::Base
          has_paper_trail
       end
   ```
   Thêm vào cả order_detail nếu bạn sử dụng với association:
   ```
       class OrderDetail < ActiveRecord::Base
           belongs_to :order
          has_paper_trail
       end
   ```
   
4. Setting `whodunnit`

    Để lưu thông tin của đối tượng thực hiện hành động thay đổi với object, bạn thêm vào ApplicationController:
    ```
    class ApplicationController
      before_action :set_paper_trail_whodunnit
    end
    ```
    
### 2. Sử dụng

1. Một số hàm cơ bản

    - Một số API cho model:
        ```
        order = Order.last
        order.versions  # list tất cả version của 1 object
        # [<PaperTrail::Version>, <PaperTrail::Version>, ...]
        
        order.version # Trả về version mà order được reify từ nó (khi gọi version.reify)
        
        order.paper_trail.originator # Trả về người đã thay đổi order ở trạng thái hiện tại
        
        order.paper_trail.version_at(timestamp) # Trả về order với trạng thái của nó tại thời điểm timestamp
        
        order.paper_trail.previous_version   # Trả về order với trạng thái của nó tại version gần nhất trước đó
        
        order.paper_trail.next_version    # Trả về order với trạng thái của nó tại version gần nhất sau đó
        ```
        
    - check 1 version:
        ```
         v = order.versions.last
         
         v.event # 'update', 'create', 'destroy'
         
         v.created_at
         
         v.whodunnit # ID của `current_user`. được set trong callback `set_paper_trail_whodunnit`.
         
         old_order = v.reify # Trả về order với trạng thái của nó trước khi thay đổi( nil nếu event là create)
         
         YAML.load(v.object_changes)   # trả về các giá trị đã thay đổi của order: {"order_status"=>["confirm", "not_deliver"]}
         
         v.changeset    # trả về các giá trị đã thay đổi , giống gọi v.object_changes
         
         v.next # Trả về version tiếp theo của order
         
         v.previous # Trả về version trước đó của order
         
         v.index  # Trả về index của v trong tất cả version của order
         
        ```

2. Thay đổi config

    - Bạn có thể tạo file mới `config/initializers/paper_trail.rb` để thay đổi config cho paper_trail:
        ```
        # config/initializers/paper_trail.rb
        PaperTrail.config.track_associations = true
        PaperTrail.config.version_limit = 30  
        ```
        Trong đó, set `track_associations = true` nếu bạn dùng paper trail với association 
        `version_limit` lưu giới hạn số lượng versions được tạo cho 1 object, nếu vướt quá số lượng đã set, version cũ nhất của object sẽ bị xóa.
        
    - Các option cho `has_paper_trail` :
        - `on` : lựa chọn khi nào thì sẽ tạo version, giả dụ bạn chỉ muốn version được tạo ra khi update thì set:
            ```
            class Order < ActiveRecord::Base
              has_paper_trail on: [:update]
            end
            ```
        - `if`, `unless` : chọn điều kiện khi nào thì 1 version được tạo, ví dụ tạo version cho order chỉ khi status của nó là in-progress:
             ```
            class Order < ActiveRecord::Base
              has_paper_trail if: Proc.new { |t| t.status == 'in-progress'}
            end
            ```
         - `only`, `ignore`, `skip` : chọn version được tạo khi thuộc tính nào thay đổi, `ignore`, `skip` - bỏ qua sự thay đổi của các thuộc tính trong list, `only` - chỉ tạo khi các thuộc tính trong list thay đổi
             ví dụ: chỉ tạo version khi `price` của order thay đổi:
            ```
            class Order < ActiveRecord::Base
              has_paper_trail only: [:price]
            end
            ```
            
    - Custom cách lưu người thực hiện thay đổi:

        Mặc định paper_trail lưu id của current_user, nhưng nếu bạn không muốn lưu như thế, bạn có thể sửa nó bằng cách overwrite method `user_for_paper_trail`
        ```
        def user_for_paper_trail
            logged_in? ? current_user.name : 'Public user'
       end
        ```

    - Custom hàm có sẵn của paper_trail:

        Một số hàm của paper trail có thể không phù hợp với mục đích của bạn hoặc bạn muốn định nghĩa thêm hàm mới khi gọi version, bạn có thể sửa trong model:
        
        ```
        # app/models/paper_trail/version.rb
        
        # frozen_string_literal: true

        require "paper_trail/version_concern"

        module PaperTrail
          # This is the default ActiveRecord model provided by PaperTrail. Most simple
          # applications will use this model as-is, but it is possible to sub-class,
          # extend, or even do without this model entirely. See documentation section
          # 6.a. Custom Version Classes.
          #
          # The paper_trail-association_tracking gem provides a related model,
          # `VersionAssociation`.
          class Version < ::ActiveRecord::Base
            include PaperTrail::VersionConcern
            
            def abc
                ...
            end
         end
       end
        ```
 
3. Sử dụng với association:

    Cách cài đặt đã có ở bên trên, bạn cần thêm `has_paper_trail` vào trong cả model cha và model con. Ở đây mình lấy ví dụ với order và order_details là quan hệ has_many.
    Khi reify 1 version, thêm option `has_many: true`:
    ```
    v = order.versions.first 
    old_order = v.reify(has_many: true)
    ```
    Giả sử hiện tại order có 3 order_details nhưng tại thời điểm `v.created_at`, order chỉ có 2 order_details thì khi gọi `old_order.order_details` chúng ta sẽ chỉ nhận được 2 order_details.

    1 trường hợp thường gặp nữa khi sử dụng với association là, khi update order và order_details bằng nested_form, nếu chỉ thay đổi order_detail mà không thay đổi gì cho order, version sẽ chỉ tạo cho order_details mà không tạo cho order trong transaction này, vì vậy, khi gọi `reify` cho version của order, chúng ta sẽ không tìm được order_details chính xác.

    Để sửa trường hợp này, ta thêm:
    ```
    class Order < ActiveRecord::Base
       has_many :order_details, dependent: :destroy, inverse_of: :order

       has_paper_trail only: [:price]
    end

    class OrderDetail < ActiveRecord::Base
       belongs_to :order, touch: true

       has_paper_trail
   end
    ```
    Version của order sẽ được tạo mỗi khi có order_detail thay đổi. Tuy nhiên, object của version này có thể không lưu được trạng thái trước đó của order nên khi gọi `reify` cho version này, nó sẽ trả về trạng thái mới nhất của order. Để lưu được trạng thái trước khi save của order, ta có thể tạo một hàm callback và tự tạo version bằng tay cho order vào lúc này:
    
    ```
    class Order < ActiveRecord::Base
        before_save: check_to_create_version
        
        def check_to_create_version
          version = self.paper_trail.record_update(force: true, in_after_callback: false, is_touch: false)
          version.update_columns created_at: Time.zone.now
        end
   end
    ```
    
    Paper_trail có hàm riêng để tạo version bằng tay: `order.paper_trail.save_with_version` nhưng bởi vì mình gọi nó trong callback và để tránh trường hợp lặp vô hạn, mình đã dùng cách gọi `order.paper_trail.record_update(force: true, in_after_callback: false, is_touch: false)` và update `created_at` cho version vừa tạo ra, nếu không nó sẽ lấy `created_at` bằng `order.updated_at` và sẽ khó khăn khi ta muốn gọi `version_at(time)` 
    
### 3. Tổng kết

Trên đây, mình đã giới thiệu cách cài đặt và một số hàm hữu ích mình đã sử dụng, bạn có thể đọc thêm nhiều hơn tại [đây](https://github.com/paper-trail-gem/paper_trail) và thử dùng nó để trải nghiệm sự hữu ích của nó nhé.