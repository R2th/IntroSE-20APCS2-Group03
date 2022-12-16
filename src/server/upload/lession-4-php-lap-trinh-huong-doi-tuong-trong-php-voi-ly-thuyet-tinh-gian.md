### 1. Sơ đồ tổng quan

![](https://images.viblo.asia/a2bc0186-358a-4abb-8b9e-15c4ba7a9b58.jpg)


<br>

### 2. Lập trình hướng đối tượng (OOP) là gì? Bản chất của việc học OOP?

<br>

#####  Lớp(Class) là gì? Đối tượng là gì? Ví dụ?
-	Tương đương với khái niệm lớp của sinh học, lớp đối tượng là một mô tả về một nhóm đối tượng tương tự nhau. Nó xác định dữ liệu gì và hàm nào sẽ có trong các đối tượng của lớp đó.
-	Đối tượng là một thành phần chương trình chứa cả dữ liệu và các hàm thao tác trên dữ liệu đó.
-	Ví dụ: 
    + Lớp giống như 1 bản vẽ thiết kế ngôi nhà.
    + Đối tượng giống như ngôi nhà được xây lên từ bản thiết kế đó.
-	**Tư tưởng OOP** là chia chương trình thành các đối tượng. **Đối tượng** là thực thể chương trình *kết hợp cả dữ liệu và các hàm thao tác* trên dữ liệu đó.
 
 - **Mô hình**: 

![](https://images.viblo.asia/d9560f43-18cc-4f1d-84eb-06bb4a023b1f.PNG)

<br>

:four_leaf_clover: Trong mô hình OOP dữ liệu không thể dùng chung mà được đóng gói trong các đối tượng. Và quy định chỉ những hàm ở trong đối tượng thì mới có quyền truy nhập vào dữ liệu của đối tượng mà không phải là tất cả các hàm. 


- **Bản chất**: 

    + OOP là Học cách đóng gói dữ liệu và hàm thành đối tượng.
    + Hướng đối tượng là ***phải xem thiết kế chương trình như thế nào*** chứ không đi vào chi tiết từng câu lệnh. Cụ thể là các chương trình hướng đối tượng phải được tổ chức xung quanh một đối tượng.
    + Chương trình HĐT có thể coi là 1 tập hợp các đối tượng tương tác với nhau.


 - **Công việc** của OOP:
    + Tạo ra lớp: Khai báo lớp :arrow_right: Khai báo biến và khai báo hàm thành viên.
    + Sử dụng lớp: Tạo đối tượng của lớp :arrow_right: tương tác với đối tượng hoặc cho các đối tượng tương tác với nhau.

**1.	Khái niệm cơ bản của OOP?**
-	Chia chương trình thành các đối tượng (dựa vào các đối tượng thực tế).
-	Chương trình HĐT là tập hợp các đối tượng tương tác với nhau.
-	Học OOP là học cách đóng gói dữ liệu và hàm thành đối tượng.


<br>

**2.	Đặc tính của OOP?**

-	Tất cả đều là đối tượng.
-	Chương trình hướng đối tượng có thể coi là một tập hợp các đối tượng tương tác với nhau.
-	Mỗi đối tượng trong chương trình có các dữ liệu độc lập và chiếm bộ nhớ riêng của mình.
-	Mỗi đối tượng đều có dạng đặc trưng của lớp các đối tượng đó.
-	Tất cả các đối tượng thuộc về cùng một lớp đều có các hành vi giống nhau.

<br>

### 3. Tính trừu tượng: 
- Một phương thức trừu tượng là một phương thức được khai báo, nhưng không được triển khai trong mã.
- >  Quy tắc đặt:  
>  + Phương thức lớp con phải được định nghĩa với cùng tên và nó khai báo lại phương thức trừu tượng mẹ.
>  
>   + Phương thức lớp con phải được xác định với công cụ sửa đổi quyền truy cập giống hoặc ít bị hạn chế hơn
  > 
>   + Số lượng đối số bắt buộc phải giống nhau. Tuy nhiên, lớp con có thể có thêm các đối số tùy chọn


### 4. Sự kế thừa

-	**Thể hiện**: 
    + **Khái niệm**: Một lớp đi kế thừa những đặc điểm của lớp khác. 
    + Mối quan hệ loại trong thế giới thực.
- **Hình mô tả**:

![](https://images.viblo.asia/2ab8c87f-e225-4a84-8e30-4226f23c8869.PNG)

<br>

-	Lớp dẫn xuất kế thừa những đặc điểm của lớp cơ sở. Trong lớp dẫn xuất, ngoài những đặc điểm của lớp cơ sở thì còn thêm những đặc điểm mới của riêng nó.

- **Ý nghĩa**:
    +	Cho phép sử dụng lại nhưng có tính mở rộng phát triển. Vì thế đem lại lợi ích to lớn cho phát triển phần mềm, tiết kiệm thời gian công sức của người lập trình.

    + Ví dụ: Khi thiết kế giao diện web, các đặc điểm cho 1 giao diện không thay đổi gì nhưng vẫn có thể thêm các hiệu ứng, các nút giao diện mới bổ sung vào dựa trên giao diện cũ.

- **Mô phỏng**:	Mô phỏng được mối quan hệ loại giữa các đối tượng trong thế giới thực. Cụ thể, khi đối tượng A là 1 loại đối tượng B, thì lớp A sẽ kế thừa lớp B.

### 5. Sự đa hình:

![](https://images.viblo.asia/46fa0aae-7642-4127-a2c5-906257bcaec3.PNG)


- **Khái niệm**: Một lời gọi hàm có thể gọi đến nhiều hàm khác nhau.  :yum:

- 	**Điều kiện**:
    + Phải có sự kế thừa.
    + Phải có sự trùng hàm, giữa lớp cơ sở và lớp dẫn xuất phải có hàm trùng nhau (các hàm có hàm giống nhau).
    + Phải có hàm ảo: Hàm trùng lớp cơ sở là hàm ảo.
    + Phải có con trỏ lớp cơ sở và phải gọi hàm trùng qua con trỏ lớp cơ sở. Lời gọi hàm trùng qua con trỏ lớp cơ sở chính là đa hình động.

### 6. Các bước phân tích hướng đối tượng:
Có 6 bước.
-	Bước 1: Tìm hiểu bài toán.
-	Bước 2: Xác định rõ các yêu cầu của bài toán.
-	Bước 3: Xác định các đối tượng thực tế và thuộc tính của chúng, từ đó suy ra các đối tượng chương trình và các biến tương ứng với các thuộc tính.
-	Bước 4: Xác định các hàm trong đối tượng chương trình dựa vào các yêu cầu ở bước 2.
-	Bước 5: Xác định mối quan hệ giữa các đối tượng và tương tác với các đối tượng.
-	Bước 6: Vẽ thiết kế lớp theo ký pháp UML.

<br>

Ví dụ: Tính chu vi diện tích của hình chữ nhật có 2 cạnh a,b.
-	B1: Tìm hiểu bài toán
    + HÌnh chữ nhật có 2 cạnh là a và b
    + Tính diện tích hình chữ nhật: a*b
    + Tính chu vi hình chữ nhật: (a+b)*2

-	B2: Xác định yêu cầu: 
    + Tính diện tích hcn
    + Tính chu vi hcn
    + Nhập vào 2 cạnh a, b.
    + Đưa ra diện tích và chu vi hcn.

-	B3: Đối tượng và biến trong đối tượng
    + Đối tượng thực tế trong bài toán là hcn có 2 cạnh là a và b. Từ đó suy ra đối tượng chương trình là hcn có 2 biến thực là a và b để chứa hai cạnh a và b của hcn.

-	B4: Xác định hàm thành viên trong đối tượng: Thông thường mỗi yêu cầu thực hiện bởi 1 hàm.
    + Y/c nhập vào 2 cạnh thực hiện bởi hàm nhap(), không đối số, không trả về giá trị.
    + Y/c tính diện tích và đưa ra diện tích hcn được thực hiện bởi hàm tinhDT() và trả về diện tích. Hàm này không đối số, kiểu trả về là float.
    + Y/c tính chu vi và đưa ra chu vi hình chữ nhật được thực hiện bởi hàm tinhCV()
     Và trả về chu vi. Hàm này không đối số, kiểu trả về là float.
    + Tóm lại, trong đối tượng hcn có 3 hàm. 

-	B5: Xác định mối quan hệ giữa các đối tượng và tương tác.
    + Trong bài toán chỉ 1 loại đối tượng là hình chữ nhật.
    + Từ chương trình tạo 1 đới tượng hcn rồi tương tác với đối tượng này để nhập vào hai cạnh, tính diện tích & chu vi.

-	B6: Vẽ thiết kế lớp theo kí pháp UML

![](https://images.viblo.asia/f1b146db-d49a-4e85-a508-d95f907a95e3.PNG)

<br>

### 7. Lập trình hướng đối tượng (OOP) trong PHP
Nếu ai đã từng học qua ngôn ngữ lập trình Java sẽ thấy cách trình bày các Class, Objectst, constructor trong PHP gần như là tương tự.

- **Class**: Lập trình hướng đối tượng phân lớp, vì vậy điều đầu tiên khi bắt đầu với OOP đó là khai báo lớp.

<br>

```
<?php

class Name
{
    //code
}

?>
```
<br>

- **Thuộc tính**: Khai báo thuộc tính trong PHP như sau:

> Có 3 mức truy cập: 
> 
> **Public**: Đây là mức truy cập thoáng nhất bởi vì ***bạn có thể truy cập tới các phương thức và thuộc tính ở bất cứ đâu***, dù trong nộ bộ của lớp hay ở lớp con hay cả bên ngoài lớp đều được.
> 
>Khi khai báo thuộc tính là public ta có thể dùng từ khóa var để thay thế cho public như những ví dụ các bài trước.

> **Protected**: ***Chỉ cho phép truy xuất nội bộ trong lớp đó và lớp kế thừa***, riêng ở bên ngoài lớp sẽ không truy xuất đc. Mức protected thường được dùng cho những phương thức và thuộc tính có khả năng bị lớp con định nghĩa lại (overwrite)

> **Private**: Đây là thành phần ***chỉ dành riêng cho nội bộ của lớp***, nghĩa là ta không thể truy xuất tới thành phần private ở lớp con hoặc ở bên ngoài lớp.
> 
> Mức truy cập private thường được sử dụng với:
> 
> Các thuộc tính dữ liệu nhằm bảo vệ chúng, tránh sự truy cập tự do từ bên ngoài. Các thuộc tính này sẽ có những hàm SET và GET gán và lấy dữ liệu.
> Các phương thức trung gian tính toán trong nội bộ của đối tượng mà ta k muốn bên ngoài có thể can thiệp vào.

```
class Fruit 
{
    //Kiểu public:
    public $name;
    
     //Kiểu protected:
    protected $name;
    
     //Kiểu private:
    private $name;
}
```

- **Hàm tạo (Constructor) và hàm hủy (Destructor)**
> **1. Hàm tạo** sẽ có nhiệm vụ khởi tạo giá trị cho các thuộc tính của đối tượng của lớp đó trước khi đối tượng được đem sử dụng.

**Cú pháp**: 

```
void __construct ()
```

**Ví dụ**: 
```
<?php
class Fruit {
  public $name;
  public $color;

  //-----------------------------------------------------------------------------
  // Hàm tạo
  function __construct($name) {
    $this->name = $name;
  }
  function get_name() {
    return $this->name;
  }
  
  //-----------------------------------------------------------------------------
  // Gọi tới hàm tạo của lớp Fruit
  $apple = new Fruit("Apple");
  echo $apple->get_name();
?>
}
```

<br>

> **2. Hàm hủy** sẽ được gọi đến nếu như một đối tượng nào đó không còn được tham chiếu đến nữa, hoặc chương trình đang trong quá trình tự tắt. PHP sẽ tự động gọi hàm này ở cuối tập lệnh.

**Cú pháp**:

```
void __destruct ()
```

**Ví dụ**:

```
<?php
class Fruit {
  public $name;
  public $color;

  function __construct($name) {
    $this->name = $name;
  }
  
  //---------------------------------------------------------------------------
  // Hàm hủy
  function __destruct() {
    echo "The fruit is {$this->name}.";
  }
}

$apple = new Fruit("Apple");
?>
```

<br>

- **Kế thừa**:

    Từ khóa: ***extends***

    Ví dụ: Khởi tạo **lớp Strawberry kế thừa lớp Fruit** với từ khóa ***extends***
    
```
<?php
//-----------------------------------------------------------------------------
// Lớp cha
class Fruit {
  public $name;
  public $color;
  public function __construct($name, $color) {
    $this->name = $name;
    $this->color = $color;
  }
  public function intro() {
    echo "The fruit is {$this->name} and the color is {$this->color}.";
  }
}

//-----------------------------------------------------------------------------
// Lớp con kế thừa
class Strawberry extends Fruit {
  public $weight;
  public function __construct($name, $color, $weight) {
    $this->name = $name;
    $this->color = $color;
    $this->weight = $weight;
  }
  public function intro() {
    echo "The fruit is {$this->name}, the color is {$this->color}, and the weight is {$this->weight} gram.";
  }
}

//-----------------------------------------------------------------------------
// Gọi hàm tạo của lớp Strawberry
$strawberry = new Strawberry("Strawberry", "red", 50);
$strawberry->intro();
?>
```

- Trừu tượng:

    Từ khóa: ***abstract***
    

<br>

   Ví dụ:
   
   ```
<?php
  // Lớp cha
     abstract class Car {
      public $name;
      public function __construct($name) {
        $this->name = $name;
      }
      abstract public function intro() : string;
    }

    //-----------------------------------------------------------------------------
    // Lớp con
    class Audi extends Car {
      public function intro() : string {
        return "Choose German quality! I'm an $this->name!";
      }
    }

    class Volvo extends Car {
      public function intro() : string {
        return "Proud to be Swedish! I'm a $this->name!";
      }
    }

    //-----------------------------------------------------------------------------
    //Tạo lớp con Citroen kế thừa lớp cha Car
    class Citroen extends Car {
      public function intro() : string {
        return "French extravagance! I'm a $this->name!";
      }
    }

    //-----------------------------------------------------------------------------
    // Tạo đối tượng từ lớp con
    $audi = new audi("Audi");
    echo $audi->intro();
    echo "<br>";

    $volvo = new volvo("Volvo");
    echo $volvo->intro();
    echo "<br>";

    $citroen = new citroen("Citroen");
    echo $citroen->intro();
?>
```
    
 <br>
 
 Tham khảo thêm ở: [W3schools PHP](https://www.w3schools.com/php/php_oop_what_is.asp), [freetuts.net](https://freetuts.net/cac-muc-truy-cap-private-protected-va-public-31.html), [v1study.com](https://v1study.com/php-ham-tao-constructor-va-ham-huy-destructor.html).
 
 Cuối cùng cũng hết rồi :joy::joy: cảm ơn đã vất vả đọc!
 
 Nếu bạn có ý kiến bổ sung gì, cầu góp ý :point_down::point_down::point_down: 
 
 :maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: