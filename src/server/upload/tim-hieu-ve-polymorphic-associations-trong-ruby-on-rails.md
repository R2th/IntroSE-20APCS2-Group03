Polymorphic associations có thể khó hiểu và nhiều lần chúng ta có thể nhầm lẫn về việc khi nào nên sử dụng, cách sử dụng và nó khác với các association khác như thế nào. Trong bài viết này, chúng ta sẽ đề cập đến những vấn đề này.
# Giới thiệu
Active Record Associations là một trong những tính năng quan trọng nhất của Rails. Polymorphic association là một phần của các associations này. [Ruby on Rails guide](http://guides.rubyonrails.org/association_basics.html#polymorphic-associations) tuyên bố “với các polymorphic associations, một model có thể thuộc về nhiều hơn một model khác, trên một association duy nhất.

# Cơ bản
Trong khi viết một số ứng dụng rails, bạn sẽ gặp phải tình huống khi bạn có các model associations có vẻ giống nhau, ví dụ, giả sử bạn có các model `Course` (Khoá học) và `Lab` (Phòng thí nghiệm) trong ứng dụng của mình. Bây giờ mỗi `Course` và `Lab` cần `TeachingAssistants` (Trợ lí giảng dạy), vì vậy bạn cần liên kết `Course` và `Lab` với các `TeachingAssistants` tương ứng của chúng. Nếu bạn sử dụng liên kết has_many/belongs_to ở đây, bạn sẽ có hai model tương tự ví dụ như là `TeachingAssistantsCourse` và `TeachingAssisstantsLab` chẳng hạn. Thay vì có hai model khác nhau, bạn có thể có một model duy nhất, đó là `TeachingAssistant` và bạn có thể liên kết model này với các model `Course` và `Lab` bằng cách sử dụng polymorphic association

Hãy xem cách thực hiện nó. Đầu tiên chúng ta sẽ cần tạo model  TeachingAssistant.
```
rails g model TeachingAssistant name:string ta_duty_id:integer ta_duty_type:string
```
Ở đây `ta_duty_id` là một khóa ngoại và `ta_duty_type` sẽ cho biết  model nào sẽ liên kết với model `TeachingAssistant`
```
/db/migrate/********_create_teaching_assistants.rb
```

```ruby
class CreateTeachingAssistants < ActiveRecord::Migration
  def change
    create_table :teaching_assistants do |t|
      t.string :name
      t.integer :ta_duty_id
      t.string :ta_duty_type

      t.timestamps
    end
  end
end
```
Bây giờ model của chúng ta đã được tạo, hãy chạy migration` rails db:migrate`. Bây giờ, hãy thiết lập polymorphic association model `TeachingAssistant`

```ruby
class TeachingAssistant < ActiveRecord::Base
  belongs_to :ta_duty, polymorphic: true
end
```

Bằng cách làm cho `TeachingAssistant` thuộc về `ta_duty` thay vì bất kỳ model khác, chúng tôi đã khai báo polymorphic association bằng từ khoá `polymorphic: true` . Lưu ý rằng chúng ta không có bất kỳ model /class ta_duty nào trong ứng dụng, ta_duty chỉ quan tâm đến polymorphic association. Bây giờ hãy nhìn vào mặt khác.
> /app/models/course.rb
> 
```ruby
class Course < ActiveRecord::Base
  has_many :teaching_assistants, as: :ta_duty
end
```

> /app/models/lab.rb
> 
```ruby
class Lab < ActiveRecord::Base
  has_many :teaching_assistants, as: :ta_duty
end
```

Đoạn code ở trên nói rằng `Course` và `Lab` có nhiều `TeachingAssistant` thông qua polymorphic association `ta_duty`. Hãy xem diễn tả của polymorphic association mà chúng tôi đang thiết lập thông qua hình ảnh ở dưới. Chúng ta có thể thấy model `TeachingAssistant` được liên kết với hai model `Course` và `Lab` thông qua `ta_duty`.
![](https://images.viblo.asia/f89c4407-24a9-4654-a972-d377ead4d220.png)

Bây giờ hãy kiểm tra điều này trong` Rails console`. Nhập `rails c` và làm theo các lệnh.
```ruby
2.0.0-p247 :001 > ta = TeachingAssistant.create(name: 'ta_name')
2.0.0-p247 :002 > c = Course.create(name: 'course_name')
2.0.0-p247 :003 > ta.update_attribute(:ta_duty, c)
 => true
2.0.0-p247 :004 > Course.last.teaching_assistants.last.name
 => "ta_name"
```
Chúng tôi đã `Course`  và tạo liên kết giữa `Course`  và `TeachingAssistant`  thông qua polymorphic association ta_duty. Trong dòng sáu, chúng tôi đã thử nghiệm nếu association hoạt động.

# STI vs Polymorphic Association
Single Table Inheritance (STI) thường được so sánh với các polymorphic associations. Nó có thể thay thế tốt cho các polymorphic associations (tùy thuộc vào tình huống). Trong STI, bạn thừa hưởng các model tương tự từ model cơ sở kế thừa từ ActiveRecord::Base, ví dụ trong trường hợp này
```ruby
class TeachingAssistant < ActiveRecord::Base
class CourseTa < TeachingAssistant
class LabTa < TeachingAssistant
```
Từ hình dưới đây, bạn sẽ có được hình ảnh rõ ràng về `single table inheritance` khác với  polymorphic associations và xem STI trông như thế nào.
![](https://images.viblo.asia/fa8ddc88-5af0-4055-9090-5283c90cd4be.png)

Như chúng ta có thể thấy STI cung cấp cho bạn sự linh hoạt hơn so với polymorphic association nhưng chúng ta phải tạo các class riêng biệt để thực hiện các association. STI thêm nhiều code hơn và có thể khó thực hiện so với polymorphic association. Mặc dù bạn nên đưa ra quyết định cuối cùng tùy thuộc vào trường hợp sử dụng. Trong trường hợp của chúng ta, polymorphic association rõ ràng là một lựa chọn tốt hơn STI.
# Kết hợp has_many :through và polymorphic association
Có thể có những trường hợp đặc biệt mà bạn cần has_many :through  qua polymorphic association. Mặc dù không khó hiểu/thực hiện, lần đầu tiên mọi người có thể bị nhầm lẫn. Ví dụ `Professor` (Giáo sư) muốn biết những `Course`/`Lab` nào được giao cho `TeachingAssistant` của mình. Điều này có thể được thực hiện bằng cách làm như sau.
> /app/models/professor.rb
```ruby
class Professor < ActiveRecord::Base
  has_many :teaching_assistants
  has_many :course_tas, through: :teaching_assistants, source: :ta_duty, source_type: 'Course'
  has_many :lab_tas, through: :teaching_assistants, source: :ta_duty, source_type: 'Lab'
end
```
> /app/models/teaching_assistant.rb
> 
```ruby
class TeachingAssistant < ActiveRecord::Base
  belongs_to :professors
  belongs_to :ta_duty, polymorphic: true
end
```

Chúng ta đã kết hợp has_many :through và polymorphic association. Để kiểm tra, bạn có thể thực hiện các truy vấn như `Professor.first.course_tas`. Lưu ý rằng chúng ta đã thêm liên kết giữa `Professor` và  `TeachingAssistant`, vì vậy hãy đảm bảo bạn thực hiện các thay đổi tương ứng.

# Hạn chế
Khi thêm [Bi-directional Associations](http://guides.rubyonrails.org/association_basics.html#bi-directional-associations) trong ứng dụng rails, người ta sử dụng `inverse_of:` được cung cấp bởi Active Record.` inverse_of:` không hoạt động với polymorphic association.

# Kết luận
Mình đã trình bày những điều cơ bản và thực hiện polymorphic association trong Rails, so sánh nó với các associations khác và xem làm thế nào nó có thể được mở rộng với các associations khác. Một khi bạn hiểu cách sử dụng chính xác và phù hợp của polymorphic association, bạn có thể làm cho ứng dụng của mình hiệu quả hơn.

### Tham khảo: https://launchschool.com/blog/understanding-polymorphic-associations-in-rails