Migrations là một tính năng của Active Record cho phép bạn phát triển lược đồ cơ sở dữ liệu  của mình theo thời gian. Thay vì viết các sửa đổi lược đồ trong SQL thuần túy, việc migrations cho phép bạn sử dụng Ruby DSL để mô tả các thay đổi đối với bảng của bạn.
## 1. Migration Overview
Migrations là một cách thuận tiện để thay đổi database schema  của bạn theo thời gian một cách nhất quán. Họ sử dụng một Ruby DSL để bạn không phải viết SQL bằng tay, cho phép schema và các thay đổi của bạn độc lập với cơ sở dữ liệu.
Bạn có thể coi mỗi lần Migrations là một 'phiên bản' mới của cơ sở dữ liệu. Một schema bắt đầu mà không có gì trong đó và mỗi lần migrations sẽ sửa đổi nó để thêm hoặc xóa bảng, cột ..

Active Record biết cách cập nhật schema của bạn dọc theo dòng thời gian này, đưa nó từ bất kỳ thời điểm nào trong lịch sử lên phiên bản mới nhất. Active Record cũng sẽ cập nhật tệp db / schema.rb của bạn để phù hợp với cấu trúc cập nhật của cơ sở dữ liệu của bạn.

Đây là một ví dụ về việc migrations:
```
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end

```
Việc migrations này thêm một bảng được gọi là Product với một cột chuỗi được gọi là name  và một cột văn bản được gọi là description. Một cột khóa chính được gọi là id cũng sẽ được thêm ngầm, vì đó là khóa chính mặc định cho tất cả các  Active Record models. timestamps  macro thêm hai cột, create_at và updated_at. Các cột đặc biệt này được Active Record tự động quản lý nếu chúng tồn tại.
Lưu ý rằng chúng ta xác định sự thay đổi mà chúng ta muốn xảy ra trong thời gian tới. Trước khi quá trình migrations  này được thực hiện, sẽ không có bảng.
Sau đó, bảng sẽ tồn tại. Active Record cũng biết cách đảo ngược quá trình migrations này: nếu chúng ta quay quá trình migrations  này trở lại, nó sẽ xóa bảng.

Trên cơ sở dữ liệu hỗ trợ các transaction  với các câu lệnh thay đổi schema , quá trình migrations được bao bọc trong một transaction.Nếu cơ sở dữ liệu không hỗ trợ điều này thì khi quá trình migration không thành công, các phần của nó đã thành công sẽ không được khôi phục lại. Bạn sẽ phải khôi phục các thay đổi đã được thực hiện bằng tay.

Nếu bạn muốn migration để thực hiện điều gì đó mà Active Record không biết cách đảo ngược, bạn có thể sử dụng có thể reversible:
```
class ChangeProductsPrice < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      change_table :products do |t|
        dir.up   { t.change :price, :string }
        dir.down { t.change :price, :integer }
      end
    end
  end
end

```
Ngoài ra, bạn có thể sử dụng up  và down  thay vì change
```
class ChangeProductsPrice < ActiveRecord::Migration[7.0]
  def up
    change_table :products do |t|
      t.change :price, :string
    end
  end

  def down
    change_table :products do |t|
      t.change :price, :integer
    end
  end
end

```
## 2. Creating a Migration
### 2.1 Creating a Standalone Migration
Quá trình migration được lưu trữ dưới dạng tệp trong thư mục db / migrate, một tệp cho mỗi lớp migration.Tên của tệp có dạng YYYYMMDDHHMMSS_create_products.rb, có nghĩa là UTC timestamp xác định quá trình migration theo sau là dấu gạch dưới theo sau là tên của quá trình migration. Tên của lớp migration (phiên bản CamelCased) phải khớp với phần sau của tên tệp.

Ví dụ: 20080906120000_create_products.rb nên xác định lớp CreateProducts và 20080906120001_add_details_to_products.rb nên định nghĩa AddDetailsToProducts
Rails sử dụng timestamp này để xác định quá trình migration nào sẽ được chạy và theo thứ tự nào, vì vậy nếu bạn đang sao chép quá trình migration từ một ứng dụng khác hoặc tự tạo tệp, hãy lưu ý vị trí của nó theo thứ tự.

Tất nhiên, việc tính toán timestamp không phải là điều thú vị, vì vậy Active Record cung cấp một trình tạo để xử lý việc tạo nó cho bạn:
bin/rails generate migration AddPartNumberToProducts
Điều này sẽ tạo ra một migration  trống được đặt tên thích hợp:
```
class AddPartNumberToProducts < ActiveRecord::Migration[7.0]
  def change
  end
end

```
Trình tạo này có thể làm được nhiều việc hơn là thêm timestamp vào tên tệp. Dựa trên các quy ước đặt tên và các đối số bổ sung (tùy chọn), nó cũng có thể bắt đầu bổ sung quá trình migration.

Nếu tên migration  có dạng "AddColumnToTable" hoặc "RemoveColumnFromTable" và theo sau là danh sách các tên và loại cột thì một migration có chứa các câu lệnh add_column và remove_column thích hợp sẽ được tạo.
```
bin/rails generate migration AddPartNumberToProducts part_number:string
```
sẽ tạo ra 
```
bin/rails generate migration AddPartNumberToProducts part_number:string
```
Nếu bạn muốn thêm index trên cột mới, bạn cũng có thể làm điều đó.
```
bin/rails generate migration AddPartNumberToProducts part_number:string:index
```
sẽ tạo các câu lệnh add_column và add_index thích hợp:
```
class AddPartNumberToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :part_number, :string
    add_index :products, :part_number
  end
end

```
Tương tự, bạn có thể tạo một quá trình migration  để xóa một cột khỏi dòng lệnh:
```
bin/rails generate migration RemovePartNumberFromProducts part_number:string
```
Bạn không bị giới hạn ở một cột được tạo . Ví dụ:
```
bin/rails generate migration AddDetailsToProducts part_number:string price:decimal
```
tạo ra 
```
class AddDetailsToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :part_number, :string
    add_column :products, :price, :decimal
  end
end

```
Nếu tên migration  có dạng "CreateXXX" và theo sau là danh sách tên cột và loại thì một migration  tạo bảng XXX với các cột được liệt kê sẽ được tạo. Ví dụ:
```
bin/rails generate migration CreateProducts name:string part_number:string
```
tạo ra 
```
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :part_number

      t.timestamps
    end
  end
end
```
Như mọi khi, những gì được tạo ra cho bạn chỉ là điểm khởi đầu. Bạn có thể thêm hoặc xóa khỏi nó khi bạn thấy phù hợp bằng cách chỉnh sửa tệp db / migrate / YYYYMMDDHHMMSS_add_details_to_products.rb.

Ngoài ra, trình tạo chấp nhận kiểu cột làm tham chiếu (cũng có sẵn như belong_to). Ví dụ,
```
bin/rails generate migration AddUserRefToProducts user:references
```
tạo lệnh gọi add_reference sau:
```
class AddUserRefToProducts < ActiveRecord::Migration[7.0]
  def change
    add_reference :products, :user, foreign_key: true
  end
end
```

Việc migration này sẽ tạo ra một cột user_id, các tham chiếu là cách viết tắt để tạo các cột, chỉ mục, khóa ngoại hoặc thậm chí các cột liên kết đa hình.

Ngoài ra còn có một trình tạo sẽ tạo ra các bảng tham gia nếu JoinTable là một phần của tên:
```
bin/rails generate migration CreateJoinTableCustomerProduct customer product
```
sẽ tạo ra sự di chuyển sau:
```
class CreateJoinTableCustomerProduct < ActiveRecord::Migration[7.0]
  def change
    create_join_table :customers, :products do |t|
      # t.index [:customer_id, :product_id]
      # t.index [:product_id, :customer_id]
    end
  end
end
```
### 2.2 Model Generators
Bộ tạo mô hình và scaffold sẽ tạo ra các migrations thích hợp để thêm một mô hình mới. Quá trình migrations này sẽ chứa các hướng dẫn để tạo bảng có liên quan.Nếu bạn cho Rails biết bạn muốn cột gì, thì các câu lệnh để thêm các cột này cũng sẽ được tạo. Ví dụ, đang chạy:
```
bin/rails generate model Product name:string description:text
```
sẽ tạo một quá trình di chuyển trông giống như thế này
```
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
   end
  end
```
Bạn có thể nối nhiều cặp tên / loại cột tùy thích.
### 2.3 Passing Modifiers
Một số công cụ sửa đổi kiểu thường được sử dụng có thể được chuyển trực tiếp trên dòng lệnh. Chúng được bao quanh bởi dấu ngoặc nhọn và tuân theo kiểu trường:
VD
```
bin/rails generate migration AddDetailsToProducts 'price:decimal{5,2}' supplier:references{polymorphic}
```
sẽ tạo ra một quá trình migration trông giống như thế này
```
class AddDetailsToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :price, :decimal, precision: 5, scale: 2
    add_reference :products, :supplier, polymorphic: true
  end
end
```
## 3. Writing a Migration
### 3.1 Creating a Table
Phương thức create_table là một trong những phương thức cơ bản nhất, nhưng hầu hết thời gian, sẽ được tạo cho bạn từ việc sử dụng trình tạo mô hình hoặc scaffold. Một cách sử dụng điển hình sẽ là
```
create_table :products do |t|
  t.string :name
end
```
tạo một bảng Product với một cột được gọi là name
Theo mặc định, create_table sẽ tạo một khóa chính được gọi là id. Bạn có thể thay đổi tên của khóa chính bằng tùy chọn: primary_key (đừng quên cập nhật kiểu model  tương ứng) hoặc, nếu bạn không muốn một khóa chính nào cả, bạn có thể chuyển tùy chọn id: false. Nếu bạn cần chuyển các tùy chọn cơ sở dữ liệu cụ thể, bạn có thể đặt một đoạn SQL trong tùy chọn :options. Ví dụ:
```
create_table :products, options: "ENGINE=BLACKHOLE" do |t|
  t.string :name, null: false
end
```
sẽ thêm ENGINE = BLACKHOLE vào câu lệnh SQL được sử dụng để tạo bảng.
Một chỉ mục có thể được tạo trên các cột được tạo trong khối create_table bằng cách chuyển true hoặc một hàm băm tùy chọn cho tùy chọn: index:
```
create_table :users do |t|
  t.string :name, index: true
  t.string :email, index: { unique: true, name: 'unique_emails' }
end
```
### 3.2 Creating a Join Table
Phương thức migrations create_join_table tạo ra một bảng tham gia HABTM (has and belongs to many). Một cách sử dụng điển hình sẽ là:
```
create_join_table :products, :categories
```
tạo một bảng categories_products với hai cột được gọi là category_id và product_id. Các cột này có tùy chọn: null được đặt thành false theo mặc định. Điều này có thể được ghi đè bằng cách chỉ định tùy chọn: column_options:
create_join_table :products, :categories, column_options: { null: true }

Theo mặc định, tên của bảng nối xuất phát từ sự kết hợp của hai đối số đầu tiên được cung cấp cho create_join_table, theo thứ tự bảng chữ cái. Để tùy chỉnh tên của bảng, hãy cung cấp tùy chọn: table_name:
```
create_join_table :products, :categories, table_name: :categorization
```
tạo ra một bảng categorization
create_join_table cũng chấp nhận một khối mà bạn có thể sử dụng để thêm các chỉ số (không được tạo theo mặc định) hoặc các cột bổ sung:
```
create_join_table :products, :categories do |t|
  t.index :product_id
  t.index :category_id
end
```
### 3.3 Changing Tables
Một người anh em họ gần gũi của create_table là change_table, được sử dụng để thay đổi các bảng hiện có. Nó được sử dụng theo cách tương tự để create_table nhưng đối tượng nhường cho khối biết nhiều thủ thuật hơn. Ví dụ:
```
change_table :products do |t|
  t.remove :description, :name
  t.string :part_number
  t.index :part_number
  t.rename :upccode, :upc_code
end
```
loại bỏ các cột mô tả và tên, tạo một cột chuỗi part_number và thêm một chỉ mục vào đó. Cuối cùng, nó đổi tên cột upccode.
```
change_column :products, :part_number, :text
```
Điều này sẽ thay đổi cột part_number trên bảng Product thành  1 trường text.Lưu ý rằng lệnh change_column là không thể đảo ngược.
Bên cạnh change_column, các phương thức change_column_null và change_column_default được sử dụng đặc biệt để thay đổi ràng buộc không null và các giá trị mặc định của một cột.
```
change_column_null :products, :name, false
change_column_default :products, :approved, from: true, to: false
```
Điều này đặt trường: name trên các sản phẩm thành cột NOT NULL  và giá trị mặc định của trường: được chấp thuận từ true sang false.
### 3.4 Changing Columns
Giống như remove_column và add_column, Rails cung cấp phương thức  migration change_column.
```
change_column :products, :part_number, :text
```
Điều này sẽ thay đổi cột part_number trên bảng Product thành trường :text . Lưu ý rằng lệnh change_column là không thể đảo ngược.
```
change_column_null :products, :name, false
change_column_default :products, :approved, from: true, to: false
```

Điều này đặt trường: name trên các Product thành cột NOT NULL và giá trị mặc định của trường: được :approved từ true sang false.

### 3.5 Column Modifiers
Công cụ sửa đổi cột có thể được áp dụng khi tạo hoặc thay đổi một cột:
-`comment` : Thêm comment cho column
- `collation`: Chỉ định collation cho column là string hoặc text
- `default`: Cho phép đặt giá trị mặc định trên column. Lưu ý rằng nếu bạn đang sử dụng một giá trị động (chẳng hạn như ngày ), giá trị mặc định chỉ được tính lần đầu tiên (tức là ngày áp dụng migration) sử dụng nil cho NULL .
- `limit `: đặt số ký tự tối đa cho cột string và số byte tối đa cho cột text/binary/integer 
-`null `: cho phép hoặc không cho phép các giá trị NULL trong cột .
- `precision` : chỉ định độ chính xác cho các cột decimal/numeric/datetime/time 
- `Scale`: Chỉ định tỷ lệ cho cột decimal hoặc numeric, đại diện cho chữ số sau dấu thập phân.
Đối với add_column hoặc change_column, không có tùy chọn nào để thêm chỉ mục. Chúng cần được thêm riêng bằng add_index.
### 3.6 References
Phương thức add_reference cho phép tạo một cột được đặt tên thích hợp.
```
add_reference :users, :role
```
Việc di chuyển này sẽ tạo một cột role_id trong bảng User . Nó cũng tạo chỉ mục cho cột này, trừ khi được thông báo rõ ràng là không có option  index: false

```
add_reference :users, :role, index: false
```
Phương thức add_belongs_to là một alias của add_reference
```
add_belongs_to :taggings, :taggable, polymorphic: true
```
Tùy chọn đa hình sẽ tạo hai cột trên bảng Taggings  có thể được sử dụng cho các liên kết đa hình: taggable_type và taggable_id.
Một khóa ngoại có thể được tạo bằng tùy chọn foreign_key
```
add_reference :users, :role, foreign_key: true
```
References có thể bị xóa : 
```
remove_reference :products, :user, foreign_key: true, index: false
```
### 3.7 Foreign Keys
Mặc dù không bắt buộc nhưng bạn có thể muốn thêm các ràng buộc khóa ngoại để đảm bảo tính toàn vẹn của tham chiếu.
```
add_foreign_key :articles, :authors
```
Thao tác này sẽ thêm một khóa ngoại mới vào cột author_id của bảng Articles . Khóa tham chiếu đến cột id của bảng authors. Nếu tên cột không thể bắt nguồn từ tên bảng, bạn có thể sử dụng các tùy chọn: column và: primary_key.

Rails sẽ tạo tên cho mọi khóa ngoại bắt đầu bằng fk_rails_ theo sau là 10 ký tự được tạo một cách xác định từ from_table và cột. Có một tùy chọn: name để chỉ định một tên khác nếu cần.
Các khóa ngoại cũng có thể được loại bỏ:
```
# let Active Record figure out the column name
remove_foreign_key :accounts, :branches

# remove foreign key for a specific column
remove_foreign_key :accounts, column: :owner_id

# remove foreign key by name
remove_foreign_key :accounts, name: :special_fk_name
```
### 3.8 When Helpers aren't Enough
Nếu trình trợ giúp được cung cấp bởi Active Record không đủ, bạn có thể sử dụng phương thức `execute  `để thực thi SQL tùy ý:
```
Product.connection.execute("UPDATE products SET price = 'free' WHERE 1=1")
```
Để biết thêm chi tiết và ví dụ về các phương pháp riêng lẻ, hãy kiểm tra API document . Đặc biệt là tài liệu cho
`ActiveRecord :: ConnectionAdapters :: SchemaStatements` (cung cấp các phương thức có sẵn trong phương thức thay đổi, phương thức up  và down),
`ActiveRecord :: ConnectionAdapters :: TableDefinition `(cung cấp các phương thức có sẵn trên đối tượng do create_table mang lại) và`ActiveRecord :: ConnectionAdapters :: Table` (cung cấp các phương thức có sẵn trên đối tượng do change_table mang lại).
### 3.9 Using the change Method
Phương thức change là cách chính để viết migration Nó hoạt động trong hầu hết các trường hợp, trong đó Active Record biết cách tự động đảo ngược quá trình migration.Hiện tại, phương pháp change chỉ hỗ trợ các định nghĩa migration sau:
* add_column
* add_foreign_key
* add_index
* add_reference
* Add_timestamps
* change_column_default (phải cung cấp tùy chọn: from và: to)
* change_column_null
* create_join_table
* create_table
* disable_extension
* drop_join_table
* drop_table (phải cung cấp một block)
* enable_extension
* remove_column (phải cung cấp một loại) 
* remove_foreign_key (phải cung cấp bảng thứ hai
* remove_index
* remove_reference
* remove_timestamps
* rename_column
* rename_index
* rename_table
change_table cũng có thể hoàn nguyên, miễn là khối không gọi change, change_default hoặc remove.
remove_column có thể hoàn nguyên nếu bạn cung cấp loại cột làm đối số thứ ba. Cung cấp các tùy chọn cột ban đầu, nếu không, Rails không thể tạo lại cột chính xác khi quay trở lại:
```
remove_column :posts, :slug, :string, null: false, default: ''
```
Nếu bạn cần sử dụng bất kỳ phương pháp nào khác, bạn nên sử dụng các phương thức có thể đảo ngược hoặc viết up  và down  thay vì sử dụng phương pháp change
### 3.10 Using reversible
Migration phức tạp có thể yêu cầu xử lý mà Active Record không biết cách đảo ngược. Bạn có thể sử dụng tính năng reversible  để chỉ định những việc cần làm khi chạy quá trình migration và những việc cần làm khác khi reverting. 
Ví dụ:
```
class ExampleMigration < ActiveRecord::Migration[7.0]
  def change
    create_table :distributors do |t|
      t.string :zipcode
    end

    reversible do |dir|
      dir.up do
        # add a CHECK constraint
        execute <<-SQL
          ALTER TABLE distributors
            ADD CONSTRAINT zipchk
              CHECK (char_length(zipcode) = 5) NO INHERIT;
        SQL
      end
      dir.down do
        execute <<-SQL
          ALTER TABLE distributors
            DROP CONSTRAINT zipchk
        SQL
      end
    end

    add_column :users, :home_page_url, :string
    rename_column :users, :email, :email_address
  end
end
```
Sử dụng reversible sẽ đảm bảo rằng các hướng dẫn cũng được thực hiện theo đúng thứ tự.
Nếu quá trình migration ví dụ trước đó được hoàn nguyên, down  block sẽ được chạy sau khi cột home_page_url bị xóa và ngay trước khi bảng distributors bị dropped

Đôi khi việc migration của bạn sẽ thực hiện một điều gì đó đơn giản là không thể đảo ngược; ví dụ, nó có thể phá hủy một số dữ liệu. Trong những trường hợp như vậy, bạn có thể nâng ActiveRecord :: IrreversibleMigration trong down block  của bạn. Nếu ai đó cố gắng  revert  quá trình migration  của bạn, một thông báo lỗi sẽ được hiển thị cho biết rằng không thể thực hiện được.
### 3.11 Using the up/down Methods
Bạn cũng có thể sử dụng kiểu migration  cũ bằng cách sử dụng phương pháp up và down  thay vì phương pháp change.Phương thức up sẽ mô tả sự chuyển đổi bạn muốn thực hiện đối với lược đồ của mình và phương thức down sẽ revert các phép biến đổi được thực hiện bởi phương thức up.Nói cách khác, lược đồ cơ sở dữ liệu sẽ không thay đổi nếu bạn thực hiện lệnhup , theo sau là down 
Ví dụ: nếu bạn tạo một bảng trong phương thức up , bạn nên thả nó trong phương thức down .
Điều khôn ngoan là thực hiện các phép biến đổi theo đúng thứ tự ngược lại mà chúng đã được thực hiện trong phương pháp up. Ví dụ trong phần có thể đảo ngược tương đương với:
```
class ExampleMigration < ActiveRecord::Migration[7.0]
  def up
    create_table :distributors do |t|
      t.string :zipcode
    end

    # add a CHECK constraint
    execute <<-SQL
      ALTER TABLE distributors
        ADD CONSTRAINT zipchk
        CHECK (char_length(zipcode) = 5);
    SQL

    add_column :users, :home_page_url, :string
    rename_column :users, :email, :email_address
  end

  def down
    rename_column :users, :email_address, :email
    remove_column :users, :home_page_url

    execute <<-SQL
      ALTER TABLE distributors
        DROP CONSTRAINT zipchk
    SQL

    drop_table :distributors
  end
end
```
Nếu quá trình migration của bạn là không thể đảo ngược, bạn nên nâng ActiveRecord :: IrreversibleMigration từ phương thức down của mình. Nếu ai đó cố gắng hoàn nguyên quá trình di chuyển của bạn, một thông báo lỗi sẽ được hiển thị cho biết rằng không thể thực hiện được.

### 3.12 Reverting Previous Migrations
Bạn có thể sử dụng khả năng khôi phục migration của Active Record bằng cách sử dụng phương pháp revert:
```
class FixupExampleMigration < ActiveRecord::Migration[7.0]
  def change
    revert ExampleMigration

    create_table(:apples) do |t|
      t.string :variety
    end
  end
end
```
Phương thức revert cũng chấp nhận một khối lệnh để đảo ngược. Điều này có thể hữu ích để hoàn nguyên các phần đã chọn của các lần migration trước đó.
Ví dụ: hãy tưởng tượng rằng ExampleMigration được cam kết và sau đó người ta quyết định rằng tốt nhất là sử dụng xác thực Active Record, thay cho ràng buộc CHECK, để xác minh mã zip.
```
class DontUseConstraintForZipcodeValidationMigration < ActiveRecord::Migration[7.0]
  def change
    revert do
      # copy-pasted code from ExampleMigration
      reversible do |dir|
        dir.up do
          # add a CHECK constraint
          execute <<-SQL
            ALTER TABLE distributors
              ADD CONSTRAINT zipchk
                CHECK (char_length(zipcode) = 5);
          SQL
        end
        dir.down do
          execute <<-SQL
            ALTER TABLE distributors
              DROP CONSTRAINT zipchk
          SQL
        end
      end
      # The rest of the migration was ok
    end
  end
end
```
Quá trình migration tương tự cũng có thể được viết mà không sử dụng revert nhưng điều này sẽ bao gồm một vài bước nữa: đảo ngược thứ tự của create_table và có thể đảo ngược, thay thế create_table bằng drop_table, cuối cùng thay thế up bằng down và ngược lại. Tất cả điều này được thực hiện bởi revert.
## 4. Kết luận 
Như vậy chúng ta đã biết được các phương pháp Active Record cung cấp để thao tác với cơ sở dữ liệu của bạn. Phần sau chúng ta sẽ tìm hiểu các vấn đề liên quan đến việc chạy migration. 
## 5. Tài liệu tham khảo 
https://edgeguides.rubyonrails.org/active_record_migrations.html