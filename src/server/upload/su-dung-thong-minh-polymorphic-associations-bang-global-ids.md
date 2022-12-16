Đối với những nguời mới làm quen hay lần đầu sử dụng Polymorphic Asociations cho các ứng dụng thì đều khá là khó khăn để hiểu được chúng. Vậy nên hôm nay mình muốn giới thiệu bài viết với nhìn hiệu quả hơn để hỗ trợ các coder dễ dàng chinh phục Polymorphic một cách nhanh chóng và thông minh.
*Global Id trước đây là một tính năng của Rails với sự trợ giúp của Gem nhưng kể từ Rails 4.2, nó chính thức được đưa vào Rails. *

## Global Id là gì?
Global Id là một thư viện chứa Mã định danh tài nguyên đồng nhất - Uniform Resource Identifiers (URIs) cho bất kỳ đối tượng Activerecord nào. Chúng trông như thế này:
`gid://name-of-app/Person/1`

Vì vậy, global Id cho phép tất cả các thông tin này được thể hiện trong một chuỗi rất nhanh. Với một vài phương thức trong Model, chúng ta có thể sử dụng phương thức này để tạo ra một liên kết đa hình.

## Tuyệt, vậy làm thế nào để thực hiện?
Hãy giả sử rằng chúng ta thiết lập một hiệp hội để cho biết liệu một Stockholder là Person hoặc  Company.

### Đầu tiên, tạo model Stockholder
   Chúng ta sẽ cần hai columns: `entity_id` và `entity_type`. Giống như trong polymorphic assocaitions tiêu chuẩn, `entity_type` lưu tên Model, `entity_id` lưu trữ id trong model đó. Chúng ta migration model đó như sau:

```
class CreateStocholders < ActiveRecord::Migration
    def change
        create_table :optionees do |t|
            t.date :grant_date
            t.integer :shares_outstanding
            t.belongs_to :option, index: true, foreign_key: true
            t.references :entity, polymorphic: true, index: true
            t.timestamps null: false
         end
     end
end
```

### Tiếp theo, thiết lập các model, chỉ ra các mối quan hệ đa hình

**Company Model:**
```
class Company < ActiveRecord::Base
    has_many :stockholders, as: :entity
end
```

**Person Model:**
```
class Person < ActiveRecord::Base
    has_many :stockholders, as: :entity
end
```

**Stockholder Model:**
```
class Stocholder < ActiveRecord::Base
    belongs_to :entity, polymorphic:true
end
```

Trong trường hợp trên, `:entity` chỉ là trường bắt tất cả đại diện `people` và `companies`. Tất nhiên, bạn có thể gọi bất cứ điều gì bạn muốn.

### Bây giờ có thể thiết lập Form cho Stockholder

Ở đây sử dụng `simple_form` nhưng nguyên tắc là giống nhau cho các phương thức khác; điều chỉnh cú pháp của bạn cho phù hợp, giống như thế này:

```
    <%= f.grouped_collection_select :entity_id, [Company, Person], :all, :model_name, :to_global_id, :email %>
    <%= f.input :issue_date, label: false %>
    <%= f.input :shares_issued, label: false %>
```

Vì vậy, rõ ràng, phần thú vị ở đây là phần `grouped_collection_select` sẽ hiển thị một menu chọn với cả company và people.

***Phân tích:***

* Đây là một collection được nhóm cho một client
* Thực hiện trên các models company và person
* Nó sẽ sử dụng tất cả các bản ghi trong mỗi model và nhóm chúng theo model_name của chúng .
* Nó sẽ sử dụng global_id để lấy các giá trị và hiển thị email của từng người trong menu

Ý  tưởng như trên ta sẽ có 1 select options (lưu ý tôi đã sử dụng Org thay vì Company, nhưng bạn có thể tưởng tượng dễ hơn).

![](https://images.viblo.asia/a3da4e57-3d5a-4f1a-aa5e-a0391e697943.png)

Nhưng bạn có thể hỏi đúng không : Tại sao bạn lại sử dụng địa chỉ email chứ không phải tên? Thứ điều khó khăn về các loại liên kết này là mọi người có cả tên và họ mà các công ty chỉ có tên . Để có được tên để hiển thị trong tình huống như vậy, bạn sẽ cần sử dụng lambda, cái mà tôi sẽ đi qua ở cuối bài.

### Làm cho global id hoạt động với Polymorphic Associations

Như bạn đã theo dõi mặc dù bạn sẽ thấy rằng ta đã tạo ra hai vấn đề chính để tích hợp global id với các liên kết đa hình:

1. Chúng ta cần `:entity_type` và `:entity_id`
2. `:entity_id` cần phải là một số nguyên, không phải là một chuỗi như là một global id.

*Vì vậy, để viết lại tình huống, chúng ta cần chia global id thành hai phần:*

    1. Tên model của nó (một chuỗi)
    2. Id của nó cho model đó (một số nguyên)
    
May mắn thay, chúng ta không cần phải làm điều này bằng tay, các liên kết đa hình sẽ tự động lưu trữ tên và id của model nếu nó biết đối tượng nào cần tham chiếu. Do đó, chúng tôi chỉ định các phương thức `getter/setter` để chỉ định đối tượng, sử dụng global id.

**Vì vậy, chỉnh sửa model Stockholder một lần nữa:**

```
class Stocholder < ActiveRecord::Base
    belongs_to :entity, polymorphic:true

    def global_entity
        self.entity.to_global_id if self.entity.present?
    end

    def global_entity=(entity)
        self.entity=GlobalID::Locator.locate entity
    end
end
```

**Sau đó thay đổi `grouped_collection_select` thành:**

```
<%= f.grouped_collection_select :global_entity, [Company, Person], :all, :model_name, :to_global_id, :email %>
<%= f.input :issue_date, label: false %>
<%= f.input :shares_issued, label: false %>
```


Sau đó, chỉ cần chắc chắn để thêm `:global_entity` vào strong params của bạn là xong!

## Sử dụng Lamda cho Names

Ok, thông thường khi thực hiện các liên kết đa hình, người ta sẽ sử dụng các mẩu thông tin khác nhau làm khóa cho hai model khác nhau (rốt cuộc, chúng không phải lúc nào cũng có các columns giống nhau, phải không?) Trong trường hợp như vậy, nên sử dụng lambda , làm cho lựa chọn của chúng ta sẽ như thế này:

```
   <%= f.grouped_collection_select :entity_id, [Company, Person], :all, :model_name, :to_global_id, 
                   lambda {|company_or_person_object| company_or_person_object.instance_of? Company? 
                   rescue company_or_person_object.fname + " " + company_or_person_object.lname rescue company_or_person_object.name},
                   label:"Stockholder", class: "names"%>
```

Như một lời giải thích về lambdas hơi vượt quá phạm vi của hướng dẫn này, tôi sẽ chỉ để lại cho bạn ví dụ trên. Có rất nhiều tài liệu có sẵn về vấn đề này vì vậy nếu lambda khó hiểu, chỉ cần google nó lên.

Hi, vậy là khá ổn rồi, còn lại là thực hành với các spec khác nhau thôi nhỉ?
Hi vọng bài dịch của mình có ích cho các bạn :)

Dịch từ: [POLYMORPHIC ASSOCIATIONS THE SMART WAY: USING GLOBAL IDS](https://neanderslob.com/2015/11/03/polymorphic-associations-the-smart-way-using-global-ids/)