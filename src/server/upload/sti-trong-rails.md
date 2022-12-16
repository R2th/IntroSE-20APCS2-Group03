# 1. What is STI
STI - Singe Table Inheritance là một kĩ thuật sử dụng cho model, cho phép ta có thể có nhiều model khác nhau cùng kế thừa một model cha trong cùng 1 bảng.

STI là một phần của ActiveRecord. Ví dụ bạn có một model là Order. Nhưng order của bạn muốn có 2 loại là GoodOrder và BadOrder, sử dụng STI thì ta có thể cho GoodOrder và BadOrder kế thừa Order vì chúng có cùng thuộc tính với nhau, phân biệt bởi trường type.

# 2. How to use STI
  Sử dụng STI khá là đơn giản, ở đây mình dùng rails 5.
 ```
 rails g model order name:string price:decimal order_status:integer type:string
  ```
    
Mặc định rails sẽ dùng trường type để phân biệt các order, bạn có thể thay đổi nó với việc đặt tuỳ chọn sau trong model
```
self.inheritance_column = :column_name
```
    
Tiếp đó chúng ta khởi tạo model order.rb, order/good_order.rb, order/bad_order.rb
    
```
class Order < ApplicationRecord
end
```
    
```
class Order::GoodOrder < Order
end
```
   
```
class Order::BadOrder < Order
end
```
   
Chúng ta vừa khai báo 3 model đó là Order, và 2 model con Order::BadOrder, Order::GoodOrder kế thừa Order

Việc sử dụng STI khá là đơn giản, các bạn tạo model như sau
```
Order::BadOrder.create(name: "Order1", price: 50, order_status:"ready")
```
khi khởi tạo như vậy thì trường type sẽ được lưu vào db là "Order::BadOrder"


Để thuận tiện cho việc tìm kiếm order thì ta có thể khai báo scope trong Order như sau

```
scope :good_orders, ->do
    where(type: "Order::GoodOrder")
end

scope :good_orders, ->do
    where(type: "Order::BadOrder")
end
```


3. When to use STI

STI là một giải pháp hữu hiệu khi ta muốn có một số lượng nhỏ model kế có cùng behavior nhưng khác type. 

Tuy nhiên thì chúng ta sẽ gặp vấn đề nếu dữ liệu của chúng ta phức tạp hơn

VD: 
Chúng ta có các model là Vehicle, Bicycle, Motorcycle,  và Car với Vehicle là model cha, 3 model còn lại kế thừa Vehicle. Mọi thứ sẽ dễ dàng nếu Bicycle, Motorcycle và Car chỉ khác type, và chúng ta không quan tâm đến các column khác giữa chúng. 
    
Tuy nhiên thì giẳ sử dữ liệu chúng ta cần
- Với Bicycle là loại đường dài, leo núi
- Với Cars và Motorcycle chúng ta cần quan tâm đên mã lực
Chúng ta phải tạo thêm **cycle_type** cho Bicycle để lưu type [:mountain, :normal], **horsepower** cho Cars và MotorCycle.
    
Và các model giờ không có cùng chung các thuộc tính nữa. Điều này dẫn đến 1 vấn đề là
- Bảng của chúng ta có rât nhiều nil value, với xe Cars và MotorCycle thì cycle_type sẽ là nil, và với Bicycle thì horsepower là nil.
- Khi chúng ta tìm kiếm, các Bicycle có cycle_type là :mountain thì SQL không chỉ tìm kiếm mỗi type là Bicycle, thay vào đó là cả Cars và MotorCycle
- User có thể tạo 1 model Cars với cycle_type là :mountain, chúng ta cần phải add thêm strict validation để không xảy ra các dữ liệu sai trong DB.
    
4. Kết luận

Trên đây mình có trình bày về STI, cách cài đặt cũng như cách sử dụng, Trong rails còn một phương pháp khác đó là Polymorphic. STI phù hợp với dữ liệu không khá phức tạp nhưng sẽ gặp một vài khó khăn khi dữ liệu của chúng ta phức tạp hơn. Hy vọng các bạn có cái nhìn tổng quan về STI.

Cám ơn đã đọc bài viết của minh