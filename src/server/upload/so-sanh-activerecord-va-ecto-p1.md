Bài viết này mình so sánh giữa ActiveRecord (Ruby) and Ecto (Elixir)
# ActiveRecord
Với hơn 10 năm kể từ khi phát hành, rất có thể bạn đã nghe nói về ActiveRecord - ORM nổi tiếng được mặc định với các dự án Ruby on Rails.

> ActiveRecord là Model trong MVC - là lớp của hệ thống chịu trách nhiệm đại diện cho dữ liệu nghiệp vụ và logic. ActiveRecord tạo điều kiện cho việc tạo và sử dụng hướng đối tượng có dữ liệu yêu cầu lưu trữ liên tục trong cơ sở dữ liệu. Nó là một sự thực hiện của mẫu ActiveRecord vốn là chính nó, một mô tả của một hệ thống hướng đối tượng.
Mặc dù phần lớn được biết là được sử dụng với Rails, ActiveRecord cũng có thể được sử dụng như một công cụ độc lập, được nhúng vào trong các dự án khác.
# Ecto
Khi so sánh với ActiveRecord, Ecto là một công cụ khá mới (và hiện tại không nổi tiếng). Nó được viết bằng Elixir và được mặc định trong các dự án Phoenix.
Không giống như ActiveRecord, Ecto không phải là một ORM, mà là một thư viện cho phép sử dụng Elixir để viết các truy vấn và tương tác với cơ sở dữ liệu.
> Ecto là một ngôn ngữ dành riêng cho việc viết các truy vấn và tương tác với các cơ sở dữ liệu ở Elixir.
Theo thiết kế, Ecto là một công cụ độc lập, được sử dụng trong các dự án Elixir khác nhau và không được kết nối với bất kỳ framework nào.
# The Invoice System
dưới đây chúng ta có một ví dụ là sẽ có một shop đồ có người dùng (users) và hóa đơn (invoice).
users:
![](https://images.viblo.asia/58989397-eb27-492b-95c0-ef88a00cc653.png)
invoice:
![](https://images.viblo.asia/1b4d6e60-0ff1-41c5-a38e-a0e5d40facd6.png)
Table người dùng có bốn trường: full_name, email, updated_at và trường thứ tư phụ thuộc vào công cụ được sử dụng. ActiveRecord tạo ra một trường created_at trong khi Ecto tạo ra một trường insert_at để biểu diễn dấu thời gian của thời điểm bản ghi được chèn đầu tiên vào cơ sở dữ liệu.
Table thứ hai được đặt tên là hóa đơn. Nó có năm trường: user_id, payment_method, paid_at, updated_at và, tương tự như table người dùng, hoặc created_at hoặc insert_at, tùy thuộc vào công cụ được sử dụng.
Theo thiết kế thì ta dễ dàng nhận thấy quan hệ ở đây là:
1 user has_many invoices
1 invoice belongs_to user
# Migrations
Hãy xem xét cách di chuyển hoạt động trong ActiveRecord và Ecto bằng cách sử dụng chúng để tạo table user và invoice.
## ActiveRecord: Creating the Users Table
```
class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :full_name, null: false
      t.string :email, index: {unique: true}, null: false
      t.timestamps
    end
  end
end
```
ActiveRecord migrations cho phép tạo table bằng cách sử dụng phương thức create_table. Mặc dù các trường created_at và updated_at không được định nghĩa trong migration file, việc sử dụng t.timestamps kích hoạt ActiveRecord để tạo cả hai.
Sau khi chạy CreateUsers, table đã tạo sẽ có cấu trúc sau:
```
Column   |            Type             | Nullable |              Default
------------+-----------------------------+----------+-----------------------------------
 id         | bigint                      | not null | nextval('users_id_seq'::regclass)
 full_name  | character varying           | not null |
 email      | character varying           | not null |
 created_at | timestamp without time zone | not null |
 updated_at | timestamp without time zone | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "index_users_on_email" UNIQUE, btree (email)
```
Việc migration cũng chịu trách nhiệm tạo ra một chỉ mục duy nhất cho trường email. Chỉ mục tùy chọn: {unique: true} được chuyển tới định nghĩa trường email. Đây là lý do tại sao table đã liệt kê chỉ mục "index_users_on_email" UNIQUE, btree (email) như là một phần của cấu trúc của nó.
## Ecto: Creating the Users Table
```
defmodule Financex.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :full_name, :string, null: false
      add :email, :string, null: false
      timestamps()
    end

    create index(:users, [:email], unique: true)
  end
end
```
Migration Ecto kết hợp các hàm create () và table () để tạo table user. File migration Ecto khá giống với file tương đương ActiveRecord của nó. Trong ActiveRecord, các trường timestamps (created_at và updated_at) được tạo bởi t.timestamps trong khi trong Ecto các trường timestamps (insert_at và updated_at) được tạo bởi hàm timestamps ().

Có một sự khác biệt nhỏ giữa cả hai công cụ về cách lập chỉ mục. Trong ActiveRecord, chỉ mục được định nghĩa là một tùy chọn cho trường được tạo. Ecto sử dụng sự kết hợp của các hàm create () và index () để đạt được điều đó, phù hợp với cách kết hợp được sử dụng để tạo ra table đó.

cấu trúc:
```
Column    |            Type             | Nullable |              Default
-------------+-----------------------------+----------+-----------------------------------
 id          | bigint                      | not null | nextval('users_id_seq'::regclass)
 full_name   | character varying(255)      | not null |
 email       | character varying(255)      | not null |
 inserted_at | timestamp without time zone | not null |
 updated_at  | timestamp without time zone | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_index" UNIQUE, btree (email)
```

Table được tạo khi chạy migration Financex.Repo.Migrations.CreateUsers có cấu trúc giống hệt với table được tạo bằng ActiveRecord.

## ActiveRecord: Creating the invoices Table
```
class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.references :user
      t.string :payment_method
      t.datetime :paid_at
      t.timestamps
    end
  end
end
```
Migration này bao gồm phương thức t.references, không có trong phương thức trước. Nó được sử dụng để tạo một tham chiếu đến table user. Như được mô tả trước đó, user có nhiều invoices và invoice thuộc về user. Phương thức t.references tạo cột user_id trong table invoice để giữ tham chiếu đó.
cấu trúc:
```
Column     |            Type             | Nullable |               Default
----------------+-----------------------------+----------+--------------------------------------
 id             | bigint                      | not null | nextval('invoices_id_seq'::regclass)
 user_id        | bigint                      |          |
 payment_method | character varying           |          |
 paid_at        | timestamp without time zone |          |
 created_at     | timestamp without time zone | not null |
 updated_at     | timestamp without time zone | not null |
Indexes:
    "invoices_pkey" PRIMARY KEY, btree (id)
    "index_invoices_on_user_id" btree (user_id)
```
Bảng được tạo theo các mẫu giống như bảng đã tạo trước đó. Sự khác biệt duy nhất là một chỉ số phụ (index_invoices_on_user_id), mà ActiveRecord tự động thêm khi phương thức t.references được sử dụng.
## Ecto: Creating the invoices Table
```
defmodule Financex.Repo.Migrations.CreateInvoices do
  use Ecto.Migration

  def change do
    create table(:invoices) do
      add :user_id, references(:users)
      add :payment_method, :string
      add :paid_at, :utc_datetime
      timestamps()
    end

    create index(:invoices, [:user_id])
  end
end
```
Ecto cũng hỗ trợ việc tạo các tham chiếu cơ sở dữ liệu, bằng cách sử dụng hàm references (). Không giống như ActiveRecord, trong đó nhập tên cột, Ecto yêu cầu nhà phát triển xác định rõ ràng tên cột user_id. Hàm references () cũng yêu cầu nhà phát triển xác định rõ ràng table tham chiếu đang trỏ đến, trong ví dụ này, là table user.
cấu trúc:
```
Column     |            Type             | Nullable |               Default
----------------+-----------------------------+----------+--------------------------------------
 id             | bigint                      | not null | nextval('invoices_id_seq'::regclass)
 user_id        | bigint                      |          |
 payment_method | character varying(255)      |          |
 paid_at        | timestamp without time zone |          |
 inserted_at    | timestamp without time zone | not null |
 updated_at     | timestamp without time zone | not null |

Indexes:
    "invoices_pkey" PRIMARY KEY, btree (id)
    "invoices_user_id_index" btree (user_id)
Foreign-key constraints:
    "invoices_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```
Cả hai migration cũng khá giống nhau. Khi nói đến cách tính năng references được xử lý, có một số khác biệt:
1. Ecto tạo ra ràng buộc khóa ngoài cho trường user_id `("invoices_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id))` duy trì tính toàn vẹn tham chiếu giữa bảng user và bảng invoice.
2. ActiveRecord tự động tạo chỉ mục cho cột user_id. Ecto yêu cầu developer phải rõ ràng về điều đó. Đây là lý do tại sao quá trình migration có câu lệnh tạo chỉ mục (: invoice, [: user_id]).
## ActiveRecord: Data Mapping & Associations
ActiveRecord được biết đến với "conventions over configurations"(quy ước trên cấu hình) của nó. Nó đặt tên bảng cơ sở dữ liệu bằng tên lớp mô hình, theo mặc định. Một class có tên User sẽ sử dụng bảng user làm nguồn của nó. ActiveRecord map với tất cả các cột của bảng dưới dạng một thuộc tính instance. Developers chỉ được yêu cầu xác định các liên kết giữa các bảng. Chúng cũng được sử dụng bởi ActiveRecord để suy ra các class và table có liên quan.

Hãy xem các table user và invoice được map cách sử dụng ActiveRecord như thế nào:
**users**:
```
class User < ApplicationRecord
  has_many :invoices
end
```
**invoices**:
```
class Invoice < ApplicationRecord
  belongs_to :user
end
```
## Ecto: Data Mapping & Associations
Ecto yêu cầu developer phải rõ ràng về nguồn dữ liệu và các trường của nó. Mặc dù Ecto có các đặc tính has_many và thuộc tính tương tự, nó cũng yêu cầu các developer phải rõ ràng về table được liên kết và mô-đun lược đồ được sử dụng để xử lý lược đồ table đó.
Đây là cách Ecto maps user và invoice:
**users**:
```
defmodule Financex.Accounts.User do
  use Ecto.Schema

  schema "users" do
    field :full_name, :string
    field :email, :string
    has_many :invoices, Financex.Accounts.Invoice
    timestamps()
  end
end
```
**invoices**
```
defmodule Financex.Accounts.Invoice do
  use Ecto.Schema

  schema "invoices" do
    field :payment_method, :string
    field :paid_at, :utc_datetime
    belongs_to :user, Financex.Accounts.User
    timestamps()
  end
end
```
# Tóm lại
*  “convention over configuration”  giúp việc sử dụng ActiveRecord thường liên quan đến việc viết ít hơn. Ecto đi theo hướng ngược lại, yêu cầu các developer phải rõ ràng hơn về ý định của họ. Đối với người mới bắt đầu, ActiveRecord là một giải pháp phù hợp hơn, bởi vì nó đưa ra quyết định “đủ tốt” theo mặc định miễn là bạn tuân thủ nghiêm ngặt tiêu chuẩn của nó.
*  Khía cạnh rõ ràng của Ecto giúp đọc và hiểu hành vi của một đoạn mã dễ dàng hơn, nhưng nó cũng yêu cầu developer hiểu thêm về các thuộc tính cơ sở dữ liệu và các tính năng có sẵn. Điều đó làm cho Ecto trông rườm rà ngay từ cái nhìn đầu tiên.

Kết: trên đây là một ví dụ mình đã tìm hiểu được, các bạn có thể tham khảo tại [link](https://medium.com/@AppSignal/activerecord-vs-ecto-part-one-dceabe6f780e) này để hiểu rõ hơn nhé.