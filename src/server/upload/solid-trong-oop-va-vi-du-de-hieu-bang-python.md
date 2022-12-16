Thế **SOLID** là gì? **SOLID** là cứng :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Đùa tí :rofl::rofl::rofl: Đây là các nguyên lý thiết kế trong **OOP**, được ghép lại từ các chữ cái đầu của **Single Responsibility**, **Open Close Principle**, **Liskov Substitution Principle**, **Interface Segregation** và **Dependency Inversion**.

Hôm nay mình sẽ đi vào tổng quan khái niệm, sau đó lấy ví dụ bằng **Python** cho các con vợ dễ hiểu nhé =))

Bài viết gốc trên blog cá nhân của mình: https://phamduyhieu.com/solid-trong-oop-va-vi-du-de-hieu-bang-python

# 1.	Single Responsibility

* Mỗi **class** chỉ nên có 1 trách nhiệm duy nhất
* Về lâu dài, nếu không áp dụng **S**, **class** sẽ phình to ra, khó kiểm soát và maintain.

```python
# violate the Single Responsibility Principle

class Animal:
    def __init__(self, name):
        self.name = name

    def get_name(self):
        pass

    def save_to_db(self, animal):
        # save to MySQL
        pass


# comply with Single Responsibility Principle

class Animal:
    def __init__(self, name):
        self.name = name

    def get_name(self):
        pass


class AnimalDB:
    def get_animal(self, a_id):
        pass

    def save_to_db(self, animal):
        pass

```

Ví dụ ta có class **Animal**,  trong đó gồm cả method lưu object vào database - **save_to_db**. Với thiết kế này, khi chương trình thay đổi database, ta phải mò vào sửa class gốc này. Thay vào đó ta tạo thêm 1 class nhỏ dành riêng cho việc lưu trữ database là **AnimalDB**. Việc này giúp cho việc sửa chữa đơn giản, rõ ràng hơn, ít bug hơn.


# 2.	Open Close Principle
* Nên **mở rộng** class thay vì **sửa đổi** class gốc
* Khi thêm chức năng, … ta nên **mở rộng class cũ** (kế thừa, sở hữu) mà tránh việc sửa nó 

    => dễ gây lỗi tiềm ẩn khi các module khác đang sử dụng class cũ.

```python
class Discount:
    def __init__(self, customer, price):
        self.customer = customer
        self.price = price

    def get_discount(self):
        return self.price * 0.2
        
# when we need to add discount for VIP customers => change Discount class

class Discount:
    def __init__(self, customer, price):
        self.customer = customer
        self.price = price

    def give_discount(self):
        if self.customer == 'fav':
            return self.price * 0.2
        if self.customer == 'vip':
            return self.price * 0.4

```

Thiết kế trên đã vi phạm nguyên lý **OCP**, giả dụ mỗi tuần có thêm 1 case khách hàng mới, chúng ta lại phải sửa class **Discount**, logic hàm **give_discount** sẽ dài ra vô tận :confounded::confounded::confounded:

Thay vào đó, ta nên tạo 1 class mới kế thừa class cũ :kissing_heart::kissing_heart::kissing_heart:

```python
class Discount:
    def __init__(self, customer, price):
        self.customer = customer
        self.price = price

    def get_discount(self):
        return self.price * 0.2


class VIPDiscount(Discount):
    def get_discount(self):
        return super().get_discount() * 1.2


class SuperVIPDiscount(Discount):
    def get_discount(self):
        return super().get_discount() * 1.5


class DiamondDiscount(Discount):
    def get_discount(self):
        return super().get_discount() * 2

```

# 3.	Liskov Substitution Principle
* Các **class con** có thể thay thế **class cha** mà không làm thay đổi tính đúng đắn của chương trình
* Đảm bảo tính đa hình trong **OOP**


VD: viết chương trình mô tả các loài **chim bay** 

Có class **chimcanhcut** cũng là **chim** nên cho kế thừa class **Bird**

=> Khi gọi hàm **bay** của **object chim cánh cụt** sẽ bị Exception

=> thiết kế này vi phạm nguyên lý **LSP**

Nôm na khi thiết kế class phải chú ý, **tránh bê nguyên các mối quan hệ của các object ngoài đời sống vào code**.
**A** là **B** không có nghĩa là **A** nên kế thừa **B** (nếu **class A** không thể thay thế được **class B**)

```python
class Animal:
    def leg_count(self):
        pass


class Lion(Animal):
    def leg_count(self):
        pass


def animal_leg_count(animal: Animal):
    print(animal.leg_count())


animal = Animal()
lion = Lion()
animal_leg_count(animal)
animal_leg_count(lion)


```

Với thiết kế bên trên, object **lion** có thể thay thế object **animal** từ class **Animal** mà chương trình vẫn chạy đúng.

# 4.	Interface segregation Principle
•	Nên tách interface thành các interface nhỏ hơn phục vụ cho những mục đích cụ thể

```python
# violate Interface segregation
class MyInterface:
    
    def connect_to_db(self):
        raise NotImplementedError
    
    def write(self):
        raise NotImplementedError
    
    def read(self):
        raise NotImplementedError
    
    def close_connect(self):
        raise NotImplementedError
    
    def show_info(self):
        raise NotImplementedError
    
    def update_info(self):
        raise NotImplementedError

# comply with Interface segregation
class DBInterface:

    def connect_to_db(self):
        raise NotImplementedError

    def write(self):
        raise NotImplementedError

    def read(self):
        raise NotImplementedError

    def close_connect(self):
        raise NotImplementedError


class DisplayInterface:

    def show_info(self):
        raise NotImplementedError

    def update_info(self):
        raise NotImplementedError

```

Với Interface **MyInterface**, các class khi implement **MyInterface** sẽ phải implement tất cả các method trong nó. Điều này thành ra bất hợp lý, đôi khi gây dư thừa vì 1 class đôi khi không dùng hết tất cả các method. Vì vậy ta nên chia thành các interface nhỏ (**DBInterface**, **DisplayInterface**) gồm các method liên quan đến nhau, dễ quản lý, dễ implement hơn.


# 5.	Dependency Inversion Principle
* Các **module cấp cao** không nên phụ thuộc vào các **module cấp thấp**, cả hai nên phụ thuộc vào **abstraction**
* Ta có thể thoải mái sửa đổi **implement** của **module cấp thấp** mà không làm ảnh hưởng tới **module cấp cao**
* Trong code thực tế, các **module** nên liên kết với nhau thông qua **interface**

```python
class IFood:
    def bake(self):
        raise NotImplemented

    def eat(self):
        raise NotImplemented


class Pizza(IFood):
    def bake(self):
        print("pizza was baked")

    def eat(self):
        print("pizza was ate")


class Bread(IFood):
    def bake(self):
        print("bread was baked")

    def eat(self):
        print("bread was ate")


class Production:
    def __init__(self, food: IFood):
        self.food = food

    def produce(self):
        self.food.bake()

    def consume(self):
        self.food.eat()


if __name__ == '__main__':
    pizza = Pizza()
    bread = Bread()
    
    p = Production(pizza)
    p.produce()
    p.consume()
    
    b = Production(bread)
    b.produce()
    b.consume()

```

Ở đây ta có các module cấp thấp là **Bread** và **Pizza**, module cấp cao là **Production**. 2 module này giao tiếp với nhau bằng **interface IFood**, giúp cho chương trình trở lên linh hoạt hơn. Module **Production** chỉ cần sử dụng các method trong **IFood** mà không bị ràng buộc hay cần quan tâm object nào sẽ được truyền vào. Ta có thể truyền vào **pizza** hoặc **bread**.


Phewww!!! Thế là tôi vừa chém xong tí lý thuyết cũng như code thêm tí Python minh họa cho các con vợ rồi nhé :rage::rage::rage: 

Thấy hay thì up vote nha các ty :kissing_heart::kissing_heart::kissing_heart:

Nay chủ nhật tôi đi dọn nhà đây không vợ nó đá chẻ đôi mặt ra ấy :confounded::confounded::confounded:

See yaaaa!!!!