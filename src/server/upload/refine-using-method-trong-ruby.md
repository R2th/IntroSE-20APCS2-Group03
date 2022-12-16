# Refine-Using method trong ruby

Trong phần này mình muốn giới thiệu tới các bạn các kỹ thuật sau trong ruby

- Monkey-patch
- Refine vs Using 

## Kỹ thuật Monkey-patch

#####  Monkey-patch là gì?

Theo mình tìm hiểu thì kỹ thuật `monkey-patch` được bắt nguồn từ python và mục đích của kỹ thuật này là: định nghĩa, can thiệp vào một `method` của một `Class` nào đó để nhằm sửa đổi mà không ảnh hưởng gì nhiều tới tình trạng hoạt động của `method` trong `Class` đó.


##### Khi nào thì dùng tới kỹ thuật Monkey-patch?

Kỹ thuật này được bạn sử dụng tới khi bạn muốn thay thế một tính năng A bằng một tính năng B mà trong đó tính năng B có chức năng y hệt tính năng A và thêm một số tính năng bạn mong muốn. Thường kỹ thuật này được áp dụng  cho các project đang trong quá trính maintain mà không muốn gây ảnh hưởng tới chức năng đã có.

##### Ví dụ

ở đây mình có 1 VD: với class Hash của ruby
```
h = {}
h.to_s #(1)
=> "{}"

class Hash
  def to_s
    'hash'
  end
end

h.to_s #(2)
=> "hash"
```


Theo như đoạn code trên của mình thì bạn có thế thấy rằng với  `(1)` mình có kết quả là: `"{}"` tuy nhiên với `(2)` thì kết quả là `"hash"`  và đó chính là ảnh hưởng của kỹ thuật ghi đè monkey-patch.

##### Nhận xét
Tuy nhiên nhược điểm của kỹ thuật này trong ruby là rất lớn vì bạn đang động chạm vào một `method` nào đó mà nó lại ảnh hưởng tới toàn bộ hệ thống đã có. Nó sẽ làm cho bạn không thể quản lý được tất cả các trường hợp có thể gây ra lỗi hệ thống.

## Kỹ thuật refine-using trong ruby

Trong ruby có một kỹ thuật cũng được mình áp dụng giống như kỹ thuật `monkey-patch` và nó là `refine-using`.
Nó khắc phục được nhược điểm của `monkey-patch` là có thể cho bạn dùng ở một số class mà bạn định nghĩa thay vì toàn bộ project.

Với phần này mình sẽ đưa ra một Ví dụ trước để đưa lại cái nhìn tổng quan

##### Ví dụ
```
[1] pry(main)> module CustomHash  #(1)
[1] pry(main)*   refine Hash do
[1] pry(main)*     def to_s
[1] pry(main)*       "custome_hash"
[1] pry(main)*     end  
[1] pry(main)*   end  
[1] pry(main)* end  
=> #<refinement:Hash@CustomHash>
[2] pry(main)> class TestWithUsing #(2)
[2] pry(main)*   using CustomHash
[2] pry(main)*   def print_hash
[2] pry(main)*     h = {}
[2] pry(main)*     puts h.to_s
[2] pry(main)*   end  
[2] pry(main)* end  
=> :print_hash
[3] pry(main)> class Test #(3)
[3] pry(main)*   def print_hash
[3] pry(main)*     h = {}
[3] pry(main)*     puts h.to_s
[3] pry(main)*   end  
[3] pry(main)* end  
=> :print_hash
[4] pry(main)> TestWithUsing.new.print_hash
custome_hash
=> nil
[5] pry(main)> Test.new.print_hash
{}
=> nil
[6] pry(main)>
```

##### Kỹ thuật 

Theo như ví dụ mình sẽ định nghĩa 3 phần `(1)`, `(2)`,` (3)`. 

như các bạn có thể thấy thì phần `(1)` mình sử dụng module và module này có dùng `refine`. Một cách mà ruby sử dụng để áp dụng kỹ thuật `monkey-path`.  Nó giúp bạn định nghĩa lại method `to_s` trong class `Hash`. Như ở phần `monkey-patch` bạn định nghĩa lại lớp này sẽ gây ảnh hưởng tới toàn bộ, như khi dùng tới module thì ko vấn đề gì.

Bằng chứng có thể thấy ở `(2)`, `(3)`. Một class mình sử dụng `using` để áp dụng kỹ thuật `monkey-patch` vào trong `Class TestWithUsing` thì khi gọi tới `method` `print-hash` có kết quả là `custom_hash` giống như kỹ thuật `monkey-patch`.

Tuy nhiên khi mình chỉ gọi tới class `Test.new.print_hash` thì kết quả lại chỉ là: `{}` và nó không được áp dụng `monkey-patch`.

giữa `(2)` và `(3)` có sự khác biệt lớn nhất là do mình thêm `using CustomHash` và đó là cách mà ruby đã làm cho `monkey-patch` khắc phục sự cố làm ảnh hưởng tới cả hệ thống đang vận hành.

## Kết luận

Kỹ thuật `refine-using` được phát triển trong ruby dựa trên kỹ thuật `monkey-patch` và nó được sử dụng với mục đích là khi dự án của mình muốn sửa một phần nào đó của hệ thống đang vận hành và muốn giảm thiểu độ rủi ro cho hệ thống thì bạn hãy dùng, Tuy nhiên khi sửa đến bất kỳ một `method` nào bạn cũng nên tìm hiểu thật kỹ mức độ ảnh hưởng để đưa ra cách dùng cho phù hợp.

Thank you.