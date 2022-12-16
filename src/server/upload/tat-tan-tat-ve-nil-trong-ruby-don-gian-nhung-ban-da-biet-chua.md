# Nil từ góc nhìn bên ngoài
Nil dùng để đại diện cho một giá trị rỗng hoặc một giá trị mặc định trong Ruby. Có thể hiểu nôm na Nil chính là Null trong các ngôn ngữ lập trình khác.

Nil là một đối tượng đặc biệt, ta có thể check bằng đoạn code 

```
nil.object_id #=> 8
```

Điều này cho ta thấy, chỉ có duy nhất một đối tượng nil và nó luôn có duy nhất một id = 8(4 đối với một số phiên bản cũ). Và đây cũng chính là điều làm cho nil đặc biệt hơn so với đa số các object khác (Ngoài ra còn có false, true,.. tất cả mọi thử ở ruby đều là object mà :D )

### Dùng như thế nào?
Nil có thể dùng để làm output cho một method nào đó
```
def some_method
if condition
  #do somthing
else
  nil
end
```

Hoặc nil cũng được trả ra khi bạn gọi một giá trị chưa được khai báo trước đó

VD như là:

 +Một giá trị chưa được khai báo
 
 +Một giá trị nằm ngoài phạm vi của một mảng
 
 +Một key không tồn tại trong một chuỗi hash
 
 ![image.png](https://images.viblo.asia/bdba921f-46c2-415b-87b5-dca914e6e2a3.png)
 ![image.png](https://images.viblo.asia/af841254-9d3c-4892-a888-e3c65b1352f8.png)
 
 Thỉnh thoảng những new dev cũng hay mắc lỗi như bên dưới, thực hiện phép tính, gọi hàm, chấm phẩy các kiểu với một đối tượng có giá trị nil :D 
 
 ![image.png](https://images.viblo.asia/122d2646-f8b8-47fe-90d6-ef3c47df22de.png)
 
 Với một dòng code như này trong project thì rất tai hại nếu như bạn không chắc chắn rằng đối tượng bạn sử dụng sẽ có trường hợp trả ra nil
 
Để khắc phục điều đó thì ta nên kiểm tra trước, khá đơn giản: 
```
if array[5] && array[5].size
  # do something...
end
```

hoặc với một đối tượng
```
if some_object.nil?
  # do something...
end
```

Ruby cũng có 2 cách viết ngắn gọn hơn để tối giản hóa cho dòng code `user.nil? ? nil : user.name`

```
user.try(:name)
hoặc
user&.name
```

Nếu bạn sử dụng Rails thì có thể some_object.blank? cũng check được nil. Nên nhớ blank? là phương thức của Rails, Ruby thuần không có. Và blank? cũng có một số điểm khác biệt so với nil? nhé

Tùy thuộc vào đối tượng bạn đang làm việc sẽ có một số kỹ thuật bạn có thể sử dụng để tránh hoàn toàn các lỗi liên quan đến giá trị nil.

Với Hash & Array, bạn có thể sử dụng phương thức tìm fetch trên các đối tượng đó

Hoặc bạn có thể sử dụng “Null Object Pattern” trong các lớp của riêng bạn nếu bạn muốn trả về giá trị mặc định thay vì nil.

# Mổ xẻ bên trong
Vì nil là một đối tượng nên chắc chắn sẽ có class nil ?

![image.png](https://images.viblo.asia/05a7cea9-31f2-4be6-97d4-6811ba200476.png)

Đúng vậy, Nil tạo từ NilClass. Và sau đây là những gì chứa ở trong NilClass

![image.png](https://images.viblo.asia/4f9be875-993e-4267-ba2d-db5c8f3f41b8.png)

Nhìn sơ qua ta cũng đã thấy điều đặc biệt của class này rồi đúng không. Tất cả những method trong hàm đều trả về giá trị rỗng hoặc 0
```
nil.to_s => ""
nil.to_i => 0
nil.to_f => 0.0
nil.to_a => []
nil.to_h => {}
nil.inspect => "nil"
nil.nil? => true # chả lẽ false =)))
```

"Nothing means something"  đó là cách mà người ta nói về Nil(ở đây là nothing). Vâng, nil cũng chính là một cái gì đó

Một điều khác bạn cần biết về nil là nó là giá trị duy nhất, ngoài false (cũng là một đối tượng), được coi là "falsy".

Ngoài ra, mọi thứ khác trong Ruby đều được coi là đúng trong ngữ cảnh boolean.

Một số ngôn ngữ lập trình khác coi số 0 là một giá trị false, nhưng với Ruby thì nó là true
![image.png](https://images.viblo.asia/3a089a97-3418-408a-854e-7cd34c278a8c.png)

Đoạn code này có nghĩa là 
```
if 0 == true
  puts "123"
end
```

Và nếu 0 là true thì bạn nghĩ sao về đoạn code dưới đây :D

![image.png](https://images.viblo.asia/601ed956-1df7-4ca2-ab38-60baffac99fc.png)

### Tham khảo
https://www.rubyguides.com/2018/01/ruby-nil/