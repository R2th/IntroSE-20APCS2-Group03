##### Trong bài ngay hôm nay, chúng ta sẽ tìm hiểu cách thức hoạt động của Public, Protected và Private của OOP (Lập trình hướng đối tượng) trong PHP.

### 1. Mô hình tổng quan

![](https://images.viblo.asia/ab10ac05-ca42-48b2-888b-240bd166f1b1.png)

<br>

> **Public**: Các đối tượng bên ngoài có thể gọi hàm và biến trong class, hỗ trợ sự kế thừa.

> **Protected**: Các đối tượng bên ngoài không thể gọi được biến và hàm trong class, hỗ trợ sự kế thừa.

> **Private** <*Mức bảo mật cao nhất*>: Không cho các đối tượng bên ngoài gọi biến và hàm trong class, không hỗ trợ kế thừa.

### 2. Thí dụ trực quan:

##### 2.1. Public: 
Giống như cái nhà mà không có cửa vậy, ai cần gì cứ việc vào lấy :grin:

Theo ví dụ dưới đây, ta có:

- Viết một class cha có tên ***Person***.
- Đặt ***public*** cho hai biến *$name* và *$age*
- Khởi tạo hàm tạo và các hàm ***get/set*** cho từng biến.

- Viết lớp con có tên ***Female*** kế thừa lớp cha ***Person***
- Thêm biến ***$local*** và khởi tạo giống lớp cha ***Person***
- Khởi tạo đối tượng bên ngoài gọi đến hàm ***intro()*** bên trong lớp con để in ra giá trị.

<br>





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
    
    //Lớp cha
    class Person
    {
        public $name;
        public $age;

        public function __construct($name, $age)
        {
            $this->name = $name;
            $this->age = $age;
        }

        function set_name($name)
        {
            $this->name = $name;
        }

        function get_name()
        {
            return $this->name;
        }

        function set_age($age)
        {
            $this->age = $age;
        }

        function get_age()
        {
            return $this->age;
        }
    }


    //Lớp con
    class Female extends Person
    {
        public $local;
        public function __construct($name, $age, $local)
        {
            $this->name = $name;
            $this->age = $age;
            $this->local = $local;
        }

        public function intro()
        {
            echo "Tên: {$this->name} <br> Tuổi: {$this->age} <br> Địa chỉ: {$this->local}";
        }
    }

    //Gọi đối tượng từ bên ngoài
    $female = new female("Lan", "30", "Ha Noi");
    $female->intro();
    ?>
</body>

</html>
```

<br>

:white_check_mark: Kết quả:

![](https://images.viblo.asia/588f1a72-f524-4017-ae15-04ea2c7f6352.PNG)

##### 2.2. Protected

Cổng nhà và cửa nhà đều khóa, trừ người bên trong, người bên ngoài không được lấy dùng cái gì trong nhà :relieved:

- Thực hiện sửa **public** ở các biến của class ***Person*** và ***Female*** thành **protected**

```
        protected $name;
        protected $age;
```

```
        protected $local;
```
```
//Gọi đối tượng từ bên ngoài
    $female = new female("Lan", "30", "Ha Noi");
    $female->name;
    $female->local;
```

<br>

- Chú ý, đặt chú thích cho lệnh kiểm tra lớp cha xong mới kiểm tra sang lớp con.
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
    class Person
    {
        protected $name;
        protected $age;

        public function __construct($name, $age)
        {
            $this->name = $name;
            $this->age = $age;
        }

        function set_name($name)
        {
            $this->name = $name;
        }

        function get_name()
        {
            return $this->name;
        }

        function set_age($age)
        {
            $this->age = $age;
        }

        function get_age()
        {
            return $this->age;
        }
    }

    class Female extends Person
    {
        protected $local;
        public function __construct($name, $age, $local)
        {
            $this->name = $name;
            $this->age = $age;
            $this->local = $local;
        }

        public function intro()
        {
            echo "Tên: {$this->name} <br> Tuổi: {$this->age} <br> Địa chỉ: {$this->local}";
        }
    }

    //Gọi đối tượng từ bên ngoài
    $female = new female("Lan", "30", "Ha Noi");
    
    //Lệnh gọi kiểm tra lớp cha 
    //$female->name;
    
    //Lệnh gọi kiểm tra lớp con
    $female->local;


    ?>
</body>

</html>
```

:white_check_mark: Kết quả:

![](https://images.viblo.asia/b822beb2-03d0-4f02-a5c2-716209dc0264.PNG)



##### 2.3. Private

Bây giờ thì nhà của bố mẹ chỉ có bố mẹ được ở, con + người ngoài không được thừa kế bất cứ cái gì nhé :upside_down_face::upside_down_face::upside_down_face:

- Thực hiện sửa **protected** ở các biến của class ***Person*** thành **private**
- 

```
        private $name;
        private $age;
```

```
        private $local;
```

<br>

- Thực hiện gọi từ bên ngoài
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
    class Person
    {
        private $name;
        private $age;
    
        public function __construct($name, $age)
        {
            $this->name = $name;
            $this->age = $age;
        }

        function set_name($name)
        {
            $this->name = $name;
        }

        function get_name()
        {
            return $this->name;
        }

        function set_age($age)
        {
            $this->age = $age;
        }

        function get_age()
        {
            return $this->age;
        }
    }

    class Female extends Person
    {
        private $local;
        public function __construct($name, $age, $local)
        {
            $this->name = $name;
            $this->age = $age;
            $this->local = $local;
        }

        public function intro()
        {
            echo "Tên: {$this->name} <br> Tuổi: {$this->age} <br> Địa chỉ: {$this->local}";
        }
    }

    //Gọi đối tượng từ bên ngoài class Person
    $female = new Person();
    $female->name = "Lan";
    
    //Gọi đối tượng từ bên ngoài class con Female
    // $female2 = new female('Lan', '30', 'Ha Noi')
    //$female->local = "Hà Nội";


    ?>
</body>

</html>
```
<br>

:white_check_mark: Kết quả:

![](https://images.viblo.asia/ca5060b7-8ca8-489e-91c1-a18b8a924c76.PNG)


:pill: Cách làm tương tự với các **hàm**, khi bạn muốn giấu một hàm nào đó không cho bên ngoài sử dụng thì chỉ đơn giản gắn thuộc tính private cho nó là xong.

Lấy ví dụ ở class Female ở trên, ta gắn **private** cho hàm ***intro()*** :

```
private function intro()
        {
           echo "Tên: {$this->name} <br> 
                       Tuổi: {$this->age} <br> 
                       Địa chỉ: {$this->local}";
        }
```

- Thực hiện gọi như sau:

```
    $female = new Female('Lan', '30', 'Ha Noi');
    $female->intro();
```


<br>

:white_check_mark: Kết quả:
![](https://images.viblo.asia/1739b20e-0486-437f-a481-ae9066e0d656.PNG)



Như vậy, trong lập trình hướng đối tượng chúng ta có 3 mức bảo vệ hàm và biến: Public, Protected và Private. 

Hiểu được cách thức cũng như cơ chế hoạt động của 3 thuộc tính này trong PHP để thao tác với biến và hàm linh hoạt và thông minh hơn nhé!

Cảm ơn đã xem và hẹn gặp lại trong những bài viết sau! :grin::grin:

 :maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: