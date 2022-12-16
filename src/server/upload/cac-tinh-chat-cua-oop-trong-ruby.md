# OOP là gì ?
OOP là ngôn ngữ lập trình hướng đối tượng (Object Oriented Programming viết tắt là OOP), và hầu hết mọi thứ trong Ruby để là object. Trong phần này chúng ta sẽ tìm hiểu về OOP trong Ruby.

**Thành phần chủ yếu của OOP là class và object**

*    Class: Thực chất thì nó giống như bản vẽ để thiết kế các đối tượng

![](https://images.viblo.asia/a33322a7-649c-488e-a0f3-cc235f6b9568.png)

*    Object: Thì nó là các đối tượng(sản phẩm) tạo ra từ class

![](https://images.viblo.asia/5a024488-b509-474e-9c60-8cdeb9d0ec85.png)

# Các tính chất OOP trong Ruby
**Nó bao gồm 4 tính chất chính**

**1. Tính kế thừa(Inheritance):**
Lớp cha có thể chia sẻ dữ liệu và phương thức cho các lớp con, các lớp con không cần định nghĩa lại những logic chung, giúp chương trình ngắn gọn.

Ví dụ
![](https://images.viblo.asia/c5899b6a-2116-4445-b3dc-b6ba91a763aa.png)
kết quả:

![](https://images.viblo.asia/e0af82cf-079b-483e-8f11-92c2f7dd095a.png)

**2. Tính đóng gói hay là tính bao đóng (Encapsulation):**
Gói gọn các phương thức, các biến trong 1 class, không cho class con truy cập đến các phương thức hay biến một cách tùy chọn, giúp bảo mật dữ liệu trong quá trình kế thừa dữ liệu của lớp cha và con, nó thể hiện qua các phương thức public, private, protected
mà mình đã nêu ra trước đó các bạn có thể truy cập vào link  và xem nhé

https://viblo.asia/p/so-sanh-3-phuong-thuc-public-protected-private-trong-rails-ByEZkxOglQ0

Ví dụ: private với method
![](https://images.viblo.asia/dd49fc09-fbb7-409c-93cb-191c427014db.png)

kết qua:
![](https://images.viblo.asia/419b79de-b22f-4dff-ade2-48459c43b435.png)

ví dụ: public với method 
![](https://images.viblo.asia/98c2cfe0-7cae-40ad-b3e0-0d7f0377e4a9.png)
kết quả: 

![](https://images.viblo.asia/e0af82cf-079b-483e-8f11-92c2f7dd095a.png)
Thì qua đó sẽ thấy được sự khác nhau của các phương thức của method và tính bảo toàn dữ liệu của nó

**3. Tính đa hình(Polymorphism):** Theo cách hiểu của mình thì đa tức là nhiều, hình được hiểu là hình thức từ nó thì hiểu khái quát đa hình là biểu diễn các method dưới nhiều hình thức khác nhau, đối với trong cùng 1 class thì nó có thể biểu diễn nhiều method giống nhau nhưng khác tham số thì được gọi là overload, còn với class kế thừa nhau các method cùng tên thì đó là override

**Ở đây qua nhiều lần tìm hiểu thì mình thấy overload trong ruby nó biểu diễn như sau: **

![](https://images.viblo.asia/f84d77a1-4f0c-4c80-9d69-90a1e5f0e06c.png)

Tùy theo số lượng tham số bạn truyền vào để code vào vùng count cho phù hợp ở đây mình chỉ ví dụ là nó puts ra string gì đó khi tham số với count là 1 , 2, hay nhiều hơn 
kết quả mình thu đc: ![](https://images.viblo.asia/b502f0d7-5118-4e4d-98df-59542d2e9f07.png)

Nó đang ở multi tức là nhiều hơn 2 tham số :D 

**Tương tự mình sẽ ví dụ về override như sau**: thì mình xin chia sẽ 1 chút đó là overide tức là cùng 1 method giống nhau nhưng trả về giá trị khác với giá trị cha thôi, ví dụ thằng cha trả về animal nhưng thằng con không thích nó muốn trả về cat thì lúc này mình có thể dùng overide nhé 

ví dụ

![](https://images.viblo.asia/475961f8-4d55-4ec1-a965-a753b4b49ed1.png)

kết quar: 
![](https://images.viblo.asia/c6fa353d-b3b1-4daf-bf72-f0b64a639ed1.png)

**4. Tính trừa tượng(Abstraction):** Nhắc đến tính trừa tượng mình cũng thấy mơ hồ thật :D  Thật ra nó không qua khó khi các bạn tìm hiểu xâu, thì khi mà các bạn có quá nhiều chức năng giống nhau cho các class thì các bạn có thể viết chung nó vào một cái interface rồi gọi nó ra sử dụng cho các class, nhưng mà ở ruby nó k có interface vậy nó là cái gì ? thì thực chất ở ruby nó có module nó cũng giống như interface nhưng không hoàn toàn giống ví các method của nó chúng ta có thể định nghĩa vào trong đc :D nó có điểm hay là vậy. Mình chỉ nói sơ qua cho các bạn hiểu rõ hơn là như vậy :D Các bạn có thể tìm hiểu kỉ hơn về phần này 

**Qua trên mình cũng đã tóm gọn về OOP và tính chất của nó, mình nghĩ cái này là cái tất yếu mà những người lập trình cần phải nắm, bài viết này có thể có thiếu xót các bạn hãy tìm hiểu kỷ rồi phản hồi lại giúp mình, cảm ơn các bạn đã đoc, Happy coding**