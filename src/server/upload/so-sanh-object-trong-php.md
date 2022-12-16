## 1. Mở đầu
Là một lập trình viên, chắc hẳn việc thực hiện các phép so sánh là việc chúng ta phải làm rất thường xuyên trong quá trình viết code. Với các kiểu dữ liệu thông thường như integer hay string thì việc so sánh tương đối đơn giản nhưng với các kiểu dữ liệu phức tạp hơn như object thì cũng sẽ có đôi chút lưu ý. Qua bài viết này, hãy cùng ôn lại một số kiến thức về việc so sánh 2 object trong PHP nhé !
## 2. So sánh == và ===
Khi ta dùng toán tử so sánh == thì hai object được coi là bằng nhau khi chúng là các instance của cùng một class và có cùng các thuộc tính và giá trị (các giá trị được so sánh bởi toán tử ==), cùng xem ví dụ dưới đây nhé:
```
<?php   
class Person {
    public $age;
}

$a = new Person();
$b = new Person();
print_r($a == $b);
// print 1

$a->age = 17;
$b->age = 17;
print_r($a == $b);
// print 1

$b->age = '17';
print_r($a == $b);
// print 1

$b->age = 18;
print_r($a == $b);
// not print
```
Khi ta dùng toán tử so sánh ===, kết quả trả về true chỉ khi 2 object tham chiếu đến cùng một instance của class.
```
<?php   
class Person {
    public $age;
}

$a = new Person();
$b = new Person();
$c = $a;
$d = $a;
print_r($c === $d);
// print 1
print_r($c === $b);
// not print
```
Lưu ý: Khi thực hiện so sánh thuộc tính của các object, phép so sánh là đệ quy. Nghĩa là khi ta so sánh 2 object $a và $b có thuộc tính x, nếu $a->x chứa một đối tượng, nó sẽ được so sánh với $b->x theo cách tương tự và điều này có thể dẫn đến lỗi liên quan đến đệ quy. 
```
<?php   
class Person {
    public $age;
    public $partner;
}

$a = new Person();
$b = new Person();
$a->partner = $b;
$b->partner = $a;
print_r($a == $b);
// PHP Fatal error:  Nesting level too deep - recursive dependency?
```

## 3. So sánh <, >
Khi sử dụng toán tử < hoặc > để so sánh 2 object, PHP sẽ so sánh lần lượt giá trị của các thuộc tính và trả về kết quả khi phát hiện ra thuộc tính đầu tiên không bằng nhau.
```
<?php   
class Person {
    public $age;
    public $point;
}

$a = new Person();
$b = new Person();
$a->age = 18;
$b->age = 18;
print_r($a > $b);
// not print

$a->point = 10;
$b->point = 9;
print_r($a > $b);
// print 1
```
## 4. Kết
Hi vọng bài viết trên có thể giúp các bạn ôn lại một chút kiến thức nhỏ trong PHP. Cảm ơn mọi người đã đọc bài.
Nguồn tham khảo: https://www.php.net/manual/en/language.oop5.object-comparison.php