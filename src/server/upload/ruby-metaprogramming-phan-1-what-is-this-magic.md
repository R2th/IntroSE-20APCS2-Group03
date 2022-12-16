Để cho các bạn đỡ cái cảm giác chán ngán khi đọc phần mở bài của bất cứ cái bài viết kỹ thuật nào cũng đều bắt gặp format dạng " abc là một beep beep beep được tạo ra bởi oạch oạch oạch phục vụ cho bla bla bla", 
hôm nay mình sẽ viết cái series này theo một cách freestyle nhất với mục đích là đảm bảo cho người đọc vẫn thấy được cái magic của đề tài, nhưng sẽ không có cái cảm giác "what the hell did i just read ?" như mình đã từng sau khi đọc xong cuốn sách lần đầu tiên.
 
Bài viết nãy sẽ không có đề mục, không có gạch đầu dòng hay chia ý, vì vốn dĩ nó không có ý gì cụ thể cả =))

Tất cả những gì mình muốn tuyền tải chỉ là lý do vì sao bạn nên đọc *Metaprogramming Ruby 2: Program Like the Ruby Pros* mà thôi .

Và tất nhiên, lời khuyên của mình vẫn là nếu bạn muốn đọc cái cuốn sách này, hãy đọc chậm thôi, kết hợp ngẫm nghĩ và thử thực hành. Vì nếu bạn đọc nó đủ nhanh, nó sẽ biến thành 1 vòng tròn và đưa bạn về điểm bắt đầu :D

Okay, here we go !

Nếu như bạn đã từng học hoặc làm việc với Rails, chắc hẳn bạn sẽ thật sự bị hấp dẫn bởi cách mà Rails hỗ trợ bạn trong việc tạo các quan hệ giữa các model, hay cách nó tạo ra 1 bảng trong DB chỉ bằng việc viết một vài dòng migrate. Ngắn gọn, đẹp, và hiệu quả đó là tất cả những gì bạn nhìn thấy. 

Well sad, hoa nào đẹp thì cũng có gai, việc được support quá nhiều có thể trở thành con dao hai lưỡi với các lập trình viên, nhất là với những người mới bắt đầu. 
Tất cả những gì chúng ta thấy đều diễn ra quá nhanh, và quá hiệu quả, nó làm ta ngỡ ngàng và ahm uhm, đôi lúc ta không biết chuyện gì vừa xảy ra.

Giờ hãy thử nhìn vào 1 đoạn code validation nào

```ruby
class User < ActiveRecord::Base 
  validates :email, presence: true
end
```

Làm sao nó hoạt động được man ?

Trong Ruby hay là Rails, có một keyword luôn tồn tại bất chấp bạn đang ở đâu trong mớ code hỗn độn, đó chính là: self.

Vì vậy nếu bạn đang ở trong một class, và bạn puts self, nó sẽ ghi ra value/tên của class. 

Nhưng nếu bạn đang ở trong một instance method thì self lúc này lại là value của instance đó chứ không còn của class nữa

```ruby
class User
  puts "#{self}"
end
```

`User `

Và đây là khi bạn gọi self ở instance method
```ruby
class User
def full_name
  puts "#{self}"
end
User.new.full_name
```

`#<User:0x007fdcb2a14f50>`

Điều này giúp cho việc viết các validate trong ví dụ ở trên trở nên có tác dụng, lúc này 
` validates :email, presence: true`
sẽ giống với
`self.validates :email, presence: true`

Ví dụ ban đầu sẽ tương đương với: 
```ruby
class User < ActiveRecord::Base 
  self.validates :email, presence: true
end
```

Dù cho nghe có vẻ ghê gớm nhưng suy cho cùng validate chỉ đơn giản là 1 class method mà chúng ta gọi và truyền vào đó một tham số

Tiếp tục với câu chuyện magic tiếp theo nha

Làm sao mấy dòng code migration lại có thể hoạt động được trong Rails (??)

```ruby
class CreateUsers < ActiveRecord::Migration 
  def change
    create_table :users do |t| 
      t.string :first_name 
      t.string :last_name 
      t.integer :age
    end 
  end
end
```

Bây giờ có thể hiểu create_table là một instance method, vì vậy chúng ta có thể viết self.create_table thay vì create_table. 

Nhưng self bây giờ đã được refer tới instance hiện tại, nên việc viết self phía trước là không cần thiết nữa

1 cú soi code trong Rails nào, chúng ta sẽ thấy create_table được định nghĩa:

```ruby
def create_table(table_name, options = {})
  td = create_table_definition table_name, options[:temporary], options[:op
tions], options[:as]
  if options[:id] != false && !options[:as] 
    pk = options.fetch(:primary_key) do
      Base.get_primary_key table_name.to_s.singularize 
    end
    td.primary_key pk, options.fetch(:id, :primary_key), options 
  end
  
  yield td if block_given?
  
  if options[:force] && table_exists?(table_name) 
    drop_table(table_name, options)
  end

  result = execute schema_creation.accept td
  td.indexes.each_pair { |c, o| add_index(table_name, c, o) } unless suppor ts_indexes_in_create?
  result
end
```

Nếu để ý thì bạn sẽ thấy tham số đầu tiên của nó là table_name, sau đó thì bạn có thể truyền vào một tham số khác như kiểu id:false để tạo bảng mà không cần id

yield td if block_given? là cái quái gì ?

Nó được viết bên trong define của create_table để nói với chúng ta rằng sẽ có 1 block, và tất nhiên, bạn có thể thấy là có hay không rồi đúng không :))

Giờ bạn có thể tưởng tượng xem  has_many :users hoạt động ra sao rồi đúng không. Thấy magic không nào :D

Việc có được những kiến thức về cách hoạt động của Rails, Ruby sẽ giúp cho bạn có thể tự tin hơn trong quá trình viết hay debug code trong Rails App. 
Và vì những gì chúng ta biết được hay có thể hình dung được chỉ là 1 phần nhỏ của tảng băng, nên mình mong những Ruby developer nếu có thể thì hãy đọc và đọc nhiều lần cuốn Metaprogramming Ruby(đọc ver 2 nhé) vì nó thật sự hay và hữu ích.

Nếu bạn lười đọc sách, hãy follow seriers này và mình sẽ cố gắng viết đầy đủ nhất có thể những gì mình đọc và hiểu được.  Peace!

Tài liệu tham khảo: 

1. http://www.square63.com/metaprogramming-in-rails-the-internals/
2. Metaprogramming Ruby 2: Program Like the Ruby Pros