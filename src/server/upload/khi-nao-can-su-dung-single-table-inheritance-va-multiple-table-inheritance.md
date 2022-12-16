## Single Table Inheritance là gì?
Trong lập trình hướng đối tượng khi nhiều object có quan hệ liên kết với một cơ sở dữ liệu quan hệ,  `single table inheritance (STI)` được định nghĩa là nhiều subclasses cùng chia sẻ với một bảng dữ liệu. Rails hỗ trợ `STI` được dùng ngay khi kế thừa một `subclasses` từ một class cha `ActiveRecord` và có một cột loại.

Ví dụ, hãy xem xét mô hình hóa các tài khoản khác nhau có chung các trường/phương thức, nhưng cũng có các hành vi cụ thể của các lớp con.
```
class Account < ActiveRecord::Base
  def withdraw(amount)
    # ...
  end
  
  def deposit(amount)
    # ...
  end
  
  def close!
    update_attribute!(closed_at, Time.current)
  end
end

# These three types of accounts inherit from a common base class
# so they can all share a common `#close` method.  However, each
# class has its own class-specific methods.

class CorporateAccount < Account
  def close!
    inform_share_holders!
    super
  end
end

class SmallBusinessAccount < Account
  def close!
    inform_mom_and_pop!
    super
  end
end

class PersonalAccount < Account
  def close!
    inform_dude_or_dudette!
    super
  end
end

# Rails is smart enough to detect STI if we add a `type` column
# in the `accounts` table.

class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string    :type
      t.float     :balance
      t.string    :tax_identifier
      t.date_time :closed_at
      # ... more column fields #
      t.timestamps
    end
  end
end

# Creation of a corporate account will create a new record in the
# `accounts` table, but with `type` equal to  "corporate".
CorporateAccount.create(name: "Evil Corp", tax_identifier: "6664201369" ...)
```
## Multiple Table Inheritance là gì?
Multiple Table inheritance (MTI) được định nghĩa là mỗi subclass có một bảng, nhưng cùng chia sẻ với cha một phương thức. Ví dụ:
```
class Account < ActiveRecord::Base
  def withdraw(amount)
    # ...
  end
  
  def deposit(amount)
    # ...
  end
  
  def close!
    update_attribute!(closed_at, Time.current)
  end
end

# These three types of accounts inherit from a common base class
# so they can all share a common `#close` method.  However, each
# class has its own class-specific methods as well as their own
# tables.

class CorporateAccount < Account
  set_table_name "corporate_accounts"
  def close!
    inform_share_holders!
    super
  end
end

class SmallBusinessAccount < Account
  set_table_name "small_business_accounts"
  def close!
    inform_mom_and_pop!
    super
  end
end

class PersonalAccount < Account
  set_table_name "personal_accounts"
  def close!
    inform_dude_or_dudette!
    super
  end
end

# As such, we need to create three tables. A very un-DRY approach.

class CreateCorporateAccounts < ActiveRecord::Migration
  def change
    create_table :corporate_accounts do |t|
      t.float     :balance
      t.string    :tax_identifier
      t.date_time :closed_at
      # ... more column fields #
      t.timestamps
    end
  end
end

class CreateSBAccounts < ActiveRecord::Migration
  def change
    create_table :small_business_accounts do |t|
      t.float     :balance
      t.string    :tax_identifier
      t.date_time :closed_at
      # ... more column fields #
      t.timestamps
    end
  end
end

class CreatePersonalAccounts < ActiveRecord::Migration
  def change
    create_table :personal_accounts do |t|
      t.float     :balance
      t.string    :tax_identifier
      t.date_time :closed_at
      # ... more column fields #
      t.timestamps
    end
  end
end
```

## Khi nào sử dụng Single Table Inheritance
### Sử dụng STI khi subclasses có các trường giống nhau nhưng khác về hành vi
Dấu hiệu cho thấy cần sử dụng STI khi lớp con khác nhau có cùng các trường/cột nhưng phương thức khác nhau. Trong ví dụ về tài khoản ở trên, tôi mong là các trường đều được sử dụng nếu không sẽ có rất nhiều cột bị null.
### Sử dụng STI khi muốn truy vấn đến tất cả các subclasses
Một dấu hiệu khác STI là dùng khi chúng ta mong đợi thực hiện các truy vấn trên tất cả các lớp. Ví dụ: nếu chúng ta muốn truy vấn tìm 10 tài khoản đầu có số dư cao nhất trong tất cả các loại, STI sẽ cho phép chỉ sử dụng một truy vấn trong khi MTI sẽ yêu cầu thao tác memory.
```
# Under STI, find the top 10 accounts with the greatest balances
# with just one query.

top_accounts = Account.order(balance: :desc).limit(10)

# Under MTI, we need to query all accounts and sort them in memory:

top_corporate_accts =  CorporateAccount.order(balance: :desc).limit(10)
top_sb_accts =  SmallBusinessAccount.order(balance: :desc).limit(10)
top_personal_accts =  PersonalAccount.order(balance: :desc).limit(10)

top_accounts = (top_corporate_accts + top_sb_accts + top_personal_accts).sort do |acct1, acct2|
  acct1 <=> acct2
end.first(10)
```
## Khi nào sử dụng Multiple Table Inheritance
### Sử dụng MTI khi Subclasses có nhiều trường/cột khác nhau nhưng cùng chia sẻ hành vi
Khi subclasses có nhiều trường/cột khác nhau, khi đặt chung một bảng ghi thì sẽ có rất nhiều trường rỗng, cuối cùng sẽ là lãng phí không gian, gây nhần lẫn về khái niệm và giảm hiệu quả của index. Ví dụ, với mô hình các loại động vật thì STI là một lựa chọn tồi.
```
class Animal < ActiveRecord::Base
  def eat
  end
end

class Bird < Animal
  def fly
  end
end

class Mammal < Animal
  def run
  end
end

class Fish < Animal
  def swim
  end
end

# Animals should not be modeled using STI since their single table
# would have a lot of sparse columns (ie. mammals without wing_span and
# birds without num_of_fins)

class CreateAnimals < ActiveRecord::Migration
  def change
    create_table :animals do |t|
      # STI required field
      t.string :type
      
      # only applicable to birds, mammals and fish will have null values
      t.float   :wing_span
      
      # only applicable to fish, mammals and birds will have null values
      t.integer :num_of_fins
      
      # only applicable to mammals and birds, fish need not apply
      t.integer :num_of_legs
      
      # ... more column fields #
      t.timestamps
    end
  end
end
```
MTI sẽ là lựa chọn tốt hơn rất nhiều với subclasses vẫn được chia sẻ phương thức `Animail#eat`, nhưng vẫn có bảng riêng với các trường/cột liên quan.
```
class Animal < ActiveRecord::Base
  def eat
  end
end

class Bird < Animal
  set_table_name "birds"
  
  def fly
  end
end

class Mammal < Animal
  set_table_name "mammals"
  
  def run
  end
end

class Fish < Animal
  set_table_name "fish"
  
  def swim
  end
end

class CreateMammal < ActiveRecord::Migration
  def change
    create_table :mammals do |t|
      t.integer :num_of_legs
      
      # ... more column fields #
      t.timestamps
    end
  end
end

class CreateFish < ActiveRecord::Migration
  def change
    create_table :fish do |t|
      t.integer :num_of_fins
      
      # ... more column fields #
      t.timestamps
    end
  end
end

class CreateBird < ActiveRecord::Migration
  def change
    create_table :birds do |t|
      t.float   :wing_span
      
      # ... more column fields #
      t.timestamps
    end
  end
end
```
### Sử dụng MTI nếu cần một bảng ghi lớn
Nói chung, bảng nhỏ (nghĩa là chỉ có vài trường và vài cột) thì sẽ tốt hơn nhiều. Ngay cả khi là trường hợp hợp lý sử dụng STI, nhưng bảng ghi sẽ lớn hơn nhiều MTI khiến cho truy vấn chậm hơn. Mặc dù sharing là một cách xử lý bảng lớn, nhưng trong trường hợp đó, bạn cũng có thể sử dụng MTI.
## Polymorphic Associations Instead
Nếu bạn sử dụng STI có một `Active Record`, bạn có thể sử dụng với polymorphic association instead. Ví dụ:
```
# Suppose the AccountHolder parent class is used
# to simply have an association with an account so
# both corporations and people can have accounts.

class Account < ActiveRecord::Base
  belongs_to :account_holder
end

class AccountHolder < ActiveRecord::Base
  has_one :account
end

class Corporation < AccountHolder
end

class Person < AccountHolder
end

# Just use a polymorphic association instead

class Account < ActiveRecord::Base
  belongs_to :account_holdable, polymorphic: true
end

class Corporation < AccountHolder
  has_one :account, as: :account_holdable
end

class Person < AccountHolder
  has_one :account, as: :account_holdable
end

# As such, accounts would need the polymorphic columns
# `account_holdable_type` and `account_holdable_id` which
# would describe the class as well as the primary key, respectively.

class CreateAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :accounts do |t|

      # ... various fields
      
      t.integer :account_holdable_id
      t.string  :account_holdable_type
      
      t.timestamps
    end
  end
end
```
## Khi thấy hoài nghi, MTI tốt hơn STI
Trừ khi STI là một lựa chọn trực tiếp (các lớp con có chính xác các trường/cột giống nhau và thường xuyên truy vấn trên tất cả các subclasses) nên không nên chọn MTI. STI sẽ gây ra khó hiểu hơn và bảng ghi của nó sẽ đầy và truy vấn chậm hơn.

## Tổng kết
Bài viết được dịch từ nguồn: https://medium.com/@User3141592/when-to-use-single-table-inheritance-vs-multiple-table-inheritance-db7e9733ae2e