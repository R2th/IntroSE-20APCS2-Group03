Một trong những thắc mắc về association có thể khiến bạn khó hình dung khi sử dụng là `has_one` và `belongs_to`. Cả 2 association này đều biểu thị ý nghĩ một, và nếu chúng ta suy nghĩ về nó dưới dạng model thì quả thật nó có rất nhiều ý nghĩa.

Ví dụ đơn giản như sau: 
Chúng ta có 2 model là `Dog` và `Owner`. Chúng ta có thể nghĩ ngay được rằng: `Owner has_one Dog` và `Dog belongs_to Owner`. Trong trường hợp này, cả 2 đối tượng này đều đã quá quen thuộc với chúng ta vì nó xảy ra hằng ngày và dễ dàng tìm thấy. Khi các đối tượng trìu tượng hơn như `Foo` và `Bar` thì đó lại là một chuyện hoàn toàn khác.

Chúng ta hãy cùng suy nghĩ về điều đó trong bài viết này.

Phần khó khăn nhất của việc xác định association có lẽ là việc tìm ra bảng nào có chứa khóa ngoại là chứa id của bảng còn lại mà nó có quan hệ. Khóa ngoại là key word trong việc tìm ra đâu là has_one, đâu là belongs_to trên ngữ nghĩa trong một mối quan hệ 1-1. Câu hỏi là: KHóa ngoại được đặt trên model thuộc về hay ở model sở hữu.

Quay trở lại với ví dụ về `Owner` và `Dog`. Trong trường hợp này, `Owner has_one Dog`. Trong thực tế, hầu hết những chú chó cần đeo vòng cổ chứa những thông tin trong trường hợp bị lạc như: Tên, địa chỉ liên lạc của chủ sở hữu. Chính vì vậy con chó có id của chủ sở hữu trong model, hay trong cơ sở dữ liệu bảng `dogs` sẽ chứa id chủ của chúng, đó chính là khóa ngoại. Khi `Dog belongs_to Owner`, khóa ngoại nằm trong model `Dog` vì thế trong khi khai báo model, chúng ta trong model `Dog` cần sử dụng `belongs_to :owner` và `Owner` cần sử dụng `has_one :dog`. Ví dụ này làm cho chúng ta dễ dàng để nhớ đề foreign_key của quan hệ thuộc về, nhưng chúng ta vẫn chưa biết làm thế nào để xác định đối tượng thuộc về người khcs trong một trường hợp trìu tượng hơn.


Trở lại với vị dụ `Foo` và `Bar` đã đề cập phía trước. Giá sử `Foo has_one Bar`. Vậy thì chúng ta cần triển khai trong Rails như sau:
```
# app/models/foo.rb
class Foo < ActiveRecord::Base
  has_one :bar
end

# app/models/bar.rb
class Bar < ActiveRecord::Base
  belongs_to :foo
end
```

Nếu chúng ta muốn tìm một `Bar` trong một `Foo`, chúng ta cần truy vấn với ActiveRecord như sau:
```
foo = Foo.first
foo.bar
```

SQL sinh ra sẽ như sau:
```
SELECT *
FROM Bar
WHERE foo_id = foo.id
```

Đổi lại, muốn lấy một Foo cho một Bar nhất định, chúng ra sẽ thực hiện như sau với ActiveRecord:

```
bar = Bar.first
bar.foo
```

Câu truy vấn này sinh ra query:
```
SELECT *
FROM Foo
WHERE id = bar.foo_id
```

Công việc giống nhau và truy vấn giống nhau, nhưng khi triển khai chúng ta có thể tháy được: "Khóa ngoại là khóa của bảng sở hữu cần đặt trong bảng thuộc về". Thực sự qua bài viết này, mình mong mọi người có thể phân biệt và có hướng sử dụng tốt hơn với `has_one` và `belongs_to` nhé.