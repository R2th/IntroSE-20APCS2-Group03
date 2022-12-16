Đây là bài dịch từ https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53


-----
# Goodbye  Object Oriented Programming
![](https://images.viblo.asia/7204becf-a059-43a8-b49c-7c73ac0d0bb4.png)

Tôi đã lập trình với ngôn ngữ hướng đối tượng được cả 1 thập kỷ, bắt đầu với C++, sau đó là  Smalltalk và cuối cùng là .NET & Java.
#####
Tôi nhớ cảm giác mình đã rất hào hứng để có thể ứng dụng những lợi ích của OOP - Inheritance (Kế thừa), Encapsulation (Đóng gói), và Polymorphism (Đa hình) -  3 cột trụ của mô hình OOP. 
#####
Tôi đã không thể chờ đợi để có thể nhận được thành quả của những lời hứa hẹn về Reuse (Tái sử dụng), cũng như học tập từ những người đi trước trong mảnh đất OOP rộng lớn này.
#####
Tôi đã không thể kìm nén được cảm xúc khi nghĩ về việc mình có thể map cả thế giới thật xung quanh mình thành những class và nó sẽ  hoàn hảo như thật vậy.
#####
***Và, tôi đã không thể nào sai lầm hơn thế...***

-----
# Inheritance - Sự sụp đổ của chiếc cột trụ đầu tiên

Qua những cái nhìn đầu tiên thì Kế thừa được đánh giá như là lợi ích lớn nhất của OOP. Những ví dụ đơn giản được đưa ra có vẻ rất hợp lí và đúng đắn.
![Where is the promised happiness??](https://images.viblo.asia/1d0bab93-4184-40ea-afd2-11c1b0d055d1.png)
#####
Và, ***Tái sử dụng*** dường như trở thành cụm từ được nhắc đến khắp mọi nơi.
#####
Tôi thấm nhuần tất cả tư tưởng đó và lao vào thế giới mới của OOP.
#####
...
## Banana Monkey Jungle Problem
Với tinh thần hừng hực khí thế ấy, tôi bắt tay vào thiết kế sơ đồ lớp và code. Và tất cả giống như đều đang đi đúng hướng.
#####
Tôi sẽ không bao giờ quên được cái ngày mà tôi đã rất háo hức để hiện thực hoá những hứa hẹn mà OOP mang lại - "Tính tái sử dụng", thông qua kế thừa từ một class sẵn có. Đó là một khoảnh khắc mà tôi đã rất chờ đợi.
#####
Và sau đó, tôi thực hiện 1 project mới, và tôi nghĩ ngay về cái class mà tôi đã từng sử dụng ở project trước đây. Thật tiện, việc cần làm duy nhất là lấy class đó ra từ project cũ và sử dụng. So simple!
#####
À thì.. không chỉ là mỗi class đó. Chúng ta sẽ cần class cha của nó nữa. Nhưng không sao, vậy cũng được mà.
#####
Um.. Chờ chút, có vẻ là sẽ cần thêm cả class cha của cha của class đó nữa cơ. Ok, tôi vẫn có thể xử lí được nó, không sao cả.
#####
Và thật là tuyệt, nó không chạy. Tại sao chứ!!?? À, có lẽ là tôi cần thêm class này, à cả class kia nữa... Không sao, mọi thứ vẫn có thể kiểm soát được!
![](https://images.viblo.asia/c11c60e4-52b0-4868-835a-9428dd6e4841.jpg)

Nhưng chờ đã, không chỉ class kia, ta cần thêm class cha của nó, và cả cha của cha của.....!
#####
Có một câu nói của Joe Armstrong (tác giả của Erlang) rất hợp với tình huống này:
> Vấn đề của OOP là nó kéo theo cả một môi trường ngầm xung quanh nó, dẫn tới việc chúng ta chỉ cần 1 quả chuối nhưng lại nhận được một con khỉ đang cầm quả chuối và cả khu rừng.
## Banana Monkey Jungle Solution
Chúng ta có thể khắc phục bằng cách hạn chế việc tạo một cấu trúc quá sâu. Tuy nhiên nếu như tính Kế thừa là một trong những chìa khóa để mở cánh cửa của Tái sử dụng thì bất cứ hạn chế nào tới việc kế thừa cũng sẽ gây cản trở việc Tái sử dụng một cách hiệu quả nhất. Phải không?
#####
Đúng là vậy.
#####
Vậy những developer đáng thương như chúng ta phải làm sao?
#####
**Contain & Delegate**!  Chúng ta sẽ nói thêm về nó sau.

## The Diamond Problem
Không sớm thì muộn, cái vấn đề này sẽ bộc lộ, và tùy theo từng ngôn ngữ lập trình, sẽ là cả một đống rắc rối không thể giải quyết được.
![The Diamond Problem](https://images.viblo.asia/2e867d72-9172-495d-835c-a499c49e7e7f.png)

Đa phần các ngôn ngữ lập trình hướng đối tượng đều không support việc kế thừa như thế này, mặc dù nó khá là hợp lí về mặt logic. Vậy thì tại sao nó lại khó được support như vậy?
#####
Thử xem qua 1 ví dụ sau:
```
Class PoweredDevice {
}
Class Scanner inherits from PoweredDevice {
  function start() {
  }
}
Class Printer inherits from PoweredDevice {
  function start() {
  }
}
Class Copier inherits from Scanner, Printer {
}
```
#####
Chú ý rằng cả Printer và Scanner đều có 1 hàm là *start()*, vậy thì Copier sẽ kế thừa lại hàm start() của Printer hay Scanner?
## The Diamond Solution
Rất đơn giản, ***đừng làm nó!*** Nếu bạn không gặp phải nó thì sẽ không phải đau đầu nghĩ cách giải quyết.
![](https://images.viblo.asia/a454a25c-1c82-4323-9357-25408f472d6e.jpg)
#####
Đúng là như vậy. Hầu hết các ngôn ngữ lập trình hướng đối tượng sẽ không để bạn làm điều đó.
#####
Nhưng.. tôi muốn nó, tôi muốn **Tái sử dụng!**
#####
Đó là lí do bạn phải sử dụng **Contain & Delegate**.
 ```
 Class Copier {
  Scanner scanner
  Printer printer
  function start() {
    printer.start()
  }
}
 ```
 Làm như vậy có thể dễ dàng xác định được ta sẽ dùng hàm start() của Printer.
 #####
 Tuy vậy, vấn đề này đã là 1 vết rạn lớn cho cây cột trụ đầu tiên - **Inheritance** (Kế thừa).
 
 ## The Fragile Base Class Problem
 Vì thế, tôi cố gắng giữ cho cây cấu trúc của tôi không quá sâu và tránh khỏi việc mắc phải vấn đề bên trên. Mọi thứ có vẻ đi rất đúng hướng. Cho đến khi...
 #####
Một ngày, code của tôi đang chạy ngon. Và ngày tiếp theo, nó ngỏm luôn. Vấn đề là, tôi chẳng hề thay đổi bất cứ cái gì cả!
#####
Có lẽ là 1 bug chăng? Không, ***có gì đó đã thay đổi..***
#####
Nhưng nó không phải là sự thay đổi từ code của tôi, mà là từ class mà tôi đang kế thừa lại.
#####
Một sự thay đổi từ Base class có thể khiến các class kế thừa lại nó trở nên rối tung như vậy sao? Đây đúng là 1 vết rạn lớn đe dọa đến sự ổn định của cây cột trụ Inheritance, mãi mãi! Làm sao có thể yên tâm được khi mà 1 thay đổi trời ơi đất hỡi nào đó có thể khiến tất cả mọi thứ sụp đổ.
 
## The Fragile Base Class Solution
Một lần nữa, giải pháp là **Contain & Delegate**.
#####
Với Contain & Delegate ta chuyển từ lập trình Hộp trắng sang lập trình Hộp đen. Nếu như với lập trình Hộp trắng, ta phải để ý đến việc triển khai base class thì với lập trình Hôp đen ta có thể hoàn toàn bỏ qua việc quan tâm đến quá trình triển khai này vì ta chỉ làm việc với các Interface thay vì overriding các hàm của base class.
#####
Thật là.. **Kế thừa** đáng lẽ ra phải là 1 lợi ích lớn cho Tái sử dụng.
OOP không được thiết kế ra để sử dụng Contain & Delegate dễ dàng hơn. Nó vốn được tạo ra để giúp ta có thể Kế thừa dễ dàng hơn.
#####
Có lẽ nhiều người giống như tôi, đang bắt đầu tự hỏi về cái người ta vẫn gọi là Kế thừa này.

## The Hierarchy Problem
Mỗi lần tôi bắt đầu công việc ở 1 công ty mới, tôi lại gặp phải 1 vấn đề. Phải lưu thư mục Document của mình như thế nào. Tôi nên tạo thư mục Document, sau đó tạo thư mục Company trong nó? Hay là tạo thư mục Company trước rồi mới tạo thư mục Document bên trong? Cả 2 đều được nhưng cuối cùng thì cái nào mới là chuẩn nhất?
#####
Ý tưởng của việc chia cây cấu trúc là để các class cha sẽ là cái chung hơn, còn các class con là những cái chi tiết, cụ thể hơn. Càng đi sâu vào cây cấu trúc thì nó sẽ càng trở nên chi tiết và cụ thể hơn.
#####
Tuy nhiên nếu các class cha - con có thể thay đổi vị trí cho nhau được thì có lẽ là *có gì đó sai sai* với ý tưởng này chăng?
Với từng đó những vấn đề, có thể coi rằng cây cột trụ đầu tiên Inheritance đã sụp đổ.
#####
![](https://images.viblo.asia/2f7ab87f-b314-4aa1-b85a-39a262961fb0.gif)

# Encapsulation (Đóng gói) - Cây cột trụ tiếp theo sụp đổ
Ban đầu Encapsulation được cho là lợi ích lớn thứ 2 của OOP sau Inheritance.
#####
Các trạng thái của biến được bảo vệ khỏi sự xâm nhập từ bên ngoài. Nó được "đóng gói" bên trong từng đối tượng.
#####
Chúng ta sẽ không còn phải lo về các biến toàn cục (global) có thể đang bị xâm nhập bởi .. "người mà ai cũng biết là ai"
#####
Tính đóng gói sẽ bảo vệ cho các biến của chúng ta!
#####
Cái "đóng gói" này thật là max-bing quá đi!!!
#####
Cho đến khi....

## The Reference Problem
Để đảm bảo tính hiệu quả, các object không được truyền tới hàm thông qua giá trị của nó mà thông qua Tham chiếu (reference). 
#####
Có nghĩa là các hàm sẽ không truyền thẳng các object mà thông qua các tham chiếu hoặc con trỏ. 
#####
Các object được tham chiếu tới constructor của object khác, lưu trong 1 biến private. Biến này được bảo vệ bằng cơ chế encapsulation. 
#####
Tuy nhiên, biến được tham chiếu tới thì không.

## The Reference Solution
Constructor sẽ phải clone lại object được tham chiếu đến. Không chỉ object đó, mà cả những object con mà object này đang chứa, và tiếp tục như vậy..
#####
Quá nhiều cho cái gọi là tính hiệu quả..
#####
Chưa kể, 1 số object liên quan để resource của hệ thống thì không clone được (hoặc có những cũng chẳng dùng được)
#####
Và, đoán xem, hầu hết các ngôn ngữ HĐT đều gặp phải vấn đề này!
#####
Tạm biệt, **Encapsulation**.

![](https://images.viblo.asia/7e727f91-0d98-4622-84c6-739aaa920306.gif)

# Polymorphism (Đa hình) - Cột trụ cuối cùng sụp đổ
Không phải là Polymorphism không tốt, nhưng không cần phải đến OOP mới có thể có tính Đa hình. Interface có thể mang lại cho ta điều đó mà không phải vướng vào đống rắc rối của OO.
#####
Vì vậy, chẳng cần suy nghĩ nhiều, chúng ta có thể *say goodbye* OO-Polymorphism - cũng như OOP nói chung.
#####
# Những hứa hẹn
Những ngày đầu tiên, OOP mang lại rất nhiều hứa hẹn. Ngay cả đến ngày nay thì những developer ngây ngô trong nhà trường, ngồi xem những khóa học OOP online,.. vẫn đang tiếp tục được hứa hẹn về nó.
#####
Phải mất nhiều năm tôi mới nhận ra tôi đã bị OOP lừa dối như thế nào. Tôi đã quá mơ mộng, quá nong nớt, quá tin.
#####
Và, tôi đã bị lừa.
#####
![](https://images.viblo.asia/08c5c60a-5ba2-4cf4-911e-daab843eabef.jpg)

Tạm biệt, Object Oriented Programming!

## Vậy, "cú lừa" tiếp theo sẽ là gì?
Tạm biệt với HĐT, hãy tiến tới với Functional Programming, nó là 1 trào lưu, một thứ tuyệt vời mà tôi đã sử dụng vài năm gần đây.
#####
Tất nhiên là tôi không còn tin vào những hứa hẹn nào nữa, cứ phải "trăm nghe không bằng một thấy".


-----

*Đó là ý kiến của [Charles Scalfani](https://medium.com/@cscalfani) khi nói về Object Oriented Programming và Functional Programming. Tất nhiên mỗi người sẽ có những quan điểm riêng, có người lại cho rằng, ngay từ ban đầu, OOP và FP được tạo ra với những mục đích khác nhau, để giải quyết những vấn đề khác nhau. Và không có cái nào có thể giải quyết mọi thứ 1 cách hoàn hảo hơn các khác cả. Vậy ý kiến của bạn thế nào, hãy chia sẻ bên dưới nhé!*
#####
### *Thanks for reading.*