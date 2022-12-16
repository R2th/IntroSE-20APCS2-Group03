Trong chuyên mục Ruby và những người bạn lần này, chúng ta cùng làm quen với một người rất nổi tiếng, có mặt trong nhiều ngôn ngữ, đó chính là `self`.
Self là một biến rất quen thuộc, có mặt trong rất nhiều, rất nhiều ngôn ngữ, thân thuộc với các developer, nhưng không phải ai cũng hiểu rõ về nó.
Vậy self trong ruby là gì? Bản chất của nó là như thế nào?
Hãy cùng nhau phân tích và hiểu rõ hơn về người bạn self qua các ví dụ dưới đây
# Self là gì?
Trong ruby, mọi thử đều là object. Các object cung cấp ngữ cảnh thực thi cho code.Bản chất của việc gọi một method chính là việc gửi message giữa object gửi (the sender)và object nhận (the receiver). Và object hiện tại chính là **default receiver**. Khi mà receiver không được định nghĩa, message sẽ được gửi đến **default receiver**. Đó chính là `Self`

![](https://images.viblo.asia/edabd2a7-5ad6-4842-8137-4b16b6ec8187.png)

### Self ở Top Level

Chúng ta thử kiêmr tra sem self trông như thế nào tại top level

```
puts self
```


kết quả:
```
main
```

Điều này nói rằng Ruby đã tạo ra một object được gọi là main tại top level. Và tất cả code chúng ta viết tại top level sẽ sử dụng `main` như là người nhận của các method gọi đến.
![](https://images.viblo.asia/e0b393d5-0404-4ad5-9668-dea1ba891cb0.png)

Vậy main là gì nhỉ?
Nếu `main` là một object, nó phải là một thể hiện của một class nào đó. Chúng ta sẽ kiểm tra sẽ `main` là thể hiện của class nào nhé
```
puts	self.class
```

Kết quả:
```
Object
```

Ồ, vậy thì Ruby hiểu điều này như là
```
main = Object.new
```

### Main có phải là một Receiver Object?
Main tồn tại trên top level, Liệu rằng ta có thể sử dụng `main` như một object, gọi đến method puts?
```
main.puts	'hi'
```

Chúng ta có một kết quả:
```
NameError: undefined local variable or method	
‘main’ for main:Object
```

Ruby tạo ra `main` là một current object ở top level, Nhưng không có một biến nào được gọi là `main`

`main` chính là sự thể hiện của `self` tại top level

![](https://images.viblo.asia/31171fb0-19cd-4536-89a1-314e1e635925.png)

## Tính "động" của self
### Hãy cùng nhau xem các ví dụ dưới đây:
Ví dụ 1:

![](https://images.viblo.asia/2ba501c8-c44d-4f04-819c-df0949d28c5a.png)

Kết quả:

![](https://images.viblo.asia/cdbc1608-c518-4301-a5ae-070fa65e6b92.png)

Ví dụ 2:

![](https://images.viblo.asia/744ddb66-be32-477d-ae79-a254aaf6158b.png)

Kết qủa:

![](https://images.viblo.asia/7c171b71-ff70-4fee-8cf1-c97b1b568507.png)

Ở toplevel, self là main, nhưng khi thực thi method drive, self lại là object car.
![](https://images.viblo.asia/cb36b046-5628-4459-bac7-d753ee8a71dc.png)

## Vậy khi nào SELF thay đổi?
## Self tại Top level
![](https://images.viblo.asia/58cd8aac-4fcd-4e62-b5dd-5e5b320ab156.png)

## Self trong Class

![](https://images.viblo.asia/b2bff469-c7dd-4586-90c5-a2a37ee139e8.png)

## Self trong Module

![](https://images.viblo.asia/3e33ff2a-fdd2-49d1-a043-af28b2a7b2d9.png)

Tóm lại self sẽ thay đổi tùy theo bổi cảnh mà ta đang sử dụng
![](https://images.viblo.asia/341b8b06-3c69-4f9b-884b-7f06e7343488.png)
Còn khi self ở trong một method thì sao nhỉ?
### Sau khi nghiên cứu qua một loạt các ví dụ, ta có thể tổng kết lại giá trị của Self trong các trường hợp như sau:

Vị trí của Self | Giá trị |
| -------- | -------- |
| Top Level     | Main     |
| Bên trong Class | Class Name |
| Bên trong Module | Module Name |
| Bên trong method của một Class | object thể hiện của Class đó |
| Bên trong method của một Module | object thể hiện của Class mà module mixes  |
| Bên trong một method của Module | Class Name của Class đã extends module |
| Bên trong một class method của module | Module Name |
| Bên trong một class method của một Class | Class Name |