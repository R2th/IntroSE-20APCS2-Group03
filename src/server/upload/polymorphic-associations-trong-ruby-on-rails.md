Xin chào các bạn,
Hôm nay mình xin giới thiệu tới các bạn một giải pháp khá hay để xây dựng các quan hệ model trong lập trình Ruby on Rails.

# Ví dụ

Giả sử ta đang có một bài toán về quan hệ bảng như sau: Table `Product` có nhiều `Member`. Và một `Group` cũng có nhiều `Member`.

Cách thường làm mà tôi nghĩ đa số trong chúng ta sẽ là thiết lập quan hệ `belongs_to/has_many` cho các cặp table `Product has_many Member` và `Group has_many Member`.

Sau đấy thì `Member` và sẽ phải sinh ra 2 foreign key lần lượt cho `Product` và `Group`.


Ta có thể thấy nếu áp dụng cách giải quyết trên, 2 foreign key vào `Member`=> okay.

Và nếu trong một ứng dụng có rất nhiều quan hệ như vậy với `Member`. Ví dụ `Team, Country...` thì số lượng khoá phụ phải sinh ra cũng kha khá. Điều này ảnh hưởng đến "tâm lý và niềm đam mê lập trình" của các lập trình viên một cách tiêu cực :D

Có cách nào để thiết lập quan hệ trong Ruby on Rails mà không phải sinh ra quá nhiều khoá phụ như này không?



Và phải pháp cho vấn đề này chính là `Polymorphic Associations`

# Khái niệm về Polymorphic Associations trong Ruby on Rails


Về cơ bản, ta có thể hiểu như sau: Active Record Associations là một trong những tính năng quan trọng nhất của Rails. Polymorphic association là một phần của các associations này. 

Chúng sinh ra để giải quyết các vấn đề về quan hệ N-N trong Rails với một tuyên bố: "với các polymorphic associations, một model có thể thuộc về nhiều hơn một model khác, trên một association duy nhất."


Quay lại ví dụ ban đầu. Chúng ta hãy cùng xem khi sử dụng Polymorphic Associations, mọi thứ sẽ như thế nào!

## Tạo model common association 

```
rails g model MemberAssistant name:string ta_duty_id:integer ta_duty_type:string
```

Trong đó ta có `ta_duty_id` là id của `Product` hoặc `Group` tương ứng và `ta_duty_type` sẽ cho ta biết `model` nào đang liên hết với `MemberAssistant`


`Migrate Data: rails db:migrate`

## Thiết lập model Assistant
```/app/models/member_assistant.rb```

```
class MemberAssistant < ActiveRecord::Base
  belongs_to :ta_duty, polymorphic: true
end
```



Bằng cách làm cho `MemberAssistant` thuộc về `ta_duty` thay vì bất kỳ `model` khác, chúng tôi đã khai báo `polymorphic association` bằng từ khoá `polymorphic: true` . Lưu ý rằng chúng ta không có bất kỳ `model /class` ta_duty nào trong ứng dụng, `ta_duty` chỉ quan tâm đến `polymorphic association`.

```/app/models/product.rb```

```
class Product < ActiveRecord::Base
  has_many :member_assistants, as: :ta_duty
end
```

Tương tự cho `Group`

Ta thấy rằng `Product` và `Group` có nhiều `MemberAssistant` thông qua `polymorphic association ta_duty`. Như vậy, ta có thể thấy model `MemberAssistant` được liên kết với hai model `Product` và `Group` thông qua chỉ thông qua 2 field là `ta_duty_id` và `ta_duty_type`.



Chúng ta sẽ dùng rails console để kiểm tra một chút nhé!

```
2.0.0-p247 :001 > ma = MemberAssistant.create(name: 'M name')
2.0.0-p247 :002 > p = Product.create(name: 'P name')
2.0.0-p247 :003 > ma.update_attribute(:ta_duty, p)
 => true
2.0.0-p247 :004 > Product.last.member_assistants.last.name
 => "M name"
```

Như vậy là quan hệ `Product has_many MemberAssistant` đã được hình thành.

Quan hệ này cũng là quan hệ của `Group, Team, Country` với Member.

Và điều tôi muốn nói ở đây chính là chúng ta chỉ cần 2 field ở trong table `MemberAssistant`.


# Kết luận

Túm lại, có 2 mục đích chính của việc sử dụng Polymorphic Associations là:

- Giảm số lượng foreign_key
- Với 1 bài toán nhiều vai trò, sẽ có 1 bảng trung gian. Nó giúp làm rõ vai trò của các bảng đến bảng trung gian.


Trên là một kỹ thuật theo mình là khá hay. Và mình đã chia sẽ đến các bạn, hy vọng các bạn sẽ áp dụng tốt.

Cảm ơn đã tham khảo!