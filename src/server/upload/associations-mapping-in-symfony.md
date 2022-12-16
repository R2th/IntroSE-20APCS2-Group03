Xin chào mọi người, ở bài viết này mình viết về Association Mapping trong Symfony framework.

### 1. Khái quát về Associations Mapping
- Thông thường ở một số framework như rails, laravel khi nhắc đến quan hệ giữa các object với nhau thì chúng ta sẽ làm việc với các foreign keys của chúng, còn đối với Symfony thì thay vào đó bạn sẽ làm việc với các tham chiếu giữa các đối tượng với nhau và Doctrine([dành cho những bạn chưa biết về Doctrine](https://symfony.com/projects/doctrine)) sẽ convert những tham chiếu đó thành những foreign keys tương ứng. Nge thật là mông lông nhỉ :D :D
- Trong Symfony có 3 relations chính đó là:
    - OneToMany: là quan hệ một nhiều, nghĩa là một instance của thực thể hiện tại có nhiều instance của thực thể được khai báo tham chiếu đến.
    - ManyToOne: là quan hệ nhiều một, nghĩa là nhiều instance của thực thể hiện tại tham chiếu đến một instance của thực thể được khai báo.
    - OneToOne: là quan hệ một một, nghĩa là một instance của thực thể hiện tại tham chiếu đến một instance của thực thể được khai báo.

- Ban đầu làm việc với association của symfony mình rất dễ bị nhầm lẫn vì nó hơi ngược(đối với cá nhân mình thôi nhé :D). Vậy nên mình chia sẽ cho mn một tip nhỏ để mọi người ghi nhớ các quan hệ một cách dễ dàng: Bạn hãy đọc từ trái sang phải, bên trái là **thực thể hiện tại**, còn bên phải là thực **thể tham chiếu**.

### 2. Các loại Associations
#### a) Many-To-One, một chiều
- Ban đầu làm việc với association của symfony mình rất dễ bị nhầm lẫn vì nó hơi ngược(đối với cá nhân mình thôi nhé :D). Vậy nên mình chia sẽ cho mn một tip nhỏ để mọi người ghi nhớ các quan hệ một cách dễ dàng: Bạn hãy đọc từ trái sang phải, bên trái là **thực thể hiện tại**, còn bên phải là thực **thể tham chiếu**Quan hệ nhiều một là quan hệ phổ biến nhất giữa các object với nhau. Ví dụ: Nhiều **Users** có chung một **Addess**

```php
<?php
/** @Entity */
class User
{
    // ...

    /**
     * @ManyToOne(targetEntity="Address")
     * @JoinColumn(name="address_id", referencedColumnName="id")
     */
    private $address;
}

/** @Entity */
class Address
{
    // ...
}
```

> @ManyToOne(targetEntity="Address")
>  
>  + @ManyToOne: là loại quan hệ
>  + targetEntity: là thực thể tham chiếu đến, ở trong ví dụ là thực thể **Address**
>  
>  @JoinColumn(name="address_id", referencedColumnName="id")
>  + @joinColumn định nghĩa các column mapping giữa 2 thực thể với nhau.
>  + @JoinColumn: cái này optional, mặc đinh của nó sẽ là **address_id** và tham chiếu đến column **id** ở bảng tham chiếu **address**
>  

- Đoạn code trên sẽ generate sang cấu trúc MYSQL thì sẽ như dưới:

```sql
CREATE TABLE User (
    id INT AUTO_INCREMENT NOT NULL,
    address_id INT DEFAULT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

CREATE TABLE Address (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

ALTER TABLE User ADD FOREIGN KEY (address_id) REFERENCES Address(id);
```

#### b) One-To-One, một chiều
Ở đây mình lấy ví dụ về một thực thể **product** tham chiếu đến một thực thể **Shipment**

```php
<?php
/** @Entity */
class Product
{
    // ...

    /**
     * One Product has One Shipment.
     * @OneToOne(targetEntity="Shipment")
     * @JoinColumn(name="shipment_id", referencedColumnName="id")
     */
    private $shipment;

    // ...
}

/** @Entity */
class Shipment
{
    // ...
}
```

Và cấu trúc MYSQL của nó sẽ là:
```sql
CREATE TABLE Product (
    id INT AUTO_INCREMENT NOT NULL,
    shipment_id INT DEFAULT NULL,
    UNIQUE INDEX UNIQ_6FBC94267FE4B2B (shipment_id),
    PRIMARY KEY(id)
) ENGINE = InnoDB;
CREATE TABLE Shipment (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
ALTER TABLE Product ADD FOREIGN KEY (shipment_id) REFERENCES Shipment(id);
```

#### c) One-To-One, 2 chiều
Khác với One-To-One một chiều chỉ tham chiếu một chiều từ một thực thể khai báo tham chiếu đến thực thể được tham chiếu, thì 2 chiều sẽ có thêm chiều ngược lại.
Mình lấy ví dụ giữa một **Customer** và một **Cart**. **Cart** có thể tham chiếu ngược lại **Customer**.

```php
<?php
/** @Entity */
class Customer
{
    // ...

    /**
     * One Customer has One Cart.
     * @OneToOne(targetEntity="Cart", mappedBy="customer")
     */
    private $cart;

    // ...
}

/** @Entity */
class Cart
{
    // ...

    /**
     * One Cart has One Customer.
     * @OneToOne(targetEntity="Customer", inversedBy="cart")
     * @JoinColumn(name="customer_id", referencedColumnName="id")
     */
    private $customer;

    // ...
}
```

- Khác với một chiều thì ở hai chiều mình phải khai báo thêm ở thực thể được tham chiếu đến.
- Ở đoạn code trên có 2 từ khóa mới đó là **mappedBy** và **inverseBy** 2 từ khóa này thực chất là chỉ đối tượng còn lại mapping với **targetEntity**. Thường thì **mappedBy** được định nghĩa ở thực thể được xem là **Has a**, như ở ví dụ trên thì **Customer** có một **Cart** thì ở đây dùng **mappedBy**,  còn với **inverseBy** thì được định nghĩa ở thực thể được xem là **Belongs to**, **Cart** thuộc về một **Customer**.

Và dưới đây là cấu trúc MYSQL:
```sql
CREATE TABLE Cart (
    id INT AUTO_INCREMENT NOT NULL,
    customer_id INT DEFAULT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
CREATE TABLE Customer (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
ALTER TABLE Cart ADD FOREIGN KEY (customer_id) REFERENCES Customer(id);
```
#### d) One-To-One, Self-referencing
Có nghĩa là chính nó tham chiếu đến nó. :D
Ví dụ một **Student** có một **Mentor** và chúng cùng là instance của thực thể **Student**.

```php
<?php
/** @Entity */
class Student
{
    // ...

    /**
     * One Student has One Mentor.
     * @OneToOne(targetEntity="Student")
     * @JoinColumn(name="mentor_id", referencedColumnName="id")
     */
    private $mentor;

    // ...
}
```

Cấu trúc MYSQL:
```sql
CREATE TABLE Student (
    id INT AUTO_INCREMENT NOT NULL,
    mentor_id INT DEFAULT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
ALTER TABLE Student ADD FOREIGN KEY (mentor_id) REFERENCES Student(id);
```

#### e) One-To-Many, 2 chiều
- Một one-to-many sẽ là 2 chiều, trừ trường hợp bạn sử dụng **@joinTable** 
- Tham chiếu 2 chiều bắt buộc phải có thuộc tính **mappedBy** được định nghĩa ở entity **One**, và thuộc tính **inverseBy** ở entity **Many**.

```php
<?php
use Doctrine\Common\Collections\ArrayCollection;

/** @Entity */
class Product
{
    // ...
    /**
     * One product has many features. This is the inverse side.
     * @OneToMany(targetEntity="Feature", mappedBy="product")
     */
    private $features;
    // ...

    public function __construct() {
        $this->features = new ArrayCollection();
    }
}

/** @Entity */
class Feature
{
    // ...
    /**
     * Many features have one product. This is the owning side.
     * @ManyToOne(targetEntity="Product", inversedBy="features")
     * @JoinColumn(name="product_id", referencedColumnName="id")
     */
    private $product;
    // ...
}
```

Cấu trúc MYSQL:
```sql
CREATE TABLE Product (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
CREATE TABLE Feature (
    id INT AUTO_INCREMENT NOT NULL,
    product_id INT DEFAULT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
ALTER TABLE Feature ADD FOREIGN KEY (product_id) REFERENCES Product(id);
```

#### f, One-To-Many, một chiều với Join Table
```php
<?php
/** @Entity */
class User
{
    // ...

    /**
     * Many User have Many Phonenumbers.
     * @ManyToMany(targetEntity="Phonenumber")
     * @JoinTable(name="users_phonenumbers",
     *      joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="phonenumber_id", referencedColumnName="id", unique=true)}
     *      )
     */
    private $phonenumbers;

    public function __construct()
    {
        $this->phonenumbers = new \Doctrine\Common\Collections\ArrayCollection();
    }

    // ...
}

/** @Entity */
class Phonenumber
{
    // ...
}
```

Cấu trúc SQL: 
```sql
CREATE TABLE User (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

CREATE TABLE users_phonenumbers (
    user_id INT NOT NULL,
    phonenumber_id INT NOT NULL,
    UNIQUE INDEX users_phonenumbers_phonenumber_id_uniq (phonenumber_id),
    PRIMARY KEY(user_id, phonenumber_id)
) ENGINE = InnoDB;

CREATE TABLE Phonenumber (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

ALTER TABLE users_phonenumbers ADD FOREIGN KEY (user_id) REFERENCES User(id);
ALTER TABLE users_phonenumbers ADD FOREIGN KEY (phonenumber_id) REFERENCES Phonenumber(id);
```

Hôm nay mình bút tại đây nhé, Cảm ơn mn đã đọc bài của mình.

Happy coding!

### 3. Tài liệu tham khảo
* [Association Mapping](https://www.doctrine-project.org/projects/doctrine-orm/en/current/reference/association-mapping.html?fbclid=IwAR2iZ_iInTEKAxtvqtfGlGoXHo5lVcT0RhkYklgbU9SRnZ8la62_I2efn_k#association-mapping)
* [Symfony doc](https://symfony.com/doc/current/index.html#gsc.tab=0)