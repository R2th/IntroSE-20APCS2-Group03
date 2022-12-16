Trong bài viết này mình sẽ giới thiệu các khái niệm cơ bản trong lập trình, trong ngôn ngữ Ruby và trong Ruby on Rails mà không phải ai cũng biết.

# 1. ORM
![](https://images.viblo.asia/f92dc3b0-5a7c-4052-8e17-3accbde3d31e.jpg)

ORM là viết tắt của cụm từ Object Relational Mapping, là một kĩ năng trong lập trình giúp chuyển đổi dữ liệu giữa các hệ thống không tương thích trong lập trình hướng đối tượng. Nó tạo ra một Cơ sở dữ liệu object ảo, có thể sử dụng được bên trong ngôn ngữ lập trình. 

Nói cách khác, một ORM framework là một layer nằm ở giữa ngôn ngữ lập trình và database, được viết bằng một ngôn ngữ lập trình hướng đối tượng (như là Ruby, Python, PHP ...) giúp bạn có thể sử dụng chính ngôn ngữ lập trình đó để thao tác với database mà không cần viết các câu lệnh SQL dài dòng. Các object class sẽ tương ứng với các bảng dữ liệu trong database, và các object instance sẽ tương ứng với các record trong các bảng dữ liệu đó

Trong Ruby on Rails, Active Record chính là module đóng vai trò của một ORM, có nhiệm vụ xử lý các thao tác liên quan tới database. Active Record lấy những data được lưu trữ trong các bảng của database sử dụng các row và column. Việc truy xuất hoặc sửa đổi các data này vốn được thực hiện bởi các câu lệnh SQL (nếu bạn sử dụng SQL database), nay đã được đơn giản hoá thành việc thao tác với các Ruby object thông thường.
# 2. STI
STI là viết tắt của cụm từ Single Table Inheritance, là ý tưởng sử dụng một bảng duy nhất để phản ánh cho nhiều model được kế thừa từ một model cha. Nó là một thành phần của `ActiveRecord::Base`. Trong cơ sở dữ liệu, model con dược xác định bởi trường `type`. Trong Rails bạn chỉ việc thêm trường `type` vào bảng và hệ thống sẽ hiểu bạn đang thiết lập STI. 

Ví dụ bạn có model Admin. Các admin có thể chia làm hai loại: Master hoặc Manager. Chúng có chung các thuộc tính nhưng hành vi của chúng khác nhau. Việc tạo hai bảng Master và Manager là không cần thiết. Thay vào đó bạn chỉ cần sử dụng một bảng Admin để lưu dữ liệu của cả Master và Manager và chúng được phân biệt nhau bởi trường `type`.

![](https://images.viblo.asia/e48cf470-b090-42d2-b1f1-05dd7d66f441.png)


STI sử dụng khi các model có các trường và các function giống nhau. Thay vì bạn viết một chức năng nhiều lần cho nhiều modle khác nhau hoặc linh hoạt trong việc thêm các chức năng riêng biết cho từng model khác nhau, STI cho phép bạn lưu trữ dữ liệu của các model đó trong một bảng duy nhất trong khi vẫn có thể viết các chức năng riêng cho từng model. STI cung cấp đầy đủ các model method trong Rails như create, new, update_attributes … cho cả class cha và các class con được lưu trên một bảng duy nhất.

# 3. GC
GC  là viết tắt của từ Garbage Collection, một module cung cấp interface cho cơ chế thu dọn rác của Ruby. Trong đó có phương thức quan trọng và được dùng phổ biến nhất là GC.stat

GC.stat hiển thị các thông số của GC, nếu chạy GC.stat trong irb, ta sẽ có kết quả:

```
{ 
 :count=>9, 
 :heap_allocated_pages=>132, 
 :heap_sorted_length=>133, 
 :heap_allocatable_pages=>0, 
 :heap_available_slots=>53798, 
 :heap_live_slots=>53585, 
 :heap_free_slots=>213, 
 :heap_final_slots=>0, 
 :heap_marked_slots=>23105, 
 :heap_swept_slots=>13998, 
 :heap_eden_pages=>132, 
 :heap_tomb_pages=>0, 
 :total_allocated_pages=>132, 
 :total_freed_pages=>0, 
 :total_allocated_objects=>164009, 
 :total_freed_objects=>110424, 
 :malloc_increase_bytes=>389720, 
 :malloc_increase_bytes_limit=>16777216, 
 :minor_gc_count=>6, 
 :major_gc_count=>3, 
 :remembered_wb_unprotected_objects=>210, 
 :remembered_wb_unprotected_objects_limit=>394, 
 :old_objects=>20937, 
 :old_objects_limit=>37436, 
 :oldmalloc_increase_bytes=>390184, 
 :oldmalloc_increase_bytes_limit=>16777216
}
```

Có một số lượng khá lớn các thông tin ở đây, tuy nhiên, thực tế chỉ có 2 thông tin mà chúng ta nên tập trung vào, đó là `:total_allocated_objects` và `:total_freed_objects`. Đó là hiển thị tất cả các object được khởi tạo và hiển thị tổng số object đang không sử dụng.

![](https://images.viblo.asia/e87d856c-9723-4449-b836-6368ec72bef7.jpg)


Các bạn có thể tìm hiểu cụ thể hơn trong bài viết này: 
https://viblo.asia/p/tim-hieu-ve-garbage-collection-trong-ruby-thong-qua-gcstat-L4x5xgJqlBM

# 4. Benchmark
Benchmark là một module cần thiết khi chúng ta muốn kiểm chứng performance của một function hay một method nào đó. Nó có thể đo được thời gian chạy của bất cứ đoạn code nào.
Chúng ta chỉ cần require thư viện trước khi dùng:

```
> require 'benchmark'
 => true
 ```
 
Để đo thời gian của một mã code đơn giản ta sử dụng phương thức `measure`

```
require "benchmark"
i=0
puts Benchmark.measure { 10000.times { i+=1 } }
```

Kết quả như sau:

```
0.000349   0.000029   0.000378 (  0.000374)
```

![](https://images.viblo.asia/0050bc43-c96d-487f-878f-0b45c0d6d4ea.png)

Trong đó:
- user CPU time là lượng thời gian CPU dành cho tiến trình chạy các tác vụ của riêng nó (chạy ngoài kernel của hệ điều hành).
- system CPU time là lượng thời gian CPU dùng để khai thác tài nguyên, chạy trong kernel của hệ điều hành.
- Thời gian chạy thực tế là thông số quan trọng nhất, cho chúng ta biết thời gian chính xác để thực thi đoạn code.

Tuy nhiên, phương thức measure không được sử dụng nhiều. Lý do là vì nó chỉ in ra được thời gian thực thi của một đoạn code mà thôi.
Benchmark được sử dụng chủ yếu là để so sánh thời gian thực thi của các đoạn code giải quyết cùng một bài toán. Và benchmark có một số phương thức để làm việc này là `Benchmark#bm`.

Phương thức này cho phép chúng ta đo thời gian chạy của vài đoạn code và in kết quả ra màn hình theo thứ tự. Ví dụ:

```
require "benchmark"

loop_times = 100_000

Benchmark.bm do |bm|
  # first_block
  bm.report do
    i = 0
    loop_times.times do
      i+=1
    end
  end
  
  # second_block
  bm.report do
    i=0
    loop_times.times do
      i=i+1
    end
  end
end
```

Kết quả như sau:

```
        user     system      total        real
   0.003552   0.000000   0.003552 (  0.003549)
   0.003662   0.000000   0.003662 (  0.003664)
```

# 5. Design Pattern
Design patterns là các giải pháp đã được tối ưu hóa, được tái sử dụng cho các vấn đề lập trình mà chúng ta gặp phải hàng ngày. Nó là một khuôn mẫu đã được thực hiện và kiểm chứng. 

Có rất nhiều các Design Pattern khác nhau:
- Template Method
- Strategy
- Observer
- Composite
- Iterator
- Commands
- Adapter
- Proxy
- Decorator
- Singleton
- Factory
- Abstract Factory
- Builder
- Interpreter