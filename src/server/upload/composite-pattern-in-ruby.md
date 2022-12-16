# I. Problem
Trong quá trình làm việc chúng ta thường phải đối mặt với bài toán được là phải xây dựng một hệ thống gồm các objects liên kết, tương tác với nhau theo dạng tree hierarchy. Vậy chúng ta cần áp dụng nguyên lý hay cách thiết kế nào để giải quyết vấn đề trên một cách hiệu quả, hãy cùng tham khảo bài viết dưới đây nhé.

# II. Solution
Quả thực đối với vấn đề thường gặp thì cứ áp dụng những thứ ông cha đã dạy mà làm, các bạn cứ yên tâm vì đây là kinh nghiệm đúc kết truyền đời mà. Giải pháp mà mình muốn đề cập ở bài viết này đó là áp dụng nguyên lý **Composite Pattern**.

Với cách kiểu thiết kế  này ta chia làm 3 loại classes chính: **component**, **leaf**, **composite**. **Component** là những base class chúng nhằm mục đích định nghĩa các interface tổng quát cho tất cả các components khác. **Leaf** là những thành phần độc lập không thể phân chia ra được những component nhỏ hơn nữa. **Composite** là những loại compoments còn lại nghĩa là xếp ở vị trí higher-level, hiểu một cách đơn giản là nó đóng 2 vai trò: vừa là component và cũng là tập hợp của các component. 

# III. Example
Để minh họa cho bài toán trên mình xin giới thiệu về quy trình làm bánh và requirement là "**chúng ta mất bao lâu để nướng xong 1 chiếc bánh** :D". Có thể thấy để làm ra một một chiếc bánh thì đó hẳn là một quá trình phức tạp bao gồm nhiều công đoạn liên quan đến nhau. Để dễ dàng hình dung hãy xem các quy trình được biểu diễn dưới dạng cây như sau: 

```
|__ Manufacture Cake
    |__ Make Cake
    |   |__ Make Batter
    |   |   |__ Add Dry Ingredients
    |   |   |__ Add Liquids
    |   |   |__ Mix
    |   |__ Fill Pan
    |   |__ Bake
    |   |__ Frost
    |
    |__ Package Cake
        |__ Box
        |__ Label
```

Cùng bắt tay thiết kế chương trình với món võ Composite pattern nhé ;). Dựa trên tinh thần thượng võ chúng ta sẽ trừu tượng, xây dựng các process trên bằng các classes riêng biệt cùng với đó là một common interface nhằm trả lời cho câu hỏi "Chiếc bánh của anh xong chưa em ơi :rage:". Rồi từ từ anh đợi chút để em làm cái common base class, common base class này sẽ đóng vai trò là component. 

```
class Task
  attr_accessor :name, :parent

  def initialize(name)
    @name = name
    @parent = nil
  end

  def get_time_required
    0.0
  end
end
```

Bây giờ chúng ta có thể tạo các `leaf` classes bằng cách làm con cha cháu ông (kế thừa nhé, mình làm màu tí :v:) của `component` class rồi.   

```
class AddDryIngredientsTask < Task
  def initialize
    super('Add dry ingredients')
  end

  def get_time_required
    1.0
  end
end
```

Cái chúng ta cần bây giờ là một container nhằm kết hợp các công đoạn phức tạp lại với nhau, ô kê nói chung là giờ thiết kế cái gọi là `composite` class

```
class CompositeTask < Task
  def initialize(name)
    super(name)
    @sub_tasks = []
  end

  def add_sub_task(task)
    @sub_tasks << task
    task.parent = self
  end

  def remove_sub_task(task)
    @sub_tasks.delete(task)
    task.parent = nil
  end

  def get_time_required
    @sub_tasks.inject(0.0) {|time, task| time += task.get_time_required}
  end
end
```

Rồi nhá các khâu làm bánh gần như đã xong, chúng ta hãy cộng thời gian lại xem tổng thời gian có quá lâu để bị cháy không nào :grin:. Cái này nghiêm túc nhé, do các tasks trong hệ thống đều được implement `Task` interface nên ta có thể xây dựng những task phức tạp bằng cách bổ sung các task đơn giản hơn, xem ví dụ về class `MakeBatterTask` để hiểu rõ hơn ý tưởng trên nhé: 

```
class MakeBatterTask < CompositeTask
  def initialize
    super('Make batter')
    add_sub_task(AddDryIngredientsTask.new)
    add_sub_task(AddLiquidsTask.new)
    add_sub_task(MixTask.new)
  end
end
```

Quay về bài toán ban đầu đó là chúng ta đã giải quyết được vấn đề cây phân cấp (tree hierarchy), các objects có thể go deep (chả biết viết thế nào nữa :stuck_out_tongue_closed_eyes:) đến bất cứ process nào. Có thể thấy `MakeBatterTask` chỉ chứa các leaf objects nhưng chúng ta cũng có thể tạo các class để chưa các composite objects như sau: 

```
class MakeCakeTask < CompositeTask
  def initialize
    super('Make cake')
    add_sub_task(MakeBatterTask.new)
    add_sub_task(FillPanTask.new)
    add_sub_task(BakeTask.new)
    add_sub_task(FrostTask.new)
    add_sub_task(LickSpoonTask.new)
  end
end
```

Như vậy là mình đã giới thiệu cho các bạn về Composite Pattern, bản chất chính là cho phép tương tác với các đối tượng tương tự nhau giống như đối tượng đơn hoặc collections. Suýt nữa quên mất, bánh của mọi người nướng xong rồi nhé, chỉ bằng 5 phút đọc bài viết này thôi. Chúc mọi người ngon miệng :hamburger::hamburger::hamburger:! 

# IV. Tham khảo
* https://github.com/khactoan/design-patterns-in-ruby/blob/master/composite.md