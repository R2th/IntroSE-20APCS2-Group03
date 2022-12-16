## 1. Anonymous classes
**Anonymous Classes** hỗ trợ cho các lớp ẩn danh đã được thêm vào trong PHP 7. Các lớp ẩn danh rất hữu ích khi các đối tượng đơn giản, một lần cần được tạo.
Trước đây để khởi tạo mới một đối tượng thì bắt buộc ta phải khai báo class trước, điều này rất rõ ràng nhưng lại không đáp ứng được một số trường hợp trong thực tế, vì vậy **Anonymous Classes** ra đời.

### Ví dụ khi kháo bảo một hàm ẩn danh ta sẽ dùng  : 
```php
new class{
    // Danh sách methods
};
```
dưới đây mình sẽ ví dụ về một class bình thường và một **Anonymous Classes** để cho các bạn thấy nó khác biệt về cách sử dụng như thế nào nhé :) ! 

```php
class Animal{
    function show($message)
    {
        echo $message;
    }
}
 
$animal = new Animal();
$animal->show('Đây là lớp động vật nè !');
```

Chạy ví dụ lên sẽ xuất hiện dòng chữ **"Đây là lớp động vật nè !"**. Điều này quá bình thường rồi đúng không , nhưng bạn hãy xem ví dụ ở phần 2 dưới đây khi dùng **anonyous classes**.

```php
$animal = new class{
    function show($message)
    {
        echo $message;
    }
};
 
$animal->show('Đây là lớp động vật nè !');
```

Theo cá nhân mình thì  khi ban khởi tạo một **Anonymous Class** thì tốc độ xử lý sẽ nhanh hơn bởi bộ nhớ chỉ lưu trữ một lần cho class đó mà thôi. Ngoài ra chúng ta có thể tạo class một cách nhanh chóng không mất nhiều thời gian .
## 2. Sau đây là một số ví dụ cách sử dụng Anonymous Class rất hay mà bạn nên biết.
```php
// Class con
class Cat{
    public $animal;
    function setAnimal($animal)
    {
        $this->animal = $animal;
    }
}
 
// Class con với tham số truyền vào là một Anonynous Class
$bull = new Bull();
$bull->setAnimal(new class {
    function show($message)
    {
        echo $message;
    }
});
$bull->animal->show('Hello ahihi ! i'm Bò');
```

## 3. Anonymous Class có kế thừa
```php
class Animal{
    function eat($meal){
    }
}
 
$bull = new class extends Animal{
    function eat($meal){
        echo 'Con bò đang ăn trưa với món ăn ' . $meal;
    }
};
 
$bull->eat('I want to eat grass !');
```

## 4. Lời kết 
Như vậy một Anonymous Class thực chất là cách khai báo và sử dụng nhanh một class, khi sư dụng cách này bạn sẽ không có tính mở rộng mà chỉ mang tính chất sử dụng tạm thời, vì vậy phải cân nhắc khi sử dụng loại class này nhé .

Thanks for watching !