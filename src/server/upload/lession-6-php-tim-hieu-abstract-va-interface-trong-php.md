### 1. Tổng quan

   ![](https://images.viblo.asia/0ec4ccd0-5fff-4cb6-804f-cf73ec88dde1.png)

    
##### 1.1. Abstract
  **a. Cú pháp của Abstract**
- Từ khóa **abstract** luôn đứng trước class cần khai báo phương thức trừu tượng.
- Các class con **kế thừa** lớp Abstract bằng từ khóa ***extends***.
- Ta có 3 cách khai báo function hợp lệ như bên dưới :point_down::point_down:
```
<?php
    abstract class Parent_Class 
    {
      abstract public function someMethod1();
      abstract public function someMethod2($var_name);
      abstract public function someMethod3() : string;
    }

    class Sub_Class extends Parent_Class
    {
        public function someMethod3() : string 
        {
            //code
        }
    }
?>
```

<br>

**b. Khái niệm**
- Là một lớp có ít nhất một phương thức trừu trượng.
- Phương thức trừu tượng đơn giản là một lớp được khai báo tên nhưng chưa được định nghĩa. :sunglasses:

:point_right: Tóm lại: Khai báo lớp Abstract để đó đã, xử lý gì thì để lớp con kế thừa lớp Abstract đấy rồi xử lý sau :kissing_smiling_eyes:

- Trong [Lesstion 4](https://viblo.asia/p/lession-4-php-lap-trinh-huong-doi-tuong-trong-php-voi-ly-thuyet-tinh-gian-4P856nYa5Y3) của chuỗi bài học PHP này tôi đã đề cập tới những quy tắc cần chú ý, xin được nhắc lại là:
    
    + Phương thức lớp con phải được định nghĩa với ***cùng tên*** và ***khai báo lại*** phương thức trừu tượng cha.
    + Phương thức lớp con phải được xác định với công cụ (Public, protected, private) **sửa đổi quyền truy cập giống hoặc ít bị hạn chế hơn**. Tức là, nếu lớp cha trừu tượng được định nghĩa là protected thì lớp con kế thừa phải định nghĩa là protected hoặc public chứ không thể private.
    + **Số lượng đối số bắt buộc phải giống nhau**. Tuy nhiên, lớp con có thể có thêm các đối số tùy chọn


<br>

**1.2. Interface**

Nếu như abstract chỉ sự trừu tượng thì interface thể hiện sự đa hình của lập trình hướng đối tượng trong PHP.

**a. Cú pháp Interface**

- Ta có thể hiểu, **interface là giao diện**.
- Trước class luôn có từ khóa ***interface***.
- Để các lớp con có thể sử dụng phương thức **interface** thì cần có từ khóa ***implements*** đứng giữa.
- Cách khai báo và gọi hàm giống như abstract.

```
<?php
interface Interface_Name 
    {
      public function someMethod1();
      public function someMethod2($name, $color);
      public function someMethod3() : string;
    }

class Sub_Class implements Interface_Name
    {
        public function someMethod1(); 
        {
            //code
        }
    }
?>
```

<br>

**b. Khái niệm**

- Giao diện cho phép chỉ định một phương thức mà một lớp sẽ triển khai.
- Nhiều lớp có thể sử dụng cùng một giao diện - tính đa hình.
- Giao diện không có thuộc tính, các công cụ truy cập đều phải là **public**.


### 2. Ví dụ trực quan
##### 2.1. Ví dụ về Abstract

- Tự mình thử để thấy nó hoạt động như thế nào nhé.
- Tạo một file index.php, copy đoạn code dưới đây vào file đó, khởi động localhost (Xampp), gọi localhost trong trình duyệt với cú pháp:

Ai không biết có thể đọc [Cách cài đặt xampp](https://viblo.asia/p/lession-0-php-lan-dau-lam-quen-voi-php-cac-cong-cu-lap-trinh-cai-dat-tren-windows-Qbq5QQVX5D8) mà tôi đã viết lần đầu tiên khi bắt đầu khóa học này.

 > **localhost:80/thu_muc_luu_tru/file.php**

Thí dụ đường dẫn tôi dùng là: http://localhost:80/T3H/php/php-oop/**php-oop-abstract**/

Lưu ý: 
" ***:80*** " có thể sẽ bị ẩn đi khi thực hiện tìm kiếm nên các bạn không cần lo lắng rằng: "Ớ, sao lại không giống :flushed::flushed:"  

:joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy::joy:

<br>

- **Lớp cha Fruits**: Truyền một biến ***$name*** vào constructer và khởi tạo hàm ***intro()*** với thuộc tính trả về là một chuỗi
```

    // class cha
    abstract class Fruits
    {
        public $name;
        public function __construct($name)
        {
            $this->name = $name;
        }
        abstract public function intro(): string;
    }

```

<br>

- Ở các lớp con: Bắt đầu triển khai hàm ***intro()*** kế thừa từ lớp cha, **gọi đúng tên** hàm intro() về và **thực hiện trả về** một chuỗi bên trong.

```
// Các class con
    class Apple extends Fruits
    {
        public function intro(): string
        {
            return "Hi! Ăn $this->name nhé?";
        }
    }

    class Orange extends Fruits
    {
        public function intro(): string
        {
            return "Bạn thích ăn $this->name không?";
        }
    }

    class Lemon extends Fruits
    {
        public function intro(): string
        {
            return "Hoặc bạn cũng có thể ăn $this->name! =)))))))";
        }
    }

```

<br>

- Code tổng quát:

```index.php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    // class cha
    abstract class Fruits
    {
        public $name;
        public function __construct($name)
        {
            $this->name = $name;
        }
        abstract public function intro();
    }

    // Các class con
    class Apple extends Fruits
    {
        public function intro()
        {
            return "Hi! Ăn $this->name nhé?";
        }
    }

    class Orange extends Fruits
    {
        public function intro()
        {
            return "Bạn thích ăn $this->name không?";
        }
    }

    class Lemon extends Fruits
    {
        public function intro()
        {
            return "Hoặc bạn cũng có thể ăn $this->name! =)))))))";
        }
    }

    // Create objects from the child classes
    $apple = new Apple("Táo");
    echo $apple->intro();
    echo "<br><br>";

    $orange = new Orange("Cam");
    echo $orange->intro();
    echo "<br><br>";

    $lemon = new Lemon("Chanh");
    echo $lemon->intro();
    ?>
</body>

</html>
```

<br>

##### 2.2. Ví dụ về Interface

- Các bước khởi động với localhost giống như Abstract, bạn có thể lưu chương trình của interface sang một thư mục mới và gọi localhost với đường dẫn tới thư mục mới.
- Ví dụ: http://localhost:80/T3H/php/php-oop/**php-oop-interface**/

- Interface: Định nghĩa một hàm ***taste()***

```

    // Định nghĩa Interface
    interface Fruits
    {
        public function taste();
    }

```

<br>

- Định nghĩa các class: Nếu muốn cho các class này có thể kết nối với Interface thì cần ***implements*** với mỗi class.

```
// Định nghĩa class
    class Apple implements Fruits
    {
        public function taste()
        {
            echo " Sweet and sour <br><br>";
        }
    }

    class Orange implements Fruits
    {
        public function taste()
        {
            echo " Sweet or sour <br><br>";
        }
    }

    class Lemon implements Fruits
    {
        public function taste()
        {
            echo " Sour ";
        }
    }
```

<br>

- Code tổng quát:

```index.php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    // Định nghĩa Interface
    interface Fruits
    {
        public function taste();
    }

    // Định nghĩa class
    class Apple implements Fruits
    {
        public function taste()
        {
            echo " Sweet and sour <br><br>";
        }
    }

    class Orange implements Fruits
    {
        public function taste()
        {
            echo " Sweet or sour <br><br>";
        }
    }

    class Lemon implements Fruits
    {
        public function taste()
        {
            echo " Sour ";
        }
    }

    // Create a list of animals
    $apple = new Apple();
    $orange = new Orange();
    $lemon = new Lemon();
    $fruits = array($apple, $orange, $lemon);

    // Tell the animals to make a sound
    foreach ($fruits as $fruit) {
        $fruit->taste();
    }
    ?>
</body>

</html>
```

<br>


-----


### 3. So sánh Abstract và Interface

Đến đây hẳn chắc có nhiều bạn cảm thấy hoang mang khi không biết anh Abstract và anh Interface ngoài cú pháp ra thì phương thức hoạt động của hai anh ấy khác nhau ở chỗ nào :laughing:. Do đó, tôi đã có một vài sàng lọc như sau:

- Thuộc tính: Abstract có, Interface không có.
- Công cụ truy cập: Abstract dùng protected và public, Interface chỉ dùng public.
- Vốn dĩ các phương thức trong giao diện là trừu tượng nên nếu bạn triển khai những phương thức này trong phương thức Abstract là không cần thiết.
- Các lớp vừa triển khai một Interface nhưng cũng có thể kế thừa một lớp khác, thí dụ:

> class Lemon **extends** Fruits **implements** Fruits1


<br>

Oops! We done!

Trên đây là tất cả những gì tôi tìm hiểu và rút ra được nên sẽ vẫn có những sai sót, cầu các cao nhân chỉ giáo thêm ạ :pray:


 :maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: