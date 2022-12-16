# Truthy và Falsy trong JavaScript là gì ?
**  Đây là một bài viết ngắn giới thiệu về Truthy và Falsy trong JavaScript, một khái niệm cơ bản và vô cùng quan trọng trong JS mà không phải các bạn mới học nào cũng biết đến. Sau đây, chúng ta cùng tìm hiểu nó là gì, vì sao nó lại quan trọng, và lợi ít khi sử dụng nó nhé.**

## Khái niệm Truthy và falsy 

   -	JavaScript sử dụng Type conversion(chuyển đổi dữ liệu từ kiểu dữ liệu này sang kiểu dữ liệu khác) để ép giá trị bất kỳ thành một giá trị Boolean trong một ngữ cảnh yêu cầu giá trị Boolean.
   -	Truthy và falsy là những giá trị mà JavaScript khi ép về kiểu Boolean, hoặc trong một ngữ cảnh Boolean, nó sẽ cho ra giá trị true hoặc false.
    
   Các giá trị được xem là truthy: chuỗi khác rỗng, số khác 0 và tất cả các object. 
   // Bao gồm cả [ ] và { } vì mảng rỗng và chuỗi rỗng vẫn là object.
    

![](https://images.viblo.asia/09216a0b-b299-48e3-a99b-617526eee43b.png)

   Ví dụ về giá trị Truthy (nó sẽ bị ép buộc thành True trong ngữ cảnh Boolean và do đó thực thi khối If):
   
   ![](https://images.viblo.asia/bc80a57d-12f9-45af-a79e-cca37ab746cd.png)
   ![](https://images.viblo.asia/efffdc0a-f8c6-450f-885b-5cf2e602b988.png)


Các giá trị được xem là falsy: undefined, null, false, 0, -0, 0n, NaN, ‘’.

![](https://images.viblo.asia/a552d655-6507-4a79-b3d2-ba8b1434ab2e.png)

Ví dụ về giá trị Falsy (Nó sẽ bị ép thành kiểu False trong một ngữ cảnh boolean và do đó bỏ qua khối If.

![](https://images.viblo.asia/cacea621-477a-47c6-bb66-2598e4ec2179.png)

Một ví dụ nữa về Truthy và Falsy trong một ngữ cảnh Boolean. Ở đây toán tử || sẽ trả về toán hạng vế trái nếu vế trái là truthy còn nếu vế trái là falsy thì nó sẽ trả về toán hạng vế phải (cách này thường được dùng để cung cấp giá trị mặc định). Nhưng nó cũng sẽ xãy sau một số vấn đề như bên dưới mà bạn dễ dàng nhận thấy được nếu bạn coi 0, ‘’, NaN là hợp lệ. Như person.point ở đây có giá trị 0 (falsy) nên nó sẽ trả về toán hạng bên phải là undefined point gây ra kết quả không mong muốn.
Cách khắc phục, nullish coalescing operator (??) là một tính năng mới được giới thiệu trong ES11(ECMAScript 2020). Theo định nghĩa của MDN ?? là một toán tử logic sẽ trả về toán hạng bên phải nếu vế trái là null hoặc undefined, và nếu không thì sẽ trả về toán hạn bên trái của nó. Như vậy nếu giá trị là 0, ‘’, NaN thì nó vẫn sẽ chấp nhận là các giá trị hợp lệ.

![](https://images.viblo.asia/c935bf97-6d72-458e-bf21-aa930c0d2ef2.png)

Và đó là sơ lược về Truthy và falsy trong JavaScript, các bạn có thể tìm hiểu thêm tại đây https://developer.mozilla.org/en-US/docs/Web/JavaScript .