## Mở đầu 
Chào mọi người, hôm nay mình sẽ giới thiệu cho các bạn về các phương pháp thiết kế hướng đối tượng(SOLID) được sử dụng rất phổ biến hiện nay.

## S.O.L.I.D: "Dùng là cứng"
Không chắc là có cứng được tất cả mọi thứ nhưng nếu áp dụng được thì ít nhất code của bạn sẽ rất dễ đọc, dễ test và việc bảo trì sẽ nhẹ nhàng hơn nhiều, bởi nó không chỉ là lý thuyết mà chính là sự đúc kết từ vô vàn những dự án thành công và thất bại của các developer trên toàn thế giới. Và dưới đây là những điều cơ bản nhất của từng chữ cái trong S.O.L.I.D mà mình muốn gửi đến các bạn:

#### 1. Single Responsiblity Principle
Nguyên lý đầu tiên, ứng với chữ **S** trong SOLID. Nội dung nguyên lý 
>Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất)

Để hiểu nguyên lý ta cùng xét 1 class vi phạm nguyên lý.
Giả sử chúng ta có 1 class để test đầu vào của 1 công ty
```php 
class Test
{
    function testTechnology(){};
    function testEnglish(){};
    function testSoftSkill(){};
}
```
Thử hình dung nếu công ty muốn thêm các bài test khác, ta sẽ lại phải sửa lại class Test thêm phương thức mới vào sao? Thế nếu thêm 10 bài test nữa thì sao? Khi đó đối tượng tạo ra sẽ ngày càng phình to ra và rất khó kiểm soát.  Theo đúng nguyên lý ta sẽ tách các hàm này ra làm các class riêng

```php
class Test
{
    function testing(){}
}

class SoftWareTest extends Test
{
    function testing(){}
}

class EnglishTest extends Test
{
    function testing(){}
}

class SoftSkillTest extends Test
{
    function testing(){}
}
```
Để hiểu rõ hơn mọi người có thể xem tại [đây](https://nhungdongcodevui.com/2017/03/18/solid-la-gi-nguyen-tac-1-don-nhiem-single-responsibility-principle/)

#### 2. Open-Closed Principle
Nguyên lý thứ 2 ứng với chữ **O** trong SOLID. Nội dung nguyên lý:
>Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó (open for extension but closed for modification).
>
Theo nguyên lý này, mỗi khi ta muốn thêm chức năng...cho chương trình chúng ta nên viết class mới mở rộng từ class
cũ (Có thể kế thừa hoặc sở hữu class cũ) chứ không nên sửa đổi class cũ 
#### 3. Likov Substitution Principle
Nguyên lý thứ 3 ứng với chữ **L** trong SOLID. Nội dung nguyên lý:
> Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình

Giả sử bạn có 1 class cha tên Người. Các class Người lớn, Trẻ con kế thừa class này rất bình thường. Tuy nhiên giờ ta thêm class  Người máy, vd như Sophia, kế thừa class Người  thì sẽ bị vi phạm vì Người máy không cần phải ăn ngủ và cũng không biết yêu như Người bình thường :):):)   
#### 4. Interface Segregation Principle
Nguyên lý thứ 4 ứng với chữ **I** trong SOLID. Nội dung nguyên lý:
>Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể

Nguyên lý này vô cùng dễ hiểu nên mình sẽ không giải thích nhiều. Giả sử bạn có Interface X có hàng trăm method thì bạn nên tách X ra làm các interface X1,X2,X3,... gồm các method liên quan đến nhau, giúp cho việc quản lý dễ dàng hơn.

#### 5. Dependency Inversion Principle
Nguyên lý thứ 5 ứng với chữ **D** trong SOLID. Nội dung nguyên lý:
>Các thành phần hệ thống (class, module, …) chỉ nên phụ thuộc vào những abstractions, không nên phụ thuộc vào các concretions hoặc implementations cụ thể


Lấy ví dụ về ổ cứng của máy tính, bạn có thể sử dụng SSD cho nhanh, tuy nhiên bạn vẫn có thể dùng HDD. Nhà sản xuất không quan tâm bạn sử dụng loại nào chỉ cần ổ cứng của bạn có cổng SATA để gắn vào bo mạch chủ là được. Ở đay cổng SATA chính là Interface còn SSD hay HDD là implementation cụ thể 

Trong khi lập trình cũng vậy, khi áp dụng nguyên lý này, ở những module cao cấp, người ta thường sử dụng interface nhiều hơn thay vì kế thừa từ 1 class cụ thể để giảm bớt sự phụ thuộc của các class giúp cho việc bảo trì ứng dụng trờ nên dễ dàng hơn 

## Kết luận
Trên đây là những vụn vặt về SOLID được mình tổng hợp lại. rất cảm ơn các bạn đã theo dõi.

## Tham khảo
https://nhungdongcodevui.com/2017/02/01/tim-hieu-solid-de-tro-thanh-dev-chat/

https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/

https://viblo.asia/p/lap-trinh-huong-doi-tuong-voi-php-va-nhung-dieu-can-biet-phan-3-bJzKmWBPl9N