## Giới thiệu
Xin chào các bạn, bài viết này tôi muốn **phân biệt sự khác nhau giữa $this và self** cho các bạn mới học PHP. Và hy vọng nó cũng sẽ hữu ích cho các bạn đã học để ôn lại kiến thức.

## Nội dung

### 1. $this tham chiếu đến đối tượng hiện tại, còn self tham chiếu đến Class sử dụng nó.
- Để minh chứng cho nhận định trên, chúng ta cùng xem xét ví dụ sau:

> Tạo một class Animal, và class Tiger kế thừa từ class Animal và sẽ override lại phương thức whichClass() của Animal.

![](https://images.viblo.asia/abc7cc1b-e1d8-451b-8bf4-28e0d82697e1.png)

- Để biết vtable là gì? Tham khảo [tại đây](https://www.programmerinterview.com/c-cplusplus/how-vtables-work/)

###  2. Sử dụng $this và self trong static function.
![](https://images.viblo.asia/cd08f97e-e6ae-428b-95f4-18e4f56d245d.png)


- Chỉnh sửa thêm một chút, thay đổi biến $name thành non-static:
```
class Animal {
    public $name;  
	
    public static function nameChange()
    {
        self::$name = "Programmer Interview";
    }
}

$animalObj = new Animal();
$animalObj->nameChange();
```
- Bây giờ, $name không còn là biến static, chạy đoạn code trên chúng ta sẽ gặp lỗi `Uncaught Error: Access to undeclared static property: Animal::$name`. Lỗi ở đây là do, chúng ta ***KHÔNG được phép truy cập biến non-static trong phương thức static*** - điều này có ý nghĩa bởi vì các hàm static có thể được gọi trực tiếp qua Class mà không cần đối tượng - Các biến non-static được sử dụng bởi đối tượng.

### 3. $this, self - gọi static functions.
![](https://images.viblo.asia/49a5aec1-06fb-4498-adc6-b6d145b6c0d8.png)

- Có thể gọi static function bằng $this hoặc self.
### 4. $this, self truy cập static variable.
![](https://images.viblo.asia/acd962ce-307b-4bd0-9b63-470475ae9057.png)

- Trong PHP, không nên sử dụng con trỏ $this để thiết lập giá trị biến static - thay vào đó, sử dụng $self.

## Tổng kết
![](https://images.viblo.asia/66b6318a-0a47-4bf5-9d77-1115781e4030.png)

- Nguồn tham khảo: https://www.programmerinterview.com/php-questions/php-self-vs-this/