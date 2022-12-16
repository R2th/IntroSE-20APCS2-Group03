*Trong phần này, chúng sẽ cùng khám phá Composite parttern - pattern này hướng ta xây dựng object lớn từ những sub-object, và từng sub-object có thể được xây dựng từ những sub-sub-object khác*
Xây dựng một phần mềm là quá trình kết hợp các object đơn giản như integer và string thành các object phức tạp hơn như 'người dùng' hay 'danh sách bài hát', và sau đó có thể sử dụng các object đó để xây dựng thành các object phức tạp hơn.

Chúng ta sẽ cùng phân tích một ví dụ cụ thể. Bạn được yêu cầu xây dựng một hệ thống để theo dõi quy trình làm bánh socola ChocoBite. Key requirement ở đây là hệ thống của bạn phải có khả năng theo dõi thời gian cần thiết để tạo ra một cái bánh. Tất nhiên, làm bánh là một quy trình khá phức tạp. Về cơ bản sẽ có các task như sau: chuẩn bị bột, cho vào lò, làm nguội, đóng gói để xuất xưởng. Nhưng với mỗi task như chuẩn bị bột, lại có một quy trình phức tạo ở trong nó, bao gồm các task cân đo đong đếm gia vị, đập trứng, khuấy, ... Và tất nhiên, bạn không muốn chia quy trình làm bánh thành vô hạn các subtask (kiểu như "Sử dụng thìa để xúc 1.234.433 hạt bột ngọt vào tô ..."). Thay vào đó, bạn cần phải xác định rõ các ta task có level thấp nhất, task căn bản nhất và dừng tại đó. Có vẻ hợp lí nếu dừng ở cấp 'thêm gia vị' và 'đặt vào lò'

Ta sẽ có sơ đồ quy trình làm bánh như sau:
![image.png](https://images.viblo.asia/e6146b44-e51e-41f6-b14f-d784c0a94fe9.png)

Hãy model hóa các task trên thành các class riêng biệt. Và rõ ràng, tất cả các class đó phải chia sẻ một interface chung - interface giúp các task báo cáo thời gian mỗi task cần. Ta sẽ sử dụng một base class Task
```
class Task
    attr_reader :name
    def initialize(name)
        @name = name
    end
    def get_time_required
        0.0
    end
end
```
Trước khi bắt đầu implement các task chúng ta hãy cùng xem qua sơ đồ Component pattern như sau:
![image.png](https://images.viblo.asia/600590dc-bca6-4958-bc9d-ae57bc31f5b9.png)
Để giải thích sơ đồ, chúng ta cùng quay lại ví dụ về các task làm bánh, mỗi task chính là mỗi component, mỗi task sẽ được xây dựng từ nhiều sub-task khác. Và các subtask này có 2 trường hợp, nếu nó không được tạo từ sub-sub-task thì nó là cấp cuối cùng và được gọi là Leaf, nếu nó được xây dựng từ nhiều sub-sub-task thì sẽ được gọi là Composite. Composite hay leaf cũng là một component

Đầu tiên tạo các subtaskes ở level thấp nhất như sau: 
```
 class AddDryIngredientsTask < Task
    def initialize
        super('Add dry ingredients')
    end
    def get_time_required
        1.0 # 1 minute to add flour and sugar
    end
end

class AddLiquidsTask < Task
    def initialize
        super('Add liquids!')
    end
    def get_time_required
        1.0 # Mix for 1 minutes
    end
end

class MixTask < Task
    def initialize
        super('Mix that batter up!')
    end
    def get_time_required
        3.0 # Mix for 3 minutes
    end
end
 ```
 Theo như sơ đồ thì task Make Batter sẽ bao gồm 3 bước 'add dry ingredients', 'add liquids', 'mix'. Ta có thể xây dựng class MakeBatterTask như sau:
 ```
 class MakeBatterTask < Task
    def initialize
        super('Make batter')
        @sub_tasks = []
        add_sub_task( AddDryIngredientsTask.new )
        add_sub_task( AddLiquidsTask.new )
        add_sub_task( MixTask.new )
    end
    def add_sub_task(task)
        @sub_tasks << task
    end
    def remove_sub_task(task)
        @sub_tasks.delete(task)
    end
    def get_time_required
        time=0.0
        @sub_tasks.each {|task| time += task.get_time_required}
        time
    end
end
 ```
 Bởi vì chúng ta sẽ có một số lượng khá lớn các composite task. Nên sẽ có lí hơn nếu tách các method để quản lí sub-stask ra một class base khác:
 ```
 class CompositeTask < Task
    def initialize(name)
        super(name)
        @sub_tasks = []
    end
    def add_sub_task(task)
        @sub_tasks << task
    end
    def remove_sub_task(task)
        @sub_tasks.delete(task)
    end
    def get_time_required
        time=0.0
        @sub_tasks.each {|task| time += task.get_time_required}
        time
    end
end
 ```
 Chúng ta có thể cắt bớt class MakeBatterTask như sau:
 ```
 class MakeBatterTask < CompositeTask
    def initialize
        super('Make batter')
        add_sub_task( AddDryIngredientsTask.new )
        add_sub_task( AddLiquidsTask.new )
        add_sub_task( MixTask.new )
    end
end
 ```
 Khi chúng ta xây dựng xong tất cả các class trong dự án làm bánh, chúng ta sẽ có một task ở level cao nhất:
 ```
 class MakeCakeTask < CompositeTask
    def initialize
        super('Make cake')
        add_sub_task( MakeBatterTask.new )
        add_sub_task( FillPanTask.new )
        add_sub_task( BakeTask.new )
        add_sub_task( FrostTask.new )
        add_sub_task( LickSpoonTask.new )
    end
end
 ```
 Và thời gian để làm một các bánh sẽ là ```MakeCakeTask.new.get_time_required```
 
 **TỔNG KẾT**
 
 Một khi bạn nắm được bản chất đệ quy của nó, Composite pattern thật sự khá đơn giảm. Đôi khi ta cần build các object từ những sub-object. Một object thiết kế với composite pattern nếu nó chia sẻ các tính chất với các sub-object. Mỗi tính chất ở object lớn sẽ được tìm thấy ở từng sub-object. Composite pattern giúp ta xây dựng 'arbitrarily deep trees of objects'.