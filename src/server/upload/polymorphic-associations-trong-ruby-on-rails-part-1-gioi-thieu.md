Đây là phần đầu tiên trong loạt bài gồm ba phần về Polymorphic Associations trong Ruby on Rails sử dụng Active Model. Phần đầu tiên này sẽ giới thiệu khái niệm và chỉ ra cách xây dựng Polymorphic asociations cơ bản nhất.

Ba phần là:
1. Giới thiệu và cách tạo ra một Polymorphic Associations cơ bản
2. [Quan hệ đa hình nghịch đảo(Reverse Polymorphic Associations)](https://viblo.asia/p/quan-he-da-hinh-trong-ruby-on-rails-part-2-da-hinh-nguoc-reverse-polymorphic-associations-maGK7Jqx5j2)
3. Quan hệ đa hình nhiều-nhiều (Many-to-Many Polymorphic Associations)

### I. Mối quan hệ(Asociations)
Điều đầu tiên, trước khi nói về các polymorphic asociations, điều quan trọng là bạn phải nắm khá chắc các loại kết hợp tiêu chuẩn trong Rails. Đây là:
* has_one
`has_one` thuộc quan hệ 1-1 trong database. quan hệ này thể hiện 1 object chỉ có 1 object con.
VD: 1 supplier sẽ chỉ có 1 account mà thôi.
```
class Supplier < ApplicationRecord
  has_one :account
end
```
Migration:
```
class CreateSuppliers < ActiveRecord::Migration[5.0]
  def change
    create_table :suppliers do |t|
      t.string :name
      t.timestamps
    end
 
    create_table :accounts do |t|
      t.belongs_to :supplier
      t.string :account_number
      t.timestamps
    end
  end
end
```
* belongs_to
`belongs_to` cũng thuộc quan hệ 1-1 trong database. Giả sử bạn có model `books`, mỗi quyển sách sẽ phải thuộc về 1 tác giả, và đây sẽ là mối quan hệ `books belongs_to author`
*Khai báo quan hệ ở model:*
```
class Book < ApplicationRecord
  belongs_to :author
end
```
Ở file migration:
```
class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :authors do |t|
      t.string :name
      t.timestamps
    end
 
    create_table :books do |t|
      t.belongs_to :author
      t.datetime :published_at
      t.timestamps
    end
  end
end
```
* has_one :through
Để hiểu loại quan hệ này ta đi vào ví dụ:
![](https://images.viblo.asia/d7f0e408-071e-4e58-8155-def99b993272.png)
Ở đây ta thấy với 1 acount sẽ chỉ có duy nhất 1 acount_history ưngs với nó; Vì thế `acount_history` sẽ belongs_to `Account`, và cùng với đó `Account` sẽ has_one `acount_history`.
Như ở trên ta đã có quan hệ has_one:belongs_to của `Supplier`:`Account`, vậy nên ta đều có thể thiết lập quan hệ `has_one:through ` giữa `Supplier` và `acount_history` thông qua model `Account` và không cần bất kì khóa ngaọi nào ở đây.
* has_many
Quan hệ has_many là loại kết nối 1-n giữa các bảng dữ liệu. Rất đơn giản để hiểu nó như phân tích sau: 1 cuốn sách thuộc 1 tác giả, và tác giả đó cũng sáng tác rất nhiều cuốn sách khác.
Và đây chính quan hệ `author` has_many `books`
![](https://images.viblo.asia/0990fb53-45d1-40e7-af64-20e15807f9f1.png)
Trong file migrate của books ta cần có khai báo khóa ngoại như sau:

```
      t.references :author, null: false, foreign_key: true
```

* has_many :through
![](https://images.viblo.asia/9a33cfdf-20f2-41ad-9c41-8faf93453cd1.png)
`Patient` (bệnh nhân)mỗi lần khám khác nhau đều phải có physicians(bác sĩ ) tuơng ứng chứ nhỉ? Và nguợc lại cũng thế, 1 các physicians luôn khám cho rất nhiều Patient. Quan hệ giữa 2 object này chỉ có thể là nhiều-nhiều(kết nối n-n).
Và đây ta có thể dùng 1 bảng `Appointment` để làm trung gian giữa quan hệ n-n trên. Từ đó sẽ sinh ra quan hệ `physicians` `has_many :patients, through: :appointments`  và ngược lại.
Câu truy vấn thể hiện quan hệ của chúng là:
```
@patient.physicians # return các physicians của @patient
@physician.patients # return các patients của @physician
```
* [has_and_belongs_to_many](https://guides.rubyonrails.org/association_basics.html#the-has-and-belongs-to-many-association)

### II. Polymorphic Associations là gì?
Như phần I. chúng ta đã biết sơ qua ccas quan hệ giữa các bản ghi 1 cách cơ bản. giờ chúng ta sẽ hiểu polymorphic là gì và dùng nó thế nào nhé.
## Vấn đề:
Trong một liên kết đa hình, một bản ghi của một loại có thể thuộc về bản ghi của một trong nhiều loại khác. Ví dụ: giả sử chúng ta có một blog tin tức. Tất nhiên mỗi bản ghi `post` có thể có nhiều bản ghi `comments`, nhưng cũng có thể bản ghi `images` và `pages` có thể có nhiều bản ghi `comments`. Vì vậy, mỗi bản ghi `comments` có thể thuộc về một bản ghi `post`, `images` hoặc `pages`.
![](https://images.viblo.asia/fba5ba15-e627-43f2-a0af-f61b77b3858d.png)
## Sử dụng đa hình
Đầu tiên, chúng ta sẽ tạo ba mô hình cha. (Tôi sử dụng thuật ngữ "cha" để chỉ một model "has" một model khác. Và "con" có nghĩa là một model "belongs_to" một model khác.)
Migration:
```
rails g model Post title:string body:text
rails g model Photo caption:string url:string
rails g model Page title:string body:text
```
Sau đó, chúng ta sẽ tạo model con, model sẽ tham chiếu (các) model cha:
`rails g model Comment comment:string references:commentable{polymorphic}`
Hãy thêm các liên kết has_many vào ba model "cha":
```
class Post < ApplicationRecord
  has_many :comments, as: :commentable
end

class Photo < ApplicationRecord
  has_many :comments, as: :commentable
end

class Page < ApplicationRecord
  has_many :comments, as: :commentable
end
```
Trình tạo sẽ thêm liên kết thuộc tính(polymorphic) vào model `Comment`
```
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end
```
Rất đơn giản, từ việc nhận thấy 3 model `Post`, `Photo`, `Page` đều có thể có comment vủa chúng, vậy nên model comment, chúng ta đã thêm 1 đa hình; Điều đó sẽ tạo các bảng trung gian vô hình giữa `Post` và `comment`, `photo` và `comment`, và `page` và `comment` mà ko cần tạo thêm bất kì bảng trung gian nào khác.
Từ đó, việc truy vấn cũng rât đơn giản: 
```
@post.comments #lấy tất cả comments của bài post
@photo.comments #lấy tất cả comments của photo 
@page.comments #lấy tất cả comments của page
```

## Một lưu ý về đặt tên polymorphic association
Không có cách nào đúng hay sai để đặt tên cho một polymorphic asociations. Tôi chọn tên `commentable` bởi vì nó có ý nghĩa. Post, Photo và Page đều là những đối tượng "commentable" - chúng có thể được bình luận. Việc đặt tên cho các polymorphic này kết thúc bằng "-able" hoặc "-ible" (nghĩa là: có thể tưởng tượng, có thể gắn thẻ, ăn được, có thể phá hủy) nhưng không bắt buộc.

Như bạn đã biết, một mô hình có liên kết thuộc tính có một khóa ngoại chỉ vào id của bất kỳ bản ghi nào thuộc về nó. Nhưng, làm thế nào để bản ghi `Comment` biết nó thuộc về mô hình nào? Nếu khóa ngoại là "12", điều đó có nghĩa là bản ghi có id 12 trong bảng Post, bảng Photo hoặc bảng Page?

Chà, nếu nhìn vào cơ sở dữ liệu và nhìn vào bảng `comments`, bạn sẽ thấy giống như thế này:

```
id               : int
comment          : varchar(255)
commentable_id   : int
commentable_type : varchar(255)
```
Mỗi bản ghi không chỉ có "id", mà còn cả "type", đó là tên của model. Vì vậy, nếu commentable_id là "12" và commentable_type là "Post", chúng ta sẽ biết tìm trong bảng post để tìm bản ghi với id là 12. Dễ dàng!

## Lời kết
Như vậy, đa hình đã giúp chúng ta đơn giản hóa việc tạo nhiều bảng trung gian giống nhau của các model.
Trên đây là 1 loại đa hình cơ bản nhất, ngoài ra còn 2 loại nữa là `reverse polymorphic association` và `many-to-many polymorphic association` mình sẽ trình bày trong các phần sau.
Hi vọng bài viết giúp bạn dẽ hiểu hơn về các quan hệ và đa hình trong Ruby on rails.

Tài liệu : 
https://guides.rubyonrails.org/association_basics.html#the-types-of-associations